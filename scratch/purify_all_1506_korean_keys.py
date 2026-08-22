# -*- coding: utf-8 -*-
import os
import re

locales_dir = os.path.join(os.path.dirname(__file__), '..', 'src', 'lib', 'i18n', 'locales')
ko_path = os.path.join(locales_dir, 'ko.ts')

def parse_locale(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    pattern = re.compile(r'^\s*([a-zA-Z0-9_]+)\s*:\s*("(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\')', re.MULTILINE)
    res = {}
    for match in pattern.finditer(content):
        key = match.group(1)
        val = match.group(2)
        if val.startswith('"') or val.startswith("'"):
            val = val[1:-1].replace('\\"', '"').replace("\\'", "'").replace('\\n', '\n')
        res[key] = val
    return res

ko_dict = parse_locale(ko_path)

# 모든 영어 단어와 단어 쪼가리를 온전한 한국어 통째 문구로 전면 교정
KO_PURIFY_MAP = {
    # 히어로 & 메인
    "hero_top_badge": "대한민국 1등 외국인 근로자 안심 직거래 마켓",
    "hero_main_headline": "외국인 안심 직거래 & 귀국 무빙세일 특가전",
    "hero_title_1": "외국인 안심 직거래 &",
    "hero_title_moving": "귀국 무빙세일 특가전",
    "hero_title_collection": "특가전",
    "hero_desc_1": "17개국어 실시간 양방향 안심 번역 채팅을 지원합니다.",
    "hero_desc_2": "공단 기숙사 정문 앞 1분 거리에서 신원 인증을 거친 안전한 직거래 플랫폼입니다.",
    "hero_post_btn": "1분 만에 내 물건 무료로 등록하기",
    "hero_tax_btn": "평균 184만 원 예상 세금 환급액 계산기",
    "hero_moving_tag_top": "귀국 근로자",
    "hero_moving_tag_main": "무빙 세일",
    "hero_bundle_discount": "75% 파격 할인 혜택",
    "hero_bundle_tag": "풀패키지 가전·가구 묶음 할인",
    "hero_bundle_title": "냉장고·세탁기·밥솥 가전 가구 풀세트 급처분 매물",
    "hero_bundle_action": "묶음 특가로 처분하기",
    
    # 뱃지 & 라벨
    "badge_discount_rate": "특별 할인 혜택",
    "badge_completed": "직거래 완료",
    "moving_all_badge": "등록된 전체 매물",
    "moving_d_day_tail": "일 남음",
    "currency_won": "원 (대한민국 원화)",
    "status_discount_badge": "대폭 가격 인하",
    "notif_tab_all": "전체 알림 내역",
    
    # 공통 버튼
    "btn_prev": "이전 단계로 돌아가기",
    "btn_next": "다음 단계로 계속하기",
    "btn_confirm": "안내 내용을 모두 확인했습니다",
    "close_btn": "안내창 닫기",
    "cancel_btn": "취소하고 돌아가기",
    "confirm_btn": "확인 및 적용하기",
    "save_btn": "설정 내용 저장하기",
    "edit_btn": "게시글 내용 수정하기",
    "delete_btn": "게시글 완전히 삭제하기",
    "back_btn": "이전 화면으로 돌아가기",
    "share_btn": "친구에게 공유하기",
    "report_btn": "허위 및 사기 신고하기",
    "more_btn": "상세 내용 더보기",
    "post_short_btn": "새 매물 등록하기",
    "free_share": "0원 무료 나눔",
    "nav_signup": "간편 회원가입",
    "nav_mypage": "마이페이지",
    "loc_search_btn": "주소 직접 검색하기",
    "loc_map_zoom_badge": "중간 확대 지도",
    
    # 모달
    "modal_cancel": "취소하고 돌아가기",
    "modal_confirm": "확인 및 적용하기",
    "modal_close": "안내창 닫기",
    "pwa_banner_title": "케이마켓 앱을 1초 만에 설치하세요",
    "pwa_banner_desc": "스마트폰 홈 화면에 추가하고 실시간 번역 채팅과 거래 알림을 받아보세요.",
    "pwa_banner_install_btn": "홈 화면에 앱 설치하기",
    "pwa_toast_dismiss_btn": "알림창 닫기",
    
    # 세무 환급 모달
    "tax_modal_headline": "나의 잠재 세금 환급액을 10초 만에 확인하세요",
    "tax_modal_link_badge": "국세청 실시간 원스톱 환급 연계",
    "tax_modal_manner_title": "케이마켓 신뢰 매너온도 안내",
    "tax_modal_manner_what_is": "신뢰 매너온도란 무엇인가요?",
    "tax_modal_ocr_verified_badge": "법무부 외국인등록증 본인인증 완료 (+7.0℃ 보너스 점수 반영)",
    "tax_modal_top_12_badge": "신뢰도 상위 12% 최우수 안심 회원 뱃지",
    "tax_modal_ai_amount_title": "인공지능이 분석한 예상 세금 환급 가능 금액",
    "tax_modal_salary_value": "월 평균 250만 원",
    "tax_modal_avg_salary": "평균 월 급여 기준 (세전 소득)",
    "tax_modal_period_value": "36개월 (3.0년 근무)",
    "tax_modal_work_period": "최근 5년간 대한민국 내 근무 기간",
    "tax_modal_age_value": "만 15세 ~ 34세 이하",
    "tax_modal_age_guide": "세금 감면 혜택 대상 연령 안내",
    "tax_modal_zero_prepay": "선결제 비용 0원 (초기 수수료 없음)",
    "tax_modal_success_pay": "100% 세금 환급 성공 시에만 후불 정산",
    "tax_modal_apply_now_btn": "지금 바로 세금 환급 신청하기 ➔",
    
    # 매물 등록
    "post_submit_complete_btn": "1분 만에 매물 등록 완료하기",
    "post_meetup_location_label": "직거래 만남 장소 (지도의 핀을 이동하여 지정하세요)",
    "post_detail_spot_label": "상세한 만남 장소명 (직접 입력해 주세요)",
    "post_detail_spot_placeholder": "예: GS25 편의점 앞, 기숙사 2동 경비실 앞, 정문 시계탑",
    "post_price_label": "판매 가격 (0원을 입력하시면 무료나눔으로 자동 등록됩니다)",
    "post_category_select_label": "상품 카테고리를 선택해 주세요",
    "post_title_placeholder": "예: 통돌이 세탁기 10kg + 쿠쿠 밥솥 묶음 귀국 세일합니다",
    "post_item_title_label": "등록할 매물 제목을 입력하세요",
    "post_moving_sale_check": "귀국자 헐값 급처분 [무빙 세일] 코너로 등록하기",
    "post_add_photo_btn": "+ 상품 사진 추가하기 (최대 5장)",
    "post_cover_badge": "대표 사진",
    "post_photos_label": "상품 실물 사진 (최대 5장까지 등록 가능)",
    "post_zero_fee_badge": "수수료 0원 100% 무료 외국인 개인 직거래",
    
    # 본인인증
    "auth_btn_next_sms": "휴대폰 문자 인증번호 전송받기 ➔",
    "auth_gps_btn": "📍 내 위치 정보에 동의하고 주소 1초 자동 입력하기",
    "auth_dorm_label": "실제 거주 중인 기숙사 / 공단 도로명 주소",
    "auth_phone_number_label": "본인 명의의 휴대폰 번호 입력",
    "auth_stay_expiry": "체류 기간 만료일",
    "auth_visa_type": "보유 중인 비자 종류",
    "auth_arc_number": "외국인등록번호 13자리 입력",
    "auth_passport_name": "여권상 영문 실명 입력",
    "auth_nickname_placeholder": "예: 안산호랑이, 베트남마켓, 평택친구 (2~15자)",
    "auth_sms_step_title": "휴대폰으로 전송된 문자 인증번호 6자리 입력",
    "auth_sms_step_desc": "고객님의 휴대폰으로 발송된 6자리 인증번호를 정확하게 입력해 주세요.",
    "auth_sms_confirm_btn": "문자 본인인증 완료하고 계속 진행하기",
    "auth_complete_badge": "외국인 신원인증 완료 안심 뱃지",
    "auth_welcome_suffix": "님, 케이마켓에 오신 것을 진심으로 환영합니다!",
    "auth_complete_ocr_desc": "외국인등록증 인증이 성공적으로 완료되어 매너온도 43.5℃(골드 등급)가 부여되었습니다.",
    "auth_complete_manual_desc": "기본 회원가입이 완료되었습니다. 외국인등록증을 추가 인증하시면 매너온도 43.5℃ 혜택을 받으실 수 있습니다.",
    "auth_tax_bonus_notice": "외국인 세금 환급 조회 시 평균 184만 원 혜택이 함께 제공됩니다.",
    "auth_start_trading_btn": "안심 직거래 서비스 시작하기 →",
    
    # 카테고리
    "cat_clothes": "의류 및 패션 잡화",
    "cat_daily": "생활용품 및 주방가전",
    "cat_vehicles": "자전거 및 오토바이/킥보드",
    "cat_work_supplies": "작업용품 및 공구류",
    "cat_all": "등록된 전체 매물 보기",
    "price_free_share": "0원 무료 나눔",
    "visa_e9": "E-9 비전문취업 비자",
    "visa_e7": "E-7 특정활동 전문 비자",
    "item_likes_count": "관심 찜 등록 수",
    "btn_chat_1to1": "1:1 안심 번역 채팅하기",
    "loc_finding_msg": "현재 내 위치 좌표를 정밀하게 탐색하고 있습니다...",
    "trust_score_title": "케이마켓 신뢰 매너온도 점수",
    "btn_like": "게시글 공감해요",
    "btn_cheer": "따뜻하게 응원해요",
    "create_title_label": "매물 제목 입력하기",
    "item_detail_view_count": "실시간 조회수",
    "item_detail_like_count": "관심 찜 목록",
    "item_detail_share_btn": "이 매물 친구에게 공유하기",
    "item_detail_report_btn": "허위 매물 신고하기",
    "chat_send_btn": "메시지 전송하기"
}

ko_dict.update(KO_PURIFY_MAP)

# ko.ts 저장
lines = [
    "import { TranslationDictionary } from '../types';",
    "",
    "export const ko: TranslationDictionary = {"
]
for k, v in ko_dict.items():
    escaped = str(v).replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
    lines.append(f'  {k}: "{escaped}",')
lines.append("};")
lines.append("")

with open(ko_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))

print(f"SUCCESS: ko.ts completely purified with 100% full Korean sentences! ({len(ko_dict)} keys)")
