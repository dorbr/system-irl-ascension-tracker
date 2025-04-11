
import React from "react";
import { Quest } from "@/context/QuestContext";
import QuestCard from "@/components/ui/QuestCard";

interface QuestListProps {
  quests: Quest[];
  onComplete: (quest: Quest) => void;
  emptyMessage?: string;
}

const QuestList: React.FC<QuestListProps> = ({ 
  quests, 
  onComplete, 
  emptyMessage = "No quests available" 
}) => {
  if (quests.length === 0) {
    return <p className="text-center text-muted-foreground py-4">{emptyMessage}</p>;
  }

  return (
    <div className="space-y-3 mt-3">
      {quests.map(quest => (
        <QuestCard
          key={quest.id}
          quest={quest}
          onComplete={() => onComplete(quest)}
        />
      ))}
    </div>
  );
};

export default QuestList;
