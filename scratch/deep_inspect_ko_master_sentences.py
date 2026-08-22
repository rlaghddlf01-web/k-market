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

# 전수 조사 카테고리
english_in_val = []
very_short_words = []
incomplete_phrases = []

for k, v in ko_dict.items():
    # 1. 영어가 섞여 있는 값 검출 (KRW, OCR, GPS, SMS 등 약어 제외하고 일반 영단어가 있는지)
    if re.search(r'[a-zA-Z]', v):
        # 약어(GPS, SMS, OCR, ARC, PWA, AI, GS25, K-Market, KTRS 등) 외의 영어 단어
        clean = re.sub(r'\b(GPS|SMS|OCR|ARC|PWA|AI|GS25|K-Market|KTRS|EasyTax|E-9|E-7|QR|OTP|KRW|Nickname|Item Title|Passport Name|Expiry Date|Visa Status|Moving Sale|Category)\b', '', v, flags=re.IGNORECASE)
        if re.search(r'[a-zA-Z]', clean):
            english_in_val.append((k, v))
            
    # 2. 너무 짧은 단어 쪼가리 (3글자 이하)
    if len(v) <= 3 and v not in ["원", "일"]:
        very_short_words.append((k, v))

print(f"Total Master Korean Keys: {len(ko_dict)}")
print(f"Keys containing English words: {len(english_in_val)}")
print(f"Keys with short word fragments (<= 3 chars): {len(very_short_words)}")

print("\n--- English In Values Sample (up to 20) ---")
for k, v in english_in_val[:20]:
    print(f"  {k}: {v}")

print("\n--- Short Word Fragments Sample (up to 20) ---")
for k, v in very_short_words[:20]:
    print(f"  {k}: {v}")
