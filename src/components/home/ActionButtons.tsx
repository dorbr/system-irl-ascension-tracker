
import React, { useState } from "react";
import { PlusCircle, Settings } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { toast } from "@/hooks/use-toast";

const ActionButtons: React.FC = () => {
  const { updateUserXp } = useUser();
  const [xpAmount, setXpAmount] = useState(10);

  const handleLogXp = () => {
    updateUserXp(xpAmount);
    toast({
      title: "XP Logged",
      description: `You've gained ${xpAmount} XP!`,
    });
  };

  return (
    <div className="flex justify-between gap-3 mb-4 animate-fade-in">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex-1 bg-rpg-primary/20 border-rpg-primary/30">
            <PlusCircle size={18} className="mr-2" />
            Log XP
          </Button>
        </DialogTrigger>
        <DialogContent className="glass-card">
          <DialogHeader>
            <DialogTitle>Log Experience Points</DialogTitle>
            <DialogDescription>
              Track your progress by adding XP for tasks you've completed outside the app.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="xp">XP Amount</Label>
              <Input
                id="xp"
                type="number"
                value={xpAmount}
                onChange={(e) => setXpAmount(Number(e.target.value))}
                className="bg-secondary/50 border-secondary"
              />
            </div>
            <Button onClick={handleLogXp}>Log Experience</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex-1 bg-secondary">
            <Settings size={18} className="mr-2" />
            System
          </Button>
        </DialogTrigger>
        <DialogContent className="glass-card">
          <DialogHeader>
            <DialogTitle>System Menu</DialogTitle>
            <DialogDescription>
              Access system functions and settings
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <p className="text-sm text-muted-foreground">
              System menu functionality will be expanded in future updates.
            </p>
            <div className="flex flex-col gap-2">
              <Button variant="outline">Reset Daily Quests</Button>
              <Button variant="outline">Export Data</Button>
              <Button variant="outline">Import Data</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActionButtons;
