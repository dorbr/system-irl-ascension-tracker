
import React from "react";
import { useUser } from "@/context/UserContext";
import { Coins, Droplet, PiggyBank } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ResourcesOverview: React.FC = () => {
  const { userData } = useUser();
  const { t, isRtl } = useLanguage();

  return (
    <div className="glass-card rounded-lg p-4 mb-4 animate-fade-in text-center">
      <h3 className="text-sm uppercase font-medium text-muted-foreground mb-3">
        {t("resources")}
      </h3>
      
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col items-center p-2 bg-secondary/30 rounded-md">
          <div className="flex items-center gap-1 mb-1">
            <Coins size={16} className="text-yellow-500" />
            <span className="text-xs font-medium">{t("gold")}</span>
          </div>
          <span className="text-lg font-bold text-yellow-500">{userData.gold}</span>
          <span className="text-xs text-muted-foreground">{t("income")}</span>
        </div>
        
        <div className="flex flex-col items-center p-2 bg-secondary/30 rounded-md">
          <div className="flex items-center gap-1 mb-1">
            <Droplet size={16} className="text-blue-500" />
            <span className="text-xs font-medium">{t("mana")}</span>
          </div>
          <span className="text-lg font-bold text-blue-500">{userData.mana}</span>
          <span className="text-xs text-muted-foreground">{t("expenses")}</span>
        </div>
        
        <div className="flex flex-col items-center p-2 bg-secondary/30 rounded-md">
          <div className="flex items-center gap-1 mb-1">
            <PiggyBank size={16} className="text-green-500" />
            <span className="text-xs font-medium">{t("net")}</span>
          </div>
          <span className="text-lg font-bold text-green-500">{userData.netWorth}</span>
          <span className="text-xs text-muted-foreground">{t("netWorth")}</span>
        </div>
      </div>
    </div>
  );
};

export default ResourcesOverview;
