
import React from "react";
import { useQuests } from "@/context/QuestContext";
import { useUser } from "@/context/UserContext";
import QuestCard from "../ui/QuestCard";
import { toast } from "@/hooks/use-toast";
import { AlertTriangle } from "lucide-react";

const DailyQuests: React.FC = () => {
  const { quests, completeQuest } = useQuests();
  const { updateUserXp, updateUserStat } = useUser();
  
  // Filter daily quests
  const dailyQuests = quests.filter(quest => quest.type === "daily");
  const incompleteDailyQuests = dailyQuests.filter(quest => !quest.completed);

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
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm uppercase font-medium text-muted-foreground">Daily Quests</h3>
        
        {incompleteDailyQuests.length > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-amber-400">
            <AlertTriangle size={14} />
            <span>{incompleteDailyQuests.length} quest{incompleteDailyQuests.length !== 1 ? 's' : ''} remaining</span>
          </div>
        )}
      </div>
      
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
      
      {incompleteDailyQuests.length > 0 && (
        <div className="mt-4 text-xs text-muted-foreground border-t border-border pt-3">
          <p className="flex items-center gap-1.5">
            <AlertTriangle size={14} className="text-amber-400" />
            <span>Incomplete quests at midnight will result in a penalty quest.</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default DailyQuests;
