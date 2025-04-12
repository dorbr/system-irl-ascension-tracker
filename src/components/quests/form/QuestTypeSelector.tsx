
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Swords, Scroll, Info } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface QuestTypeSelectorProps {
  isDungeon: boolean;
  setIsDungeon: (isDungeon: boolean) => void;
}

const QuestTypeSelector: React.FC<QuestTypeSelectorProps> = ({ 
  isDungeon, 
  setIsDungeon 
}) => {
  const { t, isRtl } = useLanguage();
  
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex items-center justify-between pb-3 border-b border-secondary">
        <h3 className="font-medium text-lg flex items-center gap-2">
          {isDungeon ? (
            <>
              <Swords size={18} className="text-rpg-accent" />
              <span>{t('createDungeon')}</span>
            </>
          ) : (
            <>
              <Scroll size={18} className="text-rpg-primary" />
              <span>{t('createQuest')}</span>
            </>
          )}
        </h3>
        <div className={`flex items-center gap-2 bg-secondary/40 p-1 px-3 rounded-full ${isRtl ? "flex-row-reverse" : ""}`}>
          <span className={`text-xs ${!isDungeon ? "text-rpg-primary font-medium" : "text-muted-foreground"}`}>
            {t('quests')}
          </span>
          <Switch 
            checked={isDungeon} 
            onCheckedChange={setIsDungeon}
            className="data-[state=checked]:bg-rpg-accent data-[state=unchecked]:bg-rpg-primary/50"
          />
          <span className={`text-xs ${isDungeon ? "text-rpg-accent font-medium" : "text-muted-foreground"}`}>
            {t('dungeon')}
          </span>
        </div>
      </div>
      
      <div className={`text-xs p-2 rounded-md flex items-start gap-2 ${isDungeon ? "bg-rpg-accent/10 text-rpg-accent" : "bg-rpg-primary/10 text-rpg-primary"}`}>
        <Info size={14} className="mt-0.5" />
        <div>
          {isDungeon ? (
            <>
              <span className="font-medium">{t('dungeonChallenge')}:</span> {t('dungeonChallengeDesc')}
            </>
          ) : (
            <>
              <span className="font-medium">{t('questTypes')}:</span>
              <ul className={`list-disc pl-5 mt-1 space-y-0.5 ${isRtl ? "text-right" : ""}`}>
                <li><span className="text-blue-400 font-medium">{t('daily')}</span> - {t('dailyQuestsDesc')}</li>
                <li><span className="text-yellow-400 font-medium">{t('main')}</span> - {t('mainQuestsDesc')}</li>
                <li><span className="text-red-400 font-medium">{t('penalty')} {t('quests')}</span> - {t('penaltyQuestsDesc')}</li>
                <li><span className="text-green-400 font-medium">{t('reward')} {t('quests')}</span> - {t('rewardQuestsDesc')}</li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestTypeSelector;
