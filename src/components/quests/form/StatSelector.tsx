
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, X } from "lucide-react";

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
    <div className="space-y-2">
      <Label className="text-sm font-medium flex items-center gap-1">
        <Activity size={16} className="text-muted-foreground" />
        <span>Stats</span>
      </Label>
      <div className="flex items-center gap-2 mb-2">
        <Select
          value={newStat}
          onValueChange={setNewStat}
        >
          <SelectTrigger 
            className="flex-1 bg-secondary/50 border-secondary focus:border-rpg-primary focus:ring-rpg-primary/20"
          >
            <SelectValue placeholder="Select a Stat" />
          </SelectTrigger>
          <SelectContent>
            {/* Replace empty string with a non-empty placeholder value */}
            <SelectItem value="select-placeholder" disabled>Select a Stat</SelectItem>
            {availableStats.map(stat => (
              <SelectItem key={stat} value={stat}>{stat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button 
          type="button" 
          onClick={() => onAddStat(newStat)} 
          size="sm"
          variant="outline"
          className="border-rpg-primary/50 hover:bg-rpg-primary/10"
          disabled={!newStat || newStat === "select-placeholder"}
        >
          Add
        </Button>
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
              className="ml-1 w-4 h-4 rounded-full bg-rpg-primary/30 flex items-center justify-center hover:bg-rpg-primary/40"
              aria-label={`Remove ${stat} stat`}
            >
              <X size={12} />
            </button>
          </div>
        ))}
        {selectedStats.length === 0 && (
          <div className="text-xs text-muted-foreground italic">No stats selected yet</div>
        )}
      </div>
    </div>
  );
};

export default StatSelector;
