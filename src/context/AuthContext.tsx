
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  isNewUser: boolean;
  setIsNewUser: (value: boolean) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    // First get the current session
    const initializeAuth = async () => {
      setLoading(true);
      const { data: sessionData } = await supabase.auth.getSession();
      setSession(sessionData.session);
      setUser(sessionData.session?.user ?? null);
      
      // Check if user is new (hasn't completed onboarding)
      if (sessionData.session?.user) {
        const onboardingCompleted = sessionData.session.user.user_metadata.onboarding_completed;
        setIsNewUser(onboardingCompleted === undefined || onboardingCompleted === false);
      }
      
      setLoading(false);
    };
    
    initializeAuth();
    
    // Then set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log("Auth state changed:", event, newSession?.user?.email);
        
        // Update session and user state synchronously
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        // Handle auth events
        if (event === 'SIGNED_IN') {
          // Check if this is the first time signing in (no onboarding_completed flag)
          if (newSession?.user) {
            const onboardingCompleted = newSession.user.user_metadata.onboarding_completed;
            setIsNewUser(onboardingCompleted === undefined || onboardingCompleted === false);
          }
          
          toast({
            title: "Signed in",
            description: "Welcome to System IRL!",
          });
        }
        
        if (event === 'SIGNED_OUT') {
          toast({
            title: "Signed out",
            description: "You have been signed out",
          });
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log("Attempting sign in for:", email);
      
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error);
        throw error;
      }
      
      console.log("Sign in successful:", data.user?.email);
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Error signing in",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      
      // Set new user flag to trigger onboarding
      setIsNewUser(true);
      
      toast({
        title: "Account created",
        description: "Check your email for a confirmation link",
      });
    } catch (error: any) {
      toast({
        title: "Error signing up",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const completeOnboarding = async () => {
    try {
      if (!user) {
        throw new Error("User not authenticated");
      }
      
      // Update user metadata to mark onboarding as completed
      const { error } = await supabase.auth.updateUser({
        data: { onboarding_completed: true }
      });
      
      if (error) throw error;
        
      setIsNewUser(false);
      
      toast({
        title: "Welcome aboard!",
        description: "Your adventure begins now",
      });
    } catch (error: any) {
      toast({
        title: "Error completing onboarding",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        loading,
        isNewUser,
        setIsNewUser,
        signIn,
        signUp,
        signOut,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
