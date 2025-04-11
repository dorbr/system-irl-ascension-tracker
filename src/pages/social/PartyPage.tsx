
import React, { useState } from "react";
import { useSocial } from "@/context/SocialContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import party components
import PartyDetails from "@/components/party/PartyDetails";
import JoinPartyDialog from "@/components/party/JoinPartyDialog";
import CreatePartyDialog from "@/components/party/CreatePartyDialog";
import PartyBenefits from "@/components/party/PartyBenefits";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const PartyPage = () => {
  const navigate = useNavigate();
  const { userParty, createParty, joinPartyWithCode, leaveParty, isLoading } = useSocial();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  
  const handleCreateParty = async (name: string, description: string) => {
    const result = await createParty(name, description);
    if (result) {
      setShowCreateDialog(false);
    }
  };
  
  const handleJoinParty = async (joinCode: string) => {
    const result = await joinPartyWithCode(joinCode);
    if (result) {
      setShowJoinDialog(false);
    }
  };
  
  const handleLeaveParty = async () => {
    if (confirm("Are you sure you want to leave this party?")) {
      await leaveParty();
    }
  };
  
  const handleBack = () => {
    navigate("/crew");
  };
  
  return (
    <div className="py-4">
      <div className="mb-4 flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleBack}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Party</h1>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-rpg-primary" />
        </div>
      ) : userParty ? (
        <Card className="glass-card">
          <PartyDetails party={userParty} onLeaveParty={handleLeaveParty} />
        </Card>
      ) : (
        <div className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>You're not in a party</CardTitle>
              <CardDescription>
                Join a party to adventure with friends and earn bonus rewards
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-2">
                <JoinPartyDialog
                  isOpen={showJoinDialog}
                  onOpenChange={setShowJoinDialog}
                  onJoinParty={handleJoinParty}
                />
              </div>
              
              <div className="flex flex-col space-y-2">
                <CreatePartyDialog
                  isOpen={showCreateDialog}
                  onOpenChange={setShowCreateDialog}
                  onCreateParty={handleCreateParty}
                />
              </div>
            </CardContent>
          </Card>
          
          <PartyBenefits />
        </div>
      )}
    </div>
  );
};

export default PartyPage;
