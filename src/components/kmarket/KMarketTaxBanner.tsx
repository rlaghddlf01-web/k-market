'use client';

import React from 'react';
import { useKMarket } from '@/context/KMarketContext';
import { Sparkles, ArrowRight, DollarSign, Clock, ShieldCheck, Gift, Scale } from 'lucide-react';

export default function KMarketTaxBanner() {
  const { setIsTaxModalOpen } = useKMarket();

  return (
    <div className="w-full my-5">
      <div
        onClick={() => setIsTaxModalOpen(true)}
        className="group relative overflow-hidden rounded-3xl p-6 sm:p-8 text-white border border-[#c5a059]/40 cursor-pointer transition-all duration-300 shadow-2xl shadow-slate-950/20 hover:border-[#f3ba2f] hover:scale-[1.005] active:scale-[0.995]"
        style={{
          background: 'linear-gradient(135deg, #09101f 0%, #111d38 50%, #162447 100%)',
        }}
      >
        {/* 우측 감성적인 고화질 세무 상담 사진 (미드나잇 오버레이 블렌딩) */}
        <div className="absolute right-0 top-0 bottom-0 w-full sm:w-1/2 overflow-hidden opacity-20 sm:opacity-30 mix-blend-luminosity pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80"
            alt="Tax refund consultation"
            className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#09101f] via-[#09101f]/80 to-transparent" />
        </div>

        {/* 럭셔리 골드 앰비언트 글로우 */}
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#c5a059]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 right-1/4 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-left">
            {/* 상단: 국세청 법적 근거 골드 라인 */}
            <div className="flex items-center gap-2">
              <span className="h-px w-6 bg-[#c5a059]/60" />
              <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[#e5c07b]">
                <Scale className="w-3.5 h-3.5 text-[#f3ba2f]" />
                <span>대한민국 국세청(NTS) 조세특례제한법 제30조 법적 권리</span>
              </div>
              <span className="h-px w-6 bg-[#c5a059]/60" />
            </div>

            {/* 헤드라인 타이틀 */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white leading-tight drop-shadow-sm">
              지나치기 쉬운 세금 환급, <br className="hidden sm:inline" />
              외국인 근로자도 보장받는 <span className="text-[#f3ba2f] underline underline-offset-4 decoration-[#f3ba2f]/60">[평균 184만원]</span> 30초 무료 조회
            </h2>

            {/* 3대 핵심 보증 칩 (골드 테두리 & 다크 뱃지) */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-bold pt-1 text-[#e2e8f0]">
              <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-[#c5a059]/40 text-[#fde047]">
                <Clock className="w-3.5 h-3.5 text-[#f3ba2f]" />
                <span>소요시간 30초</span>
              </span>
              <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-[#c5a059]/40 text-white">
                <DollarSign className="w-3.5 h-3.5 text-[#f3ba2f]" />
                <span>평균 184만원 수령</span>
              </span>
              <span className="flex items-center gap-1.5 bg-emerald-950/60 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-emerald-400/40 text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>선결제 0원 (100% 후불제)</span>
              </span>
            </div>
          </div>

          {/* 우측 액션 버튼: 스크린샷 스타일 골든 그라데이션 솔리드 버튼 */}
          <div className="shrink-0 flex items-center pt-2 lg:pt-0">
            <button 
              className="w-full sm:w-auto font-black text-xs sm:text-sm px-7 py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2.5 transition-all cursor-pointer group-hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #fce38a 0%, #f3ba2f 50%, #d4af37 100%)',
                color: '#0b132b',
              }}
            >
              <span>내 환급금 30초 무료 조회하기</span>
              <ArrowRight className="w-4 h-4 text-[#0b132b] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
