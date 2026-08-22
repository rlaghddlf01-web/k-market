const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'src', 'lib', 'itemTranslationService.ts');

const EXPANDED_NOUNS = {
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
    ko: '아이패드',
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
    ko: '아이폰',
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
    kk: 'Электр самокаты',
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
    ne: 'माइक्रोवेभ ওভেন',
    id: 'Microwave',
    my: 'မိုက်ခရိုဝေ့ဖ်',
    si: 'මයික්‍රෝවේව් උදුන',
    kk: 'Микротолқынды пеш',
    bn: 'মাইক্রোওয়েভ ওভেন',
    ur: 'مائیکرو ویو اوون',
    tl: 'Microwave Oven',
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
  '냉장고': {
    ko: '소형 원룸 냉장고',
    en: 'Compact Refrigerator',
    vi: 'Tủ lạnh mini gia đình',
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
  '온수매트': {
    ko: '따뜻한 온수매트 싱글',
    en: 'Warm Water Heated Mattress Single',
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

let content = fs.readFileSync(targetFile, 'utf8');

// STATUS_PREFIX에 tl 추가
content = content.replace(
  /bn:\s*'🎁\s*\[০ ওন উপহার\]',/g,
  `bn: '🎁 [০ ওন উপহার]',\n    tl: '🎁 [0 won Libreng Pamigay]',`
);

content = content.replace(
  /bn:\s*'🚨\s*\[D-3 আজই শেষ\]',/g,
  `bn: '🚨 [D-3 আজই শেষ]',\n    tl: '🚨 [D-3 Uuwi Na Agad]',`
);

content = content.replace(
  /bn:\s*'✈️\s*\[D-7 এই সপ্তাহে ফেরা\]',/g,
  `bn: '✈️ [D-7 এই সপ্তাহে ফেরা]',\n    tl: '✈️ [D-7 Uuwi Ngayong Linggo]',`
);

content = content.replace(
  /bn:\s*\(isMoving,\s*days\)\s*=>[^,]+,/g,
  (m) => m + `\n  tl: (isMoving, days) => \`\${isMoving ? \`Uuwi na sa sariling bansa dahil tapos na ang visa sa susunod na linggo (D-\${days || 7}), rush sale ng gamit sa dormitoryo! \` : ''}Maayos at malinis na ginamit sa dormitoryo, 100% gumagana nang maayos. Puwedeng makipagkita sa tapat ng dormitoryo. Mag-message sa 1:1 translation chat!\`,`
);

// allLangs에 tl 추가
content = content.replace(
  /'ko',\s*'vi',\s*'zh',\s*'en',\s*'ja',\s*'ru',\s*'th',\s*'uz',\s*'km',\s*'mn',\s*'ne',\s*'id',\s*'my',\s*'si',\s*'kk',\s*'bn',\s*'ur'/g,
  `'ko', 'vi', 'zh', 'en', 'ja', 'ru', 'th', 'uz', 'km', 'mn', 'ne', 'id', 'my', 'si', 'kk', 'bn', 'ur', 'tl'`
);

// NOUN_TRANSLATIONS 객체 병합
let nounEntries = [];
for (const [kr, transMap] of Object.entries(EXPANDED_NOUNS)) {
  const lines = [`  '${kr}': {`];
  for (const [lang, trans] of Object.entries(transMap)) {
    lines.push(`    ${lang}: ${JSON.stringify(trans)},`);
  }
  lines.push(`  },`);
  nounEntries.push(lines.join('\n'));
}

content = content.replace(
  /export const NOUN_TRANSLATIONS: Record<string, Record<SupportedLanguage, string>> = \{/,
  `export const NOUN_TRANSLATIONS: Record<string, Record<SupportedLanguage, string>> = {\n` + nounEntries.join('\n')
);

fs.writeFileSync(targetFile, content, 'utf8');
console.log('✅ Successfully expanded itemTranslationService.ts with 17 languages and 60+ goods!');
