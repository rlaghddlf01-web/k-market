'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useKMarket } from '@/context/KMarketContext';
import { Globe, PlusCircle, Search, Sparkles, ShieldCheck, Heart, UserCheck, UserPlus, Bell, MapPin, ChevronDown } from 'lucide-react';
import { SupportedLanguage } from '@/types/kmarket';

export default function KMarketHeader() {
  const { currentLang, setLanguage, currentLangOption, languages, t } = useLanguage();
  const {
    searchQuery,
    setSearchQuery,
    selectedRegion,
    setIsCreateModalOpen,
    setIsTaxModalOpen,
    setIsFavoritesModalOpen,
    isAuthModalOpen,
    setIsAuthModalOpen,
    setIsMyPageOpen,
    setIsKeywordModalOpen,
    setIsLocationRadiusModalOpen,
    setIsNotificationCenterOpen,
    unreadNotificationCount,
    activeMainTab,
    setActiveMainTab,
    keywordAlerts,
    authedUser,
    likedItemIds,
  } = useKMarket();

  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 glass border-b border-white/60 shadow-sm">
      {/* 상단: KTRS 패밀리 바 (진한 남색 + 3px 선명한 골드 테두리) */}
      <div
        style={{ 
          background: 'linear-gradient(135deg, #09101f 0%, #111d38 50%, #162447 100%)',
          borderBottom: '3px solid #f3ba2f',
          boxShadow: '0 3px 12px rgba(243, 186, 47, 0.30)',
        }}
        className="text-white px-4 py-2 relative z-10"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2.5">
            <span className="bg-[#f3ba2f] text-[#09101f] font-black px-2.5 py-0.5 rounded-md text-[10px] uppercase tracking-widest shadow-sm">
              KTRS
            </span>
            <span className="hidden sm:inline font-bold text-white text-[13px] tracking-tight">
              대한민국 No.1 외국인 근로자 종합 플랫폼
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* 언어 드롭다운 */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1.5 bg-black/40 hover:bg-black/60 transition-all px-3 py-1.5 rounded-full text-white font-bold border border-[#f3ba2f]/50 text-xs cursor-pointer shadow-2xs"
                title="Change Language (15 Languages)"
              >
                <Globe className="w-3.5 h-3.5 text-[#f3ba2f]" />
                <span>{currentLangOption.flag}</span>
                <span className="hidden md:inline text-[11px] font-bold text-white">{currentLangOption.nativeName}</span>
                <ChevronDown className="w-3 h-3 text-white/80" />
              </button>

              {isLangDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-[#fefcf9] rounded-2xl shadow-2xl border border-[#ded1c4] py-1.5 z-50 max-h-80 overflow-y-auto"
                  onClick={() => setIsLangDropdownOpen(false)}
                >
                  <div className="px-3 py-2 text-[11px] font-semibold text-[#8c7866] border-b border-[#ded1c4]">
                    🌍 Select Language / 언어 선택 (15개국어)
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs hover:bg-[#f4ede6] transition-colors cursor-pointer ${
                        currentLang === lang.code
                          ? 'bg-[#ede2d6] text-[#3d2817] font-bold'
                          : 'text-[#5c4a39]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{lang.flag}</span>
                        <div>
                          <p className="font-semibold text-[#1f1914]">{lang.nativeName}</p>
                          <p className="text-[10px] text-[#8c7866]">{lang.name}</p>
                        </div>
                      </div>
                      {currentLang === lang.code && (
                        <span className="w-4 h-4 rounded-full bg-[#09101f] text-[#f3ba2f] text-[9px] flex items-center justify-center font-black border border-[#f3ba2f]">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 수수료 0원 뱃지 */}
            <div className="flex items-center gap-1.5 bg-black/40 text-[#fef08a] px-3 py-1 rounded-full text-[11px] font-extrabold border border-[#f3ba2f]/60 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#f3ba2f]" />
              <span className="text-white font-bold">{t('zero_fee_badge')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4 py-2 sm:py-2.5">
          {/* 좌측: 로고 + 위치 셀렉터 */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2.5 cursor-pointer">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden shadow-sm shrink-0 border border-[#ded1c4] bg-[#09101f] flex items-center justify-center">
                <img
                  src="/images/kmarket-logo.jpg"
                  alt="K-Market Logo"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[20px] sm:text-[22px] font-black tracking-tight text-[#1f1914] leading-none">K-Market</span>
                  <span className="text-[9px] font-black bg-[#ede2d6] text-[#5c4a39] px-1.5 py-0.5 rounded-md tracking-wider">FREE</span>
                </div>
                <p className="text-[11px] text-[#8c7866] hidden sm:block mt-0.5 font-medium">{t('app_slogan')}</p>
              </div>
            </div>

            {/* 위치 칩 */}
            <button
              onClick={() => setIsLocationRadiusModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:opacity-80 text-[#5c4a39] border border-[#ded1c4] text-xs font-bold transition-all cursor-pointer active:scale-95"
              style={{ background: '#f4ede6' }}
              title="내 실제 위치 및 직거래 반경 설정"
            >
              <MapPin className="w-3.5 h-3.5 text-[#845b37] shrink-0" />
              <span className="truncate max-w-[100px]">
                {selectedRegion === 'all'
                  ? '내 위치'
                  : selectedRegion === 'pyeongtaek'
                  ? '평택 포승'
                  : selectedRegion === 'ansan'
                  ? '안산 원곡'
                  : selectedRegion === 'hwaseong'
                  ? '화성 향남'
                  : selectedRegion}
              </span>
              <span className="text-[9px] bg-[#3d2817] text-[#fbf9f6] px-1.5 py-0.5 rounded-full font-extrabold">3km</span>
              <ChevronDown className="w-3 h-3 opacity-50" />
            </button>
          </div>

          {/* 검색창 (데스크탑) */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="매물 검색 (세탁기, 냉장고, 아이폰 등)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 input-premium text-sm font-medium text-[#1f1914]"
              />
              <Search className="w-4 h-4 text-[#8c7866] absolute left-3.5 top-3" />
            </div>
          </div>

          {/* 우측 액션 그룹 */}
          <div className="flex items-center gap-1.5">
            {/* 회원가입 / 마이페이지 */}
            {authedUser ? (
              <div
                onClick={() => setIsMyPageOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ede2d6] hover:bg-[#e2d4c5] border border-[#ded1c4] text-[#3d2817] text-xs font-bold cursor-pointer transition-all"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#5c3818]" />
                <span className="truncate max-w-[80px]">{authedUser.userName}</span>
                <span className="text-[10px] bg-[#5c3818] text-[#fbf9f6] px-1.5 py-0.5 rounded-full font-black">43.5℃</span>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-[#ede2d6] text-[#5c4a39] text-xs font-bold transition-all border border-[#ded1c4] cursor-pointer"
                style={{ background: '#f4ede6' }}
              >
                <UserPlus className="w-3.5 h-3.5 text-[#845b37]" />
                <span className="hidden sm:inline">회원가입</span>
                <span className="sm:hidden">가입</span>
              </button>
            )}

            {/* 마이 */}
            <button
              onClick={() => setIsMyPageOpen(true)}
              className="px-2.5 py-1.5 rounded-full bg-[#f4ede6] hover:bg-[#ede2d6] text-[#5c4a39] text-xs font-bold transition-all cursor-pointer border border-[#ded1c4]"
            >
              마이
            </button>

            {/* 1분 매물 등록 버튼 - 딥 에스프레소 & 모카 */}
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="btn-primary flex items-center gap-1 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 cursor-pointer shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden xs:inline sm:inline">{t('post_item_btn')}</span>
              <span className="xs:hidden sm:hidden">등록</span>
            </button>

            {/* 알림 센터 */}
            <button
              type="button"
              onClick={() => setIsNotificationCenterOpen(true)}
              className="relative p-2 text-[#6b5847] hover:text-[#1f1914] hover:bg-[#f4ede6] rounded-full cursor-pointer transition-colors"
              title="통합 알림 센터 (키워드/채팅/가격인하)"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-rose-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse shadow-xs">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {/* 찜 */}
            <div
              onClick={() => setIsMyPageOpen(true)}
              className="relative p-2 text-[#6b5847] hover:text-[#845b37] hover:bg-[#f4ede6] rounded-full cursor-pointer transition-colors"
            >
              <Heart className="w-5 h-5" />
              {likedItemIds.size > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-[#845b37] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {likedItemIds.size}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 모바일 검색창 */}
        <div className="mt-2.5 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="매물 검색 (세탁기, 냉장고 등)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 input-premium text-xs font-medium text-[#1f1914]"
            />
            <Search className="w-4 h-4 text-[#8c7866] absolute left-3.5 top-2.5" />
          </div>
        </div>
      </div>

      {/* 하단: 탭 바 */}
      <div className="border-t px-4" style={{ borderColor: 'rgba(180,150,120,0.20)', background: 'rgba(254,252,249,0.90)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-1.5 overflow-x-auto no-scrollbar py-2 text-xs">
          <div className="flex items-center gap-1.5 shrink-0">
            {/* 1. 중고 / 무빙 거래 탭 */}
            <button
              onClick={() => setActiveMainTab('market')}
              className={`px-4 py-1.5 rounded-full font-black transition-all shrink-0 cursor-pointer shadow-2xs flex items-center gap-1.5 ${
                activeMainTab === 'market'
                  ? 'bg-[#3d2817] text-[#fbf9f6] border border-[#3d2817]'
                  : 'text-[#705e4f] hover:text-[#1f1914] hover:bg-[#f4ede6] bg-transparent'
              }`}
            >
              <span>🛒</span>
              <span>{t('ktrs_tab_market')}</span>
            </button>

            {/* 2. 동네생활 & 쉼터 탭 (15개국어 Q&A 및 친구 사귀기) */}
            <button
              onClick={() => setActiveMainTab('community')}
              className={`px-4 py-1.5 rounded-full font-black transition-all shrink-0 cursor-pointer shadow-2xs flex items-center gap-1.5 relative ${
                activeMainTab === 'community'
                  ? 'bg-gradient-to-r from-indigo-900 to-purple-900 text-white border border-indigo-700'
                  : 'text-[#705e4f] hover:text-[#1f1914] hover:bg-[#f4ede6] bg-transparent'
              }`}
            >
              <span>🗣️</span>
              <span>동네생활 &amp; 쉼터</span>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setIsTaxModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-[#5c4a39] bg-[#ede2d6] hover:bg-[#e2d4c5] border border-[#ded1c4] transition-all shrink-0 cursor-pointer text-[11px]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#845b37]" />
              <span>{t('ktrs_tab_tax')}</span>
            </button>

            <button
              onClick={() => alert('KTRS 비상금 대출: 외국인 근로자 전용 최대 500만원 긴급 대출 서비스 연동 중')}
              className="px-3 py-1.5 rounded-full text-[#705e4f] hover:text-[#1f1914] hover:bg-[#f4ede6] font-medium transition-all shrink-0 cursor-pointer text-[11px]"
            >
              {t('ktrs_tab_loan')}
            </button>

            <button
              onClick={() => alert('KTRS 안심 원룸: 공단 반경 보증금 안심 직방 매물 서비스 연동 중')}
              className="px-3 py-1.5 rounded-full text-[#705e4f] hover:text-[#1f1914] hover:bg-[#f4ede6] font-medium transition-all shrink-0 cursor-pointer text-[11px]"
            >
              {t('ktrs_tab_housing')}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
