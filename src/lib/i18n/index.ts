// 17개국 분리된 독립 언어 사전 통합 로더
import { SupportedLanguage } from '@/types/kmarket';
import { TranslationDictionary } from './types';
import { ko } from './locales/ko';
import { vi } from './locales/vi';
import { zh } from './locales/zh';
import { en } from './locales/en';
import { ja } from './locales/ja';
import { ru } from './locales/ru';
import { th } from './locales/th';
import { uz } from './locales/uz';
import { km } from './locales/km';
import { mn } from './locales/mn';
import { ne } from './locales/ne';
import { id } from './locales/id';
import { my } from './locales/my';
import { si } from './locales/si';
import { kk } from './locales/kk';
import { bn } from './locales/bn';
import { ur } from './locales/ur';

export * from './types';

// 17개국 언어별 독립 모듈 매핑 테이블
export const LOCALES: Record<SupportedLanguage, TranslationDictionary> = {
  ko,
  vi,
  zh,
  en,
  ja,
  ru,
  th,
  uz,
  km,
  mn,
  ne,
  id,
  my,
  si,
  kk,
  bn,
  ur,
};

/**
 * 키값 기반 역매핑 테이블 생성 (UI_TRANSLATIONS 호환용)
 */
export function buildUiTranslations(): Record<string, Record<SupportedLanguage, string>> {
  const keys = Object.keys(ko) as (keyof TranslationDictionary)[];
  const result: Record<string, Record<SupportedLanguage, string>> = {};

  for (const key of keys) {
    result[key] = {
      ko: ko[key] || '',
      vi: vi[key] || ko[key] || '',
      zh: zh[key] || ko[key] || '',
      en: en[key] || ko[key] || '',
      ja: ja[key] || ko[key] || '',
      ru: ru[key] || ko[key] || '',
      th: th[key] || ko[key] || '',
      uz: uz[key] || ko[key] || '',
      km: km[key] || ko[key] || '',
      mn: mn[key] || ko[key] || '',
      ne: ne[key] || ko[key] || '',
      id: id[key] || ko[key] || '',
      my: my[key] || ko[key] || '',
      si: si[key] || ko[key] || '',
      kk: kk[key] || ko[key] || '',
      bn: bn[key] || ko[key] || '',
      ur: ur[key] || ko[key] || '',
    };
  }

  return result;
}

export const UI_TRANSLATIONS = buildUiTranslations();
