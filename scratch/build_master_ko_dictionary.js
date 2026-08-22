const fs = require('fs');
const path = require('path');

const MASTER_KO_DICTIONARY = {
  // 1. 공통 & 헤더
  app_name: 'K-Market',
  app_slogan: '외국인 근로자 17개국어 안심 직거래 마켓',
  nav_platform_slogan: '대한민국 No.1 외국인 근로자 종합 플랫폼',
  nav_signup: '회원가입',
  nav_mypage: '마이',
  nav_community: '동네생활 & 쉼터',
  post_item_btn: '1분 매물 등록',
  post_short_btn: '등록',
  search_placeholder: '공단 근처 매물 검색 (세탁기, 자전거, 밥솥 등)...',
  filter_all_regions: '전국 공단 직거래',
  meetup_zone_title: '주요 공단 도보 직거래 (Meetup Zone)',
  free_share: '무료나눔',

  // 2. KTRS 상단 탭
  ktrs_tab_tax: '세금 환급 (184만)',
  ktrs_tab_loan: '외국인 대출',
  ktrs_tab_housing: '기숙사/원룸',
  ktrs_tab_market: 'K-Market (중고/무빙)',

  // 3. 메인 히어로 쇼케이스 (대형 배너)
  hero_top_badge: '대한민국 외국인 근로자 No.1 안심 플랫폼',
  hero_title_1: '외국인 안심 직거래 &',
  hero_title_moving: '귀국 무빙세일',
  hero_title_collection: '컬렉션',
  hero_desc_1: '17개국어 실시간 Gemini 양방향 자동번역 채팅과',
  hero_desc_2: '신원인증 기반 주요 공단 1분 도보 직거래로 안전하게 시작하세요.',
  hero_post_btn: '내 물건 1분 간편 등록',
  hero_tax_btn: '세무 환급 184만원 무료조회',
  hero_moving_tag_top: '귀국 근로자',
  hero_moving_tag_main: '무빙세일',
  hero_bundle_title: '냉장고·세탁기·쇼파·노트북 풀패키지 묶음',
  hero_bundle_action: '일괄 처분',

  // 4. 3대 안심 배지 바
  trust_bar_fee: '수수료 0원 100% 무료 직거래',
  trust_bar_ai: '17개국어 실시간 Gemini 번역',
  trust_bar_tax: '선결제 0원 184만원 세무환급',
  trust_bar_moving: '귀국 D-Day 무빙세일 전용관',

  // 5. 국세청 세금 환급 배너
  tax_banner_sub: '대한민국 국세청(NTS) 조세특례제한법 제30조 법적 권리',
  tax_banner_headline_1: '지나치기 쉬운 세금 환급,',
  tax_banner_headline_2: '외국인 근로자도 보장받는',
  tax_banner_headline_amount: '[평균 184만원]',
  tax_banner_headline_tail: '30초 무료 조회',
  tax_banner_feature_1: '소요시간 30초',
  tax_banner_feature_2: '평균 184만원 수령',
  tax_banner_feature_3: '선결제 0원 (100% 후불제)',
  tax_banner_cta_btn: '내 환급금 30초 무료 조회하기',
  tax_banner_title: '놓치기 쉬운 세금 환급금 찾기 (평균 184만원)',
  tax_banner_btn: '30초 환급금 계산하기',

  // 6. 사기 방지 안심 쉴드 배너
  scam_bar_badge: '외국인 안심 거래 쉴드',
  scam_bar_desc: '선입금 요구는 99% 사기! 반드시 현장에서 물건 확인 후 결제하세요.',
  scam_bar_rules_btn: '3대 안심 수칙',

  // 7. PWA 앱 설치 & 푸시 알림 토스트
  pwa_toast_title: 'K-Market 1초 앱 설치',
  pwa_toast_desc: '홈 화면에 앱 추가하고 17개국어 번역 매물과 공단 직거래 알림을 가장 빠르게 받으세요.',
  pwa_toast_install_btn: '홈 화면에 K-Market 앱 추가',
  pwa_toast_dismiss_btn: '닫기',

  // 8. 매물 카드 및 피드
  item_card_free_badge: '🎁 무료나눔',
  item_card_chat_btn: '💬 1:1 실시간 번역 채팅',
  item_card_chat_desc: '0.3초 AI 자동 번역',
  status_selling: '판매중',
  status_reserved: '예약중',
  status_sold: '거래완료',
  walk_trade_available: '도보 5분 직거래 가능',
  zero_fee_badge: '수수료 0원 100% 무료',
  moving_sale_title: '✈️ 귀국 D-Day 무빙세일 특가관',
  moving_sale_badge: '귀국정리 초특가',
  chat_btn: '💬 1:1 실시간 자동번역 채팅',
  chat_translation_hint: '✨ 상대방 모국어로 0.3초 만에 실시간 번역되어 전송됩니다 (Gemini AI 탑재)',
  community_title: '동네생활 & 쉼터',
  manner_temperature: '매너온도',
};

// 1. types.ts 갱신
const typesFilePath = path.join(__dirname, '..', 'src', 'lib', 'i18n', 'types.ts');
let typesContent = `// K-Market 다국어 번역 키 타입 인터페이스 (한국어 마스터 기준)\n\nexport interface TranslationDictionary {\n`;
for (const key of Object.keys(MASTER_KO_DICTIONARY)) {
  typesContent += `  ${key}: string;\n`;
}
typesContent += `}\n`;
fs.writeFileSync(typesFilePath, typesContent, 'utf8');
console.log('✅ [types.ts] TranslationDictionary 인터페이스 갱신 완료 (총 키 개수:', Object.keys(MASTER_KO_DICTIONARY).length, '개)');

// 2. ko.ts 갱신
const koFilePath = path.join(__dirname, '..', 'src', 'lib', 'i18n', 'locales', 'ko.ts');
let koContent = `import { TranslationDictionary } from '../types';\n\nexport const ko: TranslationDictionary = {\n`;
for (const [k, v] of Object.entries(MASTER_KO_DICTIONARY)) {
  koContent += `  ${k}: ${JSON.stringify(v)},\n`;
}
koContent += `};\n`;
fs.writeFileSync(koFilePath, koContent, 'utf8');
console.log('✅ [ko.ts] 마스터 한국어 사전 구축 완료');
