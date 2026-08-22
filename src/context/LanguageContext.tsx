'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage, LanguageOption } from '@/types/kmarket';
import { SUPPORTED_LANGUAGES } from '@/lib/languages';
import { LOCALES } from '@/lib/i18n';

interface LanguageContextType {
  currentLang: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  currentLangOption: LanguageOption;
  languages: LanguageOption[];
  t: (key: string) => string;
  formatWon: (amount: number) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLang, setCurrentLangState] = useState<SupportedLanguage>('ko');

  useEffect(() => {
    try {
      // 0. URL 경로에서 언어 감지 우선 (/ru, /ja, /vi 등)
      if (typeof window !== 'undefined') {
        const pathSegments = window.location.pathname.split('/').filter(Boolean);
        const urlLang = pathSegments[0] as SupportedLanguage;
        if (urlLang && SUPPORTED_LANGUAGES.some((l) => l.code === urlLang)) {
          setCurrentLangState(urlLang);
          localStorage.setItem('kmarket_lang', urlLang);
          return;
        }
      }

      // 1. 이전에 선택하여 저장된 언어가 있으면 복원
      const saved = localStorage.getItem('kmarket_lang') as SupportedLanguage;
      if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
        setCurrentLangState(saved);
        return;
      }

      // 2. 스마트폰 기기 언어 감지
      if (typeof window !== 'undefined' && window.navigator) {
        const browserLang = window.navigator.language.slice(0, 2).toLowerCase();
        const matched = SUPPORTED_LANGUAGES.find((l) => l.code === browserLang);
        if (matched) {
          setCurrentLangState(matched.code);
          localStorage.setItem('kmarket_lang', matched.code);
        }
      }
    } catch (e) {
      console.warn('Language initialization error:', e);
    }
  }, []);

  // 🌐 언어 변경 시 브라우저 주소창 URL 실시간 동기화 (/ru, /ja, /vi 등)
  const setLanguage = (lang: SupportedLanguage) => {
    setCurrentLangState(lang);
    try {
      localStorage.setItem('kmarket_lang', lang);
      localStorage.setItem('kmarket_selected_lang', lang);

      if (typeof window !== 'undefined') {
        const targetPath = lang === 'ko' ? '/' : `/${lang}`;
        if (!window.location.pathname.includes('/welcome')) {
          window.location.href = targetPath;
        }
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const currentLangOption =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  const t = (key: string): string => {
    const dict = LOCALES[currentLang] || LOCALES.ko;
    if (dict && (dict as any)[key]) {
      return (dict as any)[key];
    }
    const koDict = LOCALES.ko;
    if (koDict && (koDict as any)[key]) {
      return (koDict as any)[key];
    }
    return key;
  };

  const formatWon = (amount: number): string => {
    if (amount === 0) return t('currency_free');
    return `${amount.toLocaleString()}${t('currency_won')}`;
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
