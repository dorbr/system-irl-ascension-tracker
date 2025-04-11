
import { supabase } from "@/integrations/supabase/client";
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
