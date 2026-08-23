'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useKMarket } from '@/context/KMarketContext';
import { getLocalizedAddressDisplay } from '@/lib/koreanLocationRomanizer';
import { Globe, PlusCircle, Search, Sparkles, ShieldCheck, UserCheck, UserPlus, Bell, MapPin, ChevronDown, Smartphone } from 'lucide-react';
import KMarketWelcomeLanguageGateway from '../common/KMarketWelcomeLanguageGateway';
import { triggerPwaInstall } from '@/lib/pwaInstaller';

export default function KMarketHeader() {
  const router = useRouter();
  const { currentLang, setLanguage, currentLangOption, languages, t } = useLanguage();
  const {
    searchQuery,
    setSearchQuery,
    setIsCreateModalOpen,
    setIsTaxModalOpen,
    setIsAuthModalOpen,
    setIsMyPageOpen,
    setIsLocationRadiusModalOpen,
    setIsNotificationCenterOpen,
    unreadNotificationCount,
    activeMainTab,
    setActiveMainTab,
    authedUser,
    userLocation,
  } = useKMarket();

  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [showWelcomeGateway, setShowWelcomeGateway] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const welcomed = localStorage.getItem('kmarket_welcomed');
      if (!welcomed) {
        setShowWelcomeGateway(true);
      }
    }
  }, []);

  return (
    <header className="sticky top-0 z-40 glass border-b border-white/60 shadow-sm w-full">
      {/* ========================================================================= */}
      {/* 1. 최상단: KTRS 패밀리 골드 바 (어떤 폰에서도 100% 꽉 찬 화면 정렬) */}
      {/* ========================================================================= */}
      <div
        style={{ 
          background: 'linear-gradient(135deg, #09101f 0%, #111d38 50%, #162447 100%)',
          borderBottom: '3px solid #f3ba2f',
          boxShadow: '0 2px 10px rgba(243, 186, 47, 0.25)',
        }}
        className="text-white px-2.5 sm:px-4 py-1.5 sm:py-2 relative z-10 w-full"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs gap-1.5 sm:gap-2 w-full">
          {/* 좌측: KTRS 브랜드 뱃지 + 데스크탑 풀텍스트 / 모바일 최적화 텍스트 (다국어 2줄 줄바꿈 지원) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-1 min-w-0 pr-1">
            <span className="bg-[#f3ba2f] text-[#09101f] font-black px-1.5 sm:px-2 py-0.5 rounded text-[10px] uppercase tracking-widest shadow-xs shrink-0">
              KTRS
            </span>
            {/* 💻 데스크탑: 원래 풀 문장 100% 보존 */}
            <span suppressHydrationWarning className="hidden md:inline text-white font-bold text-[13px] tracking-tight whitespace-nowrap">
              {t('대한민국 1등 외국인 근로자 종합 플랫폼')}
            </span>
            {/* 📱 모바일: 외국어 번역으로 길어져도 2줄로 완벽 노출 */}
            <span suppressHydrationWarning className="md:hidden text-white font-bold text-[10px] xs:text-[11px] tracking-tight leading-tight line-clamp-2 break-keep">
              {t('대한민국 1등 외국인 종합 플랫폼')}
            </span>
          </div>

          {/* 우측: 17개국 언어 선택기 + 앱 설치 (모바일에서 꽉 차게 정돈) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* 언어 드롭다운 */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1 sm:gap-1.5 bg-black/60 hover:bg-black/80 transition-all px-2 sm:px-2.5 py-1 rounded-full text-white font-bold border border-[#f3ba2f]/70 text-[10.5px] sm:text-[11px] cursor-pointer shadow-xs active:scale-95"
                title={t('17개국 언어 변경')}
              >
                <div className="w-4 h-3 rounded-[2px] overflow-hidden shadow-2xs border border-white/40 shrink-0 bg-slate-800 flex items-center justify-center">
                  <img
                    src={`https://flagcdn.com/w80/${currentLangOption.countryCode.toLowerCase()}.png`}
                    alt={currentLangOption.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[10.5px] sm:text-[11px] font-black text-[#fef08a] whitespace-nowrap">{currentLangOption.nativeName}</span>
                <ChevronDown className="w-2.5 h-2.5 text-[#f3ba2f]" />
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-[#fefcf9] rounded-2xl shadow-2xl border border-[#ded1c4] py-1.5 z-50 max-h-96 overflow-y-auto">
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
                      <span>{t('17개국 대형 국기 선택창 열기')}</span>
                    </button>
                  </div>

                  <div className="px-3 py-1.5 text-[11px] font-semibold text-[#8c7866] border-b border-[#ded1c4]">
                    {t('17개국어 간편 언어 선택')}
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
                        <div className="w-6 h-4 rounded-[3px] overflow-hidden shadow-2xs border border-[#ded1c4] shrink-0 bg-slate-100 flex items-center justify-center">
                          <img
                            src={`https://flagcdn.com/w80/${lang.countryCode.toLowerCase()}.png`}
                            alt={lang.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-[#1f1914] text-xs">{lang.nativeName}</p>
                          <p className="text-[10px] text-[#8c7866] font-medium">{lang.countryCode} · {lang.code.toUpperCase()}</p>
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

            {/* 수수료 0원 뱃지 (태블릿/PC) */}
            <div className="hidden sm:flex items-center gap-1.5 bg-black/40 text-[#fef08a] px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border border-[#f3ba2f]/60 shadow-2xs">
              <ShieldCheck className="w-3 h-3 text-[#f3ba2f]" />
              <span className="text-white font-bold">{t('수수료 0원 100% 무료')}</span>
            </div>

            {/* 📲 1초 앱 설치 버튼 (모바일: [앱설치] / 데스크탑: [1초 만에 앱 설치하기]) */}
            <button
              type="button"
              onClick={() => triggerPwaInstall()}
              className="flex items-center gap-1 bg-gradient-to-r from-[#f3ba2f] via-[#fcd34d] to-[#f59e0b] hover:scale-105 transition-all text-[#09101f] px-2 sm:px-3 py-1 rounded-full text-[10.5px] sm:text-[11px] font-black border border-white/50 shadow-xs cursor-pointer whitespace-nowrap"
              title={t('케이마켓 1초 만에 앱 설치하기')}
            >
              <Smartphone className="w-3 h-3 stroke-[2.5]" />
              <span className="hidden sm:inline">{t('1초 만에 앱 설치하기')}</span>
              <span className="sm:hidden font-black">{t('앱설치')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. 메인 헤더 행 (데스크탑: 1줄 와이드 일체형 / 모바일: 슬림 상단 바) */}
      {/* ========================================================================= */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4 py-2 sm:py-2.5">
          {/* 좌측: 로고 + 위치 칩 */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* 로고 & 케이마켓 FREE */}
            <div 
              onClick={() => router.push(currentLang === 'ko' ? '/' : `/${currentLang}`)}
              className="flex items-center gap-1.5 sm:gap-2.5 cursor-pointer shrink-0"
            >
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-xs shrink-0 border border-[#ded1c4] bg-[#09101f] flex items-center justify-center">
                <img
                  src="/images/kmarket-logo.jpg"
                  alt={t('케이마켓 로고')}
                  className="w-full h-full object-cover scale-110"
                />
              </div>
              <div className="flex items-center whitespace-nowrap shrink-0">
                <span className="notranslate text-[18px] sm:text-[22px] font-black tracking-tight text-[#1f1914] leading-none whitespace-nowrap">{t('케이마켓')}</span>
              </div>
            </div>

            {/* 위치 칩 */}
            <button
              onClick={() => setIsLocationRadiusModalOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full hover:opacity-80 text-[#5c4a39] border border-[#ded1c4] text-[11px] sm:text-xs font-bold transition-all cursor-pointer active:scale-95 shrink-0"
              style={{ background: '#f4ede6' }}
              title={t('내 실제 위치 기준 직거래 반경 설정')}
            >
              <MapPin className="w-3 h-3 text-[#845b37] shrink-0" />
              <span className="truncate max-w-[90px] sm:max-w-[140px] font-bold">
                {getLocalizedAddressDisplay(userLocation?.locationName || '내 주변', currentLang)}
              </span>
              <span className="text-[9px] bg-[#3d2817] text-[#fbf9f6] px-1.5 py-0.2 rounded-full font-black shadow-2xs">
                {userLocation?.radiusKm || 3}km
              </span>
              <ChevronDown className="w-2.5 h-2.5 opacity-50 shrink-0" />
            </button>
          </div>

          {/* 💻 데스크탑 전용 중앙 대형 검색창 (md 이상에서만 완벽한 1줄 중앙에 노출) */}
          <div className="flex-1 max-w-md hidden md:block mx-2">
            <div className="relative">
              <input
                type="text"
                placeholder={t('관심 키워드, 가전, 무빙세일 검색...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 input-premium text-xs sm:text-sm font-medium text-[#1f1914] rounded-xl shadow-xs"
              />
              <Search className="w-4 h-4 text-[#8c7866] absolute left-3 top-3" />
            </div>
          </div>

          {/* 우측 액션 그룹: 데스크탑/모바일 */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* 알림 벨 버튼 */}
            <button
              type="button"
              onClick={() => setIsNotificationCenterOpen(true)}
              className="relative p-1.5 sm:p-2 text-[#6b5847] hover:text-[#1f1914] hover:bg-[#f4ede6] rounded-full cursor-pointer transition-colors shrink-0"
              title={t('통합 알림 센터')}
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-0 right-0 bg-rose-600 text-white text-[8px] sm:text-[9px] font-black w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center animate-pulse shadow-xs">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {/* 회원가입 / 마이페이지 버튼 */}
            {authedUser ? (
              <div
                onClick={() => setIsMyPageOpen(true)}
                className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#ede2d6] hover:bg-[#e2d4c5] border border-[#ded1c4] text-[#3d2817] text-[11px] sm:text-xs font-bold cursor-pointer shrink-0"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#5c3818]" />
                <span className="truncate max-w-[70px] sm:max-w-[80px]">{authedUser.nickname || authedUser.userName}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#f4ede6] hover:bg-[#ede2d6] text-[#5c4a39] text-[11px] sm:text-xs font-bold transition-all border border-[#ded1c4] cursor-pointer whitespace-nowrap"
                >
                  <UserPlus className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#845b37]" />
                  <span>{t('간편 회원가입')}</span>
                </button>
                <button
                  onClick={() => setIsMyPageOpen(true)}
                  className="px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full bg-[#f4ede6] hover:bg-[#ede2d6] text-[#5c4a39] text-[11px] sm:text-xs font-bold transition-all cursor-pointer border border-[#ded1c4] whitespace-nowrap"
                >
                  {t('마이')}
                </button>
              </div>
            )}

            {/* 💻 데스크탑 전용 1분 매물 등록 버튼 (md 이상에서 1줄에 꽉 차게 노출) */}
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="hidden md:flex btn-primary items-center gap-1.5 text-xs sm:text-sm px-4 py-2 cursor-pointer shrink-0 rounded-xl font-bold shadow-xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t('1분 매물 등록')}</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 📱 모바일 전용 3행: 검색창 + 새 매물 등록하기 버튼 (md 미만에서만 노출) */}
        {/* ========================================================================= */}
        <div className="pb-2 md:hidden flex items-center gap-2 w-full">
          <div className="relative flex-1 min-w-0">
            <input
              type="text"
              placeholder={t('관심 키워드, 가전, 무빙세일 검색...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-7 py-1.5 input-premium text-xs font-medium text-[#1f1914] rounded-xl shadow-2xs"
            />
            <Search className="w-3.5 h-3.5 text-[#8c7866] absolute left-2.5 top-2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn-primary flex items-center gap-1 text-xs px-2.5 py-1.5 cursor-pointer shrink-0 rounded-xl font-bold shadow-xs active:scale-95 transition-all whitespace-nowrap"
            title={t('새 매물 등록하기')}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">{t('새 매물 등록하기')}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. 하단 3대 탭 바 (중고/무빙, 동네생활, 세금 환급) */}
      {/* ========================================================================= */}
      <div className="border-t px-3 sm:px-4" style={{ borderColor: 'rgba(180,150,120,0.20)', background: 'rgba(254,252,249,0.95)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-1.5 overflow-x-auto no-scrollbar py-2 text-xs">
          <div className="flex items-center gap-1.5 shrink-0">
            {/* 1. 중고 / 무빙 거래 탭 */}
            <button
              onClick={() => setActiveMainTab('market')}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full font-black transition-all shrink-0 cursor-pointer shadow-2xs flex items-center gap-1.5 text-xs whitespace-nowrap ${
                activeMainTab === 'market'
                  ? 'bg-[#3d2817] text-[#fbf9f6] border border-[#3d2817]'
                  : 'text-[#705e4f] hover:text-[#1f1914] hover:bg-[#f4ede6] bg-transparent'
              }`}
            >
              <span>{t('케이마켓 (중고/무빙)')}</span>
            </button>

            {/* 2. 동네생활 & 쉼터 탭 */}
            <button
              onClick={() => setActiveMainTab('community')}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full font-black transition-all shrink-0 cursor-pointer shadow-2xs flex items-center gap-1.5 text-xs whitespace-nowrap relative ${
                activeMainTab === 'community'
                  ? 'bg-gradient-to-r from-indigo-900 to-purple-900 text-white border border-indigo-700'
                  : 'text-[#705e4f] hover:text-[#1f1914] hover:bg-[#f4ede6] bg-transparent'
              }`}
            >
              <span>🗣️</span>
              <span>{t('동네생활 & 쉼터')}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            </button>
          </div>

          {/* 3. 세금 환급 탭 */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setIsTaxModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-[#5c4a39] bg-[#ede2d6] hover:bg-[#e2d4c5] border border-[#ded1c4] transition-all shrink-0 cursor-pointer text-xs whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#845b37]" />
              <span>{t('세금 환급 (184만)')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 17개국 웰컴 모달 */}
      {showWelcomeGateway && (
        <KMarketWelcomeLanguageGateway
          onClose={() => setShowWelcomeGateway(false)}
        />
      )}
    </header>
  );
}
