
import React from "react";
import { useQuests } from "@/context/QuestContext";
import { useUser } from "@/context/UserContext";
import { toast } from "@/hooks/use-toast";
import QuestTabs from "@/components/quests/QuestTabs";
import DailyQuestTimer from "@/components/quests/DailyQuestTimer";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const QuestsPage = () => {
  const { quests, addQuest, completeQuest, resetAllQuests, checkUnfinishedDailyQuests } = useQuests();
  const { updateUserXp, updateUserStat, userData } = useUser();
  const { t, isRtl } = useLanguage();
  
  const availableStats = userData.stats.map(stat => stat.abbreviation);
  
  // Filter quests by type
  const dailyQuests = quests.filter(quest => quest.type === "daily" && !quest.completed);
  const mainQuests = quests.filter(quest => quest.type === "main" && !quest.completed);
  const dungeonQuests = quests.filter(quest => quest.type === "dungeon" && !quest.completed);
  const penaltyQuests = quests.filter(quest => quest.type === "penalty");
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
    const questType = quest.type === "dungeon" ? t('dungeon') : t('quests');
    
    toast({
      title: `${questType} Completed!`,
      description: `You earned ${quest.xpReward} XP and improved ${quest.stats.join(", ")}`,
    });
  };
  
  const handleCreateQuest = (questData: any) => {
    addQuest(questData);
  };
  
  const handleDayEnd = () => {
    console.log("Day end triggered from timer");
    checkUnfinishedDailyQuests();
  };
  
  const handleDebugTimerEnd = () => {
    console.log("Debug button pressed - checking unfinished quests");
    toast({
      title: "Debug Mode",
      description: "Simulating end of day penalty check",
    });
    
    // Force check unfinished quests
    checkUnfinishedDailyQuests();
  };

  return (
    <div className="p-4">
      <div className={`flex justify-between items-center mb-4 ${isRtl ? "flex-row-reverse" : ""}`}>
        <DailyQuestTimer onTimeExpired={handleDayEnd} />
        
        <Button 
          variant="outline"
          size="sm"
          onClick={handleDebugTimerEnd}
          className={`flex items-center gap-1.5 text-sm ${isRtl ? "flex-row-reverse" : ""}`}
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
          completedQuests={[...penaltyQuests, ...completedQuests]}
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
