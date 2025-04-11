
import React from "react";
import { useUser } from "@/context/UserContext";
import StatBadge from "../ui/StatBadge";

const StatsOverview: React.FC = () => {
  const { userData } = useUser();

  return (
    <div className="glass-card rounded-lg p-4 mb-4 animate-fade-in">
      <h3 className="text-sm uppercase font-medium text-muted-foreground mb-3">Stats</h3>
      <div className="grid grid-cols-6 gap-1 mb-1">
        {userData.stats.map((stat) => (
          <div key={stat.name} className="flex flex-col items-center">
            <StatBadge
              name={stat.name}
              abbreviation={stat.abbreviation}
              color={stat.color}
              className="mb-1 w-10 h-6"
            />
            <span className="text-sm font-bold">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsOverview;
