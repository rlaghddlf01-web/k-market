import { NextRequest, NextResponse } from 'next/server';
import { analyzeAlienCardWithGemini } from '@/lib/geminiOcrService';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('image') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, message: '신분증 이미지 파일이 필요합니다.' }, { status: 400 });
    }

    const fileName = file.name || 'id_card.jpg';
    const mimeType = file.type || 'image/jpeg';

    // File 객체를 Buffer로 변환
    const arrayBuffer = await file.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);

    // Google Gemini Multimodal Vision API를 통한 외국인등록증 초정밀 OCR 분석
    const ocrResponse = await analyzeAlienCardWithGemini(imageBuffer, mimeType);

    if (!ocrResponse.success || !ocrResponse.result) {
      return NextResponse.json(
        {
          success: false,
          message: ocrResponse.message || '신분증 인식에 실패했습니다. 신분증이 빛에 반사되지 않도록 정면에서 다시 촬영해 주세요.',
        },
        { status: 422 }
      );
    }

    return NextResponse.json({
      success: true,
      fileName,
      result: ocrResponse.result,
    });
  } catch (error: any) {
    console.error('OCR API Route Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || '서버 OCR 처리 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}
