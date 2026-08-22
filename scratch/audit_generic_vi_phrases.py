# -*- coding: utf-8 -*-
import os
import re

vi_path = os.path.join(os.path.dirname(__file__), '..', 'src', 'lib', 'i18n', 'locales', 'vi.ts')
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
vi_dict = parse_locale(vi_path)

# 반복 제네릭 문구 검출
GENERIC_PATTERNS = [
    "Thông tin chi tiết",
    "Thông báo quan trọng từ hệ thống K-Market",
    "Thực hiện thao tác trên hệ thống",
    "Tiêu đề thông tin chi tiết",
    "Hướng dẫn chi tiết dành cho người dùng",
    "Vui lòng nhập thông tin chi tiết...",
    "Mục thông tin",
    "Thông tin giao dịch an toàn K-Market"
]

generic_keys = []
for k, v in vi_dict.items():
    if v in GENERIC_PATTERNS:
        generic_keys.append((k, ko_dict[k], v))

print(f"Total vi keys: {len(vi_dict)}")
print(f"Generic placeholder keys found: {len(generic_keys)}")

if generic_keys:
    print(f"\nSample generic placeholder keys (up to 20):")
    for k, kr, vi in generic_keys[:20]:
        print(f"  [{k}] KR: '{kr}' -> VI: '{vi}'")
