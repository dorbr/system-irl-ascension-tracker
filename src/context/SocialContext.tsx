
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { 
  Party, 
  Guild, 
  Friend, 
  SocialStats, 
  SocialContextType 
} from "@/types/social";
import { 
  createParty,
  joinPartyWithCode,
  leaveParty,
  fetchUserParty
} from "@/utils/partyUtils";
import {
  createGuild,
  joinGuild,
  leaveGuild,
  fetchUserGuild
} from "@/utils/guildUtils";
import {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
  fetchFriendships
} from "@/utils/friendUtils";
import { fetchSocialStats } from "@/utils/socialStatsUtils";
import { toast } from "@/hooks/use-toast";

const SocialContext = createContext<SocialContextType | undefined>(undefined);

export const SocialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [userParty, setUserParty] = useState<Party | null>(null);
  const [userGuild, setUserGuild] = useState<Guild | null>(null);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [pendingFriends, setPendingFriends] = useState<Friend[]>([]);
  const [socialStats, setSocialStats] = useState<SocialStats>({
    partyCount: 0,
    guildCount: 0,
    friendCount: 0,
    achievementCount: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      refreshSocialData();
    } else {
      // Reset state when user logs out
      setUserParty(null);
      setUserGuild(null);
      setFriends([]);
      setPendingFriends([]);
      setSocialStats({
        partyCount: 0,
        guildCount: 0,
        friendCount: 0,
        achievementCount: 0
      });
      setIsLoading(false);
    }
  }, [user]);

  const refreshSocialData = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Fetch user's party
      const party = await fetchUserParty(user.id);
      setUserParty(party);

      // Fetch user's guild
      const guild = await fetchUserGuild(user.id);
      setUserGuild(guild);

      // Fetch friends
      const { friends: acceptedFriends, pendingFriends: pendingFriendsList } = 
        await fetchFriendships(user.id);
      setFriends(acceptedFriends);
      setPendingFriends(pendingFriendsList);

      // Update social stats
      const stats = await fetchSocialStats(
        user.id, 
        party ? 1 : 0, 
        guild ? 1 : 0,
        acceptedFriends.length
      );
      setSocialStats(stats);
    } catch (error) {
      console.error('Error fetching social data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Party-related handlers
  const handleCreateParty = async (name: string, description?: string) => {
    if (!user) return null;
    
    // Check if user is already in a party
    if (userParty) {
      toast({
        title: "Already in a party",
        description: "Leave your current party before creating a new one",
        variant: "destructive"
      });
      return null;
    }
    
    const party = await createParty(user.id, name, description);
    if (party) {
      await refreshSocialData();
    }
    return party;
  };

  const handleJoinPartyWithCode = async (inviteCode: string) => {
    if (!user) return false;
    
    // Check if user is already in a party
    if (userParty) {
      toast({
        title: "Already in a party",
        description: "Leave your current party before joining another one",
        variant: "destructive"
      });
      return false;
    }
    
    const success = await joinPartyWithCode(user.id, inviteCode);
    if (success) {
      await refreshSocialData();
    }
    return success;
  };

  const handleLeaveParty = async () => {
    if (!user || !userParty) return false;
    
    const success = await leaveParty(user.id, userParty.id, userParty.name);
    if (success) {
      await refreshSocialData();
    }
    return success;
  };

  // Guild-related handlers
  const handleCreateGuild = async (name: string, description?: string, motto?: string) => {
    if (!user) return null;
    
    // Check if user is already in a guild
    if (userGuild) {
      toast({
        title: "Already in a guild",
        description: "Leave your current guild before creating a new one",
        variant: "destructive"
      });
      return null;
    }
    
    const guild = await createGuild(user.id, name, description, motto);
    if (guild) {
      await refreshSocialData();
    }
    return guild;
  };

  const handleJoinGuild = async (guildId: string) => {
    if (!user) return false;
    
    // Check if user is already in a guild
    if (userGuild) {
      toast({
        title: "Already in a guild",
        description: "Leave your current guild before joining another one",
        variant: "destructive"
      });
      return false;
    }
    
    const success = await joinGuild(user.id, guildId);
    if (success) {
      await refreshSocialData();
    }
    return success;
  };

  const handleLeaveGuild = async () => {
    if (!user || !userGuild) return false;
    
    const success = await leaveGuild(user.id, userGuild.id, userGuild.name);
    if (success) {
      await refreshSocialData();
    }
    return success;
  };

  // Friend-related handlers
  const handleSendFriendRequest = async (username: string) => {
    if (!user) return false;
    
    const success = await sendFriendRequest(user.id, username);
    if (success) {
      await refreshSocialData();
    }
    return success;
  };

  const handleAcceptFriendRequest = async (friendshipId: string) => {
    if (!user) return false;
    
    const success = await acceptFriendRequest(user.id, friendshipId);
    if (success) {
      await refreshSocialData();
    }
    return success;
  };

  const handleRejectFriendRequest = async (friendshipId: string) => {
    if (!user) return false;
    
    const success = await rejectFriendRequest(user.id, friendshipId);
    if (success) {
      await refreshSocialData();
    }
    return success;
  };

  const handleRemoveFriend = async (friendshipId: string) => {
    if (!user) return false;
    
    const success = await removeFriend(user.id, friendshipId);
    if (success) {
      await refreshSocialData();
    }
    return success;
  };

  return (
    <SocialContext.Provider
      value={{
        userParty,
        userGuild,
        friends,
        pendingFriends,
        socialStats,
        createParty: handleCreateParty,
        joinPartyWithCode: handleJoinPartyWithCode,
        leaveParty: handleLeaveParty,
        createGuild: handleCreateGuild,
        joinGuild: handleJoinGuild,
        leaveGuild: handleLeaveGuild,
        sendFriendRequest: handleSendFriendRequest,
        acceptFriendRequest: handleAcceptFriendRequest,
        rejectFriendRequest: handleRejectFriendRequest,
        removeFriend: handleRemoveFriend,
        refreshSocialData,
        isLoading
      }}
    >
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
