// K-Market 외국인 밀집 공단 직거래 랜드마크 & 지도 핀 데이터

export interface LandmarkPin {
  id: string;
  zone: string;
  zoneName: string;
  name: string; // "포승공단 GS25 앞"
  detail: string; // "기숙사 2동 맞은편, 가로등 밝은 곳"
  address: string; // "경기 평택시 포승읍 포승공단로 117"
  lat: number;
  lng: number;
  icon: string;
}

export const POPULAR_LANDMARKS: LandmarkPin[] = [
  {
    id: 'lm-pyeongtaek-1',
    zone: 'pyeongtaek',
    zoneName: '평택 포승공단',
    name: '포승공단 GS25 편의점 앞',
    detail: '기숙사 2동 맞은편, 24시간 가로등 밝고 CCTV 있는 곳',
    address: '경기 평택시 포승읍 포승공단로 117',
    lat: 36.9852,
    lng: 126.8571,
    icon: '🏪',
  },
  {
    id: 'lm-pyeongtaek-2',
    zone: 'pyeongtaek',
    zoneName: '평택 고덕',
    name: '고덕 삼성캠퍼스 동문 버스정류장',
    detail: '퇴근 시간 통근버스 하차장 앞 벤치',
    address: '경기 평택시 고덕면 삼성로 114',
    lat: 37.0421,
    lng: 127.0451,
    icon: '🚌',
  },
  {
    id: 'lm-ansan-1',
    zone: 'ansan',
    zoneName: '안산 원곡동',
    name: '원곡동 다문화거리 시계탑 광장',
    detail: '외국인 만남의 광장 대형 시계탑 바로 앞',
    address: '경기 안산시 단원구 원곡동 795',
    lat: 37.3275,
    lng: 126.7924,
    icon: '⏰',
  },
  {
    id: 'lm-ansan-2',
    zone: 'ansan',
    zoneName: '안산 반월공단',
    name: '반월공단 정문 원시역 1번 출구',
    detail: '서해선 원시역 1번 출구 엘리베이터 앞',
    address: '경기 안산시 단원구 산단로 100',
    lat: 37.3012,
    lng: 126.7865,
    icon: '🚇',
  },
  {
    id: 'lm-hwaseong-1',
    zone: 'hwaseong',
    zoneName: '화성 향남',
    name: '향남 제약공단 기숙사 정문 경비실 앞',
    detail: '제약단지 중앙통로 기숙사 입구 쉼터',
    address: '경기 화성시 향남읍 제약공단1길 23',
    lat: 37.1124,
    lng: 126.9015,
    icon: '🏢',
  },
  {
    id: 'lm-siheung-1',
    zone: 'siheung',
    zoneName: '시흥 정왕',
    name: '정왕역 2번 출구 만남의 쉼터',
    detail: '정왕역 2번 출구 자전거 주차장 옆 파고라',
    address: '경기 시흥시 정왕대로 233',
    lat: 37.3518,
    lng: 126.7428,
    icon: '🚉',
  },
  {
    id: 'lm-gumi-1',
    zone: 'gumi',
    zoneName: '구미 공단',
    name: '구미 국가1산업단지 복지회관 앞',
    detail: '공단 복지센터 1층 농협 ATM 부스 앞',
    address: '경북 구미시 1공단로 188',
    lat: 36.1154,
    lng: 128.3745,
    icon: '🏦',
  },
  {
    id: 'lm-gimhae-1',
    zone: 'gimhae',
    zoneName: '김해 골든루트',
    name: '골든루트 산단 메인 광장 CU 앞',
    detail: '단지 내 중앙상가 1층 편의점 파라솔',
    address: '경남 김해시 주촌면 골든루트로 66',
    lat: 35.2341,
    lng: 128.8214,
    icon: '🏪',
  },
];
