'use client';

import { useLanguage } from '@/context/LanguageContext';
import React from 'react';
import { ItemStatus } from '@/types/kmarket';
import { Sparkles, TrendingDown, Rocket, CheckCircle2, Clock } from 'lucide-react';

interface KMarketStatusBadgeProps {
  status: ItemStatus;
  isPriceDropped?: boolean;
  dropDiscountRate?: number;
  boostedAt?: string;
  className?: string;
}

export default function KMarketStatusBadge({
  status,
  isPriceDropped,
  dropDiscountRate,
  boostedAt,
  className = '',
}: KMarketStatusBadgeProps) {
  const { t } = useLanguage();
  // 1. 거래 완료 뱃지
  if (status === 'sold') {
    return (
      <div
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-600 text-white shadow-xs ${className}`}
      >
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span>{t('거래완료')}</span>
      </div>
    );
  }

  // 2. 예약중 뱃지
  if (status === 'reserved') {
    return (
      <div
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500 text-white shadow-xs animate-pulse ${className}`}
      >
        <Clock className="w-3.5 h-3.5" />
        <span>{t('안내 내용을 확인해 주세요')}</span>
      </div>
    );
  }

  // 3. 가격 인하 뱃지
  if (isPriceDropped) {
    return (
      <div
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-rose-500 text-white shadow-xs ${className}`}
      >
        <TrendingDown className="w-3.5 h-3.5" />
        <span>{dropDiscountRate ? `${dropDiscountRate}% ${t('특별 할인 혜택')}` : t('가격인하')}</span>
      </div>
    );
  }

  // 4. 끌올(Boost) 뱃지
  if (boostedAt) {
    return (
      <div
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500 text-white shadow-xs ${className}`}
      >
        <Rocket className="w-3 h-3" />
        <span>{t('게시글 상단으로 끌어올리기')}</span>
      </div>
    );
  }

  return null;
}
