
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
import { useLanguage } from "@/context/LanguageContext";

const StatsPage = () => {
  const { userData, updateUserStat, updateUserXp } = useUser();
  const { t, isRtl } = useLanguage();
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
        title: t("error"),
        description: t("selectStatToImprove"),
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
      title: t("progressLogged"),
      description: t("improvedStat")
        .replace("{stat}", selectedStat)
        .replace("{amount}", String(statGain))
        .replace("{xp}", String(statGain * 10)),
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
        <h1 className={`text-xl font-bold mb-4 ${isRtl ? "text-right" : ""}`}>{t("statTracker")}</h1>
        
        {/* Log Progress Button - Moved up */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full mb-6">{t("logProgress")}</Button>
          </DialogTrigger>
          <DialogContent className={`glass-card ${isRtl ? "rtl" : ""}`}>
            <DialogHeader>
              <DialogTitle className={isRtl ? "text-right" : ""}>{t("logProgress")}</DialogTitle>
              <DialogDescription className={isRtl ? "text-right" : ""}>
                {t("selectStatToImprove")}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="stat" className={isRtl ? "block text-right" : ""}>{t("selectStat")}</Label>
                <select
                  id="stat"
                  value={selectedStat}
                  onChange={(e) => setSelectedStat(e.target.value)}
                  className={`w-full h-10 rounded-md bg-secondary/50 border-secondary text-sm ${isRtl ? "text-right" : ""}`}
                  dir={isRtl ? "rtl" : "ltr"}
                >
                  <option value="">{t("selectStatToImprove")}</option>
                  {userData.stats.map((stat) => (
                    <option key={stat.name} value={stat.name}>
                      {stat.name} ({stat.abbreviation})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <Label htmlFor="journal" className={isRtl ? "block text-right" : ""}>{t("journalEntry")}</Label>
                <Textarea
                  id="journal"
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  placeholder={t("journalEntryPlaceholder")}
                  className={`bg-secondary/50 border-secondary ${isRtl ? "text-right" : ""}`}
                  dir={isRtl ? "rtl" : "ltr"}
                />
              </div>
              
              <div>
                <Label htmlFor="gain" className={isRtl ? "block text-right" : ""}>{t("statGain")}</Label>
                <Input
                  id="gain"
                  type="number"
                  value={statGain}
                  onChange={(e) => setStatGain(Number(e.target.value))}
                  min={1}
                  max={5}
                  className={`bg-secondary/50 border-secondary ${isRtl ? "text-right" : ""}`}
                  dir={isRtl ? "rtl" : "ltr"}
                />
                <p className={`text-xs text-muted-foreground mt-1 ${isRtl ? "text-right" : ""}`}>
                  {t("earnXp").replace("{amount}", String(statGain * 10))}
                </p>
              </div>
              
              <Button onClick={handleLogProgress} className={isRtl ? "w-full" : ""}>
                {t("logImprovement")}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        
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

        {/* Show stat explanation at the bottom of the page */}
        {showStatDetail && selectedStat && (
          <Card className="mt-4">
            <CardContent className="pt-4">
              <StatExplanation 
                stats={userData.stats.filter(s => s.name === selectedStat)} 
                onClose={() => setShowStatDetail(false)}
              />
            </CardContent>
          </Card>
        )}
        
        {/* Progress Guide - Moved to the bottom */}
        <ProgressGuide />
      </div>
    </div>
  );
};

export default StatsPage;
