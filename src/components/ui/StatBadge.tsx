
import React from "react";
import { cn } from "@/lib/utils";

interface StatBadgeProps {
  name: string;
  abbreviation: string;
  color?: string;
  className?: string;
}

const StatBadge: React.FC<StatBadgeProps> = ({
  name,
  abbreviation,
  color = "#9b87f5",
  className,
}) => {
  const style = {
    backgroundColor: `${color}20`, // 20% opacity
    color: color,
    borderColor: `${color}40`, // 40% opacity
  };

  return (
    <div
      className={cn(
        "px-2 py-0.5 text-xs rounded border font-medium inline-flex items-center justify-center",
        className
      )}
      style={style}
      title={name}
    >
      {abbreviation}
    </div>
  );
};

export default StatBadge;
