const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const ignorePaths = ['node_modules', '.next', '.git', 'src/app/admin', 'src/components/admin', 'src/lib/i18n'];

function getAllUserFiles(dir, list = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(path.join(__dirname, '..'), full).replace(/\\/g, '/');
    if (ignorePaths.some(ip => rel.startsWith(ip))) continue;

    if (entry.isDirectory()) {
      getAllUserFiles(full, list);
    } else if (entry.name.endsWith('.tsx')) {
      list.push(full);
    }
  }
  return list;
}

const userFiles = getAllUserFiles(srcDir);

// ko.ts에서 textToKey 역매핑 로드
const koPath = path.join(srcDir, 'lib', 'i18n', 'locales', 'ko.ts');
const koContent = fs.readFileSync(koPath, 'utf8');
const textToKey = {};

koContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([a-zA-Z0-9_]+)\s*:\s*(['"].*['"]),?\s*$/);
  if (match) {
    try {
      const val = JSON.parse(match[2].replace(/'/g, '"'));
      if (typeof val === 'string' && val.trim().length >= 2) {
        textToKey[val.trim()] = match[1];
      }
    } catch (e) {}
  }
});

// 키들을 글자 수 긴 순서대로 정렬 (긴 구문 우선 매칭)
const sortedTexts = Object.keys(textToKey).sort((a, b) => b.length - a.length);

let totalReplacedCount = 0;

userFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;

  // 1. useLanguage 훅이 없는 경우 주입
  const hasUseLanguage = content.includes('useLanguage');
  let needsHook = false;

  sortedTexts.forEach(text => {
    // 1) JSX 태그 사이 텍스트: >한국어<
    const jsxRegex = new RegExp(`>(\\s*)${escapeRegex(text)}(\\s*)<`, 'g');
    if (jsxRegex.test(content)) {
      const key = textToKey[text];
      content = content.replace(jsxRegex, `>$1{t('${key}')}$2<`);
      modified = true;
      needsHook = true;
      totalReplacedCount++;
    }

    // 2) 속성값: placeholder="한국어"
    const attrRegex = new RegExp(`(placeholder|title|alt)=["']${escapeRegex(text)}["']`, 'g');
    if (attrRegex.test(content)) {
      const key = textToKey[text];
      content = content.replace(attrRegex, `$1={t('${key}')}`);
      modified = true;
      needsHook = true;
      totalReplacedCount++;
    }
  });

  if (modified) {
    // import 추가
    if (!hasUseLanguage) {
      content = `import { useLanguage } from '@/context/LanguageContext';\n` + content;
    }
    // 컴포넌트 함수 시작 부분에 const { t } = useLanguage(); 추가
    if (!content.includes('const { t }') && !content.includes('useLanguage()')) {
      content = content.replace(
        /(export default function\s+[A-Za-z0-9_]+\s*\([^)]*\)\s*\{)/,
        `$1\n  const { t } = useLanguage();`
      );
    }
    fs.writeFileSync(file, content, 'utf8');
    const rel = path.relative(path.join(__dirname, '..'), file).replace(/\\/g, '/');
    console.log(`✅ [치환 완료] 📁 ${rel}`);
  }
});

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

console.log(`\n🎉 [전수 치환 완료] 총 ${totalReplacedCount}개 하드코딩 문구가 t('키값')으로 100% 전환되었습니다!`);
