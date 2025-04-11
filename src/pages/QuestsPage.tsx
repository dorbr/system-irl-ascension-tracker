
import React from "react";
import { useQuests } from "@/context/QuestContext";
import { useUser } from "@/context/UserContext";
import { toast } from "@/hooks/use-toast";
import QuestTabs from "@/components/quests/QuestTabs";
import DailyQuestTimer from "@/components/quests/DailyQuestTimer";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

const QuestsPage = () => {
  const { quests, addQuest, completeQuest, resetAllQuests, checkUnfinishedDailyQuests } = useQuests();
  const { updateUserXp, updateUserStat, userData } = useUser();
  
  const availableStats = userData.stats.map(stat => stat.abbreviation);
  
  // Filter quests by type
  const dailyQuests = quests.filter(quest => quest.type === "daily" && !quest.completed);
  const mainQuests = quests.filter(quest => quest.type === "main" && !quest.completed);
  const dungeonQuests = quests.filter(quest => quest.type === "dungeon" && !quest.completed);
  const completedQuests = quests.filter(quest => quest.completed);
  
  const handleCompleteQuest = (quest: any) => {
    if (quest.completed) return;
    
    completeQuest(quest.id);
    updateUserXp(quest.xpReward);
    
    // Also update associated stats
    quest.stats.forEach((statName: string) => {
      updateUserStat(statName, 1);
    });
    
    // Different toast message depending on quest type
    const questType = quest.type === "dungeon" ? "Dungeon" : "Quest";
    
    toast({
      title: `${questType} Completed!`,
      description: `You earned ${quest.xpReward} XP and improved ${quest.stats.join(", ")}`,
    });
  };
  
  const handleCreateQuest = (questData: any) => {
    addQuest(questData);
  };
  
  const handleDayEnd = () => {
    checkUnfinishedDailyQuests();
  };
  
  const handleDebugTimerEnd = () => {
    toast({
      title: "Debug Mode",
      description: "Simulating end of day penalty check",
    });
    checkUnfinishedDailyQuests();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <DailyQuestTimer onTimeExpired={handleDayEnd} />
        
        <Button 
          variant="outline"
          size="sm"
          onClick={handleDebugTimerEnd}
          className="flex items-center gap-1.5 text-sm"
        >
          <Clock size={14} className="text-amber-400" />
          Debug Timer
        </Button>
      </div>
      <div className="glass-card rounded-lg p-4">
        <QuestTabs
          dailyQuests={dailyQuests}
          mainQuests={mainQuests}
          dungeonQuests={dungeonQuests}
          completedQuests={completedQuests}
          availableStats={availableStats}
          onCompleteQuest={handleCompleteQuest}
          onCreateQuest={handleCreateQuest}
          onResetQuests={resetAllQuests}
        />
      </div>
    </div>
  );
};

export default QuestsPage;
