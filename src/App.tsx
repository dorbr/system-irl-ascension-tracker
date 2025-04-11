
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import { QuestProvider } from "@/context/QuestContext";
import { ShadowProvider } from "@/context/ShadowContext";
import { AuthProvider } from "@/context/AuthContext";
import MobileLayout from "@/components/layout/MobileLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "@/pages/Index";
import QuestsPage from "@/pages/QuestsPage";
import StatsPage from "@/pages/StatsPage";
import ShadowsPage from "@/pages/ShadowsPage";
import ProfilePage from "@/pages/ProfilePage";
import AuthPage from "@/pages/AuthPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <UserProvider>
          <QuestProvider>
            <ShadowProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/auth" element={<AuthPage />} />
                  
                  <Route element={<ProtectedRoute />}>
                    <Route element={<MobileLayout />}>
                      <Route path="/" element={<Index />} />
                      <Route path="/quests" element={<QuestsPage />} />
                      <Route path="/stats" element={<StatsPage />} />
                      <Route path="/shadows" element={<ShadowsPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                    </Route>
                  </Route>
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </ShadowProvider>
          </QuestProvider>
        </UserProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
