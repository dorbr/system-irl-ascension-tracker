
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

const ProtectedRoute: React.FC = () => {
  const { user, loading, isNewUser } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-rpg-dark flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-rpg-primary" />
        <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  // If no user is logged in, redirect to auth page
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  // Redirect new users to onboarding, but only if they're not already on the onboarding page
  if (isNewUser && location.pathname !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
