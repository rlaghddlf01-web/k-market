// KTRS K-Market 중고나라 실매물 랜덤 셔플 & 다중 사진 로더

import { KMarketItem, ItemCategory, SupportedLanguage } from '@/types/kmarket';
import joongnaMultiRaw from '../../joongna_multi_compressed_500.json';

const SELLERS_POOL = [
  { name: 'Nguyen Van Tu', country: 'VN', flag: '🇻🇳', temp: 39.5, lang: 'vi' },
  { name: 'Tran Thi Mai', country: 'VN', flag: '🇻🇳', temp: 40.2, lang: 'vi' },
  { name: 'Le Hoang Nam', country: 'VN', flag: '🇻🇳', temp: 38.1, lang: 'vi' },
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

// 🔀 시드 기반 난수 생성기 (새로고침 시에도 동일한 순서 유지하면서 완벽 셔플)
function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export function getJoongnaRealItems(): KMarketItem[] {
  const rawList = Array.isArray(joongnaMultiRaw) ? [...joongnaMultiRaw] : [];
  
  // 🔀 카테고리 쏠림 방지: Fisher-Yates 알고리즘으로 무작위 셔플
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
    if (cat === 'free_give' || raw.term === '무료나눔' || raw.term === '이사나눔') {
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

    const titlePrefix = isMoving ? `✈️ [귀국 D-${movingDDay}] ` : price === 0 ? '🎁 [0원 무료나눔] ' : '';
    const cleanTitle = raw.title || `${raw.term} 팝니다`;
    const fullTitle = `${titlePrefix}${cleanTitle}`;

    const photoList = Array.isArray(raw.images) && raw.images.length > 0
      ? raw.images
      : ['https://img2.joongna.com/media/original/2026/07/20/1784543687792qcM_p3jSz.jpg?impolicy=thumb&size=500'];

    return {
      id: `item-real-${i}`,
      seller_id: `user-${seller.country.toLowerCase()}-${i}`,
      seller_name: seller.name,
      seller_phone: `010-${String(2000 + (i * 17) % 8000).padStart(4, '0')}-${String(1000 + (i * 31) % 9000).padStart(4, '0')}`,
      seller_country: seller.country,
      seller_country_flag: seller.flag,
      title: fullTitle,
      description: `${isMoving ? `다음 주 비자 만료로 귀국 예정이라 원룸 기숙사 살림 정리합니다! ` : ''}원룸 기숙사에서 깨끗하게 사용하던 물건입니다. 사진 보시는 것처럼 상태 양호하고 작동 100% 잘 됩니다. 공단 기숙사 입구/편의점 앞 직거래 원합니다. 1:1 번역 채팅으로 편하게 연락주세요!`,
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
      source_lang: seller.lang as SupportedLanguage,
      translations: {
        vi: {
          title: fullTitle,
          description: 'Đồ dùng ký túc xá còn rất tốt, có nhiều ảnh chi tiết chụp thực tế. Hoạt động hoàn hảo 100%. Giao dịch trực tiếp gần KTX. Chat 1:1 ngay nhé!',
        },
        en: {
          title: fullTitle,
          description: 'Used item from dorm room with multiple detailed real photos. Works 100% perfectly. Meetup near dorm entrance. Feel free to chat!',
        },
        mn: {
          title: fullTitle,
          description: 'Дотуур байранд цэвэрхэн хэрэглэсэн, олон бодит зурагтай. 100% сайн ажилладаг. Дотуур байрны үүдэнд уулзаж авна уу.',
        },
        zh: {
          title: fullTitle,
          description: '宿舍自用闲置好物，多角度实拍照片，运转正常成色佳。支持线下当面交易，欢迎1:1翻译咨询！',
        },
      },
      created_at: createdAt,
      updated_at: createdAt,
    };
  });
}
