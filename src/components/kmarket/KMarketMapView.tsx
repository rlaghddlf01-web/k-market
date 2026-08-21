'use client';

import React from 'react';
import { MapPin, ExternalLink, ShieldCheck, Footprints, Navigation } from 'lucide-react';
import { KMarketItem } from '@/types/kmarket';

interface KMarketMapViewProps {
  item: KMarketItem;
}

export default function KMarketMapView({ item }: KMarketMapViewProps) {
  const addressText = item.address || item.region || '판매자와 협의된 안심 직거래 장소';

  // 카카오맵 / 네이버지도 / 구글지도 길찾기 링크
  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressText)}`;

  return (
    <div className="rounded-3xl overflow-hidden border-2 border-[#f3ba2f]/60 shadow-lg bg-white">
      {/* 🗺️ 당근마켓 스타일 직거래 지도 & 핀 뷰포트 */}
      <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-slate-100">
        {/* 지도 배경 타일 */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&auto=format&fit=crop&q=80')`,
            filter: 'contrast(1.05) brightness(0.96)',
          }}
        />

        {/* 지도 오버레이 */}
        <div className="absolute inset-0 bg-[#09101f]/30 backdrop-blur-[0.3px]" />

        {/* 지도 중앙 직거래 핀 (골드 펄스 애니메이션) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative -top-5 flex flex-col items-center">
            {/* 핀 상단 텍스트 칩 */}
            <div 
              style={{
                background: 'linear-gradient(135deg, #09101f 0%, #111d38 100%)',
                border: '2px solid #f3ba2f',
                boxShadow: '0 4px 16px rgba(243, 186, 47, 0.40)',
              }}
              className="text-[#f3ba2f] px-3.5 py-1 rounded-full text-xs font-black flex items-center gap-1.5 whitespace-nowrap mb-1"
            >
              <MapPin className="w-3.5 h-3.5 fill-[#f3ba2f]" />
              <span>직거래 만남 위치</span>
            </div>

            {/* 메인 핀 아이콘 */}
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-[#f3ba2f] text-[#09101f] flex items-center justify-center shadow-2xl border-2 border-white">
                <Footprints className="w-5 h-5" />
              </div>
              {/* 펄스 파동 효과 */}
              <div className="absolute -inset-1 rounded-full bg-[#f3ba2f]/40 animate-ping pointer-events-none" />
            </div>
            <div className="w-4 h-1.5 bg-black/50 rounded-full blur-[1px] mt-0.5" />
          </div>
        </div>

        {/* 우측 상단: 지도 앱 바로가기 버튼 */}
        <a
          href={mapSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 right-3 bg-[#09101f]/90 hover:bg-[#09101f] text-[#f3ba2f] border border-[#f3ba2f]/80 px-3 py-1.5 rounded-xl text-xs font-black shadow-lg transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-md hover:scale-105 active:scale-95"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>길찾기 지도 앱</span>
          <ExternalLink className="w-3 h-3 opacity-80" />
        </a>

        {/* 좌측 상단: 안심 직거래 배지 */}
        <div className="absolute top-3 left-3 bg-emerald-950/85 text-emerald-300 border border-emerald-500/60 px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 backdrop-blur-md">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>도보 안심 직거래존</span>
        </div>
      </div>

      {/* 📍 하단 직거래 상세 주소 폰트 & 만남 가이드 */}
      <div className="p-4 space-y-2.5 bg-[#fdfbf9]">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#845b37] bg-[#845b37]/10 px-2 py-0.5 rounded-md inline-block mb-1.5">
            Direct Trade Location
          </span>
          {/* 크고 두꺼운 직거래 상세 주소 폰트 */}
          <h4 className="text-base sm:text-lg font-black text-slate-950 flex items-start gap-1.5 leading-snug">
            <MapPin className="w-5 h-5 text-[#f3ba2f] shrink-0 mt-0.5" />
            <span>{addressText}</span>
          </h4>
        </div>

        {/* 만남 팁 안내 */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1">
          <p className="font-bold text-slate-900 flex items-center gap-1.5">
            <span>🛡️</span>
            <span><strong>안심 직거래 약속:</strong> 사람들의 왕래가 많고 CCTV가 있는 밝은 장소에서 만나요</span>
          </p>
        </div>
      </div>
    </div>
  );
}
