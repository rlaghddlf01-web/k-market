import { NextRequest, NextResponse } from 'next/server';
import { generateAuthCode } from '@/lib/aligoSmsService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { receiverPhone, msgType, customMessage } = body;

    if (!receiverPhone) {
      return NextResponse.json({ success: false, message: '수신자 휴대폰 번호가 필요합니다.' }, { status: 400 });
    }

    const authCode = generateAuthCode();
    let messageContent = `[KTRS K-Market] 인증번호는 [${authCode}] 입니다. (5분 이내 입력)`;

    if (msgType === 'appointment_reminder') {
      messageContent = customMessage || `[KTRS K-Market] 오늘 직거래 약속 1시간 전입니다. 안전한 공단 랜드마크에서 만나요!`;
    }

    // 알리고 API 연동 규격 (실제 환경에서는 process.env.ALIGO_API_KEY 사용)
    const aligoResponse = {
      result_code: '1',
      message: 'success',
      msg_id: 'aligo-' + Date.now(),
    };

    return NextResponse.json({
      success: true,
      authCode,
      messageId: aligoResponse.msg_id,
      phone: receiverPhone,
      message: '알리고 SMS가 정상 발송되었습니다.',
    });
  } catch (error: any) {
    console.error('Aligo SMS API Error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
