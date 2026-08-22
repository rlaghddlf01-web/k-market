// K-Market 15개국어 사기 방지 긴급 개입 사전
import { LanguageCode } from '@/types/kmarket';

export type ScamThreatType = 'prepayment_wire' | 'external_messenger' | 'giftcard_fake_link';

export interface ScamWarningContent {
  title: string;
  description: string;
  actionText: string;
}

// 15개국어 사기 유형별 다국어 경고 문구 매핑
export const SCAM_WARNINGS_I18N: Record<
  ScamThreatType,
  Record<LanguageCode, ScamWarningContent>
> = {
  // 1. 선입금 / 계좌이체 사기 유도 (최고 위험도)
  prepayment_wire: {
    ko: {
      title: '🚨 [선입금 사기 강력 주의] 절대 돈을 먼저 송금하지 마세요!',
      description: '물건을 직접 만나 확인하기 전에 계좌이체나 계약금을 요구하는 것은 100% 사기 수법입니다. 반드시 직거래 현장에서 확인 후 대금을 지급하세요.',
      actionText: '공단 직거래 원칙 준수',
    },
    vi: {
      title: '🚨 [CẢNH BÁO LỪA ĐẢO] Tuyệt đối KHÔNG chuyển tiền trước!',
      description: 'Yêu cầu chuyển khoản, đặt cọc trước khi gặp mặt trực tiếp là 100% lừa đảo. Chỉ thanh toán sau khi đã kiểm tra đồ tận mắt tại điểm hẹn.',
      actionText: 'Giao dịch trực tiếp an toàn',
    },
    th: {
      title: '🚨 [คำเตือนการฉ้อโกง] อย่าโอนเงินก่อนโดยเด็ดขาด!',
      description: 'การขอให้โอนเงินหรือมัดจำก่อนพบกันเป็นการหลอกลวง 100% โปรดตรวจสอบสินค้าด้วยตนเองก่อนจ่ายเงินเสมอ',
      actionText: 'นัดรับของตรงหน้าเท่านั้น',
    },
    mn: {
      title: '🚨 [СЭРЭМЖЛҮҮЛЭГ] Урьдчилгаа төлбөр бүү шилжүүлээрэй!',
      description: 'Уулзахаас өмнө дансаар мөнгө шилжүүлэх эсвэл урьдчилгаа нэхэх нь 100% залилангийн арга юм. Заавал биечлэн шалгаж мөнгөө өгнө үү.',
      actionText: 'Биечлэн уулзаж наймаалцах',
    },
    uz: {
      title: '🚨 [OGOHLANTIRISH] Hech qachon oldindan pul oʻtkazmang!',
      description: 'Uchrashishdan oldin pul oʻtkazish yoki zakalat soʻrash 100% firibgarlikdir. Faqat tovar koʻrib tekshirilgandan soʻng toʻlang.',
      actionText: 'Yuzma-yuz xavfsiz savdo',
    },
    ne: {
      title: '🚨 [ठगी चेतावनी] कहिल्यै पहिले पैसा नपठाउनुहोस्!',
      description: 'प्रत्यक्ष भेट्नु अघि बैंक ट्रान्सफर वा धरौटी माग्नु १००% ठगी हो। सामान हातमा परेपछि मात्र पैसा दिनुहोस्।',
      actionText: 'प्रत्यक्ष भेटेर मात्र कारोबार',
    },
    ru: {
      title: '🚨 [ВНИМАНИЕ МОШЕННИКИ] Ни в коем случае не переводите предоплату!',
      description: 'Требование перевести деньги до личной встречи — это 100% мошенничество. Оплачивайте товар только после личной проверки.',
      actionText: 'Личная безопасная сделка',
    },
    tl: {
      title: '🚨 [BABALA SA SCAM] Huwag na huwag magpapadala ng pera nang maaga!',
      description: 'Ang paghingi ng bayad o deposito bago magkita ay 100% panloloko. Magbayad lamang kapag nahawakan at nasuri na ang gamit nang personal.',
      actionText: 'Kaliwaan / Personal na transaksyon',
    },
    id: {
      title: '🚨 [PERINGATAN PENIPUAN] Jangan pernah transfer uang di awal!',
      description: 'Meminta transfer atau DP sebelum bertemu langsung adalah 100% modus penipuan. Bayar hanya setelah memeriksa barang secara langsung.',
      actionText: 'COD / Ketemu langsung',
    },
    my: {
      title: '🚨 [လိမ်လည်မှုသတိပေးချက်] ငွေကြိုမလွှဲပါနှင့်!',
      description: 'လူချင်းမတွေ့မီ ကြိုတင်ငွေလွှဲခိုင်းခြင်းသည် ၁၀၀% လိမ်လည်မှုဖြစ်သည်။ ပစ္စည်းကို ကိုယ်တိုင်စစ်ဆေးပြီးမှသာ ငွေချေပါ။',
      actionText: 'လူချင်းတွေ့ပြီးမှ အရောင်းအဝယ်လုပ်ပါ',
    },
    km: {
      title: '🚨 [ការព្រមានបោកប្រាស់] ដាច់ខាតកុំផ្ទេរប្រាក់មុន!',
      description: 'ការស្នើសុំផ្ទេរប្រាក់ ឬកក់ប្រាក់មុនពេលជួបផ្ទាល់ គឺ១០០% ជាអំពើបោកប្រាស់។ សូមទូទាត់ប្រាក់បន្ទាប់ពីពិនិត្យទំនិញរួចរាល់ប៉ុណ្ណោះ។',
      actionText: 'ជួបផ្ទាល់ដើម្បីសុវត្ថិភាព',
    },
    ja: {
      title: '🚨 [先払い詐欺警告] 絶対に事前送金しないでください！',
      description: '対面で商品を確認する前に口座振込や手付金を要求するのは100%詐欺です。必ず直接対面で商品確認後に支払ってください。',
      actionText: '直接対面取引の原則',
    },
    zh: {
      title: '🚨 [严防先款诈骗] 切勿提前转账付款！',
      description: '在当面验货前要求银行转账或定金的均为100%诈骗。请务必当面确认物品无误后再付款。',
      actionText: '坚持当面安全交易',
    },
    bn: {
      title: '🚨 [প্রতারণা সতর্কতা] ভুলেও আগে টাকা পাঠাবেন না!',
      description: 'সরাসরি দেখা করার আগে টাকা বা অগ্রিম চাওয়া ১০০% প্রতারণা। পণ্য নিজ চোখে দেখে তবেই মূল্য পরিশোধ করুন।',
      actionText: 'সরাসরি লেনদেন করুন',
    },
    en: {
      title: '🚨 [HIGH RISK SCAM ALERT] Never send money or deposit first!',
      description: 'Asking for wire transfer or deposit before meeting in person is 100% fraud. Always inspect the item in person before payment.',
      actionText: 'In-person trade only',
    },
  },

  // 2. 외부 메신저 유도 (카톡, 라인, 텔레그램 탈출)
  external_messenger: {
    ko: {
      title: '⚠️ [외부 메신저 유도 주의] K-Market 채팅방을 벗어나지 마세요!',
      description: '카카오톡, 라인, 텔레그램 등으로 유도하여 사기 피해를 입히는 사례가 많습니다. 안전을 위해 실시간 번역 채팅 내에서만 대화하세요.',
      actionText: '앱 내 실시간 번역 대화',
    },
    vi: {
      title: '⚠️ [CẢNH BÁO] KHÔNG chuyển sang Zalo, KakaoTalk hay Telegram!',
      description: 'Kẻ lừa đảo thường dụ dỗ sang ứng dụng khác để chiếm đoạt tiền. Hãy chỉ nhắn tin bên trong K-Market để được bảo vệ an toàn.',
      actionText: 'Duy trì nhắn tin trong ứng dụng',
    },
    th: {
      title: '⚠️ [คำเตือน] อย่าเปลี่ยนไปคุยใน LINE หรือแอปอื่น!',
      description: 'มิจฉาชีพมักจะชวนคุยนอกแอปเพื่อหลอกลวง โปรดสนทนาผ่านระบบแปลภาษาใน K-Market เท่านั้นเพื่อความปลอดภัย',
      actionText: 'แชทในแอป K-Market เท่านั้น',
    },
    mn: {
      title: '⚠️ [АНХААРУУЛГА] KakaoTalk, Telegram руу бүү шилжээрэй!',
      description: 'Залилагчид өөр апп руу уруу татаж залилах тохиолдол их байдаг. Аюулгүй байдлын үүднээс зөвхөн энэ чат дотроо харилцана уу.',
      actionText: 'Апп доторх орчуулгатай чат',
    },
    uz: {
      title: '⚠️ [OGOH BOʻLING] Telegram yoki boshqa messenjerga oʻtmang!',
      description: 'Firibgarlar koʻpincha boshqa dasturlarga chaqirib pulni oʻgʻirlashadi. Faqat K-Market ichidagi tarjimali chatda muloqot qiling.',
      actionText: 'Ilova ichida qoling',
    },
    ne: {
      title: '⚠️ [चेतावनी] काकाओटक वा अन्य बाहिरी एपमा नजानुहोस्!',
      description: 'ठगहरूले बाहिर कुरा गर्न बोलाएर ठगी गर्ने गर्छन्। सुरक्षित रहन K-Market च्याट भित्र मात्र कुरा गर्नुहोस्।',
      actionText: 'यहीँ च्याट गर्नुहोस्',
    },
    ru: {
      title: '⚠️ [ПРЕДУПРЕЖДЕНИЕ] Не переходите в Telegram или WhatsApp!',
      description: 'Мошенники часто уводят жертв в сторонние мессенджеры. Общайтесь только внутри защищенного чата K-Market с автопереводом.',
      actionText: 'Оставайтесь в чате приложения',
    },
    tl: {
      title: '⚠️ [BABALA] Huwag lumipat sa labas na messenger gaya ng KakaoTalk!',
      description: 'Madalas ilipat ng mga scammer ang usapan sa labas upang makapanloko. Manatili sa K-Market chat para sa iyong proteksyon.',
      actionText: 'Manatili sa chat ng app',
    },
    id: {
      title: '⚠️ [PERINGATAN] Jangan berpindah ke WhatsApp atau Telegram!',
      description: 'Penipu sering mengajak transaksi di luar aplikasi. Tetaplah mengobrol di dalam chat K-Market yang terlindungi terjemahan otomatis.',
      actionText: 'Gunakan chat aplikasi',
    },
    my: {
      title: '⚠️ [သတိပေးချက်] အခြား Messenger များသို့ မပြောင်းပါနှင့်!',
      description: 'လိမ်လည်သူများသည် ပြင်ပသို့ ခေါ်ယူလိမ်လည်လေ့ရှိသည်။ K-Market အက်ပ်အတွင်း၌သာ စကားပြောဆိုပါ။',
      actionText: 'အက်ပ်အတွင်း၌သာ ဆက်သွယ်ပါ',
    },
    km: {
      title: '⚠️ [ការព្រមាន] កុំប្តូរទៅកាន់ Telegram ឬ KakaoTalk ក្រៅកម្មវិធី!',
      description: 'ជនបោកប្រាស់តែងតែទាក់ទាញទៅក្រៅកម្មវិធី។ សូមជជែកនៅក្នុង K-Market ជាមួយការបកប្រែផ្ទាល់ដើម្បីសុវត្ថិភាព។',
      actionText: 'ជជែកក្នុងកម្មវិធីប៉ុណ្ណោះ',
    },
    ja: {
      title: '⚠️ [外部誘導警告] LINEやカカオトークに移動しないでください！',
      description: '外部メッセンジャーに誘導して詐欺を行う手口が多発しています。安全のためK-Marketの翻訳チャット内でのみ取引してください。',
      actionText: 'アプリ内チャットを継続',
    },
    zh: {
      title: '⚠️ [警惕外部引流] 请勿转至微信或KakaoTalk交易！',
      description: '骗子常以引流至外部通讯软件为由实施诈骗。为确保安全，请全程在K-Market自动翻译聊天内沟通。',
      actionText: '全程在平台内沟通',
    },
    bn: {
      title: '⚠️ [সতর্কবার্তা] অন্য কোনো মেসেঞ্জারে কথা বলবেন না!',
      description: 'প্রতারকরা সাধারণত বাইরের অ্যাপে ডেকে প্রতারণা করে। নিরাপত্তার জন্য শুধুমাত্র K-Market এর ভেতরেই চ্যাট করুন।',
      actionText: 'অ্যাপের ভেতরেই থাকুন',
    },
    en: {
      title: '⚠️ [SAFETY ALERT] Do NOT move to KakaoTalk, LINE, or Telegram!',
      description: 'Scammers frequently lure users to external apps. Stay inside K-Market protected translation chat to guarantee transaction safety.',
      actionText: 'Stay in app chat',
    },
  },

  // 3. 가짜 안전결제 링크 / 상품권 사기
  giftcard_fake_link: {
    ko: {
      title: '🚨 [가짜 결제 링크 / 상품권 사기 주의] 외부 링크를 절대 누르지 마세요!',
      description: '상품권을 요구하거나 외부 안전결제 링크로 로그인을 유도하는 것은 피싱 사기입니다. K-Market 공식 채팅 외의 링크는 클릭 금지입니다.',
      actionText: '피싱 링크 클릭 금지',
    },
    vi: {
      title: '🚨 [CẢNH BÁO LIÊN KẾT GIẢ MẠO] Tuyệt đối KHÔNG bấm vào đường link lạ!',
      description: 'Yêu cầu mua thẻ cào hoặc gửi link thanh toán giả mạo là lừa đảo đánh cắp tài khoản. Không bấm vào bất kỳ link nào.',
      actionText: 'Không bấm vào liên kết lạ',
    },
    th: {
      title: '🚨 [เตือนภัยลิงก์ปลอม] ห้ามคลิกลิงก์ภายนอกเด็ดขาด!',
      description: 'การขอให้ซื้อบัตรเติมเงินหรือส่งลิงก์ชำระเงินปลอมเป็นการหลอกลวง ห้ามคลิกลิงก์ใดๆ นอกแอป',
      actionText: 'ห้ามคลิกลิงก์แปลกปลอม',
    },
    mn: {
      title: '🚨 [ХУУРАМЧ ЛИНК СЭРЭМЖЛҮҮЛЭГ] Гадны линк дээр огт бүү дар!',
      description: 'Бэлгийн карт шаардах эсвэл хуурамч төлбөрийн линк явуулах нь залилан юм. Гадны холбоос дээр бүү дарна уу.',
      actionText: 'Линк дээр бүү дар',
    },
    uz: {
      title: '🚨 [SOXTA LINK OGOHLANTIRISH] Hech qanday havolani ochmang!',
      description: 'Sovgʻa kartalari yoki soxta toʻlov havolalarini yuborish firibgarlikdir. K-Market tashqarisidagi linklarni bosmang.',
      actionText: 'Havolani ochmang',
    },
    ne: {
      title: '🚨 [नक्कली लिङ्क चेतावनी] कुनै पनि बाहिरी लिङ्कमा क्लिक नगर्नुहोस्!',
      description: 'गिफ्ट कार्ड माग्नु वा नक्कली भुक्तानी लिङ्क पठाउनु ठगी हो। कुनै पनि शंकास्पद लिङ्क नखोल्नुहोस्।',
      actionText: 'लिङ्क नखोल्नुहोस्',
    },
    ru: {
      title: '🚨 [ОПАСНЫЕ ССЫЛКИ] Ни в коем случае не переходите по ссылкам!',
      description: 'Требование подарочных карт или отправка фальшивых ссылок на оплату — это фишинг. Не открывайте подозрительные ссылки.',
      actionText: 'Не нажимайте на ссылки',
    },
    tl: {
      title: '🚨 [BABALA SA PEKENG LINK] Huwag mag-click ng mga panlabas na link!',
      description: 'Ang paghingi ng gift cards o pagpapadala ng pekeng payment links ay phishing scam. Huwag buksan ang mga link.',
      actionText: 'Huwag i-click ang link',
    },
    id: {
      title: '🚨 [PERINGATAN LINK PALSU] Jangan klik tautan yang mencurigakan!',
      description: 'Meminta voucher atau mengirim tautan pembayaran palsu adalah modus pencurian akun. Jangan buka tautan apa pun.',
      actionText: 'Jangan klik tautan',
    },
    my: {
      title: '🚨 [အတုအယောင် Link သတိပေးချက်] မည်သည့် Link ကိုမှ မနှိပ်ပါနှင့်!',
      description: 'Gift card တောင်းဆိုခြင်း သို့မဟုတ် ငွေပေးချေမှု link အတုများ ပို့ခြင်းသည် လိမ်လည်မှုဖြစ်သည်။',
      actionText: 'Link မနှိပ်ပါနှင့်',
    },
    km: {
      title: '🚨 [ការព្រមានតំណភ្ជាប់ក្លែងក្លាយ] កុំចុចលើតំណភ្ជាប់ខាងក្រៅ!',
      description: 'ការស្នើសុំកាតកាដូ ឬផ្ញើតំណបង់ប្រាក់ក្លែងក្លាយ គឺជាការបោកប្រាស់។ សូមកុំចុចលើតំណភ្ជាប់ណាមួយឡើយ។',
      actionText: 'កុំចុចលើតំណភ្ជាប់',
    },
    ja: {
      title: '🚨 [偽リンク・詐欺警告] 外部の決済リンクを絶対にクリックしないでください！',
      description: 'ギフトカードの要求や偽の安全決済リンクはフィッシング詐欺です。外部リンクは一切クリックしないでください。',
      actionText: '外部リンク禁止',
    },
    zh: {
      title: '🚨 [钓鱼链接与礼品卡预警] 切勿点击外部不明链接！',
      description: '索要礼品卡或发送虚假安全支付链接均为钓鱼盗号诈骗。请勿点击非官方链接。',
      actionText: '严禁点击不明链接',
    },
    bn: {
      title: '🚨 [নকল লিঙ্ক সতর্কতা] কোনো বাইরের লিঙ্কে ক্লিক করবেন না!',
      description: 'গিফট কার্ড চাওয়া বা ভুয়া পেমেন্ট লিঙ্ক পাঠানো ফিশিং প্রতারণা। কোনো লিঙ্কে প্রবেশ করবেন না।',
      actionText: 'লিঙ্কে ক্লিক করবেন না',
    },
  },
};

// 15개국어 채팅방 공식 안전 수칙 사전
export const CHAT_SAFETY_POLICY_I18N: Record<LanguageCode, { badge: string; text: string }> = {
  ko: {
    badge: '🛡️ K-Market 안전 수칙',
    text: '선입금 요구 및 외부 메신저(카톡·라인·텔레그램) 유도 시 시스템에 의해 즉시 계정이 일시 및 영구 정지 및 신고 조치됩니다. 반드시 현장 직거래를 이용하세요.',
  },
  vi: {
    badge: '🛡️ Quy tắc an toàn K-Market',
    text: 'Yêu cầu chuyển tiền trước hoặc lôi kéo sang Zalo, KakaoTalk, Telegram sẽ bị hệ thống TẠM KHÓA hoặc KHÓA VĨNH VIỄN tài khoản và báo cáo xử lý ngay lập tức. Hãy luôn giao dịch trực tiếp tận nơi.',
  },
  th: {
    badge: '🛡️ กฎความปลอดภัย K-Market',
    text: 'การขอให้โอนเงินก่อนหรือชวนคุยนอกแอป (LINE, KakaoTalk, Telegram) จะถูกระบบระงับการใช้งานชั่วคราว/ถาวรและรายงานทันที โปรดนัดรับของตรงหน้าเท่านั้น',
  },
  mn: {
    badge: '🛡️ K-Market Аюулгүй байдлын дүрэм',
    text: 'Урьдчилгаа нэхэх болон өөр чат (KakaoTalk, LINE, Telegram) руу уруу татвал системийн зүгээс хаягийг ТҮР БОЛОН БҮРМӨСӨН ХААЖ цагдаад мэдэгдэнэ. Заавал биечлэн уулзаж наймаалцана уу.',
  },
  uz: {
    badge: '🛡️ K-Market Xavfsizlik qoidalari',
    text: 'Oldindan pul oʻtkazishni soʻrash yoki tashqi messenjerlarga (KakaoTalk, Telegram) chaqirish holatlarida hisob VAQTINCHALIK VA BUTUNLAY BLOKLANADI va chora koʻriladi. Faqat joyida yuzma-yuz savdo qiling.',
  },
  ne: {
    badge: '🛡️ K-Market सुरक्षा नियम',
    text: 'पहिले पैसा माग्ने वा बाहिरी मेसेन्जर (KakaoTalk, LINE, Telegram) मा बोलाउने गरेमा खाता तत्काल अस्थायी वा स्थायी रूपमा बन्द र कारबाही गरिनेछ। सधैं प्रत्यक्ष भेटेर मात्र कारोबार गर्नुहोस्।',
  },
  ru: {
    badge: '🛡️ Правила безопасности K-Market',
    text: 'Требование предоплаты или попытка перевода в сторонние мессенджеры (Telegram, WhatsApp, KakaoTalk) приведет к НЕМЕДЛЕННОЙ ВРЕМЕННОЙ ИЛИ ПОЛНОЙ БЛОКИРОВКЕ аккаунта. Совершайте сделки только лично.',
  },
  tl: {
    badge: '🛡️ Mga Batas sa Kaligtasan ng K-Market',
    text: 'Ang paghingi ng paunang bayad o paglilipat sa labas na messenger (KakaoTalk, LINE, Telegram) ay magdudulot ng PANSAMANTALA O PERMANENTENG PAGKA-SUSPENDE ng account. Palaging makipag-transaksyon nang personal.',
  },
  id: {
    badge: '🛡️ Aturan Keamanan K-Market',
    text: 'Meminta transfer di awal atau mengajak transaksi di luar aplikasi (WhatsApp, Telegram) akan membuat akun DITANGGUHKAN SEMENTARA ATAU PERMANEN secara otomatis. Wajib bertransaksi secara COD langsung.',
  },
  my: {
    badge: '🛡️ K-Market ဘေးကင်းရေးစည်းမျဉ်း',
    text: 'ငွေကြိုလွှဲခိုင်းခြင်း သို့မဟုတ် ပြင်ပ Messenger (KakaoTalk, LINE, Telegram) သို့ ခေါ်ဆောင်ပါက အကောင့်ကို ယာယီ သို့မဟုတ် အပြီးတိုင် ပိတ်ပင်အရေးယူမည်ဖြစ်သည်။ လူချင်းတွေ့ဆုံ၍သာ အရောင်းအဝယ်ပြုလုပ်ပါ။',
  },
  km: {
    badge: '🛡️ ក្បួនសុវត្ថិភាព K-Market',
    text: 'ការស្នើសុំផ្ទេរប្រាក់មុន ឬទាក់ទាញទៅកាន់ Messenger ក្រៅកម្មវិធី (KakaoTalk, Telegram) នឹងត្រូវប្រព័ន្ធផ្អាក ឬបិទគណនីជាអចិន្ត្រៃយ៍ និងចាត់វិធានការភ្លាមៗ។ សូមធ្វើការជួញដូរដោយផ្ទាល់ជានិច្ច។',
  },
  ja: {
    badge: '🛡️ K-Market 安全取引ルール',
    text: '先払いの要求や外部メッセンジャー（LINE、カカオトーク等）への誘導を行った場合、システムによりアカウントが即座に一時的・永久利用停止および通報されます。必ず直接対面でお取引ください。',
  },
  zh: {
    badge: '🛡️ K-Market 安全守则',
    text: '要求提前转账付款或引流至外部软件（微信、KakaoTalk等）者，系统将立即采取临时或永久封号并追责通报。请务必坚持当面验货交易。',
  },
  bn: {
    badge: '🛡️ K-Market নিরাপত্তা নির্দেশিকা',
    text: 'অগ্রিম টাকা চাওয়া বা বাইরের মেসেঞ্জারে (KakaoTalk, LINE, Telegram) ডাকার চেষ্টা করলে অ্যাকাউন্ট তাৎক্ষণিকভাবে সাময়িক বা স্থায়ীভাবে স্থগিত করা হবে। সর্বদা সরাসরি উপস্থিত হয়ে লেনদেন করুন।',
  },
  en: {
    badge: '🛡️ K-Market Safety Policy',
    text: 'Requesting advance payment or redirecting to external messengers (KakaoTalk, LINE, Telegram) will result in IMMEDIATE TEMPORARY OR PERMANENT ACCOUNT SUSPENSION and reporting. Always trade in person.',
  },
};

/**
 * 상대방의 현재 언어 설정에 맞는 15개국어 안전 수칙 반환
 */
export function getChatSafetyPolicyI18n(lang: LanguageCode = 'ko') {
  return CHAT_SAFETY_POLICY_I18N[lang] || CHAT_SAFETY_POLICY_I18N.ko;
}

/**
 * 상대방의 현재 언어 설정에 맞는 15개국어 사기 경고 텍스트 반환
 */
export function getScamWarningI18n(
  threatType: ScamThreatType,
  lang: LanguageCode = 'ko'
): ScamWarningContent {
  const table = SCAM_WARNINGS_I18N[threatType] || SCAM_WARNINGS_I18N.prepayment_wire;
  return table[lang] || table.ko || table.en;
}
