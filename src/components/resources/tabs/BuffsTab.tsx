
import React, { useState } from "react";
import { useResources } from "@/context/ResourcesContext";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { PassiveBuff } from "@/types/resources";
import { Trash2, Zap, Calendar, CalendarIcon, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { differenceInMonths } from "date-fns";

export const BuffsTab = () => {
  const { passiveBuffs, addPassiveBuff, deletePassiveBuff, updatePassiveBuff, summary } = useResources();
  const { t } = useLanguage();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  // Sort buffs by value (highest first)
  const sortedBuffs = [...passiveBuffs].sort((a, b) => b.valuePerMonth - a.valuePerMonth);
  
  // Format amount as currency
  const formatCurrency = (value: number): string => {
    return value.toLocaleString(undefined, { 
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };
  
  return (
    <div className="space-y-4">
      <Card className="glass-card">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <Zap className="h-5 w-5 text-indigo-500" />
            </div>
            <div className="ml-3">
              <div className="text-sm text-muted-foreground">{t('passiveBuffs')}</div>
              <div className="font-bold text-xl">{formatCurrency(summary.totalPassiveBuffs)}/mo</div>
            </div>
          </div>
          
          <Button onClick={() => setIsAddDialogOpen(true)}>
            {t('add')}
          </Button>
        </CardContent>
      </Card>
      
      {sortedBuffs.length === 0 ? (
        <div className="flex items-center justify-center h-40">
          <p className="text-muted-foreground">{t('noBuffs')}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedBuffs.map(buff => (
            <BuffCard 
              key={buff.id} 
              buff={buff} 
              onDelete={deletePassiveBuff}
              onToggleActive={(active) => updatePassiveBuff(buff.id, { active })}
              formatCurrency={formatCurrency}
            />
          ))}
        </div>
      )}
      
      <AddBuffDialog 
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={addPassiveBuff}
      />
    </div>
  );
};

interface BuffCardProps {
  buff: PassiveBuff;
  onDelete: (id: string) => void;
  onToggleActive: (active: boolean) => void;
  formatCurrency: (value: number) => string;
}

const BuffCard: React.FC<BuffCardProps> = ({
  buff,
  onDelete,
  onToggleActive,
  formatCurrency
}) => {
  const { t } = useLanguage();
  const startDate = new Date(buff.startDate).toLocaleDateString();
  
  // Calculate active months
  const now = new Date();
  const startDateObj = new Date(buff.startDate);
  const activeMonths = differenceInMonths(now, startDateObj) + 1;
  
  // Calculate total gained
  const totalGained = buff.valuePerMonth * activeMonths;
  
  return (
    <Card className="glass-card">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              buff.active ? "bg-indigo-500/20" : "bg-gray-500/20"
            }`}>
              <Zap className={`h-5 w-5 ${buff.active ? "text-indigo-500" : "text-gray-500"}`} />
            </div>
            
            <div className="ml-3">
              <div className="font-medium">{buff.name}</div>
              <div className="text-xs text-muted-foreground flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {startDate}
                <span className="ml-2">
                  {buff.source}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`font-bold ${buff.active ? "text-indigo-500" : "text-gray-500"}`}>
              +{formatCurrency(buff.valuePerMonth)}/mo
            </span>
            
            <Switch 
              checked={buff.active}
              onCheckedChange={onToggleActive}
            />
            
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8"
              onClick={() => onDelete(buff.id)}
            >
              <Trash2 className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </div>
        
        <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
          <div className="bg-secondary/30 p-2 rounded-md">
            <div className="text-muted-foreground flex items-center">
              <History className="h-3 w-3 mr-1" />
              {t('activeMonths')}
            </div>
            <div className="font-medium">{activeMonths}</div>
          </div>
          
          <div className="bg-secondary/30 p-2 rounded-md">
            <div className="text-muted-foreground">{t('totalGained')}</div>
            <div className="font-medium text-indigo-500">+{formatCurrency(totalGained)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface AddBuffDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (buff: Omit<PassiveBuff, "id">) => void;
}

const AddBuffDialog: React.FC<AddBuffDialogProps> = ({
  isOpen,
  onClose,
  onAdd
}) => {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [valuePerMonth, setValuePerMonth] = useState("");
  const [source, setSource] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !valuePerMonth || !source || !startDate) {
      return; // Form validation failed
    }
    
    onAdd({
      name,
      valuePerMonth: parseFloat(valuePerMonth),
      source,
      startDate: new Date(startDate).toISOString(),
      active: true
    });
    
    // Reset form
    setName("");
    setValuePerMonth("");
    setSource("");
    setStartDate(new Date().toISOString().split('T')[0]);
    
    // Close dialog
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-indigo-500" />
            {t('passiveBuffs')}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="buff-name">{t('buffName')}</Label>
            <Input
              id="buff-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="buff-value">{t('buffValue')}</Label>
            <Input
              id="buff-value"
              type="number"
              min="0"
              step="0.01"
              value={valuePerMonth}
              onChange={(e) => setValuePerMonth(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="buff-source">{t('buffSource')}</Label>
            <Input
              id="buff-source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="start-date">{t('startDate')}</Label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {t('cancel')}
            </Button>
            <Button type="submit">
              {t('save')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
