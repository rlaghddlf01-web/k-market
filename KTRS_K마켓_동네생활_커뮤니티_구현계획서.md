# 🌟 KTRS K-마켓 [15개국어 외국인 동네생활 커뮤니티 & 힐링 쉼터] 구현 계획서

## 1. 📌 프로젝트 개요 및 기획 배경

### 1.1 기획 배경
- **타향살이의 외로움 해소**: 낯선 한국에서 언어 장벽과 외로움으로 고립감을 느끼는 외국인 근로자, 유학생, 다문화 가족을 위한 따뜻한 소통 공간 조성.
- **한국 생활 적응 지원**: 쓰레기 배출, 비자 연장 서류, 주말 병원 등 생활 속 막막함을 15개국어 실시간 번역으로 이웃들과 편안하게 묻고 답함.
- **플랫폼 활성화 (DAU 극대화)**: 중고거래를 하지 않는 날에도 **"동네 친구를 사귀고 사는 이야기를 나누기 위해"** 매일 방문하는 필수 라이프스타일 슈퍼앱으로 확장.

---

## 2. 💖 6대 핵심 카테고리 구조

| 번호 | 카테고리명 | 아이콘 | 주요 소통 주제 |
| :---: | :--- | :---: | :--- |
| **1** | **동네 친구 사귀기** | 🤝 | **"주말에 같이 밥 먹을 친구 구해요"**, 한국어-모국어 언어교환, 산책/운동 메이트, 고향 친구 모임 |
| **2** | **사는 이야기 & 힐링 공감** | ☕ | **"오늘 고향 부모님과 통화했는데 눈물이 났어요", "회사에서 인정받았어요!" ➡️ 서로 '힘내요/공감해요' 따뜻한 응원** |
| **3** | **한국 생활 Q&A** | ❓ | 쓰레기 분리수거, 종량제 봉투 구매처, 주민센터 서류 발급, 대중교통 이용법 |
| **4** | **동네 꿀팁 & 생활 정보** | 🏠 | 내 동네 다이소/이마트/식자재마트 위치, 주말/야간 진료 병원, 가성비 미용실 |
| **5** | **비자 / 행정 / 서류 팁** | 📄 | 체류기간 연장 준비 서류, 외국인등록증 재발급, 은행 계좌 개설 실제 후기 |
| **6** | **고향 음식점 & 마트 추천** | 🍱 | 동네 아시안 마트 위치, 현지 느낌 나는 진짜 고향 식당 추천 사진 공유 |

---

## 3. 🛠️ 핵심 기술 스펙 & 파이프라인

### 3.1 📸 최대 5장 다중 사진 첨부 & 브라우저 실시간 95% 압축 (`imageCompressor.ts`)
- **최대 5장 선택 지원**: 일상, 친구 모임, 음식 사진을 최대 5장까지 동시 선택.
- **클라이언트 사이드 Canvas / WebP 자동 변환**:
  - 10MB 고용량 사진 5장(총 50MB) ➡️ 0.3초 만에 장당 **200KB~300KB 고화질 WebP(총 1MB 미만)**로 95% 자동 압축.
  - **효과**: 스마트폰 데이터 절약, 업로드 렉 0초, 서버 스토리지 및 트래픽 비용 90% 이상 절감.

### 3.2 🌐 15개국어 Gemini 1.5 Flash 양방향 실시간 자동 번역
- 베트남 유저가 베트남어로 글을 쓰고 한국인/네팔인이 각자의 언어로 댓글을 달아도,
- **각 유저의 화면에는 본인의 모국어로 실시간 자동 번역**되어 언어 장벽 없이 따뜻한 온기를 나눔.

### 3.3 ❤️ 3대 따뜻한 감성 리액션
- 단순 좋아요 외에 **`❤️ 공감해요`**, **`💪 힘내세요`**, **`👍 최고예요`** 3가지 감성 리액션 뱃지 제공.

### 3.4 📍 내 위치 GPS 반경 필터 연동
- 상단 GPS 반경(1km, 3km, 10km, 전국) 설정과 연동되어 내 주변 동네 소식 우선 노출.

---

## 4. 🗄️ 데이터베이스 스키마 설계 (Supabase PostgreSQL)

```sql
-- 1. 동네생활 커뮤니티 게시글 테이블
CREATE TABLE IF NOT EXISTS kmarket_community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_country TEXT NOT NULL,
  user_flag TEXT NOT NULL,
  category TEXT NOT NULL, -- 'friends', 'daily_healing', 'qna', 'tips', 'visa', 'food_mart'
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  images TEXT[] DEFAULT '{}', -- 최대 5장 압축 이미지 URL 배열
  region TEXT NOT NULL,
  industrial_zone TEXT DEFAULT 'all',
  latitude NUMERIC,
  longitude NUMERIC,
  source_lang TEXT DEFAULT 'ko',
  translations JSONB DEFAULT '{}', -- 15개국어 번역 캐시
  like_count INTEGER DEFAULT 0,
  cheer_count INTEGER DEFAULT 0, -- 힘내세요 카운트
  comment_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 동네생활 댓글 테이블
CREATE TABLE IF NOT EXISTS kmarket_community_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES kmarket_community_posts(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_country TEXT NOT NULL,
  user_flag TEXT NOT NULL,
  content TEXT NOT NULL,
  source_lang TEXT DEFAULT 'ko',
  translations JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 실시간 리액션 테이블
CREATE TABLE IF NOT EXISTS kmarket_community_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES kmarket_community_posts(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  reaction_type TEXT NOT NULL, -- 'like', 'cheer', 'great'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, user_id, reaction_type)
);
```

---

## 5. 🧩 프론트엔드 모듈 분리 아키텍처 (Antigravity 철칙 준수)

기존 코드에 덕지덕지 붙이지 않고, 명확한 단일 책임 원칙으로 새로운 컴포넌트를 분리합니다:

1. **`src/components/community/KMarketCommunityMain.tsx`**: 동네생활 상단 탭, 6대 카테고리 필터 바, 피드 리스트 종합 컨테이너.
2. **`src/components/community/KMarketCommunityPostCard.tsx`**: 5장 사진 캐러셀, 작성자 국기/이름, 실시간 번역 보기, 공감/힘내요/댓글 수 뱃지.
3. **`src/components/community/KMarketCommunityPostDetailModal.tsx`**: 게시글 본문, 5장 고화질 뷰어, 15개국어 실시간 번역 댓글 작성/조회.
4. **`src/components/community/KMarketCommunityCreateModal.tsx`**: 6대 카테고리 선택, 글 작성, **5장 다중 사진 선택 & 자동 압축 업로드 뷰어**.
5. **`src/lib/imageCompressor.ts`**: 브라우저 기반 고화질 초경량 WebP 0.3초 실시간 압축 엔진.

---

## 6. 🚀 단계별 구현 로드맵

- [ ] **1단계: 브라우저 초고속 5장 사진 압축 엔진 구축 (`imageCompressor.ts`)**
- [ ] **2단계: 동네생활 커뮤니티 데이터 타입 및 목업 시드 데이터 정의 (`src/types/community.ts`, `src/lib/communityMockData.ts`)**
- [ ] **3단계: 동네생활 게시글 카드, 상세 모달, 댓글 컴포넌트 개발**
- [ ] **4단계: 최대 5장 사진 첨부 글 작성 모달 개발 (`KMarketCommunityCreateModal.tsx`)**
- [ ] **5단계: 메인 헤더 탭 연동 (`[🛒 중고/무빙마켓]` ↔ `[🗣️ 동네생활]` 스위처)**
- [ ] **6단계: 빌드 검증 (`npm run build`) 및 15개국어 실시간 번역 동작 테스트**
