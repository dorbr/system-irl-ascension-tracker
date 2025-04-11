
import React, { useState } from "react";
import { PlusCircle, Settings } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";

const ActionButtons: React.FC = () => {
  const { updateUserXp } = useUser();
  const { t, isRtl } = useLanguage();
  const [xpAmount, setXpAmount] = useState(10);

  const handleLogXp = () => {
    updateUserXp(xpAmount);
    toast({
      title: t("progressLogged"),
      description: t("earnXp").replace("{xp}", xpAmount.toString()),
    });
  };

  return (
    <div className={`flex justify-between gap-3 mb-4 animate-fade-in ${isRtl ? "flex-row-reverse" : ""}`}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className={`flex-1 bg-rpg-primary/20 border-rpg-primary/30 ${isRtl ? "flex-row-reverse" : ""}`}>
            <PlusCircle size={18} className={isRtl ? "ml-2" : "mr-2"} />
            {t("logXp")}
          </Button>
        </DialogTrigger>
        <DialogContent className="glass-card">
          <DialogHeader className={isRtl ? "text-right" : ""}>
            <DialogTitle>{t("logExperiencePoints")}</DialogTitle>
            <DialogDescription>
              {t("trackProgress")}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="xp" className={isRtl ? "block text-right" : ""}>{t("xpAmount")}</Label>
              <Input
                id="xp"
                type="number"
                value={xpAmount}
                onChange={(e) => setXpAmount(Number(e.target.value))}
                className="bg-secondary/50 border-secondary"
                dir={isRtl ? "rtl" : "ltr"}
              />
            </div>
            <div className={isRtl ? "text-right" : ""}>
              <Button onClick={handleLogXp}>{t("logExperience")}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className={`flex-1 bg-secondary ${isRtl ? "flex-row-reverse" : ""}`}>
            <Settings size={18} className={isRtl ? "ml-2" : "mr-2"} />
            {t("system")}
          </Button>
        </DialogTrigger>
        <DialogContent className="glass-card">
          <DialogHeader className={isRtl ? "text-right" : ""}>
            <DialogTitle>{t("systemMenu")}</DialogTitle>
            <DialogDescription>
              {t("accessSystemFunctions")}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <p className={`text-sm text-muted-foreground ${isRtl ? "text-right" : ""}`}>
              {t("systemMenuDesc")}
            </p>
            <div className="flex flex-col gap-2">
              <Button variant="outline">{t("resetDailyQuests")}</Button>
              <Button variant="outline">{t("exportData")}</Button>
              <Button variant="outline">{t("importData")}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActionButtons;
