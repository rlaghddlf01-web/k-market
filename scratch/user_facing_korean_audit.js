const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const ignorePaths = ['node_modules', '.next', '.git', 'src/app/admin', 'src/components/admin', 'src/lib/i18n/locales'];

function scanUserFiles(dir, list = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(path.join(__dirname, '..'), full).replace(/\\/g, '/');
    if (ignorePaths.some(ip => rel.startsWith(ip))) continue;

    if (entry.isDirectory()) {
      scanUserFiles(full, list);
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      list.push(full);
    }
  }
  return list;
}

const userFiles = scanUserFiles(srcDir);
const koFilePath = path.join(__dirname, '..', 'src', 'lib', 'i18n', 'locales', 'ko.ts');
const koContent = fs.readFileSync(koFilePath, 'utf8');

const masterValues = new Set();
const lines = koContent.split('\n');
lines.forEach(l => {
  const match = l.match(/^\s*([a-zA-Z0-9_]+)\s*:\s*['"](.+)['"],?\s*$/);
  if (match) {
    masterValues.add(match[2].trim());
  }
});

const userFindingsByComponent = [];
let totalKoreanLines = 0;

for (const file of userFiles) {
  const relPath = path.relative(srcDir, file).replace(/\\/g, '/');
  const code = fs.readFileSync(file, 'utf8');
  const codeLines = code.split('\n');
  const fileLines = [];

  codeLines.forEach((l, idx) => {
    const trimmed = l.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) return;
    if (/[\uac00-\ud7af]/.test(trimmed)) {
      fileLines.push({
        line: idx + 1,
        code: trimmed,
      });
      totalKoreanLines++;
    }
  });

  if (fileLines.length > 0) {
    userFindingsByComponent.push({
      file: relPath,
      count: fileLines.length,
      lines: fileLines,
    });
  }
}

userFindingsByComponent.sort((a, b) => b.count - a.count);

console.log('========================================================================================');
console.log(`📱 [외국인 유저 전용 화면 한국어 전수조사 결과 (관리자 제외)]`);
console.log(`📊 검사된 유저 파일 수: ${userFiles.length}개`);
console.log(`📊 한글이 포함된 유저 컴포넌트 수: ${userFindingsByComponent.length}개`);
console.log(`📊 한글 코드 총 라인 수: ${totalKoreanLines}줄`);
console.log(`📜 현재 ko.ts 마스터 사전 등록 키 수: ${masterValues.size}개`);
console.log('========================================================================================\n');

userFindingsByComponent.forEach((item, idx) => {
  console.log(`[${idx + 1}] 📁 ${item.file} (총 ${item.count}줄)`);
  item.lines.slice(0, 2).forEach(l => {
    console.log(`    └─ L${l.line}: ${l.code.slice(0, 85)}`);
  });
});

fs.writeFileSync(
  path.join(__dirname, 'user_facing_korean_audit_report.json'),
  JSON.stringify(userFindingsByComponent, null, 2),
  'utf8'
);
