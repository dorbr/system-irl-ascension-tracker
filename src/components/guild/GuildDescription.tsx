
import React from "react";

interface GuildDescriptionProps {
  description: string | null;
}

const GuildDescription = ({ description }: GuildDescriptionProps) => {
  return (
    <div className="mb-4">
      <p className="text-sm text-muted-foreground mb-2">Guild Description:</p>
      <p className="text-sm">{description || "No description available."}</p>
    </div>
  );
};

export default GuildDescription;
