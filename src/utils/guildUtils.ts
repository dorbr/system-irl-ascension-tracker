
import { supabase } from "@/integrations/supabase/client";
import { Guild } from "@/types/social";
import { toast } from "@/hooks/use-toast";

export async function createGuild(
  userId: string,
  name: string,
  description?: string,
  motto?: string
): Promise<Guild | null> {
  try {
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
        user_id: userId,
        role: 'leader'
      }]);
      
    if (memberError) throw memberError;
    
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
}

export async function joinGuild(
  userId: string,
  guildId: string
): Promise<boolean> {
  try {
    // Add user to guild
    const { error: memberError } = await supabase
      .from('guild_members')
      .insert([{
        guild_id: guildId,
        user_id: userId,
        role: 'member'
      }]);
      
    if (memberError) throw memberError;
    
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
}

export async function leaveGuild(
  userId: string,
  guildId: string,
  guildName: string
): Promise<boolean> {
  try {
    // Delete the membership
    const { error } = await supabase
      .from('guild_members')
      .delete()
      .eq('user_id', userId)
      .eq('guild_id', guildId);
      
    if (error) throw error;
    
    toast({
      title: "Left guild",
      description: `You've left the guild: ${guildName}`
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
}

export async function fetchUserGuild(userId: string): Promise<Guild | null> {
  try {
    const { data: guildMember } = await supabase
      .from('guild_members')
      .select('*, guild:guilds(*)')
      .eq('user_id', userId)
      .single();

    if (guildMember) {
      const guild = guildMember.guild as Guild;
      
      // Get member count
      const { count } = await supabase
        .from('guild_members')
        .select('*', { count: 'exact', head: true })
        .eq('guild_id', guild.id);
        
      return {
        ...guild,
        member_count: count || 0,
        user_role: guildMember.role
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching user guild:', error);
    return null;
  }
}
