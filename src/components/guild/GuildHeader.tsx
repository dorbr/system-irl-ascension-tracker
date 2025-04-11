
import React from "react";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

interface GuildHeaderProps {
  name: string;
  motto: string | null;
}

const GuildHeader = ({ name, motto }: GuildHeaderProps) => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center">
        <Shield className="mr-2 h-5 w-5 text-rpg-primary" />
        {name}
      </CardTitle>
      <CardDescription>
        {motto || "No motto set"}
      </CardDescription>
    </CardHeader>
  );
};

export default GuildHeader;
