
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
      
      <Card className={isRtl ? "text-right" : "text-left"}>
        <CardHeader className="text-center">
          <CardTitle className="text-base">{t('preferences')}</CardTitle>
          <CardDescription>{t('customizeExperience')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Notifications Setting */}
          <div className="settings-row">
            <div className={`flex items-center gap-3 ${isRtl ? "flex-row-reverse" : ""}`}>
              <div className="settings-icon-wrapper">
                <Bell size={18} className="text-muted-foreground" />
              </div>
              <div className="settings-text-wrapper">
                <p className="settings-title">{t('notifications')}</p>
                <p className="settings-description">{t('notificationsDesc')}</p>
              </div>
            </div>
            <Switch 
              checked={notifications} 
              onCheckedChange={handleNotificationsToggle} 
            />
          </div>
          
          {/* Dark Mode Setting */}
          <div className="settings-row">
            <div className={`flex items-center gap-3 ${isRtl ? "flex-row-reverse" : ""}`}>
              <div className="settings-icon-wrapper">
                <Moon size={18} className="text-muted-foreground" />
              </div>
              <div className="settings-text-wrapper">
                <p className="settings-title">{t('darkMode')}</p>
                <p className="settings-description">{t('darkModeDesc')}</p>
              </div>
            </div>
            <Switch 
              checked={darkMode} 
              onCheckedChange={handleDarkModeToggle} 
            />
          </div>
          
          {/* Sound Effect Setting */}
          <div className="settings-row">
            <div className={`flex items-center gap-3 ${isRtl ? "flex-row-reverse" : ""}`}>
              <div className="settings-icon-wrapper">
                <Volume2 size={18} className="text-muted-foreground" />
              </div>
              <div className="settings-text-wrapper">
                <p className="settings-title">{t('soundEffects')}</p>
                <p className="settings-description">{t('soundEffectsDesc')}</p>
              </div>
            </div>
            <Switch 
              checked={sound} 
              onCheckedChange={handleSoundToggle} 
            />
          </div>
          
          {/* Language Setting */}
          <div className="settings-row">
            <div className={`flex items-center gap-3 ${isRtl ? "flex-row-reverse" : ""}`}>
              <div className="settings-icon-wrapper">
                <Languages size={18} className="text-muted-foreground" />
              </div>
              <div className="settings-text-wrapper">
                <p className="settings-title">{t('language')}</p>
                <p className="settings-description">{t('languageDesc')}</p>
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
      
      <Card className={isRtl ? "text-right" : "text-left"}>
        <CardHeader className="text-center">
          <CardTitle className="text-base">{t('account')}</CardTitle>
          <CardDescription>{t('manageAccount')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button 
            variant="outline" 
            className={`w-full ${isRtl ? "flex-row-reverse justify-end" : "justify-start"}`}
          >
            <div className="settings-icon-wrapper">
              <Shield size={18} />
            </div>
            <span className="mx-2">{t('privacySettings')}</span>
          </Button>
          
          <Button 
            variant="outline" 
            className={`w-full text-destructive hover:text-destructive ${isRtl ? "flex-row-reverse justify-end" : "justify-start"}`}
            onClick={handleDeleteAccount}
          >
            <div className="settings-icon-wrapper">
              <Trash2 size={18} />
            </div>
            <span className="mx-2">{t('deleteAccount')}</span>
          </Button>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            className={`w-full bg-destructive/10 border-destructive/20 hover:bg-destructive/20 ${isRtl ? "flex-row-reverse justify-end" : "justify-start"}`}
            onClick={signOut}
          >
            <div className="settings-icon-wrapper">
              <LogOut size={16} />
            </div>
            <span className="mx-2">{t('signOut')}</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileSettings;
