'use client';

import React from 'react';
import { useKMarket } from '@/context/KMarketContext';
import { useLanguage } from '@/context/LanguageContext';
import { Plane, Tag, Clock, MapPin, Sparkles, MessageCircle, Heart } from 'lucide-react';
import { KMarketItem } from '@/types/kmarket';

export default function KMarketMovingSaleSection() {
  const { items, setSelectedItem, openChatForItem, toggleLike, likedItemIds } = useKMarket();
  const { t, formatWon, currentLang } = useLanguage();

  const movingSaleItems = items.filter((item) => item.is_moving_sale || item.category === 'moving_sale');

  if (movingSaleItems.length === 0) return null;

  return (
    <section className="my-6 bg-linear-to-b from-indigo-900/5 via-sky-900/5 to-transparent p-4 sm:p-6 rounded-3xl border border-indigo-100/80">
      {/* 섹션 타이틀 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-600 to-sky-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Plane className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                {t('moving_sale_title')}
              </h2>
              <span className="bg-red-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full animate-bounce">
                HOT
              </span>
            </div>
            <p className="text-xs text-slate-500">
              비자 만료 귀국 외국인 근로자들의 생활 가전·가구 묶음 헐값 급처분관
            </p>
          </div>
        </div>

        <div className="inline-flex items-center space-x-1.5 self-start sm:self-auto bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-300">
          <Tag className="w-3.5 h-3.5 text-amber-700" />
          <span>{t('moving_sale_badge')} (최대 85% OFF)</span>
        </div>
      </div>

      {/* 무빙세일 매물 가로 스크롤 / 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {movingSaleItems.map((item) => {
          const discountPercent = item.original_price
            ? Math.round(((item.original_price - item.price) / item.original_price) * 100)
            : 0;
          const isLiked = likedItemIds.has(item.id);

          // 다국어 제목 가져오기
          const displayTitle =
            item.translations?.[currentLang]?.title || item.title;

          return (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group bg-white rounded-2xl border border-slate-200 hover:border-indigo-400 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
            >
              {/* 이미지 썸네일 */}
              <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* 귀국 D-day 배지 */}
                <div className="absolute top-2.5 left-2.5 bg-red-600/90 backdrop-blur-xs text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-md flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>귀국 D-{item.moving_d_day || 5}</span>
                </div>

                {/* 판매자 국가 국기 배지 */}
                <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-xs text-slate-800 text-xs font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center space-x-1">
                  <span>{item.seller_country_flag}</span>
                  <span className="text-[10px] text-slate-600">{item.seller_name.split(' ')[0]}</span>
                </div>

                {/* 묶음 할인율 뱃지 */}
                {discountPercent > 0 && (
                  <div className="absolute bottom-2.5 left-2.5 bg-amber-400 text-slate-950 text-xs font-black px-2 py-0.5 rounded-md shadow-sm">
                    {discountPercent}% 묶음특가
                  </div>
                )}

                {/* 찜하기 버튼 */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(item.id);
                  }}
                  className={`absolute bottom-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-md transition-transform active:scale-90 ${
                    isLiked
                      ? 'bg-red-500 text-white'
                      : 'bg-black/30 text-white hover:bg-black/50'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* 매물 본문 */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="font-bold text-sm text-slate-900 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-snug">
                    {displayTitle}
                  </h3>

                  <div className="flex items-baseline space-x-2">
                    <span className="text-lg font-black text-slate-950">
                      {formatWon(item.price)}
                    </span>
                    {item.original_price && (
                      <span className="text-xs text-slate-400 line-through">
                        {item.original_price.toLocaleString()}원
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center space-x-1 truncate max-w-[170px]">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">{item.region}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openChatForItem(item);
                    }}
                    className="flex items-center space-x-1 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>1:1 번역챗</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
