import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import fa from "./locales/fa/translation.json";
import ar from "./locales/ar/translation.json";
import en from "./locales/en/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fa: { translation: fa },
      ar: { translation: ar },
      en: { translation: en }
    },
    fallbackLng: "en", // اگر زبان پیدا نشد، انگلیسی نمایش داده شود
    interpolation: { escapeValue: false }
  });

export default i18n;
