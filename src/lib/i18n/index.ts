// 15개국 분리된 독립 언어 사전 통합 로더 (이지텍스 15개국 표준 일치)
import { SupportedLanguage } from '@/types/kmarket';
import { TranslationDictionary } from './types';
import { ko } from './locales/ko';
import { vi } from './locales/vi';
import { zh } from './locales/zh';
import { km } from './locales/km';
import { ne } from './locales/ne';
import { uz } from './locales/uz';
import { my } from './locales/my';
import { id } from './locales/id';
import { th } from './locales/th';
import { en } from './locales/en';
import { si } from './locales/si';
import { mn } from './locales/mn';
import { bn } from './locales/bn';
import { kk } from './locales/kk';
import { ur } from './locales/ur';

export * from './types';

// 이지텍스 공식 15개국 언어별 독립 모듈 매핑 테이블
export const LOCALES: Record<SupportedLanguage, TranslationDictionary> = {
  ko,
  vi,
  zh,
  km,
  ne,
  uz,
  my,
  id,
  th,
  en,
  si,
  mn,
  bn,
  kk,
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
      km: km[key] || ko[key] || '',
      ne: ne[key] || ko[key] || '',
      uz: uz[key] || ko[key] || '',
      my: my[key] || ko[key] || '',
      id: id[key] || ko[key] || '',
      th: th[key] || ko[key] || '',
      en: en[key] || ko[key] || '',
      si: si[key] || ko[key] || '',
      mn: mn[key] || ko[key] || '',
      bn: bn[key] || ko[key] || '',
      kk: kk[key] || ko[key] || '',
      ur: ur[key] || ko[key] || '',
    };
  }

  return result;
}
