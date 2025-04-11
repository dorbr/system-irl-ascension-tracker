
import React from "react";
import { cn } from "@/lib/utils";

interface XpBarProps {
  currentXp: number;
  maxXp: number;
  className?: string;
}

const XpBar: React.FC<XpBarProps> = ({ currentXp, maxXp, className }) => {
  const percentage = Math.min((currentXp / maxXp) * 100, 100);

  return (
    <div className={cn("progress-bar", className)}>
      <div
        className="progress-fill animate-pulse-glow"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default XpBar;
