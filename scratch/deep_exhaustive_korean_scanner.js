const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        getAllFiles(filePath, fileList);
      }
    } else if (file.endsWith('.tsx') || (file.endsWith('.ts') && !filePath.includes('i18n\\locales') && !filePath.includes('i18n/locales'))) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const allFiles = getAllFiles(srcDir);
const results = [];

// 한국어 한글 포함 여부 체크
const koreanRegex = /[\uac00-\ud7a3]+/g;

for (const file of allFiles) {
  const relativePath = path.relative(path.join(__dirname, '..'), file);
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    // 주석 라인은 제외
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
      return;
    }

    // JSX 또는 코드 내 한국어 문자열 검색
    const matches = line.match(koreanRegex);
    if (matches) {
      // 만약 i18n 키 정의 파일이나 사전 파일이 아닌 실제 컴포넌트 파일인 경우
      results.push({
        file: relativePath,
        lineNum: idx + 1,
        matches: matches.join(', '),
        lineContent: trimmed,
      });
    }
  });
}

console.log(`🚨 총 ${results.length}개의 한국어 하드코딩 라인이 발견되었습니다!\n`);

// 파일별 그룹화 출력
const grouped = {};
for (const item of results) {
  if (!grouped[item.file]) grouped[item.file] = [];
  grouped[item.file].push(item);
}

for (const [file, items] of Object.entries(grouped)) {
  console.log(`\n📁 [${file}] (${items.length}건):`);
  items.slice(0, 10).forEach(it => {
    console.log(`  L${it.lineNum}: ${it.lineContent}`);
  });
  if (items.length > 10) {
    console.log(`  ...외 ${items.length - 10}건`);
  }
}

fs.writeFileSync(
  path.join(__dirname, 'total_korean_audit_report.json'),
  JSON.stringify(results, null, 2),
  'utf8'
);
