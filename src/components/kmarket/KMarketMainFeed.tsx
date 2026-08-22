'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useKMarket } from '@/context/KMarketContext';
import { useLanguage } from '@/context/LanguageContext';
import KMarketHeader from './KMarketHeader';
import KMarketTaxBanner from './KMarketTaxBanner';
import KMarketHeroShowcase from './KMarketHeroShowcase';
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
import KMarketNotificationDrawer from './KMarketNotificationDrawer';
import KMarketFeedbackModal from './KMarketFeedbackModal';
import { CommunityProvider } from '@/context/CommunityContext';
import KMarketCommunityMain from '../community/KMarketCommunityMain';
import { ShoppingBag, Sparkles, ShieldCheck, Plus, PackageOpen, ShieldAlert } from 'lucide-react';

export default function KMarketMainFeed() {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const {
    items,
    selectedCategory,
    selectedRegion,
    searchQuery,
    isMovingSaleOnly,
    activeMainTab,
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
    isFeedbackModalOpen,
    setIsFeedbackModalOpen,
    setAuthedUser,
  } = useKMarket();
  const { t } = useLanguage();

  // 📄 20개 단위 페이지네이션 상태
  const ITEMS_PER_PAGE = 20;
  const [currentPage, setCurrentPage] = useState(1);

  // 카테고리 / 지역 / 검색어 변경 시 1페이지로 자동 리셋
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedRegion, searchQuery, isMovingSaleOnly]);

  // 검색 및 필터링 적용된 매물 목록
  const filteredItems = items.filter((item) => {
    // 0. 차단된 사용자 매물 자동 숨김
    if (blockedUserIds.has(item.seller_id)) {
      return false;
    }
    // 1. 카테고리 필터
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'free_give') {
        if (item.price !== 0 && item.category !== 'free_give') return false;
      } else if (selectedCategory === 'moving_sale') {
        if (!item.is_moving_sale && item.category !== 'moving_sale') return false;
      } else if (selectedCategory === 'clothes') {
        if (item.category !== 'clothes' && (item.category as string) !== 'fashion') return false;
      } else {
        if (item.category !== selectedCategory) return false;
      }
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
    <CommunityProvider>
      <div className="min-h-screen flex flex-col" style={{ background: 'var(--surface-bg)', color: 'var(--text-primary)' }}>
        {/* 상단 통합 헤더 */}
        <KMarketHeader />

        {/* 1. 최상단 풀와이드 웅장한 감성 히어로 쇼케이스 (중고마켓 탭일 때 노출) */}
        {activeMainTab === 'market' && <KMarketHeroShowcase />}

        {/* 메인 콘텐츠 컨테이너 */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-7">
          {activeMainTab === 'community' ? (
            /* 🗣️ 동네생활 & 쉼터 커뮤니티 메인 */
            <KMarketCommunityMain />
          ) : (
            /* 🛒 중고 / 무빙마켓 메인 */
            <>
              {/* 2. KTRS 184만원 세무 환급 감성 사진 배너 */}
              <KMarketTaxBanner />

              {/* 3. 🛡️ 외국인 안심 거래 3대 수칙 (사기 방지 쉴드) 웜톤 배너 */}
              <KMarketSafetyBanner />

              {/* 4. 쇼핑몰 스타일 원형 아이콘 카테고리 네비게이션 */}
              <KMarketCategoryNav />

              {/* 5. 귀국자 헐값 급처분 [무빙 세일(Moving Sale)] 전용관 */}
              {!isMovingSaleOnly && selectedCategory === 'all' && !searchQuery && (
                <KMarketMovingSaleSection />
              )}

              {/* 5. 실시간 매물 리스트 헤더 */}
              <div className="flex items-center justify-between pt-2 mb-2 px-1">
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

              {/* 5. 매물 그리드 (20개 단위 페이징) */}
              {filteredItems.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
                    {filteredItems
                      .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
                      .map((item) => (
                        <KMarketItemCard key={item.id} item={item} />
                      ))}
                  </div>

                  {/* 📄 스마트 페이지네이션 네비게이션 바 */}
                  {Math.ceil(filteredItems.length / ITEMS_PER_PAGE) > 1 && (
                    <div className="flex items-center justify-center gap-2 pt-10 pb-4">
                      {/* 이전 페이지 버튼 */}
                      <button
                        onClick={() => {
                          setCurrentPage((prev) => Math.max(prev - 1, 1));
                          window.scrollTo({ top: 400, behavior: 'smooth' });
                        }}
                        disabled={currentPage === 1}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                          currentPage === 1
                            ? 'opacity-40 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200'
                            : 'bg-white text-[#1f1914] border-[#ded1c4] hover:bg-[#eae3dc] active:scale-95 cursor-pointer shadow-xs'
                        }`}
                      >
                        ◀ 이전
                      </button>

                      {/* 페이지 번호 목록 */}
                      {Array.from(
                        { length: Math.min(Math.ceil(filteredItems.length / ITEMS_PER_PAGE), 7) },
                        (_, idx) => {
                          const pageNum = idx + 1;
                          const isCurrent = currentPage === pageNum;
                          return (
                            <button
                              key={pageNum}
                              onClick={() => {
                                setCurrentPage(pageNum);
                                window.scrollTo({ top: 400, behavior: 'smooth' });
                              }}
                              className={`w-9 h-9 rounded-xl text-xs font-black transition-all cursor-pointer ${
                                isCurrent
                                  ? 'bg-[#1f1914] text-[#fbf9f6] shadow-md scale-105'
                                  : 'bg-white text-[#5c4a39] border border-[#ded1c4] hover:bg-[#eae3dc]'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                      )}

                      {/* 다음 페이지 버튼 */}
                      <button
                        onClick={() => {
                          const maxPage = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
                          setCurrentPage((prev) => Math.min(prev + 1, maxPage));
                          window.scrollTo({ top: 400, behavior: 'smooth' });
                        }}
                        disabled={currentPage === Math.ceil(filteredItems.length / ITEMS_PER_PAGE)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                          currentPage === Math.ceil(filteredItems.length / ITEMS_PER_PAGE)
                            ? 'opacity-40 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200'
                            : 'bg-white text-[#1f1914] border-[#ded1c4] hover:bg-[#eae3dc] active:scale-95 cursor-pointer shadow-xs'
                        }`}
                      >
                        다음 ▶
                      </button>
                    </div>
                  )}
                </>
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
            </>
          )}
        </main>

        {/* 모바일 플로팅 매물 등록 CTA 버튼 (중고마켓 탭일 때) */}
        {activeMainTab === 'market' && (
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="md:hidden fixed bottom-6 right-5 z-40 text-[#fbf9f6] p-4 rounded-full flex items-center justify-center active:scale-90 transition-transform cursor-pointer shadow-lg"
            style={{ background: 'linear-gradient(135deg, #2b1b17 0%, #4a2c11 100%)' }}
            aria-label="Post Item"
          >
            <Plus className="w-6 h-6" />
          </button>
        )}

        {/* 푸터 영역 - 진한 남색 & 3px 선명한 럭셔리 골드 테두리 */}
        <footer 
          className="mt-20 text-white relative z-10"
          style={{
            background: 'linear-gradient(180deg, #09101f 0%, #060b17 100%)',
            borderTop: '3px solid #f3ba2f',
            boxShadow: '0 -4px 20px rgba(243, 186, 47, 0.25)',
          }}
        >
          <div className="max-w-6xl mx-auto px-4 py-12 space-y-7">
            {/* 상단 브랜드 & 혜택 요약 */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-white/10">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-md shrink-0 border border-[#845b37]/60 bg-[#09101f] flex items-center justify-center">
                    <img
                      src="/images/kmarket-logo.jpg"
                      alt="K-Market Logo"
                      className="w-full h-full object-cover scale-110"
                    />
                  </div>
                  <span className="text-white font-black text-lg tracking-tight">KTRS K-Market</span>
                  <span className="text-[10px] font-black bg-[#f3ba2f] text-[#09101f] px-2 py-0.5 rounded-full uppercase tracking-wider">Zero Fee C2C</span>
                </div>
                <p className="text-[#f1f5f9] text-xs font-semibold leading-relaxed max-w-sm">
                  대한민국 No.1 외국인 종합 슈퍼앱 KTRS 연계<br />외국인 전용 0원 안심 중고거래 &amp; 귀국 무빙세일 &amp; 동네생활 커뮤니티
                </p>
              </div>

              <div className="flex flex-col gap-2 text-xs font-bold text-[#f8fafc]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#f3ba2f]" />
                  <span className="text-white font-bold">수수료 0원 100% 무료 안심 직거래</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#f3ba2f]" />
                  <span className="text-white font-bold">15개국어 실시간 Gemini AI 양방향 번역</span>
                </div>
              </div>
            </div>

            {/* 공식 사업자등록 정보 */}
            <div className="space-y-2.5 text-xs text-white leading-relaxed font-medium">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-white">
                <span><strong className="text-[#f3ba2f] font-extrabold">사업자명:</strong> 주식회사 펫에이앤씨</span>
                <span className="text-white/40">|</span>
                <span><strong className="text-[#f3ba2f] font-extrabold">대표자:</strong> 전기창</span>
                <span className="text-white/40">|</span>
                <span><strong className="text-[#f3ba2f] font-extrabold">사업자 등록번호:</strong> 229-86-03034</span>
                <span className="text-white/40">|</span>
                <span><strong className="text-[#f3ba2f] font-extrabold">통신판매업 번호:</strong> 제 2023-진접오남-0680호</span>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-white">
                <span><strong className="text-[#f3ba2f] font-extrabold">주소:</strong> 서울특별시 광진구 광나루로 436, 5층(화양동, 에듀킨빌딩)</span>
                <span className="text-white/40">|</span>
                <span><strong className="text-[#f3ba2f] font-extrabold">연락처:</strong> 010-5964-5340</span>
                <span className="text-white/40">|</span>
                <span><strong className="text-[#f3ba2f] font-extrabold">이메일:</strong> zkfnth021@gmail.com</span>
              </div>
            </div>

            {/* 하단 카피라이트 & 관리자 링크 */}
            <div className="pt-5 border-t border-[#2d1a12] text-[11px] text-[#94a3b8] font-semibold flex flex-col sm:flex-row justify-between items-center gap-3">
              <p>© 2026 KTRS (Korea Tax &amp; Foreign Resident Service). All rights reserved.</p>
              <div className="flex items-center gap-3">
                <span className="text-[#cbd5e1]">안심 가이드 | 고객센터 1588-0000</span>
                <Link
                  href="/admin"
                  className="px-2.5 py-1 bg-[#20140f] hover:bg-[#3d2817] border border-[#845b37]/80 text-[#f3ba2f] font-extrabold rounded-lg text-[10px] transition-all flex items-center gap-1 cursor-pointer"
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
            alert(`[신원인증 완료] ${userData.userName} 님의 인증이 완료되었습니다.`);
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
        <KMarketFeedbackModal
          isOpen={isFeedbackModalOpen}
          onClose={() => setIsFeedbackModalOpen(false)}
        />
        <KMarketNotificationDrawer />
      </div>
    </CommunityProvider>
  );
}
