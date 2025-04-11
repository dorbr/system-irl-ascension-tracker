
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollText, Sparkles, Swords, CheckCircle, PlusCircle } from "lucide-react";
import { Quest } from "@/context/QuestContext";
import QuestList from "./QuestList";
import QuestForm from "./QuestForm";

interface QuestTabsProps {
  dailyQuests: Quest[];
  mainQuests: Quest[];
  dungeonQuests: Quest[];
  completedQuests: Quest[];
  availableStats: string[];
  onCompleteQuest: (quest: Quest) => void;
  onCreateQuest: (quest: {
    title: string;
    description: string;
    xpReward: number;
    type: "daily" | "main" | "dungeon";
    stats: string[];
    tags: string[];
  }) => void;
}

const QuestTabs: React.FC<QuestTabsProps> = ({
  dailyQuests,
  mainQuests,
  dungeonQuests,
  completedQuests,
  availableStats,
  onCompleteQuest,
  onCreateQuest
}) => {
  return (
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
      
      <TabsContent value="daily">
        <QuestList 
          quests={dailyQuests} 
          onComplete={onCompleteQuest} 
          emptyMessage="No daily quests" 
        />
      </TabsContent>
      
      <TabsContent value="main">
        <QuestList 
          quests={mainQuests} 
          onComplete={onCompleteQuest} 
          emptyMessage="No main quests" 
        />
      </TabsContent>
      
      <TabsContent value="dungeon">
        <QuestList 
          quests={dungeonQuests} 
          onComplete={onCompleteQuest} 
          emptyMessage="No dungeon quests" 
        />
      </TabsContent>
      
      <TabsContent value="completed">
        <QuestList 
          quests={completedQuests.slice(0, 5)} 
          onComplete={onCompleteQuest} 
          emptyMessage="No completed quests" 
        />
      </TabsContent>
      
      <TabsContent value="add">
        <QuestForm 
          availableStats={availableStats}
          onCreateQuest={onCreateQuest}
        />
      </TabsContent>
    </Tabs>
  );
};

export default QuestTabs;
