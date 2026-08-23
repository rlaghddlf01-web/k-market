import { SupportedLanguage } from '@/types/kmarket';
import repliesData from './safe_seller_20_replies.json';

export interface SellerReplyScenario {
  id: number;
  ko: string;
  translations: Record<string, string>;
}

export const SELLER_20_SCENARIOS: SellerReplyScenario[] = repliesData as SellerReplyScenario[];

/**
 * 20가지 초현실적 직거래 거절/예약 사유 중 매물 및 시간 기반으로 자연스럽게 선택
 */
export function getRealisticSellerReply(
  itemId: string,
  sellerLang: SupportedLanguage
): { original: string; sourceLang: SupportedLanguage; koreanMeaning: string } {
  if (!SELLER_20_SCENARIOS || SELLER_20_SCENARIOS.length === 0) {
    const fallbackKo = '아 죄송합니다! 이 매물은 이미 다른 분과 직거래 약속이 잡혀 현재 [예약중]입니다 ㅠㅠ';
    return { original: fallbackKo, sourceLang: sellerLang, koreanMeaning: fallbackKo };
  }

  // 매물 ID 기반 해시 + 현재 시각을 결합하여 매번 자연스럽게 다른 사유로 응답
  let hash = 0;
  for (let i = 0; i < itemId.length; i++) {
    hash = (hash * 31 + itemId.charCodeAt(i)) % SELLER_20_SCENARIOS.length;
  }
  const currentSec = Math.floor(Date.now() / 10000); // 10초 단위 가변
  const selectedIndex = (hash + currentSec) % SELLER_20_SCENARIOS.length;
  const scenario = SELLER_20_SCENARIOS[selectedIndex];

  const originalText = scenario.translations[sellerLang] || scenario.translations['en'] || scenario.ko;

  return {
    original: originalText,
    sourceLang: sellerLang,
    koreanMeaning: scenario.ko,
  };
}
