'use client';

import React from 'react';
import { useKMarket } from '@/context/KMarketContext';
import { Sparkles, ArrowRight, DollarSign, Clock, ShieldCheck } from 'lucide-react';

export default function KMarketTaxBanner() {
  const { setIsTaxModalOpen } = useKMarket();

  return (
    <section className="w-full my-6">
      <div
        onClick={() => setIsTaxModalOpen(true)}
        className="group relative overflow-hidden rounded-3xl p-6 sm:p-8 border border-[#ded1c4] cursor-pointer transition-all duration-300 shadow-xs hover:shadow-md"
        style={{
          background: 'linear-gradient(135deg, #f7f1eb 0%, #ebe0d5 100%)',
        }}
      >
        {/* 미세한 앰비언트 백그라운드 */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-left">
            {/* 상단 뱃지 */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 bg-[#dfd3c7] text-[#5c4a39] px-3 py-1 rounded-full text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>KTRS 외국인 근로자 전용 특별 세무 혜택</span>
              </div>

              <div className="inline-flex items-center gap-1 bg-white/80 text-[#2d5a27] px-2.5 py-1 rounded-full text-xs font-bold border border-[#c2d6be]/60">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>선결제 0원 · 환급 입금 후 후불결제</span>
              </div>
            </div>

            {/* 헤드라인 타이틀 */}
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1f1914] tracking-tight leading-snug">
              한국 근무 1년 이상? 떼인 세금 <span className="text-[#845b37] underline underline-offset-4 decoration-[#845b37]/40">[평균 184만원]</span> 30초 무료 환급 조회
            </h2>

            {/* 3대 핵심 팩트 */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-medium text-[#6b5847] pt-1">
              <span className="flex items-center gap-1.5 bg-white/60 px-3 py-1.5 rounded-xl border border-[#ded1c4]/60">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span>소요시간 30초 간편 조회</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white/60 px-3 py-1.5 rounded-xl border border-[#ded1c4]/60">
                <DollarSign className="w-3.5 h-3.5 text-amber-700" />
                <span className="font-bold text-[#1f1914]">평균 184만원 환급 수령</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white/60 px-3 py-1.5 rounded-xl border border-[#ded1c4]/60">
                <span className="text-emerald-700 font-bold">100% 무료 사전 조회</span>
              </span>
            </div>
          </div>

          {/* 우측 액션 버튼 */}
          <div className="shrink-0 flex items-center">
            <button className="w-full sm:w-auto bg-[#1f1914] hover:bg-[#332b23] text-[#fbf9f6] font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-sm flex items-center justify-center gap-2.5 group-hover:translate-x-0.5 transition-all cursor-pointer">
              <span>내 환급금 30초 무료 조회하기</span>
              <ArrowRight className="w-4 h-4 text-[#ded1c4] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
