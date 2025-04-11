
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { generatePenaltyQuest } from "@/utils/penaltyQuestGenerator";

export type QuestDifficulty = "E" | "D" | "C" | "B" | "A" | "S";

export interface Quest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  type: "daily" | "main" | "dungeon" | "penalty" | "reward";
  completed: boolean;
  completedDate?: string;
  stats: string[];
  tags: string[];
  streak?: number;
  lastCompleted?: string;
  difficulty?: QuestDifficulty; // For dungeon difficulty
}

// Helper function to get XP reward based on dungeon difficulty
const getDungeonXpReward = (difficulty?: QuestDifficulty): number => {
  switch (difficulty) {
    case "S": return 10000;
    case "A": return 5000;
    case "B": return 2500;
    case "C": return 1000;
    case "D": return 500;
    case "E": return 250;
    default: return 1000;
  }
};

const defaultQuests: Quest[] = [
  {
    id: "1",
    title: "Morning Routine",
    description: "Complete your morning routine",
    xpReward: 20,
    type: "daily",
    completed: false,
    stats: ["VIT", "SEN"],
    tags: ["Health", "Routine"],
    streak: 0,
  },
  {
    id: "2",
    title: "Study Session",
    description: "Complete a focused study session",
    xpReward: 30,
    type: "daily",
    completed: false,
    stats: ["INT", "PER"],
    tags: ["Knowledge", "Focus"],
    streak: 0,
  },
  {
    id: "3",
    title: "Physical Exercise",
    description: "Complete a workout session",
    xpReward: 25,
    type: "daily",
    completed: false,
    stats: ["STR", "VIT"],
    tags: ["Fitness", "Health"],
    streak: 0,
  },
  {
    id: "4",
    title: "Meditation",
    description: "Practice mindfulness for 10 minutes",
    xpReward: 15,
    type: "daily",
    completed: false,
    stats: ["SEN", "INT"],
    tags: ["Mindfulness", "Focus"],
    streak: 0,
  },
  {
    id: "daily-5",
    title: "Read a Book",
    description: "Read at least 20 pages from a book",
    xpReward: 25,
    type: "daily",
    completed: false,
    stats: ["INT", "WIL"],
    tags: ["Knowledge", "Growth"],
    streak: 0,
  },
  {
    id: "daily-6",
    title: "Hydration Check",
    description: "Drink 8 glasses of water throughout the day",
    xpReward: 15,
    type: "daily",
    completed: false,
    stats: ["VIT", "WIL"],
    tags: ["Health", "Wellbeing"],
    streak: 0,
  },
  {
    id: "daily-7",
    title: "Journal Entry",
    description: "Write in your journal about today's experiences",
    xpReward: 20,
    type: "daily",
    completed: false,
    stats: ["SEN", "INT"],
    tags: ["Reflection", "Growth"],
    streak: 0,
  },
  
  {
    id: "5",
    title: "Learn a New Skill",
    description: "Start learning a new valuable skill",
    xpReward: 50,
    type: "main",
    completed: false,
    stats: ["INT", "PER", "AGI"],
    tags: ["Knowledge", "Growth"],
  },
  {
    id: "main-2",
    title: "Complete a Personal Project",
    description: "Finish that project you've been putting off",
    xpReward: 100,
    type: "main",
    completed: false,
    stats: ["INT", "WIL", "CRE"],
    tags: ["Achievement", "Growth", "Creativity"],
  },
  {
    id: "main-3",
    title: "Career Advancement",
    description: "Take a significant step forward in your career",
    xpReward: 150,
    type: "main",
    completed: false,
    stats: ["INT", "CHA", "WIL"],
    tags: ["Career", "Growth", "Achievement"],
  },
  {
    id: "main-4",
    title: "Master a Language",
    description: "Reach conversational fluency in a foreign language",
    xpReward: 200,
    type: "main",
    completed: false,
    stats: ["INT", "CHA", "WIL"],
    tags: ["Language", "Skill", "Communication"],
  },
  
  {
    id: "6",
    title: "Public Speaking",
    description: "Prepare and deliver a presentation",
    xpReward: getDungeonXpReward("B"),
    type: "dungeon",
    completed: false,
    stats: ["PER", "INT", "SEN"],
    tags: ["Communication", "Challenge"],
    difficulty: "B",
  },
  {
    id: "dungeon-2",
    title: "Marathon Challenge",
    description: "Train for and complete a marathon",
    xpReward: getDungeonXpReward("A"),
    type: "dungeon",
    completed: false,
    stats: ["STR", "VIT", "WIL"],
    tags: ["Fitness", "Endurance", "Challenge"],
    difficulty: "A",
  },
  {
    id: "dungeon-3",
    title: "Tech Detox",
    description: "Go 48 hours without technology",
    xpReward: getDungeonXpReward("C"),
    type: "dungeon",
    completed: false,
    stats: ["WIL", "SEN"],
    tags: ["Discipline", "Mindfulness"],
    difficulty: "C",
  },
  {
    id: "dungeon-4",
    title: "Cold Shower Challenge",
    description: "Take cold showers for 7 consecutive days",
    xpReward: getDungeonXpReward("D"),
    type: "dungeon",
    completed: false,
    stats: ["WIL", "VIT"],
    tags: ["Discipline", "Health"],
    difficulty: "D",
  },
  {
    id: "dungeon-5",
    title: "Ultimate Interview Prep",
    description: "Prepare for and excel at a critical job interview",
    xpReward: getDungeonXpReward("A"),
    type: "dungeon",
    completed: false,
    stats: ["CHA", "INT", "PER"],
    tags: ["Career", "Communication"],
    difficulty: "A",
  },
  {
    id: "dungeon-6",
    title: "Social Networking Challenge",
    description: "Attend three networking events and make five new professional connections",
    xpReward: getDungeonXpReward("B"),
    type: "dungeon",
    completed: false,
    stats: ["CHA", "PER", "SEN"],
    tags: ["Social", "Career", "Networking"],
    difficulty: "B",
  },
  {
    id: "dungeon-7",
    title: "Master the Elements",
    description: "Complete an extreme outdoor challenge (mountain climbing, deep diving, etc.)",
    xpReward: getDungeonXpReward("S"),
    type: "dungeon",
    completed: false,
    stats: ["STR", "AGI", "VIT"],
    tags: ["Adventure", "Nature", "Challenge"],
    difficulty: "S",
  },
  
  {
    id: "7",
    title: "Skip Bad Habits",
    description: "Skip social media for one day",
    xpReward: 40,
    type: "penalty",
    completed: false,
    stats: ["WIL", "INT"],
    tags: ["Discipline", "Focus"],
  },
  {
    id: "penalty-2",
    title: "No Junk Food",
    description: "Avoid all processed foods and sugar for 3 days",
    xpReward: 50,
    type: "penalty",
    completed: false,
    stats: ["WIL", "VIT"],
    tags: ["Health", "Nutrition", "Discipline"],
  },
  {
    id: "penalty-3",
    title: "Early to Bed",
    description: "Go to bed before 10 PM for a week",
    xpReward: 45,
    type: "penalty",
    completed: false,
    stats: ["WIL", "VIT"],
    tags: ["Sleep", "Health", "Discipline"],
  },
  
  {
    id: "8",
    title: "Reward: Movie Night",
    description: "Enjoy a movie after completing all daily quests",
    xpReward: 15,
    type: "reward",
    completed: false,
    stats: ["SEN", "VIT"],
    tags: ["Relaxation", "Entertainment"],
  },
  {
    id: "reward-2",
    title: "Reward: Gaming Session",
    description: "Enjoy a guilt-free gaming session after completing 3 main quests",
    xpReward: 25,
    type: "reward",
    completed: false,
    stats: ["SEN", "AGI"],
    tags: ["Entertainment", "Fun", "Relaxation"],
  },
  {
    id: "reward-3",
    title: "Reward: Spa Day",
    description: "Treat yourself to a spa day after completing a dungeon challenge",
    xpReward: 30,
    type: "reward",
    completed: false,
    stats: ["SEN", "VIT"],
    tags: ["Self-care", "Relaxation", "Health"],
  },
];

interface QuestContextType {
  quests: Quest[];
  addQuest: (quest: Omit<Quest, "id" | "completed">) => void;
  completeQuest: (id: string) => void;
  resetDailyQuests: () => void;
  resetAllQuests: () => void;
  checkUnfinishedDailyQuests: () => void;
}

const QuestContext = createContext<QuestContextType | undefined>(undefined);

export const QuestProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [quests, setQuests] = useState<Quest[]>(() => {
    const savedQuests = localStorage.getItem("system_irl_quests");
    if (savedQuests) {
      try {
        const parsedQuests = JSON.parse(savedQuests);
        if (!Array.isArray(parsedQuests) || parsedQuests.length === 0) {
          return defaultQuests;
        }
        return parsedQuests;
      } catch (error) {
        console.error("Error parsing saved quests:", error);
        return defaultQuests;
      }
    } else {
      return defaultQuests;
    }
  });

  useEffect(() => {
    localStorage.setItem("system_irl_quests", JSON.stringify(quests));
  }, [quests]);

  const addQuest = (quest: Omit<Quest, "id" | "completed">) => {
    let newQuest: Quest = {
      ...quest,
      id: Date.now().toString(),
      completed: false,
    };
    
    if (quest.type === "dungeon" && quest.difficulty) {
      newQuest.xpReward = getDungeonXpReward(quest.difficulty);
    }
    
    setQuests((prev) => [...prev, newQuest]);
    
    // Show notification for newly added quest
    if (quest.type === "penalty") {
      toast({
        title: "Penalty Quest Added",
        description: `${quest.title} has been added to your quests.`,
        variant: "destructive",
      });
    }
  };

  const completeQuest = (id: string) => {
    setQuests((prev) =>
      prev.map((quest) => {
        if (quest.id === id) {
          const today = new Date().toISOString().split("T")[0];
          const lastCompleted = quest.lastCompleted;
          
          let streak = quest.streak || 0;
          if (quest.type === "daily") {
            if (!lastCompleted) {
              streak = 1;
            } else {
              const lastDate = new Date(lastCompleted);
              const yesterday = new Date();
              yesterday.setDate(yesterday.getDate() - 1);
              
              if (lastDate.toISOString().split("T")[0] === yesterday.toISOString().split("T")[0]) {
                streak += 1;
              } else if (lastDate.toISOString().split("T")[0] !== today) {
                streak = 1;
              }
            }
          }
          
          return {
            ...quest,
            completed: true,
            completedDate: today,
            lastCompleted: today,
            streak: streak,
          };
        }
        return quest;
      })
    );
  };

  const resetDailyQuests = () => {
    const today = new Date().toISOString().split("T")[0];
    console.log("Resetting daily quests, today is:", today);
    
    setQuests((prev) =>
      prev.map((quest) => {
        if (quest.type === "daily") {
          if (quest.lastCompleted !== today) {
            console.log("Resetting quest:", quest.title);
            return {
              ...quest,
              completed: false,
            };
          }
        }
        return quest;
      })
    );
  };

  const resetAllQuests = () => {
    localStorage.removeItem("system_irl_quests");
    setQuests(defaultQuests);
  };

  const checkUnfinishedDailyQuests = () => {
    console.log("Checking for unfinished daily quests...");
    const today = new Date().toISOString().split("T")[0];
    
    const unfinishedDailyQuests = quests.filter(
      quest => quest.type === "daily" && !quest.completed && (!quest.lastCompleted || quest.lastCompleted !== today)
    );
    
    console.log(`Found ${unfinishedDailyQuests.length} unfinished daily quests:`, unfinishedDailyQuests);
    
    if (unfinishedDailyQuests.length > 0) {
      const penaltyQuest = generatePenaltyQuest(unfinishedDailyQuests);
      
      // Add penalty quest
      const newPenaltyQuest: Quest = {
        ...penaltyQuest,
        id: `penalty-${Date.now()}`,
        completed: false
      };
      
      setQuests(prev => [...prev, newPenaltyQuest]);
      
      console.log("Added penalty quest:", newPenaltyQuest);
      
      toast({
        title: "Daily Quests Missed!",
        description: `${unfinishedDailyQuests.length} quests were not completed. A penalty quest has been added.`,
        variant: "destructive",
      });
      
      // Mark unfinished quests as processed for today
      setQuests(prev => 
        prev.map(quest => {
          if (quest.type === "daily" && !quest.completed && (!quest.lastCompleted || quest.lastCompleted !== today)) {
            return {
              ...quest,
              lastCompleted: today,
            };
          }
          return quest;
        })
      );
    } else {
      console.log("No unfinished daily quests found");
      toast({
        title: "All Caught Up!",
        description: "All daily quests are completed. No penalties today!",
      });
    }
  };

  return (
    <QuestContext.Provider
      value={{ 
        quests, 
        addQuest, 
        completeQuest, 
        resetDailyQuests, 
        resetAllQuests,
        checkUnfinishedDailyQuests
      }}
    >
      {children}
    </QuestContext.Provider>
  );
};

export const useQuests = () => {
  const context = useContext(QuestContext);
  if (context === undefined) {
    throw new Error("useQuests must be used within a QuestProvider");
  }
  return context;
};
