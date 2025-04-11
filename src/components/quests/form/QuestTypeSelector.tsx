
import React from "react";
import { Switch } from "@/components/ui/switch";

interface QuestTypeSelectorProps {
  isDungeon: boolean;
  setIsDungeon: (isDungeon: boolean) => void;
}

const QuestTypeSelector: React.FC<QuestTypeSelectorProps> = ({ 
  isDungeon, 
  setIsDungeon 
}) => {
  return (
    <div className="flex items-center justify-between pb-2 border-b border-secondary">
      <h3 className="font-medium">
        {isDungeon ? "Create Dungeon Challenge" : "Create Quest"}
      </h3>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Quest</span>
        <Switch 
          checked={isDungeon} 
          onCheckedChange={setIsDungeon} 
        />
        <span className="text-xs text-muted-foreground">Dungeon</span>
      </div>
    </div>
  );
};

export default QuestTypeSelector;
