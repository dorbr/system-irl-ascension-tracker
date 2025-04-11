
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle } from "lucide-react";

const onboardingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

type OnboardingFormValues = z.infer<typeof onboardingSchema>;

const OnboardingPage: React.FC = () => {
  const { user, isNewUser, completeOnboarding } = useAuth();
  const { userData, updateUserName } = useUser();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Define the onboarding steps
  const steps = [
    { 
      title: "Welcome to System IRL", 
      description: "Let's get you set up for your journey" 
    },
    { 
      title: "Customize Your Character", 
      description: "What shall we call you on your adventure?" 
    },
    { 
      title: "System Tutorial", 
      description: "Learn how to use quests to level up your real life" 
    },
    { 
      title: "Ready to Begin", 
      description: "Your adventure awaits!" 
    }
  ];
  
  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      name: userData.name === "Adventurer" ? "" : userData.name,
    },
  });

  // If no user is logged in or user is not new, redirect to home
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  if (!isNewUser) {
    return <Navigate to="/" replace />;
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (values: OnboardingFormValues) => {
    if (currentStep === 1) {
      // Update user name
      await updateUserName(values.name);
    }
    
    nextStep();
  };

  const finishOnboarding = async () => {
    try {
      await completeOnboarding();
    } catch (error) {
      console.error("Error completing onboarding:", error);
    }
  };

  return (
    <div className="min-h-screen bg-rpg-dark flex flex-col">
      <div className="container max-w-md mx-auto flex flex-col justify-center items-center p-4 py-8 flex-1">
        <div className="w-full">
          {/* Progress indicator */}
          <div className="flex justify-between mb-8 relative">
            {steps.map((_, index) => (
              <div 
                key={index} 
                className={`${
                  index <= currentStep 
                    ? "bg-rpg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                } w-8 h-8 rounded-full flex items-center justify-center z-10 transition-colors`}
              >
                {index < currentStep ? <CheckCircle size={16} /> : index + 1}
              </div>
            ))}
            {/* Progress bar */}
            <div className="absolute top-4 h-1 bg-muted w-full -z-0"></div>
            <div
              className="absolute top-4 h-1 bg-rpg-primary transition-all -z-0"
              style={{ 
                width: `${(currentStep / (steps.length - 1)) * 100}%` 
              }}
            ></div>
          </div>

          {/* Content */}
          <Card className="w-full glass-card p-6 animate-fade-in">
            <h1 className="text-2xl font-bold mb-2 text-glow">
              {steps[currentStep].title}
            </h1>
            <p className="text-muted-foreground mb-6">
              {steps[currentStep].description}
            </p>

            {/* Step 0: Welcome */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">🏆</div>
                  <h2 className="text-xl font-semibold mb-2">Your Life, Gamified</h2>
                  <p className="text-sm text-muted-foreground">
                    Turn your goals into quests, gain experience, and level up in real life
                  </p>
                </div>
                <Button onClick={nextStep} className="w-full">
                  Begin Your Journey <ArrowRight className="ml-2" size={16} />
                </Button>
              </div>
            )}

            {/* Step 1: Character Creation */}
            {currentStep === 1 && (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Character Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your name"
                            className="bg-secondary/50 border-secondary"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={previousStep}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button type="submit" className="flex-1">
                      Continue
                    </Button>
                  </div>
                </form>
              </Form>
            )}

            {/* Step 2: Tutorial */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="glass-card p-3 rounded-lg">
                    <h3 className="font-semibold mb-1">Daily Quests</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete daily quests to build habits and gain XP. Daily quests reset each day.
                    </p>
                  </div>
                  
                  <div className="glass-card p-3 rounded-lg">
                    <h3 className="font-semibold mb-1">Main Quests</h3>
                    <p className="text-sm text-muted-foreground">
                      These are your major goals. They give larger XP rewards but take more effort.
                    </p>
                  </div>
                  
                  <div className="glass-card p-3 rounded-lg">
                    <h3 className="font-semibold mb-1">Dungeon Challenges</h3>
                    <p className="text-sm text-muted-foreground">
                      For facing your fears and stepping out of your comfort zone. Ranked from E to S.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={previousStep}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={nextStep}
                    className="flex-1"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Final Step */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center py-4">
                  <div className="text-5xl mb-4">⚔️</div>
                  <h2 className="text-xl font-semibold mb-2">Adventure Awaits!</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    You're all set to begin your journey. Complete quests, defeat your shadows, and level up your life.
                  </p>
                </div>
                
                <Button 
                  onClick={finishOnboarding}
                  className="w-full"
                >
                  Start Your Adventure
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
