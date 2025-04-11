
import React from "react";
import { Friend } from "@/types/social";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { User, Check, X, Loader2 } from "lucide-react";

interface PendingFriendsListProps {
  pendingFriends: Friend[];
  isLoading: boolean;
  onAcceptFriend: (friendshipId: string) => Promise<void>;
  onRejectFriend: (friendshipId: string) => Promise<void>;
}

const PendingFriendsList = ({ 
  pendingFriends, 
  isLoading, 
  onAcceptFriend, 
  onRejectFriend 
}: PendingFriendsListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-rpg-primary" />
      </div>
    );
  }

  if (pendingFriends.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No pending friend requests</p>
      </div>
    );
  }

  return (
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
                onClick={() => onAcceptFriend(friend.id)}
                className="h-8 w-8 text-green-500"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRejectFriend(friend.id)}
                className="h-8 w-8 text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PendingFriendsList;
