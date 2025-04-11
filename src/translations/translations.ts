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
  | 'road'
  | 'shadowArchive'
  | 'newShadow'
  | 'archiveNewShadow'
  | 'shadowDesc'
  | 'shadowName'
  | 'shadowNamePlaceholder'
  | 'event'
  | 'eventPlaceholder'
  | 'reflection'
  | 'reflectionPlaceholder'
  | 'insight'
  | 'insightPlaceholder'
  | 'relatedStats'
  | 'selectStat'
  | 'add'
  | 'archiveShadow'
  | 'shadowsDesc'
  | 'noShadows'
  | 'error'
  | 'shadowRequired'
  | 'shadowArchived';

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
  road: 'Road',
  
  // Shadow page translations
  shadowArchive: 'Shadow Archive',
  newShadow: 'New Shadow',
  archiveNewShadow: 'Archive New Shadow',
  shadowDesc: 'Record a failure or challenge as a Shadow to learn from it.',
  shadowName: 'Shadow Name',
  shadowNamePlaceholder: 'Name your shadow (e.g., \'Fear of Rejection\')',
  event: 'What Happened?',
  eventPlaceholder: 'Describe the event or challenge',
  reflection: 'Your Reflection',
  reflectionPlaceholder: 'How did you feel? What were your thoughts?',
  insight: 'Insight Gained',
  insightPlaceholder: 'What did you learn from this experience?',
  relatedStats: 'Related Stats',
  selectStat: 'Select a Stat',
  add: 'Add',
  archiveShadow: 'Archive Shadow',
  shadowsDesc: 'Record your failures and challenges as Shadows. Draw wisdom from them to overcome future obstacles.',
  noShadows: 'No shadows archived yet',
  error: 'Error',
  shadowRequired: 'Shadow name and event are required',
  shadowArchived: 'Shadow Archived',
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
  road: 'דרך',
  
  // Shadow page translations in Hebrew
  shadowArchive: 'ארכיון צללים',
  newShadow: 'צל חדש',
  archiveNewShadow: 'הוספת צל חדש',
  shadowDesc: 'תעד כישלון או אתגר כצל כדי ללמוד ממנו.',
  shadowName: 'שם הצל',
  shadowNamePlaceholder: 'תן שם לצל שלך (לדוגמה, \'פחד מדחייה\')',
  event: 'מה קרה?',
  eventPlaceholder: 'תאר את האירוע או האתגר',
  reflection: 'הרהורים שלך',
  reflectionPlaceholder: 'איך הרגשת? מה היו המחשבות שלך?',
  insight: 'תובנה שהושגה',
  insightPlaceholder: 'מה למדת מהחוויה הזו?',
  relatedStats: 'סטטיסטיקות קשורות',
  selectStat: 'בחר סטטיסטיקה',
  add: 'הוסף',
  archiveShadow: 'שמור צל',
  shadowsDesc: 'תעד את הכישלונות והאתגרים שלך כצללים. שאב חוכמה מהם כדי להתגבר על מכשולים עתידיים.',
  noShadows: 'אין צללים בארכיון עדיין',
  error: 'שגיאה',
  shadowRequired: 'שם הצל והאירוע הם שדות חובה',
  shadowArchived: 'הצל נשמר בארכיון',
};

// Get translations based on selected language
export const getTranslations = (language: string): Translations => {
  if (language === 'hebrew') {
    return hebrewTranslations;
  }
  // Add support for other languages as needed
  return englishTranslations;
};
