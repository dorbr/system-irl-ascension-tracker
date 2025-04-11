
import React from "react";
import { UserData } from "@/context/UserContext";
import { useLanguage } from "@/context/LanguageContext";

interface ClassEvolutionProps {
  userData: UserData;
}

const ClassEvolution: React.FC<ClassEvolutionProps> = ({ userData }) => {
  const { t, isRtl } = useLanguage();
  
  return (
    <div className="glass-card p-3 rounded-lg">
      <h3 className={`text-sm font-medium mb-1 ${isRtl ? "text-right" : ""}`}>{t('classEvolution')}</h3>
      <p className={`text-xs text-muted-foreground mb-3 ${isRtl ? "text-right" : ""}`}>
        {t('class')}: {userData.class.name}
      </p>
      
      {userData.class.nextClassOptions && (
        <div className={isRtl ? "text-right" : ""}>
          <div className="text-xs text-muted-foreground mb-1">{t('nextClasses')}:</div>
          <div className="flex flex-wrap gap-1">
            {userData.class.nextClassOptions.map(nextClass => (
              <div key={nextClass} className="text-xs px-2 py-1 bg-rpg-primary/20 rounded-full text-rpg-primary">
                {nextClass}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassEvolution;
