
import React from "react";
import StatBadge from "@/components/ui/StatBadge";

interface QuestStatsProps {
  stats: string[];
  getStatColor: (abbreviation: string) => string;
}

const QuestStats: React.FC<QuestStatsProps> = ({ stats, getStatColor }) => {
  if (stats.length === 0) return null;
  
  return (
    <div className="flex flex-wrap gap-1 mb-3">
      {stats.map((stat) => (
        <StatBadge
          key={stat}
          name=""
          abbreviation={stat}
          color={getStatColor(stat)}
        />
      ))}
    </div>
  );
};

export default QuestStats;
