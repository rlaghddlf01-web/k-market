'use client';

import React from 'react';
import { useKMarket } from '@/context/KMarketContext';
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

interface CategoryItem {
  id: ItemCategory;
  nameKo: string;
  nameEn: string;
  icon: React.ReactNode;
  badge?: string;
}

const CATEGORIES: CategoryItem[] = [
  { id: 'all', nameKo: '전체보기', nameEn: 'All Items', icon: <Layers className="w-5 h-5" /> },
  { id: 'appliances', nameKo: '원룸 가전', nameEn: 'Appliances', icon: <Tv className="w-5 h-5" /> },
  { id: 'furniture', nameKo: '가구·수납', nameEn: 'Furniture', icon: <Armchair className="w-5 h-5" /> },
  { id: 'digital', nameKo: '스마트폰·IT', nameEn: 'Digital', icon: <Smartphone className="w-5 h-5" /> },
  { id: 'moving_sale', nameKo: '무빙세일', nameEn: 'Moving Sale', icon: <Plane className="w-5 h-5" />, badge: 'HOT' },
  { id: 'free_give', nameKo: '무료나눔', nameEn: 'Free Sharing', icon: <Gift className="w-5 h-5" />, badge: '0원' },
  { id: 'fashion', nameKo: '의류·잡화', nameEn: 'Fashion', icon: <Shirt className="w-5 h-5" /> },
  { id: 'daily', nameKo: '생활·주방', nameEn: 'Life & Kitchen', icon: <Sparkles className="w-5 h-5" /> },
];

export default function KMarketCategoryNav() {
  const { 
    selectedCategory, 
    setSelectedCategory, 
    isMovingSaleOnly, 
    setIsMovingSaleOnly 
  } = useKMarket();

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
          Shop by Category / 카테고리별 찾기
        </h2>
      </div>

      {/* 가로 스크롤 가능한 원형 아이콘 카테고리 그리드 */}
      <div className="flex items-start gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2 px-1">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer transition-all duration-200"
            >
              {/* 원형 아이콘 버블 */}
              <div 
                className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#1f1914] text-[#fbf9f6] shadow-md scale-105'
                    : 'bg-[#f4efe9] hover:bg-[#eae3dc] text-[#5c4f42] border border-[#dfd7ce]'
                }`}
              >
                {cat.icon}

                {/* 뱃지 */}
                {cat.badge && (
                  <span className={`absolute -top-1 -right-1 text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase ${
                    cat.badge === 'HOT' 
                      ? 'bg-rose-500 text-white' 
                      : 'bg-emerald-600 text-white'
                  }`}>
                    {cat.badge}
                  </span>
                )}
              </div>

              {/* 카테고리 명 */}
              <span className={`text-xs tracking-tight transition-colors ${
                isSelected 
                  ? 'font-bold text-[#1f1914]' 
                  : 'font-medium text-[#705e4f] group-hover:text-[#1f1914]'
              }`}>
                {cat.nameKo}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
