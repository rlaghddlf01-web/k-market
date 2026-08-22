const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '../src/lib/i18n/locales');
const languages = ['vi', 'en', 'zh', 'ja', 'ru', 'th', 'uz', 'km', 'mn', 'ne', 'id', 'my', 'si', 'kk', 'bn', 'ur', 'tl'];

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

const koDict = parseLocale(path.join(localesDir, 'ko.ts'));
const koKeys = Object.keys(koDict);

console.log(`=== MASTER AUDIT REPORT (Total Master Keys: ${koKeys.length}) ===\n`);

let totalDefects = 0;

languages.forEach((lang) => {
  const filePath = path.join(localesDir, `${lang}.ts`);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ [${lang}] File does not exist!`);
    totalDefects++;
    return;
  }

  const dict = parseLocale(filePath);
  const dictKeys = Object.keys(dict);

  const missingKeys = koKeys.filter((k) => !dictKeys.includes(k));
  const emptyKeys = dictKeys.filter((k) => !dict[k] || dict[k].trim() === '');
  
  // 한국어 잔재 검사 (단, 고유명사나 'K-Market' 등 제외)
  const koreanResidualKeys = dictKeys.filter((k) => {
    const val = dict[k];
    // 한글 유니코드 매칭
    return /[가-힣]/.test(val);
  });

  console.log(`[${lang.toUpperCase()}]`);
  console.log(`  - Total Keys: ${dictKeys.length} / ${koKeys.length}`);
  console.log(`  - Missing Keys: ${missingKeys.length}`);
  console.log(`  - Empty Keys: ${emptyKeys.length}`);
  console.log(`  - Korean Residuals: ${koreanResidualKeys.length}`);

  if (koreanResidualKeys.length > 0) {
    console.log(`    ⚠️ Residual Sample (${lang}):`, koreanResidualKeys.slice(0, 10).map((k) => `${k}: "${dict[k]}"`));
    totalDefects += koreanResidualKeys.length;
  }
  if (missingKeys.length > 0) {
    console.log(`    ❌ Missing Sample:`, missingKeys.slice(0, 5));
    totalDefects += missingKeys.length;
  }
  console.log('');
});

console.log(`TOTAL DEFECTS DETECTED ACROSS ALL 17 LANGUAGES: ${totalDefects}`);
