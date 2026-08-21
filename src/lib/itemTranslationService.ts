import { SupportedLanguage } from '@/types/kmarket';

export interface ItemTranslations {
  [key: string]: {
    title: string;
    description: string;
  };
}

const SUPPORTED_LANG_CODES: SupportedLanguage[] = [
  'ko', 'vi', 'en', 'ne', 'th', 'my', 'km', 'mn', 'uz', 'tl', 'id', 'si', 'bn', 'zh', 'ru'
];

/**
 * 매물 제목 및 설명을 단 1회의 Gemini Flash 호출로 15개 언어로 일괄 번역합니다.
 */
export async function translateItemToAllLanguages(
  title: string,
  description: string,
  sourceLang: string = 'auto'
): Promise<ItemTranslations> {
  const translations: ItemTranslations = {};

  // 1. 기본 원문 세팅
  const defaultSource = (sourceLang === 'auto' || !sourceLang) ? 'ko' : sourceLang;
  translations[defaultSource] = {
    title: title.trim(),
    description: description.trim(),
  };

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    // API 키가 없을 때의 안전한 Fallback
    SUPPORTED_LANG_CODES.forEach((lang) => {
      if (!translations[lang]) {
        translations[lang] = {
          title: title.trim(),
          description: description.trim(),
        };
      }
    });
    return translations;
  }

  try {
    const prompt = `You are a professional multilingual translator for 'K-Market', a C2C second-hand marketplace in South Korea for multinational foreign workers and Koreans.

Translate the following second-hand listing (Title and Description) naturally, accurately, and politely into ALL 15 languages listed below:
Languages:
- ko: Korean
- vi: Vietnamese
- en: English
- ne: Nepali
- th: Thai
- my: Burmese
- km: Khmer
- mn: Mongolian
- uz: Uzbek
- tl: Tagalog
- id: Indonesian
- si: Sinhala
- bn: Bengali
- zh: Simplified Chinese
- ru: Russian

Original Listing:
Title: "${title.replace(/"/g, '\\"')}"
Description: "${description.replace(/"/g, '\\"')}"

Output MUST be a strict, valid JSON object containing all 15 language keys without markdown quotes or backticks, formatted exactly like:
{
  "ko": { "title": "...", "description": "..." },
  "vi": { "title": "...", "description": "..." },
  "en": { "title": "...", "description": "..." },
  "ne": { "title": "...", "description": "..." },
  "th": { "title": "...", "description": "..." },
  "my": { "title": "...", "description": "..." },
  "km": { "title": "...", "description": "..." },
  "mn": { "title": "...", "description": "..." },
  "uz": { "title": "...", "description": "..." },
  "tl": { "title": "...", "description": "..." },
  "id": { "title": "...", "description": "..." },
  "si": { "title": "...", "description": "..." },
  "bn": { "title": "...", "description": "..." },
  "zh": { "title": "...", "description": "..." },
  "ru": { "title": "...", "description": "..." }
}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.1,
            responseMimeType: 'application/json',
          },
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) {
        const cleanedJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanedJson);
        if (typeof parsed === 'object' && parsed !== null) {
          return {
            ...translations,
            ...parsed,
          };
        }
      }
    }
  } catch (error) {
    console.error('Error translating item with Gemini:', error);
  }

  // 오류 시 Fallback 채우기
  SUPPORTED_LANG_CODES.forEach((lang) => {
    if (!translations[lang]) {
      translations[lang] = {
        title: title.trim(),
        description: description.trim(),
      };
    }
  });

  return translations;
}
