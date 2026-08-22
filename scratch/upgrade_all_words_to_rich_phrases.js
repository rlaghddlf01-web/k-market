const fs = require('fs');
const path = require('path');

const koFilePath = path.join(__dirname, '../src/lib/i18n/locales/ko.ts');
const koContent = fs.readFileSync(koFilePath, 'utf8');

function parseLocale(content) {
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

const koDict = parseLocale(koContent);

// 단어를 명확하고 온전한 문구로 전면 업그레이드 매핑
const RICH_PHRASE_MAPPINGS = {
  btn_prev: "이전 단계로",
  btn_next: "다음 단계로",
  btn_confirm: "내용을 확인했습니다",
  tax_modal_pwa_install_btn: "홈 화면에 앱 설치하기",
  badge_discount_rate: "특별 할인 혜택",
  badge_completed: "직거래 완료",
  moving_d_day_tail: "일 남음",
  modal_cancel: "취소하고 돌아가기",
  modal_confirm: "확인 및 적용",
  modal_close: "안내창 닫기",
  cat_work_supplies: "작업용품 및 공구류",
  cat_all: "전체 매물 보기",
  loc_map_zoom_badge: "중간 확대 지도",
  loc_search_btn: "주소 검색하기",
  nav_signup: "간편 회원가입",
  nav_mypage: "마이페이지",
  post_short_btn: "매물 등록하기",
  free_share: "0원 무료나눔",
  close_btn: "닫기",
  cancel_btn: "취소하기",
  confirm_btn: "확인 완료",
  save_btn: "설정 내용 저장하기",
  edit_btn: "게시글 수정하기",
  delete_btn: "게시글 삭제하기",
  back_btn: "이전 화면으로",
  share_btn: "친구에게 공유하기",
  report_btn: "허위/사기 신고하기",
  more_btn: "내용 더보기",
  hero_title_collection: "무빙세일 특가관",
  pwa_toast_dismiss_btn: "알림창 닫기",
  hero_bundle_action: "묶음 특가 처분하기",
  currency_won: "원 (KRW)",
  item_detail_view_count: "실시간 조회수",
  item_detail_like_count: "관심 찜 목록",
  item_detail_share_btn: "이 매물 공유하기",
  item_detail_report_btn: "허위 매물 신고하기",
  chat_send_btn: "메시지 보내기",
  create_title_label: "매물 제목 입력하기",
  status_discount_badge: "가격 대폭 인하",
  notif_tab_all: "전체 알림 내역",
  auto_ui_235: "알림 및 키워드 설정하기",
  auto_ui_274: "게시글 상단으로 끌어올리기",
  auto_ui_278: "예상 세금 환급액 조회",
  auto_ui_289: "최대 대출 가능 한도",
  auto_ui_302: "원룸 및 기숙사 직방 찾기",
  auto_ui_305: "등록된 전체 매물 보기",
  auto_ui_315: "최근 1년 근무 기준",
  auto_ui_97: "직거래 후기 작성하기",
  auto_ui_98: "1:1 만남 약속잡기",
  auto_ui_99: "[1:1 안심 직거래 약속]",
  auto_ui_119: "등록 완료하기 →"
};

Object.assign(koDict, RICH_PHRASE_MAPPINGS);

// TS 파일 저장
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
console.log(`✅ [ko.ts] 모든 단어형 키를 온전하고 친절한 완성 문구로 전면 업그레이드 완료! (총 ${Object.keys(koDict).length}개)`);
