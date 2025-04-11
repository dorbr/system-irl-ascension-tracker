
import React, { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import StatCard from "@/components/ui/StatCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import StatExplanation from "@/components/stats/StatExplanation";
import ProgressGuide from "@/components/stats/ProgressGuide";
import { Card, CardContent } from "@/components/ui/card";

const StatsPage = () => {
  const { userData, updateUserStat, updateUserXp } = useUser();
  const [selectedStat, setSelectedStat] = useState("");
  const [journalEntry, setJournalEntry] = useState("");
  const [statGain, setStatGain] = useState(1);
  const [statAnimations, setStatAnimations] = useState<Record<string, boolean>>({});
  const [showStatDetail, setShowStatDetail] = useState(false);

  // Ensure the stats are available on initial load
  useEffect(() => {
    console.log("Stats loaded:", userData.stats.length, "stats found");
    userData.stats.forEach(stat => {
      console.log(`Available stat: ${stat.name} (${stat.abbreviation})`);
    });
  }, [userData.stats]);

  const handleStatClick = (statName: string) => {
    setSelectedStat(statName);
    setShowStatDetail(true);
  };

  const handleLogProgress = () => {
    if (!selectedStat) {
      toast({
        title: "Error",
        description: "Please select a stat to improve",
        variant: "destructive",
      });
      return;
    }

    // Animate the stat
    setStatAnimations({ [selectedStat]: true });
    
    // Timeout to remove animation after it completes
    setTimeout(() => {
      setStatAnimations({});
    }, 500);

    updateUserStat(selectedStat, statGain);
    updateUserXp(statGain * 10); // Give XP for stat improvement

    toast({
      title: "Progress Logged",
      description: `You improved ${selectedStat} by ${statGain} and earned ${statGain * 10} XP!`,
    });

    // Reset form
    setJournalEntry("");
    setStatGain(1);
  };

  // Force a log to ensure all stats are being processed
  console.log("All stats:", userData.stats);

  return (
    <div className="py-4">
      <div className="glass-card rounded-lg p-4 mb-4">
        <h1 className="text-xl font-bold mb-4">Stat Tracker</h1>
        
        {/* Log Progress Button - Moved up */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full mb-6">Log Progress</Button>
          </DialogTrigger>
          <DialogContent className="glass-card">
            <DialogHeader>
              <DialogTitle>Log Stat Progress</DialogTitle>
              <DialogDescription>
                Record your improvement and gain stats.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="stat">Select Stat</Label>
                <select
                  id="stat"
                  value={selectedStat}
                  onChange={(e) => setSelectedStat(e.target.value)}
                  className="w-full h-10 rounded-md bg-secondary/50 border-secondary text-sm"
                >
                  <option value="">Choose a stat to improve</option>
                  {userData.stats.map((stat) => (
                    <option key={stat.name} value={stat.name}>
                      {stat.name} ({stat.abbreviation})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <Label htmlFor="journal">Journal Entry (Optional)</Label>
                <Textarea
                  id="journal"
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  placeholder="What did you do to improve this stat?"
                  className="bg-secondary/50 border-secondary"
                />
              </div>
              
              <div>
                <Label htmlFor="gain">Stat Gain</Label>
                <Input
                  id="gain"
                  type="number"
                  value={statGain}
                  onChange={(e) => setStatGain(Number(e.target.value))}
                  min={1}
                  max={5}
                  className="bg-secondary/50 border-secondary"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  You'll earn {statGain * 10} XP for this improvement
                </p>
              </div>
              
              <Button onClick={handleLogProgress}>Log Improvement</Button>
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Progress Guide */}
        <ProgressGuide />
        
        {/* Stat Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
          {userData.stats.map((stat) => {
            console.log(`Rendering stat: ${stat.name}`);
            return (
              <StatCard
                key={stat.name}
                stat={stat}
                onClick={() => handleStatClick(stat.name)}
                className={selectedStat === stat.name ? "border border-rpg-primary/50" : ""}
                animate={statAnimations[stat.name]}
              />
            );
          })}
        </div>

        {/* Show stat explanation when a stat is selected */}
        {showStatDetail && selectedStat && (
          <Card className="mb-6">
            <CardContent className="pt-4">
              <StatExplanation 
                stats={userData.stats.filter(s => s.name === selectedStat)} 
                onClose={() => setShowStatDetail(false)}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StatsPage;
