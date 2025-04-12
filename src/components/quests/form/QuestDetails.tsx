
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QuestDifficulty } from "@/context/QuestContext";
import { Shield, Star, Calendar, Award, Flag } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface QuestDetailsProps {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  xpReward: number;
  setXpReward: (xp: number) => void;
  type: "daily" | "main" | "dungeon" | "penalty" | "reward";
  setType: (type: "daily" | "main" | "dungeon" | "penalty" | "reward") => void;
  difficulty: QuestDifficulty;
  setDifficulty: (difficulty: QuestDifficulty) => void;
  isDungeon: boolean;
}

const getTypeIcon = (type: string) => {
  switch(type) {
    case "main": return <Star size={16} className="text-yellow-400" />;
    case "daily": return <Calendar size={16} className="text-blue-400" />;
    case "penalty": return <Shield size={16} className="text-red-400" />;
    case "reward": return <Award size={16} className="text-green-400" />;
    default: return <Calendar size={16} className="text-blue-400" />;
  }
};

const QuestDetails: React.FC<QuestDetailsProps> = ({
  title,
  setTitle,
  description,
  setDescription,
  xpReward,
  setXpReward,
  type,
  setType,
  difficulty,
  setDifficulty,
  isDungeon
}) => {
  const { t, isRtl } = useLanguage();
  
  return (
    <>
      <div className="mb-3">
        <Label htmlFor="title" className="text-sm font-medium">
          {isDungeon ? t('dungeonTitle') : t('questTitle')}
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-secondary/50 border-secondary focus:border-rpg-primary focus:ring-rpg-primary/20"
          placeholder={isDungeon ? t('enterChallengeTitle') : t('enterQuestTitle')}
          dir={isRtl ? "rtl" : "ltr"}
        />
      </div>
      
      <div className="mb-3">
        <Label htmlFor="description" className="text-sm font-medium">{t('description')}</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-secondary/50 border-secondary focus:border-rpg-primary focus:ring-rpg-primary/20 min-h-[80px]"
          placeholder={isDungeon ? t('challengeAbout') : t('questAbout')}
          dir={isRtl ? "rtl" : "ltr"}
        />
      </div>
      
      <div className={`grid grid-cols-2 gap-3 mb-3 ${isRtl ? "dir-rtl" : ""}`}>
        <div>
          <Label htmlFor="xp" className="text-sm font-medium">{t('xpReward')}</Label>
          <Input
            id="xp"
            type="number"
            value={xpReward}
            onChange={(e) => setXpReward(Number(e.target.value))}
            className="bg-secondary/50 border-secondary focus:border-rpg-primary focus:ring-rpg-primary/20"
            dir="ltr" // Keep number inputs as ltr
          />
        </div>
        
        {!isDungeon ? (
          <div>
            <Label htmlFor="type" className="text-sm font-medium flex items-center gap-1">
              <Flag size={16} />
              <span>{t('questType')}</span>
            </Label>
            <Select
              value={type}
              onValueChange={(value) => setType(value as "daily" | "main" | "penalty" | "reward")}
            >
              <SelectTrigger 
                id="type" 
                className="bg-secondary/50 border-secondary focus:border-rpg-primary focus:ring-rpg-primary/20"
                dir={isRtl ? "rtl" : "ltr"}
              >
                <SelectValue placeholder={t('selectQuestType')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">
                  <div className={`flex items-center gap-2 ${isRtl ? "flex-row-reverse justify-end" : ""}`}>
                    <Calendar size={16} className="text-blue-400" />
                    <div className={`flex flex-col ${isRtl ? "items-end" : ""}`}>
                      <span className="text-blue-400 font-medium">{t('daily')} {t('quests')}</span>
                      <span className={`text-xs text-muted-foreground ${isRtl ? "text-right" : ""}`}>{t('dailyQuestsDesc')}</span>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="main">
                  <div className={`flex items-center gap-2 ${isRtl ? "flex-row-reverse justify-end" : ""}`}>
                    <Star size={16} className="text-yellow-400" />
                    <div className={`flex flex-col ${isRtl ? "items-end" : ""}`}>
                      <span className="text-yellow-400 font-medium">{t('main')} {t('quests')}</span>
                      <span className={`text-xs text-muted-foreground ${isRtl ? "text-right" : ""}`}>{t('mainQuestsDesc')}</span>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="penalty">
                  <div className={`flex items-center gap-2 ${isRtl ? "flex-row-reverse justify-end" : ""}`}>
                    <Shield size={16} className="text-red-400" />
                    <div className={`flex flex-col ${isRtl ? "items-end" : ""}`}>
                      <span className="text-red-400 font-medium">{t('penalty')} {t('quests')}</span>
                      <span className={`text-xs text-muted-foreground ${isRtl ? "text-right" : ""}`}>{t('penaltyQuestsDesc')}</span>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="reward">
                  <div className={`flex items-center gap-2 ${isRtl ? "flex-row-reverse justify-end" : ""}`}>
                    <Award size={16} className="text-green-400" />
                    <div className={`flex flex-col ${isRtl ? "items-end" : ""}`}>
                      <span className="text-green-400 font-medium">{t('reward')} {t('quests')}</span>
                      <span className={`text-xs text-muted-foreground ${isRtl ? "text-right" : ""}`}>{t('rewardQuestsDesc')}</span>
                    </div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div>
            <Label htmlFor="difficulty" className="text-sm font-medium">{t('difficultyRank')}</Label>
            <Select
              value={difficulty}
              onValueChange={(value) => setDifficulty(value as QuestDifficulty)}
            >
              <SelectTrigger 
                id="difficulty" 
                className="bg-secondary/50 border-secondary focus:border-rpg-primary focus:ring-rpg-primary/20"
                dir={isRtl ? "rtl" : "ltr"}
              >
                <SelectValue placeholder={t('selectDifficulty')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="E" className="text-gray-400 font-bold">E {t('rank')} ({t('easiest')})</SelectItem>
                <SelectItem value="D" className="text-green-500 font-bold">D {t('rank')}</SelectItem>
                <SelectItem value="C" className="text-blue-500 font-bold">C {t('rank')} ({t('average')})</SelectItem>
                <SelectItem value="B" className="text-purple-500 font-bold">B {t('rank')}</SelectItem>
                <SelectItem value="A" className="text-orange-500 font-bold">A {t('rank')}</SelectItem>
                <SelectItem value="S" className="text-red-500 font-bold">S {t('rank')} ({t('hardest')})</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </>
  );
};

export default QuestDetails;
