const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');
const koFilePath = path.join(__dirname, '../src/lib/i18n/locales/ko.ts');

function getAllFiles(dir, exts = ['.tsx', '.ts', '.jsx', '.js']) {
  let files = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        files = files.concat(getAllFiles(filePath, exts));
      }
    } else {
      if (exts.includes(path.extname(file))) {
        files.push(filePath);
      }
    }
  });
  return files;
}

function parseLocale(file) {
  const content = fs.readFileSync(file, 'utf8');
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

const koDict = parseLocale(koFilePath);
const allSrcFiles = getAllFiles(srcDir);

// 모든 t('key') 추출 정규식
const usedKeysSet = new Set();
const tRegex = /\bt\(\s*['"]([a-zA-Z0-9_]+)['"]\s*\)/g;

allSrcFiles.forEach((file) => {
  // locales 파일 자체는 제외
  if (file.includes('src/lib/i18n/locales') || file.includes('src/lib/i18n/types.ts')) return;
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = tRegex.exec(content)) !== null) {
    usedKeysSet.add(match[1]);
  }
});

const usedKeys = Array.from(usedKeysSet);
console.log(`\n=== 실제 코드에서 사용 중인 번역 키 전수 조사 결과 ===`);
console.log(`실제 컴포넌트에서 호출 중인 총 고유 키 수: ${usedKeys.length}개\n`);

// ko.ts에 누락된 키가 있는지 검사
const missingInKo = usedKeys.filter((k) => !(k in koDict));
console.log(`ko.ts에 누락된 실제 사용 키 수: ${missingInKo.length}개`);
if (missingInKo.length > 0) {
  console.log('❌ 누락된 키 목록:', missingInKo);
} else {
  console.log('✅ 실제 코드에서 쓰이는 모든 고유 키가 ko.ts에 완벽하게 존재합니다!');
}

console.log('\n실제 사용 중인 키 목록 샘플 30개:', usedKeys.slice(0, 30));
