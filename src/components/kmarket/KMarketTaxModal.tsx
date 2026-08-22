'use client';

import { useLanguage } from '@/context/LanguageContext';
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
  const { t } = useLanguage();
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
      alert(t('auto_loop_870'));
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
              <span>{t('tax_modal_link_badge')}</span>
            </div>
            <span className="bg-emerald-950/60 text-emerald-300 text-[11px] px-2.5 py-0.5 rounded-full font-black border border-emerald-400/30">
              {t('tax_modal_zero_prepay')}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
            {step === 3
              ? '🎉 ' + t('tax_modal_headline')
              : t('tax_modal_headline')}
          </h2>
          <p className="text-xs text-orange-100 mt-1">
            {t('tax_modal_sub_desc')}
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
                <span>{t('tax_step_1_title')}</span>
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
                <span>{t('tax_step_2_title')}</span>
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
                  <span>{t('tax_visa_type_label')}</span>
                  <span className="text-[11px] text-orange-600 font-semibold">
                    {t(`visa_${selectedVisa.toLowerCase().replace(/[^a-z0-9]/g, '_')}_desc` as any) || currentVisaObj.desc}
                  </span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SUPPORTED_VISAS.map((visa) => {
                    const isSelected = selectedVisa === visa.code;
                    const visaKey = visa.code.toLowerCase().replace(/[^a-z0-9]/g, '_');
                    const visaBadge = t(`visa_${visaKey}_badge` as any) || visa.badge;
                    const visaName = t(`visa_${visaKey}_name` as any) || visa.name;

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
                            {visaBadge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-gray-400 truncate mt-1">
                          {visaName}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. 한국 근무 연수 슬라이더 */}
              <div className="space-y-2 bg-slate-50 dark:bg-gray-800/60 p-4 rounded-2xl border border-slate-100 dark:border-gray-700">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span>{t('tax_work_years_label')}</span>
                  <span className="text-orange-600 dark:text-orange-400 text-sm font-extrabold">
                    {workYears} {t('time_years')} ({workYears * 12} {t('time_months')})
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
                  <span>1 {t('time_years')}</span>
                  <span>2 {t('time_years')}</span>
                  <span>3 {t('time_years')} ({t('badge_average')})</span>
                  <span>4 {t('time_years')}</span>
                  <span>5 {t('time_years')} ({t('badge_max')})</span>
                </div>
              </div>

              {/* 3. 월 평균 급여 슬라이더 */}
              <div className="space-y-2 bg-slate-50 dark:bg-gray-800/60 p-4 rounded-2xl border border-slate-100 dark:border-gray-700">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span>{t('tax_monthly_pay_label')}</span>
                  <span className="text-orange-600 dark:text-orange-400 text-sm font-extrabold">
                    {(monthlyPay / 10000).toLocaleString()} {t('currency_10k_won')}
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
                  <span>200 {t('currency_10k_won')}</span>
                  <span>280 {t('currency_10k_won')} ({t('badge_average')})</span>
                  <span>400 {t('currency_10k_won')}</span>
                  <span>500 {t('currency_10k_won')}+</span>
                </div>
              </div>

              {/* 실시간 환급액 프리뷰 카드 */}
              <div className="bg-linear-to-br from-orange-500 to-amber-500 rounded-3xl p-5 text-white shadow-lg text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-black/20 px-3 py-0.5 rounded-full text-xs font-bold text-yellow-200">
                  <Sparkles className="w-3 h-3 text-yellow-300" />
                  <span>{t('tax_estimated_refund_badge')}</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black tracking-tight">
                  {result.estimatedTotalRefund.toLocaleString()}
                  <span className="text-xl font-bold ml-1">{t('currency_won')}</span>
                </div>
                <p className="text-xs text-orange-100">
                  {t('tax_zero_prepay_desc')}
                </p>
              </div>

              {/* 다음 버튼 */}
              <button
                type="submit"
                className="w-full py-4 bg-slate-900 hover:bg-slate-800 dark:bg-orange-500 dark:hover:bg-orange-600 text-white font-black text-sm sm:text-base rounded-2xl shadow-xl active:scale-[0.98] transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>{t('tax_next_btn')}</span>
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
                    {t('tax_review_visa_period_label')}
                  </span>
                  <span className="text-xs font-extrabold text-orange-600 bg-orange-50 dark:bg-orange-950/60 px-2 py-0.5 rounded-md">
                    {selectedVisa} {t('badge_visa')} • {workYears}{t('time_years')} {t('tax_work_suffix')}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t('tax_national_tax')}</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {result.nationalTaxRefund.toLocaleString()}{t('currency_won')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t('tax_local_tax')}</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {result.localTaxRefund.toLocaleString()}{t('currency_won')}
                    </span>
                  </div>
                  <div className="flex justify-between text-orange-600 font-extrabold pt-1 border-t border-slate-200/60 dark:border-gray-700">
                    <span>{t('tax_estimated_total_refund')}</span>
                    <span className="text-base">{result.estimatedTotalRefund.toLocaleString()}{t('currency_won')}</span>
                  </div>
                </div>
              </div>

              {/* 후불제(선결제 0원) 안심 보증 정책 배너 */}
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{t('tax_guarantee_title')}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-emerald-900/80 dark:text-emerald-300/80 text-[11px] leading-relaxed">
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>{t('tax_guarantee_item1_bold')}</strong> {t('tax_guarantee_item1_desc')}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>{t('tax_guarantee_item2_bold')}</strong> {t('tax_guarantee_item2_desc')}</span>
                  </div>
                </div>
              </div>

              {/* 신청자 정보 입력 폼 */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {t('tax_applicant_info_header')}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      {t('tax_applicant_name_label')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. NGUYEN VAN DUC"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-hidden focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      {t('tax_applicant_phone_label')}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="010-XXXX-XXXX"
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-hidden focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                    {t('tax_applicant_country_label')}
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                    {[
                      { code: 'VN', label: '베트남 🇻🇳' },
                      { code: 'CN', label: '중국 🇨🇳' },
                      { code: 'TH', label: '태국 🇹🇭' },
                      { code: 'UZ', label: '우즈벡 🇺🇿' },
                      { code: 'PH', label: '필리핀 🇵🇭' },
                      { code: 'OTHER', label: '기타 🌐' },
                    ].map((ct) => (
                      <button
                        key={ct.code}
                        type="button"
                        onClick={() => setApplicantCountry(ct.code)}
                        className={`py-2 px-1 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
                          applicantCountry === ct.code
                            ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 font-extrabold shadow-2xs'
                            : 'border-slate-200 dark:border-gray-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                        }`}
                      >
                        {t(`country_${ct.code.toLowerCase()}` as any) || ct.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 약관 동의 */}
              <label className="flex items-start gap-2 p-3 bg-slate-50 dark:bg-gray-800/60 rounded-xl border border-slate-200/60 dark:border-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  required
                  className="mt-0.5 rounded text-orange-600 focus:ring-orange-500"
                />
                <span className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                  {t('tax_terms_agree_label')}
                </span>
              </label>

              {/* 버튼 그룹 */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3.5 border border-slate-200 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{t('btn_prev')}</span>
                </button>
                <button
                  type="submit"
                  disabled={!agreeTerms}
                  className="flex-[2] py-3.5 bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 disabled:opacity-50 text-white font-black text-xs sm:text-sm rounded-2xl shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t('tax_submit_apply_btn')}</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: 접수 완료 및 접수증 카드 */}
          {step === 3 && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500 text-white mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/30 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  {t('tax_complete_title')}
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  {t('tax_complete_desc')}
                </p>
              </div>

              {/* 공식 모바일 접수증 카드 */}
              <div className="p-5 rounded-3xl bg-slate-50 dark:bg-gray-800 border-2 border-dashed border-orange-300 dark:border-orange-700 text-left space-y-3 shadow-inner">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-gray-700">
                  <span className="text-xs font-black text-orange-600 flex items-center gap-1">
                    <Receipt className="w-4 h-4" />
                    <span>{t('tax_receipt_badge')}</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    REF-{Date.now().toString().slice(-6)}
                  </span>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t('tax_applicant_name_label')}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{applicantName || 'NGUYEN VAN HUNG'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t('tax_applicant_phone_label')}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{applicantPhone || '010-XXXX-XXXX'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t('tax_estimated_total_refund')}</span>
                    <span className="font-black text-orange-600 text-sm">
                      {result.estimatedTotalRefund.toLocaleString()}{t('currency_won')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t('tax_fee_type_label')}</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {t('tax_complete_badge')}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-gray-700 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{t('tax_complete_next_step')}</span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-orange-500 text-white font-bold rounded-2xl text-sm transition-colors cursor-pointer"
                >
                  {t('tax_complete_btn')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
