
import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Loader2, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface AvatarUploaderProps {
  currentAvatarUrl: string | null;
  onAvatarUpdate: () => void;
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({ 
  currentAvatarUrl,
  onAvatarUpdate
}) => {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState<string | null>(null);
  
  // Set the preview URL when the component mounts or currentAvatarUrl changes
  useEffect(() => {
    setPreviewUrl(currentAvatarUrl);
  }, [currentAvatarUrl]);
  
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;
    
    // Clear previous error
    setSizeError(null);
    
    // Validate file is an image
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }
    
    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setSizeError("Please upload an image smaller than 2MB");
      return;
    }
    
    try {
      setIsUploading(true);
      
      // Create a preview of the image
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      // Create a unique file path that includes the user ID as required by the RLS policy
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true });
        
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);
        
      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: data.publicUrl })
        .eq('id', user.id);
        
      if (updateError) throw updateError;
      
      toast({
        title: "Avatar updated",
        description: "Your profile image has been updated",
      });
      
      onAvatarUpdate();
    } catch (error: any) {
      console.error("Avatar upload error:", error);
      toast({
        title: "Error updating avatar",
        description: error.message,
        variant: "destructive",
      });
      // Reset preview to current avatar if update fails
      setPreviewUrl(currentAvatarUrl);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mb-4">
      {sizeError && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle className="text-center">File too large</AlertTitle>
          <AlertDescription className="text-center">
            {sizeError}
          </AlertDescription>
        </Alert>
      )}
      
      <div className="relative">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-rpg-primary/30">
          <AspectRatio ratio={1} className="h-full">
            {previewUrl ? (
              <img 
                src={previewUrl} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="bg-rpg-primary/20 text-rpg-primary text-3xl flex items-center justify-center h-full">
                <User />
              </div>
            )}
          </AspectRatio>
        </div>
        
        <label 
          htmlFor="avatar-upload" 
          className="absolute -bottom-2 -right-2 p-2 rounded-full bg-rpg-primary text-white cursor-pointer"
        >
          {isUploading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Camera className="w-4 h-4" />
          )}
        </label>
        
        <input
          id="avatar-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={isUploading}
        />
      </div>
      
      <p className="text-xs text-muted-foreground mt-2">
        Click the camera icon to upload a new profile image
      </p>
    </div>
  );
};

export default AvatarUploader;
