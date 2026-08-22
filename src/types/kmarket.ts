export type SupportedLanguage =
  | 'ko'
  | 'vi'
  | 'zh'
  | 'km'
  | 'ne'
  | 'uz'
  | 'my'
  | 'id'
  | 'th'
  | 'en'
  | 'si'
  | 'mn'
  | 'bn'
  | 'kk'
  | 'ur';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  countryCode: string;
}

export type ItemCategory =
  | 'all'
  | 'moving_sale' // 귀국자 무빙세일
  | 'appliances'  // 가전제품 (세탁기, 냉장고, 밥솥 등)
  | 'furniture'   // 가구 (침대, 서랍장, 매트리스 등)
  | 'digital'     // 전자기기 (스마트폰, 노트북, 와이파이공유기)
  | 'clothes'     // 의류/패션
  | 'daily'       // 생활/주방용품
  | 'vehicles'    // 자전거/전동킥보드/오토바이
  | 'free_give';  // 무료 나눔 (0원)

export type IndustrialRegion =
  | 'all'
  | 'pyeongtaek' // 평택 포승/고덕 공단
  | 'ansan'      // 안산 반월/시화/원곡동
  | 'hwaseong'   // 화성 향남/남양/발안 공단
  | 'siheung'    // 시흥 정왕/스마트허브
  | 'gumi'       // 구미 국가산업단지
  | 'gimhae'     // 김해 골든루트/주촌
  | 'incheon'    // 인천 남동공단
  | 'gwangju'    // 광주 하남공단
  | 'other';     // 기타 지역

export type ItemStatus = 'selling' | 'reserved' | 'sold';

export interface KMarketItem {
  id: string;
  seller_id: string;
  seller_name: string;
  seller_phone?: string;
  seller_country: string; // 국가 코드 (VN, NP, TH, MM, KH, MN, UZ, PH, ID, LK, BD, CN, RU, KR 등)
  seller_country_flag: string;
  title: string;
  description: string;
  price: number; // 0이면 무료 나눔
  original_price?: number; // 정가 (무빙세일 등 할인율 표시용)
  category: ItemCategory;
  images: string[];
  region: string; // 표시용 지역명 (예: 평택 포승공단 기숙사 2동 앞)
  industrial_zone: IndustrialRegion; // 공단 필터용
  latitude?: number; // 위도 (지도 핀 위치)
  longitude?: number; // 경도 (지도 핀 위치)
  address?: string; // 도로명/지번 상세 주소
  location_detail?: string; // 직거래 만남 장소 랜드마크 설명
  status: ItemStatus;
  reserved_to_user_id?: string; // 예약된 구매자 ID
  reserved_to_user_name?: string; // 예약된 구매자 이름
  sold_to_user_id?: string; // 거래 완료된 최종 구매자 ID
  sold_to_user_name?: string; // 거래 완료된 최종 구매자 이름
  boosted_at?: string; // 끌어올리기한 일시
  is_price_dropped?: boolean; // 가격 인하 여부
  drop_discount_rate?: number; // 인하 할인율 (%)
  view_count: number;
  like_count: number;
  is_moving_sale?: boolean; // 귀국 D-day 무빙세일 여부
  moving_d_day?: number; // 귀국까지 남은 일수 (예: D-5)
  source_lang?: SupportedLanguage; // 등록 시 작성 언어
  translations?: Record<string, { title: string; description: string }>; // 다국어 캐시
  created_at: string;
  updated_at: string;
}

export interface KMarketChat {
  id: string;
  item_id: string;
  item?: KMarketItem;
  buyer_id: string;
  buyer_name: string;
  buyer_country: string;
  buyer_flag: string;
  buyer_lang: SupportedLanguage;
  seller_id: string;
  seller_name: string;
  seller_country: string;
  seller_flag: string;
  seller_lang: SupportedLanguage;
  last_message: string;
  last_message_at: string;
  unread_count: number;
  created_at: string;
}

export interface AppointmentData {
  id: string;
  place_name: string; // 랜드마크명 (예: 포승공단 GS25 앞)
  landmark_detail: string; // 상세 위치 (예: 기숙사 2동 맞은편 편의점)
  address: string; // 도로명/지번 주소
  lat: number;
  lng: number;
  meet_time: string; // 약속 일시 (ISO String)
  remind_1hour_before: boolean;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
}

export interface KMarketMessage {
  id: string;
  chat_id: string;
  sender_id: string;
  sender_type: 'buyer' | 'seller';
  original_text: string;
  translated_text?: string;
  source_lang: SupportedLanguage;
  target_lang: SupportedLanguage;
  is_read: boolean;
  appointment_data?: AppointmentData; // 직거래 지도 핀 약속 데이터
  created_at: string;
}

export interface TaxRefundEstimate {
  workPeriodYears: number;
  monthlySalaryWon: number;
  estimatedRefundWon: number;
  nationalTaxWon: number;
  localTaxWon: number;
}

export interface ReviewTag {
  id: string;
  type: 'positive' | 'negative';
  labelKey: string;
  icon: string;
  points: number; // 점수 변동 (+0.5 or -0.5)
}

export interface TransactionReview {
  id: string;
  item_id: string;
  item_title: string;
  reviewer_id: string;
  reviewer_name: string;
  reviewer_country: string;
  reviewer_flag: string;
  target_user_id: string;
  rating_type: 'good' | 'great' | 'bad';
  selected_tag_ids: string[];
  comment?: string;
  created_at: string;
}

export interface UserTrustProfile {
  user_id: string;
  user_name: string;
  country: string;
  flag: string;
  manner_temp: number; // 기본 36.5℃
  response_rate: number; // 응답률 (예: 98%)
  trade_count: number; // 거래 건수
  is_verified_worker: boolean; // 외국인 근로자/비자 인증 여부
  is_verified_dormitory: boolean; // 기숙사/공단 인증 여부
  positive_tags_summary: { tag_id: string; count: number }[];
  recent_reviews: TransactionReview[];
}

export type ReportReasonType =
  | 'scam_fraud'         // 사기 의심 (선입금 / 외부 메신저 유도)
  | 'nsfw_nudity'        // 음란물 / 선정적인 사진 / 성인물
  | 'bad_manner_abuse'   // 비매너 / 욕설 / 성희롱
  | 'fake_item_photos'   // 허위 매물 / 가짜 사진
  | 'prohibited_items'   // 판매 금지 품목 (주류, 담배, 불법 알선 등)
  | 'no_show_flake'      // 직거래 약속 노쇼
  | 'other';             // 기타 사유

export interface UserReportData {
  id: string;
  reporter_id: string;
  reporter_name: string;
  target_user_id: string;
  target_user_name: string;
  item_id?: string;
  item_title?: string;
  reason_type: ReportReasonType;
  details: string;
  block_user: boolean;
  created_at: string;
}

export interface KeywordAlert {
  id: string;
  keyword: string;                  // 알림 받을 단어 (예: "세탁기", "아이폰", "0원", "밥솥")
  industrial_zone: IndustrialRegion; // 알림 받을 공단 필터 ('all', 'pyeongtaek', 'ansan' 등)
  min_price?: number;               // 최소 가격 필터
  max_price?: number;               // 최대 가격 필터
  is_active: boolean;               // 알림 활성화 여부
  notify_by_sms: boolean;           // 알리고 SMS / 알림톡 알림 여부
  matched_count: number;            // 매칭된 매물 개수
  created_at: string;
}

export type NotificationType =
  | 'keyword'      // 키워드 등록 매칭
  | 'chat'         // 1:1 번역 채팅 도착
  | 'price_drop'   // 찜한 상품 가격 인하
  | 'appointment'  // 직거래 약속 리마인더
  | 'system';      // 시스템/세무 공지

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  item_id?: string;
  item_image?: string;
  chat_id?: string;
  is_read: boolean;
  created_at: string;
}

export interface AuthedUserData {
  userId: string;
  userName: string;
  nickname?: string;
  phone: string;
  telecom?: string;
  country: string;
  visaType?: string;
  stayExpiryDate?: string;
  dormitory?: string;
  authMethod: 'ocr' | 'manual';
  isOcrVerified: boolean;
  isPhoneVerified: boolean;
}

export type FeedbackCategory =
  | 'translation_error'   // 🌐 번역 / 언어 오류 제보
  | 'location_request'     // 📍 공단 / 직거래 장소 추가
  | 'security_improve'     // 🛡️ 사기 방지 / 안심 거래 개선
  | 'finance_service'      // 💰 세무 / 대출 / 금융 요청
  | 'bug_report'           // 📱 앱 오류 / 화면 버그 제보
  | 'general_suggestion';  // 💬 기타 자유 건의 및 칭찬

export interface FeedbackItem {
  id: string;
  user_id: string;
  user_name: string;
  country: string;
  category: FeedbackCategory;
  content: string;
  contact_info?: string;
  status: 'pending' | 'reviewing' | 'resolved';
  created_at: string;
}
