
export type ResourceCategory = 
  // Income categories
  | 'salary'
  | 'freelance'
  | 'gift'
  | 'investment'
  | 'other_income'
  // Expense categories  
  | 'food'
  | 'housing'
  | 'transportation'
  | 'entertainment'
  | 'utilities'
  | 'other_expense';

export type ResourceType = 'gold' | 'mana';

export type ResourceEntry = {
  id: string;
  type: ResourceType;
  amount: number;
  category: ResourceCategory;
  date: string; // ISO date string
  notes?: string;
  tags?: string[];
};

export type Artifact = {
  id: string;
  name: string;
  value: number;
  description?: string;
  acquisitionDate: string; // ISO date string
  imageUrl?: string;
};

export type PassiveBuff = {
  id: string;
  name: string;
  valuePerMonth: number;
  source: string;
  startDate: string; // ISO date string
  active: boolean;
};

export type TimeRange = 'weekly' | 'monthly' | 'allTime';

export interface ResourcesSummary {
  totalGold: number;
  totalMana: number;
  netWorth: number;
  totalPassiveBuffs: number;
  totalArtifactsValue: number;
}

export interface ResourcesHistoryData {
  labels: string[];
  gold: number[];
  mana: number[];
  net: number[];
}

export interface CategoryBreakdown {
  category: ResourceCategory;
  amount: number;
  percentage: number;
}
