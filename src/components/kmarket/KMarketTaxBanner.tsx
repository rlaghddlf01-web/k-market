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
        className="group relative overflow-hidden rounded-3xl bg-linear-to-r from-amber-500 via-orange-500 to-rose-600 p-5 sm:p-6 text-white shadow-2xl shadow-orange-500/25 cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 border border-amber-300/30"
      >
        {/* 장식용 배경 이펙트 & 글로우 */}
        <div className="absolute -right-10 -bottom-10 w-52 h-52 bg-yellow-300/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
        <div className="absolute top-0 right-1/3 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            {/* 상단 뱃지 그룹 */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center space-x-1.5 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-200 border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" />
                <span>KTRS 특별 혜택 / Special Tax Benefit</span>
                <span className="bg-rose-600 text-white text-[10px] px-2 py-0.2 rounded-full font-black ml-1 shadow-xs">
                  D-day
                </span>
              </div>

              <div className="inline-flex items-center space-x-1 bg-emerald-950/50 backdrop-blur-md text-emerald-300 px-2.5 py-1 rounded-full text-xs font-extrabold border border-emerald-400/30">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>선결제 0원 (환급 입금 후 결제)</span>
              </div>
            </div>

            {/* 헤드라인 타이틀 */}
            <h2 className="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-white leading-tight drop-shadow-sm">
              한국 근무 1년 이상? 떼인 세금 <span className="text-yellow-300 underline underline-offset-4 decoration-amber-300/80">[평균 184만원]</span> 30초 무료 환급 조회!
            </h2>

            {/* 3대 핵심 혜택 안내 */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-semibold text-orange-100 pt-1">
              <span className="flex items-center space-x-1.5 bg-black/20 px-2.5 py-1 rounded-xl">
                <Clock className="w-3.5 h-3.5 text-yellow-300" />
                <span>소요시간 30초</span>
              </span>
              <span className="flex items-center space-x-1.5 bg-black/20 px-2.5 py-1 rounded-xl">
                <DollarSign className="w-3.5 h-3.5 text-yellow-300" />
                <span className="text-yellow-200 font-bold">평균 184만원 환급</span>
              </span>
              <span className="flex items-center space-x-1.5 bg-black/20 px-2.5 py-1 rounded-xl">
                <Gift className="w-3.5 h-3.5 text-yellow-300" />
                <span>100% 무료 조회</span>
              </span>
            </div>
          </div>

          {/* 우측 액션 버튼 */}
          <div className="shrink-0 flex items-center">
            <button className="w-full sm:w-auto bg-white hover:bg-yellow-50 text-slate-900 font-black text-sm px-6 py-3.5 rounded-2xl shadow-xl hover:shadow-2xl flex items-center justify-center space-x-2.5 group-hover:translate-x-1 transition-all cursor-pointer">
              <span>내 환급금 30초 무료 조회하기</span>
              <ArrowRight className="w-4 h-4 text-orange-600 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
