// src/pages/ForgotPassword.tsx
import React, { useState } from "react";
import { supabase } from "../supabaseClient.ts";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/reset-password",
    });

    if (error) {
      toast.error("خطا در ارسال ایمیل: " + error.message);
    } else {
      toast.success("ایمیل بازیابی رمز ارسال شد! لطفا ایمیل خود را بررسی کنید.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
          بازیابی رمز عبور
        </h2>
        <form onSubmit={handleForgot} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="ایمیل خود را وارد کنید"
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            {loading ? "در حال ارسال..." : "ارسال لینک بازیابی"}
          </button>
        </form>
      </div>
    </div>
  );
}
