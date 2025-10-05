// src/components/Hero.tsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-b from-gray-700 via-gray-800 to-gray-700 text-white py-12 sm:py-20 overflow-hidden">
      {/* پس‌زمینه تزئینی */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

      <div className="relative container mx-auto px-4 sm:px-6 text-center z-10">
        {/* لوگو */}
        <motion.img
          src="/logo.png"
          alt="Vendor Manager Logo"
          className="mx-auto mb-4 sm:mb-6 w-16 h-16 sm:w-20 sm:h-20 drop-shadow-lg bg-white rounded-full p-1"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        />

        {/* عنوان اصلی */}
        <motion.h1
          className="text-lg sm:text-2xl md:text-4xl font-extrabold mb-2 sm:mb-3 leading-snug sm:leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          مدیریت <span className="text-yellow-300">هوشمند وندورها</span>
        </motion.h1>

        {/* توضیح کوتاه */}
        <motion.p
          className="text-sm sm:text-base md:text-lg text-gray-200 mb-4 sm:mb-6 max-w-xs sm:max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          ثبت، ردیابی و تحلیل وندورها به ساده‌ترین شکل.
        </motion.p>

        {/* دکمه‌ها */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <button
            onClick={() => navigate("/login")}
            className="bg-gray-100 text-gray-800 font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full shadow-md hover:scale-105 hover:bg-gray-200 transition text-sm sm:text-base w-full sm:w-auto"
          >
            ورود به حساب کاربری
          </button>

          <button
            onClick={() => {
              const section = document.getElementById("features");
              section?.scrollIntoView({ behavior: "smooth" });
            }}
            className="border border-gray-300 text-gray-100 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-gray-100 hover:text-gray-800 transition text-sm sm:text-base w-full sm:w-auto"
          >
            مشاهده امکانات
          </button>
        </motion.div>
      </div>
    </section>
  );
}
