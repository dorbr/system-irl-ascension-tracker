
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Swords, Scroll } from "lucide-react";

interface QuestTypeSelectorProps {
  isDungeon: boolean;
  setIsDungeon: (isDungeon: boolean) => void;
}

const QuestTypeSelector: React.FC<QuestTypeSelectorProps> = ({ 
  isDungeon, 
  setIsDungeon 
}) => {
  return (
    <div className="flex items-center justify-between pb-3 mb-2 border-b border-secondary">
      <h3 className="font-medium text-lg flex items-center gap-2">
        {isDungeon ? (
          <>
            <Swords size={18} className="text-rpg-accent" />
            <span>Create Dungeon Challenge</span>
          </>
        ) : (
          <>
            <Scroll size={18} className="text-rpg-primary" />
            <span>Create Quest</span>
          </>
        )}
      </h3>
      <div className="flex items-center gap-2 bg-secondary/40 p-1 px-2 rounded-full">
        <span className={`text-xs ${!isDungeon ? "text-rpg-primary font-medium" : "text-muted-foreground"}`}>
          Quest
        </span>
        <Switch 
          checked={isDungeon} 
          onCheckedChange={setIsDungeon}
          className="data-[state=checked]:bg-rpg-accent data-[state=unchecked]:bg-rpg-primary/50"
        />
        <span className={`text-xs ${isDungeon ? "text-rpg-accent font-medium" : "text-muted-foreground"}`}>
          Dungeon
        </span>
      </div>
    </div>
  );
};

export default QuestTypeSelector;
