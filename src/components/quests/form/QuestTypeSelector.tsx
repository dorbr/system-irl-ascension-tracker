
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Swords, Scroll, Info } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

interface QuestTypeSelectorProps {
  isDungeon: boolean;
  setIsDungeon: (isDungeon: boolean) => void;
}

const QuestTypeSelector: React.FC<QuestTypeSelectorProps> = ({ 
  isDungeon, 
  setIsDungeon 
}) => {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex items-center justify-between pb-3 border-b border-secondary">
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
        <div className="flex items-center gap-2 bg-secondary/40 p-1 px-3 rounded-full">
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
      
      <div className={`text-xs p-2 rounded-md flex items-start gap-2 ${isDungeon ? "bg-rpg-accent/10 text-rpg-accent" : "bg-rpg-primary/10 text-rpg-primary"}`}>
        <Info size={14} className="mt-0.5" />
        <div>
          {isDungeon ? (
            <>
              <span className="font-medium">Dungeon Challenge:</span> These are difficult tasks that test your limits. 
              They have difficulty ranks (E to S) and typically provide higher XP rewards.
            </>
          ) : (
            <>
              <span className="font-medium">Quest Types:</span>
              <ul className="list-disc pl-5 mt-1 space-y-0.5">
                <li><span className="text-blue-400 font-medium">Daily Quests</span> - Regular tasks that build habits. They track streaks.</li>
                <li><span className="text-yellow-400 font-medium">Main Quests</span> - Important goals that advance your journey.</li>
                <li><span className="text-red-400 font-medium">Penalty Quests</span> - Tasks to avoid bad habits.</li>
                <li><span className="text-green-400 font-medium">Reward Quests</span> - Treats earned after completing other quests.</li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestTypeSelector;
