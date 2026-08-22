const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'src', 'lib', 'i18n', 'locales');

const NEW_KEYS = {
  nav_platform_slogan: {
    ko: '대한민국 No.1 외국인 근로자 종합 플랫폼',
    vi: 'Nền tảng việc làm & đồ cũ số 1 Hàn Quốc cho người nước ngoài',
    zh: '韩国第一外籍劳工综合生活服务平台',
    en: 'No.1 Comprehensive Platform for Foreign Workers in Korea',
    ja: '韓国No.1外国人労働者総合プラットフォーム',
    ru: 'Платформа №1 в Корее для иностранных работников',
    th: 'แพลตฟอร์มครบวงจรอันดับ 1 สำหรับแรงงานต่างชาติในเกาหลี',
    uz: 'Koreyadagi chet ellik ishchilar uchun 1-raqamli platforma',
    km: 'វេទិកាពេញលេញលេខ ១ សម្រាប់ពលករបរទេសនៅកូរ៉េ',
    mn: 'Солонгос дахь гадаад ажилчдын №1 нэгдсэн платформ',
    ne: 'कोरियामा विदेशी कामदारहरूको लागि नम्बर १ प्लेटफर्म',
    id: 'Platform Terlengkap No.1 untuk Pekerja Asing di Korea',
    my: 'ကိုရီးယားနိုင်ငံရှိ နိုင်ငံခြားသားအလုပ်သမားများအတွက် နံပါတ် ၁ ပလက်ဖောင်း',
    si: 'කොරියාවේ විදේශීය සේවකයින් සඳහා අංක 1 වේදිකාව',
    kk: 'Кореядағы шетелдік жұмысшыларға арналған №1 платформа',
    bn: 'কোরিয়ায় বিদেশী কর্মীদের জন্য ১ নম্বর প্ল্যাটফর্ম',
    ur: 'کوریا میں غیر ملکی کارکنوں کے لیے نمبر 1 پلیٹ فارم',
  },
  nav_signup: {
    ko: '회원가입',
    vi: 'Đăng ký',
    zh: '注册账号',
    en: 'Sign Up',
    ja: '新規登録',
    ru: 'Регистрация',
    th: 'สมัครสมาชิก',
    uz: 'Ro‘yxatdan o‘tish',
    km: 'ចុះឈ្មោះ',
    mn: 'Бүртгүүлэх',
    ne: 'दर्ता गर्नुहोस्',
    id: 'Daftar',
    my: 'အကောင့်ဖွင့်ရန်',
    si: 'ලියාපදිංචි වන්න',
    kk: 'Тіркелу',
    bn: 'নিবন্ধন করুন',
    ur: 'سائن اپ',
  },
  nav_mypage: {
    ko: '마이',
    vi: 'Cá nhân',
    zh: '我的',
    en: 'My Page',
    ja: 'マイページ',
    ru: 'Мой профиль',
    th: 'ของฉัน',
    uz: 'Profilim',
    km: 'គណនីខ្ញុំ',
    mn: 'Миний',
    ne: 'मेरो प्रोफाइल',
    id: 'Profil',
    my: 'ကျွန်ုပ်၏အကောင့်',
    si: 'මගේ ගිණුම',
    kk: 'Менің парақшам',
    bn: 'আমার প্রোফাইল',
    ur: 'میرا اکاؤنٹ',
  },
  nav_community: {
    ko: '동네생활 & 쉼터',
    vi: 'Đời sống & Giao lưu',
    zh: '同城生活与社区',
    en: 'Community & Lounge',
    ja: 'ご近所生活＆ラウンジ',
    ru: 'Сообщество и отдых',
    th: 'ชุมชนและพูดคุย',
    uz: 'Jamiyat va Muloqot',
    km: 'សហគមន៍ & ការជួបជុំ',
    mn: 'Нийгэмлэг ба амралт',
    ne: 'समुदाय र लाउन्ज',
    id: 'Komunitas & Ruang Santai',
    my: 'အသိုင်းအဝိုင်းနှင့် စကားပြောခန်း',
    si: 'ප්‍රජාව සහ විවේකාගාරය',
    kk: 'Қоғамдастық және демалыс',
    bn: 'কমিউনিটি ও লাউঞ্জ',
    ur: 'کمیونٹی اور لاؤنج',
  },
  meetup_zone_title: {
    ko: '주요 공단 도보 직거래 (Meetup Zone)',
    vi: 'Giao dịch trực tiếp KCN (Khu vực gặp mặt)',
    zh: '重点工业园区步行面交专区 (Meetup Zone)',
    en: 'Industrial Complex Walk-up Deal Zone',
    ja: '主要工団 徒歩手渡しエリア (Meetup Zone)',
    ru: 'Пешая зона сделок в промзонах (Meetup Zone)',
    th: 'โซนซื้อขายตรงในนิคมอุตสาหกรรม (Meetup Zone)',
    uz: 'Sanoat zonalari to‘g‘ridan-to‘g‘ri savdo hududi',
    km: 'តំបន់ជួញដូរផ្ទាល់ក្នុងតំបន់ឧស្សាហកម្ម',
    mn: 'Үйлдвэрийн бүсийн биечлэн уулзах цэг',
    ne: 'औद्योगिक क्षेत्र प्रत्यक्ष कारोबार क्षेत्र',
    id: 'Zona COD Kawasan Industri (Meetup Zone)',
    my: 'စက်မှုဇုန် တိုက်ရိုက်အရောင်းအဝယ်ဇုန်',
    si: 'කාර්මික කලාප සෘජු ගනුදෙනු කලාපය',
    kk: 'Өндірістік аймақтардағы тікелей сауда аймағы',
    bn: 'শিল্পাঞ্চল সরাসরি লেনদেন অঞ্চল',
    ur: 'صنعتی زون میں براہ راست لین دین کا علاقہ',
  },
  post_short_btn: {
    ko: '등록',
    vi: 'Đăng tin',
    zh: '发布',
    en: 'Post',
    ja: '出品',
    ru: 'Подать',
    th: 'ลงขาย',
    uz: 'Joylash',
    km: 'បង្ហោះ',
    mn: 'Нийтлэх',
    ne: 'पोष्ट',
    id: 'Pasang',
    my: 'တင်မည်',
    si: 'පළ කරන්න',
    kk: 'Жариялау',
    bn: 'পোস্ট',
    ur: 'پوسٹ',
  },
};

const ALL_LANGS = [
  'ko', 'vi', 'zh', 'en', 'ja', 'ru', 'th', 'uz',
  'km', 'mn', 'ne', 'id', 'my', 'si', 'kk', 'bn', 'ur'
];

for (const lang of ALL_LANGS) {
  const filePath = path.join(localesDir, `${lang}.ts`);
  let content = fs.readFileSync(filePath, 'utf8');

  for (const [key, map] of Object.entries(NEW_KEYS)) {
    if (!content.includes(`${key}:`)) {
      const val = map[lang] || map.en || map.ko;
      // 끝나는 괄호 바로 앞에 삽입
      content = content.replace(/\n\s*};\s*$/, `,\n  ${key}: '${val}',\n};\n`);
    }
  }
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ [${lang.toUpperCase()}] 딕셔너리 확장 완료`);
}
