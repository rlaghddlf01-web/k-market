'use client';

import React, { useState, useEffect } from 'react';
import { KMarketItem } from '@/types/kmarket';
import { useKMarket } from '@/context/KMarketContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  Heart,
  MapPin,
  MessageCircle,
  Clock,
  Eye,
  Sparkles,
} from 'lucide-react';
import KMarketUserProfileModal from './KMarketUserProfileModal';
import KMarketStatusBadge from './KMarketStatusBadge';
import CountryFlag from './CountryFlag';

interface KMarketItemCardProps {
  item: KMarketItem;
}

/** 등록 시간 → "n분 전 / n시간 전 / n일 전" 포맷 (클라이언트 전용) */
function calcTimeAgo(dateString: string): string {
  const diff = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 60) return `${minutes}분 전`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;
  return `${Math.floor(hours / 24)}일 전`;
}

export default function KMarketItemCard({ item }: KMarketItemCardProps) {
  const { setSelectedItem, openChatForItem, toggleLike, likedItemIds } =
    useKMarket();
  const { formatWon, currentLang } = useLanguage();
  const [showProfileModal, setShowProfileModal] = useState(false);

  // SSR 시 서버/클라이언트 시간 불일치 방지 — 마운트 후에만 계산
  const [timeAgoText, setTimeAgoText] = useState('');
  useEffect(() => {
    if (item.created_at) {
      setTimeAgoText(calcTimeAgo(item.created_at));
    }
  }, [item.created_at]);

  const isLiked = likedItemIds.has(item.id);
  const isFree = item.price === 0;
  const isSold = item.status === 'sold';
  const isReserved = item.status === 'reserved';

  // 다국어 제목
  const displayTitle =
    item.translations?.[currentLang]?.title || item.title;

  return (
    <>
      <div
        onClick={() => setSelectedItem(item)}
        className={`group card-premium overflow-hidden flex flex-col cursor-pointer ${
          isSold ? 'opacity-55' : ''
        }`}
      >
        {/* ── 썸네일 영역 ───────────────────────────────── */}
        <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden rounded-t-[20px]">
          <img
            src={item.images[0]}
            alt={item.title}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isSold ? 'grayscale-[40%]' : 'group-hover:scale-106'
            }`}
            loading="lazy"
          />

          {/* 판매자 배지 (좌상단) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowProfileModal(true);
            }}
            className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1.5 hover:bg-black/90 transition-colors"
            title="판매자 프로필 보기"
          >
            <CountryFlag
              countryCode={item.seller_country}
              fallbackEmoji={item.seller_country_flag}
              size="xs"
              shape="circle"
            />
            <span className="font-black text-amber-300 uppercase tracking-tight">
              {item.seller_country}
            </span>
            <span className="text-slate-100">
              {item.seller_name.split(' ')[0]}
            </span>
            <span className="text-emerald-300 font-extrabold ml-0.5">
              36.5℃
            </span>
          </button>

          {/* 우측 상단 뱃지 그룹 */}
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
                className={`text-[10px] font-black px-2.5 py-1 rounded-full shadow-md ${
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

          {/* 다중 사진 인디케이터 */}
          {item.images.length > 1 && (
            <div className="absolute bottom-2.5 left-2.5 bg-black/50 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-md font-semibold">
              📷 1/{item.images.length}
            </div>
          )}

          {/* 찜하기 버튼 */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleLike(item.id);
            }}
            className={`absolute bottom-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all active:scale-75 ${
              isLiked
                ? 'bg-red-500 text-white shadow-md shadow-red-500/40'
                : 'bg-black/30 text-white hover:bg-black/50'
            }`}
            aria-label="찜하기"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* ── 본문 정보 ─────────────────────────────────── */}
        <div className="p-3.5 flex-1 flex flex-col justify-between gap-2">
          <div className="space-y-1.5">
            {/* 15개국어 자동번역 뱃지 */}
            <div
              className="flex items-center gap-1 text-[10px] font-semibold text-[#845b37]"
            >
              <Sparkles className="w-3 h-3 text-[#b07d56]" />
              <span>15개국어 자동번역</span>
            </div>

            {/* 제목 */}
            <h3 className="font-bold text-sm text-[#1f1914] line-clamp-2 leading-snug group-hover:text-[#5c3818] transition-colors">
              {displayTitle}
            </h3>

            {/* 가격 */}
            <div className="flex items-baseline gap-2">
              <span
                className={`text-base font-black ${
                  isFree ? 'text-emerald-700' : 'text-[#1f1914]'
                }`}
              >
                {formatWon(item.price)}
              </span>
              {item.original_price && item.original_price > item.price && (
                <span className="text-xs text-[#9c8a78] line-through">
                  {item.original_price.toLocaleString()}원
                </span>
              )}
            </div>
          </div>

          {/* ── 하단 메타 정보 + 채팅 CTA ─────────────── */}
          <div className="pt-2.5 border-t space-y-2" style={{ borderColor: 'rgba(180,150,120,0.18)' }}>
            {/* 위치 + 조회수 + 시간 */}
            <div className="flex items-center justify-between text-[11px] text-[#705e4f] font-medium">
              <div className="flex items-center gap-1 truncate max-w-[110px]">
                <MapPin className="w-3 h-3 text-[#845b37] shrink-0" />
                <span className="truncate">{item.region}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {item.views !== undefined && (
                  <span className="flex items-center gap-0.5">
                    <Eye className="w-3 h-3" />
                    {item.views}
                  </span>
                )}
                {timeAgoText && (
                  <span className="flex items-center gap-0.5">
                    <Clock className="w-3 h-3" />
                    {timeAgoText}
                  </span>
                )}
              </div>
            </div>

            {/* 번역 채팅 CTA - 연한 커피(마일드 모카 & 카라멜) 스타일 */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                openChatForItem(item);
              }}
              className="w-full flex items-center justify-center gap-1.5 text-[12px] py-2 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer shadow-sm hover:shadow-md group/btn hover:brightness-105"
              style={{
                background: 'linear-gradient(135deg, #4e2f18 0%, #704423 100%)',
                border: '1.5px solid #d4a373',
                boxShadow: '0 2px 8px rgba(78, 47, 24, 0.18)',
              }}
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#fed7aa] group-hover/btn:scale-110 transition-transform" />
              <span className="text-[#fef3c7] font-bold">1:1 안심 번역 채팅</span>
              <span className="text-white font-bold">시작 →</span>
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
