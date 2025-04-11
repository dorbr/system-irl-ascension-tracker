
import React from "react";
import { Stat } from "@/context/UserContext";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

interface StatExplanationProps {
  stats: Stat[];
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

const StatExplanation: React.FC<StatExplanationProps> = ({ stats }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Understanding Your Stats</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Stats represent your various attributes and abilities in real life. As you complete activities related to each stat, 
        your abilities improve and unlock new opportunities.
      </p>
      
      <Accordion type="single" collapsible className="w-full">
        {stats.map((stat) => (
          <AccordionItem key={stat.name} value={stat.name}>
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-medium"
                  style={{ backgroundColor: stat.color }}
                >
                  {stat.abbreviation}
                </div>
                <span>{stat.name}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card className="border-0 bg-secondary/10">
                <CardContent className="pt-4">
                  <p className="text-sm mb-2">{statDescriptions[stat.name]?.description || "No description available."}</p>
                  <h4 className="text-sm font-medium mt-2 mb-1">Benefits of high {stat.name}:</h4>
                  <ul className="text-xs space-y-1 list-disc pl-4">
                    {statDescriptions[stat.name]?.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default StatExplanation;
