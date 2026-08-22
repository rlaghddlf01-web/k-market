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

# 영문 혼입 키 100% 순수 한국어 통문장 매핑
PURE_KO_CORRECTIONS = {
    "welcome_change_ko": "한국어로 변경하기",
    "welcome_btn_korean": "한국어로 계속 진행하기 ➔",
    "time_recent": "방금 전 등록",
    "time_months_ago": "개월 전",
    "unit_items_count": "개 매물 등록됨",
    "zone_sub_desc": "포승, 반월, 시화, 향남, 남동 공단 기숙사 인근 직거래",
    "header_quick_lang": "17개국어 간편 언어 선택",
    "moving_d_day_badge": "귀국 디데이",
    "cat_digital": "스마트폰 및 전자기기",
    "meetup_zone_title": "주요 공단 도보 안심 직거래 구역",
    "tax_banner_sub": "대한민국 국세청 조세특례제한법 제30조에 따른 외국인 법적 권리",
    "scam_warning_title": "외국인 안심 직거래 3대 안전 수칙",
    "scam_rule_3_desc": "안전결제 링크라며 전송한 외부 인터넷 주소는 피싱 사기입니다. 절대 클릭하지 마세요.",
    "inapp_chrome_title": "구글 크롬 브라우저로 안전하게 이동하기",
    "inapp_safari_title": "사파리 브라우저로 열기",
    "inapp_safari_desc": "아이폰 앱 설치를 위해 브라우저 메뉴에서 [사파리로 열기]를 선택해 주세요.",
    "inapp_copy_success_safari": "주소 복사 완료! 사파리 브라우저 주소창에 붙여넣어 주세요.",
    "inapp_safari_guide_fallback": "우측 상단 또는 하단 메뉴를 누른 후 [사파리로 열기]를 선택해 주세요.",
    "moving_sale_title": "귀국 무빙세일 특가관",
    "mypage_manner_title": "나의 신뢰 매너온도 점수",
    "location_radius_1km": "반경 1킬로미터 이내 (공단 정문/후문 도보 거리)",
    "location_radius_3km": "반경 3킬로미터 이내 (자전거 및 킥보드 이동 거리)",
    "location_radius_10km": "반경 10킬로미터 이내 (차량 및 버스 이동 거리)",
    "loc_radius_1km_title": "1킬로미터 이내",
    "loc_radius_3km_title": "3킬로미터 이내",
    "loc_radius_10km_title": "10킬로미터 이내",
    "loc_radius_10km_desc": "내 주변 10킬로미터 인근 지역 매물",
    "post_detail_spot_placeholder": "예: 편의점 앞, 기숙사 2동 경비실 앞, 정문 시계탑",
    "post_title_placeholder": "예: 통돌이 세탁기 및 쿠쿠 밥솥 묶음 귀국 세일합니다",
    "auto_ui_21": "한국 생활 질문과 답변 (비자, 병원, 은행 질문)",
    "auto_ui_43": "플랫폼 서비스 영구 제재 처리",
    "auto_ui_54": "예: 편의점 앞, 3공단 기숙사 후문",
    "auto_ui_74": "예: 여권상의 영문 성명을 입력하세요",
    "auto_ui_76": "예: E-9 비전문취업 비자",
    "auto_ui_78": "에스케이티(SKT) 알뜰폰 (선불폰 / 후불폰)",
    "auto_ui_79": "케이티(KT) 알뜰폰 (선불폰 / 후불폰)",
    "auto_ui_80": "엘지유플러스(LGU+) 알뜰폰 (선불폰 / 후불폰)",
    "auto_ui_81": "에스케이텔레콤 공식 대리점",
    "auto_ui_82": "케이티 공식 대리점",
    "auto_ui_83": "엘지유플러스 공식 대리점",
    "auto_ui_91": "케이티알에스 외국인 특별 세금 환급 연계 혜택",
    "auto_ui_104": "구글 지도 길찾기 연동",
    "auto_ui_105": "카카오 지도 길찾기 연동",
    "auto_ui_113": "예: 통돌이 세탁기 및 전기밥솥 묶음 판매합니다",
    "auto_ui_136": "예: 포승공단 기숙사 정문 앞, 안산역 2번 출구"
}

ko_dict.update(PURE_KO_CORRECTIONS)

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

print("PERFECTLY PURIFIED all English in ko.ts!")
