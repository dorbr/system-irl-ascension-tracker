
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { QuestDifficulty } from "@/context/QuestContext";
import QuestTypeSelector from "./form/QuestTypeSelector";
import QuestDetails from "./form/QuestDetails";
import StatSelector from "./form/StatSelector";
import TagSelector from "./form/TagSelector";

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
  const [isDungeon, setIsDungeon] = useState(false);
  
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
  
  // Update quest type when isDungeon changes
  useEffect(() => {
    if (isDungeon) {
      setNewQuest(prev => ({ ...prev, type: "dungeon" }));
    } else {
      setNewQuest(prev => ({ ...prev, type: "daily" }));
    }
  }, [isDungeon]);
  
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
        description: "Title is required",
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
      title: isDungeon ? "Dungeon Created" : "Quest Created",
      description: isDungeon 
        ? "Your new dungeon challenge has been added" 
        : "Your new quest has been added to your log",
    });
    
    // Reset form
    setNewQuest({
      title: "",
      description: "",
      xpReward: isDungeon ? 50 : 20, // Higher default XP for dungeons
      type: isDungeon ? "dungeon" : "daily",
      stats: [],
      tags: [],
      difficulty: "C",
    });
  };

  return (
    <div className="space-y-3">
      <QuestTypeSelector 
        isDungeon={isDungeon} 
        setIsDungeon={setIsDungeon} 
      />
      
      <QuestDetails
        title={newQuest.title}
        setTitle={(title) => setNewQuest({...newQuest, title})}
        description={newQuest.description}
        setDescription={(description) => setNewQuest({...newQuest, description})}
        xpReward={newQuest.xpReward}
        setXpReward={(xpReward) => setNewQuest({...newQuest, xpReward})}
        type={newQuest.type}
        setType={(type) => setNewQuest({...newQuest, type})}
        difficulty={newQuest.difficulty}
        setDifficulty={(difficulty) => setNewQuest({...newQuest, difficulty})}
        isDungeon={isDungeon}
      />
      
      <StatSelector
        availableStats={availableStats}
        selectedStats={newQuest.stats}
        onAddStat={handleAddStat}
        onRemoveStat={handleRemoveStat}
        newStat={newStat}
        setNewStat={setNewStat}
      />
      
      <TagSelector
        tags={newQuest.tags}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
        newTag={newTag}
        setNewTag={setNewTag}
      />
      
      <Button onClick={handleCreateQuest} className="w-full">
        {isDungeon ? "Create Dungeon Challenge" : "Create Quest"}
      </Button>
    </div>
  );
};

export default QuestForm;
