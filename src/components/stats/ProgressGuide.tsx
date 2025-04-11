
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";

const ProgressGuide: React.FC = () => {
  const { t, isRtl } = useLanguage();
  
  return (
    <Card className="mb-6 bg-secondary/5 border-secondary/20">
      <CardHeader className="pb-2">
        <CardTitle className={`text-lg ${isRtl ? "text-right" : ""}`}>
          {isRtl ? "איך לתעד התקדמות" : "How to Log Progress"}
        </CardTitle>
        <CardDescription className={isRtl ? "text-right" : ""}>
          {isRtl ? "עקוב אחר פעילויות בחיים האמיתיים כדי לשפר את היכולות שלך" : 
          "Track your real-life activities to boost your stats"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className={`text-sm ${isRtl ? "text-right" : ""}`}>
            {isRtl ? 
              "תעד את הפעילויות שלך בחיים האמיתיים שמשפרות את המיומנויות שלך כדי להגדיל יכולות ולהרוויח ניסיון. בחר יכולת, הוסף פרטים על מה שעשית, ובחר כמה השתפרת (1-5)." : 
              "Log your real-life activities that improve your skills to increase stats and earn XP. Select a stat, add details about what you did, and choose how much you improved (1-5)."}
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
            <div className="space-y-1">
              <h4 className={`font-semibold ${isRtl ? "text-right" : ""}`}>
                {isRtl ? "פיזי" : "Physical"}
              </h4>
              <ul className={`text-xs space-y-1 list-disc ${isRtl ? "pr-4 text-right" : "pl-4"}`}>
                <li>{isRtl ? "כוח: אימון, הרמת משקולות" : "Strength: Exercise, lifting"}</li>
                <li>{isRtl ? "זריזות: ספורט, יוגה, ריקוד" : "Agility: Sports, yoga, dance"}</li>
              </ul>
            </div>
            <div className="space-y-1">
              <h4 className={`font-semibold ${isRtl ? "text-right" : ""}`}>
                {isRtl ? "מנטלי" : "Mental"}
              </h4>
              <ul className={`text-xs space-y-1 list-disc ${isRtl ? "pr-4 text-right" : "pl-4"}`}>
                <li>{isRtl ? "אינטליגנציה: למידה, לימודים" : "Intelligence: Learning, studying"}</li>
                <li>{isRtl ? "תפיסה: תצפית, פרטים" : "Perception: Observation, details"}</li>
              </ul>
            </div>
            <div className="space-y-1">
              <h4 className={`font-semibold ${isRtl ? "text-right" : ""}`}>
                {isRtl ? "בריאות ותודעה" : "Health & Mind"}
              </h4>
              <ul className={`text-xs space-y-1 list-disc ${isRtl ? "pr-4 text-right" : "pl-4"}`}>
                <li>{isRtl ? "חיוניות: אירובי, הרגלים בריאים" : "Vitality: Cardio, healthy habits"}</li>
                <li>{isRtl ? "חוש: מדיטציה, התבוננות" : "Sense: Meditation, reflection"}</li>
              </ul>
            </div>
            <div className="space-y-1">
              <h4 className={`font-semibold ${isRtl ? "text-right" : ""}`}>
                {isRtl ? "חברתי ומזל" : "Social & Fortune"}
              </h4>
              <ul className={`text-xs space-y-1 list-disc ${isRtl ? "pr-4 text-right" : "pl-4"}`}>
                <li>{isRtl ? "כריזמה: מיומנויות חברתיות, מנהיגות" : "Charisma: Social skills, leadership"}</li>
                <li>{isRtl ? "מזל: לקיחת סיכונים, חוויות חדשות" : "Luck: Taking chances, new experiences"}</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressGuide;
