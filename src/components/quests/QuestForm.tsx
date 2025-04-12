
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { QuestDifficulty } from "@/context/QuestContext";
import QuestTypeSelector from "./form/QuestTypeSelector";
import QuestDetails from "./form/QuestDetails";
import StatSelector from "./form/StatSelector";
import TagSelector from "./form/TagSelector";
import { useLanguage } from "@/context/LanguageContext";

interface QuestFormProps {
  availableStats: string[];
  onCreateQuest: (quest: {
    title: string;
    description: string;
    xpReward: number;
    type: "daily" | "main" | "dungeon" | "penalty" | "reward";
    stats: string[];
    tags: string[];
    difficulty?: QuestDifficulty;
  }) => void;
}

const QuestForm: React.FC<QuestFormProps> = ({ availableStats, onCreateQuest }) => {
  const { t, isRtl } = useLanguage();
  const [isDungeon, setIsDungeon] = useState(false);
  
  const [newQuest, setNewQuest] = useState({
    title: "",
    description: "",
    xpReward: isDungeon ? 50 : 20,
    type: "daily" as "daily" | "main" | "dungeon" | "penalty" | "reward",
    stats: [] as string[],
    tags: [] as string[],
    difficulty: "C" as QuestDifficulty,
  });
  
  // State for new tag/stat input
  const [newTag, setNewTag] = useState("");
  const [newStat, setNewStat] = useState("");
  
  // Update quest type and default XP when isDungeon changes
  useEffect(() => {
    if (isDungeon) {
      setNewQuest(prev => ({ 
        ...prev, 
        type: "dungeon", 
        xpReward: prev.xpReward < 50 ? 50 : prev.xpReward 
      }));
    }
  }, [isDungeon]);
  
  const handleAddStat = (stat: string) => {
    // Skip if stat is empty, the placeholder value, or already included
    if (!stat || stat === "select-placeholder" || newQuest.stats.includes(stat)) return;
    
    setNewQuest({
      ...newQuest,
      stats: [...newQuest.stats, stat],
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
        title: t('error'),
        description: t('questName') + " " + t('is_required'),
        variant: "destructive",
      });
      return;
    }
    
    if (newQuest.stats.length === 0) {
      toast({
        title: t('error'),
        description: t('selectStat'),
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
      title: isDungeon ? t('dungeon') + " " + t('created') : t('quests') + " " + t('created'),
      description: isDungeon 
        ? t('newDungeonAddedDesc')
        : t('newQuestAddedDesc'),
    });
    
    // Reset form
    setNewQuest({
      title: "",
      description: "",
      xpReward: isDungeon ? 50 : 20,
      type: isDungeon ? "dungeon" : "daily",
      stats: [],
      tags: [],
      difficulty: "C",
    });
    setNewStat("");
    setNewTag("");
  };

  return (
    <div className="space-y-4 pb-1">
      <QuestTypeSelector 
        isDungeon={isDungeon} 
        setIsDungeon={setIsDungeon} 
      />
      
      <div className="bg-background/30 p-3 rounded-md border border-secondary/50">
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
      </div>
      
      <div className="bg-background/30 p-3 rounded-md border border-secondary/50">
        <StatSelector
          availableStats={availableStats}
          selectedStats={newQuest.stats}
          onAddStat={handleAddStat}
          onRemoveStat={handleRemoveStat}
          newStat={newStat}
          setNewStat={setNewStat}
        />
      </div>
      
      <div className="bg-background/30 p-3 rounded-md border border-secondary/50">
        <TagSelector
          tags={newQuest.tags}
          onAddTag={handleAddTag}
          onRemoveTag={handleRemoveTag}
          newTag={newTag}
          setNewTag={setNewTag}
        />
      </div>
      
      <Button 
        onClick={handleCreateQuest} 
        className={`w-full ${isDungeon ? "bg-rpg-accent hover:bg-rpg-accent/90" : "bg-rpg-primary hover:bg-rpg-primary/90"}`}
      >
        {isDungeon ? t('createDungeonBtn') : t('createQuestBtn')}
      </Button>
    </div>
  );
};

export default QuestForm;
