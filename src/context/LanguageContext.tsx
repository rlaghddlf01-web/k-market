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

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLang, setCurrentLangState] = useState<SupportedLanguage>('ko');

  useEffect(() => {
    try {
      // 1. 이전에 선택하여 저장된 언어가 있으면 최우선 복원 (예: 'vi', 'mn', 'th')
      const saved = localStorage.getItem('kmarket_lang') as SupportedLanguage;
      if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
        setCurrentLangState(saved);
        return;
      }

      // 2. 처음 설치하여 실행한 경우, 스마트폰 기기 언어 감지 (예: vi, th, mn, uz 등)
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

  const setLanguage = (lang: SupportedLanguage) => {
    setCurrentLangState(lang);
    try {
      localStorage.setItem('kmarket_lang', lang);
    } catch (e) {
      console.warn(e);
    }
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
