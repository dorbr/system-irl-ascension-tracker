
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";

const LeaderboardRewards = () => {
  return (
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
  );
};

export default LeaderboardRewards;
