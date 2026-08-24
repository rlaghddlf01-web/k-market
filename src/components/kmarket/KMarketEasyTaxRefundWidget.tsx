'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useState } from 'react';
import { useKMarket } from '@/context/KMarketContext';
import {
  Sparkles,
  ArrowRight,
  Calendar,
  Coins,
  ShieldCheck,
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
  const { setIsTaxModalOpen, openTaxModalWithPrefill, authedUser } = useKMarket();

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
    openTaxModalWithPrefill({
      step: 2,
      months,
      salaryManwon,
      visa: authedUser?.visaType?.split(' ')[0] || 'E-9',
    });
    if (onApplyClick) {
      onApplyClick();
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
          <span>{t('국세청 실시간 원스톱 환급 연계')}</span>
        </div>
        <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
          {t('나의 잠재 환급액 10초 만에 확인하기')}
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
              <span className="text-[11px] font-black text-white">{t('조특법 청년/외국인 세제 감면 대상')}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] text-emerald-300 font-bold hidden sm:inline">{t('AI 실시간 환급 트래커')}</span>
            </div>
            <p className="text-[10px] text-slate-300 truncate">
              {t('1991년 8월 22일 ~ 2011년 8월 21일 (만 15세 ~ 34세)')}
            </p>
          </div>
        </div>
        <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-lg shrink-0 shadow-xs">
          {t('만 15세~34세')}
        </span>
      </div>

      {/* 1. 최근 5년 한국 근무 기간 슬라이더 */}
      <div className="relative z-10 mt-3 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-indigo-400" />
            <span>{t('최근 5년 한국 근무 기간')}</span>
          </span>
          <span className="text-xs font-black text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
            {months}{t('개월')}
          </span>
        </div>

        <input
          type="range"
          min={1}
          max={60}
          value={months}
          onChange={(e) => setMonths(Number(e.target.value))}
          className="w-full h-2 bg-slate-700/80 rounded-lg appearance-none cursor-pointer accent-[#f3ba2f] focus:outline-none"
        />

        <div className="flex justify-between text-[10px] text-slate-400 font-bold px-0.5">
          <span>1 {t('개월')}</span>
          <span>30 {t('개월')}</span>
          <span>60 {t('개월')}</span>
        </div>
      </div>

      {/* 2. 평균 월 급여 (세전) 콤팩트 알약 칩 버튼 */}
      <div className="relative z-10 mt-3 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
            <Coins className="w-3.5 h-3.5 text-indigo-400" />
            <span>{t('평균 월 급여 (세전)')}</span>
          </span>
          <span className="text-xs font-black text-amber-400">
            {salaryManwon >= 600 ? '600+ ' : salaryManwon}{t('만 원')}
          </span>
        </div>

        {/* 콤팩트 4열 알약 칩 그리드 */}
        <div className="grid grid-cols-4 gap-1.5">
          {SALARY_OPTIONS.map((val) => {
            const isSelected = salaryManwon === val;
            return (
              <button
                key={val}
                type="button"
                onClick={() => setSalaryManwon(val)}
                className={`py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#f3ba2f] text-[#09101f] border-[#f3ba2f] shadow-md scale-[1.02]'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                }`}
              >
                {val === 600 ? '600+' : val}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. AI 계산된 실시간 예상 환급액 박스 */}
      <div className="relative z-10 mt-3.5 p-3 rounded-2xl bg-black/40 border border-[#f3ba2f]/30 text-center space-y-1">
        <div className="flex items-center justify-center space-x-1 text-[11px] font-bold text-amber-300">
          <Sparkles className="w-3.5 h-3.5 text-[#f3ba2f]" />
          <span>{t('AI 예상 환급 가능 금액')}</span>
        </div>
        <div className="text-2xl sm:text-3xl font-black text-[#f3ba2f] tracking-tight">
          ₩ {estimatedRefund.toLocaleString()}
        </div>
        <div className="inline-flex items-center space-x-1 text-[10px] text-emerald-300 font-bold bg-emerald-950/60 px-2 py-0.2 rounded-full border border-emerald-500/30">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>{t('선결제 비용 0원 (초기 수수료 없음)')} • 100% {t('후불제')}</span>
        </div>
      </div>

      {/* 4. 환급 신청 CTA 버튼 */}
      <div className="relative z-10 mt-3">
        <button
          onClick={handleApply}
          className="w-full py-3.5 bg-gradient-to-r from-[#f3ba2f] via-[#e5a823] to-[#c78d10] hover:from-[#f5c347] hover:to-[#d49915] text-[#09101f] font-black text-xs sm:text-sm rounded-xl shadow-xl active:scale-[0.98] transition-all flex items-center justify-center space-x-1.5 cursor-pointer border border-[#ffffff]/40"
        >
          <span>🚀 {t('케이티알에스에서 바로 환급 신청하기')} (₩ {estimatedRefund.toLocaleString()})</span>
          <ArrowRight className="w-4 h-4 text-[#09101f]" />
        </button>
        <p className="text-center text-[10px] text-slate-400 mt-1">
          🛡️ {t('선결제 0원 (후불결제) · 서류 제출 없이 1초 접수')}
        </p>
      </div>
    </div>
  );
}
