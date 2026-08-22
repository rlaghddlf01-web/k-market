'use client';

import { useLanguage } from '@/context/LanguageContext';
import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, CheckCircle2 } from 'lucide-react';
import { useKMarket } from '@/context/KMarketContext';

export default function KMarketSuperBenefitCards() {
  const { t } = useLanguage();
  const { setIsTaxModalOpen } = useKMarket();

  return (
    <section className="w-full my-4">
      {/* 3대 프리미엄 혜택 카드 3열 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        
        {/* 1. 💰 5개년 세무 환급 (최대 1,000만원) */}
        <div 
          onClick={() => setIsTaxModalOpen(true)}
          className="relative rounded-3xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer flex flex-col justify-between overflow-hidden border group"
          style={{
            background: 'linear-gradient(145deg, #2a1b12 0%, #170e0a 100%)',
            borderColor: 'rgba(243, 186, 47, 0.35)',
            boxShadow: '0 8px 24px rgba(23, 14, 10, 0.30)',
          }}
        >
          {/* 상단 럭셔리 골드 글로우 */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#f3ba2f]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#f3ba2f]/20 transition-all" />
          
          <div className="space-y-4 relative z-10">
            {/* 상단 태그 & 아이콘 */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-full bg-[#f3ba2f]/20 text-[#f3ba2f] border border-[#f3ba2f]/40 tracking-tight">
                <Sparkles className="w-3 h-3 text-[#f3ba2f]" />
                <span>{t('auto_ui_275')}</span>
              </span>
              <div className="w-10 h-10 rounded-2xl bg-[#3d2817] border border-[#f3ba2f]/30 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">
                💰
              </div>
            </div>

            {/* 타이틀 & 강조 금액 */}
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white/80">{t('auto_ui_276')}</h3>
              <div className="text-xl sm:text-2xl font-black text-[#f3ba2f] tracking-tight flex items-baseline gap-1.5">
                <span>{t('auto_ui_277')}</span>
                <span className="text-xs font-semibold text-amber-200/80">{t('auto_ui_278')}</span>
              </div>
            </div>

            {/* 3대 핵심 혜택 리스트 */}
            <ul className="space-y-2 text-xs text-white/85 font-medium pt-1 border-t border-white/10">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#f3ba2f] shrink-0" />
                <span>{t('auto_ui_279')} <strong>{t('auto_ui_280')}</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#f3ba2f] shrink-0" />
                <span>{t('auto_ui_281')} <strong>{t('auto_ui_282')}</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#f3ba2f] shrink-0" />
                <span>{t('auto_ui_283')} <strong>{t('auto_ui_284')}</strong></span>
              </li>
            </ul>
          </div>

          {/* 하단 CTA 버튼 */}
          <div className="pt-5 mt-2 relative z-10">
            <button 
              className="w-full py-2.5 px-4 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1.5 shadow-md group-hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #f3ba2f 0%, #d49b18 100%)',
                color: '#1f140c',
              }}
            >
              <span>{t('auto_ui_285')}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* 2. ⚡ 외국인 맞춤 대출 (최대 5,000만원) */}
        <div 
          onClick={() => alert(t('auto_loop_868'))}
          className="relative rounded-3xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer flex flex-col justify-between overflow-hidden border group"
          style={{
            background: 'linear-gradient(145deg, #131b2e 0%, #0a0f1c 100%)',
            borderColor: 'rgba(96, 165, 250, 0.35)',
            boxShadow: '0 8px 24px rgba(10, 15, 28, 0.30)',
          }}
        >
          {/* 상단 블루 글로우 */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/20 transition-all" />
          
          <div className="space-y-4 relative z-10">
            {/* 상단 태그 & 아이콘 */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40 tracking-tight">
                <Zap className="w-3 h-3 text-blue-400" />
                <span>{t('auto_ui_286')}</span>
              </span>
              <div className="w-10 h-10 rounded-2xl bg-blue-950/80 border border-blue-400/30 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">
                ⚡
              </div>
            </div>

            {/* 타이틀 & 강조 금액 */}
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white/80">{t('auto_ui_287')}</h3>
              <div className="text-xl sm:text-2xl font-black text-blue-400 tracking-tight flex items-baseline gap-1.5">
                <span>{t('auto_ui_288')}</span>
                <span className="text-xs font-semibold text-blue-200/80">{t('auto_ui_289')}</span>
              </div>
            </div>

            {/* 3대 핵심 혜택 리스트 */}
            <ul className="space-y-2 text-xs text-white/85 font-medium pt-1 border-t border-white/10">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{t('auto_ui_290')} <strong>{t('auto_ui_291')}</strong> {t('auto_ui_292')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{t('auto_ui_293')} <strong>{t('auto_ui_294')}</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{t('auto_ui_295')} <strong>{t('auto_ui_296')}</strong> {t('auto_ui_297')}</span>
              </li>
            </ul>
          </div>

          {/* 하단 CTA 버튼 */}
          <div className="pt-5 mt-2 relative z-10">
            <button 
              className="w-full py-2.5 px-4 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1.5 shadow-md group-hover:shadow-lg text-white"
              style={{
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              }}
            >
              <span>{t('auto_ui_298')}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* 3. 🏠 내 동네 안심 원룸 & 주택 */}
        <div 
          onClick={() => alert(t('auto_loop_869'))}
          className="relative rounded-3xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer flex flex-col justify-between overflow-hidden border group"
          style={{
            background: 'linear-gradient(145deg, #13241b 0%, #09140e 100%)',
            borderColor: 'rgba(52, 211, 153, 0.35)',
            boxShadow: '0 8px 24px rgba(9, 20, 14, 0.30)',
          }}
        >
          {/* 상단 에메랄드 글로우 */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/20 transition-all" />
          
          <div className="space-y-4 relative z-10">
            {/* 상단 태그 & 아이콘 */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 tracking-tight">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>{t('auto_ui_299')}</span>
              </span>
              <div className="w-10 h-10 rounded-2xl bg-emerald-950/80 border border-emerald-400/30 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">
                🏠
              </div>
            </div>

            {/* 타이틀 & 강조 금액 */}
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white/80">{t('auto_ui_300')}</h3>
              <div className="text-xl sm:text-2xl font-black text-emerald-400 tracking-tight flex items-baseline gap-1.5">
                <span>{t('auto_ui_301')}</span>
                <span className="text-xs font-semibold text-emerald-200/80">{t('auto_ui_302')}</span>
              </div>
            </div>

            {/* 3대 핵심 혜택 리스트 */}
            <ul className="space-y-2 text-xs text-white/85 font-medium pt-1 border-t border-white/10">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{t('auto_ui_303')} <strong>{t('auto_ui_304')}</strong> {t('auto_ui_305')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{t('auto_ui_306')} <strong>{t('auto_ui_307')}</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span><strong>{t('auto_ui_308')}</strong> {t('auto_ui_309')}</span>
              </li>
            </ul>
          </div>

          {/* 하단 CTA 버튼 */}
          <div className="pt-5 mt-2 relative z-10">
            <button 
              className="w-full py-2.5 px-4 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1.5 shadow-md group-hover:shadow-lg text-white"
              style={{
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              }}
            >
              <span>{t('auto_ui_310')}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
