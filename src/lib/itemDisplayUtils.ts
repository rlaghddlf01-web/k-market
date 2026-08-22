import { KMarketItem, SupportedLanguage } from '@/types/kmarket';

export function getItemLocalizedTitle(item: KMarketItem, currentLang: SupportedLanguage): string {
  if (item.translations && item.translations[currentLang]?.title) {
    return item.translations[currentLang].title;
  }
  return item.title;
}

export function getItemLocalizedDescription(item: KMarketItem, currentLang: SupportedLanguage): string {
  if (item.translations && item.translations[currentLang]?.description) {
    return item.translations[currentLang].description;
  }
  return item.description;
}

export function hasItemTranslation(item: KMarketItem, currentLang: SupportedLanguage): boolean {
  if (!item.translations || !item.translations[currentLang]) return false;
  if (item.source_lang && item.source_lang === currentLang) return false;
  return Boolean(item.translations[currentLang].title || item.translations[currentLang].description);
}

const TIME_FORMATTERS: Record<string, { justNow: string; minAgo: string; hourAgo: string; dayAgo: string; monthAgo: string; recent: string }> = {
  ko: { justNow: '방금 전', minAgo: '분 전', hourAgo: '시간 전', dayAgo: '일 전', monthAgo: '개월 전', recent: '최근' },
  vi: { justNow: 'Vừa xong', minAgo: ' phút trước', hourAgo: ' giờ trước', dayAgo: ' ngày trước', monthAgo: ' tháng trước', recent: 'Gần đây' },
  zh: { justNow: '刚刚', minAgo: '分钟前', hourAgo: '小时前', dayAgo: '天前', monthAgo: '个月前', recent: '最近' },
  en: { justNow: 'Just now', minAgo: 'm ago', hourAgo: 'h ago', dayAgo: 'd ago', monthAgo: 'mo ago', recent: 'Recent' },
  ja: { justNow: 'たった今', minAgo: '分前', hourAgo: '時間前', dayAgo: '日前', monthAgo: 'ヶ月前', recent: '最近' },
  ru: { justNow: 'Только что', minAgo: ' мин назад', hourAgo: ' ч назад', dayAgo: ' дн назад', monthAgo: ' мес назад', recent: 'Недавно' },
  th: { justNow: 'เมื่อสักครู่', minAgo: ' นาทีที่แล้ว', hourAgo: ' ชั่วโมงที่แล้ว', dayAgo: ' วันที่แล้ว', monthAgo: ' เดือนที่แล้ว', recent: 'ล่าสุด' },
  uz: { justNow: 'Hozirgina', minAgo: ' daqiqa oldin', hourAgo: ' soat oldin', dayAgo: ' kun oldin', monthAgo: ' oy oldin', recent: 'Yaqinda' },
};

export function calcTimeAgo(dateStr: string, lang: SupportedLanguage = 'ko'): string {
  try {
    const diffMs = Date.now() - new Date(dateStr).getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const fmt = TIME_FORMATTERS[lang] || TIME_FORMATTERS.en || TIME_FORMATTERS.ko;

    if (diffSec < 60) return fmt.justNow;
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}${fmt.minAgo}`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}${fmt.hourAgo}`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `${diffDays}${fmt.dayAgo}`;
    return `${Math.floor(diffDays / 30)}${fmt.monthAgo}`;
  } catch {
    const fmt = TIME_FORMATTERS[lang] || TIME_FORMATTERS.ko;
    return fmt.recent;
  }
}
