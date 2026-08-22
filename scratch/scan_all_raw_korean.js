const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (!filePath.includes('node_modules') && !filePath.includes('.next') && !filePath.includes('src\\lib\\i18n\\locales')) {
        getAllFiles(filePath, fileList);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const allFiles = getAllFiles(srcDir);
const koreanRegex = /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/;

const findings = [];

for (const filePath of allFiles) {
  // 번역 사전 자체나 mock 데이터 파일은 제외
  if (filePath.includes('i18n\\locales') || filePath.includes('types\\') || filePath.includes('joongnaMockData')) continue;

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    // 주석 제외
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) return;
    if (trimmed.includes('console.log') || trimmed.includes('console.warn') || trimmed.includes('console.error')) return;

    if (koreanRegex.test(line)) {
      findings.push({
        file: path.relative(srcDir, filePath),
        lineNum: index + 1,
        lineContent: trimmed
      });
    }
  });
}

console.log(`Total Korean Lines Found: ${findings.length}`);
fs.writeFileSync(path.join(__dirname, 'exact_korean_scan_report.json'), JSON.stringify(findings, null, 2), 'utf8');

// 파일별 그룹화 요약
const fileGroups = {};
for (const item of findings) {
  fileGroups[item.file] = (fileGroups[item.file] || 0) + 1;
}
console.log('--- Korean Lines By File ---');
for (const [f, count] of Object.entries(fileGroups)) {
  console.log(`${f}: ${count} lines`);
}
