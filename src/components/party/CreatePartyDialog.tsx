
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Users } from "lucide-react";

interface CreatePartyDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateParty: (name: string, description: string) => Promise<void>;
}

const CreatePartyDialog = ({ isOpen, onOpenChange, onCreateParty }: CreatePartyDialogProps) => {
  const [newParty, setNewParty] = useState({
    name: "",
    description: "",
  });
  
  const handleCreateParty = async () => {
    if (!newParty.name.trim()) return;
    
    await onCreateParty(newParty.name, newParty.description);
    setNewParty({ name: "", description: "" });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreateParty}>Create Party</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePartyDialog;
