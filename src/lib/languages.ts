import { LanguageOption, SupportedLanguage, ItemCategory, IndustrialRegion } from '@/types/kmarket';

// KTRS K-Market 17개국어 표준 언어 목록 (미국·일본·러시아 우선순위 적용)
export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: 'ko',
    name: '한국어',
    nativeName: '한국어',
    flag: '🇰🇷',
    countryCode: 'KR',
  },
  {
    code: 'vi',
    name: '베트남어',
    nativeName: 'Tiếng Việt',
    flag: '🇻🇳',
    countryCode: 'VN',
  },
  {
    code: 'zh',
    name: '중국어',
    nativeName: '中文',
    flag: '🇨🇳',
    countryCode: 'CN',
  },
  {
    code: 'en',
    name: '영어 (미국/글로벌/인도/필리핀)',
    nativeName: 'English',
    flag: '🇺🇸',
    countryCode: 'US',
  },
  {
    code: 'ja',
    name: '일본어',
    nativeName: '日本語',
    flag: '🇯🇵',
    countryCode: 'JP',
  },
  {
    code: 'ru',
    name: '러시아어 (고려인/중앙아시아)',
    nativeName: 'Русский',
    flag: '🇷🇺',
    countryCode: 'RU',
  },
  {
    code: 'th',
    name: '태국어',
    nativeName: 'ไทย',
    flag: '🇹🇭',
    countryCode: 'TH',
  },
  {
    code: 'uz',
    name: '우즈베크어',
    nativeName: "O'zbekcha",
    flag: '🇺🇿',
    countryCode: 'UZ',
  },
  {
    code: 'km',
    name: '캄보디아어',
    nativeName: 'ភាសាខ្មែរ',
    flag: '🇰🇭',
    countryCode: 'KH',
  },
  {
    code: 'mn',
    name: '몽골어',
    nativeName: 'Монгол',
    flag: '🇲🇳',
    countryCode: 'MN',
  },
  {
    code: 'ne',
    name: '네팔어',
    nativeName: 'नेपाली',
    flag: '🇳🇵',
    countryCode: 'NP',
  },
  {
    code: 'id',
    name: '인도네시아어',
    nativeName: 'Bahasa Indonesia',
    flag: '🇮🇩',
    countryCode: 'ID',
  },
  {
    code: 'my',
    name: '미얀마어',
    nativeName: 'မြန်မာဘာသာ',
    flag: '🇲🇲',
    countryCode: 'MM',
  },
  {
    code: 'si',
    name: '스리랑카어 (싱할라어)',
    nativeName: 'සිංහල',
    flag: '🇱🇰',
    countryCode: 'LK',
  },
  {
    code: 'kk',
    name: '카자흐어',
    nativeName: 'Қазақша',
    flag: '🇰🇿',
    countryCode: 'KZ',
  },
  {
    code: 'bn',
    name: '방글라데시어',
    nativeName: 'বাংলা',
    flag: '🇧🇩',
    countryCode: 'BD',
  },
  {
    code: 'ur',
    name: '우르두어 (파키스탄)',
    nativeName: 'اردو',
    flag: '🇵🇰',
    countryCode: 'PK',
  },
];

export const CATEGORIES_DATA: { id: ItemCategory; label: string; icon: string }[] = [
  { id: 'all', label: '전체', icon: '✨' },
  { id: 'moving_sale', label: '무빙세일', icon: '✈️' },
  { id: 'appliances', label: '생활가전', icon: '🔌' },
  { id: 'furniture', label: '가구/수납', icon: '🛏️' },
  { id: 'digital', label: '디지털', icon: '📱' },
  { id: 'clothes', label: '의류/잡화', icon: '👕' },
  { id: 'daily', label: '주방/생활', icon: '🍳' },
  { id: 'vehicles', label: '자전거/이동', icon: '🚲' },
  { id: 'free_give', label: '무료나눔', icon: '🎁' },
];

export const REGIONS_DATA: { id: IndustrialRegion; name: string; badge: string; icon: string; nameKo: string }[] = [
  { id: 'all', name: '전체 지역 직거래', badge: '전체', icon: '📍', nameKo: '전체' },
  { id: 'pyeongtaek', name: '경기 평택시', badge: '평택', icon: '📍', nameKo: '평택' },
  { id: 'ansan', name: '경기 안산시', badge: '안산', icon: '📍', nameKo: '안산' },
  { id: 'hwaseong', name: '경기 화성시', badge: '화성', icon: '📍', nameKo: '화성' },
  { id: 'siheung', name: '경기 시흥시', badge: '시흥', icon: '📍', nameKo: '시흥' },
  { id: 'gumi', name: '경북 구미시', badge: '구미', icon: '📍', nameKo: '구미' },
  { id: 'gimhae', name: '경남 김해시', badge: '김해', icon: '📍', nameKo: '김해' },
  { id: 'incheon', name: '인천광역시', badge: '인천', icon: '📍', nameKo: '인천' },
  { id: 'gwangju', name: '광주광역시', badge: '광주', icon: '📍', nameKo: '광주' },
];

export const LANGUAGE_DICTIONARY: Record<SupportedLanguage, LanguageOption> =
  SUPPORTED_LANGUAGES.reduce((acc, lang) => {
    acc[lang.code] = lang;
    return acc;
  }, {} as Record<SupportedLanguage, LanguageOption>);

export const DEFAULT_LANGUAGE: SupportedLanguage = 'ko';

export function getLanguageOption(code: string): LanguageOption {
  return LANGUAGE_DICTIONARY[code as SupportedLanguage] || LANGUAGE_DICTIONARY.ko;
}

export { UI_TRANSLATIONS, LOCALES } from './i18n';
