
import React from "react";
import { useUser } from "@/context/UserContext";
import XpBar from "../ui/XpBar";

const UserInfo: React.FC = () => {
  const { userData } = useUser();

  return (
    <div className="glass-card rounded-lg p-4 mb-4 animate-fade-in">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="font-bold text-xl">{userData.name}</h2>
          <div className="text-sm text-muted-foreground">
            <span className="text-rpg-primary font-medium">{userData.class.name}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-glow">Lv. {userData.level}</div>
          <div className="text-xs text-muted-foreground">
            {userData.xp} / {userData.xpToNextLevel} XP
          </div>
        </div>
      </div>
      
      <XpBar currentXp={userData.xp} maxXp={userData.xpToNextLevel} />
    </div>
  );
};

export default UserInfo;
