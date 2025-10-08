import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import ThemeToggleButton from "./ThemeToggleButton.tsx";

export default function Hero() {
  const navigate = useNavigate();

  return (
<section
  className="
    relative overflow-hidden text-white py-20 sm:py-28 
    bg-gradient-to-b from-gray-600 via-gray-700 to-black
    dark:from-gray-800 dark:via-gray-900 dark:to-black
  "
>
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

      {/* دکمه تغییر تم */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20">
        <ThemeToggleButton />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 text-center z-10">
        <motion.img
          src="/logo.png"
          alt="Vendor Manager Logo"
          className="mx-auto mb-5 sm:mb-8 w-20 h-20 sm:w-24 sm:h-24 drop-shadow-2xl bg-white rounded-full p-2"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        />

        <motion.h1
          className="text-2xl sm:text-4xl md:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          مدیریت <span className="text-yellow-400 drop-shadow-md">هوشمند وندورها</span>
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          ثبت، ردیابی و تحلیل عملکرد وندورها با طراحی مدرن، سریع و یکپارچه.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {/* دکمه ورود */}
          <button
            onClick={() => navigate("/login")}
            className="group relative inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-gray-900 bg-yellow-400 rounded-full overflow-hidden transition-all hover:scale-105 shadow-lg"
          >
            <span className="absolute inset-0 bg-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            <span className="relative flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-800" />
              ورود به حساب کاربری
            </span>
          </button>

          {/* دکمه امکانات */}
          <button
            onClick={() => {
              const section = document.getElementById("features");
              section?.scrollIntoView({ behavior: "smooth" });
            }}
            className="relative inline-flex items-center justify-center px-8 py-3 text-base font-semibold border border-gray-400 rounded-full text-white transition-all hover:bg-white/10 hover:scale-105"
          >
            مشاهده امکانات
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
