
import React from "react";
import { CheckCircle, Swords, History } from "lucide-react";
import { Quest } from "@/context/QuestContext";
import { Shadow } from "@/context/ShadowContext";

interface QuestStatsProps {
  quests: Quest[];
  shadows: Shadow[];
}

const QuestStats: React.FC<QuestStatsProps> = ({ quests, shadows }) => {
  // Calculate quest stats
  const completedQuests = quests.filter(quest => quest.completed).length;
  const totalQuests = quests.length;
  const completionRate = totalQuests ? Math.round((completedQuests / totalQuests) * 100) : 0;
  
  return (
    <>
      <h3 className="text-sm uppercase font-medium text-muted-foreground mb-2">Progress Stats</h3>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="glass-card p-3 text-center rounded-lg">
          <div className="flex justify-center mb-1">
            <CheckCircle size={20} className="text-green-500" />
          </div>
          <div className="text-xl font-bold">{completedQuests}</div>
          <div className="text-xs text-muted-foreground">Quests</div>
        </div>
        
        <div className="glass-card p-3 text-center rounded-lg">
          <div className="flex justify-center mb-1">
            <Swords size={20} className="text-yellow-500" />
          </div>
          <div className="text-xl font-bold">
            {quests.filter(q => q.type === "dungeon" && q.completed).length}
          </div>
          <div className="text-xs text-muted-foreground">Dungeons</div>
        </div>
        
        <div className="glass-card p-3 text-center rounded-lg">
          <div className="flex justify-center mb-1">
            <History size={20} className="text-rpg-primary" />
          </div>
          <div className="text-xl font-bold">{shadows.length}</div>
          <div className="text-xs text-muted-foreground">Shadows</div>
        </div>
      </div>
      
      <div className="glass-card p-3 rounded-lg mb-4">
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium">Quest Completion</div>
          <div className="text-sm font-bold">{completionRate}%</div>
        </div>
        <div className="progress-bar mt-2">
          <div 
            className="progress-fill" 
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>
    </>
  );
};

export default QuestStats;
