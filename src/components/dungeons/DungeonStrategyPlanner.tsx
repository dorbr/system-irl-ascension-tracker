import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Scroll, Award, Calendar } from "lucide-react";
import { Quest } from "@/context/QuestContext";

interface DungeonStrategyPlannerProps {
  dungeon: Quest | null;
  isOpen: boolean;
  onClose: () => void;
}

const DungeonStrategyPlanner: React.FC<DungeonStrategyPlannerProps> = ({
  dungeon,
  isOpen,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<string | null>(null);

  // Generate AI strategy plan for the dungeon
  const generatePlan = async () => {
    if (!dungeon) return;
    
    setLoading(true);
    
    try {
      // Simulate AI response (in a real implementation, this would call an AI service)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a plan based on the dungeon attributes
      const plan = generateDungeonPlan(dungeon);
      setPlan(plan);
    } catch (error) {
      console.error("Error generating plan:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to generate a structured plan based on dungeon properties
  const generateDungeonPlan = (dungeon: Quest): string => {
    const difficultyMap: Record<string, string> = {
      'E': 'Easy',
      'D': 'Moderate',
      'C': 'Challenging',
      'B': 'Hard',
      'A': 'Very Hard',
      'S': 'Extreme',
    };
    
    const difficultyLevel = dungeon.difficulty ? difficultyMap[dungeon.difficulty] || 'Unknown' : 'Moderate';
    const statFocus = dungeon.stats.join(", ");
    
    // Generate plan sections based on dungeon attributes
    return `
# ${dungeon.title} Strategy Guide

## Challenge Overview
${dungeon.description}

## Difficulty Assessment: ${difficultyLevel}
This challenge focuses on developing your ${statFocus} attributes.

## Recommended Approach
1. **Preparation Phase (1-3 days)**
   * Research the specific requirements of ${dungeon.title}
   * Gather necessary resources and tools
   * Create a personal timeline with checkpoints

2. **Training Phase (3-7 days)**
   * Practice the core skills needed for this challenge
   * Start with smaller versions of the main challenge
   * Track your progress in key ${statFocus} areas

3. **Execution Strategy (1-2 weeks)**
   * Break down the challenge into daily manageable quests
   * Establish a reward system for completing milestones
   * Implement a daily check-in system to maintain momentum

4. **Boss Battle Plan**
   * Identify the most challenging aspect of this dungeon
   * Develop specific tactics to overcome this obstacle
   * Prepare backup plans for unexpected difficulties

## Resource Management
* **Mental Stamina**: Schedule regular rest periods
* **Physical Energy**: Ensure proper nutrition and sleep
* **Time**: Allocate specific time blocks dedicated to this challenge

## Reward Projection
Upon completion, you'll gain significant improvements in ${statFocus}, 
with an estimated XP reward of ${dungeon.xpReward} points.

## Final Advice
Remember that each challenge is designed to help you level up in real life.
Approach this dungeon with confidence and persistence!
    `;
  };

  // Get rank color based on difficulty
  const getRankColor = (difficulty?: string) => {
    switch (difficulty) {
      case "S": return "text-red-500";
      case "A": return "text-orange-500";
      case "B": return "text-purple-500";
      case "C": return "text-blue-500";
      case "D": return "text-green-500";
      case "E": return "text-gray-400";
      default: return "";
    }
  };

  // Format title with colored rank
  const displayDungeonTitle = () => {
    if (dungeon && dungeon.difficulty) {
      return (
        <span>
          {dungeon.title}{" "}
          <span className={`font-bold ${getRankColor(dungeon.difficulty)}`}>
            - {dungeon.difficulty} Rank
          </span>
        </span>
      );
    }
    return dungeon?.title || '';
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto glass-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Scroll className="h-5 w-5 text-rpg-accent" />
            <span>Dungeon Strategy Planner</span>
          </DialogTitle>
        </DialogHeader>
        
        {dungeon && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b pb-2">
              <h3 className="text-lg font-semibold">{displayDungeonTitle()}</h3>
            </div>
            
            <div className="flex flex-wrap gap-1 text-sm">
              {dungeon.stats.map((stat) => (
                <span key={stat} className="bg-secondary/30 px-2 py-1 rounded">
                  {stat}
                </span>
              ))}
            </div>
            
            <p className="text-sm text-muted-foreground">{dungeon.description}</p>
            
            {!plan && !loading && (
              <div className="bg-secondary/20 p-4 rounded-md">
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Award className="h-4 w-4 text-rpg-accent" />
                  Request Strategy Planning
                </h4>
                <p className="text-xs text-muted-foreground mb-4">
                  Our AI Guide will analyze this challenge and create a detailed strategy for conquering this dungeon in real life.
                </p>
                <Button 
                  onClick={generatePlan}
                  className="w-full bg-rpg-accent hover:bg-rpg-accent/90"
                >
                  Generate Strategy Plan
                </Button>
              </div>
            )}
            
            {loading && (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="h-8 w-8 text-rpg-accent animate-spin mb-4" />
                <p className="text-sm text-muted-foreground">Analyzing dungeon parameters...</p>
                <p className="text-xs text-muted-foreground">Crafting your personalized strategy guide...</p>
              </div>
            )}
            
            {plan && (
              <div className="bg-black/10 p-4 rounded-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <Scroll className="h-4 w-4 text-rpg-accent" />
                    Strategic Battle Plan
                  </h3>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Generated today
                  </div>
                </div>
                <div className="prose prose-sm prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ 
                    __html: plan.replace(/\n/g, '<br/>').replace(/^## (.*$)/gm, '<h3>$1</h3>').replace(/^# (.*$)/gm, '<h2>$1</h2>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                  }} />
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DungeonStrategyPlanner;
