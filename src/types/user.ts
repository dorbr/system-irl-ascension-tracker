
export interface Stat {
  name: string;
  value: number;
  abbreviation: string;
  color: string;
}

export interface UserClass {
  name: string;
  level: number;
  nextClassOptions?: string[];
}

export interface UserData {
  name: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  class: UserClass;
  stats: Stat[];
  gold: number;
  mana: number;
  netWorth: number;
}

export const defaultUserData: UserData = {
  name: "Adventurer",
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  class: {
    name: "Novice",
    level: 1,
    nextClassOptions: ["Student", "Apprentice", "Explorer"],
  },
  stats: [
    { name: "Strength", value: 5, abbreviation: "STR", color: "#EF4444" },
    { name: "Agility", value: 5, abbreviation: "AGI", color: "#10B981" },
    { name: "Intelligence", value: 5, abbreviation: "INT", color: "#3B82F6" },
    { name: "Perception", value: 5, abbreviation: "PER", color: "#8B5CF6" },
    { name: "Vitality", value: 5, abbreviation: "VIT", color: "#F59E0B" },
    { name: "Sense", value: 5, abbreviation: "SEN", color: "#EC4899" },
    { name: "Charisma", value: 5, abbreviation: "CHA", color: "#D946EF" },
    { name: "Luck", value: 5, abbreviation: "LUK", color: "#F97316" },
  ],
  gold: 100,
  mana: 50,
  netWorth: 50,
};
