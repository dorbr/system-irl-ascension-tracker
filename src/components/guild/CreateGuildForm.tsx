
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

interface CreateGuildFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateGuild: (name: string, description: string, motto: string) => Promise<void>;
}

const CreateGuildForm = ({ isOpen, onOpenChange, onCreateGuild }: CreateGuildFormProps) => {
  const [newGuild, setNewGuild] = useState({
    name: "",
    description: "",
    motto: "",
  });

  const handleCreateGuild = async () => {
    if (!newGuild.name.trim()) return;
    await onCreateGuild(newGuild.name, newGuild.description, newGuild.motto);
    setNewGuild({ name: "", description: "", motto: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreateGuild}>Create Guild</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGuildForm;
