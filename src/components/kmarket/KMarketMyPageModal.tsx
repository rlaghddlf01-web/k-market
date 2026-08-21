'use client';

import React, { useState } from 'react';
import { useKMarket } from '@/context/KMarketContext';
import {
  X,
  Heart,
  Package,
  ShoppingBag,
  Flame,
  ShieldCheck,
  HelpCircle,
  Sparkles,
  ArrowRight,
  MapPin,
  Bell,
} from 'lucide-react';
import CountryFlag from './CountryFlag';

interface KMarketMyPageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function KMarketMyPageModal({ isOpen, onClose }: KMarketMyPageModalProps) {
  const {
    items,
    likedItemIds,
    toggleLike,
    authedUser,
    setIsTaxModalOpen,
    setIsKeywordModalOpen,
    keywordAlerts,
    openChatForItem,
    setSelectedItem,
    updateItemStatus,
  } = useKMarket();

  // 3대 탭: 'selling'(판매내역), 'buying'(구매내역), 'favorites'(찜한물건)
  const [activeTab, setActiveTab] = useState<'selling' | 'buying' | 'favorites'>('selling');
  const [sellingSubFilter, setSellingSubFilter] = useState<'all' | 'selling' | 'sold'>('all');
  const [showMannerGuide, setShowMannerGuide] = useState(false);

  if (!isOpen) return null;

  // 유저 기본 프로필 (OCR 인증 여부에 따라 매너온도 계산)
  const isOcr = authedUser?.isOcrVerified ?? true;
  const userMannerTemp = isOcr ? 43.5 : 36.5;
  const userName = authedUser?.userName || 'NGUYEN VAN DUC (쩐반득)';
  const userCountry = authedUser?.country || 'VN';
  const userVisa = authedUser?.visaType || 'E-9 (비전문취업)';
  const userDormitory = authedUser?.dormitory || '평택 포승공단 기숙사 2동';

  // 1. 내가 찜한 매물
  const favoriteItems = items.filter((item) => likedItemIds.has(item.id));

  // 2. 내가 판매중/판매완료한 매물 (시연용 seller_id 일치 매물)
  const mySellingItems = items.filter(
    (item) => item.seller_country === userCountry || item.seller_id === authedUser?.userId || item.id === 'item-1' || item.id === 'item-4'
  );

  const filteredSellingItems = mySellingItems.filter((item) => {
    if (sellingSubFilter === 'selling') return item.status === 'selling' || item.status === 'reserved';
    if (sellingSubFilter === 'sold') return item.status === 'sold';
    return true;
  });

  // 3. 내가 구매 완료한 매물 (시연용)
  const myPurchasedItems = items.filter((item) => item.id === 'item-2' || item.id === 'item-6');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs animate-fadeIn flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-gray-800 flex flex-col max-h-[90vh] my-auto">
        {/* 모달 상단 헤더 */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-white text-xl shadow-inner border border-white/20">
              <CountryFlag countryCode={userCountry} size="lg" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg sm:text-xl font-black">{userName}</h2>
                <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full shadow-xs">
                  {userVisa}
                </span>
              </div>
              <p className="text-xs text-sky-100 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-sky-300" />
                <span>{userDormitory}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 🌡️ K-Trust 매너온도 & 실물 신분증 OCR 인증 현황 카드 */}
        <div className="p-4 bg-slate-50 dark:bg-gray-800/80 border-b border-slate-200 dark:border-gray-800 shrink-0 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
                <span>K-Trust 매너온도</span>
              </span>
              <button
                onClick={() => setShowMannerGuide(!showMannerGuide)}
                className="inline-flex items-center space-x-0.5 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>매너온도란?</span>
              </button>
            </div>

            <div className="flex items-center space-x-1.5">
              <span className="text-lg font-black text-orange-600 dark:text-orange-400">
                {userMannerTemp}℃
              </span>
              <span className="text-xs">🔥</span>
            </div>
          </div>

          {/* 비주얼 온도 게이지 바 */}
          <div className="relative w-full h-3 bg-slate-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 rounded-full transition-all duration-1000 shadow-xs"
              style={{ width: `${Math.min(userMannerTemp * 1.3, 100)}%` }}
            />
          </div>

          {/* OCR 가산점 안내 & 신뢰 뱃지 */}
          <div className="flex flex-wrap items-center justify-between text-xs gap-2 pt-0.5">
            <div className="flex items-center space-x-1.5">
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>법무부 실물 신분증 OCR 검증 (+7.0℃ 보너스 반영)</span>
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              신뢰도 상위 12% 최우수 회원 🛡️
            </span>
          </div>

          {/* ❓ 매너온도란? 설명 아코디언/안내 박스 */}
          {showMannerGuide && (
            <div className="p-3.5 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-800 text-xs space-y-2 animate-fadeIn">
              <h4 className="font-black text-blue-950 dark:text-blue-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>💡 K-Trust 매너온도 시스템 안내</span>
              </h4>
              <ul className="space-y-1 text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                <li>• <strong>36.5℃</strong>는 사람의 따뜻한 체온처럼 가입 시 주어지는 기본 신뢰 점수입니다.</li>
                <li>• <strong>📸 실물 신분증 OCR 사진 촬영</strong> 시 즉시 <strong>+7.0℃</strong>가 올라가 <strong>43.5℃(골드 등급)</strong>가 됩니다.</li>
                <li>• <strong>43.5℃ 이상</strong>이면 구매자들이 100% 신뢰하여 내 매물이 <strong>3배 더 빠르게 판매</strong>됩니다!</li>
                <li>• 직거래 후 시간 약속과 친절 칭찬 후기를 받으면 온도가 계속 상승합니다. (노쇼/사기 신고 시 하강)</li>
              </ul>
            </div>
          )}
        </div>

        {/* 💰 KTRS 이지텍스 184만원 세금 환급 연계 원클릭 배너 */}
        <div className="p-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white flex items-center justify-between shrink-0 shadow-xs">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white shrink-0">
              <Sparkles className="w-6 h-6 text-yellow-200 animate-spin" />
            </div>
            <div>
              <div className="inline-flex items-center space-x-1 bg-black/20 px-2 py-0.5 rounded-full text-[10px] font-black text-amber-100">
                <span>KTRS 이지텍스 공식 연동</span>
              </div>
              <h4 className="font-black text-sm sm:text-base">
                예상 환급금 184만원 (선결제 0원 후불제 15%)
              </h4>
              <p className="text-[11px] text-amber-100">
                신분증 OCR 인증이 완료되어 서류 제출 없이 1초 만에 신청 가능합니다.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              setIsTaxModalOpen(true);
            }}
            className="px-4 py-2.5 bg-slate-950 hover:bg-black text-white font-black text-xs rounded-2xl shadow-lg transition-all active:scale-95 shrink-0 cursor-pointer flex items-center space-x-1"
          >
            <span>환급 신청</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 🔔 키워드 실시간 알림 관리 섹션 */}
        <div className="px-4 py-3 bg-blue-50/70 dark:bg-blue-950/30 border-b border-slate-200 dark:border-gray-800 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2 min-w-0">
            <div className="p-2 rounded-xl bg-blue-600 text-white shrink-0 shadow-xs">
              <Bell className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h5 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5 truncate">
                <span>🔔 키워드 실시간 알림 ({keywordAlerts.length}개 등록중)</span>
              </h5>
              <div className="flex items-center gap-1 mt-0.5 overflow-x-auto no-scrollbar">
                {keywordAlerts.slice(0, 3).map((kw) => (
                  <span
                    key={kw.id}
                    className="text-[10px] bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-300 px-1.5 py-0.2 rounded-md font-bold border border-blue-200/80 shrink-0"
                  >
                    #{kw.keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              setIsKeywordModalOpen(true);
            }}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all shrink-0 cursor-pointer"
          >
            알림 설정
          </button>
        </div>

        {/* 📦 3대 거래 관리 탭 바: [내가 파는 물건] [내가 산 물건] [내가 찜한 물건] */}
        <div className="flex border-b border-slate-200 dark:border-gray-800 bg-slate-100/60 dark:bg-gray-800/40 p-1.5 gap-1.5 shrink-0">
          <button
            onClick={() => setActiveTab('selling')}
            className={`flex-1 py-2.5 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
              activeTab === 'selling'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>내가 파는 물건 ({mySellingItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('buying')}
            className={`flex-1 py-2.5 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
              activeTab === 'buying'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>내가 산 물건 ({myPurchasedItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex-1 py-2.5 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
              activeTab === 'favorites'
                ? 'bg-red-500 text-white shadow-md shadow-red-500/25'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60'
            }`}
          >
            <Heart className="w-4 h-4 fill-current" />
            <span>내가 찜한 물건 ({favoriteItems.length})</span>
          </button>
        </div>

        {/* 탭 컨텐츠 영역 */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {/* 1. 내가 파는 물건 탭 */}
          {activeTab === 'selling' && (
            <div className="space-y-3">
              {/* 서브 필터: 전체 / 판매중 / 거래완료 */}
              <div className="flex items-center gap-1.5 text-xs">
                {(['all', 'selling', 'sold'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSellingSubFilter(filter)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                      sellingSubFilter === filter
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                        : 'bg-slate-100 text-slate-600 dark:bg-gray-800 dark:text-slate-400'
                    }`}
                  >
                    {filter === 'all' && `전체 (${mySellingItems.length})`}
                    {filter === 'selling' && '판매중 / 예약중'}
                    {filter === 'sold' && '거래완료'}
                  </button>
                ))}
              </div>

              {filteredSellingItems.length === 0 ? (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <Package className="w-12 h-12 mx-auto text-slate-300" />
                  <p className="text-xs">해당 상태의 판매 매물이 없습니다.</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-gray-800">
                  {filteredSellingItems.map((item) => (
                    <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                      <div
                        onClick={() => {
                          setSelectedItem(item);
                          onClose();
                        }}
                        className="flex items-center space-x-3 flex-1 min-w-0 cursor-pointer"
                      >
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-slate-100"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-1.5">
                            {item.status === 'selling' && (
                              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                                판매중
                              </span>
                            )}
                            {item.status === 'reserved' && (
                              <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                                예약중
                              </span>
                            )}
                            {item.status === 'sold' && (
                              <span className="bg-slate-200 text-slate-700 text-[10px] font-black px-2 py-0.5 rounded-full">
                                거래완료
                              </span>
                            )}
                            <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                              {item.title}
                            </h4>
                          </div>
                          <p className="text-xs font-black text-blue-600 dark:text-blue-400 mt-1">
                            {item.price === 0 ? '0원 (무료 나눔)' : `${item.price.toLocaleString()}원`}
                          </p>
                          <span className="text-[11px] text-slate-400 mt-0.5 block truncate">
                            {item.region} • 찜 {item.like_count}
                          </span>
                        </div>
                      </div>

                      {/* 판매 상태 변경 버튼 그룹 */}
                      <div className="flex items-center space-x-1.5 shrink-0">
                        {item.status === 'selling' && (
                          <button
                            onClick={() => updateItemStatus(item.id, 'reserved')}
                            className="px-2.5 py-1.5 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 text-xs font-bold border border-amber-200 cursor-pointer"
                          >
                            예약중 변경
                          </button>
                        )}
                        {item.status === 'reserved' && (
                          <button
                            onClick={() => updateItemStatus(item.id, 'sold')}
                            className="px-2.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold border border-emerald-200 cursor-pointer"
                          >
                            판매완료 처리
                          </button>
                        )}
                        {item.status === 'sold' && (
                          <button
                            onClick={() => updateItemStatus(item.id, 'selling')}
                            className="px-2.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold cursor-pointer"
                          >
                            다시 판매
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 2. 내가 산 물건 탭 */}
          {activeTab === 'buying' && (
            <div className="space-y-3">
              {myPurchasedItems.length === 0 ? (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <ShoppingBag className="w-12 h-12 mx-auto text-slate-300" />
                  <p className="text-xs">구매 완료한 내역이 없습니다.</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-gray-800">
                  {myPurchasedItems.map((item) => (
                    <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                      <div
                        onClick={() => {
                          setSelectedItem(item);
                          onClose();
                        }}
                        className="flex items-center space-x-3 flex-1 min-w-0 cursor-pointer"
                      >
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-slate-100"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-1">
                            직거래 완료 🛍️
                          </span>
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                            {item.title}
                          </h4>
                          <p className="text-xs font-black text-slate-800 dark:text-slate-200 mt-0.5">
                            {item.price === 0 ? '무료 나눔' : `${item.price.toLocaleString()}원`}
                          </p>
                          <span className="text-[11px] text-slate-400 block truncate">
                            판매자: {item.seller_name} ({item.region})
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => alert(`[${item.seller_name}] 님에게 따뜻한 칭찬 후기(+0.5℃)를 보냈습니다!`)}
                        className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold border border-blue-200 shrink-0 cursor-pointer"
                      >
                        후기 남기기 ⭐
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 3. 내가 찜한 물건 탭 */}
          {activeTab === 'favorites' && (
            <div className="space-y-3">
              {favoriteItems.length === 0 ? (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <Heart className="w-12 h-12 mx-auto text-slate-300" />
                  <p className="text-xs font-bold">아직 찜한 물건이 없습니다.</p>
                  <p className="text-[11px]">마음에 드는 물건에 하트(❤️)를 눌러보세요!</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-gray-800">
                  {favoriteItems.map((item) => (
                    <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                      <div
                        onClick={() => {
                          setSelectedItem(item);
                          onClose();
                        }}
                        className="flex items-center space-x-3 flex-1 min-w-0 cursor-pointer"
                      >
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-slate-100"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                            {item.title}
                          </h4>
                          <p className="text-xs font-black text-rose-600 dark:text-rose-400 mt-0.5">
                            {item.price === 0 ? '0원 (무료 나눔)' : `${item.price.toLocaleString()}원`}
                          </p>
                          <span className="text-[11px] text-slate-400 block truncate">
                            {item.region} • {item.seller_name}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1.5 shrink-0">
                        <button
                          onClick={() => {
                            onClose();
                            openChatForItem(item);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                        >
                          1:1 번역챗 💬
                        </button>
                        <button
                          onClick={() => toggleLike(item.id)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                          title="찜 취소"
                        >
                          <Heart className="w-5 h-5 fill-rose-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
