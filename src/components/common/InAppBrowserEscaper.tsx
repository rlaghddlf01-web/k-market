'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useEffect, useContext } from 'react';
import { Compass, ExternalLink, X, ArrowUpRight, Share2, MoreVertical, ShieldCheck } from 'lucide-react';
import { checkInAppBrowser, getAndroidChromeIntentUrl, InAppBrowserInfo } from '@/lib/inAppBrowserDetector';
import { LanguageContext } from '@/context/LanguageContext';
import { PWA_TRANSLATIONS } from '@/lib/pwaTranslations';
import { SupportedLanguage } from '@/types/kmarket';

export default function InAppBrowserEscaper() {
  const { t } = useLanguage();
  const [inAppInfo, setInAppInfo] = useState<InAppBrowserInfo | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [detectedLang, setDetectedLang] = useState<SupportedLanguage>('ko');

  const langContext = useContext(LanguageContext);
  const currentLang: SupportedLanguage = langContext?.currentLang || detectedLang;

  const trans = PWA_TRANSLATIONS[currentLang] || PWA_TRANSLATIONS.ko;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 로컬스토리지 또는 브라우저 언어 감지
      const savedLang = (localStorage.getItem('kmarket_lang') || 'ko') as SupportedLanguage;
      setDetectedLang(savedLang);

      const info = checkInAppBrowser();
      setInAppInfo(info);

      // 안드로이드 인앱 브라우저 감지 시 구글 크롬으로 0.2초 만에 자동 탈출 시도
      if (info.isInApp && info.isAndroid) {
        const currentUrl = window.location.href;
        const chromeIntent = getAndroidChromeIntentUrl(currentUrl);
        
        try {
          window.location.href = chromeIntent;
        } catch (e) {
          console.warn('Android Chrome intent escape failed, fallback to prompt', e);
        }
      }
    }
  }, []);

  if (!inAppInfo || !inAppInfo.isInApp || isDismissed) return null;

  const handleManualEscape = () => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      if (inAppInfo.isAndroid) {
        window.location.href = getAndroidChromeIntentUrl(currentUrl);
      } else {
        // iOS Safari 안내 복사
        if (navigator.clipboard) {
          navigator.clipboard.writeText(currentUrl);
          alert(trans.copyLinkBtn + ' 완료! 사파리(Safari) 주소창에 붙여넣어 주세요.');
        } else {
          alert('우측 상단 또는 하단의 메뉴(⋮ 또는 공유)를 누른 후 [Safari로 열기]를 선택해 주세요!');
        }
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[10001] bg-gradient-to-r from-[#09101f] via-[#111d38] to-[#162447] text-white p-3 px-4 border-b-2 border-[#f3ba2f] shadow-2xl animate-in slide-in-from-top-full duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-[#f3ba2f] text-[#09101f] flex items-center justify-center font-black shrink-0 shadow-xs animate-pulse">
            <Compass className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="font-extrabold text-white truncate text-[12px] flex items-center gap-1.5">
              <span>{inAppInfo.isIOS ? trans.inAppSafariTitle : trans.inAppChromeTitle}</span>
              <span className="text-[9px] bg-[#f3ba2f] text-[#09101f] px-1.5 py-0.2 rounded-md font-black">
                PWA
              </span>
            </p>
            <p className="text-[10px] text-slate-300 truncate">
              {inAppInfo.isIOS ? trans.inAppSafariDesc : trans.inAppChromeDesc}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleManualEscape}
            className="px-3 py-1.5 bg-[#f3ba2f] hover:bg-[#fcd34d] text-[#09101f] font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1 cursor-pointer"
          >
            <span>{inAppInfo.isIOS ? trans.copyLinkBtn : trans.openChromeBtn}</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
          </button>

          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title={t('pwa_toast_dismiss_btn')}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
