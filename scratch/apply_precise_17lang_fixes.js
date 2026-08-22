const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');

// 1. KMarketCreatePost.tsx 수정
const createPostPath = path.join(srcDir, 'components', 'kmarket', 'KMarketCreatePost.tsx');
let createPostContent = fs.readFileSync(createPostPath, 'utf8');

createPostContent = createPostContent.replace(
  /📷 상품 사진 \(\{images\.length\}\/5장\)/g,
  `📷 {t('create_photos_label')} ({images.length}/5)`
);

createPostContent = createPostContent.replace(
  /<span className="absolute bottom-0 inset-x-0 bg-blue-600 text-white text-\[9px\] font-bold text-center py-0\.5">\s*대표사진\s*<\/span>/g,
  `<span className="absolute bottom-0 inset-x-0 bg-blue-600 text-white text-[9px] font-bold text-center py-0.5">{t('create_main_photo_badge')}</span>`
);

createPostContent = createPostContent.replace(
  /💡 빠른 테스트용 추천 사진 클릭:/g,
  `💡 {t('create_sample_photos_hint')}`
);

createPostContent = createPostContent.replace(
  /귀국 예정 D-Day 선택 \(남은 기간에 따라 긴박감 뱃지 자동 부착\)/g,
  `{t('create_moving_dday_title')}`
);

createPostContent = createPostContent.replace(
  /원래 구입 가격 \/ 정가 \(할인율 뱃지 표시용\)/g,
  `{t('create_orig_price_title')}`
);

createPostContent = createPostContent.replace(
  /<span className="absolute right-4 top-2\.5 text-xs font-bold text-slate-400">\s*원 \(KRW\)\s*<\/span>/g,
  `<span className="absolute right-4 top-2.5 text-xs font-bold text-slate-400">{t('currency_krw')}</span>`
);

createPostContent = createPostContent.replace(
  /판매자 국가 \(Country\)/g,
  `{t('create_seller_country_label')}`
);

createPostContent = createPostContent.replace(
  /판매자 닉네임/g,
  `{t('create_seller_name_label')}`
);

createPostContent = createPostContent.replace(
  /상세 설명 \(Description\)/g,
  `{t('create_desc_header')}`
);

fs.writeFileSync(createPostPath, createPostContent, 'utf8');
console.log('✅ Updated KMarketCreatePost.tsx');

// 2. KMarketItemDetail.tsx 수정
const itemDetailPath = path.join(srcDir, 'components', 'kmarket', 'KMarketItemDetail.tsx');
let itemDetailContent = fs.readFileSync(itemDetailPath, 'utf8');

itemDetailContent = itemDetailContent.replace(
  /비자인증됨/g,
  `{t('auth_verified_badge')}`
);

itemDetailContent = itemDetailContent.replace(
  /상태변경 \/ 끌올/g,
  `{t('btn_change_status_boost')}`
);

itemDetailContent = itemDetailContent.replace(
  /상세 설명 \(Item Description\)/g,
  `{t('create_desc_header')}`
);

fs.writeFileSync(itemDetailPath, itemDetailContent, 'utf8');
console.log('✅ Updated KMarketItemDetail.tsx');

// 3. KMarketCommunityMain.tsx 수정
const commMainPath = path.join(srcDir, 'components', 'community', 'KMarketCommunityMain.tsx');
let commMainContent = fs.readFileSync(commMainPath, 'utf8');

commMainContent = commMainContent.replace(
  /<button\s+onClick=\{\(\) => setSelectedCategory\('all'\)\}[^>]*>\s*전체 보기\s*<\/button>/g,
  (m) => m.replace('전체 보기', `{t('comm_tab_all')}`)
);

commMainContent = commMainContent.replace(
  /<span>\{cat\.labelKo\}<\/span>/g,
  `<span>{t(\`comm_cat_\${cat.id}\`)}</span>`
);

fs.writeFileSync(commMainPath, commMainContent, 'utf8');
console.log('✅ Updated KMarketCommunityMain.tsx');
