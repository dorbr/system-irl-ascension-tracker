
import React from "react";
import XpBar from "@/components/ui/XpBar";
import StatBadge from "@/components/ui/StatBadge";
import { UserData } from "@/context/UserContext";
import { useLanguage } from "@/context/LanguageContext";

interface ProfileStatsProps {
  userData: UserData;
  topStats: Array<{
    name: string;
    abbreviation: string;
    color: string;
    value: number;
  }>;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ userData, topStats }) => {
  const { t, isRtl } = useLanguage();
  
  return (
    <>
      <div className={`flex justify-between items-center mb-1 px-4 ${isRtl ? "flex-row-reverse" : ""}`}>
        <div className="text-sm">{t('level')} {userData.level}</div>
        <div className="text-sm text-muted-foreground">
          {userData.xp} / {userData.xpToNextLevel} {t('xp')}
        </div>
      </div>
      
      <XpBar
        currentXp={userData.xp}
        maxXp={userData.xpToNextLevel}
        className="mb-4"
      />
      
      <div className="mb-6">
        <h3 className={`text-sm uppercase font-medium text-muted-foreground mb-2 ${isRtl ? "text-right" : ""}`}>{t('topStats')}</h3>
        <div className="grid grid-cols-3 gap-2">
          {topStats.map((stat) => (
            <div key={stat.name} className="glass-card p-3 text-center rounded-lg">
              <StatBadge
                name={stat.name}
                abbreviation={stat.abbreviation}
                color={stat.color}
                className="mb-2 mx-auto w-12 h-8"
              />
              <div className="text-xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.name}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfileStats;
