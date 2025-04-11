
import React from "react";
import { Quest } from "@/context/QuestContext";
import StatBadge from "./StatBadge";
import { CheckCircle, Circle } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { cn } from "@/lib/utils";

interface QuestCardProps {
  quest: Quest;
  onComplete: () => void;
  className?: string;
}

const QuestCard: React.FC<QuestCardProps> = ({
  quest,
  onComplete,
  className,
}) => {
  const { userData } = useUser();
  
  // Get stat colors for badges
  const getStatColor = (abbreviation: string) => {
    const stat = userData.stats.find(s => s.abbreviation === abbreviation);
    return stat?.color || "#9b87f5";
  };

  return (
    <div className={cn("quest-item glass-card", quest.completed && "opacity-60", className)}>
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1">
          <h3 className="font-semibold text-sm mb-1">{quest.title}</h3>
          <p className="text-xs text-muted-foreground mb-2">{quest.description}</p>
          
          <div className="flex flex-wrap gap-1 mb-2">
            {quest.stats.map((stat) => (
              <StatBadge
                key={stat}
                name=""
                abbreviation={stat}
                color={getStatColor(stat)}
              />
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {quest.tags.map((tag) => (
                <span key={tag} className="text-xs text-muted-foreground bg-secondary/30 px-1.5 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
            
            {quest.type === "daily" && quest.streak && quest.streak > 1 && (
              <div className="text-xs font-medium text-rpg-primary">
                🔥 {quest.streak} days
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="text-sm font-semibold text-rpg-primary mb-1">+{quest.xpReward} XP</div>
          <button
            onClick={onComplete}
            disabled={quest.completed}
            className="p-1 transition-transform hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
          >
            {quest.completed ? (
              <CheckCircle size={24} className="text-rpg-primary" />
            ) : (
              <Circle size={24} className="text-muted-foreground" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestCard;
