const fs = require('fs');
const path = require('path');

const targetDirs = [
  path.join(__dirname, '..', 'src', 'components', 'kmarket'),
  path.join(__dirname, '..', 'src', 'app'),
];

const koreanRegex = /[\uac00-\ud7af]+/g;
const extractedStrings = new Set();
const fileStringMap = {};

function scan(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scan(fullPath);
    } else if (file.endsWith('.tsx')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      const foundInFile = [];
      lines.forEach((line, idx) => {
        // 주석 제외
        const trimmed = line.trim();
        if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) return;
        if (koreanRegex.test(line)) {
          foundInFile.push({ lineNum: idx + 1, text: trimmed });
        }
      });
      if (foundInFile.length > 0) {
        fileStringMap[file] = foundInFile;
      }
    }
  }
}

targetDirs.forEach(scan);

console.log('=== 한국어가 발견된 핵심 UI 컴포넌트 목록 ===');
for (const [fileName, items] of Object.entries(fileStringMap)) {
  console.log(`📁 ${fileName}: 총 ${items.length}개 한국어 라인 발견`);
}

fs.writeFileSync(
  path.join(__dirname, 'extracted_korean_report.json'),
  JSON.stringify(fileStringMap, null, 2),
  'utf8'
);
