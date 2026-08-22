'use client';

import React from 'react';
import { useKMarket } from '@/context/KMarketContext';
import { useLanguage } from '@/context/LanguageContext';
import { REGIONS_DATA, CATEGORIES_DATA } from '@/lib/languages';
import { IndustrialRegion, ItemCategory } from '@/types/kmarket';
import { MapPin, Sparkles, Filter } from 'lucide-react';

export default function KMarketRegionFilter() {
  const {
    selectedRegion,
    setSelectedRegion,
    selectedCategory,
    setSelectedCategory,
    isMovingSaleOnly,
    setIsMovingSaleOnly,
  } = useKMarket();
  const { t } = useLanguage();

  return (
    <div className="w-full my-2">
      {/* 외국인 밀집 주요 공단 직거래 필터 바 */}
      <div 
        className="p-3.5 rounded-2xl border" 
        style={{ 
          background: 'var(--surface-card)', 
          borderColor: 'var(--border-warm)' 
        }}
      >
        <div className="flex items-center justify-between mb-2.5 px-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#1f1914]">
            <MapPin className="w-3.5 h-3.5 text-[#845b37]" />
            <span>{t('meetup_zone_title')}</span>
          </div>
          <span className="text-[11px] text-[#8c7866] font-medium hidden sm:inline">
            {t('zone_sub_desc')}
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
          {REGIONS_DATA.map((region) => {
            const isSelected = selectedRegion === region.id;
            return (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region.id as IndustrialRegion)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1f1914] text-[#fbf9f6] font-bold shadow-sm'
                    : 'bg-[#f4efe9] hover:bg-[#eae3dc] text-[#5c4f42] border border-[#dfd7ce]'
                }`}
              >
                <span>{region.icon}</span>
                <span>{region.nameKo}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
