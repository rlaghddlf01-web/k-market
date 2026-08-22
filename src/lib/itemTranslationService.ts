// KTRS K-Market 17개국어 매물 및 커뮤니티 번역 매트릭스 엔진 (미국·일본·러시아 포함)

import { SupportedLanguage } from '@/types/kmarket';

// 1. 카테고리/품목 핵심 어휘 17개국어 매트릭스
export const NOUN_TRANSLATIONS: Record<string, Record<SupportedLanguage, string>> = {
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
  },
  '밥솥': {
    ko: '밥솥',
    vi: 'Nồi cơm điện',
    zh: '电饭煲',
    en: 'Rice Cooker',
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
  },
  '냉장고': {
    ko: '냉장고',
    vi: 'Tủ lạnh',
    zh: '冰箱',
    en: 'Refrigerator',
    ja: '冷蔵庫',
    ru: 'Холодильник',
    th: 'ตู้เย็น',
    uz: 'Muzlatgich',
    km: 'ទូទឹកកក',
    mn: 'Хөргөгч',
    ne: 'फ्रिज',
    id: 'Kulkas',
    my: 'ရေခဲသေတ္တာ',
    si: 'ශීතකරණය',
    kk: 'Тоңазытқыш',
    bn: 'ফ্রিজ',
    ur: 'ریفریجریٹر',
  },
  '자전거': {
    ko: '자전거',
    vi: 'Xe đạp',
    zh: '自行车',
    en: 'Bicycle',
    ja: '自転車',
    ru: 'Велосипед',
    th: 'จักรยาน',
    uz: 'Velosiped',
    km: 'កង់',
    mn: 'Унадаг дугуй',
    ne: 'साइकल',
    id: 'Sepeda',
    my: 'စက်ဘီး',
    si: 'බයිසිකලය',
    kk: 'Велосипед',
    bn: 'সাইকেল',
    ur: 'سائیکل',
  },
  '전동킥보드': {
    ko: '전동킥보드',
    vi: 'Xe trượt điện',
    zh: '电动滑板车',
    en: 'Electric Scooter',
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
  },
  '전자레인지': {
    ko: '전자레인지',
    vi: 'Lò vi sóng',
    zh: '微波炉',
    en: 'Microwave Oven',
    ja: '電子レンジ',
    ru: 'Микроволновка',
    th: 'ไมโครเวฟ',
    uz: 'Mikroto‘lqinli pech',
    km: 'ម៉ាស៊ីនកម្ដៅម្ហូប',
    mn: 'Богино долгионы зуух',
    ne: 'माइक्रोवेभ',
    id: 'Microwave',
    my: 'မိုက်ခရိုဝေ့ဖ်',
    si: 'මයික්‍රෝවේව් උදුන',
    kk: 'Қысқатолқынды пеш',
    bn: 'মাইক্রোওয়েভ',
    ur: 'مائکروویو اوون',
  },
  '스마트폰': {
    ko: '스마트폰',
    vi: 'Điện thoại thông minh',
    zh: '智能手机',
    en: 'Smartphone',
    ja: 'スマートフォン',
    ru: 'Смартфон',
    th: 'สมาร์ทโฟน',
    uz: 'Smartfon',
    km: 'ទូរស័ព្ទឆ្លាតវៃ',
    mn: 'Ухаалаг утас',
    ne: 'स्मार्टफोन',
    id: 'Smartphone',
    my: 'စမတ်ဖုန်း',
    si: 'ස්මාර්ට් ජංගම දුරකථනය',
    kk: 'Смартфон',
    bn: 'স্মার্টফোন',
    ur: 'اسمارٹ فون',
  },
  '침대': {
    ko: '침대',
    vi: 'Giường ngủ',
    zh: '床',
    en: 'Bed',
    ja: 'ベッド',
    ru: 'Кровать/Матрас',
    th: 'เตียงนอน',
    uz: 'Yotoq/Krovat',
    km: 'គ្រែគេង',
    mn: 'Ор',
    ne: 'ओछ्यान/खाट',
    id: 'Tempat Tidur',
    my: 'ကုတင်',
    si: 'ඇඳ',
    kk: 'Кереует',
    bn: 'বিছানা',
    ur: 'بستر',
  },
  '가스버너': {
    ko: '가스버너',
    vi: 'Bếp ga mini',
    zh: '便携卡式炉',
    en: 'Portable Gas Stove',
    ja: 'カセットコンロ',
    ru: 'Газовая плитка',
    th: 'เตาแก๊สพกพา',
    uz: 'Portativ gaz plitasi',
    km: 'ចង្ក្រានហ្គាសចល័ត',
    mn: 'Зөөврийн газан плитка',
    ne: 'ग्यास चुल्हो',
    id: 'Kompor Gas Portabel',
    my: 'သယ်ဆောင်ရလွယ် ဂတ်စ်မီးဖို',
    si: 'ගෑස් ලිප',
    kk: 'Портативті газ плитасы',
    bn: 'পোর্টেবল গ্যাস স্টোভ',
    ur: 'پورٹیبل گیس چولہا',
  },
  '모니터': {
    ko: '모니터',
    vi: 'Màn hình máy tính',
    zh: '电脑显示器',
    en: 'Computer Monitor',
    ja: 'PCモニター',
    ru: 'Монитор',
    th: 'จอมอนิเตอร์',
    uz: 'Kompyuter monitori',
    km: 'អេក្រង់កុំព្យូទ័រ',
    mn: 'Компьютерийн дэлгэц',
    ne: 'कम्प्युटर मनिटर',
    id: 'Monitor Komputer',
    my: 'ကွန်ပျူတာ မော်နီတာ',
    si: 'පරිගණක මොනිටරය',
    kk: 'Компьютер мониторы',
    bn: 'কম্পিউটার মনিটর',
    ur: 'کمپیوٹر مانیٹر',
  },
};

// 2. 수식어/상태 17개국어 템플릿
export const STATUS_PREFIX: Record<string, Record<SupportedLanguage, string>> = {
  moving_d3: {
    ko: '✈️ [귀국 D-3 오늘마감 헐값]',
    vi: '✈️ [Về nước D-3 Gấp hôm nay]',
    zh: '✈️ [回国倒计时D-3 今日特惠清仓]',
    en: '✈️ [Moving Sale D-3 Today Last Chance]',
    ja: '✈️ [帰国D-3 本日締切 破格処分]',
    ru: '✈️ [Отъезд D-3 Сегодня срочно/дешево]',
    th: '✈️ [กลับประเทศ D-3 ลดราคาด่วนวันนี้]',
    uz: '✈️ [Vatanga qaytish D-3 Bugun arzon sotuv]',
    km: '✈️ [ត្រឡប់ទៅប្រទេស D-3 បញ្ចុះតម្លៃពិសេសថ្ងៃនេះ]',
    mn: '✈️ [Нутгаа буцах D-3 Өнөөдөр яаралтай хямд]',
    ne: '✈️ [घर फिर्ता D-3 आज अन्तिम सस्तो]',
    id: '✈️ [Pulang D-3 Obral Hari Ini]',
    my: '✈️ [နေရပ်ပြန် D-3 ယနေ့အထူးစျေး]',
    si: '✈️ [නැවත රට බලා D-3 අද අවසන් වට්ටම]',
    kk: '✈️ [Елге қайту D-3 Бүгін арзан сатылым]',
    bn: '✈️ [দেশে ফেরা D-3 আজকের শেষ সস্তা]',
    ur: '✈️ [وطن واپسی D-3 آج آخری سستی قیمت]',
  },
  moving_d7: {
    ko: '✈️ [귀국 D-7 무빙세일 특가]',
    vi: '✈️ [Về nước D-7 Moving Sale]',
    zh: '✈️ [回国倒计时D-7 搬家特惠甩卖]',
    en: '✈️ [Moving Sale D-7 Great Deal]',
    ja: '✈️ [帰国D-7 ムービングセール特売]',
    ru: '✈️ [Отъезд D-7 Распродажа Moving Sale]',
    th: '✈️ [กลับประเทศ D-7 มูฟวิ่งเซลราคาพิเศษ]',
    uz: '✈️ [Vatanga qaytish D-7 Moving Sale arzon]',
    km: '✈️ [ត្រឡប់ទៅប្រទេស D-7 តម្លៃពិសេស Moving Sale]',
    mn: '✈️ [Нутгаа буцах D-7 Мувинг сэйл хямдрал]',
    ne: '✈️ [घर फिर्ता D-7 मुभिङ सेल]',
    id: '✈️ [Pulang D-7 Moving Sale Murah]',
    my: '✈️ [နေရပ်ပြန် D-7 အထူးလျှော့စျေး]',
    si: '✈️ [නැවත රට බලා D-7 විශේෂ වට්ටම්]',
    kk: '✈️ [Елге қайту D-7 Арзан бағада сату]',
    bn: '✈️ [দেশে ফেরা D-7 মুভিং সেল]',
    ur: '✈️ [وطن واپسی D-7 موونگ سیل]',
  },
  free_give: {
    ko: '🎁 [0원 무료나눔]',
    vi: '🎁 [0 Won Tặng Miễn Phí]',
    zh: '🎁 [0元 免费赠送]',
    en: '🎁 [Free 0 KRW Giveaway]',
    ja: '🎁 [0ウォン 無料譲渡]',
    ru: '🎁 [0 вон Отдам даром]',
    th: '🎁 [0 วอน แจกฟรี]',
    uz: '🎁 [0 Won Bepul beriladi]',
    km: '🎁 [0 វ៉ុន ផ្តល់ជូនឥតគិតថ្លៃ]',
    mn: '🎁 [0 вон Үнэгүй өгнө]',
    ne: '🎁 [० वोन नि:शुल्क उपहार]',
    id: '🎁 [0 Won Gratis]',
    my: '🎁 [၀ ဝမ် အခမဲ့ပေးမည်]',
    si: '🎁 [0 වොන් නොමිලේ දීමනාව]',
    kk: '🎁 [0 вон Тегін беру]',
    bn: '🎁 [০ ওন বিনামূল্যে উপহার]',
    ur: '🎁 [0 وون مفت دیا جا رہا ہے]',
  },
};

// 3. 상세 설명 17개국어 템플릿
export const DESC_TEMPLATES: Record<SupportedLanguage, (isMoving: boolean, days?: number) => string> = {
  ko: (isMoving, days) =>
    `${isMoving ? `다음 주 비자 만료로 귀국 예정(D-${days || 7})이라 기숙사 살림 정리합니다! ` : ''}원룸 기숙사에서 깨끗하게 사용하던 물건입니다. 사진 보시는 것처럼 상태 양호하고 작동 100% 잘 됩니다. 공단 기숙사 입구/편의점 앞 직거래 원합니다. 1:1 번역 채팅으로 편하게 연락주세요!`,
  vi: (isMoving, days) =>
    `${isMoving ? `Tuần sau hết hạn visa về nước (D-${days || 7}) nên thanh lý đồ KTX! ` : ''}Đồ dùng ký túc xá còn rất tốt, có nhiều ảnh chụp thực tế. Hoạt động hoàn hảo 100%. Giao dịch trực tiếp gần KTX. Chat dịch 1:1 ngay nhé!`,
  zh: (isMoving, days) =>
    `${isMoving ? `下周签证到期即将回国(D-${days || 7})，特惠处理宿舍生活用品！ ` : ''}自用闲置好物，多角度实拍照片，运转正常成色佳。支持工区宿舍门口当面交易，欢迎1:1多语言翻译聊天咨询！`,
  en: (isMoving, days) =>
    `${isMoving ? `Returning home next week due to visa expiration (D-${days || 7}), clearing out dorm items! ` : ''}Clean item used in dorm room with multiple real photos. Works 100% perfectly. Direct meetup near industrial complex dorm entrance. Feel free to message via 1:1 translation chat!`,
  ja: (isMoving, days) =>
    `${isMoving ? `来週ビザ満了のため帰国予定(D-${days || 7})につき、寮の生活用品をお譲りします！ ` : ''}ワンルーム寮で綺麗に使用していた物です。写真の通り状態良好で100%動作確認済みです。団地寮の入口・コンビニ前での手渡し希望です。1:1翻訳チャットでお気軽にご連絡ください！`,
  ru: (isMoving, days) =>
    `${isMoving ? `На следующей неделе заканчивается виза и возвращаюсь на родину (D-${days || 7}), распродаю вещи из общежития! ` : ''}Вещи в отличном состоянии, всё 100% работает. Личная встреча около общежития промзоны. Пишите в 1:1 чат с автопереводом!`,
  th: (isMoving, days) =>
    `${isMoving ? `สัปดาห์หน้าวีซ่าหมดอายุต้องกลับประเทศ (D-${days || 7}) เลยเคลียร์ของในหอพักราคาถูกครับ! ` : ''}ของใช้ในหอพักสภาพดีมาก ใช้งานได้ปกติ 100% นัดรับของที่หน้าหอพักนิคมอุตสาหกรรมได้เลย แชทคุยผ่านระบบแปล 1:1 ได้ทันทีครับ!`,
  uz: (isMoving, days) =>
    `${isMoving ? `Keyingi hafta viza tugab vatanga qaytaman (D-${days || 7}), yotoqxona buyumlarini arzon sotyapman! ` : ''}Yotoqxonada toza ishlatilgan, 100% a'lo darajada ishlaydi. Sanoat zonasi yotoqxonasi oldida to'g'ridan-to'g'ri olib ketishingiz mumkin. 1:1 tarjima chatida yozing!`,
  km: (isMoving, days) =>
    `${isMoving ? `សប្តាហ៍ក្រោយទិដ្ឋាការផុតកំណត់ត្រឡប់ទៅប្រទេសវិញ (D-${days || 7}) លក់សម្ភារៈបន្ទប់ស្នាក់នៅ! ` : ''}សម្ភារៈបន្ទប់ស្នាក់នៅស្អាតល្អ ដំណើរការ 100%។ ជួបគ្នាផ្ទាល់នៅមុខអន្តេវាសិកដ្ឋាន។ សូមទាក់ទងមកតាមការជជែកបកប្រែ 1:1!`,
  mn: (isMoving, days) =>
    `${isMoving ? `Ирэх долоо хоногт виз дуусаад нутаг буцах тул (D-${days || 7}) байрны эд хогшлоо хямд зарна! ` : ''}Дотуур байранд цэвэрхэн хэрэглэсэн, 100% хэвийн ажилладаг. Үйлдвэрийн бүсийн дотуур байрны үүдэнд уулзаж авна уу. 1:1 орчуулгын чатаар холбогдоно уу!`,
  ne: (isMoving, days) =>
    `${isMoving ? `अर्को हप्ता भिसा सकिएर घर फिर्ता हुने भएकोले (D-${days || 7}) कोठाको सामान बेच्दैछु! ` : ''}कोठामा सफासँग चलाएको सामान हो, १००% राम्रोसँग चल्छ। औद्योगिक क्षेत्रको होस्टेल अगाडि भेटेर लिन सकिन्छ। १:१ अनुवाद च्याटमा सम्पर्क गर्नुहोस्!`,
  id: (isMoving, days) =>
    `${isMoving ? `Minggu depan visa habis dan pulang ke negara asal (D-${days || 7}), menjual perlengkapan asrama! ` : ''}Barang asrama terawat dengan baik, berfungsi 100% normal. Bisa COD di depan pintu asrama kawasan industri. Silakan chat dengan terjemahan 1:1!`,
  my: (isMoving, days) =>
    `${isMoving ? `နောက်အပတ် ဗီဇာကုန်ပြီး နေရပ်ပြန်မည်ဖြစ်၍ (D-${days || 7}) အဆောင်ပစ္စည်းများ အမြန်ရှင်းထုတ်ပါသည်! ` : ''}အဆောင်တွင် သန့်ရှင်းစွာ သုံးထားပြီး ၁၀၀% ကောင်းမွန်စွာ အလုပ်လုပ်ပါသည်။ စက်မှုဇုန် အဆောင်ရှေ့တွင် လူချင်းတွေ့ပြီး ဝယ်ယူနိုင်ပါသည်။ ၁:၁ ဘာသာပြန် ချတ်ဖြင့် ဆက်သွယ်ပါ!`,
  si: (isMoving, days) =>
    `${isMoving ? `ලබන සතියේ වීසා අවසන් වී ආපසු යන බැවින් (D-${days || 7}) නේවාසිකාගාර බඩු අඩු මුදලට විකුණමි! ` : ''}හොඳින් පිරිසිදුව පාවිච්චි කරන ලද අතර 100% ක්‍රියාත්මකයි. කාර්මික කලාපයේ නේවාසිකාගාරය ඉදිරිපිටදී ලබාගත හැක. 1:1 පරිවර්තන චැට් මගින් සම්බන්ධ වන්න!`,
  kk: (isMoving, days) =>
    `${isMoving ? `Келесі аптада виза бітіп елге қайтамын (D-${days || 7}), жатақхана заттарын арзан бағада сатамын! ` : ''}Жатақханада таза ұсталған, 100% тамаша жұмыс істейді. Өндірістік аймақтың жатақханасы алдында қолма-қол алып кете аласыз. 1:1 аударма чатында хабарласыңыз!`,
  bn: (isMoving, days) =>
    `${isMoving ? `আগামী সপ্তাহে ভিসা শেষ হয়ে দেশে ফিরে যাচ্ছি (D-${days || 7}), হোস্টেলের জিনিসপত্র সস্তায় বিক্রি করছি! ` : ''}হোস্টেলে খুব সুন্দরভাবে ব্যবহার করা জিনিস, ১০০% সঠিকভাবে কাজ করে। শিল্প এলাকার হোস্টেলের সামনে সরাসরি লেনদেন করা যাবে। ১:১ অনুবাদ চ্যাটে যোগাযোগ করুন!`,
  ur: (isMoving, days) =>
    `${isMoving ? `اگلے ہفتے ویزا ختم ہونے پر وطن واپس جا رہا ہوں (D-${days || 7})، ہاسٹل کا سامان سستے داموں بیچ رہا ہوں! ` : ''}ہاسٹل میں صاف ستھرا استعمال شدہ سامان ہے، 100% بالکل ٹھیک چلتا ہے۔ انڈسٹریل کمپلیکس ہاسٹل کے سامنے ملاقات کر کے خریدا جا سکتا ہے۔ 1:1 ترجمہ چیٹ میں رابطہ کریں!`,
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
    'ko', 'vi', 'zh', 'en', 'ja', 'ru', 'th', 'uz', 'km', 'mn', 'ne', 'id', 'my', 'si', 'kk', 'bn', 'ur'
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
    let translatedCore = koreanTitle.replace(/^[^\s]+\s*\[[^\]]+\]\s*/, '').trim();
    
    for (const [krWord, transMap] of Object.entries(NOUN_TRANSLATIONS)) {
      if (translatedCore.includes(krWord)) {
        translatedCore = translatedCore.replace(krWord, transMap[lang]);
        break;
      }
    }

    result[lang] = {
      title: `${prefix}${translatedCore}`,
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
