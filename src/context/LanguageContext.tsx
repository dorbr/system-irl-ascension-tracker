
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTranslations, Translations, TranslationKey, Languages } from '@/translations/translations';

interface LanguageContextType {
  language: string;
  textDirection: "ltr" | "rtl";
  setLanguage: (language: string) => void;
  t: (key: TranslationKey) => string;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'english',
  textDirection: 'ltr',
  isRtl: false,
  setLanguage: () => {},
  t: () => '',
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Check for saved language preference or use default
  const getSavedLanguage = () => {
    const saved = localStorage.getItem('system_irl_language');
    return saved || 'english';
  };

  const [language, setLanguageState] = useState<string>(getSavedLanguage());
  const [translations, setTranslations] = useState<Translations>(getTranslations(getSavedLanguage()));
  const [textDirection, setTextDirection] = useState<"ltr" | "rtl">(getSavedLanguage() === 'hebrew' ? 'rtl' : 'ltr');
  const [isRtl, setIsRtl] = useState<boolean>(getSavedLanguage() === 'hebrew');

  // Update document direction on initial load
  useEffect(() => {
    if (language === 'hebrew' || language === 'arabic') {
      document.documentElement.dir = 'rtl';
      document.body.classList.add('rtl');
    } else {
      document.documentElement.dir = 'ltr';
      document.body.classList.remove('rtl');
    }
  }, []);

  const setLanguage = (newLanguage: string) => {
    console.log("Setting language to:", newLanguage);
    setLanguageState(newLanguage);
    setTranslations(getTranslations(newLanguage));
    localStorage.setItem('system_irl_language', newLanguage);
    
    // Set direction based on language
    if (newLanguage === 'hebrew' || newLanguage === 'arabic') {
      setTextDirection('rtl');
      setIsRtl(true);
      document.documentElement.dir = 'rtl';
      document.body.classList.add('rtl');
    } else {
      setTextDirection('ltr');
      setIsRtl(false);
      document.documentElement.dir = 'ltr';
      document.body.classList.remove('rtl');
    }
  };

  const t = (key: TranslationKey): string => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, textDirection, isRtl, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
