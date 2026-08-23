// PWA 1초 설치 트리거 유틸 (18개국어 완벽 대응)

import { SupportedLanguage } from '@/types/kmarket';
import { SUPPORTED_LANGUAGES } from '@/lib/languages';

const INSTALL_ALERTS: Record<
  SupportedLanguage,
  { ios: string; android: string }
> = {
  ko: {
    ios: '📱 [아이폰/사파리 앱 설치 방법]\n\n화면 하단의 [공유 (↑)] 버튼을 누른 후 [홈 화면에 추가 (+)]를 선택하면 1초 만에 설치됩니다!',
    android: '📱 [K-Market 앱 설치 안내]\n\n주소창 우측의 [설치 아이콘 (⊕)] 또는 브라우저 메뉴(⋮)에서 [앱 설치] / [홈 화면에 추가]를 눌러주세요!',
  },
  en: {
    ios: '📱 [iPhone/Safari Install Guide]\n\nTap the [Share button (↑)] at the bottom and select [Add to Home Screen (+)] to install!',
    android: '📱 [K-Market App Installation]\n\nClick the [Install icon (⊕)] in address bar or menu (⋮) and select [Install App] / [Add to Home Screen]!',
  },
  ja: {
    ios: '📱 [iPhone/Safari アプリインストール方法]\n\n画面下の [共有 (↑)] ボタンを押し、[ホーム画面に追加 (+)] を選択するとインストールできます！',
    android: '📱 [K-Market アプリインストール案内]\n\nアドレスバーの [インストールアイコン (⊕)] またはメニュー(⋮)から [アプリをインストール] / [ホーム画面に追加] を選択してください！',
  },
  zh: {
    ios: '📱 [iPhone/Safari 安装指引]\n\n请点击浏览器底部的 [分享按钮 (↑)]，然后选择 [添加到主屏幕 (+)] 即可完成安装！',
    android: '📱 [K-Market 应用安装指引]\n\n点击地址栏右侧的 [安装图标 (⊕)] 或菜单(⋮)中的 [安装应用] / [添加到主屏幕] 即可1秒完成安装！',
  },
  vi: {
    ios: '📱 [Hướng dẫn cài đặt iPhone/Safari]\n\nVui lòng nhấn nút [Chia sẻ (↑)] ở thanh dưới cùng rồi chọn [Thêm vào Màn hình chính (+)] để cài đặt ngay!',
    android: '📱 [Hướng dẫn cài đặt App K-Market]\n\nNhấn biểu tượng [Cài đặt (⊕)] trên thanh địa chỉ hoặc menu (⋮) rồi chọn [Cài đặt ứng dụng] / [Thêm vào màn hình chính]!',
  },
  th: {
    ios: '📱 [วิธีติดตั้งแอปบน iPhone/Safari]\n\nแตะปุ่ม [แชร์ (↑)] ที่ด้านล่าง แล้วเลือก [เพิ่มไปยังหน้าจอหลัก (+)] เพื่อติดตั้งทันที!',
    android: '📱 [คำแนะนำการติดตั้งแอป K-Market]\n\nคลิกไอคอน [ติดตั้ง (⊕)] ในแถบที่อยู่หรือเมนู (⋮) แล้วเลือก [ติดตั้งแอป] / [เพิ่มไปยังหน้าจอหลัก]!',
  },
  bn: {
    ios: '📱 [আইফোন/সাফারি অ্যাপ ইনস্টল গাইড]\n\nস্ক্রিনের নিচে [শেয়ার (↑)] বোতামে ট্যাপ করুন এবং ইনস্টল করতে [হোম স্ক্রিনে যোগ করুন (+)] নির্বাচন করুন!',
    android: '📱 [K-Market অ্যাপ ইনস্টলেশন নির্দেশিকা]\n\nঠিকানা বারে [ইনস্টল আইকন (⊕)] অথবা মেনু (⋮) তে ক্লিক করুন এবং [অ্যাপ ইনস্টল করুন] / [হোম স্ক্রিনে যোগ করুন] নির্বাচন করুন!',
  },
  ru: {
    ios: '📱 [Инструкция по установке для iPhone/Safari]\n\nНажмите кнопку [Поделиться (↑)] внизу и выберите [На экран «Домой» (+)] для установки!',
    android: '📱 [Установка приложения K-Market]\n\nНажмите значок [Установить (⊕)] в адресной строке или меню (⋮) и выберите [Установить приложение] / [Добавить на главный экран]!',
  },
  uz: {
    ios: '📱 [iPhone/Safari ilova o‘rnatish qo‘llanmasi]\n\nPastki qismdagi [Ulashish (↑)] tugmasini bosing va o‘rnatish uchun [Bosh ekranga qo‘shish (+)] ni tanlang!',
    android: '📱 [K-Market ilovasini o‘rnatish]\n\nManzil satridagi [O‘rnatish (⊕)] belgisini yoki menyu (⋮) ni bosing va [Ilovani o‘rnatish] / [Bosh ekranga qo‘shish] ni tanlang!',
  },
  km: {
    ios: '📱 [ការណែនាំអំពីការដំឡើង iPhone/Safari]\n\nចុចប៊ូតុង [ចែករំលែក (↑)] នៅខាងក្រោម ហើយជ្រើសរើស [បន្ថែមទៅអេក្រង់ដើម (+)] ដើម្បីដំឡើង!',
    android: '📱 [ការណែនាំអំពីការដំឡើងកម្មវិធី K-Market]\n\nចុចរូបតំណាង [ដំឡើង (⊕)] នៅលើរបារអាសយដ្ឋាន ឬម៉ឺនុយ (⋮) ហើយជ្រើសរើស [ដំឡើងកម្មវិធី] / [បន្ថែមទៅអេក្រង់ដើម]!',
  },
  mn: {
    ios: '📱 [iPhone/Safari апп суулгах заавар]\n\nДоод талын [Хуваалцах (↑)] товчийг дараад [Үндсэн дэлгэцэнд нэмэх (+)] гэснийг сонгож суулгана уу!',
    android: '📱 [K-Market апп суулгах заавар]\n\nХаягийн мөр дэх [Суулгах (⊕)] дүрс эсвэл цэс (⋮) дээр дараад [Апп суулгах] / [Үндсэн дэлгэцэнд нэмэх] гэснийг сонгоно уу!',
  },
  ne: {
    ios: '📱 [iPhone/Safari एप स्थापना गाइड]\n\nतलको [साझा गर्नुहोस् (↑)] बटन थिच्नुहोस् र स्थापना गर्न [गृह स्क्रिनमा थप्नुहोस् (+)] छनौट गर्नुहोस्!',
    android: '📱 [K-Market एप स्थापना निर्देशन]\n\nठेगाना बारमा [स्थापना गर्नुहोस् (⊕)] प्रतिमा वा मेनु (⋮) मा क्लिक गर्नुहोस् र [एप स्थापना गर्नुहोस्] / [गृह स्क्रिनमा थप्नुहोस्] छनौट गर्नुहोस्!',
  },
  id: {
    ios: '📱 [Panduan Instalasi iPhone/Safari]\n\nKetuk tombol [Bagikan (↑)] di bagian bawah dan pilih [Tambahkan ke Layar Utama (+)] untuk menginstal!',
    android: '📱 [Petunjuk Pemasangan Aplikasi K-Market]\n\nKlik ikon [Pasang (⊕)] di bilah alamat atau menu (⋮) lalu pilih [Pasang Aplikasi] / [Tambahkan ke Layar Utama]!',
  },
  my: {
    ios: '📱 [iPhone/Safari အက်ပ်ထည့်သွင်းခြင်း လမ်းညွှန်]\n\nအောက်ခြေရှိ [မျှဝေရန် (↑)] ခလုတ်ကို နှိပ်ပြီး ထည့်သွင်းရန် [ပင်မမျက်နှာပြင်သို့ ထည့်ပါ (+)] ကို ရွေးပါ!',
    android: '📱 [K-Market အက်ပ်ထည့်သွင်းခြင်း လမ်းညွှန်]\n\nလိပ်စာဘားရှိ [ထည့်သွင်းရန် (⊕)] အိုင်ကွန် သို့မဟုတ် မီနူး (⋮) ကို နှိပ်ပြီး [အက်ပ်ထည့်သွင်းရန်] / [ပင်မမျက်နှာပြင်သို့ ထည့်ပါ] ကို ရွေးပါ!',
  },
  si: {
    ios: '📱 [iPhone/Safari යෙදුම් ස්ථාපන මාර්ගෝපදේශය]\n\nපහළ ඇති [බෙදාගන්න (↑)] බොත්තම තට්ටු කර ස්ථාපනය කිරීමට [මුල් තිරයට එක් කරන්න (+)] තෝරන්න!',
    android: '📱 [K-Market යෙදුම් ස්ථාපන උපදෙස්]\n\nලිපින තීරුවේ [ස්ථාපනය කරන්න (⊕)] අයිකනය හෝ මෙනුව (⋮) ක්ලික් කර [යෙදුම ස්ථාපනය කරන්න] / [මුල් තිරයට එක් කරන්න] තෝරන්න!',
  },
  kk: {
    ios: '📱 [iPhone/Safari қолданбасын орнату нұсқаулығы]\n\nТөмендегі [Бөлісу (↑)] түймесін басып, орнату үшін [Басты экранға қосу (+)] таңдаңыз!',
    android: '📱 [K-Market қолданбасын орнату нұсқаулығы]\n\nМекенжай жолағындағы [Орнату (⊕)] белгішесін немесе мәзірді (⋮) басып, [Қолданбаны орнату] / [Басты экранға қосу] таңдаңыз!',
  },
  ur: {
    ios: '📱 [iPhone/Safari ایپ انسٹالیشن گائیڈ]\n\nنیچے دیے گئے [شیئر (↑)] بٹن پر ٹیپ کریں اور انسٹال کرنے کے لیے [ہوم اسکرین میں شامل کریں (+)] منتخب کریں!',
    android: '📱 [K-Market ایپ انسٹالیشن ہدایات]\n\nایڈریس بار میں [انسٹال آئیکن (⊕)] یا مینو (⋮) پر کلک کریں اور [ایپ انسٹال کریں] / [ہوم اسکرین میں شامل کریں] منتخب کریں!',
  },
  tl: {
    ios: '📱 [Gabay sa Pag-install sa iPhone/Safari]\n\nI-tap ang button na [Ibahagi (↑)] sa ibaba at piliin ang [Idagdag sa Home Screen (+)] upang mag-install!',
    android: '📱 [Gabay sa Pag-install ng K-Market App]\n\nI-click ang [I-install icon (⊕)] sa address bar o menu (⋮) at piliin ang [I-install ang App] / [Idagdag sa Home Screen]!',
  },
};

// PWA 설치 여부 판별 함수 (스탠드얼론 앱 모드 또는 이미 설치 완료된 사용자)
export function isPwaInstalled(): boolean {
  if (typeof window === 'undefined') return false;

  // 1. 브라우저가 스탠드얼론(앱 모드)으로 실행 중인지 체크
  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true ||
    document.referrer.includes('android-app://');

  if (isStandalone) return true;

  // 2. 로컬스토리지에 설치 완료 기록이 있는지 체크
  const savedInstalled = localStorage.getItem('kmarket_pwa_installed');
  if (savedInstalled === 'true') return true;

  return false;
}

// 브라우저 초기화 시 설치 완료 이벤트 리스너 등록
if (typeof window !== 'undefined') {
  window.addEventListener('appinstalled', () => {
    try {
      localStorage.setItem('kmarket_pwa_installed', 'true');
    } catch (e) {
      // ignore
    }
  });
}

export async function triggerPwaInstall(): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  const deferredPrompt = (window as any).deferredPwaPrompt;

  if (deferredPrompt) {
    try {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        (window as any).deferredPwaPrompt = null;
        localStorage.setItem('kmarket_pwa_installed', 'true');
        return true;
      }
    } catch (err) {
      console.warn('PWA prompt error:', err);
    }
  }

  // 기기별 및 현재 언어별 정밀 안내
  const isIOS = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
  
  // URL 또는 로컬스토리지로부터 현재 활성 언어 감지
  let currentLang: SupportedLanguage = 'ko';
  const pathSegments = window.location.pathname.split('/').filter(Boolean);
  const urlLang = pathSegments[0] as SupportedLanguage;
  if (urlLang && SUPPORTED_LANGUAGES.some((l) => l.code === urlLang)) {
    currentLang = urlLang;
  } else {
    const saved = localStorage.getItem('kmarket_lang') as SupportedLanguage;
    if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
      currentLang = saved;
    }
  }

  const alertContent = INSTALL_ALERTS[currentLang] || INSTALL_ALERTS.ko;

  if (isIOS) {
    alert(alertContent.ios);
  } else {
    alert(alertContent.android);
  }

  return false;
}
