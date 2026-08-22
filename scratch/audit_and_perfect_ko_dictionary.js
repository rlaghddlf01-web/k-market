const fs = require('fs');
const path = require('path');

const koFilePath = path.join(__dirname, '../src/lib/i18n/locales/ko.ts');
const koContent = fs.readFileSync(koFilePath, 'utf8');

function parseLocale(content) {
  const map = {};
  const regex = /^\s*([a-zA-Z0-9_]+)\s*:\s*("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const key = match[1];
    let val = match[2];
    if (val.startsWith('"') || val.startsWith("'")) {
      val = val.slice(1, -1).replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\n/g, '\n');
    }
    map[key] = val;
  }
  return map;
}

const koDict = parseLocale(koContent);
const keys = Object.keys(koDict);

console.log(`=== 한국어(ko.ts) 키값 1,478개 전수조사 시작 ===\n`);

// 1. 이상치 검출 (빈값, 1글자 단어, 비문 등)
const anomalies = [];
keys.forEach((key) => {
  const val = koDict[key];
  if (!val || val.trim() === '') {
    anomalies.push({ key, val, reason: '빈 값' });
  } else if (val.length <= 2 && !['마이', '삭제', '수정', '확인', '취소', '등록', '이전', '다음', '후기', '필수', '완료'].includes(val)) {
    anomalies.push({ key, val, reason: '너무 짧은 단어 쪼가리 의심' });
  } else if (/^[0-9]+$/.test(val)) {
    anomalies.push({ key, val, reason: '단순 숫자만 존재' });
  }
});

console.log(`검출된 잠재적 단어 쪼가리 및 이상치 개수: ${anomalies.length}개`);
if (anomalies.length > 0) {
  console.log('이상치 샘플:', anomalies.slice(0, 20));
}
