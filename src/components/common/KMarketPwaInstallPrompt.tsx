'use client';

import React, { useState, useEffect, useContext } from 'react';
import { Download, X, Sparkles, Smartphone, Share2, PlusSquare, ShieldCheck } from 'lucide-react';
import { triggerPwaInstall } from '@/lib/pwaInstaller';
import { LanguageContext } from '@/context/LanguageContext';
import { PWA_TRANSLATIONS } from '@/lib/pwaTranslations';
import { SupportedLanguage } from '@/types/kmarket';

export default function KMarketPwaInstallPrompt() {
  const [isVisible, setIsVisible] = useState(true);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [detectedLang, setDetectedLang] = useState<SupportedLanguage>('ko');

  const langContext = useContext(LanguageContext);
  const currentLang: SupportedLanguage = langContext?.currentLang || detectedLang;

  const trans = PWA_TRANSLATIONS[currentLang] || PWA_TRANSLATIONS.ko;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = (localStorage.getItem('kmarket_lang') || 'ko') as SupportedLanguage;
      setDetectedLang(savedLang);

      // iOS 기기 감지
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
      setIsIOS(isIosDevice);

      // 이미 스탠드얼론 모드로 실행 중이면 숨김
      const isStandaloneMode =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone ||
        document.referrer.includes('android-app://');

      if (isStandaloneMode) {
        setIsVisible(false);
      }
    }
  }, []);

  if (!isVisible) return null;

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSGuide(true);
      return;
    }
    await triggerPwaInstall();
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <>
      {/* 1. 화면 우측 하단 상시 플로팅 PWA 설치 배너 (15개국어 지원) */}
      <div className="fixed bottom-4 left-3 right-3 sm:left-auto sm:right-5 sm:max-w-md z-[9999] animate-in slide-in-from-bottom-5 duration-300">
        <div className="bg-gradient-to-r from-[#09101f] via-[#111d38] to-[#162447] text-white p-4 rounded-3xl shadow-2xl border-2 border-[#f3ba2f] space-y-3 relative overflow-hidden backdrop-blur-md">
          {/* 우측 상단 닫기 */}
          <button
            type="button"
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
            title="닫기"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-3 pr-6">
            {/* 앱 로고 아이콘 */}
            <div className="w-11 h-11 rounded-2xl overflow-hidden shadow-md border-2 border-[#f3ba2f] shrink-0 bg-[#09101f] flex items-center justify-center p-0.5 animate-pulse">
              <img
                src="/images/kmarket-logo.jpg"
                alt="K-Market"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h4 className="text-xs sm:text-sm font-black text-white tracking-tight flex items-center gap-1">
                  <span>{trans.promptTitle}</span>
                  <span className="text-amber-400">✨</span>
                </h4>
                <span className="bg-[#f3ba2f] text-[#09101f] text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase">
                  PWA
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1 leading-snug font-medium line-clamp-2">
                {trans.promptDesc}
              </p>
            </div>
          </div>

          {/* 액션 버튼 바 */}
          <div className="flex items-center gap-2 pt-0.5">
            <button
              type="button"
              onClick={handleInstallClick}
              className="flex-1 py-2.5 px-3 bg-gradient-to-r from-[#f3ba2f] via-[#fcd34d] to-[#f59e0b] hover:scale-[1.02] text-[#09101f] font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4 stroke-[3]" />
              <span>{trans.installBtn}</span>
            </button>

            <button
              type="button"
              onClick={handleDismiss}
              className="py-2.5 px-3 bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white font-bold text-xs rounded-xl transition-all cursor-pointer shrink-0"
            >
              {trans.dismissBtn}
            </button>
          </div>
        </div>
      </div>

      {/* 2. iOS Safari 전용 홈 화면 추가 안내 모달 */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-[10000] bg-black/75 backdrop-blur-xs flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 text-white w-full max-w-sm rounded-3xl p-6 border border-slate-700 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-400/40 text-amber-300 flex items-center justify-center mx-auto">
              <Smartphone className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-black text-white">
                iPhone / iPad {trans.promptTitle}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {trans.inAppSafariDesc}
              </p>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl text-left text-xs space-y-3 border border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs shrink-0">
                  1
                </div>
                <p className="text-slate-200">
                  화면 하단 중앙의 <strong>[공유 버튼 <Share2 className="w-3.5 h-3.5 inline mx-0.5 text-sky-400" />]</strong>을 누릅니다.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs shrink-0">
                  2
                </div>
                <p className="text-slate-200">
                  메뉴에서 <strong>[홈 화면에 추가 <PlusSquare className="w-3.5 h-3.5 inline mx-0.5 text-amber-400" />]</strong>를 선택하면 설치 완료!
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs rounded-xl transition-all cursor-pointer"
            >
              확인했습니다
            </button>
          </div>
        </div>
      )}
    </>
  );
}
