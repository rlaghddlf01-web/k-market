import { KMarketChat, KMarketItem } from '@/types/kmarket';
import { getJoongnaRealItems } from './joongnaItemsLoader';

// 중고나라 대분류 카테고리별 실시간 크롤링 실매물 500 데이터셋
export const INITIAL_ITEMS: KMarketItem[] = getJoongnaRealItems();

export const INITIAL_CHATS: KMarketChat[] = [
  {
    id: 'chat-demo-1',
    item_id: 'item-real-1',
    item_title: INITIAL_ITEMS[0]?.title || '쿠쿠 6인용 IH 압력밥솥',
    item_price: INITIAL_ITEMS[0]?.price || 35000,
    item_image: INITIAL_ITEMS[0]?.images?.[0] || 'https://img2.joongna.com/media/original/2026/07/20/1784543687792qcM_p3jSz.jpg',
    item: INITIAL_ITEMS[0],
    buyer_id: 'user-current',
    buyer_name: '나(K-이웃)',
    buyer_country: 'KR',
    buyer_flag: '🇰🇷',
    buyer_country_flag: '🇰🇷',
    buyer_lang: 'ko',
    seller_id: INITIAL_ITEMS[0]?.seller_id || 'user-vn-1',
    seller_name: INITIAL_ITEMS[0]?.seller_name || 'Nguyen Van Tu',
    seller_country: INITIAL_ITEMS[0]?.seller_country || 'VN',
    seller_flag: INITIAL_ITEMS[0]?.seller_country_flag || '🇻🇳',
    seller_country_flag: INITIAL_ITEMS[0]?.seller_country_flag || '🇻🇳',
    seller_lang: INITIAL_ITEMS[0]?.source_lang || 'vi',
    last_message: 'Vâng, 7 giờ tối nay tại cổng ký túc xá nhé! (네, 오늘 저녁 7시 기숙사 정문에서 봬요!)',
    last_message_at: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    unread_count: 1,
    status: 'active',
    messages: [],
    created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
];
