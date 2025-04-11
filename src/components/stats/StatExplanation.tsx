
import React from "react";
import { Stat } from "@/context/UserContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface StatExplanationProps {
  stats: Stat[];
  onClose?: () => void;
}

// English stat descriptions
const englishStatDescriptions: Record<string, { description: string, benefits: string[] }> = {
  "Strength": {
    description: "Physical power and muscle. Affects your ability to carry heavy loads, deal physical damage, and resist physical challenges.",
    benefits: [
      "Increases physical damage in combat",
      "Improves capacity to carry items",
      "Helps with physical labor tasks"
    ]
  },
  "Agility": {
    description: "Speed, balance, and reflexes. Affects how quickly you can move, your reaction time, and your ability to perform tasks requiring coordination.",
    benefits: [
      "Faster movement and reaction times",
      "Better balance and coordination",
      "Improved performance in sports and physical activities"
    ]
  },
  "Intelligence": {
    description: "Mental acuity, learning capacity, and problem-solving. Affects your ability to understand complex topics and solve difficult problems.",
    benefits: [
      "Better comprehension and learning",
      "Enhanced problem-solving abilities",
      "Improved memory and recall"
    ]
  },
  "Perception": {
    description: "Awareness of your surroundings and attention to detail. Affects your ability to notice subtle changes and important details.",
    benefits: [
      "Noticing important details in environments",
      "Spotting patterns more easily",
      "Improved spatial awareness"
    ]
  },
  "Vitality": {
    description: "Health, stamina, and endurance. Affects your energy levels, resistance to illness, and ability to perform tasks over extended periods.",
    benefits: [
      "Increased energy and stamina",
      "Better recovery from physical exertion",
      "Improved immune system function"
    ]
  },
  "Sense": {
    description: "Intuition and decision-making. Affects your ability to make good decisions quickly and your intuitive understanding of situations.",
    benefits: [
      "Better intuition and gut feelings",
      "Improved decision-making under pressure",
      "Sensing danger or opportunities"
    ]
  },
  "Charisma": {
    description: "Social influence and personal magnetism. Affects how others perceive you and your ability to persuade and inspire others.",
    benefits: [
      "Enhanced social interactions",
      "Better leadership and persuasion abilities",
      "Stronger relationships and connections"
    ]
  },
  "Luck": {
    description: "Fortune and probability. While somewhat mysterious, this stat seems to affect chance outcomes and how often things go your way.",
    benefits: [
      "Increased chance of favorable outcomes",
      "Reduced frequency of mishaps and accidents",
      "More opportunities seem to present themselves"
    ]
  }
};

// Hebrew stat descriptions
const hebrewStatDescriptions: Record<string, { description: string, benefits: string[] }> = {
  "Strength": {
    description: "כוח פיזי ושרירים. משפיע על היכולת שלך לשאת משקל כבד, לגרום נזק פיזי, ולהתנגד לאתגרים פיזיים.",
    benefits: [
      "מגביר נזק פיזי בקרב",
      "משפר את היכולת לשאת חפצים",
      "עוזר במשימות עבודה פיזית"
    ]
  },
  "Agility": {
    description: "מהירות, שיווי משקל ורפלקסים. משפיע על כמה מהר אתה יכול לנוע, זמן התגובה שלך, והיכולת שלך לבצע משימות הדורשות קואורדינציה.",
    benefits: [
      "תנועה מהירה יותר וזמני תגובה טובים יותר",
      "שיווי משקל וקואורדינציה טובים יותר",
      "ביצועים משופרים בספורט ופעילויות פיזיות"
    ]
  },
  "Intelligence": {
    description: "חדות מחשבתית, יכולת למידה ופתרון בעיות. משפיע על היכולת שלך להבין נושאים מורכבים ולפתור בעיות קשות.",
    benefits: [
      "הבנה ולמידה טובים יותר",
      "יכולות פתרון בעיות משופרות",
      "זיכרון ושליפה משופרים"
    ]
  },
  "Perception": {
    description: "מודעות לסביבה שלך ותשומת לב לפרטים. משפיע על היכולת שלך להבחין בשינויים עדינים ופרטים חשובים.",
    benefits: [
      "הבחנה בפרטים חשובים בסביבה",
      "זיהוי דפוסים בקלות רבה יותר",
      "מודעות מרחבית משופרת"
    ]
  },
  "Vitality": {
    description: "בריאות, סיבולת ועמידות. משפיע על רמות האנרגיה שלך, התנגדות למחלות, והיכולת לבצע משימות לאורך זמן.",
    benefits: [
      "אנרגיה וסיבולת מוגברות",
      "התאוששות טובה יותר ממאמץ פיזי",
      "תפקוד משופר של מערכת החיסון"
    ]
  },
  "Sense": {
    description: "אינטואיציה וקבלת החלטות. משפיע על היכולת שלך לקבל החלטות טובות במהירות והבנה אינטואיטיבית של מצבים.",
    benefits: [
      "אינטואיציה ותחושות בטן טובות יותר",
      "קבלת החלטות משופרת תחת לחץ",
      "חישת סכנה או הזדמנויות"
    ]
  },
  "Charisma": {
    description: "השפעה חברתית ומגנטיות אישית. משפיע על איך אחרים תופסים אותך והיכולת שלך לשכנע ולהשרות השראה על אחרים.",
    benefits: [
      "אינטראקציות חברתיות משופרות",
      "יכולות מנהיגות ושכנוע טובות יותר",
      "קשרים ויחסים חזקים יותר"
    ]
  },
  "Luck": {
    description: "מזל והסתברות. למרות שמסתורי במקצת, נראה שיכולת זו משפיעה על תוצאות מקריות ועל כמה פעמים דברים מסתדרים לטובתך.",
    benefits: [
      "סיכוי מוגבר לתוצאות חיוביות",
      "תדירות מופחתת של תקלות ותאונות",
      "יותר הזדמנויות נראות מציגות את עצמן"
    ]
  }
};

// Helper function to get stat-specific improvement suggestions in English
function getEnglishSuggestionsByStatName(statName: string): string[] {
  switch (statName) {
    case "Strength":
      return ["Weight lifting", "Regular physical exercise", "Manual labor", "Resistance training"];
    case "Agility":
      return ["Sports practice", "Dance lessons", "Yoga", "Balance exercises", "Martial arts"];
    case "Intelligence":
      return ["Reading books", "Taking courses", "Solving puzzles", "Learning new skills", "Teaching others"];
    case "Perception":
      return ["Mindfulness practice", "Observation exercises", "Detail-oriented tasks", "Meditation"];
    case "Vitality":
      return ["Cardiovascular exercise", "Eating healthy foods", "Getting proper sleep", "Staying hydrated"];
    case "Sense":
      return ["Meditation", "Decision-making practice", "Journaling", "Analyzing past decisions"];
    case "Charisma":
      return ["Social practice", "Public speaking", "Active listening", "Joining social groups", "Leadership roles"];
    case "Luck":
      return ["Taking calculated risks", "Putting yourself in new situations", "Being open to opportunities", "Learning from setbacks"];
    default:
      return ["Regular practice", "Learning from others", "Setting specific goals"];
  }
}

// Helper function to get stat-specific improvement suggestions in Hebrew
function getHebrewSuggestionsByStatName(statName: string): string[] {
  switch (statName) {
    case "Strength":
      return ["הרמת משקולות", "פעילות גופנית סדירה", "עבודה פיזית", "אימוני התנגדות"];
    case "Agility":
      return ["אימוני ספורט", "שיעורי ריקוד", "יוגה", "תרגילי איזון", "אומנויות לחימה"];
    case "Intelligence":
      return ["קריאת ספרים", "לקיחת קורסים", "פתרון חידות", "למידת מיומנויות חדשות", "ללמד אחרים"];
    case "Perception":
      return ["תרגול קשיבות", "תרגילי תצפית", "משימות מוכוונות פרטים", "מדיטציה"];
    case "Vitality":
      return ["אימון אירובי", "אכילת מזון בריא", "שינה נאותה", "שתייה מרובה"];
    case "Sense":
      return ["מדיטציה", "תרגול קבלת החלטות", "ניהול יומן", "ניתוח החלטות קודמות"];
    case "Charisma":
      return ["תרגול חברתי", "דיבור בציבור", "הקשבה פעילה", "הצטרפות לקבוצות חברתיות", "תפקידי מנהיגות"];
    case "Luck":
      return ["לקיחת סיכונים מחושבים", "להכניס את עצמך למצבים חדשים", "להיות פתוח להזדמנויות", "ללמוד מכישלונות"];
    default:
      return ["תרגול סדיר", "למידה מאחרים", "הצבת מטרות ספציפיות"];
  }
}

const StatExplanation: React.FC<StatExplanationProps> = ({ stats, onClose }) => {
  const { t, isRtl, language } = useLanguage();
  const stat = stats[0];
  
  if (!stat) return null;
  
  // Choose the appropriate descriptions based on language
  const statDescriptions = language === 'hebrew' ? hebrewStatDescriptions : englishStatDescriptions;
  
  return (
    <div className="relative">
      {onClose && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          className={`absolute ${isRtl ? 'left-0' : 'right-0'} top-0`}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      
      <div className="flex items-center justify-center gap-2 mb-4">
        <div 
          className="w-8 h-8 rounded-md flex items-center justify-center text-white text-xs font-medium"
          style={{ backgroundColor: stat.color }}
        >
          {stat.abbreviation}
        </div>
        <h2 className="text-lg font-semibold">{stat.name}</h2>
      </div>
      
      <p className={`text-sm mb-4 ${isRtl ? "text-right" : ""}`}>
        {statDescriptions[stat.name]?.description || (isRtl ? "אין תיאור זמין." : "No description available.")}
      </p>
      
      <h4 className={`text-sm font-medium mb-2 ${isRtl ? "text-right" : ""}`}>
        {t("benefits").replace("{stat}", stat.name)}
      </h4>
      <ul className={`text-sm space-y-2 list-disc ${isRtl ? "pr-5 text-right" : "pl-5"}`}>
        {statDescriptions[stat.name]?.benefits.map((benefit, index) => (
          <li key={index}>{benefit}</li>
        ))}
      </ul>
      
      <h4 className={`text-sm font-medium mt-4 mb-2 ${isRtl ? "text-right" : ""}`}>
        {t("howToImprove").replace("{stat}", stat.name)}
      </h4>
      <ul className={`text-sm list-disc ${isRtl ? "pr-5 text-right" : "pl-5"}`}>
        {language === 'hebrew' 
          ? getHebrewSuggestionsByStatName(stat.name).map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))
          : getEnglishSuggestionsByStatName(stat.name).map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))
        }
      </ul>
    </div>
  );
};

export default StatExplanation;
