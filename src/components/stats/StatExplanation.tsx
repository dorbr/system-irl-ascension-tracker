
import React from "react";
import { Stat } from "@/context/UserContext";
import { X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface StatExplanationProps {
  stats: Stat[];
  onClose?: () => void;
}

const StatExplanation: React.FC<StatExplanationProps> = ({ stats, onClose }) => {
  const { t, isRtl } = useLanguage();
  
  if (!stats.length) return null;
  
  const stat = stats[0];
  
  return (
    <div className="space-y-4">
      <div className={`flex items-center ${isRtl ? "justify-between flex-row-reverse" : "justify-between"}`}>
        <div className={`flex items-center gap-2 ${isRtl ? "flex-row-reverse" : ""}`}>
          <div 
            className="w-8 h-8 rounded-md flex items-center justify-center text-white font-medium"
            style={{ backgroundColor: stat.color }}
          >
            {stat.abbreviation}
          </div>
          <h3 className="text-lg font-semibold">{stat.name}</h3>
        </div>
        {onClose && (
          <button 
            onClick={onClose} 
            className="text-muted-foreground hover:text-foreground"
          >
            <X size={18} />
          </button>
        )}
      </div>
      
      <div>
        <h4 className={`text-sm font-medium text-muted-foreground mb-1 ${isRtl ? "text-right" : ""}`}>
          {t('benefits').replace('{stat}', stat.name)}
        </h4>
        <p className={`text-sm ${isRtl ? "text-right" : ""}`}>
          {stat.benefit || "No benefits information available"}
        </p>
      </div>
      
      <div>
        <h4 className={`text-sm font-medium text-muted-foreground mb-1 ${isRtl ? "text-right" : ""}`}>
          {t('howToImprove').replace('{stat}', stat.name)}
        </h4>
        <p className={`text-sm ${isRtl ? "text-right" : ""}`}>
          {stat.description || "No improvement information available"}
        </p>
      </div>
    </div>
  );
};

export default StatExplanation;
