
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Users, ScrollText } from "lucide-react";
import QuestsPage from "./QuestsPage";
import SocialPage from "./SocialPage";

const CrewPage = () => {
  const [section, setSection] = useState<"quests" | "social">("quests");
  
  const handleSwitch = (newSection: "quests" | "social") => {
    setSection(newSection);
  };

  return (
    <div className="h-full pb-16">
      {/* Header with navigation controls */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold">Road</h1>
          <div className="flex items-center space-x-2">
            <Button 
              variant={section === "quests" ? "default" : "outline"} 
              size="sm"
              onClick={() => handleSwitch("quests")}
              className="flex items-center gap-1"
            >
              <ScrollText className="w-4 h-4" />
              <span>Quests</span>
            </Button>
            <Button 
              variant={section === "social" ? "default" : "outline"} 
              size="sm"
              onClick={() => handleSwitch("social")}
              className="flex items-center gap-1"
            >
              <Users className="w-4 h-4" />
              <span>Crew</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="relative w-full h-full overflow-hidden">
        <div 
          className="flex transition-transform duration-300 h-full"
          style={{ 
            width: "200%", 
            transform: section === "quests" ? "translateX(0)" : "translateX(-50%)" 
          }}
        >
          <div className="w-full h-full overflow-y-auto">
            <QuestsPage />
          </div>
          <div className="w-full h-full overflow-y-auto">
            <SocialPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrewPage;
