'use client';

import React, { useState } from 'react';
import { useKMarket } from '@/context/KMarketContext';
import { IndustrialRegion } from '@/types/kmarket';
import {
  MapPin,
  X,
  Compass,
  Navigation,
  Building2,
  Sliders,
  Footprints,
  Bike,
  Car,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface KMarketLocationRadiusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 8대 주요 외국인 공단 기본 GPS 좌표 및 명칭 매핑
const INDUSTRIAL_ZONES_CONFIG: {
  [key in IndustrialRegion]: {
    name: string;
    detail: string;
    address: string;
    lat: number;
    lng: number;
    defaultZoom: number;
  };
} = {
  pyeongtaek: {
    name: '평택 포승공단 / 기숙사 2동',
    detail: '경기 평택시 포승읍 포승공단로 117',
    address: '경기 평택시 포승읍 포승공단',
    lat: 36.9892,
    lng: 126.8524,
    defaultZoom: 14,
  },
  ansan: {
    name: '안산 반월시화 / 원곡동 다문화거리',
    detail: '경기 안산시 단원구 원곡동 다문화길',
    address: '경기 안산시 단원구 원곡동',
    lat: 37.3245,
    lng: 126.7938,
    defaultZoom: 14,
  },
  hwaseong: {
    name: '화성 향남제약공단 / 남양산단',
    detail: '경기 화성시 향남읍 제약공단',
    address: '경기 화성시 향남읍 발안리',
    lat: 37.1325,
    lng: 126.9215,
    defaultZoom: 14,
  },
  siheung: {
    name: '시흥 정왕동 / 스마트허브',
    detail: '경기 시흥시 정왕동 스마트허브',
    address: '경기 시흥시 정왕동 공단',
    lat: 37.3458,
    lng: 126.7321,
    defaultZoom: 14,
  },
  gumi: {
    name: '구미 국가산업단지 / 공단동',
    detail: '경북 구미시 3공단로 250',
    address: '경북 구미시 공단동',
    lat: 36.1085,
    lng: 128.3752,
    defaultZoom: 14,
  },
  gimhae: {
    name: '김해 골든루트 / 주촌산단',
    detail: '경남 김해시 주촌면 골든루트로',
    address: '경남 김해시 주촌면',
    lat: 35.2154,
    lng: 128.8412,
    defaultZoom: 14,
  },
  incheon: {
    name: '인천 남동공단 / 논현동',
    detail: '인천 남동구 남동대로 215',
    address: '인천 남동구 남동인더스파크',
    lat: 37.4025,
    lng: 126.6954,
    defaultZoom: 14,
  },
  gwangju: {
    name: '광주 하남산단 / 광산구',
    detail: '광주 광산구 하남산단 6번로',
    address: '광주 광산구 하남동',
    lat: 35.1845,
    lng: 126.8124,
    defaultZoom: 14,
  },
  all: {
    name: '전체 공단 (전국)',
    detail: '대한민국 전역 공단 매물',
    address: '대한민국',
    lat: 36.5,
    lng: 127.5,
    defaultZoom: 7,
  },
  other: {
    name: '기타 공단 및 거주지',
    detail: '직접 주소 입력 지역',
    address: '대한민국',
    lat: 37.5665,
    lng: 126.978,
    defaultZoom: 13,
  },
};

export default function KMarketLocationRadiusModal({
  isOpen,
  onClose,
}: KMarketLocationRadiusModalProps) {
  const { selectedRegion, setSelectedRegion } = useKMarket();

  // 반경 설정 (1km: 도보, 3km: 자전거/킥보드, 10km: 공단전체)
  const [radiusKm, setRadiusKm] = useState<1 | 3 | 10>(3);
  const [activeZone, setActiveZone] = useState<IndustrialRegion>(
    selectedRegion === 'all' ? 'pyeongtaek' : selectedRegion
  );

  if (!isOpen) return null;

  const currentZoneConfig = INDUSTRIAL_ZONES_CONFIG[activeZone] || INDUSTRIAL_ZONES_CONFIG.pyeongtaek;

  // 반경에 따른 구글 지도 줌 레벨 계산 (반경이 넓어지면 줌아웃 축소, 좁아지면 줌인 확대)
  // 1km ➜ zoom 15 (가까이 확대), 3km ➜ zoom 13 (중간), 10km ➜ zoom 11 (넓게 축소)
  const getZoomLevel = (km: number) => {
    if (km === 1) return 15;
    if (km === 3) return 13;
    return 11;
  };

  const currentZoom = getZoomLevel(radiusKm);
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    currentZoneConfig.address
  )}&t=&z=${currentZoom}&ie=UTF8&iwloc=&output=embed`;

  // 저장 완료 처리
  const handleSaveLocation = () => {
    setSelectedRegion(activeZone);
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
    alert(
      `[동네 및 반경 설정 완료]\n\n📍 내 공단: ${currentZoneConfig.name}\n📏 거래 반경: 내 주변 ${radiusKm}km 이내 (${
        radiusKm === 1 ? '걸어서 10분 🚶‍♂️' : radiusKm === 3 ? '자전거/킥보드 10분 🚲' : '공단 전체 🚗'
      })\n\n설정된 반경 내의 매물만 우선 표시됩니다!`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs animate-fadeIn flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-gray-800 flex flex-col max-h-[90vh] my-auto">
        {/* 모달 헤더 */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center text-white shadow-inner">
              <Compass className="w-6 h-6 text-yellow-300 animate-spin" />
            </div>
            <div>
              <div className="inline-flex items-center space-x-1.5 bg-black/20 px-2.5 py-0.5 rounded-full text-xs font-bold text-sky-200 mb-0.5">
                <Navigation className="w-3 h-3 text-yellow-300" />
                <span>내 공단 & 직거래 반경 설정</span>
              </div>
              <h2 className="text-xl font-black tracking-tight">
                기숙사 동네 & 거래 반경
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
          {/* 1. 공단 선택 드롭다운 및 빠른 선택 칩 */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>내 거주 공단(기숙사) 선택</span>
            </label>

            <select
              value={activeZone}
              onChange={(e) => {
                const zone = e.target.value as IndustrialRegion;
                setActiveZone(zone);
              }}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
            >
              <option value="pyeongtaek">🏢 경기 평택 포승공단 / 고덕산단</option>
              <option value="ansan">🏢 경기 안산 반월시화 / 원곡동 다문화거리</option>
              <option value="hwaseong">🏢 경기 화성 향남제약공단 / 남양산단</option>
              <option value="siheung">🏢 경기 시흥 정왕동 / 스마트허브</option>
              <option value="gumi">🏢 경북 구미 국가산업단지</option>
              <option value="gimhae">🏢 경남 김해 골든루트 / 주촌산단</option>
              <option value="incheon">🏢 인천 남동공단 / 논현동</option>
              <option value="gwangju">🏢 광주 하남공단</option>
            </select>
          </div>

          {/* 2. 거래 반경 3단계 선택 탭 / 슬라이더 (1km, 3km, 10km) */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-gray-800/80 border border-slate-200 dark:border-gray-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-blue-600" />
                <span>거래 반경 범위 선택</span>
              </span>
              <span className="text-xs font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-full border border-blue-200">
                반경 {radiusKm}km 이내
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
                <span className="text-xs font-black">1km 이내</span>
                <span className="text-[10px] opacity-80">걸어서 10분 🚶‍♂️</span>
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
                <span className="text-xs font-black">3km 이내</span>
                <span className="text-[10px] opacity-80">자전거 10분 🚲</span>
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
                <span className="text-xs font-black">10km 이내</span>
                <span className="text-[10px] opacity-80">공단 전체 🚗</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center">
              {radiusKm === 1 && '🔍 기숙사 바로 앞 도보 직거래 가능한 초밀착 매물만 표시됩니다.'}
              {radiusKm === 3 && '🚲 자전거, 전동킥보드로 10분 내 직거래 가능한 공단 중심 매물이 표시됩니다.'}
              {radiusKm === 10 && '🚗 공단 전체 및 인근 도시까지 넓은 범위의 모든 매물을 둘러봅니다.'}
            </p>
          </div>

          {/* 3. 실시간 구글 지도 (반경 선택 시 자동 줌인/줌아웃 축소 확대) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                <span>실시간 구글 지도 (반경 {radiusKm}km 자동 줌 조절)</span>
              </span>
              <span className="text-[11px] text-blue-600 font-bold">
                {radiusKm === 1 ? '🔍 1km 세밀 확대' : radiusKm === 3 ? '🗺️ 3km 중간 뷰' : '🌐 10km 넓은 뷰'}
              </span>
            </div>

            <div className="relative w-full h-56 rounded-3xl overflow-hidden border-2 border-blue-500 shadow-inner bg-slate-100">
              <iframe
                key={`${activeZone}-${radiusKm}`}
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />

              {/* 중심 핀 및 반경 범위 오버레이 */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div
                  className={`border-2 border-blue-500/80 bg-blue-500/15 rounded-full transition-all duration-700 flex items-center justify-center ${
                    radiusKm === 1
                      ? 'w-32 h-32'
                      : radiusKm === 3
                      ? 'w-48 h-48'
                      : 'w-64 h-64'
                  }`}
                >
                  <div className="p-2 bg-red-500 text-white rounded-full shadow-lg animate-bounce">
                    <MapPin className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* 좌측 하단 정보 뱃지 */}
              <div className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="truncate max-w-[200px]">{currentZoneConfig.name}</span>
                <span className="text-yellow-300">({radiusKm}km 반경)</span>
              </div>
            </div>
          </div>

          {/* 하단 저장 버튼 */}
          <button
            type="button"
            onClick={handleSaveLocation}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 text-white font-black text-sm rounded-2xl shadow-lg shadow-blue-600/30 hover:opacity-95 transition-all cursor-pointer"
          >
            내 공단 & {radiusKm}km 반경으로 설정 완료
          </button>
        </div>
      </div>
    </div>
  );
}
