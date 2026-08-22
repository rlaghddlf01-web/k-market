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
    # HTML 엔티티 제거
    v = v.replace("&amp;", "및").replace("&gt;", ">").replace("&lt;", "<")
    
    # 괄호 안의 영문 표기 제거 (예: (Vietnam) -> 제거)
    v = re.sub(r'\s*\([A-Za-z\s/+\-_]+\)', '', v)
    
    # 코드 파편 및 특수 기호 정리
    v = v.replace("CCTV", "폐쇄회로 카메라")
    v = v.replace("API", "전산망")
    v = v.replace("D-3", "3일 남음")
    v = v.replace("D-7", "7일 남음")
    v = v.replace("D-14", "14일 남음")
    v = v.replace("D-", "남은 일수: ")
    v = v.replace("ON", "켜짐")
    v = v.replace("On/Off", "켜기/끄기")
    v = v.replace("256bit", "최고 등급 보안")
    v = v.replace("SKT", "에스케이티")
    v = v.replace("KT", "케이티")
    v = v.replace("LGU+", "엘지유플러스")
    v = v.replace("K-Trust", "케이마켓")
    
    # 중복 공백 정리
    v = re.sub(r'\s+', ' ', v).strip()
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

print(f"SUCCESS: ko.ts completely purged of English entities and fragments! ({len(ko_dict)} keys)")
