import { KMarketItem } from '@/types/kmarket';

/**
 * Fisher-Yates 기반 매물 배열 랜덤 셔플
 * 새 창/새 탭/새로고침 시마다 항상 신선하고 다양한 매물 순서 제공
 */
export function shuffleItems(items: KMarketItem[]): KMarketItem[] {
  if (!Array.isArray(items) || items.length === 0) return [];
  
  const array = [...items];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
