'use client';

import React from 'react';
import { useKMarket } from '@/context/KMarketContext';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, ShieldCheck, Sparkles, MessageCircle, RefreshCw } from 'lucide-react';

export default function KMarketHeroShowcase() {
  const { setIsTaxModalOpen, setIsCreateModalOpen } = useKMarket();
  const { t } = useLanguage();

  return (
    <section className="w-full mb-8">
      {/* 와이드 감성 히어로 카드 */}
      <div 
        className="relative overflow-hidden rounded-3xl border border-[#e3ded9] transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, #eee8e2 0%, #e5ded7 100%)',
        }}
      >
        {/* 미세한 앰비언트 글로우 */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 py-10 sm:py-14 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          {/* 좌측: 타이포그래피 & CTA */}
          <div className="max-w-xl space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dfd7ce] text-[#5c4f42] text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>대한민국 외국인 근로자 No.1 안심 플랫폼</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1f1914] tracking-tight leading-tight sm:leading-snug">
              외국인 안심 직거래 &amp; <br />
              <span className="text-[#845b37]">귀국 무빙세일</span> 컬렉션
            </h1>

            <p className="text-sm sm:text-base text-[#6b5c4f] font-normal leading-relaxed">
              15개국어 실시간 Gemini 양방향 자동번역 채팅과 <br className="hidden sm:inline" />
              신원인증 기반 공단 도보 직거래로 안전하게 거래하세요.
            </p>

            {/* CTA 버튼 그룹 */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-6 py-3 rounded-full bg-[#1f1914] hover:bg-[#332b23] text-[#fbf9f6] text-xs sm:text-sm font-semibold transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>내 물건 1분 등록</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsTaxModalOpen(true)}
                className="px-5 py-3 rounded-full bg-[#fbf9f6] hover:bg-white text-[#1f1914] border border-[#d8d0c7] text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span>세무 환급 184만원 무료조회</span>
              </button>
            </div>
          </div>

          {/* 우측: 감성적인 쇼케이스 이미지 */}
          <div className="w-full md:w-5/12 max-w-sm shrink-0">
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-md border border-white/60 bg-[#dfd7ce]">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
                alt="Living & Electronics moving sale"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2 py-0.5 rounded">
                  D-3 귀국 급처분
                </span>
                <p className="text-xs font-semibold mt-1 truncate">
                  원룸 풀옵션 가전·가구 묶음 특가 세트
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 3대 안심 보증 띠 */}
        <div className="border-t border-[#dfd7ce]/80 bg-[#e8e1da]/60 px-6 py-3.5 backdrop-blur-xs">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-[#5c4f42] text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#845b37]" />
              <span className="font-medium">수수료 0원 직거래</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#845b37]" />
              <span className="font-medium">15개국어 실시간 번역</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#845b37]" />
              <span className="font-medium">선결제 0원 세무환급</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-[#845b37]" />
              <span className="font-medium">귀국 무빙세일 전용관</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
