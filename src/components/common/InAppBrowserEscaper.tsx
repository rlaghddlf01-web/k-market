'use client';

import React, { useState, useEffect, useContext } from 'react';
import { Compass, ExternalLink, X, ArrowUpRight, Share2, MoreVertical, ShieldCheck } from 'lucide-react';
import { checkInAppBrowser, getAndroidChromeIntentUrl, InAppBrowserInfo } from '@/lib/inAppBrowserDetector';
import { LanguageContext, useLanguage } from '@/context/LanguageContext';
import { PWA_TRANSLATIONS } from '@/lib/pwaTranslations';
import { SupportedLanguage } from '@/types/kmarket';

export default function InAppBrowserEscaper() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [inAppInfo, setInAppInfo] = useState<InAppBrowserInfo | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [detectedLang, setDetectedLang] = useState<SupportedLanguage>('ko');

  const langContext = useContext(LanguageContext);
  const currentLang: SupportedLanguage = langContext?.currentLang || detectedLang;

  const trans = PWA_TRANSLATIONS[currentLang] || PWA_TRANSLATIONS.ko;

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const savedLang = (localStorage.getItem('kmarket_lang') || 'ko') as SupportedLanguage;
      setDetectedLang(savedLang);

      const info = checkInAppBrowser();
      setInAppInfo(info);

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

  if (!mounted || !inAppInfo || !inAppInfo.isInApp || isDismissed) return null;

  const handleManualEscape = () => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      if (inAppInfo.isAndroid) {
        window.location.href = getAndroidChromeIntentUrl(currentUrl);
      } else {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(currentUrl);
          alert(trans.copyLinkBtn + ' 완료! 사파리(Safari) 주소창에 붙여넣어 주세요.');
        } else {
          alert(t('우측 상단 또는 하단 메뉴를 누른 후 [사파리로 열기]를 선택해 주세요.'));
        }
      }
    }
  };

  return (
    <div className="fixed top-0 inset-x-0 z-50 bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-white shadow-xl animate-fadeIn">
      <div className="max-w-6xl mx-auto px-4 py-3 sm:py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <Compass className="w-5 h-5 text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="bg-black/30 text-yellow-300 font-extrabold text-[10px] px-2 py-0.5 rounded-full">
                {t('인앱 브라우저')}
              </span>
              <h4 className="font-black text-xs sm:text-sm truncate text-white">
                {inAppInfo.isAndroid ? trans.inAppChromeTitle : trans.inAppSafariTitle}
              </h4>
            </div>
            <p className="text-[11px] text-white/90 truncate mt-0.5 font-medium">
              {inAppInfo.isAndroid ? trans.inAppChromeDesc : trans.inAppSafariDesc}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
          <button
            onClick={handleManualEscape}
            className="flex-1 sm:flex-none px-4 py-2 bg-white text-[#09101f] hover:bg-yellow-300 font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <span>{inAppInfo.isAndroid ? trans.openChromeBtn : trans.copyLinkBtn}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsDismissed(true)}
            className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            title={trans.dismissBtn}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
