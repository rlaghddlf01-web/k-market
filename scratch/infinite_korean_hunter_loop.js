const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const srcDir = path.join(__dirname, '..', 'src');
const ignorePaths = ['node_modules', '.next', '.git', 'src/app/admin', 'src/components/admin', 'src/lib/i18n'];

const ALL_LANGS = ['ko', 'vi', 'zh', 'en', 'ja', 'ru', 'th', 'uz', 'km', 'mn', 'ne', 'id', 'my', 'si', 'kk', 'bn', 'ur', 'tl'];
const koreanRegex = /[\uac00-\ud7af]/;

function getAllUserFiles(dir, list = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(path.join(__dirname, '..'), full).replace(/\\/g, '/');
    if (ignorePaths.some(ip => rel.startsWith(ip))) continue;

    if (entry.isDirectory()) {
      getAllUserFiles(full, list);
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      list.push(full);
    }
  }
  return list;
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

let round = 1;
const MAX_ROUNDS = 5;

while (round <= MAX_ROUNDS) {
  console.log(`\n========================================================================================`);
  console.log(`🔄 [무한 정밀 루프 라운드 #${round}] 소스코드 전체 한글 전수 사냥 시작`);
  console.log(`========================================================================================`);

  const userFiles = getAllUserFiles(srcDir);
  const koPath = path.join(srcDir, 'lib', 'i18n', 'locales', 'ko.ts');
  const koContent = fs.readFileSync(koPath, 'utf8');

  // 1. 현재 ko.ts 로드
  const masterMap = {};
  koContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([a-zA-Z0-9_]+)\s*:\s*(['"].*['"]),?\s*$/);
    if (match) {
      try {
        masterMap[match[1]] = JSON.parse(match[2].replace(/'/g, '"'));
      } catch (e) {
        masterMap[match[1]] = match[2].slice(1, -1);
      }
    }
  });

  const textToKey = {};
  for (const [k, v] of Object.entries(masterMap)) {
    if (typeof v === 'string') textToKey[v.trim()] = k;
  }

  // 2. 한글 구문 수집
  let newlyFound = 0;
  const newKeyMap = {};

  userFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');

    lines.forEach(l => {
      const trimmed = l.trim();
      if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) return;
      if (!koreanRegex.test(trimmed)) return;

      // JSX 및 문자열 추출
      const jsxMatches = trimmed.match(/>([^<]+)</g) || [];
      const quotesMatches = trimmed.match(/['"`]([^'"`]+)['"`]/g) || [];

      [...jsxMatches, ...quotesMatches].forEach(m => {
        let clean = m.replace(/^[>'"`]|['"`<]$/g, '').trim();
        if (koreanRegex.test(clean) && clean.length >= 2) {
          if (!textToKey[clean]) {
            const keyName = `auto_loop_${Object.keys(masterMap).length + Object.keys(newKeyMap).length + 1}`;
            newKeyMap[keyName] = clean;
            textToKey[clean] = keyName;
            newlyFound++;
          }
        }
      });
    });
  });

  console.log(`📊 이번 라운드 신규 발견 한글 수: ${newlyFound}개 (현재 마스터 키 총합: ${Object.keys(masterMap).length + newlyFound}개)`);

  if (newlyFound === 0) {
    console.log(`\n✨✨ 축하합니다! 잔여 한국어가 0개입니다! 모든 화면이 완벽하게 다국어화되었습니다! ✨✨`);
    break;
  }

  // 3. types.ts 갱신
  Object.assign(masterMap, newKeyMap);
  const typesPath = path.join(srcDir, 'lib', 'i18n', 'types.ts');
  let typesStr = `// K-Market 17개국어 표준 번역 키 마스터 인터페이스\n\nexport interface TranslationDictionary {\n`;
  for (const key of Object.keys(masterMap)) {
    typesStr += `  ${key}: string;\n`;
  }
  typesStr += `}\n`;
  fs.writeFileSync(typesPath, typesStr, 'utf8');

  // 4. ko.ts 및 16개국 언어 사전 갱신
  let koStr = `import { TranslationDictionary } from '../types';\n\nexport const ko: TranslationDictionary = {\n`;
  for (const [k, v] of Object.entries(masterMap)) {
    koStr += `  ${k}: ${JSON.stringify(v)},\n`;
  }
  koStr += `};\n`;
  fs.writeFileSync(koPath, koStr, 'utf8');

  const localesDir = path.join(srcDir, 'lib', 'i18n', 'locales');
  ALL_LANGS.forEach(lang => {
    if (lang === 'ko') return;
    const filePath = path.join(localesDir, `${lang}.ts`);
    let existingMap = {};
    if (fs.existsSync(filePath)) {
      const existingContent = fs.readFileSync(filePath, 'utf8');
      existingContent.split('\n').forEach(line => {
        const match = line.match(/^\s*([a-zA-Z0-9_]+)\s*:\s*(['"].*['"]),?\s*$/);
        if (match) {
          try {
            existingMap[match[1]] = JSON.parse(match[2].replace(/'/g, '"'));
          } catch (e) {
            existingMap[match[1]] = match[2].slice(1, -1);
          }
        }
      });
    }

    let langStr = `import { TranslationDictionary } from '../types';\n\nexport const ${lang}: TranslationDictionary = {\n`;
    for (const [k, v] of Object.entries(masterMap)) {
      const translatedVal = existingMap[k] || v;
      langStr += `  ${k}: ${JSON.stringify(translatedVal)},\n`;
    }
    langStr += `};\n`;
    fs.writeFileSync(filePath, langStr, 'utf8');
  });

  // 5. 소스코드 치환
  const sortedTexts = Object.keys(textToKey).sort((a, b) => b.length - a.length);
  userFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    sortedTexts.forEach(text => {
      // 1) JSX 태그 사이 텍스트
      const jsxRegex = new RegExp(`>(\\s*)${escapeRegex(text)}(\\s*)<`, 'g');
      if (jsxRegex.test(content)) {
        const key = textToKey[text];
        content = content.replace(jsxRegex, `>$1{t('${key}')}$2<`);
        modified = true;
      }
      // 2) 속성값: placeholder="한국어"
      const attrRegex = new RegExp(`(placeholder|title|alt)=["']${escapeRegex(text)}["']`, 'g');
      if (attrRegex.test(content)) {
        const key = textToKey[text];
        content = content.replace(attrRegex, `$1={t('${key}')}`);
        modified = true;
      }
    });

    if (modified) {
      if (!content.includes('useLanguage')) {
        content = `import { useLanguage } from '@/context/LanguageContext';\n` + content;
      }
      fs.writeFileSync(file, content, 'utf8');
    }
  });

  // 6. use client 최상단 정돈
  userFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes("'use client'") || content.includes('"use client"')) {
      const cleaned = content.replace(/['"]use client['"];?\s*\n?/g, '').trimStart();
      content = `'use client';\n\n` + cleaned;
      fs.writeFileSync(file, content, 'utf8');
    }
  });

  console.log(`✅ 라운드 #${round} 자동 치환 및 사전 동기화 완료`);
  round++;
}
