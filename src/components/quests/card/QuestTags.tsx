
import React from "react";

interface QuestTagsProps {
  tags: string[];
}

const QuestTags: React.FC<QuestTagsProps> = ({ tags }) => {
  if (tags.length === 0) return null;
  
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <span key={tag} className="text-xs text-muted-foreground bg-secondary/30 px-1.5 py-0.5 rounded">
          {tag}
        </span>
      ))}
    </div>
  );
};

export default QuestTags;
