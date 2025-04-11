
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

const ProgressGuide: React.FC = () => {
  return (
    <Card className="mb-6 bg-secondary/5 border-secondary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Logging Progress</CardTitle>
        <CardDescription>
          Track your real-life activities to boost your stats
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm">
            When you complete activities in real life that improve a particular skill or ability,
            log your progress here to increase your stats and earn XP.
          </p>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">How to log progress:</h3>
            <ol className="text-sm list-decimal pl-5 space-y-1">
              <li>Select the stat you want to improve</li>
              <li>Click the "Log Progress" button</li>
              <li>Enter details about what you did (optional but recommended)</li>
              <li>Select how much you improved (1-5)</li>
              <li>Submit to earn stat points and XP</li>
            </ol>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Examples of activities for each stat:</h3>
            <ul className="text-sm space-y-2">
              <li><span className="font-medium">Strength:</span> Weightlifting, physical labor, resistance training</li>
              <li><span className="font-medium">Agility:</span> Sports, dance, yoga, coordination exercises</li>
              <li><span className="font-medium">Intelligence:</span> Learning, studying, solving puzzles, reading</li>
              <li><span className="font-medium">Perception:</span> Observation tasks, mindfulness exercises, detailed work</li>
              <li><span className="font-medium">Vitality:</span> Cardio exercise, healthy eating, good sleep habits</li>
              <li><span className="font-medium">Sense:</span> Meditation, reflection, practicing intuition</li>
              <li><span className="font-medium">Charisma:</span> Social interaction, public speaking, leadership activities</li>
              <li><span className="font-medium">Luck:</span> Taking calculated risks, trying new things</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressGuide;
