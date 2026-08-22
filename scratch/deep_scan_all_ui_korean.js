const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const ignorePaths = ['node_modules', '.next', '.git', 'src/app/admin', 'src/components/admin', 'src/lib/i18n'];

function scan(dir, list = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(path.join(__dirname, '..'), full).replace(/\\/g, '/');
    if (ignorePaths.some(ip => rel.startsWith(ip))) continue;

    if (entry.isDirectory()) {
      scan(full, list);
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      list.push(full);
    }
  }
  return list;
}

const files = scan(srcDir);
const koreanRegex = /[\uac00-\ud7af]/;

const findings = [];
let totalLines = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  const fileMatches = [];

  lines.forEach((l, idx) => {
    const trimmed = l.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) return;
    
    // t('...') 내부에 들어있는 키는 제외하고, 실제 하드코딩된 한국어 문자열 검출
    // 예: >한국어<, "한국어", '한국어', `한국어`
    if (koreanRegex.test(trimmed)) {
      fileMatches.push({
        line: idx + 1,
        code: trimmed,
      });
      totalLines++;
    }
  });

  if (fileMatches.length > 0) {
    findings.push({
      file: path.relative(path.join(__dirname, '..'), file).replace(/\\/g, '/'),
      count: fileMatches.length,
      lines: fileMatches,
    });
  }
});

findings.sort((a, b) => b.count - a.count);

console.log('========================================================================================');
console.log(`🕵️‍♂️ [화면 UI 잔여 한국어 초정밀 감사 결과]`);
console.log(`📊 한글이 남아있는 UI 파일 수: ${findings.length}개`);
console.log(`📊 한글 하드코딩 총 라인 수: ${totalLines}줄`);
console.log('========================================================================================\n');

findings.forEach((f, idx) => {
  console.log(`[${idx + 1}] 📁 ${f.file} (${f.count}줄)`);
  f.lines.forEach(l => {
    console.log(`    └─ L${l.line}: ${l.code.slice(0, 95)}`);
  });
  console.log('');
});

fs.writeFileSync(
  path.join(__dirname, 'deep_ui_korean_audit.json'),
  JSON.stringify(findings, null, 2),
  'utf8'
);
