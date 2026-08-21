'use client';

import React, { useState } from 'react';
import { useKMarket } from '@/context/KMarketContext';
import { useLanguage } from '@/context/LanguageContext';
import { X, Sparkles, Calculator, CheckCircle2, ShieldCheck, ArrowRight, DollarSign } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function KMarketTaxModal() {
  const { isTaxModalOpen, setIsTaxModalOpen } = useKMarket();
  const { t, formatWon, currentLangOption } = useLanguage();

  const [workYears, setWorkYears] = useState<number>(3);
  const [monthlyPay, setMonthlyPay] = useState<number>(2700000);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isTaxModalOpen) return null;

  // 예상 환급금 계산 공식 (평균 184만원 기준)
  // 근로소득세 연말정산 미신청분 + 중소기업 취업 외국인 소득세 70~90% 감면분
  const estimatedTaxRefund = Math.round(workYears * (monthlyPay * 0.024) * 1.05);
  const nationalTax = Math.round(estimatedTaxRefund * 0.9);
  const localTax = Math.round(estimatedTaxRefund * 0.1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
        {/* 모달 헤더 */}
        <div className="bg-linear-to-r from-amber-500 via-orange-500 to-rose-500 p-5 text-white relative">
          <button
            onClick={() => {
              setIsTaxModalOpen(false);
              setIsSubmitted(false);
            }}
            className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center space-x-1.5 bg-black/20 px-2.5 py-1 rounded-full text-xs font-bold text-amber-200 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KTRS 외국인 세무 환급 센터</span>
          </div>
          <h2 className="text-xl font-black tracking-tight">
            내 숨은 세금 30초 환급 계산기
          </h2>
          <p className="text-xs text-orange-100 mt-1">
            한국에서 낸 근로소득세, 법정 감면 혜택으로 평균 184만원 돌려받으세요!
          </p>
        </div>

        {/* 모달 본문 */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* 근무 기간 슬라이더 */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-bold text-slate-800">
                  <span>한국 근무 기간 (Years worked in Korea)</span>
                  <span className="text-orange-600 text-base font-extrabold">{workYears}년 ({workYears * 12}개월)</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  step={1}
                  value={workYears}
                  onChange={(e) => setWorkYears(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>1년</span>
                  <span>2년</span>
                  <span>3년</span>
                  <span>4년</span>
                  <span>5년 (최대)</span>
                </div>
              </div>

              {/* 월 평균 급여 슬라이더 */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-bold text-slate-800">
                  <span>월 평균 급여 (Monthly Salary)</span>
                  <span className="text-orange-600 text-base font-extrabold">
                    {(monthlyPay / 10000).toLocaleString()}만원
                  </span>
                </div>
                <input
                  type="range"
                  min={2000000}
                  max={4500000}
                  step={100000}
                  value={monthlyPay}
                  onChange={(e) => setMonthlyPay(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>200만원</span>
                  <span>300만원</span>
                  <span>400만원</span>
                  <span>450만원</span>
                </div>
              </div>

              {/* 실시간 환급액 계산 결과 카드 */}
              <div className="bg-linear-to-br from-orange-50 to-amber-50 rounded-2xl p-4 border border-orange-200 text-center space-y-2">
                <p className="text-xs font-bold text-orange-800 uppercase tracking-wider">
                  🎉 지금 신청 시 돌려받는 예상 환급액
                </p>
                <div className="text-3xl sm:text-4xl font-black text-orange-600">
                  {estimatedTaxRefund.toLocaleString()}
                  <span className="text-lg font-bold text-slate-700 ml-1">원</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-orange-200/60">
                  <div className="bg-white/80 py-1.5 rounded-lg">
                    <span className="text-slate-400 block text-[10px]">국세 환급</span>
                    <span className="font-bold text-slate-800">{nationalTax.toLocaleString()}원</span>
                  </div>
                  <div className="bg-white/80 py-1.5 rounded-lg">
                    <span className="text-slate-400 block text-[10px]">지방소득세 환급</span>
                    <span className="font-bold text-slate-800">{localTax.toLocaleString()}원</span>
                  </div>
                </div>
              </div>

              {/* 신청자 정보 입력란 */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    신청자 성명 (여권상 영문 이름)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="예: NGUYEN VAN HUNG"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    한국 휴대전화 번호
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="010-XXXX-XXXX"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* 제출 버튼 */}
              <button
                type="submit"
                className="w-full py-3.5 bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm sm:text-base rounded-2xl shadow-xl shadow-orange-500/25 active:scale-95 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>30초 만에 {estimatedTaxRefund.toLocaleString()}원 무료 환급 신청</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>국세청 홈택스 공식 제휴 세무대리인이 안전하게 처리합니다.</span>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900">
                  환급 신청이 성공적으로 접수되었습니다!
                </h3>
                <p className="text-xs text-slate-500">
                  담당 KTRS 전문 세무사가 24시간 이내에 카카오톡/문자로 최종 환급 확정액을 안내해 드립니다.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl text-left text-xs space-y-1.5 border border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-500">신청 접수 번호:</span>
                  <span className="font-bold text-slate-800">KTRS-2026-TAX7824</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">예상 환급액:</span>
                  <span className="font-bold text-orange-600">{estimatedTaxRefund.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">지급 예정 계좌:</span>
                  <span className="font-medium text-slate-800">안내 메시지로 계좌 등록</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsTaxModalOpen(false);
                    setIsSubmitted(false);
                  }}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-colors cursor-pointer"
                >
                  확인 및 K-Market 쇼핑 계속하기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
