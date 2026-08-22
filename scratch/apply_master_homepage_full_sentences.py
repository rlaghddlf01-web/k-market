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

# 대표님께서 지정하신 실제 화면 1:1 완벽 통문장 매핑
HOMEPAGE_EXACT_MASTER = {
    # 1. 최상단 KTRS 슈퍼앱 바 & 헤더
    "kmarket_top_bar_title": "대한민국 1등 외국인 근로자 종합 플랫폼",
    "kmarket_top_bar_fee": "수수료 0원 100% 무료 직거래",
    "header_pwa_install_btn": "1초 만에 앱 설치하기",
    "app_title": "케이마켓",
    "app_badge_free": "수수료 0원 무료 직거래",
    "app_subtitle": "외국인 근로자 17개국어 안심 직거래 마켓",
    "header_search_placeholder": "관심 키워드, 가전, 무빙세일 검색...",
    "header_post_item_btn": "1분 만에 매물 등록하기",
    "nav_signup": "간편 회원가입",
    "nav_mypage": "마이페이지",

    # 2. 메인 탭
    "tab_market": "케이마켓 (중고/무빙세일)",
    "tab_community": "동네생활 & 쉼터 커뮤니티",
    "tab_tax": "외국인 세금 환급 (평균 184만 원)",

    # 3. 히어로 쇼케이스
    "hero_top_badge": "대한민국 1등 외국인 근로자 안심 직거래 마켓",
    "hero_main_headline": "외국인 안심 직거래 & 귀국 무빙세일 특가전",
    "hero_desc_1": "17개국어 실시간 인공지능 양방향 안심 번역 채팅을 지원합니다.",
    "hero_desc_2": "공단 기숙사 정문 앞 1분 거리에서 신원 인증을 거친 안전한 직거래 플랫폼입니다.",
    "hero_post_btn": "1분 만에 내 물건 무료로 등록하기",
    "hero_tax_btn": "평균 184만 원 예상 세금 환급액 계산기",

    # 4. 히어로 묶음 가전 패키지 쇼케이스
    "auto_ui_148": "가전 가구 통합 패키지 쇼케이스",
    "hero_moving_tag_top": "귀국 근로자 전용",
    "hero_moving_tag_main": "귀국 무빙세일",
    "hero_bundle_discount": "75% 파격 할인 혜택",
    "hero_bundle_tag": "풀패키지 가전·가구 묶음 할인",
    "hero_bundle_title": "냉장고·세탁기·밥솥 가전 가구 풀세트 급처분 매물",
    "hero_bundle_action": "묶음 특가로 처분하기",

    # 5. 하단 4대 안심 보증 띠 바 (온전한 통문장)
    "trust_bar_fee": "수수료 0원으로 100% 무료 직거래를 이용하세요",
    "trust_bar_ai": "17개국어로 실시간 인공지능 양방향 번역을 지원합니다",
    "trust_bar_tax": "평균 184만 원 세금 환급 혜택을 연계해 드립니다",
    "trust_bar_moving": "귀국 외국인 근로자의 무빙세일 특가 매물을 만나보세요",

    # 6. 세금 환급 와이드 배너
    "tax_banner_img_alt": "외국인 근로자 세금 환급 전문 상담",
    "tax_banner_sub": "대한민국 국세청 조세특례제한법 제30조에 따른 외국인 법적 권리",
    "tax_banner_headline_1": "지나치기 쉬운 세금 환급,",
    "tax_banner_headline_2": "외국인 근로자도 보장받는",
    "tax_banner_headline_amount": "[평균 184만원]",
    "tax_banner_headline_tail": "30초 무료 조회",
    "tax_banner_feature_1": "소요시간 단 30초",
    "tax_banner_feature_2": "평균 184만원 수령",
    "tax_banner_feature_3": "선결제 0원 (100% 후불제)",
    "tax_banner_btn": "내 환급금 30초 무료 조회하기",

    # 7. 안심 거래 쉴드 바
    "scam_bar_badge": "외국인 안심 거래 쉴드",
    "scam_bar_desc": "선입금 요구는 99% 사기! 반드시 현장에서 물건 확인 후 결제하세요.",
    "auto_ui_251": "3대 안심 수칙 보기",

    # 8. 카테고리 네비게이션
    "cat_section_title": "카테고리별 매물 찾기",
    "cat_all": "등록된 전체 매물 보기",
    "cat_appliances": "원룸 가전",
    "cat_furniture": "생활 가구",
    "cat_digital": "스마트폰 및 전자기기",
    "cat_moving_bundle": "귀국 무빙 묶음",
    "cat_free_share": "0원 무료나눔",
    "cat_clothing": "의류/잡화",
    "cat_work_supplies": "작업용품 및 공구류",

    # 9. 귀국 무빙세일 특가관
    "moving_sale_title": "귀국 무빙세일 특가관",
    "moving_sale_desc": "비자 만료로 귀국하는 외국인 근로자들의 생활 가전·가구 묶음 헐값 급처분관입니다.",
    "auto_ui_203": "최대 85% 묶음 할인",
    "moving_all_badge": "등록된 전체 매물 보기",
    "auto_ui_204": "🚨 3일 남음 오늘마감 헐값/나눔",
    "auto_ui_205": "🔥 7일 남음 마감임박 초특가",
    "auto_ui_206": "✈️ 14일 남음 묶음할인 (사전예약)"
}

ko_dict.update(HOMEPAGE_EXACT_MASTER)

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

print("SUCCESS: Homepage exact full sentences perfectly written to ko.ts!")
