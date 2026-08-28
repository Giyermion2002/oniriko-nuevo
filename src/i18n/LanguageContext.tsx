import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

import { dictionaries, type Dictionary, type Locale } from "./dict";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "oniriko.locale";

export const LanguageProvider = ({ children }: PropsWithChildren) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") return "es";
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "es" || saved === "en") return saved;
    return window.navigator.language.startsWith("en") ? "en" : "es";
  });

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);

  const value = useMemo<LanguageContextValue>(
    () => ({ locale, setLocale, t: dictionaries[locale] }),
    [locale, setLocale],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
