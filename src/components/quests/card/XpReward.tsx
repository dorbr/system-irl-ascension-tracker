
import React from "react";

interface XpRewardProps {
  xpReward: number;
}

const XpReward: React.FC<XpRewardProps> = ({ xpReward }) => {
  return (
    <div className="text-sm font-semibold text-rpg-primary absolute bottom-3 right-3">
      +{xpReward} XP
    </div>
  );
};

export default XpReward;
