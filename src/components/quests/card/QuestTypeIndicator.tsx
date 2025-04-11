
import React from "react";
import { Award, Calendar, Scroll, Shield, Star, Sword } from "lucide-react";
import { cn } from "@/lib/utils";

export type QuestType = "main" | "daily" | "penalty" | "reward" | "dungeon";

interface QuestTypeStyles {
  icon: React.ReactNode;
  borderColor: string;
  bgColor: string;
  label: string;
  textColor: string;
}

interface QuestTypeIndicatorProps {
  type: QuestType;
  difficulty?: string;
}

const getQuestTypeStyles = (type: QuestType): QuestTypeStyles => {
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
        icon: <Sword size={16} className="text-rpg-accent" />,
        borderColor: "border-rpg-accent/30",
        bgColor: "bg-rpg-accent/5",
        label: "Dungeon Challenge",
        textColor: "text-rpg-accent"
      };
  }
};

export const QuestTypeIndicator: React.FC<QuestTypeIndicatorProps> = ({ type, difficulty }) => {
  const typeStyles = getQuestTypeStyles(type);
  
  return (
    <div className="flex items-center gap-1.5">
      {typeStyles.icon}
      <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full bg-secondary/40 ${typeStyles.textColor}`}>
        {typeStyles.label}
      </span>
    </div>
  );
};

export { getQuestTypeStyles };
