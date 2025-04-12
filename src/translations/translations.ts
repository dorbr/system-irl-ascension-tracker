
import { Translations } from './types';
import { englishCommon, hebrewCommon, arabicCommon } from './common';
import { englishHome, hebrewHome, arabicHome } from './home';
import { englishShadows, hebrewShadows, arabicShadows } from './shadows';
import { englishStats, hebrewStats, arabicStats } from './stats';
import { englishProfile, hebrewProfile, arabicProfile } from './profile';
import { englishSettings, hebrewSettings, arabicSettings } from './settings';
import { englishSocial, hebrewSocial, arabicSocial } from './social';
import { englishQuests, hebrewQuests } from './quests';
import { englishResources, hebrewResources } from './resources';

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
};

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
};

export const arabic: Translations = {
  ...arabicCommon,
  ...arabicHome,
  ...arabicShadows,
  ...arabicStats,
  ...arabicProfile,
  ...arabicSettings,
  ...arabicSocial
};
