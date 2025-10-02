// src/pages/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient.ts";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        toast.error("ایمیل یا رمز عبور نادرست است", {
          position: "top-center",
        });
      } else {
        toast.error("خطا در ورود: " + error.message, {
          position: "top-center",
        });
      }
      return;
    }

    toast.success("ورود موفقیت‌آمیز بود! خوش آمدید 🎉", {
      position: "top-center",
    });

    console.log("Logged in user:", data.user);

    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          به سایت مدیریت وندور ها خوش آمدید
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          برای استفاده از سایت وارد شوید
        </p>
        <div className="mt-4 w-24 h-1 bg-blue-600 rounded mx-auto"></div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
          ورود به حساب کاربری
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ایمیل */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              ایمیل
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="ایمیل خود را وارد کنید"
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
            />
          </div>

          {/* رمز عبور */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              رمز عبور
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="رمز عبور خود را وارد کنید"
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
            />
          </div>

          {/* دکمه ورود */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow-md transition"
          >
            ورود
          </button>
        </form>

        {/* لینک ثبت‌نام */}
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          حساب کاربری ندارید؟{" "}
          <a
            href="/register"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ثبت‌نام
          </a>
        </p>
      </div>
    </div>
  );
}
