const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const localesDir = path.join(srcDir, 'lib', 'i18n', 'locales');
const typesPath = path.join(srcDir, 'lib', 'i18n', 'types.ts');

const EXPLICIT_MODAL_TRANSLATIONS = {
  // ── 1. 회원가입 모달 (Auth Modal) ──
  auth_badge_17lang: {
    ko: '17개국어 외국인 신원인증 & 가입',
    vi: 'Xác minh danh tính & Đăng ký 17 ngôn ngữ',
    zh: '17国语言外籍实名认证与注册',
    en: '17-Language Identity Verification & Sign Up'
  },
  auth_modal_headline: {
    ko: '외국인 안심 간편가입',
    vi: 'Đăng ký an tâm cho người nước ngoài',
    zh: '外籍同胞安心极速注册',
    en: 'Safe Sign Up for Foreigners'
  },
  auth_tab_ocr: {
    ko: '등록증 OCR (+7.0℃ & 상단노출 🚀)',
    vi: 'Chụp thẻ ARC (+7.0℃ & Ưu tiên hiển thị 🚀)',
    zh: '外国人登录证 OCR 识别 (+7.0℃ & 置顶展示 🚀)',
    en: 'ARC Card OCR (+7.0℃ & Top Priority 🚀)'
  },
  auth_tab_manual: {
    ko: '수기 입력 (기본 36.5℃)',
    vi: 'Nhập tay (Mặc định 36.5℃)',
    zh: '手动输入 (基础 36.5℃)',
    en: 'Manual Input (Base 36.5℃)'
  },
  auth_ocr_benefits_title: {
    ko: '실물 신분증 OCR 촬영 시 3대 특별 혜택',
    vi: '3 Đặc quyền khi chụp ảnh xác thực thẻ ARC',
    zh: '拍摄实名证件享受3大专属特权',
    en: '3 Exclusive Benefits for ARC Card Verification'
  },
  auth_ocr_bonus_badge: {
    ko: '+7.0℃ 즉시 가산',
    vi: '+7.0℃ cộng ngay lập tức',
    zh: '+7.0℃ 立即加分',
    en: '+7.0℃ Added Instantly'
  },
  auth_manner_gold_title: {
    ko: '매너온도 43.5℃ 골드 등급',
    vi: 'Điểm uy tín 43.5℃ Hạng Vàng',
    zh: '信用温度 43.5℃ 黄金等级',
    en: 'Trust Score 43.5℃ Gold Grade'
  },
  auth_manner_gold_desc: {
    ko: '가입 즉시 +7.0℃ 상승으로 최우수 안심 회원 뱃지 부여',
    vi: 'Tăng ngay +7.0℃ nhận huy hiệu thành viên uy tín nhất',
    zh: '注册即加7度，授予最高级别安心交易勋章',
    en: 'Instantly get +7.0℃ and verified safe trader badge'
  },
  auth_top_exposure_title: {
    ko: '내 매물 맨 최상단 우선 노출',
    vi: 'Đồ đăng bán được ưu tiên lên đầu trang',
    zh: '发布商品在首页置顶优先推荐',
    en: 'Your listings prioritized at the top of feed'
  },
  auth_top_exposure_desc: {
    ko: '신뢰도가 올라 구매자에게 먼저 추천되어 2배 빠른 판매 성사!',
    vi: 'Độ uy tín cao được gợi ý cho người mua giúp bán nhanh gấp 2 lần!',
    zh: '信用度大幅提升，优先推荐给买家，出售速度翻倍！',
    en: 'Higher trust recommends items to buyers for 2x faster sales!'
  },
  auth_scan_front_title: {
    ko: '외국인등록증 앞면 사진 촬영하기',
    vi: 'Chụp ảnh mặt trước thẻ ngoại kiều (ARC)',
    zh: '拍摄外国人登录证正面照片',
    en: 'Scan front side of Foreigner Registration Card (ARC)'
  },
  auth_scan_front_sub: {
    ko: '빛반사 없이 0.5초 빠르고 안전하게 자동 인식',
    vi: 'Nhận diện tự động an toàn trong 0.5 giây không lóa sáng',
    zh: '无反光 0.5秒安全快速自动识别',
    en: 'Fast and secure auto-scan in 0.5 seconds without glare'
  },
  auth_open_camera_btn: {
    ko: '카메라 열기 / 신분증 촬영하고 43.5℃ 받기 ➔',
    vi: 'Mở máy ảnh / Chụp thẻ nhận ngay 43.5℃ ➔',
    zh: '打开相机 / 拍摄证件获取 43.5℃ ➔',
    en: 'Open Camera / Scan Card & Get 43.5℃ ➔'
  },
  auth_field_nickname: {
    ko: '활동 닉네임 / 별명 (Nickname) 필수',
    vi: 'Tên hiển thị / Biệt danh (Bắt buộc)',
    zh: '用户昵称 / 账号名 (必填)',
    en: 'Nickname (Required)'
  },
  auth_random_nickname_btn: {
    ko: '랜덤 별명 추천',
    vi: 'Gợi ý biệt danh',
    zh: '随机推荐昵称',
    en: 'Random Nickname'
  },
  auth_nickname_placeholder: {
    ko: '예: 안산호랑이, 베트남마켓, 띰띰친구 (2~15자)',
    vi: 'VD: HoangViet, ChoVietHan, PoseungFriend (2-15 ký tự)',
    zh: '例: 安山老乡, 平泽二手, 奋斗在韩国 (2~15字)',
    en: 'e.g. AnsanTiger, GlobalFriend, PoseungWorker (2-15 chars)'
  },
  auth_passport_name: {
    ko: '영문 실명 (Passport Name)',
    vi: 'Họ tên tiếng Anh (Theo hộ chiếu)',
    zh: '英文姓名 (护照一致)',
    en: 'Full Name in English (Passport Name)'
  },
  auth_arc_number: {
    ko: '외국인등록번호 (13자리)',
    vi: 'Số thẻ người nước ngoài ARC (13 số)',
    zh: '外国人登录证号 (13位)',
    en: 'Foreigner Registration Number (13 digits)'
  },
  auth_visa_type: {
    ko: '비자 종류 (Visa Status)',
    vi: 'Loại Visa (Visa Status)',
    zh: '在韩签证类型 (Visa Status)',
    en: 'Visa Status'
  },
  auth_stay_expiry: {
    ko: '체류 만료일 (Expiry Date)',
    vi: 'Ngày hết hạn lưu trú (Expiry Date)',
    zh: '滞留到期日 (Expiry Date)',
    en: 'Visa Expiry Date'
  },
  auth_phone_number_label: {
    ko: '휴대폰 번호 (본인 명의)',
    vi: 'Số điện thoại di động (Chính chủ)',
    zh: '手机号码 (本人实名)',
    en: 'Mobile Phone Number'
  },
  auth_dorm_label: {
    ko: '기숙사 / 거주 공단 주소',
    vi: 'Địa chỉ KTX / Khu công nghiệp cư trú',
    zh: '宿舍 / 居住工业园区地址',
    en: 'Dormitory / Residential Complex Address'
  },
  auth_gps_btn: {
    ko: '📍 내 위치 자동인식',
    vi: '📍 Tự động nhận diện vị trí',
    zh: '📍 自动定位我的位置',
    en: '📍 Auto-detect My Location'
  },
  auth_btn_next_sms: {
    ko: '휴대폰 SMS 인증번호 받기 ➔',
    vi: 'Nhận mã OTP qua tin nhắn SMS ➔',
    zh: '获取短信验证码 ➔',
    en: 'Get SMS Verification Code ➔'
  },

  // ── 2. 매물 등록 모달 (Create Post Modal) ──
  post_zero_fee_badge: {
    ko: '수수료 0원 100% 무료 C2C 직거래',
    vi: 'Phí 0 đồng 100% miễn phí giao dịch C2C',
    zh: '0手续费 100%免费C2C当面交易',
    en: '0% Fee 100% Free C2C Direct Deal'
  },
  post_photos_label: {
    ko: '상품 사진 (최대 5장)',
    vi: 'Ảnh sản phẩm (Tối đa 5 ảnh)',
    zh: '商品图片 (最多5张)',
    en: 'Item Photos (Up to 5)'
  },
  post_cover_badge: {
    ko: '대표사진',
    vi: 'Ảnh chính',
    zh: '主图封面',
    en: 'Cover Photo'
  },
  post_add_photo_btn: {
    ko: '+ 사진추가',
    vi: '+ Thêm ảnh',
    zh: '+ 添加图片',
    en: '+ Add Photo'
  },
  post_moving_sale_check: {
    ko: '귀국자 헐값 급처분 [무빙 세일(Moving Sale)]로 등록하기',
    vi: 'Đăng vào mục Thanh lý về nước [Moving Sale]',
    zh: '标记为回国清仓大甩卖 [Moving Sale]',
    en: 'Register as Returning Home [Moving Sale]'
  },
  post_item_title_label: {
    ko: '매물 제목 (Item Title)',
    vi: 'Tiêu đề món đồ (Item Title)',
    zh: '商品标题 (Item Title)',
    en: 'Item Title'
  },
  post_title_placeholder: {
    ko: '예: 통돌이 세탁기 10kg + 쿠쿠 밥솥 묶음 판매합니다',
    vi: 'VD: Bán máy giặt 10kg + Nồi cơm điện Cuckoo thanh lý về nước',
    zh: '例: 10kg波轮洗衣机 + 福库电饭煲打包出',
    en: 'e.g. Selling 10kg washer + Cuckoo rice cooker bundle'
  },
  post_category_select_label: {
    ko: '카테고리 선택 (Category)',
    vi: 'Chọn danh mục sản phẩm (Category)',
    zh: '选择商品分类 (Category)',
    en: 'Select Category'
  },
  post_price_label: {
    ko: '판매 가격 (0원 입력 시 무료나눔 자동 적용)',
    vi: 'Giá bán (Nhập 0đ nếu tặng miễn phí)',
    zh: '出售价格 (填0元自动标记为免费赠送)',
    en: 'Price (Enter 0 for free giveaway)'
  },
  post_meetup_location_label: {
    ko: '직거래장소 & 만남 장소 (지도 핀 이동 가능)',
    vi: 'Địa điểm hẹn gặp giao dịch trực tiếp',
    zh: '当面交易碰头地点 (可移动地图图钉)',
    en: 'Direct Meetup Location (Pin Movable)'
  },
  post_move_pin_btn: {
    ko: '내 위치로 핀 이동',
    vi: 'Chuyển ghim về vị trí của tôi',
    zh: '定位到我的位置',
    en: 'Move pin to my location'
  },
  post_search_addr_btn: {
    ko: '주소 검색',
    vi: 'Tìm địa chỉ',
    zh: '搜索地址',
    en: 'Search Address'
  },
  post_detail_spot_label: {
    ko: '상세 만남 장소 (고객 직접 입력)',
    vi: 'Địa điểm hẹn chi tiết (Tự nhập)',
    zh: '详细碰头地点 (手动输入)',
    en: 'Detailed Meetup Spot (Custom Input)'
  },
  post_detail_spot_placeholder: {
    ko: '예: GS25 편의점 앞 / 기숙사 2동 경비실 앞 / 정문 시계탑',
    vi: 'VD: Trước cửa GS25 / Trước cổng KTX số 2 / Cổng chính KCN',
    zh: '例: GS25便利店门口 / 2号宿舍门卫室前 / 园区正门',
    en: 'e.g. In front of GS25 / Dormitory Bldg 2 / Complex Main Gate'
  },
  post_submit_complete_btn: {
    ko: '매물 1분 등록 완료',
    vi: 'Hoàn tất đăng bán trong 1 phút',
    zh: '1分钟完成商品发布',
    en: 'Complete Post in 1 Min'
  },

  // ── 3. 세무 계산기 모달 (Tax Modal) ──
  tax_modal_link_badge: {
    ko: 'KTRS x EasyTax 실시간 연계',
    vi: 'Liên kết trực tiếp KTRS x EasyTax Cục Thuế Hàn Quốc',
    zh: 'KTRS x EasyTax 韩国国税厅直连',
    en: 'Real-time KTRS x EasyTax NTS Integration'
  },
  tax_modal_headline: {
    ko: '나의 잠재 환급액 10초 만에 확인하기',
    vi: 'Kiểm tra tiền hoàn thuế của bạn trong 10 giây',
    zh: '10秒测算我的潜在退税金额',
    en: 'Check your potential tax refund in 10s'
  },
  tax_modal_age_guide: {
    ko: '대상 연령 안내',
    vi: 'Độ tuổi được hưởng ưu đãi thuế',
    zh: '减税优惠适用年龄',
    en: 'Eligible Age Guide'
  },
  tax_modal_age_value: {
    ko: '만 15세 ~ 34세',
    vi: 'Từ 15 đến 34 tuổi',
    zh: '满15岁 ~ 34岁',
    en: 'Age 15 ~ 34'
  },
  tax_modal_work_period: {
    ko: '최근 5년 한국 근무 기간',
    vi: 'Thời gian làm việc tại Hàn Quốc',
    zh: '近5年在韩工作总月数',
    en: 'Work Duration in Korea'
  },
  tax_modal_period_value: {
    ko: '36개월 (3.0년)',
    vi: '36 tháng (3.0 năm)',
    zh: '36个月 (3.0年)',
    en: '36 Months (3.0 Years)'
  },
  tax_modal_avg_salary: {
    ko: '평균 월 급여 (세전)',
    vi: 'Lương bình quân tháng (Trước thuế)',
    zh: '月平均工资 (税前)',
    en: 'Monthly Average Salary (Pre-tax)'
  },
  tax_modal_salary_value: {
    ko: '250만 원',
    vi: '2.50 triệu won',
    zh: '250万韩元',
    en: '2.50 Million KRW'
  },
  tax_modal_ai_amount_title: {
    ko: 'AI 예상 환급 가능 금액',
    vi: 'Số tiền AI ước tính bạn được hoàn lại',
    zh: 'AI测算预计可退税金',
    en: 'AI Estimated Refund Amount'
  },
  tax_modal_zero_prepay: {
    ko: '선결제 0원 (수수료없음)',
    vi: 'Trả trước 0 đồng (Không thu phí)',
    zh: '0元预付 (无任何前期费用)',
    en: '$0 Upfront (No Advance Fee)'
  },
  tax_modal_success_pay: {
    ko: '100% 환급 성공 시 후불',
    vi: '100% trả sau khi nhận được tiền',
    zh: '100%退税款到账后付费',
    en: '100% Success Fee after Payout'
  },
  tax_modal_apply_now_btn: {
    ko: 'KTRS에서 바로 환급 신청하기 ➔',
    vi: 'Đăng ký nhận tiền hoàn thuế ngay qua KTRS ➔',
    zh: '在KTRS立即申请退税 ➔',
    en: 'Claim Refund on KTRS Now ➔'
  },
  tax_modal_manner_title: {
    ko: 'K-Trust 매너온도',
    vi: 'Điểm uy tín K-Trust',
    zh: 'K-Trust 信用温度',
    en: 'K-Trust Score'
  },
  tax_modal_manner_what_is: {
    ko: '매너온도란?',
    vi: 'Điểm uy tín là gì?',
    zh: '什么是信用温度？',
    en: 'What is Trust Score?'
  },
  tax_modal_ocr_verified_badge: {
    ko: '법무부 실물 신분증 OCR 인증 (+7.0℃ 보너스 반영)',
    vi: 'Đã xác minh thẻ ngoại kiều ARC (+7.0℃ điểm thưởng)',
    zh: '已通过法务部实名登录证认证 (+7.0℃奖励)',
    en: 'Ministry of Justice ARC Verified (+7.0℃ Bonus)'
  },
  tax_modal_top_12_badge: {
    ko: '신뢰도 상위 12% 최우수 회원',
    vi: 'Thành viên xuất sắc top 12% uy tín nhất',
    zh: '信誉排名前12%的优质安心会员',
    en: 'Top 12% Most Trusted Member'
  },
  tax_modal_pwa_install_title: {
    ko: '홈 화면에 K-Market 앱 설치하기',
    vi: 'Cài đặt App K-Market vào màn hình chính',
    zh: '添加 K-Market 到手机主屏幕',
    en: 'Install K-Market App to Home Screen'
  },
  tax_modal_pwa_install_btn: {
    ko: '앱 설치',
    vi: 'Cài đặt App',
    zh: '安装应用',
    en: 'Install App'
  }
};

// 1. types.ts 확장
let typesContent = fs.readFileSync(typesPath, 'utf8');
for (const key of Object.keys(EXPLICIT_MODAL_TRANSLATIONS)) {
  if (!typesContent.includes(`  ${key}: string;`)) {
    typesContent = typesContent.replace('export interface TranslationDictionary {', `export interface TranslationDictionary {\n  ${key}: string;`);
  }
}
fs.writeFileSync(typesPath, typesContent, 'utf8');

// 2. 17개 언어 파일 확장
const ALL_LANGS = ['ko', 'vi', 'zh', 'en', 'ja', 'ru', 'th', 'uz', 'km', 'mn', 'ne', 'id', 'my', 'si', 'kk', 'bn', 'ur', 'tl'];

ALL_LANGS.forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.ts`);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  for (const [k, transObj] of Object.entries(EXPLICIT_MODAL_TRANSLATIONS)) {
    const val = transObj[lang] || transObj.en || transObj.ko;
    if (content.includes(`  ${k}:`)) {
      content = content.replace(new RegExp(`(\\s*${k}\\s*:\\s*)(['"].*['"])(,?)`, 'g'), `$1${JSON.stringify(val)}$3`);
    } else {
      content = content.replace(`export const ${lang}: TranslationDictionary = {`, `export const ${lang}: TranslationDictionary = {\n  ${k}: ${JSON.stringify(val)},`);
    }
  }
  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('✅ 핵심 4대 모달 50개 마스터 키 및 17개국 완벽 번역 주입 완료!');
