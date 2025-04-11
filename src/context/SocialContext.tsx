
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { SocialContextType } from "@/types/social";
import { useSocialParty } from "@/hooks/useSocialParty";
import { useSocialGuild } from "@/hooks/useSocialGuild";
import { useSocialFriends } from "@/hooks/useSocialFriends";
import { useSocialStats } from "@/hooks/useSocialStats";

const SocialContext = createContext<SocialContextType | undefined>(undefined);

export const SocialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize social hooks with the user ID and refresh callback
  const refreshSocialData = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Fetch user's party
      const party = await partyHooks.fetchUserParty();
      
      // Fetch user's guild
      const guild = await guildHooks.fetchUserGuild();
      
      // Fetch friends
      const { friends: acceptedFriends, pendingFriends: pendingFriendsList } = 
        await friendHooks.fetchFriendships();
      
      // Update social stats
      await statsHooks.fetchSocialStats(
        party ? 1 : 0, 
        guild ? 1 : 0,
        acceptedFriends.length
      );
    } catch (error) {
      console.error('Error fetching social data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const partyHooks = useSocialParty(user?.id, refreshSocialData);
  const guildHooks = useSocialGuild(user?.id, refreshSocialData);
  const friendHooks = useSocialFriends(user?.id, refreshSocialData);
  const statsHooks = useSocialStats(user?.id);

  useEffect(() => {
    if (user) {
      refreshSocialData();
    } else {
      // Reset state when user logs out
      partyHooks.setUserParty(null);
      guildHooks.setUserGuild(null);
      friendHooks.setFriends([]);
      friendHooks.setPendingFriends([]);
      statsHooks.setSocialStats({
        partyCount: 0,
        guildCount: 0,
        friendCount: 0,
        achievementCount: 0
      });
      setIsLoading(false);
    }
  }, [user]);

  const contextValue: SocialContextType = {
    userParty: partyHooks.userParty,
    userGuild: guildHooks.userGuild,
    friends: friendHooks.friends,
    pendingFriends: friendHooks.pendingFriends,
    socialStats: statsHooks.socialStats,
    createParty: partyHooks.createParty,
    joinPartyWithCode: partyHooks.joinPartyWithCode,
    leaveParty: partyHooks.leaveParty,
    createGuild: guildHooks.createGuild,
    joinGuild: guildHooks.joinGuild,
    leaveGuild: guildHooks.leaveGuild,
    sendFriendRequest: friendHooks.sendFriendRequest,
    acceptFriendRequest: friendHooks.acceptFriendRequest,
    rejectFriendRequest: friendHooks.rejectFriendRequest,
    removeFriend: friendHooks.removeFriend,
    refreshSocialData,
    isLoading
  };

  return (
    <SocialContext.Provider value={contextValue}>
      {children}
    </SocialContext.Provider>
  );
};

export const useSocial = () => {
  const context = useContext(SocialContext);
  if (context === undefined) {
    throw new Error("useSocial must be used within a SocialProvider");
  }
  return context;
};
