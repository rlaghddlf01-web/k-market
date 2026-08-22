import { LanguageOption, SupportedLanguage } from '@/types/kmarket';
import { LOCALES, buildUiTranslations, TranslationDictionary } from './i18n';

// 15개국 국가/언어 리스트 (한국어 다음 2순위: 🇺🇸 English 성조기 최상단 배치)
export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'ko', name: '한국어', nativeName: '한국어', flag: '🇰🇷', countryCode: 'kr' },
  { code: 'en', name: '영어', nativeName: 'English', flag: '🇺🇸', countryCode: 'us' },
  { code: 'vi', name: '베트남어', nativeName: 'Tiếng Việt', flag: '🇻🇳', countryCode: 'vn' },
  { code: 'zh', name: '중국어', nativeName: '中文', flag: '🇨🇳', countryCode: 'cn' },
  { code: 'km', name: '캄보디아어', nativeName: 'ភាសាខ្មែរ', flag: '🇰🇭', countryCode: 'kh' },
  { code: 'ne', name: '네팔어', nativeName: 'नेपाली', flag: '🇳🇵', countryCode: 'np' },
  { code: 'uz', name: '우즈베크어', nativeName: "O'zbekcha", flag: '🇺🇿', countryCode: 'uz' },
  { code: 'my', name: '미얀마어', nativeName: 'မြန်မာဘာသာ', flag: '🇲🇲', countryCode: 'mm' },
  { code: 'id', name: '인도네시아어', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', countryCode: 'id' },
  { code: 'th', name: '태국어', nativeName: 'ไทย', flag: '🇹🇭', countryCode: 'th' },
  { code: 'si', name: '스리랑카어', nativeName: 'සිංහල', flag: '🇱🇰', countryCode: 'lk' },
  { code: 'mn', name: '몽골어', nativeName: 'Монгол', flag: '🇲🇳', countryCode: 'mn' },
  { code: 'bn', name: '방글라데시어', nativeName: 'বাংলা', flag: '🇧🇩', countryCode: 'bd' },
  { code: 'kk', name: '카자흐스탄어', nativeName: 'Қазақша', flag: '🇰🇿', countryCode: 'kz' },
  { code: 'ur', name: '파키스탄어', nativeName: 'اردو', flag: '🇵🇰', countryCode: 'pk' },
];

export const REGIONS_DATA = [
  { id: 'all', nameKo: '전체 공단', nameEn: 'All Zones', icon: '🏭' },
  { id: 'pyeongtaek', nameKo: '평택 포승/고덕', nameEn: 'Pyeongtaek Poseung', icon: '📍' },
  { id: 'ansan', nameKo: '안산 반월/원곡동', nameEn: 'Ansan Wongok', icon: '📍' },
  { id: 'hwaseong', nameKo: '화성 향남/남양', nameEn: 'Hwaseong Hyangnam', icon: '📍' },
  { id: 'siheung', nameKo: '시흥 정왕/스마트', nameEn: 'Siheung Jeongwang', icon: '📍' },
  { id: 'gumi', nameKo: '구미 국가산단', nameEn: 'Gumi Industrial', icon: '📍' },
  { id: 'gimhae', nameKo: '김해 골든루트', nameEn: 'Gimhae Golden', icon: '📍' },
  { id: 'incheon', nameKo: '인천 남동공단', nameEn: 'Incheon Namdong', icon: '📍' },
  { id: 'gwangju', nameKo: '광주 하남공단', nameEn: 'Gwangju Hanam', icon: '📍' },
];

export const CATEGORIES_DATA = [
  { id: 'all', nameKo: '전체 매물', icon: '🛍️' },
  { id: 'moving_sale', nameKo: '무빙세일(귀국급처)', icon: '✈️' },
  { id: 'appliances', nameKo: '가전제품', icon: '🔌' },
  { id: 'furniture', nameKo: '가구/매트리스', icon: '🛏️' },
  { id: 'digital', nameKo: '전자기기/폰', icon: '📱' },
  { id: 'vehicles', nameKo: '자전거/킥보드', icon: '🚲' },
  { id: 'clothes', nameKo: '의류/생활용품', icon: '👕' },
  { id: 'free_give', nameKo: '무료 나눔(0원)', icon: '🎁' },
];

// 15개국 분리된 독립 언어 파일로부터 자동 조립된 UI_TRANSLATIONS
export const UI_TRANSLATIONS: Record<string, Record<SupportedLanguage, string>> = buildUiTranslations();

export { LOCALES };
export type { TranslationDictionary };
