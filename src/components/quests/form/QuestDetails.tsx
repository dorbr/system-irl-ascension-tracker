
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QuestDifficulty } from "@/context/QuestContext";

interface QuestDetailsProps {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  xpReward: number;
  setXpReward: (xp: number) => void;
  type: "daily" | "main" | "dungeon";
  setType: (type: "daily" | "main" | "dungeon") => void;
  difficulty: QuestDifficulty;
  setDifficulty: (difficulty: QuestDifficulty) => void;
  isDungeon: boolean;
}

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
        <Label htmlFor="title">{isDungeon ? "Dungeon Title" : "Quest Title"}</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-secondary/50 border-secondary"
          placeholder={isDungeon ? "Enter challenge title" : "Enter quest title"}
        />
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-secondary/50 border-secondary"
          placeholder={isDungeon ? "What's this challenge about?" : "What's this quest about?"}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="xp">XP Reward</Label>
          <Input
            id="xp"
            type="number"
            value={xpReward}
            onChange={(e) => setXpReward(Number(e.target.value))}
            className="bg-secondary/50 border-secondary"
          />
        </div>
        
        {!isDungeon ? (
          <div>
            <Label htmlFor="type">Quest Type</Label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as "daily" | "main")}
              className="w-full h-10 rounded-md bg-secondary/50 border-secondary text-sm"
            >
              <option value="daily">Daily Quest</option>
              <option value="main">Main Quest</option>
            </select>
          </div>
        ) : (
          <div>
            <Label htmlFor="difficulty">Difficulty Rank</Label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as QuestDifficulty)}
              className="w-full h-10 rounded-md bg-secondary/50 border-secondary text-sm"
            >
              <option value="E">E Rank (Easiest)</option>
              <option value="D">D Rank</option>
              <option value="C">C Rank (Average)</option>
              <option value="B">B Rank</option>
              <option value="A">A Rank</option>
              <option value="S">S Rank (Hardest)</option>
            </select>
          </div>
        )}
      </div>
    </>
  );
};

export default QuestDetails;
