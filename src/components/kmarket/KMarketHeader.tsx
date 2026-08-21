'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useKMarket } from '@/context/KMarketContext';
import { Globe, PlusCircle, Search, Sparkles, MessageCircle, ShieldCheck, Heart, UserCheck } from 'lucide-react';
import { SupportedLanguage } from '@/types/kmarket';

export default function KMarketHeader() {
  const { currentLang, setLanguage, currentLangOption, languages, t } = useLanguage();
  const {
    searchQuery,
    setSearchQuery,
    setIsCreateModalOpen,
    setIsTaxModalOpen,
    setIsFavoritesModalOpen,
    isAuthModalOpen,
    setIsAuthModalOpen,
    authedUser,
    likedItemIds,
  } = useKMarket();

  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      {/* 최상단: KTRS 패밀리 바 & 다국어 전환 */}
      <div className="bg-linear-to-r from-blue-700 via-indigo-700 to-sky-700 text-white px-4 py-2">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center space-x-2">
            <span className="bg-amber-400 text-slate-900 font-extrabold px-1.5 py-0.5 rounded-sm text-[11px] uppercase tracking-wider">
              KTRS 슈퍼앱
            </span>
            <span className="hidden sm:inline font-medium text-sky-100">
              대한민국 1위 외국인 근로자 종합 플랫폼
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {/* 15개국어 언어 변경 드롭다운 */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center space-x-1.5 bg-white/15 hover:bg-white/25 transition-colors px-2.5 py-1 rounded-full text-white font-medium border border-white/20"
                title="Change Language (15 Languages)"
              >
                <Globe className="w-3.5 h-3.5 text-sky-200" />
                <span>{currentLangOption.flag}</span>
                <span className="hidden md:inline text-xs">{currentLangOption.nativeName}</span>
                <span className="text-[10px] opacity-75">▼</span>
              </button>

              {isLangDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 max-h-96 overflow-y-auto"
                  onClick={() => setIsLangDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 border-b border-slate-100">
                    🌍 Select Language / 언어 선택 (15개국어)
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs hover:bg-sky-50 transition-colors ${
                        currentLang === lang.code
                          ? 'bg-sky-50 text-blue-700 font-bold'
                          : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <span className="text-base">{lang.flag}</span>
                        <div>
                          <p className="font-medium text-slate-900">{lang.nativeName}</p>
                          <p className="text-[10px] text-slate-400">{lang.name}</p>
                        </div>
                      </div>
                      {currentLang === lang.code && (
                        <span className="text-blue-600 text-xs">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 수수료 0원 뱃지 */}
            <div className="flex items-center space-x-1 bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full text-[11px] font-semibold border border-emerald-400/30">
              <ShieldCheck className="w-3 h-3" />
              <span>{t('zero_fee_badge')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 중간: 로고, 검색, 1분 등록 버튼 */}
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* K-Market 브랜드 로고 */}
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/20">
              K
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900">
                  K-Market
                </span>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-sm">
                  C2C Free
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                {t('app_slogan')}
              </p>
            </div>
          </div>

          {/* 검색창 */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder={t('search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-xs sm:text-sm rounded-full border border-transparent focus:border-blue-500 focus:outline-none transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* 액션 버튼 그룹 */}
          <div className="flex items-center space-x-2">
            {/* 외국인 신원인증 / 가입 버튼 */}
            {authedUser ? (
              <div
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-black cursor-pointer shadow-xs"
                title="인증 완료된 회원 프로필"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="truncate max-w-[90px]">{authedUser.userName}</span>
                <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1 rounded-sm">
                  {authedUser.isOcrVerified ? 'OCR 🛡️' : '인증'}
                </span>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all border border-slate-300 cursor-pointer"
                title="외국인등록증 OCR 및 알리고 SMS 본인인증"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden sm:inline">신원인증 / 가입</span>
                <span className="sm:hidden">인증</span>
              </button>
            )}

            {/* 1분 간편 등록 버튼 */}
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center space-x-1.5 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm px-3.5 py-2 rounded-full shadow-md shadow-blue-600/20 active:scale-95 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t('post_item_btn')}</span>
            </button>

            {/* 찜한 목록 & 마이페이지 버튼 */}
            <div
              onClick={() => setIsFavoritesModalOpen(true)}
              className="relative p-2 text-slate-600 hover:text-red-500 cursor-pointer transition-colors"
              title="찜한 매물 및 마이페이지"
            >
              <Heart className="w-5 h-5" />
              {likedItemIds.size > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
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
              placeholder={t('search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-100 text-xs rounded-full border border-slate-200 focus:border-blue-500 focus:bg-white focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>

      {/* 하단: KTRS 4대 핵심 서비스 통합 탭 바 */}
      <div className="bg-slate-50 border-t border-slate-100 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar py-1.5 gap-2 text-xs">
          <button
            onClick={() => setIsTaxModalOpen(true)}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-full font-bold text-amber-700 bg-amber-100/80 hover:bg-amber-200/80 transition-all shrink-0 cursor-pointer shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>{t('ktrs_tab_tax')}</span>
          </button>

          <button
            onClick={() => alert('KTRS 비상금 대출: 외국인 근로자 전용 최대 500만원 긴급 대출 서비스 연동 중')}
            className="px-3 py-1.5 rounded-full text-slate-600 hover:text-blue-600 hover:bg-slate-200/60 font-medium transition-colors shrink-0 cursor-pointer"
          >
            {t('ktrs_tab_loan')}
          </button>

          <button
            onClick={() => alert('KTRS 안심 원룸: 공단 반경 보증금 안심 직방 매물 서비스 연동 중')}
            className="px-3 py-1.5 rounded-full text-slate-600 hover:text-blue-600 hover:bg-slate-200/60 font-medium transition-colors shrink-0 cursor-pointer"
          >
            {t('ktrs_tab_housing')}
          </button>

          <button
            className="px-3 py-1.5 rounded-full font-bold text-blue-600 bg-blue-50 border border-blue-200 shrink-0 cursor-pointer"
          >
            {t('ktrs_tab_market')}
          </button>
        </div>
      </div>
    </header>
  );
}
