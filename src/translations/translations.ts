
import { Translations } from './types';
import { englishCommon, hebrewCommon } from './common';
import { englishHome, hebrewHome } from './home';
import { englishShadows, hebrewShadows } from './shadows';
import { englishStats, hebrewStats } from './stats';
import { englishProfile, hebrewProfile } from './profile';
import { englishSettings, hebrewSettings } from './settings';
import { englishSocial, hebrewSocial } from './social';
import { englishQuests, hebrewQuests } from './quests';
import { englishResources, hebrewResources } from './resources';

// Create empty Arabic translations objects to fix the import errors
const arabicCommon: Partial<Translations> = {};
const arabicHome: Partial<Translations> = {};
const arabicShadows: Partial<Translations> = {};
const arabicStats: Partial<Translations> = {};
const arabicProfile: Partial<Translations> = {};
const arabicSettings: Partial<Translations> = {};
const arabicSocial: Partial<Translations> = {};
const arabicQuests: Partial<Translations> = {};
const arabicResources: Partial<Translations> = {};

export const english: Translations = {
  ...englishCommon,
  ...englishHome,
  ...englishShadows,
  ...englishStats,
  ...englishProfile,
  ...englishSettings,
  ...englishSocial,
  ...englishQuests,
  ...englishResources
} as Translations;

export const hebrew: Translations = {
  ...hebrewCommon,
  ...hebrewHome,
  ...hebrewShadows,
  ...hebrewStats,
  ...hebrewProfile,
  ...hebrewSettings,
  ...hebrewSocial,
  ...hebrewQuests,
  ...hebrewResources
} as Translations;

export const arabic: Translations = {
  ...arabicCommon,
  ...arabicHome,
  ...arabicShadows,
  ...arabicStats,
  ...arabicProfile,
  ...arabicSettings,
  ...arabicSocial,
  ...arabicQuests,
  ...arabicResources
} as Translations;

// Add the getTranslations function that's required by LanguageContext
export const getTranslations = (language: string): Translations => {
  switch (language) {
    case 'hebrew':
      return hebrew;
    case 'arabic':
      return arabic;
    default:
      return english;
  }
};

// Re-export the types from types.ts
export { type Translations, type TranslationKey, type Languages } from './types';
