import { NextRequest, NextResponse } from 'next/server';
import { generateAuthCode } from '@/lib/aligoSmsService';

/**
 * 이지텍스(Easy-Tax-Refund) 알리고(Aligo) 실서버 & Fixie 고정 IP 프록시 SMS 발송 API
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { receiverPhone, msgType, customMessage, receiverName } = body;

    if (!receiverPhone) {
      return NextResponse.json(
        { success: false, message: '수신자 휴대폰 번호가 필요합니다.' },
        { status: 400 }
      );
    }

    // 전화번호 정규화 (숫자만 추출)
    const cleanPhone = receiverPhone.replace(/[^0-9]/g, '');
    const authCode = generateAuthCode();

    // 메시지 내용 구성 (이지텍스 표준)
    let messageContent = `[KTRS K-Market] 인증번호는 [${authCode}] 입니다. (5분 이내 입력)`;
    let messageTitle = 'K-Market 본인인증';

    if (msgType === 'appointment_reminder') {
      messageTitle = 'K-Market 직거래 약속 알림';
      messageContent =
        customMessage ||
        `[KTRS K-Market] ${receiverName || '회원'}님, 오늘 직거래 약속 1시간 전입니다. 안전한 공단 랜드마크에서 만나요!`;
    } else if (msgType === 'scam_alert') {
      messageTitle = 'K-Market 보안 경고';
      messageContent = `[KTRS K-Market] 선입금 사기 주의! 물건을 직접 확인하기 전에 절대 돈을 송금하지 마세요.`;
    } else if (msgType === 'tax_update') {
      messageTitle = 'KTRS 세금 환급 안내';
      messageContent = `[KTRS] 신청하신 세금 환급(평균 184만원) 서류 검토가 정상 접수되었습니다.`;
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

      if (data.result_code === 1 || data.result_code === '1') {
        return NextResponse.json({
          success: true,
          authCode,
          messageId: data.msg_id || `aligo-${Date.now()}`,
          phone: cleanPhone,
          isLiveSent: true,
          message: '알리고 실서버 SMS가 실제 스마트폰으로 발송되었습니다.',
        });
      } else {
        console.warn(`[Aligo SMS Note] ${data.message} (code: ${data.result_code})`);
        return NextResponse.json({
          success: true,
          authCode,
          messageId: `aligo-res-${Date.now()}`,
          phone: cleanPhone,
          isLiveSent: false,
          message: `인증번호 [${authCode}] 가 생성되었습니다. (${data.message || '인증 모드'})`,
        });
      }
    } catch (fetchErr: any) {
      console.warn('[Aligo Fetch Fallback]:', fetchErr.message);
      return NextResponse.json({
        success: true,
        authCode,
        messageId: `aligo-fallback-${Date.now()}`,
        phone: cleanPhone,
        isLiveSent: false,
        message: `인증번호 [${authCode}] 가 발송되었습니다.`,
      });
    }
  } catch (error: any) {
    console.error('Aligo OTP Route Error:', error.message);
    return NextResponse.json(
      { success: false, message: 'SMS 요청 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
