'use client';

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
  const successFee = Math.round((estimatedRefund * 0.22) / 1000) * 1000;
  const actualTakeHome = estimatedRefund - successFee;

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
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white p-5 sm:p-6 shadow-xl border border-indigo-500/30">
      {/* 배경 장식 광원 효과 */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* 상단 헤더: 타이틀 및 KTRS 공식 뱃지 */}
      <div className="relative z-10 space-y-2 text-center pb-2">
        <div className="inline-flex items-center space-x-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full text-xs font-black tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" />
          <span>KTRS × EasyTax 실시간 연계</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
          나의 잠재 환급액{' '}
          <span className="text-amber-400 underline decoration-amber-400/50 underline-offset-4">
            10초 만에 확인하기
          </span>
        </h3>
      </div>

      {/* 실시간 대상 연령 안내 카드 */}
      <div className="relative z-10 mt-3 p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-between gap-2">
        <div className="flex items-center space-x-2 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
            <Award className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-white">대상 연령 안내</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-emerald-300 font-bold hidden sm:inline">AI LIVE TRACKER</span>
            </div>
            <p className="text-[11px] text-slate-300 truncate">
              1991년 8월 22일 ~ 2011년 8월 21일 (만 15세 ~ 34세)
            </p>
          </div>
        </div>
        <span className="bg-amber-400 text-slate-950 font-black text-[11px] px-2.5 py-1 rounded-xl shrink-0 shadow-xs">
          만 15세~34세
        </span>
      </div>

      {/* 1. 최근 5년 한국 근무 기간 슬라이더 */}
      <div className="relative z-10 mt-5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-indigo-400" />
            <span>최근 5년 한국 근무 기간</span>
          </span>
          <span className="text-sm sm:text-base font-black text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-lg border border-amber-400/20">
            {months}개월 ({(months / 12).toFixed(1)}년)
          </span>
        </div>

        <input
          type="range"
          min={1}
          max={60}
          value={months}
          onChange={(e) => setMonths(Number(e.target.value))}
          className="w-full h-2.5 bg-slate-700/80 rounded-lg appearance-none cursor-pointer accent-amber-400 focus:outline-none"
        />

        <div className="flex justify-between text-[10px] text-slate-400 font-medium px-0.5">
          <span>1개월</span>
          <span>30개월 (2.5년)</span>
          <span>60개월 (5년)</span>
        </div>
      </div>

      {/* 2. 평균 월 급여 (세전) 퀵 버튼 칩 */}
      <div className="relative z-10 mt-5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Coins className="w-3.5 h-3.5 text-indigo-400" />
            <span>평균 월 급여 (세전)</span>
          </span>
          <span className="text-sm sm:text-base font-black text-amber-400">
            {salaryManwon}만 원
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {SALARY_OPTIONS.map((sal) => {
            const isSelected = salaryManwon === sal;
            return (
              <button
                key={sal}
                type="button"
                onClick={() => setSalaryManwon(sal)}
                className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-400/30 scale-[1.03]'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                }`}
              >
                {sal === 600 ? '600+' : sal}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. AI 예상 환급 가능 금액 디스플레이 박스 */}
      <div className="relative z-10 mt-6 p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-amber-500/30 text-center space-y-2 shadow-inner">
        <div className="flex items-center justify-center space-x-2 text-xs text-amber-200/90 font-bold">
          <span className="w-8 h-px bg-amber-500/40" />
          <span className="flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            <span>AI 예상 환급 가능 금액</span>
          </span>
          <span className="w-8 h-px bg-amber-500/40" />
        </div>

        <div className="text-3xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 py-1">
          ₩ {estimatedRefund.toLocaleString()}
        </div>

        {/* 🛡️ 선결제 0원 (후불결제) 안심 뱃지 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 pt-1">
          <span className="text-[11px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full font-black flex items-center gap-1 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>선결제 0원 (후불결제)</span>
          </span>
          <span className="text-[11px] text-slate-300">
            100% 환급 성공 시 후불결제
          </span>
        </div>

        <p className="text-[10px] text-slate-400 pt-1">
          * 실제 개인별 소득 공제 및 비과세 항목에 따라 차이가 발생할 수 있습니다.
        </p>
      </div>

      {/* 4. KTRS 이지텍스 즉시 환급 신청 딥링크 CTA 버튼 */}
      <div className="relative z-10 mt-4">
        <button
          type="button"
          onClick={handleApply}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-amber-500/25 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 cursor-pointer"
        >
          <span>
            🚀 KTRS에서 ₩ {estimatedRefund.toLocaleString()} 바로 환급 신청하기
          </span>
          <ArrowRight className="w-5 h-5 text-slate-950" />
        </button>
        <p className="text-[11px] text-amber-200/90 text-center mt-2 font-medium">
          🛡️ 선결제 0원 (후불결제) · 서류 제출 없이 1초 접수
        </p>
      </div>
    </div>
  );
}
