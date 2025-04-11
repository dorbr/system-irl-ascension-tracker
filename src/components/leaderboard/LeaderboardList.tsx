
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Trophy, User } from "lucide-react";

interface LeaderboardUser {
  id: string;
  username: string | null;
  avatar_url: string | null;
  value: number;
  rank: number;
  is_current_user: boolean;
}

interface LeaderboardListProps {
  leaderboard: LeaderboardUser[];
  category: string;
  getCategoryUnit: () => string;
  getCategoryIcon: (categoryId: string) => any;
  getCategoryColor: (categoryId: string) => string;
}

const LeaderboardList = ({ 
  leaderboard, 
  category, 
  getCategoryUnit, 
  getCategoryIcon,
  getCategoryColor
}: LeaderboardListProps) => {
  return (
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
                  <CategoryIcon className={`h-3.5 w-3.5 mr-1 ${getCategoryColor(category)}`} />
                  <span>{leader.value} {getCategoryUnit()}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LeaderboardList;
