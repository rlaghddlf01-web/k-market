'use client';

import React from 'react';
import { useKMarket } from '@/context/KMarketContext';
import { Sparkles, ArrowRight, DollarSign, Clock, ShieldCheck, Gift } from 'lucide-react';

export default function KMarketTaxBanner() {
  const { setIsTaxModalOpen } = useKMarket();

  return (
    <div className="w-full my-4">
      <div
        onClick={() => setIsTaxModalOpen(true)}
        className="group relative overflow-hidden rounded-3xl p-6 sm:p-7 text-[#1f1914] border border-[#ded1c4] cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:border-[#c5b5a4]"
        style={{
          background: 'linear-gradient(135deg, #f7f1ea 0%, #ede2d6 50%, #e2d4c5 100%)',
        }}
      >
        {/* 우측 감성적인 고화질 세무/환급 쇼케이스 배경 이미지 (오버레이 블렌딩) */}
        <div className="absolute right-0 top-0 bottom-0 w-full sm:w-1/2 overflow-hidden opacity-30 sm:opacity-40 mix-blend-multiply pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80"
            alt="Tax refund consultation"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f7f1ea] via-[#f7f1ea]/80 to-transparent" />
        </div>

        {/* 앰비언트 소프트 글로우 */}
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-white/50 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="space-y-2.5 max-w-2xl text-left">
            {/* 상단 뱃지 그룹 */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 bg-[#1f1914] text-[#fbf9f6] px-3 py-1 rounded-full text-xs font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
                <span>KTRS 특별 혜택 / Special Tax Benefit</span>
                <span className="bg-amber-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-black ml-1">
                  D-day
                </span>
              </div>

              <div className="inline-flex items-center gap-1 bg-white/90 text-[#2d5a27] px-2.5 py-1 rounded-full text-xs font-bold border border-[#c2d6be]/80">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>선결제 0원 (환급 입금 후 결제)</span>
              </div>
            </div>

            {/* 헤드라인 타이틀 */}
            <h2 className="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-[#1f1914] leading-tight">
              한국 근무 1년 이상? 떼인 세금 <span className="text-[#845b37] underline underline-offset-4 decoration-[#845b37]/50">[평균 184만원]</span> 30초 무료 환급 조회!
            </h2>

            {/* 3대 핵심 혜택 안내 */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-semibold text-[#5c4a39] pt-0.5">
              <span className="flex items-center gap-1.5 bg-white/75 backdrop-blur-xs px-2.5 py-1 rounded-xl border border-[#ded1c4]">
                <Clock className="w-3.5 h-3.5 text-[#845b37]" />
                <span>소요시간 30초</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white/75 backdrop-blur-xs px-2.5 py-1 rounded-xl border border-[#ded1c4]">
                <DollarSign className="w-3.5 h-3.5 text-[#845b37]" />
                <span className="text-[#1f1914] font-bold">평균 184만원 환급</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white/75 backdrop-blur-xs px-2.5 py-1 rounded-xl border border-[#ded1c4]">
                <Gift className="w-3.5 h-3.5 text-[#845b37]" />
                <span>100% 무료 사전 조회</span>
              </span>
            </div>
          </div>

          {/* 우측 액션 버튼 */}
          <div className="shrink-0 flex items-center pt-1 lg:pt-0">
            <button className="w-full sm:w-auto bg-[#1f1914] hover:bg-[#332b23] text-[#fbf9f6] font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-sm flex items-center justify-center gap-2.5 group-hover:translate-x-0.5 transition-all cursor-pointer">
              <span>내 환급금 30초 무료 조회하기</span>
              <ArrowRight className="w-4 h-4 text-amber-200 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
