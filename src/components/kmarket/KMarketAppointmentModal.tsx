'use client';

import React, { useState } from 'react';
import { POPULAR_LANDMARKS, LandmarkPin } from '@/lib/locationData';
import { AppointmentData } from '@/types/kmarket';
import {
  X,
  MapPin,
  Calendar,
  Bell,
  Navigation,
  CheckCircle2,
  Sparkles,
  Building,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface KMarketAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUserName?: string;
  itemTitle?: string;
  defaultRegion?: string;
  onConfirmAppointment: (appointment: AppointmentData) => void;
}

export default function KMarketAppointmentModal({
  isOpen,
  onClose,
  onConfirmAppointment,
}: KMarketAppointmentModalProps) {

  // 기본 랜드마크
  const defaultLm = POPULAR_LANDMARKS[0];
  const [selectedLandmark, setSelectedLandmark] = useState<LandmarkPin>(defaultLm);
  const [customPlaceName, setCustomPlaceName] = useState(defaultLm.name);
  const [customDetail, setCustomDetail] = useState(defaultLm.detail);
  const [customAddress, setCustomAddress] = useState(defaultLm.address);
  const [selectedDate, setSelectedDate] = useState<string>('오늘 (Today)');
  const [selectedTime, setSelectedTime] = useState<string>('19:00');
  const [remind1Hour, setRemind1Hour] = useState<boolean>(true);

  // 지도 핀 위치 (X, Y 비율 0~100)
  const [pinPos, setPinPos] = useState({ x: 50, y: 50 });

  if (!isOpen) return null;

  const handleSelectLandmark = (lm: LandmarkPin) => {
    setSelectedLandmark(lm);
    setCustomPlaceName(lm.name);
    setCustomDetail(lm.detail);
    setCustomAddress(lm.address);
    // 랜드마크별 지도 위치 약간 변화
    setPinPos({
      x: 35 + ((lm.lat * 100) % 30),
      y: 35 + ((lm.lng * 100) % 30),
    });
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPinPos({ x: Math.round(x), y: Math.round(y) });
  };

  const handleSendAppointment = (e: React.FormEvent) => {
    e.preventDefault();

    const appointment: AppointmentData = {
      id: 'apt-' + Date.now(),
      place_name: customPlaceName,
      landmark_detail: customDetail,
      address: customAddress,
      lat: selectedLandmark.lat,
      lng: selectedLandmark.lng,
      meet_time: `${selectedDate} ${selectedTime}`,
      remind_1hour_before: remind1Hour,
      status: 'confirmed',
    };

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    onConfirmAppointment(appointment);
    onClose();
  };

  // 빠른 시간 템플릿
  const quickTimes = [
    { label: '오늘 저녁 19:00', date: '오늘', time: '19:00' },
    { label: '오늘 밤 20:30', date: '오늘', time: '20:30' },
    { label: '내일 점심 12:30', date: '내일', time: '12:30' },
    { label: '내일 저녁 19:00', date: '내일', time: '19:00' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-gray-800 flex flex-col max-h-[92vh]">
        {/* 모달 상단 헤더 */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 p-5 text-white relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center space-x-1.5 bg-black/20 px-2.5 py-0.5 rounded-full text-xs font-bold text-sky-200 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>외국인 안심 직거래 시스템</span>
          </div>
          <h2 className="text-xl font-black tracking-tight flex items-center gap-1.5">
            <MapPin className="w-5 h-5 text-yellow-300" />
            <span>만날 장소 핀 & 약속 잡기</span>
          </h2>
          <p className="text-xs text-sky-100 mt-1">
            한국 도로명 주소가 낯선 외국인도 랜드마크 핀으로 길 잃지 않고 정확히 만날 수 있습니다.
          </p>
        </div>

        {/* 폼 본문 영역 */}
        <form onSubmit={handleSendAppointment} className="p-5 overflow-y-auto space-y-5 flex-1 text-xs sm:text-sm">
          {/* 1. 대화형 지도 핀 뷰어 (Interactive Map Canvas) */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-bold text-slate-800 dark:text-slate-200">
              <span className="flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5 text-blue-600" />
                <span>1. 만남 장소 지도 핀 (클릭하여 핀 위치 이동)</span>
              </span>
              <span className="text-[11px] text-blue-600 font-semibold">지도 위 클릭 가능</span>
            </div>

            <div
              onClick={handleMapClick}
              className="relative h-44 w-full rounded-2xl overflow-hidden border-2 border-blue-400/60 bg-slate-100 cursor-crosshair group shadow-inner"
            >
              {/* 실제 지도 배경 그리드 텍스처 그래픽 */}
              <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-slate-50/80 to-emerald-50/60" />

              {/* 도로망 시뮬레이션 라인 */}
              <div className="absolute top-1/2 left-0 right-0 h-4 bg-slate-200/90 border-y border-slate-300/80 -translate-y-1/2 flex items-center justify-around text-[9px] text-slate-400 font-mono">
                <span>포승공단로 (Poseung-gongdan-ro)</span>
              </div>
              <div className="absolute top-0 bottom-0 left-1/3 w-4 bg-slate-200/90 border-x border-slate-300/80 flex flex-col justify-around text-[9px] text-slate-400 font-mono items-center">
                <span>공단대로</span>
              </div>

              {/* 랜드마크 건물 아이콘들 */}
              <div className="absolute top-4 left-6 bg-white/90 border border-slate-200 p-1.5 rounded-lg shadow-xs flex items-center gap-1 text-[10px] font-bold text-slate-700">
                <Building className="w-3 h-3 text-blue-600" />
                <span>외국인 기숙사 2동</span>
              </div>
              <div className="absolute bottom-4 right-6 bg-white/90 border border-slate-200 p-1.5 rounded-lg shadow-xs flex items-center gap-1 text-[10px] font-bold text-slate-700">
                <span>🏪 GS25 편의점</span>
              </div>

              {/* 실시간 펄스 핀 마커 */}
              <div
                style={{ left: `${pinPos.x}%`, top: `${pinPos.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-full transition-all duration-300 pointer-events-none z-20 flex flex-col items-center"
              >
                <div className="bg-slate-900 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg whitespace-nowrap mb-1 flex items-center gap-1 border border-amber-300 animate-bounce">
                  <span>📍 {customPlaceName}</span>
                </div>
                <div className="relative flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-red-500/30 animate-ping absolute" />
                  <MapPin className="w-7 h-7 text-red-600 drop-shadow-md fill-red-500" />
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              💡 {customAddress} ({customDetail})
            </p>
          </div>

          {/* 2. 외국인 단골 공단 랜드마크 퀵 선택 */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
              2. 공단 주요 랜드마크 퀵 선택 (원클릭 핀 지정)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {POPULAR_LANDMARKS.slice(0, 4).map((lm) => {
                const isSelected = selectedLandmark.id === lm.id;
                return (
                  <button
                    key={lm.id}
                    type="button"
                    onClick={() => handleSelectLandmark(lm)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/80 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-bold ring-2 ring-blue-500/20'
                        : 'border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{lm.icon}</span>
                      <span className="text-xs font-bold truncate">{lm.name}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">
                      {lm.zoneName} • {lm.detail}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. 만남 날짜 & 시간 선택 */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                <span>3. 만남 시간 정하기 (Meetup Time)</span>
              </span>
              <span className="text-[11px] text-blue-600 font-bold">
                {selectedDate} {selectedTime}
              </span>
            </label>

            {/* 빠른 퀵 시간 버튼 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {quickTimes.map((qt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedDate(qt.date);
                    setSelectedTime(qt.time);
                  }}
                  className={`py-2 px-1.5 rounded-xl border text-center transition-all cursor-pointer text-xs ${
                    selectedDate === qt.date && selectedTime === qt.time
                      ? 'border-blue-600 bg-blue-600 text-white font-bold shadow-xs'
                      : 'border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {qt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. 1시간 전 모국어 자동 알림 리마인더 */}
          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-600">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-950 dark:text-amber-200 block">
                  ⏰ 약속 1시간 전 모국어 자동 푸시 알림
                </span>
                <span className="text-[10px] text-amber-800/80 dark:text-amber-300/80">
                  약속을 잊지 않도록 상대방과 나에게 각자의 언어로 1시간 전에 알려드립니다.
                </span>
              </div>
            </div>

            <input
              type="checkbox"
              checked={remind1Hour}
              onChange={(e) => setRemind1Hour(e.target.checked)}
              className="w-4 h-4 text-amber-600 rounded-md focus:ring-amber-500 cursor-pointer"
            />
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm sm:text-base rounded-2xl shadow-xl shadow-blue-600/25 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>채팅방에 장소 핀 & 약속 카드 전송하기</span>
          </button>
        </form>
      </div>
    </div>
  );
}
