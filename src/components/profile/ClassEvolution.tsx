
import React from "react";
import { UserData } from "@/context/UserContext";

interface ClassEvolutionProps {
  userData: UserData;
}

const ClassEvolution: React.FC<ClassEvolutionProps> = ({ userData }) => {
  return (
    <div className="glass-card p-3 rounded-lg">
      <h3 className="text-sm font-medium mb-1">Class Evolution</h3>
      <p className="text-xs text-muted-foreground mb-3">
        Your current class is {userData.class.name}. Continue gaining XP and completing quests to evolve.
      </p>
      
      {userData.class.nextClassOptions && (
        <div>
          <div className="text-xs text-muted-foreground mb-1">Next potential classes:</div>
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
