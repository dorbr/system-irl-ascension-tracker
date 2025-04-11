
import { supabase } from "@/integrations/supabase/client";
import { Friend } from "@/types/social";
import { toast } from "@/hooks/use-toast";

export async function sendFriendRequest(
  userId: string,
  username: string
): Promise<boolean> {
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
    if (targetUser.id === userId) {
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
      .or(`and(user_id.eq.${userId},friend_id.eq.${targetUser.id}),and(user_id.eq.${targetUser.id},friend_id.eq.${userId})`)
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
        user_id: userId,
        friend_id: targetUser.id,
        status: 'pending'
      }]);
      
    if (error) throw error;
    
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
}

export async function acceptFriendRequest(
  userId: string,
  friendshipId: string
): Promise<boolean> {
  try {
    // Update the friendship status
    const { error } = await supabase
      .from('friendships')
      .update({ status: 'accepted' })
      .eq('id', friendshipId)
      .eq('friend_id', userId)
      .eq('status', 'pending');
      
    if (error) throw error;
    
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
}

export async function rejectFriendRequest(
  userId: string,
  friendshipId: string
): Promise<boolean> {
  try {
    // Delete the friendship
    const { error } = await supabase
      .from('friendships')
      .delete()
      .eq('id', friendshipId)
      .eq('friend_id', userId)
      .eq('status', 'pending');
      
    if (error) throw error;
    
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
}

export async function removeFriend(
  userId: string,
  friendshipId: string
): Promise<boolean> {
  try {
    // Delete the friendship
    const { error } = await supabase
      .from('friendships')
      .delete()
      .eq('id', friendshipId)
      .or(`user_id.eq.${userId},friend_id.eq.${userId}`);
      
    if (error) throw error;
    
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
}

export async function fetchFriendships(userId: string): Promise<{
  friends: Friend[],
  pendingFriends: Friend[]
}> {
  try {
    const { data: friendships } = await supabase
      .from('friendships')
      .select('id, user_id, friend_id, status, created_at')
      .or(`user_id.eq.${userId},friend_id.eq.${userId}`);

    if (!friendships || friendships.length === 0) {
      return { friends: [], pendingFriends: [] };
    }

    const acceptedFriends: Friend[] = [];
    const pendingFriends: Friend[] = [];
    
    // Process each friendship to get profile data
    for (const friendship of friendships) {
      // Determine if the current user is the requester or recipient
      const isRequester = friendship.user_id === userId;
      const profileId = isRequester ? friendship.friend_id : friendship.user_id;
      
      // Get the friend's profile data
      const { data: profileData } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', profileId)
        .single();
      
      const enhancedFriendship: Friend = {
        id: friendship.id,
        user_id: friendship.user_id,
        friend_id: friendship.friend_id,
        status: friendship.status,
        created_at: friendship.created_at,
        username: profileData?.username || null,
        avatar_url: profileData?.avatar_url || null
      };
      
      if (friendship.status === 'accepted') {
        acceptedFriends.push(enhancedFriendship);
      } else if (friendship.status === 'pending') {
        pendingFriends.push(enhancedFriendship);
      }
    }

    return {
      friends: acceptedFriends,
      pendingFriends: pendingFriends
    };
  } catch (error) {
    console.error('Error fetching friendships:', error);
    return { friends: [], pendingFriends: [] };
  }
}
