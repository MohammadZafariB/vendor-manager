// src/pages/ResetPassword.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // وقتی کاربر با لینک وارد این صفحه میشه، supabase.session اتومات آپدیت میشه
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        toast.error("لینک بازیابی معتبر نیست یا منقضی شده.");
        navigate("/login");
      }
    });
  }, [navigate]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("رمز عبور و تکرار آن یکسان نیست.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast.error("خطا در تغییر رمز: " + error.message);
    } else {
      toast.success("رمز شما تغییر کرد و وارد شدید!");
      navigate("/"); // 👈 کاربر بعد از تغییر رمز میره صفحه اصلی (یا داشبورد)
    
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
          تغییر رمز عبور
        </h2>
        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="password"
            placeholder="رمز جدید"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
          <input
            type="password"
            placeholder="تکرار رمز جدید"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            {loading ? "در حال تغییر رمز..." : "تغییر رمز و ورود"}
          </button>
        </form>
      </div>
    </div>
  );
}
