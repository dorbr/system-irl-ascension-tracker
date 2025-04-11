
import React from "react";
import { useQuests } from "@/context/QuestContext";
import { useUser } from "@/context/UserContext";
import QuestCard from "../ui/QuestCard";
import { toast } from "@/hooks/use-toast";

const DailyQuests: React.FC = () => {
  const { quests, completeQuest } = useQuests();
  const { updateUserXp, updateUserStat } = useUser();
  
  // Filter daily quests
  const dailyQuests = quests.filter(quest => quest.type === "daily");

  const handleCompleteQuest = (quest: any) => {
    if (quest.completed) return;
    
    completeQuest(quest.id);
    updateUserXp(quest.xpReward);
    
    // Also update associated stats
    quest.stats.forEach((statName: string) => {
      updateUserStat(statName, 1);
    });
    
    toast({
      title: "Quest Completed!",
      description: `You earned ${quest.xpReward} XP and improved ${quest.stats.join(", ")}`,
    });
  };

  return (
    <div className="glass-card rounded-lg p-4 mb-4 animate-fade-in">
      <h3 className="text-sm uppercase font-medium text-muted-foreground mb-3">Daily Quests</h3>
      
      <div className="space-y-3">
        {dailyQuests.length === 0 ? (
          <p className="text-center text-muted-foreground py-3">No daily quests available</p>
        ) : (
          dailyQuests.map(quest => (
            <QuestCard
              key={quest.id}
              quest={quest}
              onComplete={() => handleCompleteQuest(quest)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DailyQuests;
