
import React, { useState } from "react";
import { useSocial } from "@/context/SocialContext";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import FriendsList from "@/components/friends/FriendsList";
import PendingFriendsList from "@/components/friends/PendingFriendsList";
import AddFriendDialog from "@/components/friends/AddFriendDialog";
import FriendBenefits from "@/components/friends/FriendBenefits";

const FriendsPage = () => {
  const { 
    friends, 
    pendingFriends, 
    sendFriendRequest, 
    acceptFriendRequest, 
    rejectFriendRequest, 
    removeFriend, 
    isLoading 
  } = useSocial();
  
  const [showAddDialog, setShowAddDialog] = useState(false);
  
  const handleSendFriendRequest = async (username: string) => {
    const result = await sendFriendRequest(username);
    if (result) {
      setShowAddDialog(false);
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
            <AddFriendDialog 
              isOpen={showAddDialog}
              onOpenChange={setShowAddDialog}
              onSendRequest={handleSendFriendRequest}
            />
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
              <FriendsList 
                friends={friends}
                isLoading={isLoading}
                onAddFriend={() => setShowAddDialog(true)}
                onRemoveFriend={async (friendshipId) => {
                  if (confirm("Are you sure you want to remove this friend?")) {
                    await removeFriend(friendshipId);
                  }
                }}
              />
            </TabsContent>
            
            <TabsContent value="pending" className="mt-4">
              <PendingFriendsList 
                pendingFriends={pendingFriends}
                isLoading={isLoading}
                onAcceptFriend={acceptFriendRequest}
                onRejectFriend={rejectFriendRequest}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <FriendBenefits />
    </div>
  );
};

export default FriendsPage;
