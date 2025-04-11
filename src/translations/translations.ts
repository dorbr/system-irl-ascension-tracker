
import { Translations, TranslationKey } from './types';
import { englishCommon, hebrewCommon } from './common';
import { englishProfile, hebrewProfile } from './profile';
import { englishQuests, hebrewQuests } from './quests';
import { englishStats, hebrewStats } from './stats';
import { englishShadows, hebrewShadows } from './shadows';
import { englishSettings, hebrewSettings } from './settings';
import { englishSocial, hebrewSocial } from './social';

export type Languages = 'english' | 'hebrew' | 'spanish' | 'french' | 'german' | 'chinese' | 'japanese' | 'korean' | 'arabic';

// Combine all translation segments
const translations: Record<Languages, Translations> = {
  english: {
    ...englishCommon,
    ...englishProfile,
    ...englishQuests,
    ...englishStats,
    ...englishShadows,
    ...englishSettings,
    ...englishSocial
  },
  hebrew: {
    ...hebrewCommon,
    ...hebrewProfile,
    ...hebrewQuests,
    ...hebrewStats,
    ...hebrewShadows,
    ...hebrewSettings,
    ...hebrewSocial
  },
  // Add placeholders for future languages (using English as fallback)
  spanish: { ...englishCommon },
  french: { ...englishCommon },
  german: { ...englishCommon },
  chinese: { ...englishCommon },
  japanese: { ...englishCommon },
  korean: { ...englishCommon },
  arabic: { ...englishCommon }
};

export function getTranslations(language: string): Translations {
  return translations[language as Languages] || translations.english;
}

// Fix re-exports to use 'export type' for TypeScript types with isolatedModules
export { Translations };
export type { TranslationKey };
