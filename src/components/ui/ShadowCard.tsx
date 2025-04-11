
import React from "react";
import { Shadow } from "@/context/ShadowContext";
import StatBadge from "./StatBadge";
import { useUser } from "@/context/UserContext";
import { cn } from "@/lib/utils";

interface ShadowCardProps {
  shadow: Shadow;
  className?: string;
}

const ShadowCard: React.FC<ShadowCardProps> = ({ shadow, className }) => {
  const { userData } = useUser();
  
  // Get stat colors for badges
  const getStatColor = (abbreviation: string) => {
    const stat = userData.stats.find(s => s.abbreviation === abbreviation);
    return stat?.color || "#9b87f5";
  };

  return (
    <div className={cn("glass-card rounded-lg p-4", className)}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-glow">{shadow.name}</h3>
        <span className="text-xs text-muted-foreground">{shadow.date}</span>
      </div>
      
      <div className="space-y-3 text-sm">
        <div>
          <p className="text-xs font-medium uppercase text-muted-foreground mb-1">Event</p>
          <p>{shadow.event}</p>
        </div>
        
        <div>
          <p className="text-xs font-medium uppercase text-muted-foreground mb-1">Reflection</p>
          <p className="italic text-muted-foreground">{shadow.reflection}</p>
        </div>
        
        <div>
          <p className="text-xs font-medium uppercase text-muted-foreground mb-1">Insight</p>
          <p className="text-rpg-secondary">{shadow.insight}</p>
        </div>
      </div>
      
      <div className="mt-3 flex gap-1">
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
