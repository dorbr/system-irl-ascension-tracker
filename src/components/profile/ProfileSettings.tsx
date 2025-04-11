
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Bell, Moon, Volume2, Languages, Shield, Trash2 } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
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

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ signOut }) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [sound, setSound] = useState(true);
  const [language, setLanguage] = useState("english");
  
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    toast({
      title: !darkMode ? "Dark mode enabled" : "Dark mode disabled",
      description: "Your preference has been saved.",
    });
  };
  
  const handleNotificationsToggle = () => {
    setNotifications(!notifications);
    toast({
      title: !notifications ? "Notifications enabled" : "Notifications disabled",
      description: "Your preference has been saved.",
    });
  };
  
  const handleSoundToggle = () => {
    setSound(!sound);
    toast({
      title: !sound ? "Sound enabled" : "Sound disabled",
      description: "Your preference has been saved.",
    });
  };
  
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    toast({
      title: "Language updated",
      description: `Your language preference has been set to ${value.charAt(0).toUpperCase() + value.slice(1)}.`,
    });
  };
  
  const handleDeleteAccount = () => {
    toast({
      title: "Delete account",
      description: "This feature is not yet implemented.",
      variant: "destructive",
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground mb-2">
        Manage your account settings and preferences
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Preferences</CardTitle>
          <CardDescription>Customize your app experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Bell size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Notifications</p>
                <p className="text-xs text-muted-foreground">Receive quest reminders and updates</p>
              </div>
            </div>
            <Switch 
              checked={notifications} 
              onCheckedChange={handleNotificationsToggle} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Moon size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Dark Mode</p>
                <p className="text-xs text-muted-foreground">Switch between light and dark themes</p>
              </div>
            </div>
            <Switch 
              checked={darkMode} 
              onCheckedChange={handleDarkModeToggle} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Volume2 size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Sound Effects</p>
                <p className="text-xs text-muted-foreground">Play sounds for actions and achievements</p>
              </div>
            </div>
            <Switch 
              checked={sound} 
              onCheckedChange={handleSoundToggle} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Languages size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Language</p>
                <p className="text-xs text-muted-foreground">Choose your preferred language</p>
              </div>
            </div>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Español</SelectItem>
                <SelectItem value="french">Français</SelectItem>
                <SelectItem value="german">Deutsch</SelectItem>
                <SelectItem value="japanese">日本語</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Account</CardTitle>
          <CardDescription>Manage your account settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => toast({
              title: "Privacy Settings",
              description: "This feature is not yet implemented."
            })}
          >
            <Shield size={18} className="mr-2" />
            Privacy Settings
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start text-destructive hover:text-destructive"
            onClick={handleDeleteAccount}
          >
            <Trash2 size={18} className="mr-2" />
            Delete Account
          </Button>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full bg-destructive/10 border-destructive/20 hover:bg-destructive/20"
            onClick={signOut}
          >
            <LogOut size={16} className="mr-2" />
            Sign Out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileSettings;
