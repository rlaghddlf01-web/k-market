'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Search, Navigation, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { POPULAR_LANDMARKS, LandmarkPin } from '@/lib/locationData';

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
  const defaultAddress = regionText || '경기 안산시 단원구 원곡동 795';
  const [searchText, setSearchText] = useState(defaultAddress);
  const [mapQuery, setMapQuery] = useState(defaultAddress);
  const [selectedPlaceName, setSelectedPlaceName] = useState(defaultAddress);
  const [isMapLoading, setIsMapLoading] = useState(false);

  // 약속 잡기 모달과 동일한 추천 랜드마크 필터링
  const filteredLandmarks = searchText.trim()
    ? POPULAR_LANDMARKS.filter(
        (lm) =>
          lm.name.toLowerCase().includes(searchText.toLowerCase()) ||
          lm.detail.toLowerCase().includes(searchText.toLowerCase()) ||
          lm.address.toLowerCase().includes(searchText.toLowerCase()) ||
          lm.zoneName.toLowerCase().includes(searchText.toLowerCase())
      )
    : POPULAR_LANDMARKS;

  // 1. 주소/사거리/편의점 검색 실행 시 구글 맵 즉시 이동
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

  // 2. 랜드마크 칩 클릭 시 즉시 구글 맵 이동 & 주소 동기화
  const handleSelectLandmark = (lm: LandmarkPin) => {
    setIsMapLoading(true);
    const placeName = `${lm.zoneName} ${lm.name}`;
    setSearchText(placeName);
    setMapQuery(lm.address || lm.name);
    setSelectedPlaceName(placeName);
    onChangeRegionText(placeName);
    onChangeCoordinates(lm.lat, lm.lng, lm.address);
    setTimeout(() => setIsMapLoading(false), 400);
  };

  // 3. 구글 맵 앱 새 창 열기
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
      {/* 1. 주소/사거리/편의점 텍스트 검색 및 직접 입력창 */}
      <div className="space-y-1.5">
        <label className="text-xs font-extrabold text-slate-900 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#f3ba2f]" />
            <span>📍 직거래 주소 &amp; 만남 장소 입력 (사거리, 편의점, 도로명 주소)</span>
          </span>
          <span className="text-[11px] font-bold text-[#845b37]">엔터 또는 [지도 검색] 클릭</span>
        </label>

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
              placeholder="예: 안산 원곡동 시계탑 앞 / 평택 포승공단 GS25 / 강남대로 396"
              className="w-full pl-10 pr-3 py-3 bg-slate-50 rounded-2xl border-2 border-slate-200 focus:bg-white focus:border-[#f3ba2f] text-xs sm:text-sm font-black text-slate-950 focus:outline-none shadow-xs transition-colors"
            />
            <MapPin className="w-5 h-5 text-[#f3ba2f] absolute left-3.5 top-3.5" />
          </div>

          <button
            type="button"
            onClick={handleSearchSubmit}
            style={{
              background: 'linear-gradient(135deg, #09101f 0%, #111d38 100%)',
              border: '2px solid #f3ba2f',
            }}
            className="px-4 py-3 text-[#f3ba2f] font-black text-xs rounded-2xl transition-all shadow-md active:scale-95 shrink-0 cursor-pointer flex items-center gap-1.5 hover:brightness-110"
          >
            <Search className="w-4 h-4" />
            <span>지도 검색</span>
          </button>
        </div>

        {/* 퀵 랜드마크 칩 리스트 */}
        {filteredLandmarks.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
            <span className="text-[11px] font-bold text-slate-500 shrink-0">추천 핀:</span>
            {filteredLandmarks.slice(0, 5).map((lm) => (
              <button
                key={lm.id}
                type="button"
                onClick={() => handleSelectLandmark(lm)}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold shrink-0 border transition-all cursor-pointer flex items-center gap-1 ${
                  searchText.includes(lm.name) || mapQuery.includes(lm.address)
                    ? 'bg-[#09101f] text-[#f3ba2f] border-[#f3ba2f] shadow-xs'
                    : 'bg-white hover:bg-amber-50 text-slate-700 border-slate-200 hover:border-[#f3ba2f]'
                }`}
              >
                <span>{lm.icon}</span>
                <span>{lm.name}</span>
                {(searchText.includes(lm.name) || mapQuery.includes(lm.address)) && (
                  <CheckCircle2 className="w-3 h-3 text-[#f3ba2f]" />
                )}
              </button>
            ))}
          </div>
        )}
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
