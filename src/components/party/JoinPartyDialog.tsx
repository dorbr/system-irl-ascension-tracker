
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";

interface JoinPartyDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onJoinParty: (code: string) => Promise<void>;
}

const JoinPartyDialog = ({ isOpen, onOpenChange, onJoinParty }: JoinPartyDialogProps) => {
  const [joinCode, setJoinCode] = useState("");
  
  const handleJoinParty = async () => {
    if (!joinCode.trim()) return;
    await onJoinParty(joinCode);
    setJoinCode("");
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleJoinParty}>Join Party</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JoinPartyDialog;
