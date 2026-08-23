'use client';

import React from 'react';
import { useKMarket } from '@/context/KMarketContext';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, ShieldCheck, Sparkles, MessageCircle, RefreshCw } from 'lucide-react';

export default function KMarketHeroShowcase() {
  const { setIsTaxModalOpen, setIsCreateModalOpen } = useKMarket();
  const { t } = useLanguage();

  return (
    <section className="w-full border-b border-[#ded1c4]" style={{ background: 'linear-gradient(180deg, #ede3d8 0%, #f4ede6 100%)' }}>
      {/* 웅장한 풀와이드 감성 히어로 쇼케이스 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-16 relative overflow-hidden">
        {/* 미세한 앰비언트 글로우 */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/50 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-10 relative z-10">
          {/* 좌측: 타이포그래피 & CTA */}
          <div className="max-w-xl space-y-3 sm:space-y-4 text-left w-full">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 rounded-full bg-[#ded1c4] text-[#4a3424] text-[11px] sm:text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#845b37]" />
              <span>{t('대한민국 1등 외국인 근로자 안심 직거래 마켓')}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#1f1914] tracking-tight leading-tight break-keep">
              {t('외국인 안심 직거래 & 귀국 무빙세일 특가전')}
            </h1>

            <p className="text-xs sm:text-base text-[#5c4a39] font-medium leading-relaxed max-w-lg">
              {t('17개국어 실시간 인공지능 양방향 안심 번역 채팅을 지원합니다.')} <br className="hidden sm:inline" />
              {t('공단 기숙사 정문 앞 1분 거리에서 신원 인증을 거친 안전한 직거래 플랫폼입니다.')}
            </p>

            {/* CTA 버튼 그룹 */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1 sm:pt-2 w-full">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-5 py-3 rounded-full bg-[#1f1914] hover:bg-[#332219] text-[#fbf9f6] text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95 w-full sm:w-auto"
              >
                <span>{t('1분 만에 내 물건 무료로 등록하기')}</span>
                <ArrowRight className="w-4 h-4 text-amber-200" />
              </button>

              <button
                onClick={() => setIsTaxModalOpen(true)}
                className="px-4 py-3 rounded-full bg-[#fefcf9] hover:bg-white text-[#3d2817] border border-[#ded1c4] text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-2xs w-full sm:w-auto"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span>{t('평균 184만 원 예상 세금 환급액 계산기')}</span>
              </button>
            </div>
          </div>

          {/* 우측: 레퍼런스 스타일 가전·가구 통합 광고 쇼케이스 단일 이미지 */}
          <div className="w-full md:w-5/12 max-w-md shrink-0">
            <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-2 border-white bg-white group">
              <img
                src="/images/hero-appliances-bundle.jpg"
                alt={t('가전 가구 통합 패키지 쇼케이스')}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* 스크린샷 스타일 우측 상단 이벤트 원형 배지 */}
              <div 
                style={{
                  background: 'linear-gradient(135deg, #09101f 0%, #1e3a8a 100%)',
                  border: '2px solid #f3ba2f',
                  boxShadow: '0 4px 14px rgba(243, 186, 47, 0.35)',
                }}
                className="absolute top-3.5 right-3.5 w-20 h-20 sm:w-22 sm:h-22 rounded-full text-white flex flex-col items-center justify-center text-center p-1.5 shadow-xl animate-pulse pointer-events-none"
              >
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-200 leading-tight">
                  {t('귀국 근로자 전용')}
                </span>
                <span className="text-xs sm:text-sm font-black text-[#f3ba2f] leading-tight">
                  {t('귀국 무빙세일')}
                </span>
                <span className="text-[9px] font-extrabold bg-rose-600 px-1.5 py-0.2 rounded-full mt-0.5">
                  {t('75% 파격 할인 혜택')}
                </span>
              </div>

              {/* 하단 타이틀 바 */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#f3ba2f]">
                      {t('풀패키지 가전·가구 묶음 할인')}
                    </span>
                    <p className="text-sm font-black drop-shadow-sm truncate">
                      {t('냉장고·세탁기·밥솥 가전 가구 풀세트 급처분 매물')}
                    </p>
                  </div>
                  <span className="text-xs font-black text-rose-400 bg-black/50 px-2 py-1 rounded-lg border border-rose-400/40">
                    {t('묶음 특가로 처분하기')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 4대 안심 보증 띠 바 */}
      <div className="border-t border-[#ded1c4]/70 bg-[#ede3d8]/80 px-4 sm:px-6 py-3.5 backdrop-blur-xs">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-[#5c4a39] text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#845b37]" />
            <span className="font-semibold">{t('수수료 0원으로 100% 무료 직거래를 이용하세요')}</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-[#845b37]" />
            <span className="font-semibold">{t('17개국어로 실시간 인공지능 양방향 번역을 지원합니다')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#845b37]" />
            <span className="font-semibold">{t('평균 184만 원 세금 환급 혜택을 연계해 드립니다')}</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-[#845b37]" />
            <span className="font-semibold">{t('귀국 외국인 근로자의 무빙세일 특가 매물을 만나보세요')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
