import { KMarketItem } from '@/types/kmarket';
import verifiedGeminiItems from './supabase_items_gemini_270.json';

// 고정 순서로 반환 (SSR hydration 안전) — 셔플은 클라이언트 마운트 후 useEffect에서 처리
export function getJoongnaRealItems(): KMarketItem[] {
  if (Array.isArray(verifiedGeminiItems) && verifiedGeminiItems.length > 0) {
    return verifiedGeminiItems as unknown as KMarketItem[];
  }
  return [];
}

