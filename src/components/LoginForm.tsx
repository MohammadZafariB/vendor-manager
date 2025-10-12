import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient.ts";
import { toast } from "react-toastify";

interface LoginFormProps {
  redirectAfterLogin?: string;
  compact?: boolean;
}

export default function LoginForm({
  redirectAfterLogin = "/home",
  compact = false,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(
        error.message.includes("Invalid login credentials")
          ? "ایمیل یا رمز عبور نادرست است"
          : "خطا در ورود: " + error.message,
        { position: "top-center" }
      );
      return;
    }

    toast.success("ورود موفقیت‌آمیز بود! 🎉", { position: "top-center" });
    navigate(redirectAfterLogin);
  };

  return (
    <div
      className={`${
        compact
          ? "p-4 sm:p-6 max-w-sm sm:max-w-md mx-auto"
          : "flex flex-col items-center justify-center min-h-screen p-4"
      } bg-gray-100 dark:bg-gray-900`}
    >
      {!compact && (
        <div className="mb-6 text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200">
            به سایت مدیریت وندورها خوش آمدید
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
            برای استفاده از سایت وارد شوید
          </p>
          <div className="mt-4 w-20 sm:w-24 h-1 bg-blue-600 rounded mx-auto"></div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-5 sm:mb-6">
          ورود به حساب کاربری
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
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
              className="block w-full p-2 sm:p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg
                focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none
                dark:bg-gray-700 dark:text-gray-200 text-sm sm:text-base"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
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
              className="block w-full p-2 sm:p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg
                focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none
                dark:bg-gray-700 dark:text-gray-200 text-sm sm:text-base"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-2.5 rounded-lg shadow-md transition text-sm sm:text-base"
          >
            ورود
          </button>
        </form>

        <p className="mt-5 sm:mt-6 text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          حساب کاربری ندارید؟{" "}
          <Link
            to="/register"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ثبت‌نام
          </Link>
        </p>
      </div>
      {!compact && (
        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/landing")}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition"
          >
            بازگشت به صفحه اصلی
          </button>
        </div>
      )}
    </div>
  );
}
