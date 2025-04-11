
import { supabase } from "@/integrations/supabase/client";
import { Party } from "@/types/social";
import { toast } from "@/hooks/use-toast";

export async function createParty(
  userId: string,
  name: string,
  description?: string
): Promise<Party | null> {
  try {
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
        user_id: userId,
        is_leader: true
      }]);
      
    if (memberError) throw memberError;
    
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
}

export async function joinPartyWithCode(
  userId: string,
  inviteCode: string
): Promise<boolean> {
  try {
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
        user_id: userId,
        is_leader: false
      }]);
      
    if (memberError) throw memberError;
    
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
}

export async function leaveParty(
  userId: string,
  partyId: string,
  partyName: string
): Promise<boolean> {
  try {
    // Delete the membership
    const { error } = await supabase
      .from('party_members')
      .delete()
      .eq('user_id', userId)
      .eq('party_id', partyId);
      
    if (error) throw error;
    
    toast({
      title: "Left party",
      description: `You've left the party: ${partyName}`
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
}

export async function fetchUserParty(userId: string): Promise<Party | null> {
  try {
    const { data: partyMember } = await supabase
      .from('party_members')
      .select('*, party:parties(*)')
      .eq('user_id', userId)
      .single();

    if (partyMember) {
      const party = partyMember.party as Party;
      
      // Get member count
      const { count } = await supabase
        .from('party_members')
        .select('*', { count: 'exact', head: true })
        .eq('party_id', party.id);
        
      return {
        ...party,
        member_count: count || 0,
        is_leader: partyMember.is_leader
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching user party:', error);
    return null;
  }
}
