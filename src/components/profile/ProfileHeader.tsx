
import React from "react";
import { Button } from "@/components/ui/button";
import { User, ChevronUp, ChevronDown, Users, Shield } from "lucide-react";
import { UserData } from "@/context/UserContext";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { useSocial } from "@/context/SocialContext";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useUser } from "@/context/UserContext";

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
  const { userParty, userGuild } = useSocial();
  const { isRtl, t } = useLanguage();
  const { getLocalizedClassName } = useUser();
  
  // Add console.log to debug
  console.log("ProfileHeader - Current class:", userData.class.name);
  console.log("ProfileHeader - Translated class:", getLocalizedClassName(userData.class.name));
  
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
      <div className="text-rpg-primary font-medium mt-1">{getLocalizedClassName(userData.class.name)}</div>
      
      {/* Social affiliations */}
      <div className="flex justify-center gap-2 mt-2">
        {userParty && (
          <Link to="/social/party">
            <Badge variant="outline" className="flex items-center gap-1 bg-primary/10">
              <Users className="w-3 h-3" />
              {userParty.name}
            </Badge>
          </Link>
        )}
        
        {userGuild && (
          <Link to="/social/guild">
            <Badge variant="outline" className="flex items-center gap-1 bg-secondary/10">
              <Shield className="w-3 h-3" />
              {userGuild.name}
            </Badge>
          </Link>
        )}
      </div>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="mt-2 flex items-center gap-1"
        onClick={toggleEditForm}
      >
        {showEditForm ? (
          <>
            <ChevronUp className="w-4 h-4" />
            {t('hideEditor')}
          </>
        ) : (
          <>
            <User className="w-4 h-4" />
            {t('editProfile')}
          </>
        )}
      </Button>
    </div>
  );
};

export default ProfileHeader;
