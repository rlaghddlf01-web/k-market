import { NextRequest, NextResponse } from 'next/server';
import { parseAlienRegistrationCard } from '@/lib/ocrService';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('image') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, message: '이미지 파일이 필요합니다.' }, { status: 400 });
    }

    // 파일 메타데이터
    const fileName = file.name || 'id_card.jpg';

    // 데모 및 Gemini Vision OCR 파서
    const sampleOcrText = `
      REPUBLIC OF KOREA
      ALIEN REGISTRATION CARD
      NAME: NGUYEN VAN DUC
      REGISTRATION NO: 950821-5184920
      NATIONALITY: VIETNAM
      STATUS: E-9 (NON-PROFESSIONAL)
      EXPIRY DATE: 2026.11.30
      ISSUED BY: INCHEON IMMIGRATION OFFICE
    `;

    const parsedResult = parseAlienRegistrationCard(sampleOcrText);

    return NextResponse.json({
      success: true,
      fileName,
      result: parsedResult,
    });
  } catch (error: any) {
    console.error('OCR API Error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
