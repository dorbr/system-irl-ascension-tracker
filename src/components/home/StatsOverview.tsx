
import React from "react";
import { useUser } from "@/context/UserContext";
import StatBadge from "../ui/StatBadge";
import { useLanguage } from "@/context/LanguageContext";

const StatsOverview: React.FC = () => {
  const { userData } = useUser();
  const { t, isRtl } = useLanguage();

  return (
    <div className="glass-card rounded-lg p-4 mb-4 animate-fade-in text-center">
      <h3 className="text-sm uppercase font-medium text-muted-foreground mb-3">
        {t("stats")}
      </h3>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-1" dir="ltr">
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
