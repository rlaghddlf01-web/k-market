'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useKMarket } from '@/context/KMarketContext';
import { useLanguage } from '@/context/LanguageContext';
import KMarketHeader from './KMarketHeader';
import KMarketTaxBanner from './KMarketTaxBanner';
import KMarketSafetyBanner from './KMarketSafetyBanner';
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
    <div className="min-h-screen bg-slate-100/60 text-slate-900 flex flex-col font-sans">
      {/* 상단 통합 헤더 */}
      <KMarketHeader />

      {/* 메인 콘텐츠 컨테이너 */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-4 sm:py-6">
        {/* 1. KTRS 킬러 세무 환급 184만원 배너 */}
        <KMarketTaxBanner />

        {/* 1-2. 🛡️ 외국인 안심 거래 3대 수칙 (사기 방지 쉴드) 배너 */}
        <KMarketSafetyBanner />

        {/* 2. 귀국자 헐값 급처분 [무빙 세일(Moving Sale)] 전용관 */}
        {!isMovingSaleOnly && selectedCategory === 'all' && !searchQuery && (
          <KMarketMovingSaleSection />
        )}

        {/* 3. 공단별 도보 직거래 필터 & 카테고리 칩 바 */}
        <KMarketRegionFilter />

        {/* 4. 매물 리스트 헤더 */}
        <div className="flex items-center justify-between my-3 px-1">
          <div className="flex items-center space-x-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              실시간 중고 매물
            </h2>
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-0.5 rounded-full">
              {filteredItems.length}개
            </span>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            ⚡ 15개국어 0.3초 번역 지원
          </div>
        </div>

        {/* 5. 매물 그리드 */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filteredItems.map((item) => (
              <KMarketItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-xs my-8 space-y-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <PackageOpen className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-800">
                조건에 맞는 매물이 없습니다
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                필터를 전체로 변경하거나, 첫 번째로 내 중고 물건을 1분 만에 등록해 보세요!
              </p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all"
            >
              ✏️ 1분 간편 매물 등록하기
            </button>
          </div>
        )}
      </main>

      {/* 모바일 플로팅 매물 등록 CTA 버튼 */}
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="md:hidden fixed bottom-6 right-5 z-40 bg-linear-to-r from-blue-600 to-indigo-600 text-white p-3.5 rounded-full shadow-2xl shadow-blue-600/50 flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
        aria-label="Post Item"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* 푸터 영역 */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-4 text-xs mt-12 border-t border-slate-800">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-white font-black text-base">
                <span>KTRS K-Market</span>
                <span className="bg-blue-600 text-[10px] px-2 py-0.5 rounded-md font-bold">
                  Zero Fee C2C
                </span>
              </div>
              <p className="text-slate-400 text-xs mt-1">
                대한민국 No.1 외국인 종합 슈퍼앱 KTRS 연계 외국인 전용 중고거래 & 무빙세일 플랫폼
              </p>
            </div>

            <div className="flex items-center space-x-3 text-slate-300">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>수수료 0원 100% 무료</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span>15개국어 실시간 Gemini 번역</span>
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-2">
            <p>© 2026 KTRS (Korea Tax & Foreign Resident Service). All rights reserved.</p>
            <div className="flex items-center gap-3">
              <p>공단 직거래 안심 가이드 | 고객센터 1588-0000</p>
              <Link
                href="/admin"
                className="px-2.5 py-1 bg-red-950/80 hover:bg-red-900 border border-red-500/40 text-red-300 font-bold rounded-lg text-[10px] transition-all flex items-center gap-1 cursor-pointer"
                title="KTRS 관리자 전용 관제 콘솔 페이지"
              >
                <ShieldAlert className="w-3 h-3 text-red-400" />
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
    </div>
  );
}
