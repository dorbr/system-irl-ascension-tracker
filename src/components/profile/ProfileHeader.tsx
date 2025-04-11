
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, ChevronUp, ChevronDown } from "lucide-react";
import { UserData } from "@/context/UserContext";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ProfileHeaderProps {
  profileUsername: string | null;
  avatarUrl: string | null;
  userData: UserData;
  showEditForm: boolean;
  toggleEditForm: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profileUsername,
  avatarUrl,
  userData,
  showEditForm,
  toggleEditForm
}) => {
  return (
    <div className="mb-4 text-center">
      <div className="w-24 h-24 mx-auto mb-2 rounded-full overflow-hidden border-2 border-rpg-primary/30">
        <AspectRatio ratio={1} className="h-full">
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt={profileUsername || userData.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="bg-rpg-primary/20 text-4xl font-bold flex items-center justify-center h-full">
              {profileUsername?.charAt(0) || userData.name.charAt(0)}
            </div>
          )}
        </AspectRatio>
      </div>
      
      <h1 className="text-2xl font-bold">{profileUsername || userData.name}</h1>
      <div className="text-rpg-primary font-medium mt-1">{userData.class.name}</div>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="mt-2"
        onClick={toggleEditForm}
      >
        {showEditForm ? (
          <>
            <ChevronUp className="w-4 h-4 mr-1" />
            Hide Editor
          </>
        ) : (
          <>
            <User className="w-4 h-4 mr-1" />
            Edit Profile
          </>
        )}
      </Button>
    </div>
  );
};

export default ProfileHeader;
