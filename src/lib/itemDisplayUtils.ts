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

/**
 * 작성일시(ISO 문자열)를 받아 상대 시간 문자열을 반환합니다.
 */
export function calcTimeAgo(dateStr: string): string {
  try {
    const diffMs = Date.now() - new Date(dateStr).getTime();
    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 60) return '방금 전';
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}분 전`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}시간 전`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `${diffDays}일 전`;
    return `${Math.floor(diffDays / 30)}개월 전`;
  } catch {
    return '최근';
  }
}
