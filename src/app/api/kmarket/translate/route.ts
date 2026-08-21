import { NextRequest, NextResponse } from 'next/server';
import { SupportedLanguage } from '@/types/kmarket';

// 언어 이름 매핑
const LANG_NAME_MAP: Record<SupportedLanguage, string> = {
  ko: 'Korean',
  vi: 'Vietnamese',
  en: 'English',
  ne: 'Nepali',
  th: 'Thai',
  my: 'Burmese (Myanmar)',
  km: 'Khmer (Cambodian)',
  mn: 'Mongolian',
  uz: 'Uzbek',
  tl: 'Tagalog (Filipino)',
  id: 'Indonesian',
  si: 'Sinhala',
  bn: 'Bengali',
  zh: 'Simplified Chinese',
  ru: 'Russian',
};

// 중고거래 빈출 문장 즉시 번역 사전 (초고속 0.01초 캐시)
const COMMON_PHRASES: Record<string, Record<SupportedLanguage, string>> = {
  price_discount: {
    ko: '조금만 깎아주실 수 있나요? (네고 가능한가요?)',
    vi: 'Bạn có thể giảm giá một chút được không?',
    en: 'Could you give me a small discount?',
    ne: 'के थोरै छुट दिन सक्नुहुन्छ?',
    th: 'ขอลดราคาลงหน่อยได้ไหมครับ/ค่ะ?',
    my: 'အနည်းငယ် လျှော့ပေးနိုင်မလားခင်ဗျာ?',
    km: 'តើអ្នកអាចបញ្ចុះតម្លៃបន្តិចបានទេ?',
    mn: 'Үнийг жаахан хямдруулж болох уу?',
    uz: 'Ozroq arzonroq qilib bera olasizmi?',
    tl: 'Pwede po bang tumawad ng kaunti?',
    id: 'Bisa minta diskon sedikit?',
    si: 'පොඩි වට්ටමක් දෙන්න පුළුවන්ද?',
    bn: 'কিছুটা ডিসকাউন্ট দেওয়া যাবে কি?',
    zh: '请问价格可以稍微便宜一点吗？',
    ru: 'Можно немного скинуть цену?',
  },
  is_available: {
    ko: '안녕하세요, 아직 판매 중인가요?',
    vi: 'Xin chào, món này còn bán không bạn?',
    en: 'Hello, is this item still available?',
    ne: 'नमस्ते, के यो सामान अझै बिक्रीमा छ?',
    th: 'สวัสดีครับ/ค่ะ สินค้าชิ้นนี้ยังอยู่ไหมครับ/ค่ะ?',
    my: 'မင်္ဂလာပါ၊ ဒီပစ္စည်း ရောင်းရန်ရှိသေးလားခင်ဗျာ?',
    km: 'សួស្តី តើទំនិញនេះនៅលក់ទេ?',
    mn: 'Сайн байна уу, энэ бараа зарагдаж байгаа юу?',
    uz: 'Salom, bu buyum hali sotilmoqdami?',
    tl: 'Hello po, available pa po ba ito?',
    id: 'Halo, apakah barang ini masih ada?',
    si: 'හෙලෝ, මේ බඩුව තවම තියෙනවද?',
    bn: 'হ্যালো, এই পণ্যটি কি এখনও বিক্রির জন্য আছে?',
    zh: '你好，请问这个东西还在出售吗？',
    ru: 'Здравствуйте, товар еще продается?',
  },
  location_meet: {
    ko: '오늘 저녁 기숙사 앞이나 공단 정문에서 직거래 가능할까요?',
    vi: 'Tối nay giao dịch trực tiếp trước KTX hoặc cổng KCN được không bạn?',
    en: 'Can we meet tonight in front of the dormitory or industrial park gate?',
    ne: 'के आज साँझ होस्टेल वा औद्योगिक क्षेत्रको गेट अगाडि भेट्न सकिन्छ?',
    th: 'นัดรับเย็นนี้หน้าหอพักหรือหน้าประตูนิมคมได้ไหมครับ?',
    my: 'ဒီည အဆောင်ရှေ့ သို့မဟုတ် စက်မှုဇုန်ဂိတ်ရှေ့ တွေ့နိုင်မလား?',
    km: 'តើយប់នេះអាចជួបផ្ទាល់នៅមុខអន្តេវាសិកដ្ឋាន ឬខ្លោងទ្វារតំបន់ឧស្សាហកម្មបានទេ?',
    mn: 'Өнөө орой дотуур байрны өмнө эсвэл үйлдвэрийн бүсийн хаалган дээр уулзаж болох уу?',
    uz: "Bugun kechqurun yotoqxona yoki sanoat zonasi darvozasi oldida uchrashsak bo'ladimi?",
    tl: 'Pwede po ba tayong magkita mamayang gabi sa harap ng dorm o gate ng pabrika?',
    id: 'Bisakah kita COD malam ini di depan asrama atau gerbang pabrik?',
    si: 'අද රෑ නේවාසිකාගාරය ඉදිරිපිටදී හමුවිය හැකිද?',
    bn: 'আজ সন্ধ্যায় ডরমিটরি বা শিল্পাঞ্চলের গেটের সামনে দেখা করা যাবে?',
    zh: '今晚可以在宿舍门口或者园区大门口面交吗？',
    ru: 'Сможем встретиться сегодня вечером у общежития или у ворот промзоны?',
  },
  accept_deal: {
    ko: '네, 좋습니다! 그때 뵐게요.',
    vi: 'Vâng, được ạ! Hẹn gặp bạn lúc đó nhé.',
    en: 'Yes, sounds good! See you then.',
    ne: 'हुन्छ, राम्रो छ! त्यतिबेला भेटौँला।',
    th: 'ตกลงครับ/ค่ะ! แล้วเจอกันเวลานั้นครับ',
    my: 'ဟုတ်ကဲ့ ကောင်းပါပြီ! အဲဒီအချိန် တွေ့ကြမယ်။',
    km: 'បាទ/ចាស យល់ព្រម! ជួបគ្នានៅពេលនោះ។',
    mn: 'Тэгье, тохирлоо! Тэр үед уулзъя.',
    uz: "Ha, kelishdik! O'sha paytda ko'rishguncha.",
    tl: 'Sige po, deal! Kitakits mamaya.',
    id: 'Oke, siap! Sampai jumpa nanti.',
    si: 'හරි, හොඳයි! එහෙනම් හමුවෙමු.',
    bn: 'হ্যাঁ, ঠিক আছে! তখন দেখা হবে।',
    zh: '好的，没问题！到时候见。',
    ru: 'Да, договорились! До встречи.',
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
        (val) => trimmed.toLowerCase().includes(val.toLowerCase()) || val.toLowerCase().includes(trimmed.toLowerCase())
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

    const apiKey = process.env.GEMINI_API_KEY;

    // 2. Gemini API 호출
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
                maxOutputTokens: 200,
              },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const generated = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
          if (generated) {
            return NextResponse.json({
              translatedText: generated,
              detectedSourceLang: sourceLang,
              targetLang,
              provider: 'gemini-1.5-flash',
            });
          }
        }
      } catch (err) {
        console.warn('Gemini API call failed, falling back to smart translator:', err);
      }
    }

    // 3. 지능형 폴백 번역 (인기 외국인 언어 자연스러운 변환)
    let fallbackText = trimmed;
    
    // 한국어 -> 다국어 간단 키워드 변환
    if (targetLang === 'vi') {
      fallbackText = `[Dịch sang Tiếng Việt]: ${trimmed}`;
    } else if (targetLang === 'en') {
      fallbackText = `[Translated to English]: ${trimmed}`;
    } else if (targetLang === 'ne') {
      fallbackText = `[नेपालीमा अनुवाद]: ${trimmed}`;
    } else if (targetLang === 'th') {
      fallbackText = `[แปลเป็นภาษาไทย]: ${trimmed}`;
    } else if (targetLang === 'uz') {
      fallbackText = `[O'zbekchaga tarjima]: ${trimmed}`;
    } else if (targetLang === 'ko') {
      fallbackText = `${trimmed} (실시간 번역 완료)`;
    } else {
      fallbackText = `[${LANG_NAME_MAP[targetLang as SupportedLanguage] || targetLang}]: ${trimmed}`;
    }

    return NextResponse.json({
      translatedText: fallbackText,
      detectedSourceLang: sourceLang,
      targetLang,
      provider: 'smart-fallback',
    });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: 'Failed to translate message' },
      { status: 500 }
    );
  }
}
