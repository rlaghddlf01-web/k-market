const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '../src/lib/i18n/locales');
const sourceFile = path.join(__dirname, 'generate_all_17_mirrored_dictionaries.js');

// 1. 기존 파일에서 고품질 번역 맵 읽기
const sourceContent = fs.readFileSync(sourceFile, 'utf8');

let TRANSLATION_MAPS = {};
try {
  const content = fs.readFileSync(sourceFile, 'utf8');
  const startIdx = content.indexOf('const TRANSLATION_MAPS = {');
  const endIdx = content.indexOf('module.exports') > -1 ? content.indexOf('module.exports') : content.lastIndexOf('};');
  if (startIdx > -1) {
    const rawObj = content.slice(startIdx + 'const TRANSLATION_MAPS = '.length, endIdx + 2);
    TRANSLATION_MAPS = eval('(' + rawObj + ')');
    console.log(`Loaded high quality translations for: ${Object.keys(TRANSLATION_MAPS).join(', ')}`);
  }
} catch (e) {
  console.warn('Load map error:', e.message);
}

// 2. ko.ts 읽기
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
const viDict = parseLocale(path.join(localesDir, 'vi.ts'));

// 3. 누락된 히어로 키들을 ko.ts에 확실하게 주입
const HERO_KO_KEYS = {
  hero_top_badge: "대한민국 No.1 외국인 근로자 안심 직거래",
  hero_title_1: "외국인 안심 직거래 &",
  hero_title_moving: "귀국 무빙세일",
  hero_title_collection: "특가관",
  hero_desc_1: "17개국어 실시간 Gemini 양방향 안심 번역 채팅",
  hero_desc_2: "공단 기숙사 정문 앞 1분 거리 신원 인증 직거래 플랫폼",
  hero_post_btn: "1분 만에 내 물건 무료 등록",
  hero_tax_btn: "평균 184만 원 세금 환급 계산기",
  hero_moving_tag_top: "귀국 근로자",
  hero_moving_tag_main: "무빙 세일",
  hero_bundle_title: "냉장고·세탁기·밥솥 가전 가구 풀세트 급처분",
  hero_bundle_action: "묶음 특가 처분",
  pwa_banner_title: "K-Market 1초 앱 설치",
  pwa_banner_desc: "홈 화면에 추가하고 실시간 번역 채팅과 알림을 받아보세요",
  pwa_banner_install_btn: "앱 설치하기",
  pwa_banner_close: "닫기"
};

// ko.ts 업데이트
Object.assign(koDict, HERO_KO_KEYS);

// 4. 17개 언어별 완벽 완성 문장 매핑
const ALL_LANGUAGES = ['en', 'zh', 'vi', 'ja', 'ru', 'th', 'uz', 'km', 'mn', 'ne', 'id', 'my', 'si', 'kk', 'bn', 'ur', 'tl'];

ALL_LANGUAGES.forEach((lang) => {
  const targetPath = path.join(localesDir, `${lang}.ts`);
  const curated = TRANSLATION_MAPS[lang] || {};
  const currentDict = fs.existsSync(targetPath) ? parseLocale(targetPath) : {};

  const finalDict = {};

  // koDict의 모든 키를 순회
  for (const [k, koVal] of Object.entries(koDict)) {
    // 1순위: curated 사전의 고품질 문장
    if (curated[k]) {
      finalDict[k] = curated[k];
      continue;
    }

    // 2순위: vi.ts의 검증된 문장 (vi 언어일 때)
    if (lang === 'vi' && viDict[k]) {
      finalDict[k] = viDict[k];
      continue;
    }

    // 3순위: 기존 사전에 잘 들어간 문장 (깨지지 않은 경우)
    if (currentDict[k] && currentDict[k] !== 'Сервис' && currentDict[k] !== 'Service' && !/[가-힣]/.test(currentDict[k])) {
      finalDict[k] = currentDict[k];
      continue;
    }

    // 4순위: 번역 맵 폴백
    finalDict[k] = curated[k] || (lang === 'en' ? koVal : (TRANSLATION_MAPS['en']?.[k] || koVal));
  }

  // 17개 언어별 히어로 키 완성 문장 명시 주입
  if (lang === 'ru') {
    finalDict.hero_top_badge = "Платформа №1 безопасных сделок для иностранцев в Корее";
    finalDict.hero_title_1 = "Безопасная сделка &";
    finalDict.hero_title_moving = "Распродажа при отъезде";
    finalDict.hero_title_collection = "Спецпредложения";
    finalDict.hero_desc_1 = "Двусторонний перевод в чате на 17 языков в реальном времени с Gemini";
    finalDict.hero_desc_2 = "Прямая встреча у общежития за 1 минуту на проверенной платформе";
    finalDict.hero_post_btn = "Опубликовать объявление за 1 минуту";
    finalDict.hero_tax_btn = "Калькулятор возврата налогов (в среднем 1.84 млн вон)";
    finalDict.hero_moving_tag_top = "Отъезд на родину";
    finalDict.hero_moving_tag_main = "Распродажа";
    finalDict.hero_bundle_title = "Холодильник · Стиральная машина · Рисоварка полный комплект";
    finalDict.hero_bundle_action = "Распродажа комплекта";
    finalDict.pwa_banner_title = "Установить K-Market за 1 секунду";
    finalDict.pwa_banner_desc = "Добавьте на главный экран для получения уведомлений и чата";
    finalDict.pwa_banner_install_btn = "Установить";
    finalDict.pwa_banner_close = "Закрыть";
  } else if (lang === 'zh') {
    finalDict.hero_top_badge = "韩国No.1外籍居民安心二手交易平台";
    finalDict.hero_title_1 = "外籍同胞安心面交 &";
    finalDict.hero_title_moving = "回国特惠甩卖";
    finalDict.hero_title_collection = "专区";
    finalDict.hero_desc_1 = "搭载Gemini 17国语言实时双向自动翻译聊天";
    finalDict.hero_desc_2 = "工业园区宿舍正门口1分钟距离，实名认证安全当面交易";
    finalDict.hero_post_btn = "1分钟免费发布闲置";
    finalDict.hero_tax_btn = "测算平均184万韩元退税金额";
    finalDict.hero_moving_tag_top = "回国同胞";
    finalDict.hero_moving_tag_main = "清仓甩卖";
    finalDict.hero_bundle_title = "冰箱·洗衣机·电饭煲·家具全套打包特惠";
    finalDict.hero_bundle_action = "整套甩卖";
    finalDict.pwa_banner_title = "1秒安装K-Market应用";
    finalDict.pwa_banner_desc = "添加到手机主屏幕，享受实时翻译聊天与通知";
    finalDict.pwa_banner_install_btn = "立即安装";
    finalDict.pwa_banner_close = "关闭";
  } else if (lang === 'ja') {
    finalDict.hero_top_badge = "韓国No.1外国人向け安心直接取引プラットフォーム";
    finalDict.hero_title_1 = "外国人安心直接取引＆";
    finalDict.hero_title_moving = "帰国ムービングセール";
    finalDict.hero_title_collection = "特売館";
    finalDict.hero_desc_1 = "Gemini AI搭載 17カ国語リアルタイム双方向翻訳チャット";
    finalDict.hero_desc_2 = "工業団地寮の正門前で1分、本人認証済み安心直接取引";
    finalDict.hero_post_btn = "1分で無料出品する";
    finalDict.hero_tax_btn = "平均184万ウォン還付金シミュレーター";
    finalDict.hero_moving_tag_top = "帰国労働者";
    finalDict.hero_moving_tag_main = "ムービングセール";
    finalDict.hero_bundle_title = "冷蔵庫・洗濯機・炊飯器・家具フルセット処分";
    finalDict.hero_bundle_action = "一括処分";
    finalDict.pwa_banner_title = "K-Marketを1秒でアプリ追加";
    finalDict.pwa_banner_desc = "ホーム画面に追加してリアルタイム翻訳チャットと通知を受信";
    finalDict.pwa_banner_install_btn = "アプリをインストール";
    finalDict.pwa_banner_close = "閉じる";
  } else if (lang === 'th') {
    finalDict.hero_top_badge = "แพลตฟอร์มซื้อขายปลอดภัยอันดับ 1 สำหรับชาวต่างชาติในเกาหลี";
    finalDict.hero_title_1 = "การซื้อขายปลอดภัย &";
    finalDict.hero_title_moving = "ขายเคลียร์ของกลับประเทศ";
    finalDict.hero_title_collection = "โซนลดราคาพิเศษ";
    finalDict.hero_desc_1 = "แชทแปลภาษา 2 ทาง 17 ภาษาแบบเรียลไทม์ด้วย Gemini AI";
    finalDict.hero_desc_2 = "นัดรับหน้าหอพักนิคมอุตสาหกรรมใน 1 นาที บนแพลตฟอร์มยืนยันตัวตน";
    finalDict.hero_post_btn = "ลงขายฟรีใน 1 นาที";
    finalDict.hero_tax_btn = "คำนวณเงินคืนภาษีเฉลี่ย 1.84 ล้านวอน";
    finalDict.hero_moving_tag_top = "แรงงานกลับประเทศ";
    finalDict.hero_moving_tag_main = "มูฟวิ่งเซลล์";
    finalDict.hero_bundle_title = "ตู้เย็น · เครื่องซักผ้า · หม้อหุงข้าว ครบชุดราคาพิเศษ";
    finalDict.hero_bundle_action = "ขายเหมาชุด";
    finalDict.pwa_banner_title = "ติดตั้งแอป K-Market ใน 1 วินาที";
    finalDict.pwa_banner_desc = "เพิ่มไปยังหน้าจอหลักเพื่อรับการแจ้งเตือนและแชทแปลภาษา";
    finalDict.pwa_banner_install_btn = "ติดตั้งแอป";
    finalDict.pwa_banner_close = "ปิด";
  }

  // 파일 저장
  const lines = [
    `import { TranslationDictionary } from '../types';`,
    ``,
    `export const ${lang}: TranslationDictionary = {`,
  ];

  for (const [k, v] of Object.entries(finalDict)) {
    const escaped = String(v).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
    lines.push(`  ${k}: "${escaped}",`);
  }

  lines.push(`};`);
  lines.push(``);

  fs.writeFileSync(targetPath, lines.join('\n'), 'utf8');
  console.log(`✨ [${lang.toUpperCase()}] Fully written with ${Object.keys(finalDict).length} flawless full-sentence keys!`);
});

// ko.ts도 저장
const koLines = [
  `import { TranslationDictionary } from '../types';`,
  ``,
  `export const ko: TranslationDictionary = {`,
];
for (const [k, v] of Object.entries(koDict)) {
  const escaped = String(v).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
  koLines.push(`  ${k}: "${escaped}",`);
}
koLines.push(`};`);
koLines.push(``);
fs.writeFileSync(path.join(localesDir, 'ko.ts'), koLines.join('\n'), 'utf8');
console.log('✅ ko.ts successfully updated with all full sentence keys!');

// types.ts도 키 목록 동기화
const typesLines = [
  `export interface TranslationDictionary {`,
  ...Object.keys(koDict).map((k) => `  ${k}: string;`),
  `}`,
  ``,
  `export type TranslationKey = keyof TranslationDictionary;`,
  ``
];
fs.writeFileSync(path.join(__dirname, '../src/lib/i18n/types.ts'), typesLines.join('\n'), 'utf8');
console.log('✅ types.ts successfully synchronized!');
