import { useState } from "react";
import { Friend } from "@/types/social";
import { 
  sendFriendRequest as sendFriendRequestUtil,
  acceptFriendRequest as acceptFriendRequestUtil,
  rejectFriendRequest as rejectFriendRequestUtil,
  removeFriend as removeFriendUtil,
  fetchFriendships as fetchFriendshipsUtil
} from "@/utils/friends";
import { toast } from "@/hooks/use-toast";

export function useSocialFriends(userId: string | undefined, refreshCallback: () => Promise<void>) {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [pendingFriends, setPendingFriends] = useState<Friend[]>([]);
  
  const fetchFriendships = async () => {
    if (!userId) return { friends: [], pendingFriends: [] };
    
    try {
      const { friends: acceptedFriends, pendingFriends: pendingFriendsList } = 
        await fetchFriendshipsUtil(userId);
      
      setFriends(acceptedFriends);
      setPendingFriends(pendingFriendsList);
      
      return { friends: acceptedFriends, pendingFriends: pendingFriendsList };
    } catch (error) {
      console.error('Error fetching friendships:', error);
      return { friends: [], pendingFriends: [] };
    }
  };

  const sendFriendRequest = async (username: string) => {
    if (!userId) return false;
    
    const success = await sendFriendRequestUtil(userId, username);
    if (success) {
      await refreshCallback();
    }
    return success;
  };

  const acceptFriendRequest = async (friendshipId: string) => {
    if (!userId) return false;
    
    const success = await acceptFriendRequestUtil(userId, friendshipId);
    if (success) {
      await refreshCallback();
    }
    return success;
  };

  const rejectFriendRequest = async (friendshipId: string) => {
    if (!userId) return false;
    
    const success = await rejectFriendRequestUtil(userId, friendshipId);
    if (success) {
      await refreshCallback();
    }
    return success;
  };

  const removeFriend = async (friendshipId: string) => {
    if (!userId) return false;
    
    const success = await removeFriendUtil(userId, friendshipId);
    if (success) {
      await refreshCallback();
    }
    return success;
  };
  
  return {
    friends,
    pendingFriends,
    setFriends,
    setPendingFriends,
    fetchFriendships,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    removeFriend
  };
}
