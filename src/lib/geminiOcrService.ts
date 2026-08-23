import { GoogleGenerativeAI } from '@google/generative-ai';
import { OcrResultData } from './ocrService';

// 국가별 코드, 한글명, 국기 이모지 매핑
const COUNTRY_MAP: { [key: string]: { code: string; name: string; flag: string } } = {
  VIETNAM: { code: 'VN', name: '베트남', flag: '🇻🇳' },
  'VIET NAM': { code: 'VN', name: '베트남', flag: '🇻🇳' },
  MONGOLIA: { code: 'MN', name: '몽골', flag: '🇲🇳' },
  NEPAL: { code: 'NP', name: '네팔', flag: '🇳🇵' },
  THAILAND: { code: 'TH', name: '태국', flag: '🇹🇭' },
  CAMBODIA: { code: 'KH', name: '캄보디아', flag: '🇰🇭' },
  MYANMAR: { code: 'MM', name: '미얀마', flag: '🇲🇲' },
  INDONESIA: { code: 'ID', name: '인도네시아', flag: '🇮🇩' },
  PHILIPPINES: { code: 'PH', name: '필리핀', flag: '🇵🇭' },
  UZBEKISTAN: { code: 'UZ', name: '우즈베키스탄', flag: 'UZ' },
  CHINA: { code: 'CN', name: '중국', flag: '🇨🇳' },
  SRILANKA: { code: 'LK', name: '스리랑카', flag: '🇱🇰' },
  'SRI LANKA': { code: 'LK', name: '스리랑카', flag: '🇱🇰' },
  BANGLADESH: { code: 'BD', name: '방글라데시', flag: '🇧🇩' },
  PAKISTAN: { code: 'PK', name: '파키스탄', flag: '🇵🇰' },
  RUSSIA: { code: 'RU', name: '러시아', flag: '🇷🇺' },
  'RUSSIAN FEDERATION': { code: 'RU', name: '러시아', flag: '🇷🇺' },
  JAPAN: { code: 'JP', name: '일본', flag: '🇯🇵' },
  KAZAKHSTAN: { code: 'KZ', name: '카자흐스탄', flag: '🇰🇿' },
  INDIA: { code: 'IN', name: '인도', flag: '🇮🇳' },
};

export interface GeminiOcrResponse {
  success: boolean;
  message?: string;
  result?: OcrResultData & {
    issueDate?: string;
    issuingOffice?: string;
    gender?: 'M' | 'F' | 'Unknown';
    birthDate?: string;
    cardType?: string;
  };
  rawJson?: any;
}

/**
 * Gemini Vision을 이용해 외국인등록증 이미지를 정밀 분석합니다.
 */
export async function analyzeAlienCardWithGemini(
  imageBuffer: Buffer,
  mimeType: string = 'image/jpeg'
): Promise<GeminiOcrResponse> {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY or GOOGLE_API_KEY is not configured in environment variables');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  // Gemini 3.6 Flash / 2.0 Flash / 1.5 Flash Vision 모델
  const candidateModels = ['gemini-3.6-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
  let model = genAI.getGenerativeModel({ model: candidateModels[0] });

  const prompt = `You are a certified, high-precision Optical Character Recognition (OCR) AI specialized in Republic of Korea Alien Registration Cards (외국인등록증, ARC), Domestic Residence Certificates for Foreign National Koreans (외국국적동포 국내거소신고증), and Permanent Resident Cards (영주증).

Analyze the provided image carefully and extract all identity data with extreme accuracy.

Return the result strictly as a valid JSON object matching the following structure (no markdown fences, no explanatory text):
{
  "isValidCard": true,
  "cardType": "외국인등록증" or "국내거소신고증" or "영주증" or "기타",
  "userName": "FULL ENGLISH NAME (e.g. NGUYEN VAN DUC)",
  "userNameKorean": "한글성명 if present on card, otherwise empty string",
  "arcNumber": "YYMMDD-XXXXXXX (13 digits with hyphen, 7th digit is typically 5, 6, 7, or 8 for foreigners)",
  "country": "VIETNAM or NEPAL or THAILAND or PHILIPPINES etc (English nationality)",
  "visaType": "E-9 or E-7-1 or F-4 or H-2 or F-5 or D-2 etc (Visa status code)",
  "stayExpiryDate": "YYYY-MM-DD (Date of expiry on card)",
  "issueDate": "YYYY-MM-DD (Date card was issued)",
  "issuingOffice": "e.g. 인천출입국·외국인청 (Immigration office name)",
  "gender": "M" or "F",
  "birthDate": "YYYY-MM-DD",
  "confidence": 0.98,
  "rawSummary": "Brief OCR transcription of card text"
}

If the image is NOT a valid Korean foreign resident card, ID card, or passport, set "isValidCard": false, and explain in "rawSummary".
Ensure that all dates are formatted strictly as YYYY-MM-DD.
For arcNumber, ensure all 13 digits are correctly read if visible.`;

  try {
  const base64Image = imageBuffer.toString('base64');
  let lastError: any = null;
  let responseText: string = '';

  for (const modelName of candidateModels) {
    try {
      const modelInstance = genAI.getGenerativeModel({ model: modelName });
      const result = await modelInstance.generateContent([
        prompt,
        {
          inlineData: {
            data: base64Image,
            mimeType: mimeType,
          },
        },
      ]);
      responseText = result.response.text();
      if (responseText) break;
    } catch (err: any) {
      console.warn(`[Gemini OCR] Model ${modelName} failed, trying next:`, err.message);
      lastError = err;
    }
  }

  if (!responseText) {
    throw lastError || new Error('All Gemini Vision models failed to generate content');
  }
    // JSON 문자열 파싱 (코드 블록 방어)
    const cleanedJsonText = responseText
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    const parsed = JSON.parse(cleanedJsonText);

    if (!parsed.isValidCard && !parsed.arcNumber && !parsed.userName) {
      return {
        success: false,
        message: parsed.rawSummary || '외국인등록증을 정확히 인식할 수 없습니다. 빛 반사나 흔들림 없이 다시 촬영해 주세요.',
      };
    }

    // 국적 매핑
    const cleanCountryUpper = (parsed.country || '').toUpperCase().trim();
    let countryCode = 'VN';
    let countryName = '베트남';
    let flagEmoji = '🇻🇳';

    for (const [key, val] of Object.entries(COUNTRY_MAP)) {
      if (cleanCountryUpper.includes(key) || key.includes(cleanCountryUpper)) {
        countryCode = val.code;
        countryName = val.name;
        flagEmoji = val.flag;
        break;
      }
    }

    // 마스킹 번호 생성
    let arcNumber = parsed.arcNumber || '';
    // 하이픈 정규화
    arcNumber = arcNumber.replace(/[^0-9]/g, '');
    if (arcNumber.length === 13) {
      arcNumber = `${arcNumber.slice(0, 6)}-${arcNumber.slice(6)}`;
    }

    let arcNumberMasked = arcNumber;
    if (arcNumber.includes('-') && arcNumber.length >= 14) {
      const parts = arcNumber.split('-');
      arcNumberMasked = `${parts[0]}-${parts[1].charAt(0)}******`;
    }

    return {
      success: true,
      result: {
        userName: (parsed.userName || '').toUpperCase().trim(),
        arcNumber: arcNumber,
        arcNumberMasked: arcNumberMasked,
        country: countryCode,
        countryName: countryName,
        flagEmoji: flagEmoji,
        visaType: parsed.visaType || 'E-9',
        stayExpiryDate: parsed.stayExpiryDate || '',
        issueDate: parsed.issueDate || '',
        issuingOffice: parsed.issuingOffice || '',
        gender: parsed.gender === 'F' ? 'F' : 'M',
        birthDate: parsed.birthDate || '',
        cardType: parsed.cardType || '외국인등록증',
        confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 0.98,
        rawText: parsed.rawSummary || '',
      },
      rawJson: parsed,
    };
  } catch (error: any) {
    console.error('[Gemini OCR Service Error]', error);
    return {
      success: false,
      message: `Gemini OCR 분석 중 오류가 발생했습니다: ${error.message}`,
    };
  }
}
