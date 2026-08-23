// KTRS K-Market 1:1 번역 채팅 시드 매물 안전 응답 봇 (17개국어 호환)
// 270개 전시용 시드 매물은 실제 현장 판매가 불가하므로, 어떤 문의가 와도 항상 정중한 [예약중/마감 안내]로 일관 처리

import { KMarketItem, SupportedLanguage } from '@/types/kmarket';

interface SellerReplyResult {
  original: string;
  sourceLang: SupportedLanguage;
  koreanMeaning: string;
}

const RESERVED_REPLIES: Record<string, string> = {
  vi: 'Chào bạn! Dạ xin lỗi bạn rất nhiều, món đồ này hiện tại đã có người hẹn lấy và đang trong trạng thái [Đã đặt chỗ] rồi ạ! Nếu có thay đổi mình sẽ nhắn lại bạn nhé.',
  zh: '您好！实在非常抱歉，这件物品刚刚已有同仁预约当面交易，目前处于[已预订]状态！如果对方取消，我会第一时间通知您。',
  uz: "Salom! Ming bor uzr, bu mahsulot hozirda boshqa kishi bilan kelishilgan va [Band qilingan] holatda! Agar bekor bo'lsa, sizga darhol xabar beraman.",
  th: 'สวัสดีครับ! ขอโทษด้วยนะครับ ตอนนี้สินค้ารายการนี้มีคนนัดรับเรียบร้อยแล้วและอยู่ในสถานะ [จองแล้ว] ครับ หากหลุดจองจะรีบทักไปแจ้งนะครับ',
  en: 'Hello! I am very sorry, but this item has already been promised to someone and is currently [Reserved]! If anything changes, I will let you know right away.',
  ru: 'Здравствуйте! Прошу прощения, на этот товар уже договорились о встрече, он находится в статусе [Забронировано]! Если сделка не состоится, я сразу вам напишу.',
  ja: 'こんにちは！大変申し訳ありませんが、こちらの品物はすでに別の方とお約束済みで、現在【予約中】となっております。万が一キャンセルになった際はすぐにご連絡いたします。',
  km: 'សួស្តី! សូមអភ័យទោសផង ទំនិញនេះត្រូវបានគេកក់ទិញរួចហើយ និងស្ថិតក្នុងស្ថានភាព [បានកក់]! ប្រសិនបើមានការផ្លាស់ប្តូរ ខ្ញុំនឹងប្រាប់អ្នកភ្លាមៗ។',
  mn: 'Сайн байна уу! Маш их уучлаарай, энэ барааг одоогоор өөр хүн авахаар тохиролцсон бөгөөд [Захиалсан] төлөвт байна! Хэрэв цуцлагдвал шууд холбогдоно оо.',
  ne: 'नमस्ते! धेरै धेरै माफ गर्नुहोस्, यो सामान हाल अर्कै साथीसँग सम्झौता भइसकेको छ र [रिजर्भ] स्थितिमा छ! यदि कुनै परिवर्तन भएमा म तुरुन्तै खबर गर्नेछु।',
  id: 'Halo! Mohon maaf sekali, barang ini saat ini sudah ada janji transaksi dengan orang lain dan berstatus [Dipesan/Reserved]! Jika batal, saya akan segera kabari Anda.',
  my: 'မင်္ဂလာပါ! အထူးပင်တောင်းပန်ပါတယ်ခင်ဗျာ၊ ဒီပစ္စည်းက အခြားသူတစ်ဦးနဲ့ ချိန်းဆိုထားပြီးဖြစ်လို့ [ကြိုတင်စာရင်းသွင်းထားသည်] အခြေအနေဖြစ်နေပါပြီခင်ဗျာ! အကယ်၍ ပျက်ပြယ်သွားပါက ချက်ချင်းအကြောင်းကြားပါ့မယ်။',
  si: 'ආයුබෝවන්! ඉතාමත් කණගාටුයි, මෙම භාණ්ඩය දැනටමත් වෙනත් කෙනෙකුට වෙන්කර ඇති අතර [වෙන් කර ඇත] තත්වයේ පවතී! අවලංගු වුවහොත් මම ඔබට වහාම දන්වන්නම්.',
  kk: 'Сәлеметсіз бе! Кешіріңіз, бұл тауар қазір басқа адамға келісіліп, [Брондалған] күйінде тұр! Егер келісім болмай қалса, сізге бірден жазамын.',
  bn: 'হ্যালো! অত্যন্ত দুঃখিত, এই পণ্যটি ইতিমধ্যে অন্য একজনের জন্য বুক করা হয়েছে এবং বর্তমানে [সংরক্ষিত/বুকিং] অবস্থায় আছে! যদি বাতিল হয় তবে আমি অবিলম্বে আপনাকে জানাব।',
  ur: 'ہیلو! بہت معذرت، یہ آئٹم پہلے ہی کسی اور کے ساتھ طے پا چکا ہے اور فی الحال [ریزرو] کی حالت میں ہے! اگر کوئی تبدیلی ہوئی تو میں آپ کو فوری مطلع کروں گا۔',
  tl: 'Kumusta! Pasensya na po, ang item na ito ay napagkasunduan na ng iba at kasalukuyang nasa status na [Nakareserba]! Kapag hindi natuloy, agad ko po kayong kokontakin.',
  ko: '아 죄송합니다! 이 매물은 이미 다른 분과 직거래 약속이 잡혀 현재 [예약중] 상태입니다 ㅠㅠ 혹시 불발되면 바로 다시 연락드릴게요!',
};

/**
 * 270개 시드 매물에 대해 어떤 질문이 오더라도 항상 안전하고 정중한 [예약중 안내] 답장 생성
 */
export function generateSmartSellerReply(
  userMessage: string,
  item: KMarketItem,
  targetLang: SupportedLanguage = 'ko'
): SellerReplyResult {
  const sellerLang = item.source_lang || (item.seller_country ? (item.seller_country.toLowerCase() as SupportedLanguage) : 'vi');
  
  const koMeaning = '아 죄송합니다! 이 매물은 이미 다른 분과 직거래 약속이 잡혀 현재 [예약중] 상태입니다 ㅠㅠ 혹시 불발되면 바로 다시 연락드릴게요!';
  const originalText = RESERVED_REPLIES[sellerLang] || RESERVED_REPLIES['en'] || koMeaning;

  return {
    original: originalText,
    sourceLang: sellerLang,
    koreanMeaning: koMeaning,
  };
}
