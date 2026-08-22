const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');

const EXTRA_KEYS_KO = {
  header_quick_lang: '🌍 빠른 언어 선택 (17개국어)',
  zone_sub_desc: '포승 · 반월 · 향남 · 남동 등 기숙사 인근',
  unit_items_count: '개',
  badge_completed: '완료',
  badge_discount_rate: '할인',
  time_months_ago: '개월 전',
  time_recent: '최근',
  welcome_btn_korean: '한국어로 계속하기 ➔',
  welcome_change_ko: '🇰🇷 한국어로 변경',
};

const EXTRA_KEYS_VI = {
  header_quick_lang: '🌍 Chọn nhanh ngôn ngữ (17 thứ tiếng)',
  zone_sub_desc: 'Gần KTX các KCN Poseung, Banwol, Hyangnam, Namdong',
  unit_items_count: ' món',
  badge_completed: 'Xong',
  badge_discount_rate: 'Giảm',
  time_months_ago: 'tháng trước',
  time_recent: 'Gần đây',
  welcome_btn_korean: 'Tiếp tục bằng tiếng Hàn ➔',
  welcome_change_ko: '🇰🇷 Chuyển sang tiếng Hàn',
};

const EXTRA_KEYS_ZH = {
  header_quick_lang: '🌍 快速选择语言 (17国语言)',
  zone_sub_desc: '浦升·半月·乡南·南洞等宿舍周边',
  unit_items_count: '件',
  badge_completed: '已完成',
  badge_discount_rate: '折',
  time_months_ago: '个月前',
  time_recent: '最近',
  welcome_btn_korean: '继续使用韩语 ➔',
  welcome_change_ko: '🇰🇷 切换为韩语',
};

const EXTRA_KEYS_EN = {
  header_quick_lang: '🌍 Quick Language Selection (17 Languages)',
  zone_sub_desc: 'Near dorms in Poseung, Banwol, Hyangnam, Namdong',
  unit_items_count: ' items',
  badge_completed: 'Done',
  badge_discount_rate: 'Off',
  time_months_ago: 'mo ago',
  time_recent: 'Recent',
  welcome_btn_korean: 'Continue in Korean ➔',
  welcome_change_ko: '🇰🇷 Switch to Korean',
};

// 1. types.ts 확장
const typesPath = path.join(srcDir, 'lib', 'i18n', 'types.ts');
let typesContent = fs.readFileSync(typesPath, 'utf8');
for (const key of Object.keys(EXTRA_KEYS_KO)) {
  if (!typesContent.includes(`  ${key}: string;`)) {
    typesContent = typesContent.replace('export interface TranslationDictionary {', `export interface TranslationDictionary {\n  ${key}: string;`);
  }
}
fs.writeFileSync(typesPath, typesContent, 'utf8');

// 2. 17개 언어 파일 확장
const localesDir = path.join(srcDir, 'lib', 'i18n', 'locales');
const ALL_LANGS = ['ko', 'vi', 'zh', 'en', 'ja', 'ru', 'th', 'uz', 'km', 'mn', 'ne', 'id', 'my', 'si', 'kk', 'bn', 'ur', 'tl'];

ALL_LANGS.forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.ts`);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  const specific = lang === 'vi' ? EXTRA_KEYS_VI : (lang === 'zh' ? EXTRA_KEYS_ZH : EXTRA_KEYS_EN);

  for (const [k, v] of Object.entries(EXTRA_KEYS_KO)) {
    if (!content.includes(`  ${k}:`)) {
      const val = specific[k] || EXTRA_KEYS_EN[k] || v;
      content = content.replace(`export const ${lang}: TranslationDictionary = {`, `export const ${lang}: TranslationDictionary = {\n  ${k}: ${JSON.stringify(val)},`);
    }
  }
  fs.writeFileSync(filePath, content, 'utf8');
});

// 3. KMarketHeader.tsx 치환
const headerPath = path.join(srcDir, 'components', 'kmarket', 'KMarketHeader.tsx');
let headerCode = fs.readFileSync(headerPath, 'utf8');
headerCode = headerCode.replace('🌍 빠른 언어 선택 (15개국어)', "{t('header_quick_lang')}");
headerCode = headerCode.replace('🌍 빠른 언어 선택 (17개국어)', "{t('header_quick_lang')}");
headerCode = headerCode.replace('포승 · 반월 · 향남 · 남동 등 기숙사 인근', "{t('zone_sub_desc')}");
fs.writeFileSync(headerPath, headerCode, 'utf8');

// 4. KMarketRegionFilter.tsx 치환
const regionFilterPath = path.join(srcDir, 'components', 'kmarket', 'KMarketRegionFilter.tsx');
if (fs.existsSync(regionFilterPath)) {
  let rfCode = fs.readFileSync(regionFilterPath, 'utf8');
  rfCode = rfCode.replace('포승 · 반월 · 향남 · 남동 등 기숙사 인근', "{t('zone_sub_desc')}");
  fs.writeFileSync(regionFilterPath, rfCode, 'utf8');
}

// 5. KMarketStatusBadge.tsx 치환
const statusBadgePath = path.join(srcDir, 'components', 'kmarket', 'KMarketStatusBadge.tsx');
if (fs.existsSync(statusBadgePath)) {
  let sbCode = fs.readFileSync(statusBadgePath, 'utf8');
  sbCode = sbCode.replace("'가격인하'", "t('status_price_dropped')");
  sbCode = sbCode.replace("`${dropDiscountRate}% 할인`", "`${dropDiscountRate}% ${t('badge_discount_rate')}`");
  fs.writeFileSync(statusBadgePath, sbCode, 'utf8');
}

// 6. KMarketUserItemsList.tsx 치환
const userItemsPath = path.join(srcDir, 'components', 'kmarket', 'KMarketUserItemsList.tsx');
if (fs.existsSync(userItemsPath)) {
  let uiCode = fs.readFileSync(userItemsPath, 'utf8');
  uiCode = uiCode.replace('{userItems.length}개', "{userItems.length}{t('unit_items_count')}");
  uiCode = uiCode.replace('>완료<', ">{t('badge_completed')}<");
  fs.writeFileSync(userItemsPath, uiCode, 'utf8');
}

// 7. KMarketWelcomeLanguageGateway.tsx 치환
const welcomeGwPath = path.join(srcDir, 'components', 'common', 'KMarketWelcomeLanguageGateway.tsx');
if (fs.existsSync(welcomeGwPath)) {
  let gwCode = fs.readFileSync(welcomeGwPath, 'utf8');
  gwCode = gwCode.replace('한국어로 계속하기 ➔', "{t('welcome_btn_korean')}");
  fs.writeFileSync(welcomeGwPath, gwCode, 'utf8');
}

console.log('✅ 잔여 한국어 세부 문구 전수 치환 및 17개국 사전 등록 완료!');
