
import React from "react";
import { Friend } from "@/types/social";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { User, UserMinus, Loader2 } from "lucide-react";

interface FriendsListProps {
  friends: Friend[];
  isLoading: boolean;
  onAddFriend: () => void;
  onRemoveFriend: (friendshipId: string) => Promise<void>;
}

const FriendsList = ({ friends, isLoading, onAddFriend, onRemoveFriend }: FriendsListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-rpg-primary" />
      </div>
    );
  }

  if (friends.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">You don't have any friends yet</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={onAddFriend}
        >
          <User className="h-4 w-4 mr-1" />
          Add Your First Friend
        </Button>
      </div>
    );
  }

  return (
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
            onClick={() => onRemoveFriend(friend.id)}
            className="text-muted-foreground hover:text-destructive"
          >
            <UserMinus className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default FriendsList;
