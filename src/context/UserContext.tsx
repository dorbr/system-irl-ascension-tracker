
import React, { createContext, useContext } from "react";
import { useUserData } from "@/hooks/useUserData";
import { useClassTranslations } from "@/utils/classTranslations";
import { UserData } from "@/types/user";

interface UserContextType {
  userData: UserData;
  updateUserXp: (amount: number) => void;
  updateUserStat: (statName: string, amount: number) => void;
  updateResources: (gold: number, mana: number) => void;
  updateUserName: (name: string) => void;
  getLocalizedClassName: (className: string) => string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { userData, updateUserXp, updateUserStat, updateResources, updateUserName } = useUserData();
  const { getLocalizedClassName } = useClassTranslations();

  return (
    <UserContext.Provider
      value={{ 
        userData, 
        updateUserXp, 
        updateUserStat, 
        updateResources,
        updateUserName,
        getLocalizedClassName
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export type { UserData, Stat, UserClass } from "@/types/user";
