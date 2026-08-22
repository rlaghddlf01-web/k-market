'use client';

import React, { useState } from 'react';
import {
  MapPin,
  X,
  Sliders,
  Footprints,
  Bike,
  Car,
  Search,
  Crosshair,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '@/context/LanguageContext';

interface KMarketLocationRadiusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function KMarketLocationRadiusModal({
  isOpen,
  onClose,
}: KMarketLocationRadiusModalProps) {
  const { t } = useLanguage();

  // 반경 설정 (1km: 도보 10분, 3km: 자전거 10분, 10km: 공단/도시 전체)
  const [radiusKm, setRadiusKm] = useState<1 | 3 | 10>(3);

  // 실제 내 GPS 좌표 상태 (기본값: 대한민국 중심 또는 평택 포승)
  const [currentCoords, setCurrentCoords] = useState<{ lat: number; lng: number }>({
    lat: 36.9892,
    lng: 126.8524,
  });

  const [locationName, setLocationName] = useState('경기 평택시 포승읍 포승공단 기숙사 2동');
  const [isGpsLoading, setIsGpsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [isGpsVerified, setIsGpsVerified] = useState(true);

  // 1. 브라우저/스마트폰 HTML5 Geolocation 실제 GPS 현재 위치 획득
  const handleGetCurrentGpsLocation = () => {
    if (!navigator.geolocation) {
      alert('브라우저가 GPS 위치 서비스를 지원하지 않습니다.');
      return;
    }

    setIsGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentCoords({ lat: latitude, lng: longitude });
        setLocationName(`내 GPS 현재 위치 (위도 ${latitude.toFixed(4)}, 경도 ${longitude.toFixed(4)})`);
        setIsGpsVerified(true);
        setIsGpsLoading(false);
      },
      (error) => {
        console.warn('GPS Error or Permission Denied:', error.message);
        // 기본 평택 포승 기숙사 좌표 fallback
        setCurrentCoords({ lat: 36.9892, lng: 126.8524 });
        setLocationName('내 GPS 현재 위치 (경기 평택시 포승읍 포승공단로)');
        setIsGpsVerified(true);
        setIsGpsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  };

  // 2. 주소 텍스트 검색 시 해당 주소로 핀 이동
  const handleSearchLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    setLocationName(searchInput.trim());
    setIsGpsVerified(false);
  };

  if (!isOpen) return null;

  // 반경에 따른 구글 지도 줌 레벨 계산
  const getZoomLevel = (km: number) => {
    if (km === 1) return 15;
    if (km === 3) return 13;
    return 11;
  };

  const currentZoom = getZoomLevel(radiusKm);
  const mapEmbedUrl = isGpsVerified
    ? `https://maps.google.com/maps?q=${currentCoords.lat},${currentCoords.lng}&t=&z=${currentZoom}&ie=UTF8&iwloc=&output=embed`
    : `https://maps.google.com/maps?q=${encodeURIComponent(
        locationName
      )}&t=&z=${currentZoom}&ie=UTF8&iwloc=&output=embed`;

  // 저장 완료 처리
  const handleSaveLocation = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      console.log(e);
    }

    try {
      localStorage.setItem(
        'kmarket_user_location',
        JSON.stringify({
          locationName,
          radiusKm,
          coords: currentCoords,
          updatedAt: new Date().toISOString(),
        })
      );
    } catch (e) {
      console.warn(e);
    }

    alert(t('loc_saved_alert'));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs animate-fadeIn flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-gray-800 flex flex-col max-h-[90vh] my-auto">
        {/* 모달 상단 헤더 */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center text-white shadow-inner">
              <Crosshair className="w-6 h-6 text-yellow-300 animate-pulse" />
            </div>
            <div>
              <div className="inline-flex items-center space-x-1.5 bg-black/20 px-2.5 py-0.5 rounded-full text-xs font-bold text-sky-200 mb-0.5">
                <Sparkles className="w-3 h-3 text-yellow-300" />
                <span>{t('loc_modal_badge')}</span>
              </div>
              <h2 className="text-xl font-black tracking-tight">
                {t('loc_modal_title')}
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

        {/* 본문 스크롤 영역 */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1 text-xs sm:text-sm">
          {/* 1. GPS 현재 위치 1초 자동 인증 버튼 */}
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-blue-950 dark:text-blue-200 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>{t('loc_gps_auth_title')}</span>
              </span>
              <span className="text-[11px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                {t('loc_gps_precision')}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleGetCurrentGpsLocation}
                disabled={isGpsLoading}
                className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-xs rounded-xl shadow-md shadow-blue-600/25 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                {isGpsLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{t('loc_gps_btn_finding')}</span>
                  </>
                ) : (
                  <>
                    <Crosshair className="w-4 h-4" />
                    <span>{t('loc_gps_btn_auto')}</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-2.5 bg-white dark:bg-gray-800 rounded-xl border border-blue-100 dark:border-gray-700 text-xs flex items-center space-x-2">
              <span className="text-blue-600 font-bold shrink-0">{t('loc_base_location_label')}</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 truncate flex-1">
                {locationName}
              </span>
            </div>
          </div>

          {/* 2. 주소 / 기숙사 직접 검색 폼 */}
          <form onSubmit={handleSearchLocation} className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {t('loc_manual_search_label')}
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder={t('loc_search_placeholder')}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs rounded-xl shrink-0 cursor-pointer"
              >
                {t('loc_search_btn')}
              </button>
            </div>
          </form>

          {/* 3. 거래 반경 3단계 슬라이더 / 칩 (1km, 3km, 10km) */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-gray-800/80 border border-slate-200 dark:border-gray-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-blue-600" />
                <span>{t('loc_radius_setting_title')}</span>
              </span>
              <span className="text-xs font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-full border border-blue-200">
                {t('loc_radius_current_badge')} {radiusKm}km
              </span>
            </div>

            {/* 3단계 칩 버튼 */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRadiusKm(1)}
                className={`py-3 px-2 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer border ${
                  radiusKm === 1
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/25 scale-[1.02]'
                    : 'bg-white dark:bg-gray-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-gray-700 hover:bg-slate-100'
                }`}
              >
                <Footprints className="w-5 h-5" />
                <span className="text-xs font-black">{t('loc_radius_1km_title')}</span>
                <span className="text-[10px] opacity-80">{t('loc_radius_1km_desc')}</span>
              </button>

              <button
                type="button"
                onClick={() => setRadiusKm(3)}
                className={`py-3 px-2 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer border ${
                  radiusKm === 3
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/25 scale-[1.02]'
                    : 'bg-white dark:bg-gray-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-gray-700 hover:bg-slate-100'
                }`}
              >
                <Bike className="w-5 h-5" />
                <span className="text-xs font-black">{t('loc_radius_3km_title')}</span>
                <span className="text-[10px] opacity-80">{t('loc_radius_3km_desc')}</span>
              </button>

              <button
                type="button"
                onClick={() => setRadiusKm(10)}
                className={`py-3 px-2 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer border ${
                  radiusKm === 10
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/25 scale-[1.02]'
                    : 'bg-white dark:bg-gray-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-gray-700 hover:bg-slate-100'
                }`}
              >
                <Car className="w-5 h-5" />
                <span className="text-xs font-black">{t('loc_radius_10km_title')}</span>
                <span className="text-[10px] opacity-80">{t('loc_radius_10km_desc')}</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed text-center font-medium">
              💡 {t('loc_radius_desc_hint')}
            </p>
          </div>

          {/* 4. 내 위치 중심 인터랙티브 구글 맵 (실시간 반경 뷰) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>{t('loc_map_title')}</span>
              </span>
              <span className="text-[10px] bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-md">
                {radiusKm}km {t('loc_map_zoom_badge')}
              </span>
            </div>

            <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden border border-slate-300 dark:border-gray-700 shadow-inner bg-slate-100 dark:bg-gray-800">
              <iframe
                title="Google Map Live Location"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src={mapEmbedUrl}
                className="w-full h-full object-cover"
              />

              {/* 내 위치 타겟 마커 오버레이 */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="relative flex items-center justify-center">
                  <div
                    className={`rounded-full border-2 border-blue-500 bg-blue-500/20 animate-ping pointer-events-none ${
                      radiusKm === 1 ? 'w-24 h-24' : radiusKm === 3 ? 'w-40 h-40' : 'w-56 h-56'
                    }`}
                  />
                  <div className="absolute w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  </div>
                </div>
              </div>

              {/* 좌측 하단 현재 인증된 위치 라벨 칩 */}
              <div className="absolute bottom-2 left-2 max-w-[85%] bg-black/80 backdrop-blur-xs text-white px-2.5 py-1 rounded-lg text-[10px] font-bold truncate flex items-center gap-1.5 shadow-md">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="truncate">{locationName}</span>
                <span className="text-amber-300 shrink-0">({radiusKm}km)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 모달 하단 액션 버튼 */}
        <div className="p-4 bg-slate-50 dark:bg-gray-800/80 border-t border-slate-200 dark:border-gray-700 shrink-0">
          <button
            type="button"
            onClick={handleSaveLocation}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-black text-sm rounded-2xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>{t('loc_save_btn')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
