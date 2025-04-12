
import React, { useState } from "react";
import { useResources } from "@/context/ResourcesContext";
import { useLanguage } from "@/context/LanguageContext";
import { ResourceType, ResourceCategory } from "@/types/resources";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Coins, Droplet, Calendar, Tag } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ResourceEntryFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResourceEntryForm: React.FC<ResourceEntryFormProps> = ({ isOpen, onClose }) => {
  const { addResourceEntry } = useResources();
  const { t, isRtl } = useLanguage();
  
  // Form state
  const [entryType, setEntryType] = useState<ResourceType>("gold");
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<ResourceCategory | "">("");
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !category || !date) {
      return; // Form validation failed
    }
    
    // Create new entry
    addResourceEntry({
      type: entryType,
      amount: parseFloat(amount),
      category: category as ResourceCategory,
      date: new Date(date).toISOString(),
      notes: notes || undefined,
      tags: tags.length > 0 ? tags : undefined
    });
    
    // Reset form
    setAmount("");
    setCategory("");
    setNotes("");
    setTag("");
    setTags([]);
    
    // Close modal
    onClose();
  };
  
  // Get categories based on selected type
  const getCategories = (): ResourceCategory[] => {
    if (entryType === "gold") {
      return ["salary", "freelance", "gift", "investment", "other_income"];
    } else {
      return ["food", "housing", "transportation", "entertainment", "utilities", "other_expense"];
    }
  };
  
  // Add a tag
  const addTag = () => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTag("");
    }
  };
  
  // Remove a tag
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {entryType === "gold" ? (
              <Coins className="h-5 w-5 text-yellow-500" />
            ) : (
              <Droplet className="h-5 w-5 text-blue-500" />
            )}
            {t('logEntry')}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Entry Type */}
          <div className="space-y-2">
            <Label>{t('entryType')}</Label>
            <RadioGroup 
              defaultValue={entryType} 
              value={entryType}
              onValueChange={(value) => setEntryType(value as ResourceType)}
              className={`flex space-x-2 ${isRtl ? "flex-row-reverse" : ""}`}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="gold" id="gold" />
                <Label htmlFor="gold" className="flex items-center">
                  <Coins className="h-4 w-4 text-yellow-500 mr-1" />
                  {t('gold')} ({t('income')})
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mana" id="mana" />
                <Label htmlFor="mana" className="flex items-center">
                  <Droplet className="h-4 w-4 text-blue-500 mr-1" />
                  {t('mana')} ({t('expenses')})
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">{t('amount')}</Label>
            <Input
              id="amount"
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              required
            />
          </div>
          
          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">{t('category')}</Label>
            <Select 
              value={category} 
              onValueChange={(value) => setCategory(value as ResourceCategory)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder={t('selectCategory')} />
              </SelectTrigger>
              <SelectContent>
                {getCategories().map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {t(cat.split('_')[0])}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date">{t('date')}</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">{t('notes')}</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t('notes')}
              rows={3}
            />
          </div>
          
          {/* Tags */}
          <div className="space-y-2">
            <Label>{t('tags')}</Label>
            <div className="flex space-x-2">
              <div className="relative flex-grow">
                <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="pl-10"
                  placeholder={t('tags')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
              </div>
              <Button type="button" onClick={addTag} size="sm">
                {t('add')}
              </Button>
            </div>
            
            {/* Tag list */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <div 
                    key={index} 
                    className="bg-secondary px-2 py-1 rounded-md text-xs flex items-center gap-1"
                  >
                    <span>{tag}</span>
                    <button 
                      type="button" 
                      onClick={() => removeTag(tag)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
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
