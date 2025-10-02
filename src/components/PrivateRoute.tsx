// src/components/PrivateRoute.tsx
import type { ReactNode } from "react"; // فقط نوع را وارد می‌کنیم
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user } = useAuth();

  if (!user) {
    // اگر کاربر وارد نشده، هدایت به صفحه لاگین
    return <Navigate to="/login" replace />;
  }

  // اگر کاربر وارد شده، نمایش محتوای اصلی
  return <>{children}</>;
}
