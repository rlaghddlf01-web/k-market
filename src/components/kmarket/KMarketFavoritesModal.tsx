'use client';

import React, { useState } from 'react';
import { useKMarket } from '@/context/KMarketContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  Heart,
  X,
  ShoppingBag,
  Package,
  MapPin,
  MessageCircle,
  Sparkles,
  TrendingDown,
  Trash2,
} from 'lucide-react';
import CountryFlag from './CountryFlag';
import KMarketStatusBadge from './KMarketStatusBadge';

export default function KMarketFavoritesModal() {
  const {
    items,
    likedItemIds,
    toggleLike,
    setSelectedItem,
    openChatForItem,
    isFavoritesModalOpen,
    setIsFavoritesModalOpen,
  } = useKMarket();
  const { t, formatWon, currentLang } = useLanguage();

  const [activeTab, setActiveTab] = useState<'favorites' | 'my_sales' | 'my_buys'>('favorites');

  if (!isFavoritesModalOpen) return null;

  // 1. 찜한 매물 목록 필터링
  const likedItems = items.filter((item) => likedItemIds.has(item.id));

  // 2. 내 판매 매물 (예시: user-vn-1 또는 첫 번째 판매자 기준)
  const mySalesItems = items.filter((item) => item.seller_id === 'user-vn-1' || item.id === 'item-1');

  // 3. 내 구매/거래 완료 매물
  const myBuyItems = items.filter((item) => item.status === 'sold');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-gray-800 flex flex-col max-h-[90vh]">
        {/* 상단 헤더 */}
        <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center text-white shadow-inner">
              <Heart className="w-6 h-6 fill-current text-white animate-pulse" />
            </div>
            <div>
              <div className="inline-flex items-center space-x-1.5 bg-black/20 px-2.5 py-0.5 rounded-full text-xs font-bold text-rose-100 mb-0.5">
                <Sparkles className="w-3 h-3 text-yellow-300" />
                <span>{t('auto_ui_129')}</span>
              </div>
              <h2 className="text-xl font-black tracking-tight">
                찜한 매물 & 마이페이지
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsFavoritesModalOpen(false)}
            className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 탭 네비게이션 바 */}
        <div className="flex items-center border-b border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-800/50 px-4 shrink-0">
          <button
            onClick={() => setActiveTab('favorites')}
            className={`py-3.5 px-4 font-extrabold text-xs sm:text-sm flex items-center space-x-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'favorites'
                ? 'border-rose-500 text-rose-600 dark:text-rose-400 bg-white dark:bg-gray-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Heart className={`w-4 h-4 ${activeTab === 'favorites' ? 'fill-current' : ''}`} />
            <span>{t('auto_ui_130')}</span>
          </button>

          <button
            onClick={() => setActiveTab('my_sales')}
            className={`py-3.5 px-4 font-extrabold text-xs sm:text-sm flex items-center space-x-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'my_sales'
                ? 'border-rose-500 text-rose-600 dark:text-rose-400 bg-white dark:bg-gray-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>{t('auto_ui_131')}</span>
          </button>

          <button
            onClick={() => setActiveTab('my_buys')}
            className={`py-3.5 px-4 font-extrabold text-xs sm:text-sm flex items-center space-x-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'my_buys'
                ? 'border-rose-500 text-rose-600 dark:text-rose-400 bg-white dark:bg-gray-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{t('auto_ui_132')}</span>
          </button>
        </div>

        {/* 탭별 리스트 렌더링 영역 */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3 flex-1">
          {/* 1. 찜한 매물 탭 */}
          {activeTab === 'favorites' && (
            <>
              {likedItems.length === 0 ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-3 text-slate-400">
                  <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-rose-400">
                    <Heart className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-700 dark:text-slate-300 text-sm">
                      아직 찜한 매물이 없습니다.
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      마음에 드는 상품의 하트(💖) 버튼을 누르면 실시간 가격 변동과 예약 상태를 한눈에 볼 수 있습니다.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsFavoritesModalOpen(false)}
                    className="mt-2 px-4 py-2 bg-rose-600 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-rose-700 transition-all cursor-pointer"
                  >
                    중고 매물 구경하러 가기
                  </button>
                </div>
              ) : (
                likedItems.map((item) => {
                  const displayTitle =
                    item.translations?.[currentLang]?.title || item.title;

                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        setSelectedItem(item);
                        setIsFavoritesModalOpen(false);
                      }}
                      className="group bg-white dark:bg-gray-800/80 p-3.5 rounded-2xl border border-slate-200/90 dark:border-gray-700 hover:border-rose-400 hover:shadow-lg transition-all duration-200 flex items-center gap-3.5 cursor-pointer"
                    >
                      {/* 매물 썸네일 */}
                      <div className="relative w-22 h-22 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        {item.is_price_dropped && (
                          <div className="absolute top-1 left-1 bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-sm flex items-center gap-0.5">
                            <TrendingDown className="w-2.5 h-2.5" />
                            <span>{t('status_price_dropped')}</span>
                          </div>
                        )}
                      </div>

                      {/* 매물 상세 정보 */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between h-22 sm:h-24 py-0.5">
                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <KMarketStatusBadge status={item.status} />
                            <CountryFlag
                              countryCode={item.seller_country}
                              fallbackEmoji={item.seller_country_flag}
                              size="xs"
                              shape="circle"
                            />
                            <span className="text-[10px] text-slate-400 truncate">
                              {item.seller_name.split(' ')[0]}
                            </span>
                          </div>

                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate group-hover:text-rose-600 transition-colors">
                            {displayTitle}
                          </h4>
                        </div>

                        <div className="flex items-end justify-between gap-2">
                          <div>
                            <span className="text-sm sm:text-base font-black text-slate-950 dark:text-white">
                              {formatWon(item.price)}
                            </span>
                            <div className="flex items-center text-[10px] text-slate-400 gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-blue-500 shrink-0" />
                              <span className="truncate">{item.region}</span>
                            </div>
                          </div>

                          {/* 1:1 번역챗 및 찜 해제 버튼 */}
                          <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => {
                                setIsFavoritesModalOpen(false);
                                openChatForItem(item);
                              }}
                              className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">{t('auto_ui_133')}</span>
                            </button>

                            <button
                              onClick={() => toggleLike(item.id)}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                              title={t('auto_ui_134')}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </>
          )}

          {/* 2. 내 판매내역 탭 */}
          {activeTab === 'my_sales' && (
            <>
              {mySalesItems.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <Package className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                  <p className="text-xs">{t('auto_ui_135')}</p>
                </div>
              ) : (
                mySalesItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800/80 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                      />
                      <div className="truncate">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <KMarketStatusBadge status={item.status} />
                          <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {item.title}
                          </span>
                        </div>
                        <span className="text-sm font-black text-slate-900 dark:text-white">
                          {formatWon(item.price)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setIsFavoritesModalOpen(false);
                        }}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        상세 관리
                      </button>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {/* 3. 내 구매/거래 완료 탭 */}
          {activeTab === 'my_buys' && (
            <>
              {myBuyItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800/80 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 truncate">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 grayscale-50"
                    />
                    <div className="truncate">
                      <span className="text-[10px] bg-slate-200 dark:bg-gray-700 text-slate-700 dark:text-slate-300 font-bold px-2 py-0.5 rounded-sm">
                        {t('status_sold')}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate mt-1">
                        {item.title}
                      </h4>
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                        {formatWon(item.price)}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg shrink-0">
                    거래 완료됨
                  </span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
