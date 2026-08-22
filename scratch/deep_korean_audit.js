const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');

function getAllTsxFiles(dir, list = []) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (f !== 'node_modules' && f !== '.next') {
        getAllTsxFiles(full, list);
      }
    } else if (f.endsWith('.tsx')) {
      list.push(full);
    }
  }
  return list;
}

const files = getAllTsxFiles(srcDir);
const koreanRegex = /[\uac00-\ud7af]+/g;
const componentKoreanMap = {};
const allUniquePhrases = new Set();

for (const file of files) {
  const relativePath = path.relative(srcDir, file).replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  const foundLines = [];

  lines.forEach((l, idx) => {
    const trimmed = l.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) return;
    if (koreanRegex.test(trimmed)) {
      foundLines.push({ line: idx + 1, code: trimmed });
      // 한글 덩어리 추출
      const matches = trimmed.match(/[가-힣0-9\s·,·!?~()\[\]\-_+%@/]+/g);
      if (matches) {
        matches.forEach(m => {
          const clean = m.trim();
          if (clean.length >= 2 && /[가-힣]/.test(clean)) {
            allUniquePhrases.add(clean);
          }
        });
      }
    }
  });

  if (foundLines.length > 0) {
    componentKoreanMap[relativePath] = foundLines;
  }
}

console.log('=============================================');
console.log('🔍 [K-Market 전수조사] 한국어가 포함된 컴포넌트 목록');
console.log('=============================================');
let totalKoreanLines = 0;
for (const [relPath, items] of Object.entries(componentKoreanMap)) {
  console.log(`- ${relPath}: ${items.length}줄`);
  totalKoreanLines += items.length;
}
console.log('---------------------------------------------');
console.log(`📊 총 파일 수: ${Object.keys(componentKoreanMap).length}개`);
console.log(`📊 총 한국어 라인 수: ${totalKoreanLines}줄`);
console.log(`📊 고유 한국어 문구(Phrase) 수: ${allUniquePhrases.size}개`);
console.log('=============================================');

fs.writeFileSync(
  path.join(__dirname, 'all_korean_audit_summary.json'),
  JSON.stringify({
    totalFiles: Object.keys(componentKoreanMap).length,
    totalKoreanLines,
    totalUniquePhrases: allUniquePhrases.size,
    components: componentKoreanMap,
    uniquePhrases: Array.from(allUniquePhrases)
  }, null, 2),
  'utf8'
);
