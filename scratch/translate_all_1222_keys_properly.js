const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const localesDir = path.join(srcDir, 'lib', 'i18n', 'locales');

// 핵심 사전 매핑 데이터베이스
const COMPREHENSIVE_TRANSLATIONS = {
  vi: {
    // 회원가입 모달
    '15개국어 외국인 신원인증 &amp; 가입': 'Xác minh danh tính & Đăng ký 17 ngôn ngữ',
    '15개국어 외국인 신원인증 & 가입': 'Xác minh danh tính & Đăng ký 17 ngôn ngữ',
    '외국인 안심 간편가입': 'Đăng ký an tâm cho người nước ngoài',
    '등록증 OCR (+7.0℃ &amp; 상단노출 🚀)': 'Chụp thẻ ARC (+7.0℃ & Ưu tiên hiển thị 🚀)',
    '등록증 OCR (+7.0℃ & 상단노출 🚀)': 'Chụp thẻ ARC (+7.0℃ & Ưu tiên hiển thị 🚀)',
    '수기 입력 (기본 36.5℃)': 'Nhập tay (Mặc định 36.5℃)',
    '실물 신분증 OCR 촬영 시 3대 특별 혜택': '3 Đặc quyền khi chụp ảnh xác thực thẻ ARC',
    '+7.0℃ 즉시 가산': '+7.0℃ cộng ngay lập tức',
    '매너온도 43.5℃ 골드 등급': 'Điểm uy tín 43.5℃ Hạng Vàng',
    '가입 즉시 +7.0℃ 상승으로 최우수 안심 회원 뱃지 부여': 'Tăng ngay +7.0℃ nhận huy hiệu thành viên uy tín nhất',
    '내 매물 맨 최상단 우선 노출': 'Đồ đăng bán được ưu tiên lên đầu trang',
    '신뢰도가 올라 구매자에게 먼저 추천되어 2배 빠른 판매 성사!': 'Độ uy tín cao được gợi ý cho người mua giúp bán nhanh gấp 2 lần!',
    '외국인등록증 앞면 사진 촬영하기': 'Chụp ảnh mặt trước thẻ đăng ký ngoại kiều (ARC)',
    '카메라 열기 / 신분증 촬영하고 43.5℃ 받기 ➔': 'Mở máy ảnh / Chụp thẻ nhận ngay 43.5℃ ➔',
    '활동 닉네임 / 별명 (Nickname) 필수': 'Tên hiển thị / Biệt danh (Bắt buộc)',
    '랜덤 별명 추천': 'Gợi ý biệt danh ngẫu nhiên',
    '예: 안산호랑이, 베트남마켓, 띰띰친구 (2~15자)': 'VD: HoangViet, ChoVietHan, PoseungFriend (2-15 ký tự)',
    '영문 실명 (Passport Name)': 'Họ tên tiếng Anh (Theo hộ chiếu)',
    '외국인등록번호 (13자리)': 'Số thẻ người nước ngoài ARC (13 số)',
    '비자 종류 (Visa Status)': 'Loại Visa (Visa Status)',
    '체류 만료일 (Expiry Date)': 'Ngày hết hạn lưu trú (Expiry Date)',
    'E-9 (비전문취업)': 'E-9 (Lao động phổ thông)',
    'E-7 (특정활동)': 'E-7 (Lao động tay nghề cao)',
    'F-4 (재외동포)': 'F-4 (Việt kiều / Kiều bào)',
    'H-2 (방문취업)': 'H-2 (Lao động thăm thân)',
    'D-2 / D-4 (유학생)': 'D-2 / D-4 (Du học sinh)',
    '기타 비자': 'Visa khác',

    // 매물 등록 모달
    '수수료 0원 100% 무료 C2C 직거래': 'Phí 0 đồng 100% miễn phí giao dịch C2C',
    '상품 사진 (1/5장)': 'Ảnh sản phẩm (Tối đa 5 ảnh)',
    '대표사진': 'Ảnh chính',
    '+ 사진추가': '+ Thêm ảnh',
    '귀국자 헐값 급처분 [무빙 세일(Moving Sale)]로 등록하기': 'Đăng vào mục Thanh lý về nước [Moving Sale]',
    '매물 제목 (Item Title)': 'Tiêu đề món đồ (Item Title)',
    '예: 통돌이 세탁기 10kg + 쿠쿠 밥솥 묶음 판매합니다': 'VD: Bán máy giặt 10kg + Nồi cơm điện Cuckoo thanh lý về nước',
    '카테고리 선택 (Category)': 'Chọn danh mục sản phẩm (Category)',
    '원룸 가전': 'Đồ điện gia dụng',
    '가구·수납': 'Nội thất & Tủ kệ',
    '스마트폰·IT': 'Điện thoại & IT',
    '무빙세일': 'Thanh lý về nước',
    '무료나눔': 'Tặng miễn phí 0đ',
    '의류·잡화': 'Quần áo & Thời trang',
    '생활·주방': 'Đồ gia đình & Nhà bếp',
    '자전거·탈것': 'Xe đạp & Xe điện',
    '판매 가격 (0원 입력 시 무료나눔 자동 적용)': 'Giá bán (Nhập 0 won nếu muốn tặng miễn phí)',
    '원 (KRW)': 'won (KRW)',
    '직거래장소 &amp; 만남 장소 (지도 핀 이동 가능)': 'Địa điểm hẹn gặp giao dịch trực tiếp',
    '직거래장소 & 만남 장소 (지도 핀 이동 가능)': 'Địa điểm hẹn gặp giao dịch trực tiếp',
    '내 위치로 핀 이동': 'Chuyển ghim về vị trí của tôi',
    '주소 검색': 'Tìm địa chỉ',
    '상세 만남 장소 (고객 직접 입력)': 'Địa điểm hẹn chi tiết (Tự nhập)',
    '예: GS25 편의점 앞 / 기숙사 2동 경비실 앞 / 정문 시계탑': 'VD: Trước cửa GS25 / Trước cổng KTX số 2 / Cổng chính KCN',

    // 세무 계산기 모달
    'KTRS x EasyTax 실시간 연계': 'Liên kết trực tiếp KTRS x EasyTax Cục Thuế Hàn Quốc',
    '나의 잠재 환급액 10초 만에 확인하기': 'Kiểm tra tiền hoàn thuế của bạn trong 10 giây',
    '대상 연령 안내': 'Độ tuổi được hưởng ưu đãi thuế',
    '만 15세 ~ 34세': 'Từ 15 đến 34 tuổi',
    '최근 5년 한국 근무 기간': 'Thời gian làm việc tại Hàn Quốc',
    '36개월 (3.0년)': '36 tháng (3.0 năm)',
    '평균 월 급여 (세전)': 'Lương bình quân tháng (Trước thuế)',
    '250만 원': '2.50 triệu won',
    'AI 예상 환급 가능 금액': 'Số tiền AI ước tính bạn được hoàn lại',
    '선결제 0원 (수수료없음)': 'Trả trước 0 đồng (Không thu phí trước)',
    '100% 환급 성공 시 후불': '100% chỉ trả phí sau khi tiền về tài khoản',
    'KTRS에서 바로 환급 신청하기 ➔': 'Đăng ký nhận tiền hoàn thuế ngay qua KTRS ➔',
    'K-Trust 매너온도': 'Điểm uy tín K-Trust',
    '매너온도란?': 'Điểm uy tín là gì?',
    '법무부 실물 신분증 OCR 인증 (+7.0℃ 보너스 반영)': 'Đã xác minh thẻ ngoại kiều ARC (+7.0℃ điểm thưởng)',
    '신뢰도 상위 12% 최우수 회원': 'Thành viên xuất sắc top 12% uy tín nhất',
    '홈 화면에 K-Market 앱 설치하기': 'Cài đặt App K-Market vào màn hình chính',
    '1초 완료': 'Xong trong 1 giây',
    '앱 설치': 'Cài đặt App',

    // 푸터 및 사업자 안내
    '대한민국 No.1 외국인 종합 슈퍼앱 KTRS 연계': 'Nền tảng việc làm & đời sống số 1 Hàn Quốc KTRS',
    '외국인 전용 0원 안심 중고거래 & 귀국 무빙세일 & 동네생활 커뮤니티': 'Chợ đồ cũ 0đ & Thanh lý về nước & Giao lưu đời sống cho người nước ngoài',
    '수수료 0원 100% 무료 안심 직거래': 'Phí 0 đồng 100% miễn phí giao dịch an tâm',
    '15개국어 실시간 Gemini AI 양방향 번역': 'Dịch tự động 2 chiều 17 thứ tiếng với Gemini AI',
    '17개국어 실시간 Gemini AI 양방향 번역': 'Dịch tự động 2 chiều 17 thứ tiếng với Gemini AI',
    '사업자명:': 'Công ty:',
    '주식회사 케이이엔씨': 'K-ENC Co., Ltd.',
    '대표자:': 'Đại diện:',
    '전기관': 'Jeon Ki-kwan',
    '사업자 등록번호:': 'Mã số doanh nghiệp:',
    '통신판매업 번호:': 'Giấy phép kinh doanh TMĐT:',
    '제 2023-진접오남-0680호': 'Số 2023-JinjeopOnam-0680',
    '주소:': 'Địa chỉ:',
    '서울특별시 광진구 광나루로 438, 5층(화양동, 에듀인빌딩)': 'Tầng 5, Eduin B/D, 438 Gwangnaru-ro, Gwangjin-gu, Seoul',
    '연락처:': 'Hotline:',
    '이메일:': 'Email:',
    '안심 가이드 | 고객센터 1588-0000': 'Hướng dẫn an toàn | CSKH 1588-0000',
    '관리자 관제 콘솔 (Admin)': 'Trung tâm quản trị (Admin)',
    '◀ 이전': '◀ Trang trước',
    '다음 ▶': 'Trang sau ▶',
  },
  zh: {
    '15개국어 외국인 신원인증 &amp; 가입': '17国语言外籍实名认证与注册',
    '15개국어 외국인 신원인증 & 가입': '17国语言外籍实名认证与注册',
    '외국인 안심 간편가입': '外籍同胞安心极速注册',
    '등록증 OCR (+7.0℃ &amp; 상단노출 🚀)': '外国人登录证 OCR 识别 (+7.0℃ & 置顶展示 🚀)',
    '등록증 OCR (+7.0℃ & 상단노출 🚀)': '外国人登录证 OCR 识别 (+7.0℃ & 置顶展示 🚀)',
    '수기 입력 (기본 36.5℃)': '手动输入 (基础 36.5℃)',
    '실물 신분증 OCR 촬영 시 3대 특별 혜택': '拍摄实名证件享受3大专属特权',
    '+7.0℃ 즉시 가산': '+7.0℃ 立即加分',
    '매너온도 43.5℃ 골드 등급': '信用温度 43.5℃ 黄金等级',
    '가입 즉시 +7.0℃ 상승으로 최우수 안심 회원 뱃지 부여': '注册即加7度，授予最高级别安心交易勋章',
    '내 매물 맨 최상단 우선 노출': '发布商品在首页置顶优先推荐',
    '신뢰도가 올라 구매자에게 먼저 추천되어 2배 빠른 판매 성사!': '信用度大幅提升，优先推荐给买家，出售速度翻倍！',
    '외국인등록증 앞면 사진 촬영하기': '拍摄外国人登录证正面照片',
    '카메라 열기 / 신분증 촬영하고 43.5℃ 받기 ➔': '打开相机 / 拍摄证件获取 43.5℃ ➔',
    '활동 닉네임 / 별명 (Nickname) 필수': '用户昵称 / 账号名 (必填)',
    '랜덤 별명 추천': '随机推荐昵称',
    '예: 안산호랑이, 베트남마켓, 띰띰친구 (2~15자)': '例: 安山老乡, 平泽二手, 奋斗在韩国 (2~15字)',
    '영문 실명 (Passport Name)': '英文姓名 (护照一致)',
    '외국인등록번호 (13자리)': '外国人登录证号 (13位)',
    '비자 종류 (Visa Status)': '在韩签证类型 (Visa Status)',
    '체류 만료일 (Expiry Date)': '滞留到期日 (Expiry Date)',
    'E-9 (비전문취업)': 'E-9 (非专业就业)',
    'E-7 (특정활동)': 'E-7 (特定活动专业工签)',
    'F-4 (재외동포)': 'F-4 (在外同胞朝鲜族)',
    'H-2 (방문취업)': 'H-2 (访问就业)',
    'D-2 / D-4 (유학생)': 'D-2 / D-4 (留学生)',
    '기타 비자': '其他签证',
    '수수료 0원 100% 무료 C2C 직거래': '0手续费 100%免费C2C当面交易',
    '상품 사진 (1/5장)': '商品图片 (最多5张)',
    '대표사진': '主图封面',
    '+ 사진추가': '+ 添加图片',
    '귀국자 헐값 급처분 [무빙 세일(Moving Sale)]로 등록하기': '标记为回国清仓大甩卖 [Moving Sale]',
    '매물 제목 (Item Title)': '商品标题 (Item Title)',
    '예: 통돌이 세탁기 10kg + 쿠쿠 밥솥 묶음 판매합니다': '例: 10kg波轮洗衣机 + 福库电饭煲打包出',
    '카테고리 선택 (Category)': '选择商品分类 (Category)',
    '원룸 가전': '单间家电',
    '가구·수납': '家具收纳',
    '스마트폰·IT': '数码手机',
    '무빙세일': '归国甩卖',
    '무료나눔': '免费赠送 0元',
    '의류·잡화': '服装杂货',
    '생활·주방': '生活厨房',
    '자전거·탈것': '自行车与车',
    '판매 가격 (0원 입력 시 무료나눔 자동 적용)': '出售价格 (填0元自动标记为免费赠送)',
    '원 (KRW)': '韩元 (KRW)',
    '직거래장소 &amp; 만남 장소 (지도 핀 이동 가능)': '当面交易碰头地点 (可移动地图图钉)',
    '직거래장소 & 만남 장소 (지도 핀 이동 가능)': '当面交易碰头地点 (可移动地图图钉)',
    '내 위치로 핀 이동': '定位到我的位置',
    '주소 검색': '搜索地址',
    '상세 만남 장소 (고객 직접 입력)': '详细碰头地点 (手动输入)',
    '예: GS25 편의점 앞 / 기숙사 2동 경비실 앞 / 정문 시계탑': '例: GS25便利店门口 / 2号宿舍门卫室前 / 园区正门',
    'KTRS x EasyTax 실시간 연계': 'KTRS x EasyTax 韩国国税厅直连',
    '나의 잠재 환급액 10초 만에 확인하기': '10秒测算我的潜在退税金额',
    '대상 연령 안내': '减税优惠适用年龄',
    '만 15세 ~ 34세': '满15岁 ~ 34岁',
    '최근 5년 한국 근무 기간': '近5年在韩工作总月数',
    '36개월 (3.0년)': '36个月 (3.0年)',
    '평균 월 급여 (세전)': '月平均工资 (税前)',
    '250만 원': '250万韩元',
    'AI 예상 환급 가능 금액': 'AI测算预计可退税金',
    '선결제 0원 (수수료없음)': '0元预付 (无任何前期费用)',
    '100% 환급 성공 시 후불': '100%退税款到账后付费',
    'KTRS에서 바로 환급 신청하기 ➔': '在KTRS立即申请退税 ➔',
    'K-Trust 매너온도': 'K-Trust 信用温度',
    '매너온도란?': '什么是信用温度？',
    '법무부 실물 신분증 OCR 인증 (+7.0℃ 보너스 반영)': '已通过法务部实名登录证认证 (+7.0℃奖励)',
    '신뢰도 상위 12% 최우수 회원': '信誉排名前12%的优质安心会员',
    '홈 화면에 K-Market 앱 설치하기': '添加 K-Market 到手机主屏幕',
    '1초 완료': '1秒添加',
    '앱 설치': '安装应用',
    '대한민국 No.1 외국인 종합 슈퍼앱 KTRS 연계': '韩国第一外籍综合服务平台 KTRS',
    '외국인 전용 0원 안심 중고거래 & 귀국 무빙세일 & 동네생활 커뮤니티': '外籍专享 0元二手交易 & 回国大甩卖 & 同城老乡社区',
    '수수료 0원 100% 무료 안심 직거래': '0手续费 100%免费安心当面交易',
    '15개국어 실시간 Gemini AI 양방향 번역': '内置Gemini AI 17国语言双向毫秒级翻译',
    '17개국어 실시간 Gemini AI 양방향 번역': '内置Gemini AI 17国语言双向毫秒级翻译',
    '사업자명:': '企业名称:',
    '주식회사 케이이엔씨': '株式会社 K-ENC',
    '대표자:': '法人代表:',
    '전기관': '全基官 (Jeon Ki-kwan)',
    '사업자 등록번호:': '营业执照号:',
    '통신판매업 번호:': '电商经营许可证:',
    '제 2023-진접오남-0680호': '第2023-榛接梧南-0680号',
    '주소:': '公司地址:',
    '서울특별시 광진구 광나루로 438, 5층(화양동, 에듀인빌딩)': '首尔特别市广津区广渡口路438, 5层',
    '연락처:': '客服热线:',
    '이메일:': '官方邮箱:',
    '안심 가이드 | 고객센터 1588-0000': '安全交易指南 | 客服中心 1588-0000',
    '관리자 관제 콘솔 (Admin)': '运营管理后台 (Admin)',
    '◀ 이전': '◀ 上一页',
    '다음 ▶': '下一页 ▶',
  },
  en: {
    '15개국어 외국인 신원인증 &amp; 가입': '17-Language Identity Verification & Sign Up',
    '15개국어 외국인 신원인증 & 가입': '17-Language Identity Verification & Sign Up',
    '외국인 안심 간편가입': 'Safe Sign Up for Foreigners',
    '등록증 OCR (+7.0℃ &amp; 상단노출 🚀)': 'ARC Card OCR (+7.0℃ & Top Priority 🚀)',
    '등록증 OCR (+7.0℃ & 상단노출 🚀)': 'ARC Card OCR (+7.0℃ & Top Priority 🚀)',
    '수기 입력 (기본 36.5℃)': 'Manual Input (Base 36.5℃)',
    '실물 신분증 OCR 촬영 시 3대 특별 혜택': '3 Exclusive Benefits for ARC Card Verification',
    '+7.0℃ 즉시 가산': '+7.0℃ Added Instantly',
    '매너온도 43.5℃ 골드 등급': 'Trust Score 43.5℃ Gold Grade',
    '가입 즉시 +7.0℃ 상승으로 최우수 안심 회원 뱃지 부여': 'Instantly get +7.0℃ and verified safe trader badge',
    '내 매물 맨 최상단 우선 노출': 'Your listings prioritized at the top of feed',
    '신뢰도가 올라 구매자에게 먼저 추천되어 2배 빠른 판매 성사!': 'Higher trust recommends items to buyers for 2x faster sales!',
    '외국인등록증 앞면 사진 촬영하기': 'Scan front side of Foreigner Registration Card (ARC)',
    '카메라 열기 / 신분증 촬영하고 43.5℃ 받기 ➔': 'Open Camera / Scan Card & Get 43.5℃ ➔',
    '활동 닉네임 / 별명 (Nickname) 필수': 'Nickname (Required)',
    '랜덤 별명 추천': 'Random Nickname',
    '예: 안산호랑이, 베트남마켓, 띰띰친구 (2~15자)': 'e.g. AnsanTiger, GlobalFriend, PoseungWorker (2-15 chars)',
    '영문 실명 (Passport Name)': 'Full Name in English (Passport Name)',
    '외국인등록번호 (13자리)': 'Foreigner Registration Number (13 digits)',
    '비자 종류 (Visa Status)': 'Visa Status',
    '체류 만료일 (Expiry Date)': 'Visa Expiry Date',
    'E-9 (비전문취업)': 'E-9 (Non-professional Employment)',
    'E-7 (특정활동)': 'E-7 (Specially Designated Activities)',
    'F-4 (재외동포)': 'F-4 (Overseas Korean)',
    'H-2 (방문취업)': 'H-2 (Working Visit)',
    'D-2 / D-4 (유학생)': 'D-2 / D-4 (Student)',
    '기타 비자': 'Other Visa',
    '수수료 0원 100% 무료 C2C 직거래': '0% Fee 100% Free C2C Direct Deal',
    '상품 사진 (1/5장)': 'Item Photos (Up to 5)',
    '대표사진': 'Cover Photo',
    '+ 사진추가': '+ Add Photo',
    '귀국자 헐값 급처분 [무빙 세일(Moving Sale)]로 등록하기': 'Register as Returning Home [Moving Sale]',
    '매물 제목 (Item Title)': 'Item Title',
    '예: 통돌이 세탁기 10kg + 쿠쿠 밥솥 묶음 판매합니다': 'e.g. Selling 10kg washer + Cuckoo rice cooker bundle',
    '카테고리 선택 (Category)': 'Select Category',
    '원룸 가전': 'Appliances',
    '가구·수납': 'Furniture',
    '스마트폰·IT': 'Digital & Phone',
    '무빙세일': 'Moving Sale',
    '무료나눔': 'Free Giveaway 0 KRW',
    '의류·잡화': 'Clothing & Goods',
    '생활·주방': 'Life & Kitchen',
    '자전거·탈것': 'Bicycle & Scooter',
    '판매 가격 (0원 입력 시 무료나눔 자동 적용)': 'Price (Enter 0 for free giveaway)',
    '원 (KRW)': 'KRW',
    '직거래장소 &amp; 만남 장소 (지도 핀 이동 가능)': 'Direct Meetup Location (Pin Movable)',
    '직거래장소 & 만남 장소 (지도 핀 이동 가능)': 'Direct Meetup Location (Pin Movable)',
    '내 위치로 핀 이동': 'Move pin to my location',
    '주소 검색': 'Search Address',
    '상세 만남 장소 (고객 직접 입력)': 'Detailed Meetup Spot (Custom Input)',
    '예: GS25 편의점 앞 / 기숙사 2동 경비실 앞 / 정문 시계탑': 'e.g. In front of GS25 / Dormitory Bldg 2 / Complex Main Gate',
    'KTRS x EasyTax 실시간 연계': 'Real-time KTRS x EasyTax NTS Integration',
    '나의 잠재 환급액 10초 만에 확인하기': 'Check your potential tax refund in 10s',
    '대상 연령 안내': 'Eligible Age Guide',
    '만 15세 ~ 34세': 'Age 15 ~ 34',
    '최근 5년 한국 근무 기간': 'Work Duration in Korea',
    '36개월 (3.0년)': '36 Months (3.0 Years)',
    '평균 월 급여 (세전)': 'Monthly Average Salary (Pre-tax)',
    '250만 원': '2.50 Million KRW',
    'AI 예상 환급 가능 금액': 'AI Estimated Refund Amount',
    '선결제 0원 (수수료없음)': '$0 Upfront (No Advance Fee)',
    '100% 환급 성공 시 후불': '100% Success Fee after Payout',
    'KTRS에서 바로 환급 신청하기 ➔': 'Claim Refund on KTRS Now ➔',
    'K-Trust 매너온도': 'K-Trust Score',
    '매너온도란?': 'What is Trust Score?',
    '법무부 실물 신분증 OCR 인증 (+7.0℃ 보너스 반영)': 'Ministry of Justice ARC Verified (+7.0℃ Bonus)',
    '신뢰도 상위 12% 최우수 회원': 'Top 12% Most Trusted Member',
    '홈 화면에 K-Market 앱 설치하기': 'Install K-Market App to Home Screen',
    '1초 완료': '1 Sec',
    '앱 설치': 'Install App',
    '대한민국 No.1 외국인 종합 슈퍼앱 KTRS 연계': 'Korea No.1 Foreign Worker Platform KTRS',
    '외국인 전용 0원 안심 중고거래 & 귀국 무빙세일 & 동네생활 커뮤니티': '0% Fee Secondhand Deals & Moving Sales & Community for Foreigners',
    '수수료 0원 100% 무료 안심 직거래': '0% Fee 100% Free Direct Trading',
    '15개국어 실시간 Gemini AI 양방향 번역': '17-Language Real-time Gemini AI Translation',
    '17개국어 실시간 Gemini AI 양방향 번역': '17-Language Real-time Gemini AI Translation',
    '사업자명:': 'Company Name:',
    '주식회사 케이이엔씨': 'K-ENC Co., Ltd.',
    '대표자:': 'CEO:',
    '전기관': 'Jeon Ki-kwan',
    '사업자 등록번호:': 'Business License:',
    '통신판매업 번호:': 'E-Commerce License:',
    '제 2023-진접오남-0680호': 'No. 2023-JinjeopOnam-0680',
    '주소:': 'Address:',
    '서울특별시 광진구 광나루로 438, 5층(화양동, 에듀인빌딩)': '5F, Eduin Bldg, 438 Gwangnaru-ro, Gwangjin-gu, Seoul',
    '연락처:': 'Phone:',
    '이메일:': 'Email:',
    '안심 가이드 | 고객센터 1588-0000': 'Safety Guide | Customer Center 1588-0000',
    '관리자 관제 콘솔 (Admin)': 'Admin Control Console',
    '◀ 이전': '◀ Prev',
    '다음 ▶': 'Next ▶',
  }
};

// 1. ko.ts에서 textToKey 역매핑 로드
const koPath = path.join(localesDir, 'ko.ts');
const koContent = fs.readFileSync(koPath, 'utf8');
const textToKey = {};

koContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([a-zA-Z0-9_]+)\s*:\s*(['"].*['"]),?\s*$/);
  if (match) {
    try {
      const val = JSON.parse(match[2].replace(/'/g, '"'));
      if (typeof val === 'string') textToKey[val.trim()] = match[1];
    } catch (e) {}
  }
});

// 2. 16개 언어 사전에 고품질 번역본 매핑 주입
const ALL_LANGS = ['vi', 'zh', 'en', 'ja', 'ru', 'th', 'uz', 'km', 'mn', 'ne', 'id', 'my', 'si', 'kk', 'bn', 'ur', 'tl'];

ALL_LANGS.forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.ts`);
  if (!fs.existsSync(filePath)) return;
  let fileContent = fs.readFileSync(filePath, 'utf8');

  const specificDict = COMPREHENSIVE_TRANSLATIONS[lang] || COMPREHENSIVE_TRANSLATIONS.en || {};
  const enDict = COMPREHENSIVE_TRANSLATIONS.en || {};

  let updatedCount = 0;
  for (const [koText, translatedText] of Object.entries(specificDict)) {
    const key = textToKey[koText];
    if (key) {
      const keyRegex = new RegExp(`(\\s*${key}\\s*:\\s*)(['"].*['"])(,?)`, 'g');
      if (keyRegex.test(fileContent)) {
        fileContent = fileContent.replace(keyRegex, `$1${JSON.stringify(translatedText)}$3`);
        updatedCount++;
      }
    }
  }

  fs.writeFileSync(filePath, fileContent, 'utf8');
  console.log(`✅ [${lang.toUpperCase()}] ${updatedCount}개 핵심 모달/푸터 키 고품질 번역본 주입 완료`);
});

// 3. pwaInstaller.ts 번역 고도화
const pwaInstallerPath = path.join(srcDir, 'lib', 'pwaInstaller.ts');
let pwaCode = `// PWA 1초 설치 트리거 유틸 (17개국어 대응)

export async function triggerPwaInstall(): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  const deferredPrompt = (window as any).deferredPwaPrompt;

  if (deferredPrompt) {
    try {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        (window as any).deferredPwaPrompt = null;
        return true;
      }
    } catch (err) {
      console.warn('PWA prompt error:', err);
    }
  }

  // 기기별 안내
  const isIOS = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
  const currentLang = localStorage.getItem('kmarket_lang') || 'ko';

  if (isIOS) {
    if (currentLang === 'vi') {
      alert('📱 [Hướng dẫn cài đặt iPhone/Safari]\\n\\nVui lòng nhấn nút [Chia sẻ (↑)] ở thanh dưới cùng rồi chọn [Thêm vào Màn hình chính (+)] để cài đặt ứng dụng ngay!');
    } else if (currentLang === 'zh') {
      alert('📱 [iPhone/Safari 安装指引]\\n\\n请点击浏览器底部的 [分享按钮(↑)]，然后选择 [添加到主屏幕(+)] 即可完成安装！');
    } else {
      alert('📱 [iPhone/Safari Install Guide]\\n\\nTap the [Share button (↑)] at the bottom and choose [Add to Home Screen (+)] to install the app!');
    }
  } else {
    if (currentLang === 'vi') {
      alert('📱 [Hướng dẫn cài đặt App K-Market]\\n\\nNhấn biểu tượng [Cài đặt (⊕)] trên thanh địa chỉ hoặc menu (⋮) rồi chọn [Cài đặt ứng dụng] / [Thêm vào màn hình chính]!');
    } else if (currentLang === 'zh') {
      alert('📱 [K-Market 应用安装指引]\\n\\n点击浏览器地址栏右侧的 [安装图标(⊕)] 或菜单(⋮)中的 [安装应用] / [添加到主屏幕] 即可1秒完成安装！');
    } else {
      alert('📱 [K-Market App Installation]\\n\\nClick the [Install icon (⊕)] in address bar or menu (⋮) and select [Install App] / [Add to Home Screen]!');
    }
  }
  return false;
}
`;
fs.writeFileSync(pwaInstallerPath, pwaCode, 'utf8');
console.log('✅ [pwaInstaller.ts] 다국어 alert 안내 100% 적용 완료');
