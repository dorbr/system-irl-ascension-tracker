
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QuestDifficulty } from "@/context/QuestContext";
import { Shield, Star, Calendar, Award } from "lucide-react";

interface QuestDetailsProps {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  xpReward: number;
  setXpReward: (xp: number) => void;
  type: "daily" | "main" | "dungeon" | "penalty" | "reward";
  setType: (type: "daily" | "main" | "dungeon" | "penalty" | "reward") => void;
  difficulty: QuestDifficulty;
  setDifficulty: (difficulty: QuestDifficulty) => void;
  isDungeon: boolean;
}

const getTypeIcon = (type: string) => {
  switch(type) {
    case "main": return <Star size={16} className="text-yellow-400" />;
    case "daily": return <Calendar size={16} className="text-blue-400" />;
    case "penalty": return <Shield size={16} className="text-red-400" />;
    case "reward": return <Award size={16} className="text-green-400" />;
    default: return <Calendar size={16} className="text-blue-400" />;
  }
};

const QuestDetails: React.FC<QuestDetailsProps> = ({
  title,
  setTitle,
  description,
  setDescription,
  xpReward,
  setXpReward,
  type,
  setType,
  difficulty,
  setDifficulty,
  isDungeon
}) => {
  return (
    <>
      <div>
        <Label htmlFor="title" className="text-sm font-medium">
          {isDungeon ? "Dungeon Title" : "Quest Title"}
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-secondary/50 border-secondary focus:border-rpg-primary focus:ring-rpg-primary/20"
          placeholder={isDungeon ? "Enter challenge title" : "Enter quest title"}
        />
      </div>
      
      <div>
        <Label htmlFor="description" className="text-sm font-medium">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-secondary/50 border-secondary focus:border-rpg-primary focus:ring-rpg-primary/20 min-h-[80px]"
          placeholder={isDungeon ? "What's this challenge about?" : "What's this quest about?"}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="xp" className="text-sm font-medium">XP Reward</Label>
          <Input
            id="xp"
            type="number"
            value={xpReward}
            onChange={(e) => setXpReward(Number(e.target.value))}
            className="bg-secondary/50 border-secondary focus:border-rpg-primary focus:ring-rpg-primary/20"
          />
        </div>
        
        {!isDungeon ? (
          <div>
            <Label htmlFor="type" className="text-sm font-medium">Quest Type</Label>
            <Select
              value={type}
              onValueChange={(value) => setType(value as "daily" | "main" | "penalty" | "reward")}
            >
              <SelectTrigger 
                id="type" 
                className="bg-secondary/50 border-secondary focus:border-rpg-primary focus:ring-rpg-primary/20"
              >
                <SelectValue placeholder="Select quest type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily" className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-blue-400" />
                    <span>Daily Quest</span>
                  </div>
                </SelectItem>
                <SelectItem value="main">
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-yellow-400" />
                    <span>Main Quest</span>
                  </div>
                </SelectItem>
                <SelectItem value="penalty">
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-red-400" />
                    <span>Penalty Quest</span>
                  </div>
                </SelectItem>
                <SelectItem value="reward">
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-green-400" />
                    <span>Reward Quest</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div>
            <Label htmlFor="difficulty" className="text-sm font-medium">Difficulty Rank</Label>
            <Select
              value={difficulty}
              onValueChange={(value) => setDifficulty(value as QuestDifficulty)}
            >
              <SelectTrigger 
                id="difficulty" 
                className="bg-secondary/50 border-secondary focus:border-rpg-primary focus:ring-rpg-primary/20"
              >
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="E" className="text-gray-400 font-bold">E Rank (Easiest)</SelectItem>
                <SelectItem value="D" className="text-green-500 font-bold">D Rank</SelectItem>
                <SelectItem value="C" className="text-blue-500 font-bold">C Rank (Average)</SelectItem>
                <SelectItem value="B" className="text-purple-500 font-bold">B Rank</SelectItem>
                <SelectItem value="A" className="text-orange-500 font-bold">A Rank</SelectItem>
                <SelectItem value="S" className="text-red-500 font-bold">S Rank (Hardest)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </>
  );
};

export default QuestDetails;
