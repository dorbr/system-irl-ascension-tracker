
import React from "react";
import { useUser } from "@/context/UserContext";
import { useQuests } from "@/context/QuestContext";
import { useShadows } from "@/context/ShadowContext";
import XpBar from "@/components/ui/XpBar";
import StatBadge from "@/components/ui/StatBadge";
import { CheckCircle, Swords, History } from "lucide-react";

const ProfilePage = () => {
  const { userData } = useUser();
  const { quests } = useQuests();
  const { shadows } = useShadows();
  
  // Calculate quest stats
  const completedQuests = quests.filter(quest => quest.completed).length;
  const totalQuests = quests.length;
  const completionRate = totalQuests ? Math.round((completedQuests / totalQuests) * 100) : 0;
  
  // Find top 3 stats
  const topStats = [...userData.stats]
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);

  return (
    <div className="py-4">
      <div className="glass-card rounded-lg p-4 mb-4 animate-fade-in">
        <div className="mb-4 text-center">
          <div className="w-24 h-24 bg-rpg-primary/20 rounded-full mx-auto mb-2 flex items-center justify-center text-4xl font-bold">
            {userData.name.charAt(0)}
          </div>
          <h1 className="text-2xl font-bold">{userData.name}</h1>
          <div className="text-rpg-primary font-medium mt-1">{userData.class.name}</div>
        </div>
        
        <div className="flex justify-between items-center mb-1 px-4">
          <div className="text-sm">Level {userData.level}</div>
          <div className="text-sm text-muted-foreground">
            {userData.xp} / {userData.xpToNextLevel} XP
          </div>
        </div>
        
        <XpBar
          currentXp={userData.xp}
          maxXp={userData.xpToNextLevel}
          className="mb-4"
        />
        
        <div className="mb-6">
          <h3 className="text-sm uppercase font-medium text-muted-foreground mb-2">Top Stats</h3>
          <div className="grid grid-cols-3 gap-2">
            {topStats.map((stat) => (
              <div key={stat.name} className="glass-card p-3 text-center rounded-lg">
                <StatBadge
                  name={stat.name}
                  abbreviation={stat.abbreviation}
                  color={stat.color}
                  className="mb-2 mx-auto w-12 h-8"
                />
                <div className="text-xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.name}</div>
              </div>
            ))}
          </div>
        </div>
        
        <h3 className="text-sm uppercase font-medium text-muted-foreground mb-2">Progress Stats</h3>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="glass-card p-3 text-center rounded-lg">
            <div className="flex justify-center mb-1">
              <CheckCircle size={20} className="text-green-500" />
            </div>
            <div className="text-xl font-bold">{completedQuests}</div>
            <div className="text-xs text-muted-foreground">Quests</div>
          </div>
          
          <div className="glass-card p-3 text-center rounded-lg">
            <div className="flex justify-center mb-1">
              <Swords size={20} className="text-yellow-500" />
            </div>
            <div className="text-xl font-bold">
              {quests.filter(q => q.type === "dungeon" && q.completed).length}
            </div>
            <div className="text-xs text-muted-foreground">Dungeons</div>
          </div>
          
          <div className="glass-card p-3 text-center rounded-lg">
            <div className="flex justify-center mb-1">
              <History size={20} className="text-rpg-primary" />
            </div>
            <div className="text-xl font-bold">{shadows.length}</div>
            <div className="text-xs text-muted-foreground">Shadows</div>
          </div>
        </div>
        
        <div className="glass-card p-3 rounded-lg mb-4">
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium">Quest Completion</div>
            <div className="text-sm font-bold">{completionRate}%</div>
          </div>
          <div className="progress-bar mt-2">
            <div 
              className="progress-fill" 
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
        
        <div className="glass-card p-3 rounded-lg">
          <h3 className="text-sm font-medium mb-1">Class Evolution</h3>
          <p className="text-xs text-muted-foreground mb-3">
            Your current class is {userData.class.name}. Continue gaining XP and completing quests to evolve.
          </p>
          
          {userData.class.nextClassOptions && (
            <div>
              <div className="text-xs text-muted-foreground mb-1">Next potential classes:</div>
              <div className="flex flex-wrap gap-1">
                {userData.class.nextClassOptions.map(nextClass => (
                  <div key={nextClass} className="text-xs px-2 py-1 bg-rpg-primary/20 rounded-full text-rpg-primary">
                    {nextClass}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
