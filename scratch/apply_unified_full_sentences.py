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

# 통째 완성 문구 정의
ko_dict["hero_main_headline"] = "외국인 안심 직거래 & 귀국 무빙세일 특가전"
vi_dict["hero_main_headline"] = "Sàn giao dịch an toàn & Thanh lý đồ về nước đặc biệt cho người nước ngoài"

ko_dict["hero_bundle_tag"] = "풀패키지 묶음 할인"
vi_dict["hero_bundle_tag"] = "Thanh lý trọn bộ gói đồ"

ko_dict["hero_bundle_discount"] = "75% 파격 할인"
vi_dict["hero_bundle_discount"] = "Giảm giá 75%"

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
    v = vi_dict.get(k, "Nội dung giao dịch K-Market")
    escaped = str(v).replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
    lines_vi.append(f'  {k}: "{escaped}",')
lines_vi.append("};")
lines_vi.append("")
with open(vi_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines_vi))

# types.ts 동기화
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

print("SUCCESS: Unified full sentences applied cleanly to ko.ts and vi.ts!")
