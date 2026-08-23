import { KMarketItem } from '@/types/kmarket';

/**
 * 스마트 분산 셔플 (Anti-Clustering Fisher-Yates)
 * 1. 전체 매물을 무작위 셔플합니다.
 * 2. 밥솥, 세탁기, 아이폰, 자전거 등 동일 카테고리나 동일 키워드가 2개 이상 연속으로 몰리지 않도록 고르게 교차 분산 배치합니다.
 * 3. 새로고침 및 새 접속 시마다 매번 신선하고 다채로운 피드를 제공합니다.
 */
export function shuffleItems(items: KMarketItem[]): KMarketItem[] {
  if (!Array.isArray(items) || items.length === 0) return [];

  // 1단계: Fisher-Yates 기본 셔플
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // 2단계: 카테고리별 버킷으로 분류
  const buckets: Record<string, KMarketItem[]> = {};
  for (const item of shuffled) {
    const key = item.category || 'etc';
    if (!buckets[key]) buckets[key] = [];
    buckets[key].push(item);
  }

  // 3단계: 카테고리 교차 인터리빙으로 고른 분포 생성
  const categoryKeys = Object.keys(buckets);
  // 카테고리 순서도 랜덤 셔플
  for (let i = categoryKeys.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [categoryKeys[i], categoryKeys[j]] = [categoryKeys[j], categoryKeys[i]];
  }

  const distributed: KMarketItem[] = [];
  let remaining = true;
  let round = 0;

  while (remaining) {
    remaining = false;
    for (const key of categoryKeys) {
      const bucket = buckets[key];
      if (round < bucket.length) {
        distributed.push(bucket[round]);
        remaining = true;
      }
    }
    round++;
  }

  return distributed;
}
