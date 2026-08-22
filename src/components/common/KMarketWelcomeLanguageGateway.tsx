'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Globe, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { SupportedLanguage } from '@/types/kmarket';
import { WELCOME_17_LANGUAGES } from '@/lib/i18n/welcomeTranslations';

interface LanguageCardItem {
  code: SupportedLanguage;
  name: string;
  country: string;
  flagUrl: string;
}

// 16개 외국인 모국어 국기 카드 목록 (1순위: 🇺🇸 English, 2순위: 🇯🇵 日本語, 3순위: 🇷🇺 Русский)
const EASY_TAX_LANGUAGES: LanguageCardItem[] = [
  {
    code: 'en',
    name: 'English',
    country: 'United States / Global',
    flagUrl: 'https://flagcdn.com/w160/us.png',
  },
  {
    code: 'ja',
    name: '日本語',
    country: 'Japan',
    flagUrl: 'https://flagcdn.com/w160/jp.png',
  },
  {
    code: 'ru',
    name: 'Русский',
    country: 'Russia / CIS',
    flagUrl: 'https://flagcdn.com/w160/ru.png',
  },
  {
    code: 'vi',
    name: 'Tiếng Việt',
    country: 'Vietnam',
    flagUrl: 'https://flagcdn.com/w160/vn.png',
  },
  {
    code: 'zh',
    name: '中文',
    country: 'China',
    flagUrl: 'https://flagcdn.com/w160/cn.png',
  },
  {
    code: 'th',
    name: 'ไทย',
    country: 'Thailand',
    flagUrl: 'https://flagcdn.com/w160/th.png',
  },
  {
    code: 'uz',
    name: "O'zbekcha",
    country: 'Uzbekistan',
    flagUrl: 'https://flagcdn.com/w160/uz.png',
  },
  {
    code: 'km',
    name: 'ភាសាខ្មែរ',
    country: 'Cambodia',
    flagUrl: 'https://flagcdn.com/w160/kh.png',
  },
  {
    code: 'mn',
    name: 'Монгол',
    country: 'Mongolia',
    flagUrl: 'https://flagcdn.com/w160/mn.png',
  },
  {
    code: 'ne',
    name: 'नेपाली',
    country: 'Nepal',
    flagUrl: 'https://flagcdn.com/w160/np.png',
  },
  {
    code: 'id',
    name: 'Bahasa Indonesia',
    country: 'Indonesia',
    flagUrl: 'https://flagcdn.com/w160/id.png',
  },
  {
    code: 'my',
    name: 'မြန်မာဘာသာ',
    country: 'Myanmar',
    flagUrl: 'https://flagcdn.com/w160/mm.png',
  },
  {
    code: 'si',
    name: 'සිංහල',
    country: 'Sri Lanka',
    flagUrl: 'https://flagcdn.com/w160/lk.png',
  },
  {
    code: 'kk',
    name: 'Қазақша',
    country: 'Kazakhstan',
    flagUrl: 'https://flagcdn.com/w160/kz.png',
  },
  {
    code: 'bn',
    name: 'বাংলা',
    country: 'Bangladesh',
    flagUrl: 'https://flagcdn.com/w160/bd.png',
  },
  {
    code: 'ur',
    name: 'اردو',
    country: 'Pakistan',
    flagUrl: 'https://flagcdn.com/w160/pk.png',
  },
];

interface KMarketWelcomeLanguageGatewayProps {
  onClose?: () => void;
  isStandalonePage?: boolean;
}

export default function KMarketWelcomeLanguageGateway({
  onClose,
  isStandalonePage = false,
}: KMarketWelcomeLanguageGatewayProps) {
  const { t } = useLanguage();
  const router = useRouter();
  const { currentLang, setLanguage } = useLanguage();
  const [activeLang, setActiveLang] = useState<SupportedLanguage>(currentLang || 'ko');

  const currentWelcome = WELCOME_17_LANGUAGES[activeLang] || WELCOME_17_LANGUAGES.ko;

  const handleSelectLanguage = (langCode: SupportedLanguage) => {
    setLanguage(langCode);
    setActiveLang(langCode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('kmarket_selected_lang', langCode);
      localStorage.setItem('kmarket_welcomed', 'true');
    }
    if (isStandalonePage) {
      router.push(`/${langCode}`);
    } else if (onClose) {
      onClose();
    }
  };

  const handleSelectKorean = () => {
    setLanguage('ko');
    setActiveLang('ko');
    if (typeof window !== 'undefined') {
      localStorage.setItem('kmarket_selected_lang', 'ko');
      localStorage.setItem('kmarket_welcomed', 'true');
    }
    if (isStandalonePage) {
      router.push('/');
    } else if (onClose) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn`}
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* 상단 닫기 버튼 */}
        {onClose && !isStandalonePage && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors z-10"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* 헤더 안내 영역 (17개국어 실시간 반응) */}
        <div className="p-6 text-center border-b border-slate-100 bg-gradient-to-b from-amber-50/50 to-white transition-all duration-300">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/10 text-[#845b37] mb-3 shadow-inner">
            <Globe className="w-6 h-6 animate-pulse" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight transition-all duration-300">
            {currentWelcome.title}
          </h1>
          <p className="text-sm font-semibold text-slate-600 mt-1 transition-all duration-300">
            {currentWelcome.subtitle}
          </p>
        </div>

        {/* 16개국 외국인 모국어 그리드 (스크롤 가능) */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 custom-scrollbar">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {EASY_TAX_LANGUAGES.map((lang) => {
              const isSelected = activeLang === lang.code;
              return (
                <button
                  key={lang.code}
                  onMouseEnter={() => setActiveLang(lang.code)}
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`group relative flex flex-col items-center justify-center p-3.5 rounded-2xl border-2 transition-all duration-200 shadow-xs cursor-pointer text-center ${
                    isSelected
                      ? 'border-[#d97706] bg-amber-50/60 shadow-md scale-105'
                      : 'border-slate-200 hover:border-[#d97706] bg-white hover:bg-amber-50/30 hover:shadow-md'
                  }`}
                >
                  <div className="w-10 h-7 rounded-sm overflow-hidden shadow-xs mb-2 group-hover:scale-110 transition-transform">
                    <img
                      src={lang.flagUrl}
                      alt={lang.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <span className="font-extrabold text-sm text-slate-900 group-hover:text-amber-900 leading-tight">
                    {lang.name}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 truncate w-full mt-0.5">
                    {lang.country}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 하단: 한국어 바로가기 버튼 */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
            <span>{t('auto_ui_5')}</span>
          </div>
          <button
            onMouseEnter={() => setActiveLang('ko')}
            onClick={handleSelectKorean}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all active:scale-95 shadow-sm cursor-pointer"
          >
            {t('welcome_btn_korean')}
          </button>
        </div>
      </div>
    </div>
  );
}
