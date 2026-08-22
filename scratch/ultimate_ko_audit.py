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

print("=== [ULTIMATE 4-TIER KO.TS AUDIT] START ===")
print(f"Total keys inspected: {total_keys}")

empty_keys = []
broken_symbols = []
short_fragments = []
foreign_words = []

for k, v in ko_dict.items():
    # 1. 빈 값 검사
    if not v or not v.strip():
        empty_keys.append((k, v))
        
    # 2. 깨진 코드 찌꺼기 검사 ($ 또는 연속된 백슬래시 등)
    if re.search(r'[\$]|\\\\\\\\', v):
        broken_symbols.append((k, v))
        
    # 3. 너무 짧은 단어 쪼가리 검사 (4글자 미만)
    if len(v) < 4 and not re.search(r'[0-9]', v):
        short_fragments.append((k, v))
        
    # 4. 일반 영단어 혼입 검사 (공식 비자 코드 E-9, E-7, F-4, H-2 제외)
    clean_text = re.sub(r'\b(E-9|E-7|F-4|H-2|E|F|H)\b', '', v)
    if re.search(r'[a-zA-Z]', clean_text):
        foreign_words.append((k, v))

print("\n--- AUDIT RESULTS ---")
print(f"1. Empty Keys: {len(empty_keys)}")
print(f"2. Broken Code Symbols / Escapes: {len(broken_symbols)}")
print(f"3. Short Fragment Words (< 4 chars): {len(short_fragments)}")
print(f"4. Foreign English Words Remaining: {len(foreign_words)}")

if broken_symbols:
    print(f"\n[Broken Symbols Found ({len(broken_symbols)})]:")
    for k, v in broken_symbols[:10]:
        print(f"  {k}: {repr(v[:50])}")

if short_fragments:
    print(f"\n[Short Fragments Found ({len(short_fragments)})]:")
    for k, v in short_fragments[:10]:
        print(f"  {k}: {v}")

if foreign_words:
    print(f"\n[Foreign Words Found ({len(foreign_words)})]:")
    for k, v in foreign_words[:10]:
        print(f"  {k}: {v}")
