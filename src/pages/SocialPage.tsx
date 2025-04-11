
import React from "react";
import { useSocial } from "@/context/SocialContext";
import { useUser } from "@/context/UserContext";
import { Link } from "react-router-dom";
import { Users, Shield, UserPlus, Trophy, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SocialPage = () => {
  const { userParty, userGuild, friends, pendingFriends, socialStats, isLoading } = useSocial();
  const { userData } = useUser();

  const socialOptions = [
    {
      name: "Party",
      description: "Adventure with 2-4 friends",
      icon: Users,
      color: "text-blue-500",
      link: "/social/party",
      status: userParty ? `${userParty.name} (${userParty.member_count} members)` : "Not in a party"
    },
    {
      name: "Guild",
      description: "Join a larger community",
      icon: Shield,
      color: "text-purple-500",
      link: "/social/guild",
      status: userGuild ? `${userGuild.name} (${userGuild.member_count} members)` : "Not in a guild"
    },
    {
      name: "Friends",
      description: "Connect with other adventurers",
      icon: UserPlus,
      color: "text-green-500",
      link: "/social/friends",
      status: `${friends.length} friends${pendingFriends.length > 0 ? ` (${pendingFriends.length} pending)` : ''}`
    },
    {
      name: "Leaderboard",
      description: "Compare your progress",
      icon: Trophy,
      color: "text-yellow-500",
      link: "/social/leaderboard",
      status: "Global & friends rankings"
    },
    {
      name: "Events",
      description: "Seasonal challenges & competitions",
      icon: Calendar,
      color: "text-red-500",
      link: "/social/events",
      status: "Check upcoming events"
    }
  ];

  return (
    <div className="py-4">
      <div className="glass-card rounded-lg p-4 mb-4">
        <h1 className="text-xl font-bold mb-1">Social Hub</h1>
        <p className="text-muted-foreground text-sm mb-4">
          Connect and adventure with others
        </p>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i} className="p-4">
                <div className="flex items-center">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="ml-4 space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {socialOptions.map((option) => (
              <Link key={option.name} to={option.link}>
                <Card className="p-4 transition-all hover:bg-secondary/30">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full ${option.color} bg-card`}>
                      <option.icon className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold">{option.name}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center">
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                        <span className="text-xs text-rpg-primary sm:ml-2">{option.status}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialPage;
