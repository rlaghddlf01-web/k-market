'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useKMarket } from '@/context/KMarketContext';
import { Sparkles, ArrowRight, DollarSign, Clock, CheckCircle } from 'lucide-react';

export default function KMarketTaxBanner() {
  const { t } = useLanguage();
  const { setIsTaxModalOpen } = useKMarket();

  return (
    <div className="w-full my-4">
      <div
        onClick={() => setIsTaxModalOpen(true)}
        className="group relative overflow-hidden rounded-2xl bg-linear-to-r from-amber-500 via-orange-500 to-rose-500 p-4 sm:p-5 text-white shadow-xl shadow-orange-500/20 cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all duration-300"
      >
        {/* 장식용 배경 이펙트 */}
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
        <div className="absolute top-0 right-1/4 w-24 h-24 bg-yellow-300/20 rounded-full blur-xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center space-x-1.5 bg-black/20 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-amber-200 border border-white/20">
              <Sparkles className="w-3 h-3 text-yellow-300 animate-spin" />
              <span>KTRS 특별 혜택 / Special Tax Benefit</span>
              <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.2 rounded-full font-extrabold ml-1">
                D-day
              </span>
            </div>

            <h2 className="text-base sm:text-lg md:text-xl font-extrabold tracking-tight text-white leading-snug drop-shadow-xs">
              {t('tax_banner_title')}
            </h2>

            <div className="flex flex-wrap items-center gap-3 text-xs text-orange-100 pt-0.5">
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-yellow-300" />
                <span>소요시간 30초</span>
              </span>
              <span className="flex items-center space-x-1">
                <DollarSign className="w-3.5 h-3.5 text-yellow-300" />
                <span>평균 184만원 환급</span>
              </span>
              <span className="flex items-center space-x-1">
                <CheckCircle className="w-3.5 h-3.5 text-yellow-300" />
                <span>100% 무료 조회</span>
              </span>
            </div>
          </div>

          <div className="shrink-0 flex items-center">
            <button className="w-full sm:w-auto bg-white hover:bg-yellow-50 text-slate-900 font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg flex items-center justify-center space-x-2 group-hover:translate-x-1 transition-all cursor-pointer">
              <span>{t('tax_banner_btn')}</span>
              <ArrowRight className="w-4 h-4 text-orange-600 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
