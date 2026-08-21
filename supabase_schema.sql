-- ==============================================================================
-- 🌐 KTRS K-Market (외국인 근로자 중고거래 & 무빙세일) Supabase Full Schema
-- ==============================================================================

-- 1. 확장 기능 활성화 (UUID 생성 등)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 📦 1. K-Market 매물 테이블 (kmarket_items)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.kmarket_items (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    seller_id TEXT NOT NULL,
    seller_name TEXT NOT NULL,
    seller_phone TEXT,
    seller_country TEXT DEFAULT 'VN',                     -- 국가 코드 (VN, NP, TH, MM, KH, MN, UZ 등)
    seller_country_flag TEXT DEFAULT '🇻🇳',                 -- 국기 이모지
    title TEXT NOT NULL,                                  -- 매물 제목
    description TEXT NOT NULL,                            -- 매물 설명
    price NUMERIC NOT NULL DEFAULT 0,                     -- 판매 가격 (0원 = 무료 나눔)
    original_price NUMERIC,                               -- 정가 (무빙세일 할인율 표시용)
    category TEXT NOT NULL DEFAULT 'appliances',          -- 'moving_sale', 'appliances', 'furniture', 'digital', 'clothes', 'vehicles', 'free_give'
    images TEXT[] NOT NULL DEFAULT '{}',                  -- 상품 이미지 URL 배열
    region TEXT NOT NULL,                                 -- 표시 지역명 (예: 평택 포승공단, 안산 원곡동)
    industrial_zone TEXT NOT NULL DEFAULT 'other',        -- 공단 필터 키 (pyeongtaek, ansan, hwaseong, siheung, gumi, gimhae, incheon, gwangju, other)
    status TEXT NOT NULL DEFAULT 'selling',               -- 'selling'(판매중), 'reserved'(예약중), 'sold'(판매완료)
    reserved_to_user_id TEXT,                             -- 예약된 구매자 ID
    reserved_to_user_name TEXT,                           -- 예약된 구매자 이름
    sold_to_user_id TEXT,                                 -- 거래 완료된 최종 구매자 ID
    sold_to_user_name TEXT,                               -- 거래 완료된 최종 구매자 이름
    boosted_at TIMESTAMP WITH TIME ZONE,                  -- 최상단 끌어올리기 일시
    is_price_dropped BOOLEAN DEFAULT false,               -- 가격 인하 여부
    drop_discount_rate INTEGER,                           -- 가격 인하율 (%)
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    is_moving_sale BOOLEAN DEFAULT false,                 -- 귀국 D-Day 무빙세일 여부
    moving_d_day INTEGER,                                 -- 귀국까지 남은 일수 (D-Day)
    source_lang TEXT DEFAULT 'ko',                        -- 최초 작성 언어 (ko, vi, ne, th 등 15개국어)
    translations JSONB DEFAULT '{}'::jsonb,               -- 15개 언어 자동 번역 캐시
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 인덱스 생성 (조회 속도 최적화)
CREATE INDEX IF NOT EXISTS idx_kmarket_items_created_at ON public.kmarket_items(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_kmarket_items_category ON public.kmarket_items(category);
CREATE INDEX IF NOT EXISTS idx_kmarket_items_zone ON public.kmarket_items(industrial_zone);
CREATE INDEX IF NOT EXISTS idx_kmarket_items_moving_sale ON public.kmarket_items(is_moving_sale);
CREATE INDEX IF NOT EXISTS idx_kmarket_items_status ON public.kmarket_items(status);
CREATE INDEX IF NOT EXISTS idx_kmarket_items_boosted ON public.kmarket_items(boosted_at DESC NULLS LAST);


-- ==============================================================================
-- 💬 2. K-Market 1:1 채팅방 테이블 (kmarket_chats)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.kmarket_chats (
    id TEXT PRIMARY KEY DEFAULT ('chat-' || gen_random_uuid()::text),
    item_id TEXT REFERENCES public.kmarket_items(id) ON DELETE CASCADE,
    buyer_id TEXT NOT NULL,
    buyer_name TEXT NOT NULL,
    buyer_country TEXT DEFAULT 'KR',
    buyer_flag TEXT DEFAULT '🇰🇷',
    buyer_lang TEXT DEFAULT 'ko',
    seller_id TEXT NOT NULL,
    seller_name TEXT NOT NULL,
    seller_country TEXT DEFAULT 'VN',
    seller_flag TEXT DEFAULT '🇻🇳',
    seller_lang TEXT DEFAULT 'vi',
    last_message TEXT,
    last_message_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    unread_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_kmarket_chats_buyer ON public.kmarket_chats(buyer_id);
CREATE INDEX IF NOT EXISTS idx_kmarket_chats_seller ON public.kmarket_chats(seller_id);
CREATE INDEX IF NOT EXISTS idx_kmarket_chats_item ON public.kmarket_chats(item_id);

-- ==============================================================================
-- 🌐 3. K-Market 1:1 실시간 다국어 번역 메시지 테이블 (kmarket_messages)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.kmarket_messages (
    id TEXT PRIMARY KEY DEFAULT ('msg-' || gen_random_uuid()::text),
    chat_id TEXT REFERENCES public.kmarket_chats(id) ON DELETE CASCADE NOT NULL,
    sender_id TEXT NOT NULL,
    sender_type TEXT NOT NULL CHECK (sender_type IN ('buyer', 'seller')),
    original_text TEXT NOT NULL,
    translated_text TEXT,                                 -- 상대방 언어로 자동 번역된 텍스트
    source_lang TEXT NOT NULL DEFAULT 'auto',
    target_lang TEXT NOT NULL DEFAULT 'ko',
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_kmarket_messages_chat_id ON public.kmarket_messages(chat_id, created_at ASC);

-- ==============================================================================
-- 🔒 4. RLS (Row Level Security) 정책 설정
-- ==============================================================================
ALTER TABLE public.kmarket_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kmarket_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kmarket_messages ENABLE ROW LEVEL SECURITY;

-- kmarket_items RLS: 누구나 조회 및 등록 가능
CREATE POLICY "Public items are viewable by everyone" 
ON public.kmarket_items FOR SELECT USING (true);

CREATE POLICY "Anyone can insert items" 
ON public.kmarket_items FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update items" 
ON public.kmarket_items FOR UPDATE USING (true);

-- kmarket_chats RLS
CREATE POLICY "Chats are viewable and manageable by participants" 
ON public.kmarket_chats FOR ALL USING (true);

-- kmarket_messages RLS
CREATE POLICY "Messages are viewable and insertable by participants" 
ON public.kmarket_messages FOR ALL USING (true);

-- ==============================================================================
-- ⚡ 5. 실시간 동기화 (Supabase Realtime) 활성화
-- ==============================================================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.kmarket_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.kmarket_chats;
ALTER PUBLICATION supabase_realtime ADD TABLE public.kmarket_items;

-- ==============================================================================
-- 🖼️ 6. 스토리지 버킷 생성 (kmarket-images)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('kmarket-images', 'kmarket-images', true)
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- 🌟 7. 사용자 신뢰도/매너온도 프로필 (kmarket_user_profiles)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.kmarket_user_profiles (
    user_id TEXT PRIMARY KEY,
    user_name TEXT NOT NULL,
    country TEXT DEFAULT 'VN',
    flag TEXT DEFAULT '🇻🇳',
    manner_temp NUMERIC(4, 1) DEFAULT 36.5,               -- K-Trust 매너온도 (기본 36.5℃)
    response_rate INTEGER DEFAULT 100,                    -- 응답률 (%)
    trade_count INTEGER DEFAULT 0,                        -- 거래 건수
    is_verified_worker BOOLEAN DEFAULT true,              -- 비자/신분 인증
    is_verified_dormitory BOOLEAN DEFAULT false,          -- 공단 기숙사 인증
    positive_tags_summary JSONB DEFAULT '[]'::jsonb,      -- 칭찬 태그 통계
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- ⭐ 8. 1:1 거래 후기 및 평가 테이블 (kmarket_reviews)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.kmarket_reviews (
    id TEXT PRIMARY KEY DEFAULT ('rev-' || gen_random_uuid()::text),
    item_id TEXT REFERENCES public.kmarket_items(id) ON DELETE CASCADE,
    item_title TEXT NOT NULL,
    reviewer_id TEXT NOT NULL,
    reviewer_name TEXT NOT NULL,
    reviewer_country TEXT DEFAULT 'KR',
    reviewer_flag TEXT DEFAULT '🇰🇷',
    target_user_id TEXT NOT NULL,
    rating_type TEXT NOT NULL CHECK (rating_type IN ('great', 'good', 'bad')),
    selected_tag_ids TEXT[] NOT NULL DEFAULT '{}',
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_kmarket_reviews_target ON public.kmarket_reviews(target_user_id);
CREATE INDEX IF NOT EXISTS idx_kmarket_reviews_item ON public.kmarket_reviews(item_id);

-- RLS 활성화
ALTER TABLE public.kmarket_user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kmarket_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public user profiles are viewable by everyone" 
ON public.kmarket_user_profiles FOR SELECT USING (true);

CREATE POLICY "Anyone can upsert user profiles" 
ON public.kmarket_user_profiles FOR ALL USING (true);

CREATE POLICY "Public reviews are viewable by everyone" 
ON public.kmarket_reviews FOR SELECT USING (true);

CREATE POLICY "Anyone can insert reviews" 
ON public.kmarket_reviews FOR INSERT WITH CHECK (true);

-- Realtime 활성화
ALTER PUBLICATION supabase_realtime ADD TABLE public.kmarket_user_profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.kmarket_reviews;

-- 스토리지 공용 읽기/업로드 정책
CREATE POLICY "Public Access for K-Market Images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'kmarket-images');

CREATE POLICY "Public Upload for K-Market Images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'kmarket-images');