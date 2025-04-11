
import React, { useState, useEffect } from "react";
import { useSocial } from "@/context/SocialContext";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Trophy, User, Medal, Sparkles, Swords, FlameKindling } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
  
  // Mock data for demonstration - in a real app, this would come from the database
  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      
      // This is mock data for demonstration
      // In a real implementation, you would query the database for actual user stats
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
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-4">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.id} value={cat.id}>
                    <div className="flex items-center">
                      <cat.icon className={`h-4 w-4 mr-2 ${cat.color}`} />
                      {cat.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Tabs defaultValue="global" value={scope} onValueChange={setScope} className="w-full sm:w-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="global">Global</TabsTrigger>
                <TabsTrigger value="friends">Friends</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="space-y-2">
            {leaderboard.map((leader) => {
              const CategoryIcon = getCategoryIcon(category);
              return (
                <div 
                  key={leader.id} 
                  className={`flex items-center p-3 rounded-lg ${
                    leader.is_current_user ? "bg-rpg-primary/20" : "glass-card"
                  }`}
                >
                  <div className="flex-shrink-0 w-8 text-center font-bold">
                    {leader.rank <= 3 ? (
                      <Trophy 
                        className={
                          leader.rank === 1 ? "text-yellow-500 mx-auto" : 
                          leader.rank === 2 ? "text-gray-300 mx-auto" : 
                          "text-amber-700 mx-auto"
                        } 
                        size={20} 
                      />
                    ) : (
                      `#${leader.rank}`
                    )}
                  </div>
                  
                  <div className="ml-3 flex-shrink-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <AspectRatio ratio={1} className="h-full">
                        {leader.avatar_url ? (
                          <img 
                            src={leader.avatar_url} 
                            alt={leader.username || "User"} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="bg-muted flex items-center justify-center h-full">
                            <User className="h-5 w-5 text-muted-foreground" />
                          </div>
                        )}
                      </AspectRatio>
                    </div>
                  </div>
                  
                  <div className="ml-3 flex-grow min-w-0">
                    <div className="flex justify-between items-baseline">
                      <p className="font-medium text-sm truncate">
                        {leader.username}
                        {leader.is_current_user && <span className="ml-1 text-xs">(You)</span>}
                      </p>
                      <div className="flex items-center text-sm ml-2">
                        <CategoryIcon className={`h-3.5 w-3.5 mr-1 ${categories.find(c => c.id === category)?.color}`} />
                        <span>{leader.value} {getCategoryUnit()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base">Weekly Rewards</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-3">Leaderboards reset every week. Top performers earn special rewards:</p>
          <ul className="space-y-2">
            <li className="flex items-center text-sm">
              <Trophy className="h-4 w-4 mr-2 text-yellow-500" />
              <span>1st Place: Special achievement badge + 100 XP</span>
            </li>
            <li className="flex items-center text-sm">
              <Trophy className="h-4 w-4 mr-2 text-gray-300" />
              <span>2nd Place: 75 XP</span>
            </li>
            <li className="flex items-center text-sm">
              <Trophy className="h-4 w-4 mr-2 text-amber-700" />
              <span>3rd Place: 50 XP</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaderboardPage;
