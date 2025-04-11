
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  return (
    <div>
      <Label>Tags</Label>
      <div className="flex items-center gap-2 mb-2">
        <Input
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          className="flex-1 bg-secondary/50 border-secondary"
          placeholder="Health, Focus, etc."
        />
        <Button type="button" onClick={onAddTag} size="sm">Add</Button>
      </div>
      
      <div className="flex flex-wrap gap-1">
        {tags.map(tag => (
          <div 
            key={tag} 
            className="px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground text-xs flex items-center"
          >
            {tag}
            <button 
              onClick={() => onRemoveTag(tag)} 
              className="ml-1 w-4 h-4 rounded-full bg-secondary/80 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagSelector;
