
import React, { useState } from "react";
import { useSocial } from "@/context/SocialContext";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2, Users, UserPlus, Copy, LogOut, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const PartyPage = () => {
  const { userParty, createParty, joinPartyWithCode, leaveParty, isLoading, refreshSocialData } = useSocial();
  const [joinCode, setJoinCode] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [newParty, setNewParty] = useState({
    name: "",
    description: "",
  });
  
  const handleCreateParty = async () => {
    if (!newParty.name.trim()) return;
    
    const result = await createParty(newParty.name, newParty.description);
    if (result) {
      setShowCreateDialog(false);
      setNewParty({ name: "", description: "" });
    }
  };
  
  const handleJoinParty = async () => {
    if (!joinCode.trim()) return;
    
    const result = await joinPartyWithCode(joinCode);
    if (result) {
      setShowJoinDialog(false);
      setJoinCode("");
    }
  };
  
  const handleLeaveParty = async () => {
    if (confirm("Are you sure you want to leave this party?")) {
      await leaveParty();
    }
  };
  
  const copyInviteCode = () => {
    if (!userParty) return;
    
    navigator.clipboard.writeText(userParty.invite_code);
    toast({
      title: "Copied to clipboard",
      description: "Party invite code has been copied"
    });
  };
  
  return (
    <div className="py-4">
      <div className="mb-4 flex items-center">
        <Link to="/social" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-5 w-5 mr-2" />
        </Link>
        <h1 className="text-xl font-bold">Party</h1>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-rpg-primary" />
        </div>
      ) : userParty ? (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-rpg-primary" />
              {userParty.name}
            </CardTitle>
            <CardDescription>
              {userParty.is_leader ? "You are the party leader" : "Party member"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Party Description:</p>
              <p className="text-sm">{userParty.description || "No description available."}</p>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Invite Code:</p>
                <Button variant="ghost" size="sm" onClick={copyInviteCode} className="h-8">
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
              </div>
              <code className="bg-secondary/30 px-2 py-1 rounded text-sm">{userParty.invite_code}</code>
            </div>
            
            <Separator className="my-4" />
            
            <div>
              <h3 className="text-sm font-medium mb-2">Members ({userParty.member_count})</h3>
              <div className="space-y-2">
                {/* Member list would go here - this would need to be expanded with a query to fetch party members */}
                <div className="flex items-center text-sm text-muted-foreground">
                  <span className="ml-2">Member list will be displayed here</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="destructive" onClick={handleLeaveParty} className="w-full">
              <LogOut className="h-4 w-4 mr-2" />
              Leave Party
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>You're not in a party</CardTitle>
              <CardDescription>
                Join a party to adventure with friends and earn bonus rewards
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-2">
                <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Join Existing Party
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Join a Party</DialogTitle>
                      <DialogDescription>
                        Enter the invite code to join an existing party
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="invite-code">Invite Code</Label>
                        <Input
                          id="invite-code"
                          placeholder="Enter invite code"
                          value={joinCode}
                          onChange={(e) => setJoinCode(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowJoinDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleJoinParty}>Join Party</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="flex flex-col space-y-2">
                <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Users className="mr-2 h-4 w-4" />
                      Create New Party
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create a Party</DialogTitle>
                      <DialogDescription>
                        Form a party to adventure with your friends
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="party-name">Party Name</Label>
                        <Input
                          id="party-name"
                          placeholder="Enter party name"
                          value={newParty.name}
                          onChange={(e) => setNewParty({ ...newParty, name: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="party-description">Description (Optional)</Label>
                        <Textarea
                          id="party-description"
                          placeholder="Describe your party's purpose"
                          value={newParty.description}
                          onChange={(e) => setNewParty({ ...newParty, description: e.target.value })}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateParty}>Create Party</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card bg-muted/50">
            <CardHeader>
              <CardTitle className="text-base">Party Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-sm space-y-2">
                <li>Share quest progress with party members</li>
                <li>Earn Party Buffs for completing quests together</li>
                <li>+5% XP when all members complete daily quests</li>
                <li>Access to exclusive party quests and challenges</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PartyPage;
