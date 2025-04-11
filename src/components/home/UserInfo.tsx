
import React from "react";
import { useUser } from "@/context/UserContext";
import XpBar from "../ui/XpBar";
import { useLanguage } from "@/context/LanguageContext";

const UserInfo: React.FC = () => {
  const { userData } = useUser();
  const { t, isRtl } = useLanguage();

  // Format the level display for Hebrew
  const getFormattedLevel = () => {
    if (isRtl) {
      return `רמה ${userData.level}`;
    } else {
      return `${t("level")} ${userData.level}`;
    }
  };

  return (
    <div className="glass-card rounded-lg p-4 mb-4 animate-fade-in text-center">
      <div className="flex justify-between items-center mb-2">
        <div className={isRtl ? "text-right" : "text-left"}>
          <h2 className="font-bold text-xl">{userData.name}</h2>
          <div className="text-sm text-muted-foreground">
            <span className="text-rpg-primary font-medium">{userData.class.name}</span>
          </div>
        </div>
        <div className={isRtl ? "text-left" : "text-right"}>
          <div className="text-xl font-bold text-glow">
            {getFormattedLevel()}
          </div>
          <div className="text-xs text-muted-foreground">
            {userData.xp} / {userData.xpToNextLevel} {t("xp")}
          </div>
        </div>
      </div>
      
      <XpBar currentXp={userData.xp} maxXp={userData.xpToNextLevel} />
    </div>
  );
};

export default UserInfo;
