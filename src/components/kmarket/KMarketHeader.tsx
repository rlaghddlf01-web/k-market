'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useKMarket } from '@/context/KMarketContext';
import { Globe, PlusCircle, Search, Sparkles, ShieldCheck, UserCheck, UserPlus, Bell, MapPin, ChevronDown, Download, Smartphone } from 'lucide-react';
import { SupportedLanguage } from '@/types/kmarket';
import KMarketWelcomeLanguageGateway from '../common/KMarketWelcomeLanguageGateway';
import { triggerPwaInstall } from '@/lib/pwaInstaller';

export default function KMarketHeader() {
  const router = useRouter();
  const { currentLang, setLanguage, currentLangOption, languages, t } = useLanguage();
  const {
    searchQuery,
    setSearchQuery,
    selectedRegion,
    setIsCreateModalOpen,
    setIsTaxModalOpen,
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
  } = useKMarket();

  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [showWelcomeGateway, setShowWelcomeGateway] = useState(false);

  // 첫 방문자 확인 및 웰컴 게이트웨이 자동 표시
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const welcomed = localStorage.getItem('kmarket_welcomed');
      if (!welcomed) {
        setShowWelcomeGateway(true);
      }
    }
  }, []);

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
              {t('nav_platform_slogan')}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* 언어 드롭다운 (실제 고화질 국기 이미지 + 언어명) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-2 bg-black/50 hover:bg-black/70 transition-all px-3 py-1.5 rounded-full text-white font-bold border border-[#f3ba2f]/70 text-xs cursor-pointer shadow-sm active:scale-95"
                title="Change Language (15 Languages)"
              >
                {/* 실제 국기 이미지 사진 */}
                <div className="w-5 h-3.5 rounded-[3px] overflow-hidden shadow-xs border border-white/40 shrink-0 bg-slate-800 flex items-center justify-center">
                  <img
                    src={`https://flagcdn.com/w80/${currentLangOption.countryCode.toLowerCase()}.png`}
                    alt={currentLangOption.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[12px] font-black text-[#fef08a]">{currentLangOption.nativeName}</span>
                <ChevronDown className="w-3 h-3 text-[#f3ba2f]" />
              </button>

              {isLangDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-72 bg-[#fefcf9] rounded-2xl shadow-2xl border border-[#ded1c4] py-1.5 z-50 max-h-96 overflow-y-auto"
                >
                  <div className="p-2 border-b border-[#ded1c4]">
                    <button
                      type="button"
                      onClick={() => {
                        setIsLangDropdownOpen(false);
                        setShowWelcomeGateway(true);
                      }}
                      className="w-full py-2 px-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-all"
                    >
                      <Globe className="w-4 h-4 text-yellow-300" />
                      <span>{t('auto_ui_142')}</span>
                    </button>
                  </div>

                  <div className="px-3 py-1.5 text-[11px] font-semibold text-[#8c7866] border-b border-[#ded1c4]">
                    🌍 빠른 언어 선택 (15개국어)
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangDropdownOpen(false);
                        router.push(lang.code === 'ko' ? '/' : `/${lang.code}`);
                      }}
                      className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs hover:bg-[#f4ede6] transition-colors cursor-pointer ${
                        currentLang === lang.code
                          ? 'bg-[#ede2d6] text-[#3d2817] font-bold'
                          : 'text-[#5c4a39]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {/* 실제 국기 이미지 사진 */}
                        <div className="w-6 h-4 rounded-[3px] overflow-hidden shadow-2xs border border-[#ded1c4] shrink-0 bg-slate-100 flex items-center justify-center">
                          <img
                            src={`https://flagcdn.com/w80/${lang.countryCode.toLowerCase()}.png`}
                            alt={lang.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
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
            <div className="hidden sm:flex items-center gap-1.5 bg-black/40 text-[#fef08a] px-3 py-1 rounded-full text-[11px] font-extrabold border border-[#f3ba2f]/60 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#f3ba2f]" />
              <span className="text-white font-bold">{t('zero_fee_badge')}</span>
            </div>

            {/* 📲 1초 앱 설치 버튼 (헤더 상시 노출) */}
            <button
              type="button"
              onClick={() => triggerPwaInstall()}
              className="flex items-center gap-1.5 bg-gradient-to-r from-[#f3ba2f] via-[#fcd34d] to-[#f59e0b] hover:scale-105 transition-all text-[#09101f] px-3 py-1 rounded-full text-[11px] font-black border border-white/50 shadow-md shadow-[#f3ba2f]/30 cursor-pointer animate-pulse"
              title={t('auto_ui_143')}
            >
              <Smartphone className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{t('auto_ui_144')}</span>
            </button>
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
                  <span className="text-[20px] sm:text-[22px] font-black tracking-tight text-[#1f1914] leading-none">{t('app_name')}</span>
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
              title={t('auto_ui_145')}
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
                placeholder={t('auto_ui_146')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 input-premium text-sm font-medium text-[#1f1914]"
              />
              <Search className="w-4 h-4 text-[#8c7866] absolute left-3.5 top-3" />
            </div>
          </div>

          {/* 데스크탑 우측 액션 그룹 (md 이상) */}
          <div className="hidden md:flex items-center gap-1.5">
            {/* 1분 매물 등록 버튼 - 딥 에스프레소 & 모카 */}
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="btn-primary flex items-center gap-1 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 cursor-pointer shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t('post_item_btn')}</span>
            </button>

            {/* 알림 센터 */}
            <button
              type="button"
              onClick={() => setIsNotificationCenterOpen(true)}
              className="relative p-2 text-[#6b5847] hover:text-[#1f1914] hover:bg-[#f4ede6] rounded-full cursor-pointer transition-colors"
              title={t('auto_ui_147')}
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-rose-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse shadow-xs">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {/* 회원가입 / 마이페이지 */}
            {authedUser ? (
              <div
                onClick={() => setIsMyPageOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ede2d6] hover:bg-[#e2d4c5] border border-[#ded1c4] text-[#3d2817] text-xs font-bold cursor-pointer transition-all"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#5c3818]" />
                <span className="truncate max-w-[80px]">{authedUser.nickname || authedUser.userName}</span>
                <span className="text-[10px] bg-[#5c3818] text-[#fbf9f6] px-1.5 py-0.5 rounded-full font-black">43.5℃</span>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-[#ede2d6] text-[#5c4a39] text-xs font-bold transition-all border border-[#ded1c4] cursor-pointer"
                  style={{ background: '#f4ede6' }}
                >
                  <UserPlus className="w-3.5 h-3.5 text-[#845b37]" />
                  <span>{t('nav_signup')}</span>
                </button>

                {/* 마이 */}
                <button
                  onClick={() => setIsMyPageOpen(true)}
                  className="px-2.5 py-1.5 rounded-full bg-[#f4ede6] hover:bg-[#ede2d6] text-[#5c4a39] text-xs font-bold transition-all cursor-pointer border border-[#ded1c4]"
                >
                  {t('nav_mypage')}
                </button>
              </>
            )}
          </div>

          {/* 모바일 우측 액션 그룹 (md 미만: 알림 + 가입/프로필) */}
          <div className="flex md:hidden items-center gap-1 shrink-0">
            {/* 알림 센터 */}
            <button
              type="button"
              onClick={() => setIsNotificationCenterOpen(true)}
              className="relative p-1.5 text-[#6b5847] hover:text-[#1f1914] hover:bg-[#f4ede6] rounded-full cursor-pointer transition-colors"
              title={t('notif_center_title')}
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-0 right-0 bg-rose-600 text-white text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center animate-pulse">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {/* 회원가입 / 프로필 */}
            {authedUser ? (
              <div
                onClick={() => setIsMyPageOpen(true)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ede2d6] hover:bg-[#e2d4c5] border border-[#ded1c4] text-[#3d2817] text-[11px] font-bold cursor-pointer"
              >
                <UserCheck className="w-3 h-3 text-[#5c3818]" />
                <span className="truncate max-w-[65px]">{authedUser.nickname || authedUser.userName}</span>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-0.5 px-2 py-1 rounded-full bg-[#f4ede6] text-[#5c4a39] text-[11px] font-bold border border-[#ded1c4] cursor-pointer"
                >
                  <UserPlus className="w-3 h-3 text-[#845b37]" />
                  <span>{t('nav_signup')}</span>
                </button>

                <button
                  onClick={() => setIsMyPageOpen(true)}
                  className="px-2 py-1 rounded-full bg-[#f4ede6] text-[#5c4a39] text-[11px] font-bold border border-[#ded1c4] cursor-pointer"
                >
                  {t('nav_mypage')}
                </button>
              </>
            )}
          </div>
        </div>

        {/* 모바일 2행: 검색창 + 1분 간편 매물 등록 버튼 */}
        <div className="mt-1 pb-2.5 md:hidden flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder={t('search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 input-premium text-xs font-medium text-[#1f1914]"
            />
            <Search className="w-3.5 h-3.5 text-[#8c7866] absolute left-3 top-2.5" />
          </div>

          {/* 모바일 1분 매물 등록 버튼 */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn-primary flex items-center gap-1 text-xs px-3 py-1.5 cursor-pointer shrink-0 rounded-xl font-bold shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{t('post_short_btn')}</span>
          </button>
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
              <span>{t('ktrs_tab_market')}</span>
            </button>

            {/* 2. 동네생활 & 쉼터 탭 (17개국어 Q&A 및 친구 사귀기) */}
            <button
              onClick={() => setActiveMainTab('community')}
              className={`px-4 py-1.5 rounded-full font-black transition-all shrink-0 cursor-pointer shadow-2xs flex items-center gap-1.5 relative ${
                activeMainTab === 'community'
                  ? 'bg-gradient-to-r from-indigo-900 to-purple-900 text-white border border-indigo-700'
                  : 'text-[#705e4f] hover:text-[#1f1914] hover:bg-[#f4ede6] bg-transparent'
              }`}
            >
              <span>🗣️</span>
              <span>{t('nav_community')}</span>
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
          </div>
        </div>
      </div>

      {/* 17개국 대형 국기 언어 선택 웰컴 게이트웨이 모달 */}
      {showWelcomeGateway && (
        <KMarketWelcomeLanguageGateway
          onClose={() => setShowWelcomeGateway(false)}
        />
      )}
    </header>
  );
}
