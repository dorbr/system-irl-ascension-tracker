
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Bell, Moon, Volume2, Languages, Shield, Trash2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ProfileSettingsProps {
  signOut: () => void;
}

interface LanguageOption {
  value: string;
  label: string;
  dir: "ltr" | "rtl";
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ signOut }) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [sound, setSound] = useState(true);
  const { language, setLanguage, t, isRtl } = useLanguage();
  
  // Language options with direction information
  const languageOptions: LanguageOption[] = [
    { value: "english", label: "English", dir: "ltr" },
    { value: "spanish", label: "Español", dir: "ltr" },
    { value: "french", label: "Français", dir: "ltr" },
    { value: "german", label: "Deutsch", dir: "ltr" },
    { value: "arabic", label: "العربية", dir: "rtl" },
    { value: "hebrew", label: "עברית", dir: "rtl" },
    { value: "japanese", label: "日本語", dir: "ltr" },
  ];
  
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };
  
  const handleNotificationsToggle = () => {
    setNotifications(!notifications);
  };
  
  const handleSoundToggle = () => {
    setSound(!sound);
  };
  
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };
  
  const handleDeleteAccount = () => {
    // Handle delete account
  };
  
  return (
    <div className="space-y-4 text-center">
      <div className="text-sm text-muted-foreground mb-2">
        {t('manageAccount')}
      </div>
      
      <Card className="text-start">
        <CardHeader className="text-center">
          <CardTitle className="text-base">{t('preferences')}</CardTitle>
          <CardDescription>{t('customizeExperience')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Notifications Setting */}
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-4 ${isRtl ? "flex-row-reverse" : ""}`}>
              <Bell size={18} className="text-muted-foreground shrink-0" />
              <div className={isRtl ? "text-right" : "text-left"}>
                <p className="text-sm font-medium">{t('notifications')}</p>
                <p className="text-xs text-muted-foreground">{t('notificationsDesc')}</p>
              </div>
            </div>
            <Switch 
              checked={notifications} 
              onCheckedChange={handleNotificationsToggle} 
            />
          </div>
          
          {/* Dark Mode Setting */}
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-4 ${isRtl ? "flex-row-reverse" : ""}`}>
              <Moon size={18} className="text-muted-foreground shrink-0" />
              <div className={isRtl ? "text-right" : "text-left"}>
                <p className="text-sm font-medium">{t('darkMode')}</p>
                <p className="text-xs text-muted-foreground">{t('darkModeDesc')}</p>
              </div>
            </div>
            <Switch 
              checked={darkMode} 
              onCheckedChange={handleDarkModeToggle} 
            />
          </div>
          
          {/* Sound Effect Setting */}
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-4 ${isRtl ? "flex-row-reverse" : ""}`}>
              <Volume2 size={18} className="text-muted-foreground shrink-0" />
              <div className={isRtl ? "text-right" : "text-left"}>
                <p className="text-sm font-medium">{t('soundEffects')}</p>
                <p className="text-xs text-muted-foreground">{t('soundEffectsDesc')}</p>
              </div>
            </div>
            <Switch 
              checked={sound} 
              onCheckedChange={handleSoundToggle} 
            />
          </div>
          
          {/* Language Setting */}
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-4 ${isRtl ? "flex-row-reverse" : ""}`}>
              <Languages size={18} className="text-muted-foreground shrink-0" />
              <div className={isRtl ? "text-right" : "text-left"}>
                <p className="text-sm font-medium">{t('language')}</p>
                <p className="text-xs text-muted-foreground">{t('languageDesc')}</p>
              </div>
            </div>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languageOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      <Card className="text-start">
        <CardHeader className="text-center">
          <CardTitle className="text-base">{t('account')}</CardTitle>
          <CardDescription>{t('manageAccount')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button 
            variant="outline" 
            className={`w-full ${isRtl ? "flex-row-reverse" : "justify-start"}`}
          >
            <Shield size={18} className={`${isRtl ? "ml-2" : "mr-2"}`} />
            {t('privacySettings')}
          </Button>
          
          <Button 
            variant="outline" 
            className={`w-full text-destructive hover:text-destructive ${isRtl ? "flex-row-reverse" : "justify-start"}`}
            onClick={handleDeleteAccount}
          >
            <Trash2 size={18} className={`${isRtl ? "ml-2" : "mr-2"}`} />
            {t('deleteAccount')}
          </Button>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            className={`w-full bg-destructive/10 border-destructive/20 hover:bg-destructive/20 ${isRtl ? "flex-row-reverse" : ""}`}
            onClick={signOut}
          >
            <LogOut size={16} className={`${isRtl ? "ml-2" : "mr-2"}`} />
            {t('signOut')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileSettings;
