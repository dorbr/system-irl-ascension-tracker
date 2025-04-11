
import React from "react";
import { Quest } from "@/context/QuestContext";
import StatBadge from "./StatBadge";
import { CheckCircle, Circle, Shield, Star, Calendar, Award, Swords } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { cn } from "@/lib/utils";

interface QuestCardProps {
  quest: Quest;
  onComplete: () => void;
  className?: string;
}

const getDifficultyColor = (difficulty?: string): string => {
  switch (difficulty) {
    case "E": return "text-gray-400";
    case "D": return "text-green-500";
    case "C": return "text-blue-500";
    case "B": return "text-purple-500";
    case "A": return "text-orange-500";
    case "S": return "text-red-500";
    default: return "text-gray-500";
  }
};

const getQuestTypeStyles = (type: string): { 
  icon: React.ReactNode; 
  borderColor: string;
  bgColor: string;
  label: string;
  textColor: string;
} => {
  switch (type) {
    case "main":
      return { 
        icon: <Star size={16} className="text-yellow-400" />,
        borderColor: "border-yellow-500/30",
        bgColor: "bg-yellow-500/5",
        label: "Main Quest",
        textColor: "text-yellow-400"
      };
    case "daily":
      return { 
        icon: <Calendar size={16} className="text-blue-400" />,
        borderColor: "border-blue-500/30",
        bgColor: "bg-blue-500/5",
        label: "Daily Quest",
        textColor: "text-blue-400"
      };
    case "penalty":
      return { 
        icon: <Shield size={16} className="text-red-400" />,
        borderColor: "border-red-500/30", 
        bgColor: "bg-red-500/5",
        label: "Penalty Quest",
        textColor: "text-red-400"
      };
    case "reward":
      return { 
        icon: <Award size={16} className="text-green-400" />,
        borderColor: "border-green-500/30", 
        bgColor: "bg-green-500/5",
        label: "Reward Quest",
        textColor: "text-green-400"
      };
    case "dungeon":
      return { 
        icon: <Swords size={16} className="text-rpg-accent" />,
        borderColor: "border-rpg-accent/30",
        bgColor: "bg-rpg-accent/5",
        label: "Dungeon Challenge",
        textColor: "text-rpg-accent"
      };
    default:
      return { 
        icon: <Calendar size={16} className="text-blue-400" />,
        borderColor: "border-blue-500/30",
        bgColor: "bg-blue-500/5",
        label: "Quest",
        textColor: "text-blue-400"
      };
  }
};

const QuestCard: React.FC<QuestCardProps> = ({
  quest,
  onComplete,
  className,
}) => {
  const { userData } = useUser();
  
  // Get visual styles based on quest type
  const typeStyles = getQuestTypeStyles(quest.type);
  
  // Get stat colors for badges
  const getStatColor = (abbreviation: string) => {
    const stat = userData.stats.find(s => s.abbreviation === abbreviation);
    return stat?.color || "#9b87f5";
  };

  return (
    <div 
      className={cn(
        "quest-item glass-card", 
        typeStyles.borderColor,
        typeStyles.bgColor,
        quest.completed && "opacity-60", 
        className
      )}
    >
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              {typeStyles.icon}
              <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full bg-secondary/40 ${typeStyles.textColor}`}>
                {typeStyles.label}
              </span>
              {quest.type === "dungeon" && quest.difficulty && (
                <div className={cn("text-xs font-bold px-1.5 py-0.5 rounded ml-1", getDifficultyColor(quest.difficulty))}>
                  {quest.difficulty}-Rank
                </div>
              )}
            </div>
            <h3 className="font-semibold text-sm">{quest.title}</h3>
          </div>
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
            <div className="flex flex-wrap gap-1">
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
