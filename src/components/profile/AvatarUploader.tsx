
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Loader2, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

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
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentAvatarUrl);
  
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;
    
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
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 2MB",
        variant: "destructive",
      });
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
      
      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      
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
      toast({
        title: "Error updating avatar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="relative">
        <Avatar className="w-24 h-24 border-2 border-rpg-primary/30">
          {previewUrl ? (
            <AvatarImage src={previewUrl} alt="Profile" />
          ) : (
            <AvatarFallback className="bg-rpg-primary/20 text-rpg-primary text-3xl">
              <User />
            </AvatarFallback>
          )}
        </Avatar>
        
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
