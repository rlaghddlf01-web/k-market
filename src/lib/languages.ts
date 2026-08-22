import { LanguageOption, SupportedLanguage } from '@/types/kmarket';

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
