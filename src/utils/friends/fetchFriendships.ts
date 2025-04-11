
import { supabase } from "@/integrations/supabase/client";
import { Friend } from "@/types/social";

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
