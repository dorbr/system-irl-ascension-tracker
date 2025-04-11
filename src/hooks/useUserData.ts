
import { useState, useEffect } from "react";
import { UserData, defaultUserData, Stat } from "@/types/user";

export const useUserData = () => {
  const [userData, setUserData] = useState<UserData>(() => {
    const savedData = localStorage.getItem("system_irl_user");
    
    // If there's saved data, check if it has all 8 stats and fix if needed
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      
      // Check if stats array has all 8 stats
      if (parsedData.stats && parsedData.stats.length < 8) {
        console.log("Fixing missing stats in saved user data");
        
        // Get existing stat names
        const existingStatNames = parsedData.stats.map((s: Stat) => s.name);
        
        // Add missing stats from the default user data
        const missingStats = defaultUserData.stats.filter(
          (stat) => !existingStatNames.includes(stat.name)
        );
        
        parsedData.stats = [...parsedData.stats, ...missingStats];
      }
      
      return parsedData;
    }
    
    return defaultUserData;
  });

  useEffect(() => {
    localStorage.setItem("system_irl_user", JSON.stringify(userData));
  }, [userData]);

  const updateUserXp = (amount: number) => {
    setUserData((prev) => {
      const newXp = prev.xp + amount;
      let newLevel = prev.level;
      let newXpToNextLevel = prev.xpToNextLevel;

      // Level up if XP exceeds threshold
      if (newXp >= prev.xpToNextLevel) {
        newLevel += 1;
        newXpToNextLevel = Math.floor(prev.xpToNextLevel * 1.5);
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        xpToNextLevel: newXpToNextLevel,
      };
    });
  };

  const updateUserStat = (statName: string, amount: number) => {
    setUserData((prev) => {
      const updatedStats = prev.stats.map((stat) =>
        stat.name === statName ? { ...stat, value: stat.value + amount } : stat
      );
      
      return {
        ...prev,
        stats: updatedStats,
      };
    });
  };

  const updateResources = (gold: number, mana: number) => {
    setUserData((prev) => {
      const newGold = prev.gold + gold;
      const newMana = prev.mana + mana;
      const newNetWorth = newGold - newMana;
      
      return {
        ...prev,
        gold: newGold,
        mana: newMana,
        netWorth: newNetWorth,
      };
    });
  };

  const updateUserName = (name: string) => {
    setUserData((prev) => ({
      ...prev,
      name,
    }));
  };

  return {
    userData,
    updateUserXp,
    updateUserStat,
    updateResources,
    updateUserName
  };
};
