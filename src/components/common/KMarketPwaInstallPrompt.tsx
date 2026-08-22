'use client';

import React, { useState, useEffect, useContext } from 'react';
import { Download, X, Sparkles, Smartphone, Share2, PlusSquare, ShieldCheck } from 'lucide-react';
import { triggerPwaInstall } from '@/lib/pwaInstaller';
import { LanguageContext, useLanguage } from '@/context/LanguageContext';
import { PWA_TRANSLATIONS } from '@/lib/pwaTranslations';
import { SupportedLanguage } from '@/types/kmarket';

export default function KMarketPwaInstallPrompt() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [detectedLang, setDetectedLang] = useState<SupportedLanguage>('ko');

  const langContext = useContext(LanguageContext);
  const currentLang: SupportedLanguage = langContext?.currentLang || detectedLang;

  const trans = PWA_TRANSLATIONS[currentLang] || PWA_TRANSLATIONS.ko;

  useEffect(() => {
    setMounted(true);
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

  if (!mounted || !isVisible) return null;

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
      {/* 1. 화면 우측 하단 상시 플로팅 PWA 설치 배너 */}
      <div className="fixed bottom-4 right-4 z-40 max-w-sm w-[calc(100vw-2rem)] sm:w-auto animate-bounce-subtle">
        <div
          style={{
            background: 'linear-gradient(135deg, #09101f 0%, #1e3a8a 100%)',
            border: '2px solid #f3ba2f',
            boxShadow: '0 12px 36px rgba(9, 16, 31, 0.45)',
          }}
          className="relative rounded-2xl p-4 sm:p-4.5 text-white shadow-2xl overflow-hidden backdrop-blur-md"
        >
          {/* 우측 상단 닫기 */}
          <button
            type="button"
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-full hover:bg-white/10"
            title={trans.dismissBtn}
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-3.5 pr-6">
            {/* 앱 아이콘 */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[#09101f] font-black text-xl shrink-0 shadow-lg border-2 border-white/20">
              <Smartphone className="w-6 h-6 text-[#09101f]" />
            </div>

            {/* 텍스트 내용 */}
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
              <p className="text-[11px] text-slate-200 mt-1 leading-snug font-medium line-clamp-2">
                {trans.promptDesc}
              </p>
            </div>
          </div>

          {/* 설치 CTA 버튼 */}
          <div className="mt-3.5 flex items-center gap-2">
            <button
              type="button"
              onClick={handleInstallClick}
              className="flex-1 py-2.5 px-4 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 shadow-lg active:scale-98 cursor-pointer group"
              style={{
                background: 'linear-gradient(135deg, #fce38a 0%, #f3ba2f 50%, #d4af37 100%)',
                color: '#09101f',
              }}
            >
              <Download className="w-3.5 h-3.5 text-[#09101f] group-hover:translate-y-0.5 transition-transform" />
              <span>{trans.installBtn}</span>
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-bold transition-all cursor-pointer"
            >
              {trans.dismissBtn}
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
                <h3 className="font-black text-base text-white">{t('auto_loop_673')}</h3>
                <p className="text-xs text-amber-300">{t('auto_loop_674')}</p>
              </div>
            </div>

            <div className="space-y-3 bg-white/5 p-4 rounded-2xl border border-white/10 text-xs text-slate-200">
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-amber-400 text-[#09101f] font-black text-xs flex items-center justify-center shrink-0">1</span>
                <div>
                  <p className="font-bold text-white flex items-center gap-1.5">
                    화면 하단의 <Share2 className="w-3.5 h-3.5 text-blue-400 inline" /> [공유] 버튼 클릭
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{t('auto_loop_675')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-amber-400 text-[#09101f] font-black text-xs flex items-center justify-center shrink-0">2</span>
                <div>
                  <p className="font-bold text-white flex items-center gap-1.5">
                    <PlusSquare className="w-3.5 h-3.5 text-amber-400 inline" /> [홈 화면에 추가] 선택
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{t('auto_loop_676')}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full mt-5 py-3 rounded-xl bg-amber-400 text-[#09101f] font-black text-xs tracking-wide"
            >
              확인했습니다
            </button>
          </div>
        </div>
      )}
    </>
  );
}
