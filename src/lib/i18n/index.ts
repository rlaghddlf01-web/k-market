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
import { tl } from './locales/tl';

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
  tl,
};

/**
 * 키값 기반 역매핑 테이블 생성 (UI_TRANSLATIONS 호환용)
 */
export function buildUiTranslations(): Record<string, Record<SupportedLanguage, string>> {
  const keys = Object.keys(ko);
  const result: Record<string, Record<SupportedLanguage, string>> = {};

  for (const key of keys) {
    result[key] = {
      ko: (ko as any)[key] || key,
      vi: (vi as any)[key] || (ko as any)[key] || key,
      zh: (zh as any)[key] || (ko as any)[key] || key,
      en: (en as any)[key] || (ko as any)[key] || key,
      ja: (ja as any)[key] || (ko as any)[key] || key,
      ru: (ru as any)[key] || (ko as any)[key] || key,
      th: (th as any)[key] || (ko as any)[key] || key,
      uz: (uz as any)[key] || (ko as any)[key] || key,
      km: (km as any)[key] || (ko as any)[key] || key,
      mn: (mn as any)[key] || (ko as any)[key] || key,
      ne: (ne as any)[key] || (ko as any)[key] || key,
      id: (id as any)[key] || (ko as any)[key] || key,
      my: (my as any)[key] || (ko as any)[key] || key,
      si: (si as any)[key] || (ko as any)[key] || key,
      kk: (kk as any)[key] || (ko as any)[key] || key,
      bn: (bn as any)[key] || (ko as any)[key] || key,
      ur: (ur as any)[key] || (ko as any)[key] || key,
      tl: (tl as any)[key] || (ko as any)[key] || key,
    };
  }

  return result;
}

export const UI_TRANSLATIONS = buildUiTranslations();
