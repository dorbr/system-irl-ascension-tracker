
import React from "react";
import { Stat } from "@/context/UserContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface StatExplanationProps {
  stats: Stat[];
  onClose?: () => void;
}

const statDescriptions: Record<string, { description: string, benefits: string[] }> = {
  "Strength": {
    description: "Physical power and muscle. Affects your ability to carry heavy loads, deal physical damage, and resist physical challenges.",
    benefits: [
      "Increases physical damage in combat",
      "Improves capacity to carry items",
      "Helps with physical labor tasks"
    ]
  },
  "Agility": {
    description: "Speed, balance, and reflexes. Affects how quickly you can move, your reaction time, and your ability to perform tasks requiring coordination.",
    benefits: [
      "Faster movement and reaction times",
      "Better balance and coordination",
      "Improved performance in sports and physical activities"
    ]
  },
  "Intelligence": {
    description: "Mental acuity, learning capacity, and problem-solving. Affects your ability to understand complex topics and solve difficult problems.",
    benefits: [
      "Better comprehension and learning",
      "Enhanced problem-solving abilities",
      "Improved memory and recall"
    ]
  },
  "Perception": {
    description: "Awareness of your surroundings and attention to detail. Affects your ability to notice subtle changes and important details.",
    benefits: [
      "Noticing important details in environments",
      "Spotting patterns more easily",
      "Improved spatial awareness"
    ]
  },
  "Vitality": {
    description: "Health, stamina, and endurance. Affects your energy levels, resistance to illness, and ability to perform tasks over extended periods.",
    benefits: [
      "Increased energy and stamina",
      "Better recovery from physical exertion",
      "Improved immune system function"
    ]
  },
  "Sense": {
    description: "Intuition and decision-making. Affects your ability to make good decisions quickly and your intuitive understanding of situations.",
    benefits: [
      "Better intuition and gut feelings",
      "Improved decision-making under pressure",
      "Sensing danger or opportunities"
    ]
  },
  "Charisma": {
    description: "Social influence and personal magnetism. Affects how others perceive you and your ability to persuade and inspire others.",
    benefits: [
      "Enhanced social interactions",
      "Better leadership and persuasion abilities",
      "Stronger relationships and connections"
    ]
  },
  "Luck": {
    description: "Fortune and probability. While somewhat mysterious, this stat seems to affect chance outcomes and how often things go your way.",
    benefits: [
      "Increased chance of favorable outcomes",
      "Reduced frequency of mishaps and accidents",
      "More opportunities seem to present themselves"
    ]
  }
};

const StatExplanation: React.FC<StatExplanationProps> = ({ stats, onClose }) => {
  const { t, isRtl } = useLanguage();
  const stat = stats[0];
  
  if (!stat) return null;
  
  return (
    <div className="relative">
      {onClose && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          className="absolute right-0 top-0"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      
      <div className="flex items-center gap-2 mb-4">
        <div 
          className="w-8 h-8 rounded-md flex items-center justify-center text-white text-xs font-medium"
          style={{ backgroundColor: stat.color }}
        >
          {stat.abbreviation}
        </div>
        <h2 className="text-lg font-semibold">{stat.name}</h2>
      </div>
      
      <p className={`text-sm mb-4 ${isRtl ? "text-right" : ""}`}>{statDescriptions[stat.name]?.description || "No description available."}</p>
      
      <h4 className={`text-sm font-medium mb-2 ${isRtl ? "text-right" : ""}`}>
        {t("benefits").replace("{stat}", stat.name)}
      </h4>
      <ul className={`text-sm space-y-2 list-disc pl-5 ${isRtl ? "text-right" : ""}`}>
        {statDescriptions[stat.name]?.benefits.map((benefit, index) => (
          <li key={index}>{benefit}</li>
        ))}
      </ul>
      
      <h4 className={`text-sm font-medium mt-4 mb-2 ${isRtl ? "text-right" : ""}`}>
        {t("howToImprove").replace("{stat}", stat.name)}
      </h4>
      <ul className={`text-sm list-disc pl-5 ${isRtl ? "text-right" : ""}`}>
        {getSuggestionsByStatName(stat.name).map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </div>
  );
};

// Helper function to get stat-specific improvement suggestions
function getSuggestionsByStatName(statName: string): string[] {
  switch (statName) {
    case "Strength":
      return ["Weight lifting", "Regular physical exercise", "Manual labor", "Resistance training"];
    case "Agility":
      return ["Sports practice", "Dance lessons", "Yoga", "Balance exercises", "Martial arts"];
    case "Intelligence":
      return ["Reading books", "Taking courses", "Solving puzzles", "Learning new skills", "Teaching others"];
    case "Perception":
      return ["Mindfulness practice", "Observation exercises", "Detail-oriented tasks", "Meditation"];
    case "Vitality":
      return ["Cardiovascular exercise", "Eating healthy foods", "Getting proper sleep", "Staying hydrated"];
    case "Sense":
      return ["Meditation", "Decision-making practice", "Journaling", "Analyzing past decisions"];
    case "Charisma":
      return ["Social practice", "Public speaking", "Active listening", "Joining social groups", "Leadership roles"];
    case "Luck":
      return ["Taking calculated risks", "Putting yourself in new situations", "Being open to opportunities", "Learning from setbacks"];
    default:
      return ["Regular practice", "Learning from others", "Setting specific goals"];
  }
}

export default StatExplanation;
