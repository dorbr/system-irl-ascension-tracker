
import React, { useState } from "react";
import { useResources } from "@/context/ResourcesContext";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Artifact } from "@/types/resources";
import { Trash2, Package, Calendar, CalendarIcon, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const ArtifactsTab = () => {
  const { artifacts, addArtifact, deleteArtifact, summary } = useResources();
  const { t } = useLanguage();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  // Sort artifacts by value (highest first)
  const sortedArtifacts = [...artifacts].sort((a, b) => b.value - a.value);
  
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
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Gift className="h-5 w-5 text-purple-500" />
            </div>
            <div className="ml-3">
              <div className="text-sm text-muted-foreground">{t('totalArtifactValue')}</div>
              <div className="font-bold text-xl">{formatCurrency(summary.totalArtifactsValue)}</div>
            </div>
          </div>
          
          <Button onClick={() => setIsAddDialogOpen(true)}>
            {t('addArtifact')}
          </Button>
        </CardContent>
      </Card>
      
      {sortedArtifacts.length === 0 ? (
        <div className="flex items-center justify-center h-40">
          <p className="text-muted-foreground">{t('noArtifacts')}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedArtifacts.map(artifact => (
            <ArtifactCard 
              key={artifact.id} 
              artifact={artifact} 
              onDelete={deleteArtifact}
              formatCurrency={formatCurrency}
            />
          ))}
        </div>
      )}
      
      <AddArtifactDialog 
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={addArtifact}
      />
    </div>
  );
};

interface ArtifactCardProps {
  artifact: Artifact;
  onDelete: (id: string) => void;
  formatCurrency: (value: number) => string;
}

const ArtifactCard: React.FC<ArtifactCardProps> = ({
  artifact,
  onDelete,
  formatCurrency
}) => {
  const acquisitionDate = new Date(artifact.acquisitionDate).toLocaleDateString();
  
  return (
    <Card className="glass-card">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
            <Package className="h-5 w-5 text-purple-500" />
          </div>
          
          <div className="ml-3">
            <div className="font-medium">{artifact.name}</div>
            <div className="text-xs text-muted-foreground flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {acquisitionDate}
              {artifact.description && (
                <span className="ml-2">
                  {artifact.description}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="font-bold text-purple-500">{formatCurrency(artifact.value)}</span>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8"
            onClick={() => onDelete(artifact.id)}
          >
            <Trash2 className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface AddArtifactDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (artifact: Omit<Artifact, "id">) => void;
}

const AddArtifactDialog: React.FC<AddArtifactDialogProps> = ({
  isOpen,
  onClose,
  onAdd
}) => {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [acquisitionDate, setAcquisitionDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !value || !acquisitionDate) {
      return; // Form validation failed
    }
    
    onAdd({
      name,
      value: parseFloat(value),
      description: description || undefined,
      acquisitionDate: new Date(acquisitionDate).toISOString()
    });
    
    // Reset form
    setName("");
    setValue("");
    setDescription("");
    setAcquisitionDate(new Date().toISOString().split('T')[0]);
    
    // Close dialog
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-purple-500" />
            {t('addArtifact')}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="artifact-name">{t('artifactName')}</Label>
            <Input
              id="artifact-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="artifact-value">{t('artifactValue')}</Label>
            <Input
              id="artifact-value"
              type="number"
              min="0"
              step="0.01"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="acquisition-date">{t('acquisitionDate')}</Label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="acquisition-date"
                type="date"
                value={acquisitionDate}
                onChange={(e) => setAcquisitionDate(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="artifact-description">{t('artifactDescription')}</Label>
            <Textarea
              id="artifact-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
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
