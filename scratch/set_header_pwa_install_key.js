const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const localesDir = path.join(srcDir, 'lib', 'i18n', 'locales');
const typesPath = path.join(srcDir, 'lib', 'i18n', 'types.ts');

const PWA_BUTTON_TRANSLATIONS = {
  ko: '1초 앱설치',
  vi: 'Cài App 1s',
  zh: '1秒安装App',
  en: 'Install App 1s',
  ja: '1秒アプリ設置',
  ru: 'Установить за 1с',
  th: 'ติดตั้งแอพ 1วิ',
  uz: '1 soniyada App',
  km: 'ដំឡើង App 1វិនាទី',
  mn: '1с Апп суулгах',
  ne: '१ सेकेन्डमा एप',
  id: 'Pasang App 1d',
  my: '၁ စက္ကန့် App သွင်းရန်',
  si: 'තත් 1න් App එක',
  kk: '1с Қолданба',
  bn: '১ সেকেন্ডে অ্যাপ',
  ur: '1 سیکنڈ میں ایپ',
  tl: 'I-install sa 1s',
};

// 1. types.ts 확장
let typesContent = fs.readFileSync(typesPath, 'utf8');
if (!typesContent.includes('header_pwa_install_btn: string;')) {
  typesContent = typesContent.replace('export interface TranslationDictionary {', 'export interface TranslationDictionary {\n  header_pwa_install_btn: string;');
  fs.writeFileSync(typesPath, typesContent, 'utf8');
}

// 2. 17개국 사전 확장
const ALL_LANGS = Object.keys(PWA_BUTTON_TRANSLATIONS);
ALL_LANGS.forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.ts`);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  const val = PWA_BUTTON_TRANSLATIONS[lang];

  if (content.includes('header_pwa_install_btn:')) {
    content = content.replace(/(\s*header_pwa_install_btn\s*:\s*)(['"].*['"])(,?)/, `$1${JSON.stringify(val)}$3`);
  } else {
    content = content.replace(`export const ${lang}: TranslationDictionary = {`, `export const ${lang}: TranslationDictionary = {\n  header_pwa_install_btn: ${JSON.stringify(val)},`);
  }
  fs.writeFileSync(filePath, content, 'utf8');
});

// 3. KMarketHeader.tsx 치환
const headerPath = path.join(srcDir, 'components', 'kmarket', 'KMarketHeader.tsx');
let headerCode = fs.readFileSync(headerPath, 'utf8');
headerCode = headerCode.replace(/<span>\{t\('auto_ui_144'\)\}<\/span>/g, "<span>{t('header_pwa_install_btn')}</span>");
fs.writeFileSync(headerPath, headerCode, 'utf8');

console.log('✅ 헤더 1초 앱설치 버튼 17개국어 완벽 적용 완료!');
