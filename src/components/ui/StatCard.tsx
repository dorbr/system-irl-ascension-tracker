
import React from "react";
import { Stat } from "@/context/UserContext";
import { cn } from "@/lib/utils";

interface StatCardProps {
  stat: Stat;
  onClick?: () => void;
  className?: string;
  animate?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ 
  stat, 
  onClick, 
  className,
  animate = false
}) => {
  return (
    <div 
      className={cn(
        "stat-card", 
        onClick && "cursor-pointer", 
        animate && "animate-stat-increase",
        className
      )}
      onClick={onClick}
      style={{ borderLeft: `3px solid ${stat.color}` }}
    >
      <div className="flex items-center gap-2">
        <div 
          className="w-8 h-8 rounded-md flex items-center justify-center text-white font-medium"
          style={{ backgroundColor: stat.color }}
        >
          {stat.abbreviation}
        </div>
        <span className="text-xs">{stat.name}</span>
      </div>
      <div className="text-xl font-bold">{stat.value}</div>
    </div>
  );
};

export default StatCard;
