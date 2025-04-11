
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

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
