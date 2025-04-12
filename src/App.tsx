
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import { QuestProvider } from "@/context/QuestContext";
import { ShadowProvider } from "@/context/ShadowContext";
import { AuthProvider } from "@/context/AuthContext";
import { SocialProvider } from "@/context/SocialContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { ResourcesProvider } from "@/context/ResourcesContext";
import MobileLayout from "@/components/layout/MobileLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "@/pages/Index";
import QuestsPage from "@/pages/QuestsPage";
import StatsPage from "@/pages/StatsPage";
import ShadowsPage from "@/pages/ShadowsPage";
import ProfilePage from "@/pages/ProfilePage";
import AuthPage from "@/pages/AuthPage";
import OnboardingPage from "@/pages/OnboardingPage";
import NotFound from "@/pages/NotFound";
import SocialPage from "@/pages/SocialPage";
import PartyPage from "@/pages/social/PartyPage";
import GuildPage from "@/pages/social/GuildPage";
import FriendsPage from "@/pages/social/FriendsPage";
import LeaderboardPage from "@/pages/social/LeaderboardPage";
import EventsPage from "@/pages/social/EventsPage";
import CrewPage from "@/pages/CrewPage";
import ResourcesPage from "@/pages/ResourcesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <UserProvider>
          <QuestProvider>
            <ShadowProvider>
              <SocialProvider>
                <LanguageProvider>
                  <ResourcesProvider>
                    <Toaster />
                    <Sonner />
                    <Routes>
                      <Route path="/auth" element={<AuthPage />} />
                      <Route path="/onboarding" element={<OnboardingPage />} />
                      
                      <Route element={<ProtectedRoute />}>
                        <Route element={<MobileLayout />}>
                          <Route path="/" element={<Index />} />
                          <Route path="/quests" element={<QuestsPage />} />
                          <Route path="/crew" element={<CrewPage />} />
                          <Route path="/stats" element={<StatsPage />} />
                          <Route path="/shadows" element={<ShadowsPage />} />
                          <Route path="/profile" element={<ProfilePage />} />
                          <Route path="/social" element={<SocialPage />} />
                          <Route path="/social/party" element={<PartyPage />} />
                          <Route path="/social/guild" element={<GuildPage />} />
                          <Route path="/social/friends" element={<FriendsPage />} />
                          <Route path="/social/leaderboard" element={<LeaderboardPage />} />
                          <Route path="/social/events" element={<EventsPage />} />
                          <Route path="/resources" element={<ResourcesPage />} />
                        </Route>
                      </Route>
                      
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </ResourcesProvider>
                </LanguageProvider>
              </SocialProvider>
            </ShadowProvider>
          </QuestProvider>
        </UserProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
