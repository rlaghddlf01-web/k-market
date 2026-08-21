'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useKMarket } from '@/context/KMarketContext';
import { useLanguage } from '@/context/LanguageContext';
import KMarketHeader from './KMarketHeader';
import KMarketTaxBanner from './KMarketTaxBanner';
import KMarketSafetyBanner from './KMarketSafetyBanner';
import KMarketCategoryNav from './KMarketCategoryNav';
import KMarketMovingSaleSection from './KMarketMovingSaleSection';
import KMarketRegionFilter from './KMarketRegionFilter';
import KMarketItemCard from './KMarketItemCard';
import KMarketItemDetail from './KMarketItemDetail';
import KMarketCreatePost from './KMarketCreatePost';
import KMarketChatDrawer from './KMarketChatDrawer';
import KMarketTaxModal from './KMarketTaxModal';
import KMarketFavoritesModal from './KMarketFavoritesModal';
import KMarketAdminReportModal from './KMarketAdminReportModal';
import KMarketAuthModal from './KMarketAuthModal';
import KMarketMyPageModal from './KMarketMyPageModal';
import KMarketKeywordAlertModal from './KMarketKeywordAlertModal';
import KMarketLocationRadiusModal from './KMarketLocationRadiusModal';
import { ShoppingBag, Sparkles, ShieldCheck, Plus, PackageOpen, ShieldAlert } from 'lucide-react';

export default function KMarketMainFeed() {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const {
    items,
    selectedCategory,
    selectedRegion,
    searchQuery,
    isMovingSaleOnly,
    blockedUserIds,
    setIsCreateModalOpen,
    isAuthModalOpen,
    setIsAuthModalOpen,
    isMyPageOpen,
    setIsMyPageOpen,
    isKeywordModalOpen,
    setIsKeywordModalOpen,
    isLocationRadiusModalOpen,
    setIsLocationRadiusModalOpen,
    setAuthedUser,
  } = useKMarket();
  const { t } = useLanguage();

  // 검색 및 필터링 적용된 매물 목록
  const filteredItems = items.filter((item) => {
    // 0. 차단된 사용자 매물 자동 숨김
    if (blockedUserIds.has(item.seller_id)) {
      return false;
    }
    // 1. 카테고리 필터
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    // 2. 공단 지역 필터
    if (selectedRegion !== 'all' && item.industrial_zone !== selectedRegion) {
      return false;
    }
    // 3. 무빙세일 전용 여부
    if (isMovingSaleOnly && !item.is_moving_sale && item.category !== 'moving_sale') {
      return false;
    }
    // 4. 검색어 필터
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchRegion = item.region.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchRegion) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--surface-bg)', color: 'var(--text-primary)' }}>
      {/* 상단 통합 헤더 */}
      <KMarketHeader />

      {/* 메인 콘텐츠 컨테이너 */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-7">
        {/* 1. KTRS 184만원 세무 환급 감성 사진 배너 */}
        <KMarketTaxBanner />

        {/* 2. 🛡️ 외국인 안심 거래 3대 수칙 (사기 방지 쉴드) 웜톤 배너 */}
        <KMarketSafetyBanner />

        {/* 3. 쇼핑몰 스타일 원형 아이콘 카테고리 네비게이션 */}
        <KMarketCategoryNav />

        {/* 4. 귀국자 헐값 급처분 [무빙 세일(Moving Sale)] 전용관 */}
        {!isMovingSaleOnly && selectedCategory === 'all' && !searchQuery && (
          <KMarketMovingSaleSection />
        )}

        {/* 5. 공단별 도보 직거래 필터 */}
        <KMarketRegionFilter />

        {/* 5. 매물 리스트 헤더 */}
        <div className="flex items-center justify-between pt-4 mb-2 px-1">
          <div className="flex items-center gap-2.5">
            <h2 className="text-base sm:text-lg font-extrabold text-[#1f1914] tracking-tight">
              실시간 등록 매물
            </h2>
            <span
              className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#dfd7ce] text-[#5c4f42]"
            >
              {filteredItems.length}개
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#705e4f] font-medium bg-[#f4efe9] px-3 py-1.5 rounded-full border border-[#dfd7ce]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            15개국어 실시간 번역
          </div>
        </div>

        {/* 5. 매물 그리드 */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {filteredItems.map((item) => (
              <KMarketItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="card-premium p-14 text-center my-8 space-y-5">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto" style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #eef2ff 100%)' }}>
              <PackageOpen className="w-9 h-9 text-blue-400" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-slate-800">조건에 맞는 매물이 없습니다</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                필터를 전체로 변경하거나, 첫 번째로 내 중고 물건을 1분 만에 등록해 보세요!
              </p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="btn-primary px-6 py-2.5 text-xs cursor-pointer"
            >
              ✏️ 1분 간편 매물 등록하기
            </button>
          </div>
        )}
      </main>

      {/* 모바일 플로팅 매물 등록 CTA 버튼 */}
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="md:hidden fixed bottom-6 right-5 z-40 text-white p-4 rounded-full flex items-center justify-center active:scale-90 transition-transform cursor-pointer shadow-lg"
        style={{ background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)' }}
        aria-label="Post Item"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* 푸터 영역 */}
      <footer className="mt-20 border-t" style={{ borderColor: 'var(--border-warm)', background: 'rgba(242,237,232,0.7)', backdropFilter: 'blur(10px)' }}>
        <div className="max-w-6xl mx-auto px-4 py-10 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-sm"
                  style={{ background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)' }}
                >
                  K
                </div>
                <span className="text-slate-900 font-black text-base tracking-tight">KTRS K-Market</span>
                <span className="text-[9px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">Zero Fee C2C</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
                대한민국 No.1 외국인 종합 슈퍼앱 KTRS 연계<br />외국인 전용 중고거래 &amp; 무빙세일 플랫폼
              </p>
            </div>

            <div className="flex flex-col gap-2 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>수수료 0원 100% 무료 거래</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>15개국어 실시간 Gemini AI 번역</span>
              </div>
            </div>
          </div>

          <div className="pt-5 border-t border-slate-100 text-[11px] text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p>© 2026 KTRS (Korea Tax &amp; Foreign Resident Service). All rights reserved.</p>
            <div className="flex items-center gap-3">
              <span>공단 직거래 안심 가이드 | 고객센터 1588-0000</span>
              <Link
                href="/admin"
                className="px-2.5 py-1 bg-slate-900 hover:bg-red-950 border border-slate-700 text-slate-400 hover:text-red-300 hover:border-red-500/40 font-bold rounded-lg text-[10px] transition-all flex items-center gap-1 cursor-pointer"
                title="KTRS 관리자 전용 관제 콘솔 페이지"
              >
                <span>관리자 관제 콘솔 (/admin)</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* 모달 & 드로어 컴포넌트들 */}
      <KMarketItemDetail />
      <KMarketCreatePost />
      <KMarketChatDrawer />
      <KMarketTaxModal />
      <KMarketFavoritesModal />
      <KMarketAdminReportModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
      <KMarketAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccessAuth={(userData) => {
          setAuthedUser(userData);
          alert(`[신원인증 완료] ${userData.userName} 님의 ${userData.authMethod === 'ocr' ? '실물 신분증 OCR 검증' : '수기 인증'}이 완료되었습니다.`);
        }}
      />
      <KMarketMyPageModal
        isOpen={isMyPageOpen}
        onClose={() => setIsMyPageOpen(false)}
      />
      <KMarketKeywordAlertModal
        isOpen={isKeywordModalOpen}
        onClose={() => setIsKeywordModalOpen(false)}
      />
      <KMarketLocationRadiusModal
        isOpen={isLocationRadiusModalOpen}
        onClose={() => setIsLocationRadiusModalOpen(false)}
      />
    </div>
  );
}
