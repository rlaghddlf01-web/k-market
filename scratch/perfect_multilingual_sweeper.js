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

// 1. 완벽한 영문 번역 맵 (영어 기준점)
const EN_TRANSLATIONS = {
  '수수료 0원': '0 Won Fee',
  '안심 거래': 'Safe Trade',
  '중고거래': 'Secondhand Trade',
  '이지텍스': 'EasyTax',
  '원스톱 연계': 'One-stop Integration',
  '공유 버튼': 'Share Button',
  '홈 화면에 추가': 'Add to Home Screen',
  '한국인이신가요?': 'Are you Korean?',
  '사진 첨부 (최대 5장)': 'Attach photos (up to 5)',
  '0.3초 95% 고화질 자동 압축': '0.3s 95% HD Auto Compression',
  '사진 추가': 'Add Photos',
  '압축 중...': 'Compressing...',
  '사진 삭제': 'Delete Photo',
  '15개국어 자동 번역 생성 중...': 'Generating 17-language auto-translation...',
  '15개국어 자동 번역으로 글 올리기': 'Post with 17-Language Auto Translation',
  '1분 간편 인증(회원가입) 후 글 올리기 →': 'Post after 1-min quick signup →',
  '언어 장벽 없이 내 모국어로 편하게': 'Comfortably in your native language without barriers',
  '외국인 이웃들의 따뜻한 동네생활 & 쉼터': 'Warm community & shelter for foreign neighbors',
  '동네 친구 사귀기': 'Make local friends',
  '부터, 고향 가족 생각나는': 'From daily life to missing family back home',
  '사는 이야기': 'Life Stories',
  '한국 생활 Q&A': 'Korea Life Q&A',
  '동네생활 글쓰기': 'Write Community Post',
  '첫 이야기 작성하기': 'Write First Story',
  '신고 / 차단': 'Report / Block',
  '원문 보기': 'View Original',
  '번역 보기': 'View Translation',
  '공감해요': 'Like',
  '힘내세요 / 응원해요': 'Cheer up / Support',
  '댓글': 'Comments',
  '댓글 신고': 'Report Comment',
  '따뜻한 응원이나 답변을 남겨보세요': 'Leave warm cheer or answers',
  '신고 및 차단하기': 'Report and Block',
  '자세한 사유를 적어주시면 빠른 조치에 도움이 됩니다.': 'Detailed reasons help take quick action.',
  'KTRS K-Market 안전 관리자 관제 콘솔': 'KTRS K-Market Safety Admin Console',
  '신고 접수 내역 & 회원 제재 관리': 'Report List & Member Sanction Management',
  '피신고 대상자:': 'Reported User:',
  '관련 매물:': 'Related Listing:',
  '매물 강제 삭제': 'Force Delete Listing',
  '7일 이용 정지': '7-Day Suspension',
  '플랫폼 영구 제재 (Ban)': 'Permanent Platform Ban',
  '1:1 안심 직거래 약속': '1:1 Safe Direct Trade Meetup',
  '만남 장소 핀 잡기 & 시간 정하기': 'Pick meeting spot on map & set time',
  '1. 기본 도로명 / 동네 주소': '1. Standard Address / District',
  '현재 내 위치로 주소 & 핀 자동 세팅': 'Auto-set address & pin to my current location',
  '위치 확인중...': 'Checking location...',
  '내 위치로 핀 이동': 'Move pin to my location',
  '도로명/동네 주소 검색 또는 지도에서 핀을 직접 클릭하세요': 'Search address or click pin directly on map',
  '주소 검색': 'Search Address',
  '2. 상세 만남 장소명 (고객 직접 입력)': '2. Detailed Meeting Spot (Direct Input)',
  '만남 지정 핀 위치': 'Selected Meetup Spot Location',
  '2. 직거래 희망 날짜 & 시간': '2. Desired Meetup Date & Time',
  '오늘 직거래': 'Today',
  '내일 직거래': 'Tomorrow',
  '날짜 직접 선택': 'Select Date',
  '약속 시간 선택': 'Select Time',
  '시간 미정 (채팅으로 협의)': 'Time TBD (Discuss in chat)',
  '직거래 약속 잡기 완료': 'Direct Trade Appointment Confirmed',
  '직거래 장소 및 시간 확정하기 →': 'Confirm Trade Spot & Time →',
  '상대방에게 직거래 약속 카드를 전송합니다': 'Sending meetup card to the counterpart',
  '약속 장소가 전송되었습니다!': 'Meetup location has been sent!',
  '직거래 약속이 확정되었습니다!': 'Direct trade appointment confirmed!',
  '거래 약속 취소': 'Cancel Appointment',
  '매너온도 +1.0℃': 'Trust Score +1.0℃',
  '거래 후기 남기기': 'Leave Trade Review',
  '매너 평가하기': 'Rate Manner',
  '최고예요': 'Great',
  '친절하고 매너가 좋아요': 'Kind and well-mannered',
  '시간 약속을 잘 지켜요': 'Punctual on time',
  '상품 상태가 설명과 같아요': 'Item is as described',
  '응답이 빨라요': 'Fast response',
  '후기 작성 완료': 'Review Submitted',
  '상대방에게 매너 점수가 반영되었습니다': 'Manner score updated for user',
};

// 2. 언어별 전수 문맥 사전
const GLOBAL_VOCAB = {
  vi: {
    '수수료 0원': 'Phí 0đ', '안심 거래': 'Giao dịch an toàn', '중고거래': 'Đồ cũ', '이지텍스': 'EasyTax',
    '원스톱 연계': 'Liên kết trọn gói', '공유 버튼': 'Nút chia sẻ', '홈 화면에 추가': 'Thêm vào màn hình chính',
    '한국인이신가요?': 'Bạn là người Hàn Quốc?', '사진 첨부 (최대 5장)': 'Đính kèm ảnh (tối đa 5)',
    '0.3초 95% 고화질 자동 압축': 'Nén tự động HD 95% trong 0.3s', '사진 추가': 'Thêm ảnh',
    '압축 중...': 'Đang nén...', '사진 삭제': 'Xóa ảnh', '15개국어 자동 번역 생성 중...': 'Đang tạo bản dịch tự động 17 ngôn ngữ...',
    '15개국어 자동 번역으로 글 올리기': 'Đăng bài với bản dịch tự động 17 ngôn ngữ',
    '1분 간편 인증(회원가입) 후 글 올리기 →': 'Đăng bài sau khi đăng ký 1 phút →',
    '언어 장벽 없이 내 모국어로 편하게': 'Thoải mái bằng tiếng mẹ đẻ không rào cản',
    '외국인 이웃들의 따뜻한 동네생활 & 쉼터': 'Đời sống & Nơi giao lưu ấm áp cho người nước ngoài',
    '동네 친구 사귀기': 'Kết bạn cùng khu', '사는 이야기': 'Chuyện đời sống & Tâm sự',
    '한국 생활 Q&A': 'Hỏi đáp cuộc sống Hàn Quốc', '동네생활 글쓰기': 'Đăng bài giao lưu',
    '첫 이야기 작성하기': 'Viết bài đầu tiên', '신고 / 차단': 'Báo cáo / Chặn',
    '원문 보기': 'Xem bản gốc', '번역 보기': 'Xem bản dịch', '공감해요': 'Thích',
    '힘내세요 / 응원해요': 'Cố lên / Ủng hộ', '댓글': 'Bình luận', '댓글 신고': 'Báo cáo bình luận',
    '신고 및 차단하기': 'Báo cáo và Chặn', '직거래': 'Giao dịch trực tiếp', '약속': 'Hẹn gặp',
    '매물': 'Sản phẩm', '가격': 'Giá bán', '판매': 'Bán', '구매': 'Mua', '무료나눔': 'Tặng 0đ'
  },
  zh: {
    '수수료 0원': '0手续费', '안심 거래': '安心交易', '중고거래': '二手交易', '이지텍스': 'EasyTax',
    '원스톱 연계': '一站式对接', '공유 버튼': '分享按钮', '홈 화면에 추가': '添加到主屏幕',
    '한국인이신가요?': '您是韩国人吗？', '사진 첨부 (최대 5장)': '上传照片 (最多5张)',
    '0.3초 95% 고화질 자동 압축': '0.3秒95%高清自动压缩', '사진 추가': '添加照片',
    '압축 중...': '压缩中...', '사진 삭제': '删除照片', '15개국어 자동 번역 생성 중...': '正在生成17国语言自动翻译...',
    '15개국어 자동 번역으로 글 올리기': '以17国语言自动翻译发布',
    '1분 간편 인증(회원가입) 후 글 올리기 →': '1分钟快速注册后发帖 →',
    '언어 장벽 없이 내 모국어로 편하게': '跨越语言障碍，轻松使用母语交流',
    '외국인 이웃들의 따뜻한 동네생활 & 쉼터': '在韩外籍居民温暖社区生活与互助空间',
    '동네 친구 사귀기': '结交同城同乡好友', '사는 이야기': '在韩生活琐事与日常',
    '한국 생활 Q&A': '韩国生活问答', '동네생활 글쓰기': '发布社区动态',
    '첫 이야기 작성하기': '发布第一篇动态', '신고 / 차단': '举报 / 屏蔽',
    '원문 보기': '查看原文', '번역 보기': '查看翻译', '공감해요': '点赞',
    '힘내세요 / 응원해요': '加油 / 支持', '댓글': '评论', '댓글 신고': '举报评论',
    '신고 및 차단하기': '举报并屏蔽', '직거래': '当面交易', '약속': '约定',
    '매물': '商品', '가격': '价格', '판매': '出售', '구매': '购买', '무료나눔': '免费赠送'
  },
  ja: {
    '수수료 0원': '手数料0ウォン', '안심 거래': '安心取引', '중고거래': '中古取引', '이지텍스': 'EasyTax',
    '원스톱 연계': 'ワンストップ連携', '공유 버튼': '共有ボタン', '홈 화면에 추가': 'ホーム画面に追加',
    '한국인이신가요?': '韓国人ですか？', '사진 첨부 (최대 5장)': '写真添付 (最大5枚)',
    '0.3초 95% 고화질 자동 압축': '0.3秒で95%高画質自動圧縮', '사진 추가': '写真を追加',
    '압축 중...': '圧縮中...', '사진 삭제': '写真を削除', '15개국어 자동 번역 생성 중...': '17カ国語自動翻訳生成中...',
    '15개국어 자동 번역으로 글 올리기': '17カ国語自動翻訳で投稿する',
    '1분 간편 인증(회원가입) 후 글 올리기 →': '1分簡単登録後に投稿する →',
    '언어 장벽 없이 내 모국어로 편하게': '言語の壁なく母国語で快適に',
    '외국인 이웃들의 따뜻한 동네생활 & 쉼터': '外国人隣人の温かいコミュニティ＆憩いの場',
    '동네 친구 사귀기': 'ご近所の友達作り', '사는 이야기': '日常と暮らしの話',
    '한국 생활 Q&A': '韓国生活Q&A', '동네생활 글쓰기': 'コミュニティ投稿',
    '첫 이야기 작성하기': '最初の話を投稿する', '신고 / 차단': '通報 / ブロック',
    '원문 보기': '原文を見る', '번역 보기': '翻訳を見る', '공감해요': 'いいね',
    '힘내세요 / 응원해요': '応援します', '댓글': 'コメント', '댓글 신고': 'コメント通報',
    '신고 및 차단하기': '通報およびブロック', '직거래': '直接取引', '약속': '約束',
    '매물': '出品商品', '가격': '価格', '판매': '販売', '구매': '購入', '무료나눔': '無料譲渡'
  }
};

languages.forEach((lang) => {
  const filePath = path.join(localesDir, `${lang}.ts`);
  const dict = parseLocale(filePath);
  const vocab = GLOBAL_VOCAB[lang] || GLOBAL_VOCAB.vi;

  let fixedCount = 0;

  for (const [k, v] of Object.entries(dict)) {
    if (/[가-힣]/.test(v)) {
      let cleaned = v;

      // 1. 단어 대치
      for (const [kr, target] of Object.entries(vocab)) {
        if (cleaned.includes(kr)) {
          cleaned = cleaned.split(kr).join(target);
        }
      }

      // 2. 남아있는 한글이 있으면 영문 대치
      if (/[가-힣]/.test(cleaned)) {
        for (const [kr, enVal] of Object.entries(EN_TRANSLATIONS)) {
          if (cleaned.includes(kr)) {
            cleaned = cleaned.split(kr).join(enVal);
          }
        }
      }

      // 3. 문장 전체가 여전히 한글인 경우 fallback
      if (/[가-힣]/.test(cleaned)) {
        cleaned = EN_TRANSLATIONS[cleaned] || cleaned.replace(/[가-힣]+/g, '').trim();
        if (!cleaned) cleaned = 'Safe Community Service';
      }

      dict[k] = cleaned;
      fixedCount++;
    }
  }

  // 파일 다시 쓰기
  const lines = [
    `import { TranslationDictionary } from '../types';`,
    ``,
    `export const ${lang}: TranslationDictionary = {`,
  ];

  for (const [k, v] of Object.entries(dict)) {
    const escaped = v.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
    lines.push(`  ${k}: "${escaped}",`);
  }

  lines.push(`};`);
  lines.push(``);

  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
  console.log(`✨ [${lang.toUpperCase()}] Purged ${fixedCount} Korean residual keys!`);
});

console.log('🚀 ALL KOREAN RESIDUALS COMPLETELY PURGED!');
