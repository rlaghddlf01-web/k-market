'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage, LanguageOption } from '@/types/kmarket';
import { SUPPORTED_LANGUAGES, UI_TRANSLATIONS } from '@/lib/languages';

interface LanguageContextType {
  currentLang: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  currentLangOption: LanguageOption;
  languages: LanguageOption[];
  t: (key: string) => string;
  formatWon: (amount: number) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLang, setCurrentLangState] = useState<SupportedLanguage>('ko');

  useEffect(() => {
    const saved = localStorage.getItem('kmarket_lang') as SupportedLanguage;
    if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
      setCurrentLangState(saved);
    }
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setCurrentLangState(lang);
    localStorage.setItem('kmarket_lang', lang);
  };

  const currentLangOption =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  const t = (key: string): string => {
    if (UI_TRANSLATIONS[key] && UI_TRANSLATIONS[key][currentLang]) {
      return UI_TRANSLATIONS[key][currentLang];
    }
    if (UI_TRANSLATIONS[key] && UI_TRANSLATIONS[key]['ko']) {
      return UI_TRANSLATIONS[key]['ko'];
    }
    return key;
  };

  const formatWon = (amount: number): string => {
    if (amount === 0) return t('free_share') || '무료나눔 (0원)';
    return `${amount.toLocaleString()}원`;
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLang,
        setLanguage,
        currentLangOption,
        languages: SUPPORTED_LANGUAGES,
        t,
        formatWon,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
