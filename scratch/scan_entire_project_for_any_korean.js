const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const ignoreDirs = new Set(['.git', 'node_modules', '.next', 'scratch']);

function scanDirectory(dir, fileList = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!ignoreDirs.has(entry.name)) {
        scanDirectory(path.join(dir, entry.name), fileList);
      }
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      // 코드 및 설정 파일 전수 검사
      if (['.tsx', '.ts', '.js', '.jsx', '.json', '.html'].includes(ext)) {
        fileList.push(path.join(dir, entry.name));
      }
    }
  }
  return fileList;
}

const allFiles = scanDirectory(rootDir);
const koreanRegex = /[\uac00-\ud7af\u1100-\u11ff\u3130-\u318f]/;

const findings = [];
let totalKoreanLines = 0;

for (const file of allFiles) {
  const relPath = path.relative(rootDir, file).replace(/\\/g, '/');
  
  // 마스터 한국어 사전 ko.ts와 번역 사전들은 기준 파일이므로 구분 표시
  const isMasterKoLocale = relPath === 'src/lib/i18n/locales/ko.ts';
  const isI18nLocale = relPath.startsWith('src/lib/i18n/locales/');
  
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  const matchedLines = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) return;
    
    if (koreanRegex.test(trimmed)) {
      matchedLines.push({
        lineNumber: index + 1,
        code: trimmed,
      });
      totalKoreanLines++;
    }
  });

  if (matchedLines.length > 0) {
    findings.push({
      file: relPath,
      isMasterKoLocale,
      isI18nLocale,
      count: matchedLines.length,
      lines: matchedLines,
    });
  }
}

// 개수 많은 순 정렬
findings.sort((a, b) => b.count - a.count);

console.log('========================================================================================');
console.log(`🕵️‍♂️ [전체 프로젝트 폴더 통째 스캔 결과]`);
console.log(`📊 검사된 총 파일 수: ${allFiles.length}개`);
console.log(`📊 한글이 발견된 파일 수: ${findings.length}개`);
console.log(`📊 한글 코드 총 라인 수: ${totalKoreanLines}줄`);
console.log('========================================================================================\n');

// 1. 일반 컴포넌트 및 코드 파일 (마스터 사전 제외)
const nonLocaleFindings = findings.filter(f => !f.isI18nLocale);
console.log(`🚨 [하드코딩된 한글이 남아있는 소스코드 파일]: 총 ${nonLocaleFindings.length}개\n`);

nonLocaleFindings.forEach((f, idx) => {
  console.log(`[${idx + 1}] 📁 ${f.file} (${f.count}줄 발견)`);
  // 상위 2개 라인 출력
  f.lines.slice(0, 2).forEach(l => {
    console.log(`    └─ L${l.lineNumber}: ${l.code.slice(0, 90)}`);
  });
});

fs.writeFileSync(
  path.join(__dirname, 'entire_project_korean_scan_report.json'),
  JSON.stringify({
    totalScannedFiles: allFiles.length,
    totalFilesWithKorean: findings.length,
    totalKoreanLines,
    nonLocaleCount: nonLocaleFindings.length,
    files: findings
  }, null, 2),
  'utf8'
);
