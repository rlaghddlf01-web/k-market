// K-Market 귀국 D-Day 무빙세일 긴박감 상태 및 뱃지 관리 유틸리티 (17개국어 다국어 완벽 지원)

import { SupportedLanguage } from '@/types/kmarket';

export type MovingSaleUrgency = 'urgent_final' | 'hot_discount' | 'advance_reservation';

export interface MovingSaleBadgeInfo {
  urgency: MovingSaleUrgency;
  badgeText: string;
  badgeSubText: string;
  badgeColorClass: string;
  pulse: boolean;
  filterLabel: string;
  color?: string;
  icon?: string;
  text?: string;
}

const BADGE_TEXT_17LANG: Record<'d3' | 'd7' | 'd14', Record<SupportedLanguage, string>> = {
  d3: {
    ko: '오늘마감',
    en: 'Ends Today',
    vi: 'Hết hôm nay',
    zh: '今日截止',
    ja: '本日終了',
    ru: 'Сегодня финал',
    th: 'วันสุดท้าย',
    uz: 'Bugun oxirgi kun',
    km: 'ថ្ងៃចុងក្រោយ',
    mn: 'Өнөөдөр дуусна',
    ne: 'आज अन्तिम',
    id: 'Hari Ini Terakhir',
    my: 'ယနေ့ကုန်ဆုံးမည်',
    si: 'අද අවසන්',
    kk: 'Бүгін соңғы күн',
    bn: 'আজই শেষ দিন',
    ur: 'آج آخری دن',
    tl: 'Matatapos Ngayon',
  },
  d7: {
    ko: '초특가',
    en: 'Super Deal',
    vi: 'Siêu giảm giá',
    zh: '特价大清仓',
    ja: '超特価',
    ru: 'Супер скидка',
    th: 'ราคาพิเศษสุด',
    uz: 'Katta chegirma',
    km: 'តម្លៃពិសេស',
    mn: 'Онцгой хямдрал',
    ne: 'भारी छुट',
    id: 'Diskon Spesial',
    my: 'အထူးလျှော့ဈေး',
    si: 'විශේෂ වට්ටම්',
    kk: 'Үлкен жеңілдік',
    bn: 'বিশাল ছাড়',
    ur: 'خصوصی رعایت',
    tl: 'Super Sale',
  },
  d14: {
    ko: '묶음할인',
    en: 'Bundle Sale',
    vi: 'Combo giá rẻ',
    zh: '打包特惠',
    ja: 'まとめ割',
    ru: 'Скидка на набор',
    th: 'เซ็ตสุดคุ้ม',
    uz: 'To\'plam chegirma',
    km: 'បញ្ចុះតម្លៃជាកញ្ចប់',
    mn: 'Багцын хямдрал',
    ne: 'प्याकेज छुट',
    id: 'Diskon Paket',
    my: 'တွဲဖက်လျှော့ဈေး',
    si: 'පැකේජ වට්ටම්',
    kk: 'Жиынтық жеңілдік',
    bn: 'প্যাকেজ ছাড়',
    ur: 'پیکیج رعایت',
    tl: 'Bundle Discount',
  },
};

export function getMovingSaleBadgeInfo(dDay: number = 7, lang: SupportedLanguage = 'ko'): MovingSaleBadgeInfo {
  if (dDay <= 3) {
    const textLabel = BADGE_TEXT_17LANG.d3[lang] || BADGE_TEXT_17LANG.d3.ko;
    return {
      urgency: 'urgent_final',
      badgeText: `🚨 D-${dDay} ${textLabel}`,
      badgeSubText: textLabel,
      badgeColorClass: 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-500/30 ring-1 ring-red-300',
      pulse: true,
      filterLabel: `🚨 D-3 ${textLabel}`,
      color: 'bg-red-600 text-white',
      icon: '🚨',
      text: `D-${dDay} ${textLabel}`,
    };
  }

  if (dDay <= 7) {
    const textLabel = BADGE_TEXT_17LANG.d7[lang] || BADGE_TEXT_17LANG.d7.ko;
    return {
      urgency: 'hot_discount',
      badgeText: `🔥 D-${dDay} ${textLabel}`,
      badgeSubText: textLabel,
      badgeColorClass: 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-md shadow-orange-500/25',
      pulse: false,
      filterLabel: `🔥 D-7 ${textLabel}`,
      color: 'bg-orange-600 text-white',
      icon: '🔥',
      text: `D-${dDay} ${textLabel}`,
    };
  }

  const textLabel = BADGE_TEXT_17LANG.d14[lang] || BADGE_TEXT_17LANG.d14.ko;
  return {
    urgency: 'advance_reservation',
    badgeText: `✈️ D-${dDay} ${textLabel}`,
    badgeSubText: textLabel,
    badgeColorClass: 'bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-md shadow-blue-500/20',
    pulse: false,
    filterLabel: `✈️ D-14 ${textLabel}`,
    color: 'bg-blue-600 text-white',
    icon: '✈️',
    text: `D-${dDay} ${textLabel}`,
  };
}
