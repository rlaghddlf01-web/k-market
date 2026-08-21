'use client';

import React, { useState } from 'react';
import { KMarketItem } from '@/types/kmarket';
import { useKMarket } from '@/context/KMarketContext';
import { useLanguage } from '@/context/LanguageContext';
import { Heart, MapPin, MessageCircle, Clock, Eye, Sparkles, CheckCircle2 } from 'lucide-react';
import KMarketTrustBadge from './KMarketTrustBadge';
import KMarketUserProfileModal from './KMarketUserProfileModal';
import KMarketStatusBadge from './KMarketStatusBadge';
import CountryFlag from './CountryFlag';

interface KMarketItemCardProps {
  item: KMarketItem;
}

export default function KMarketItemCard({ item }: KMarketItemCardProps) {
  const { setSelectedItem, openChatForItem, toggleLike, likedItemIds } = useKMarket();
  const { t, formatWon, currentLang } = useLanguage();
  const [showProfileModal, setShowProfileModal] = useState(false);

  const isLiked = likedItemIds.has(item.id);
  const isFree = item.price === 0;
  const isSold = item.status === 'sold';
  const isReserved = item.status === 'reserved';

  // 다국어 제목
  const displayTitle = item.translations?.[currentLang]?.title || item.title;

  return (
    <>
      <div
        onClick={() => setSelectedItem(item)}
        className={`group bg-white rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col cursor-pointer ${
          isSold
            ? 'opacity-70 border-slate-200 bg-slate-50/60'
            : isReserved
            ? 'border-amber-300 shadow-xs hover:shadow-xl'
            : 'border-slate-200 hover:border-emerald-400 shadow-xs hover:shadow-xl'
        }`}
      >
        {/* 썸네일 영역 */}
        <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
          <img
            src={item.images[0]}
            alt={item.title}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isSold ? 'grayscale-50' : 'group-hover:scale-105'
            }`}
            loading="lazy"
          />

          {/* 판매자 국가 국기 & 국가코드(MN/VN) & 닉네임 + 매너온도 클릭 */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowProfileModal(true);
            }}
            className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md flex items-center space-x-1.5 hover:bg-black/90 transition-colors"
          >
            <CountryFlag
              countryCode={item.seller_country}
              fallbackEmoji={item.seller_country_flag}
              size="xs"
              shape="circle"
            />
            <span className="text-[11px] font-black text-amber-300 uppercase tracking-tight">
              {item.seller_country}
            </span>
            <span className="text-[11px] font-medium text-slate-100">{item.seller_name.split(' ')[0]}</span>
            <span className="text-[10px] text-emerald-300 font-extrabold ml-0.5">36.5℃</span>
          </div>

          {/* 우측 상단 뱃지: 거래완료 / 예약중 / 무빙세일 / 무료나눔 / 가격인하 */}
          <div className="absolute top-2.5 right-2.5 flex flex-col items-end gap-1">
            {isSold ? (
              <KMarketStatusBadge status="sold" />
            ) : isReserved ? (
              <KMarketStatusBadge status="reserved" />
            ) : isFree ? (
              <div className="bg-emerald-500 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-md animate-pulse">
                🎁 무료나눔
              </div>
            ) : item.is_moving_sale ? (
              <div
                className={`text-[10px] font-black px-2 py-0.5 rounded-full shadow-md ${
                  (item.moving_d_day || 5) <= 3
                    ? 'bg-rose-600 text-white animate-pulse'
                    : (item.moving_d_day || 5) <= 7
                    ? 'bg-orange-600 text-white'
                    : 'bg-blue-600 text-white'
                }`}
              >
                {(item.moving_d_day || 5) <= 3
                  ? `🚨 D-${item.moving_d_day || 3} 마감`
                  : (item.moving_d_day || 5) <= 7
                  ? `🔥 D-${item.moving_d_day || 5} 초특가`
                  : `✈️ D-${item.moving_d_day || 14} 묶음`}
              </div>
            ) : null}

            {/* 가격 인하 또는 끌올 뱃지 */}
            {item.is_price_dropped && !isSold && !isReserved && (
              <KMarketStatusBadge
                status="selling"
                isPriceDropped={true}
                dropDiscountRate={item.drop_discount_rate}
              />
            )}
            {item.boosted_at && !item.is_price_dropped && !isSold && !isReserved && (
              <KMarketStatusBadge status="selling" boostedAt={item.boosted_at} />
            )}
          </div>

        {/* 다중 사진 인디케이터 */}
        {item.images.length > 1 && (
          <div className="absolute bottom-2.5 left-2.5 bg-black/50 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-md font-semibold">
            📷 1/{item.images.length}
          </div>
        )}

        {/* 찜하기 버튼 */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(item.id);
          }}
          className={`absolute bottom-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-transform active:scale-75 ${
            isLiked
              ? 'bg-red-500 text-white shadow-md shadow-red-500/30'
              : 'bg-black/30 text-white hover:bg-black/50'
          }`}
          aria-label="Like item"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* 본문 정보 */}
      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
        <div className="space-y-1">
          {/* 15개국어 AI 자동번역 뱃지 */}
          <div className="flex items-center space-x-1 text-[10px] font-semibold text-blue-600">
            <Sparkles className="w-3 h-3 text-blue-500" />
            <span>15개국어 자동번역 지원</span>
          </div>

          <h3 className="font-bold text-sm text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
            {displayTitle}
          </h3>

          <div className="flex items-baseline space-x-2 pt-0.5">
            <span
              className={`text-base sm:text-lg font-black ${
                isFree ? 'text-emerald-600' : 'text-slate-950'
              }`}
            >
              {formatWon(item.price)}
            </span>
            {item.original_price && item.original_price > item.price && (
              <span className="text-xs text-slate-400 line-through">
                {item.original_price.toLocaleString()}원
              </span>
            )}
          </div>
        </div>

        {/* 하단 위치 및 1:1 번역 채팅 CTA */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-1 truncate max-w-[150px]">
            <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="truncate">{item.region}</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              openChatForItem(item);
            }}
            className="flex items-center space-x-1 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>1:1 번역챗</span>
          </button>
        </div>
      </div>
    </div>

    {/* 판매자 신뢰 프로필 모달 */}
    <KMarketUserProfileModal
      isOpen={showProfileModal}
      onClose={() => setShowProfileModal(false)}
      userId={item.seller_id}
      userName={item.seller_name}
      userCountry={item.seller_country}
      userFlag={item.seller_country_flag}
    />
  </>
  );
}


