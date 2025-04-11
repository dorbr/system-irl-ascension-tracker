
import React, { useEffect } from "react";
import UserInfo from "@/components/home/UserInfo";
import StatsOverview from "@/components/home/StatsOverview";
import ResourcesOverview from "@/components/home/ResourcesOverview";
import DailyQuests from "@/components/home/DailyQuests";
import ActionButtons from "@/components/home/ActionButtons";
import DailyQuestTimer from "@/components/quests/DailyQuestTimer";
import { useQuests } from "@/context/QuestContext";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";

const Index = () => {
  const { resetDailyQuests, checkUnfinishedDailyQuests } = useQuests();
  const { isRtl, t } = useLanguage();
  
  // Check and reset daily quests on load
  useEffect(() => {
    resetDailyQuests();
  }, [resetDailyQuests]);
  
  const handleDayEnd = () => {
    console.log("Day end triggered from timer on home page");
    checkUnfinishedDailyQuests();
  };
  
  const handleDebugTimerEnd = () => {
    console.log("Debug button pressed on home page - checking unfinished quests");
    toast({
      title: t("debugMode"),
      description: t("simulatingEndOfDay"),
    });
    
    // Force check unfinished quests
    checkUnfinishedDailyQuests();
  };
  
  return (
    <div className="py-4">
      <div className={`flex justify-between items-center mb-4 px-4 ${isRtl ? "flex-row-reverse" : ""}`}>
        <DailyQuestTimer onTimeExpired={handleDayEnd} />
        
        <Button 
          variant="outline"
          size="sm"
          onClick={handleDebugTimerEnd}
          className={`flex items-center gap-1.5 text-sm ${isRtl ? "flex-row-reverse" : ""}`}
        >
          <Clock size={14} className="text-amber-400" />
          {t("debugTimer")}
        </Button>
      </div>
      <UserInfo />
      <StatsOverview />
      <ResourcesOverview />
      <ActionButtons />
      <DailyQuests />
    </div>
  );
};

export default Index;
