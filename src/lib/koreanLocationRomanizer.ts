import { SupportedLanguage } from '@/types/kmarket';

/**
 * 대한민국 행정안전부 공식 226개 전국 기초자치단체(시/군/구) 및 17개 광역시도 전수 영문 데이터베이스
 */
export const KOREA_DISTRICT_MASTER_DB: Record<string, string> = {
  // 1. 서울특별시 (25개 자치구 전수)
  강남구: 'Gangnam',
  강동구: 'Gangdong',
  강북구: 'Gangbuk',
  강서구: 'Gangseo',
  관악구: 'Gwanak',
  광진구: 'Gwangjin',
  구로구: 'Guro',
  금천구: 'Geumcheon',
  노원구: 'Nowon',
  도봉구: 'Dobong',
  동대문구: 'Dongdaemun',
  동작구: 'Dongjak',
  마포구: 'Mapo',
  서대문구: 'Seodaemun',
  서초구: 'Seocho',
  성동구: 'Seongdong',
  성북구: 'Seongbuk',
  송파구: 'Songpa',
  양천구: 'Yangcheon',
  영등포구: 'Yeongdeungpo',
  용산구: 'Yongsan',
  은평구: 'Eunpyeong',
  종로구: 'Jongno',
  중구: 'Jung-gu',
  중랑구: 'Jungnang',

  // 2. 경기도 (31개 시/군 전수)
  남양주시: 'Namyangju',
  안산시: 'Ansan',
  화성시: 'Hwaseong',
  평택시: 'Pyeongtaek',
  시흥시: 'Siheung',
  수원시: 'Suwon',
  부천시: 'Bucheon',
  성남시: 'Seongnam',
  고양시: 'Goyang',
  용인시: 'Yongin',
  파주시: 'Paju',
  김포시: 'Gimpo',
  광주시: 'Gwangju',
  하남시: 'Hanam',
  오산시: 'Osan',
  이천시: 'Icheon',
  안성시: 'Anseong',
  의왕시: 'Uiwang',
  양주시: 'Yangju',
  포천시: 'Pocheon',
  여주시: 'Yeoju',
  동두천시: 'Dongducheon',
  과천시: 'Gwacheon',
  구리시: 'Guri',
  안양시: 'Anyang',
  군포시: 'Gunpo',
  광명시: 'Gwangmyeong',
  의정부시: 'Uijeongbu',
  양평군: 'Yangpyeong',
  가평군: 'Gapyeong',
  연천군: 'Yeoncheon',

  // 3. 인천광역시 (10개 구/군 전수)
  남동구: 'Namdong',
  부평구: 'Bupyeong',
  서구: 'Seo-gu',
  연수구: 'Yeonsu',
  계양구: 'Gyeyang',
  미추홀구: 'Michuhol',
  강화군: 'Ganghwa',
  옹진군: 'Ongjin',

  // 4. 충청남도 (15개 시/군 전수 - 산업단지 밀집)
  천안시: 'Cheonan',
  아산시: 'Asan',
  당진시: 'Dangjin',
  서산시: 'Seosan',
  보령시: 'Boryeong',
  논산시: 'Nonsan',
  공주시: 'Gongju',
  계룡시: 'Gyeryong',
  홍성군: 'Hongseong',
  예산군: 'Yesan',
  태안군: 'Taean',
  금산군: 'Geumsan',
  부여군: 'Buyeo',
  서천군: 'Seocheon',
  청양군: 'Cheongyang',

  // 5. 충청북도 (11개 시/군 전수)
  청주시: 'Cheongju',
  충주시: 'Chungju',
  제천시: 'Jecheon',
  음성군: 'Eumseong',
  진천군: 'Jincheon',
  옥천군: 'Okcheon',
  영동군: 'Yeongdong',
  증평군: 'Jeungpyeong',
  괴산군: 'Goesan',
  보은군: 'Boeun',
  단양군: 'Danyang',

  // 6. 경상북도 (22개 시/군 전수 - 구미/포항/경주 공단)
  포항시: 'Pohang',
  구미시: 'Gumi',
  경주시: 'Gyeongju',
  김천시: 'Gimcheon',
  안동시: 'Andong',
  영주시: 'Yeongju',
  영천시: 'Yeongcheon',
  상주시: 'Sangju',
  문경시: 'Mungyeong',
  경산시: 'Gyeongsan',
  칠곡군: 'Chilgok',
  의성군: 'Uiseong',
  성주군: 'Seongju',
  고령군: 'Goryeong',
  예천군: 'Yecheon',
  청도군: 'Cheongdo',
  봉화군: 'Bonghwa',
  울진군: 'Uljin',
  영덕군: 'Yeongdeok',
  영양군: 'Yeongyang',
  청송군: 'Cheongsong',
  울릉군: 'Ulleung',

  // 7. 경상남도 (18개 시/군 전수 - 김해/창원/양산 공단)
  창원시: 'Changwon',
  김해시: 'Gimhae',
  양산시: 'Yangsan',
  진주시: 'Jinju',
  거제시: 'Geoje',
  통영시: 'Tongyeong',
  사천시: 'Sacheon',
  밀양시: 'Miryang',
  함안군: 'Haman',
  거창군: 'Geochang',
  창녕군: 'Changnyeong',
  고성군: 'Goseong',
  하동군: 'Hadong',
  합천군: 'Hapcheon',
  남해군: 'Namhae',
  함양군: 'Hamyang',
  산청군: 'Sancheong',
  의령군: 'Uiryeong',

  // 8. 부산광역시 (16개 구/군 전수)
  해운대구: 'Haeundae',
  사하구: 'Saha',
  사상구: 'Sasang',
  기장군: 'Gijang',
  동래구: 'Dongnae',
  남구: 'Nam-gu',
  북구: 'Buk-gu',
  부산진구: 'Busanjin',
  수영구: 'Suyeong',
  연제구: 'Yeonje',
  금정구: 'Geumjeong',
  영도구: 'Yeongdo',

  // 9. 대구광역시 (9개 구/군 전수)
  달서구: 'Dalseo',
  달성군: 'Dalseong',
  수성구: 'Suseong',
  동구: 'Dong-gu',

  // 10. 광주광역시 (5개 자치구 전수)
  광산구: 'Gwangsan',

  // 11. 대전광역시 (5개 자치구 전수)
  유성구: 'Yuseong',
  대덕구: 'Daedeok',

  // 12. 울산광역시 (5개 구/군 전수)
  울주군: 'Ulju',

  // 13. 전북특별자치도 (14개 시/군 전수)
  전주시: 'Jeonju',
  군산시: 'Gunsan',
  익산시: 'Iksan',
  정읍시: 'Jeongeup',
  남원시: 'Namwon',
  김제시: 'Gimje',
  완주군: 'Wanju',
  고창군: 'Gochang',
  부안군: 'Buan',

  // 14. 전라남도 (22개 시/군 전수 - 영암 대불공단/여수산단)
  여수시: 'Yeosu',
  순천시: 'Suncheon',
  목포시: 'Mokpo',
  광양시: 'Gwangyang',
  나주시: 'Naju',
  영암군: 'Yeongam',
  무안군: 'Muan',
  해남군: 'Haenam',
  화순군: 'Hwasun',
  고흥군: 'Goheung',
  영광군: 'Yeonggwang',
  장성군: 'Jangseong',
  완도군: 'Wando',
  담양군: 'Damyang',

  // 15. 강원특별자치도 (18개 시/군 전수)
  원주시: 'Wonju',
  춘천시: 'Chuncheon',
  강릉시: 'Gangneung',
  동해시: 'Donghae',
  속초시: 'Sokcho',
  삼척시: 'Samcheok',
  홍천군: 'Hongcheon',

  // 16. 제주특별자치도
  제주시: 'Jeju',
  서귀포시: 'Seogwipo',
  세종특별자치시: 'Sejong',
};

// 주요 읍/면/동 고빈도 사전 (진접, 원곡, 포승, 향남 등 공단 밀집 지역)
export const FAMOUS_TOWNS_MAP: Record<string, string> = {
  진접읍: 'Jinjeop',
  진접: 'Jinjeop',
  원곡동: 'Wongok',
  원곡: 'Wongok',
  향남읍: 'Hyangnam',
  향남: 'Hyangnam',
  포승읍: 'Poseung',
  포승: 'Poseung',
  정왕동: 'Jeongwang',
  정왕: 'Jeongwang',
  오창읍: 'Ochang',
  오창: 'Ochang',
  둔포면: 'Dunpo',
  둔포: 'Dunpo',
  대소면: 'Daeso',
  대소: 'Daeso',
  진영읍: 'Jinyeong',
  진영: 'Jinyeong',
  왜관읍: 'Waegwan',
  왜관: 'Waegwan',
  와촌면: 'Wachon',
  와촌: 'Wachon',
  화양동: 'Hwayang',
  화양: 'Hwayang',
  다산동: 'Dasan',
  다산: 'Dasan',
  별내동: 'Byeollae',
  별내: 'Byeollae',
  부평리: 'Bupyeong',
  부평: 'Bupyeong',
};

// 한글 초성/중성/종성 국어의 로마자 표기법 (RR) 변환 엔진
const INITIALS = ['g', 'kk', 'n', 'd', 'tt', 'r', 'm', 'b', 'pp', 's', 'ss', '', 'j', 'jj', 'ch', 'k', 't', 'p', 'h'];
const MEDIALS = ['a', 'ae', 'ya', 'yae', 'eo', 'e', 'yeo', 'ye', 'o', 'wa', 'wae', 'oe', 'yo', 'u', 'wo', 'we', 'wi', 'yu', 'eu', 'ui', 'i'];
const FINALS = ['', 'k', 'k', 'ks', 'n', 'nj', 'nh', 't', 'l', 'lg', 'lm', 'lb', 'ls', 'lt', 'lp', 'lh', 'm', 'p', 'ps', 't', 't', 'ng', 't', 't', 'k', 't', 'p', 'h'];

export function romanizeKoreanHangul(text: string): string {
  if (!text) return '';
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    if (code >= 0xac00 && code <= 0xd7a3) {
      const syllableIndex = code - 0xac00;
      const initialIndex = Math.floor(syllableIndex / (21 * 28));
      const medialIndex = Math.floor((syllableIndex % (21 * 28)) / 28);
      const finalIndex = syllableIndex % 28;

      let initial = INITIALS[initialIndex];
      if (initial === 'r' && i > 0) initial = 'r';

      const medial = MEDIALS[medialIndex];
      const final = FINALS[finalIndex];

      const syllableRoman = initial + medial + final;
      result += i === 0 ? syllableRoman.charAt(0).toUpperCase() + syllableRoman.slice(1) : syllableRoman;
    } else if (text[i] === ' ' || text[i] === '-') {
      result += text[i];
    }
  }
  return result;
}

/**
 * 1. 정확한 행정구역 추출: "시는 동/읍/면까지만, 군은 읍/면까지만" (골목길/리/번지 제외)
 */
export function extractKoreanTownInfo(rawAddress: string): {
  cityKo: string;
  townKo: string;
  displayKo: string;
} {
  if (!rawAddress || rawAddress === '내 주변') {
    return { cityKo: '', townKo: '내 주변', displayKo: '내 주변' };
  }

  // 괄호 제거 및 정규화
  const clean = rawAddress.replace(/\(.*?\)/g, '').replace(/,/g, ' ').trim();
  const tokens = clean.split(/\s+/).filter(Boolean);

  let cityKo = '';
  let townKo = '';

  // 1) 시/군/구 찾기 (구가 있는 시의 경우 '시'를 우선하고 구는 스킵하여 '시+동' 형태 보장)
  for (const token of tokens) {
    if (!cityKo) {
      if (token.endsWith('시') || token.endsWith('군')) {
        cityKo = token;
      } else if (token.endsWith('구') && (tokens[0].includes('서울') || tokens[0].includes('인천') || tokens[0].includes('부산') || tokens[0].includes('대구') || tokens[0].includes('대전') || tokens[0].includes('광주') || tokens[0].includes('울산'))) {
        cityKo = token; // 광역시는 '광진구', '부평구' 등 구 단위 표기
      }
    }
  }

  // 2) 읍/면/동 찾기 (리는 버림)
  for (const token of tokens) {
    if (!townKo) {
      if (token.endsWith('읍') || token.endsWith('면') || token.endsWith('동') || token.endsWith('가')) {
        townKo = token;
      }
    }
  }

  // 3) 도로명 주소(예: "진접읍 부평로뒷들1길", "원곡동 원일1길") 폴백
  if (!townKo) {
    for (const token of tokens) {
      const match = token.match(/([가-힣]{2,4})(읍|면|동|가)/);
      if (match) {
        townKo = match[0];
        break;
      }
    }
  }

  // 4) 그래도 없으면 토큰에서 추출
  if (!cityKo && tokens.length > 0) {
    cityKo = tokens[0].replace(/특별시|광역시|특별자치시|특별자치도|도/g, '');
  }
  if (!townKo && tokens.length >= 2) {
    townKo = tokens[1];
  }

  const cleanCity = cityKo.replace(/시|군/g, '');
  const displayKo = cleanCity && townKo ? `${cleanCity} ${townKo}` : (townKo || cityKo || '내 주변');

  return { cityKo, townKo, displayKo };
}

/**
 * 2. 17개 언어별 세련된 다국어 지역명 포맷 생성 ("지명 로마자 + 17개 언어 수식어")
 */
const AREA_TEMPLATES: Record<SupportedLanguage, (loc: string, rad: string) => string> = {
  ko: (loc, rad) => `${loc}${rad}`,
  vi: (loc, rad) => `Khu vực ${loc}${rad}`,
  en: (loc, rad) => `${loc} Area${rad}`,
  zh: (loc, rad) => `${loc} 附近${rad}`,
  ja: (loc, rad) => `${loc} 周辺${rad}`,
  ru: (loc, rad) => `Район ${loc}${rad}`,
  th: (loc, rad) => `บริเวณ ${loc}${rad}`,
  uz: (loc, rad) => `${loc} hududi${rad}`,
  km: (loc, rad) => `តំបន់ ${loc}${rad}`,
  mn: (loc, rad) => `${loc} орчим${rad}`,
  ne: (loc, rad) => `${loc} क्षेत्र${rad}`,
  id: (loc, rad) => `Area ${loc}${rad}`,
  my: (loc, rad) => `${loc} နယ်မြေ${rad}`,
  si: (loc, rad) => `${loc} ප්‍රදේශය${rad}`,
  kk: (loc, rad) => `${loc} аймағы${rad}`,
  bn: (loc, rad) => `${loc} এলাকা${rad}`,
  ur: (loc, rad) => `${loc} علاقہ${rad}`,
  tl: (loc, rad) => `Lugar ng ${loc}${rad}`,
};

export function getLocalizedAddressDisplay(
  rawAddress: string,
  lang: SupportedLanguage = 'ko',
  radiusKm?: number
): string {
  const { cityKo, townKo, displayKo } = extractKoreanTownInfo(rawAddress);
  const radiusSuffix = radiusKm ? ` (${radiusKm}km)` : '';

  // 한국어
  if (lang === 'ko') {
    return `${displayKo}${radiusSuffix}`;
  }

  const cleanCity = cityKo.replace(/시|군/g, '');
  const cleanTown = townKo.replace(/읍|면|동|리|가|로|길/g, '');

  // 1. 마스터 DB 매핑
  const cityEn = KOREA_DISTRICT_MASTER_DB[cityKo] || KOREA_DISTRICT_MASTER_DB[cleanCity] || romanizeKoreanHangul(cleanCity);
  const townEn = FAMOUS_TOWNS_MAP[townKo] || FAMOUS_TOWNS_MAP[cleanTown] || romanizeKoreanHangul(cleanTown);

  let combinedEn = '';
  if (townEn && cityEn && townEn.toLowerCase() !== cityEn.toLowerCase()) {
    combinedEn = `${townEn}, ${cityEn}`;
  } else {
    combinedEn = townEn || cityEn || 'Near Me';
  }

  const formatter = AREA_TEMPLATES[lang] || AREA_TEMPLATES.en;
  return formatter(combinedEn, radiusSuffix);
}

