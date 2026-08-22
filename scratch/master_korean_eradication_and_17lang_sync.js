const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const localesDir = path.join(srcDir, 'lib', 'i18n', 'locales');
const typesFile = path.join(srcDir, 'lib', 'i18n', 'types.ts');
const koFile = path.join(localesDir, 'ko.ts');

// 1. 기존 ko.ts 로드
const koContent = fs.readFileSync(koFile, 'utf8');
const textToKey = {};
const keyToKo = {};

const lines = koContent.split('\n');
for (const line of lines) {
  const match = line.match(/^\s*([a-zA-Z0-9_]+):\s*(.*),?$/);
  if (match) {
    const key = match[1];
    try {
      const rawVal = match[2].trim().replace(/,$/, '');
      const val = JSON.parse(rawVal);
      if (typeof val === 'string' && val.trim()) {
        keyToKo[key] = val;
        textToKey[val.trim()] = key;
      }
    } catch (e) {}
  }
}

console.log(`Loaded ${Object.keys(keyToKo).length} existing keys from ko.ts`);

// 2. 모든 사용자 대면 TSX 파일 탐색
const ignoreDirs = ['node_modules', '.next', '.git', 'src\\lib\\i18n', 'src\\app\\admin', 'src\\components\\admin'];

function getTsxFiles(dir, list = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(path.join(__dirname, '..'), full);
    if (ignoreDirs.some(id => rel.includes(id))) continue;

    if (entry.isDirectory()) {
      getTsxFiles(full, list);
    } else if (entry.name.endsWith('.tsx')) {
      list.push(full);
    }
  }
  return list;
}

const tsxFiles = getTsxFiles(srcDir);
console.log(`Scanning ${tsxFiles.length} TSX files...`);

const koreanRegex = /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/;
let nextKeyIdx = 2001;

function getOrCreateKey(koreanText) {
  const trimmed = koreanText.trim();
  if (textToKey[trimmed]) {
    return textToKey[trimmed];
  }
  // 새 키 생성
  while (keyToKo[`auto_ui_${nextKeyIdx}`]) {
    nextKeyIdx++;
  }
  const newKey = `auto_ui_${nextKeyIdx}`;
  nextKeyIdx++;
  keyToKo[newKey] = trimmed;
  textToKey[trimmed] = newKey;
  return newKey;
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

let totalReplacements = 0;

for (const file of tsxFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // 1) JSX 태그 사이 텍스트 추출 및 치환: > (한글 포함 텍스트) <
  content = content.replace(/>([^<>{}\n\r]+)</g, (match, p1) => {
    const trimmed = p1.trim();
    if (koreanRegex.test(trimmed) && trimmed.length >= 1) {
      const key = getOrCreateKey(trimmed);
      totalReplacements++;
      return `>{t('${key}')}<`;
    }
    return match;
  });

  // 2) 속성값 치환: placeholder="한글", title="한글", alt="한글", label="한글"
  content = content.replace(/(placeholder|title|alt|label)=["']([^"']+)["']/g, (match, attr, val) => {
    const trimmed = val.trim();
    if (koreanRegex.test(trimmed) && trimmed.length >= 1) {
      const key = getOrCreateKey(trimmed);
      totalReplacements++;
      return `${attr}={t('${key}')}`;
    }
    return match;
  });

  // 3) alert("한글"), confirm("한글")
  content = content.replace(/\b(alert|confirm)\s*\(\s*["']([^"']+)["']\s*\)/g, (match, fn, val) => {
    const trimmed = val.trim();
    if (koreanRegex.test(trimmed) && trimmed.length >= 1) {
      const key = getOrCreateKey(trimmed);
      totalReplacements++;
      return `${fn}(t('${key}'))`;
    }
    return match;
  });

  if (content !== originalContent) {
    // useLanguage import 주입
    if (!content.includes('useLanguage')) {
      if (content.includes("'use client'") || content.includes('"use client"')) {
        content = content.replace(/(['"]use client['"];?)/, `$1\nimport { useLanguage } from '@/context/LanguageContext';`);
      } else {
        content = `import { useLanguage } from '@/context/LanguageContext';\n` + content;
      }
    }

    // const { t } = useLanguage(); 주입
    if (!content.includes('useLanguage()')) {
      content = content.replace(
        /(export\s+default\s+function\s+[A-Za-z0-9_]+\s*\([^)]*\)\s*\{)/,
        `$1\n  const { t } = useLanguage();`
      );
    }

    fs.writeFileSync(file, content, 'utf8');
    const rel = path.relative(path.join(__dirname, '..'), file);
    console.log(`✅ [치환] ${rel}`);
  }
}

console.log(`\n🎉 Total UI Korean Strings Replaced: ${totalReplacements}`);
console.log(`Total Master Keys now: ${Object.keys(keyToKo).length}`);

// 3. types.ts 작성
const typeLines = [
  `// K-Market 17개국어 표준 번역 키 마스터 인터페이스`,
  ``,
  `export interface TranslationDictionary {`,
];

for (const key of Object.keys(keyToKo)) {
  typeLines.push(`  ${key}: string;`);
}
typeLines.push(`}`, ``);
fs.writeFileSync(typesFile, typeLines.join('\n'), 'utf8');
console.log(`✅ Updated types.ts`);

// 4. ko.ts 작성
const koOutLines = [
  `import { TranslationDictionary } from '../types';`,
  ``,
  `export const ko: TranslationDictionary = {`,
];

for (const [k, v] of Object.entries(keyToKo)) {
  koOutLines.push(`  ${k}: ${JSON.stringify(v)},`);
}
koOutLines.push(`};`, ``);
fs.writeFileSync(koFile, koOutLines.join('\n'), 'utf8');
console.log(`✅ Updated ko.ts`);

// 5. 17개 언어 로케일 파일 동기화 스크립트 실행
console.log('Now synchronizing all 17 language files...');
require('./fix_and_generate_all_17_locales.js');
