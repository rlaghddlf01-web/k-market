// KTRS K-Market 15개국어 실시간 웹 푸시 알림 딕셔너리 (이지텍스 15개국 표준 일치)

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
    welcomeBody: '15개국어 번역 채팅과 관심 키워드 매물 알림을 가장 빠르게 보내드립니다.',
    keywordTitle: (kw) => `🔔 [키워드 알림] "${kw}" 매물이 등록되었습니다!`,
    keywordBody: (t, p, r) => `[${r}] ${t} - ${p} (1:1 번역 채팅으로 1초 만에 득템하세요)`,
    chatTitle: (s) => `💬 [${s}] 님의 번역 메시지 도착`,
    appointmentTitle: (time) => `📍 [직거래 약속 확정] ${time}`,
    appointmentBody: (place) => `"${place}"에서 만나요! (1시간 전 리마인더 예약됨)`,
  },
  vi: {
    welcomeTitle: '🔔 Thông báo K-Market đã được bật!',
    welcomeBody: 'Nhận thông báo chat dịch 15 ngôn ngữ và món đồ yêu thích nhanh nhất.',
    keywordTitle: (kw) => `🔔 [Báo từ khóa] Đã có món đồ "${kw}" mới!`,
    keywordBody: (t, p, r) => `[${r}] ${t} - ${p} (Chat dịch 1:1 ngay để mua)`,
    chatTitle: (s) => `💬 Tin nhắn dịch mới từ [${s}]`,
    appointmentTitle: (time) => `📍 [Hẹn giao dịch] ${time}`,
    appointmentBody: (place) => `Gặp nhau tại "${place}" nhé! (Đã đặt nhắc nhở trước 1 tiếng)`,
  },
  zh: {
    welcomeTitle: '🔔 K-Market 实时通知已开启！',
    welcomeBody: '第一时间获取15国语言实时翻译聊天和心仪物品上架提醒。',
    keywordTitle: (kw) => `🔔 [关键词提醒] "${kw}" 新商品上架！`,
    keywordBody: (t, p, r) => `[${r}] ${t} - ${p} (立即通过1:1实时翻译发起聊天)`,
    chatTitle: (s) => `💬 来自 [${s}] 的翻译消息`,
    appointmentTitle: (time) => `📍 [线下见面确认] ${time}`,
    appointmentBody: (place) => `在 "${place}" 见面！(已设置提前1小时提醒)`,
  },
  km: {
    welcomeTitle: '🔔 ការជូនដំណឹង K-Market ត្រូវបានបើក!',
    welcomeBody: 'ទទួលបានការជូនដំណឹងពីការជជែកបកប្រែ ១៥ ភាសា និងទំនិញថ្មីៗបានលឿនបំផុត។',
    keywordTitle: (kw) => `🔔 [ពាក្យគន្លឹះ] មានទំនិញថ្មី "${kw}" ត្រូវបានដាក់លក់!`,
    keywordBody: (t, p, r) => `[${r}] ${t} - ${p} (ជជែកបកប្រែ ១:១ ភ្លាមៗ)`,
    chatTitle: (s) => `💬 សារបកប្រែថ្មីពី [${s}]`,
    appointmentTitle: (time) => `📍 [ការណាត់ជួបផ្ទាល់] ${time}`,
    appointmentBody: (place) => `ជួបគ្នានៅ "${place}"! (មានការរំលឹក ១ ម៉ោងមុន)`,
  },
  ne: {
    welcomeTitle: '🔔 K-Market सूचना सक्रिय गरियो!',
    welcomeBody: '१५ भाषा अनुवाद च्याट र सामान अलर्ट सबैभन्दा छिटो प्राप्त गर्नुहोस्।',
    keywordTitle: (kw) => `🔔 [किबोर्ड अलर्ट] "${kw}" नयाँ सामान थपियो!`,
    keywordBody: (t, p, r) => `[${r}] ${t} - ${p} (तुरुन्त १:१ च्याट गर्नुहोस्)`,
    chatTitle: (s) => `💬 [${s}] बाट अनुवाद गरिएको सन्देश आयो`,
    appointmentTitle: (time) => `📍 [भेट्ने समय निश्चित] ${time}`,
    appointmentBody: (place) => `"${place}" मा भेटौँला! (१ घण्टा अघि रिमाइन्डर)`,
  },
  uz: {
    welcomeTitle: "🔔 K-Market bildirishnomasi yoqildi!",
    welcomeBody: "15 tilda tarjima qilinadigan chat va qiziqarli mahsulotlar bildirishnomasini tezda oling.",
    keywordTitle: (kw) => `🔔 [Kalit so'z] "${kw}" yangi mahsulot qo'shildi!`,
    keywordBody: (t, p, r) => `[${r}] ${t} - ${p} (Xarid qilish uchun 1:1 tarjima chat)`,
    chatTitle: (s) => `💬 [${s}] dan yangi tarjima xabar`,
    appointmentTitle: (time) => `📍 [Uchrashuv tasdiqlandi] ${time}`,
    appointmentBody: (place) => `"${place}"da ko'rishamiz! (1 soat oldin eslatma)`,
  },
  my: {
    welcomeTitle: '🔔 K-Market အသိပေးချက် ဖွင့်ထားပါသည်!',
    welcomeBody: 'ဘာသာစကား ၁၅ မျိုး ဘာသာပြန်ချက်နှင့် စိတ်ဝင်စားသောပစ္စည်း အသိပေးချက်များကို ရယူပါ။',
    keywordTitle: (kw) => `🔔 [စကားလုံးအချက်ပြ] "${kw}" ပစ္စည်းအသစ် တင်ထားပါသည်!`,
    keywordBody: (t, p, r) => `[${r}] ${t} - ${p} (ဝယ်ယူရန် ၁:၁ ချက်တင်ပြောပါ)`,
    chatTitle: (s) => `💬 [${s}] ထံမှ ဘာသာပြန် မက်ဆေ့ခ်ျရောက်ရှိ`,
    appointmentTitle: (time) => `📍 [လူချင်းတွေ့ဆုံရန် အတည်ပြုချက်] ${time}`,
    appointmentBody: (place) => `"${place}" တွင် တွေ့ဆုံပါမည်! (၁ နာရီကြိုတင် သတိပေးချက်)`,
  },
  id: {
    welcomeTitle: '🔔 Notifikasi K-Market telah diaktifkan!',
    welcomeBody: 'Dapatkan pemberitahuan obrolan terjemahan 15 bahasa dan barang favorit tercepat.',
    keywordTitle: (kw) => `🔔 [Peringatan Kata Kunci] Ada barang baru "${kw}"!`,
    keywordBody: (t, p, r) => `[${r}] ${t} - ${p} (Chat terjemahan 1:1 langsung)`,
    chatTitle: (s) => `💬 Pesan terjemahan baru dari [${s}]`,
    appointmentTitle: (time) => `📍 [Jadwal Janji Temu] ${time}`,
    appointmentBody: (place) => `Ketemu di "${place}" ya! (Pengingat 1 jam sebelumnya)`,
  },
  th: {
    welcomeTitle: '🔔 เปิดการแจ้งเตือน K-Market แล้ว!',
    welcomeBody: 'รับการแจ้งเตือนแชทแปลภาษา 15 ภาษาและสินค้าที่สนใจเร็วที่สุด',
    keywordTitle: (kw) => `🔔 [แจ้งเตือนคีย์เวิร์ด] มีสินค้าใหม่ "${kw}" แล้ว!`,
    keywordBody: (t, p, r) => `[${r}] ${t} - ${p} (แชทแปล 1:1 เพื่อซื้อเลย)`,
    chatTitle: (s) => `💬 ข้อความแปลใหม่จาก [${s}]`,
    appointmentTitle: (time) => `📍 [นัดหมายนัดพบ] ${time}`,
    appointmentBody: (place) => `เจอกันที่ "${place}" ครับ (ตั้งเตือนล่วงหน้า 1 ชม.)`,
  },
  en: {
    welcomeTitle: '🔔 K-Market Real-time Notifications Enabled!',
    welcomeBody: 'Receive instant 15-language translated chat messages and keyword item alerts.',
    keywordTitle: (kw) => `🔔 [Keyword Alert] New "${kw}" item listed!`,
    keywordBody: (t, p, r) => `[${r}] ${t} - ${p} (Chat now with 1:1 real-time translation)`,
    chatTitle: (s) => `💬 New translated message from [${s}]`,
    appointmentTitle: (time) => `📍 [Meetup Confirmed] ${time}`,
    appointmentBody: (place) => `Meet at "${place}"! (1-hour prior reminder set)`,
  },
  si: {
    welcomeTitle: '🔔 K-Market දැනුම්දීම් සක්‍රියයි!',
    welcomeBody: 'භාෂා 15ක පරිවර්තන චැට් සහ නව බඩු පිළිබඳ දැනුම්දීම් ඉක්මනින් ලබාගන්න.',
    keywordTitle: (kw) => `🔔 [මූලපද දැනුම්දීම] නව "${kw}" භාණ්ඩයක් පළවිය!`,
    keywordBody: (t, p, r) => `[${r}] ${t} - ${p} (මිලදී ගැනීමට 1:1 චැට් කරන්න)`,
    chatTitle: (s) => `💬 [${s}] ගෙන් නව පරිවර්තන පණිවිඩයක්`,
    appointmentTitle: (time) => `📍 [හමුවීමේ වේලාව තහවුරුයි] ${time}`,
    appointmentBody: (place) => `"${place}" හිදී හමුවෙමු! (පැය 1කට පෙර මතක් කිරීම)`,
  },
  mn: {
    welcomeTitle: '🔔 K-Market мэдэгдэл идэвхжлээ!',
    welcomeBody: '15 хэлний орчуулгатай чат болон сонирхсон барааны мэдэгдлийг хамгийн түрүүнд аваарай.',
    keywordTitle: (kw) => `🔔 [Түлхүүр үг] "${kw}" шинэ бараа нийтлэгдлээ!`,
    keywordBody: (t, p, r) => `[${r}] ${t} - ${p} (1:1 орчуулгатай чатаар шууд холбогдох)`,
    chatTitle: (s) => `💬 [${s}]-с орчуулсан зурвас ирлээ`,
    appointmentTitle: (time) => `📍 [Уулзах цаг товлогдлоо] ${time}`,
    appointmentBody: (place) => `"${place}" дээр уулзъя! (1 цагийн өмнө сануулна)`,
  },
  bn: {
    welcomeTitle: '🔔 K-Market রিয়েল-টাইম বিজ্ঞপ্তি চালু হয়েছে!',
    welcomeBody: '১৫টি ভাষায় অনুবাদিত চ্যাট এবং কাঙ্ক্ষিত পণ্যের আপডেট দ্রুত পান।',
    keywordTitle: (kw) => `🔔 [কীওয়ার্ড সতর্কতা] "${kw}" নতুন পণ্য যোগ হয়েছে!`,
    keywordBody: (t, p, r) => `[${r}] ${t} - ${p} (১:১ চ্যাট করে কিনুন)`,
    chatTitle: (s) => `💬 [${s}] থেকে নতুন অনুবাদের বার্তা`,
    appointmentTitle: (time) => `📍 [সরাসরি সাক্ষাতের সময়] ${time}`,
    appointmentBody: (place) => `"${place}"-এ দেখা হবে! (১ ঘণ্টা আগে রিমাইন্ডার)`,
  },
  kk: {
    welcomeTitle: '🔔 K-Market жедел хабарламалары қосылды!',
    welcomeBody: '15 тілде аударылатын чат және тауар хабарламаларын бірінші болып алыңыз.',
    keywordTitle: (kw) => `🔔 [Кілт сөз] Жаңа "${kw}" тауары қосылды!`,
    keywordBody: (t, p, r) => `[${r}] ${t} - ${p} (Сатып алу үшін 1:1 аударма чат)`,
    chatTitle: (s) => `💬 [${s}] пайдаланушысынан аударылған хабарлама`,
    appointmentTitle: (time) => `📍 [Кездесу уақыты бекітілді] ${time}`,
    appointmentBody: (place) => `"${place}" жерінде кездесеміз! (1 сағат бұрын ескерту)`,
  },
  ur: {
    welcomeTitle: '🔔 K-Market لائیو نوٹیفکیشنز فعال ہو گئیں!',
    welcomeBody: '15 زبانوں میں ترجمہ شدہ چیٹ اور اشیاء کی فوری معلومات حاصل کریں۔',
    keywordTitle: (kw) => `🔔 [کی ورڈ الرٹ] نیا "${kw}" سامان شامل کیا گیا!`,
    keywordBody: (t, p, r) => `[${r}] ${t} - ${p} (فوری خریداری کے لیے 1:1 چیٹ کریں)`,
    chatTitle: (s) => `💬 [${s}] کی طرف سے نیا ترجمہ شدہ پیغام`,
    appointmentTitle: (time) => `📍 [ملاقات کا وقت طے پا گیا] ${time}`,
    appointmentBody: (place) => `"${place}" پر ملتے ہیں! (1 گھنٹہ پہلے یاد دہانی)`,
  },
};
