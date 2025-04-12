
import { Translations } from './types';

// Resources related translations
export const englishResources: Partial<Translations> = {
  // Resource dashboard
  resourceModule: 'Resources',
  resourceDashboard: 'Resource Dashboard',
  totalGold: 'Total Gold',
  totalMana: 'Total Mana',
  totalNet: 'Net Worth',
  passiveBuffs: 'Passive Buffs',
  artifacts: 'Artifacts',
  buffs: 'Buffs',
  weekly: 'Weekly',
  monthly: 'Monthly',
  allTime: 'All Time',
  timeRange: 'Time Range',
  addEntry: 'Add Entry',
  viewDetails: 'View Details',
  
  // Log entry
  logEntry: 'Log Entry',
  entryType: 'Entry Type',
  amount: 'Amount',
  category: 'Category',
  date: 'Date',
  notes: 'Notes',
  tags: 'Tags',
  
  // Artifacts
  artifactsScreen: 'Artifacts',
  totalArtifactValue: 'Total Artifact Value',
  addArtifact: 'Add Artifact',
  artifactName: 'Artifact Name',
  artifactValue: 'Value',
  artifactDescription: 'Description',
  acquisitionDate: 'Acquisition Date',
  
  // Passive buffs
  passiveBuffTracker: 'Passive Buff Tracker',
  buffName: 'Buff Name',
  buffValue: 'Value/Month',
  buffSource: 'Source',
  startDate: 'Start Date',
  buffSummary: 'Buff Summary',
  activeMonths: 'Active Months',
  totalGained: 'Total Gained',
  
  // XP integration
  financialMilestone: 'Financial Milestone',
  consistentLogging: 'Consistent Logging',
  newBuff: 'New Buff',
  newArtifact: 'New Artifact',
  
  // Tabs
  overviewTab: 'Overview',
  historyTab: 'History',
  artifactsTab: 'Artifacts',
  buffsTab: 'Buffs',
  
  // Empty states
  noResourceEntries: 'No resource entries yet',
  noArtifacts: 'No artifacts yet',
  noBuffs: 'No buffs yet',
  
  // Charts and visualizations
  netGain: 'Net Gain',
  netLoss: 'Net Loss',
  expenseBreakdown: 'Expense Breakdown',
  netWorthTrend: 'Net Worth Trend',
  
  // Categories
  selectCategory: 'Select Category',
  food: 'Food',
  housing: 'Housing',
  transportation: 'Transportation',
  entertainment: 'Entertainment',
  utilities: 'Utilities',
  other: 'Other',
  salary: 'Salary',
  freelance: 'Freelance',
  gift: 'Gift',
  investment: 'Investment'
};

export const hebrewResources: Partial<Translations> = {
  // Resource dashboard
  resourceModule: 'משאבים',
  resourceDashboard: 'לוח בקרת משאבים',
  totalGold: 'סך זהב',
  totalMana: 'סך מאנה',
  totalNet: 'שווי נטו',
  passiveBuffs: 'באפים פסיביים',
  artifacts: 'חפצי ערך',
  buffs: 'באפים',
  weekly: 'שבועי',
  monthly: 'חודשי',
  allTime: 'כל הזמן',
  timeRange: 'טווח זמן',
  addEntry: 'הוסף רשומה',
  viewDetails: 'הצג פרטים',
  
  // Log entry
  logEntry: 'רשום רשומה',
  entryType: 'סוג רשומה',
  amount: 'סכום',
  category: 'קטגוריה',
  date: 'תאריך',
  notes: 'הערות',
  tags: 'תגיות',
  
  // Artifacts
  artifactsScreen: 'חפצי ערך',
  totalArtifactValue: 'שווי חפצים כולל',
  addArtifact: 'הוסף חפץ',
  artifactName: 'שם החפץ',
  artifactValue: 'ערך',
  artifactDescription: 'תיאור',
  acquisitionDate: 'תאריך רכישה',
  
  // Passive buffs
  passiveBuffTracker: 'עוקב באפים פסיביים',
  buffName: 'שם הבאף',
  buffValue: 'ערך/חודש',
  buffSource: 'מקור',
  startDate: 'תאריך התחלה',
  buffSummary: 'סיכום באפים',
  activeMonths: 'חודשים פעילים',
  totalGained: 'סך הכל הרווחת',
  
  // XP integration
  financialMilestone: 'אבן דרך פיננסית',
  consistentLogging: 'רישום עקבי',
  newBuff: 'באף חדש',
  newArtifact: 'חפץ חדש',
  
  // Tabs
  overviewTab: 'סקירה',
  historyTab: 'היסטוריה',
  artifactsTab: 'חפצי ערך',
  buffsTab: 'באפים',
  
  // Empty states
  noResourceEntries: 'אין רשומות משאבים עדיין',
  noArtifacts: 'אין חפצי ערך עדיין',
  noBuffs: 'אין באפים עדיין',
  
  // Charts and visualizations
  netGain: 'רווח נטו',
  netLoss: 'הפסד נטו',
  expenseBreakdown: 'פילוח הוצאות',
  netWorthTrend: 'מגמת שווי נטו',
  
  // Categories
  selectCategory: 'בחר קטגוריה',
  food: 'מזון',
  housing: 'דיור',
  transportation: 'תחבורה',
  entertainment: 'בידור',
  utilities: 'חשבונות',
  other: 'אחר',
  salary: 'משכורת',
  freelance: 'פרילנס',
  gift: 'מתנה',
  investment: 'השקעה'
};

// Add Arabic resources translations (basic implementation)
export const arabicResources: Partial<Translations> = {
  resourceModule: 'الموارد',
  resourceDashboard: 'لوحة الموارد',
  totalGold: 'إجمالي الذهب',
  totalMana: 'إجمالي المانا',
  totalNet: 'القيمة الصافية',
  passiveBuffs: 'التعزيزات السلبية',
  artifacts: 'التحف',
  buffs: 'التعزيزات',
  weekly: 'أسبوعي',
  monthly: 'شهري',
  allTime: 'كل الوقت',
  timeRange: 'النطاق الزمني',
  addEntry: 'إضافة إدخال',
  viewDetails: 'عرض التفاصيل',
  
  // Basic Arabic translations for the most important keys
  overviewTab: 'نظرة عامة',
  historyTab: 'التاريخ',
  artifactsTab: 'التحف',
  buffsTab: 'التعزيزات',
  
  gold: 'ذهب',
  mana: 'مانا',
  income: 'الدخل',
  expenses: 'النفقات',
  netWorth: 'القيمة الصافية'
};
