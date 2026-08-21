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
    <div className="my-4 space-y-3">
      {/* 1. 외국인 밀집 주요 공단 직거래 필터 바 */}
      <div className="p-3 rounded-2xl border" style={{ background: 'var(--surface-card)', borderColor: 'var(--border-warm)' }}>
        <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 mb-2 px-1">
          <MapPin className="w-3.5 h-3.5 text-blue-600" />
          <span>공단별 도보 직거래 필터 (Industrial Zone Meetup)</span>
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pb-1">
          {REGIONS_DATA.map((region) => {
            const isSelected = selectedRegion === region.id;
            return (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region.id as IndustrialRegion)}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{region.icon}</span>
                <span>{region.nameKo}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. 상품 카테고리 필터 칩 */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES_DATA.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const isMovingSale = cat.id === 'moving_sale';
          const isFree = cat.id === 'free_give';

          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id as ItemCategory);
                if (isMovingSale) {
                  setIsMovingSaleOnly(true);
                } else if (isMovingSaleOnly) {
                  setIsMovingSaleOnly(false);
                }
              }}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer border ${
                isSelected
                  ? isMovingSale
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                    : isFree
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20'
                    : 'bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-900/20'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.nameKo}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
