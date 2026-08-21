'use client';

import React, { useState } from 'react';
import { KMarketItem, ItemStatus } from '@/types/kmarket';
import { useLanguage } from '@/context/LanguageContext';
import CountryFlag from './CountryFlag';
import {
  X,
  CheckCircle2,
  Clock,
  ShoppingBag,
  Rocket,
  UserCheck,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface KMarketStatusActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: KMarketItem;
  onUpdateStatus: (status: ItemStatus, targetUserId?: string, targetUserName?: string) => void;
  onBoostItem: (newPrice?: number) => void;
  onOpenReviewModal: (targetUserId: string, targetUserName: string) => void;
}

export default function KMarketStatusActionModal({
  isOpen,
  onClose,
  item,
  onUpdateStatus,
  onBoostItem,
  onOpenReviewModal,
}: KMarketStatusActionModalProps) {
  const { formatWon } = useLanguage();
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const selectedBuyer = {
    id: 'user-vn-1',
    name: 'Nguyen Van A (응우옌)',
    country: 'VN',
    flag: '🇻🇳',
  };

  if (!isOpen) return null;

  // 가격 인하 계산
  const discountedPrice = discountPercent > 0
    ? Math.round((item.price * (1 - discountPercent / 100)) / 1000) * 1000
    : item.price;

  // 1. 예약중으로 변경
  const handleSetReserved = () => {
    onUpdateStatus('reserved', selectedBuyer.id, selectedBuyer.name);
    onClose();
  };

  // 2. 거래 완료로 변경 & 후기 팝업
  const handleSetSold = () => {
    onUpdateStatus('sold', selectedBuyer.id, selectedBuyer.name);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
    onClose();
    // 자동으로 거래 후기 모달 팝업
    onOpenReviewModal(selectedBuyer.id, selectedBuyer.name);
  };

  // 3. 다시 판매중으로 변경
  const handleSetSelling = () => {
    onUpdateStatus('selling');
    onClose();
  };

  // 4. 끌어올리기 (Boost)
  const handleBoost = () => {
    const finalPrice = discountPercent > 0 ? discountedPrice : undefined;
    onBoostItem(finalPrice);
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 dark:border-gray-800 relative max-h-[90vh] overflow-y-auto space-y-6">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 헤더 */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>판매 매물 관리</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white pt-1">
            거래 상태 변경 & 끌어올리기
          </h2>
          <p className="text-xs text-gray-500 truncate">📦 {item.title}</p>
        </div>

        {/* 현재 상태 표시 & 변경 버튼 */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
            1. 거래 상태 변경
          </label>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={handleSetSelling}
              className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all ${
                item.status === 'selling'
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 font-bold'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="text-xs">판매중</span>
            </button>

            <button
              type="button"
              onClick={handleSetReserved}
              className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all ${
                item.status === 'reserved'
                  ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-700 font-bold'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Clock className="w-5 h-5" />
              <span className="text-xs">예약중</span>
            </button>

            <button
              type="button"
              onClick={handleSetSold}
              className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all ${
                item.status === 'sold'
                  ? 'border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 font-bold'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-xs">거래완료</span>
            </button>
          </div>

          {/* 거래 상대방 선택 */}
          <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 space-y-1.5 text-xs">
            <div className="flex items-center justify-between font-semibold text-gray-700 dark:text-gray-300">
              <span className="flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>거래 상대방 (구매자)</span>
              </span>
              <span className="text-[11px] text-emerald-600">최근 채팅 상대</span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <CountryFlag
                  countryCode={selectedBuyer.country}
                  fallbackEmoji={selectedBuyer.flag}
                  size="sm"
                  shape="circle"
                />
                <span className="font-bold text-gray-800 dark:text-gray-200">{selectedBuyer.name}</span>
              </div>
              <span className="text-[11px] bg-white dark:bg-gray-700 px-2 py-0.5 rounded-md text-gray-500">
                선택됨
              </span>
            </div>
            <p className="text-[10px] text-gray-400 pt-0.5">
              * [거래완료]를 누르면 이 구매자에게 자동으로 15개국어 거래후기 평가창이 팝업됩니다.
            </p>
          </div>
        </div>

        {/* 끌어올리기 (Boost) & 가격 인하 섹션 */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-indigo-900 dark:text-indigo-300">
              <Rocket className="w-4 h-4 text-indigo-600" />
              <span>🚀 피드 최상단 끌어올리기 (Boost)</span>
            </div>
            <span className="text-[10px] bg-indigo-600 text-white font-bold px-2 py-0.5 rounded-full">
              무료
            </span>
          </div>

          <p className="text-[11px] text-indigo-800/80 dark:text-indigo-300/80 leading-relaxed">
            매물을 목록 맨 위로 끌어올려 외국인 근로자들에게 다시 노출합니다. 가격을 10% 이상 할인하면 <strong>[가격인하 📉]</strong> 뱃지가 함께 부착되어 3배 빠르게 판매됩니다!
          </p>

          {/* 가격 할인 선택 옵션 */}
          <div className="space-y-1.5 pt-1">
            <label className="font-semibold text-gray-700 dark:text-gray-300 flex items-center justify-between">
              <span>가격 인하 선택 (선택 사항)</span>
              {discountPercent > 0 && (
                <span className="font-bold text-rose-600">
                  {formatWon(item.price)} ➔ {formatWon(discountedPrice)} ({discountPercent}% 할인)
                </span>
              )}
            </label>

            <div className="grid grid-cols-4 gap-1.5">
              {[0, 10, 20, 30].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setDiscountPercent(pct)}
                  className={`py-1.5 rounded-xl border font-bold text-xs transition-all ${
                    discountPercent === pct
                      ? 'border-rose-500 bg-rose-500 text-white'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {pct === 0 ? '가격 유지' : `-${pct}%`}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleBoost}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Rocket className="w-4 h-4" />
            <span>지금 끌어올리기 완료</span>
          </button>
        </div>
      </div>
    </div>
  );
}
