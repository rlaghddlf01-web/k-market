import { SupportedLanguage } from './kmarket';

export type CommunityCategory =
  | 'friends'       // 🤝 동네 친구 사귀기 (1순위)
  | 'daily_healing' // ☕ 사는 이야기 & 힐링 공감
  | 'qna'           // ❓ 한국 생활 무엇이든 Q&A
  | 'tips'          // 🏠 동네 꿀팁 & 생활 정보
  | 'visa'          // 📄 비자 / 행정 / 서류 팁
  | 'food_mart';    // 🍱 고향 음식점 & 마트 추천

export interface CommunityCategoryOption {
  id: CommunityCategory;
  labelKo: string;
  icon: string;
  descKo: string;
  color: string;
}

export const COMMUNITY_CATEGORIES: CommunityCategoryOption[] = [
  {
    id: 'friends',
    labelKo: '동네 친구 사귀기',
    icon: '🤝',
    descKo: '밥친구, 언어교환, 산책/운동, 고향 친구 모임',
    color: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  },
  {
    id: 'daily_healing',
    labelKo: '사는 이야기 & 힐링',
    icon: '☕',
    descKo: '타향살이 속마음, 고향 생각, 따뜻한 위로와 응원',
    color: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
  },
  {
    id: 'qna',
    labelKo: '한국 생활 Q&A',
    icon: '❓',
    descKo: '쓰레기 분리수거, 종량제 봉투, 주민센터, 은행',
    color: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  },
  {
    id: 'tips',
    labelKo: '동네 꿀팁 & 생활정보',
    icon: '🏠',
    descKo: '다이소/마트 위치, 주말 병원, 가성비 미용실',
    color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  },
  {
    id: 'visa',
    labelKo: '비자 / 행정 팁',
    icon: '📄',
    descKo: '체류 연장 서류 팁, 외국인등록증 재발급 후기',
    color: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20',
  },
  {
    id: 'food_mart',
    labelKo: '고향 맛집 & 마트',
    icon: '🍱',
    descKo: '아시안 마트 위치, 현지 느낌 고향 식당 추천',
    color: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
  },
];

export interface CommunityPost {
  id: string;
  user_id: string;
  user_name: string;
  user_country: string;
  user_flag: string;
  category: CommunityCategory;
  title: string;
  content: string;
  images: string[]; // 최대 5장 WebP 압축 사진 URL
  region: string; // 예: "경기 평택시", "경기 안산시", "전국"
  industrial_zone?: string;
  latitude?: number;
  longitude?: number;
  source_lang: SupportedLanguage;
  translations?: Record<string, { title: string; content: string }>; // 17개국어 번역 캐시
  like_count: number;
  cheer_count: number; // 힘내세요/위로 카운트
  comment_count: number;
  view_count: number;
  is_hidden: boolean; // 관리자 블라인드 여부
  created_at: string;
  updated_at: string;
}

export interface CommunityComment {
  id: string;
  post_id: string;
  user_id: string;
  user_name: string;
  user_country: string;
  user_flag: string;
  content: string;
  source_lang: SupportedLanguage;
  translations?: Record<string, string>; // 17개국어 번역 캐시 { ko: "댓글", vi: "...", ... }
  is_hidden: boolean;
  created_at: string;
}

export type CommunityReactionType = 'like' | 'cheer' | 'great';

export interface CommunityReaction {
  id: string;
  post_id: string;
  user_id: string;
  reaction_type: CommunityReactionType;
  created_at: string;
}

export interface CommunityReport {
  id: string;
  reporter_id: string;
  reporter_name: string;
  target_type: 'post' | 'comment' | 'user';
  target_id: string;
  target_user_id: string;
  target_user_name: string;
  reason_type: 'spam' | 'abuse' | 'illegal' | 'scam' | 'other';
  reason_detail?: string;
  status: 'pending' | 'hidden' | 'banned' | 'dismissed';
  created_at: string;
}
