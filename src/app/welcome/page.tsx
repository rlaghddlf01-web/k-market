'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Globe, ArrowRight, ShieldCheck, MessageSquare, Sparkles, CheckCircle2 } from 'lucide-react';
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

function WelcomeEasyTaxContent() {
  const router = useRouter();
  const { currentLang, setLanguage, t } = useLanguage();
  
  // 현재 활성화된 선택 언어 (기본: ko)
  const [selectedCode, setSelectedCode] = useState<SupportedLanguage>(currentLang || 'ko');

  const currentWelcome = WELCOME_17_LANGUAGES[selectedCode] || WELCOME_17_LANGUAGES.ko;

  const handleCardClick = (code: SupportedLanguage) => {
    setSelectedCode(code);
    setLanguage(code);
    if (typeof window !== 'undefined') {
      localStorage.setItem('kmarket_selected_lang', code);
      localStorage.setItem('kmarket_welcomed', 'true');
    }
    // 즉시 주소창 URL을 /ru, /ja, /vi 등으로 실시간 변경하며 해당 언어 피드로 이동!
    router.push(code === 'ko' ? '/' : `/${code}`);
  };

  const handleConfirmEnter = () => {
    handleCardClick(selectedCode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fbf7f4] via-[#f7f0e8] to-[#eee5db] text-[#2b1810] flex flex-col items-center justify-center p-4 sm:p-6 selection:bg-amber-500 selection:text-white transition-colors duration-300">
      <div className="w-full max-w-5xl space-y-7 my-auto">
        {/* 상단 17개국어 실시간 라이브 변환 헤더 */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#f4ede6] border border-[#d97706]/40 text-[#92400e] px-4 py-1.5 rounded-full text-xs sm:text-sm font-black shadow-xs transition-all duration-200">
            <Globe className="w-4 h-4 text-[#d97706] animate-pulse" />
            <span className="tracking-tight">{currentWelcome.badge}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-[#2b1810] min-h-[48px] flex items-center justify-center transition-all duration-200">
            {currentWelcome.title}
          </h1>
          <p className="text-sm sm:text-base text-[#5c4a39] max-w-2xl mx-auto font-medium min-h-[48px] flex items-center justify-center transition-all duration-200 bg-white/50 py-1.5 px-4 rounded-xl border border-[#e2d5c7]/60">
            {currentWelcome.subtitle}
          </p>
        </div>

        {/* 16개국 국기 카드 그리드 */}
        <div className="bg-white/90 border-2 border-[#e2d5c7] rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {EASY_TAX_LANGUAGES.map((item) => {
              const isSelected = selectedCode === item.code;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => handleCardClick(item.code)}
                  className={`group flex flex-col items-center p-3.5 sm:p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer text-center relative overflow-hidden active:scale-95 ${
                    isSelected
                      ? 'bg-amber-50 border-[#d97706] shadow-lg shadow-amber-500/25 scale-[1.04] ring-2 ring-[#d97706]/40'
                      : 'bg-[#faf5f0] hover:bg-white border-[#e2d5c7] hover:border-[#d97706]/70 hover:shadow-md'
                  }`}
                >
                  {/* 선택 표시 체크 배지 */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 text-[#d97706] animate-bounce">
                      <CheckCircle2 className="w-4 h-4 fill-[#d97706] text-white" />
                    </div>
                  )}

                  <div className="w-14 h-9 sm:w-16 sm:h-10 rounded-md overflow-hidden shadow-xs mb-2.5 border border-slate-200 group-hover:scale-110 transition-transform">
                    <img
                      src={item.flagUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <span className={`text-xs sm:text-sm font-black leading-tight ${
                    isSelected ? 'text-[#92400e]' : 'text-[#2b1810]'
                  }`}>
                    {item.name}
                  </span>
                  <span className="text-[10px] sm:text-xs text-[#8c7866] mt-0.5 font-medium truncate w-full">
                    {item.country}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 중앙 입장 CTA 버튼 (선택한 언어로 즉시 입장) */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleConfirmEnter}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#b45309] hover:to-[#92400e] text-white font-black text-sm sm:text-base rounded-2xl shadow-lg shadow-amber-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 animate-pulse hover:animate-none"
            >
              <span>{currentWelcome.footerButton}</span>
              <ArrowRight className="w-5 h-5 text-amber-200" />
            </button>

            {selectedCode !== 'ko' && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCode('ko');
                  setLanguage('ko');
                }}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 underline transition-colors"
              >
                🇰🇷 한국어로 변경
              </button>
            )}
          </div>
        </div>

        {/* 하단 안심 보증 3대 뱃지 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs text-[#5c4a39]">
          <div className="flex items-center justify-center gap-2 bg-white/70 p-3 rounded-2xl border border-[#e2d5c7] shadow-2xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{t('수수료 0원 외국인 안심 직거래 마켓')}</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-white/70 p-3 rounded-2xl border border-[#e2d5c7] shadow-2xs font-bold">
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span>{currentWelcome.bannerBenefit}</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-white/70 p-3 rounded-2xl border border-[#e2d5c7] shadow-2xs font-bold">
            <Sparkles className="w-4 h-4 text-[#d97706]" />
            <span>{t('이지텍스 세금 환급 원스톱 실시간 연계')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WelcomePage() {
  const { t } = useLanguage();
  return <WelcomeEasyTaxContent />;
}
