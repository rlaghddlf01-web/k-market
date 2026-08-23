import { KMarketItem } from '@/types/kmarket';
import verifiedGeminiItems from './supabase_items_gemini_270.json';
import { shuffleItems } from './itemShuffleUtils';

export function getJoongnaRealItems(): KMarketItem[] {
  if (Array.isArray(verifiedGeminiItems) && verifiedGeminiItems.length > 0) {
    return shuffleItems(verifiedGeminiItems as unknown as KMarketItem[]);
  }
  return [];
}

