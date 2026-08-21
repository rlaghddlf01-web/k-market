'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useKMarket } from '@/context/KMarketContext';
import { Globe, PlusCircle, Search, Sparkles, ShieldCheck, Heart, UserCheck, Bell, MapPin, ChevronDown } from 'lucide-react';
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
    keywordAlerts,
    authedUser,
    likedItemIds,
  } = useKMarket();

  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 glass border-b border-white/60 shadow-sm">
      {/* 상단: KTRS 패밀리 바 */}
      <div
        style={{ background: 'linear-gradient(135deg, #1e130f 0%, #2b1b17 50%, #3d2817 100%)' }}
        className="text-[#fbf9f6] px-4 py-2"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2.5">
            <span className="bg-[#b8860b] text-[#1f1914] font-extrabold px-2 py-0.5 rounded-md text-[10px] uppercase tracking-widest shadow-xs">
              KTRS
            </span>
            <span className="hidden sm:inline font-medium text-[#d8c8b8] text-[12px]">
              대한민국 No.1 외국인 근로자 종합 플랫폼
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* 언어 드롭다운 */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 transition-all px-3 py-1.5 rounded-full text-[#fbf9f6] font-semibold border border-white/15 text-xs cursor-pointer"
                title="Change Language (15 Languages)"
              >
                <Globe className="w-3.5 h-3.5 text-[#d8c8b8]" />
                <span>{currentLangOption.flag}</span>
                <span className="hidden md:inline text-[11px]">{currentLangOption.nativeName}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
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
                        <span className="w-4 h-4 rounded-full bg-[#3d2817] text-[#fbf9f6] text-[9px] flex items-center justify-center font-black">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 수수료 0원 뱃지 */}
            <div className="flex items-center gap-1 bg-[#4a3424]/60 text-[#dfd3c7] px-2.5 py-1 rounded-full text-[11px] font-semibold border border-[#845b37]/40">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('zero_fee_badge')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 중간: 로고 & 검색 & 액션 */}
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">

          {/* 로고 & 위치 칩 */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              {/* 로고 아이콘 - 1안 골드 쉴드 쇼핑백 엠블럼 */}
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
            {/* 신원인증 / 마이페이지 */}
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
                <ShieldCheck className="w-3.5 h-3.5 text-[#845b37]" />
                <span className="hidden sm:inline">신원인증</span>
                <span className="sm:hidden">인증</span>
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
              className="btn-primary flex items-center gap-1.5 text-xs sm:text-sm px-4 py-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t('post_item_btn')}</span>
            </button>

            {/* 알림 */}
            <div
              onClick={() => setIsKeywordModalOpen(true)}
              className="relative p-2 text-[#6b5847] hover:text-[#1f1914] hover:bg-[#f4ede6] rounded-full cursor-pointer transition-colors"
            >
              <Bell className="w-5 h-5" />
              {keywordAlerts.length > 0 && (
                <span className="absolute top-1 right-1 bg-[#845b37] text-white text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {keywordAlerts.length}
                </span>
              )}
            </div>

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
      <div className="border-t px-4" style={{ borderColor: 'rgba(180,150,120,0.20)', background: 'rgba(254,252,249,0.80)' }}>
        <div className="max-w-6xl mx-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2 text-xs">
          <button
            onClick={() => setIsTaxModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold text-[#5c4a39] bg-[#ede2d6] hover:bg-[#e2d4c5] border border-[#ded1c4] transition-all shrink-0 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#845b37]" />
            <span>{t('ktrs_tab_tax')}</span>
          </button>

          <button
            onClick={() => alert('KTRS 비상금 대출: 외국인 근로자 전용 최대 500만원 긴급 대출 서비스 연동 중')}
            className="px-3.5 py-1.5 rounded-full text-[#705e4f] hover:text-[#1f1914] hover:bg-[#f4ede6] font-medium transition-all shrink-0 cursor-pointer"
          >
            {t('ktrs_tab_loan')}
          </button>

          <button
            onClick={() => alert('KTRS 안심 원룸: 공단 반경 보증금 안심 직방 매물 서비스 연동 중')}
            className="px-3.5 py-1.5 rounded-full text-[#705e4f] hover:text-[#1f1914] hover:bg-[#f4ede6] font-medium transition-all shrink-0 cursor-pointer"
          >
            {t('ktrs_tab_housing')}
          </button>

          <button
            className="px-3.5 py-1.5 rounded-full font-bold text-[#fbf9f6] bg-[#3d2817] border border-[#3d2817] shrink-0 cursor-pointer shadow-2xs"
          >
            {t('ktrs_tab_market')}
          </button>
        </div>
      </div>
    </header>
  );
}
