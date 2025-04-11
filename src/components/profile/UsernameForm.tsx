
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";

interface UsernameFormValues {
  username: string;
}

interface UsernameFormProps {
  currentUsername: string;
  onUsernameUpdate: () => void;
}

const UsernameForm: React.FC<UsernameFormProps> = ({
  currentUsername,
  onUsernameUpdate
}) => {
  const { user } = useAuth();
  const { isRtl } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<UsernameFormValues>({
    defaultValues: {
      username: currentUsername || "",
    },
  });

  const onSubmit = async (values: UsernameFormValues) => {
    if (!user) return;
    
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from('profiles')
        .update({ username: values.username })
        .eq('id', user.id);
        
      if (error) throw error;
      
      toast({
        title: "Profile updated",
        description: "Your username has been updated successfully",
      });
      
      onUsernameUpdate();
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-4 ${isRtl ? "text-right" : ""}`}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={isRtl ? "block text-right" : ""}>Username</FormLabel>
              <FormControl>
                <Input {...field} disabled={isSubmitting} className={isRtl ? "text-right" : ""} />
              </FormControl>
              <FormMessage className={isRtl ? "text-right" : ""} />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className={`w-full ${isRtl ? "flex-row-reverse" : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className={`h-4 w-4 animate-spin ${isRtl ? "ml-2" : "mr-2"}`} />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default UsernameForm;
