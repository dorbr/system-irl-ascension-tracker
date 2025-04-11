
import React, { createContext, useContext, useState, useEffect } from "react";

export interface Shadow {
  id: string;
  name: string;
  event: string;
  reflection: string;
  insight: string;
  date: string;
  stats: string[];
}

const defaultShadows: Shadow[] = [
  {
    id: "1",
    name: "Fear of Rejection",
    event: "Failed to speak up during an important meeting",
    reflection: "I was afraid of being judged, so I stayed silent",
    insight: "My fear of judgment is preventing my growth",
    date: "2025-03-15",
    stats: ["PER", "SEN"],
  },
  {
    id: "2",
    name: "Procrastination",
    event: "Delayed an important project until the last minute",
    reflection: "I felt overwhelmed and kept putting it off",
    insight: "Breaking tasks into smaller steps could help me overcome this",
    date: "2025-03-20",
    stats: ["INT", "VIT"],
  },
];

interface ShadowContextType {
  shadows: Shadow[];
  addShadow: (shadow: Omit<Shadow, "id" | "date">) => void;
}

const ShadowContext = createContext<ShadowContextType | undefined>(undefined);

export const ShadowProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [shadows, setShadows] = useState<Shadow[]>(() => {
    const savedShadows = localStorage.getItem("system_irl_shadows");
    return savedShadows ? JSON.parse(savedShadows) : defaultShadows;
  });

  useEffect(() => {
    localStorage.setItem("system_irl_shadows", JSON.stringify(shadows));
  }, [shadows]);

  const addShadow = (shadow: Omit<Shadow, "id" | "date">) => {
    const newShadow: Shadow = {
      ...shadow,
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
    };
    setShadows((prev) => [...prev, newShadow]);
  };

  return (
    <ShadowContext.Provider value={{ shadows, addShadow }}>
      {children}
    </ShadowContext.Provider>
  );
};

export const useShadows = () => {
  const context = useContext(ShadowContext);
  if (context === undefined) {
    throw new Error("useShadows must be used within a ShadowProvider");
  }
  return context;
};
