'use client';

import React, { useState } from 'react';
import { useKMarket } from '@/context/KMarketContext';
import { useLanguage } from '@/context/LanguageContext';
import { Plane, Tag, MapPin, MessageCircle, Heart, Flame, AlertCircle } from 'lucide-react';
import CountryFlag from './CountryFlag';
import { getMovingSaleBadgeInfo } from '@/lib/movingSaleUtils';
import { getAdaptedItemRegion } from '@/lib/dynamicLocationAdapter';

export default function KMarketMovingSaleSection() {
  const { items, setSelectedItem, openChatForItem, toggleLike, likedItemIds, selectedRegion } = useKMarket();
  const { t, formatWon, currentLang } = useLanguage();
  const [dDayFilter, setDDayFilter] = useState<'all' | 'd3' | 'd7' | 'd14'>('all');
  const [movingPage, setMovingPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const MOVING_ITEMS_PER_PAGE = isMobile ? 10 : 20;

  // D-Day 필터 변경 시 1페이지로 리셋
  React.useEffect(() => {
    setMovingPage(1);
  }, [dDayFilter]);

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
    <section 
      className="my-6 p-5 sm:p-7 rounded-3xl border transition-all"
      style={{
        background: '#f7f2ed',
        borderColor: '#ded1c4',
      }}
    >
      {/* 섹션 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#1f1914] flex items-center justify-center text-[#fbf9f6] shadow-sm">
            <Plane className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base sm:text-lg font-extrabold text-[#1f1914] tracking-tight">
                ✈️ {t('귀국 무빙세일 특가관')}
              </h2>
              <span className="bg-[#845b37] text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                HOT
              </span>
            </div>
            <p className="text-xs text-[#705e4f]">
              {t('비자 만료로 귀국하는 외국인 근로자들의 생활 가전·가구 묶음 헐값 급처분관입니다.')}
            </p>
          </div>
        </div>

        <div className="inline-flex items-center space-x-1.5 self-start sm:self-auto bg-white/80 text-[#5c4a39] text-xs font-bold px-3 py-1 rounded-full border border-[#ded1c4]">
          <Tag className="w-3.5 h-3.5 text-[#845b37]" />
          <span>{t('최대 85% 묶음 할인')}</span>
        </div>
      </div>

      {/* 3단계 D-Day 필터 탭 바 (D-3, D-7, D-14) */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-3 pt-1">
        <button
          onClick={() => setDDayFilter('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer border ${
            dDayFilter === 'all'
              ? 'bg-[#1f1914] text-[#fbf9f6] border-[#1f1914] shadow-xs'
              : 'bg-white text-[#5c4a39] border-[#ded1c4] hover:bg-[#eae3dc]'
          }`}
        >
          {t('등록된 전체 매물 보기')} ({movingSaleItems.length})
        </button>

        <button
          onClick={() => setDDayFilter('d3')}
          className={`flex items-center space-x-1 px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer border ${
            dDayFilter === 'd3'
              ? 'bg-[#845b37] text-white border-[#845b37] shadow-xs'
              : 'bg-white text-[#845b37] border-[#ded1c4] hover:bg-[#eae3dc]'
          }`}
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{t('🚨 3일 남음 오늘마감 헐값/나눔')}</span>
        </button>

        <button
          onClick={() => setDDayFilter('d7')}
          className={`flex items-center space-x-1 px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer border ${
            dDayFilter === 'd7'
              ? 'bg-[#845b37] text-white border-[#845b37] shadow-xs'
              : 'bg-white text-[#5c4a39] border-[#ded1c4] hover:bg-[#eae3dc]'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>{t('🔥 7일 남음 마감임박 초특가')}</span>
        </button>

        <button
          onClick={() => setDDayFilter('d14')}
          className={`flex items-center space-x-1 px-3.5 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all cursor-pointer border ${
            dDayFilter === 'd14'
              ? 'bg-[#845b37] text-white border-[#845b37] shadow-xs'
              : 'bg-white text-[#5c4a39] border-[#ded1c4] hover:bg-[#eae3dc]'
          }`}
        >
          <Plane className="w-3.5 h-3.5" />
          <span>{t('✈️ 14일 남음 묶음할인 (사전예약)')}</span>
        </button>
      </div>

      {/* 무빙세일 매물 그리드 (20개 단위 페이징) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems
          .slice((movingPage - 1) * MOVING_ITEMS_PER_PAGE, movingPage * MOVING_ITEMS_PER_PAGE)
          .map((item) => {
            const badgeInfo = getMovingSaleBadgeInfo(item.moving_d_day || 7, currentLang);
            const discountPercent = item.original_price
              ? Math.round(((item.original_price - item.price) / item.original_price) * 100)
              : 0;
            const isLiked = likedItemIds.has(item.id);
            const displayRegion = getAdaptedItemRegion(item, selectedRegion, currentLang);

            // 다국어 제목 가져오기 (17개국어 전체 완벽 지원)
            const displayTitle = item.translations?.[currentLang]?.title || item.title;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group p-4 flex flex-col justify-between hover:border-amber-400/80 hover:shadow-lg transition-all duration-300 relative overflow-hidden bg-white/95 backdrop-blur-xs cursor-pointer border border-[#ded1c4] rounded-2xl"
              >
                {/* 상단 뱃지 라인 */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center space-x-1.5 min-w-0">
                    <CountryFlag
                      countryCode={item.seller_country}
                      fallbackEmoji={item.seller_country_flag}
                      size="sm"
                    />
                    <span className="text-xs font-semibold text-slate-700 truncate">
                      {item.seller_name}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-md shrink-0 flex items-center space-x-1 ${badgeInfo.color || 'bg-amber-100 text-amber-900'}`}
                  >
                    <span>{badgeInfo.icon}</span>
                    <span>{badgeInfo.text}</span>
                  </span>
                </div>

                {/* 썸네일 이미지 & 할인율 뱃지 */}
                <div className="relative aspect-16/10 rounded-2xl overflow-hidden mb-3 bg-slate-100">
                  <img
                    src={item.images[0]}
                    alt={displayTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* 묶음 할인율 뱃지 */}
                  {discountPercent > 0 && (
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-red-600 to-rose-600 text-white text-[11px] font-black px-2 py-0.5 rounded-lg shadow-md flex items-center space-x-0.5">
                      <Flame className="w-3 h-3 fill-current" />
                      <span>{discountPercent}% {t('할인')}</span>
                    </div>
                  )}

                  {/* 다중 사진 인디케이터 */}
                  {item.images.length > 1 && (
                    <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-md font-semibold">
                      📷 1/{item.images.length}
                    </div>
                  )}

                  {/* 찜 버튼 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(item.id);
                    }}
                    className={`absolute bottom-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-all active:scale-75 ${
                      isLiked
                        ? 'bg-red-500 text-white shadow-md shadow-red-500/40'
                        : 'bg-black/30 text-white hover:bg-black/50'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* 상품 정보 */}
                <div className="space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-2 leading-snug">
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
                    <div className="flex items-center space-x-1 truncate max-w-[170px]" title={displayRegion}>
                      <MapPin className="w-3.5 h-3.5 text-[#845b37] shrink-0" />
                      <span className="truncate font-semibold">{displayRegion}</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openChatForItem(item);
                      }}
                      className="flex items-center space-x-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-all duration-200 cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
                      style={{
                        background: '#09101f',
                        border: '1.5px solid #f3ba2f',
                      }}
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#f3ba2f]" />
                      <span className="text-[#f3ba2f] font-extrabold">{t('1:1 번역챗')}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* ✈️ 상단 무빙세일 스마트 페이지네이션 바 */}
      {Math.ceil(filteredItems.length / MOVING_ITEMS_PER_PAGE) > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <button
            onClick={() => setMovingPage((prev) => Math.max(prev - 1, 1))}
            disabled={movingPage === 1}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              movingPage === 1
                ? 'opacity-40 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200'
                : 'bg-white text-[#1f1914] border-[#ded1c4] hover:bg-[#eae3dc] active:scale-95 cursor-pointer shadow-xs'
            }`}
          >
            ◀ {t('이전 단계로 돌아가기')}
          </button>

          {Array.from(
            { length: Math.ceil(filteredItems.length / MOVING_ITEMS_PER_PAGE) },
            (_, idx) => {
              const pageNum = idx + 1;
              const isCurrent = movingPage === pageNum;
              return (
                <button
                  key={pageNum}
                  onClick={() => setMovingPage(pageNum)}
                  className={`w-8 h-8 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-[#1f1914] text-[#fbf9f6] shadow-md scale-105'
                      : 'bg-white text-[#5c4a39] border border-[#ded1c4] hover:bg-[#eae3dc]'
                  }`}
                >
                  {pageNum}
                </button>
              );
            }
          )}

          <button
            onClick={() => {
              const maxPage = Math.ceil(filteredItems.length / MOVING_ITEMS_PER_PAGE);
              setMovingPage((prev) => Math.min(prev + 1, maxPage));
            }}
            disabled={movingPage === Math.ceil(filteredItems.length / MOVING_ITEMS_PER_PAGE)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              movingPage === Math.ceil(filteredItems.length / MOVING_ITEMS_PER_PAGE)
                ? 'opacity-40 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200'
                : 'bg-white text-[#1f1914] border-[#ded1c4] hover:bg-[#eae3dc] active:scale-95 cursor-pointer shadow-xs'
            }`}
          >
            {t('다음 단계로 계속하기')} ▶
          </button>
        </div>
      )}
    </section>
  );
}
