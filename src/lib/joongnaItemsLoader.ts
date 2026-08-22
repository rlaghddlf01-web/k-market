// KTRS K-Market 중고나라 실매물 랜덤 셔플 & 17개국어 전수 번역 로더

import { KMarketItem, ItemCategory, SupportedLanguage } from '@/types/kmarket';
import joongnaMultiRaw from '../../joongna_multi_compressed_500.json';
import { generate15LangTranslations } from './itemTranslationService';

const SELLERS_POOL = [
  { name: 'Nguyen Van Tu', country: 'VN', flag: '🇻🇳', temp: 39.5, lang: 'vi' },
  { name: 'Tran Thi Mai', country: 'VN', flag: '🇻🇳', temp: 40.2, lang: 'vi' },
  { name: 'Le Hoang Nam', country: 'VN', flag: '🇻🇳', temp: 38.1, lang: 'vi' },
  { name: 'Kenji Sato (佐藤 健二)', country: 'JP', flag: '🇯🇵', temp: 41.2, lang: 'ja' },
  { name: 'Elena Ivanova (Елена)', country: 'RU', flag: '🇷🇺', temp: 39.8, lang: 'ru' },
  { name: 'Bat-Erdene', country: 'MN', flag: '🇲🇳', temp: 41.0, lang: 'mn' },
  { name: 'Zolboo', country: 'MN', flag: '🇲🇳', temp: 37.8, lang: 'mn' },
  { name: 'Somchai Prasert', country: 'TH', flag: '🇹🇭', temp: 39.0, lang: 'th' },
  { name: 'Anong Ketsuda', country: 'TH', flag: '🇹🇭', temp: 40.5, lang: 'th' },
  { name: 'Jasur Bek', country: 'UZ', flag: '🇺🇿', temp: 38.6, lang: 'uz' },
  { name: 'Otabek Mirzayev', country: 'UZ', flag: '🇺🇿', temp: 41.2, lang: 'uz' },
  { name: 'Ramesh Adhikari', country: 'NE', flag: '🇳🇵', temp: 39.8, lang: 'ne' },
  { name: 'Suman Thapa', country: 'NE', flag: '🇳🇵', temp: 38.4, lang: 'ne' },
  { name: 'Aung Kyaw Moe', country: 'MY', flag: '🇲🇲', temp: 40.0, lang: 'my' },
  { name: 'Budi Santoso', country: 'ID', flag: '🇮🇩', temp: 37.9, lang: 'id' },
  { name: 'Sokha Chea', country: 'KM', flag: '🇰🇭', temp: 39.3, lang: 'km' },
  { name: 'Zhang Wei (张伟)', country: 'CN', flag: '🇨🇳', temp: 40.8, lang: 'zh' },
  { name: 'Li Na (李娜)', country: 'CN', flag: '🇨🇳', temp: 38.9, lang: 'zh' },
  { name: 'Mohammad Ali', country: 'PK', flag: '🇵🇰', temp: 39.1, lang: 'ur' },
  { name: 'Nurlan Sadykov', country: 'KZ', flag: '🇰🇿', temp: 38.7, lang: 'kk' },
  { name: 'John Santos', country: 'PH', flag: '🇵🇭', temp: 41.5, lang: 'en' },
  { name: '박철수 (반장님)', country: 'KR', flag: '🇰🇷', temp: 42.1, lang: 'ko' },
  { name: '김태현 (기숙사총무)', country: 'KR', flag: '🇰🇷', temp: 39.9, lang: 'ko' },
];

const INDUSTRIAL_ZONES = [
  'pyeongtaek',
  'ansan',
  'hwaseong',
  'siheung',
  'gumi',
  'gimhae',
  'incheon',
  'gwangju',
] as const;

const PRICE_MAP: Record<string, [number, number]> = {
  appliances: [20000, 75000],
  furniture: [15000, 45000],
  vehicles: [35000, 160000],
  digital: [25000, 230000],
  daily: [5000, 25000],
  free_give: [0, 0],
  moving_sale: [30000, 85000],
};

function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export function getJoongnaRealItems(): KMarketItem[] {
  const rawList = Array.isArray(joongnaMultiRaw) ? [...joongnaMultiRaw] : [];
  
  for (let i = rawList.length - 1; i > 0; i--) {
    const j = Math.floor(pseudoRandom(i * 97 + 13) * (i + 1));
    [rawList[i], rawList[j]] = [rawList[j], rawList[i]];
  }

  return rawList.map((raw, idx) => {
    const i = idx + 1;
    const seller = SELLERS_POOL[(i * 3 + 5) % SELLERS_POOL.length];
    const zone = INDUSTRIAL_ZONES[(i - 1) % INDUSTRIAL_ZONES.length];
    const cat = (raw.category as ItemCategory) || 'appliances';
    const range = PRICE_MAP[cat] || [15000, 60000];

    let price = range[0] === 0 ? 0 : Math.round((range[0] + ((i * 347) % (range[1] - range[0] + 1000))) / 5000) * 5000;
    const isFree = cat === 'free_give' || raw.term === '무료나눔' || raw.term === '이사나눔';
    if (isFree) {
      price = 0;
    }
    const origPrice = price === 0 ? 35000 : Math.round(price * 3.5);

    const isMoving = cat === 'moving_sale' || (i % 6 === 0);
    const movingDDay = isMoving ? (i % 7) + 1 : undefined;

    let status: 'selling' | 'reserved' | 'sold' = 'selling';
    if (i % 17 === 0) status = 'sold';
    else if (i % 5 === 0) status = 'reserved';

    const minutesAgo = Math.floor(Math.pow((i % 40), 1.7) * 5) + (i % 7);
    const createdAt = new Date(Date.now() - minutesAgo * 60 * 1000).toISOString();

    const titlePrefix = isMoving ? `✈️ [귀국 D-${movingDDay}] ` : isFree ? '🎁 [0원 무료나눔] ' : '';
    const cleanTitle = raw.title || `${raw.term} 팝니다`;
    const fullKoreanTitle = `${titlePrefix}${cleanTitle}`;

    const photoList = Array.isArray(raw.images) && raw.images.length > 0
      ? raw.images
      : ['https://img2.joongna.com/media/original/2026/07/20/1784543687792qcM_p3jSz.jpg?impolicy=thumb&size=500'];

    // 🌐 17개국어 전체 번역 매트릭스 생성
    const allTranslations = generate15LangTranslations(
      fullKoreanTitle,
      isMoving,
      isFree,
      movingDDay
    );

    return {
      id: `item-real-${i}`,
      seller_id: `user-${seller.country.toLowerCase()}-${i}`,
      seller_name: seller.name,
      seller_phone: `010-${String(2000 + (i * 17) % 8000).padStart(4, '0')}-${String(1000 + (i * 31) % 9000).padStart(4, '0')}`,
      seller_country: seller.country,
      seller_country_flag: seller.flag,
      title: fullKoreanTitle,
      description: allTranslations.ko.description,
      price,
      original_price: origPrice,
      category: cat,
      images: photoList,
      region: '내 주변 공단 기숙사 입구',
      industrial_zone: zone,
      status,
      view_count: 28 + (i * 13) % 220,
      like_count: 4 + (i * 7) % 38,
      is_moving_sale: isMoving,
      moving_d_day: movingDDay,
      source_lang: 'ko',
      translations: allTranslations,
      created_at: createdAt,
      updated_at: createdAt,
    };
  });
}
