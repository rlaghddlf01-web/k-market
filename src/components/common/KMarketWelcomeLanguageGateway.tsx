'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Globe, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { SupportedLanguage } from '@/types/kmarket';

interface LanguageCardItem {
  code: SupportedLanguage;
  name: string;
  country: string;
  flagUrl: string;
}

// 14개국 외국인 모국어 국기 카드 목록 (1순위: 🇺🇸 English)
const EASY_TAX_LANGUAGES: LanguageCardItem[] = [
  // Row 1
  {
    code: 'en',
    name: 'English',
    country: 'United States / Global',
    flagUrl: 'https://flagcdn.com/w160/us.png',
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
    code: 'km',
    name: 'ភាសាខ្មែរ',
    country: 'Cambodia',
    flagUrl: 'https://flagcdn.com/w160/kh.png',
  },
  {
    code: 'ne',
    name: 'नेपाली',
    country: 'Nepal',
    flagUrl: 'https://flagcdn.com/w160/np.png',
  },
  // Row 2
  {
    code: 'uz',
    name: "O'zbekcha",
    country: 'Uzbekistan',
    flagUrl: 'https://flagcdn.com/w160/uz.png',
  },
  {
    code: 'my',
    name: 'မြန်မာဘာသာ',
    country: 'Myanmar',
    flagUrl: 'https://flagcdn.com/w160/mm.png',
  },
  {
    code: 'id',
    name: 'Bahasa Indonesia',
    country: 'Indonesia',
    flagUrl: 'https://flagcdn.com/w160/id.png',
  },
  {
    code: 'th',
    name: 'ไทย',
    country: 'Thailand',
    flagUrl: 'https://flagcdn.com/w160/th.png',
  },
  {
    code: 'si',
    name: 'සිංහල',
    country: 'Sri Lanka',
    flagUrl: 'https://flagcdn.com/w160/lk.png',
  },
  // Row 3
  {
    code: 'mn',
    name: 'Монгол',
    country: 'Mongolia',
    flagUrl: 'https://flagcdn.com/w160/mn.png',
  },
  {
    code: 'bn',
    name: 'বাংলা',
    country: 'Bangladesh',
    flagUrl: 'https://flagcdn.com/w160/bd.png',
  },
  {
    code: 'kk',
    name: 'Қазақша',
    country: 'Kazakhstan',
    flagUrl: 'https://flagcdn.com/w160/kz.png',
  },
  {
    code: 'ur',
    name: 'اردو',
    country: 'Pakistan',
    flagUrl: 'https://flagcdn.com/w160/pk.png',
  },
];

interface KMarketWelcomeLanguageGatewayProps {
  isOpen: boolean;
  onClose: () => void;
  isFirstVisit?: boolean;
}

export default function KMarketWelcomeLanguageGateway({
  isOpen,
  onClose,
  isFirstVisit = false,
}: KMarketWelcomeLanguageGatewayProps) {
  const router = useRouter();
  const { setLanguage } = useLanguage();

  if (!isOpen) return null;

  const handleSelectLanguage = (code: SupportedLanguage) => {
    setLanguage(code);
    if (typeof window !== 'undefined') {
      localStorage.setItem('kmarket_selected_lang', code);
      localStorage.setItem('kmarket_welcomed', 'true');
    }
    router.push(code === 'ko' ? '/' : `/${code}`);
    setTimeout(() => {
      onClose();
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#fbf7f4] border-2 border-[#e2d5c7] rounded-3xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl text-[#2b1810] relative max-h-[92vh] overflow-y-auto">
        {/* 닫기 버튼 */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-[#2b1810] transition-colors cursor-pointer p-1.5"
          title="닫기"
        >
          <X className="w-6 h-6" />
        </button>

        {/* 헤더 안내 */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-2 bg-[#f4ede6] border border-[#d97706]/40 text-[#92400e] px-3.5 py-1 rounded-full text-xs font-black shadow-xs">
            <Globe className="w-3.5 h-3.5 text-[#d97706]" />
            <span>K-Market 15개국어 모국어 선택</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#2b1810]">
            Choose Your Language / 모국어를 선택하세요
          </h2>
          <p className="text-xs text-[#5c4a39] font-medium">
            외국인 근로자 전용 0원 수수료 중고거래 & 15개국어 실시간 번역 플랫폼
          </p>
        </div>

        {/* 14개국 국기 카드 그리드 (크림 & 베이지) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {EASY_TAX_LANGUAGES.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => handleSelectLanguage(item.code)}
              className="group flex flex-col items-center p-3 rounded-2xl bg-white hover:bg-[#faf4ee] border border-[#e2d5c7] hover:border-[#d97706] hover:shadow-md hover:shadow-amber-500/15 transition-all cursor-pointer text-center relative overflow-hidden"
            >
              {/* 국기 이미지 */}
              <div className="w-12 h-8 rounded-md overflow-hidden shadow-xs mb-2 border border-slate-200 group-hover:scale-110 transition-transform">
                <img
                  src={item.flagUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 언어명 */}
              <span className="text-xs font-black text-[#2b1810] group-hover:text-[#92400e] leading-tight">
                {item.name}
              </span>
              <span className="text-[10px] text-[#8c7866] mt-0.5 group-hover:text-[#b45309] font-medium">
                {item.country}
              </span>
            </button>
          ))}
        </div>

        {/* 하단 한국어 유지 버튼 */}
        <div className="mt-6 pt-4 border-t border-[#e2d5c7] flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={() => handleSelectLanguage('ko')}
            className="text-[#5c4a39] hover:text-[#2b1810] transition-colors cursor-pointer flex items-center gap-1.5 font-bold"
          >
            <span>🇰🇷 한국어로 계속 이용하기 (Korean)</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#2b1810] hover:bg-[#3d2817] text-white font-bold rounded-xl transition-all cursor-pointer shadow-xs"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
