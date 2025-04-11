
import React from "react";

interface QuestStreakProps {
  type: string;
  streak?: number;
}

const QuestStreak: React.FC<QuestStreakProps> = ({ type, streak }) => {
  if (type !== "daily" || !streak || streak <= 1) return null;
  
  return (
    <div className="text-xs font-medium text-rpg-primary ml-2">
      🔥 {streak} days
    </div>
  );
};

export default QuestStreak;
