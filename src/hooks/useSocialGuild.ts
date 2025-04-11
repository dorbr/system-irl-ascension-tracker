
import { useState } from "react";
import { Guild } from "@/types/social";
import { 
  createGuild as createGuildUtil,
  joinGuild as joinGuildUtil,
  leaveGuild as leaveGuildUtil,
  fetchUserGuild as fetchUserGuildUtil
} from "@/utils/guildUtils";
import { toast } from "@/hooks/use-toast";

export function useSocialGuild(userId: string | undefined, refreshCallback: () => Promise<void>) {
  const [userGuild, setUserGuild] = useState<Guild | null>(null);
  
  const fetchUserGuild = async () => {
    if (!userId) return null;
    
    try {
      const guild = await fetchUserGuildUtil(userId);
      setUserGuild(guild);
      return guild;
    } catch (error) {
      console.error('Error fetching user guild:', error);
      return null;
    }
  };

  const createGuild = async (name: string, description?: string, motto?: string) => {
    if (!userId) return null;
    
    // Check if user is already in a guild
    if (userGuild) {
      toast({
        title: "Already in a guild",
        description: "Leave your current guild before creating a new one",
        variant: "destructive"
      });
      return null;
    }
    
    const guild = await createGuildUtil(userId, name, description, motto);
    if (guild) {
      await refreshCallback();
    }
    return guild;
  };

  const joinGuild = async (guildId: string) => {
    if (!userId) return false;
    
    // Check if user is already in a guild
    if (userGuild) {
      toast({
        title: "Already in a guild",
        description: "Leave your current guild before joining another one",
        variant: "destructive"
      });
      return false;
    }
    
    const success = await joinGuildUtil(userId, guildId);
    if (success) {
      await refreshCallback();
    }
    return success;
  };

  const leaveGuild = async () => {
    if (!userId || !userGuild) return false;
    
    const success = await leaveGuildUtil(userId, userGuild.id, userGuild.name);
    if (success) {
      await refreshCallback();
    }
    return success;
  };
  
  return {
    userGuild,
    setUserGuild,
    fetchUserGuild,
    createGuild,
    joinGuild,
    leaveGuild
  };
}
