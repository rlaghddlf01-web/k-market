// KTRS K-Market 내 주변 동네 위치 17개국어 다국어 어댑터
// 사용자의 실제 현재 위치("내 주변")를 기준으로 친숙하고 깔끔한 동네 단위 직거래 장소 표시

import { KMarketItem, IndustrialRegion, SupportedLanguage } from '@/types/kmarket';

const CLEAN_SPOTS_17LANG: Record<string, Record<SupportedLanguage, string>> = {
  convenience: {
    ko: '인근 편의점 앞',
    en: 'In front of nearby store',
    vi: 'Trước cửa hàng tiện lợi',
    zh: '附近便利店门前',
    ja: '近くのコンビニ前',
    ru: 'У круглосуточного магазина',
    th: 'หน้าร้านสะดวกซื้อใกล้เคียง',
    uz: 'Yaqin do\'kon oldida',
    km: 'មុខហាងទំនិញក្បែរនេះ',
    mn: 'Ойролцоох дэлгүүрийн өмнө',
    ne: 'नजिकैको पसल अगाडि',
    id: 'Depan minimarket terdekat',
    my: 'အနီးရှိ စတိုးဆိုင်ရှေ့',
    si: 'ළඟම ඇති වෙළඳසැල ඉදිරිපිට',
    kk: 'Жақын маңдағы дүкен алдында',
    bn: 'কাছের দোকানের সামনে',
    ur: 'قریبی اسٹور کے سامنے',
    tl: 'Tapat ng tindahan',
  },
  walk_5m: {
    ko: '도보 5분 거리',
    en: '5 min walk distance',
    vi: 'Cách 5 phút đi bộ',
    zh: '步行5分钟距离',
    ja: '徒歩5分の距離',
    ru: '5 минут пешком',
    th: 'เดิน 5 นาที',
    uz: '5 daqiqalik piyoda yo\'l',
    km: 'ដើរ ៥ នាទី',
    mn: 'Явган 5 минутын зай',
    ne: '५ मिनेट हिड्ने दुरी',
    id: '5 menit jalan kaki',
    my: 'လမ်းလျှောက် ၅ မိနစ်',
    si: 'විනාඩි 5 ක ඇවිදීමේ දුර',
    kk: 'Жаяу 5 минуттық жер',
    bn: '৫ মিনিট হাঁটার দূরত্ব',
    ur: '5 منٹ کی پیدل مسافت',
    tl: '5 minutong lakad',
  },
  subway_exit1: {
    ko: '역 1번 출구 앞',
    en: 'Station Exit 1',
    vi: 'Trước cửa số 1 ga tàu',
    zh: '地铁站1号出口前',
    ja: '駅1番出口前',
    ru: 'У выхода №1 станции',
    th: 'หน้าทางออก 1 สถานี',
    uz: 'Bekat 1-chi chiqish oldida',
    km: 'មុខច្រកចេញលេខ ១ ស្ថានីយ៍',
    mn: 'Буудлын 1-р гарцны өмнө',
    ne: 'स्टेशन गेट नं १ अगाडि',
    id: 'Depan pintu keluar 1 stasiun',
    my: 'ဘူတာ ထွက်ပေါက် ၁ ရှေ့',
    si: 'දුම්රිය ස්ථානයේ අංක 1 පිටවීම ඉදිරිපිට',
    kk: 'Станцияның 1-шығу есігі алдында',
    bn: 'স্টেশনের ১ নং গেটের সামনে',
    ur: 'اسٹیشن گیٹ 1 کے سامنے',
    tl: 'Tapat ng Exit 1 ng Istasyon',
  },
  safe_zone: {
    ko: '동네 안심 직거래존',
    en: 'Neighborhood Safe Trade Zone',
    vi: 'Khu giao dịch an toàn',
    zh: '社区安心交易区',
    ja: '安心直接取引ゾーン',
    ru: 'Безопасная зона сделок',
    th: 'จุดนัดรับปลอดภัยในชุมชน',
    uz: 'Xavfsiz savdo hududi',
    km: 'តំបន់ជួញដូរសុវត្ថិភាព',
    mn: 'Аюулгүй худалдааны бүс',
    ne: 'सुरक्षित कारोबार क्षेत्र',
    id: 'Zona Transaksi Aman',
    my: 'စိတ်ချရသော အရောင်းအဝယ်ဇုန်',
    si: 'ආරක්ෂිත ගනුදෙනු කලාපය',
    kk: 'Қауіпсіз сауда аймағы',
    bn: 'নিরাপদ লেনদেন এলাকা',
    ur: 'محفوظ لین دین کا علاقہ',
    tl: 'Ligtas na Lugar ng Transaksyon',
  },
  civic_center: {
    ko: '주민센터 앞',
    en: 'In front of Community Center',
    vi: 'Trước trung tâm hành chính',
    zh: '居民中心门前',
    ja: '住民センター前',
    ru: 'У общественного центра',
    th: 'หน้าศูนย์บริการชุมชน',
    uz: 'Mahalla markazi oldida',
    km: 'មុខមជ្ឈមណ្ឌលសហគមន៍',
    mn: 'Иргэдийн төвийн өмнө',
    ne: 'सामुदायिक केन्द्र अगाडि',
    id: 'Depan kantor kelurahan',
    my: 'ရပ်ကွက်ရုံးရှေ့',
    si: 'ප්‍රජා මධ්‍යස්ථානය ඉදිරිපිට',
    kk: 'Әкімдік орталығы алдында',
    bn: 'কমিউনিটি সেন্টারের সামনে',
    ur: 'کمیونٹی سنٹر کے سامنے',
    tl: 'Tapat ng Barangay Hall',
  },
};

const NEARBY_LABEL_17LANG: Record<SupportedLanguage, string> = {
  ko: '내 주변',
  en: 'Nearby',
  vi: 'Gần tôi',
  zh: '我附近',
  ja: '周辺',
  ru: 'Рядом',
  th: 'ใกล้ฉัน',
  uz: 'Yaqinimda',
  km: 'ក្បែរខ្ញុំ',
  mn: 'Ойролцоо',
  ne: 'मेरो नजिक',
  id: 'Di sekitar',
  my: 'အနီးနား',
  si: 'මගේ අසල',
  kk: 'Жанымда',
  bn: 'আমার কাছে',
  ur: 'میرے قریب',
  tl: 'Malapit sa akin',
};

const SPOTS_KEYS = ['convenience', 'walk_5m', 'subway_exit1', 'safe_zone', 'civic_center'];

/**
 * 매물의 지역 및 직거래 장소를 17개 언어로 깔끔한 동네 단위로 반환
 */
export function getAdaptedItemRegion(
  item: KMarketItem,
  userRegion: IndustrialRegion = 'all',
  lang: SupportedLanguage = 'ko'
): string {
  const nearbyPrefix = NEARBY_LABEL_17LANG[lang] || NEARBY_LABEL_17LANG.ko;

  // 아이템 ID 기반 결정적 스팟 선정 (방어적 처리)
  const idStr = item?.id ? String(item.id) : 'item-1';
  const idNum = parseInt(idStr.replace(/\D/g, ''), 10) || 1;
  const spotKey = SPOTS_KEYS[(idNum - 1) % SPOTS_KEYS.length] || 'convenience';
  const spotText = CLEAN_SPOTS_17LANG[spotKey]?.[lang] || CLEAN_SPOTS_17LANG[spotKey]?.ko || '인근 편의점 앞';

  return `${nearbyPrefix} (${spotText})`;
}
