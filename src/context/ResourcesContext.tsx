
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { 
  ResourceEntry, 
  Artifact, 
  PassiveBuff, 
  TimeRange, 
  ResourcesSummary,
  ResourcesHistoryData,
  CategoryBreakdown,
  ResourceType,
  ResourceCategory
} from "@/types/resources";
import { useUser } from "@/context/UserContext";

// Default data
const defaultResourceEntries: ResourceEntry[] = [
  {
    id: "entry-1",
    type: "gold",
    amount: 2500,
    category: "salary",
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    notes: "Monthly salary",
    tags: ["income", "work"]
  },
  {
    id: "entry-2",
    type: "mana",
    amount: 800,
    category: "housing",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    notes: "Rent payment",
    tags: ["expense", "monthly"]
  },
  {
    id: "entry-3",
    type: "mana",
    amount: 200,
    category: "food",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    notes: "Grocery shopping",
    tags: ["expense", "essential"]
  },
  {
    id: "entry-4",
    type: "gold",
    amount: 300,
    category: "freelance",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    notes: "Freelance project",
    tags: ["income", "extra"]
  }
];

const defaultArtifacts: Artifact[] = [
  {
    id: "artifact-1",
    name: "Laptop",
    value: 1200,
    description: "Work laptop",
    acquisitionDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "artifact-2",
    name: "Smartphone",
    value: 800,
    description: "Latest model",
    acquisitionDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const defaultBuffs: PassiveBuff[] = [
  {
    id: "buff-1",
    name: "Digital Product",
    valuePerMonth: 150,
    source: "Online course",
    startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    active: true
  }
];

interface ResourcesContextType {
  // Data
  resourceEntries: ResourceEntry[];
  artifacts: Artifact[];
  passiveBuffs: PassiveBuff[];
  timeRange: TimeRange;
  
  // Summary and calculations
  summary: ResourcesSummary;
  historyData: ResourcesHistoryData;
  categoryBreakdown: CategoryBreakdown[];
  
  // Actions
  setTimeRange: (range: TimeRange) => void;
  addResourceEntry: (entry: Omit<ResourceEntry, "id">) => void;
  addArtifact: (artifact: Omit<Artifact, "id">) => void;
  addPassiveBuff: (buff: Omit<PassiveBuff, "id">) => void;
  updateResourceEntry: (id: string, entry: Partial<ResourceEntry>) => void;
  updateArtifact: (id: string, artifact: Partial<Artifact>) => void;
  updatePassiveBuff: (id: string, buff: Partial<PassiveBuff>) => void;
  deleteResourceEntry: (id: string) => void;
  deleteArtifact: (id: string) => void;
  deletePassiveBuff: (id: string) => void;
}

const ResourcesContext = createContext<ResourcesContextType | undefined>(undefined);

export const ResourcesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { updateUserXp, updateUserStat, updateResources } = useUser();
  
  // Data states
  const [resourceEntries, setResourceEntries] = useState<ResourceEntry[]>(() => {
    const savedEntries = localStorage.getItem("system_irl_resource_entries");
    return savedEntries ? JSON.parse(savedEntries) : defaultResourceEntries;
  });
  
  const [artifacts, setArtifacts] = useState<Artifact[]>(() => {
    const savedArtifacts = localStorage.getItem("system_irl_artifacts");
    return savedArtifacts ? JSON.parse(savedArtifacts) : defaultArtifacts;
  });
  
  const [passiveBuffs, setPassiveBuffs] = useState<PassiveBuff[]>(() => {
    const savedBuffs = localStorage.getItem("system_irl_passive_buffs");
    return savedBuffs ? JSON.parse(savedBuffs) : defaultBuffs;
  });
  
  const [timeRange, setTimeRange] = useState<TimeRange>("monthly");
  
  // Persist data to localStorage
  useEffect(() => {
    localStorage.setItem("system_irl_resource_entries", JSON.stringify(resourceEntries));
  }, [resourceEntries]);
  
  useEffect(() => {
    localStorage.setItem("system_irl_artifacts", JSON.stringify(artifacts));
  }, [artifacts]);
  
  useEffect(() => {
    localStorage.setItem("system_irl_passive_buffs", JSON.stringify(passiveBuffs));
  }, [passiveBuffs]);
  
  // Calculate summary based on time range
  const calculateSummary = (): ResourcesSummary => {
    const now = new Date();
    let startDate: Date;
    
    switch (timeRange) {
      case "weekly":
        startDate = new Date(now);
        startDate.setDate(startDate.getDate() - 7);
        break;
      case "monthly":
        startDate = new Date(now);
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case "allTime":
      default:
        startDate = new Date(0); // Beginning of time
        break;
    }
    
    const filteredEntries = resourceEntries.filter(
      entry => new Date(entry.date) >= startDate
    );
    
    const totalGold = filteredEntries
      .filter(entry => entry.type === "gold")
      .reduce((sum, entry) => sum + entry.amount, 0);
    
    const totalMana = filteredEntries
      .filter(entry => entry.type === "mana")
      .reduce((sum, entry) => sum + entry.amount, 0);
    
    const totalPassiveBuffs = passiveBuffs
      .filter(buff => buff.active)
      .reduce((sum, buff) => sum + buff.valuePerMonth, 0);
    
    const totalArtifactsValue = artifacts
      .reduce((sum, artifact) => sum + artifact.value, 0);
    
    return {
      totalGold,
      totalMana,
      netWorth: totalGold - totalMana,
      totalPassiveBuffs,
      totalArtifactsValue
    };
  };
  
  // Calculate history data for charts
  const calculateHistoryData = (): ResourcesHistoryData => {
    const now = new Date();
    let dateLabels: Date[] = [];
    let startDate: Date;
    let interval: number;
    
    switch (timeRange) {
      case "weekly":
        startDate = new Date(now);
        startDate.setDate(startDate.getDate() - 7);
        interval = 1; // 1 day
        for (let i = 0; i < 7; i++) {
          const date = new Date(startDate);
          date.setDate(date.getDate() + i);
          dateLabels.push(date);
        }
        break;
      case "monthly":
        startDate = new Date(now);
        startDate.setMonth(startDate.getMonth() - 1);
        interval = 7; // 1 week
        for (let i = 0; i < 5; i++) {
          const date = new Date(startDate);
          date.setDate(date.getDate() + (i * 7));
          dateLabels.push(date);
        }
        break;
      case "allTime":
      default:
        startDate = new Date(now);
        startDate.setFullYear(startDate.getFullYear() - 1);
        interval = 30; // 1 month
        for (let i = 0; i < 12; i++) {
          const date = new Date(startDate);
          date.setMonth(date.getMonth() + i);
          dateLabels.push(date);
        }
        break;
    }
    
    const labels = dateLabels.map(date => {
      if (timeRange === "weekly") {
        return date.toLocaleDateString(undefined, { weekday: 'short' });
      } else if (timeRange === "monthly") {
        return `Week ${Math.ceil((date.getDate()) / 7)}`;
      } else {
        return date.toLocaleDateString(undefined, { month: 'short' });
      }
    });
    
    const gold: number[] = [];
    const mana: number[] = [];
    const net: number[] = [];
    
    dateLabels.forEach((date, i) => {
      let nextDate: Date;
      if (i < dateLabels.length - 1) {
        nextDate = dateLabels[i + 1];
      } else {
        nextDate = new Date(date);
        if (timeRange === "weekly") {
          nextDate.setDate(nextDate.getDate() + 1);
        } else if (timeRange === "monthly") {
          nextDate.setDate(nextDate.getDate() + 7);
        } else {
          nextDate.setMonth(nextDate.getMonth() + 1);
        }
      }
      
      const periodEntries = resourceEntries.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= date && entryDate < nextDate;
      });
      
      const periodGold = periodEntries
        .filter(entry => entry.type === "gold")
        .reduce((sum, entry) => sum + entry.amount, 0);
      
      const periodMana = periodEntries
        .filter(entry => entry.type === "mana")
        .reduce((sum, entry) => sum + entry.amount, 0);
      
      gold.push(periodGold);
      mana.push(periodMana);
      net.push(periodGold - periodMana);
    });
    
    return { labels, gold, mana, net };
  };
  
  // Calculate expense breakdown by category
  const calculateCategoryBreakdown = (): CategoryBreakdown[] => {
    const now = new Date();
    let startDate: Date;
    
    switch (timeRange) {
      case "weekly":
        startDate = new Date(now);
        startDate.setDate(startDate.getDate() - 7);
        break;
      case "monthly":
        startDate = new Date(now);
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case "allTime":
      default:
        startDate = new Date(0); // Beginning of time
        break;
    }
    
    const filteredEntries = resourceEntries.filter(
      entry => new Date(entry.date) >= startDate && entry.type === "mana"
    );
    
    // Group by category
    const categoryAmounts: Record<ResourceCategory, number> = {} as Record<ResourceCategory, number>;
    
    filteredEntries.forEach(entry => {
      if (!categoryAmounts[entry.category]) {
        categoryAmounts[entry.category] = 0;
      }
      categoryAmounts[entry.category] += entry.amount;
    });
    
    const totalMana = filteredEntries.reduce((sum, entry) => sum + entry.amount, 0);
    
    // Convert to array with percentages
    return Object.entries(categoryAmounts).map(([category, amount]) => ({
      category: category as ResourceCategory,
      amount,
      percentage: totalMana > 0 ? (amount / totalMana) * 100 : 0
    })).sort((a, b) => b.amount - a.amount);
  };
  
  // Memoized calculations
  const summary = calculateSummary();
  const historyData = calculateHistoryData();
  const categoryBreakdown = calculateCategoryBreakdown();
  
  // Actions
  const addResourceEntry = (entry: Omit<ResourceEntry, "id">) => {
    const newEntry: ResourceEntry = {
      ...entry,
      id: `entry-${Date.now()}`
    };
    
    setResourceEntries(prev => [newEntry, ...prev]);
    
    // Update global resources
    if (entry.type === "gold") {
      updateResources(entry.amount, 0);
    } else {
      updateResources(0, entry.amount);
    }
    
    // Give XP reward for consistent logging
    const today = new Date().toISOString().split('T')[0];
    const entriesFromToday = resourceEntries.filter(e => 
      e.date.split('T')[0] === today
    ).length;
    
    if (entriesFromToday === 0) {
      // First entry of the day
      updateUserXp(10);
      updateUserStat("WIL", 1);
      toast({
        title: "First entry of the day!",
        description: "+10 XP and +1 WIL for financial tracking",
      });
    }
    
    // Check for milestone achievements based on entry count
    const totalEntries = resourceEntries.length + 1;
    if (totalEntries === 10) {
      updateUserXp(50);
      updateUserStat("INT", 2);
      toast({
        title: "Financial Milestone!",
        description: "Tracked 10 entries. +50 XP and +2 INT",
      });
    } else if (totalEntries === 50) {
      updateUserXp(200);
      updateUserStat("INT", 5);
      toast({
        title: "Financial Expert!",
        description: "Tracked 50 entries. +200 XP and +5 INT",
      });
    }
  };
  
  const addArtifact = (artifact: Omit<Artifact, "id">) => {
    const newArtifact: Artifact = {
      ...artifact,
      id: `artifact-${Date.now()}`
    };
    
    setArtifacts(prev => [newArtifact, ...prev]);
    
    // Update global resources and award XP
    updateUserXp(25);
    updateUserStat("INT", 1);
    
    toast({
      title: "New Artifact Added!",
      description: `${artifact.name} added to your collection. +25 XP and +1 INT`,
    });
  };
  
  const addPassiveBuff = (buff: Omit<PassiveBuff, "id">) => {
    const newBuff: PassiveBuff = {
      ...buff,
      id: `buff-${Date.now()}`
    };
    
    setPassiveBuffs(prev => [newBuff, ...prev]);
    
    // Update global resources and award XP
    updateUserXp(50);
    updateUserStat("INT", 2);
    updateUserStat("CHA", 1);
    
    toast({
      title: "New Passive Buff Active!",
      description: `${buff.name} generating ${buff.valuePerMonth} Gold per month. +50 XP, +2 INT, +1 CHA`,
    });
  };
  
  const updateResourceEntry = (id: string, entry: Partial<ResourceEntry>) => {
    setResourceEntries(prev => 
      prev.map(item => item.id === id ? { ...item, ...entry } : item)
    );
  };
  
  const updateArtifact = (id: string, artifact: Partial<Artifact>) => {
    setArtifacts(prev => 
      prev.map(item => item.id === id ? { ...item, ...artifact } : item)
    );
  };
  
  const updatePassiveBuff = (id: string, buff: Partial<PassiveBuff>) => {
    setPassiveBuffs(prev => 
      prev.map(item => item.id === id ? { ...item, ...buff } : item)
    );
  };
  
  const deleteResourceEntry = (id: string) => {
    setResourceEntries(prev => prev.filter(item => item.id !== id));
  };
  
  const deleteArtifact = (id: string) => {
    setArtifacts(prev => prev.filter(item => item.id !== id));
  };
  
  const deletePassiveBuff = (id: string) => {
    setPassiveBuffs(prev => prev.filter(item => item.id !== id));
  };
  
  return (
    <ResourcesContext.Provider
      value={{
        // Data
        resourceEntries,
        artifacts,
        passiveBuffs,
        timeRange,
        
        // Calculations
        summary,
        historyData,
        categoryBreakdown,
        
        // Actions
        setTimeRange,
        addResourceEntry,
        addArtifact,
        addPassiveBuff,
        updateResourceEntry,
        updateArtifact,
        updatePassiveBuff,
        deleteResourceEntry,
        deleteArtifact,
        deletePassiveBuff
      }}
    >
      {children}
    </ResourcesContext.Provider>
  );
};

export const useResources = () => {
  const context = useContext(ResourcesContext);
  if (context === undefined) {
    throw new Error("useResources must be used within a ResourcesProvider");
  }
  return context;
};
