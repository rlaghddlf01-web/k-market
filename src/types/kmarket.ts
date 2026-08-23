export type SupportedLanguage =
  | 'ko'
  | 'vi'
  | 'zh'
  | 'en'
  | 'ja'
  | 'ru'
  | 'th'
  | 'uz'
  | 'km'
  | 'mn'
  | 'ne'
  | 'id'
  | 'my'
  | 'si'
  | 'kk'
  | 'bn'
  | 'ur'
  | 'tl';

export type LanguageCode = SupportedLanguage;

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  countryCode: string;
}

export interface UserLocationSettings {
  locationName: string;
  radiusKm: 1 | 3 | 10;
  coords: {
    lat: number;
    lng: number;
  };
  isGpsVerified: boolean;
  updatedAt?: string;
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
  | 'radius_1'   // 내 주변 1km 이내
  | 'radius_3'   // 내 주변 3km 이내
  | 'radius_10'  // 내 주변 10km 이내
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
  seller_country: string;
  seller_country_flag: string;
  title: string;
  description: string;
  price: number;
  original_price?: number;
  category: ItemCategory;
  images: string[];
  region: string;
  industrial_zone: IndustrialRegion;
  address?: string;
  latitude?: number;
  longitude?: number;
  status: ItemStatus;
  reserved_to_user_id?: string;
  reserved_to_user_name?: string;
  sold_to_user_id?: string;
  sold_to_user_name?: string;
  boosted_at?: string;
  is_price_dropped?: boolean;
  drop_discount_rate?: number;
  view_count: number;
  like_count: number;
  is_moving_sale?: boolean;
  moving_d_day?: number;
  source_lang?: SupportedLanguage;
  translations?: Partial<Record<SupportedLanguage, { title: string; description: string }>>;
  created_at: string;
  updated_at: string;
}

export interface KMarketMessage {
  id: string;
  sender_id: string;
  sender_name?: string;
  sender_country?: string;
  sender_country_flag?: string;
  sender_type?: 'seller' | 'buyer' | 'me' | 'other';
  text?: string;
  original_text?: string;
  translated_text?: string;
  source_lang: SupportedLanguage;
  target_lang: SupportedLanguage;
  created_at: string;
  chat_id?: string;
  is_read?: boolean;
  is_appointment?: boolean;
  appointment_info?: {
    time: string;
    place: string;
    confirmed: boolean;
  };
}

export interface KMarketChat {
  id: string;
  item_id: string;
  item_title?: string;
  item_price?: number;
  item_image?: string;
  item?: KMarketItem;
  seller_id: string;
  seller_name: string;
  seller_country: string;
  seller_country_flag?: string;
  seller_flag?: string;
  seller_lang?: SupportedLanguage;
  buyer_id: string;
  buyer_name: string;
  buyer_country: string;
  buyer_country_flag?: string;
  buyer_flag?: string;
  buyer_lang?: SupportedLanguage;
  last_message: string;
  last_message_at: string;
  unread_count: number;
  messages?: KMarketMessage[];
  status?: 'active' | 'completed' | 'cancelled';
  appointment_time?: string;
  appointment_place?: string;
  appointment_confirmed?: boolean;
  created_at?: string;
}

export interface KeywordAlert {
  id: string;
  user_id?: string;
  keyword: string;
  industrial_zone?: string;
  matched_count?: number;
  notify_by_sms?: boolean;
  is_active?: boolean;
  created_at: string;
}

export type NotificationType = 'chat' | 'keyword' | 'appointment' | 'system' | 'price_drop';

export interface AppNotification {
  id: string;
  user_id?: string;
  title: string;
  body?: string;
  message?: string;
  item_id?: string;
  item_image?: string;
  chat_id?: string;
  type: NotificationType;
  data?: any;
  is_read: boolean;
  created_at: string;
}

export interface AuthedUserData {
  userId: string;
  userName: string;
  nickname: string;
  phone: string;
  country: string;
  visaType: string;
  stayExpiryDate: string;
  telecom: string;
  dormitory: string;
  isVerified: boolean;
  mannerTemp: number;
  isSeller: boolean;
  savedLikes?: string[];
  recentSearches?: string[];
}

export type FeedbackCategory =
  | 'bug'
  | 'feature'
  | 'praise'
  | 'other'
  | 'translation_error'
  | 'location_request'
  | 'security_improve'
  | 'finance_service'
  | 'bug_report'
  | 'general_suggestion';

export interface FeedbackItem {
  id: string;
  user_id: string;
  user_name: string;
  user_country?: string;
  country?: string;
  category: FeedbackCategory;
  message?: string;
  content?: string;
  contact?: string;
  contact_info?: string;
  created_at: string;
  status: 'pending' | 'reviewing' | 'resolved';
}

export interface ReviewTag {
  id: string;
  label: string;
  count: number;
  isPositive: boolean;
}

export interface TransactionReview {
  id: string;
  reviewerId: string;
  reviewerName: string;
  reviewerCountry: string;
  reviewerCountryFlag: string;
  itemId: string;
  itemTitle: string;
  rating: number;
  tags: string[];
  comment?: string;
  createdAt: string;
}

export interface UserTrustProfile {
  userId: string;
  userName: string;
  country: string;
  countryFlag: string;
  mannerTemp: number;
  isVerified: boolean;
  verificationBadge: string;
  tradeCount: number;
  positiveCount: number;
  negativeCount: number;
  responseRate: number;
  tags: ReviewTag[];
  reviews: TransactionReview[];
}

export interface AppointmentData {
  id: string;
  chat_id?: string;
  item_id?: string;
  item_title?: string;
  seller_id?: string;
  seller_name?: string;
  buyer_id?: string;
  buyer_name?: string;
  date_time?: string;
  meet_time?: string;
  location_name?: string;
  place_name?: string;
  location_address?: string;
  address?: string;
  landmark_detail?: string;
  lat?: number;
  lng?: number;
  remind_1hour_before?: boolean;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at?: string;
}

export type ReportReasonType =
  | 'prepayment_scam'
  | 'different_item'
  | 'no_show'
  | 'rude_behavior'
  | 'illegal_item'
  | 'other'
  | 'scam_fraud'
  | 'nsfw_nudity'
  | 'bad_manner_abuse'
  | 'fake_item_photos'
  | 'prohibited_items'
  | 'no_show_flake';

export interface UserReportData {
  id: string;
  reporter_id: string;
  reporter_name: string;
  target_user_id: string;
  target_user_name: string;
  chat_id?: string;
  item_id?: string;
  item_title?: string;
  reason_type: ReportReasonType;
  details: string;
  evidence_images?: string[];
  block_user?: boolean;
  created_at: string;
  status?: 'pending' | 'reviewing' | 'resolved' | 'banned' | 'dismissed' | 'suspended';
}
