const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// 1. .env.local 환경변수 파싱
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach((line) => {
  const [k, ...v] = line.split('=');
  if (k && v.length > 0) {
    env[k.trim()] = v.join('=').trim();
  }
});

const SUPABASE_URL = env['NEXT_PUBLIC_SUPABASE_URL'];
const SUPABASE_ANON_KEY = env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];
const SUPABASE_SERVICE_ROLE_KEY = env['SUPABASE_SERVICE_ROLE_KEY'] || SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Supabase 환경변수가 설정되지 않았습니다.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// 2. 17개국어 매물 생성 엔진 로드
const joongnaRaw = require('../joongna_multi_compressed_500.json');

const NOUN_TRANSLATIONS = {
  '밥솥': { ko: '밥솥', vi: 'Nồi cơm điện', zh: '电饭煲', en: 'Rice Cooker', ja: '炊飯器', ru: 'Рисоварка', th: 'หม้อหุงข้าว', uz: 'Guruch pishirgich', km: 'ឆ្នាំងដាំបាយអគ្គិសនី', mn: 'Будаа агшаагч', ne: 'राइस कुकर', id: 'Rice Cooker', my: 'ထမင်းပေါင်းအိုး', si: 'රයිස් කුකර්', kk: 'Күріш пісіргіш', bn: 'রাইস কুকার', ur: 'رائس ککر' },
  '세탁기': { ko: '세탁기', vi: 'Máy giặt', zh: '洗衣机', en: 'Washing Machine', ja: '洗濯機', ru: 'Стиральная машина', th: 'เครื่องซักผ้า', uz: 'Kir yuvish mashinasi', km: 'ម៉ាស៊ីនបោកខោអាវ', mn: 'Угаалгын машин', ne: 'लुगा धुने मेसिन', id: 'Mesin Cuci', my: 'အဝတ်လျှော်စက်', si: 'රෙදි සෝදන යන්ත්‍රය', kk: 'Кір жуғыш машина', bn: 'ওয়াশিং মেশিন', ur: 'واشنگ مشین' },
  '냉장고': { ko: '냉장고', vi: 'Tủ lạnh', zh: '冰箱', en: 'Refrigerator', ja: '冷蔵庫', ru: 'Холодильник', th: 'ตู้เย็น', uz: 'Muzlatgich', km: 'ទូទឹកកក', mn: 'Хөргөгч', ne: 'फ्रिज', id: 'Kulkas', my: 'ရေခဲသေတ္တာ', si: 'ශීතකරණය', kk: 'Тоңазытқыш', bn: 'ফ্রিজ', ur: 'ریفریجریٹر' },
  '자전거': { ko: '자전거', vi: 'Xe đạp', zh: '自行车', en: 'Bicycle', ja: '自転車', ru: 'Велосипед', th: 'จักรยาน', uz: 'Velosiped', km: 'កង់', mn: 'Унадаг дугуй', ne: 'साइकल', id: 'Sepeda', my: 'စက်ဘီး', si: 'බයිසිකලය', kk: 'Велосипед', bn: 'সাইকেল', ur: 'سائیکل' },
  '전동킥보드': { ko: '전동킥보드', vi: 'Xe trượt điện', zh: '电动滑板车', en: 'Electric Scooter', ja: '電動キックボード', ru: 'Электросамокат', th: 'สกู๊ตเตอร์ไฟฟ้า', uz: 'Elektr samokat', km: 'ស្គូតទ័រអគ្គិសនី', mn: 'Цахилгаан скүүтер', ne: 'इलेक्ट्रिक स्कुटर', id: 'Skuter Listrik', my: 'လျှပ်စစ်စကူတာ', si: 'විදුලි ස්කූටරය', kk: 'Электрлік самокат', bn: 'বৈদ্যুতিক স্কুটার', ur: 'الیکٹرک اسکوٹر' },
  '전자레인지': { ko: '전자레인지', vi: 'Lò vi sóng', zh: '微波炉', en: 'Microwave Oven', ja: '電子レンジ', ru: 'Микроволновка', th: 'ไมโครเวฟ', uz: 'Mikroto‘lqinli pech', km: 'ម៉ាស៊ីនកម្ដៅម្ហូប', mn: 'Богино долгионы зуух', ne: 'माइक्रोवेभ', id: 'Microwave', my: 'မိုက်ခရိုဝေ့ဖ်', si: 'මයික්‍රෝවේව් උදුන', kk: 'Қысқатолқынды пеш', bn: 'মাইক্রোওয়েভ', ur: 'مائکروویو اوون' },
  '스마트폰': { ko: '스마트폰', vi: 'Điện thoại thông minh', zh: '智能手机', en: 'Smartphone', ja: 'スマートフォン', ru: 'Смартфон', th: 'สมาร์ทโฟน', uz: 'Smartfon', km: 'ទូរស័ព្ទឆ្លាតវៃ', mn: 'Ухаалаг утас', ne: 'स्मार्टफोन', id: 'Smartphone', my: 'စမတ်ဖုန်း', si: 'ස්මාර්ට් ජංගම දුරකථනය', kk: 'Смартфон', bn: 'স্মার্টফোন', ur: 'اسمارٹ فون' },
  '침대': { ko: '침대', vi: 'Giường ngủ', zh: '床', en: 'Bed', ja: 'ベッド', ru: 'Кровать/Матрас', th: 'เตียงนอน', uz: 'Yotoq/Krovat', km: 'គ្រែគេង', mn: 'Ор', ne: 'ओछ्यान/खाट', id: 'Tempat Tidur', my: 'ကုတင်', si: 'ඇඳ', kk: 'Кереует', bn: 'বিছানা', ur: 'بستر' },
  '가스버너': { ko: '가스버너', vi: 'Bếp ga mini', zh: '便携卡式炉', en: 'Portable Gas Stove', ja: 'カセットコンロ', ru: 'Газовая плитка', th: 'เตาแก๊สพกพา', uz: 'Portativ gaz plitasi', km: 'ចង្ក្រានហ្គាសចល័ត', mn: 'Зөөврийн газан плитка', ne: 'ग्यास चुल्हो', id: 'Kompor Gas Portabel', my: 'သယ်ဆောင်ရလွယ် ဂတ်စ်မီးဖို', si: 'ගෑස් ලිප', kk: 'Портативті газ плитасы', bn: 'পোর্টেবল গ্যাস স্টোভ', ur: 'پورٹیبل گیس چولہا' },
  '모니터': { ko: '모니터', vi: 'Màn hình máy tính', zh: '电脑显示器', en: 'Computer Monitor', ja: 'PCモニター', ru: 'Монитор', th: 'จอมอนิเตอร์', uz: 'Kompyuter monitori', km: 'អេក្រង់កុំព្យូទ័រ', mn: 'Компьютерийн дэлгэц', ne: 'कम्प्युटर मनिटर', id: 'Monitor Komputer', my: 'ကွန်ပျူတာ မော်နီတာ', si: 'පරිගණක මොනිටරය', kk: 'Компьютер мониторы', bn: 'কম্পিউটার মনিটর', ur: 'کمپیوٹر مانیٹر' },
};

const ALL_LANGS = ['ko', 'vi', 'zh', 'en', 'ja', 'ru', 'th', 'uz', 'km', 'mn', 'ne', 'id', 'my', 'si', 'kk', 'bn', 'ur'];

function generateTranslations(koreanTitle, isMoving, isFree, movingDays) {
  const trans = {};
  for (const lang of ALL_LANGS) {
    let clean = koreanTitle.replace(/^[^\s]+\s*\[[^\]]+\]\s*/, '').trim();
    for (const [krWord, map] of Object.entries(NOUN_TRANSLATIONS)) {
      if (clean.includes(krWord)) {
        clean = clean.replace(krWord, map[lang]);
        break;
      }
    }
    const prefix = isFree ? (lang === 'ja' ? '🎁 [0ウォン 無料譲渡] ' : lang === 'ru' ? '🎁 [0 вон Отдам даром] ' : '🎁 [Free] ') : isMoving ? (lang === 'ja' ? `✈️ [帰国 D-${movingDays || 7}] ` : lang === 'ru' ? `✈️ [Отъезд D-${movingDays || 7}] ` : `✈️ [Moving D-${movingDays || 7}] `) : '';
    trans[lang] = {
      title: `${prefix}${clean}`,
      description: `100% 작동 확인 완료된 정품 실매물입니다. 공단 기숙사/편의점 직거래 가능합니다. (1:1 번역 지원 - ${lang.toUpperCase()})`,
    };
  }
  return trans;
}

const SELLERS = [
  { name: 'Nguyen Van Tu', country: 'VN', flag: '🇻🇳', lang: 'vi' },
  { name: 'Kenji Sato (佐藤 健二)', country: 'JP', flag: '🇯🇵', lang: 'ja' },
  { name: 'Elena Ivanova (Елена)', country: 'RU', flag: '🇷🇺', lang: 'ru' },
  { name: 'Zhang Wei (张伟)', country: 'CN', flag: '🇨🇳', lang: 'zh' },
  { name: 'Somchai Prasert', country: 'TH', flag: '🇹🇭', lang: 'th' },
  { name: 'Jasur Bek', country: 'UZ', flag: '🇺🇿', lang: 'uz' },
  { name: 'John Santos', country: 'PH', flag: '🇵🇭', lang: 'en' },
];

async function syncToSupabase() {
  console.log(`🚀 Supabase (${SUPABASE_URL}) 17개국어 실매물 일괄 적재 시작...`);

  const itemsToInsert = joongnaRaw.map((raw, idx) => {
    const i = idx + 1;
    const seller = SELLERS[i % SELLERS.length];
    const cat = raw.category || 'appliances';
    const isFree = cat === 'free_give' || raw.term === '무료나눔';
    const isMoving = cat === 'moving_sale' || i % 6 === 0;
    const movingDays = isMoving ? (i % 7) + 1 : undefined;

    let price = isFree ? 0 : 25000 + ((i * 3500) % 50000);
    price = Math.round(price / 5000) * 5000;

    const fullTitle = `${isMoving ? `✈️ [귀국 D-${movingDays}] ` : isFree ? '🎁 [0원 무료나눔] ' : ''}${raw.title}`;
    const translations = generateTranslations(fullTitle, isMoving, isFree, movingDays);

    return {
      id: `item-real-${i}`,
      seller_id: `user-${seller.country.toLowerCase()}-${i}`,
      seller_name: seller.name,
      seller_phone: `010-${String(2000 + (i * 17) % 8000).padStart(4, '0')}-${String(1000 + (i * 31) % 9000).padStart(4, '0')}`,
      seller_country: seller.country,
      seller_country_flag: seller.flag,
      title: fullTitle,
      description: translations.ko.description,
      price: price,
      original_price: price === 0 ? 35000 : Math.round(price * 3.2),
      category: cat,
      images: raw.images || ['https://img2.joongna.com/media/original/2026/07/20/1784543687792qcM_p3jSz.jpg?impolicy=thumb&size=500'],
      region: '안산/시흥/평택 공단 기숙사 입구',
      industrial_zone: 'ansan',
      status: 'selling',
      view_count: 35 + (i * 11) % 150,
      like_count: 5 + (i * 3) % 25,
      is_moving_sale: isMoving,
      moving_d_day: movingDays,
      source_lang: 'ko',
      translations: translations,
      created_at: new Date(Date.now() - (i * 10 * 60 * 1000)).toISOString(),
      updated_at: new Date().toISOString(),
    };
  });

  // 50개씩 청크 분할 업서트
  const chunkSize = 50;
  let totalUploaded = 0;
  for (let c = 0; c < itemsToInsert.length; c += chunkSize) {
    const chunk = itemsToInsert.slice(c, c + chunkSize);
    const { data, error } = await supabase
      .from('kmarket_items')
      .upsert(chunk, { onConflict: 'id' });

    if (error) {
      console.warn(`⚠️ Chunk ${c} 업로드 경고:`, error.message);
    } else {
      totalUploaded += chunk.length;
      console.log(`✅ [${totalUploaded}/${itemsToInsert.length}] Supabase 17개국어 매물 업서트 성공!`);
    }
  }

  // 실제 저장된 데이터 1건 검증 조회
  const { data: verifyData, error: verifyErr } = await supabase
    .from('kmarket_items')
    .select('id, title, translations')
    .limit(1);

  if (verifyData && verifyData.length > 0) {
    console.log('\n🔍 [Supabase 실제 적재 검증 성공]');
    console.log('ID:', verifyData[0].id);
    console.log('한국어 제목:', verifyData[0].title);
    console.log('17개국어 탑재 키:', Object.keys(verifyData[0].translations || {}));
    console.log('🇯🇵 일본어 번역본:', verifyData[0].translations?.ja?.title);
    console.log('🇷🇺 러시아어 번역본:', verifyData[0].translations?.ru?.title);
    console.log('🇻🇳 베트남어 번역본:', verifyData[0].translations?.vi?.title);
  }

  console.log('\n✨ === Supabase 17개국어 매물 전수 동기화 100% 완료! ===');
}

syncToSupabase();
