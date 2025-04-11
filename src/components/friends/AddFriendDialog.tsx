
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";

interface AddFriendDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSendRequest: (username: string) => Promise<void>;
}

const AddFriendDialog = ({ isOpen, onOpenChange, onSendRequest }: AddFriendDialogProps) => {
  const [username, setUsername] = useState("");
  
  const handleSendRequest = async () => {
    if (!username.trim()) return;
    await onSendRequest(username);
    setUsername("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSendRequest}>Send Request</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddFriendDialog;
