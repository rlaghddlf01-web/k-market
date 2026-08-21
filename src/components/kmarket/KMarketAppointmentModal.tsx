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
  Search,
  Check,
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
  const [searchText, setSearchText] = useState('');
  const [customPlaceName, setCustomPlaceName] = useState(defaultLm.name);
  const [customDetail, setCustomDetail] = useState(defaultLm.detail);
  const [customAddress, setCustomAddress] = useState(defaultLm.address);
  const [selectedDate, setSelectedDate] = useState<string>('오늘 (Today)');
  const [selectedTime, setSelectedTime] = useState<string>('19:00');
  const [remind1Hour, setRemind1Hour] = useState<boolean>(true);

  // 지도 핀 위치 (X, Y 비율 0~100)
  const [pinPos, setPinPos] = useState({ x: 50, y: 50 });
  const [isSavedPin, setIsSavedPin] = useState(false);

  if (!isOpen) return null;

  // 텍스트 검색 기반 추천 랜드마크 필터링
  const filteredLandmarks = searchText.trim()
    ? POPULAR_LANDMARKS.filter(
        (lm) =>
          lm.name.toLowerCase().includes(searchText.toLowerCase()) ||
          lm.detail.toLowerCase().includes(searchText.toLowerCase()) ||
          lm.address.toLowerCase().includes(searchText.toLowerCase()) ||
          lm.zoneName.toLowerCase().includes(searchText.toLowerCase())
      )
    : POPULAR_LANDMARKS;

  // 랜드마크 선택
  const handleSelectLandmark = (lm: LandmarkPin) => {
    setCustomPlaceName(lm.name);
    setCustomDetail(lm.detail);
    setCustomAddress(lm.address);
    setSearchText(lm.name);
    setIsSavedPin(true);
    // 랜드마크별 지도 위치 스냅
    setPinPos({
      x: 35 + ((lm.lat * 100) % 30),
      y: 35 + ((lm.lng * 100) % 30),
    });
  };

  // 외국인이 직접 텍스트로 입력한 장소 적용
  const handleApplyCustomText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchText.trim()) return;
    setCustomPlaceName(searchText.trim());
    setCustomDetail('외국인 회원 지정 만남 장소');
    setCustomAddress(`한국 지정 위치 (${searchText.trim()})`);
    setIsSavedPin(true);
  };

  // 지도 위를 직접 클릭하여 핀 위치 지정
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const roundedX = Math.round(x);
    const roundedY = Math.round(y);
    setPinPos({ x: roundedX, y: roundedY });
    setIsSavedPin(true);

    if (!searchText) {
      setCustomPlaceName(`지도 선택 핀 위치 (X:${roundedX}, Y:${roundedY})`);
    }
  };

  // 최종 약속 및 핀 전송
  const handleSendAppointment = (e: React.FormEvent) => {
    e.preventDefault();

    const appointment: AppointmentData = {
      id: 'apt-' + Date.now(),
      place_name: customPlaceName || '지정 직거래 만남 장소',
      landmark_detail: customDetail || '외국인 회원 약속 핀',
      address: customAddress || '공단 인근 직거래 위치',
      lat: 36.9852 + (pinPos.x - 50) * 0.005,
      lng: 126.8571 + (pinPos.y - 50) * 0.005,
      meet_time: `${selectedDate} ${selectedTime}`,
      remind_1hour_before: remind1Hour,
      status: 'confirmed',
    };

    try {
      confetti({
        particleCount: 90,
        spread: 70,
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
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-gray-800 flex flex-col max-h-[94vh]">
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
            <span>외국인 맞춤 텍스트 검색 & 지도 핀</span>
          </div>
          <h2 className="text-xl font-black tracking-tight flex items-center gap-1.5">
            <MapPin className="w-5 h-5 text-yellow-300" />
            <span>만날 장소 직접 검색 & 핀 저장</span>
          </h2>
          <p className="text-xs text-sky-100 mt-1">
            원하는 장소를 텍스트로 직접 입력하거나, 지도에서 핀을 콕 찍어 저장할 수 있습니다.
          </p>
        </div>

        {/* 폼 본문 영역 */}
        <form onSubmit={handleSendAppointment} className="p-5 overflow-y-auto space-y-5 flex-1 text-xs sm:text-sm">
          {/* 1. 외국인이 직접 텍스트로 입력하는 검색/지명 인풋창 */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Search className="w-3.5 h-3.5 text-blue-600" />
                <span>1. 만날 장소 직접 입력 (편의점, 기숙사, 지하철역 등)</span>
              </span>
              <span className="text-[10px] text-blue-600 font-semibold">텍스트 입력 후 지도 핀 확인</span>
            </label>

            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="예: 포승공단 GS25, 원곡동 시계탑, 기숙사 정문 앞 등"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 text-xs font-medium focus:bg-white focus:border-blue-500 focus:outline-none"
                />
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
              <button
                type="button"
                onClick={handleApplyCustomText}
                className="px-3.5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs shrink-0 cursor-pointer flex items-center gap-1"
              >
                <span>핀 적용</span>
              </button>
            </div>

            {/* 추천 장소 퀵 칩 리스트 */}
            {filteredLandmarks.length > 0 && (
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
                <span className="text-[10px] text-slate-400 shrink-0">추천 랜드마크:</span>
                {filteredLandmarks.slice(0, 4).map((lm) => (
                  <button
                    key={lm.id}
                    type="button"
                    onClick={() => handleSelectLandmark(lm)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-slate-700 dark:text-slate-300 text-[11px] font-semibold shrink-0 border border-slate-200/80 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>{lm.icon}</span>
                    <span>{lm.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2. 대화형 지도 핀 뷰어 (입력 텍스트와 실시간 연동) */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-bold text-slate-800 dark:text-slate-200">
              <span className="flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5 text-blue-600" />
                <span>2. 지도 뷰어 (원하는 지점을 클릭해 핀 위치 미세조정)</span>
              </span>
              <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                <Check className="w-3 h-3" />
                {isSavedPin ? '핀 지정 완료' : '지도 터치 시 핀 생성'}
              </span>
            </div>

            <div
              onClick={handleMapClick}
              className="relative h-44 w-full rounded-2xl overflow-hidden border-2 border-blue-400/80 bg-slate-100 cursor-crosshair group shadow-inner"
            >
              {/* 지도 그리드 및 로드망 그래픽 */}
              <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/70 via-slate-50/80 to-emerald-50/70" />

              {/* 도로망 시뮬레이션 라인 */}
              <div className="absolute top-1/2 left-0 right-0 h-4 bg-slate-200/90 border-y border-slate-300/80 -translate-y-1/2 flex items-center justify-around text-[9px] text-slate-400 font-mono">
                <span>공단 직거래 안심 거리 (Safety Meetup Road)</span>
              </div>
              <div className="absolute top-0 bottom-0 left-1/3 w-4 bg-slate-200/90 border-x border-slate-300/80 flex flex-col justify-around text-[9px] text-slate-400 font-mono items-center">
                <span>메인대로</span>
              </div>

              {/* 랜드마크 건물 아이콘들 */}
              <div className="absolute top-4 left-6 bg-white/90 border border-slate-200 p-1.5 rounded-lg shadow-xs flex items-center gap-1 text-[10px] font-bold text-slate-700 pointer-events-none">
                <Building className="w-3 h-3 text-blue-600" />
                <span>외국인 기숙사</span>
              </div>
              <div className="absolute bottom-4 right-6 bg-white/90 border border-slate-200 p-1.5 rounded-lg shadow-xs flex items-center gap-1 text-[10px] font-bold text-slate-700 pointer-events-none">
                <span>🏪 24시 편의점</span>
              </div>

              {/* 실시간 펄스 핀 마커 */}
              <div
                style={{ left: `${pinPos.x}%`, top: `${pinPos.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-full transition-all duration-200 pointer-events-none z-20 flex flex-col items-center"
              >
                <div className="bg-slate-950 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-xl whitespace-nowrap mb-1 flex items-center gap-1 border border-amber-300 animate-bounce">
                  <span>📍 {customPlaceName}</span>
                </div>
                <div className="relative flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-red-500/40 animate-ping absolute" />
                  <MapPin className="w-7 h-7 text-red-600 drop-shadow-lg fill-red-500" />
                </div>
              </div>
            </div>

            {/* 현재 저장될 핀 정보 표시 박스 */}
            <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/50 flex items-center justify-between">
              <div className="truncate mr-2">
                <span className="font-bold text-blue-950 dark:text-blue-200 text-xs block truncate">
                  📍 선택된 핀: {customPlaceName}
                </span>
                <span className="text-[10px] text-blue-800/80 dark:text-blue-300/80 truncate block">
                  {customAddress}
                </span>
              </div>
              <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-md shrink-0">
                핀 위치 확정
              </span>
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
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-600 shrink-0">
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
              className="w-4 h-4 text-amber-600 rounded-md focus:ring-amber-500 cursor-pointer shrink-0"
            />
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm sm:text-base rounded-2xl shadow-xl shadow-blue-600/25 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>이 위치로 핀 저장하고 약속 전송하기</span>
          </button>
        </form>
      </div>
    </div>
  );
}
