
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

// Type definitions
export interface Party {
  id: string;
  name: string;
  description: string | null;
  invite_code: string;
  created_at: string;
  updated_at: string;
  member_count?: number;
  is_leader?: boolean;
}

export interface Guild {
  id: string;
  name: string;
  description: string | null;
  motto: string | null;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
  member_count?: number;
  user_role?: string;
}

export interface Friend {
  id: string;
  user_id: string;
  friend_id: string;
  status: string;
  created_at: string;
  username?: string;
  avatar_url?: string;
}

export interface SocialStats {
  partyCount: number;
  guildCount: number;
  friendCount: number;
  achievementCount: number;
}

// Context type
interface SocialContextType {
  userParty: Party | null;
  userGuild: Guild | null;
  friends: Friend[];
  pendingFriends: Friend[];
  socialStats: SocialStats;
  createParty: (name: string, description?: string) => Promise<Party | null>;
  joinPartyWithCode: (inviteCode: string) => Promise<boolean>;
  leaveParty: () => Promise<boolean>;
  createGuild: (name: string, description?: string, motto?: string) => Promise<Guild | null>;
  joinGuild: (guildId: string) => Promise<boolean>;
  leaveGuild: () => Promise<boolean>;
  sendFriendRequest: (username: string) => Promise<boolean>;
  acceptFriendRequest: (friendshipId: string) => Promise<boolean>;
  rejectFriendRequest: (friendshipId: string) => Promise<boolean>;
  removeFriend: (friendshipId: string) => Promise<boolean>;
  refreshSocialData: () => Promise<void>;
  isLoading: boolean;
}

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
      const { data: partyMember } = await supabase
        .from('party_members')
        .select('*, party:parties(*)')
        .eq('user_id', user.id)
        .single();

      if (partyMember) {
        const party = partyMember.party as Party;
        
        // Get member count
        const { count } = await supabase
          .from('party_members')
          .select('*', { count: 'exact', head: true })
          .eq('party_id', party.id);
          
        setUserParty({
          ...party,
          member_count: count || 0,
          is_leader: partyMember.is_leader
        });
      } else {
        setUserParty(null);
      }

      // Fetch user's guild
      const { data: guildMember } = await supabase
        .from('guild_members')
        .select('*, guild:guilds(*)')
        .eq('user_id', user.id)
        .single();

      if (guildMember) {
        const guild = guildMember.guild as Guild;
        
        // Get member count
        const { count } = await supabase
          .from('guild_members')
          .select('*', { count: 'exact', head: true })
          .eq('guild_id', guild.id);
          
        setUserGuild({
          ...guild,
          member_count: count || 0,
          user_role: guildMember.role
        });
      } else {
        setUserGuild(null);
      }

      // Fetch friends
      const { data: friendships } = await supabase
        .from('friendships')
        .select(`
          id, 
          user_id, 
          friend_id, 
          status, 
          created_at, 
          user_profile:profiles!friendships_user_id_fkey(username, avatar_url),
          friend_profile:profiles!friendships_friend_id_fkey(username, avatar_url)
        `)
        .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`);

      if (friendships) {
        const acceptedFriends: Friend[] = [];
        const pending: Friend[] = [];
        
        friendships.forEach(friendship => {
          // Determine if the current user is the requester or recipient
          const isRequester = friendship.user_id === user.id;
          const friendProfile = isRequester ? friendship.friend_profile : friendship.user_profile;
          
          const enhancedFriendship: Friend = {
            id: friendship.id,
            user_id: friendship.user_id,
            friend_id: friendship.friend_id,
            status: friendship.status,
            created_at: friendship.created_at,
            username: friendProfile.username,
            avatar_url: friendProfile.avatar_url
          };
          
          if (friendship.status === 'accepted') {
            acceptedFriends.push(enhancedFriendship);
          } else if (friendship.status === 'pending') {
            pending.push(enhancedFriendship);
          }
        });
        
        setFriends(acceptedFriends);
        setPendingFriends(pending);
      }

      // Update social stats
      const { data: userAchievements, count: achievementCount } = await supabase
        .from('user_achievements')
        .select('*', { count: 'exact' })
        .eq('user_id', user.id);

      setSocialStats({
        partyCount: userParty ? 1 : 0,
        guildCount: userGuild ? 1 : 0,
        friendCount: friends.length,
        achievementCount: achievementCount || 0
      });
    } catch (error) {
      console.error('Error fetching social data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createParty = async (name: string, description?: string): Promise<Party | null> => {
    if (!user) return null;
    
    try {
      // Check if user is already in a party
      if (userParty) {
        toast({
          title: "Already in a party",
          description: "Leave your current party before creating a new one",
          variant: "destructive"
        });
        return null;
      }
      
      // Generate a random invite code
      const inviteCode = Math.random().toString(36).substring(2, 10).toUpperCase();
      
      // Create the party
      const { data: newParty, error } = await supabase
        .from('parties')
        .insert([{ 
          name, 
          description, 
          invite_code: inviteCode 
        }])
        .select()
        .single();
        
      if (error) throw error;
      
      // Add user as leader
      const { error: memberError } = await supabase
        .from('party_members')
        .insert([{
          party_id: newParty.id,
          user_id: user.id,
          is_leader: true
        }]);
        
      if (memberError) throw memberError;
      
      // Refresh social data
      await refreshSocialData();
      
      toast({
        title: "Party created!",
        description: `You've created the party: ${name}`
      });
      
      return newParty;
    } catch (error: any) {
      toast({
        title: "Failed to create party",
        description: error.message,
        variant: "destructive"
      });
      return null;
    }
  };

  const joinPartyWithCode = async (inviteCode: string): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // Check if user is already in a party
      if (userParty) {
        toast({
          title: "Already in a party",
          description: "Leave your current party before joining another one",
          variant: "destructive"
        });
        return false;
      }
      
      // Find the party with this invite code
      const { data: party, error } = await supabase
        .from('parties')
        .select('*')
        .eq('invite_code', inviteCode)
        .single();
        
      if (error) throw error;
      
      // Check if party exists
      if (!party) {
        toast({
          title: "Invalid invite code",
          description: "No party found with this invite code",
          variant: "destructive"
        });
        return false;
      }
      
      // Add user to party
      const { error: memberError } = await supabase
        .from('party_members')
        .insert([{
          party_id: party.id,
          user_id: user.id,
          is_leader: false
        }]);
        
      if (memberError) throw memberError;
      
      // Refresh social data
      await refreshSocialData();
      
      toast({
        title: "Joined party!",
        description: `You've joined the party: ${party.name}`
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Failed to join party",
        description: error.message,
        variant: "destructive"
      });
      return false;
    }
  };

  const leaveParty = async (): Promise<boolean> => {
    if (!user || !userParty) return false;
    
    try {
      // Delete the membership
      const { error } = await supabase
        .from('party_members')
        .delete()
        .eq('user_id', user.id)
        .eq('party_id', userParty.id);
        
      if (error) throw error;
      
      // Refresh social data
      await refreshSocialData();
      
      toast({
        title: "Left party",
        description: `You've left the party: ${userParty.name}`
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Failed to leave party",
        description: error.message,
        variant: "destructive"
      });
      return false;
    }
  };

  const createGuild = async (name: string, description?: string, motto?: string): Promise<Guild | null> => {
    if (!user) return null;
    
    try {
      // Check if user is already in a guild
      if (userGuild) {
        toast({
          title: "Already in a guild",
          description: "Leave your current guild before creating a new one",
          variant: "destructive"
        });
        return null;
      }
      
      // Create the guild
      const { data: newGuild, error } = await supabase
        .from('guilds')
        .insert([{ 
          name, 
          description, 
          motto
        }])
        .select()
        .single();
        
      if (error) throw error;
      
      // Add user as leader
      const { error: memberError } = await supabase
        .from('guild_members')
        .insert([{
          guild_id: newGuild.id,
          user_id: user.id,
          role: 'leader'
        }]);
        
      if (memberError) throw memberError;
      
      // Refresh social data
      await refreshSocialData();
      
      toast({
        title: "Guild created!",
        description: `You've created the guild: ${name}`
      });
      
      return newGuild;
    } catch (error: any) {
      toast({
        title: "Failed to create guild",
        description: error.message,
        variant: "destructive"
      });
      return null;
    }
  };

  const joinGuild = async (guildId: string): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // Check if user is already in a guild
      if (userGuild) {
        toast({
          title: "Already in a guild",
          description: "Leave your current guild before joining another one",
          variant: "destructive"
        });
        return false;
      }
      
      // Add user to guild
      const { error: memberError } = await supabase
        .from('guild_members')
        .insert([{
          guild_id: guildId,
          user_id: user.id,
          role: 'member'
        }]);
        
      if (memberError) throw memberError;
      
      // Refresh social data
      await refreshSocialData();
      
      toast({
        title: "Joined guild!",
        description: "You've joined a new guild"
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Failed to join guild",
        description: error.message,
        variant: "destructive"
      });
      return false;
    }
  };

  const leaveGuild = async (): Promise<boolean> => {
    if (!user || !userGuild) return false;
    
    try {
      // Delete the membership
      const { error } = await supabase
        .from('guild_members')
        .delete()
        .eq('user_id', user.id)
        .eq('guild_id', userGuild.id);
        
      if (error) throw error;
      
      // Refresh social data
      await refreshSocialData();
      
      toast({
        title: "Left guild",
        description: `You've left the guild: ${userGuild.name}`
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Failed to leave guild",
        description: error.message,
        variant: "destructive"
      });
      return false;
    }
  };

  const sendFriendRequest = async (username: string): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // Find the user by username
      const { data: targetUser, error: userError } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username)
        .single();
        
      if (userError || !targetUser) {
        toast({
          title: "User not found",
          description: "No user found with this username",
          variant: "destructive"
        });
        return false;
      }
      
      // Can't send friend request to yourself
      if (targetUser.id === user.id) {
        toast({
          title: "Invalid request",
          description: "You can't send a friend request to yourself",
          variant: "destructive"
        });
        return false;
      }
      
      // Check if friendship already exists
      const { data: existingFriendship, error: friendshipError } = await supabase
        .from('friendships')
        .select('*')
        .or(`and(user_id.eq.${user.id},friend_id.eq.${targetUser.id}),and(user_id.eq.${targetUser.id},friend_id.eq.${user.id})`)
        .maybeSingle();
        
      if (existingFriendship) {
        toast({
          title: "Friend request exists",
          description: "You already have a pending or accepted friendship with this user",
          variant: "destructive"
        });
        return false;
      }
      
      // Create the friendship request
      const { error } = await supabase
        .from('friendships')
        .insert([{
          user_id: user.id,
          friend_id: targetUser.id,
          status: 'pending'
        }]);
        
      if (error) throw error;
      
      // Refresh social data
      await refreshSocialData();
      
      toast({
        title: "Friend request sent",
        description: `Your friend request to ${username} has been sent`
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Failed to send friend request",
        description: error.message,
        variant: "destructive"
      });
      return false;
    }
  };

  const acceptFriendRequest = async (friendshipId: string): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // Update the friendship status
      const { error } = await supabase
        .from('friendships')
        .update({ status: 'accepted' })
        .eq('id', friendshipId)
        .eq('friend_id', user.id)
        .eq('status', 'pending');
        
      if (error) throw error;
      
      // Refresh social data
      await refreshSocialData();
      
      toast({
        title: "Friend request accepted",
        description: "You are now friends with this user"
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Failed to accept friend request",
        description: error.message,
        variant: "destructive"
      });
      return false;
    }
  };

  const rejectFriendRequest = async (friendshipId: string): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // Delete the friendship
      const { error } = await supabase
        .from('friendships')
        .delete()
        .eq('id', friendshipId)
        .eq('friend_id', user.id)
        .eq('status', 'pending');
        
      if (error) throw error;
      
      // Refresh social data
      await refreshSocialData();
      
      toast({
        title: "Friend request rejected",
        description: "The friend request has been rejected"
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Failed to reject friend request",
        description: error.message,
        variant: "destructive"
      });
      return false;
    }
  };

  const removeFriend = async (friendshipId: string): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // Delete the friendship
      const { error } = await supabase
        .from('friendships')
        .delete()
        .eq('id', friendshipId)
        .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`);
        
      if (error) throw error;
      
      // Refresh social data
      await refreshSocialData();
      
      toast({
        title: "Friend removed",
        description: "This user has been removed from your friends"
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Failed to remove friend",
        description: error.message,
        variant: "destructive"
      });
      return false;
    }
  };

  return (
    <SocialContext.Provider
      value={{
        userParty,
        userGuild,
        friends,
        pendingFriends,
        socialStats,
        createParty,
        joinPartyWithCode,
        leaveParty,
        createGuild,
        joinGuild,
        leaveGuild,
        sendFriendRequest,
        acceptFriendRequest,
        rejectFriendRequest,
        removeFriend,
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
