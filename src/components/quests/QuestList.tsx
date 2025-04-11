
import React from "react";
import { Quest } from "@/context/QuestContext";
import QuestCard from "@/components/ui/QuestCard";
import { useLanguage } from "@/context/LanguageContext";

interface QuestListProps {
  quests: Quest[];
  onComplete: (quest: Quest) => void;
  onQuestClick?: (quest: Quest) => void;
  emptyMessage?: string;
}

const QuestList: React.FC<QuestListProps> = ({ 
  quests, 
  onComplete, 
  onQuestClick,
  emptyMessage = "No quests available" 
}) => {
  const { isRtl } = useLanguage();

  if (quests.length === 0) {
    return <p className="text-center text-muted-foreground py-4">{emptyMessage}</p>;
  }

  return (
    <div className="space-y-4 mt-4" dir="ltr">
      {quests.map(quest => (
        <QuestCard
          key={quest.id}
          quest={quest}
          onComplete={() => onComplete(quest)}
          onClick={onQuestClick ? () => onQuestClick(quest) : undefined}
        />
      ))}
    </div>
  );
};

export default QuestList;
