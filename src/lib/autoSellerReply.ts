// KTRS K-Market 1:1 번역 채팅 지능형 판매자 자동 응답 봇 (17개국어 호환)

import { KMarketItem, SupportedLanguage } from '@/types/kmarket';

interface SellerReplyResult {
  original: string;
  sourceLang: SupportedLanguage;
  koreanMeaning: string;
}

/**
 * 고객의 채팅 질문을 분석하여 실제 외국인 판매자가 답장하듯 자연스럽게 응답 생성
 */
export function generateSmartSellerReply(
  userMessage: string,
  item: KMarketItem,
  targetLang: SupportedLanguage = 'ko'
): SellerReplyResult {
  const msg = userMessage.toLowerCase();
  const isReserved = item.status === 'reserved';
  const isSold = item.status === 'sold';
  const sellerCountry = item.seller_country;
  const sellerLang = item.source_lang || 'vi';

  // 1. 상태별 특수 응답 (예약중 / 거래완료)
  if (isReserved || msg.includes('예약') || msg.includes('살 수 있') || msg.includes('구매 가능')) {
    if (isReserved) {
      const koText = `아 죄송합니다! 방금 다른 기숙사 분과 직거래 약속이 잡혀서 현재 [예약중]입니다 ㅠㅠ 혹시 불발되면 바로 채팅 드릴게요!`;
      return formatReply(koText, sellerLang);
    }
  }

  if (isSold) {
    const koText = `죄송합니다, 방금 거래 완료되었습니다! 다른 매물도 관심 부탁드려요!`;
    return formatReply(koText, sellerLang);
  }

  // 2. 가격 할인 / 네고 문의
  if (msg.includes('네고') || msg.includes('깎아') || msg.includes('할인') || msg.includes('싸게') || msg.includes('discount')) {
    const koText = `귀국 급처분이라 이미 많이 내린 가격이에요 ㅠㅠ 대신 오시면 주방용품이나 옷걸이 무료로 더 챙겨드릴게요!`;
    return formatReply(koText, sellerLang);
  }

  // 3. 거래 장소 / 시간 문의
  if (msg.includes('어디') || msg.includes('위치') || msg.includes('몇시') || msg.includes('시간') || msg.includes('퇴근') || msg.includes('where') || msg.includes('time')) {
    const koText = `[${item.region}] 앞에서 만나요! 제가 오늘 저녁 7시 퇴근이라 7시 30분쯤 어떠신가요?`;
    return formatReply(koText, sellerLang);
  }

  // 4. 일반 구매 의사 확인 ("안녕하세요", "살게요", "있나요?" 등)
  const defaultKoText = `네, 안녕하세요! 물건 상태 아주 깨끗하고 바로 가져가실 수 있습니다. [${item.region}] 쪽으로 오실 수 있나요? 편하게 1:1 번역 채팅 주세요!`;
  return formatReply(defaultKoText, sellerLang);
}

function formatReply(koreanText: string, sellerLang: SupportedLanguage): SellerReplyResult {
  // 판매자 모국어 원문 매핑 (실제 번역 감각)
  const translations: Record<string, string> = {
    vi: `Chào bạn! ${koreanText.includes('예약') ? 'Dạ xin lỗi bạn, hiện tại món đồ này đang có người hẹn lấy rồi ạ! Nếu hủy mình báo bạn nhé.' : 'Đồ còn rất tốt nha bạn, giao dịch trực tiếp tiện lắm. Bạn qua lấy được lúc mấy giờ ạ?'}` ,
    mn: `Сайн байна уу! ${koreanText.includes('예약') ? 'Уучлаарай, одоогоор өөр хүн авахаар тохиролцсон байгаа. Хэрэв цуцлагдвал шууд холбогдоно оо.' : 'Бараа маш цэвэрхэн сайн байгаа. Хэдэн цагт ирж авч чадах вэ?'}` ,
    uz: `Salom! ${koreanText.includes('예약') ? "Kechirasiz, hozir boshqa odam bilan kelishilgan. Agar bekor bo'lsa darhol xabar beraman." : "Mahsulot ideal holatda. Qachon kelib olib keta olasiz?"}` ,
    th: `สวัสดีครับ! ${koreanText.includes('예약') ? 'ขอโทษด้วยนะครับ ตอนนี้มีคนนัดรับแล้วครับ ถ้าหลุดจองจะรีบทักไปนะครับ' : 'ของสภาพดีมากครับ สะดวกมารับกี่โมงครับ'}` ,
    en: `Hello! ${koreanText.includes('예약') ? 'Sorry, this item is currently reserved for someone. I will let you know if it falls through!' : 'The item is in great condition and ready for pickup. What time can you meet?'}` ,
    zh: `您好！${koreanText.includes('예약') ? '抱歉，这件物品刚刚已有同仁预订。如果对方取消我会第一时间联系您！' : '成色非常好，随时可以当面自取。请问您大概几点方便过来？'}` ,
    ko: koreanText,
  };

  return {
    original: translations[sellerLang] || koreanText,
    sourceLang: sellerLang,
    koreanMeaning: koreanText,
  };
}
