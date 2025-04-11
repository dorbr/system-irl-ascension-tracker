
import React, { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useQuests } from "@/context/QuestContext";
import { useShadows } from "@/context/ShadowContext";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import XpBar from "@/components/ui/XpBar";
import StatBadge from "@/components/ui/StatBadge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Swords, History, LogOut, User, ChevronDown, ChevronUp } from "lucide-react";
import EditProfileForm from "@/components/auth/EditProfileForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  
  // Calculate quest stats
  const completedQuests = quests.filter(quest => quest.completed).length;
  const totalQuests = quests.length;
  const completionRate = totalQuests ? Math.round((completedQuests / totalQuests) * 100) : 0;
  
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

  return (
    <div className="py-4">
      <div className="glass-card rounded-lg p-4 mb-4 animate-fade-in">
        <div className="mb-4 text-center">
          <Avatar className="w-24 h-24 mx-auto mb-2 bg-rpg-primary/20">
            {profileData.avatar_url ? (
              <AvatarImage src={profileData.avatar_url} alt={profileData.username || userData.name} />
            ) : (
              <AvatarFallback className="text-4xl font-bold">
                {profileData.username?.charAt(0) || userData.name.charAt(0)}
              </AvatarFallback>
            )}
          </Avatar>
          <h1 className="text-2xl font-bold">{profileData.username || userData.name}</h1>
          <div className="text-rpg-primary font-medium mt-1">{userData.class.name}</div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2"
            onClick={() => setShowEditForm(!showEditForm)}
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
        
        {showEditForm && (
          <EditProfileForm 
            currentUsername={profileData.username || userData.name} 
            avatarUrl={profileData.avatar_url}
            onProfileUpdate={handleProfileUpdate}
          />
        )}
        
        {!showEditForm && (
          <>
            <div className="flex justify-between items-center mb-1 px-4">
              <div className="text-sm">Level {userData.level}</div>
              <div className="text-sm text-muted-foreground">
                {userData.xp} / {userData.xpToNextLevel} XP
              </div>
            </div>
            
            <XpBar
              currentXp={userData.xp}
              maxXp={userData.xpToNextLevel}
              className="mb-4"
            />
            
            <div className="mb-6">
              <h3 className="text-sm uppercase font-medium text-muted-foreground mb-2">Top Stats</h3>
              <div className="grid grid-cols-3 gap-2">
                {topStats.map((stat) => (
                  <div key={stat.name} className="glass-card p-3 text-center rounded-lg">
                    <StatBadge
                      name={stat.name}
                      abbreviation={stat.abbreviation}
                      color={stat.color}
                      className="mb-2 mx-auto w-12 h-8"
                    />
                    <div className="text-xl font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.name}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <h3 className="text-sm uppercase font-medium text-muted-foreground mb-2">Progress Stats</h3>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="glass-card p-3 text-center rounded-lg">
                <div className="flex justify-center mb-1">
                  <CheckCircle size={20} className="text-green-500" />
                </div>
                <div className="text-xl font-bold">{completedQuests}</div>
                <div className="text-xs text-muted-foreground">Quests</div>
              </div>
              
              <div className="glass-card p-3 text-center rounded-lg">
                <div className="flex justify-center mb-1">
                  <Swords size={20} className="text-yellow-500" />
                </div>
                <div className="text-xl font-bold">
                  {quests.filter(q => q.type === "dungeon" && q.completed).length}
                </div>
                <div className="text-xs text-muted-foreground">Dungeons</div>
              </div>
              
              <div className="glass-card p-3 text-center rounded-lg">
                <div className="flex justify-center mb-1">
                  <History size={20} className="text-rpg-primary" />
                </div>
                <div className="text-xl font-bold">{shadows.length}</div>
                <div className="text-xs text-muted-foreground">Shadows</div>
              </div>
            </div>
            
            <div className="glass-card p-3 rounded-lg mb-4">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium">Quest Completion</div>
                <div className="text-sm font-bold">{completionRate}%</div>
              </div>
              <div className="progress-bar mt-2">
                <div 
                  className="progress-fill" 
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>
            
            <div className="glass-card p-3 rounded-lg">
              <h3 className="text-sm font-medium mb-1">Class Evolution</h3>
              <p className="text-xs text-muted-foreground mb-3">
                Your current class is {userData.class.name}. Continue gaining XP and completing quests to evolve.
              </p>
              
              {userData.class.nextClassOptions && (
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Next potential classes:</div>
                  <div className="flex flex-wrap gap-1">
                    {userData.class.nextClassOptions.map(nextClass => (
                      <div key={nextClass} className="text-xs px-2 py-1 bg-rpg-primary/20 rounded-full text-rpg-primary">
                        {nextClass}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
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
