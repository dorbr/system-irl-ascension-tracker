
import React from "react";
import { CheckCircle, Circle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface CompleteButtonProps {
  completed: boolean;
  onComplete: (e: React.MouseEvent) => void;
}

const CompleteButton: React.FC<CompleteButtonProps> = ({ completed, onComplete }) => {
  const { isRtl } = useLanguage();
  
  return (
    <button
      onClick={onComplete}
      disabled={completed}
      className={`p-1 transition-transform hover:scale-110 disabled:opacity-50 disabled:hover:scale-100 ${isRtl ? "text-right" : ""}`}
    >
      {completed ? (
        <CheckCircle size={24} className="text-rpg-primary" />
      ) : (
        <Circle size={24} className="text-muted-foreground" />
      )}
    </button>
  );
};

export default CompleteButton;
