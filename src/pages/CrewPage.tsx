
import React, { useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Users, ScrollText } from "lucide-react";
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
          <h1 className="text-xl font-bold">Crew</h1>
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
              <span>Social</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Sliding content area */}
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

      {/* Bottom navigation arrows */}
      <div className="fixed bottom-16 inset-x-0 flex justify-center gap-4 p-2 bg-background/80 backdrop-blur-sm border-t">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => handleSwitch("quests")}
          disabled={section === "quests"}
          className="rounded-full w-10 h-10"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => handleSwitch("social")}
          disabled={section === "social"}
          className="rounded-full w-10 h-10"
        >
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default CrewPage;
