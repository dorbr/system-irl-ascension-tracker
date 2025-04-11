
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Swords } from "lucide-react";

const GuildBenefits = () => {
  return (
    <Card className="glass-card bg-muted/50">
      <CardHeader>
        <CardTitle className="text-base">Guild Benefits</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside text-sm space-y-2">
          <li>Access to exclusive guild quests</li>
          <li>Weekly guild events and raids</li>
          <li>Guild-wide buffs and bonuses</li>
          <li>Track your progress against other guild members</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default GuildBenefits;
