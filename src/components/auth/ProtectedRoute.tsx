
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

const ProtectedRoute: React.FC = () => {
  const { user, loading, isNewUser } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-rpg-dark flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-rpg-primary" />
        <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  // Redirect new users to onboarding
  if (isNewUser) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
