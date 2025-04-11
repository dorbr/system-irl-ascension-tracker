
import React, { useState } from "react";
import { useShadows } from "@/context/ShadowContext";
import { useUser } from "@/context/UserContext";
import { useLanguage } from "@/context/LanguageContext";
import ShadowCard from "@/components/ui/ShadowCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const ShadowsPage = () => {
  const { shadows, addShadow } = useShadows();
  const { userData } = useUser();
  const { t } = useLanguage();
  
  const [newShadow, setNewShadow] = useState({
    name: "",
    event: "",
    reflection: "",
    insight: "",
    stats: [] as string[],
  });
  
  const [newStat, setNewStat] = useState("");
  
  const availableStats = userData.stats.map(stat => stat.abbreviation);
  
  const handleAddStat = () => {
    if (!newStat || newShadow.stats.includes(newStat)) return;
    setNewShadow({
      ...newShadow,
      stats: [...newShadow.stats, newStat],
    });
    setNewStat("");
  };
  
  const handleRemoveStat = (stat: string) => {
    setNewShadow({
      ...newShadow,
      stats: newShadow.stats.filter(s => s !== stat),
    });
  };
  
  const handleCreateShadow = () => {
    if (!newShadow.name.trim() || !newShadow.event.trim()) {
      toast({
        title: t('error'),
        description: t('shadowRequired'),
        variant: "destructive",
      });
      return;
    }
    
    addShadow(newShadow);
    
    toast({
      title: t('shadowArchived'),
      description: t('shadowDesc'),
    });
    
    // Reset form
    setNewShadow({
      name: "",
      event: "",
      reflection: "",
      insight: "",
      stats: [],
    });
  };

  return (
    <div className="py-4">
      <div className="glass-card rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">{t('shadowArchive')}</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">{t('newShadow')}</Button>
            </DialogTrigger>
            <DialogContent className="glass-card">
              <DialogHeader>
                <DialogTitle>{t('archiveNewShadow')}</DialogTitle>
                <DialogDescription>
                  {t('shadowDesc')}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="shadowName">{t('shadowName')}</Label>
                  <Input
                    id="shadowName"
                    value={newShadow.name}
                    onChange={(e) => setNewShadow({...newShadow, name: e.target.value})}
                    className="bg-secondary/50 border-secondary"
                    placeholder={t('shadowNamePlaceholder')}
                  />
                </div>
                
                <div>
                  <Label htmlFor="event">{t('event')}</Label>
                  <Textarea
                    id="event"
                    value={newShadow.event}
                    onChange={(e) => setNewShadow({...newShadow, event: e.target.value})}
                    className="bg-secondary/50 border-secondary"
                    placeholder={t('eventPlaceholder')}
                  />
                </div>
                
                <div>
                  <Label htmlFor="reflection">{t('reflection')}</Label>
                  <Textarea
                    id="reflection"
                    value={newShadow.reflection}
                    onChange={(e) => setNewShadow({...newShadow, reflection: e.target.value})}
                    className="bg-secondary/50 border-secondary"
                    placeholder={t('reflectionPlaceholder')}
                  />
                </div>
                
                <div>
                  <Label htmlFor="insight">{t('insight')}</Label>
                  <Textarea
                    id="insight"
                    value={newShadow.insight}
                    onChange={(e) => setNewShadow({...newShadow, insight: e.target.value})}
                    className="bg-secondary/50 border-secondary"
                    placeholder={t('insightPlaceholder')}
                  />
                </div>
                
                <div>
                  <Label>{t('relatedStats')}</Label>
                  <div className="flex items-center gap-2 mb-2">
                    <select
                      value={newStat}
                      onChange={(e) => setNewStat(e.target.value)}
                      className="flex-1 h-10 rounded-md bg-secondary/50 border-secondary text-sm"
                    >
                      <option value="">{t('selectStat')}</option>
                      {availableStats.map(stat => (
                        <option key={stat} value={stat}>{stat}</option>
                      ))}
                    </select>
                    <Button type="button" onClick={handleAddStat} size="sm">{t('add')}</Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {newShadow.stats.map(stat => (
                      <div 
                        key={stat} 
                        className="px-2 py-1 rounded-full bg-rpg-primary/20 text-rpg-primary text-xs flex items-center"
                      >
                        {stat}
                        <button 
                          onClick={() => handleRemoveStat(stat)} 
                          className="ml-1 w-4 h-4 rounded-full bg-rpg-primary/30 flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button onClick={handleCreateShadow} className="w-full">{t('archiveShadow')}</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          {t('shadowsDesc')}
        </p>
        
        <div className="space-y-4">
          {shadows.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">{t('noShadows')}</p>
          ) : (
            shadows.map(shadow => (
              <ShadowCard key={shadow.id} shadow={shadow} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ShadowsPage;
