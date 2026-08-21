import { KMarketItem, SupportedLanguage } from '@/types/kmarket';

/**
 * 현재 사용자의 언어(currentLang)에 맞게 매물 제목을 반환합니다.
 * 번역 데이터가 있으면 번역본을 반환하고, 없으면 원본 제목을 반환합니다.
 */
export function getItemLocalizedTitle(item: KMarketItem, currentLang: SupportedLanguage): string {
  if (item.translations && item.translations[currentLang]?.title) {
    return item.translations[currentLang].title;
  }
  return item.title;
}

/**
 * 현재 사용자의 언어(currentLang)에 맞게 매물 설명을 반환합니다.
 */
export function getItemLocalizedDescription(item: KMarketItem, currentLang: SupportedLanguage): string {
  if (item.translations && item.translations[currentLang]?.description) {
    return item.translations[currentLang].description;
  }
  return item.description;
}

/**
 * 원문과 번역본이 다른지 여부 (번역 토글 버튼 표시용)
 */
export function hasItemTranslation(item: KMarketItem, currentLang: SupportedLanguage): boolean {
  if (!item.translations || !item.translations[currentLang]) return false;
  // 원문 언어와 현재 유저 언어가 다른 경우
  if (item.source_lang && item.source_lang === currentLang) return false;
  return Boolean(item.translations[currentLang].title || item.translations[currentLang].description);
}
