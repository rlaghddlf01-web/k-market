'use client';

import React, { useState } from 'react';
import { MapPin, Search, Navigation, ExternalLink } from 'lucide-react';

interface KMarketMapPickerProps {
  regionText: string;
  onChangeRegionText: (text: string) => void;
  latitude?: number;
  longitude?: number;
  onChangeCoordinates: (lat: number, lng: number, address?: string) => void;
}

export default function KMarketMapPicker({
  regionText,
  onChangeRegionText,
  latitude = 37.3275,
  longitude = 126.7924,
  onChangeCoordinates,
}: KMarketMapPickerProps) {
  const defaultAddress = regionText || '';
  const [searchText, setSearchText] = useState(defaultAddress);
  const [mapQuery, setMapQuery] = useState(defaultAddress || '경기 안산시 단원구 원곡동 795');
  const [selectedPlaceName, setSelectedPlaceName] = useState(defaultAddress || '경기 안산시 단원구 원곡동 795');
  const [isMapLoading, setIsMapLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  // GPS 내 위치 동의 및 주소 & 지도 핀 실시간 자동 동기화
  const handleGetGpsLocation = () => {
    if (!navigator.geolocation) {
      alert('사용 중인 브라우저에서 위치 정보(GPS)를 지원하지 않습니다. 수기로 입력해 주세요.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // 서버 사이드 역지오코딩 API 호출
          const res = await fetch('/api/kmarket/geocode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ latitude, longitude }),
          });

          if (res.ok) {
            const data = await res.json();
            if (data.success && data.address) {
              const detectedAddr = data.address;
              setSearchText(detectedAddr);
              setMapQuery(detectedAddr);
              setSelectedPlaceName(detectedAddr);
              onChangeRegionText(detectedAddr);
              onChangeCoordinates(latitude, longitude, detectedAddr);
              setIsLocating(false);
              return;
            }
          }
        } catch (err) {
          console.error('Geocode error:', err);
        }

        const fallbackAddr = `위치 확인됨 (위도: ${latitude.toFixed(3)}, 경도: ${longitude.toFixed(3)})`;
        setSearchText(fallbackAddr);
        setMapQuery(fallbackAddr);
        setSelectedPlaceName(fallbackAddr);
        onChangeRegionText(fallbackAddr);
        onChangeCoordinates(latitude, longitude, fallbackAddr);
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        console.warn('Geolocation error:', error);
        if (error.code === error.PERMISSION_DENIED) {
          alert('브라우저 위치 권한을 허용해 주시거나 주소를 직접 입력해 주세요.');
        } else {
          alert('GPS 위치를 수신할 수 없습니다. 주소를 직접 검색해 주세요.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // 1. 주소/사거리/장소 검색 실행 시 구글 맵 즉시 이동
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchText.trim()) return;

    setIsMapLoading(true);
    const query = searchText.trim();
    setMapQuery(query);
    setSelectedPlaceName(query);
    onChangeRegionText(query);
    onChangeCoordinates(37.3275, 126.7924, query);
    setTimeout(() => setIsMapLoading(false), 400);
  };

  // 2. 구글 맵 앱 새 창 열기
  const handleOpenGoogleMaps = () => {
    const targetUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
    window.open(targetUrl, '_blank');
  };

  // 구글 맵 실시간 Embed URL
  const googleMapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    mapQuery
  )}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="space-y-3">
      {/* 1. 직거래 주소 텍스트 검색 및 GPS 내 위치 자동입력 */}
      <div className="space-y-2.5 p-3.5 rounded-2xl bg-[#f7f2eb] border border-[#ded1c4]">
        <div className="flex items-center justify-between">
          <label className="text-xs font-black text-[#3d2817] flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#845b37]" />
            <span>📍 직거래 주소 &amp; 만남 장소 입력</span>
          </label>

          {/* GPS 내 위치 자동완성 버튼 */}
          <button
            type="button"
            onClick={handleGetGpsLocation}
            disabled={isLocating}
            className="text-[11px] font-bold text-[#5c3818] hover:text-[#1f1914] bg-[#ede2d6] hover:bg-[#e2d4c5] px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer border border-[#ded1c4] shadow-2xs"
            title="현재 내 위치로 주소 & 핀 자동 세팅"
          >
            {isLocating ? (
              <>
                <span className="animate-spin">📍</span>
                <span>위치 확인중...</span>
              </>
            ) : (
              <>
                <span>📍 내 위치 동의하고 자동입력</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              required
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSearchSubmit(e);
                }
              }}
              placeholder="[📍 내 위치 자동입력] 또는 원하는 만남 장소/도로명 검색"
              className="w-full pl-9 pr-3 py-2.5 bg-white rounded-xl border border-[#ded1c4] text-xs sm:text-sm font-bold text-[#1f1914] focus:outline-none focus:border-[#845b37] shadow-2xs transition-colors"
            />
            <MapPin className="w-4 h-4 text-[#845b37] absolute left-3 top-3" />
          </div>

          <button
            type="button"
            onClick={handleSearchSubmit}
            className="px-3.5 py-2.5 bg-[#3d2817] hover:bg-[#2b1c10] text-[#fbf9f6] font-bold text-xs rounded-xl transition-all shadow-xs shrink-0 cursor-pointer flex items-center gap-1 border border-[#5c3818]"
          >
            <Search className="w-3.5 h-3.5 text-[#f3ba2f]" />
            <span>지도 검색</span>
          </button>
        </div>
      </div>

      {/* 2. 실제 구글 맵 (Google Maps) 실시간 인터랙티브 뷰어 */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs font-bold text-slate-800">
          <span className="flex items-center gap-1 text-slate-700">
            <Navigation className="w-3.5 h-3.5 text-[#f3ba2f]" />
            <span>실시간 구글 지도 핀 위치</span>
          </span>
          <button
            type="button"
            onClick={handleOpenGoogleMaps}
            className="text-[11px] text-[#845b37] hover:text-[#5c3818] font-bold flex items-center gap-0.5 cursor-pointer"
          >
            <span>구글 맵 앱으로 열기</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        {/* 실제 Google Maps Embed iframe 뷰어 */}
        <div className="relative h-56 sm:h-64 w-full rounded-3xl overflow-hidden border-2 border-[#f3ba2f] shadow-md bg-slate-100">
          {isMapLoading && (
            <div className="absolute inset-0 bg-white/80 z-20 flex items-center justify-center">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#09101f] animate-pulse">
                <MapPin className="w-4 h-4 text-[#f3ba2f]" />
                <span>구글 지도를 해당 위치로 이동하는 중...</span>
              </div>
            </div>
          )}

          <iframe
            key={mapQuery}
            title="Google Maps Embed Live Viewer"
            src={googleMapEmbedUrl}
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
          />

          {/* 좌측 상단: 현재 핀 주소 배지 */}
          <div className="absolute top-3 left-3 bg-[#09101f]/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-2xl border border-[#f3ba2f]/70 text-xs shadow-lg max-w-[80%] pointer-events-none">
            <div className="flex items-center gap-1 font-bold text-[#f3ba2f]">
              <MapPin className="w-3.5 h-3.5 fill-[#f3ba2f]" />
              <span>직거래 지정 위치</span>
            </div>
            <p className="text-[11px] text-slate-100 font-medium truncate">
              {selectedPlaceName || mapQuery}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
