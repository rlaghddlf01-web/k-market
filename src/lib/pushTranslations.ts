// KTRS K-Market 17개국어 실시간 웹 푸시 알림 딕셔너리

import { SupportedLanguage } from '@/types/kmarket';

export interface PushMessagePayload {
  title: string;
  body: string;
}

export const PUSH_TRANSLATIONS: Record<
  SupportedLanguage,
  {
    welcomeTitle: string;
    welcomeBody: string;
    keywordTitle: (kw: string) => string;
    keywordBody: (title: string, price: string, region: string) => string;
    chatTitle: (sender: string) => string;
    appointmentTitle: (time: string) => string;
    appointmentBody: (place: string) => string;
  }
> = {
  ko: {
    welcomeTitle: '🔔 K-Market 실시간 알림이 켜졌습니다!',
    welcomeBody: '17개국어 번역 채팅과 관심 키워드 매물 알림을 가장 빠르게 보내드립니다.',
    keywordTitle: (kw) => `🔔 [키워드 알림] "${kw}" 매물이 등록되었습니다!`,
    keywordBody: (t, p, r) => `[${r}] ${t} - ${p} (1:1 번역 채팅으로 1초 만에 득템하세요)`,
    chatTitle: (s) => `💬 [${s}] 님의 번역 메시지 도착`,
    appointmentTitle: (time) => `📍 [직거래 약속 확정] ${time}`,
    appointmentBody: (place) => `"${place}"에서 만나요! (1시간 전 리마인더 예약됨)`,
  },
  en: {
    welcomeTitle: '🔔 K-Market Live Alerts Enabled!',
    welcomeBody: 'Get 17-language chat translations and favorite item alerts fastest.',
    keywordTitle: (kw) => `🔔 [Alert] New item for "${kw}" is posted!`,
    keywordBody: (t, p, r) => `[${r}] ${t} - ${p} (Chat via 1:1 translation now)`,
    chatTitle: (s) => `💬 New translated message from [${s}]`,
    appointmentTitle: (time) => `📍 [Direct Meetup Confirmed] ${time}`,
    appointmentBody: (place) => `Meet at "${place}"! (1-hour reminder scheduled)`,
  },
  ja: {
    welcomeTitle: '🔔 K-Market リアルタイム通知がONになりました！',
    welcomeBody: '17言語の翻訳チャットとお気に入り商品の通知を最速でお届けします。',
    keywordTitle: (kw) => `🔔［キーワード通知］「${kw}」が出品されました！`,
    keywordBody: (t, p, r) => `［${r}］${t} - ${p} (1:1翻訳チャットですぐに購入)`,
    chatTitle: (s) => `💬［${s}］様から翻訳メッセージが届きました`,
    appointmentTitle: (time) => `📍［手渡し約束確定］${time}`,
    appointmentBody: (place) => `「${place}」でお会いしましょう！(1時間前リマインダー設定済み)`,
  },
  ru: {
    welcomeTitle: '🔔 Уведомления K-Market включены!',
    welcomeBody: 'Получайте 1:1 сообщения с автопереводом на 17 языков и оповещения быстрее всех.',
    keywordTitle: (kw) => `🔔 [Уведомление] Новый товар по запросу "${kw}"!`,
    keywordBody: (t, p, r) => `[${r}] ${t} - ${p} (Напишите в 1:1 чат с автопереводом)`,
    chatTitle: (s) => `💬 Новое сообщение от [${s}]`,
    appointmentTitle: (time) => `📍 [Встреча подтверждена] ${time}`,
    appointmentBody: (place) => `Встреча в "${place}"! (Напоминание за 1 час)`,
  },
  vi: {
    welcomeTitle: '🔔 Thông báo K-Market đã được bật!',
    welcomeBody: 'Nhận thông báo chat dịch 17 ngôn ngữ và món đồ yêu thích nhanh nhất.',
    keywordTitle: (kw) => `🔔 [Báo từ khóa] Đã có món đồ "${kw}" mới!`,
    keywordBody: (t, p, r) => `[${r}] ${t} - ${p} (Chat dịch 1:1 ngay để mua)`,
    chatTitle: (s) => `💬 Tin nhắn dịch mới từ [${s}]`,
    appointmentTitle: (time) => `📍 [Hẹn giao dịch] ${time}`,
    appointmentBody: (place) => `Gặp nhau tại "${place}" nhé! (Đã đặt nhắc nhở trước 1 tiếng)`,
  },
  zh: {
    welcomeTitle: '🔔 K-Market 实时通知已开启！',
    welcomeBody: '第一时间获取17国语言实时翻译聊天和心仪物品上架提醒。',
    keywordTitle: (kw) => `🔔 [关键词提醒] "${kw}" 新商品上架！`,
    keywordBody: (t, p, r) => `[${r}] ${t} - ${p} (立即通过1:1实时翻译发起聊天)`,
    chatTitle: (s) => `💬 来自 [${s}] 的翻译消息`,
    appointmentTitle: (time) => `📍 [线下见面确认] ${time}`,
    appointmentBody: (place) => `在 "${place}" 见面！(已设置提前1小时提醒)`,
  },
  km: {
    welcomeTitle: '🔔 ការជូនដំណឹង K-Market ត្រូវបានបើក!',
    welcomeBody: 'ទទួលបានការជូនដំណឹងពីការជជែកបកប្រែ ១៧ ភាសា និងទំនិញថ្មីៗបានលឿនបំផុត។',
    keywordTitle: (kw) => `🔔 [ពាក្យគន្លឹះ] មានទំនិញថ្មី "${kw}" ត្រូវបានដាក់លក់!`,
    keywordBody: (t, p, r) => `[${r}] ${t} - ${p} (ជជែកបកប្រែ ១:១ ភ្លាមៗ)`,
    chatTitle: (s) => `💬 សារបកប្រែថ្មីពី [${s}]`,
    appointmentTitle: (time) => `📍 [ការណាត់ជួបផ្ទាល់] ${time}`,
    appointmentBody: (place) => `ជួបគ្នានៅ "${place}"! (មានការរំលឹក ១ ម៉ោងមុន)`,
  },
  ne: {
    welcomeTitle: '🔔 K-Market सूचना सक्रिय गरियो!',
    welcomeBody: '१७ भाषा अनुवाद च्याट र सामान अलर्ट सबैभन्दा छिटो प्राप्त गर्नुहोस्।',
    keywordTitle: (kw) => `🔔 [कीवर्ड सूचना] "${kw}" नयाँ सामान थपियो!`,
    keywordBody: (t, p, r) => `[${r}] ${t} - ${p} (१:१ अनुवाद च्याटमार्फत तुरुन्तै कुरा गर्नुहोस्)`,
    chatTitle: (s) => `💬 [${s}] बाट अनुवाद सन्देश आयो`,
    appointmentTitle: (time) => `📍 [भेट्ने समय तय भयो] ${time}`,
    appointmentBody: (place) => `"${place}" मा भेटौं! (१ घण्टा अघि रिमाइन्डर तय गरियो)`,
  },
  uz: {
    welcomeTitle: '🔔 K-Market xabarnomalari yoqildi!',
    welcomeBody: '17 tildagi tarjima xabarlari va yangi arzon mahsulotlar haqida tezkor xabardor bo‘ling.',
    keywordTitle: (kw) => `🔔 [Kalit so‘z] Yangi "${kw}" mahsuloti qo‘shildi!`,
    keywordBody: (t, p, r) => `[${r}] ${t} - ${p} (1:1 tarjima chatida hoziroq yozing)`,
    chatTitle: (s) => `💬 [${s}] dan yangi tarjima xabari`,
    appointmentTitle: (time) => `📍 [Uchrashuv tasdiqlandi] ${time}`,
    appointmentBody: (place) => `"${place}" da ko‘rishamiz! (1 soat oldin eslatma o‘rnatildi)`,
  },
  my: {
    welcomeTitle: '🔔 K-Market အသိပေးချက်များ ဖွင့်ထားပါသည်!',
    welcomeBody: '၁၇ ဘာသာစကား ဘာသာပြန်ချက်နှင့် အထူးပစ္စည်း အသိပေးချက်များကို အမြန်ဆုံးရယူပါ။',
    keywordTitle: (kw) => `🔔 [သော့ချက်စာလုံး] "${kw}" ပစ္စည်းအသစ် တင်ထားပါသည်!`,
    keywordBody: (t, p, r) => `[${r}] ${t} - ${p} (၁:၁ ဘာသာပြန် ချတ်ဖြင့် ချက်ချင်းဝယ်ယူပါ)`,
    chatTitle: (s) => `💬 [${s}] ထံမှ ဘာသာပြန် မက်ဆေ့ခ်ျအသစ်`,
    appointmentTitle: (time) => `📍 [လူချင်းတွေ့ဆုံရန် ရက်ချိန်းအတည်ပြုသည်] ${time}`,
    appointmentBody: (place) => `"${place}" တွင် တွေ့ဆုံမည်! (၁ နာရီအလို သတိပေးချက် သတ်မှတ်ထားသည်)`,
  },
  id: {
    welcomeTitle: '🔔 Notifikasi K-Market Diaktifkan!',
    welcomeBody: 'Dapatkan obrolan terjemahan 17 bahasa dan penawaran barang favorit paling cepat.',
    keywordTitle: (kw) => `🔔 [Kata Kunci] Barang baru "${kw}" telah ditambahkan!`,
    keywordBody: (t, p, r) => `[${r}] ${t} - ${p} (Chat terjemahan 1:1 sekarang)`,
    chatTitle: (s) => `💬 Pesan terjemahan baru dari [${s}]`,
    appointmentTitle: (time) => `📍 [Janji COD Dikonfirmasi] ${time}`,
    appointmentBody: (place) => `Bertemu di "${place}"! (Pengingat 1 jam sebelumnya diatur)`,
  },
  th: {
    welcomeTitle: '🔔 เปิดการแจ้งเตือน K-Market แล้ว!',
    welcomeBody: 'รับการแจ้งเตือนแชทแปล 17 ภาษาและสินค้าที่สนใจได้รวดเร็วที่สุด',
    keywordTitle: (kw) => `🔔 [แจ้งเตือนคำค้นหา] มีสินค้า "${kw}" เข้าใหม่!`,
    keywordBody: (t, p, r) => `[${r}] ${t} - ${p} (แชทแปล 1:1 ทันทีเพื่อสั่งซื้อ)`,
    chatTitle: (s) => `💬 ข้อความแปลใหม่จาก [${s}]`,
    appointmentTitle: (time) => `📍 [ยืนยันการนัดรับสินค้า] ${time}`,
    appointmentBody: (place) => `เจอกันที่ "${place}" ครับ! (ตั้งเตือนล่วงหน้า 1 ชั่วโมงแล้ว)`,
  },
  si: {
    welcomeTitle: '🔔 K-Market දැනුම්දීම් ක්‍රියාත්මකයි!',
    welcomeBody: 'භාෂා 17 ක පරිවර්තන දැනුම්දීම් සහ අලුත් බඩු ගැන ඉක්මනින් දැනගන්න.',
    keywordTitle: (kw) => `🔔 [දැනුම්දීම] "${kw}" අලුත් බඩුවක් එකතු විය!`,
    keywordBody: (t, p, r) => `[${r}] ${t} - ${p} (1:1 පරිවර්තන චැට් මගින් සම්බන්ධ වන්න)`,
    chatTitle: (s) => `💬 [${s}] ගෙන් නව පරිවර්තන පණිවිඩයක්`,
    appointmentTitle: (time) => `📍 [හමුවීම තහවුරු විය] ${time}`,
    appointmentBody: (place) => `"${place}" හිදී හමුවෙමු! (පැයකට පෙර මතක් කිරීමක් සකසා ඇත)`,
  },
  mn: {
    welcomeTitle: '🔔 K-Market мэдэгдэл идэвхжлээ!',
    welcomeBody: '17 хэлний орчуулгын чат болон хүссэн барааны мэдэгдлийг хамгийн хурдан аваарай.',
    keywordTitle: (kw) => `🔔 [Түлхүүр үг] "${kw}" шинэ бараа нэмэгдлээ!`,
    keywordBody: (t, p, r) => `[${r}] ${t} - ${p} (1:1 орчуулгын чатаар яг одоо холбогдох)`,
    chatTitle: (s) => `💬 [${s}]-с шинэ орчуулсан зурвас ирлээ`,
    appointmentTitle: (time) => `📍 [Уулзах цаг баталгаажлаа] ${time}`,
    appointmentBody: (place) => `"${place}" дээр уулзъя! (1 цагийн өмнө сануулга тохируулсан)`,
  },
  bn: {
    welcomeTitle: '🔔 K-Market নোটিফিকেশন সক্রিয় হয়েছে!',
    welcomeBody: '১৭ ভাষার অনুবাদ চ্যাট এবং পছন্দের পণ্যের নোটিফিকেশন দ্রুত পান।',
    keywordTitle: (kw) => `🔔 [কিওয়ার্ড অ্যালার্ট] "${kw}" নতুন পণ্য পোস্ট করা হয়েছে!`,
    keywordBody: (t, p, r) => `[${r}] ${t} - ${p} (১:১ অনুবাদ চ্যাটে অবিলম্বে যোগাযোগ করুন)`,
    chatTitle: (s) => `💬 [${s}] থেকে নতুন অনুবাদ বার্তা`,
    appointmentTitle: (time) => `📍 [সরাসরি সাক্ষাতের সময় নিশ্চিত] ${time}`,
    appointmentBody: (place) => `"${place}" এ দেখা হবে! (১ ঘণ্টা আগে রিমাইন্ডার সেট করা আছে)`,
  },
  kk: {
    welcomeTitle: '🔔 K-Market хабарламалары қосылды!',
    welcomeBody: '17 тілдегі аударма чаты мен қажетті тауарлар хабарламасын жылдам алыңыз.',
    keywordTitle: (kw) => `🔔 [Кілт сөз] Жаңа "${kw}" тауары тіркелді!`,
    keywordBody: (t, p, r) => `[${r}] ${t} - ${p} (1:1 аударма чатында дәл қазір жазыңыз)`,
    chatTitle: (s) => `💬 [${s}] қолданушысынан жаңа аударма хабарламасы`,
    appointmentTitle: (time) => `📍 [Кездесу уақыты бекітілді] ${time}`,
    appointmentBody: (place) => `"${place}" мекенжайында кездесеміз! (1 сағат бұрын ескерту орнатылды)`,
  },
  ur: {
    welcomeTitle: '🔔 K-Market لائیو الرٹس فعال ہیں!',
    welcomeBody: '17 زبانوں کے ترجمہ چیٹ اور من پسند سامان کے الرٹس تیزی سے حاصل کریں۔',
    keywordTitle: (kw) => `🔔 [الرٹ] نیا سامان "${kw}" شامل کر دیا گیا ہے!`,
    keywordBody: (t, p, r) => `[${r}] ${t} - ${p} (1:1 ترجمہ چیٹ کے ذریعے ابھی رابطہ کریں)`,
    chatTitle: (s) => `💬 [${s}] کی طرف سے نیا ترجمہ شدہ پیغام`,
    appointmentTitle: (time) => `📍 [براہ راست ملاقات کا وقت طے] ${time}`,
    appointmentBody: (place) => `"${place}" پر ملتے ہیں! (1 گھنٹہ پہلے یاد دہانی طے ہے)`,
  },
};
