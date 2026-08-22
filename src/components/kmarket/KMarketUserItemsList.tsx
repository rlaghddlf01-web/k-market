'use client';

import React from 'react';
import { KMarketItem } from '@/types/kmarket';
import { useLanguage } from '@/context/LanguageContext';
import { useKMarket } from '@/context/KMarketContext';
import { getItemLocalizedTitle } from '@/lib/itemDisplayUtils';
import KMarketStatusBadge from './KMarketStatusBadge';
import { Package, ChevronRight, Sparkles } from 'lucide-react';

interface KMarketUserItemsListProps {
  userId: string;
  onSelectItem?: (item: KMarketItem) => void;
}

export default function KMarketUserItemsList({
  userId,
  onSelectItem,
}: KMarketUserItemsListProps) {
  const { t } = useLanguage();
  const { items, setSelectedItem } = useKMarket();
  const { currentLang, formatWon } = useLanguage();

  // 해당 사용자의 매물 목록 필터링
  const userItems = items.filter(
    (item) => item.seller_id === userId || item.seller_name?.includes(userId)
  );

  const handleItemClick = (item: KMarketItem) => {
    if (onSelectItem) {
      onSelectItem(item);
    } else {
      setSelectedItem(item);
    }
  };

  if (userItems.length === 0) {
    return (
      <div className="text-center py-6 text-xs text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-gray-800/40 rounded-2xl border border-slate-100 dark:border-gray-800">
        <Package className="w-8 h-8 mx-auto mb-1.5 opacity-40 text-slate-400" />
        <p>{t('seller_no_other_items')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
          <span>{t('auto_ui_359')}</span>
          <span className="text-blue-600 dark:text-blue-400 font-extrabold bg-blue-50 dark:bg-blue-950 px-2 py-0.2 rounded-full text-[11px]">
            {userItems.length}{t('unit_items_count')}
          </span>
        </h4>
        <span className="text-[10px] text-slate-400 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#f3ba2f]" />
          <span>{t('auto_ui_360')}</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
        {userItems.map((item) => {
          const displayTitle = getItemLocalizedTitle(item, currentLang);
          const isSold = item.status === 'sold';
          const isFree = item.price === 0;

          return (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`p-2.5 rounded-2xl border transition-all flex items-center gap-2.5 cursor-pointer group ${
                isSold
                  ? 'bg-slate-50 dark:bg-gray-800/30 border-slate-200 dark:border-gray-800 opacity-60'
                  : 'bg-white dark:bg-gray-800/70 hover:bg-slate-50 dark:hover:bg-gray-700/60 border-slate-200/80 dark:border-gray-700 hover:border-blue-400 shadow-2xs'
              }`}
            >
              {/* 상품 썸네일 */}
              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 dark:bg-gray-700 shrink-0 border border-slate-200 dark:border-gray-600">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                />
                {isSold && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-[9px] font-black">
                    완료
                  </div>
                )}
                {item.is_moving_sale && !isSold && (
                  <div className="absolute top-0.5 left-0.5 bg-rose-600 text-white text-[8px] font-black px-1 rounded-sm">
                    D-{item.moving_d_day || 7}
                  </div>
                )}
              </div>

              {/* 상품 정보 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-0.5">
                  <KMarketStatusBadge status={item.status} />
                </div>
                <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate group-hover:text-blue-600 transition-colors">
                  {displayTitle}
                </h5>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span
                    className={`text-xs font-black ${
                      isFree
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {formatWon(item.price)}
                  </span>
                  {item.original_price && item.original_price > item.price && (
                    <span className="text-[10px] text-slate-400 line-through">
                      {item.original_price.toLocaleString()}원
                    </span>
                  )}
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
