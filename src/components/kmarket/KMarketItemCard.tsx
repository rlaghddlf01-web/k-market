'use client';

import React, { useState, useEffect } from 'react';
import { useKMarket } from '@/context/KMarketContext';
import { useLanguage } from '@/context/LanguageContext';
import { KMarketItem } from '@/types/kmarket';
import { calcTimeAgo } from '@/lib/itemDisplayUtils';
import {
  Heart,
  MessageCircle,
  Sparkles,
  MapPin,
  Clock,
  Share2,
} from 'lucide-react';
import KMarketUserProfileModal from './KMarketUserProfileModal';
import KMarketStatusBadge from './KMarketStatusBadge';
import CountryFlag from './CountryFlag';
import { getAdaptedItemRegion } from '@/lib/dynamicLocationAdapter';

interface KMarketItemCardProps {
  item: KMarketItem;
}

export default function KMarketItemCard({ item }: KMarketItemCardProps) {
  const { setSelectedItem, openChatForItem, toggleLike, likedItemIds, selectedRegion, openShareModal } =
    useKMarket();
  const { t, formatWon, currentLang } = useLanguage();
  const [showProfileModal, setShowProfileModal] = useState(false);

  const displayRegion = getAdaptedItemRegion(item, selectedRegion, currentLang);

  // 상대 시간 텍스트 계산
  const [timeAgoText, setTimeAgoText] = useState('방금 전');
  useEffect(() => {
    if (item.created_at) {
      setTimeAgoText(calcTimeAgo(item.created_at, currentLang));
    }
  }, [item.created_at, currentLang]);

  const isLiked = likedItemIds.has(item.id);
  const isFree = item.price === 0;
  const isSold = item.status === 'sold';
  const isReserved = item.status === 'reserved';

  // 다국어 제목
  const displayTitle =
    item.translations?.[currentLang]?.title || item.title;

  return (
    <>
      {/* ── 📱 [모바일 전용] 당근마켓 스타일 좌측 1:1 정사각형 사진 + 우측 정보 가로 1줄 뷰 ── */}
      <div
        onClick={() => setSelectedItem(item)}
        className={`md:hidden flex flex-row gap-3.5 py-3.5 px-2 border-b border-gray-200/70 bg-white hover:bg-gray-50/60 active:bg-gray-100 cursor-pointer transition-colors w-full ${
          isSold ? 'opacity-55' : ''
        }`}
      >
        {/* 좌측: 1:1 정사각형 썸네일 사진 */}
        <div className="relative w-28 h-28 shrink-0 rounded-2xl overflow-hidden bg-slate-100 border border-gray-100 shadow-2xs">
          <img
            src={item.images[0]}
            alt={item.title}
            className={`w-full h-full object-cover ${isSold ? 'grayscale-[40%]' : ''}`}
            loading="lazy"
          />

          {/* 좌상단: D-Day / 상태 배지 */}
          <div className="absolute top-1.5 left-1.5">
            {isSold ? (
              <KMarketStatusBadge status="sold" />
            ) : isReserved ? (
              <KMarketStatusBadge status="reserved" />
            ) : isFree ? (
              <div className="bg-emerald-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-xs">
                {t('🎁 무료나눔')}
              </div>
            ) : item.is_moving_sale ? (
              <div className="bg-rose-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-xs">
                D-{item.moving_d_day || 5}
              </div>
            ) : null}
          </div>

          {/* 다중 사진 뱃지 */}
          {item.images.length > 1 && (
            <div className="absolute bottom-1.5 left-1.5 bg-black/60 backdrop-blur-xs text-white text-[9px] px-1.5 py-0.2 rounded font-bold">
              📷 {item.images.length}
            </div>
          )}
        </div>

        {/* 우측: 정보 영역 (당근마켓 완벽 일치: 제목 -> 지역/국기 -> 굵은 가격 -> 우하단 하트/채팅) */}
        <div className="flex-1 min-w-0 h-28 flex flex-col justify-between py-0.5">
          <div>
            {/* 상품 제목 */}
            <h3 className="font-bold text-[15px] text-gray-900 leading-snug tracking-tight line-clamp-2">
              {displayTitle}
            </h3>

            {/* 내 주변 장소 + 판매자 국기 & 이름 */}
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
              <span className="flex items-center gap-1 truncate font-normal max-w-[65%]">
                <MapPin className="w-3 h-3 text-[#845b37] shrink-0" />
                <span className="truncate">{displayRegion}</span>
              </span>
              <span className="text-gray-300">·</span>
              <span className="flex items-center gap-1 shrink-0 text-gray-600">
                <CountryFlag countryCode={item.seller_country} size="xs" />
                <span className="truncate max-w-[80px] font-medium">{item.seller_name}</span>
              </span>
            </div>
          </div>

          {/* 하단: 굵은 가격 + 우하단 채팅/하트 */}
          <div className="flex items-end justify-between pt-1">
            <div className="flex items-baseline gap-1.5">
              <span
                className={`text-[16px] font-black tracking-tight ${
                  isFree ? 'text-emerald-600' : 'text-gray-950'
                }`}
              >
                {formatWon(item.price)}
              </span>
              {item.original_price && item.original_price > item.price && (
                <span className="text-[11px] text-gray-400 line-through">
                  {item.original_price.toLocaleString()}원
                </span>
              )}
            </div>

            {/* 우하단: 채팅수 & 하트 버튼 */}
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <div className="flex items-center gap-0.5 font-semibold text-gray-500">
                <MessageCircle className="w-3.5 h-3.5 text-blue-500" />
                <span>{(item as any).chat_count || 1}</span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(item.id);
                }}
                className="flex items-center gap-0.5 font-semibold cursor-pointer hover:text-rose-500 transition-colors"
              >
                <Heart className={`w-3.5 h-3.5 ${isLiked ? 'text-rose-500 fill-rose-500' : 'text-gray-400'}`} />
                <span className={isLiked ? 'text-rose-500' : 'text-gray-500'}>
                  {item.like_count + (isLiked ? 1 : 0)}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── 💻 [데스크탑 전용] 4열 와이드 프리미엄 카드 그리드 ── */}
      <div
        onClick={() => setSelectedItem(item)}
        className={`hidden md:flex group card-premium overflow-hidden flex-col w-full cursor-pointer transition-all duration-300 hover:shadow-xl border border-[#ded1c4] rounded-[24px] bg-white ${
          isSold ? 'opacity-55' : ''
        }`}
      >
        {/* ── 1. 상단 사진 가로 100% 꽉 채우는 풀 와이드 영역 ───────────────── */}
        <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden rounded-t-[23px]">
          <img
            src={item.images[0]}
            alt={item.title}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isSold ? 'grayscale-[40%]' : 'group-hover:scale-105'
            }`}
            loading="lazy"
          />

          {/* 좌상단: 판매자 국기 + 국가코드 + 이름 반투명 캡슐 배지 */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowProfileModal(true);
            }}
            className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1.5 hover:bg-black transition-colors max-w-[70%]"
            title={t('판매자 프로필 보기')}
          >
            <CountryFlag
              countryCode={item.seller_country}
              fallbackEmoji={item.seller_country_flag}
              size="xs"
              shape="circle"
            />
            <span className="font-black text-[#fef08a] uppercase tracking-tight shrink-0">
              {item.seller_country}
            </span>
            <span className="text-slate-100 truncate font-semibold">
              {item.seller_name}
            </span>
          </button>

          {/* 우상단: D-Day / 상태 배지 그룹 */}
          <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
            {isSold ? (
              <KMarketStatusBadge status="sold" />
            ) : isReserved ? (
              <KMarketStatusBadge status="reserved" />
            ) : isFree ? (
              <div className="bg-emerald-500 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-md animate-pulse">
                {t('🎁 무료나눔')}
              </div>
            ) : item.is_moving_sale ? (
              <div
                className={`text-[11px] font-black px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 ${
                  (item.moving_d_day || 5) <= 3
                    ? 'bg-rose-600 text-white animate-pulse'
                    : (item.moving_d_day || 5) <= 7
                    ? 'bg-orange-600 text-white'
                    : 'bg-blue-600 text-white'
                }`}
              >
                <span>🚨</span>
                <span>D-{item.moving_d_day || 5}</span>
              </div>
            ) : null}

            {/* 가격 인하 / 끌올 뱃지 */}
            {item.is_price_dropped && !isSold && !isReserved && (
              <KMarketStatusBadge
                status="selling"
                isPriceDropped={true}
                dropDiscountRate={item.drop_discount_rate}
              />
            )}
            {item.boosted_at &&
              !item.is_price_dropped &&
              !isSold &&
              !isReserved && (
                <KMarketStatusBadge
                  status="selling"
                  boostedAt={item.boosted_at}
                />
              )}
          </div>

          {/* 좌하단: 다중 사진 인디케이터 (📷 3) */}
          {item.images.length > 1 && (
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] px-2.5 py-0.5 rounded-lg font-bold flex items-center gap-1">
              <span>📷</span>
              <span>{item.images.length}</span>
            </div>
          )}

          {/* 우하단: 공유 & 찜하기 버튼 그룹 */}
          <div className="absolute bottom-3 right-3 flex items-center space-x-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                openShareModal(item);
              }}
              className="p-2.5 rounded-full bg-black/40 text-white hover:bg-black/70 backdrop-blur-md transition-all active:scale-75 cursor-pointer shadow-sm hover:text-yellow-300"
              title={t('1초 SNS 공유하기')}
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleLike(item.id);
              }}
              className={`p-2.5 rounded-full backdrop-blur-md transition-all active:scale-75 cursor-pointer ${
                isLiked
                  ? 'bg-red-500 text-white shadow-md shadow-red-500/40'
                  : 'bg-black/40 text-white hover:bg-black/60'
              }`}
              title={t('관심 매물 등록')}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* ── 2. 사진 바로 밑 설명 및 상세 정보 영역 ───────────────── */}
        <div className="p-4 sm:p-5 flex flex-col justify-between gap-3">
          <div className="space-y-1.5">
            {/* 17개국어 자동번역 뱃지 */}
            <div className="flex items-center gap-1 text-[11px] font-bold text-[#845b37]">
              <Sparkles className="w-3.5 h-3.5 text-[#b07d56]" />
              <span>{t('17개국어 자동번역')}</span>
            </div>

            {/* 상품 제목 */}
            <h3 className="font-extrabold text-base sm:text-lg text-slate-950 group-hover:text-[#845b37] transition-colors line-clamp-2 leading-snug tracking-tight">
              {displayTitle}
            </h3>

            {/* 가격 정보 */}
            <div className="flex items-baseline gap-2 pt-1">
              <span
                className={`text-xl sm:text-2xl font-black tracking-tight ${
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

          {/* ── 3. 하단 메타 정보 + 1:1 번역챗 골드 버튼 ─────────────── */}
          <div className="pt-3 border-t border-slate-100 space-y-3">
            {/* 위치 */}
            <div className="flex items-center justify-between text-xs text-[#705e4f] font-semibold">
              <div className="flex items-center gap-1.5 truncate max-w-[90%]" title={displayRegion}>
                <MapPin className="w-3.5 h-3.5 text-[#845b37] shrink-0" />
                <span className="truncate">{displayRegion}</span>
              </div>
            </div>

            {/* 💬 1:1 번역 채팅하기 버튼 (네이비 + 골드 테두리) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                openChatForItem(item);
              }}
              className="w-full flex items-center justify-center gap-2 text-xs sm:text-sm py-3 rounded-2xl transition-all duration-200 active:scale-95 cursor-pointer shadow-md hover:shadow-lg group/btn"
              style={{
                background: '#09101f',
                border: '2px solid #f3ba2f',
                boxShadow: '0 4px 12px rgba(9, 16, 31, 0.25)',
              }}
              title={t('17개국어 실시간 자동번역 1:1 채팅')}
            >
              <MessageCircle className="w-4 h-4 text-[#f3ba2f] group-hover/btn:scale-110 transition-transform" />
              <span className="text-[#f3ba2f] font-black tracking-tight">{t('💬 1:1 실시간 번역 채팅')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 판매자 프로필 상세 모달 */}
      <KMarketUserProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        userId={item.seller_id}
        userName={item.seller_name}
        userCountry={item.seller_country}
        userCountryFlag={item.seller_country_flag}
      />
    </>
  );
}
