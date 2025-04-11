
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
        <CardTitle className="text-lg">How to Log Progress</CardTitle>
        <CardDescription>
          Track your real-life activities to boost your stats
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-sm">
            Log your real-life activities that improve your skills to increase stats and earn XP.
            Select a stat, add details about what you did, and choose how much you improved (1-5).
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
            <div className="space-y-1">
              <h4 className="font-semibold">Physical</h4>
              <ul className="text-xs space-y-1 list-disc pl-4">
                <li>Strength: Exercise, lifting</li>
                <li>Agility: Sports, yoga, dance</li>
              </ul>
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold">Mental</h4>
              <ul className="text-xs space-y-1 list-disc pl-4">
                <li>Intelligence: Learning, studying</li>
                <li>Perception: Observation, details</li>
              </ul>
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold">Health & Mind</h4>
              <ul className="text-xs space-y-1 list-disc pl-4">
                <li>Vitality: Cardio, healthy habits</li>
                <li>Sense: Meditation, reflection</li>
              </ul>
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold">Social & Fortune</h4>
              <ul className="text-xs space-y-1 list-disc pl-4">
                <li>Charisma: Social skills, leadership</li>
                <li>Luck: Taking chances, new experiences</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressGuide;
