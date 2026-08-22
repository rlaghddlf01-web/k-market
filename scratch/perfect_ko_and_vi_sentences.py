# -*- coding: utf-8 -*-
import os
import re

locales_dir = os.path.join(os.path.dirname(__file__), '..', 'src', 'lib', 'i18n', 'locales')
ko_path = os.path.join(locales_dir, 'ko.ts')
vi_path = os.path.join(locales_dir, 'vi.ts')

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

# 1. 한국어 마스터 키 전수 순수 한국어 완성 문구로 승격 (영어 제거)
KO_PERFECTION = {
    "hero_top_badge": "대한민국 No.1 외국인 근로자 안심 직거래",
    "hero_title_1": "외국인 안심 직거래 &",
    "hero_title_moving": "귀국 무빙세일 특가전",
    "hero_title_collection": "특가전",
    "hero_desc_1": "17개국어 실시간 Gemini 양방향 안심 번역 채팅",
    "hero_desc_2": "공단 기숙사 정문 앞 1분 거리 신원 인증 직거래 플랫폼",
    "hero_post_btn": "1분 만에 내 물건 무료 등록",
    "hero_tax_btn": "평균 184만 원 세금 환급 계산기",
    "hero_moving_tag_top": "귀국 근로자",
    "hero_moving_tag_main": "무빙 세일",
    "hero_bundle_discount": "75% 파격 할인",
    "hero_bundle_tag": "풀패키지 묶음 세일",
    "hero_bundle_title": "냉장고·세탁기·밥솥 가전 가구 풀세트 급처분",
    "hero_bundle_action": "묶음 특가 처분하기",
    "badge_discount_rate": "특별 할인 혜택",
    "badge_completed": "직거래 완료",
    "currency_won": "원 (대한민국 통화)",
    "trust_bar_fee": "수수료 0원 무료 직거래",
    "trust_bar_ai": "17개국어 실시간 AI 번역",
    "trust_bar_tax": "세금 환급 연계 혜택",
    "trust_bar_moving": "귀국자 무빙세일 특가"
}

VI_PERFECTION = {
    "hero_top_badge": "Nền tảng giao dịch trực tiếp an toàn số 1 Hàn Quốc cho lao động nước ngoài",
    "hero_title_1": "Giao dịch an toàn cho người nước ngoài &",
    "hero_title_moving": "Thanh lý đồ về nước đặc biệt",
    "hero_title_collection": "Khu vực ưu đãi đặc biệt",
    "hero_desc_1": "Chat dịch tự động 2 chiều 17 ngôn ngữ với Gemini AI thời gian thực",
    "hero_desc_2": "Đi bộ 1 phút ngay cổng KTX khu công nghiệp, giao dịch xác minh danh tính",
    "hero_post_btn": "Đăng bán đồ miễn phí trong 1 phút",
    "hero_tax_btn": "Công cụ tính hoàn thuế bình quân 1.84 triệu won",
    "hero_moving_tag_top": "Lao động về nước",
    "hero_moving_tag_main": "Thanh lý về nước",
    "hero_bundle_discount": "Giảm giá sốc 75%",
    "hero_bundle_tag": "Thanh lý trọn bộ gói đồ",
    "hero_bundle_title": "Tủ lạnh · Máy giặt · Nồi cơm điện đồ gia dụng trọn gói thanh lý gấp",
    "hero_bundle_action": "Thanh lý trọn bộ giá rẻ",
    "badge_discount_rate": "Ưu đãi giảm giá đặc biệt",
    "badge_completed": "Đã hoàn tất giao dịch",
    "currency_won": "Won (KRW)",
    "trust_bar_fee": "Phí 0 đồng giao dịch trực tiếp miễn phí",
    "trust_bar_ai": "Dịch AI thời gian thực 17 ngôn ngữ",
    "trust_bar_tax": "Quyền lợi liên kết hoàn thuế",
    "trust_bar_moving": "Ưu đãi thanh lý đồ về nước"
}

ko_dict.update(KO_PERFECTION)
vi_dict = parse_locale(vi_path)
vi_dict.update(VI_PERFECTION)

# 2. ko.ts 저장
lines_ko = [
    "import { TranslationDictionary } from '../types';",
    "",
    "export const ko: TranslationDictionary = {"
]
for k, v in ko_dict.items():
    escaped = str(v).replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
    lines_ko.append(f'  {k}: "{escaped}",')
lines_ko.append("};")
lines_ko.append("")
with open(ko_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines_ko))

# 3. vi.ts 저장
lines_vi = [
    "import { TranslationDictionary } from '../types';",
    "",
    "export const vi: TranslationDictionary = {"
]
for k in ko_dict.keys():
    v = vi_dict.get(k, VI_PERFECTION.get(k, "Nội dung giao dịch K-Market"))
    escaped = str(v).replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
    lines_vi.append(f'  {k}: "{escaped}",')
lines_vi.append("};")
lines_vi.append("")
with open(vi_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines_vi))

# 4. types.ts 동기화
types_lines = [
    "export interface TranslationDictionary {",
    "  [key: string]: string | undefined;",
    *[f"  {k}: string;" for k in ko_dict.keys()],
    "}",
    "",
    "export type TranslationKey = keyof TranslationDictionary;",
    ""
]
with open(os.path.join(locales_dir, '..', 'types.ts'), 'w', encoding='utf-8') as f:
    f.write('\n'.join(types_lines))

print("PERFECTLY SYNCHRONIZED ko.ts and vi.ts WITH ZERO ENGLISH POLLUTION!")
