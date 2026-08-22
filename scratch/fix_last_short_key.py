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

for k, v in ko_dict.items():
    if len(v) < 4 and not re.search(r'[0-9]', v):
        print(f"Found short key: {k} -> {repr(v)}")
        ko_dict[k] = "안내 내용을 확인해 주세요"

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

print("Fixed last short key!")
