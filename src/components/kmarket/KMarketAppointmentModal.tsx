'use client';

import React, { useState, useEffect } from 'react';
import { POPULAR_LANDMARKS, LandmarkPin } from '@/lib/locationData';
import { AppointmentData } from '@/types/kmarket';
import {
  X,
  MapPin,
  Calendar,
  Clock,
  Bell,
  Navigation,
  CheckCircle2,
  Sparkles,
  Search,
  Check,
  ExternalLink,
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
  const [searchText, setSearchText] = useState(defaultLm.name);
  const [mapQuery, setMapQuery] = useState(defaultLm.address);
  const [customPlaceName, setCustomPlaceName] = useState(defaultLm.name);
  const [customDetail, setCustomDetail] = useState(defaultLm.detail);
  const [customAddress, setCustomAddress] = useState(defaultLm.address);
  const [customTimeText, setCustomTimeText] = useState<string>('오늘 저녁 19:00');
  const [remind1Hour, setRemind1Hour] = useState<boolean>(true);
  const [isMapLoading, setIsMapLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSearchText(defaultLm.name);
      setMapQuery(defaultLm.address);
      setCustomPlaceName(defaultLm.name);
      setCustomAddress(defaultLm.address);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // 추천 랜드마크 필터링
  const filteredLandmarks = searchText.trim()
    ? POPULAR_LANDMARKS.filter(
        (lm) =>
          lm.name.toLowerCase().includes(searchText.toLowerCase()) ||
          lm.detail.toLowerCase().includes(searchText.toLowerCase()) ||
          lm.address.toLowerCase().includes(searchText.toLowerCase()) ||
          lm.zoneName.toLowerCase().includes(searchText.toLowerCase())
      )
    : POPULAR_LANDMARKS;

  // 랜드마크 칩 선택 시 구글 맵 즉시 이동
  const handleSelectLandmark = (lm: LandmarkPin) => {
    setIsMapLoading(true);
    setSearchText(lm.name);
    setMapQuery(lm.address || lm.name);
    setCustomPlaceName(lm.name);
    setCustomDetail(lm.detail);
    setCustomAddress(lm.address);
    setTimeout(() => setIsMapLoading(false), 500);
  };

  // 외국인이 검색창에 직접 텍스트 입력 후 [지도 검색 & 핀 연동] 실행
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchText.trim()) return;

    setIsMapLoading(true);
    const query = searchText.trim();
    setMapQuery(query);
    setCustomPlaceName(query);
    setCustomDetail('지정 직거래 만남 장소');
    setCustomAddress(query.includes('시') || query.includes('로') || query.includes('길') ? query : `대한민국 (${query})`);
    setTimeout(() => setIsMapLoading(false), 500);
  };

  // 구글 맵 외부 새 창 열기
  const handleOpenGoogleMapsApp = () => {
    const targetUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
    window.open(targetUrl, '_blank');
  };

  // 최종 약속 및 핀 전송
  const handleSendAppointment = (e: React.FormEvent) => {
    e.preventDefault();

    const appointment: AppointmentData = {
      id: 'apt-' + Date.now(),
      place_name: customPlaceName || searchText || '지정 직거래 장소',
      landmark_detail: customDetail || '외국인 회원 약속 핀',
      address: customAddress || mapQuery,
      lat: 36.9852,
      lng: 126.8571,
      meet_time: customTimeText.trim() || '오늘 저녁 19:00',
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
    { label: '오늘 저녁 19:00' },
    { label: '오늘 밤 20:30' },
    { label: '내일 점심 12:30' },
    { label: '내일 저녁 19:00' },
  ];

  // 실제 구글 맵 Embed URL
  const googleMapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    mapQuery
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

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
            <span>실시간 구글 맵 (Google Maps) 연동</span>
          </div>
          <h2 className="text-xl font-black tracking-tight flex items-center gap-1.5">
            <MapPin className="w-5 h-5 text-yellow-300" />
            <span>만날 장소 직접 검색 & 구글 맵 핀 저장</span>
          </h2>
          <p className="text-xs text-sky-100 mt-1">
            주소나 장소를 입력하면 실제 구글 지도가 즉시 해당 위치로 이동하여 핀을 고정합니다.
          </p>
        </div>

        {/* 폼 본문 영역 */}
        <form onSubmit={handleSendAppointment} className="p-5 overflow-y-auto space-y-5 flex-1 text-xs sm:text-sm">
          {/* 1. 장소/주소 텍스트 검색 및 직접 입력창 */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Search className="w-3.5 h-3.5 text-blue-600" />
                <span>1. 만날 장소/주소 직접 입력 (편의점, 기숙사, 역, 도로명)</span>
              </span>
              <span className="text-[10px] text-blue-600 font-semibold">입력 후 [지도 검색] 클릭</span>
            </label>

            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSearchSubmit(e);
                    }
                  }}
                  placeholder="예: 평택 포승공단 GS25, 안산 원곡동 시계탑, 정왕역 등"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 text-xs font-bold text-slate-900 dark:text-white focus:bg-white focus:border-blue-500 focus:outline-none"
                />
                <MapPin className="w-4 h-4 text-blue-600 absolute left-3 top-3" />
              </div>
              <button
                type="button"
                onClick={handleSearchSubmit}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-blue-500/20 shrink-0 cursor-pointer flex items-center gap-1"
              >
                <Search className="w-3.5 h-3.5" />
                <span>지도 검색</span>
              </button>
            </div>

            {/* 추천 랜드마크 퀵 칩 리스트 */}
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

          {/* 2. 실제 구글 맵 (Google Maps) 실시간 인터랙티브 뷰어 */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-bold text-slate-800 dark:text-slate-200">
              <span className="flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5 text-blue-600" />
                <span>2. 실시간 구글 지도 뷰어 (Google Maps Live)</span>
              </span>
              <button
                type="button"
                onClick={handleOpenGoogleMapsApp}
                className="text-[11px] text-blue-600 hover:text-blue-800 font-bold flex items-center gap-0.5 cursor-pointer"
              >
                <span>구글 맵 앱으로 열기</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            {/* 실제 Google Maps Embed iframe 뷰어 */}
            <div className="relative h-56 w-full rounded-2xl overflow-hidden border-2 border-blue-500 shadow-md bg-slate-100">
              {isMapLoading && (
                <div className="absolute inset-0 bg-white/80 z-20 flex items-center justify-center">
                  <div className="flex items-center space-x-2 text-xs font-bold text-blue-600 animate-pulse">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>구글 지도를 이동하는 중...</span>
                  </div>
                </div>
              )}

              <iframe
                title="Google Maps Location"
                src={googleMapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />

              {/* 핀 위치 오버레이 뱃지 */}
              <div className="absolute top-2.5 left-2.5 z-10 bg-slate-950/90 text-white text-[11px] font-black px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-amber-300">
                <MapPin className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                <span className="truncate max-w-[240px]">{customPlaceName}</span>
              </div>
            </div>

            {/* 확정된 장소 정보 박스 */}
            <div className="p-2.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 flex items-center justify-between">
              <div className="truncate mr-2">
                <span className="font-extrabold text-blue-950 dark:text-blue-200 text-xs block truncate">
                  📍 선택된 위치: {customPlaceName}
                </span>
                <span className="text-[10px] text-blue-800 dark:text-blue-300 truncate block">
                  {customAddress}
                </span>
              </div>
              <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-md shrink-0 flex items-center gap-1">
                <Check className="w-3 h-3" />
                <span>핀 연결됨</span>
              </span>
            </div>
          </div>

          {/* 3. 만남 날짜 & 시간 텍스트 직접 입력 */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                <span>3. 만남 시간 직접 입력 (Meetup Time)</span>
              </span>
              <span className="text-[10px] text-blue-600 font-semibold">
                자유롭게 직접 텍스트 입력 가능
              </span>
            </label>

            <div className="relative">
              <input
                type="text"
                value={customTimeText}
                onChange={(e) => setCustomTimeText(e.target.value)}
                placeholder="예: 오늘 저녁 19:30, 내일 토요일 오후 2시, 일요일 점심 등"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 text-xs font-bold text-slate-900 dark:text-white focus:bg-white focus:border-blue-500 focus:outline-none"
              />
              <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>

            {/* 빠른 추천 시간 퀵 칩 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-0.5">
              {quickTimes.map((qt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCustomTimeText(qt.label)}
                  className={`py-1.5 px-1.5 rounded-xl border text-center transition-all cursor-pointer text-xs ${
                    customTimeText === qt.label
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
            <span>구글 맵 핀 저장하고 약속 전송하기</span>
          </button>
        </form>
      </div>
    </div>
  );
}
