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

export function LanguageProvider({
  children,
  initialLang = 'ko',
}: {
  children: React.ReactNode;
  initialLang?: SupportedLanguage;
}) {
  // 초기 렌더링은 SSR과 100% 일치시키기 위해 initialLang 사용
  const [currentLang, setCurrentLangState] = useState<SupportedLanguage>(initialLang);

  useEffect(() => {
    // 클라이언트 마운트 후 localStorage 또는 URL 파라미터에서 언어 동기화
    if (typeof window !== 'undefined') {
      const pathSegments = window.location.pathname.split('/').filter(Boolean);
      const urlLang = pathSegments[0] as SupportedLanguage;
      if (urlLang && SUPPORTED_LANGUAGES.some((l) => l.code === urlLang)) {
        setCurrentLangState(urlLang);
        return;
      }
      
      const saved = localStorage.getItem('kmarket_lang') as SupportedLanguage;
      if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
        setCurrentLangState(saved);
      }
    }
  }, [initialLang]);

  // 🌐 언어 변경 시 실시간 상태 변경 및 URL 동기화
  const setLanguage = (lang: SupportedLanguage) => {
    setCurrentLangState(lang);
    try {
      localStorage.setItem('kmarket_lang', lang);
      localStorage.setItem('kmarket_selected_lang', lang);

      if (typeof window !== 'undefined') {
        const targetPath = lang === 'ko' ? '/' : `/${lang}`;
        if (!window.location.pathname.includes('/welcome')) {
          window.history.pushState({ lang }, '', targetPath);
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
    if (amount === 0) return t('0원 (무료)');
    return `${amount.toLocaleString()}${t('원 (대한민국 원화)')}`;
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
