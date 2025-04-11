
import React, { createContext, useContext, useState, useEffect } from "react";

export interface Stat {
  name: string;
  value: number;
  abbreviation: string;
  color: string;
}

export interface UserClass {
  name: string;
  level: number;
  nextClassOptions?: string[];
}

export interface UserData {
  name: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  class: UserClass;
  stats: Stat[];
  gold: number;
  mana: number;
  netWorth: number;
}

const defaultUserData: UserData = {
  name: "Adventurer",
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  class: {
    name: "Novice",
    level: 1,
    nextClassOptions: ["Student", "Apprentice", "Explorer"],
  },
  stats: [
    { name: "Strength", value: 5, abbreviation: "STR", color: "#EF4444" },
    { name: "Agility", value: 5, abbreviation: "AGI", color: "#10B981" },
    { name: "Intelligence", value: 5, abbreviation: "INT", color: "#3B82F6" },
    { name: "Perception", value: 5, abbreviation: "PER", color: "#8B5CF6" },
    { name: "Vitality", value: 5, abbreviation: "VIT", color: "#F59E0B" },
    { name: "Sense", value: 5, abbreviation: "SEN", color: "#EC4899" },
    { name: "Charisma", value: 5, abbreviation: "CHA", color: "#D946EF" },
    { name: "Luck", value: 5, abbreviation: "LUK", color: "#F97316" },
  ],
  gold: 100,
  mana: 50,
  netWorth: 50,
};

interface UserContextType {
  userData: UserData;
  updateUserXp: (amount: number) => void;
  updateUserStat: (statName: string, amount: number) => void;
  updateResources: (gold: number, mana: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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

  return (
    <UserContext.Provider
      value={{ userData, updateUserXp, updateUserStat, updateResources }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
