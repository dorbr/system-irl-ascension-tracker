
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { QuestDifficulty } from "@/context/QuestContext";

interface QuestFormProps {
  availableStats: string[];
  onCreateQuest: (quest: {
    title: string;
    description: string;
    xpReward: number;
    type: "daily" | "main" | "dungeon";
    stats: string[];
    tags: string[];
    difficulty?: QuestDifficulty;
  }) => void;
}

const QuestForm: React.FC<QuestFormProps> = ({ availableStats, onCreateQuest }) => {
  const [newQuest, setNewQuest] = useState({
    title: "",
    description: "",
    xpReward: 20,
    type: "daily" as "daily" | "main" | "dungeon",
    stats: [] as string[],
    tags: [] as string[],
    difficulty: "C" as QuestDifficulty,
  });
  
  // State for new tag/stat input
  const [newTag, setNewTag] = useState("");
  const [newStat, setNewStat] = useState("");
  
  const [showDifficultySelect, setShowDifficultySelect] = useState(false);
  
  // Update showDifficultySelect when type changes
  useEffect(() => {
    setShowDifficultySelect(newQuest.type === "dungeon");
  }, [newQuest.type]);
  
  const handleAddStat = () => {
    if (!newStat || newQuest.stats.includes(newStat)) return;
    setNewQuest({
      ...newQuest,
      stats: [...newQuest.stats, newStat],
    });
    setNewStat("");
  };
  
  const handleAddTag = () => {
    if (!newTag || newQuest.tags.includes(newTag)) return;
    setNewQuest({
      ...newQuest,
      tags: [...newQuest.tags, newTag],
    });
    setNewTag("");
  };
  
  const handleRemoveStat = (stat: string) => {
    setNewQuest({
      ...newQuest,
      stats: newQuest.stats.filter(s => s !== stat),
    });
  };
  
  const handleRemoveTag = (tag: string) => {
    setNewQuest({
      ...newQuest,
      tags: newQuest.tags.filter(t => t !== tag),
    });
  };
  
  const handleCreateQuest = () => {
    if (!newQuest.title.trim()) {
      toast({
        title: "Error",
        description: "Quest title is required",
        variant: "destructive",
      });
      return;
    }
    
    const questToCreate = {
      ...newQuest,
    };
    
    // Only include difficulty if it's a dungeon
    if (newQuest.type !== "dungeon") {
      delete questToCreate.difficulty;
    }
    
    onCreateQuest(questToCreate);
    
    toast({
      title: "Quest Created",
      description: "Your new quest has been added to your log",
    });
    
    // Reset form
    setNewQuest({
      title: "",
      description: "",
      xpReward: 20,
      type: "daily",
      stats: [],
      tags: [],
      difficulty: "C",
    });
  };

  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor="title">Quest Title</Label>
        <Input
          id="title"
          value={newQuest.title}
          onChange={(e) => setNewQuest({...newQuest, title: e.target.value})}
          className="bg-secondary/50 border-secondary"
          placeholder="Enter quest title"
        />
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={newQuest.description}
          onChange={(e) => setNewQuest({...newQuest, description: e.target.value})}
          className="bg-secondary/50 border-secondary"
          placeholder="What's this quest about?"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="xp">XP Reward</Label>
          <Input
            id="xp"
            type="number"
            value={newQuest.xpReward}
            onChange={(e) => setNewQuest({...newQuest, xpReward: Number(e.target.value)})}
            className="bg-secondary/50 border-secondary"
          />
        </div>
        
        <div>
          <Label htmlFor="type">Quest Type</Label>
          <select
            id="type"
            value={newQuest.type}
            onChange={(e) => setNewQuest({...newQuest, type: e.target.value as any})}
            className="w-full h-10 rounded-md bg-secondary/50 border-secondary text-sm"
          >
            <option value="daily">Daily Quest</option>
            <option value="main">Main Quest</option>
            <option value="dungeon">Dungeon</option>
          </select>
        </div>
      </div>
      
      {showDifficultySelect && (
        <div>
          <Label htmlFor="difficulty">Dungeon Difficulty</Label>
          <select
            id="difficulty"
            value={newQuest.difficulty}
            onChange={(e) => setNewQuest({...newQuest, difficulty: e.target.value as QuestDifficulty})}
            className="w-full h-10 rounded-md bg-secondary/50 border-secondary text-sm"
          >
            <option value="E">E Rank (Easiest)</option>
            <option value="D">D Rank</option>
            <option value="C">C Rank (Average)</option>
            <option value="B">B Rank</option>
            <option value="A">A Rank</option>
            <option value="S">S Rank (Hardest)</option>
          </select>
        </div>
      )}
      
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
          <Button type="button" onClick={handleAddStat} size="sm">Add</Button>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {newQuest.stats.map(stat => (
            <div 
              key={stat} 
              className="px-2 py-1 rounded-full bg-rpg-primary/20 text-rpg-primary text-xs flex items-center"
            >
              {stat}
              <button 
                onClick={() => handleRemoveStat(stat)} 
                className="ml-1 w-4 h-4 rounded-full bg-rpg-primary/30 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <Label>Tags</Label>
        <div className="flex items-center gap-2 mb-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="flex-1 bg-secondary/50 border-secondary"
            placeholder="Health, Focus, etc."
          />
          <Button type="button" onClick={handleAddTag} size="sm">Add</Button>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {newQuest.tags.map(tag => (
            <div 
              key={tag} 
              className="px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground text-xs flex items-center"
            >
              {tag}
              <button 
                onClick={() => handleRemoveTag(tag)} 
                className="ml-1 w-4 h-4 rounded-full bg-secondary/80 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <Button onClick={handleCreateQuest} className="w-full">Create Quest</Button>
    </div>
  );
};

export default QuestForm;
