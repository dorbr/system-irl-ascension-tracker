
import { Translations, TranslationKey, Languages } from './types';
import { englishCommon, hebrewCommon } from './common';
import { englishSettings, hebrewSettings } from './settings';
import { englishQuests, hebrewQuests } from './quests';
import { englishProfile, hebrewProfile } from './profile';
import { englishSocial, hebrewSocial } from './social';
import { englishShadows, hebrewShadows } from './shadows';
import { englishStats, hebrewStats } from './stats';
import { englishHome, hebrewHome } from './home';

// English translations (default)
export const englishTranslations: Translations = {
  ...englishCommon,
  ...englishSettings,
  ...englishQuests,
  ...englishProfile,
  ...englishSocial,
  ...englishShadows,
  ...englishStats,
  ...englishHome,
} as Translations;

// Hebrew translations
export const hebrewTranslations: Translations = {
  ...hebrewCommon,
  ...hebrewSettings,
  ...hebrewQuests,
  ...hebrewProfile,
  ...hebrewSocial,
  ...hebrewShadows,
  ...hebrewStats,
  ...hebrewHome,
} as Translations;

// Get translations based on selected language
export const getTranslations = (language: string): Translations => {
  if (language === 'hebrew') {
    return hebrewTranslations;
  }
  // Add support for other languages as needed
  return englishTranslations;
};

// Re-export types for easier importing
export type { TranslationKey, Translations, Languages };
