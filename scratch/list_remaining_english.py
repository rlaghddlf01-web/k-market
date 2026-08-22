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
remaining = []

for k, v in ko_dict.items():
    eng_matches = re.findall(r'[a-zA-Z]+', v)
    if eng_matches:
        remaining.append(f"{k}: {v} (Found: {', '.join(eng_matches)})")

with open(os.path.join(os.path.dirname(__file__), 'remaining_english.txt'), 'w', encoding='utf-8') as f:
    f.write('\n'.join(remaining))

print(f"Written {len(remaining)} keys with English to remaining_english.txt")
