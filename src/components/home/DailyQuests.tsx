
import React from "react";
import { useQuests } from "@/context/QuestContext";
import { useUser } from "@/context/UserContext";
import QuestCard from "../ui/QuestCard";
import { toast } from "@/hooks/use-toast";
import { AlertTriangle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const DailyQuests: React.FC = () => {
  const { quests, completeQuest } = useQuests();
  const { updateUserXp, updateUserStat } = useUser();
  const { t, isRtl } = useLanguage();
  
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
      title: t("questCompletion"),
      description: `${t("earnXp").replace("{xp}", quest.xpReward.toString())} ${t("improvedStat").replace("{stats}", quest.stats.join(", "))}`,
    });
  };

  return (
    <div className="glass-card rounded-lg p-4 mb-4 animate-fade-in">
      <div className={`flex justify-between items-center mb-3 ${isRtl ? "flex-row-reverse" : ""}`}>
        <h3 className={`text-sm uppercase font-medium text-muted-foreground ${isRtl ? "text-right" : ""}`}>
          {t("dailyQuests")}
        </h3>
        
        {incompleteDailyQuests.length > 0 && (
          <div className={`flex items-center gap-1.5 text-xs text-amber-400 ${isRtl ? "flex-row-reverse" : ""}`}>
            <AlertTriangle size={14} />
            <span>
              {incompleteDailyQuests.length} {" "}
              {incompleteDailyQuests.length === 1 
                ? t("questsRemaining") 
                : t("questsRemaining_plural")}
            </span>
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        {dailyQuests.length === 0 ? (
          <p className="text-center text-muted-foreground py-3">{t("noDailyQuests")}</p>
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
        <div className={`mt-4 text-xs text-muted-foreground border-t border-border pt-3 ${isRtl ? "text-right" : ""}`}>
          <p className={`flex items-center gap-1.5 ${isRtl ? "flex-row-reverse" : ""}`}>
            <AlertTriangle size={14} className="text-amber-400" />
            <span>{t("incompleteQuestsWarning")}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default DailyQuests;
