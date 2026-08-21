'use client';

import React from 'react';
import { MapPin, ExternalLink, ShieldCheck, Navigation } from 'lucide-react';
import { KMarketItem } from '@/types/kmarket';

interface KMarketMapViewProps {
  item: KMarketItem;
}

export default function KMarketMapView({ item }: KMarketMapViewProps) {
  const addressText = item.address || item.region || '경기 안산시 단원구 원곡동 795';

  // 실제 구글 지도 Embed URL (해당 매물의 실제 주소로 실시간 렌더링)
  const embedMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(addressText)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  // 구글 지도 앱 길찾기 외부 링크
  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressText)}`;

  return (
    <div className="rounded-3xl overflow-hidden border-2 border-[#f3ba2f] shadow-lg bg-white">
      {/* 🗺️ 실제 실시간 인터랙티브 구글 지도 */}
      <div className="relative w-full h-52 sm:h-64 overflow-hidden bg-slate-200">
        <iframe
          key={addressText}
          title="Item Trade Location Google Map"
          src={embedMapUrl}
          className="w-full h-full border-0"
          loading="lazy"
          allowFullScreen
        />

        {/* 우측 상단: 실제 지도 앱 길찾기 바로가기 */}
        <a
          href={mapSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 right-3 bg-[#09101f]/90 hover:bg-[#09101f] text-[#f3ba2f] border border-[#f3ba2f] px-3.5 py-1.5 rounded-xl text-xs font-black shadow-xl transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-md hover:scale-105 active:scale-95"
        >
          <Navigation className="w-3.5 h-3.5 fill-[#f3ba2f]" />
          <span>길찾기 지도 앱</span>
          <ExternalLink className="w-3 h-3 opacity-80" />
        </a>

        {/* 좌측 상단: 안심 직거래 배지 */}
        <div className="absolute top-3 left-3 bg-[#09101f]/85 text-white border border-[#f3ba2f]/70 px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5 shadow-md pointer-events-none backdrop-blur-md">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-[#f3ba2f]">실제 직거래 약속 위치</span>
        </div>
      </div>

      {/* 📍 하단 상세 주소 & 직거래 만남 가이드 */}
      <div className="p-4 space-y-2.5 bg-[#fdfbf9]">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#845b37] bg-[#845b37]/10 px-2 py-0.5 rounded-md inline-block mb-1.5">
            Direct Trade Location
          </span>
          {/* 크고 두꺼운 직거래 상세 주소 폰트 */}
          <h4 className="text-base sm:text-lg font-black text-slate-950 flex items-start gap-2 leading-snug">
            <MapPin className="w-5 h-5 text-[#f3ba2f] shrink-0 mt-0.5" />
            <span>{addressText}</span>
          </h4>
        </div>

        {/* 안전 직거래 가이드 */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1">
          <p className="font-bold text-slate-900 flex items-center gap-1.5">
            <span>🛡️</span>
            <span><strong>CCTV 안심 직거래:</strong> 공공장소 및 가로등이 밝은 위 지도 핀 위치에서 안전하게 거래하세요</span>
          </p>
        </div>
      </div>
    </div>
  );
}
