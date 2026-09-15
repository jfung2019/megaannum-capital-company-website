"use client";

import { useLanguage, type Language } from "@/lib/language/LanguageContext";

const OPTIONS: { value: Language; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "zh-Hant", label: "繁" },
  { value: "zh-Hans", label: "简" },
];

/**
 * Switches the active-language state only -- site copy isn't translated
 * yet, so every option currently renders the same (English/bundled) content.
 * Wiring translated content to `language` is a follow-up.
 */
export default function LanguageToggle({ className = "" }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Select language"
      className={`inline-flex items-center gap-0.5 rounded-full border border-white/20 p-0.5 text-xs font-medium tracking-wide ${className}`.trim()}
    >
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={language === option.value}
          onClick={() => setLanguage(option.value)}
          className={`rounded-full px-2.5 py-1 transition-colors duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            language === option.value
              ? "bg-[#ed7d24] text-white"
              : "text-white/70 hover:text-white"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
