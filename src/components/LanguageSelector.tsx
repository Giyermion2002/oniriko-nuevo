import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

import { locales, type Locale } from "../i18n/dict";
import { useLanguage } from "../i18n/LanguageContext";

type LanguageSelectorProps = {
  variant?: "desktop" | "mobile";
};

export const LanguageSelector = ({ variant = "desktop" }: LanguageSelectorProps) => {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = locales.find((l) => l.code === locale) ?? locales[0];

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const onPick = (code: Locale) => {
    setLocale(code);
    setOpen(false);
  };

  if (variant === "mobile") {
    return (
      <div className="flex items-center gap-2">
        {locales.map((l) => (
          <button
            key={l.code}
            type="button"
            onClick={() => onPick(l.code)}
            aria-pressed={locale === l.code}
            className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs uppercase tracking-widest transition-colors ${
              locale === l.code
                ? "border-espresso bg-espresso text-cream-50"
                : "border-espresso/15 text-espresso/70 hover:border-espresso hover:text-espresso"
            }`}
          >
            <span aria-hidden className="text-base">
              {l.flag}
            </span>
            {l.code.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-espresso/15 px-3 py-1.5 text-xs uppercase tracking-widest text-espresso/80 transition-colors hover:border-espresso hover:text-espresso"
      >
        <span aria-hidden className="text-base">
          {current.flag}
        </span>
        {current.code.toUpperCase()}
        <ChevronDown
          size={12}
          strokeWidth={1.5}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            role="listbox"
            className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-lg border border-espresso/10 bg-cream-50 py-1 shadow-xl"
          >
            {locales.map((l) => {
              const active = l.code === locale;
              return (
                <li key={l.code} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => onPick(l.code)}
                    className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm transition-colors ${
                      active
                        ? "bg-cream-100 text-espresso"
                        : "text-espresso/80 hover:bg-cream-100 hover:text-espresso"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span aria-hidden className="text-base">
                        {l.flag}
                      </span>
                      <span className="uppercase tracking-widest text-xs">
                        {l.label}
                      </span>
                    </span>
                    {active && (
                      <Check size={14} className="text-sand-dark" strokeWidth={1.75} />
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
