const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');

function getAllCodeFiles(dir, list = []) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (f !== 'node_modules' && f !== '.next' && f !== '.git') {
        getAllCodeFiles(full, list);
      }
    } else if (f.endsWith('.tsx') || f.endsWith('.ts')) {
      // i18n 딕셔너리 정의 파일 자체는 제외
      if (!full.includes(path.join('src', 'lib', 'i18n', 'locales'))) {
        list.push(full);
      }
    }
  }
  return list;
}

const files = getAllCodeFiles(srcDir);
const koreanRegex = /[\uac00-\ud7af]/;

const findingsByComponent = [];
let totalCount = 0;

for (const file of files) {
  const relPath = path.relative(srcDir, file).replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  const fileFindings = [];

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    // 주석 제외
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) return;
    
    if (koreanRegex.test(trimmed)) {
      // JSX 태그 안의 텍스트, placeholder, title, alert, button 라벨 등 추출
      fileFindings.push({
        line: idx + 1,
        code: trimmed,
      });
      totalCount++;
    }
  });

  if (fileFindings.length > 0) {
    findingsByComponent.push({
      file: relPath,
      count: fileFindings.length,
      lines: fileFindings,
    });
  }
}

// 개수 많은 순 정렬
findingsByComponent.sort((a, b) => b.count - a.count);

console.log('======================================================================');
console.log(`🕵️‍♂️ [전체 소스코드 한국어 정밀 사냥 결과] 총 ${findingsByComponent.length}개 파일, ${totalCount}개 한국어 코드 적발!`);
console.log('======================================================================\n');

findingsByComponent.forEach((item, index) => {
  console.log(`[${index + 1}] 📁 ${item.file} (총 ${item.count}개)`);
  // 상위 3개 라인 미리보기
  item.lines.slice(0, 3).forEach(l => {
    console.log(`    - L${l.line}: ${l.code.slice(0, 80)}...`);
  });
  console.log('');
});

fs.writeFileSync(
  path.join(__dirname, 'exhaustive_korean_hunter_report.json'),
  JSON.stringify(findingsByComponent, null, 2),
  'utf8'
);
