'use client';

import React from 'react';
import { useKMarket } from '@/context/KMarketContext';
import { useLanguage } from '@/context/LanguageContext';
import { ItemCategory } from '@/types/kmarket';
import { 
  Tv, 
  Armchair, 
  Smartphone, 
  Shirt, 
  Plane, 
  Gift, 
  Sparkles,
  Layers
} from 'lucide-react';

export default function KMarketCategoryNav() {
  const { 
    selectedCategory, 
    setSelectedCategory, 
    isMovingSaleOnly, 
    setIsMovingSaleOnly 
  } = useKMarket();
  const { t } = useLanguage();

  const CATEGORIES: { id: ItemCategory; name: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'all', name: t('등록된 전체 매물 보기'), icon: <Layers className="w-5 h-5" /> },
    { id: 'appliances', name: t('원룸 가전'), icon: <Tv className="w-5 h-5" /> },
    { id: 'furniture', name: t('생활 가구'), icon: <Armchair className="w-5 h-5" /> },
    { id: 'digital', name: t('스마트폰 및 전자기기'), icon: <Smartphone className="w-5 h-5" /> },
    { id: 'moving_sale', name: t('귀국 무빙 묶음'), icon: <Plane className="w-5 h-5" />, badge: 'HOT' },
    { id: 'free_give', name: t('0원 무료나눔'), icon: <Gift className="w-5 h-5" />, badge: '0원' },
    { id: 'clothes', name: t('의류/잡화'), icon: <Shirt className="w-5 h-5" /> },
    { id: 'daily', name: t('작업용품 및 공구류'), icon: <Sparkles className="w-5 h-5" /> },
  ];

  const handleCategoryClick = (catId: ItemCategory) => {
    setSelectedCategory(catId);
    if (catId === 'moving_sale') {
      setIsMovingSaleOnly(true);
    } else if (isMovingSaleOnly) {
      setIsMovingSaleOnly(false);
    }
  };

  return (
    <section className="w-full mb-8">
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#705e4f]">
          {t('카테고리별 매물 찾기')}
        </h2>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 sm:gap-3">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-200 cursor-pointer relative group ${
                isSelected
                  ? 'bg-[#1f1914] text-[#fbf9f6] shadow-md scale-105'
                  : 'bg-[#f4ede6] hover:bg-[#ede2d6] text-[#5c4a39]'
              }`}
            >
              {cat.badge && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-xs">
                  {cat.badge}
                </span>
              )}
              <div
                className={`mb-1.5 transition-transform group-hover:scale-110 ${
                  isSelected ? 'text-amber-200' : 'text-[#845b37]'
                }`}
              >
                {cat.icon}
              </div>
              <span className="text-[11px] sm:text-xs font-bold tracking-tight text-center truncate w-full">
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
