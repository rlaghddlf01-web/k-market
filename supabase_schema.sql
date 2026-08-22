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
-- 🌟 7. 사용자 신뢰도/매너온도 & 외국인등록증(OCR/수기) 인증 프로필
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.kmarket_user_profiles (
    user_id TEXT PRIMARY KEY,
    user_name TEXT NOT NULL,
    phone TEXT,                                           -- 연락처 (010-XXXX-XXXX)
    telecom TEXT,                                         -- 통신사 (SKT, KT, LGU+, 알뜰폰 등)
    email TEXT,                                           -- 이메일 계정
    country TEXT DEFAULT 'VN',                            -- 국적 코드 (VN, NP, TH, MN 등)
    flag TEXT DEFAULT '🇻🇳',                                -- 국기 이모지
    auth_method TEXT DEFAULT 'manual' CHECK (auth_method IN ('ocr', 'manual', 'easytax_sso')), -- 인증 방식
    arc_number_masked TEXT,                               -- 외국인등록번호 마스킹 (예: 950101-5******)
    arc_number_hash TEXT,                                 -- 고유 식별 암호화 해시 (중복 가입 방지)
    arc_image_url TEXT,                                   -- 외국인등록증 OCR 촬영 스캔 이미지 URL
    visa_type TEXT DEFAULT 'E-9',                         -- 비자 종류 (E-9, E-7, F-4, H-2 등)
    stay_expiry_date DATE,                                -- 체류기간 만료일 (D-Day 무빙세일 계산용)
    dormitory_name TEXT,                                  -- 공단 기숙사명 (예: 포승공단 2기숙사)
    industrial_zone TEXT DEFAULT 'pyeongtaek',            -- 소속 공단 키
    manner_temp NUMERIC(4, 1) DEFAULT 36.5,               -- K-Trust 매너온도 (기본 36.5℃)
    response_rate INTEGER DEFAULT 100,                    -- 응답률 (%)
    trade_count INTEGER DEFAULT 0,                        -- 거래 건수
    is_ocr_verified BOOLEAN DEFAULT false,                -- 실물 외국인등록증 OCR 검증 완료 여부
    is_phone_verified BOOLEAN DEFAULT false,              -- 통신사/알리고 SMS 본인인증 완료 여부
    is_verified_worker BOOLEAN DEFAULT true,              -- 외국인 근로자 인증 뱃지
    is_verified_dormitory BOOLEAN DEFAULT false,          -- 공단 기숙사 인증 뱃지
    easytax_user_id TEXT,                                 -- 이지텍스(EasyTax) SSO 연동 통합 유저 ID
    positive_tags_summary JSONB DEFAULT '[]'::jsonb,      -- 칭찬 태그 통계
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 💰 8. KTRS 이지텍스 184만원 세금 환급 연계 신청 관리 (kmarket_tax_refund_leads)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.kmarket_tax_refund_leads (
    id TEXT PRIMARY KEY DEFAULT ('tax-' || gen_random_uuid()::text),
    user_id TEXT REFERENCES public.kmarket_user_profiles(user_id) ON DELETE SET NULL,
    user_name TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'VN',
    phone TEXT NOT NULL,
    arc_number TEXT NOT NULL,                             -- 외국인등록번호 (국세청 조회용)
    visa_type TEXT NOT NULL DEFAULT 'E-9',
    work_period_years NUMERIC(3, 1) NOT NULL DEFAULT 3.0, -- 한국 근무 연수 (년)
    monthly_salary NUMERIC NOT NULL DEFAULT 2800000,      -- 월 평균 급여 (원)
    estimated_refund NUMERIC NOT NULL DEFAULT 1840000,    -- 예상 환급액 (원)
    national_tax_refund NUMERIC DEFAULT 1600000,          -- 국세(소득세) 환급액
    local_tax_refund NUMERIC DEFAULT 240000,              -- 지방소득세 환급액
    fee_type TEXT NOT NULL DEFAULT 'post_payment_22',     -- 'post_payment_22' (선결제 0원 후불제 22%)
    fee_rate NUMERIC DEFAULT 22.0,                        -- 수수료율 (22%)
    estimated_fee NUMERIC DEFAULT 404800,                 -- 성공 보수 예상 수수료 (원)
    ocr_id_card_url TEXT,                                 -- 신분증 OCR 증빙 사본 이미지
    auth_method TEXT DEFAULT 'ocr',                       -- 'ocr' vs 'manual'
    status TEXT NOT NULL DEFAULT 'applied' CHECK (status IN ('applied', 'reviewing', 'nts_submitted', 'approved', 'paid', 'rejected')),
    admin_notes TEXT,                                     -- KTRS 세무 담당자 검토 메모
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_kmarket_tax_leads_user ON public.kmarket_tax_refund_leads(user_id);
CREATE INDEX IF NOT EXISTS idx_kmarket_tax_leads_status ON public.kmarket_tax_refund_leads(status);
CREATE INDEX IF NOT EXISTS idx_kmarket_tax_leads_phone ON public.kmarket_tax_refund_leads(phone);

-- ==============================================================================
-- 📱 9. 알리고(Aligo) SMS / 본인인증 / 알림톡 발송 로그 (kmarket_sms_logs)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.kmarket_sms_logs (
    id TEXT PRIMARY KEY DEFAULT ('sms-' || gen_random_uuid()::text),
    receiver_phone TEXT NOT NULL,                         -- 수신 휴대폰 번호
    receiver_name TEXT,                                   -- 수신자 이름
    msg_type TEXT NOT NULL CHECK (msg_type IN ('auth_code', 'appointment_reminder', 'scam_alert', 'tax_update', 'moving_sale')),
    auth_code TEXT,                                       -- 6자리 SMS 인증번호
    msg_content TEXT NOT NULL,                            -- 발송 메시지 본문
    is_verified BOOLEAN DEFAULT false,                    -- 인증번호 확인 성공 여부
    aligo_mid TEXT,                                       -- 알리고 발송 고유 번호 (Message ID)
    status TEXT NOT NULL DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_kmarket_sms_logs_phone ON public.kmarket_sms_logs(receiver_phone);
CREATE INDEX IF NOT EXISTS idx_kmarket_sms_logs_type ON public.kmarket_sms_logs(msg_type);

-- ==============================================================================
-- ⭐ 10. 1:1 거래 후기 및 평가 테이블 (kmarket_reviews)
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

-- ==============================================================================
-- ⭐ 11. 직거래 만남 약속 & 지도 핀 공유 테이블 (kmarket_appointments)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.kmarket_appointments (
    id TEXT PRIMARY KEY DEFAULT ('apt-' || gen_random_uuid()::text),
    chat_id TEXT REFERENCES public.kmarket_chats(id) ON DELETE CASCADE,
    item_id TEXT REFERENCES public.kmarket_items(id) ON DELETE CASCADE,
    creator_id TEXT NOT NULL,
    creator_name TEXT NOT NULL,
    partner_id TEXT NOT NULL,
    partner_name TEXT NOT NULL,
    place_name TEXT NOT NULL,          -- 예: "포승공단 GS25 편의점 앞"
    landmark_detail TEXT,              -- 예: "기숙사 2동 맞은편, 24시간 가로등 밝은 곳"
    address TEXT NOT NULL,             -- 예: "경기 평택시 포승읍 포승공단로 117"
    lat DOUBLE PRECISION NOT NULL,     -- 위도 (Latitude)
    lng DOUBLE PRECISION NOT NULL,     -- 경도 (Longitude)
    meet_time TIMESTAMP WITH TIME ZONE NOT NULL, -- 약속 일시
    remind_1hour_before BOOLEAN DEFAULT true,     -- 1시간 전 모국어 푸시 알림 여부
    status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 메시지 테이블에 약속 데이터 JSONB 컬럼 추가 (존재하지 않을 경우)
ALTER TABLE public.kmarket_messages ADD COLUMN IF NOT EXISTS appointment_data JSONB;

CREATE INDEX IF NOT EXISTS idx_kmarket_appointments_chat ON public.kmarket_appointments(chat_id);
CREATE INDEX IF NOT EXISTS idx_kmarket_appointments_meet_time ON public.kmarket_appointments(meet_time);

-- ==============================================================================
-- 🚨 12. 신고 내역 관리 테이블 (kmarket_reports)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.kmarket_reports (
  id TEXT PRIMARY KEY DEFAULT ('rep-' || gen_random_uuid()::text),
  reporter_id TEXT NOT NULL,
  reporter_name TEXT NOT NULL,
  target_user_id TEXT NOT NULL,
  target_user_name TEXT NOT NULL,
  item_id TEXT,
  item_title TEXT,
  reason_type TEXT NOT NULL,                         -- 'scam_fraud', 'nsfw_nudity', 'bad_manner_abuse', 'fake_item_photos', 'prohibited_items', 'no_show_flake', 'other'
  details TEXT,
  evidence_urls TEXT[] DEFAULT '{}',                 -- 신고 당시 첨부/참조된 이미지 URL 배열
  ai_analysis JSONB DEFAULT '{}'::jsonb,             -- AI가 자동 분석한 위험도 점수 및 판독 요약 (confidence_score, detected_violations, auto_action)
  block_user BOOLEAN DEFAULT TRUE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'banned', 'suspended', 'dismissed', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

-- ==============================================================================
-- 🚫 13. 사용자 차단 테이블 (kmarket_blocks)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.kmarket_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blocker_id TEXT NOT NULL,
  blocked_user_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(blocker_id, blocked_user_id)
);

CREATE INDEX IF NOT EXISTS idx_kmarket_reports_target ON public.kmarket_reports(target_user_id);
CREATE INDEX IF NOT EXISTS idx_kmarket_blocks_blocker ON public.kmarket_blocks(blocker_id);

-- ==============================================================================
-- 🌐 14. 실시간 16대 유입 채널 트래픽 로그 테이블 (kmarket_traffic_logs)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.kmarket_traffic_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_key TEXT NOT NULL,                          -- 'tiktok', 'facebook', 'zalo', 'line', 'telegram', 'offline_qr', 'youtube', 'direct' 등
  channel_name TEXT NOT NULL,
  source_url TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  referrer TEXT,
  user_ip_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_kmarket_traffic_channel ON public.kmarket_traffic_logs(channel_key);
CREATE INDEX IF NOT EXISTS idx_kmarket_traffic_created_at ON public.kmarket_traffic_logs(created_at DESC);

-- ==============================================================================
-- 🔒 15. RLS (Row Level Security) 정책 일괄 적용
-- ==============================================================================
ALTER TABLE public.kmarket_user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kmarket_tax_refund_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kmarket_sms_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kmarket_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kmarket_appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kmarket_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kmarket_blocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public user profiles are viewable by everyone" ON public.kmarket_user_profiles FOR SELECT USING (true);
CREATE POLICY "Anyone can upsert user profiles" ON public.kmarket_user_profiles FOR ALL USING (true);

CREATE POLICY "Users can view and insert tax leads" ON public.kmarket_tax_refund_leads FOR ALL USING (true);
CREATE POLICY "Anyone can insert sms logs" ON public.kmarket_sms_logs FOR ALL USING (true);

CREATE POLICY "Public reviews are viewable by everyone" ON public.kmarket_reviews FOR SELECT USING (true);
CREATE POLICY "Anyone can insert reviews" ON public.kmarket_reviews FOR INSERT WITH CHECK (true);

CREATE POLICY "Public appointments are viewable by chat participants" ON public.kmarket_appointments FOR SELECT USING (true);
CREATE POLICY "Anyone can create or update appointments" ON public.kmarket_appointments FOR ALL USING (true);

CREATE POLICY "Anyone can create reports" ON public.kmarket_reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can manage their blocks" ON public.kmarket_blocks FOR ALL USING (true);

-- ==============================================================================
-- ⚡ 15. 실시간 동기화 (Supabase Realtime) 등록
-- ==============================================================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.kmarket_user_profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.kmarket_tax_refund_leads;
ALTER PUBLICATION supabase_realtime ADD TABLE public.kmarket_reviews;
ALTER PUBLICATION supabase_realtime ADD TABLE public.kmarket_appointments;

-- ==============================================================================
-- 🖼️ 16. 스토리지 버킷 및 보안 정책 (kmarket-images, kmarket-id-cards)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('kmarket-images', 'kmarket-images', true),
  ('kmarket-id-cards', 'kmarket-id-cards', false) -- 신분증 사본 프라이빗 버킷
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Access for K-Market Images" ON storage.objects FOR SELECT USING (bucket_id = 'kmarket-images');
CREATE POLICY "Public Upload for K-Market Images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'kmarket-images');
CREATE POLICY "Secure Upload for ID Cards" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'kmarket-id-cards');