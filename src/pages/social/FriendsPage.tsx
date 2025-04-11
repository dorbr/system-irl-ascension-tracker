
import React, { useState } from "react";
import { useSocial } from "@/context/SocialContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Loader2, UserPlus, Check, X, User, UserMinus, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const FriendsPage = () => {
  const { friends, pendingFriends, sendFriendRequest, acceptFriendRequest, rejectFriendRequest, removeFriend, isLoading } = useSocial();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [username, setUsername] = useState("");
  
  const handleSendFriendRequest = async () => {
    if (!username.trim()) return;
    
    const result = await sendFriendRequest(username);
    if (result) {
      setShowAddDialog(false);
      setUsername("");
    }
  };
  
  const handleAcceptFriend = async (friendshipId: string) => {
    await acceptFriendRequest(friendshipId);
  };
  
  const handleRejectFriend = async (friendshipId: string) => {
    await rejectFriendRequest(friendshipId);
  };
  
  const handleRemoveFriend = async (friendshipId: string) => {
    if (confirm("Are you sure you want to remove this friend?")) {
      await removeFriend(friendshipId);
    }
  };
  
  return (
    <div className="py-4">
      <div className="mb-4 flex items-center">
        <Link to="/social" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-5 w-5 mr-2" />
        </Link>
        <h1 className="text-xl font-bold">Friends</h1>
      </div>
      
      <Card className="glass-card mb-4">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Your Friends</CardTitle>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <UserPlus className="h-4 w-4 mr-1" />
                  Add Friend
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add a Friend</DialogTitle>
                  <DialogDescription>
                    Send a friend request by username
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSendFriendRequest}>Send Request</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <CardDescription>
            Connect with other adventurers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="friends">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="friends">
                Friends ({friends.length})
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({pendingFriends.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="friends" className="mt-4">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-rpg-primary" />
                </div>
              ) : friends.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">You don't have any friends yet</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => setShowAddDialog(true)}
                  >
                    <UserPlus className="h-4 w-4 mr-1" />
                    Add Your First Friend
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {friends.map((friend) => (
                    <div key={friend.id} className="flex items-center justify-between p-2 rounded-lg glass-card">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <AspectRatio ratio={1} className="h-full">
                            {friend.avatar_url ? (
                              <img 
                                src={friend.avatar_url} 
                                alt={friend.username || "Friend"} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="bg-muted text-muted-foreground flex items-center justify-center h-full">
                                <User className="h-5 w-5" />
                              </div>
                            )}
                          </AspectRatio>
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-sm">{friend.username || "Unknown User"}</p>
                          <p className="text-xs text-muted-foreground">Friends since {new Date(friend.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFriend(friend.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <UserMinus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="pending" className="mt-4">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-rpg-primary" />
                </div>
              ) : pendingFriends.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No pending friend requests</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingFriends.map((friend) => (
                    <div key={friend.id} className="flex items-center justify-between p-2 rounded-lg glass-card">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <AspectRatio ratio={1} className="h-full">
                            {friend.avatar_url ? (
                              <img 
                                src={friend.avatar_url} 
                                alt={friend.username || "Friend"} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="bg-muted text-muted-foreground flex items-center justify-center h-full">
                                <User className="h-5 w-5" />
                              </div>
                            )}
                          </AspectRatio>
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-sm">{friend.username || "Unknown User"}</p>
                          <p className="text-xs text-muted-foreground">
                            {friend.user_id !== friend.friend_id ? "Sent you a request" : "Request sent"}
                          </p>
                        </div>
                      </div>
                      {friend.user_id !== friend.friend_id && (
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleAcceptFriend(friend.id)}
                            className="h-8 w-8 text-green-500"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRejectFriend(friend.id)}
                            className="h-8 w-8 text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card className="glass-card bg-muted/50">
        <CardHeader>
          <CardTitle className="text-base">Friend Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside text-sm space-y-2">
            <li>Share quest progress with friends</li>
            <li>View friends on leaderboards</li>
            <li>Invite friends to parties and guilds</li>
            <li>Create friendly competitions</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default FriendsPage;
