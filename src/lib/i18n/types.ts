import { SupportedLanguage } from '@/types/kmarket';

/**
 * 17개국 1:1 순수 한국어 키값 기반 다국어 사전 타입
 */
export type TranslationDictionary = Record<string, string>;

export interface LanguageContextType {
  currentLang: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}
