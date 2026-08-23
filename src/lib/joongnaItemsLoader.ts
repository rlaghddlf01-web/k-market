import { KMarketItem } from '@/types/kmarket';
import verifiedGeminiItems from './supabase_items_gemini_270.json';

export function getJoongnaRealItems(): KMarketItem[] {
  if (Array.isArray(verifiedGeminiItems) && verifiedGeminiItems.length > 0) {
    return verifiedGeminiItems as unknown as KMarketItem[];
  }
  return [];
}

