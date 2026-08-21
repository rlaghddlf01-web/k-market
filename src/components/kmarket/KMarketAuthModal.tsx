'use client';

import React, { useState, useRef } from 'react';
import { scanAlienCardImage, OcrResultData } from '@/lib/ocrService';
import { sendAligoSms, verifyAuthCode } from '@/lib/aligoSmsService';
import {
  Camera,
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  X,
  Sparkles,
  RefreshCw,
  User,
  AlertCircle,
  ChevronDown,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface KMarketAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessAuth: (userData: any) => void;
}

export default function KMarketAuthModal({
  isOpen,
  onClose,
  onSuccessAuth,
}: KMarketAuthModalProps) {
  const [authTab, setAuthTab] = useState<'ocr' | 'manual'>('ocr');
  const [step, setStep] = useState<'form' | 'sms' | 'complete'>('form');

  // OCR 상태
  const [isScanning, setIsScanning] = useState(false);
  const [ocrCompleted, setOcrCompleted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 폼 필드 상태
  const [userName, setUserName] = useState('');
  const [arcNumber, setArcNumber] = useState('');
  const [country, setCountry] = useState('VN');
  const [visaType, setVisaType] = useState('E-9 (비전문취업)');
  const [stayExpiryDate, setStayExpiryDate] = useState('2026-11-30');
  const [telecom, setTelecom] = useState('SKT_MVNO');
  const [phone, setPhone] = useState('010-8492-3184');
  const [dormitory, setDormitory] = useState('평택 포승공단 기숙사 2동');

  // 알리고 SMS 인증 상태
  const [sentAuthCode, setSentAuthCode] = useState('');
  const [inputAuthCode, setInputAuthCode] = useState('');
  const [isSmsSending, setIsSmsSending] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [smsError, setSmsError] = useState('');

  if (!isOpen) return null;

  // 1. 카메라 촬영 / 파일 업로드 시 OCR 자동 인식
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    try {
      const result: OcrResultData = await scanAlienCardImage(file);
      setUserName(result.userName);
      setArcNumber(result.arcNumber);
      setCountry(result.country);
      setVisaType(result.visaType);
      setStayExpiryDate(result.stayExpiryDate);
      setOcrCompleted(true);
    } catch (err) {
      console.error('OCR Scan failed:', err);
    } finally {
      setIsScanning(false);
    }
  };

  // 2. 알리고 SMS 인증번호 발송
  const handleSendSms = async () => {
    if (!phone || phone.length < 10) {
      alert('올바른 휴대폰 번호를 입력해 주세요.');
      return;
    }

    setIsSmsSending(true);
    setSmsError('');
    try {
      const res = await sendAligoSms({
        receiverPhone: phone,
        msgType: 'auth_code',
        receiverName: userName || '외국인 회원',
      });

      if (res.success && res.authCode) {
        setSentAuthCode(res.authCode);
        setStep('sms');
        alert(`[알리고 SMS] 인증번호 [${res.authCode}]가 발송되었습니다.`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSmsSending(false);
    }
  };

  // 3. 알리고 6자리 인증번호 검증
  const handleVerifySms = async (e: React.FormEvent) => {
    e.preventDefault();
    const verifyRes = await verifyAuthCode(phone, inputAuthCode, sentAuthCode);

    if (verifyRes.success) {
      setIsPhoneVerified(true);
      setStep('complete');
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    } else {
      setSmsError(verifyRes.message);
    }
  };

  // 최종 가입 완료
  const handleFinish = () => {
    const finalUserData = {
      userId: 'user-' + Date.now(),
      userName,
      phone,
      telecom,
      country,
      visaType,
      stayExpiryDate,
      dormitory,
      authMethod: authTab,
      isOcrVerified: authTab === 'ocr' && ocrCompleted,
      isPhoneVerified: true,
    };

    onSuccessAuth(finalUserData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs animate-fadeIn flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-gray-800 flex flex-col max-h-[88vh] my-auto">
        {/* 모달 헤더 (이지텍스 룩앤필) */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center text-white shadow-inner">
              <ShieldCheck className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <div className="inline-flex items-center space-x-1.5 bg-black/20 px-2.5 py-0.5 rounded-full text-xs font-bold text-sky-200 mb-0.5">
                <Sparkles className="w-3 h-3 text-yellow-300" />
                <span>15개국어 외국인 신원인증 & 가입</span>
              </div>
              <h2 className="text-xl font-black tracking-tight">
                외국인 간편 회원가입
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. OCR vs 직접입력 탭 바 */}
        <div className="flex border-b border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-800/60 p-1.5 gap-1.5 shrink-0">
          <button
            onClick={() => {
              setAuthTab('ocr');
              setStep('form');
            }}
            className={`flex-1 py-2.5 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center space-x-2 transition-all cursor-pointer ${
              authTab === 'ocr'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>외국인등록증 OCR 자동완성 (추천 ⚡)</span>
          </button>

          <button
            onClick={() => {
              setAuthTab('manual');
              setStep('form');
            }}
            className={`flex-1 py-2.5 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center space-x-2 transition-all cursor-pointer ${
              authTab === 'manual'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60'
            }`}
          >
            <User className="w-4 h-4" />
            <span>직접 수기 입력 (Manual)</span>
          </button>
        </div>

        {/* 모달 본문 영역 */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs sm:text-sm">
          {/* STEP 1: 폼 입력 단계 */}
          {step === 'form' && (
            <div className="space-y-4">
              {/* OCR 탭일 때: 카메라 촬영 업로더 */}
              {authTab === 'ocr' && (
                <div className="space-y-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-3xl p-5 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                      ocrCompleted
                        ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20'
                        : 'border-blue-300 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20 hover:border-blue-500'
                    }`}
                  >
                    {isScanning ? (
                      <div className="flex flex-col items-center py-4 space-y-2">
                        <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
                        <span className="font-black text-blue-950 dark:text-blue-200 text-sm">
                          Gemini Vision OCR 판독 중 (0.5초)...
                        </span>
                        <span className="text-[11px] text-blue-700">
                          이름, 외국인등록번호, 비자, 만료일을 자동 추출하고 있습니다.
                        </span>
                      </div>
                    ) : ocrCompleted ? (
                      <div className="flex items-center space-x-3 text-left w-full">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-7 h-7" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-black text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                            <span>✅ 실물 등록증 OCR 인식 완료!</span>
                            <span className="bg-emerald-200 text-emerald-900 text-[10px] px-2 py-0.5 rounded-full">
                              골드 신뢰 뱃지 부여
                            </span>
                          </span>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                            {userName} | {arcNumber} | {visaType}
                          </p>
                        </div>
                        <span className="text-xs text-blue-600 font-bold hover:underline">
                          다시 촬영
                        </span>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/30">
                          <Camera className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-black text-sm text-slate-900 dark:text-white">
                            외국인등록증 앞면 사진 촬영하기
                          </h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            스마트폰 카메라로 비추면 0.5초 만에 자동으로 입력됩니다.
                          </p>
                        </div>
                        <span className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-xs mt-1">
                          카메라 열기 / 사진 선택
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* 기본 정보 입력창 (OCR 시 자동 채워짐) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    영문 이름 (Name)
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="예: NGUYEN VAN DUC"
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 text-xs font-bold text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    외국인등록번호 (13자리)
                  </label>
                  <input
                    type="text"
                    value={arcNumber}
                    onChange={(e) => setArcNumber(e.target.value)}
                    placeholder="예: 950821-5184920"
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 text-xs font-bold text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    비자 종류 (Visa Status)
                  </label>
                  <input
                    type="text"
                    value={visaType}
                    onChange={(e) => setVisaType(e.target.value)}
                    placeholder="예: E-9 (비전문취업)"
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 text-xs font-bold text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    체류 만료일 (Expiry Date)
                  </label>
                  <input
                    type="date"
                    value={stayExpiryDate}
                    onChange={(e) => setStayExpiryDate(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 text-xs font-bold text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* 통신사 드롭다운 및 휴대폰 번호 입력 (알리고 SMS 본인확인용) */}
              <div className="p-4 rounded-3xl bg-slate-50 dark:bg-gray-800/80 border border-slate-200/80 dark:border-gray-700 space-y-3">
                <span className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-blue-600" />
                  <span>통신사 선택 및 휴대폰 번호 (알리고 SMS 본인인증)</span>
                </span>

                {/* 통신사 드롭다운 셀렉트 */}
                <div className="relative">
                  <select
                    value={telecom}
                    onChange={(e) => setTelecom(e.target.value)}
                    className="w-full appearance-none px-4 py-2.5 bg-white dark:bg-gray-900 rounded-xl border border-slate-200 dark:border-gray-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer pr-10"
                  >
                    <option value="SKT_MVNO">📱 SKT 알뜰폰 (선불폰 / 후불폰)</option>
                    <option value="KT_MVNO">📱 KT 알뜰폰 (선불폰 / 후불폰)</option>
                    <option value="LGU_MVNO">📱 LGU+ 알뜰폰 (선불폰 / 후불폰)</option>
                    <option value="SKT">🏢 SK텔레콤 (SKT 공식)</option>
                    <option value="KT">🏢 KT (케이티 공식)</option>
                    <option value="LGU">🏢 LG유플러스 (LGU+ 공식)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010-XXXX-XXXX"
                    className="flex-1 px-3.5 py-2.5 bg-white dark:bg-gray-900 rounded-xl border border-slate-200 dark:border-gray-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleSendSms}
                    disabled={isSmsSending}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all shrink-0 cursor-pointer"
                  >
                    {isSmsSending ? '발송중...' : '인증번호 받기'}
                  </button>
                </div>
              </div>

              {/* 공단 기숙사 위치 */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  거주 공단 / 기숙사 (Dormitory)
                </label>
                <input
                  type="text"
                  value={dormitory}
                  onChange={(e) => setDormitory(e.target.value)}
                  placeholder="예: 평택 포승공단 기숙사 2동, 안산 원곡동 원룸"
                  className="w-full px-3 py-2.5 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 text-xs font-bold text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}

          {/* STEP 2: 알리고 SMS 6자리 인증번호 입력 단계 */}
          {step === 'sms' && (
            <form onSubmit={handleVerifySms} className="py-6 space-y-4 text-center">
              <div className="w-14 h-14 rounded-3xl bg-blue-50 dark:bg-blue-950 text-blue-600 mx-auto flex items-center justify-center shadow-inner">
                <Smartphone className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  알리고 SMS 6자리 인증번호 입력
                </h3>
                <p className="text-xs text-slate-500">
                  <strong>{phone}</strong> 번호로 발송된 6자리 번호를 입력해 주세요.
                </p>
              </div>

              <div className="max-w-xs mx-auto space-y-2">
                <input
                  type="text"
                  maxLength={6}
                  value={inputAuthCode}
                  onChange={(e) => setInputAuthCode(e.target.value)}
                  placeholder="인증번호 6자리"
                  className="w-full text-center text-xl font-mono font-black tracking-widest py-3 bg-slate-50 dark:bg-gray-800 rounded-2xl border-2 border-blue-500 focus:outline-none"
                />

                {smsError && (
                  <p className="text-xs text-red-500 font-bold flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{smsError}</span>
                  </p>
                )}
              </div>

              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="px-4 py-2.5 bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl"
                >
                  이전 단계
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-md shadow-blue-600/25"
                >
                  인증 확인 완료
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: 가입 및 신원인증 완료 단계 */}
          {step === 'complete' && (
            <div className="py-6 space-y-4 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500 text-white mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/30 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-black text-emerald-600 uppercase tracking-wider">
                  KTRS K-Market 신원 인증 완료!
                </span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  {userName} 님, 환영합니다!
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {authTab === 'ocr' ? '실물 신분증 OCR 검증' : '수기 인증'} 및 휴대폰 본인인증이 완료되어 <strong>골드 신뢰 뱃지(매너온도 36.5℃)</strong>가 발급되었습니다.
                </p>
              </div>

              {/* KTRS 184만원 세금 환급 연계 혜택 알림 */}
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 text-left space-y-1">
                <span className="text-xs font-black text-amber-950 dark:text-amber-200 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>KTRS 이지텍스 특별 연계 혜택</span>
                </span>
                <p className="text-xs text-amber-900/80 dark:text-amber-300/80">
                  인증하신 외국인등록번호로 <strong>예상 세금 환급액 184만원</strong>을 선결제 0원 후불제(15%)로 즉시 신청하실 수 있습니다.
                </p>
              </div>

              <button
                type="button"
                onClick={handleFinish}
                className="w-full py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 text-white font-black text-sm rounded-2xl shadow-xl shadow-blue-600/30 cursor-pointer"
              >
                K-Market 중고거래 시작하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
