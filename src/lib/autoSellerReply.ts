// KTRS K-Market 1:1 번역 채팅 지능형 판매자 자동 응답 봇
// 270개 전시용 시드 매물은 20가지 다양한 현실감 넘치는 직거래 사유로 자연스럽게 거절/예약 안내

import { KMarketItem, SupportedLanguage } from '@/types/kmarket';
import { getRealisticSellerReply } from './safeSellerRepliesMatrix';

interface SellerReplyResult {
  original: string;
  sourceLang: SupportedLanguage;
  koreanMeaning: string;
}

const countryToLang: Record<string, SupportedLanguage> = {
  VN: 'vi',
  CN: 'zh',
  TH: 'th',
  US: 'en',
  UZ: 'uz',
  RU: 'ru',
  JP: 'ja',
  KH: 'km',
  MN: 'mn',
  NE: 'ne',
  ID: 'id',
  MM: 'my',
  LK: 'si',
  KZ: 'kk',
  BD: 'bn',
  PK: 'ur',
  PH: 'tl',
  KR: 'ko',
};

export function generateSmartSellerReply(
  userMessage: string,
  item: KMarketItem,
  targetLang: SupportedLanguage = 'ko'
): SellerReplyResult {
  const country = (item.seller_country || 'VN').toUpperCase();
  const sellerLang = item.source_lang || countryToLang[country] || 'vi';
  return getRealisticSellerReply(item.id, sellerLang);
}
