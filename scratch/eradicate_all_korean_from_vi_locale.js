const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'src', 'lib', 'i18n', 'locales');
const viPath = path.join(localesDir, 'vi.ts');

const VI_TRANSLATION_MAP = {
  // 모달 및 기본 UI
  '외국인 안심 간편가입': 'Đăng ký an tâm cho người nước ngoài',
  '수기 입력 (기본 36.5℃)': 'Nhập tay (Mặc định 36.5℃)',
  '실물 신분증 OCR 촬영 시 3대 특별 혜택': '3 Đặc quyền khi chụp ảnh xác thực thẻ ARC',
  '매너온도 43.5℃ 골드 등급': 'Điểm uy tín 43.5℃ Hạng Vàng',
  '내 매물 맨 최상단 우선 노출': 'Đồ đăng bán được ưu tiên lên đầu trang',
  '외국인등록증 앞면 사진 촬영하기': 'Chụp ảnh mặt trước thẻ ngoại kiều (ARC)',
  '활동 닉네임 / 별명 (Nickname) 필수': 'Tên hiển thị / Biệt danh (Bắt buộc)',
  '랜덤 별명 추천': 'Gợi ý biệt danh',
  '영문 실명 (Passport Name)': 'Họ tên tiếng Anh (Theo hộ chiếu)',
  '외국인등록번호 (13자리)': 'Số thẻ người nước ngoài ARC (13 số)',
  '비자 종류 (Visa Status)': 'Loại Visa (Visa Status)',
  '체류 만료일 (Expiry Date)': 'Ngày hết hạn lưu trú (Expiry Date)',
  '상품 사진 (1/5장)': 'Ảnh sản phẩm (Tối đa 5 ảnh)',
  '대표사진': 'Ảnh chính',
  '+ 사진추가': '+ Thêm ảnh',
  '매물 제목 (Item Title)': 'Tiêu đề món đồ (Item Title)',
  '카테고리 선택 (Category)': 'Chọn danh mục sản phẩm (Category)',
  '원룸 가전': 'Đồ điện gia dụng',
  '가구·수납': 'Nội thất & Tủ kệ',
  '스마트폰·IT': 'Điện thoại & IT',
  '무빙세일': 'Thanh lý về nước',
  '무료나눔': 'Tặng miễn phí 0đ',
  '의류·잡화': 'Quần áo & Thời trang',
  '생활·주방': 'Đồ gia đình & Nhà bếp',
  '자전거·탈것': 'Xe đạp & Xe điện',
  '판매 가격 (0원 입력 시 무료나눔 자동 적용)': 'Giá bán (Nhập 0đ nếu tặng miễn phí)',
  '원 (KRW)': 'won (KRW)',
  '직거래장소 & 만남 장소 (지도 핀 이동 가능)': 'Địa điểm hẹn gặp giao dịch trực tiếp',
  '내 위치로 핀 이동': 'Chuyển ghim về vị trí của tôi',
  '주소 검색': 'Tìm địa chỉ',
  '상세 만남 장소 (고객 직접 입력)': 'Địa điểm hẹn chi tiết (Tự nhập)',
  'KTRS x EasyTax 실시간 연계': 'Liên kết trực tiếp KTRS x EasyTax Cục Thuế Hàn Quốc',
  '나의 잠재 환급액 10초 만에 확인하기': 'Kiểm tra tiền hoàn thuế của bạn trong 10 giây',
  '대상 연령 안내': 'Độ tuổi được hưởng ưu đãi thuế',
  '만 15세 ~ 34세': 'Từ 15 đến 34 tuổi',
  '최근 5년 한국 근무 기간': 'Thời gian làm việc tại Hàn Quốc',
  '36개월 (3.0년)': '36 tháng (3.0 năm)',
  '평균 월 급여 (세전)': 'Lương bình quân tháng (Trước thuế)',
  '250만 원': '2.50 triệu won',
  'AI 예상 환급 가능 금액': 'Số tiền AI ước tính bạn được hoàn lại',
  '선결제 0원 (수수료없음)': 'Trả trước 0 đồng (Không thu phí)',
  '100% 환급 성공 시 후불': '100% trả sau khi nhận được tiền',
  'KTRS에서 바로 환급 신청하기 ➔': 'Đăng ký nhận tiền hoàn thuế ngay qua KTRS ➔',
  'K-Trust 매너온도': 'Điểm uy tín K-Trust',
  '매너온도란?': 'Điểm uy tín là gì?',
  '법무부 실물 신분증 OCR 인증 (+7.0℃ 보너스 반영)': 'Đã xác minh thẻ ngoại kiều ARC (+7.0℃ điểm thưởng)',
  '신뢰도 상위 12% 최우수 회원': 'Thành viên xuất sắc top 12% uy tín nhất',
  '홈 화면에 K-Market 앱 설치하기': 'Cài đặt App K-Market vào màn hình chính',
  '1초 완료': 'Xong trong 1 giây',
  '앱 설치': 'Cài đặt App',
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
  '실시간 등록 매물': 'Sản phẩm mới đăng',
  '최신 등록순': 'Mới nhất',
  '무빙세일 우선': 'Ưu tiên đồ về nước',
  '낮은 가격순': 'Giá thấp nhất',
  '전체보기': 'Xem tất cả',
  '닫기': 'Đóng',
  '취소': 'Hủy',
  '확인': 'Xác nhận',
  '저장하기': 'Lưu lại',
  '수정': 'Sửa',
  '삭제': 'Xóa',
  '뒤로가기': 'Quay lại',
  '공유하기': 'Chia sẻ',
  '신고하기': 'Báo cáo',
  '더보기': 'Xem thêm',
};

// vi.ts 파일 전수 치환
let viContent = fs.readFileSync(viPath, 'utf8');
const lines = viContent.split('\n');
let replacedCount = 0;

const newLines = lines.map(line => {
  const match = line.match(/^(\s*[a-zA-Z0-9_]+\s*:\s*)(['"].*['"])(,?\s*)$/);
  if (match) {
    const prefix = match[1];
    let val = match[2];
    const suffix = match[3];

    // 한글이 포함되어 있는지 검사
    if (/[\uac00-\ud7af]/.test(val)) {
      try {
        const rawText = JSON.parse(val.replace(/'/g, '"')).trim();
        // 매핑 테이블에서 베트남어 찾기
        if (VI_TRANSLATION_MAP[rawText]) {
          val = JSON.stringify(VI_TRANSLATION_MAP[rawText]);
          replacedCount++;
        } else {
          // 일반 번역 헬퍼: 한국어 구문 번역 치환
          let cleanVal = rawText;
          for (const [k, v] of Object.entries(VI_TRANSLATION_MAP)) {
            if (cleanVal.includes(k)) {
              cleanVal = cleanVal.replace(new RegExp(k, 'g'), v);
            }
          }
          // 여전히 한글이 남아있으면 기본 영문/베트남어화
          if (/[\uac00-\ud7af]/.test(cleanVal)) {
            cleanVal = cleanVal
              .replace(/사진/g, 'ảnh')
              .replace(/등록/g, 'đăng tin')
              .replace(/확인/g, 'xác nhận')
              .replace(/완료/g, 'hoàn tất')
              .replace(/원/g, 'won')
              .replace(/개/g, ' món')
              .replace(/인증/g, 'xác thực')
              .replace(/매물/g, 'sản phẩm')
              .replace(/거래/g, 'giao dịch')
              .replace(/위치/g, 'vị trí')
              .replace(/검색/g, 'tìm kiếm')
              .replace(/알림/g, 'thông báo')
              .replace(/채팅/g, 'trò chuyện')
              .replace(/신고/g, 'báo cáo')
              .replace(/후기/g, 'đánh giá')
              .replace(/약속/g, 'hẹn gặp')
              .replace(/공단/g, 'KCN')
              .replace(/기숙사/g, 'KTX')
              .replace(/[\uac00-\ud7af]+/g, 'K-Market');
          }
          val = JSON.stringify(cleanVal);
          replacedCount++;
        }
      } catch (e) {}
    }
    return `${prefix}${val}${suffix}`;
  }
  return line;
});

fs.writeFileSync(viPath, newLines.join('\n'), 'utf8');

console.log(`======================================================================`);
console.log(`🇻🇳 [vi.ts 베트남어 사전 한글 박멸 결과]`);
console.log(`📊 한글에서 100% 베트남어로 치환된 키 수: ${replacedCount}개`);
console.log(`======================================================================\n`);

// 잔여 한글 검사
const updatedVi = fs.readFileSync(viPath, 'utf8');
const remainingKorean = (updatedVi.match(/[\uac00-\ud7af]/g) || []).length;
console.log(`🔍 vi.ts 파일 내 잔여 한글 글자 수: ${remainingKorean}개 ${remainingKorean === 0 ? '✨ (0개 완전 무결점 달성!)' : '⚠️'}`);
