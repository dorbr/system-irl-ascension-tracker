
import React from "react";
import { Quest } from "@/context/QuestContext";
import { useUser } from "@/context/UserContext";
import { cn } from "@/lib/utils";
import { QuestTypeIndicator, getQuestTypeStyles } from "@/components/quests/card/QuestTypeIndicator";
import QuestStats from "@/components/quests/card/QuestStats";
import QuestTags from "@/components/quests/card/QuestTags";
import QuestStreak from "@/components/quests/card/QuestStreak";
import CompleteButton from "@/components/quests/card/CompleteButton";
import StrategyIndicator from "@/components/quests/card/StrategyIndicator";
import XpReward from "@/components/quests/card/XpReward";
import { useLanguage } from "@/context/LanguageContext";

interface QuestCardProps {
  quest: Quest;
  onComplete: () => void;
  onClick?: () => void;
  className?: string;
}

const QuestCard: React.FC<QuestCardProps> = ({
  quest,
  onComplete,
  onClick,
  className,
}) => {
  const { userData } = useUser();
  const { isRtl, t } = useLanguage();
  
  // Get visual styles based on quest type
  const typeStyles = getQuestTypeStyles(quest.type);
  
  // Get stat colors for badges
  const getStatColor = (abbreviation: string) => {
    const stat = userData.stats.find(s => s.abbreviation === abbreviation);
    return stat?.color || "#9b87f5";
  };

  // Determine if the card is clickable for strategy planning
  const isClickable = quest.type === "dungeon" && onClick;

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent the complete button from triggering card click
    if (e.target instanceof HTMLElement && 
        (e.target.tagName === 'BUTTON' || 
         e.target.closest('button'))) {
      return;
    }
    
    if (isClickable && onClick) {
      onClick();
    }
  };

  // Get rank color based on difficulty
  const getRankColor = (difficulty?: string) => {
    switch (difficulty) {
      case "S": return "text-red-500";
      case "A": return "text-orange-500";
      case "B": return "text-purple-500";
      case "C": return "text-blue-500";
      case "D": return "text-green-500";
      case "E": return "text-gray-400";
      default: return "";
    }
  };

  // Format the title with colorful rank for dungeon quests
  const displayTitle = () => {
    return quest.title;
  };

  // Display the rank for dungeon quests separately
  const displayRank = () => {
    if (quest.type === "dungeon" && quest.difficulty) {
      return (
        <div className={`text-center font-bold ${getRankColor(quest.difficulty)}`}>
          {quest.difficulty} {t('rank')}
        </div>
      );
    }
    return null;
  };

  return (
    <div 
      onClick={handleCardClick}
      className={cn(
        "quest-item glass-card relative", 
        typeStyles.borderColor,
        typeStyles.bgColor,
        quest.completed && "opacity-60",
        isClickable && "cursor-pointer hover:border-rpg-accent/50 transition-colors",
        className
      )}
      // Remove RTL-specific styling to prevent layout inversion
      dir="ltr"
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          {/* Header section with quest type and title */}
          <div className="flex flex-col gap-2 mb-3">
            <QuestTypeIndicator type={quest.type} difficulty={quest.difficulty} />
            <h3 className="font-semibold text-sm text-center">{displayTitle()}</h3>
            {displayRank()}
          </div>
          
          {/* Description */}
          <p className="text-xs text-muted-foreground mb-3 text-center">{quest.description}</p>
          
          {/* Stats */}
          <QuestStats stats={quest.stats} getStatColor={getStatColor} />
          
          {/* Tags and streak */}
          <div className="flex items-center justify-between mt-2">
            <QuestTags tags={quest.tags} />
            <QuestStreak type={quest.type} streak={quest.streak} />
          </div>
        </div>
        
        {/* Right side with complete button */}
        <div className="flex flex-col items-end">
          <CompleteButton 
            completed={quest.completed} 
            onComplete={(e) => {
              e.stopPropagation();
              onComplete();
            }} 
          />
        </div>
      </div>
      
      {/* XP reward label */}
      <XpReward xpReward={quest.xpReward} />
      
      {/* Strategy planning indicator for dungeons */}
      <StrategyIndicator isClickable={isClickable && quest.type === "dungeon"} />
    </div>
  );
};

export default QuestCard;
