const fs = require('fs');
const path = require('path');

const NEW_LOCATION_KEYS_KO = {
  loc_modal_badge: '실시간 GPS 동네 인증',
  loc_modal_title: '내 실제 위치 & 직거래 반경',
  loc_gps_auth_title: '현재 내 실제 위치 인증',
  loc_gps_precision: 'GPS 정밀 탐색 🛰️',
  loc_gps_btn_finding: '내 GPS 위치 찾는 중...',
  loc_gps_btn_auto: '📍 현재 내 GPS 위치로 1초 자동 설정',
  loc_base_location_label: '기준 위치:',
  loc_manual_search_label: '또는 도로명 주소 / 기숙사명 직접 검색',
  loc_search_placeholder: '예: 경기 평택시 포승읍 원정리, 안산 원곡동 840',
  loc_search_btn: '검색',
  loc_radius_setting_title: '내 위치 기준 거래 반경 설정',
  loc_radius_current_badge: '내 위치 반경',
  loc_radius_1km_title: '1km 이내',
  loc_radius_1km_desc: '걸어서 10분 🚶‍♂️',
  loc_radius_3km_title: '3km 이내',
  loc_radius_3km_desc: '자전거 10분 🚲',
  loc_radius_10km_title: '10km 이내',
  loc_radius_10km_desc: '내 주변 10km 인근 🚗',
  loc_radius_desc_hint: '자전거, 전동킥보드로 10분 내 왕복 가능한 실속 반경 매물을 봅니다.',
  loc_map_title: '내 위치 중심 실시간 지도',
  loc_map_zoom_badge: '중간 맵',
  loc_save_btn: '내 실제 위치 기준 반경 설정 완료',
  loc_saved_alert: '✅ 위치 설정이 완료되었습니다! 선택한 반경 내의 직거래 매물이 우선 표시됩니다.',
};

const NEW_LOCATION_KEYS_VI = {
  loc_modal_badge: 'Xác thực GPS khu vực thời gian thực',
  loc_modal_title: 'Vị trí thực tế & Bán kính giao dịch',
  loc_gps_auth_title: 'Xác thực vị trí thực tế của tôi',
  loc_gps_precision: 'Dò GPS chính xác 🛰️',
  loc_gps_btn_finding: 'Đang tìm vị trí GPS của bạn...',
  loc_gps_btn_auto: '📍 Tự động đặt vị trí GPS của tôi trong 1 giây',
  loc_base_location_label: 'Vị trí chuẩn:',
  loc_manual_search_label: 'Hoặc tự tìm theo địa chỉ / tên KTX',
  loc_search_placeholder: 'VD: Poseung-eup Pyeongtaek, Wongok-dong Ansan',
  loc_search_btn: 'Tìm kiếm',
  loc_radius_setting_title: 'Cài đặt bán kính giao dịch quanh tôi',
  loc_radius_current_badge: 'Bán kính quanh tôi',
  loc_radius_1km_title: 'Trong 1km',
  loc_radius_1km_desc: 'Đi bộ 10 phút 🚶‍♂️',
  loc_radius_3km_title: 'Trong 3km',
  loc_radius_3km_desc: 'Đi xe đạp 10 phút 🚲',
  loc_radius_10km_title: 'Trong 10km',
  loc_radius_10km_desc: 'Khu vực lân cận 10km 🚗',
  loc_radius_desc_hint: 'Xem các món đồ có thể đi xe đạp, xe điện trong vòng 10 phút.',
  loc_map_title: 'Bản đồ trực tiếp quanh vị trí của tôi',
  loc_map_zoom_badge: 'Bản đồ chuẩn',
  loc_save_btn: 'Xác nhận cài đặt bán kính quanh tôi',
  loc_saved_alert: '✅ Đã cài đặt vị trí thành công! Các món đồ trong bán kính đã chọn sẽ được ưu tiên hiển thị.',
};

const NEW_LOCATION_KEYS_ZH = {
  loc_modal_badge: '实时 GPS 同城认证',
  loc_modal_title: '我的实际位置 & 面交辐射半径',
  loc_gps_auth_title: '认证我的当前实际位置',
  loc_gps_precision: 'GPS 精准探测 🛰️',
  loc_gps_btn_finding: '正在获取您的 GPS 位置...',
  loc_gps_btn_auto: '📍 1秒自动获取我的当前 GPS 位置',
  loc_base_location_label: '基准位置:',
  loc_manual_search_label: '或手动输入道路名/宿舍名搜索',
  loc_search_placeholder: '例: 平泽市浦升邑, 安山市元谷洞',
  loc_search_btn: '搜索',
  loc_radius_setting_title: '设置以我为中心的交易半径',
  loc_radius_current_badge: '当前辐射半径',
  loc_radius_1km_title: '1公里内',
  loc_radius_1km_desc: '步行10分钟 🚶‍♂️',
  loc_radius_3km_title: '3公里内',
  loc_radius_3km_desc: '骑自行车10分钟 🚲',
  loc_radius_10km_title: '10公里内',
  loc_radius_10km_desc: '周边10公里范围 🚗',
  loc_radius_desc_hint: '优先浏览骑车或电动滑板车10分钟内可往返的优质闲置。',
  loc_map_title: '以我为中心的实时地图',
  loc_map_zoom_badge: '标准视图',
  loc_save_btn: '确认以当前位置和半径完成设置',
  loc_saved_alert: '✅ 位置设置成功！将优先为您展示该半径内的当面交易商品。',
};

const NEW_LOCATION_KEYS_EN = {
  loc_modal_badge: 'Real-time GPS Local Verification',
  loc_modal_title: 'My Location & Direct Trade Radius',
  loc_gps_auth_title: 'Verify My Current Location',
  loc_gps_precision: 'GPS Precision 🛰️',
  loc_gps_btn_finding: 'Finding your GPS location...',
  loc_gps_btn_auto: '📍 Auto-set with My GPS in 1 Sec',
  loc_base_location_label: 'Base Location:',
  loc_manual_search_label: 'Or search by street address / dormitory name',
  loc_search_placeholder: 'e.g. Poseung-eup Pyeongtaek, Wongok-dong Ansan',
  loc_search_btn: 'Search',
  loc_radius_setting_title: 'Set Direct Trade Radius',
  loc_radius_current_badge: 'Radius',
  loc_radius_1km_title: 'Within 1km',
  loc_radius_1km_desc: '10-min walk 🚶‍♂️',
  loc_radius_3km_title: 'Within 3km',
  loc_radius_3km_desc: '10-min bike ride 🚲',
  loc_radius_10km_title: 'Within 10km',
  loc_radius_10km_desc: 'Within 10km area 🚗',
  loc_radius_desc_hint: 'View practical listings within a 10-minute bike or scooter ride.',
  loc_map_title: 'Live Map Around My Location',
  loc_map_zoom_badge: 'Standard Map',
  loc_save_btn: 'Confirm Location & Radius Settings',
  loc_saved_alert: '✅ Location settings saved! Items within the selected radius will be prioritized.',
};

// 1. types.ts 갱신
const typesFilePath = path.join(__dirname, '..', 'src', 'lib', 'i18n', 'types.ts');
let typesContent = fs.readFileSync(typesFilePath, 'utf8');
for (const key of Object.keys(NEW_LOCATION_KEYS_KO)) {
  if (!typesContent.includes(`  ${key}: string;`)) {
    typesContent = typesContent.replace('export interface TranslationDictionary {', `export interface TranslationDictionary {\n  ${key}: string;`);
  }
}
fs.writeFileSync(typesFilePath, typesContent, 'utf8');

// 2. ko.ts 갱신
const localesDir = path.join(__dirname, '..', 'src', 'lib', 'i18n', 'locales');
const koFilePath = path.join(localesDir, 'ko.ts');
let koContent = fs.readFileSync(koFilePath, 'utf8');
for (const [k, v] of Object.entries(NEW_LOCATION_KEYS_KO)) {
  if (!koContent.includes(`  ${k}:`)) {
    koContent = koContent.replace('export const ko: TranslationDictionary = {', `export const ko: TranslationDictionary = {\n  ${k}: ${JSON.stringify(v)},`);
  }
}
fs.writeFileSync(koFilePath, koContent, 'utf8');

// 3. 16개 언어 갱신
const ALL_LANGS = ['vi', 'zh', 'en', 'ja', 'ru', 'th', 'uz', 'km', 'mn', 'ne', 'id', 'my', 'si', 'kk', 'bn', 'ur', 'tl'];
for (const lang of ALL_LANGS) {
  const filePath = path.join(localesDir, `${lang}.ts`);
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');
  const specificMap = lang === 'vi' ? NEW_LOCATION_KEYS_VI : (lang === 'zh' ? NEW_LOCATION_KEYS_ZH : NEW_LOCATION_KEYS_EN);
  for (const [k, v] of Object.entries(NEW_LOCATION_KEYS_KO)) {
    if (!content.includes(`  ${k}:`)) {
      const val = specificMap[k] || NEW_LOCATION_KEYS_EN[k] || v;
      content = content.replace(`export const ${lang}: TranslationDictionary = {`, `export const ${lang}: TranslationDictionary = {\n  ${k}: ${JSON.stringify(val)},`);
    }
  }
  fs.writeFileSync(filePath, content, 'utf8');
}

console.log('✅ 위치 인증 모달 23개 신규 다국어 키 17개 전 언어 사전 등록 완료!');
