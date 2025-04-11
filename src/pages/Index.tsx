
import React, { useEffect } from "react";
import UserInfo from "@/components/home/UserInfo";
import StatsOverview from "@/components/home/StatsOverview";
import ResourcesOverview from "@/components/home/ResourcesOverview";
import DailyQuests from "@/components/home/DailyQuests";
import ActionButtons from "@/components/home/ActionButtons";
import DailyQuestTimer from "@/components/quests/DailyQuestTimer";
import { useQuests } from "@/context/QuestContext";

const Index = () => {
  const { resetDailyQuests, checkUnfinishedDailyQuests } = useQuests();
  
  // Check and reset daily quests on load
  useEffect(() => {
    resetDailyQuests();
  }, [resetDailyQuests]);
  
  const handleDayEnd = () => {
    checkUnfinishedDailyQuests();
  };
  
  return (
    <div className="py-4">
      <div className="flex justify-end mb-4 px-4">
        <DailyQuestTimer onTimeExpired={handleDayEnd} />
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
