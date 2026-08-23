// K-Market 외국인 대상 17개국어 사기 방지 안심 쉴드 (Anti-Scam Shield) 엔진

export type ScamThreatType = 'external_messenger' | 'prepayment_wire' | 'giftcard_fake_link';

export interface ScamWarningInfo {
  detected: boolean;
  threatType: ScamThreatType;
  matchedKeyword: string;
  titleKo: string;
  descriptionKo: string;
  titleEn: string;
  descriptionEn: string;
  titleVi: string;
  descriptionVi: string;
  alertLevel: 'danger' | 'warning';
}

// 1. 외부 메신저 유도 키워드 (다국어)
const EXTERNAL_MESSENGER_KEYWORDS = [
  '카카오톡', '카톡', 'kakaotalk', 'kakao', '라인', 'line', '텔레그램', 'telegram', 
  '왓츠앱', 'whatsapp', '위챗', 'wechat', 'zalo', '잘로', '오픈채팅', 'openchat', 
  '인스타', 'instagram', 'dm주세요', '톡주세요', '톡으로'
];

// 2. 선입금 / 계좌이체 요구 키워드 (다국어)
const PREPAYMENT_KEYWORDS = [
  '선입금', '먼저 입금', '계좌이체', '계좌로', '송금해', '입금해', '예약금 먼저', '계약금 먼저',
  'pay first', 'transfer first', 'send money first', 'deposit first', 'prepayment',
  'chuyển khoản trước', 'gửi tiền trước', 'đặt cọc trước',
  'पहिला पैसा पठाउनुहोस्', 'पहिले डिपोजिट', // 네팔어
  'โอนเงินก่อน', 'มัดจำก่อน', // 태국어
  'урьдчилгаа', 'төлбөр шилжүүлэх', // 몽골어
  'oldindan toʻlov', 'oldin pul oʻtkazish', // 우즈벡어
  'bayad muna', 'transfer muna' // 필리핀어
];

// 3. 상품권 / 외부 결제 링크 사기 키워드
const GIFTCARD_FAKE_LINK_KEYWORDS = [
  '상품권', '기프티콘', '문화상품권', '구글기프트', 'gift card', 'giftcard', 
  '안전거래 링크', '안전결제 링크', '결제창 링크', '링크로 결제', 'fake link', 'safety link'
];

/**
 * 텍스트 내 사기 유도 패턴 및 다국어 키워드 실시간 정밀 검출
 */
export function detectScamPattern(text: string): ScamWarningInfo | null {
  if (!text || text.trim().length === 0) return null;
  const lower = text.toLowerCase().replace(/\s+/g, '');

  // 1. 선입금 / 송금 사기 검출 (위험도 최고)
  for (const kw of PREPAYMENT_KEYWORDS) {
    const cleanKw = kw.toLowerCase().replace(/\s+/g, '');
    if (lower.includes(cleanKw)) {
      return {
        detected: true,
        threatType: 'prepayment_wire',
        matchedKeyword: kw,
        titleKo: '🚨 [선입금 사기 강력 주의] 절대 돈을 먼저 보내지 마세요!',
        descriptionKo: '물건을 직접 만나서 확인하기 전에 계좌이체/선입금을 요구하는 것은 100% 사기 수법입니다. 반드시 직거래 현장에서 확인 후 대금을 전달하세요.',
        titleEn: '🚨 [High Risk Scam Alert] Never Send Money First!',
        descriptionEn: 'Asking for wire transfer or deposit before meeting in person is 100% fraud. Only pay after inspecting the item in person.',
        titleVi: '🚨 [Cảnh báo lừa đảo] Tuyệt đối KHÔNG chuyển tiền trước!',
        descriptionVi: 'Yêu cầu chuyển khoản hoặc đặt cọc trước khi gặp mặt trực tiếp là 100% lừa đảo. Chỉ thanh toán sau khi đã kiểm tra đồ trực tiếp.',
        alertLevel: 'danger',
      };
    }
  }

  // 2. 외부 메신저 유도 검출 (카톡/라인/텔레그램)
  for (const kw of EXTERNAL_MESSENGER_KEYWORDS) {
    const cleanKw = kw.toLowerCase().replace(/\s+/g, '');
    if (lower.includes(cleanKw)) {
      return {
        detected: true,
        threatType: 'external_messenger',
        matchedKeyword: kw,
        titleKo: '⚠️ [외부 메신저 유도 주의] K-Market 채팅방을 벗어나지 마세요!',
        descriptionKo: '카카오톡, 라인, 텔레그램 등 외부 메신저로 유도하여 사기 피해를 입히는 사례가 발생하고 있습니다. 안전을 위해 K-Market 안심 번역 채팅 내에서만 대화하세요.',
        titleEn: '⚠️ [Warning] Do NOT move to External Messengers!',
        descriptionEn: 'Scammers frequently lure victims to KakaoTalk, Line, or Telegram. Stay inside K-Market translation chat for guaranteed transaction safety.',
        titleVi: '⚠️ [Cảnh báo] KHÔNG chuyển sang ứng dụng nhắn tin khác!',
        descriptionVi: 'Kẻ lừa đảo thường dụ dỗ sang Zalo, Line, Telegram để chiếm đoạt tiền. Hãy chỉ nhắn tin bên trong ứng dụng K-Market để được bảo vệ an toàn.',
        alertLevel: 'warning',
      };
    }
  }

  // 3. 상품권 / 가짜 안전결제 링크 사기 검출
  for (const kw of GIFTCARD_FAKE_LINK_KEYWORDS) {
    const cleanKw = kw.toLowerCase().replace(/\s+/g, '');
    if (lower.includes(cleanKw)) {
      return {
        detected: true,
        threatType: 'giftcard_fake_link',
        matchedKeyword: kw,
        titleKo: '🚨 [가짜 결제/상품권 사기 주의] 외부 링크 클릭 금지!',
        descriptionKo: '상품권 요구 및 가짜 결제 링크 유도는 전형적인 사기 범죄입니다. K-Market 공식 채팅 외의 외부 링크는 절대 클릭하거나 로그인하지 마세요.',
        titleEn: '🚨 [Fake Link / Giftcard Scam Alert] Do NOT click external links!',
        descriptionEn: 'Giftcard requests and external payment links are common scam tactics. Never click unverified links.',
        titleVi: '🚨 [Cảnh báo liên kết giả mạo] Tuyệt đối KHÔNG bấm vào link lạ!',
        descriptionVi: 'Yêu cầu thẻ quà tặng hoặc gửi link thanh toán ngoài là thủ đoạn lừa đảo. Tuyệt đối không nhấp vào đường link lạ.',
        alertLevel: 'danger',
      };
    }
  }

  return null;
}
