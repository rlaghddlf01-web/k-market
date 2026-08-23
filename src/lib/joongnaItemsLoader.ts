import { KMarketItem } from '@/types/kmarket';
import verifiedGeminiItems from './supabase_items_gemini_270.json';

// 동일 품목(밥통, 세탁기 등)이 연속으로 몰리지 않고, 다양한 카테고리가 균등하게 교차 분산된 기본 매물 리스트 생성
function interleaveAndDistributeItems(items: KMarketItem[]): KMarketItem[] {
  if (!items || items.length === 0) return [];

  // 카테고리/키워드별 그룹화 (가전, 디지털, 가구, 생활용품, 귀국무빙세일, 무료나눔 등)
  const buckets: Record<string, KMarketItem[]> = {};
  for (const item of items) {
    const key = item.category || 'etc';
    if (!buckets[key]) buckets[key] = [];
    buckets[key].push(item);
  }

  // 각 버킷을 내부에서 셔플
  const keys = Object.keys(buckets);
  const result: KMarketItem[] = [];
  let added = true;
  let index = 0;

  while (added) {
    added = false;
    for (const key of keys) {
      const bucket = buckets[key];
      if (index < bucket.length) {
        result.push(bucket[index]);
        added = true;
      }
    }
    index++;
  }

  return result;
}

export function getJoongnaRealItems(): KMarketItem[] {
  if (Array.isArray(verifiedGeminiItems) && verifiedGeminiItems.length > 0) {
    return interleaveAndDistributeItems(verifiedGeminiItems as unknown as KMarketItem[]);
  }
  return [];
}

// 클라이언트 접속/새로고침 시 실행되는 무작위 셔플 (Fisher-Yates)
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
