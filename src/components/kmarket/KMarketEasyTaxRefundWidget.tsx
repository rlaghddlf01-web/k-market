'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useState } from 'react';
import { useKMarket } from '@/context/KMarketContext';
import {
  Sparkles,
  ArrowRight,
  Calendar,
  Coins,
  TrendingUp,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface KMarketEasyTaxRefundWidgetProps {
  onApplyClick?: () => void;
}

const SALARY_OPTIONS = [150, 200, 250, 300, 350, 400, 500, 600];

export default function KMarketEasyTaxRefundWidget({
  onApplyClick,
}: KMarketEasyTaxRefundWidgetProps) {
  const { t } = useLanguage();
  const { setIsTaxModalOpen } = useKMarket();

  // 1. 근무 개월 수 (1 ~ 60개월, 기본 36개월)
  const [months, setMonths] = useState<number>(36);

  // 2. 평균 월 급여 (단위: 만원, 기본 250만원)
  const [salaryManwon, setSalaryManwon] = useState<number>(250);

  // 3. AI 환급금 정밀 계산 로직 (조특법 90% 청년/외국인 감면 + 연말정산 누락분)
  const calculateRefund = (m: number, sal: number) => {
    const annualSal = sal * 10000 * 12;
    let taxRate = 0.03;
    if (sal >= 400) taxRate = 0.042;
    else if (sal >= 300) taxRate = 0.035;
    else taxRate = 0.028;

    const annualTax = annualSal * taxRate;
    const years = m / 12;
    const totalBaseTax = annualTax * years;

    // 비자/청년 감면율 90%
    const reductionFactor = 0.9 * 0.95;
    const estimated = Math.round((totalBaseTax * reductionFactor) / 1000) * 1000;
    return Math.max(estimated, 350000);
  };

  const estimatedRefund = calculateRefund(months, salaryManwon);

  const handleApply = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
    if (onApplyClick) {
      onApplyClick();
    } else {
      setIsTaxModalOpen(true);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white p-3.5 sm:p-4 shadow-xl border border-indigo-500/30">
      {/* 배경 장식 광원 효과 */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* 상단 헤더: 타이틀 및 KTRS 공식 뱃지 */}
      <div className="relative z-10 space-y-1 text-center pb-1">
        <div className="inline-flex items-center space-x-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full text-[11px] font-black tracking-wide">
          <Sparkles className="w-3 h-3 text-yellow-300 animate-spin" />
          <span>{t('tax_modal_link_badge')}</span>
        </div>
        <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
          {t('widget_tax_headline')}
        </h3>
      </div>

      {/* 실시간 대상 연령 안내 카드 (슬림 콤팩트) */}
      <div className="relative z-10 mt-2 p-2 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-between gap-2">
        <div className="flex items-center space-x-2 min-w-0">
          <div className="w-6 h-6 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
            <Award className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-black text-white">{t('widget_tax_age_benefit_label')}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] text-emerald-300 font-bold hidden sm:inline">AI LIVE TRACKER</span>
            </div>
            <p className="text-[10px] text-slate-300 truncate">
              {t('widget_tax_age_desc')}
            </p>
          </div>
        </div>
        <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-lg shrink-0 shadow-xs">
          {t('widget_tax_age_badge')}
        </span>
      </div>

      {/* 1. 최근 5년 한국 근무 기간 슬라이더 */}
      <div className="relative z-10 mt-2.5 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-indigo-400" />
            <span>{t('tax_work_years_label')}</span>
          </span>
          <span className="text-xs font-black text-amber-400 bg-amber-400/10 px-2 py-0.2 rounded-md border border-amber-400/20">
            {months}{t('time_months')} ({(months / 12).toFixed(1)}{t('time_years')})
          </span>
        </div>

        <input
          type="range"
          min={1}
          max={60}
          value={months}
          onChange={(e) => setMonths(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-700/80 rounded-lg appearance-none cursor-pointer accent-amber-400 focus:outline-none"
        />

        <div className="flex justify-between text-[9px] text-slate-400 font-medium px-0.5">
          <span>1{t('time_months')}</span>
          <span>30{t('time_months')} (2.5{t('time_years')})</span>
          <span>60{t('time_months')} (5{t('time_years')})</span>
        </div>
      </div>

      {/* 2. 평균 월 급여 (세전) 콤팩트 알약 칩 버튼 */}
      <div className="relative z-10 mt-2.5 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
            <Coins className="w-3 h-3 text-indigo-400" />
            <span>{t('tax_monthly_pay_label')}</span>
          </span>
          <span className="text-xs font-black text-amber-400">
            {salaryManwon} {t('currency_10k_won')}
          </span>
        </div>

        {/* 콤팩트 2열 알약 칩 그리드 */}
        <div className="grid grid-cols-4 gap-1.5">
          {SALARY_OPTIONS.map((sal) => {
            const isSelected = salaryManwon === sal;
            return (
              <button
                key={sal}
                type="button"
                onClick={() => setSalaryManwon(sal)}
                className={`py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-xs scale-[1.02]'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                }`}
              >
                {sal === 600 ? '600+' : sal}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. AI 예상 환급 가능 금액 디스플레이 박스 (금액은 크고 웅장하게 강조!) */}
      <div className="relative z-10 mt-3 p-3 rounded-xl bg-black/40 backdrop-blur-md border border-amber-500/30 text-center space-y-1 shadow-inner">
        <div className="flex items-center justify-center space-x-2 text-[10px] text-amber-200/90 font-bold">
          <span className="w-6 h-px bg-amber-500/40" />
          <span className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-amber-400" />
            <span>{t('tax_estimated_refund_badge')}</span>
          </span>
          <span className="w-6 h-px bg-amber-500/40" />
        </div>

        {/* 🌟 금액은 그대로 크고 선명하게! */}
        <div className="text-2xl sm:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 py-0.5">
          ₩ {estimatedRefund.toLocaleString()}
        </div>

        {/* 🛡️ 선결제 0원 (후불결제) 안심 뱃지 */}
        <div className="flex items-center justify-center gap-1.5 pt-0.5">
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full font-black flex items-center gap-1 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>{t('tax_modal_zero_prepay')}</span>
          </span>
          <span className="text-[10px] text-slate-300">
            {t('tax_success_fee_note')}
          </span>
        </div>
      </div>

      {/* 4. KTRS 이지텍스 즉시 환급 신청 CTA 버튼 */}
      <div className="relative z-10 mt-2.5">
        <button
          type="button"
          onClick={handleApply}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
        >
          <span>
            {t('widget_tax_apply_btn')} (₩ {estimatedRefund.toLocaleString()})
          </span>
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </button>
        <p className="text-[10px] text-amber-200/90 text-center mt-1 font-medium">
          {t('widget_tax_guarantee_note')}
        </p>
      </div>
    </div>
  );
}
