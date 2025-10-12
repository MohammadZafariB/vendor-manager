import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient.ts";

interface AuthContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  logout: () => void;
  loading: boolean; // ✅ اضافه شد
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true); // ✅ حالت بارگذاری

  useEffect(() => {
    const getSession = async () => {
      // 1️⃣ ابتدا از localStorage بازیابی سریع‌تر
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      // 2️⃣ سپس بررسی جلسه از Supabase
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setUser(data.session.user);
        localStorage.setItem("user", JSON.stringify(data.session.user));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }

      setLoading(false);
    };

    getSession();

    // 3️⃣ گوش دادن به تغییرات لاگین / لاگ‌اوت در Supabase
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        localStorage.setItem("user", JSON.stringify(session.user));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // 📌 تابع خروج
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
