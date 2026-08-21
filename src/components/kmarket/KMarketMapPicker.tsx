'use client';

import React, { useState } from 'react';
import { MapPin, Search, Navigation, Compass, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface KMarketMapPickerProps {
  regionText: string;
  onChangeRegionText: (text: string) => void;
  latitude?: number;
  longitude?: number;
  onChangeCoordinates: (lat: number, lng: number, address?: string) => void;
}

// 자주 찾는 대표적인 안전 직거래 장소 프리셋 (지하철역, 편의점, 만남의 광장 등)
const QUICK_LOCATION_PRESETS = [
  { name: '지하철역 출구 앞', icon: '🚇', detail: '개찰구 앞 / 1번 출구 벤치' },
  { name: '24시 편의점 앞', icon: '🏪', detail: '가로등 밝고 CCTV 있는 편의점 앞' },
  { name: '아파트/기숙사 정문 경비실', icon: '🏢', detail: '정문 경비실 맞은편 만남의 쉼터' },
  { name: '만남의 광장/시계탑', icon: '⏰', detail: '동네 중심가 공개 광장' },
];

export default function KMarketMapPicker({
  regionText,
  onChangeRegionText,
  latitude = 37.3275,
  longitude = 126.7924,
  onChangeCoordinates,
}: KMarketMapPickerProps) {
  const [currentAddress, setCurrentAddress] = useState(regionText || '안산시 단원구 원곡동 다문화거리 입구');
  const [pinLabel, setPinLabel] = useState('직거래 희망 장소');

  const handleApplyPreset = (presetName: string, detail: string) => {
    const updated = currentAddress.includes('앞') 
      ? currentAddress 
      : `${currentAddress} ${presetName}`;
    setCurrentAddress(updated);
    onChangeRegionText(updated);
    setPinLabel(presetName);
  };

  const handleInputChange = (val: string) => {
    setCurrentAddress(val);
    onChangeRegionText(val);
    setPinLabel(val.slice(0, 15) || '직거래 장소');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="font-extrabold text-slate-900 flex items-center gap-1.5 text-xs sm:text-sm">
          <MapPin className="w-4 h-4 text-[#f3ba2f]" />
          <span>📍 직거래 만남 장소 (지도 핀 &amp; 상세 주소)</span>
        </label>
        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>CCTV 안심 직거래존</span>
        </span>
      </div>

      {/* 🗺️ 당근마켓 스타일 인터랙티브 지도 & 핀 뷰포트 */}
      <div className="relative w-full h-52 sm:h-64 rounded-3xl overflow-hidden border-2 border-[#f3ba2f]/70 shadow-md bg-slate-100">
        {/* 지도 위성/항공 맵 타일 */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-500"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&auto=format&fit=crop&q=80')`,
            filter: 'contrast(1.05) brightness(0.96)',
          }}
        />

        {/* 지도 은은한 오버레이 */}
        <div className="absolute inset-0 bg-[#09101f]/25 backdrop-blur-[0.3px]" />

        {/* 지도 정중앙 대형 골드 핀 마커 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative -top-6 flex flex-col items-center animate-bounce">
            <div 
              style={{
                background: 'linear-gradient(135deg, #09101f 0%, #111d38 100%)',
                border: '2px solid #f3ba2f',
                boxShadow: '0 4px 16px rgba(243, 186, 47, 0.35)',
              }}
              className="text-[#f3ba2f] px-3.5 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 whitespace-nowrap"
            >
              <MapPin className="w-3.5 h-3.5 fill-[#f3ba2f]" />
              <span>{pinLabel || '만남 희망 장소'}</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#f3ba2f] text-[#09101f] flex items-center justify-center shadow-2xl mt-1.5 border-2 border-white">
              <MapPin className="w-5 h-5 fill-current" />
            </div>
            <div className="w-4 h-1.5 bg-black/50 rounded-full blur-[1.5px] mt-0.5" />
          </div>
        </div>

        {/* 좌측 상단: 실시간 선택된 주소 안내 뱃지 */}
        <div className="absolute top-3 left-3 bg-[#09101f]/85 backdrop-blur-md text-white px-3.5 py-2 rounded-2xl border border-[#f3ba2f]/60 text-xs space-y-0.5 max-w-[80%] shadow-lg">
          <div className="flex items-center gap-1.5 font-bold text-[#f3ba2f]">
            <Compass className="w-3.5 h-3.5" />
            <span>설정된 직거래 핀 위치</span>
          </div>
          <p className="text-[11px] text-slate-100 font-medium truncate">
            {currentAddress || '주소를 글씨로 입력해주세요'}
          </p>
        </div>

        {/* 우측 상단: 현재 내 위치 버튼 */}
        <button
          type="button"
          onClick={() => {
            handleInputChange('내 현재 위치 (GPS 반경 500m 안심존)');
          }}
          className="absolute top-3 right-3 p-2.5 bg-white text-slate-800 hover:bg-slate-50 rounded-2xl shadow-lg border border-slate-200 transition-transform active:scale-95 cursor-pointer flex items-center gap-1 text-xs font-bold"
          title="내 위치로 핀 맞추기"
        >
          <Navigation className="w-4 h-4 text-blue-600" />
          <span className="hidden sm:inline">현재 위치</span>
        </button>

        {/* 하단 안내 바 */}
        <div className="absolute bottom-2.5 inset-x-3 bg-white/95 dark:bg-[#09101f]/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-200 dark:border-white/10 text-xs flex items-center justify-between shadow-md">
          <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
            <span>📍</span>
            <span>아래 입력창에 동네나 상세 건물명을 적어주세요</span>
          </span>
          <span className="text-[10px] font-black text-emerald-600 dark:text-[#f3ba2f]">
            당근식 직거래
          </span>
        </div>
      </div>

      {/* ✍️ 동네 및 상세 주소 글씨 직접 입력창 */}
      <div className="space-y-1.5">
        <label className="block text-xs font-extrabold text-slate-900">
          📝 직거래 동네 및 상세 주소 입력 (글씨 입력)
        </label>
        <div className="relative">
          <input
            type="text"
            required
            value={currentAddress}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="예: 서울 강남구 역삼역 3번 출구 앞 / 안산시 원곡동 다문화거리 CU 앞"
            className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-2xl border-2 border-slate-200 focus:bg-white focus:border-[#f3ba2f] text-xs sm:text-sm font-extrabold text-slate-950 focus:outline-none shadow-xs transition-colors"
          />
          <MapPin className="w-5 h-5 text-[#f3ba2f] absolute left-3.5 top-3" />
        </div>
      </div>

      {/* ⚡ 자주 쓰는 안전 직거래 장소 빠른 원터치 버튼 */}
      <div>
        <span className="text-[11px] font-bold text-slate-500 block mb-1.5">
          💡 빠른 추천 만남 장소 추가:
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {QUICK_LOCATION_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyPreset(preset.name, preset.detail)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-amber-50 text-slate-800 hover:text-amber-900 border border-slate-200 hover:border-[#f3ba2f] shrink-0 transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
            >
              <span>{preset.icon}</span>
              <span>{preset.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
