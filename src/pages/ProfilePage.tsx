
import React, { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useQuests } from "@/context/QuestContext";
import { useShadows } from "@/context/ShadowContext";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import EditProfileForm from "@/components/auth/EditProfileForm";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileStats from "@/components/profile/ProfileStats";
import QuestStats from "@/components/profile/QuestStats";
import ClassEvolution from "@/components/profile/ClassEvolution";

interface ProfileData {
  username: string | null;
  avatar_url: string | null;
}

const ProfilePage = () => {
  const { userData } = useUser();
  const { quests } = useQuests();
  const { shadows } = useShadows();
  const { user, signOut } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData>({ username: null, avatar_url: null });
  const [showEditForm, setShowEditForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Find top 3 stats
  const topStats = [...userData.stats]
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        setProfileData(data || { username: null, avatar_url: null });
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfileData();
  }, [user]);

  const handleProfileUpdate = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', user.id)
        .single();
        
      if (error) throw error;
      setProfileData(data || { username: null, avatar_url: null });
      setShowEditForm(false);
    } catch (error) {
      console.error('Error refreshing profile:', error);
    }
  };

  const toggleEditForm = () => setShowEditForm(!showEditForm);

  return (
    <div className="py-4">
      <div className="glass-card rounded-lg p-4 mb-4 animate-fade-in">
        <ProfileHeader 
          profileUsername={profileData.username} 
          avatarUrl={profileData.avatar_url}
          userData={userData}
          showEditForm={showEditForm}
          toggleEditForm={toggleEditForm}
        />
        
        {showEditForm ? (
          <EditProfileForm 
            currentUsername={profileData.username || userData.name} 
            avatarUrl={profileData.avatar_url}
            onProfileUpdate={handleProfileUpdate}
          />
        ) : (
          <>
            <ProfileStats userData={userData} topStats={topStats} />
            <QuestStats quests={quests} shadows={shadows} />
            <ClassEvolution userData={userData} />
          </>
        )}
        
        <Button 
          variant="outline" 
          className="w-full mt-4 bg-destructive/10 border-destructive/20 hover:bg-destructive/20"
          onClick={signOut}
        >
          <LogOut size={16} className="mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
