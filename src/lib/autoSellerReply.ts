// KTRS K-Market 1:1 번역 채팅 지능형 판매자 자동 응답 봇
// 270개 전시용 시드 매물은 20가지 다양한 현실감 넘치는 직거래 사유로 자연스럽게 거절/예약 안내

import { KMarketItem, SupportedLanguage } from '@/types/kmarket';
import { getRealisticSellerReply } from './safeSellerRepliesMatrix';

interface SellerReplyResult {
  original: string;
  sourceLang: SupportedLanguage;
  koreanMeaning: string;
}

/**
 * 270개 시드 매물에 대해 20가지 다양한 사유 중 하나를 선택하여 자연스럽고 정중한 답장 생성
 */
export function generateSmartSellerReply(
  userMessage: string,
  item: KMarketItem,
  targetLang: SupportedLanguage = 'ko'
): SellerReplyResult {
  const sellerLang = item.source_lang || (item.seller_country ? (item.seller_country.toLowerCase() as SupportedLanguage) : 'vi');
  return getRealisticSellerReply(item.id, sellerLang);
}
