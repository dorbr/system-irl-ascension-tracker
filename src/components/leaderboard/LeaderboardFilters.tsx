
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FlameKindling, Swords, Sparkles } from "lucide-react";

interface LeaderboardCategory {
  id: string;
  name: string;
  icon: any;
  color: string;
}

interface LeaderboardFiltersProps {
  category: string;
  scope: string;
  onCategoryChange: (value: string) => void;
  onScopeChange: (value: string) => void;
}

const LeaderboardFilters = ({ category, scope, onCategoryChange, onScopeChange }: LeaderboardFiltersProps) => {
  const categories: LeaderboardCategory[] = [
    { id: "xp", name: "XP Gained", icon: Sparkles, color: "text-yellow-500" },
    { id: "quests", name: "Quests Completed", icon: Swords, color: "text-blue-500" },
    { id: "streaks", name: "Quest Streaks", icon: FlameKindling, color: "text-orange-500" }
  ];
  
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-4">
      <Select value={category} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map(cat => (
            <SelectItem key={cat.id} value={cat.id}>
              <div className="flex items-center">
                <cat.icon className={`h-4 w-4 mr-2 ${cat.color}`} />
                {cat.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Tabs defaultValue="global" value={scope} onValueChange={onScopeChange} className="w-full sm:w-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="global">Global</TabsTrigger>
          <TabsTrigger value="friends">Friends</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default LeaderboardFilters;
