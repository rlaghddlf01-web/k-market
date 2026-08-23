/**
 * 서버 전용 Genkit 번역 헬퍼
 * API route에서만 import해서 사용할 것 (클라이언트 컴포넌트에서 직접 import 금지)
 */
import { ai } from '@/lib/genkit';

const LANG_NAMES: Record<string, string> = {
  vi: '베트남어', zh: '중국어(간체)', th: '태국어', en: '영어',
  uz: '우즈베크어', ru: '러시아어', ja: '일본어', km: '크메르어',
  mn: '몽골어', ne: '네팔어', id: '인도네시아어', my: '미얀마어',
  si: '싱할라어', kk: '카자흐어', bn: '벵골어', ur: '우르두어', tl: '타갈로그어'
};

/**
 * 매물/게시글의 제목+설명을 17개 언어로 번역
 */
export async function translateToAllLanguages(
  title: string,
  description: string
): Promise<Record<string, { title: string; description: string }>> {
  const targetLangs = Object.keys(LANG_NAMES);

  const prompt = `다음 한국어 중고거래 매물의 제목과 설명을 17개 언어로 번역해줘.
반드시 JSON 형식으로만 응답해. 다른 텍스트 없이 JSON만.

제목: ${title}
설명: ${description}

번역할 언어: ${targetLangs.map(l => `${l}(${LANG_NAMES[l]})`).join(', ')}

응답 형식:
{
  "vi": { "title": "...", "description": "..." },
  "zh": { "title": "...", "description": "..." },
  "th": { "title": "...", "description": "..." },
  "en": { "title": "...", "description": "..." },
  "uz": { "title": "...", "description": "..." },
  "ru": { "title": "...", "description": "..." },
  "ja": { "title": "...", "description": "..." },
  "km": { "title": "...", "description": "..." },
  "mn": { "title": "...", "description": "..." },
  "ne": { "title": "...", "description": "..." },
  "id": { "title": "...", "description": "..." },
  "my": { "title": "...", "description": "..." },
  "si": { "title": "...", "description": "..." },
  "kk": { "title": "...", "description": "..." },
  "bn": { "title": "...", "description": "..." },
  "ur": { "title": "...", "description": "..." },
  "tl": { "title": "...", "description": "..." }
}`;

  const { text } = await ai.generate(prompt);
  const jsonStr = text.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();
  const translations = JSON.parse(jsonStr);
  translations['ko'] = { title, description };
  return translations;
}

/**
 * 단일 텍스트를 특정 언어로 번역
 */
export async function translateText(
  text: string,
  targetLang: string
): Promise<string> {
  const langName = LANG_NAMES[targetLang] || targetLang;
  const prompt = `다음 텍스트를 ${langName}로 자연스럽게 번역해줘. 번역문만 출력해.\n\n${text}`;
  const { text: result } = await ai.generate(prompt);
  return result.trim();
}
