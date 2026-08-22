import { NextRequest, NextResponse } from 'next/server';
import { generateAuthCode, SMS_AUTH_TEMPLATES } from '@/lib/aligoSmsService';
import { SupportedLanguage } from '@/types/kmarket';

/**
 * 이지텍스(Easy-Tax-Refund) 알리고(Aligo) 실서버 & Fixie 고정 IP 프록시 17개국어 SMS 발송 API
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { receiverPhone, msgType, customMessage, receiverName, lang } = body;

    if (!receiverPhone) {
      return NextResponse.json(
        { success: false, message: '수신자 휴대폰 번호가 필요합니다.' },
        { status: 400 }
      );
    }

    // 전화번호 정규화 (숫자만 추출)
    const cleanPhone = receiverPhone.replace(/[^0-9]/g, '');
    const authCode = generateAuthCode();
    const userLang = (lang || 'ko') as SupportedLanguage;

    // 17개국어 모국어 SMS 템플릿 적용
    const templateGen = SMS_AUTH_TEMPLATES[userLang] || SMS_AUTH_TEMPLATES.ko;
    const template = templateGen(authCode);

    let messageTitle = template.title;
    let messageContent = template.body;

    if (msgType === 'custom' && customMessage) {
      messageContent = customMessage;
    }

    // 알리고 계정 환경변수 로드
    const apiKey = process.env.ALIGO_API_KEY;
    const userId = process.env.ALIGO_USER_ID;
    const sender = process.env.ALIGO_SENDER || process.env.ALIGO_SENDER_PHONE || '01048468575';
    const testMode = process.env.ALIGO_TEST_MODE || 'N';

    if (!apiKey || !userId || !sender) {
      console.warn('⚠️ [Aligo SMS] API 키 또는 발신번호 미설정으로 시뮬레이션 모드로 동작합니다.');
      return NextResponse.json({
        success: true,
        authCode,
        messageId: `aligo-demo-${Date.now()}`,
        phone: cleanPhone,
        isLiveSent: false,
        lang: userLang,
        message: '인증번호가 생성되었습니다. (시연 모드)',
      });
    }

    // 1. 알리고 실서버 전송 시도
    try {
      const params = new URLSearchParams();
      params.append('key', apiKey);
      params.append('user_id', userId);
      params.append('sender', sender.replace(/[^0-9]/g, ''));
      params.append('receiver', cleanPhone);
      params.append('msg', messageContent);
      params.append('title', messageTitle);
      if (testMode === 'Y') {
        params.append('testmode_yn', 'Y');
      }

      const aligoEndpoint = 'https://apis.aligo.co.kr/send/';
      const res = await fetch(aligoEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: params.toString(),
      });

      const data = await res.json();

      if (data.result_code === '1' || data.result_code === 1) {
        return NextResponse.json({
          success: true,
          authCode,
          messageId: String(data.msg_id || Date.now()),
          phone: cleanPhone,
          isLiveSent: true,
          lang: userLang,
          message: '17개국어 인증번호 SMS가 실시간 발송되었습니다.',
        });
      } else {
        console.warn('⚠️ 알리고 실서버 응답 오류:', data.message || data.result_code);
        return NextResponse.json({
          success: true,
          authCode,
          messageId: `aligo-fallback-${Date.now()}`,
          phone: cleanPhone,
          isLiveSent: false,
          lang: userLang,
          message: `인증번호가 생성되었습니다. (${data.message || '개발 모드'})`,
        });
      }
    } catch (aligoErr) {
      console.error('Aligo Live Send Error:', aligoErr);
      return NextResponse.json({
        success: true,
        authCode,
        messageId: `aligo-catch-${Date.now()}`,
        phone: cleanPhone,
        isLiveSent: false,
        lang: userLang,
        message: '인증번호가 생성되었습니다. (대체 모드)',
      });
    }
  } catch (err) {
    console.error('SMS API Error:', err);
    return NextResponse.json(
      { success: false, message: 'SMS 발송 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
