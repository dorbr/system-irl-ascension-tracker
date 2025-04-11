
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
          {t("howToLogProgress")}
        </CardTitle>
        <CardDescription className={isRtl ? "text-right" : ""}>
          {t("trackRealLifeActivities")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className={`text-sm ${isRtl ? "text-right" : ""}`}>
            {t("logActivitiesExplanation")}
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
            <div className="space-y-1">
              <h4 className={`font-semibold ${isRtl ? "text-right" : ""}`}>
                {t("physical")}
              </h4>
              <ul className={`text-xs space-y-1 list-disc ${isRtl ? "pr-4 text-right" : "pl-4"}`}>
                <li>{t("strengthExample")}</li>
                <li>{t("agilityExample")}</li>
              </ul>
            </div>
            <div className="space-y-1">
              <h4 className={`font-semibold ${isRtl ? "text-right" : ""}`}>
                {t("mental")}
              </h4>
              <ul className={`text-xs space-y-1 list-disc ${isRtl ? "pr-4 text-right" : "pl-4"}`}>
                <li>{t("intelligenceExample")}</li>
                <li>{t("perceptionExample")}</li>
              </ul>
            </div>
            <div className="space-y-1">
              <h4 className={`font-semibold ${isRtl ? "text-right" : ""}`}>
                {t("healthAndMind")}
              </h4>
              <ul className={`text-xs space-y-1 list-disc ${isRtl ? "pr-4 text-right" : "pl-4"}`}>
                <li>{t("vitalityExample")}</li>
                <li>{t("senseExample")}</li>
              </ul>
            </div>
            <div className="space-y-1">
              <h4 className={`font-semibold ${isRtl ? "text-right" : ""}`}>
                {t("socialAndFortune")}
              </h4>
              <ul className={`text-xs space-y-1 list-disc ${isRtl ? "pr-4 text-right" : "pl-4"}`}>
                <li>{t("charismaExample")}</li>
                <li>{t("luckExample")}</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressGuide;
