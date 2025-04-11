
import React, { useState, useEffect } from "react";
import { useSocial } from "@/context/SocialContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, LogOut, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

// Import guild components
import GuildHeader from "@/components/guild/GuildHeader";
import GuildDescription from "@/components/guild/GuildDescription";
import GuildQuestsList from "@/components/guild/GuildQuestsList";
import CreateGuildForm from "@/components/guild/CreateGuildForm";
import AvailableGuildsList from "@/components/guild/AvailableGuildsList";
import GuildBenefits from "@/components/guild/GuildBenefits";

interface GuildQuest {
  id: string;
  title: string;
  description: string | null;
  xp_reward: number;
  status: string;
  created_at: string;
  end_date: string | null;
}

const GuildPage = () => {
  const { userGuild, createGuild, joinGuild, leaveGuild, isLoading } = useSocial();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [guildQuests, setGuildQuests] = useState<GuildQuest[]>([]);
  const [availableGuilds, setAvailableGuilds] = useState<any[]>([]);
  const [isLoadingQuests, setIsLoadingQuests] = useState(false);
  const [isLoadingGuilds, setIsLoadingGuilds] = useState(false);
  
  useEffect(() => {
    if (userGuild) {
      fetchGuildQuests();
    } else {
      fetchAvailableGuilds();
    }
  }, [userGuild]);
  
  const fetchGuildQuests = async () => {
    if (!userGuild) return;
    
    setIsLoadingQuests(true);
    try {
      const { data } = await supabase
        .from('guild_quests')
        .select('*')
        .eq('guild_id', userGuild.id)
        .order('created_at', { ascending: false });
        
      setGuildQuests(data || []);
    } catch (error) {
      console.error('Error fetching guild quests:', error);
    } finally {
      setIsLoadingQuests(false);
    }
  };
  
  const fetchAvailableGuilds = async () => {
    setIsLoadingGuilds(true);
    try {
      const { data } = await supabase
        .from('guilds')
        .select('*, members:guild_members(count)')
        .order('created_at', { ascending: false })
        .limit(5);
        
      setAvailableGuilds(data || []);
    } catch (error) {
      console.error('Error fetching available guilds:', error);
    } finally {
      setIsLoadingGuilds(false);
    }
  };
  
  const handleCreateGuild = async (name: string, description: string, motto: string) => {
    const result = await createGuild(name, description, motto);
    if (result) {
      setShowCreateDialog(false);
    }
  };
  
  const handleJoinGuild = async (guildId: string) => {
    await joinGuild(guildId);
  };
  
  const handleLeaveGuild = async () => {
    if (confirm("Are you sure you want to leave this guild?")) {
      await leaveGuild();
    }
  };
  
  return (
    <div className="py-4">
      <div className="mb-4 flex items-center">
        <Link to="/social" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-5 w-5 mr-2" />
        </Link>
        <h1 className="text-xl font-bold">Guild</h1>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-rpg-primary" />
        </div>
      ) : userGuild ? (
        <Card className="glass-card">
          <GuildHeader name={userGuild.name} motto={userGuild.motto} />
          <CardContent>
            <GuildDescription description={userGuild.description} />
            
            <Separator className="my-4" />
            
            <Tabs defaultValue="quests">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="quests">Guild Quests</TabsTrigger>
                <TabsTrigger value="members">Members ({userGuild.member_count})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="quests" className="mt-4">
                <GuildQuestsList 
                  quests={guildQuests}
                  isLoading={isLoadingQuests}
                  isLeader={userGuild.user_role === 'leader'}
                />
              </TabsContent>
              
              <TabsContent value="members" className="mt-4">
                <div className="text-center py-4">
                  <p className="text-muted-foreground">Member list will be displayed here</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button variant="destructive" onClick={handleLeaveGuild} className="w-full">
              <LogOut className="h-4 w-4 mr-2" />
              Leave Guild
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>You're not in a guild</CardTitle>
              <CardDescription>
                Join a guild to team up with other adventurers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-2">
                <CreateGuildForm
                  isOpen={showCreateDialog}
                  onOpenChange={setShowCreateDialog}
                  onCreateGuild={handleCreateGuild}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base">Available Guilds</CardTitle>
              <CardDescription>Join an existing guild</CardDescription>
            </CardHeader>
            <CardContent>
              <AvailableGuildsList
                guilds={availableGuilds}
                isLoading={isLoadingGuilds}
                onJoinGuild={handleJoinGuild}
              />
            </CardContent>
          </Card>
          
          <GuildBenefits />
        </div>
      )}
    </div>
  );
};

export default GuildPage;
