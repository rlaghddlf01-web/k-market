'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useEffect } from 'react';
import { useKMarket } from '@/context/KMarketContext';
import { supabase } from '@/lib/supabaseClient';

// KTRS 세무환급 앱 URL (배포 후 실제 도메인으로 변경)
const KTRS_BASE_URL = process.env.NEXT_PUBLIC_KTRS_URL || 'http://localhost:9002';
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
  const { t, currentLang } = useLanguage();
  const { isTaxModalOpen, setIsTaxModalOpen, authedUser, taxModalPrefill, setTaxModalPrefill } = useKMarket();

  // 스텝 관리 (1: 조건 입력, 2: 정밀 계산 및 후불제 확인, 3: 접수 완료)
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // 입력 상태 (KTRS 공식 기준 완벽 동기화)
  const [selectedVisa, setSelectedVisa] = useState<string>('E-9');
  const [workMonths, setWorkMonths] = useState<number>(36);
  const [salaryManwon, setSalaryManwon] = useState<number>(250);
  const workYears = Math.max(1, Math.round(workMonths / 12));
  const monthlyPay = salaryManwon * 10000;
  const [applicantName, setApplicantName] = useState<string>('');
  const [applicantPhone, setApplicantPhone] = useState<string>('');
  const [applicantCarrier, setApplicantCarrier] = useState<string>('SKT');
  const [applicantArc, setApplicantArc] = useState<string>('');
  const [agreeTerms, setAgreeTerms] = useState<boolean>(true);

  // ✅ 마이페이지 prefill 및 유저 프로필 자동 채움 -> 즉시 Step 2 직행
  useEffect(() => {
    if (isTaxModalOpen) {
      if (taxModalPrefill) {
        setStep((taxModalPrefill.step as 1 | 2 | 3) || 2);
        if (taxModalPrefill.months) setWorkMonths(taxModalPrefill.months);
        if (taxModalPrefill.salaryManwon) setSalaryManwon(taxModalPrefill.salaryManwon);
        if (taxModalPrefill.visa) setSelectedVisa(taxModalPrefill.visa);
      }
      
      if (authedUser) {
        if (authedUser.userName || authedUser.nickname) {
          setApplicantName(authedUser.userName || authedUser.nickname);
        }
        if (authedUser.phone) {
          setApplicantPhone(authedUser.phone);
        }
        if (authedUser.telecom) {
          const t = authedUser.telecom;
          if (t.includes('SKT')) setApplicantCarrier('SKT');
          else if (t.includes('KT')) setApplicantCarrier('KT');
          else if (t.includes('LGU') || t.includes('LG')) setApplicantCarrier('LGU+');
        }
      } else if (typeof window !== 'undefined') {
        try {
          const savedProfile = localStorage.getItem('kmarket_user_profile');
          if (savedProfile) {
            const profile = JSON.parse(savedProfile);
            if (profile.name) setApplicantName(profile.name);
            if (profile.phone) setApplicantPhone(profile.phone);
            if (profile.carrier) setApplicantCarrier(profile.carrier);
          }
        } catch (e) {
          // ignore
        }
      }
    }
  }, [isTaxModalOpen, taxModalPrefill, authedUser]);

  if (!isTaxModalOpen) return null;

  // 계산 결과
  const result = calculateTaxRefund(workYears, monthlyPay, selectedVisa);
  const currentVisaObj = SUPPORTED_VISAS.find((v) => v.code === selectedVisa) || SUPPORTED_VISAS[0];

  const handleNextToReview = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanArc = applicantArc.replace(/[^0-9]/g, '');
    if (!applicantName.trim() || !applicantPhone.trim()) {
      alert(t('이름과 연락처를 입력해 주세요.'));
      return;
    }
    if (cleanArc.length > 0 && cleanArc.length !== 13) {
      alert(t('외국인등록번호(주민등록번호) 13자리를 정확히 입력해 주세요.'));
      return;
    }

    setIsSaving(true);
    let savedLeadId: string | null = null;
    try {
      // ✅ Supabase kmarket_tax_refund_leads 테이블에 1차 리드 저장
      const newLeadId = `tax-${crypto.randomUUID()}`;
      if (supabase) {
        const { error } = await supabase.from('kmarket_tax_refund_leads').insert({
          id: newLeadId,
          user_name: applicantName.trim(),
          phone: applicantPhone.trim(),
          country: currentLang ? currentLang.toUpperCase() : 'KR',
          visa_type: selectedVisa,
          work_period_years: workYears,
          monthly_salary: monthlyPay,
          estimated_refund: result.estimatedTotalRefund,
          national_tax_refund: result.nationalTaxRefund ?? Math.round(result.estimatedTotalRefund * 0.87),
          local_tax_refund: result.localTaxRefund ?? Math.round(result.estimatedTotalRefund * 0.13),
          fee_type: 'post_payment_15',
          fee_rate: 15,
          estimated_fee: Math.round(result.estimatedTotalRefund * 0.15),
          auth_method: 'pending',
          status: 'applied',
          arc_number: cleanArc || '',
        });
        if (!error) {
          savedLeadId = newLeadId;
          setLeadId(newLeadId);
        } else {
          console.warn('[KMarketTaxModal] Supabase insert error:', error.message);
        }
      }

      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    } catch (err) {
      console.error('[KMarketTaxModal] Lead save error:', err);
    } finally {
      setIsSaving(false);
      setStep(3);
    }
  };

  // ✅ KTRS 세무환급 앱 4단계(국세청 인증)로 4대 필수 데이터 완벽 탑재 후 원클릭 직행
  const handleGoToKTRS = () => {
    const cleanArc = applicantArc.replace(/[^0-9]/g, '');
    const params = new URLSearchParams({
      prefill: '1',
      source: 'kmarket',
      name: applicantName.trim(),
      phone: applicantPhone.trim(),
      carrier: applicantCarrier,
      regNo: cleanArc,
      registrationNumber: cleanArc,
      salary: monthlyPay.toString(),
      workMonths: (workYears * 12).toString(),
      step: '4',
      lang: currentLang || 'ko',
    });
    if (leadId) params.set('lead_id', leadId);
    const url = `${KTRS_BASE_URL}/estimate?${params.toString()}`;
    window.open(url, '_blank');
  };

  const handleClose = () => {
    setIsTaxModalOpen(false);
    setTaxModalPrefill(null);
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
              <span>{t('국세청 실시간 원스톱 환급 연계')}</span>
            </div>
            <span className="bg-emerald-950/60 text-emerald-300 text-[11px] px-2.5 py-0.5 rounded-full font-black border border-emerald-400/30">
              {t('선결제 비용 0원 (초기 수수료 없음)')}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
            {step === 3
              ? '🎉 ' + t('나의 잠재 세금 환급액을 10초 만에 확인하세요')
              : t('나의 잠재 세금 환급액을 10초 만에 확인하세요')}
          </h2>
          <p className="text-xs text-orange-100 mt-1">
            {t('한국에서 일하며 낸 소득세, 조특법 법정 감면 혜택으로 5년간 최대 1,000만원을 안전하게 돌려받으세요.')}
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
                <span>{t('1. 비자 및 급여 선택')}</span>
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
                <span>{t('2. 예상 환급액 및 간편 접수')}</span>
              </div>
            </div>
          )}
        </div>

        {/* 모달 본문 스크롤 영역 */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* STEP 1: 비자 및 근무정보 입력 (KTRS 공식 앱 100% 동일 프리미엄 UI) */}
          {step === 1 && (
            <form onSubmit={handleNextToReview} className="space-y-5 text-left">
              {/* 상단: 대상 연령 안내 (실시간 업데이트 배너) */}
              <div className="p-3 bg-[#0f1d32] border border-[#f3ba2f]/30 rounded-2xl flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#f3ba2f]" />
                  <span className="font-bold">{t('대상 연령 안내 (실시간 업데이트)')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#f3ba2f] text-[#09101f] text-[10px] font-black">{t('만 15세 ~ 34세')}</span>
                  <span className="text-[11px] text-slate-300 font-semibold hidden sm:inline">{t('1991년 8월 25일 ~ 2011년 8월 24일')}</span>
                </div>
              </div>

              {/* 1. 체류 비자 종류 선택 */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#f3ba2f]/20 text-[#f3ba2f] flex items-center justify-center text-[10px] font-black">1</span>
                    <span>{t('체류 비자 유형')}</span>
                  </label>
                  <span className="text-[11px] text-amber-600 dark:text-amber-400 font-bold">
                    {t(currentVisaObj.desc)}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SUPPORTED_VISAS.map((visa) => {
                    const isSelected = selectedVisa === visa.code;

                    return (
                      <button
                        key={visa.code}
                        type="button"
                        onClick={() => setSelectedVisa(visa.code)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative ${
                          isSelected
                            ? 'border-[#f3ba2f] bg-amber-50 dark:bg-amber-950/40 shadow-xs ring-2 ring-[#f3ba2f]/30'
                            : 'border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800/80 hover:bg-slate-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span
                            className={`text-xs sm:text-sm font-black whitespace-nowrap shrink-0 ${
                              isSelected
                                ? 'text-amber-800 dark:text-amber-300'
                                : 'text-slate-900 dark:text-slate-100'
                            }`}
                          >
                            {visa.code}
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold truncate max-w-[100px] text-right shrink-0 ${
                            isSelected
                              ? 'bg-[#f3ba2f] text-[#09101f]'
                              : 'bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-300'
                          }`}>
                            {t(visa.badge)}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-gray-400 truncate mt-1.5 font-medium block">
                          {t(visa.name)}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. 최근 5년 한국 근무 기간 (KTRS 공식 슬라이더 & 원터치) */}
              <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-gray-800/60 border border-slate-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#f3ba2f]/20 text-[#f3ba2f] flex items-center justify-center text-[10px] font-black">2</span>
                    <span>{t('최근 5년 한국 근무 기간')}</span>
                  </label>
                  <span className="text-xl font-black text-amber-600 dark:text-amber-400">
                    {workMonths}{t('개월')}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="60"
                  step="1"
                  value={workMonths}
                  onChange={(e) => setWorkMonths(parseInt(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#f3ba2f]"
                />
                <div className="flex justify-between text-[11px] font-black text-slate-400 uppercase tracking-wider">
                  <span>1 {t('개월')}</span>
                  <span>30 {t('개월')}</span>
                  <span>60 {t('개월')}</span>
                </div>
              </div>

              {/* 3. 평균 월 급여 (세전) - 8개 그리드 버튼 (150, 200, 250, 300, 350, 400, 500, 600+) */}
              <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-gray-800/60 border border-slate-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#f3ba2f]/20 text-[#f3ba2f] flex items-center justify-center text-[10px] font-black">3</span>
                    <span>{t('평균 월 급여 (세전)')}</span>
                  </label>
                  <span className="text-xl font-black text-amber-600 dark:text-amber-400">
                    {salaryManwon >= 600 ? '600+ ' : salaryManwon}{t('만 원')}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[150, 200, 250, 300, 350, 400, 500, 600].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setSalaryManwon(val)}
                      className={`h-11 font-black rounded-xl text-xs sm:text-sm transition-all border cursor-pointer ${
                        salaryManwon === val
                          ? 'bg-[#f3ba2f] text-[#09101f] border-[#f3ba2f] scale-105 shadow-md font-extrabold'
                          : 'bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-700 text-slate-700 dark:text-slate-300 hover:border-[#f3ba2f]/40'
                      }`}
                    >
                      {val === 600 ? '600+' : val}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. AI 예상 환급 가능 금액 박스 (KTRS 공식 ₩ 골드 스타일) */}
              <div className="relative p-6 sm:p-7 rounded-3xl border border-[#f3ba2f]/40 text-center space-y-2 overflow-hidden bg-gradient-to-br from-[#09101f] via-[#111d38] to-[#162447] text-white shadow-xl">
                <p className="text-xs font-black text-[#f3ba2f] uppercase tracking-[0.2em]">
                  ✨ {t('AI 예상 환급 가능 금액')}
                </p>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#f3ba2f] tracking-tight">
                  ₩ {result.estimatedTotalRefund.toLocaleString()}
                </div>
                <p className="text-[11px] font-medium text-slate-300">
                  {t('* 실제 개인별 소득 공제 항목에 따라 차이가 발생할 수 있습니다.')}
                </p>
              </div>

              {/* 다음 버튼 */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#f3ba2f] via-[#e5a823] to-[#c78d10] hover:from-[#f5c347] hover:to-[#d49915] text-[#09101f] font-black text-sm sm:text-base rounded-2xl shadow-xl active:scale-[0.98] transition-all flex items-center justify-center space-x-2 cursor-pointer border border-[#ffffff]/40"
              >
                <span>{t('내 환급금 30초 무료 조회하기')}</span>
                <ArrowRight className="w-4 h-4 text-[#09101f]" />
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
                    {t('신청 비자 및 기간')}
                  </span>
                  <span className="text-xs font-extrabold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-md border border-amber-200/60 dark:border-amber-800/40">
                    {selectedVisa} {t('체류 비자 맞춤 완료')} • {workMonths}{t('개월')} ({workYears}{t('년')}) {t('근무')}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t('국세(소득세) 환급 예상분')}</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      ₩ {result.nationalTaxRefund.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t('지방소득세 환급 예상분 (10%)')}</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      ₩ {result.localTaxRefund.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-amber-600 dark:text-amber-400 font-extrabold pt-1.5 border-t border-slate-200/60 dark:border-gray-700 text-sm">
                    <span>{t('총 예상 환급 수령액')}</span>
                    <span className="text-lg font-black text-[#f3ba2f] drop-shadow-xs">₩ {result.estimatedTotalRefund.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* 후불제(선결제 0원) 안심 보증 정책 배너 */}
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{t('100% 후불제 & 안심 보증 정책')}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-emerald-900/80 dark:text-emerald-300/80 text-[11px] leading-relaxed">
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>{t('선결제 비용 0원:')}</strong> {t('국세청에서 통장으로 환급금이 입금된 후에만 성공 수수료가 발생합니다.')}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>{t('환급액 0원 시 전액 무료:')}</strong> {t('조회 결과 환급 대상이 아니거나 0원인 경우 고객 부담금은 0원입니다.')}</span>
                  </div>
                </div>
              </div>

              {/* 신청자 정보 입력 폼 (국세청 4단계 인증 직행용 4대 정보) */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <span>{t('국세청 실시간 조회 및 접수 정보 입력')}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300">
                      {t('4단계 즉시 인증')}
                    </span>
                  </h3>
                </div>

                {/* 1. 성명 & 휴대전화 번호 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      {t('신청자 성명 (여권상 영문 또는 한글)')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t('예: NGUYEN VAN A / 홍길동')}
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-hidden focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      {t('한국 휴대전화 번호')}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder={t('010-XXXX-XXXX')}
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-hidden focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* 2. 통신사 선택 (SKT / KT / LGU+ / 알뜰폰) */}
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                    {t('이용 중인 스마트폰 통신사')}
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                    {[
                      { id: 'SKT', label: 'SKT' },
                      { id: 'KT', label: 'KT' },
                      { id: 'LGU+', label: 'LG U+' },
                      { id: 'SKT 알뜰폰', label: t('SKT 알뜰') },
                      { id: 'KT 알뜰폰', label: t('KT 알뜰') },
                      { id: 'LGU+ 알뜰폰', label: t('LG 알뜰') },
                    ].map((carrier) => (
                      <button
                        key={carrier.id}
                        type="button"
                        onClick={() => setApplicantCarrier(carrier.id)}
                        className={`py-2 px-1 rounded-xl text-[11px] font-black border transition-all cursor-pointer text-center ${
                          applicantCarrier === carrier.id
                            ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 shadow-2xs'
                            : 'border-slate-200 dark:border-gray-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                        }`}
                      >
                        {carrier.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. 외국인등록번호 (주민등록번호) 13자리 입력 */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      {t('외국인등록번호 (또는 주민등록번호 13자리)')}
                    </label>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      {t('국세청 암호화 보안 전송')}
                    </span>
                  </div>
                  <input
                    type="text"
                    maxLength={14}
                    placeholder={t('앞 6자리 - 뒤 7자리 (예: 950101-5XXXXXX)')}
                    value={applicantArc}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, '');
                      if (raw.length <= 6) {
                        setApplicantArc(raw);
                      } else {
                        setApplicantArc(`${raw.slice(0, 6)}-${raw.slice(6, 13)}`);
                      }
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs font-mono font-bold tracking-wider text-slate-900 dark:text-white focus:outline-hidden focus:border-orange-500"
                  />
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 leading-relaxed">
                    *{t('국세청 홈택스에서 5개년 세금 납부 내역을 실시간으로 안전하게 스크래핑하기 위한 필수 정보입니다.')}
                  </p>
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
                  {t('[필수] 국세청 환급 대행 및 케이티알에스 전문 세무사 1:1 상담 연결에 동의합니다.')}
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
                  <span>{t('이전 단계로 돌아가기')}</span>
                </button>
                <button
                  type="submit"
                  disabled={!agreeTerms || isSaving}
                  className="flex-[2] py-3.5 bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 disabled:opacity-50 text-white font-black text-xs sm:text-sm rounded-2xl shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t('100% 후불제로 안전하게 환급 신청')}</span>
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
                  {t('환급 신청이 정상 접수되었습니다!')}
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  {t('외국인 전담 케이티알에스 제휴 세무사가 24시간 이내에 카카오톡/문자로 최종 확정액을 안내합니다.')}
                </p>
              </div>

              {/* 공식 모바일 접수증 카드 */}
              <div className="p-5 rounded-3xl bg-slate-50 dark:bg-gray-800 border-2 border-dashed border-orange-300 dark:border-orange-700 text-left space-y-3 shadow-inner">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-gray-700">
                  <span className="text-xs font-black text-orange-600 flex items-center gap-1">
                    <Receipt className="w-4 h-4" />
                    <span>{t('국세청 소득공제 영수증 연계')}</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    REF-{Date.now().toString().slice(-6)}
                  </span>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t('신청자 성명 (여권상 영문 또는 한국 이름)')}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{applicantName || 'NGUYEN VAN HUNG'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t('한국 휴대전화 번호')}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{applicantPhone || '010-XXXX-XXXX'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t('총 예상 환급 수령액')}</span>
                    <span className="font-black text-orange-600 text-sm">
                      {result.estimatedTotalRefund.toLocaleString()}{t('원 (대한민국 원화)')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t('환급 성공 시 후불 수수료 적용')}</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {t('100% 후불제 (선결제 0원)')}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-gray-700 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{t('세무사 안내 메시지로 계좌 등록')}</span>
                </div>
              </div>

                            <div className="pt-2 space-y-2">
                {/* ✅ KTRS 세무환급 앱 4단계 직행 버튼 */}
                <button
                  type="button"
                  onClick={handleGoToKTRS}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-black rounded-2xl text-sm shadow-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                >
                  <span>💰</span>
                  <span>{t('KTRS에서 4단계 이어서 환급 신청하기')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full py-3 border border-slate-200 dark:border-gray-700 text-slate-500 dark:text-slate-400 font-semibold rounded-2xl text-xs transition-colors cursor-pointer hover:bg-slate-50 dark:hover:bg-gray-800"
                >
                  {t('나중에 하기 (계속 쇼핑)')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
