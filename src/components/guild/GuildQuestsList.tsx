
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface GuildQuest {
  id: string;
  title: string;
  description: string | null;
  xp_reward: number;
  status: string;
  created_at: string;
  end_date: string | null;
}

interface GuildQuestsListProps {
  quests: GuildQuest[];
  isLoading: boolean;
  isLeader: boolean;
  onCreateQuest?: () => void;
}

const GuildQuestsList = ({ quests, isLoading, isLeader, onCreateQuest }: GuildQuestsListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <Loader2 className="h-6 w-6 animate-spin text-rpg-primary" />
      </div>
    );
  }

  if (quests.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">No guild quests available</p>
        {isLeader && onCreateQuest && (
          <Button size="sm" className="mt-2" onClick={onCreateQuest}>Create Quest</Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {quests.map(quest => (
        <div key={quest.id} className="glass-card p-3 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-sm">{quest.title}</h4>
              <p className="text-xs text-muted-foreground">{quest.description}</p>
            </div>
            <div className="text-xs text-rpg-primary font-semibold">
              +{quest.xp_reward} XP
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GuildQuestsList;
