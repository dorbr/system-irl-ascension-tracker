
// Define types for our translations
export type TranslationKey = 
  | 'preferences'
  | 'customizeExperience'
  | 'notifications'
  | 'notificationsDesc'
  | 'darkMode'
  | 'darkModeDesc'
  | 'soundEffects'
  | 'soundEffectsDesc'
  | 'language'
  | 'languageDesc'
  | 'account'
  | 'manageAccount'
  | 'privacySettings'
  | 'deleteAccount'
  | 'signOut'
  | 'darkModeEnabled'
  | 'darkModeDisabled'
  | 'notificationsEnabled'
  | 'notificationsDisabled'
  | 'soundEnabled'
  | 'soundDisabled'
  | 'languageUpdated'
  | 'prefSaved'
  | 'deleteAccountTitle'
  | 'deleteAccountDesc'
  | 'privacySettingsTitle'
  | 'privacySettingsDesc'
  | 'profile'
  | 'settings'
  | 'quests'
  | 'daily'
  | 'main'
  | 'dungeon'
  | 'completed'
  | 'createQuest'
  | 'questName'
  | 'questDescription'
  | 'questType'
  | 'questReward'
  | 'save'
  | 'cancel'
  | 'level'
  | 'xp'
  | 'class'
  | 'editProfile'
  | 'hideEditor'
  | 'questCompletion'
  | 'topStats'
  | 'progressStats'
  | 'dungeons'
  | 'shadows'
  | 'classEvolution'
  | 'nextClasses'
  | 'saveChanges'
  | 'saving'
  | 'username'
  | 'crew'
  | 'road';

export type Translations = {
  [key in TranslationKey]: string;
};

export type Languages = 'english' | 'hebrew' | 'arabic';

// English translations (default)
export const englishTranslations: Translations = {
  preferences: 'Preferences',
  customizeExperience: 'Customize your app experience',
  notifications: 'Notifications',
  notificationsDesc: 'Receive quest reminders and updates',
  darkMode: 'Dark Mode',
  darkModeDesc: 'Switch between light and dark themes',
  soundEffects: 'Sound Effects',
  soundEffectsDesc: 'Play sounds for actions and achievements',
  language: 'Language',
  languageDesc: 'Choose your preferred language',
  account: 'Account',
  manageAccount: 'Manage your account settings',
  privacySettings: 'Privacy Settings',
  deleteAccount: 'Delete Account',
  signOut: 'Sign Out',
  darkModeEnabled: 'Dark mode enabled',
  darkModeDisabled: 'Dark mode disabled',
  notificationsEnabled: 'Notifications enabled',
  notificationsDisabled: 'Notifications disabled',
  soundEnabled: 'Sound enabled',
  soundDisabled: 'Sound disabled',
  languageUpdated: 'Language updated',
  prefSaved: 'Your preference has been saved.',
  deleteAccountTitle: 'Delete account',
  deleteAccountDesc: 'This feature is not yet implemented.',
  privacySettingsTitle: 'Privacy Settings',
  privacySettingsDesc: 'This feature is not yet implemented.',
  profile: 'Profile',
  settings: 'Settings',
  quests: 'Quests',
  daily: 'Daily',
  main: 'Main',
  dungeon: 'Dungeon',
  completed: 'Completed',
  createQuest: 'Create Quest',
  questName: 'Quest Name',
  questDescription: 'Quest Description',
  questType: 'Quest Type',
  questReward: 'Reward',
  save: 'Save',
  cancel: 'Cancel',
  level: 'Level',
  xp: 'XP',
  class: 'Class',
  editProfile: 'Edit Profile',
  hideEditor: 'Hide Editor',
  questCompletion: 'Quest Completion',
  topStats: 'Top Stats',
  progressStats: 'Progress Stats',
  dungeons: 'Dungeons',
  shadows: 'Shadows',
  classEvolution: 'Class Evolution',
  nextClasses: 'Next potential classes',
  saveChanges: 'Save Changes',
  saving: 'Saving...',
  username: 'Username',
  crew: 'Crew',
  road: 'Road'
};

// Hebrew translations
export const hebrewTranslations: Translations = {
  preferences: 'העדפות',
  customizeExperience: 'התאם אישית את חוויית האפליקציה שלך',
  notifications: 'התראות',
  notificationsDesc: 'קבל תזכורות ועדכונים למשימות',
  darkMode: 'מצב כהה',
  darkModeDesc: 'החלף בין ערכות נושא בהירות וכהות',
  soundEffects: 'אפקטים קוליים',
  soundEffectsDesc: 'השמע צלילים לפעולות והישגים',
  language: 'שפה',
  languageDesc: 'בחר את השפה המועדפת עליך',
  account: 'חשבון',
  manageAccount: 'נהל את הגדרות החשבון שלך',
  privacySettings: 'הגדרות פרטיות',
  deleteAccount: 'מחק חשבון',
  signOut: 'התנתק',
  darkModeEnabled: 'מצב כהה מופעל',
  darkModeDisabled: 'מצב כהה מבוטל',
  notificationsEnabled: 'התראות מופעלות',
  notificationsDisabled: 'התראות מבוטלות',
  soundEnabled: 'צליל מופעל',
  soundDisabled: 'צליל מבוטל',
  languageUpdated: 'השפה עודכנה',
  prefSaved: 'ההעדפה שלך נשמרה.',
  deleteAccountTitle: 'מחק חשבון',
  deleteAccountDesc: 'תכונה זו עדיין לא מיושמת.',
  privacySettingsTitle: 'הגדרות פרטיות',
  privacySettingsDesc: 'תכונה זו עדיין לא מיושמת.',
  profile: 'פרופיל',
  settings: 'הגדרות',
  quests: 'משימות',
  daily: 'יומיות',
  main: 'ראשיות',
  dungeon: 'מבוכים',
  completed: 'הושלמו',
  createQuest: 'צור משימה',
  questName: 'שם המשימה',
  questDescription: 'תיאור המשימה',
  questType: 'סוג המשימה',
  questReward: 'פרס',
  save: 'שמור',
  cancel: 'בטל',
  level: 'רמה',
  xp: 'ניסיון',
  class: 'מקצוע',
  editProfile: 'ערוך פרופיל',
  hideEditor: 'הסתר עורך',
  questCompletion: 'השלמת משימות',
  topStats: 'סטטיסטיקות מובילות',
  progressStats: 'סטטיסטיקות התקדמות',
  dungeons: 'מבוכים',
  shadows: 'צללים',
  classEvolution: 'התפתחות מקצוע',
  nextClasses: 'מקצועות פוטנציאליים הבאים',
  saveChanges: 'שמור שינויים',
  saving: 'שומר...',
  username: 'שם משתמש',
  crew: 'צוות',
  road: 'דרך'
};

// Get translations based on selected language
export const getTranslations = (language: string): Translations => {
  if (language === 'hebrew') {
    return hebrewTranslations;
  }
  // Add support for other languages as needed
  return englishTranslations;
};
