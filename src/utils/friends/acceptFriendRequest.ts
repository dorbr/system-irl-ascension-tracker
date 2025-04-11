
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

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
