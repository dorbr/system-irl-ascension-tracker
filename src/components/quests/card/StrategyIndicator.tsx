
import React from "react";
import { Scroll } from "lucide-react";

interface StrategyIndicatorProps {
  isClickable: boolean;
}

const StrategyIndicator: React.FC<StrategyIndicatorProps> = ({ isClickable }) => {
  if (!isClickable) return null;
  
  return (
    <div className="absolute bottom-3 right-3 text-xs flex items-center gap-1 bg-rpg-accent/10 px-1.5 py-0.5 rounded-full">
      <Scroll size={12} className="text-rpg-accent" />
      <span className="text-rpg-accent font-medium">Strategy</span>
    </div>
  );
};

export default StrategyIndicator;
