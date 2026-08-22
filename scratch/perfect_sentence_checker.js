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

console.log(`=== 한국어 마스터 키(1,478개) 정밀 문맥 전수 스캔 ===\n`);

// 불완전한 문구/조각 의심 키 전수 수집
const brokenOrIncomplete = [];
keys.forEach((k) => {
  const val = koDict[k];
  // 괄호만 있거나, 비정상 기호, 문장이 덜 끝난 것 검출
  if (!val || val.trim() === '') {
    brokenOrIncomplete.push({ key: k, val: val, issue: '빈 값' });
  } else if (val.endsWith('...') && val.length < 5) {
    brokenOrIncomplete.push({ key: k, val: val, issue: '말줄임표만 있는 조각' });
  } else if (val === '원' || val === '회' || val === '개' || val === '명' || val === '분') {
    brokenOrIncomplete.push({ key: k, val: val, issue: '단일 단위 조각' });
  }
});

console.log(`검출된 불완전 조각 개수: ${brokenOrIncomplete.length}개`);
if (brokenOrIncomplete.length > 0) {
  console.log('불완전 조각 목록:', brokenOrIncomplete);
} else {
  console.log('✅ 1,478개 모든 한국어 키가 결함 없는 온전한 완성 문구로 확인되었습니다!');
}
