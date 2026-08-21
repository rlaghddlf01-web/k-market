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
        className="group relative overflow-hidden rounded-3xl p-6 sm:p-8 text-white border border-amber-400/40 cursor-pointer transition-all duration-300 shadow-xl shadow-amber-950/15 hover:shadow-2xl hover:scale-[1.005] active:scale-[0.995]"
        style={{
          background: 'linear-gradient(135deg, #d97706 0%, #b45309 50%, #78350f 100%)',
        }}
      >
        {/* 우측 감성적인 고화질 세무/환급 쇼케이스 배경 이미지 (골든 오버레이) */}
        <div className="absolute right-0 top-0 bottom-0 w-full sm:w-1/2 overflow-hidden opacity-25 sm:opacity-35 mix-blend-luminosity pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80"
            alt="Tax refund consultation"
            className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#d97706] via-[#d97706]/70 to-transparent" />
        </div>

        {/* 장식용 골드 앰비언트 글로우 */}
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-amber-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 right-1/4 w-48 h-48 bg-yellow-200/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-left">
            {/* 상단 뱃지 그룹 */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-md text-amber-200 px-3.5 py-1 rounded-full text-xs font-bold border border-white/20 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" />
                <span>KTRS 특별 혜택 / Special Tax Benefit</span>
                <span className="bg-rose-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-black ml-1 shadow-xs">
                  D-day
                </span>
              </div>

              <div className="inline-flex items-center gap-1 bg-emerald-950/70 backdrop-blur-md text-emerald-300 px-3 py-1 rounded-full text-xs font-extrabold border border-emerald-400/40">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>선결제 0원 (환급 입금 후 결제)</span>
              </div>
            </div>

            {/* 헤드라인 타이틀 */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white leading-snug drop-shadow-sm">
              한국 근무 1년 이상? 떼인 세금 <span className="text-yellow-200 underline underline-offset-4 decoration-yellow-300 font-extrabold">[평균 184만원]</span> 30초 무료 환급 조회!
            </h2>

            {/* 3대 핵심 혜택 안내 */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-bold text-amber-100 pt-0.5">
              <span className="flex items-center gap-1.5 bg-black/25 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/15">
                <Clock className="w-3.5 h-3.5 text-yellow-300" />
                <span>소요시간 30초</span>
              </span>
              <span className="flex items-center gap-1.5 bg-black/25 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/15">
                <DollarSign className="w-3.5 h-3.5 text-yellow-300" />
                <span className="text-yellow-200 font-extrabold">평균 184만원 환급</span>
              </span>
              <span className="flex items-center gap-1.5 bg-black/25 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/15">
                <Gift className="w-3.5 h-3.5 text-yellow-300" />
                <span>100% 무료 사전 조회</span>
              </span>
            </div>
          </div>

          {/* 우측 액션 버튼 - 고대비 크림 화이트 & 딥 앰버 텍스트 */}
          <div className="shrink-0 flex items-center pt-2 lg:pt-0">
            <button className="w-full sm:w-auto bg-[#fefcf9] hover:bg-white text-[#78350f] font-black text-xs sm:text-sm px-7 py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2.5 group-hover:translate-x-1 transition-all cursor-pointer">
              <span>내 환급금 30초 무료 조회하기</span>
              <ArrowRight className="w-4 h-4 text-[#d97706] group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
