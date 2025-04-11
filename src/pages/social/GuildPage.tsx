
import React, { useState, useEffect } from "react";
import { useSocial } from "@/context/SocialContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Shield, LogOut, ArrowLeft, UserPlus, Swords } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

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
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [newGuild, setNewGuild] = useState({
    name: "",
    description: "",
    motto: "",
  });
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
  
  const handleCreateGuild = async () => {
    if (!newGuild.name.trim()) return;
    
    const result = await createGuild(
      newGuild.name, 
      newGuild.description,
      newGuild.motto
    );
    
    if (result) {
      setShowCreateDialog(false);
      setNewGuild({ name: "", description: "", motto: "" });
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
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-rpg-primary" />
              {userGuild.name}
            </CardTitle>
            <CardDescription>
              {userGuild.motto || "No motto set"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Guild Description:</p>
              <p className="text-sm">{userGuild.description || "No description available."}</p>
            </div>
            
            <Separator className="my-4" />
            
            <Tabs defaultValue="quests">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="quests">Guild Quests</TabsTrigger>
                <TabsTrigger value="members">Members ({userGuild.member_count})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="quests" className="mt-4">
                {isLoadingQuests ? (
                  <div className="flex justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin text-rpg-primary" />
                  </div>
                ) : guildQuests.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground">No guild quests available</p>
                    {userGuild.user_role === 'leader' && (
                      <Button size="sm" className="mt-2">Create Quest</Button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {guildQuests.map(quest => (
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
                )}
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
                <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Shield className="mr-2 h-4 w-4" />
                      Create New Guild
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create a Guild</DialogTitle>
                      <DialogDescription>
                        Form a guild and lead other adventurers
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="guild-name">Guild Name</Label>
                        <Input
                          id="guild-name"
                          placeholder="Enter guild name"
                          value={newGuild.name}
                          onChange={(e) => setNewGuild({ ...newGuild, name: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="guild-motto">Guild Motto (Optional)</Label>
                        <Input
                          id="guild-motto"
                          placeholder="Enter guild motto"
                          value={newGuild.motto}
                          onChange={(e) => setNewGuild({ ...newGuild, motto: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="guild-description">Description (Optional)</Label>
                        <Textarea
                          id="guild-description"
                          placeholder="Describe your guild's purpose"
                          value={newGuild.description}
                          onChange={(e) => setNewGuild({ ...newGuild, description: e.target.value })}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateGuild}>Create Guild</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base">Available Guilds</CardTitle>
              <CardDescription>Join an existing guild</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingGuilds ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-rpg-primary" />
                </div>
              ) : availableGuilds.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No guilds available to join</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {availableGuilds.map(guild => (
                    <div key={guild.id} className="glass-card p-3 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-sm">{guild.name}</h4>
                          <p className="text-xs text-muted-foreground">{guild.motto || "No motto"}</p>
                          <p className="text-xs mt-1">Members: {guild.members[0].count}</p>
                        </div>
                        <Button size="sm" onClick={() => handleJoinGuild(guild.id)}>
                          <UserPlus className="h-4 w-4 mr-1" />
                          Join
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="glass-card bg-muted/50">
            <CardHeader>
              <CardTitle className="text-base">Guild Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-sm space-y-2">
                <li>Access to exclusive guild quests</li>
                <li>Weekly guild events and raids</li>
                <li>Guild-wide buffs and bonuses</li>
                <li>Track your progress against other guild members</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default GuildPage;
