// KTRS K-Market 다이내믹 위치 적응 엔진 (Dynamic Location Adapter)
// 고객의 현재 위치(또는 선택 지역)에 따라 500개 매물의 직거래 랜드마크를 고객 동네로 실시간 맞춤 변환

import { KMarketItem, IndustrialRegion } from '@/types/kmarket';

// 지역별 대표 공단 및 랜드마크 딕셔너리
const REGION_LANDMARKS: Record<string, { zoneName: string; spots: string[] }> = {
  pyeongtaek: {
    zoneName: '평택 포승/고덕',
    spots: ['포승 원룸단지 GS25 앞', '포승 기숙사 정문', '고덕 삼성전자 통근버스 승차장', '포승 다이소 앞', '만호리 외국인 쉼터'],
  },
  ansan: {
    zoneName: '안산 반월/원곡동',
    spots: ['원곡동 다문화거리 입구', '안산역 1번 출구 광장', '반월공단 기숙사 3단지 앞', '신길동 원룸촌 GS25', '원곡본동 행정복지센터 앞'],
  },
  hwaseong: {
    zoneName: '화성 향남/남양',
    spots: ['향남 제약공단 기숙사 입구', '남양 현대기아연구소 앞', '발안시장 입구 외국인마트', '팔탄 율암리 원룸단지', '마도산단 통근버스 탑승장'],
  },
  siheung: {
    zoneName: '시흥 정왕/시화',
    spots: ['정왕역 2번 출구 앞', '시화공단 4블록 기숙사 앞', '정왕동 이마트 맞은편', '시화병원 뒤편 외국인골목', '정왕시장 정문'],
  },
  gumi: {
    zoneName: '구미 국가산단',
    spots: ['구미 3공단 LG디스플레이 앞', '인동 농협사거리', '진평동 먹자골목 원룸단지', '황상동 기숙사 편의점', '구미 1공단 수출탑 앞'],
  },
  gimhae: {
    zoneName: '김해 골든루트/부산',
    spots: ['김해 골든루트산단 입구', '부산 사상공단 기숙사 앞', '동상동 외국인거리', '부산 녹산국가산단 GS25 앞', '주촌산단 기숙사 앞'],
  },
  incheon: {
    zoneName: '인천 남동공단',
    spots: ['남동인더스파크역 2번 출구', '호구포역 앞 광장', '남동공단 우체국 앞', '동춘동 한진아파트 입구', '남동공단 공구상가 앞'],
  },
  gwangju: {
    zoneName: '광주 하남공단',
    spots: ['하남공단 6번로 삼성전자 앞', '월곡동 고려인마을 입구', '하남산단 혁신지원센터', '흑석사거리 GS25', '산정동 원룸단지 앞'],
  },
  all: {
    zoneName: '내 주변 공단',
    spots: ['기숙사 입구 도보 3분', '공단 통근버스 승차장 앞', '기숙사 편의점 앞', '원룸단지 입구', '공단 광장 앞'],
  },
};

/**
 * 접속한 사용자의 현재 위치(userRegion)에 맞춰 매물의 거래 장소를 실시간으로 적응시키는 함수
 */
export function getAdaptedItemRegion(item: KMarketItem, userRegion: IndustrialRegion = 'all'): string {
  // 사용자가 특정 지역을 선택했거나 GPS 위치가 있으면 해당 지역 랜드마크로 적응
  const targetKey = userRegion !== 'all' ? userRegion : item.industrial_zone || 'pyeongtaek';
  const regionConfig = REGION_LANDMARKS[targetKey] || REGION_LANDMARKS.pyeongtaek;

  // 매물 ID 기반으로 일관된 랜드마크 인덱스 추출 (새로고침해도 해당 매물은 같은 위치 유지)
  const idNum = parseInt(item.id.replace(/\D/g, ''), 10) || 1;
  const spot = regionConfig.spots[(idNum - 1) % regionConfig.spots.length];

  return `${regionConfig.zoneName} ${spot}`;
}
