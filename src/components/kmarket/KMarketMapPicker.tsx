'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Search, Navigation, Compass, ShieldCheck, Loader2 } from 'lucide-react';

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
  const [addressInput, setAddressInput] = useState(regionText || '경기 안산시 단원구 원곡동 795');
  const [mapQuery, setMapQuery] = useState(regionText || '경기 안산시 단원구 원곡동 795');
  const [isLocating, setIsLocating] = useState(false);

  // 주소 입력 시 디바운스로 실시간 지도 업데이트
  useEffect(() => {
    const timer = setTimeout(() => {
      if (addressInput.trim()) {
        setMapQuery(addressInput.trim());
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [addressInput]);

  // GPS 내 실제 위치 가져오기
  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('현재 브라우저에서 위치 정보를 지원하지 않습니다.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        const coordsQuery = `${lat},${lng}`;
        setMapQuery(coordsQuery);
        const autoAddress = `내 현재 위치 (GPS: ${lat.toFixed(4)}, ${lng.toFixed(4)})`;
        setAddressInput(autoAddress);
        onChangeRegionText(autoAddress);
        onChangeCoordinates(lat, lng, autoAddress);
        setIsLocating(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('GPS 위치 권한을 허용해 주시거나 주소를 직접 입력해 주세요.');
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (addressInput.trim()) {
      setMapQuery(addressInput.trim());
      onChangeRegionText(addressInput.trim());
    }
  };

  // 실시간 구글 지도 Embed URL
  const embedMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="font-extrabold text-slate-900 flex items-center gap-1.5 text-xs sm:text-sm">
          <MapPin className="w-4 h-4 text-[#f3ba2f]" />
          <span>📍 직거래 만남 장소 (지도 &amp; 상세 주소)</span>
        </label>
        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>실시간 구글 지도 연동</span>
        </span>
      </div>

      {/* 🗺️ 실시간 구글 지도 (주소 입력 시 즉시 해당 위치로 이동) */}
      <div className="relative w-full h-60 sm:h-72 rounded-3xl overflow-hidden border-2 border-[#f3ba2f] shadow-md bg-slate-200">
        <iframe
          key={mapQuery}
          title="Google Map Location Picker"
          src={embedMapUrl}
          className="w-full h-full border-0"
          loading="lazy"
          allowFullScreen
        />

        {/* 좌측 상단: 현재 지도에 표시 중인 주소 배지 */}
        <div className="absolute top-3 left-3 bg-[#09101f]/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-2xl border border-[#f3ba2f]/70 text-xs shadow-lg max-w-[75%] pointer-events-none">
          <div className="flex items-center gap-1.5 font-bold text-[#f3ba2f]">
            <Compass className="w-3.5 h-3.5" />
            <span>지도 핀 위치</span>
          </div>
          <p className="text-[11px] text-slate-100 font-medium truncate">
            {addressInput || mapQuery}
          </p>
        </div>

        {/* 우측 상단: 실제 GPS 내 위치 찾기 버튼 */}
        <button
          type="button"
          onClick={handleGetCurrentLocation}
          disabled={isLocating}
          className="absolute top-3 right-3 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-900 rounded-2xl shadow-xl border border-slate-200 transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 text-xs font-bold disabled:opacity-60"
          title="GPS 내 현재 위치로 지도 이동"
        >
          {isLocating ? (
            <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
          ) : (
            <Navigation className="w-4 h-4 text-blue-600 fill-blue-600" />
          )}
          <span>{isLocating ? 'GPS 찾는 중...' : '내 위치로 이동'}</span>
        </button>
      </div>

      {/* ✍️ 주소 및 동네 글씨 직접 입력창 */}
      <div className="space-y-1.5">
        <label className="block text-xs font-extrabold text-slate-900">
          📝 직거래 주소 글씨 입력 (입력하거나 [지도 이동]을 누르면 위 지도가 즉시 움직입니다)
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              required
              value={addressInput}
              onChange={(e) => {
                setAddressInput(e.target.value);
                onChangeRegionText(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleManualSearch(e);
                }
              }}
              placeholder="예: 경기 안산시 단원구 원곡동 795 / 평택시 포승읍 / 화성시 향남읍 등"
              className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-2xl border-2 border-slate-200 focus:bg-white focus:border-[#f3ba2f] text-xs sm:text-sm font-extrabold text-slate-950 focus:outline-none shadow-xs transition-colors"
            />
            <MapPin className="w-5 h-5 text-[#f3ba2f] absolute left-3.5 top-3.5" />
          </div>

          <button
            type="button"
            onClick={handleManualSearch}
            className="px-4 py-3 bg-[#09101f] text-[#f3ba2f] border-2 border-[#f3ba2f] hover:bg-[#111d38] font-bold rounded-2xl text-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-sm active:scale-95"
          >
            <Search className="w-4 h-4" />
            <span>지도 이동</span>
          </button>
        </div>
      </div>
    </div>
  );
}
