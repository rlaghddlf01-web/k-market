'use client';

import React, { useState } from 'react';
import { useKMarket } from '@/context/KMarketContext';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, ChevronLeft, ChevronRight, Flame, MapPin, Tag } from 'lucide-react';
import { getLocalizedAddressDisplay } from '@/lib/koreanLocationRomanizer';
import CountryFlag from './CountryFlag';

export default function KMarketTop10Showcase() {
  const { items, setSelectedItem } = useKMarket();
  const { t, currentLang } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  // 상위 10개 엄선 핫매물
  const top10Items = items.slice(0, 10);

  if (top10Items.length === 0) return null;

  const currentItem = top10Items[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? top10Items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === top10Items.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full bg-[#f8f5f0] border-y border-[#ded1c4] py-5 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        {/* 상단 헤더 타이틀 바 */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-600">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-[#1f1914] flex items-center gap-1.5">
                <span>{t('오늘의 실시간 초특가 핫매물 TOP 10')}</span>
                <span className="bg-[#f3ba2f] text-[#09101f] text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase">
                  HOT
                </span>
              </h3>
            </div>
          </div>

          {/* 1 ~ 10 페이지 넘김 컨트롤 */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black text-[#8c7866] mr-1">
              <span className="text-[#1f1914]">{currentIndex + 1}</span> / {top10Items.length}
            </span>
            <button
              type="button"
              onClick={handlePrev}
              className="w-7 h-7 rounded-lg bg-white border border-[#ded1c4] hover:bg-[#ede3d8] flex items-center justify-center text-[#5c4a39] shadow-xs active:scale-95 cursor-pointer transition-colors"
              title="이전 매물"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-7 h-7 rounded-lg bg-white border border-[#ded1c4] hover:bg-[#ede3d8] flex items-center justify-center text-[#5c4a39] shadow-xs active:scale-95 cursor-pointer transition-colors"
              title="다음 매물"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 10개 번호 인디케이터 바 */}
        <div className="flex items-center gap-1 sm:gap-1.5 mb-3 overflow-x-auto pb-1 scrollbar-none">
          {top10Items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx
                  ? 'w-8 bg-[#09101f]'
                  : 'w-2 bg-[#ded1c4] hover:bg-[#b5a392]'
              }`}
              title={`${idx + 1}번째 매물 보기`}
            />
          ))}
        </div>

        {/* 단일 핫매물 하이라이트 카드 (클릭 시 상세 모달 오픈) */}
        {currentItem && (
          <div
            onClick={() => setSelectedItem(currentItem)}
            className="group relative bg-white border border-[#ded1c4] rounded-2xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden flex flex-col sm:flex-row gap-4 items-center"
          >
            {/* 좌측: 썸네일 */}
            <div className="relative w-full sm:w-48 h-40 sm:h-36 rounded-xl overflow-hidden bg-slate-100 shrink-0">
              <img
                src={currentItem.images[0] || '/images/hero-appliances-bundle.jpg'}
                alt={currentItem.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 bg-[#09101f]/90 text-[#f3ba2f] text-[10px] font-black px-2 py-0.5 rounded-md border border-[#f3ba2f]/30">
                TOP {currentIndex + 1}
              </div>
              {currentItem.is_moving_sale && (
                <div className="absolute bottom-2 left-2 bg-rose-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md shadow-xs">
                  {t('귀국 무빙세일')}
                </div>
              )}
            </div>

            {/* 우측: 정보 */}
            <div className="flex-1 min-w-0 space-y-2 w-full text-left">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="flex items-center gap-1 font-medium text-[#705e4f]">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>{getLocalizedAddressDisplay(currentItem.region, currentLang)}</span>
                </span>
                <span className="text-[#ded1c4]">·</span>
                <span className="flex items-center gap-1 text-[#8c7866]">
                  <CountryFlag countryCode={currentItem.seller_country || 'KR'} size="xs" />
                  <span>{currentItem.seller_name || '이웃 회원'}</span>
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-black text-[#1f1914] group-hover:text-amber-700 transition-colors line-clamp-1">
                {currentItem.title}
              </h4>

              <p className="text-xs text-[#5c4a39] line-clamp-2 leading-relaxed">
                {currentItem.description}
              </p>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg sm:text-xl font-black text-rose-600">
                    {currentItem.price.toLocaleString()}원
                  </span>
                  {currentItem.original_price && currentItem.original_price > currentItem.price && (
                    <span className="text-xs text-slate-400 line-through">
                      {currentItem.original_price.toLocaleString()}원
                    </span>
                  )}
                </div>

                <span className="text-xs font-bold text-[#09101f] bg-[#ede3d8] hover:bg-[#dfd3c5] px-3 py-1.5 rounded-xl border border-[#ded1c4] transition-colors">
                  {t('매물 상세 보기')} →
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
