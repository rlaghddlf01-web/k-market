const fs = require('fs');
const path = require('path');

const MASS_DICTIONARY_ADDITIONS = {
  // 카테고리
  cat_all: { ko: '전체보기', vi: 'Tất cả', zh: '全部', en: 'All Items' },
  cat_appliances: { ko: '원룸 가전', vi: 'Đồ điện gia dụng', zh: '家电电器', en: 'Appliances' },
  cat_furniture: { ko: '생활 가구', vi: 'Nội thất gia đình', zh: '家具家居', en: 'Furniture' },
  cat_digital: { ko: '스마트폰/IT', vi: 'Điện thoại / IT', zh: '手机数码', en: 'Digital & Phone' },
  cat_mobility: { ko: '자전거/킥보드', vi: 'Xe đạp / Xe điện', zh: '自行车/滑板车', en: 'Bicycle & Scooter' },
  cat_clothing: { ko: '의류/잡화', vi: 'Quần áo / Thời trang', zh: '服装杂货', en: 'Clothing' },
  cat_work_supplies: { ko: '작업용품', vi: 'Đồ bảo hộ / Dụng cụ', zh: '劳保作业用品', en: 'Work Supplies' },
  cat_moving_bundle: { ko: '귀국 무빙 묶음', vi: 'Trọn gói thanh lý về nước', zh: '归国清仓大礼包', en: 'Moving Bundle' },
  cat_free_share: { ko: '무료나눔 0원', vi: 'Tặng miễn phí 0đ', zh: '免费赠送 0元', en: 'Free Giveaway' },

  // 피드 및 메인 정렬
  feed_recent: { ko: '최신 등록순', vi: 'Mới nhất', zh: '最新发布', en: 'Latest' },
  feed_moving_first: { ko: '무빙세일 우선', vi: 'Ưu tiên đồ về nước', zh: '归国甩卖优先', en: 'Moving Sale First' },
  feed_price_asc: { ko: '낮은 가격순', vi: 'Giá thấp nhất', zh: '价格从低到高', en: 'Price: Low to High' },
  feed_empty_title: { ko: '등록된 매물이 없습니다', vi: 'Chưa có sản phẩm nào', zh: '暂无相关商品', en: 'No items found' },
  feed_empty_desc: { ko: '첫 번째 매물을 등록하거나 다른 공단 지역을 선택해보세요!', vi: 'Hãy là người đầu tiên đăng bán hoặc chọn khu công nghiệp khác!', zh: '快来发布第一件闲置，或切换其他工业园区查看吧！', en: 'Be the first to post an item or try selecting another region!' },

  // 세부 모달 공통
  modal_close: { ko: '닫기', vi: 'Đóng', zh: '关闭', en: 'Close' },
  modal_confirm: { ko: '확인', vi: 'Xác nhận', zh: '确定', en: 'Confirm' },
  modal_cancel: { ko: '취소', vi: 'Hủy', zh: '取消', en: 'Cancel' },
  manner_temp_unit: { ko: '℃ 매너온도', vi: '℃ Điểm uy tín', zh: '℃ 信用温度', en: '℃ Trust Score' },
  verified_worker_badge: { ko: '신원 인증된 외국인 근로자', vi: 'Lao động đã xác minh', zh: '已实名认证外籍劳工', en: 'Verified Worker' },
  moving_d_day_badge: { ko: '귀국 D-', vi: 'Về nước D-', zh: '回国倒计时 D-', en: 'D-Day ' },
  moving_d_day_tail: { ko: '일 정리', vi: ' ngày', zh: '天清仓', en: ' days' },
};

// 1. types.ts 확장
const typesPath = path.join(__dirname, '..', 'src', 'lib', 'i18n', 'types.ts');
let typesContent = fs.readFileSync(typesPath, 'utf8');
for (const key of Object.keys(MASS_DICTIONARY_ADDITIONS)) {
  if (!typesContent.includes(`  ${key}: string;`)) {
    typesContent = typesContent.replace('export interface TranslationDictionary {', `export interface TranslationDictionary {\n  ${key}: string;`);
  }
}
fs.writeFileSync(typesPath, typesContent, 'utf8');

// 2. 17개 언어 파일 전수 확장
const localesDir = path.join(__dirname, '..', 'src', 'lib', 'i18n', 'locales');
const ALL_LANGS = ['ko', 'vi', 'zh', 'en', 'ja', 'ru', 'th', 'uz', 'km', 'mn', 'ne', 'id', 'my', 'si', 'kk', 'bn', 'ur', 'tl'];

for (const lang of ALL_LANGS) {
  const filePath = path.join(localesDir, `${lang}.ts`);
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');

  for (const [key, transObj] of Object.entries(MASS_DICTIONARY_ADDITIONS)) {
    if (!content.includes(`  ${key}:`)) {
      const val = transObj[lang] || transObj.en || transObj.ko;
      content = content.replace(`export const ${lang}: TranslationDictionary = {`, `export const ${lang}: TranslationDictionary = {\n  ${key}: ${JSON.stringify(val)},`);
    }
  }
  fs.writeFileSync(filePath, content, 'utf8');
}

console.log('✅ 전수 다국어 마스터 키 확장 및 17개국 사전 등록 완료!');
