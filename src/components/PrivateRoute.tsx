import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useEffect } from "react";
interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, loading } = useAuth();
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [user]);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 dark:text-gray-300">
        در حال بارگذاری...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/landing" replace />;
  }
  return <>{children}</>;
}
