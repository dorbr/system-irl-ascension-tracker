
import { useLanguage } from "@/context/LanguageContext";

// Hebrew translations for class names - make sure all class names are included
export const classTranslations: { [key: string]: string } = {
  "Novice": "טירון",
  "Student": "תלמיד",
  "Apprentice": "שוליה",
  "Explorer": "חוקר",
  // Add any additional class names that might be used
};

export const useClassTranslations = () => {
  const { language } = useLanguage();
  
  const getLocalizedClassName = (className: string) => {
    if (language === 'hebrew' && className && classTranslations[className]) {
      return classTranslations[className];
    }
    return className;
  };
  
  return { getLocalizedClassName };
};
