import { NextRequest, NextResponse } from 'next/server';
import { SupportedLanguage } from '@/types/kmarket';

// 언어 이름 매핑
const LANG_NAME_MAP: Record<SupportedLanguage, string> = {
  ko: 'Korean',
  vi: 'Vietnamese',
  en: 'English',
  ja: 'Japanese',
  ru: 'Russian',
  zh: 'Simplified Chinese',
  th: 'Thai',
  uz: 'Uzbek',
  km: 'Khmer (Cambodian)',
  mn: 'Mongolian',
  ne: 'Nepali',
  id: 'Indonesian',
  my: 'Burmese (Myanmar)',
  si: 'Sinhala',
  kk: 'Kazakh',
  bn: 'Bengali',
  ur: 'Urdu',
};

// 중고거래 빈출 문장 즉시 번역 사전 (초고속 0.01초 캐시)
const COMMON_PHRASES: Record<string, Partial<Record<SupportedLanguage, string>>> = {
  price_discount: {
    ko: '조금만 깎아주실 수 있나요? (네고 가능한가요?)',
    vi: 'Bạn có thể giảm giá một chút được không?',
    en: 'Could you give me a small discount?',
    ja: '少しだけお値下げしていただけますか？',
    ru: 'Можно немного скинуть цену?',
    zh: '请问价格可以稍微便宜一点吗？',
    ne: 'के थोरै छुट दिन सक्नुहुन्छ?',
    th: 'ขอลดราคาลงหน่อยได้ไหมครับ/ค่ะ?',
    my: 'အနည်းငယ် လျှော့ပေးနိုင်မလားခင်ဗျာ?',
    km: 'តើអ្នកអាចបញ្ចុះតម្លៃបន្តិចបានទេ?',
    mn: 'Үнийг жаахан хямдруулж болох уу?',
    uz: 'Ozroq arzonroq qilib bera olasizmi?',
    id: 'Bisa minta diskon sedikit?',
    si: 'පොඩි වට්ටමක් දෙන්න පුළුවන්ද?',
    bn: 'কিছুটা ডিসকাউন্ট দেওয়া যাবে কি?',
    kk: 'Бағасын сәл түсіріп бере аласыз ба?',
    ur: 'کیا تھوڑی رعایت مل سکتی ہے؟',
  },
  location_meet: {
    ko: '오늘 저녁 기숙사 앞이나 공단 정문에서 직거래 가능할까요?',
    vi: 'Tối nay giao dịch trực tiếp trước KTX hoặc cổng KCN được không bạn?',
    en: 'Can we meet tonight in front of the dormitory or industrial park gate?',
    ja: '今夜、寮の前か工団の正門で手渡しできますか？',
    ru: 'Сможем встретиться сегодня вечером у общежития или у ворот промзоны?',
    zh: '今晚可以在宿舍门口或者园区大门口面交吗？',
    ne: 'के आज साँझ होस्टेल वा औद्योगिक क्षेत्रको गेट अगाडि भेट्न सकिन्छ?',
    th: 'นัดรับเย็นนี้หน้าหอพักหรือหน้าประตูนิมคมได้ไหมครับ?',
    my: 'ဒီည အဆောင်ရှေ့ သို့မဟုတ် စက်မှုဇုန်ဂိတ်ရှေ့ တွေ့နိုင်မလား?',
    km: 'តើយប់នេះអាចជួបផ្ទាល់នៅមុខអន្តេវាសិកដ្ឋាន ឬខ្លោងទ្វារតំបន់ឧស្សាហកម្មបានទេ?',
    mn: 'Өнөө орой дотуур байрны өмнө эсвэл үйлдвэрийн бүсийн хаалган дээр уулзаж болох уу?',
    uz: "Bugun kechqurun yotoqxona yoki sanoat zonasi darvozasi oldida uchrashsak bo'ladimi?",
    id: 'Bisakah kita COD malam ini di depan asrama atau gerbang pabrik?',
    si: 'අද රෑ නේවාසිකාගාරය ඉදිරිපිටදී හමුවිය හැකිද?',
    bn: 'আজ সন্ধ্যায় ডরমিটরি বা শিল্পাঞ্চলের গেটের সামনে দেখা করা যাবে?',
    kk: 'Бүгін кешке жатақхана маңында кездесе аламыз ба?',
    ur: 'کیا آج شام ہاسٹل کے سامنے مل سکتے ہیں؟',
  },
  accept_deal: {
    ko: '네, 좋습니다! 그때 뵐게요.',
    vi: 'Vâng, được ạ! Hẹn gặp bạn lúc đó nhé.',
    en: 'Yes, sounds good! See you then.',
    ja: 'はい、了解しました！その時にお会いしましょう。',
    ru: 'Да, договорились! До встречи.',
    zh: '好的，没问题！到时候见。',
    ne: 'हुन्छ, राम्रो छ! त्यतिबेला भेटौँला।',
    th: 'ตกลงครับ/ค่ะ! แล้วเจอกันเวลานั้นครับ',
    my: 'ဟုတ်ကဲ့ ကောင်းပါပြီ! အဲဒီအချိန် တွေ့ကြမယ်။',
    km: 'បាទ/ចាស យល់ព្រម! ជួបគ្នានៅពេលនោះ។',
    mn: 'Тэгье, тохирлоо! Тэр үед уулзъя.',
    uz: "Ha, kelishdik! O'sha paytda ko'rishguncha.",
    id: 'Oke, siap! Sampai jumpa nanti.',
    si: 'හරි, හොඳයි! එහෙනම් හමුවෙමු.',
    bn: 'হ্যাঁ, ঠিক আছে! তখন দেখা হবে।',
    kk: 'Иә, жақсы! Сол кезде кездесейік.',
    ur: 'جی ٹھیک ہے! اس وقت ملتے ہیں۔',
  },
};

// 판매자 자동 응답 문장 특별 캐시
const SELLER_REPLY_CACHE: Record<string, Partial<Record<SupportedLanguage, string>>> = {
  discount_reply: {
    ko: '감사합니다! 5,000원 더 깎아드릴 수 있어요. 오늘 저녁 7시에 봬요!',
    vi: 'Cảm ơn bạn! Mình có thể bớt thêm 5,000 won cho bạn nhé. Tối nay 7h gặp nha!',
    en: 'Thank you! I can give you a 5,000 won discount. See you tonight at 7 PM!',
    ja: 'ありがとうございます！5,000ウォンお値引きできます。今夜7時にお会いしましょう！',
    ru: 'Спасибо! Могу скинуть еще 5,000 вон. Встретимся сегодня в 19:00!',
    zh: '谢谢！我可以再给您优惠5000韩元。今晚7点见面吧！',
    ne: 'धन्यवाद! म ५,००० वोन छुट दिन सक्छु। आज साँझ ७ बजे भेटौँला!',
    th: 'ขอบคุณครับ! ลดให้อีก 5,000 วอนได้ครับ เจอกัน 1 ทุ่มนี้นะครับ',
    my: 'ကျေးဇူးတင်ပါတယ်! ၅,၀၀၀ ဝမ် လျှော့ပေးနိုင်ပါတယ်။ ဒီည ၇ နာရီမှာ တွေ့ကြမယ်!',
    km: 'អរគុណ! ខ្ញុំអាចបញ្ចុះតម្លៃ ៥,០០០ វ៉ុនបន្ថែមទៀត។ ជួបគ្នាយប់នេះម៉ោង ៧!',
    mn: 'Баярлалаа! Би 5,000 вон хөнгөлөлт үзүүлж чадна. Өнөө орой 19:00 цагт уулзъя!',
    uz: "Rahmat! Men sizga 5,000 von arzonlashtirib bera olaman. Bugun kechqurun soat 19:00 da ko'rishamiz!",
    id: 'Terima kasih! Saya bisa beri diskon 5.000 won. Sampai jumpa nanti malam jam 7!',
    si: 'ස්තූතියි! මට තව වොන් 5,000ක් අඩු කර දෙන්න පුළුවන්. අද රෑ 7ට හමුවෙමු!',
    bn: 'ধন্যবাদ! আমি আপনাকে আরও ৫,০০০ ওন ছাড় দিতে পারি। আজ সন্ধ্যা ৭টায় দেখা হবে!',
    kk: 'Рақмет! Сізге 5,000 вон жеңілдік бере аламын. Бүгін кешкі 19:00-де кездесейік!',
    ur: 'شکریہ! میں آپ کو 5000 وون کی رعایت دے سکتا ہوں۔ آج شام 7 بجے ملتے ہیں!',
  },
};

export async function POST(req: NextRequest) {
  try {
    const { text, sourceLang = 'auto', targetLang = 'ko' } = await req.json();

    if (!text || !text.trim()) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const trimmed = text.trim();

    // 1. 빠른 캐시 매칭 (단골 중고거래 문장)
    for (const key of Object.keys(COMMON_PHRASES)) {
      const phraseMap = COMMON_PHRASES[key];
      const matched = Object.values(phraseMap).some(
        (val) => val && (trimmed.toLowerCase().includes(val.toLowerCase()) || val.toLowerCase().includes(trimmed.toLowerCase()))
      );
      if (matched && phraseMap[targetLang as SupportedLanguage]) {
        return NextResponse.json({
          translatedText: phraseMap[targetLang as SupportedLanguage],
          detectedSourceLang: sourceLang === 'auto' ? 'ko' : sourceLang,
          targetLang,
          provider: 'fast-cache',
        });
      }
    }

    // 2. 판매자 자동 응답 문장 특별 캐시
    for (const key of Object.keys(SELLER_REPLY_CACHE)) {
      const phraseMap = SELLER_REPLY_CACHE[key];
      const isMatched = Object.values(phraseMap).some(
        (val) => val && (trimmed.includes(val) || val.includes(trimmed))
      );
      if (isMatched && phraseMap[targetLang as SupportedLanguage]) {
        return NextResponse.json({
          translatedText: phraseMap[targetLang as SupportedLanguage],
          detectedSourceLang: sourceLang === 'auto' ? 'ne' : sourceLang,
          targetLang,
          provider: 'seller-reply-cache',
        });
      }
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    // 3. Gemini API 호출
    if (apiKey) {
      try {
        const targetLangName = LANG_NAME_MAP[targetLang as SupportedLanguage] || targetLang;
        const prompt = `You are a real-time translation engine for K-Market, a second-hand marketplace for foreign workers in Korea.
Translate the following user message accurately, naturally, and politely into ${targetLangName}.
Output ONLY the translated text without explanations, greetings, quotes, or markdown.

Text to translate:
${trimmed}`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 256,
              },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
          if (candidate) {
            return NextResponse.json({
              translatedText: candidate,
              detectedSourceLang: sourceLang,
              targetLang,
              provider: 'gemini-ai',
            });
          }
        }
      } catch (geminiErr) {
        console.warn('[Translate API] Gemini error, falling back:', geminiErr);
      }
    }

    return NextResponse.json({
      translatedText: trimmed,
      detectedSourceLang: sourceLang,
      targetLang,
      provider: 'echo-fallback',
    });
  } catch (error) {
    console.error('[Translate API] Error:', error);
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}
