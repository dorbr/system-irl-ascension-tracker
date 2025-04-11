
import { Quest } from "@/context/QuestContext";

// Pool of penalty quest templates
const penaltyQuestTemplates = [
  {
    title: "No Screen Time",
    description: "Avoid using screens for entertainment for 2 hours",
    xpReward: 35,
    tags: ["Discipline", "Focus"]
  },
  {
    title: "Extra Workout",
    description: "Complete an extra workout session to make up for missed quests",
    xpReward: 45,
    tags: ["Fitness", "Discipline"]
  },
  {
    title: "Early Rise Challenge",
    description: "Wake up 30 minutes earlier than usual tomorrow",
    xpReward: 40,
    tags: ["Discipline", "Health"]
  },
  {
    title: "Cold Shower",
    description: "Take a cold shower to build mental toughness",
    xpReward: 35,
    tags: ["Discipline", "Health"]
  },
  {
    title: "Digital Detox",
    description: "Spend 3 hours without checking your phone",
    xpReward: 50,
    tags: ["Mindfulness", "Focus"]
  },
  {
    title: "Meditation Session",
    description: "Complete a 15-minute meditation to refocus",
    xpReward: 30,
    tags: ["Mindfulness", "Focus"]
  },
  {
    title: "Extra Study Session",
    description: "Add an extra 30-minute study session to your schedule",
    xpReward: 45,
    tags: ["Knowledge", "Discipline"]
  }
];

/**
 * Generates a penalty quest based on unfinished daily quests
 */
export const generatePenaltyQuest = (unfinishedQuests: Quest[]): Omit<Quest, "id" | "completed"> => {
  console.log("Generating penalty quest for unfinished quests:", unfinishedQuests);
  
  // Extract stats from unfinished quests
  const unfinishedStats = unfinishedQuests.flatMap(quest => quest.stats);
  console.log("Unfinished quest stats:", unfinishedStats);
  
  // Pick a random template
  const template = penaltyQuestTemplates[Math.floor(Math.random() * penaltyQuestTemplates.length)];
  console.log("Selected penalty template:", template);
  
  // Get at least one stat from unfinished quests, or default to WIL if none
  let penaltyStats: string[] = ["WIL"]; // Default to willpower
  
  if (unfinishedStats.length > 0) {
    // Pick at least one stat from unfinished quests
    const randomStat = unfinishedStats[Math.floor(Math.random() * unfinishedStats.length)];
    
    // Add 1-2 stats, making sure we include at least one from unfinished quests
    if (Math.random() > 0.5) {
      // Two stats
      penaltyStats = [randomStat, "WIL"];
    } else {
      // Just one stat
      penaltyStats = [randomStat];
    }
  }
  
  console.log("Generated penalty quest with stats:", penaltyStats);
  
  return {
    title: template.title,
    description: template.description,
    xpReward: template.xpReward,
    type: "penalty",
    stats: penaltyStats,
    tags: template.tags,
  };
};
