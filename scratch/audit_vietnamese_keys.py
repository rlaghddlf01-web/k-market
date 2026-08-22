# -*- coding: utf-8 -*-
import os
import re

locales_dir = os.path.join(os.path.dirname(__file__), '..', 'src', 'lib', 'i18n', 'locales')
ko_path = os.path.join(locales_dir, 'ko.ts')
vi_path = os.path.join(locales_dir, 'vi.ts')

print("=== [VIETNAMESE AUDIT] START ===")

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

ko_keys = set(ko_dict.keys())
vi_keys = set(vi_dict.keys())

missing_keys = list(ko_keys - vi_keys)
empty_keys = [k for k, v in vi_dict.items() if not v or not v.strip()]
hangul_pattern = re.compile(r'[가-힣]')
hangul_remaining_keys = [k for k, v in vi_dict.items() if hangul_pattern.search(v)]

print(f"Total ko keys: {len(ko_keys)}")
print(f"Total vi keys: {len(vi_keys)}")
print(f"Missing keys in vi: {len(missing_keys)}")
print(f"Empty value keys in vi: {len(empty_keys)}")
print(f"Keys containing Hangul (Korean letters) in vi: {len(hangul_remaining_keys)}")

if hangul_remaining_keys:
    print("\nSample keys with remaining Korean (up to 30):")
    for k in hangul_remaining_keys[:30]:
        print(f"  {k}: '{ko_dict[k]}' -> '{vi_dict[k]}'")
