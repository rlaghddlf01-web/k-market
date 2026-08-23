'use client';

import React, { useState, useRef } from 'react';
import { scanAlienCardImage, OcrResultData } from '@/lib/ocrService';
import { sendAligoAuthSms, verifyAuthCode } from '@/lib/aligoSmsService';
import AlienCardCameraModal from '@/components/kmarket/AlienCardCameraModal';
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

  // OCR 및 실시간 카메라 상태
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
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
      alert(t('사용 중인 브라우저에서 위치 정보(위치정보)를 지원하지 않습니다. 수기로 입력해 주세요.'));
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
          alert(t('브라우저 상단 주소창에서 [위치 정보 권한]을 [허용]해 주시거나 주소를 직접 입력해 주세요.'));
        } else {
          alert(t('위치정보 위치를 수신할 수 없습니다. 주소를 직접 입력해 주세요.'));
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

  // 1. OCR 인식 성공 데이터 자동 반영 핸들러
  const handleOcrSuccess = (result: OcrResultData) => {
    setUserName(result.userName);
    if (!nickname) {
      setNickname(result.userName.split(' ')[0] + '_' + Math.floor(100 + Math.random() * 900));
    }
    setArcNumber(result.arcNumber);
    setCountry(result.country);
    setVisaType(result.visaType);
    setStayExpiryDate(result.stayExpiryDate);
    setOcrCompleted(true);
  };

  // 파일 업로드 시 OCR 자동 인식
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    try {
      const result: OcrResultData = await scanAlienCardImage(file);
      handleOcrSuccess(result);
    } catch (err: any) {
      console.error('OCR Scan failed:', err);
      alert(err.message || t('외국인등록증 인식이 완료되지 않았습니다. 선명한 사진으로 다시 시도해 주세요.'));
    } finally {
      setIsScanning(false);
    }
  };

  // 2. 알리고 SMS 인증번호 발송
  const handleSendSms = async () => {
    if (!phone || phone.length < 10) {
      alert(t('올바른 휴대폰 번호를 입력해 주세요.'));
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
        const msgPrefix = t('[문자 인증] 인증번호');
        const msgSuffix = t('가 발송되었습니다.');
        alert(`${msgPrefix} [${res.authCode}] ${msgSuffix}`);
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
                <span>{t('17개국어 외국인 신원인증 & 가입')}</span>
              </div>
              <h2 className="text-xl font-black text-white tracking-tight">
                {t('외국인 안심 간편가입')}
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
            <span>{t('등록증 신분증 자동인식 (+7.0℃ & 상단노출 🚀)')}</span>
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
            <span>{t('수기 입력 (기본 36.5℃)')}</span>
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
                          {t('실물 신분증 신분증 자동인식 촬영 시 3대 특별 혜택')}
                        </h4>
                      </div>
                      <span className="bg-[#3d2817] text-[#f3ba2f] font-black text-[10px] px-2.5 py-0.5 rounded-full border border-[#5c3818] shadow-2xs">
                        {t('+7.0℃ 즉시 가산')}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2.5 rounded-2xl bg-white/95 border border-[#e6dacd] flex items-start gap-2 shadow-2xs">
                        <span className="text-base">🌡️</span>
                        <div>
                          <p className="font-black text-[#3d2817]">{t('매너온도 43.5℃ 골드 등급')}</p>
                          <p className="text-[#705e4f] text-[10px] mt-0.5">{t('가입 즉시 +7.0℃ 상승으로 최우수 안심 회원 뱃지 부여')}</p>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-2xl bg-white/95 border border-[#e6dacd] flex items-start gap-2 shadow-2xs">
                        <span className="text-base">🚀</span>
                        <div>
                          <p className="font-black text-[#845b37]">{t('내 매물 맨 최상단 우선 노출')}</p>
                          <p className="text-[#705e4f] text-[10px] mt-0.5">{t('신뢰도가 올라 구매자에게 먼저 추천되어 2배 빠른 판매 성사!')}</p>
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
                    onClick={() => setIsCameraModalOpen(true)}
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
                          {t('AI 신분증 자동 인식 중 (0.5초)...')}
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
                              {t('✅ 신분증 자동 인식 완료!')}
                            </span>
                            <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                              {t('다시 촬영하기')} ➔
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
                            {t('외국인등록증 앞면 사진 촬영하기')}
                          </h4>
                          <p className="text-[11px] text-[#705e4f]">
                            {t('실시간 카메라 가이드 & Gemini AI 초정밀 100% 자동 인식')}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsCameraModalOpen(true);
                          }}
                          className="px-5 py-2.5 rounded-2xl bg-[#3d2817] hover:bg-[#2b1c10] text-[#fbf9f6] border border-[#5c3818] font-black text-xs shadow-md active:scale-97 transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <Camera className="w-4 h-4 text-[#f3ba2f]" />
                          <span>{t('실시간 카메라 스캐너 열기 ➔')}</span>
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
                    <span>{t('활동 닉네임 / 별명 (별명) 필수')}</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setNickname(generateRandomNickname(userName))}
                    className="text-[11px] font-bold text-[#5c3818] hover:text-[#1f1914] bg-[#ede2d6] hover:bg-[#e2d4c5] px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer border border-[#ded1c4]"
                  >
                    <span>{t('랜덤 별명 추천')}</span>
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder={t('예: 안산호랑이, 베트남마켓, 평택친구 (2~15자)')}
                  maxLength={15}
                  className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-[#ded1c4] text-xs sm:text-sm font-black text-[#1f1914] focus:outline-none focus:border-[#845b37] focus:ring-1 focus:ring-[#845b37] shadow-2xs"
                />
              </div>

              {/* 기본 정보 입력창 (OCR 시 자동 채워짐) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#5c4a39]">
                    {t('여권상 영문 실명 입력')}
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder={t('예: 홍길동 (또는 영문 성명)')}
                    className="w-full px-3 py-2.5 bg-white rounded-xl border border-[#ded1c4] text-xs font-bold text-[#1f1914] focus:outline-none focus:border-[#845b37]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#5c4a39]">
                    {t('외국인등록번호 13자리 입력')}
                  </label>
                  <input
                    type="text"
                    value={arcNumber}
                    onChange={(e) => setArcNumber(e.target.value)}
                    placeholder={t('예: 950821-5184920')}
                    className="w-full px-3 py-2.5 bg-white rounded-xl border border-[#ded1c4] text-xs font-bold text-[#1f1914] focus:outline-none focus:border-[#845b37]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#5c4a39]">
                    {t('보유 중인 비자 종류')}
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
                    {t('체류 기간 만료일')}
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
                  <span>{t('통신사 선택 및 휴대폰 번호 (문자 본인인증)')}</span>
                </span>

                {/* 통신사 드롭다운 셀렉트 */}
                <div className="relative">
                  <select
                    value={telecom}
                    onChange={(e) => setTelecom(e.target.value)}
                    className="w-full appearance-none px-4 py-2.5 bg-white rounded-xl border border-[#ded1c4] text-xs font-bold text-[#1f1914] focus:outline-none focus:border-[#845b37] cursor-pointer pr-10"
                  >
                    <option value="SKT_MVNO">{t('📱 에스케이티 알뜰폰 (에스원 / 프리티 등)')}</option>
                    <option value="KT_MVNO">{t('📱 케이티 알뜰폰 공식 가입 센터')}</option>
                    <option value="LGU_MVNO">{t('📱 엘지유플러스 알뜰폰 (유모바일 / 인스스 등)')}</option>
                    <option value="SKT">{t('📱 에스케이티 통신사')}</option>
                    <option value="KT">{t('📱 케이티 통신사')}</option>
                    <option value="LGU">{t('📱 엘지유플러스 통신사')}</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#8c7866] absolute right-3 top-3 pointer-events-none" />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t('010-XXXX-XXXX')}
                    className="flex-1 px-3.5 py-2.5 bg-white rounded-xl border border-[#ded1c4] text-xs font-bold text-[#1f1914] focus:outline-none focus:border-[#845b37]"
                  />
                  <button
                    type="button"
                    onClick={handleSendSms}
                    disabled={isSmsSending}
                    className="px-4 py-2.5 bg-[#3d2817] hover:bg-[#2b1c10] text-[#fbf9f6] font-bold text-xs rounded-xl shadow-xs transition-all shrink-0 cursor-pointer border border-[#5c3818]"
                  >
                    {isSmsSending ? t('발송중...') : t('인증번호 받기')}
                  </button>
                </div>
              </div>

              {/* 실제 거주 주소 (동네 / 도로명 주소) - GPS 내 위치 자동완성 지원 */}
              <div className="p-3.5 rounded-2xl bg-[#f7f2eb] border border-[#ded1c4] space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-[#3d2817] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#845b37]" />
                    <span>{t('📍 실제 거주 주소 (동네 / 도로명 주소)')}</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleGetGpsLocation}
                    disabled={isLocating}
                    className="text-[11px] font-bold text-[#5c3818] hover:text-[#1f1914] bg-[#ede2d6] hover:bg-[#e2d4c5] px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer border border-[#ded1c4] shadow-2xs"
                    title={t('현재 스마트폰/브라우저 위치정보 위치로 주소 자동 입력')}
                  >
                    {isLocating ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#845b37]" />
                        <span>{t('현재 내 위치 좌표를 정밀하게 탐색하고 있습니다...')}</span>
                      </>
                    ) : (
                      <>
                        <span>{t('📍 내 위치 정보에 동의하고 주소 1초 자동 입력하기')}</span>
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
                    placeholder={t('[📍 내 위치 동의하고 자동입력] 버튼을 누르거나 직접 입력하세요')}
                    className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-[#ded1c4] text-xs font-bold text-[#1f1914] focus:border-[#845b37] focus:outline-none shadow-2xs pr-8"
                  />
                  {dormitory && (
                    <span className="absolute right-2.5 top-2.5 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-md">
                      {t('반경 5킬로미터 내외 직거래 설정')}
                    </span>
                  )}
                </div>

                <p className="text-[10px] text-[#705e4f] flex items-center justify-between">
                  <span>{t('💡 내 위치를 기반으로 가까운 공단/동네 이웃과의 직거래 매물이 우선 표시됩니다.')}</span>
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
                  {t('휴대폰으로 전송된 문자 인증번호 6자리 입력')}
                </h3>
                <p className="text-xs text-[#705e4f]">
                  <strong>{phone}</strong> {t('고객님의 휴대폰으로 발송된 6자리 인증번호를 정확하게 입력해 주세요.')}
                </p>
              </div>

              <div className="max-w-xs mx-auto space-y-2">
                <input
                  type="text"
                  maxLength={6}
                  value={inputAuthCode}
                  onChange={(e) => setInputAuthCode(e.target.value)}
                  placeholder={t('문자 문자로 수신된 인증번호 6자리')}
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
                  {t('이전 단계로 돌아가기')}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#3d2817] hover:bg-[#2b1c10] text-[#fbf9f6] font-black text-xs rounded-xl shadow-md border border-[#5c3818] cursor-pointer"
                >
                  {t('문자 본인인증 완료하고 계속 진행하기')}
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
                  {t('외국인 신원인증 완료 안심 뱃지')}
                </span>
                <h3 className="text-lg font-black text-[#1f1914]">
                  {nickname || userName} {t('님, 케이마켓에 오신 것을 진심으로 환영합니다!')}
                </h3>
                <p className="text-xs text-[#705e4f] max-w-sm mx-auto">
                  {authTab === 'ocr' ? t('외국인등록증 인증이 성공적으로 완료되어 매너온도 43.5℃(골드 등급)가 부여되었습니다.') : t('기본 회원가입이 완료되었습니다. 외국인등록증을 추가 인증하시면 매너온도 43.5℃ 혜택을 받으실 수 있습니다.')}
                </p>
              </div>

              {/* KTRS 184만원 세금 환급 연계 혜택 알림 */}
              <div className="p-4 rounded-2xl bg-[#f4ede6] border border-[#ded1c4] text-left space-y-1">
                <span className="text-xs font-black text-[#3d2817] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#845b37]" />
                  <span>{t('케이티알에스 외국인 특별 세금 환급 연계 혜택')}</span>
                </span>
                <p className="text-xs text-[#705e4f]">
                  {t('외국인 세금 환급 조회 시 평균 184만 원 혜택이 함께 제공됩니다.')}
                </p>
              </div>

              <button
                type="button"
                onClick={handleFinish}
                className="w-full py-4 bg-[#3d2817] hover:bg-[#2b1c10] text-[#fbf9f6] font-black text-sm rounded-2xl shadow-xl border border-[#5c3818] cursor-pointer"
              >
                {t('안심 직거래 서비스 시작하기 →')}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 외국인등록증 실시간 카메라 촬영 및 정밀 OCR 모달 */}
      <AlienCardCameraModal
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
        onSuccess={(result) => {
          handleOcrSuccess(result);
          setIsCameraModalOpen(false);
        }}
      />
    </div>
  );
}
