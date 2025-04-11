
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

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
