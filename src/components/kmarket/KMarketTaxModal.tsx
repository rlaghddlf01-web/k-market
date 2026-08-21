'use client';

import React, { useState } from 'react';
import { useKMarket } from '@/context/KMarketContext';
import {
  SUPPORTED_VISAS,
  calculateTaxRefund,
} from '@/lib/taxRefundCalculator';
import CountryFlag from './CountryFlag';
import {
  X,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Lock,
  Receipt,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function KMarketTaxModal() {
  const { isTaxModalOpen, setIsTaxModalOpen } = useKMarket();

  // 스텝 관리 (1: 조건 입력, 2: 정밀 계산 및 후불제 확인, 3: 접수 완료)
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // 입력 상태
  const [selectedVisa, setSelectedVisa] = useState<string>('E-9');
  const [workYears, setWorkYears] = useState<number>(3);
  const [monthlyPay, setMonthlyPay] = useState<number>(2800000);
  const [applicantName, setApplicantName] = useState<string>('');
  const [applicantPhone, setApplicantPhone] = useState<string>('');
  const [applicantCountry, setApplicantCountry] = useState<string>('VN');
  const [agreeTerms, setAgreeTerms] = useState<boolean>(true);

  if (!isTaxModalOpen) return null;

  // 계산 결과
  const result = calculateTaxRefund(workYears, monthlyPay, selectedVisa);
  const currentVisaObj = SUPPORTED_VISAS.find((v) => v.code === selectedVisa) || SUPPORTED_VISAS[0];

  const handleNextToReview = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim() || !applicantPhone.trim()) {
      alert('성명과 연락처를 입력해 주세요.');
      return;
    }

    try {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    setStep(3);
  };

  const handleClose = () => {
    setIsTaxModalOpen(false);
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-gray-800 flex flex-col max-h-[92vh]">
        {/* 모달 상단 헤더 */}
        <div className="bg-linear-to-r from-amber-500 via-orange-500 to-rose-600 p-5 sm:p-6 text-white relative shrink-0">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 bg-black/25 hover:bg-black/40 text-white p-2 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div className="inline-flex items-center space-x-1.5 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-200 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" />
              <span>KTRS × Easy Tax Refund</span>
            </div>
            <span className="bg-emerald-950/60 text-emerald-300 text-[11px] px-2.5 py-0.5 rounded-full font-black border border-emerald-400/30">
              선결제 0원 후불제
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
            {step === 3
              ? '🎉 세금 환급 신청이 접수되었습니다!'
              : '외국인 근로자 숨은 세금 30초 무료 환급'}
          </h2>
          <p className="text-xs text-orange-100 mt-1">
            한국에서 일하며 낸 소득세, 조특법 법정 감면 혜택으로 평균 184만원을 안전하게 돌려받으세요.
          </p>

          {/* 진행 스텝 인디케이터 */}
          {step !== 3 && (
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/20 text-xs font-bold">
              <div
                className={`flex items-center gap-1.5 ${
                  step === 1 ? 'text-yellow-200' : 'text-white/70'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[11px]">
                  1
                </span>
                <span>비자 및 급여 선택</span>
              </div>
              <span className="text-white/40">➔</span>
              <div
                className={`flex items-center gap-1.5 ${
                  step === 2 ? 'text-yellow-200' : 'text-white/70'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[11px]">
                  2
                </span>
                <span>예상 환급액 및 간편 접수</span>
              </div>
            </div>
          )}
        </div>

        {/* 모달 본문 스크롤 영역 */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* STEP 1: 비자 및 근무정보 입력 */}
          {step === 1 && (
            <form onSubmit={handleNextToReview} className="space-y-6">
              {/* 1. 비자 종류 선택 */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                  <span>1. 체류 비자 유형 (Visa Type)</span>
                  <span className="text-[11px] text-orange-600 font-semibold">
                    {currentVisaObj.desc}
                  </span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SUPPORTED_VISAS.map((visa) => {
                    const isSelected = selectedVisa === visa.code;
                    return (
                      <button
                        key={visa.code}
                        type="button"
                        onClick={() => setSelectedVisa(visa.code)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-orange-500 bg-orange-50/80 dark:bg-orange-950/40 shadow-xs ring-2 ring-orange-500/20'
                            : 'border-slate-200 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-xs font-bold ${
                              isSelected
                                ? 'text-orange-700 dark:text-orange-300'
                                : 'text-slate-800 dark:text-slate-200'
                            }`}
                          >
                            {visa.code}
                          </span>
                          <span className="text-[10px] bg-slate-100 dark:bg-gray-700 text-slate-500 dark:text-gray-300 px-1.5 py-0.2 rounded-md">
                            {visa.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-gray-400 truncate mt-1">
                          {visa.name}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. 한국 근무 연수 슬라이더 */}
              <div className="space-y-2 bg-slate-50 dark:bg-gray-800/60 p-4 rounded-2xl border border-slate-100 dark:border-gray-700">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span>2. 한국 근무 기간 (Years in Korea)</span>
                  <span className="text-orange-600 dark:text-orange-400 text-sm font-extrabold">
                    {workYears}년 ({workYears * 12}개월 근무)
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  step={1}
                  value={workYears}
                  onChange={(e) => setWorkYears(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>1년</span>
                  <span>2년</span>
                  <span>3년 (평균)</span>
                  <span>4년</span>
                  <span>5년 (최대)</span>
                </div>
              </div>

              {/* 3. 월 평균 급여 슬라이더 */}
              <div className="space-y-2 bg-slate-50 dark:bg-gray-800/60 p-4 rounded-2xl border border-slate-100 dark:border-gray-700">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span>3. 월 평균 급여 (세전 Monthly Salary)</span>
                  <span className="text-orange-600 dark:text-orange-400 text-sm font-extrabold">
                    {(monthlyPay / 10000).toLocaleString()}만원
                  </span>
                </div>
                <input
                  type="range"
                  min={2000000}
                  max={5000000}
                  step={100000}
                  value={monthlyPay}
                  onChange={(e) => setMonthlyPay(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>200만원</span>
                  <span>280만원 (평균)</span>
                  <span>400만원</span>
                  <span>500만원+</span>
                </div>
              </div>

              {/* 실시간 환급액 프리뷰 카드 */}
              <div className="bg-linear-to-br from-orange-500 to-amber-500 rounded-3xl p-5 text-white shadow-lg text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-black/20 px-3 py-0.5 rounded-full text-xs font-bold text-yellow-200">
                  <Sparkles className="w-3 h-3 text-yellow-300" />
                  <span>실시간 계산된 예상 환급액</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black tracking-tight">
                  {result.estimatedTotalRefund.toLocaleString()}
                  <span className="text-xl font-bold ml-1">원</span>
                </div>
                <p className="text-xs text-orange-100">
                  * 선결제 비용 0원! 국세청에서 고객님 계좌로 환급금이 입금된 후에만 처리됩니다.
                </p>
              </div>

              {/* 다음 버튼 */}
              <button
                type="submit"
                className="w-full py-4 bg-slate-900 hover:bg-slate-800 dark:bg-orange-500 dark:hover:bg-orange-600 text-white font-black text-sm sm:text-base rounded-2xl shadow-xl active:scale-[0.98] transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>예상 환급액 상세 확인 및 무료 신청 (30초)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: 상세 견적 및 후불 수수료 보증 & 신청 정보 */}
          {step === 2 && (
            <form onSubmit={handleFinalSubmit} className="space-y-6">
              {/* 환급 상세 내역 브리핑 */}
              <div className="bg-slate-50 dark:bg-gray-800/70 rounded-2xl p-4.5 border border-slate-200/80 dark:border-gray-700 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-gray-700">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    신청 비자 및 기간
                  </span>
                  <span className="text-xs font-extrabold text-orange-600 bg-orange-50 dark:bg-orange-950/60 px-2 py-0.5 rounded-md">
                    {selectedVisa} 비자 • {workYears}년 근무
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">국세 소득세 환급 (90%):</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {result.nationalTaxRefund.toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">지방소득세 환급 (10%):</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {result.localTaxRefund.toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex justify-between text-orange-600 font-extrabold pt-1 border-t border-slate-200/60 dark:border-gray-700">
                    <span>총 예상 환급 합계:</span>
                    <span className="text-base">{result.estimatedTotalRefund.toLocaleString()}원</span>
                  </div>
                </div>
              </div>

              {/* 후불제(선결제 0원) 안심 보증 정책 배너 */}
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>KTRS 100% 후불 수수료 안심 보증</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-emerald-900/80 dark:text-emerald-300/80 text-[11px] leading-relaxed">
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>선결제 비용 0원</strong>: 조회 및 신청 시 단 1원도 내지 않습니다.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>성공 후불제 ({result.successFeePercent}%)</strong>: 국세청 환급금이 고객 통장에 100% 입금된 후에만 청구됩니다.</span>
                  </div>
                </div>
              </div>

              {/* 신청자 정보 입력 폼 */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  환급금 안내 및 접수 정보 입력
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      신청자 성명 (여권상 영문 또는 한국 이름)
                    </label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="예: NGUYEN VAN HUNG"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 focus:bg-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      한국 휴대전화 번호
                    </label>
                    <input
                      type="tel"
                      required
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      placeholder="010-XXXX-XXXX"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 focus:bg-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    국적 선택 (모국어 상담 지원)
                  </label>
                  <div className="flex items-center gap-2 bg-slate-50 dark:bg-gray-800 p-2 rounded-xl border border-slate-200 dark:border-gray-700">
                    <CountryFlag countryCode={applicantCountry} size="md" shape="circle" />
                    <select
                      value={applicantCountry}
                      onChange={(e) => setApplicantCountry(e.target.value)}
                      className="flex-1 bg-transparent text-xs text-slate-800 dark:text-slate-200 font-semibold focus:outline-none cursor-pointer"
                    >
                      <option value="VN">🇻🇳 베트남 (Vietnam)</option>
                      <option value="NP">🇳🇵 네팔 (Nepal)</option>
                      <option value="TH">🇹🇭 태국 (Thailand)</option>
                      <option value="UZ">🇺🇿 우즈베키스탄 (Uzbekistan)</option>
                      <option value="KH">🇰🇭 캄보디아 (Cambodia)</option>
                      <option value="MN">🇲🇳 몽골 (Mongolia)</option>
                      <option value="LK">🇱🇰 스리랑카 (Sri Lanka)</option>
                      <option value="MM">🇲🇲 미얀마 (Myanmar)</option>
                      <option value="PH">🇵🇭 필리핀 (Philippines)</option>
                      <option value="ID">🇮🇩 인도네시아 (Indonesia)</option>
                      <option value="CN">🇨🇳 중국 (China)</option>
                      <option value="KR">🇰🇷 한국 (Korea)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 약관 동의 */}
              <div className="flex items-center gap-2 pt-1 text-xs text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  id="agreeTax"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded text-orange-600 focus:ring-orange-500"
                />
                <label htmlFor="agreeTax" className="cursor-pointer">
                  [필수] 국세청 환급 대행 및 KTRS 전문 세무사 1:1 상담 연결에 동의합니다.
                </label>
              </div>

              {/* 버튼 그룹 */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-3.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-gray-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-2xl transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <button
                  type="submit"
                  disabled={!agreeTerms}
                  className="flex-1 py-3.5 bg-linear-to-r from-orange-500 via-amber-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 disabled:opacity-50 text-white font-black text-sm sm:text-base rounded-2xl shadow-xl shadow-orange-500/25 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>선결제 0원으로 1초 접수 완료하기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center space-x-1.5 text-[11px] text-slate-400">
                <Lock className="w-3.5 h-3.5 text-emerald-500" />
                <span>개인정보 256bit 암호화 및 국세청 공식 홈택스 전산 연동</span>
              </div>
            </form>
          )}

          {/* STEP 3: 접수 완료 및 접수증 카드 */}
          {step === 3 && (
            <div className="text-center py-4 space-y-5 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  환급 신청이 정상 접수되었습니다!
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  외국인 전담 KTRS 제휴 세무사가 24시간 이내에 카카오톡/문자로 최종 확정액을 안내합니다.
                </p>
              </div>

              {/* 공식 모바일 접수증 카드 */}
              <div className="bg-slate-50 dark:bg-gray-800/80 p-5 rounded-3xl text-left text-xs space-y-2.5 border border-slate-200 dark:border-gray-700 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-gray-700">
                  <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Receipt className="w-4 h-4 text-orange-600" />
                    <span>KTRS 모바일 세무 접수증</span>
                  </span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-gray-700 px-2 py-0.5 rounded-md">
                    KTRS-2026-TAX7824
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">신청자 성명:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {applicantName || 'NGUYEN VAN HUNG'}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">예상 환급 총액:</span>
                  <span className="font-black text-orange-600 text-sm">
                    {result.estimatedTotalRefund.toLocaleString()}원
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">비용 지불 방식:</span>
                  <span className="font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md">
                    100% 후불제 (선결제 0원)
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">환급금 입금 계좌:</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    세무사 안내 메시지로 계좌 등록
                  </span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  onClick={handleClose}
                  className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-orange-500 text-white font-bold rounded-2xl text-sm transition-colors cursor-pointer"
                >
                  확인 및 K-Market 계속 쇼핑하기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
