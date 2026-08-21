import { SupportedLanguage } from '@/types/kmarket';

export interface ChatTranslationResult {
  translatedText: string;
  sourceLang: string;
  targetLang: string;
}

/**
 * 1:1 실시간 번역 요청 헬퍼
 */
export async function requestChatTranslation(
  text: string,
  sourceLang: SupportedLanguage | string,
  targetLang: SupportedLanguage | string
): Promise<string> {
  if (!text || !text.trim()) return '';
  if (sourceLang === targetLang) return text;

  try {
    const res = await fetch('/api/kmarket/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        sourceLang,
        targetLang,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return data.translatedText || text;
    }
  } catch (error) {
    console.warn('Chat translation helper error:', error);
  }

  return text;
}
