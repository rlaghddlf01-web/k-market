import { ReviewTag, UserTrustProfile, TransactionReview, SupportedLanguage } from '@/types/kmarket';

// 1. 거래 평가 키워드 태그 정의
export const POSITIVE_TAGS: ReviewTag[] = [
  { id: 'time_punctual', type: 'positive', labelKey: 'tag_time_punctual', icon: '⏰', points: 0.3 },
  { id: 'item_as_described', type: 'positive', labelKey: 'tag_item_as_described', icon: '📦', points: 0.4 },
  { id: 'friendly_kind', type: 'positive', labelKey: 'tag_friendly_kind', icon: '😊', points: 0.3 },
  { id: 'fast_response', type: 'positive', labelKey: 'tag_fast_response', icon: '⚡', points: 0.2 },
  { id: 'good_price_manner', type: 'positive', labelKey: 'tag_good_price_manner', icon: '🤝', points: 0.2 },
  { id: 'moving_sale_helper', type: 'positive', labelKey: 'tag_moving_sale_helper', icon: '🚚', points: 0.3 },
];

export const NEGATIVE_TAGS: ReviewTag[] = [
  { id: 'no_show', type: 'negative', labelKey: 'tag_no_show', icon: '🚫', points: -1.0 },
  { id: 'late_time', type: 'negative', labelKey: 'tag_late_time', icon: '⌛', points: -0.4 },
  { id: 'item_diff_description', type: 'negative', labelKey: 'tag_item_diff_description', icon: '⚠️', points: -0.6 },
  { id: 'unresponsive', type: 'negative', labelKey: 'tag_unresponsive', icon: '🔇', points: -0.3 },
  { id: 'rude_manner', type: 'negative', labelKey: 'tag_rude_manner', icon: '😡', points: -0.8 },
];

// 2. 다국어 태그 사전 (15개 언어 대응)
export const TAG_TRANSLATIONS: Record<string, Record<SupportedLanguage, string>> = {
  tag_time_punctual: {
    ko: '약속 시간을 철저히 지켜요',
    en: 'Very punctual on meeting time',
    vi: 'Rất đúng giờ hẹn',
    ne: 'समयको पालना गर्ने',
    th: 'ตรงต่อเวลามาก',
    my: 'ချိန်းဆိုထားသောအချိန်တိကျသည်',
    km: 'ទៀងទាត់ពេលវេលាណាស់',
    mn: 'Цаг баримталдаг',
    uz: 'Vaqtga qat\'iy rioya qiladi',
    tl: 'Maagap sa oras ng usapan',
    id: 'Sangat tepat waktu',
    si: 'නියමිත වේලාවට පැමිණේ',
    bn: 'সময়ানুবর্তী',
    zh: '非常守时',
    ru: 'Очень пунктуальный',
  },
  tag_item_as_described: {
    ko: '물건 상태가 설명과 똑같아요',
    en: 'Item is exactly as described',
    vi: 'Đồ dùng đúng như mô tả',
    ne: 'सामान वर्णन गरे जस्तै छ',
    th: 'สภาพสินค้าตรงตามที่ระบุ',
    my: 'ဖော်ပြချက်အတိုင်း ပစ္စည်းကောင်းမွန်သည်',
    km: 'ទំនិញដូចការពិពណ៌នា',
    mn: 'Барааны байдал тайлбартай таарч байна',
    uz: 'Mahsulot tavsifga to\'liq mos',
    tl: 'Eksakto sa deskripsyon ang item',
    id: 'Kondisi barang sesuai deskripsi',
    si: 'විස්තරයට සම්පූර්ණයෙන්ම ගැලපේ',
    bn: 'পণ্যের অবস্থা বর্ণনার মতোই',
    zh: '物品与描述完全相符',
    ru: 'Товар точно как в описании',
  },
  tag_friendly_kind: {
    ko: '친절하고 매너가 최고예요',
    en: 'Very kind and friendly manner',
    vi: 'Rất thân thiện và lịch sự',
    ne: 'धेरै दयालु र शिष्ट व्यवहार',
    th: 'สุภาพและเป็นกันเองมาก',
    my: 'ဖော်ရွေပြီး ယဉ်ကျေးသည်',
    km: 'រួសរាយរាក់ទាក់ណាស់',
    mn: 'Маш эелдэг, найрсаг',
    uz: 'Juda xushmuomala va samimiy',
    tl: 'Napakabait at magalang',
    id: 'Sangat ramah dan sopan',
    si: 'ඉතා කරුණාවන්ත හා සුහදශීලී',
    bn: 'খুব সদয় এবং বন্ধুত্বপূর্ণ',
    zh: '非常友善礼貌',
    ru: 'Очень вежливый и приятный',
  },
  tag_fast_response: {
    ko: '채팅 답장이 정말 빨라요',
    en: 'Responds very quickly to chat',
    vi: 'Trả lời tin nhắn cực nhanh',
    ne: 'सन्देशको जवाफ धेरै छिटो दिने',
    th: 'ตอบแชทเร็วมาก',
    my: 'မက်ဆေ့ခ်ျ မြန်မြန်ပြန်သည်',
    km: 'ឆ្លើយតបរហ័សណាស់',
    mn: 'Чатлахад маш хурдан хариулдаг',
    uz: 'Xabarlarga juda tez javob beradi',
    tl: 'Mabilis mag-reply sa chat',
    id: 'Balas pesan sangat cepat',
    si: 'ඉතා ඉක්මනින් පිළිතුරු සපයයි',
    bn: 'খুব দ্রুত চ্যাটের উত্তর দেয়',
    zh: '回复信息非常迅速',
    ru: 'Очень быстро отвечает в чате',
  },
  tag_good_price_manner: {
    ko: '합리적인 가격에 쿨거래했어요',
    en: 'Great price & smooth deal',
    vi: 'Giá cả hợp lý & giao dịch nhanh gọn',
    ne: 'उचित मूल्य र सजिलो कारोबार',
    th: 'ราคาสมเหตุสมผล ซื้อง่ายขายคล่อง',
    my: 'စျေးနှုန်းသင့်တင့်ပြီး အရောင်းအဝယ်ချောမွေ့သည်',
    km: 'តម្លៃសមរម្យ និងទិញលក់លឿន',
    mn: 'Боломжийн үнэ, найдвартай',
    uz: 'Qulay narx va oson savdo',
    tl: 'Magandang presyo at maayos kausap',
    id: 'Harga pas & transaksi lancar',
    si: 'සාධාරණ මිල සහ පහසු ගනුදෙනුව',
    bn: 'ন্যায্য মূল্য এবং সহজ লেনদেন',
    zh: '价格公道交易爽快',
    ru: 'Отличная цена и быстрая сделка',
  },
  tag_moving_sale_helper: {
    ko: '귀국 준비에 큰 도움이 됐어요',
    en: 'Helped a lot for moving sale',
    vi: 'Giúp đỡ rất nhiều khi dọn đồ về nước',
    ne: 'घर फर्कने तयारीमा ठूलो सहयोग पुग्यो',
    th: 'ช่วยเตรียมตัวกลับประเทศได้มาก',
    my: 'ပြည်တော်ပြန်ခါနီး များစွာအထောက်အကူပြုသည်',
    km: 'ជួយបានច្រើនពេលរៀបចំត្រឡប់ទៅវិញ',
    mn: 'Нутаг буцахад маш их тус боллоо',
    uz: 'Yurtga qaytishga katta yordam berdi',
    tl: 'Malaking tulong sa paghahanda sa pag-uwi',
    id: 'Sangat membantu persiapan pulang kampung',
    si: 'රට බලා යාමට විශාල උදව්වක් විය',
    bn: 'দেশে ফেরার প্রস্তুতিতে অনেক সাহায্য করেছে',
    zh: '对回国准备帮助非常大',
    ru: 'Очень помог при подготовке к отъезду',
  },
  tag_no_show: {
    ko: '약속 장소에 안 나왔어요 (노쇼)',
    en: 'Did not show up (No-show)',
    vi: 'Không đến điểm hẹn',
    ne: 'सम्पर्कविहीन भई नआएको',
    th: 'ไม่มาตามนัด (No-show)',
    my: 'ချိန်းဆိုထားသောနေရာသို့ မလာပါ',
    km: 'មិនបានមកតាមការណាត់',
    mn: 'Цагтаа ирээгүй (Ирээгүй)',
    uz: 'Uchrashuvga kelmadi',
    tl: 'Hindi sumipot sa tagpuan',
    id: 'Tidak datang ke lokasi (No-show)',
    si: 'හමුවීමට නොපැමිණියේය',
    bn: 'নির্দিষ্ট স্থানে আসেনি',
    zh: '放鸽子爽约',
    ru: 'Не пришел на встречу',
  },
  tag_late_time: {
    ko: '연락 없이 늦었어요',
    en: 'Late without prior notice',
    vi: 'Đến muộn không báo trước',
    ne: 'जानकारी बिना ढिलो भएको',
    th: 'มาสายโดยไม่บอกล่วงหน้า',
    my: 'အကြောင်းမကြားဘဲ နောက်ကျသည်',
    km: 'មកយឺតដោយមិនបានប្រាប់',
    mn: 'Мэдэгдэлгүй хоцорсон',
    uz: 'Ogohlantirmasdan kechikdi',
    tl: 'Na-late nang walang pasabi',
    id: 'Terlambat tanpa kabar',
    si: 'දැනුම්දීමකින් තොරව ප්‍රමාද විය',
    bn: 'কোনো কারণ ছাড়াই দেরি করেছে',
    zh: '迟到且未提前通知',
    ru: 'Опоздал без предупреждения',
  },
  tag_item_diff_description: {
    ko: '물건 상태가 설명과 달라요',
    en: 'Item condition was different from description',
    vi: 'Tình trạng đồ không giống như mô tả',
    ne: 'सामानको अवस्था वर्णनभन्दा फरक थियो',
    th: 'สภาพสินค้าไม่ตรงกับที่ระบุ',
    my: 'ပစ္စည်းအခြေအနေ ဖော်ပြချက်နှင့် ကွဲလွဲသည်',
    km: 'ទំនិញមិនដូចការពិពណ៌នាទេ',
    mn: 'Барааны байдал тайлбараас өөр байна',
    uz: 'Mahsulot holati tavsifdan farq qiladi',
    tl: 'Iba ang lagay ng gamit sa deskripsyon',
    id: 'Kondisi barang beda dengan deskripsi',
    si: 'විස්තරයට වඩා වෙනස් තත්වයක පැවතුණි',
    bn: 'পণ্যের অবস্থা বর্ণনার মতো নয়',
    zh: '物品实际情况与描述不符',
    ru: 'Состояние товара отличается от описания',
  },
  tag_unresponsive: {
    ko: '메시지 답장이 너무 느려요',
    en: 'Takes too long to reply to messages',
    vi: 'Trả lời tin nhắn rất chậm',
    ne: 'सन्देशको उत्तर धेरै ढिलो दिने',
    th: 'ตอบแชทช้ามาก',
    my: 'မက်ဆေ့ခ်ျ အလွန်နောက်ကျမှ ပြန်သည်',
    km: 'ឆ្លើយតបសារយឺតខ្លាំងណាស់',
    mn: 'Мессежинд маш удаан хариулдаг',
    uz: 'Xabarlarga juda kech javob beradi',
    tl: 'Napakabagal mag-reply',
    id: 'Sangat lambat merespons pesan',
    si: 'පණිවිඩවලට පිළිතුරු දීමට බොහෝ වේලාවක් ගතවේ',
    bn: 'মেসেজের উত্তর দিতে অনেক দেরি করে',
    zh: '信息回复极慢',
    ru: 'Очень долго отвечает на сообщения',
  },
  tag_rude_manner: {
    ko: '불친절하고 무례해요',
    en: 'Rude and unkind demeanor',
    vi: 'Bất lịch sự và thô lỗ',
    ne: 'अशिष्ट र नराम्रो व्यवहार',
    th: 'ไม่สุภาพและหยาบคาย',
    my: 'မယဉ်ကျေးပါ',
    km: 'មិនគួរសម និងគ្មានសីលធម៌',
    mn: 'Эелдэг бус, бүдүүлэг',
    uz: 'Qo\'pol va xushmuomalasiz',
    tl: 'Bastos at hindi maganda ang pakikitungo',
    id: 'Kasar dan tidak sopan',
    si: 'අකාරුණික සහ නොහික්මුණු',
    bn: 'অভদ্র এবং রূঢ় ব্যবহার',
    zh: '不礼貌态度恶劣',
    ru: 'Грубый и невежливый',
  },
};

// 3. 매너 온도 시각화 헬퍼 함수
export function getMannerTempDetails(temp: number) {
  let color = 'text-blue-500';
  let bgColor = 'bg-blue-50';
  let barColor = 'bg-blue-500';
  let faceEmoji = '😊';
  let levelTitle = '따뜻한 매너';

  if (temp < 36.5) {
    color = 'text-gray-500';
    bgColor = 'bg-gray-100';
    barColor = 'bg-gray-400';
    faceEmoji = '😐';
    levelTitle = '보통 매너';
  } else if (temp >= 36.5 && temp < 40.0) {
    color = 'text-emerald-600';
    bgColor = 'bg-emerald-50';
    barColor = 'bg-emerald-500';
    faceEmoji = '😃';
    levelTitle = '우수 매너';
  } else if (temp >= 40.0 && temp < 50.0) {
    color = 'text-amber-500';
    bgColor = 'bg-amber-50';
    barColor = 'bg-amber-500';
    faceEmoji = '🔥';
    levelTitle = '최고의 매너왕';
  } else if (temp >= 50.0) {
    color = 'text-rose-500';
    bgColor = 'bg-rose-50';
    barColor = 'bg-rose-500';
    faceEmoji = '👑';
    levelTitle = '전설의 안심 거래자';
  }

  return { color, bgColor, barColor, faceEmoji, levelTitle };
}

// 4. 유저별 신뢰 프로필 인메모리 스토리지 (기본 데이터)
const USER_PROFILES: Record<string, UserTrustProfile> = {
  'user-vn-1': {
    user_id: 'user-vn-1',
    user_name: '호치민호랑이',
    country: 'VN',
    flag: '🇻🇳',
    manner_temp: 41.2,
    response_rate: 99,
    trade_count: 14,
    is_verified_worker: true,
    is_verified_dormitory: true,
    positive_tags_summary: [
      { tag_id: 'time_punctual', count: 12 },
      { tag_id: 'item_as_described', count: 11 },
      { tag_id: 'friendly_kind', count: 10 },
      { tag_id: 'fast_response', count: 8 },
      { tag_id: 'moving_sale_helper', count: 6 },
    ],
    recent_reviews: [
      {
        id: 'rev-1',
        item_id: 'item-1',
        item_title: '[귀국 D-5] 풀세트 세탁기+밥솥+전자레인지',
        reviewer_id: 'user-kr-1',
        reviewer_name: '평택이웃',
        reviewer_country: 'KR',
        reviewer_flag: '🇰🇷',
        target_user_id: 'user-vn-1',
        rating_type: 'great',
        selected_tag_ids: ['time_punctual', 'item_as_described', 'friendly_kind'],
        comment: '기숙사 앞까지 물건 직접 가져와 주시고 작동법도 친절하게 알려주셨어요! 감사합니다.',
        created_at: '2026-08-19T10:00:00Z',
      },
      {
        id: 'rev-2',
        item_id: 'item-demo-2',
        item_title: '삼성 32인치 스마트 모니터/TV',
        reviewer_id: 'user-np-1',
        reviewer_name: '네팔미소',
        reviewer_country: 'NP',
        reviewer_flag: '🇳🇵',
        target_user_id: 'user-vn-1',
        rating_type: 'great',
        selected_tag_ids: ['item_as_described', 'fast_response'],
        comment: '화면 깨끗하고 리모컨까지 잘 작동합니다. 믿고 거래할 수 있는 분이에요.',
        created_at: '2026-08-12T14:30:00Z',
      },
    ],
  },
  'user-np-1': {
    user_id: 'user-np-1',
    user_name: '포카라친구',
    country: 'NP',
    flag: '🇳🇵',
    manner_temp: 39.0,
    response_rate: 95,
    trade_count: 8,
    is_verified_worker: true,
    is_verified_dormitory: true,
    positive_tags_summary: [
      { tag_id: 'time_punctual', count: 7 },
      { tag_id: 'friendly_kind', count: 6 },
      { tag_id: 'good_price_manner', count: 5 },
    ],
    recent_reviews: [],
  },
  'user-current': {
    user_id: 'user-current',
    user_name: '안산호랑이',
    country: 'KR',
    flag: '🇰🇷',
    manner_temp: 36.5,
    response_rate: 100,
    trade_count: 3,
    is_verified_worker: true,
    is_verified_dormitory: false,
    positive_tags_summary: [
      { tag_id: 'time_punctual', count: 3 },
      { tag_id: 'fast_response', count: 3 },
    ],
    recent_reviews: [],
  },
};

// 프로필 가져오기
export function getUserTrustProfile(userId: string, defaultName?: string, defaultCountry = 'KR', defaultFlag = '🇰🇷'): UserTrustProfile {
  if (USER_PROFILES[userId]) {
    return USER_PROFILES[userId];
  }
  
  // 기본 생성 프로필
  const newProfile: UserTrustProfile = {
    user_id: userId,
    user_name: defaultName || 'K-Market User',
    country: defaultCountry,
    flag: defaultFlag,
    manner_temp: 36.5,
    response_rate: 100,
    trade_count: 0,
    is_verified_worker: true,
    is_verified_dormitory: false,
    positive_tags_summary: [],
    recent_reviews: [],
  };
  USER_PROFILES[userId] = newProfile;
  return newProfile;
}

// 리뷰 저장 및 매너 온도 업데이트
export function submitTransactionReview(review: Omit<TransactionReview, 'id' | 'created_at'>): UserTrustProfile {
  const profile = getUserTrustProfile(review.target_user_id);
  
  // 점수 계산
  let deltaTemp = 0;
  if (review.rating_type === 'great') deltaTemp += 0.5;
  else if (review.rating_type === 'good') deltaTemp += 0.2;
  else if (review.rating_type === 'bad') deltaTemp -= 0.8;

  // 태그별 점수 반영
  review.selected_tag_ids.forEach((tagId) => {
    const pos = POSITIVE_TAGS.find((t) => t.id === tagId);
    const neg = NEGATIVE_TAGS.find((t) => t.id === tagId);
    if (pos) deltaTemp += pos.points;
    if (neg) deltaTemp += neg.points;

    // 양수 태그 집계
    if (pos) {
      const summaryItem = profile.positive_tags_summary.find((s) => s.tag_id === tagId);
      if (summaryItem) {
        summaryItem.count += 1;
      } else {
        profile.positive_tags_summary.push({ tag_id: tagId, count: 1 });
      }
    }
  });

  profile.manner_temp = Math.max(0, Math.min(99.9, Number((profile.manner_temp + deltaTemp).toFixed(1))));
  profile.trade_count += 1;

  const fullReview: TransactionReview = {
    ...review,
    id: `rev-${Date.now()}`,
    created_at: new Date().toISOString(),
  };

  profile.recent_reviews.unshift(fullReview);
  return profile;
}
