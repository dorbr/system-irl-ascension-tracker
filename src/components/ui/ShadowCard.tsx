
import React from "react";
import { Shadow } from "@/context/ShadowContext";
import StatBadge from "./StatBadge";
import { useUser } from "@/context/UserContext";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

interface ShadowCardProps {
  shadow: Shadow;
  className?: string;
}

const ShadowCard: React.FC<ShadowCardProps> = ({ shadow, className }) => {
  const { userData } = useUser();
  const { t } = useLanguage();
  
  // Get stat colors for badges
  const getStatColor = (abbreviation: string) => {
    const stat = userData.stats.find(s => s.abbreviation === abbreviation);
    return stat?.color || "#9b87f5";
  };

  return (
    <div className={cn("glass-card rounded-lg p-4 text-center", className)}>
      <div className="flex flex-col items-center mb-3">
        <h3 className="font-semibold text-glow mb-1 text-center">{shadow.name}</h3>
        <span className="text-xs text-muted-foreground text-center">{shadow.date}</span>
      </div>
      
      <div className="space-y-3 text-sm">
        <div className="flex flex-col items-center">
          <p className="text-xs font-medium uppercase text-muted-foreground mb-1 text-center">{t('event')}</p>
          <p className="text-center">{shadow.event}</p>
        </div>
        
        <div className="flex flex-col items-center">
          <p className="text-xs font-medium uppercase text-muted-foreground mb-1 text-center">{t('reflection')}</p>
          <p className="italic text-muted-foreground text-center">{shadow.reflection}</p>
        </div>
        
        <div className="flex flex-col items-center">
          <p className="text-xs font-medium uppercase text-muted-foreground mb-1 text-center">{t('insight')}</p>
          <p className="text-rpg-secondary text-center">{shadow.insight}</p>
        </div>
      </div>
      
      <div className="mt-3 flex justify-center gap-1">
        {shadow.stats.map((stat) => (
          <StatBadge
            key={stat}
            name=""
            abbreviation={stat}
            color={getStatColor(stat)}
          />
        ))}
      </div>
    </div>
  );
};

export default ShadowCard;
