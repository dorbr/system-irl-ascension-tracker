
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PartyBenefits = () => {
  return (
    <Card className="glass-card bg-muted/50">
      <CardHeader>
        <CardTitle className="text-base">Party Benefits</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside text-sm space-y-2">
          <li>Share quest progress with party members</li>
          <li>Earn Party Buffs for completing quests together</li>
          <li>+5% XP when all members complete daily quests</li>
          <li>Access to exclusive party quests and challenges</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default PartyBenefits;
