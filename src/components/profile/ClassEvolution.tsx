
import React from "react";
import { UserData } from "@/context/UserContext";
import { useLanguage } from "@/context/LanguageContext";
import { useUser } from "@/context/UserContext";

interface ClassEvolutionProps {
  userData: UserData;
}

const ClassEvolution: React.FC<ClassEvolutionProps> = ({ userData }) => {
  const { t, isRtl } = useLanguage();
  const { getLocalizedClassName } = useUser();
  
  // Add console.log to debug
  console.log("ClassEvolution - Current class:", userData.class.name);
  console.log("ClassEvolution - Translated class:", getLocalizedClassName(userData.class.name));
  
  return (
    <div className="glass-card p-3 rounded-lg">
      <h3 className="text-sm font-medium mb-1 text-center">{t('classEvolution')}</h3>
      <p className="text-xs text-muted-foreground mb-3 text-center">
        {t('class')}: {getLocalizedClassName(userData.class.name)}
      </p>
      
      {userData.class.nextClassOptions && (
        <div className="text-center">
          <div className="text-xs text-muted-foreground mb-1">{t('nextClasses')}:</div>
          <div className="flex flex-wrap gap-1 justify-center">
            {userData.class.nextClassOptions.map(nextClass => (
              <div key={nextClass} className="text-xs px-2 py-1 bg-rpg-primary/20 rounded-full text-rpg-primary">
                {getLocalizedClassName(nextClass)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassEvolution;
