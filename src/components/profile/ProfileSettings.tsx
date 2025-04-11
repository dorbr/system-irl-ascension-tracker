
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Bell, Moon, Volume2, Languages, Shield, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
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
  const { language, setLanguage, textDirection, t } = useLanguage();
  
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
    toast({
      title: !darkMode ? t('darkModeEnabled') : t('darkModeDisabled'),
      description: t('prefSaved'),
    });
  };
  
  const handleNotificationsToggle = () => {
    setNotifications(!notifications);
    toast({
      title: !notifications ? t('notificationsEnabled') : t('notificationsDisabled'),
      description: t('prefSaved'),
    });
  };
  
  const handleSoundToggle = () => {
    setSound(!sound);
    toast({
      title: !sound ? t('soundEnabled') : t('soundDisabled'),
      description: t('prefSaved'),
    });
  };
  
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    toast({
      title: t('languageUpdated'),
      description: `${t('prefSaved')}`,
    });
  };
  
  const handleDeleteAccount = () => {
    toast({
      title: t('deleteAccountTitle'),
      description: t('deleteAccountDesc'),
      variant: "destructive",
    });
  };
  
  return (
    <div className="space-y-4" dir={textDirection}>
      <div className="text-sm text-muted-foreground mb-2">
        {t('manageAccount')}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('preferences')}</CardTitle>
          <CardDescription>{t('customizeExperience')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={`flex items-center justify-between ${textDirection === "rtl" ? "flex-row-reverse" : ""}`}>
            <div className={`flex items-center space-x-4 ${textDirection === "rtl" ? "flex-row-reverse space-x-reverse" : ""}`}>
              <Bell size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{t('notifications')}</p>
                <p className="text-xs text-muted-foreground">{t('notificationsDesc')}</p>
              </div>
            </div>
            <Switch 
              checked={notifications} 
              onCheckedChange={handleNotificationsToggle} 
            />
          </div>
          
          <div className={`flex items-center justify-between ${textDirection === "rtl" ? "flex-row-reverse" : ""}`}>
            <div className={`flex items-center space-x-4 ${textDirection === "rtl" ? "flex-row-reverse space-x-reverse" : ""}`}>
              <Moon size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{t('darkMode')}</p>
                <p className="text-xs text-muted-foreground">{t('darkModeDesc')}</p>
              </div>
            </div>
            <Switch 
              checked={darkMode} 
              onCheckedChange={handleDarkModeToggle} 
            />
          </div>
          
          <div className={`flex items-center justify-between ${textDirection === "rtl" ? "flex-row-reverse" : ""}`}>
            <div className={`flex items-center space-x-4 ${textDirection === "rtl" ? "flex-row-reverse space-x-reverse" : ""}`}>
              <Volume2 size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{t('soundEffects')}</p>
                <p className="text-xs text-muted-foreground">{t('soundEffectsDesc')}</p>
              </div>
            </div>
            <Switch 
              checked={sound} 
              onCheckedChange={handleSoundToggle} 
            />
          </div>
          
          <div className={`flex items-center justify-between ${textDirection === "rtl" ? "flex-row-reverse" : ""}`}>
            <div className={`flex items-center space-x-4 ${textDirection === "rtl" ? "flex-row-reverse space-x-reverse" : ""}`}>
              <Languages size={18} className="text-muted-foreground" />
              <div>
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
      
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('account')}</CardTitle>
          <CardDescription>{t('manageAccount')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => toast({
              title: t('privacySettingsTitle'),
              description: t('privacySettingsDesc')
            })}
          >
            <Shield size={18} className={textDirection === "rtl" ? "ml-2" : "mr-2"} />
            {t('privacySettings')}
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start text-destructive hover:text-destructive"
            onClick={handleDeleteAccount}
          >
            <Trash2 size={18} className={textDirection === "rtl" ? "ml-2" : "mr-2"} />
            {t('deleteAccount')}
          </Button>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full bg-destructive/10 border-destructive/20 hover:bg-destructive/20"
            onClick={signOut}
          >
            <LogOut size={16} className={textDirection === "rtl" ? "ml-2" : "mr-2"} />
            {t('signOut')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileSettings;
