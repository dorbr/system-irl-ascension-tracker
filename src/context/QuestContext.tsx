
import React, { createContext, useContext, useState, useEffect } from "react";

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
    id: "6",
    title: "Public Speaking",
    description: "Prepare and deliver a presentation",
    xpReward: 100,
    type: "dungeon",
    completed: false,
    stats: ["PER", "INT", "SEN"],
    tags: ["Communication", "Challenge"],
    difficulty: "B", // Adding difficulty rank
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
    id: "8",
    title: "Reward: Movie Night",
    description: "Enjoy a movie after completing all daily quests",
    xpReward: 15,
    type: "reward",
    completed: false,
    stats: ["SEN", "VIT"],
    tags: ["Relaxation", "Entertainment"],
  },
];

interface QuestContextType {
  quests: Quest[];
  addQuest: (quest: Omit<Quest, "id" | "completed">) => void;
  completeQuest: (id: string) => void;
  resetDailyQuests: () => void;
}

const QuestContext = createContext<QuestContextType | undefined>(undefined);

export const QuestProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [quests, setQuests] = useState<Quest[]>(() => {
    const savedQuests = localStorage.getItem("system_irl_quests");
    return savedQuests ? JSON.parse(savedQuests) : defaultQuests;
  });

  useEffect(() => {
    localStorage.setItem("system_irl_quests", JSON.stringify(quests));
  }, [quests]);

  const addQuest = (quest: Omit<Quest, "id" | "completed">) => {
    const newQuest: Quest = {
      ...quest,
      id: Date.now().toString(),
      completed: false,
    };
    setQuests((prev) => [...prev, newQuest]);
  };

  const completeQuest = (id: string) => {
    setQuests((prev) =>
      prev.map((quest) => {
        if (quest.id === id) {
          const today = new Date().toISOString().split("T")[0];
          const lastCompleted = quest.lastCompleted;
          
          // Update streak if daily quest
          let streak = quest.streak || 0;
          if (quest.type === "daily") {
            // Increment streak if first completion or completed yesterday
            if (!lastCompleted) {
              streak = 1;
            } else {
              const lastDate = new Date(lastCompleted);
              const yesterday = new Date();
              yesterday.setDate(yesterday.getDate() - 1);
              
              if (lastDate.toISOString().split("T")[0] === yesterday.toISOString().split("T")[0]) {
                streak += 1;
              } else if (lastDate.toISOString().split("T")[0] !== today) {
                streak = 1; // Reset streak if it wasn't completed yesterday (and not completed today)
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
    
    setQuests((prev) =>
      prev.map((quest) => {
        if (quest.type === "daily") {
          // Only reset if not already completed today
          if (quest.lastCompleted !== today) {
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

  return (
    <QuestContext.Provider
      value={{ quests, addQuest, completeQuest, resetDailyQuests }}
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
