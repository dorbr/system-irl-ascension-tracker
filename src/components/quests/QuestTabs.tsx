
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollText, Swords, PlusCircle, Calendar, Star, RotateCcw, AlertTriangle } from "lucide-react";
import { Quest } from "@/context/QuestContext";
import QuestList from "./QuestList";
import QuestForm from "./QuestForm";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import DungeonStrategyPlanner from "@/components/dungeons/DungeonStrategyPlanner";

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
  onResetQuests?: () => void;
}

const QuestTabs: React.FC<QuestTabsProps> = ({
  dailyQuests,
  mainQuests,
  dungeonQuests,
  completedQuests,
  availableStats,
  onCompleteQuest,
  onCreateQuest,
  onResetQuests
}) => {
  const [selectedDungeon, setSelectedDungeon] = useState<Quest | null>(null);
  const [showStrategyPlanner, setShowStrategyPlanner] = useState(false);
  
  // Get penalty quests from completed quests list
  const penaltyQuests = completedQuests.filter(quest => quest.type === "penalty" && !quest.completed);
  
  // Combine daily and main quests for the "All Quests" tab
  const allQuests = [...dailyQuests, ...mainQuests, ...penaltyQuests];
  
  const handleResetQuests = () => {
    if (onResetQuests) {
      onResetQuests();
      toast({
        title: "Quests Reset",
        description: "All quests have been reset to defaults",
      });
    }
  };
  
  const handleQuestClick = (quest: Quest) => {
    if (quest.type === "dungeon") {
      setSelectedDungeon(quest);
      setShowStrategyPlanner(true);
    }
  };
  
  return (
    <Tabs defaultValue="quests">
      <div className="flex justify-between items-center mb-4">
        <TabsList className="grid grid-cols-4 bg-secondary/50">
          <TabsTrigger value="quests" className="flex items-center gap-1">
            <ScrollText size={14} />
            <span className="hidden sm:inline">All Quests</span>
            <span className="inline-flex items-center justify-center bg-secondary/60 text-xs rounded-full h-5 min-w-5 px-1">
              {allQuests.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="dungeons" className="flex items-center gap-1">
            <Swords size={14} />
            <span className="hidden sm:inline">Dungeons</span>
            <span className="inline-flex items-center justify-center bg-secondary/60 text-xs rounded-full h-5 min-w-5 px-1">
              {dungeonQuests.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="penalties" className="flex items-center gap-1">
            <AlertTriangle size={14} />
            <span className="hidden sm:inline">Penalties</span>
            {penaltyQuests.length > 0 && (
              <span className="inline-flex items-center justify-center bg-red-500/60 text-xs rounded-full h-5 min-w-5 px-1">
                {penaltyQuests.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="create" className="flex items-center gap-1">
            <PlusCircle size={14} />
            <span className="hidden sm:inline">Create</span>
          </TabsTrigger>
        </TabsList>
        
        {onResetQuests && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleResetQuests} 
            className="flex items-center gap-1"
          >
            <RotateCcw size={14} />
            <span className="hidden sm:inline">Reset</span>
          </Button>
        )}
      </div>
      
      <TabsContent value="quests">
        <div className="flex items-center justify-between mb-2 px-1">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs">
              <Calendar size={14} className="text-blue-400" />
              <span className="text-blue-400">Daily: {dailyQuests.length}</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <Star size={14} className="text-yellow-400" />
              <span className="text-yellow-400">Main: {mainQuests.length}</span>
            </div>
            {penaltyQuests.length > 0 && (
              <div className="flex items-center gap-1 text-xs">
                <AlertTriangle size={14} className="text-red-400" />
                <span className="text-red-400">Penalties: {penaltyQuests.length}</span>
              </div>
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            Total: {allQuests.length}
          </div>
        </div>
        
        {allQuests.length > 0 ? (
          <QuestList 
            quests={allQuests} 
            onComplete={onCompleteQuest}
            onQuestClick={handleQuestClick}
            emptyMessage="No quests available" 
          />
        ) : (
          <div className="text-center py-8 px-4">
            <h3 className="font-medium text-lg mb-2">No Quests Available</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Your quest log is empty. Create your first quest to get started!
            </p>
            <PlusCircle size={40} className="mx-auto text-muted-foreground/50" />
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="dungeons">
        {dungeonQuests.length > 0 ? (
          <QuestList 
            quests={dungeonQuests} 
            onComplete={onCompleteQuest}
            onQuestClick={handleQuestClick}
            emptyMessage="No dungeons available" 
          />
        ) : (
          <div className="text-center py-8 px-4">
            <h3 className="font-medium text-lg mb-2">No Dungeon Challenges</h3>
            <p className="text-muted-foreground text-sm mb-4">
              You haven't created any dungeon challenges yet. Create your first challenge to test your limits!
            </p>
            <Swords size={40} className="mx-auto text-muted-foreground/50" />
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="penalties">
        {penaltyQuests.length > 0 ? (
          <QuestList 
            quests={penaltyQuests}
            onComplete={onCompleteQuest}
            emptyMessage="No penalty quests" 
          />
        ) : (
          <div className="text-center py-8 px-4">
            <h3 className="font-medium text-lg mb-2">No Penalty Quests</h3>
            <p className="text-muted-foreground text-sm mb-4">
              You don't have any penalty quests. Keep completing your daily quests to avoid penalties!
            </p>
            <AlertTriangle size={40} className="mx-auto text-muted-foreground/50" />
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="create">
        <QuestForm 
          availableStats={availableStats}
          onCreateQuest={onCreateQuest}
        />
      </TabsContent>
      
      {/* Dungeon Strategy Planner */}
      <DungeonStrategyPlanner
        dungeon={selectedDungeon}
        isOpen={showStrategyPlanner}
        onClose={() => setShowStrategyPlanner(false)}
      />
    </Tabs>
  );
};

export default QuestTabs;
