
import React, { useState } from "react";
import { useQuests } from "@/context/QuestContext";
import { useUser } from "@/context/UserContext";
import QuestCard from "@/components/ui/QuestCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollText, Sparkles, Swords, CheckCircle, PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const QuestsPage = () => {
  const { quests, addQuest, completeQuest } = useQuests();
  const { updateUserXp, updateUserStat, userData } = useUser();
  
  // State for new quest form
  const [newQuest, setNewQuest] = useState({
    title: "",
    description: "",
    xpReward: 20,
    type: "daily" as "daily" | "main" | "dungeon",
    stats: [] as string[],
    tags: [] as string[],
  });
  
  // State for new tag/stat input
  const [newTag, setNewTag] = useState("");
  const [newStat, setNewStat] = useState("");
  
  const availableStats = userData.stats.map(stat => stat.abbreviation);
  
  const dailyQuests = quests.filter(quest => quest.type === "daily");
  const mainQuests = quests.filter(quest => quest.type === "main");
  const dungeonQuests = quests.filter(quest => quest.type === "dungeon");
  const completedQuests = quests.filter(quest => quest.completed);
  
  const handleCompleteQuest = (quest: any) => {
    if (quest.completed) return;
    
    completeQuest(quest.id);
    updateUserXp(quest.xpReward);
    
    // Also update associated stats
    quest.stats.forEach((statName: string) => {
      updateUserStat(statName, 1);
    });
    
    toast({
      title: "Quest Completed!",
      description: `You earned ${quest.xpReward} XP and improved ${quest.stats.join(", ")}`,
    });
  };
  
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
    
    addQuest(newQuest);
    
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
    });
  };

  return (
    <div className="py-4">
      <div className="glass-card rounded-lg p-4 mb-4">
        <h1 className="text-xl font-bold mb-4">Quest Log</h1>
        
        <Tabs defaultValue="daily">
          <TabsList className="grid grid-cols-5 bg-secondary/50">
            <TabsTrigger value="daily" className="flex items-center gap-1">
              <ScrollText size={14} />
              <span className="hidden sm:inline">Daily</span>
            </TabsTrigger>
            <TabsTrigger value="main" className="flex items-center gap-1">
              <Sparkles size={14} />
              <span className="hidden sm:inline">Main</span>
            </TabsTrigger>
            <TabsTrigger value="dungeon" className="flex items-center gap-1">
              <Swords size={14} />
              <span className="hidden sm:inline">Dungeon</span>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-1">
              <CheckCircle size={14} />
              <span className="hidden sm:inline">Done</span>
            </TabsTrigger>
            <TabsTrigger value="add" className="flex items-center gap-1">
              <PlusCircle size={14} />
              <span className="hidden sm:inline">Add</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily" className="space-y-3 mt-3">
            {dailyQuests.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No daily quests</p>
            ) : (
              dailyQuests.map(quest => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  onComplete={() => handleCompleteQuest(quest)}
                />
              ))
            )}
          </TabsContent>
          
          <TabsContent value="main" className="space-y-3 mt-3">
            {mainQuests.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No main quests</p>
            ) : (
              mainQuests.map(quest => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  onComplete={() => handleCompleteQuest(quest)}
                />
              ))
            )}
          </TabsContent>
          
          <TabsContent value="dungeon" className="space-y-3 mt-3">
            {dungeonQuests.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No dungeon quests</p>
            ) : (
              dungeonQuests.map(quest => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  onComplete={() => handleCompleteQuest(quest)}
                />
              ))
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-3 mt-3">
            {completedQuests.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No completed quests</p>
            ) : (
              completedQuests.slice(0, 5).map(quest => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  onComplete={() => {}}
                />
              ))
            )}
          </TabsContent>
          
          <TabsContent value="add" className="mt-3">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default QuestsPage;
