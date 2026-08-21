'use client';

import React, { useState } from 'react';
import { useKMarket } from '@/context/KMarketContext';
import { useLanguage } from '@/context/LanguageContext';
import { Plane, Tag, MapPin, MessageCircle, Heart, Flame, AlertCircle } from 'lucide-react';
import CountryFlag from './CountryFlag';
import { getMovingSaleBadgeInfo } from '@/lib/movingSaleUtils';

export default function KMarketMovingSaleSection() {
  const { items, setSelectedItem, openChatForItem, toggleLike, likedItemIds } = useKMarket();
  const { t, formatWon, currentLang } = useLanguage();
  const [dDayFilter, setDDayFilter] = useState<'all' | 'd3' | 'd7' | 'd14'>('all');

  const movingSaleItems = items.filter(
    (item) => item.is_moving_sale || item.category === 'moving_sale'
  );

  if (movingSaleItems.length === 0) return null;

  // D-Day 필터링
  const filteredItems = movingSaleItems.filter((item) => {
    const days = item.moving_d_day || 7;
    if (dDayFilter === 'd3') return days <= 3;
    if (dDayFilter === 'd7') return days > 3 && days <= 7;
    if (dDayFilter === 'd14') return days > 7;
    return true;
  });

  return (
    <section className="my-6 bg-gradient-to-b from-rose-50/80 via-orange-50/50 to-amber-50/30 dark:from-slate-900 dark:via-slate-900/80 dark:to-slate-900/60 p-4 sm:p-6 rounded-3xl border border-rose-200/80 dark:border-slate-800 shadow-sm">
      {/* 섹션 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 via-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20">
            <Plane className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                ✈️ 귀국 D-Day 무빙세일 (Moving Sale)
              </h2>
              <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider animate-bounce">
                HOT
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              비자 만료 귀국 외국인 근로자들의 생활 가전·가구 묶음 헐값 급처분관
            </p>
          </div>
        </div>

        <div className="inline-flex items-center space-x-1.5 self-start sm:self-auto bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-300 dark:border-amber-700/50">
          <Tag className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
          <span>최대 85% 묶음 할인</span>
        </div>
      </div>

      {/* 3단계 D-Day 필터 탭 바 (D-3, D-7, D-14) */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-3 pt-1">
        <button
          onClick={() => setDDayFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer border ${
            dDayFilter === 'all'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-xs'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
          }`}
        >
          전체 매물 ({movingSaleItems.length})
        </button>

        <button
          onClick={() => setDDayFilter('d3')}
          className={`flex items-center space-x-1 px-3.5 py-1.5 rounded-xl text-xs font-black shrink-0 transition-all cursor-pointer border ${
            dDayFilter === 'd3'
              ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/30 animate-pulse'
              : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900/50 hover:bg-rose-100'
          }`}
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span>🚨 D-3 오늘마감 헐값/나눔</span>
        </button>

        <button
          onClick={() => setDDayFilter('d7')}
          className={`flex items-center space-x-1 px-3.5 py-1.5 rounded-xl text-xs font-black shrink-0 transition-all cursor-pointer border ${
            dDayFilter === 'd7'
              ? 'bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-600/25'
              : 'bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-900/50 hover:bg-orange-100'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>🔥 D-7 마감임박 초특가</span>
        </button>

        <button
          onClick={() => setDDayFilter('d14')}
          className={`flex items-center space-x-1 px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer border ${
            dDayFilter === 'd14'
              ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20'
              : 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900/50 hover:bg-blue-100'
          }`}
        >
          <Plane className="w-3.5 h-3.5" />
          <span>✈️ D-14 묶음할인 (사전예약)</span>
        </button>
      </div>

      {/* 무빙세일 매물 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          const badgeInfo = getMovingSaleBadgeInfo(item.moving_d_day || 7);
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
              className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-orange-400 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
            >
              {/* 이미지 썸네일 */}
              <div className="relative h-44 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* 3단계 귀국 D-Day 긴박감 배지 */}
                <div
                  className={`absolute top-2.5 left-2.5 backdrop-blur-xs text-[11px] font-black px-2.5 py-1 rounded-full flex items-center space-x-1 ${badgeInfo.badgeColorClass} ${
                    badgeInfo.pulse ? 'animate-pulse' : ''
                  }`}
                >
                  <span>{badgeInfo.badgeText}</span>
                </div>

                {/* 판매자 국가 국기 & 국가코드 배지 */}
                <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md flex items-center space-x-1.5 border border-white/20">
                  <CountryFlag
                    countryCode={item.seller_country}
                    fallbackEmoji={item.seller_country_flag}
                    size="xs"
                    shape="circle"
                  />
                  <span className="text-[10px] text-amber-300 font-bold">{item.seller_country}</span>
                  <span className="text-[10px] text-slate-100">{item.seller_name.split(' ')[0]}</span>
                </div>

                {/* 묶음 할인율 뱃지 */}
                {discountPercent > 0 && (
                  <div className="absolute bottom-2.5 left-2.5 bg-amber-400 text-slate-950 text-xs font-black px-2 py-0.5 rounded-md shadow-xs">
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
                  <div className="text-[10px] font-semibold text-orange-600 dark:text-orange-400">
                    {badgeInfo.badgeSubText}
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2 group-hover:text-orange-600 transition-colors leading-snug">
                    {displayTitle}
                  </h3>

                  <div className="flex items-baseline space-x-2">
                    <span className="text-lg font-black text-slate-950 dark:text-white">
                      {formatWon(item.price)}
                    </span>
                    {item.original_price && (
                      <span className="text-xs text-slate-400 line-through">
                        {item.original_price.toLocaleString()}원
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center space-x-1 truncate max-w-[170px]">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">{item.region}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openChatForItem(item);
                    }}
                    className="flex items-center space-x-1 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
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
