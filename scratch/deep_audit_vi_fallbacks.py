# -*- coding: utf-8 -*-
import os
import re

locales_dir = os.path.join(os.path.dirname(__file__), '..', 'src', 'lib', 'i18n', 'locales')
vi_path = os.path.join(locales_dir, 'vi.ts')
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
vi_dict = parse_locale(vi_path)

# 'Xác nhận'만 들어있거나 너무 짧은 조각들 검출
xac_nhan_only = []
short_words = []

for k, v in vi_dict.items():
    if v == "Xác nhận" and ko_dict[k] not in ["확인", "확인 및 적용", "내용을 확인했습니다"]:
        xac_nhan_only.append((k, ko_dict[k], v))
    elif len(v) < 4:
        short_words.append((k, ko_dict[k], v))

print(f"Total keys: {len(vi_dict)}")
print(f"Improperly filled fallback count: {len(xac_nhan_only)}")
print(f"Short truncated words count: {len(short_words)}")
