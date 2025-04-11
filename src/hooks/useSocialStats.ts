
import { useState } from "react";
import { SocialStats } from "@/types/social";
import { fetchSocialStats as fetchSocialStatsUtil } from "@/utils/socialStatsUtils";

export function useSocialStats(userId: string | undefined) {
  const [socialStats, setSocialStats] = useState<SocialStats>({
    partyCount: 0,
    guildCount: 0,
    friendCount: 0,
    achievementCount: 0
  });
  
  const fetchSocialStats = async (
    partyCount: number,
    guildCount: number,
    friendCount: number
  ) => {
    if (!userId) return socialStats;
    
    try {
      const stats = await fetchSocialStatsUtil(
        userId, 
        partyCount, 
        guildCount,
        friendCount
      );
      
      setSocialStats(stats);
      return stats;
    } catch (error) {
      console.error('Error fetching social stats:', error);
      return socialStats;
    }
  };
  
  return {
    socialStats,
    setSocialStats,
    fetchSocialStats
  };
}
