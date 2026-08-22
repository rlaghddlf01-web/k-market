'use client';

import React, { useState, useRef } from 'react';
import { scanAlienCardImage, OcrResultData } from '@/lib/ocrService';
import { sendAligoAuthSms, verifyAuthCode } from '@/lib/aligoSmsService';
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
  MapPin,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '@/context/LanguageContext';

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
  const { t } = useLanguage();
  const { currentLang } = useLanguage();
  const [authTab, setAuthTab] = useState<'ocr' | 'manual'>('ocr');
  const [step, setStep] = useState<'form' | 'sms' | 'complete'>('form');

  // OCR 상태
  const [isScanning, setIsScanning] = useState(false);
  const [ocrCompleted, setOcrCompleted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 폼 필드 상태
  const [userName, setUserName] = useState('');
  const [nickname, setNickname] = useState('');
  const [arcNumber, setArcNumber] = useState('');
  const [country, setCountry] = useState('VN');
  const [visaType, setVisaType] = useState('E-9');
  const [stayExpiryDate, setStayExpiryDate] = useState('2026-11-30');
  const [telecom, setTelecom] = useState('SKT_MVNO');
  const [phone, setPhone] = useState('010-8492-3184');
  const [dormitory, setDormitory] = useState('');

  // 알리고 SMS 인증 상태
  const [sentAuthCode, setSentAuthCode] = useState('');
  const [inputAuthCode, setInputAuthCode] = useState('');
  const [isSmsSending, setIsSmsSending] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [smsError, setSmsError] = useState('');

  // GPS 위치 자동 인식 상태
  const [isLocating, setIsLocating] = useState(false);

  // GPS 내 위치 동의 및 주소 자동 변환 (서버 지오코딩 API 연동)
  const handleGetGpsLocation = () => {
    if (!navigator.geolocation) {
      alert(t('auto_loop_725'));
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // 서버 사이드 역지오코딩 API 호출 (CORS 원천 해결)
          const res = await fetch('/api/kmarket/geocode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ latitude, longitude }),
          });

          if (res.ok) {
            const data = await res.json();
            if (data.success && data.address) {
              setDormitory(data.address);
              setIsLocating(false);
              return;
            }
          }
        } catch (err) {
          console.error('Geocode fetch error:', err);
        }

        // 브라우저 직접 Fallback
        setDormitory(`위치 확인됨 (위도: ${latitude.toFixed(3)}, 경도: ${longitude.toFixed(3)})`);
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        console.warn('Geolocation error:', error);
        if (error.code === error.PERMISSION_DENIED) {
          alert(t('auto_loop_727'));
        } else {
          alert(t('auto_loop_728'));
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  if (!isOpen) return null;

  // 랜덤 닉네임 생성기
  const generateRandomNickname = (name?: string) => {
    const adjectives = ['친절한', '따뜻한', '행복한', '스마일', '안심', '긍정', '희망', '동네'];
    const nouns = ['호랑이', '친구', '이웃', '라이더', '마켓러', '토끼', '곰돌이', '판다', '메이트'];
    const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const num = Math.floor(100 + Math.random() * 900);
    return `${randomAdj}${randomNoun}_${num}`;
  };

  // 1. 카메라 촬영 / 파일 업로드 시 OCR 자동 인식
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    try {
      const result: OcrResultData = await scanAlienCardImage(file);
      setUserName(result.userName);
      if (!nickname) {
        setNickname(result.userName.split(' ')[0] + '_' + Math.floor(100 + Math.random() * 900));
      }
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
      alert(t('auto_loop_746'));
      return;
    }

    setIsSmsSending(true);
    setSmsError('');
    try {
      const res = await sendAligoAuthSms({
        receiverPhone: phone,
        receiverName: userName || '외국인 회원',
        lang: currentLang,
      });

      if (res.success && res.authCode) {
        setSentAuthCode(res.authCode);
        setStep('sms');
        alert(`${t('auth_sms_sent_prefix')} [${res.authCode}] ${t('auth_sms_sent_suffix')}`);
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
    const finalNickname = (nickname.trim() || userName.trim() || 'K-이웃').slice(0, 15);
    const finalUserData = {
      userId: 'user-' + Date.now(),
      userName,
      nickname: finalNickname,
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
        {/* 모달 헤더 - 딥 네이비 & 2px 골드 라인 */}
        <div 
          style={{
            background: 'linear-gradient(135deg, #09101f 0%, #111d38 50%, #162447 100%)',
            borderBottom: '2px solid #f3ba2f',
            boxShadow: '0 4px 20px rgba(9, 16, 31, 0.35)',
          }}
          className="p-5 text-white flex items-center justify-between shrink-0 relative overflow-hidden"
        >
          {/* 미세한 골드 앰비언트 글로우 */}
          <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#f3ba2f]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center space-x-3.5 relative z-10">
            <div className="w-11 h-11 rounded-2xl bg-[#09101f] border-2 border-[#f3ba2f] flex items-center justify-center text-white shadow-lg">
              <ShieldCheck className="w-6 h-6 text-[#f3ba2f]" />
            </div>
            <div>
              <div className="inline-flex items-center space-x-1.5 bg-black/40 px-2.5 py-0.5 rounded-full text-xs font-bold text-slate-200 border border-[#f3ba2f]/40 mb-0.5">
                <Sparkles className="w-3 h-3 text-[#f3ba2f]" />
                <span>{t('auth_badge_17lang')}</span>
              </div>
              <h2 className="text-xl font-black text-white tracking-tight">
                {t('auth_modal_headline')}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-[#f3ba2f] hover:text-[#09101f] text-white transition-all cursor-pointer border border-white/20 hover:border-[#f3ba2f] relative z-10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. OCR vs 직접입력 탭 바 (앱 시그니처 웜톤 라떼 & 에스프레소) */}
        <div className="flex border-b border-[#ded1c4] bg-[#f7f2eb] p-1.5 gap-1.5 shrink-0">
          <button
            onClick={() => {
              setAuthTab('ocr');
              setStep('form');
            }}
            className={`flex-1 py-2.5 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center space-x-1.5 transition-all cursor-pointer shadow-2xs ${
              authTab === 'ocr'
                ? 'bg-[#3d2817] text-[#fbf9f6] border border-[#3d2817]'
                : 'text-[#705e4f] hover:text-[#1f1914] hover:bg-[#ede2d6] bg-transparent'
            }`}
          >
            <Camera className="w-4 h-4 text-[#f3ba2f]" />
            <span>{t('auth_tab_ocr')}</span>
          </button>

          <button
            onClick={() => {
              setAuthTab('manual');
              setStep('form');
            }}
            className={`flex-1 py-2.5 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
              authTab === 'manual'
                ? 'bg-[#3d2817] text-[#fbf9f6] border border-[#3d2817]'
                : 'text-[#705e4f] hover:text-[#1f1914] hover:bg-[#ede2d6] bg-transparent'
            }`}
          >
            <User className="w-4 h-4 text-[#845b37]" />
            <span>{t('auth_tab_manual')}</span>
          </button>
        </div>

        {/* 모달 본문 영역 */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs sm:text-sm bg-[#fdfbf9]">
          {/* STEP 1: 폼 입력 단계 */}
          {step === 'form' && (
            <div className="space-y-4">
              {/* OCR 탭일 때: 매너온도 +7.0℃ & 최상단 노출 혜택 강조 배너 + 촬영 박스 */}
              {authTab === 'ocr' && (
                <div className="space-y-3">
                  {/* 🔥 매너온도 43.5℃ & 앱 최상단 우선 노출 파격 혜택 하이라이트 카드 (품격있는 웜톤 골드) */}
                  <div className="p-4 rounded-3xl bg-[#f5ede2] border border-[#d9c5b0] shadow-xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-[#845b37]" />
                        <h4 className="font-black text-xs sm:text-sm text-[#3d2817]">
                          {t('auth_ocr_benefits_title')}
                        </h4>
                      </div>
                      <span className="bg-[#3d2817] text-[#f3ba2f] font-black text-[10px] px-2.5 py-0.5 rounded-full border border-[#5c3818] shadow-2xs">
                        {t('auth_ocr_bonus_badge')}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2.5 rounded-2xl bg-white/95 border border-[#e6dacd] flex items-start gap-2 shadow-2xs">
                        <span className="text-base">🌡️</span>
                        <div>
                          <p className="font-black text-[#3d2817]">{t('auth_manner_gold_title')}</p>
                          <p className="text-[#705e4f] text-[10px] mt-0.5">{t('auth_manner_gold_desc')}</p>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-2xl bg-white/95 border border-[#e6dacd] flex items-start gap-2 shadow-2xs">
                        <span className="text-base">🚀</span>
                        <div>
                          <p className="font-black text-[#845b37]">{t('auth_top_exposure_title')}</p>
                          <p className="text-[#705e4f] text-[10px] mt-0.5">{t('auth_top_exposure_desc')}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />

                  {/* 카메라 촬영 / 업로드 드롭존 (에스프레소 & 웜 모카) */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-3xl p-5 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2.5 ${
                      ocrCompleted
                        ? 'border-emerald-500 bg-emerald-50/70'
                        : 'border-[#cbb7a3] bg-[#faf6f1] hover:border-[#845b37] hover:bg-[#f4ede6] shadow-xs'
                    }`}
                  >
                    {isScanning ? (
                      <div className="flex flex-col items-center py-4 space-y-2">
                        <RefreshCw className="w-8 h-8 text-[#845b37] animate-spin" />
                        <span className="font-black text-[#1f1914] text-sm">
                          Gemini Vision AI OCR (0.5s)...
                        </span>
                      </div>
                    ) : ocrCompleted ? (
                      <div className="flex items-center space-x-3 text-left w-full">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                          <CheckCircle2 className="w-7 h-7" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs font-black text-emerald-800">
                              ✅ OCR OK!
                            </span>
                          </div>
                          <p className="text-[11px] text-[#5c4a39] mt-1 truncate font-medium">
                            {userName} | {arcNumber} | {visaType}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-2xl bg-[#3d2817] text-[#f3ba2f] border border-[#5c3818] flex items-center justify-center shadow-md">
                          <Camera className="w-6 h-6" />
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="font-black text-sm sm:text-base text-[#1f1914]">
                            {t('auth_scan_front_title')}
                          </h4>
                          <p className="text-[11px] text-[#705e4f]">
                            {t('auth_scan_front_sub')}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="px-5 py-2.5 rounded-2xl bg-[#3d2817] hover:bg-[#2b1c10] text-[#fbf9f6] border border-[#5c3818] font-black text-xs shadow-md active:scale-97 transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <Camera className="w-4 h-4 text-[#f3ba2f]" />
                          <span>{t('auth_open_camera_btn')}</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* 활동 닉네임 / 별명 입력란 (중고거래 & 동네생활 표시용) */}
              <div className="p-3.5 rounded-2xl bg-[#f4ede6] border border-[#ded1c4] space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-[#3d2817] flex items-center gap-1.5">
                    <span>{t('auth_field_nickname')}</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setNickname(generateRandomNickname(userName))}
                    className="text-[11px] font-bold text-[#5c3818] hover:text-[#1f1914] bg-[#ede2d6] hover:bg-[#e2d4c5] px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer border border-[#ded1c4]"
                  >
                    <span>{t('auth_random_nickname_btn')}</span>
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder={t('auth_nickname_placeholder')}
                  maxLength={15}
                  className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-[#ded1c4] text-xs sm:text-sm font-black text-[#1f1914] focus:outline-none focus:border-[#845b37] focus:ring-1 focus:ring-[#845b37] shadow-2xs"
                />
              </div>

              {/* 기본 정보 입력창 (OCR 시 자동 채워짐) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#5c4a39]">
                    {t('auth_passport_name')}
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. NGUYEN VAN DUC"
                    className="w-full px-3 py-2.5 bg-white rounded-xl border border-[#ded1c4] text-xs font-bold text-[#1f1914] focus:outline-none focus:border-[#845b37]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#5c4a39]">
                    {t('auth_arc_number')}
                  </label>
                  <input
                    type="text"
                    value={arcNumber}
                    onChange={(e) => setArcNumber(e.target.value)}
                    placeholder="e.g. 950821-5184920"
                    className="w-full px-3 py-2.5 bg-white rounded-xl border border-[#ded1c4] text-xs font-bold text-[#1f1914] focus:outline-none focus:border-[#845b37]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#5c4a39]">
                    {t('auth_visa_type')}
                  </label>
                  <input
                    type="text"
                    value={visaType}
                    onChange={(e) => setVisaType(e.target.value)}
                    placeholder="E-9"
                    className="w-full px-3 py-2.5 bg-white rounded-xl border border-[#ded1c4] text-xs font-bold text-[#1f1914] focus:outline-none focus:border-[#845b37]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#5c4a39]">
                    {t('auth_stay_expiry')}
                  </label>
                  <input
                    type="date"
                    value={stayExpiryDate}
                    onChange={(e) => setStayExpiryDate(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white rounded-xl border border-[#ded1c4] text-xs font-bold text-[#1f1914] focus:outline-none focus:border-[#845b37]"
                  />
                </div>
              </div>

              {/* 통신사 드롭다운 및 휴대폰 번호 입력 (알리고 SMS 본인확인용) */}
              <div className="p-4 rounded-3xl bg-[#f7f2eb] border border-[#ded1c4] space-y-3">
                <span className="text-xs font-black text-[#1f1914] flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-[#845b37]" />
                  <span>{t('auth_telecom_phone_label')}</span>
                </span>

                {/* 통신사 드롭다운 셀렉트 */}
                <div className="relative">
                  <select
                    value={telecom}
                    onChange={(e) => setTelecom(e.target.value)}
                    className="w-full appearance-none px-4 py-2.5 bg-white rounded-xl border border-[#ded1c4] text-xs font-bold text-[#1f1914] focus:outline-none focus:border-[#845b37] cursor-pointer pr-10"
                  >
                    <option value="SKT_MVNO">{t('telecom_skt_mvno')}</option>
                    <option value="KT_MVNO">{t('telecom_kt_mvno')}</option>
                    <option value="LGU_MVNO">{t('telecom_lgu_mvno')}</option>
                    <option value="SKT">{t('telecom_skt')}</option>
                    <option value="KT">{t('telecom_kt')}</option>
                    <option value="LGU">{t('telecom_lgu')}</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#8c7866] absolute right-3 top-3 pointer-events-none" />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010-XXXX-XXXX"
                    className="flex-1 px-3.5 py-2.5 bg-white rounded-xl border border-[#ded1c4] text-xs font-bold text-[#1f1914] focus:outline-none focus:border-[#845b37]"
                  />
                  <button
                    type="button"
                    onClick={handleSendSms}
                    disabled={isSmsSending}
                    className="px-4 py-2.5 bg-[#3d2817] hover:bg-[#2b1c10] text-[#fbf9f6] font-bold text-xs rounded-xl shadow-xs transition-all shrink-0 cursor-pointer border border-[#5c3818]"
                  >
                    {isSmsSending ? t('sms_sending_btn') : t('sms_request_code_btn')}
                  </button>
                </div>
              </div>

              {/* 실제 거주 주소 (동네 / 도로명 주소) - GPS 내 위치 자동완성 지원 */}
              <div className="p-3.5 rounded-2xl bg-[#f7f2eb] border border-[#ded1c4] space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-[#3d2817] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#845b37]" />
                    <span>{t('auth_address_label')}</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleGetGpsLocation}
                    disabled={isLocating}
                    className="text-[11px] font-bold text-[#5c3818] hover:text-[#1f1914] bg-[#ede2d6] hover:bg-[#e2d4c5] px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer border border-[#ded1c4] shadow-2xs"
                    title={t('auto_ui_85')}
                  >
                    {isLocating ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#845b37]" />
                        <span>{t('loc_finding_msg')}</span>
                      </>
                    ) : (
                      <>
                        <span>{t('auth_gps_btn')}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    required
                    value={dormitory}
                    onChange={(e) => setDormitory(e.target.value)}
                    placeholder={t('auth_address_placeholder')}
                    className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-[#ded1c4] text-xs font-bold text-[#1f1914] focus:border-[#845b37] focus:outline-none shadow-2xs pr-8"
                  />
                  {dormitory && (
                    <span className="absolute right-2.5 top-2.5 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-md">
                      {t('auth_radius_badge')}
                    </span>
                  )}
                </div>

                <p className="text-[10px] text-[#705e4f] flex items-center justify-between">
                  <span>{t('auth_location_benefit_notice')}</span>
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: 알리고 SMS 6자리 인증번호 입력 단계 */}
          {step === 'sms' && (
            <form onSubmit={handleVerifySms} className="py-6 space-y-4 text-center">
              <div className="w-14 h-14 rounded-3xl bg-[#f4ede6] text-[#845b37] border border-[#ded1c4] mx-auto flex items-center justify-center shadow-xs">
                <Smartphone className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-black text-[#1f1914]">
                  {t('auth_sms_step_title')}
                </h3>
                <p className="text-xs text-[#705e4f]">
                  <strong>{phone}</strong> {t('auth_sms_step_desc')}
                </p>
              </div>

              <div className="max-w-xs mx-auto space-y-2">
                <input
                  type="text"
                  maxLength={6}
                  value={inputAuthCode}
                  onChange={(e) => setInputAuthCode(e.target.value)}
                  placeholder={t('auto_ui_89')}
                  className="w-full text-center text-xl font-mono font-black tracking-widest py-3 bg-white rounded-2xl border-2 border-[#845b37] focus:outline-none shadow-xs"
                />

                {smsError && (
                  <p className="text-xs text-rose-600 font-bold flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{smsError}</span>
                  </p>
                )}
              </div>

              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="px-4 py-2.5 bg-[#f4ede6] hover:bg-[#ede2d6] text-[#5c4a39] font-bold text-xs rounded-xl border border-[#ded1c4] cursor-pointer"
                >
                  {t('btn_prev')}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#3d2817] hover:bg-[#2b1c10] text-[#fbf9f6] font-black text-xs rounded-xl shadow-md border border-[#5c3818] cursor-pointer"
                >
                  {t('auth_sms_confirm_btn')}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: 가입 및 신원인증 완료 단계 */}
          {step === 'complete' && (
            <div className="py-6 space-y-4 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center shadow-lg shadow-emerald-600/30 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-black text-emerald-800 uppercase tracking-wider">
                  {t('auth_complete_badge')}
                </span>
                <h3 className="text-lg font-black text-[#1f1914]">
                  {nickname || userName} {t('auth_welcome_suffix')}
                </h3>
                <p className="text-xs text-[#705e4f] max-w-sm mx-auto">
                  {authTab === 'ocr' ? t('auth_complete_ocr_desc') : t('auth_complete_manual_desc')}
                </p>
              </div>

              {/* KTRS 184만원 세금 환급 연계 혜택 알림 */}
              <div className="p-4 rounded-2xl bg-[#f4ede6] border border-[#ded1c4] text-left space-y-1">
                <span className="text-xs font-black text-[#3d2817] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#845b37]" />
                  <span>{t('auto_ui_91')}</span>
                </span>
                <p className="text-xs text-[#705e4f]">
                  {t('auth_tax_bonus_notice')}
                </p>
              </div>

              <button
                type="button"
                onClick={handleFinish}
                className="w-full py-4 bg-[#3d2817] hover:bg-[#2b1c10] text-[#fbf9f6] font-black text-sm rounded-2xl shadow-xl border border-[#5c3818] cursor-pointer"
              >
                {t('auth_start_trading_btn')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
