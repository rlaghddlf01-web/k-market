'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Camera,
  RotateCcw,
  Sparkles,
  X,
  Upload,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  CreditCard,
  ShieldCheck,
  SwitchCamera,
  Eye,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { scanAlienCardImage, OcrResultData } from '@/lib/ocrService';

interface AlienCardCameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (result: OcrResultData) => void;
}

export default function AlienCardCameraModal({
  isOpen,
  onClose,
  onSuccess,
}: AlienCardCameraModalProps) {
  const { t } = useLanguage();

  // 카메라 스트림 상태
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraFacing, setCameraFacing] = useState<'environment' | 'user'>('environment');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [hasCamera, setHasCamera] = useState<boolean>(true);

  // 캡처 및 OCR 상태
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [capturedBlob, setCapturedBlob] = useState<Blob | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<OcrResultData | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);

  // 카메라 스트림 시작
  const startCamera = useCallback(async (facing: 'environment' | 'user') => {
    setCameraError(null);
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setHasCamera(false);
        setCameraError(t('이 기기에서는 실시간 카메라 접근을 지원하지 않습니다. 앨범에서 사진을 업로드해 주세요.'));
        return;
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: facing },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      setHasCamera(true);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play().catch(() => {});
      }
    } catch (err: any) {
      console.warn('Camera start failed:', err);
      setHasCamera(false);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError(t('카메라 권한이 거부되었습니다. 주소창에서 카메라 권한을 허용하거나 사진을 직접 업로드해 주세요.'));
      } else {
        setCameraError(t('카메라를 시작할 수 없습니다. 앨범에서 신분증 사진을 업로드해 주세요.'));
      }
    }
  }, [stream, t]);

  // 스트림 정지
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  }, [stream]);

  // 모달 열림/닫힘 생명주기
  useEffect(() => {
    if (isOpen) {
      setCapturedImage(null);
      setCapturedBlob(null);
      setScanResult(null);
      setScanError(null);
      startCamera(cameraFacing);
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen]);

  // 카메라 전후면 전환
  const toggleFacing = () => {
    const nextFacing = cameraFacing === 'environment' ? 'user' : 'environment';
    setCameraFacing(nextFacing);
    startCamera(nextFacing);
  };

  // 사진 촬영 (Capture)
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const imageUrl = URL.createObjectURL(blob);
          setCapturedImage(imageUrl);
          setCapturedBlob(blob);
          stopCamera();
        }
      },
      'image/jpeg',
      0.95
    );
  };

  // 갤러리 파일 업로드
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setCapturedImage(imageUrl);
    setCapturedBlob(file);
    stopCamera();
  };

  // 다시 촬영
  const handleRetake = () => {
    if (capturedImage) {
      URL.revokeObjectURL(capturedImage);
    }
    setCapturedImage(null);
    setCapturedBlob(null);
    setScanResult(null);
    setScanError(null);
    startCamera(cameraFacing);
  };

  // OCR 분석 실행
  const runOcrAnalysis = async () => {
    if (!capturedBlob) return;

    setIsScanning(true);
    setScanError(null);

    try {
      const result = await scanAlienCardImage(capturedBlob);
      setScanResult(result);
    } catch (err: any) {
      console.error('OCR Error:', err);
      setScanError(err.message || t('외국인등록증을 정확히 인식하지 못했습니다. 더 선명한 사진으로 다시 촬영해 주세요.'));
    } finally {
      setIsScanning(false);
    }
  };

  // 캡처 즉시 자동 OCR 분석 시작
  useEffect(() => {
    if (capturedBlob && !scanResult && !isScanning && !scanError) {
      runOcrAnalysis();
    }
  }, [capturedBlob]);

  // 최종 적용 및 닫기
  const handleApply = () => {
    if (scanResult) {
      onSuccess(scanResult);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* 상단 헤더 */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800 bg-neutral-900/90 sticky top-0 z-20">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                {t('외국인등록증 AI 스마트 촬영')}
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Gemini OCR
                </span>
              </h3>
              <p className="text-xs text-neutral-400">
                {t('실시간 카메라로 등록증을 스캔하여 정보를 자동 추출합니다.')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 캔버스 (숨김) */}
        <canvas ref={canvasRef} className="hidden" />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* 본체 영역 */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {!capturedImage ? (
            /* 1. 실시간 카메라 뷰파인더 모드 */
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-black rounded-2xl overflow-hidden border border-neutral-700 flex items-center justify-center shadow-inner">
              {hasCamera && !cameraError ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />

                  {/* 신분증 가이드 사각 프레임 오버레이 */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-6">
                    <div className="relative w-full max-w-[340px] aspect-[1.58/1] rounded-xl border-2 border-dashed border-blue-400/80 bg-blue-500/5 shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]">
                      {/* 사각 모서리 강조 가이드 */}
                      <div className="absolute -top-1 -left-1 w-5 h-5 border-t-4 border-l-4 border-blue-400 rounded-tl-sm" />
                      <div className="absolute -top-1 -right-1 w-5 h-5 border-t-4 border-r-4 border-blue-400 rounded-tr-sm" />
                      <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-4 border-l-4 border-blue-400 rounded-bl-sm" />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-4 border-r-4 border-blue-400 rounded-br-sm" />

                      {/* 중앙 안내 문구 */}
                      <div className="absolute inset-x-0 bottom-2 text-center">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-black/75 text-[11px] font-medium text-blue-200 backdrop-blur-sm">
                          {t('신분증을 가이드 박스 안에 맞춰주세요')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 카메라 전환 버튼 (우측 상단) */}
                  <button
                    type="button"
                    onClick={toggleFacing}
                    className="absolute top-3 right-3 p-2.5 bg-black/60 hover:bg-black/80 text-white rounded-full backdrop-blur-md border border-white/10 transition-all active:scale-95"
                    title={t('카메라 전환')}
                  >
                    <SwitchCamera className="w-4 h-4" />
                  </button>
                </>
              ) : (
                /* 카메라 사용 불가 시 안내 */
                <div className="text-center p-6 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <p className="text-xs text-neutral-300 max-w-xs mx-auto leading-relaxed">
                    {cameraError || t('카메라를 사용할 수 없습니다. 신분증 사진을 파일로 업로드해 주세요.')}
                  </p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg transition-all"
                  >
                    <Upload className="w-4 h-4" />
                    {t('신분증 사진 파일 선택')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* 2. 캡처된 이미지 및 OCR 분석 뷰 */
            <div className="space-y-4">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-black rounded-2xl overflow-hidden border border-neutral-700 shadow-inner flex items-center justify-center">
                <img
                  src={capturedImage}
                  alt="Captured Alien Card"
                  className="w-full h-full object-contain"
                />

                {/* 스캔 진행 중 레이저 애니메이션 */}
                {isScanning && (
                  <div className="absolute inset-0 bg-blue-950/40 backdrop-blur-[2px] flex flex-col items-center justify-center z-10">
                    {/* 레이저 스캔 라인 */}
                    <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_15px_#60a5fa] animate-pulse top-1/2 -translate-y-1/2" />
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/90 border border-blue-500/50 shadow-xl">
                      <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />
                      <span className="text-xs font-bold text-white">
                        {t('Gemini AI가 신분증을 정밀 분석 중...')}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* OCR 결과 카드 */}
              {scanResult && (
                <div className="p-4 rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-emerald-500/40 shadow-lg space-y-3 animate-in zoom-in-95">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-700/60">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-emerald-300">
                        {t('신분증 정보가 정밀 추출되었습니다')}
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded border border-neutral-700">
                      신뢰도 {(scanResult.confidence * 100).toFixed(0)}%
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-neutral-900/70 p-2.5 rounded-xl border border-neutral-800">
                      <p className="text-[10px] text-neutral-400 font-medium">{t('영문 성명 (Name)')}</p>
                      <p className="text-white font-bold mt-0.5 truncate">{scanResult.userName || '-'}</p>
                    </div>

                    <div className="bg-neutral-900/70 p-2.5 rounded-xl border border-neutral-800">
                      <p className="text-[10px] text-neutral-400 font-medium">{t('외국인등록번호')}</p>
                      <p className="text-white font-bold mt-0.5 font-mono">
                        {scanResult.arcNumberMasked || scanResult.arcNumber || '-'}
                      </p>
                    </div>

                    <div className="bg-neutral-900/70 p-2.5 rounded-xl border border-neutral-800">
                      <p className="text-[10px] text-neutral-400 font-medium">{t('국적 (Nationality)')}</p>
                      <p className="text-white font-bold mt-0.5 flex items-center gap-1.5">
                        <span>{scanResult.flagEmoji}</span>
                        <span>{scanResult.countryName} ({scanResult.country})</span>
                      </p>
                    </div>

                    <div className="bg-neutral-900/70 p-2.5 rounded-xl border border-neutral-800">
                      <p className="text-[10px] text-neutral-400 font-medium">{t('체류자격 / 만료일')}</p>
                      <p className="text-white font-bold mt-0.5">
                        <span className="text-blue-400 font-semibold">{scanResult.visaType}</span>
                        <span className="text-neutral-500 mx-1">|</span>
                        <span className="text-neutral-300 font-mono text-[11px]">{scanResult.stayExpiryDate || '-'}</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* OCR 실패 에러 카드 */}
              {scanError && (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div className="flex-1 text-xs">
                    <p className="font-bold text-rose-300">{t('신분증 인식 실패')}</p>
                    <p className="text-neutral-300 mt-1">{scanError}</p>
                    <p className="text-[11px] text-neutral-400 mt-1">
                      {t('빛 반사를 피하고 글자가 또렷하게 보이도록 다시 촬영해 주세요.')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 촬영 안내 팁 */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-neutral-800/60 border border-neutral-700/50 text-[11px] text-neutral-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              {t('입력된 신분증 정보는 본인 인증 및 비자 확인 목적으로만 암호화되어 안전하게 처리됩니다.')}
            </span>
          </div>
        </div>

        {/* 하단 액션 버튼 바 */}
        <div className="p-5 border-t border-neutral-800 bg-neutral-900/90 sticky bottom-0 z-20">
          {!capturedImage ? (
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold border border-neutral-700 transition-all active:scale-95"
              >
                <Upload className="w-4 h-4 text-neutral-400" />
                <span>{t('앨범에서 선택')}</span>
              </button>

              {hasCamera && !cameraError && (
                <button
                  type="button"
                  onClick={capturePhoto}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all active:scale-95"
                >
                  <Camera className="w-4 h-4" />
                  <span>{t('신분증 촬영하기')}</span>
                </button>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleRetake}
                disabled={isScanning}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold border border-neutral-700 transition-all disabled:opacity-50"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t('다시 촬영')}</span>
              </button>

              {scanResult ? (
                <button
                  type="button"
                  onClick={handleApply}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all active:scale-95"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t('추출된 정보 자동 입력하기')}</span>
                </button>
              ) : scanError ? (
                <button
                  type="button"
                  onClick={runOcrAnalysis}
                  disabled={isScanning}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg transition-all active:scale-95 disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
                  <span>{t('다시 분석하기')}</span>
                </button>
              ) : (
                <div className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-neutral-800 text-neutral-400 text-xs font-semibold">
                  <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
                  <span>{t('분석 중...')}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
