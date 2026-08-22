const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'src', 'lib', 'i18n', 'locales');
const koPath = path.join(localesDir, 'ko.ts');

const ALL_LANGS = [
  'ko', 'vi', 'zh', 'en', 'ja', 'ru', 'th', 'uz',
  'km', 'mn', 'ne', 'id', 'my', 'si', 'kk', 'bn', 'ur'
];

function extractKeysFromLocale(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const keys = {};
  const lines = content.split('\n');
  lines.forEach(l => {
    const match = l.match(/^\s*([a-zA-Z0-9_]+)\s*:\s*(['"].*['"]),?\s*$/);
    if (match) {
      keys[match[1]] = match[2];
    }
  });
  return keys;
}

const masterKeys = extractKeysFromLocale(koPath);
const masterKeyList = Object.keys(masterKeys);

console.log('========================================================================================');
console.log(`🔬 [K-Market 17개국어 딕셔너리 전수 정밀 감사] 기준 마스터 키 수: ${masterKeyList.length}개`);
console.log('========================================================================================\n');

let totalAuditPoints = 0;
let totalMissingPoints = 0;
const auditResults = [];

for (const lang of ALL_LANGS) {
  const filePath = path.join(localesDir, `${lang}.ts`);
  if (!fs.existsSync(filePath)) {
    console.log(`❌ [${lang.toUpperCase()}] 파일 없음!`);
    continue;
  }
  const langKeys = extractKeysFromLocale(filePath);
  const missing = [];

  masterKeyList.forEach(k => {
    totalAuditPoints++;
    if (!langKeys[k] || langKeys[k].trim() === '""' || langKeys[k].trim() === "''") {
      missing.push(k);
      totalMissingPoints++;
    }
  });

  const passRate = Math.round(((masterKeyList.length - missing.length) / masterKeyList.length) * 100);
  auditResults.push({
    lang,
    totalKeys: Object.keys(langKeys).length,
    missingCount: missing.length,
    passRate,
  });

  console.log(`✅ [${lang.toUpperCase().padEnd(4)}] 키 개수: ${Object.keys(langKeys).length.toString().padStart(3)} / ${masterKeyList.length}개 일치 | 누락: ${missing.length}개 | 통과율: ${passRate}%`);
}

console.log('\n========================================================================================');
console.log(`📊 [딕셔너리 정밀 감사 결과] 총 ${totalAuditPoints.toLocaleString()}개 데이터 포인트 중 누락: ${totalMissingPoints}개 (무결점 달성율: ${((totalAuditPoints - totalMissingPoints) / totalAuditPoints * 100).toFixed(2)}%)`);
console.log('========================================================================================\n');

fs.writeFileSync(
  path.join(__dirname, 'ultimate_flawless_audit_report.json'),
  JSON.stringify({
    totalAuditPoints,
    totalMissingPoints,
    masterKeyCount: masterKeyList.length,
    results: auditResults
  }, null, 2),
  'utf8'
);
