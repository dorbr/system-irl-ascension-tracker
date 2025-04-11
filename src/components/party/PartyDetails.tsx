
import React from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Party } from "@/types/social";
import { Copy, LogOut, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";

interface PartyDetailsProps {
  party: Party;
  onLeaveParty: () => Promise<void>;
}

const PartyDetails = ({ party, onLeaveParty }: PartyDetailsProps) => {
  const { isRtl } = useLanguage();
  
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
        <CardTitle className={`flex items-center ${isRtl ? "flex-row-reverse" : ""}`}>
          <Users className={`${isRtl ? "ml-2" : "mr-2"} h-5 w-5 text-rpg-primary`} />
          {party.name}
        </CardTitle>
        <CardDescription className={isRtl ? "text-right" : ""}>
          {party.is_leader ? "You are the party leader" : "Party member"}
        </CardDescription>
      </CardHeader>
      <CardContent className={isRtl ? "text-right" : ""}>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">{party.description || "No description available."}</p>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Invite Code:</p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={copyInviteCode} 
              className={`h-8 ${isRtl ? "flex-row-reverse" : ""}`}
            >
              <Copy className={`h-4 w-4 ${isRtl ? "ml-1" : "mr-1"}`} />
              Copy
            </Button>
          </div>
          <code className="bg-secondary/30 px-2 py-1 rounded text-sm block w-full">{party.invite_code}</code>
        </div>
        
        <Separator className="my-4" />
        
        <div>
          <h3 className="text-sm font-medium mb-2">Members ({party.member_count})</h3>
          <div className="space-y-2">
            <div className={`flex items-center text-sm text-muted-foreground ${isRtl ? "flex-row-reverse" : ""}`}>
              <span className={isRtl ? "mr-2" : "ml-2"}>Member list will be displayed here</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="destructive" 
          onClick={onLeaveParty} 
          className={`w-full ${isRtl ? "flex-row-reverse" : ""}`}
        >
          <LogOut className={`h-4 w-4 ${isRtl ? "ml-2" : "mr-2"}`} />
          Leave Party
        </Button>
      </CardFooter>
    </>
  );
};

export default PartyDetails;
