const fs = require('fs');
const path = require('path');

const koFilePath = path.join(__dirname, '../src/lib/i18n/locales/ko.ts');

function parseLocale(file) {
  const content = fs.readFileSync(file, 'utf8');
  const map = {};
  const regex = /^\s*([a-zA-Z0-9_]+)\s*:\s*("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const key = match[1];
    let val = match[2];
    if (val.startsWith('"') || val.startsWith("'")) {
      val = val.slice(1, -1).replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\n/g, '\n');
    }
    map[key] = val;
  }
  return map;
}

const koDict = parseLocale(koFilePath);

// 실제 코드에서 누락된 25개 키의 온전한 완성 문구 매핑
const MISSING_ACTIVE_KEYS = {
  btn_like: "게시글 공감해요",
  btn_cheer: "따뜻하게 응원해요",
  loc_finding_msg: "현재 내 GPS 위치를 정밀하게 탐색하고 있습니다...",
  auth_sms_step_title: "휴대폰 SMS 인증번호 입력",
  auth_sms_step_desc: "휴대폰으로 전송된 6자리 인증번호를 입력해 주세요.",
  auth_sms_confirm_btn: "SMS 인증 완료하고 계속하기",
  auth_complete_badge: "본인인증 완료 뱃지",
  auth_welcome_suffix: "님, K-Market에 오신 것을 진심으로 환영합니다!",
  auth_complete_ocr_desc: "외국인등록증 OCR 인증이 성공적으로 완료되어 매너온도 43.5℃(골드)가 반영되었습니다.",
  auth_complete_manual_desc: "기본 회원가입이 완료되었습니다. 신분증을 추가 인증하시면 매너온도 43.5℃를 받으실 수 있습니다.",
  auth_tax_bonus_notice: "KTRS 세금 환급 조회 시 184만 원 혜택이 연계됩니다.",
  auth_start_trading_btn: "안심 직거래 시작하기 →",
  cat_clothes: "의류 및 패션 잡화",
  cat_daily: "생활용품 및 주방가전",
  cat_vehicles: "자전거 및 오토바이/킥보드",
  price_free_share: "0원 무료나눔",
  visa_e9: "E-9 (비전문취업 비자)",
  visa_e7: "E-7 (특정활동 비자)",
  item_likes_count: "관심 찜 개수",
  btn_chat_1to1: "1:1 안심 번역 채팅하기",
  badge_visa: "체류 비자 인증 완료",
  tax_work_suffix: "개월 근무",
  tax_receipt_badge: "국세청 소득공제 영수증 연계",
  tax_fee_type_label: "환급 성공 시 후불 수수료 적용",
  trust_score_title: "K-Trust 매너온도 점수"
};

Object.assign(koDict, MISSING_ACTIVE_KEYS);

// 파일 저장
const lines = [
  `import { TranslationDictionary } from '../types';`,
  ``,
  `export const ko: TranslationDictionary = {`,
];

for (const [k, v] of Object.entries(koDict)) {
  const escaped = String(v).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
  lines.push(`  ${k}: "${escaped}",`);
}

lines.push(`};`);
lines.push(``);

fs.writeFileSync(koFilePath, lines.join('\n'), 'utf8');
console.log(`✅ [ko.ts] 누락되었던 25개 실제 사용 키 완벽 추가 완료! (총 ${Object.keys(koDict).length}개)`);

// types.ts도 동기화
const typesLines = [
  `export interface TranslationDictionary {`,
  ...Object.keys(koDict).map((k) => `  ${k}: string;`),
  `}`,
  ``,
  `export type TranslationKey = keyof TranslationDictionary;`,
  ``
];
fs.writeFileSync(path.join(__dirname, '../src/lib/i18n/types.ts'), typesLines.join('\n'), 'utf8');
console.log('✅ types.ts 동기화 완료!');
