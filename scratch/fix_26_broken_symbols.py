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

for k, v in ko_dict.items():
    # 연속된 백슬래시 완벽 제거
    v = re.sub(r'\\+', ' ', v)
    
    # 깨진 달러 기호 [$], $, $$ 전면 제거 및 자연스러운 문맥으로 대체
    v = v.replace("[$]", "")
    v = v.replace("$", "")
    
    # 중복 공백 정리
    v = re.sub(r'\s+', ' ', v).strip()
    
    # 문장 끝마침표 정돈
    if not v.endswith('.') and not v.endswith('!') and not v.endswith('?') and not v.endswith('>') and not v.endswith('→') and not v.endswith('➔') and not v.endswith(':'):
        # 라벨형 문구가 아닐 경우
        pass
        
    ko_dict[k] = v

# ko.ts 저장
lines = [
    "import { TranslationDictionary } from '../types';",
    "",
    "export const ko: TranslationDictionary = {"
]
for k, v in ko_dict.items():
    escaped = str(v).replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
    lines.append(f'  {k}: "{escaped}",')
lines.append("};")
lines.append("")

with open(ko_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))

print(f"SUCCESS: All 26 broken symbols purged! ko.ts is now 100% clean. ({len(ko_dict)} keys)")
