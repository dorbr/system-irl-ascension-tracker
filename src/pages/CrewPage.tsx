
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Users, ScrollText } from "lucide-react";
import { useLocation } from "react-router-dom";
import QuestsPage from "./QuestsPage";
import SocialPage from "./SocialPage";
import { useLanguage } from "@/context/LanguageContext";

const CrewPage = () => {
  const [section, setSection] = useState<"quests" | "social">("quests");
  const location = useLocation();
  const { t, isRtl } = useLanguage();
  
  // When returning from another page, ensure state is properly initialized
  useEffect(() => {
    // Optional: restore section from sessionStorage to maintain state between page visits
    const savedSection = sessionStorage.getItem("crew-section");
    if (savedSection === "quests" || savedSection === "social") {
      setSection(savedSection);
    }
  }, [location.pathname]);
  
  const handleSwitch = (newSection: "quests" | "social") => {
    setSection(newSection);
    // Save current section to sessionStorage
    sessionStorage.setItem("crew-section", newSection);
  };

  return (
    <div className="h-full pb-16">
      {/* Header with navigation controls */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold">{t('road')}</h1>
          <div className="flex items-center space-x-2">
            <Button 
              variant={section === "quests" ? "default" : "outline"} 
              size="sm"
              onClick={() => handleSwitch("quests")}
              className="flex items-center gap-1"
            >
              <ScrollText className="w-4 h-4" />
              <span>{t('quests')}</span>
            </Button>
            <Button 
              variant={section === "social" ? "default" : "outline"} 
              size="sm"
              onClick={() => handleSwitch("social")}
              className="flex items-center gap-1"
            >
              <Users className="w-4 h-4" />
              <span>{t('crew')}</span>
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
            transform: isRtl 
              ? (section === "quests" ? "translateX(50%)" : "translateX(0)")
              : (section === "quests" ? "translateX(0)" : "translateX(-50%)")
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
