'use client';

import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Share2, PlusSquare } from 'lucide-react';
import { triggerPwaInstall } from '@/lib/pwaInstaller';
import { useLanguage } from '@/context/LanguageContext';

export default function KMarketPwaInstallPrompt() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      // 1. 이미 '오늘 하루 안 보기'를 눌렀는지 확인 (24시간 유효)
      const dismissUntil = localStorage.getItem('kmarket_pwa_dismiss_until');
      if (dismissUntil && parseInt(dismissUntil, 10) > Date.now()) {
        setIsVisible(false);
        return;
      }

      // 2. iOS 기기 감지
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
      setIsIOS(isIosDevice);

      // 3. 이미 스탠드얼론 모드(설치된 앱)로 실행 중이면 숨김
      const isStandaloneMode =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone ||
        document.referrer.includes('android-app://');

      if (isStandaloneMode) {
        setIsVisible(false);
      }
    }
  }, []);

  if (!mounted || !isVisible) return null;

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSGuide(true);
      return;
    }
    await triggerPwaInstall();
  };

  // 닫기 및 오늘 하루 안 보기 저장
  const handleDismiss = (forToday = true) => {
    setIsVisible(false);
    if (typeof window !== 'undefined' && forToday) {
      // 24시간 동안 저장
      const oneDayLater = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem('kmarket_pwa_dismiss_until', oneDayLater.toString());
    }
  };

  return (
    <>
      {/* 1. 화면 우측 하단 상시 플로팅 PWA 설치 배너 */}
      <div className="fixed bottom-3 right-3 left-3 sm:left-auto sm:right-4 sm:bottom-4 z-40 max-w-sm w-auto animate-bounce-subtle">
        <div
          style={{
            background: 'linear-gradient(135deg, #09101f 0%, #1e3a8a 100%)',
            border: '2px solid #f3ba2f',
            boxShadow: '0 12px 36px rgba(9, 16, 31, 0.45)',
          }}
          className="relative rounded-2xl p-3 sm:p-4 text-white shadow-2xl overflow-hidden backdrop-blur-md"
        >
          {/* 우측 상단 닫기 */}
          <button
            type="button"
            onClick={() => handleDismiss(true)}
            className="absolute top-2 right-2 text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-full hover:bg-white/10"
            title={t('닫기')}
          >
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <div className="flex items-center gap-2.5 sm:gap-3.5 pr-6">
            {/* 앱 아이콘 */}
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[#09101f] font-black text-base sm:text-xl shrink-0 shadow-md border border-white/20">
              <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-[#09101f]" />
            </div>

            {/* 텍스트 내용 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h4 className="text-xs sm:text-sm font-black text-white tracking-tight flex items-center gap-1">
                  <span>{t('K-Market 1초 앱 설치')}</span>
                  <span className="text-amber-400">✨</span>
                </h4>
                <span className="bg-[#f3ba2f] text-[#09101f] text-[8px] sm:text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase">
                  PWA
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-200 mt-0.5 leading-snug font-medium line-clamp-1 sm:line-clamp-2">
                {t('홈 화면에 앱 추가하고 17개국어 번역 채팅과 공단 직거래 알림을 가장 빠르게 받으세요.')}
              </p>
            </div>
          </div>

          {/* 설치 CTA 버튼 */}
          <div className="mt-2.5 sm:mt-3.5 flex items-center gap-2">
            <button
              type="button"
              onClick={handleInstallClick}
              className="flex-1 py-1.5 sm:py-2.5 px-3 sm:px-4 rounded-xl font-black text-[11px] sm:text-xs transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-98 cursor-pointer group"
              style={{
                background: 'linear-gradient(135deg, #fce38a 0%, #f3ba2f 50%, #d4af37 100%)',
                color: '#09101f',
              }}
            >
              <Download className="w-3.5 h-3.5 text-[#09101f] group-hover:translate-y-0.5 transition-transform" />
              <span>{t('📲 홈 화면에 K-Market 앱 추가')}</span>
            </button>
            <button
              type="button"
              onClick={() => handleDismiss(true)}
              className="py-1.5 sm:py-2.5 px-2.5 sm:px-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 text-[10.5px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
            >
              {t('오늘 하루 안 보기')}
            </button>
          </div>
        </div>
      </div>

      {/* 2. iOS Safari 전용 홈 화면 추가 안내 팝업 모달 */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-end sm:items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#09101f] border-2 border-[#f3ba2f] rounded-3xl max-w-md w-full p-6 text-white text-left shadow-2xl relative">
            <button
              onClick={() => setShowIOSGuide(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-base text-white">{t('아이폰 및 사파리 브라우저 앱 설치 방법')}</h3>
                <p className="text-xs text-amber-300">{t('간단한 2단계로 홈 화면에 추가하세요')}</p>
              </div>
            </div>

            <div className="space-y-3 bg-white/5 p-4 rounded-2xl border border-white/10 text-xs text-slate-200">
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-amber-400 text-[#09101f] font-black text-xs flex items-center justify-center shrink-0">1</span>
                <div>
                  <p className="font-bold text-white flex items-center gap-1.5">
                    {t('화면 하단의 [공유] 버튼 클릭')}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{t('사파리 브라우저 하단 중앙의 네모 위 화살표 아이콘')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-amber-400 text-[#09101f] font-black text-xs flex items-center justify-center shrink-0">2</span>
                <div>
                  <p className="font-bold text-white flex items-center gap-1.5">
                    {t('[홈 화면에 추가] 선택')}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{t('메뉴를 아래로 내려 [홈 화면에 추가]를 누르면 완료!')}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full mt-5 py-3 rounded-xl bg-amber-400 text-[#09101f] font-black text-xs tracking-wide"
            >
              {t('확인했습니다')}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
