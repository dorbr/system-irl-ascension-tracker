
import React, { useState, useEffect } from "react";
import { useSocial } from "@/context/SocialContext";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Trophy, User, Medal, Sparkles, Swords, FlameKindling } from "lucide-react";
import { Link } from "react-router-dom";

// Import leaderboard components
import LeaderboardFilters from "@/components/leaderboard/LeaderboardFilters";
import LeaderboardList from "@/components/leaderboard/LeaderboardList";
import LeaderboardRewards from "@/components/leaderboard/LeaderboardRewards";

interface LeaderboardUser {
  id: string;
  username: string | null;
  avatar_url: string | null;
  value: number;
  rank: number;
  is_current_user: boolean;
}

const LeaderboardPage = () => {
  const { user } = useAuth();
  const { friends } = useSocial();
  const [category, setCategory] = useState("xp");
  const [scope, setScope] = useState("global");
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { id: "xp", name: "XP Gained", icon: Sparkles, color: "text-yellow-500" },
    { id: "quests", name: "Quests Completed", icon: Swords, color: "text-blue-500" },
    { id: "streaks", name: "Quest Streaks", icon: FlameKindling, color: "text-orange-500" }
  ];
  
  // Mock data for demonstration
  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      
      // This is mock data for demonstration
      const mockData: LeaderboardUser[] = [
        {
          id: "1",
          username: "QuestMaster",
          avatar_url: null,
          value: 1250,
          rank: 1,
          is_current_user: false
        },
        {
          id: "2",
          username: "ShadowHunter",
          avatar_url: null,
          value: 980,
          rank: 2,
          is_current_user: false
        },
        {
          id: "3",
          username: "DungeonSlayer",
          avatar_url: null,
          value: 875,
          rank: 3,
          is_current_user: false
        },
        {
          id: user?.id || "4",
          username: "You",
          avatar_url: null,
          value: 750,
          rank: 4,
          is_current_user: true
        },
        {
          id: "5",
          username: "ElementalWizard",
          avatar_url: null,
          value: 685,
          rank: 5,
          is_current_user: false
        }
      ];
      
      // Filter based on scope
      let filteredData = mockData;
      if (scope === "friends") {
        const friendIds = friends.map(f => f.friend_id);
        filteredData = mockData.filter(user => 
          user.is_current_user || friendIds.includes(user.id)
        );
      }
      
      // Sort by value
      filteredData.sort((a, b) => b.value - a.value);
      
      // Update ranks
      filteredData.forEach((user, index) => {
        user.rank = index + 1;
      });
      
      setLeaderboard(filteredData);
      setIsLoading(false);
    };
    
    fetchLeaderboard();
  }, [category, scope, friends, user]);
  
  const getCategoryUnit = () => {
    switch (category) {
      case "xp": return "XP";
      case "quests": return "Quests";
      case "streaks": return "Days";
      default: return "";
    }
  };
  
  const getCategoryIcon = (categoryId: string) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat ? cat.icon : Sparkles;
  };
  
  const getCategoryColor = (categoryId: string) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat ? cat.color : "";
  };
  
  return (
    <div className="py-4">
      <div className="mb-4 flex items-center">
        <Link to="/social" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-5 w-5 mr-2" />
        </Link>
        <h1 className="text-xl font-bold">Leaderboards</h1>
      </div>
      
      <Card className="glass-card mb-4">
        <CardHeader className="pb-2">
          <CardTitle>Rankings</CardTitle>
          <CardDescription>
            See how you compare to other adventurers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LeaderboardFilters 
            category={category}
            scope={scope}
            onCategoryChange={setCategory}
            onScopeChange={setScope}
          />
          
          <LeaderboardList 
            leaderboard={leaderboard}
            category={category}
            getCategoryUnit={getCategoryUnit}
            getCategoryIcon={getCategoryIcon}
            getCategoryColor={getCategoryColor}
          />
        </CardContent>
      </Card>
      
      <LeaderboardRewards />
    </div>
  );
};

export default LeaderboardPage;
