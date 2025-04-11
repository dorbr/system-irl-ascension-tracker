
import { useState } from "react";
import { Party } from "@/types/social";
import { 
  createParty as createPartyUtil,
  joinPartyWithCode as joinPartyWithCodeUtil,
  leaveParty as leavePartyUtil,
  fetchUserParty as fetchUserPartyUtil
} from "@/utils/partyUtils";
import { toast } from "@/hooks/use-toast";

export function useSocialParty(userId: string | undefined, refreshCallback: () => Promise<void>) {
  const [userParty, setUserParty] = useState<Party | null>(null);
  
  const fetchUserParty = async () => {
    if (!userId) return null;
    
    try {
      const party = await fetchUserPartyUtil(userId);
      setUserParty(party);
      return party;
    } catch (error) {
      console.error('Error fetching user party:', error);
      return null;
    }
  };

  const createParty = async (name: string, description?: string) => {
    if (!userId) return null;
    
    // Check if user is already in a party
    if (userParty) {
      toast({
        title: "Already in a party",
        description: "Leave your current party before creating a new one",
        variant: "destructive"
      });
      return null;
    }
    
    const party = await createPartyUtil(userId, name, description);
    if (party) {
      await refreshCallback();
    }
    return party;
  };

  const joinPartyWithCode = async (inviteCode: string) => {
    if (!userId) return false;
    
    // Check if user is already in a party
    if (userParty) {
      toast({
        title: "Already in a party",
        description: "Leave your current party before joining another one",
        variant: "destructive"
      });
      return false;
    }
    
    const success = await joinPartyWithCodeUtil(userId, inviteCode);
    if (success) {
      await refreshCallback();
    }
    return success;
  };

  const leaveParty = async () => {
    if (!userId || !userParty) return false;
    
    const success = await leavePartyUtil(userId, userParty.id, userParty.name);
    if (success) {
      await refreshCallback();
    }
    return success;
  };
  
  return {
    userParty,
    setUserParty,
    fetchUserParty,
    createParty,
    joinPartyWithCode,
    leaveParty
  };
}
