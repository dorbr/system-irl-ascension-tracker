
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tag as TagIcon, X } from "lucide-react";

interface TagSelectorProps {
  tags: string[];
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
  newTag: string;
  setNewTag: (tag: string) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({ 
  tags, 
  onAddTag, 
  onRemoveTag, 
  newTag, 
  setNewTag 
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onAddTag();
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium flex items-center gap-1">
        <TagIcon size={16} className="text-muted-foreground" />
        <span>Tags</span>
      </Label>
      <div className="flex items-center gap-2 mb-2">
        <Input
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-secondary/50 border-secondary focus:border-rpg-primary focus:ring-rpg-primary/20"
          placeholder="Health, Focus, etc."
        />
        <Button 
          type="button" 
          onClick={onAddTag} 
          size="sm"
          variant="outline"
          className="border-rpg-primary/50 hover:bg-rpg-primary/10"
        >
          Add
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-1">
        {tags.map(tag => (
          <div 
            key={tag} 
            className="px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground text-xs flex items-center border border-secondary/80"
          >
            {tag}
            <button 
              onClick={() => onRemoveTag(tag)} 
              className="ml-1 w-4 h-4 rounded-full bg-secondary/80 flex items-center justify-center hover:bg-secondary"
              aria-label={`Remove ${tag} tag`}
            >
              <X size={12} />
            </button>
          </div>
        ))}
        {tags.length === 0 && (
          <div className="text-xs text-muted-foreground italic">No tags added yet</div>
        )}
      </div>
    </div>
  );
};

export default TagSelector;
