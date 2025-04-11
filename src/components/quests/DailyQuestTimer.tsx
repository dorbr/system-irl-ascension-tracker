
import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface DailyQuestTimerProps {
  onTimeExpired?: () => void;
}

const DailyQuestTimer: React.FC<DailyQuestTimerProps> = ({ onTimeExpired }) => {
  const [timeLeft, setTimeLeft] = useState<string>("");
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0, 0, 0
      );
      
      const diff = endOfDay.getTime() - now.getTime();
      
      // Convert to hours, minutes, seconds
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    
    // Set initial time
    setTimeLeft(calculateTimeLeft());
    
    // Update time every second
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      // Check if the day has ended
      if (newTimeLeft === "00:00:00") {
        if (onTimeExpired) {
          onTimeExpired();
        }
      }
    }, 1000);
    
    // Clean up
    return () => clearInterval(timer);
  }, [onTimeExpired]);
  
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/30 px-3 py-1 rounded-full">
      <Clock size={16} className="text-yellow-400" />
      <span>Daily Reset: <span className="font-mono">{timeLeft}</span></span>
    </div>
  );
};

export default DailyQuestTimer;
