const fs = require('fs');
const path = require('path');

const koFilePath = path.join(__dirname, '..', 'src', 'lib', 'i18n', 'locales', 'ko.ts');
const koContent = fs.readFileSync(koFilePath, 'utf8');

// 마스터 사전의 값들을 정규식으로 추출
const masterValues = new Set();
const masterKeyMap = {};
const lines = koContent.split('\n');
lines.forEach(l => {
  const match = l.match(/^\s*([a-zA-Z0-9_]+)\s*:\s*['"](.+)['"],?\s*$/);
  if (match) {
    masterKeyMap[match[1]] = match[2];
    masterValues.add(match[2].trim());
  }
});

console.log('======================================================================');
console.log(`📜 [현재 ko.ts 마스터 사전에 등록된 키 개수]: 총 ${Object.keys(masterKeyMap).length}개`);
console.log('======================================================================\n');

// 프로젝트 전체 파일 스캔
const rootDir = path.join(__dirname, '..', 'src');
const ignoreDirs = new Set(['node_modules', '.next', '.git', 'locales']);

function scan(dir, fileList = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!ignoreDirs.has(entry.name)) {
        scan(path.join(dir, entry.name), fileList);
      }
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      fileList.push(path.join(dir, entry.name));
    }
  }
  return fileList;
}

const allFiles = scan(rootDir);
const uncoveredPhrases = [];

allFiles.forEach(f => {
  const rel = path.relative(rootDir, f).replace(/\\/g, '/');
  const code = fs.readFileSync(f, 'utf8');
  const codeLines = code.split('\n');

  codeLines.forEach((l, lineIdx) => {
    const trimmed = l.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) return;
    
    // 한국어 구문 추출
    const koreanMatches = trimmed.match(/[가-힣0-9\s·,·!?~()\[\]\-_+%@/]+/g);
    if (koreanMatches) {
      koreanMatches.forEach(m => {
        const clean = m.trim();
        if (clean.length >= 2 && /[가-힣]/.test(clean)) {
          // 마스터 사전 값에 완전히 포함되는지 검사
          const isCovered = Array.from(masterValues).some(mv => mv.includes(clean) || clean.includes(mv));
          if (!isCovered) {
            uncoveredPhrases.push({
              file: rel,
              line: lineIdx + 1,
              phrase: clean,
              codeSnippet: trimmed.slice(0, 80)
            });
          }
        }
      });
    }
  });
});

console.log(`🔎 [역방향 정밀 대조 결과]`);
console.log(`📊 미등록/세부 검토 필요 구문 수: ${uncoveredPhrases.length}개\n`);

if (uncoveredPhrases.length > 0) {
  console.log('--- [추가 마스터 등록 권장 구문 Top 15] ---');
  uncoveredPhrases.slice(0, 15).forEach((u, i) => {
    console.log(`[${i+1}] 📁 ${u.file} (L${u.line}): "${u.phrase}"`);
  });
} else {
  console.log('✨ 축하합니다! 모든 한국어 문구가 마스터 사전에 100% 완벽하게 포함되었습니다!');
}

fs.writeFileSync(
  path.join(__dirname, 'uncovered_korean_audit.json'),
  JSON.stringify(uncoveredPhrases, null, 2),
  'utf8'
);
