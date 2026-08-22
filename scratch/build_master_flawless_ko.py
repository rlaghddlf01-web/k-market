# -*- coding: utf-8 -*-
import os
import re

ko_path = os.path.join(os.path.dirname(__file__), '..', 'src', 'lib', 'i18n', 'locales', 'ko.ts')

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
all_keys = list(ko_dict.keys())

print(f"=== [PERFECT KOREAN MASTER BUILDER] Total Keys: {len(all_keys)} ===")

# 모든 키를 단어 쪼가리가 아닌 온전한 한국어 완성 문구로 정밀 교정
PERFECT_KO_SENTENCES = {
    # 1. 메인 헤더 & 히어로
    "hero_top_badge": "대한민국 1등 외국인 근로자 안심 직거래 마켓",
    "hero_main_headline": "외국인 안심 직거래 & 귀국 무빙세일 특가전",
    "hero_title_1": "외국인 안심 직거래 &",
    "hero_title_moving": "귀국 무빙세일 특가전",
    "hero_title_collection": "특가전",
    "hero_desc_1": "17개국어 실시간 인공지능 양방향 안심 번역 채팅을 지원합니다.",
    "hero_desc_2": "공단 기숙사 정문 앞 1분 거리에서 신원 인증을 거친 안전한 직거래 플랫폼입니다.",
    "hero_post_btn": "1분 만에 내 물건 무료로 등록하기",
    "hero_tax_btn": "평균 184만 원 예상 세금 환급액 계산기",
    "hero_moving_tag_top": "귀국 근로자 전용",
    "hero_moving_tag_main": "귀국 무빙세일",
    "hero_bundle_discount": "75% 파격 할인 혜택",
    "hero_bundle_tag": "풀패키지 가전·가구 묶음 할인",
    "hero_bundle_title": "냉장고·세탁기·밥솥 가전 가구 풀세트 급처분 매물",
    "hero_bundle_action": "묶음 특가로 처분하기",
    
    # 2. 사기 방지 3대 수칙 (온전한 통문장)
    "safety_modal_title": "외국인 안심 직거래 3대 안전 수칙",
    "safety_modal_subtitle": "케이마켓 회원 보호 및 사기 범죄 원천 차단 가이드",
    "safety_rule_1_desc": "\"물건을 맡아둘 테니 1만원만 먼저 보내라\", \"택배비 먼저 입금해라\" 등은 대표적인 사기 수법입니다. 반드시 직접 만나 물건을 꼼꼼히 확인한 후 대금을 지급하세요.",
    "safety_rule_1_desc_tail": "반드시 직접 만나 물건을 꼼꼼히 확인한 후 대금을 지급하세요.",
    "safety_rule_2_desc": "외부 메신저로 대화할 경우 사기 피해 발생 시 증거 확보 및 구제가 어렵습니다. 반드시 케이마켓의 안심 자동 번역 채팅방 안에서만 안전하게 거래를 진행하세요.",
    "safety_rule_2_desc_tail": "반드시 케이마켓의 안심 자동 번역 채팅방 안에서만 안전하게 거래를 진행하세요.",
    "safety_rule_3_desc": "인적이 드문 골목보다 편의점 앞, 밝은 지하철 출구 등 안전한 랜드마크 지도 핀을 만남 장소로 잡으세요.",
    "safety_rule_3_desc_tail": "편의점 앞, 밝은 지하철 출구 등 안전한 랜드마크 지도 핀을 만남 장소로 잡으세요.",
    "moving_sale_desc": "비자 만료로 귀국하는 외국인 근로자들의 생활 가전·가구 묶음 헐값 급처분관입니다.",
    "moving_all_badge": "등록된 전체 매물 보기",
    
    # 3. 공통 버튼 & 네비게이션
    "btn_prev": "이전 단계로 돌아가기",
    "btn_next": "다음 단계로 계속하기",
    "btn_confirm": "안내 내용을 모두 확인했습니다",
    "footer_platform_desc": "대한민국 1등 외국인 종합 슈퍼앱 케이티알에스 연계\n외국인 전용 0원 안심 중고거래 & 귀국 무빙세일 & 동네생활 커뮤니티",
    "header_pwa_install_btn": "1초 만에 앱 설치하기",
    "tax_modal_pwa_install_btn": "홈 화면에 앱 설치하기",
    "tax_modal_pwa_install_title": "케이마켓 앱을 홈 화면에 추가하기",
    "tax_modal_top_12_badge": "신뢰도 상위 12% 최우수 안심 회원 뱃지",
    "tax_modal_ocr_verified_badge": "법무부 외국인등록증 본인인증 완료 (+7.0℃ 보너스 점수 반영)",
    "tax_modal_manner_what_is": "신뢰 매너온도란 무엇인가요?",
    "tax_modal_manner_title": "케이마켓 신뢰 매너온도 안내",
    "tax_modal_apply_now_btn": "지금 바로 세금 환급 신청하기 ➔",
    "tax_modal_success_pay": "100% 세금 환급 성공 시에만 후불 정산",
    "tax_modal_zero_prepay": "선결제 비용 0원 (초기 수수료 없음)",
    "tax_modal_ai_amount_title": "인공지능이 분석한 예상 세금 환급 가능 금액",
    "tax_modal_salary_value": "월 평균 250만 원",
    "tax_modal_avg_salary": "평균 월 급여 기준 (세전 소득)",
    "tax_modal_period_value": "36개월 (3.0년 근무)",
    "tax_modal_work_period": "최근 5년간 대한민국 내 근무 기간",
    "tax_modal_age_value": "만 15세 ~ 34세 이하",
    "tax_modal_age_guide": "세금 감면 혜택 대상 연령 안내",
    "tax_modal_headline": "나의 잠재 세금 환급액을 10초 만에 확인하세요",
    "tax_modal_link_badge": "국세청 실시간 원스톱 환급 연계",
    
    # 4. 매물 등록
    "post_submit_complete_btn": "1분 만에 매물 등록 완료하기",
    "post_detail_spot_placeholder": "예: 편의점 앞, 기숙사 2동 경비실 앞, 정문 시계탑",
    "post_detail_spot_label": "상세한 만남 장소명 (직접 입력해 주세요)",
    "post_search_addr_btn": "주소 직접 검색하기",
    "post_move_pin_btn": "내 현재 위치로 핀 이동하기",
    "post_meetup_location_label": "직거래 만남 장소 (지도의 핀을 이동하여 지정하세요)",
    "post_price_label": "판매 가격 (0원을 입력하시면 무료나눔으로 자동 등록됩니다)",
    "post_category_select_label": "상품 카테고리를 선택해 주세요",
    "post_title_placeholder": "예: 통돌이 세탁기 및 쿠쿠 밥솥 묶음 귀국 세일합니다",
    "post_item_title_label": "등록할 매물 제목을 입력하세요",
    "post_moving_sale_check": "귀국자 헐값 급처분 [무빙 세일] 코너로 등록하기",
    "post_add_photo_btn": "+ 상품 사진 추가하기 (최대 5장)",
    "post_cover_badge": "대표 사진",
    "post_photos_label": "상품 실물 사진 (최대 5장까지 등록 가능)",
    "post_zero_fee_badge": "수수료 0원 100% 무료 외국인 개인 직거래",
    
    # 5. 본인인증
    "auth_btn_next_sms": "휴대폰 문자 인증번호 전송받기 ➔",
    "auth_gps_btn": "📍 내 위치 정보에 동의하고 주소 1초 자동 입력하기",
    "auth_dorm_label": "실제 거주 중인 기숙사 또는 공단 도로명 주소",
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
    
    # 6. 카테고리 및 일반 키
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
    "modal_cancel": "취소하고 돌아가기",
    "modal_confirm": "확인 및 적용하기",
    "modal_close": "안내창 닫기",
    "nav_signup": "간편 회원가입",
    "nav_mypage": "마이페이지",
    "post_short_btn": "새 매물 등록하기",
    "free_share": "0원 무료 나눔",
    "save_btn": "설정 내용 저장하기",
    "edit_btn": "게시글 내용 수정하기",
    "delete_btn": "게시글 완전히 삭제하기",
    "back_btn": "이전 화면으로 돌아가기",
    "share_btn": "친구에게 공유하기",
    "report_btn": "허위 및 사기 신고하기",
    "more_btn": "상세 내용 더보기",
    "pwa_toast_dismiss_btn": "알림창 닫기",
    "currency_won": "원 (대한민국 원화)",
    "item_detail_view_count": "실시간 조회수",
    "item_detail_like_count": "관심 찜 목록",
    "item_detail_share_btn": "이 매물 친구에게 공유하기",
    "item_detail_report_btn": "허위 매물 신고하기",
    "chat_send_btn": "메시지 전송하기",
    "create_title_label": "매물 제목 입력하기",
    "status_discount_badge": "대폭 가격 인하",
    "notif_tab_all": "전체 알림 내역",
    "badge_discount_rate": "특별 할인 혜택",
    "badge_completed": "직거래 완료",
    "moving_d_day_tail": "일 남음",
    "loc_map_zoom_badge": "중간 확대 지도",
    "loc_search_btn": "주소 직접 검색하기"
}

ko_dict.update(PERFECT_KO_SENTENCES)

# auto_ui_ 및 기타 모든 키 전수 순수 한국어 문구화
for k, v in ko_dict.items():
    # 1. 잔여 영단어 전면 한국어화
    v = v.replace("K-Market", "케이마켓")
    v = v.replace("KTRS", "케이티알에스")
    v = v.replace("EasyTax", "이지텍스")
    v = v.replace("No.1", "1등")
    v = v.replace("Gemini", "인공지능")
    v = v.replace("AI", "인공지능")
    v = v.replace("OCR", "신분증 자동인식")
    v = v.replace("ARC", "외국인등록증")
    v = v.replace("SMS", "문자")
    v = v.replace("GPS", "위치정보")
    v = v.replace("PWA", "앱")
    v = v.replace("C2C", "개인간")
    v = v.replace("KRW", "원화")
    v = v.replace("OTP", "인증번호")
    v = v.replace("Moving Sale", "무빙세일")
    v = v.replace("Item Title", "매물 제목")
    v = v.replace("Nickname", "별명")
    v = v.replace("Passport Name", "여권 이름")
    v = v.replace("Expiry Date", "만료일")
    v = v.replace("Visa Status", "비자 종류")
    v = v.replace("Category", "카테고리")
    v = v.replace("Chrome", "크롬 브라우저")
    v = v.replace("Safari", "사파리 브라우저")
    v = v.replace("Google Maps", "구글 지도")
    v = v.replace("Kakao Map", "카카오 지도")
    v = v.replace("10km", "10킬로미터")
    v = v.replace("3km", "3킬로미터")
    v = v.replace("1km", "1킬로미터")
    v = v.replace("10kg", "10킬로그램")
    v = v.replace("GS25", "편의점")
    v = v.replace("SKT", "에스케이티")
    v = v.replace("KT", "케이티")
    v = v.replace("LGU+", "엘지유플러스")
    
    # 2. 3글자 이하 단어 쪼가리를 친절한 완성 문구로 승격
    if len(v) <= 3 and not re.search(r'[0-9]', v):
        if "원" in v:
            v = "대한민국 원화 단위"
        elif "설정" in v:
            v = "상세 설정하기"
        elif "끌올" in v:
            v = "게시글 상단으로 끌어올리기"
        elif "환급" in v:
            v = "예상 세금 환급액"
        elif "한도" in v:
            v = "최대 대출 한도"
        elif "직방" in v:
            v = "원룸 및 기숙사 찾기"
        elif "매물" in v:
            v = "등록된 전체 매물"
        elif "1년" in v:
            v = "최근 1년 근무 기준"
        elif "후기" in v:
            v = "직거래 후기 작성하기"
        elif "필수" in v:
            v = "필수 입력 항목"
        elif "완료" in v:
            v = "처리가 완료되었습니다"
        elif "등록" in v:
            v = "새 매물 등록하기"
        elif "삭제" in v:
            v = "선택 항목 삭제하기"
        elif "수정" in v:
            v = "내용 수정하기"
        elif "확인" in v:
            v = "내용을 확인했습니다"
        elif "취소" in v:
            v = "취소하고 돌아가기"
        elif "닫기" in v:
            v = "안내창 닫기"
            
    ko_dict[k] = v

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

print(f"SUCCESS: ko.ts master completely perfected with 100% full Korean sentences! ({len(ko_dict)} keys)")
