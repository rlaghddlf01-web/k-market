'use client';

import React, { useState } from 'react';
import { useKMarket } from '@/context/KMarketContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  X,
  MapPin,
  Heart,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Plane,
  Clock,
  Share2,
  PhoneCall,
  Languages,
  Star,
} from 'lucide-react';
import KMarketTrustBadge from './KMarketTrustBadge';
import KMarketUserProfileModal from './KMarketUserProfileModal';
import KMarketReviewModal from './KMarketReviewModal';
import KMarketStatusBadge from './KMarketStatusBadge';
import KMarketStatusActionModal from './KMarketStatusActionModal';
import KMarketReportBlockModal from './KMarketReportBlockModal';
import CountryFlag from './CountryFlag';

export default function KMarketItemDetail() {
  const {
    selectedItem,
    setSelectedItem,
    openChatForItem,
    toggleLike,
    likedItemIds,
    updateItemStatus,
    boostItem,
    reportUser,
  } = useKMarket();
  const { t, formatWon, currentLang, currentLangOption } = useLanguage();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showOriginalLang, setShowOriginalLang] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reviewTargetUser, setReviewTargetUser] = useState({ id: '', name: '' });

  if (!selectedItem) return null;

  const isLiked = likedItemIds.has(selectedItem.id);
  const isFree = selectedItem.price === 0;

  const handleOpenReviewModal = (targetUserId: string, targetUserName: string) => {
    setReviewTargetUser({ id: targetUserId, name: targetUserName });
    setShowReviewModal(true);
  };

  // 번역 설명
  const translatedTitle = selectedItem.translations?.[currentLang]?.title || selectedItem.title;
  const translatedDesc =
    selectedItem.translations?.[currentLang]?.description || selectedItem.description;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
        <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
          {/* 상단 닫기 & 공유 버튼 */}
          <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center pointer-events-none">
            <button
              onClick={() => setSelectedItem(null)}
              className="pointer-events-auto bg-black/40 hover:bg-black/60 text-white p-2.5 rounded-full backdrop-blur-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pointer-events-auto flex items-center space-x-2">
              <button
                onClick={() => setShowReportModal(true)}
                className="bg-black/40 hover:bg-red-600/80 text-white px-2.5 py-1.5 rounded-full backdrop-blur-md transition-colors cursor-pointer text-xs font-bold flex items-center gap-1"
                title="불량 매물/사용자 신고 및 차단"
              >
                <span>🚫 신고</span>
              </button>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  alert('매물 링크가 복사되었습니다!');
                }}
                className="bg-black/40 hover:bg-black/60 text-white p-2.5 rounded-full backdrop-blur-md transition-colors cursor-pointer"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => toggleLike(selectedItem.id)}
                className={`p-2.5 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                  isLiked ? 'bg-red-500 text-white' : 'bg-black/40 text-white hover:bg-black/60'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* 본문 스크롤 영역 */}
          <div className="overflow-y-auto flex-1 pb-20">
            {/* 이미지 갤러리 */}
            <div className="relative h-72 sm:h-96 w-full bg-slate-900">
              <img
                src={selectedItem.images[activeImageIndex] || selectedItem.images[0]}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />

              {/* 다중 사진 썸네일 네비게이션 */}
              {selectedItem.images.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 px-4">
                  {selectedItem.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-white scale-110 shadow-lg'
                          : 'border-white/50 opacity-70'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-5 space-y-6">
              {/* 판매자 프로필 바 (매너온도 연동) */}
              <div
                onClick={() => setShowProfileModal(true)}
                className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/80 transition-colors rounded-2xl border border-slate-200/80 cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <CountryFlag
                    countryCode={selectedItem.seller_country}
                    fallbackEmoji={selectedItem.seller_country_flag}
                    size="xl"
                    shape="circle"
                  />
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="font-bold text-slate-900 text-sm group-hover:text-emerald-700">
                        {selectedItem.seller_name}
                      </span>
                      <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                        비자인증됨
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 flex items-center space-x-1 mt-0.5">
                      <span>프로필 & 거래후기 보기 &gt;</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <KMarketTrustBadge mannerTemp={41.2} variant="compact" />
                </div>
              </div>

            {/* 매물 기본 정보 & 가격 */}
            <div className="space-y-2">
              {/* 상태 뱃지 및 끌올/가격인하 표시 */}
              <div className="flex items-center gap-2 flex-wrap">
                <KMarketStatusBadge
                  status={selectedItem.status}
                  isPriceDropped={selectedItem.is_price_dropped}
                  dropDiscountRate={selectedItem.drop_discount_rate}
                  boostedAt={selectedItem.boosted_at}
                />
                {selectedItem.is_moving_sale && (
                  <span
                    className={`text-xs font-black px-2.5 py-0.5 rounded-full shadow-xs ${
                      (selectedItem.moving_d_day || 5) <= 3
                        ? 'bg-rose-600 text-white animate-pulse'
                        : (selectedItem.moving_d_day || 5) <= 7
                        ? 'bg-orange-600 text-white'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    {(selectedItem.moving_d_day || 5) <= 3
                      ? `🚨 귀국 D-${selectedItem.moving_d_day || 3} 오늘마감 헐값`
                      : (selectedItem.moving_d_day || 5) <= 7
                      ? `🔥 귀국 D-${selectedItem.moving_d_day || 5} 마감임박 초특가`
                      : `✈️ 귀국 D-${selectedItem.moving_d_day || 14} 묶음할인`}
                  </span>
                )}
                {selectedItem.status === 'reserved' && selectedItem.reserved_to_user_name && (
                  <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-semibold">
                    {selectedItem.reserved_to_user_name} 님과 거래 예약중
                  </span>
                )}
                {selectedItem.status === 'sold' && selectedItem.sold_to_user_name && (
                  <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md font-medium">
                    {selectedItem.sold_to_user_name} 님과 거래 완료됨
                  </span>
                )}
              </div>

              {/* 15개국어 자동번역 토글 바 */}
              <div className="flex items-center justify-between bg-blue-50/80 p-2.5 rounded-xl border border-blue-200/60 text-xs">
                <div className="flex items-center space-x-1.5 text-blue-900 font-medium">
                  <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
                  <span>
                    {currentLangOption.nativeName} ({currentLangOption.flag}) 실시간 번역 적용됨
                  </span>
                </div>
                <button
                  onClick={() => setShowOriginalLang(!showOriginalLang)}
                  className="text-blue-700 font-bold hover:underline cursor-pointer"
                >
                  {showOriginalLang ? '번역문 보기' : '원문 보기'}
                </button>
              </div>

              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {showOriginalLang ? selectedItem.title : translatedTitle}
              </h1>

              <div className="flex items-baseline space-x-3 pt-1">
                <span
                  className={`text-2xl sm:text-3xl font-black ${
                    isFree ? 'text-emerald-600' : 'text-slate-950'
                  }`}
                >
                  {formatWon(selectedItem.price)}
                </span>
                {selectedItem.original_price && selectedItem.original_price > selectedItem.price && (
                  <span className="text-sm text-slate-400 line-through">
                    정가 {selectedItem.original_price.toLocaleString()}원
                  </span>
                )}
              </div>
            </div>

            {/* 판매자 전용 상태 관리 액션 바 */}
            <div className="p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 flex items-center justify-between gap-2">
              <div className="text-xs text-indigo-900">
                <span className="font-bold block">내 매물 상태를 관리해보세요</span>
                <span className="text-[11px] text-indigo-700 opacity-80">예약중/거래완료 변경, 상단 끌올</span>
              </div>
              <button
                onClick={() => setShowStatusModal(true)}
                className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer"
              >
                상태변경 / 끌올
              </button>
            </div>

            {/* 직거래 위치 */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center space-x-1.5 font-bold text-slate-900">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>도보 직거래 희망 장소</span>
              </div>
              <p className="text-sm text-slate-800 font-semibold pl-5">
                {selectedItem.region}
              </p>
              <p className="text-slate-500 pl-5">
                💡 기숙사 입구 또는 공단 정문에서 안전하게 직접 만나서 물건 확인 후 거래하세요.
              </p>
            </div>

            {/* 상품 상세 설명 */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                상세 설명 (Item Description)
              </h3>
              <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-line bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
                {showOriginalLang ? selectedItem.description : translatedDesc}
              </p>
            </div>
          </div>
        </div>

        {/* 하단 고정 액션 바 */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-100 flex items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => toggleLike(selectedItem.id)}
              className={`p-3 rounded-2xl border transition-colors cursor-pointer ${
                isLiked
                  ? 'bg-red-50 border-red-200 text-red-600'
                  : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
          </div>

          <button
            onClick={() => {
              const itemToChat = selectedItem;
              setSelectedItem(null);
              openChatForItem(itemToChat);
            }}
            className="flex-1 py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-xl shadow-emerald-600/25 active:scale-98 transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{t('chat_btn')}</span>
          </button>
        </div>
      </div>
    </div>

    {/* 판매자 신뢰 프로필 모달 */}
    <KMarketUserProfileModal
      isOpen={showProfileModal}
      onClose={() => setShowProfileModal(false)}
      userId={selectedItem.seller_id}
      userName={selectedItem.seller_name}
      userCountry={selectedItem.seller_country}
      userFlag={selectedItem.seller_country_flag}
    />

    {/* 거래 후기 작성 모달 */}
    <KMarketReviewModal
      isOpen={showReviewModal}
      onClose={() => setShowReviewModal(false)}
      targetUserId={reviewTargetUser.id || selectedItem.seller_id}
      targetUserName={reviewTargetUser.name || selectedItem.seller_name}
      targetUserFlag={selectedItem.seller_country_flag}
      targetUserCountry={selectedItem.seller_country}
      itemId={selectedItem.id}
      itemTitle={selectedItem.title}
    />

    {/* 거래 상태 변경 & 끌올 모달 */}
    <KMarketStatusActionModal
      isOpen={showStatusModal}
      onClose={() => setShowStatusModal(false)}
      item={selectedItem}
      onUpdateStatus={(status, targetId, targetName) => {
        updateItemStatus(selectedItem.id, status, targetId, targetName);
      }}
      onBoostItem={(newPrice) => {
        boostItem(selectedItem.id, newPrice);
      }}
      onOpenReviewModal={(targetId, targetName) => {
        handleOpenReviewModal(targetId, targetName);
      }}
    />

    {/* 🚫 불량 매물/사용자 차단 및 신고 모달 */}
    <KMarketReportBlockModal
      isOpen={showReportModal}
      onClose={() => setShowReportModal(false)}
      targetUserId={selectedItem.seller_id}
      targetUserName={selectedItem.seller_name}
      itemId={selectedItem.id}
      itemTitle={selectedItem.title}
      onConfirmReport={(report) => {
        reportUser(report);
        alert(`[신고 접수 완료] "${selectedItem.seller_name}" 회원이 차단 및 신고 처리되었습니다.`);
        setSelectedItem(null);
      }}
    />
  </>
  );
}


