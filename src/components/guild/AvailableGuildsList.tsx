
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, UserPlus } from "lucide-react";

interface AvailableGuild {
  id: string;
  name: string;
  motto: string | null;
  members: { count: number }[];
}

interface AvailableGuildsListProps {
  guilds: AvailableGuild[];
  isLoading: boolean;
  onJoinGuild: (guildId: string) => Promise<void>;
}

const AvailableGuildsList = ({ guilds, isLoading, onJoinGuild }: AvailableGuildsListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <Loader2 className="h-6 w-6 animate-spin text-rpg-primary" />
      </div>
    );
  }

  if (guilds.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">No guilds available to join</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {guilds.map(guild => (
        <div key={guild.id} className="glass-card p-3 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-sm">{guild.name}</h4>
              <p className="text-xs text-muted-foreground">{guild.motto || "No motto"}</p>
              <p className="text-xs mt-1">Members: {guild.members[0].count}</p>
            </div>
            <Button size="sm" onClick={() => onJoinGuild(guild.id)}>
              <UserPlus className="h-4 w-4 mr-1" />
              Join
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AvailableGuildsList;
