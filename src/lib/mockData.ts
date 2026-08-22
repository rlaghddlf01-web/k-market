import { KMarketChat, KMarketItem } from '@/types/kmarket';
import { getJoongnaRealItems } from './joongnaItemsLoader';

// 중고나라 대분류 카테고리별 실시간 크롤링 실매물 500 데이터셋
export const INITIAL_ITEMS: KMarketItem[] = getJoongnaRealItems();

export const INITIAL_CHATS: KMarketChat[] = [
  {
    id: 'chat-demo-1',
    item_id: 'item-real-1',
    item: INITIAL_ITEMS[0],
    buyer_id: 'user-current',
    buyer_name: '나(K-이웃)',
    buyer_country: 'KR',
    buyer_flag: '🇰🇷',
    buyer_lang: 'ko',
    seller_id: INITIAL_ITEMS[0]?.seller_id || 'user-vn-1',
    seller_name: INITIAL_ITEMS[0]?.seller_name || 'Nguyen Van Tu',
    seller_country: INITIAL_ITEMS[0]?.seller_country || 'VN',
    seller_flag: INITIAL_ITEMS[0]?.seller_country_flag || '🇻🇳',
    seller_lang: INITIAL_ITEMS[0]?.source_lang || 'vi',
    last_message: 'Vâng, 7 giờ tối nay tại cổng ký túc xá nhé! (네, 오늘 저녁 7시 기숙사 정문에서 봬요!)',
    last_message_at: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    unread_count: 1,
    created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
];
