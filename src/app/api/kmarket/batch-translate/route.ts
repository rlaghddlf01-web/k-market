import { NextRequest, NextResponse } from 'next/server';
import { ai } from '@/lib/genkit';

export async function POST(req: NextRequest) {
  const { keys, targetLang, langName } = await req.json();

  if (!keys || !targetLang) {
    return NextResponse.json({ error: 'keys and targetLang required' }, { status: 400 });
  }

  const prompt = `다음 한국어 앱 UI 문구들을 ${langName}(${targetLang})로 정확하게 번역해줘.
반드시 JSON 형식으로만 응답해. 다른 텍스트 없이 JSON만.
각 키의 한국어 값을 ${langName}로 번역한 결과를 같은 키로 반환해줘.

번역할 문구들:
${JSON.stringify(keys, null, 2)}

응답 형식:
{
  "키1": "번역된 값1",
  "키2": "번역된 값2",
  ...
}`;

  try {
    const { text } = await ai.generate(prompt);
    const jsonStr = text
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim();
    const translations = JSON.parse(jsonStr);
    return NextResponse.json({ translations, lang: targetLang });
  } catch (err: any) {
    console.error('[batch-translate] Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
