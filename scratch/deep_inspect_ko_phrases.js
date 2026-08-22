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

// 단어형(4글자 이하) 키 전수 추출
const shortWords = [];
keys.forEach((k) => {
  const val = koDict[k];
  if (val && val.length <= 4) {
    shortWords.push({ key: k, val: val });
  }
});

console.log(`총 1,478개 키 중 4글자 이하 단어형 키: ${shortWords.length}개 발견`);
console.log('단어형 키 샘플 30개:', shortWords.slice(0, 30));
