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
        style={{ background: 'linear-gradient(135deg, #1e40af 0%, #3730a3 50%, #0369a1 100%)' }}
        className="text-white px-4 py-2"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2.5">
            <span className="bg-amber-400 text-slate-900 font-extrabold px-2 py-0.5 rounded-md text-[10px] uppercase tracking-widest shadow-sm">
              KTRS
            </span>
            <span className="hidden sm:inline font-medium text-blue-200 text-[12px]">
              대한민국 No.1 외국인 근로자 종합 플랫폼
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* 언어 드롭다운 */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 transition-all px-3 py-1.5 rounded-full text-white font-semibold border border-white/15 text-xs"
                title="Change Language (15 Languages)"
              >
                <Globe className="w-3.5 h-3.5 text-blue-200" />
                <span>{currentLangOption.flag}</span>
                <span className="hidden md:inline text-[11px]">{currentLangOption.nativeName}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {isLangDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100/80 py-1.5 z-50 max-h-80 overflow-y-auto"
                  onClick={() => setIsLangDropdownOpen(false)}
                >
                  <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 border-b border-slate-100">
                    🌍 Select Language / 언어 선택 (15개국어)
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs hover:bg-slate-50 transition-colors ${
                        currentLang === lang.code
                          ? 'bg-blue-50 text-blue-700 font-bold'
                          : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{lang.flag}</span>
                        <div>
                          <p className="font-semibold text-slate-900">{lang.nativeName}</p>
                          <p className="text-[10px] text-slate-400">{lang.name}</p>
                        </div>
                      </div>
                      {currentLang === lang.code && (
                        <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] flex items-center justify-center font-black">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 수수료 0원 뱃지 */}
            <div className="flex items-center gap-1 bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full text-[11px] font-semibold border border-emerald-400/25">
              <ShieldCheck className="w-3 h-3" />
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
              {/* 로고 아이콘 */}
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-md shrink-0"
                style={{ background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)' }}
              >
                K
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[20px] font-black tracking-tight text-slate-900 leading-none">K-Market</span>
                  <span className="text-[9px] font-black bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-md tracking-wider">FREE</span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block mt-0.5 font-medium">{t('app_slogan')}</p>
              </div>
            </div>

            {/* 위치 칩 */}
            <button
              onClick={() => setIsLocationRadiusModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:opacity-80 text-amber-800 border border-amber-200/60 text-xs font-bold transition-all cursor-pointer active:scale-95"
              style={{ background: '#fef3e2' }}
              title="내 실제 위치 및 직거래 반경 설정"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
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
              <span className="text-[9px] bg-blue-600 text-white px-1.5 py-0.5 rounded-full font-extrabold">3km</span>
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
                className="w-full pl-10 pr-4 py-2.5 input-premium text-sm font-medium"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          {/* 우측 액션 그룹 */}
          <div className="flex items-center gap-1.5">
            {/* 신원인증 / 마이페이지 */}
            {authedUser ? (
              <div
                onClick={() => setIsMyPageOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold cursor-pointer transition-all"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="truncate max-w-[80px]">{authedUser.userName}</span>
                <span className="text-[10px] bg-emerald-500 text-white px-1.5 py-0.5 rounded-full font-black">43.5℃</span>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full hover:opacity-80 text-slate-700 text-xs font-bold transition-all border cursor-pointer"
                style={{ background: '#faf7f3', borderColor: '#ddd0c4' }}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden sm:inline">신원인증</span>
                <span className="sm:hidden">인증</span>
              </button>
            )}

            {/* 마이 */}
            <button
              onClick={() => setIsMyPageOpen(true)}
              className="px-2.5 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold transition-all cursor-pointer border border-slate-200"
            >
              마이
            </button>

            {/* 등록 버튼 */}
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
              className="relative p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-full cursor-pointer transition-colors"
            >
              <Bell className="w-5 h-5" />
              {keywordAlerts.length > 0 && (
                <span className="absolute top-1 right-1 bg-amber-500 text-white text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {keywordAlerts.length}
                </span>
              )}
            </div>

            {/* 찜 */}
            <div
              onClick={() => setIsMyPageOpen(true)}
              className="relative p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-full cursor-pointer transition-colors"
            >
              <Heart className="w-5 h-5" />
              {likedItemIds.size > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-red-500 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
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
              className="w-full pl-10 pr-4 py-2 input-premium text-xs font-medium"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          </div>
        </div>
      </div>

      {/* 하단: 탭 바 */}
      <div className="border-t px-4" style={{ borderColor: 'rgba(180,150,120,0.20)', background: 'rgba(254,252,249,0.80)' }}>
        <div className="max-w-6xl mx-auto flex items-center gap-1 overflow-x-auto no-scrollbar py-2 text-xs">
          <button
            onClick={() => setIsTaxModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold text-amber-700 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border border-amber-200 transition-all shrink-0 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{t('ktrs_tab_tax')}</span>
          </button>

          <button
            onClick={() => alert('KTRS 비상금 대출: 외국인 근로자 전용 최대 500만원 긴급 대출 서비스 연동 중')}
            className="px-3.5 py-1.5 rounded-full text-slate-500 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all shrink-0 cursor-pointer"
          >
            {t('ktrs_tab_loan')}
          </button>

          <button
            onClick={() => alert('KTRS 안심 원룸: 공단 반경 보증금 안심 직방 매물 서비스 연동 중')}
            className="px-3.5 py-1.5 rounded-full text-slate-500 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all shrink-0 cursor-pointer"
          >
            {t('ktrs_tab_housing')}
          </button>

          <button
            className="px-3.5 py-1.5 rounded-full font-bold text-blue-700 bg-blue-50 border border-blue-200 shrink-0 cursor-pointer"
          >
            {t('ktrs_tab_market')}
          </button>
        </div>
      </div>
    </header>
  );
}
