
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FriendBenefits = () => {
  return (
    <Card className="glass-card bg-muted/50">
      <CardHeader>
        <CardTitle className="text-base">Friend Benefits</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside text-sm space-y-2">
          <li>Share quest progress with friends</li>
          <li>View friends on leaderboards</li>
          <li>Invite friends to parties and guilds</li>
          <li>Create friendly competitions</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default FriendBenefits;
