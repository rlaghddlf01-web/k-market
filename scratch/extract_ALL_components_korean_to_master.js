const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const ignorePaths = ['node_modules', '.next', '.git', 'src/app/admin', 'src/components/admin', 'src/lib/i18n'];

// 1. 모든 유저 컴포넌트 파일 수집
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

const userFiles = getAllUserFiles(srcDir);
const koreanRegex = /[\uac00-\ud7af]/;

// 2. 현재 ko.ts 로드
const koPath = path.join(srcDir, 'lib', 'i18n', 'locales', 'ko.ts');
let koContent = fs.readFileSync(koPath, 'utf8');
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

// 역방향 매핑 (한글 텍스트 -> 키)
const textToKey = {};
for (const [k, v] of Object.entries(masterMap)) {
  if (typeof v === 'string') {
    textToKey[v.trim()] = k;
  }
}

// 3. 파일들에서 모든 한글 구문 추출 및 신규 키 등록
let newKeyIndex = 1;
const newlyAddedMap = {};

userFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');

  lines.forEach(l => {
    const trimmed = l.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) return;

    // JSX 태그 사이 텍스트 또는 속성값 추출
    const matches = trimmed.match(/>([^<]+)</g) || [];
    const attrMatches = trimmed.match(/(?:placeholder|title|alt)=["']([^"']+)["']/g) || [];

    const candidates = [];
    matches.forEach(m => {
      const text = m.slice(1, -1).trim();
      if (koreanRegex.test(text) && text.length >= 2) candidates.push(text);
    });
    attrMatches.forEach(m => {
      const valMatch = m.match(/=["']([^"']+)["']/);
      if (valMatch && koreanRegex.test(valMatch[1])) candidates.push(valMatch[1].trim());
    });

    candidates.forEach(cand => {
      if (!textToKey[cand]) {
        // 간결한 영문 키 생성
        const keyName = `auto_ui_${newKeyIndex++}`;
        masterMap[keyName] = cand;
        textToKey[cand] = keyName;
        newlyAddedMap[keyName] = cand;
      }
    });
  });
});

console.log(`✨ 신규로 발견하여 마스터 사전에 추가한 한글 키: ${Object.keys(newlyAddedMap).length}개`);
console.log(`📊 최종 마스터 한국어 키 총 개수: ${Object.keys(masterMap).length}개`);

// 4. types.ts 완전 갱신
const typesPath = path.join(srcDir, 'lib', 'i18n', 'types.ts');
let typesStr = `// K-Market 17개국어 표준 번역 키 마스터 인터페이스\n\nexport interface TranslationDictionary {\n`;
for (const key of Object.keys(masterMap)) {
  typesStr += `  ${key}: string;\n`;
}
typesStr += `}\n`;
fs.writeFileSync(typesPath, typesStr, 'utf8');

// 5. ko.ts 완전 갱신
let koStr = `import { TranslationDictionary } from '../types';\n\nexport const ko: TranslationDictionary = {\n`;
for (const [k, v] of Object.entries(masterMap)) {
  koStr += `  ${k}: ${JSON.stringify(v)},\n`;
}
koStr += `};\n`;
fs.writeFileSync(koPath, koStr, 'utf8');

// 6. 16개국 언어 파일 전수 1:1 완벽 대칭 동기화
const ALL_LANGS = ['vi', 'zh', 'en', 'ja', 'ru', 'th', 'uz', 'km', 'mn', 'ne', 'id', 'my', 'si', 'kk', 'bn', 'ur', 'tl'];
const localesDir = path.join(srcDir, 'lib', 'i18n', 'locales');

ALL_LANGS.forEach(lang => {
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
  console.log(`✅ [${lang.toUpperCase()}] ${Object.keys(masterMap).length}개 전수 키 1:1 완전 대칭 동기화 완료`);
});

fs.writeFileSync(
  path.join(__dirname, 'mass_korean_extraction_report.json'),
  JSON.stringify({
    totalKeys: Object.keys(masterMap).length,
    newKeysCount: Object.keys(newlyAddedMap).length,
    newKeys: newlyAddedMap
  }, null, 2),
  'utf8'
);
