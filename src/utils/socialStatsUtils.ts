
import { supabase } from "@/integrations/supabase/client";
import { SocialStats } from "@/types/social";

export async function fetchSocialStats(
  userId: string,
  partyCount: number,
  guildCount: number,
  friendCount: number
): Promise<SocialStats> {
  try {
    const { count: achievementCount } = await supabase
      .from('user_achievements')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    return {
      partyCount,
      guildCount,
      friendCount,
      achievementCount: achievementCount || 0
    };
  } catch (error) {
    console.error('Error fetching social stats:', error);
    return {
      partyCount,
      guildCount,
      friendCount,
      achievementCount: 0
    };
  }
}
