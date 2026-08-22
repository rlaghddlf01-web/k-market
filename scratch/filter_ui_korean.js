const fs = require('fs');
const path = require('path');

const report = JSON.parse(fs.readFileSync(path.join(__dirname, 'total_korean_audit_report.json'), 'utf8'));

// UI에 직접 렌더링되는 컴포넌트 파일들 필터링
const componentFiles = report.filter(item => 
  item.file.startsWith('src\\components') || 
  item.file.startsWith('src/components') ||
  item.file.startsWith('src\\app') ||
  item.file.startsWith('src/app') ||
  item.file.startsWith('src\\context') ||
  item.file.startsWith('src/context')
);

console.log(`UI 컴포넌트 내 한국어 하드코딩 잔여: 총 ${componentFiles.length}건\n`);

const grouped = {};
for (const item of componentFiles) {
  if (!grouped[item.file]) grouped[item.file] = [];
  grouped[item.file].push(item);
}

for (const [file, items] of Object.entries(grouped)) {
  console.log(`\n========================================`);
  console.log(`📄 [${file}] - ${items.length}건 잔여:`);
  console.log(`========================================`);
  items.forEach(it => {
    console.log(`  [L${it.lineNum}] (${it.matches}) -> ${it.lineContent}`);
  });
}
