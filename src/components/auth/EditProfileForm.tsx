
import React from "react";
import AvatarUploader from "@/components/profile/AvatarUploader";
import UsernameForm from "@/components/profile/UsernameForm";

interface EditProfileFormProps {
  currentUsername: string;
  avatarUrl: string | null;
  onProfileUpdate: () => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ 
  currentUsername, 
  avatarUrl, 
  onProfileUpdate 
}) => {
  return (
    <div className="glass-card rounded-lg p-4 space-y-4">
      <h2 className="text-xl font-bold">Edit Profile</h2>
      
      <AvatarUploader 
        currentAvatarUrl={avatarUrl} 
        onAvatarUpdate={onProfileUpdate} 
      />
      
      <UsernameForm 
        currentUsername={currentUsername} 
        onUsernameUpdate={onProfileUpdate} 
      />
    </div>
  );
};

export default EditProfileForm;
