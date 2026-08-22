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
total_keys = len(ko_dict)

print("=== [FINAL 4-TIER KO.TS AUDIT] ===")
print(f"Total keys: {total_keys}")

empty_keys = []
broken_symbols = []
short_fragments = []
foreign_words = []

for k, v in ko_dict.items():
    if not v or not v.strip():
        empty_keys.append(k)
    if re.search(r'[\$]|\\\\', v):
        broken_symbols.append(k)
    if len(v) < 4 and not re.search(r'[0-9]', v):
        short_fragments.append(k)
    clean_text = re.sub(r'\b(E-9|E-7|F-4|H-2|E|F|H)\b', '', v)
    if re.search(r'[a-zA-Z]', clean_text):
        foreign_words.append(k)

print(f"1. Empty Keys: {len(empty_keys)}")
print(f"2. Broken Code Symbols: {len(broken_symbols)}")
print(f"3. Short Fragment Words: {len(short_fragments)}")
print(f"4. Foreign English Words: {len(foreign_words)}")

if len(empty_keys) == 0 and len(broken_symbols) == 0 and len(short_fragments) == 0 and len(foreign_words) == 0:
    print("\nPERFECT: ko.ts passed all 4 inspection tiers with 100% pure Korean sentences!")
