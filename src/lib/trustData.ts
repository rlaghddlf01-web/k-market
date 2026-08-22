import { SupportedLanguage } from '@/types/kmarket';

export interface ReviewTagItem {
  id: string;
  type: 'positive' | 'negative';
  labelKey: string;
  icon: string;
  points: number;
}

export interface UserTrustProfileData {
  user_id: string;
  user_name: string;
  country: string;
  flag: string;
  manner_temp: number;
  trade_count: number;
  response_rate: number;
  is_verified_arc: boolean;
  is_verified_dormitory: boolean;
  positive_tags_summary: { tag_id: string; count: number }[];
  recent_reviews: any[];
}

// 1. 거래 평가 키워드 태그 정의
export const POSITIVE_TAGS: ReviewTagItem[] = [
  { id: 'time_punctual', type: 'positive', labelKey: 'tag_time_punctual', icon: '⏰', points: 0.3 },
  { id: 'item_as_described', type: 'positive', labelKey: 'tag_item_as_described', icon: '📦', points: 0.4 },
  { id: 'friendly_kind', type: 'positive', labelKey: 'tag_friendly_kind', icon: '😊', points: 0.3 },
  { id: 'fast_response', type: 'positive', labelKey: 'tag_fast_response', icon: '⚡', points: 0.2 },
  { id: 'good_price_manner', type: 'positive', labelKey: 'tag_good_price_manner', icon: '🤝', points: 0.2 },
  { id: 'moving_sale_helper', type: 'positive', labelKey: 'tag_moving_sale_helper', icon: '🚚', points: 0.3 },
];

export const NEGATIVE_TAGS: ReviewTagItem[] = [
  { id: 'no_show', type: 'negative', labelKey: 'tag_no_show', icon: '🚫', points: -1.0 },
  { id: 'late_time', type: 'negative', labelKey: 'tag_late_time', icon: '⌛', points: -0.4 },
  { id: 'item_diff_description', type: 'negative', labelKey: 'tag_item_diff_description', icon: '⚠️', points: -0.6 },
  { id: 'unresponsive', type: 'negative', labelKey: 'tag_unresponsive', icon: '🔇', points: -0.3 },
  { id: 'rude_manner', type: 'negative', labelKey: 'tag_rude_manner', icon: '😡', points: -0.8 },
];

// 2. 다국어 태그 사전
export const TAG_TRANSLATIONS: Record<string, Partial<Record<SupportedLanguage, string>>> = {
  tag_time_punctual: {
    ko: '약속 시간을 철저히 지켜요',
    en: 'Very punctual on meeting time',
    ja: '待ち合わせ時間をしっかり守ります',
    ru: 'Очень пунктуальный',
    vi: 'Rất đúng giờ hẹn',
    ne: 'समयको पालना गर्ने',
    th: 'ตรงต่อเวลามาก',
    my: 'ချိန်းဆိုထားသောအချိန်တိကျသည်',
    km: 'ទៀងទាត់ពេលវេលាណាស់',
    mn: 'Цаг баримталдаг',
    uz: 'Vaqtga qat\'iy rioya qiladi',
    id: 'Sangat tepat waktu',
    si: 'නියමිත වේලාවට පැමිණේ',
    bn: 'সময়ানুবর্তী',
    zh: '非常守时',
  },
  tag_item_as_described: {
    ko: '물건 상태가 설명과 똑같아요',
    en: 'Item is exactly as described',
    ja: '商品の状態が説明通りです',
    ru: 'Товар точно как в описании',
    vi: 'Đồ dùng đúng như mô tả',
    ne: 'सामान वर्णन गरे जस्तै छ',
    th: 'สภาพสินค้าตรงตามที่ระบุ',
    my: 'ဖော်ပြချက်အတိုင်း ပစ္စည်းကောင်းမွန်သည်',
    km: 'ទំនិញដូចការពិពណ៌នា',
    mn: 'Барааны байдал тайлбартай таарч байна',
    uz: 'Mahsulot tavsifga to\'liq mos',
    id: 'Kondisi barang sesuai deskripsi',
    si: 'විස්තරයට සම්පූර්ණයෙන්ම ගැලපේ',
    bn: 'পণ্যের অবস্থা বর্ণনার মতোই',
    zh: '物品与描述完全相符',
  },
  tag_friendly_kind: {
    ko: '친절하고 매너가 최고예요',
    en: 'Very kind and friendly manner',
    ja: '親切でマナーが素晴らしいです',
    ru: 'Очень вежливый и дружелюбный',
    vi: 'Rất thân thiện và lịch sự',
    ne: 'धेरै दयालु र सहयोगी व्यवहार',
    th: 'ใจดีและสุภาพมาก',
    my: 'ဖော်ရွေပြီး အလွန်ယဉ်ကျေးသည်',
    km: 'រួសរាយរាក់ទាក់ណាស់',
    mn: 'Эелдэг найрсаг харилцаатай',
    uz: 'Juda xushmuomala va samimiy',
    id: 'Sangat ramah dan sopan',
    si: 'ඉතා කරුණාවන්තයි',
    bn: 'খুব বিনয়ী ও বন্ধুত্বপূর্ণ',
    zh: '非常热情有礼貌',
  },
  tag_fast_response: {
    ko: '채팅 응답이 매우 빨라요',
    en: 'Super fast chat response',
    ja: 'チャットの返信がとても早いです',
    ru: 'Быстро отвечает на сообщения',
    vi: 'Phản hồi tin nhắn rất nhanh',
    ne: 'छिटो जवाफ दिने',
    th: 'ตอบแชทเร็วมาก',
    my: 'စာအမြန်ပြန်သည်',
    km: 'ឆ្លើយតបសារលឿនណាស់',
    mn: 'Маш хурдан хариулдаг',
    uz: 'Xabarlarga juda tez javob beradi',
    id: 'Respon chat sangat cepat',
    si: 'ඉක්මනින් පිළිතුරු දෙයි',
    bn: 'খুব দ্রুত উত্তর দেয়',
    zh: '回复消息非常迅速',
  },
  tag_good_price_manner: {
    ko: '기분 좋게 쿨거래했어요',
    en: 'Pleasant and smooth trade',
    ja: '気持ちよくスムーズに取引できました',
    ru: 'Быстрая и приятная сделка',
    vi: 'Giao dịch nhanh gọn, thoải mái',
    ne: 'राम्रो र सहज सम्झौता भयो',
    th: 'ซื้อขายง่ายและน่าประทับใจ',
    my: 'အရောင်းအဝယ်အဆင်ပြေသည်',
    km: 'ការជួញដូររលូនល្អណាស់',
    mn: 'Сэтгэл хангалуун наймаалцлаа',
    uz: 'Yoqimli va muammosiz kelishuv',
    id: 'Transaksi lancar dan menyenangkan',
    si: 'හොඳින් ගනුදෙනු නිම කළා',
    bn: 'খুব ভালো লেনদেন হয়েছে',
    zh: '爽快干脆的好卖家/买家',
  },
  tag_moving_sale_helper: {
    ko: '귀국 정리 덤까지 챙겨줬어요',
    en: 'Gave extra gifts for moving sale',
    ja: 'おまけまで付けてくれました',
    ru: 'Отдал с дополнительными бонусами',
    vi: 'Bán rẻ lại còn tặng thêm đồ',
    ne: 'थप उपहार पनि दिनुभयो',
    th: 'มีของแถมให้ด้วย ใจดีมาก',
    my: 'အပိုလက်ဆောင်များပါ ထည့်ပေးသည်',
    km: 'មានថែមអំណោយបន្ថែមទៀត',
    mn: 'Нэмэлт бэлэг өгсөн',
    uz: 'Qo‘shimcha sovg‘alar ham qo‘shib berdi',
    id: 'Dapat bonus barang tambahan',
    si: 'අමතර තෑගි ද ලබා දුන්නා',
    bn: 'অতিরিক্ত উপহারও দিয়েছেন',
    zh: '回国急售还额外送了小礼物',
  },
  tag_no_show: {
    ko: '약속 장소에 나타나지 않았어요 (노쇼)',
    en: 'Did not show up at meeting place',
    ja: '待ち合わせ場所に来ませんでした（ドタキャン）',
    ru: 'Не пришел на встречу (No-show)',
    vi: 'Không đến điểm hẹn',
    ne: 'भेट्ने ठाउँमा आएनन्',
    th: 'ไม่มาตามที่นัดหมาย',
    my: 'ချိန်းထားသည့်နေရာသို့ မလာပါ',
    km: 'មិនបានមកកន្លែងណាត់ជួប',
    mn: 'Уулзах газарт ирээгүй',
    uz: 'Uchrashuv joyiga kelmadi',
    id: 'Tidak datang ke tempat janjian',
    si: 'හමුවන ස්ථානයට නොපැමිණියේය',
    bn: 'সাক্ষাতের স্থানে উপস্থিত হননি',
    zh: '未按约定到达交易地点（放鸽子）',
  },
  tag_late_time: {
    ko: '사전 연락 없이 늦게 도착했어요',
    en: 'Late to meeting without notice',
    ja: '連絡なしで遅刻しました',
    ru: 'Опоздал на встречу без предупреждения',
    vi: 'Đến muộn mà không báo trước',
    ne: 'जानकारी बिना ढिलो आयो',
    th: 'มาสายโดยไม่บอกล่วงหน้า',
    my: 'ကြိုမပြောဘဲ နောက်ကျသည်',
    km: 'មកយឺតដោយមិនបានប្រាប់មុន',
    mn: 'Мэдэгдэлгүйгээр хоцорсон',
    uz: 'Ogohlantirmasdan kechikib keldi',
    id: 'Terlambat tanpa memberi kabar',
    si: 'දැනුම් දීමකින් තොරව ප්‍රමාද විය',
    bn: 'না জানিয়ে দেরিতে এসেছেন',
    zh: '迟到且未提前告知',
  },
  tag_item_diff_description: {
    ko: '물건 상태가 사진과 많이 달라요',
    en: 'Item condition differs from photo',
    ja: '商品の状態が写真と大きく違います',
    ru: 'Состояние товара сильно отличается от фото',
    vi: 'Đồ thật khác xa so với ảnh',
    ne: 'सामान तस्विर भन्दा धेरै फरक छ',
    th: 'สภาพของต่างจากในรูปมาก',
    my: 'ပစ္စည်းအခြေအနေ ဓာတ်ပုံနှင့်မတူပါ',
    km: 'ទំនិញខុសពីក្នុងរូបថតច្រើន',
    mn: 'Барааны байдал зурагнаас өөр байна',
    uz: 'Mahsulot holati rasmdan ancha farq qiladi',
    id: 'Kondisi barang beda jauh dari foto',
    si: 'භාණ්ඩයේ තත්ත්වය ඡායාරූපයට වඩා වෙනස්',
    bn: 'পণ্যের অবস্থা ছবির চেয়ে ভিন্ন',
    zh: '实物状态与照片/描述严重不符',
  },
  tag_unresponsive: {
    ko: '거래 도중 연락이 두절되었어요',
    en: 'Stopped responding during trade',
    ja: '取引中に連絡が取れなくなりました',
    ru: 'Перестал отвечать во время сделки',
    vi: 'Mất liên lạc trong lúc giao dịch',
    ne: 'कुराकानीको क्रममा सम्पर्क हरायो',
    th: 'ขาดการติดต่อระหว่างซื้อขาย',
    my: 'အရောင်းအဝယ်လုပ်နေစဉ် အဆက်အသွယ်ပြတ်သွားသည်',
    km: 'បាត់ការទាក់ទងពេលកំពុងជួញដូរ',
    mn: 'Харилцаа холбоо тасарсан',
    uz: 'Kelishuv paytida aloqa uzildi',
    id: 'Tiba-tiba hilang kontak saat transaksi',
    si: 'සම්බන්ධතාව නැති විය',
    bn: 'লেনদেনের সময় যোগাযোগ বন্ধ করে দিয়েছেন',
    zh: '交易沟通中突然失联',
  },
  tag_rude_manner: {
    ko: '무리한 반말이나 불친절했어요',
    en: 'Rude tone and impolite manner',
    ja: '態度が不親切で失礼でした',
    ru: 'Грубое и невежливое общение',
    vi: 'Thái độ thô lỗ và thiếu tôn trọng',
    ne: 'अशिष्ट व्यवहार देखाउनुभयो',
    th: 'พูดจาไม่สุภาพและหยาบคาย',
    my: 'ယဉ်ကျေးမှုမရှိပါ',
    km: 'គ្មានសុជីវធម៌ក្នុងការនិយាយ',
    mn: 'Бүдүүлэг харилцаа гаргасан',
    uz: 'Qo‘пол va odobsiz munosabatda bo‘ldi',
    id: 'Sikap kasar dan tidak sopan',
    si: 'අකාරුණික ලෙස හැසිරුණි',
    bn: 'অশালীন আচরণ করেছেন',
    zh: '态度粗鲁无礼',
  },
};

// 3. 모의 프로필 데이터셋
const USER_PROFILES: Record<string, UserTrustProfileData> = {
  'user-vn-1': {
    user_id: 'user-vn-1',
    user_name: 'Nguyen Van Tu',
    country: 'VN',
    flag: '🇻🇳',
    manner_temp: 39.2,
    trade_count: 14,
    response_rate: 98,
    is_verified_arc: true,
    is_verified_dormitory: true,
    positive_tags_summary: [
      { tag_id: 'time_punctual', count: 12 },
      { tag_id: 'item_as_described', count: 10 },
      { tag_id: 'friendly_kind', count: 9 },
      { tag_id: 'fast_response', count: 8 },
    ],
    recent_reviews: [],
  },
  'user-np-2': {
    user_id: 'user-np-2',
    user_name: 'Ram Bahadur',
    country: 'NP',
    flag: '🇳🇵',
    manner_temp: 41.5,
    trade_count: 22,
    response_rate: 100,
    is_verified_arc: true,
    is_verified_dormitory: true,
    positive_tags_summary: [
      { tag_id: 'time_punctual', count: 18 },
      { tag_id: 'item_as_described', count: 15 },
      { tag_id: 'moving_sale_helper', count: 7 },
    ],
    recent_reviews: [],
  },
};

export function getMannerTempDetails(temp: number = 36.5) {
  if (temp >= 50) {
    return { level: 'best', label: '최고의 매너 이웃', color: 'text-amber-500', bg: 'bg-amber-50', icon: '🏆', barColor: 'bg-amber-500', faceEmoji: '👑', levelTitle: '최고의 매너' };
  }
  if (temp >= 40) {
    return { level: 'good', label: '따뜻한 매너 이웃', color: 'text-emerald-500', bg: 'bg-emerald-50', icon: '🔥', barColor: 'bg-emerald-500', faceEmoji: '😊', levelTitle: '따뜻한 매너' };
  }
  if (temp >= 36.5) {
    return { level: 'normal', label: '기본 매너 이웃', color: 'text-blue-500', bg: 'bg-blue-50', icon: '👍', barColor: 'bg-blue-500', faceEmoji: '🙂', levelTitle: '기본 매너' };
  }
  return { level: 'warning', label: '주의가 필요한 이웃', color: 'text-rose-500', bg: 'bg-rose-50', icon: '⚠️', barColor: 'bg-rose-500', faceEmoji: '😟', levelTitle: '주의 매너' };
}

export function getUserTrustProfile(
  userId: string,
  userName?: string,
  userCountry?: string,
  userFlag?: string
): UserTrustProfileData {
  if (USER_PROFILES[userId]) {
    return USER_PROFILES[userId];
  }

  const newProfile: UserTrustProfileData = {
    user_id: userId,
    user_name: userName || 'K-Market User',
    country: userCountry || 'VN',
    flag: userFlag || '🇻🇳',
    manner_temp: 36.5,
    trade_count: 3,
    response_rate: 90,
    is_verified_arc: true,
    is_verified_dormitory: false,
    positive_tags_summary: [
      { tag_id: 'friendly_kind', count: 2 },
      { tag_id: 'time_punctual', count: 1 },
    ],
    recent_reviews: [],
  };
  USER_PROFILES[userId] = newProfile;
  return newProfile;
}

export function submitTransactionReview(review: any): UserTrustProfileData {
  const profile = getUserTrustProfile(review.target_user_id || 'user-vn-1');
  return profile;
}
