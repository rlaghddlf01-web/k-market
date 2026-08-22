'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search, Navigation, RefreshCw, Crosshair } from 'lucide-react';

declare global {
  interface Window {
    L: any;
  }
}

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
  const { t } = useLanguage();
  const [currentLat, setCurrentLat] = useState(latitude);
  const [currentLng, setCurrentLng] = useState(longitude);
  const [baseAddress, setBaseAddress] = useState(regionText || '경기 안산시 단원구 원곡동 795');
  const [landmarkDetail, setLandmarkDetail] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  const landmarkDetailRef = useRef(landmarkDetail);
  landmarkDetailRef.current = landmarkDetail;

  const onChangeRegionTextRef = useRef(onChangeRegionText);
  onChangeRegionTextRef.current = onChangeRegionText;

  const onChangeCoordinatesRef = useRef(onChangeCoordinates);
  onChangeCoordinatesRef.current = onChangeCoordinates;

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  // 최종 조합된 직거래 장소 텍스트 전달 함수
  const updateFullLocation = (baseAddr: string, detail: string) => {
    const trimmedBase = baseAddr.trim();
    const trimmedDetail = detail.trim();
    const fullText = trimmedDetail ? `${trimmedBase} (${trimmedDetail})` : trimmedBase;
    onChangeRegionTextRef.current(fullText);
  };

  // 좌표를 기반으로 서버 API를 통해 실제 한국 도로명 주소 실시간 가져오기
  const fetchAddressFromCoords = async (lat: number, lng: number) => {
    try {
      const res = await fetch('/api/kmarket/geocode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude: lat, longitude: lng }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.address) {
          setBaseAddress(data.address);
          updateFullLocation(data.address, landmarkDetailRef.current);
          onChangeCoordinatesRef.current(lat, lng, data.address);
          return;
        }
      }
    } catch (e) {
      console.warn('Failed to fetch address:', e);
    }
    const fallback = `위치 지정됨 (위도: ${lat.toFixed(4)}, 경도: ${lng.toFixed(4)})`;
    setBaseAddress(fallback);
    updateFullLocation(fallback, landmarkDetailRef.current);
    onChangeCoordinatesRef.current(lat, lng, fallback);
  };

  // 1. 도메인 키 제한 없는 Leaflet 인터랙티브 맵 로드 & 초기화
  useEffect(() => {
    // Leaflet CSS 로드
    const cssId = 'leaflet-css';
    if (!document.getElementById(cssId)) {
      const link = document.createElement('link');
      link.id = cssId;
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // Leaflet JS 로드 & 맵 초기화
    const initLeaflet = () => {
      if (!window.L || !mapContainerRef.current || leafletMapRef.current) return;

      const map = window.L.map(mapContainerRef.current, {
        center: [currentLat, currentLng],
        zoom: 16,
        zoomControl: true,
      });
      leafletMapRef.current = map;

      // 선명한 오픈스트리트맵 타일 레이어 연결
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      // 커스텀 골드/레드 펄스 핀 아이콘
      const customPinIcon = window.L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; cursor: pointer;">
            <div style="position: absolute; width: 36px; height: 36px; border-radius: 50%; background: rgba(243, 186, 47, 0.4); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="position: relative; width: 32px; height: 32px; background: #09101f; border: 2.5px solid #f3ba2f; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.4);">
              <span style="font-size: 16px;">📍</span>
            </div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      // 드래그 가능한 핀 마커 생성
      const marker = window.L.marker([currentLat, currentLng], {
        draggable: true,
        icon: customPinIcon,
      }).addTo(map);
      markerRef.current = marker;

      // 핀 드래그 종료 시 좌표 업데이트 및 주소 자동 변환
      marker.on('dragend', () => {
        const pos = marker.getLatLng();
        setCurrentLat(pos.lat);
        setCurrentLng(pos.lng);
        fetchAddressFromCoords(pos.lat, pos.lng);
      });

      // 지도 아무 곳이나 클릭 시 해당 지점으로 핀 즉시 이동!
      map.on('click', (e: any) => {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        setCurrentLat(lat);
        setCurrentLng(lng);
        fetchAddressFromCoords(lat, lng);
      });

      // 지도 리사이즈 보정
      setTimeout(() => {
        map.invalidateSize();
      }, 300);
    };

    const scriptId = 'leaflet-js';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = initLeaflet;
      document.head.appendChild(script);
    } else if (window.L) {
      initLeaflet();
    }

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  // 2. GPS 내 위치 버튼 클릭 시 지도 & 핀 이동
  const handleGetGpsLocation = () => {
    if (!navigator.geolocation) {
      alert(t('auto_loop_718'));
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setCurrentLat(lat);
        setCurrentLng(lng);

        if (leafletMapRef.current && markerRef.current) {
          leafletMapRef.current.setView([lat, lng], 16);
          markerRef.current.setLatLng([lat, lng]);
        }

        await fetchAddressFromCoords(lat, lng);
        setIsLocating(false);
      },
      (err) => {
        setIsLocating(false);
        console.warn(err);
        alert(t('auto_loop_719'));
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // 3. 주소 텍스트 검색 시 좌표 변환 후 지도 이동
  const handleSearchSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!baseAddress.trim()) return;

    try {
      const osmRes = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          baseAddress
        )}&countrycodes=kr&limit=1`,
        {
          headers: {
            'User-Agent': 'KMarket-App/1.0',
            'Accept-Language': 'ko-KR,ko;q=0.9',
          },
        }
      );
      if (osmRes.ok) {
        const osmData = await osmRes.json();
        if (osmData && osmData.length > 0) {
          const lat = parseFloat(osmData[0].lat);
          const lng = parseFloat(osmData[0].lon);
          setCurrentLat(lat);
          setCurrentLng(lng);

          if (leafletMapRef.current && markerRef.current) {
            leafletMapRef.current.setView([lat, lng], 16);
            markerRef.current.setLatLng([lat, lng]);
          }
          updateFullLocation(baseAddress, landmarkDetail);
          onChangeCoordinates(lat, lng, baseAddress);
          return;
        }
      }
    } catch (err) {
      console.warn('Address search error:', err);
    }

    alert(t('auto_loop_841'));
    updateFullLocation(baseAddress, landmarkDetail);
  };

  return (
    <div className="space-y-3">
      {/* 1. 주소 및 만남 장소 입력 바 */}
      <div className="space-y-2.5 p-3.5 rounded-2xl bg-[#f7f2eb] border border-[#ded1c4]">
        <div className="flex items-center justify-between">
          <label className="text-xs font-black text-[#3d2817] flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#845b37]" />
            <span>{t('auto_ui_197')}</span>
          </label>

          {/* GPS 내 위치 자동완성 버튼 */}
          <button
            type="button"
            onClick={handleGetGpsLocation}
            disabled={isLocating}
            className="text-[11px] font-bold text-[#5c3818] hover:text-[#1f1914] bg-[#ede2d6] hover:bg-[#e2d4c5] px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer border border-[#ded1c4] shadow-2xs"
            title={t('auto_ui_47')}
          >
            {isLocating ? (
              <>
                <RefreshCw className="w-3 h-3 animate-spin text-[#845b37]" />
                <span>{t('auto_ui_48')}</span>
              </>
            ) : (
              <>
                <Crosshair className="w-3.5 h-3.5 text-[#845b37]" />
                <span>{t('auto_ui_49')}</span>
              </>
            )}
          </button>
        </div>

        {/* 1) 도로명 주소 검색창 */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              required
              value={baseAddress}
              onChange={(e) => {
                setBaseAddress(e.target.value);
                updateFullLocation(e.target.value, landmarkDetail);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSearchSubmit(e);
                }
              }}
              placeholder={t('auto_ui_50')}
              className="w-full pl-9 pr-3 py-2.5 bg-white rounded-xl border border-[#ded1c4] text-xs sm:text-sm font-bold text-[#1f1914] focus:outline-none focus:border-[#845b37] shadow-2xs"
            />
            <MapPin className="w-4 h-4 text-[#845b37] absolute left-3 top-3" />
          </div>

          <button
            type="button"
            onClick={handleSearchSubmit}
            className="px-3.5 py-2.5 bg-[#3d2817] hover:bg-[#2b1c10] text-[#fbf9f6] font-bold text-xs rounded-xl transition-all shadow-xs shrink-0 cursor-pointer flex items-center gap-1 border border-[#5c3818]"
          >
            <Search className="w-3.5 h-3.5 text-[#f3ba2f]" />
            <span>{t('auto_ui_51')}</span>
          </button>
        </div>

        {/* 2) 고객 직접 입력 상세 장소명 */}
        <div className="space-y-1 pt-2 border-t border-[#ded1c4]/70">
          <label className="text-xs font-black text-[#3d2817] flex items-center justify-between">
            <span>{t('auto_ui_198')}</span>
            <span className="text-[10px] text-[#845b37] font-bold">{t('auto_ui_53')}</span>
          </label>
          <input
            type="text"
            value={landmarkDetail}
            onChange={(e) => {
              setLandmarkDetail(e.target.value);
              updateFullLocation(baseAddress, e.target.value);
            }}
            placeholder={t('auto_ui_54')}
            className="w-full px-3.5 py-2 bg-white rounded-xl border border-[#ded1c4] text-xs font-bold text-[#1f1914] focus:outline-none focus:border-[#845b37] shadow-2xs"
          />
        </div>
      </div>

      {/* 2. 실제 인터랙티브 지도 (클릭/드래그로 핀 직접 이동) */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs font-bold text-slate-800">
          <span className="flex items-center gap-1 text-[#3d2817] font-black">
            <Navigation className="w-3.5 h-3.5 text-[#f3ba2f]" />
            <span>{t('auto_ui_55')}</span>
          </span>
        </div>

        {/* Leaflet 인터랙티브 지도 DOM 컨테이너 (100% 즉시 렌더링) */}
        <div className="relative h-60 sm:h-72 w-full rounded-3xl overflow-hidden border-2 border-[#f3ba2f] shadow-md bg-slate-100">
          <div ref={mapContainerRef} className="w-full h-full z-0" />

          {/* 좌측 상단: 실시간 핀 주소 배지 */}
          <div className="absolute top-3 left-3 bg-[#09101f]/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-2xl border border-[#f3ba2f]/70 text-xs shadow-lg max-w-[85%] pointer-events-none z-10">
            <div className="flex items-center gap-1 font-bold text-[#f3ba2f]">
              <MapPin className="w-3.5 h-3.5 fill-[#f3ba2f]" />
              <span>{t('auto_ui_199')}</span>
            </div>
            <p className="text-[11px] text-slate-100 font-medium truncate mt-0.5">
              {landmarkDetail ? `${baseAddress} (${landmarkDetail})` : baseAddress}
            </p>
          </div>

          {/* 우측 하단 안내 툴팁 */}
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-[#3d2817] px-2.5 py-1 rounded-xl text-[10px] font-black shadow-md border border-[#ded1c4] pointer-events-none z-10">
            {t('auto_ui_200')}
          </div>
        </div>
      </div>
    </div>
  );
}
