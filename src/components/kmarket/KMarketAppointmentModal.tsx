'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useEffect, useRef } from 'react';
import { AppointmentData } from '@/types/kmarket';
import {
  X,
  MapPin,
  Calendar,
  Clock,
  Bell,
  Navigation,
  CheckCircle2,
  Search,
  Crosshair,
  RefreshCw,
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
  defaultRegion,
  onConfirmAppointment,
}: KMarketAppointmentModalProps) {
  const { t } = useLanguage();
  const [currentLat, setCurrentLat] = useState(37.3275);
  const [currentLng, setCurrentLng] = useState(126.7924);
  const [baseAddress, setBaseAddress] = useState(defaultRegion || '경기 안산시 단원구 원곡동 795');
  const [landmarkDetail, setLandmarkDetail] = useState('');
  const [customTimeText, setCustomTimeText] = useState<string>('오늘 저녁 19:00');
  const [remind1Hour, setRemind1Hour] = useState<boolean>(true);
  const [isLocating, setIsLocating] = useState(false);

  const landmarkDetailRef = useRef(landmarkDetail);
  landmarkDetailRef.current = landmarkDetail;

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

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
          return;
        }
      }
    } catch (e) {
      console.warn('Failed to fetch address:', e);
    }
    const fallback = `위치 지정됨 (위도: ${lat.toFixed(4)}, 경도: ${lng.toFixed(4)})`;
    setBaseAddress(fallback);
  };

  // 1. Leaflet 지도 동적 로드 & 초기화
  useEffect(() => {
    if (!isOpen) return;

    const cssId = 'leaflet-css';
    if (!document.getElementById(cssId)) {
      const link = document.createElement('link');
      link.id = cssId;
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    const initLeaflet = () => {
      if (!window.L || !mapContainerRef.current || leafletMapRef.current) return;

      const map = window.L.map(mapContainerRef.current, {
        center: [currentLat, currentLng],
        zoom: 16,
        zoomControl: true,
      });
      leafletMapRef.current = map;

      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

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

      const marker = window.L.marker([currentLat, currentLng], {
        draggable: true,
        icon: customPinIcon,
      }).addTo(map);
      markerRef.current = marker;

      marker.on('dragend', () => {
        const pos = marker.getLatLng();
        setCurrentLat(pos.lat);
        setCurrentLng(pos.lng);
        fetchAddressFromCoords(pos.lat, pos.lng);
      });

      map.on('click', (e: any) => {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        setCurrentLat(lat);
        setCurrentLng(lng);
        fetchAddressFromCoords(lat, lng);
      });

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
      setTimeout(initLeaflet, 100);
    }

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // 2. GPS 내 위치 버튼 클릭
  const handleGetGpsLocation = () => {
    if (!navigator.geolocation) {
      alert('위치 정보(GPS)를 지원하지 않는 브라우저입니다.');
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
        alert('위치 권한을 허용해 주시거나 지도 위를 직접 클릭하여 핀을 이동해 주세요.');
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
          return;
        }
      }
    } catch (err) {
      console.warn('Address search error:', err);
    }
  };

  // 최종 약속 및 핀 전송
  const handleSendAppointment = (e: React.FormEvent) => {
    e.preventDefault();

    const fullPlaceName = landmarkDetail.trim()
      ? `${baseAddress} (${landmarkDetail.trim()})`
      : baseAddress;

    const appointment: AppointmentData = {
      id: 'apt-' + Date.now(),
      place_name: landmarkDetail.trim() || baseAddress,
      landmark_detail: landmarkDetail.trim() || '지정 직거래 만남 장소',
      address: fullPlaceName,
      lat: currentLat,
      lng: currentLng,
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

  const quickTimes = [
    { label: '오늘 저녁 19:00' },
    { label: '오늘 밤 20:30' },
    { label: '내일 점심 12:30' },
    { label: '내일 저녁 19:00' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#ded1c4] flex flex-col max-h-[94vh]">
        {/* 모달 상단 헤더 (시그니처 딥 에스프레소 & 골드) */}
        <div className="bg-gradient-to-r from-[#09101f] via-[#111d38] to-[#09101f] border-b-2 border-[#f3ba2f] p-5 text-white relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center space-x-1.5 bg-[#f3ba2f]/20 px-2.5 py-0.5 rounded-full text-xs font-bold text-[#f3ba2f] mb-1">
            <span>{t('auto_ui_44')}</span>
          </div>
          <h2 className="text-xl font-black tracking-tight flex items-center gap-1.5 text-[#fbf9f6]">
            <MapPin className="w-5 h-5 text-[#f3ba2f]" />
            <span>{t('auto_ui_45')}</span>
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            지도를 클릭하거나 핀을 끌어 만날 위치를 콕 찍고 상세 장소를 적어주세요.
          </p>
        </div>

        {/* 폼 본문 영역 */}
        <form onSubmit={handleSendAppointment} className="p-5 overflow-y-auto space-y-4 flex-1 text-xs sm:text-sm">
          {/* 1. 주소 및 만남 장소 입력 바 */}
          <div className="space-y-2.5 p-3.5 rounded-2xl bg-[#f7f2eb] border border-[#ded1c4]">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-[#3d2817] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#845b37]" />
                <span>{t('auto_ui_46')}</span>
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

            {/* 도로명 주소 검색창 */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  required
                  value={baseAddress}
                  onChange={(e) => setBaseAddress(e.target.value)}
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

            {/* 고객 직접 입력 상세 장소명 */}
            <div className="space-y-1 pt-2 border-t border-[#ded1c4]/70">
              <label className="text-xs font-black text-[#3d2817] flex items-center justify-between">
                <span>{t('auto_ui_52')}</span>
                <span className="text-[10px] text-[#845b37] font-bold">{t('auto_ui_53')}</span>
              </label>
              <input
                type="text"
                value={landmarkDetail}
                onChange={(e) => setLandmarkDetail(e.target.value)}
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

            <div className="relative h-56 w-full rounded-3xl overflow-hidden border-2 border-[#f3ba2f] shadow-md bg-slate-100">
              <div ref={mapContainerRef} className="w-full h-full z-0" />

              {/* 좌측 상단: 실시간 핀 주소 배지 */}
              <div className="absolute top-3 left-3 bg-[#09101f]/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-2xl border border-[#f3ba2f]/70 text-xs shadow-lg max-w-[85%] pointer-events-none z-10">
                <div className="flex items-center gap-1 font-bold text-[#f3ba2f]">
                  <MapPin className="w-3.5 h-3.5 fill-[#f3ba2f]" />
                  <span>{t('auto_ui_56')}</span>
                </div>
                <p className="text-[11px] text-slate-100 font-medium truncate mt-0.5">
                  {landmarkDetail ? `${baseAddress} (${landmarkDetail})` : baseAddress}
                </p>
              </div>

              {/* 우측 하단 안내 툴팁 */}
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-[#3d2817] px-2.5 py-1 rounded-xl text-[10px] font-black shadow-md border border-[#ded1c4] pointer-events-none z-10">
                🖱️ 지도 클릭 / 핀 드래그로 이동
              </div>
            </div>
          </div>

          {/* 3. 만남 날짜 & 시간 텍스트 직접 입력 */}
          <div className="space-y-2">
            <label className="text-xs font-black text-[#3d2817] flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#845b37]" />
                <span>{t('auto_ui_57')}</span>
              </span>
              <span className="text-[10px] text-[#845b37] font-bold">
                자유롭게 직접 텍스트 입력 가능
              </span>
            </label>

            <div className="relative">
              <input
                type="text"
                value={customTimeText}
                onChange={(e) => setCustomTimeText(e.target.value)}
                placeholder={t('auto_ui_58')}
                className="w-full pl-9 pr-3 py-2.5 bg-white rounded-xl border border-[#ded1c4] text-xs font-bold text-[#1f1914] focus:outline-none focus:border-[#845b37] shadow-2xs"
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
                  className={`py-1.5 px-1.5 rounded-xl border text-center transition-all cursor-pointer text-xs font-bold ${
                    customTimeText === qt.label
                      ? 'border-[#3d2817] bg-[#3d2817] text-[#fbf9f6] shadow-xs'
                      : 'border-[#ded1c4] bg-[#f7f2eb] text-[#5c4a39] hover:bg-[#ede2d6]'
                  }`}
                >
                  {qt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. 1시간 전 모국어 자동 알림 리마인더 */}
          <div className="p-3.5 rounded-2xl bg-[#f7f2eb] border border-[#ded1c4] flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-[#f3ba2f]/20 flex items-center justify-center text-[#845b37] shrink-0">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#3d2817] block">
                  ⏰ 약속 1시간 전 모국어 자동 푸시 알림
                </span>
                <span className="text-[10px] text-[#705e4f]">
                  약속을 잊지 않도록 상대방과 나에게 각자의 언어로 1시간 전에 알려드립니다.
                </span>
              </div>
            </div>

            <input
              type="checkbox"
              checked={remind1Hour}
              onChange={(e) => setRemind1Hour(e.target.checked)}
              className="w-4 h-4 text-[#845b37] rounded-md cursor-pointer shrink-0 accent-[#3d2817]"
            />
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            className="w-full py-4 bg-[#3d2817] hover:bg-[#2b1c10] text-[#fbf9f6] font-black text-sm sm:text-base rounded-2xl shadow-xl shadow-[#3d2817]/25 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 cursor-pointer border border-[#5c3818]"
          >
            <CheckCircle2 className="w-5 h-5 text-[#f3ba2f]" />
            <span>{t('auto_ui_59')}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
