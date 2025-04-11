
import React from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Party } from "@/types/social";
import { Copy, LogOut, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PartyDetailsProps {
  party: Party;
  onLeaveParty: () => Promise<void>;
}

const PartyDetails = ({ party, onLeaveParty }: PartyDetailsProps) => {
  const copyInviteCode = () => {
    navigator.clipboard.writeText(party.invite_code);
    toast({
      title: "Copied to clipboard",
      description: "Party invite code has been copied"
    });
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="mr-2 h-5 w-5 text-rpg-primary" />
          {party.name}
        </CardTitle>
        <CardDescription>
          {party.is_leader ? "You are the party leader" : "Party member"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">Party Description:</p>
          <p className="text-sm">{party.description || "No description available."}</p>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Invite Code:</p>
            <Button variant="ghost" size="sm" onClick={copyInviteCode} className="h-8">
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <code className="bg-secondary/30 px-2 py-1 rounded text-sm">{party.invite_code}</code>
        </div>
        
        <Separator className="my-4" />
        
        <div>
          <h3 className="text-sm font-medium mb-2">Members ({party.member_count})</h3>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <span className="ml-2">Member list will be displayed here</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="destructive" onClick={onLeaveParty} className="w-full">
          <LogOut className="h-4 w-4 mr-2" />
          Leave Party
        </Button>
      </CardFooter>
    </>
  );
};

export default PartyDetails;
