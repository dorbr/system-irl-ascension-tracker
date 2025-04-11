
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollText, Swords, PlusCircle } from "lucide-react";
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
    difficulty?: "E" | "D" | "C" | "B" | "A" | "S";
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
  // Combine daily and main quests for the "All Quests" tab
  const allQuests = [...dailyQuests, ...mainQuests];
  
  return (
    <Tabs defaultValue="quests">
      <TabsList className="grid grid-cols-3 bg-secondary/50">
        <TabsTrigger value="quests" className="flex items-center gap-1">
          <ScrollText size={14} />
          <span className="hidden sm:inline">All Quests</span>
        </TabsTrigger>
        <TabsTrigger value="dungeons" className="flex items-center gap-1">
          <Swords size={14} />
          <span className="hidden sm:inline">Dungeons</span>
        </TabsTrigger>
        <TabsTrigger value="create" className="flex items-center gap-1">
          <PlusCircle size={14} />
          <span className="hidden sm:inline">Create</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="quests">
        <QuestList 
          quests={allQuests} 
          onComplete={onCompleteQuest} 
          emptyMessage="No quests available" 
        />
      </TabsContent>
      
      <TabsContent value="dungeons">
        <QuestList 
          quests={dungeonQuests} 
          onComplete={onCompleteQuest} 
          emptyMessage="No dungeons available" 
        />
      </TabsContent>
      
      <TabsContent value="create">
        <QuestForm 
          availableStats={availableStats}
          onCreateQuest={onCreateQuest}
        />
      </TabsContent>
    </Tabs>
  );
};

export default QuestTabs;
