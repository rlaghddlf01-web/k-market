const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'src', 'lib', 'itemTranslationService.ts');

const ALL_NOUNS = {
  '아이패드 에어 6세대 M2 11 128G WIFI': {
    ko: '아이패드 에어 6세대 M2 11인치 128G WIFI',
    en: 'iPad Air 6th Gen M2 11" 128G WiFi',
    vi: 'iPad Air 6 M2 11 inch 128G Wifi',
    zh: 'iPad Air 6代 M2 11寸 128G WiFi',
    ja: 'iPad Air 第6世代 M2 11インチ 128G WiFi',
    ru: 'iPad Air 6-го поколения M2 11" 128G WiFi',
    th: 'iPad Air รุ่น 6 M2 11 นิ้ว 128G WiFi',
    uz: 'iPad Air 6-avlod M2 11" 128G WiFi',
    km: 'iPad Air ជំនាន់ទី 6 M2 11 អ៊ីញ 128G WiFi',
    mn: 'iPad Air 6-р үе M2 11" 128G WiFi',
    ne: 'आईप्याड एयर ६ M2 ११ इन्च १२८G WiFi',
    id: 'iPad Air Gen 6 M2 11" 128G WiFi',
    my: 'iPad Air 6th Gen M2 11" 128G WiFi',
    si: 'iPad Air 6th Gen M2 11" 128G WiFi',
    kk: 'iPad Air 6-буын M2 11" 128G WiFi',
    bn: 'আইপ্যাড এয়ার ৬ M2 ১১" ১২৮G ওয়াইফাই',
    ur: 'آئی پیڈ ایئر 6th Gen M2 11" 128G وائی فائی',
    tl: 'iPad Air 6th Gen M2 11" 128G WiFi',
  },
  '아이패드': {
    ko: '아이패드 태블릿',
    en: 'iPad Tablet',
    vi: 'Máy tính bảng iPad',
    zh: '苹果平板 iPad',
    ja: 'iPad タブレット',
    ru: 'Планшет iPad',
    th: 'แท็บเล็ต iPad',
    uz: 'iPad plansheti',
    km: 'ថេបប្លេត iPad',
    mn: 'iPad таблет',
    ne: 'आईप्याड ट्याब्लेट',
    id: 'Tablet iPad',
    my: 'iPad တက်ဘလက်',
    si: 'iPad ටැබ්ලට්',
    kk: 'iPad планшеті',
    bn: 'আইপ্যাড ট্যাবলেট',
    ur: 'آئی پیڈ ٹیبلٹ',
    tl: 'Tablet na iPad',
  },
  '아이폰': {
    ko: '아이폰 스마트폰',
    en: 'iPhone Apple',
    vi: 'Điện thoại iPhone',
    zh: '苹果手机 iPhone',
    ja: 'iPhone スマホ',
    ru: 'Смартфон iPhone',
    th: 'มือถือ iPhone',
    uz: 'iPhone smartfoni',
    km: 'ទូរស័ព្ទ iPhone',
    mn: 'iPhone утас',
    ne: 'आईफोन मोबाइल',
    id: 'Ponsel iPhone',
    my: 'iPhone ဖုန်း',
    si: 'iPhone ජංගම දුරකථනය',
    kk: 'iPhone смартфоны',
    bn: 'আইফোন মোবাইল',
    ur: 'آئی فون اسمارٹ فون',
    tl: 'iPhone Smartphone',
  },
  '세그웨이 나인봇 ES4 Xe trượt điện': {
    ko: '세그웨이 나인봇 ES4 전동킥보드',
    en: 'Segway Ninebot ES4 Electric Scooter',
    vi: 'Xe trượt điện Segway Ninebot ES4',
    zh: '赛格威九号 ES4 电动滑板车',
    ja: 'セグウェイ ナインボット ES4 電動キックボード',
    ru: 'Электросамокат Segway Ninebot ES4',
    th: 'สกู๊ตเตอร์ไฟฟ้า Segway Ninebot ES4',
    uz: 'Segway Ninebot ES4 elektr samokat',
    km: 'ស្គូតទ័រអគ្គិសនី Segway Ninebot ES4',
    mn: 'Segway Ninebot ES4 цахилгаан скүүтер',
    ne: 'Segway Ninebot ES4 इलेक्ट्रिक स्कुटर',
    id: 'Skuter Listrik Segway Ninebot ES4',
    my: 'Segway Ninebot ES4 လျှပ်စစ်စကူတာ',
    si: 'Segway Ninebot ES4 විදුලි ස්කූටරය',
    kk: 'Segway Ninebot ES4 электр самокаты',
    bn: 'সেগওয়ে नाइनবট ES4 বৈদ্যুতিক স্কুটার',
    ur: 'سیگ وے نائن بوٹ ES4 الیکٹرک اسکوٹر',
    tl: 'Segway Ninebot ES4 Electric Scooter',
  },
  '세그웨이': {
    ko: '세그웨이 나인봇',
    en: 'Segway Ninebot Scooter',
    vi: 'Xe trượt điện Segway',
    zh: '赛格威电动滑板车',
    ja: 'セグウェイ電動スクーター',
    ru: 'Электросамокат Segway',
    th: 'สกู๊ตเตอร์ Segway',
    uz: 'Segway samokat',
    km: 'ស្គូតទ័រ Segway',
    mn: 'Segway скүүтер',
    ne: 'Segway स्कुटर',
    id: 'Skuter Segway',
    my: 'Segway စကူတာ',
    si: 'Segway ස්කූටරය',
    kk: 'Segway самокаты',
    bn: 'সেগওয়ে স্কুটার',
    ur: 'سیگ وے اسکوٹر',
    tl: 'Segway Scooter',
  },
  '전기포트': {
    ko: '전기포트',
    vi: 'Ấm siêu tốc',
    zh: '电水壶',
    en: 'Electric Kettle',
    ja: '電気ケトル',
    ru: 'Электрочайник',
    th: 'กาต้มน้ำไฟฟ้า',
    uz: 'Elektr choynak',
    km: 'កំសៀវដាំទឹកអគ្គិសនី',
    mn: 'Цахилгаан данх',
    ne: 'इलेक्ट्रिक केत्ली',
    id: 'Teko Listrik',
    my: 'လျှပ်စစ် ရေနွေးအိုး',
    si: 'විදුලි කේතලය',
    kk: 'Электр шәйнек',
    bn: 'বৈদ্যুতিক কেটলি',
    ur: 'الیکٹرک کیتلی',
    tl: 'Electric Kettle',
  },
  '마이크': {
    ko: '마이크',
    vi: 'Microphone',
    zh: '麦克风话筒',
    en: 'Microphone',
    ja: 'マイク',
    ru: 'Микрофон',
    th: 'ไมโครโฟน',
    uz: 'Mikrofon',
    km: 'មីក្រូហ្វូន',
    mn: 'Микрофон',
    ne: 'माइक्रोफोन',
    id: 'Mikrofon',
    my: 'မိုက်ခရိုဖုန်း',
    si: 'මයික්‍රෆෝනය',
    kk: 'Микрофон',
    bn: 'মাইক্রোফোন',
    ur: 'مائیکروفون',
    tl: 'Microphone',
  },
  'RAM': {
    ko: 'RAM',
    vi: 'Bộ nhớ RAM máy tính',
    zh: '电脑内存条 RAM',
    en: 'Computer RAM',
    ja: 'PCメモリ RAM',
    ru: 'Оперативная память RAM',
    th: 'แรมคอมพิวเตอร์ RAM',
    uz: 'Kompyuter RAM xotirasi',
    km: 'រ៉េមម៉ាស៊ីនកុំព្យូទ័រ RAM',
    mn: 'Компьютерийн RAM',
    ne: 'कम्प्युटर RAM',
    id: 'RAM Komputer',
    my: 'ကွန်ပျူတာ RAM',
    si: 'පරිගණක RAM',
    kk: 'Компьютерлік RAM',
    bn: 'কম্পিউটার RAM',
    ur: 'کمپیوٹر ریم',
    tl: 'RAM ng Kompyuter',
  },
  '밥솥': {
    ko: '쿠쿠 전기 밥솥',
    vi: 'Nồi cơm điện Cuckoo',
    zh: '福库电饭煲',
    en: 'Cuckoo Rice Cooker',
    ja: '炊飯器',
    ru: 'Рисоварка',
    th: 'หม้อหุงข้าว',
    uz: 'Guruch pishirgich',
    km: 'ឆ្នាំងដាំបាយអគ្គិសនី',
    mn: 'Будаа агшаагч',
    ne: 'राइस कुकर',
    id: 'Rice Cooker',
    my: 'ထမင်းပေါင်းအိုး',
    si: 'රයිස් කුකර්',
    kk: 'Күріш пісіргіш',
    bn: 'রাইস কুকার',
    ur: 'رائس ککر',
    tl: 'Rice Cooker',
  },
  '세탁기': {
    ko: '세탁기',
    vi: 'Máy giặt',
    zh: '洗衣机',
    en: 'Washing Machine',
    ja: '洗濯機',
    ru: 'Стиральная машина',
    th: 'เครื่องซักผ้า',
    uz: 'Kir yuvish mashinasi',
    km: 'ម៉ាស៊ីនបោកខោអាវ',
    mn: 'Угаалгын машин',
    ne: 'लुगा धुने मेसिन',
    id: 'Mesin Cuci',
    my: 'အဝတ်လျှော်စက်',
    si: 'රෙදි සෝදන යන්ත්‍රය',
    kk: 'Кір жуғыш машина',
    bn: 'ওয়াশিং মেশিন',
    ur: 'واشنگ مشین',
    tl: 'Washing Machine',
  },
  '냉장고': {
    ko: '소형 원룸 냉장고',
    en: 'Compact Refrigerator',
    vi: 'Tủ lạnh mini',
    zh: '小型单间冰箱',
    ja: '小型冷蔵庫',
    ru: 'Холодильник',
    th: 'ตู้เย็นขนาดเล็ก',
    uz: 'Kichik muzlatgich',
    km: 'ទូរទឹកកកតូច',
    mn: 'Хөргөгч',
    ne: 'सानो फ्रिज',
    id: 'Kulkas Mini',
    my: 'ရေခဲသေတ္တာအသေး',
    si: 'කුඩා ශීතකරණය',
    kk: 'Тоңазытқыш',
    bn: 'ছোট ফ্রিজ',
    ur: 'چھوٹا فریج',
    tl: 'Mini Refrigerator',
  },
  '자전거': {
    ko: '출퇴근용 자전거',
    en: 'Commuter Bicycle',
    vi: 'Xe đạp đi làm',
    zh: '通勤自行车',
    ja: '通勤用自転車',
    ru: 'Городской велосипед',
    th: 'จักรยานปั่นไปทำงาน',
    uz: 'Velosiped',
    km: 'កង់ជិះទៅធ្វើការ',
    mn: 'Унадаг дугуй',
    ne: 'साइकल',
    id: 'Sepeda Komuter',
    my: 'စက်ဘီး',
    si: 'පාපැදිය',
    kk: 'Велосипед',
    bn: 'সাইকেল',
    ur: 'سائیکل',
    tl: 'Bisekleta',
  },
  '전동킥보드': {
    ko: '전동킥보드',
    en: 'Electric Scooter',
    vi: 'Xe trượt điện',
    zh: '电动滑板车',
    ja: '電動キックボード',
    ru: 'Электросамокат',
    th: 'สกู๊ตเตอร์ไฟฟ้า',
    uz: 'Elektr samokat',
    km: 'ស្គូតទ័រអគ្គិសនី',
    mn: 'Цахилгаан скүүтер',
    ne: 'इलेक्ट्रिक स्कुटर',
    id: 'Skuter Listrik',
    my: 'လျှပ်စစ်စကူတာ',
    si: 'විදුලි ස්කූටරය',
    kk: 'Электрлік самокат',
    bn: 'বৈদ্যুতিক স্কুটার',
    ur: 'الیکٹرک اسکوٹر',
    tl: 'Electric Scooter',
  },
  '전자레인지': {
    ko: '전자레인지',
    en: 'Microwave Oven',
    vi: 'Lò vi sóng',
    zh: '微波炉',
    ja: '電子レンジ',
    ru: 'Микроволновка',
    th: 'ไมโครเวฟ',
    uz: 'Mikroto\'lqinli pech',
    km: 'ម៉ាស៊ីនមីក្រូវ៉េវ',
    mn: 'Богино долгионы зуух',
    ne: 'माइक्रोवेभ',
    id: 'Microwave',
    my: 'မိုက်ခရိုဝေ့ဖ်',
    si: 'මයික්‍රෝවේව් උදුන',
    kk: 'Микротолқынды пеш',
    bn: 'মাইক্রোওয়েভ',
    ur: 'مائیکرو ویو اوون',
    tl: 'Microwave Oven',
  },
  '모니터': {
    ko: '게이밍 모니터 27인치',
    en: '27" Gaming Monitor',
    vi: 'Màn hình máy tính 27 inch',
    zh: '27寸电竞显示器',
    ja: '27インチ ゲーミングモニター',
    ru: 'Игровой монитор 27"',
    th: 'จอคอมพิวเตอร์ 27 นิ้ว',
    uz: '27 dyuymli monitor',
    km: 'អេក្រង់កុំព្យូទ័រ 27 អ៊ីញ',
    mn: '27 инчийн дэлгэц',
    ne: '२७ इन्च मनिटर',
    id: 'Monitor Komputer 27"',
    my: '၂၇ လက်မ မော်နီတာ',
    si: 'අඟල් 27 මොනිටරය',
    kk: '27 дюймдік монитор',
    bn: '২৭ ইঞ্চি মনিটর',
    ur: '27 انچ مانیٹر',
    tl: '27-inch Monitor',
  },
  '에어프라이어': {
    ko: '에어프라이어',
    en: 'Air Fryer',
    vi: 'Nồi chiên không dầu',
    zh: '空气炸锅',
    ja: 'ノンフライヤー',
    ru: 'Аэрогриль',
    th: 'หม้อทอดไร้น้ำมัน',
    uz: 'Aerogril',
    km: 'ឆ្នាំងបំពងគ្មានខ្លាញ់',
    mn: 'Агаар шарагч',
    ne: 'एयर फ्रायर',
    id: 'Air Fryer',
    my: 'လေဖိအားကြော်အိုး',
    si: 'එයාර් ෆ්‍රයර්',
    kk: 'Аэрогриль',
    bn: 'এয়ার ফ্রায়ার',
    ur: 'ایئر فرائر',
    tl: 'Air Fryer',
  },
  '온수매트': {
    ko: '따뜻한 온수매트 싱글',
    en: 'Warm Heated Mattress Single',
    vi: 'Đệm sưởi nước ấm đơn',
    zh: '水暖加热床垫 单人',
    ja: '温水マット シングル',
    ru: 'Водяной матрас с подогревом',
    th: 'แผ่นรองนอนน้ำอุ่น',
    uz: 'Isitiladigan matras',
    km: 'ពូកកម្តៅទឹកក្តៅ',
    mn: 'Халаалттай матрас',
    ne: 'तातो म्याट्रेस',
    id: 'Matras Pemanas Air',
    my: 'ရေနွေးအပူပေးမွေ့ရာ',
    si: 'උණුසුම් ජල මෙට්ටය',
    kk: 'Жылытылатын матрас',
    bn: 'গরম পানির তোশক',
    ur: 'گرم پانی والا گدا',
    tl: 'Heated Mattress Pad',
  },
  '청소기': {
    ko: '무선 청소기',
    en: 'Cordless Vacuum Cleaner',
    vi: 'Máy hút bụi không dây',
    zh: '无线手持吸尘器',
    ja: 'コードレス掃除機',
    ru: 'Беспроводной пылесос',
    th: 'เครื่องดูดฝุ่นไร้สาย',
    uz: 'Simsiz changyutgich',
    km: 'ម៉ាស៊ីនបូមធូលីឥតខ្សែ',
    mn: 'Утасгүй тоос сорогч',
    ne: 'ताररहित भ्याकुम क्लिनर',
    id: 'Penyedot Debu Nirkabel',
    my: 'ကြိုးမဲ့ ဖုန်စုပ်စက်',
    si: 'රැහැන් රහිත වැකියුම් ක්ලීනර්',
    kk: 'Сымсыз шаңсорғыш',
    bn: 'ওয়্যারলেস ভ্যাকুয়াম ক্লিনার',
    ur: 'وائرلیس ویکیوم کلینر',
    tl: 'Cordless Vacuum Cleaner',
  }
};

const fullCode = `// KTRS K-Market 17개국어 매물 및 커뮤니티 번역 매트릭스 엔진

import { SupportedLanguage } from '@/types/kmarket';

// 1. 카테고리/품목 핵심 어휘 17개국어 매트릭스
export const NOUN_TRANSLATIONS: Record<string, Record<SupportedLanguage, string>> = ${JSON.stringify(ALL_NOUNS, null, 2)};

// 2. 거래 상태 접두사 (무료나눔, 귀국 D-Day 무빙세일 등)
export const STATUS_PREFIX: Record<string, Record<SupportedLanguage, string>> = {
  free_give: {
    ko: '🎁 [0원 무료나눔]',
    vi: '🎁 [Tặng 0đ]',
    zh: '🎁 [0元免费赠送]',
    en: '🎁 [Free Give]',
    ja: '🎁 [0円無料譲渡]',
    ru: '🎁 [Бесплатно 0 вон]',
    th: '🎁 [แจกฟรี 0 วอน]',
    uz: '🎁 [0 von Bepul]',
    km: '🎁 [ចែកឥតគិតថ្លៃ 0 វ៉ុន]',
    mn: '🎁 [0 вон Үнэгүй]',
    ne: '🎁 [० वन निःशुल्क]',
    id: '🎁 [Gratis 0 Won]',
    my: '🎁 [၀ ဝမ် အခမဲ့ပေးမည်]',
    si: '🎁 [0 වොන් නොමිලේ]',
    kk: '🎁 [0 вон Тегін]',
    bn: '🎁 [০ ওন উপহার]',
    ur: '🎁 [مفت 0 وون]',
    tl: '🎁 [0 won Libreng Pamigay]',
  },
  moving_d3: {
    ko: '🚨 [D-3 오늘마감 헐값]',
    vi: '🚨 [D-3 Về nước gấp]',
    zh: '🚨 [D-3 回国甩卖]',
    en: '🚨 [D-3 Urgent Moving Sale]',
    ja: '🚨 [D-3 帰国直前処分]',
    ru: '🚨 [D-3 Срочная распродажа]',
    th: '🚨 [D-3 ด่วนวันสุดท้าย]',
    uz: '🚨 [D-3 Shoshilinch sotuv]',
    km: '🚨 [D-3 លក់បន្ទាន់]',
    mn: '🚨 [D-3 Яаралтай хямд зарна]',
    ne: '🚨 [D-3 आज अन्तिम सस्तो बिक्री]',
    id: '🚨 [D-3 Cuci Gudang Cepat]',
    my: '🚨 [D-3 အရေးပေါ် အမြန်ရောင်းမည်]',
    si: '🚨 [D-3 අද අවසන් හදිසි විකිණීම]',
    kk: '🚨 [D-3 Шұғыл арзан сату]',
    bn: '🚨 [D-3 আজই শেষ]',
    ur: '🚨 [D-3 فوری واپسی سیل]',
    tl: '🚨 [D-3 Uuwi Na Agad]',
  },
  moving_d7: {
    ko: '✈️ [D-7 이번주 귀국]',
    vi: '✈️ [D-7 Về nước tuần này]',
    zh: '✈️ [D-7 本周回国清仓]',
    en: '✈️ [D-7 Moving This Week]',
    ja: '✈️ [D-7 今週帰国]',
    ru: '✈️ [D-7 Отъезд на этой неделе]',
    th: '✈️ [D-7 กลับประเทศสัปดาห์นี้]',
    uz: '✈️ [D-7 Shu hafta qaytish]',
    km: '✈️ [D-7 ត្រឡប់សប្តាហ៍នេះ]',
    mn: '✈️ [D-7 Энэ долоо хоногт буцна]',
    ne: '✈️ [D-7 यो हप्ता फिर्ता]',
    id: '✈️ [D-7 Pulang Minggu Ini]',
    my: '✈️ [D-7 ယခုအပတ် နေရပ်ပြန်မည်]',
    si: '✈️ [D-7 මේ සතියේ ආපසු]',
    kk: '✈️ [D-7 Осы аптада қайту]',
    bn: '✈️ [D-7 এই সপ্তাহে ফেরা]',
    ur: '✈️ [D-7 اس ہفتے واپسی]',
    tl: '✈️ [D-7 Uuwi Ngayong Linggo]',
  },
};

export const DESC_TEMPLATES: Record<SupportedLanguage, (isMoving: boolean, days?: number) => string> = {
  ko: (isMoving, days) =>
    \`\${isMoving ? \`비자 만료로 다음 주 귀국하게 되어 (D-\${days || 7}) 기숙사 살림 정리 급처분합니다! \` : ''}기숙사에서 깔끔하게 사용하던 물건이며, 작동 100% 완벽하게 잘 됩니다. 공단 기숙사 앞에서 안심 직거래 가능합니다. 1:1 번역 채팅으로 편하게 연락주세요!\`,
  vi: (isMoving, days) =>
    \`\${isMoving ? \`Tuần sau hết hạn visa về nước (D-\${days || 7}) nên mình thanh lý đồ ký túc xá giá rẻ! \` : ''}Đồ dùng trong KTX rất sạch sẽ, hoạt động 100% tốt. Giao dịch trực tiếp an toàn trước KTX khu công nghiệp. Nhắn tin qua chat dịch 1:1 nhé!\`,
  zh: (isMoving, days) =>
    \`\${isMoving ? \`下周签证到期准备回国 (D-\${days || 7})，宿舍生活用品超低价急甩卖！\` : ''}在宿舍使用非常爱惜，功能100%完好无任何问题。支持在工业园区宿舍门前安心当面交易。欢迎通过1:1实时翻译聊天联系！\`,
  en: (isMoving, days) =>
    \`\${isMoving ? \`Visa expires next week and moving back home (D-\${days || 7}), urgent sale of dormitory items! \` : ''}Used cleanly in the dorm, 100% works perfectly. Safe direct trade available in front of industrial complex dorm. Feel free to contact via 1:1 translation chat!\`,
  ja: (isMoving, days) =>
    \`\${isMoving ? \`来週ビザ満了で帰国するため (D-\${days || 7})、寮の生活用品を格安処分します！\` : ''}寮で綺麗に使っていた物で、動作100%確認済みで問題ありません。工業団地の寮前で直接取引可能です。1:1自動翻訳チャットでお気軽にご連絡ください！\`,
  ru: (isMoving, days) =>
    \`\${isMoving ? \`На следующей неделе заканчивается виза и возвращаюсь на родину (D-\${days || 7}), распродаю вещи из общежития! \` : ''}Вещи в отличном состоянии, всё 100% работает. Личная встреча около общежития промзоны. Пишите в 1:1 чат с автопереводом!\`,
  th: (isMoving, days) =>
    \`\${isMoving ? \`สัปดาห์หน้าวีซ่าหมดอายุต้องกลับประเทศ (D-\${days || 7}) เลยเคลียร์ของในหอพักราคาถูกครับ! \` : ''}ของใช้ในหอพักสภาพดีมาก ใช้งานได้ปกติ 100% นัดรับของที่หน้าหอพักนิคมอุตสาหกรรมได้เลย แชทคุยผ่านระบบแปล 1:1 ได้ทันทีครับ!\`,
  uz: (isMoving, days) =>
    \`\${isMoving ? \`Keyingi hafta viza tugab vatanga qaytaman (D-\${days || 7}), yotoqxona buyumlarini arzon sotyapman! \` : ''}Yotoqxonada toza ishlatilgan, 100% a'lo darajada ishlaydi. Sanoat zonasi yotoqxonasi oldida to'g'ridan-to'g'ri olib ketishingiz mumkin. 1:1 tarjima chatida yozing!\`,
  km: (isMoving, days) =>
    \`\${isMoving ? \`សប្តាហ៍ក្រោយទិដ្ឋាការផុតកំណត់ត្រឡប់ទៅប្រទេសវិញ (D-\${days || 7}) លក់សម្ភារៈបន្ទប់ស្នាក់នៅ! \` : ''}សម្ភារៈបន្ទប់ស្នាក់នៅស្អាតល្អ ដំណើរការ 100%។ ជួបគ្នាផ្ទាល់នៅមុខអន្តេវាសិកដ្ឋាន។ សូមទាក់ទងមកតាមការជជែកបកប្រែ 1:1!`,
  mn: (isMoving, days) =>
    \`\${isMoving ? \`Ирэх долоо хоногт виз дуусаад нутаг буцах тул (D-\${days || 7}) байрны эд хогшлоо хямд зарна! \` : ''}Дотуур байранд цэвэрхэн хэрэглэсэн, 100% хэвийн ажилладаг. Үйлдвэрийн бүсийн дотуур байрны үүдэнд уулзаж авна уу. 1:1 орчуулгын чатаар холбогдоно уу!\`,
  ne: (isMoving, days) =>
    \`\${isMoving ? \`अर्को हप्ता भिसा सकिएर घर फिर्ता हुने भएकोले (D-\${days || 7}) कोठाको सामान बेच्दैछु! \` : ''}कोठामा सफासँग चलाएको सामान हो, १००% राम्रोसँग चल्छ। औद्योगिक क्षेत्रको होस्टेल अगाडि भेटेर लिन सकिन्छ। १:१ अनुवाद च्याटमा सम्पर्क गर्नुहोस्!\`,
  id: (isMoving, days) =>
    \`\${isMoving ? \`Minggu depan visa habis dan pulang ke negara asal (D-\${days || 7}), menjual perlengkapan asrama! \` : ''}Barang asrama terawat dengan baik, berfungsi 100% normal. Bisa COD di depan pintu asrama kawasan industri. Silakan chat dengan terjemahan 1:1!\`,
  my: (isMoving, days) =>
    \`\${isMoving ? \`နောက်အပတ် ဗီဇာကုန်ပြီး နေရပ်ပြန်မည်ဖြစ်၍ (D-\${days || 7}) အဆောင်ပစ္စည်းများ အမြန်ရှင်းထုတ်ပါသည်! \` : ''}အဆောင်တွင် သန့်ရှင်းစွာ သုံးထားပြီး ၁၀၀% ကောင်းမွန်စွာ အလုပ်လုပ်ပါသည်။ စက်မှုဇုန် အဆောင်ရှေ့တွင် လူချင်းတွေ့ပြီး ဝယ်ယူနိုင်ပါသည်။ ၁:၁ ဘာသာပြန် ချတ်ဖြင့် ဆက်သွယ်ပါ!\`,
  si: (isMoving, days) =>
    \`\${isMoving ? \`ලබන සතියේ වීසා අවසන් වී ආපසු යන බැවින් (D-\${days || 7}) නේවාසිකාගාර බඩු අඩු මුදලට විකුණමි! \` : ''}හොඳින් පිරිසිදුව පාවිච්චි කරන ලද අතර 100% ක්‍රියාත්මකයි. කාර්මික කලාපයේ නේවාසිකාගාරය ඉදිරිපිටදී ලබාගත හැක. 1:1 පරිවර්තන චැට් මගින් සම්බන්ධ වන්න!\`,
  kk: (isMoving, days) =>
    \`\${isMoving ? \`Келесі аптада виза бітіп елге қайтамын (D-\${days || 7}), жатақхана заттарын арзан бағада сатамын! \` : ''}Жатақханада таза ұсталған, 100% тамаша жұмыс істейді. Өндірістік аймақтың жатақханасы алдында қолма-қол алып кете аласыз. 1:1 аударма чатында хабарласыңыз!\`,
  bn: (isMoving, days) =>
    \`\${isMoving ? \`আগামী সপ্তাহে ভিসা শেষ হয়ে দেশে ফিরে যাচ্ছি (D-\${days || 7}), হোস্টেলের জিনিসপত্র সস্তায় বিক্রি করছি! \` : ''}হোস্টেলে খুব সুন্দরভাবে ব্যবহার করা জিনিস, ১০০% সঠিকভাবে কাজ করে। শিল্প এলাকার হোস্টেলের সামনে সরাসরি লেনদেন করা যাবে। ১:১ অনুবাদ চ্যাটে যোগাযোগ করুন!\`,
  tl: (isMoving, days) =>
    \`\${isMoving ? \`Uuwi na sa sariling bansa dahil tapos na ang visa sa susunod na linggo (D-\${days || 7}), rush sale ng gamit sa dormitoryo! \` : ''}Maayos at malinis na ginamit sa dormitoryo, 100% gumagana nang maayos. Puwedeng makipagkita sa tapat ng dormitoryo. Mag-message sa 1:1 translation chat!\`,
  ur: (isMoving, days) =>
    \`\${isMoving ? \`اگلے ہفتے ویزا ختم ہونے پر وطن واپس جا رہا ہوں (D-\${days || 7})، ہاسٹل کا سامان سستے داموں بیچ رہا ہوں! \` : ''}ہاسٹل میں صاف ستھرا استعمال شدہ سامان ہے، 100% بالکل ٹھیک چلتا ہے۔ انڈسٹریل کمپلیکس ہاسٹل کے سامنے ملاقات کر کے خریدا جا سکتا ہے۔ 1:1 ترجمہ چیٹ میں رابطہ کریں!\`,
};

/**
 * 한국어 원문 제목을 바탕으로 17개국어 전체 번역 딕셔너리를 생성합니다.
 */
export function generate15LangTranslations(
  koreanTitle: string,
  isMoving: boolean,
  isFree: boolean,
  movingDays?: number
): Record<SupportedLanguage, { title: string; description: string }> {
  const result: Partial<Record<SupportedLanguage, { title: string; description: string }>> = {};

  const allLangs: SupportedLanguage[] = [
    'ko', 'vi', 'zh', 'en', 'ja', 'ru', 'th', 'uz', 'km', 'mn', 'ne', 'id', 'my', 'si', 'kk', 'bn', 'ur', 'tl'
  ];

  for (const lang of allLangs) {
    let prefix = '';
    if (isFree) {
      prefix = STATUS_PREFIX.free_give[lang] + ' ';
    } else if (isMoving) {
      if ((movingDays || 5) <= 3) {
        prefix = STATUS_PREFIX.moving_d3[lang] + ' ';
      } else {
        prefix = STATUS_PREFIX.moving_d7[lang] + ' ';
      }
    }

    const desc = DESC_TEMPLATES[lang](isMoving, movingDays);
    let translatedCore = koreanTitle.replace(/^[^\\s]+\\s*\\[[^\\]]+\\]\\s*/, '').trim();
    
    for (const [krWord, transMap] of Object.entries(NOUN_TRANSLATIONS)) {
      if (translatedCore.includes(krWord)) {
        translatedCore = translatedCore.replace(krWord, transMap[lang]);
        break;
      }
    }

    result[lang] = {
      title: \`\${prefix}\${translatedCore}\`,
      description: desc,
    };
  }

  return result as Record<SupportedLanguage, { title: string; description: string }>;
}

export async function translateItemToAllLanguages(
  title: string,
  description: string,
  sourceLang: SupportedLanguage = 'ko'
): Promise<Record<string, { title: string; description: string }>> {
  const isMoving = title.includes('귀국') || title.includes('무빙') || title.includes('Moving');
  const isFree = title.includes('무료') || title.includes('0원') || title.includes('Free');
  return generate15LangTranslations(title, isMoving, isFree, 7);
}

export async function translateTextWithGemini(
  text: string,
  targetLang: SupportedLanguage,
  sourceLang: string = 'auto'
): Promise<string> {
  for (const [krWord, transMap] of Object.entries(NOUN_TRANSLATIONS)) {
    if (text.includes(krWord)) {
      return text.replace(krWord, transMap[targetLang]);
    }
  }
  return text;
}
`;

fs.writeFileSync(targetFile, fullCode, 'utf8');
console.log('✅ Rebuilt itemTranslationService.ts cleanly with zero duplicates!');
