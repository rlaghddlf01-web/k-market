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
vi_dict = parse_locale(vi_path)

# trust_bar 온전한 통문장 매핑
TRUST_BAR_KO = {
    "trust_bar_fee": "수수료 0원 100% 무료 직거래",
    "trust_bar_ai": "17개국어 실시간 AI 양방향 번역",
    "trust_bar_tax": "184만원 외국인 세금 환급 연계",
    "trust_bar_moving": "귀국자 무빙세일 패키지 특가"
}

TRUST_BAR_VI = {
    "trust_bar_fee": "Phí 0 đồng 100% giao dịch trực tiếp miễn phí",
    "trust_bar_ai": "Dịch AI 2 chiều 17 ngôn ngữ thời gian thực",
    "trust_bar_tax": "Liên kết hoàn thuế người nước ngoài 1.84 triệu won",
    "trust_bar_moving": "Ưu đãi trọn gói thanh lý đồ về nước"
}

ko_dict.update(TRUST_BAR_KO)
vi_dict.update(TRUST_BAR_VI)

# ko.ts 저장
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

# vi.ts 저장
lines_vi = [
    "import { TranslationDictionary } from '../types';",
    "",
    "export const vi: TranslationDictionary = {"
]
for k in ko_dict.keys():
    v = vi_dict.get(k, "Thông tin giao dịch an toàn K-Market")
    escaped = str(v).replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
    lines_vi.append(f'  {k}: "{escaped}",')
lines_vi.append("};")
lines_vi.append("")
with open(vi_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines_vi))

print("PERFECT: trust_bar keys updated to full sentences in both ko.ts and vi.ts!")
