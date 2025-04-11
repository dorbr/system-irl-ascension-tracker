
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface StatSelectorProps {
  availableStats: string[];
  selectedStats: string[];
  onAddStat: (stat: string) => void;
  onRemoveStat: (stat: string) => void;
  newStat: string;
  setNewStat: (stat: string) => void;
}

const StatSelector: React.FC<StatSelectorProps> = ({ 
  availableStats, 
  selectedStats, 
  onAddStat, 
  onRemoveStat, 
  newStat, 
  setNewStat 
}) => {
  return (
    <div>
      <Label>Stats</Label>
      <div className="flex items-center gap-2 mb-2">
        <select
          value={newStat}
          onChange={(e) => setNewStat(e.target.value)}
          className="flex-1 h-10 rounded-md bg-secondary/50 border-secondary text-sm"
        >
          <option value="">Select a Stat</option>
          {availableStats.map(stat => (
            <option key={stat} value={stat}>{stat}</option>
          ))}
        </select>
        <Button type="button" onClick={() => onAddStat(newStat)} size="sm">Add</Button>
      </div>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {selectedStats.map(stat => (
          <div 
            key={stat} 
            className="px-2 py-1 rounded-full bg-rpg-primary/20 text-rpg-primary text-xs flex items-center"
          >
            {stat}
            <button 
              onClick={() => onRemoveStat(stat)} 
              className="ml-1 w-4 h-4 rounded-full bg-rpg-primary/30 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatSelector;
