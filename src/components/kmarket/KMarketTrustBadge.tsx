'use client';

import { useLanguage } from '@/context/LanguageContext';
import React from 'react';
import { getMannerTempDetails } from '@/lib/trustData';
import { ShieldCheck, Home } from 'lucide-react';

interface KMarketTrustBadgeProps {
  mannerTemp?: number;
  tradeCount?: number;
  isVerifiedWorker?: boolean;
  isVerifiedDormitory?: boolean;
  variant?: 'compact' | 'detailed' | 'minimal';
  onClick?: () => void;
}

export default function KMarketTrustBadge({
  mannerTemp = 36.5,
  tradeCount = 0,
  isVerifiedWorker = true,
  isVerifiedDormitory = false,
  variant = 'compact',
  onClick,
}: KMarketTrustBadgeProps) {
  const { t } = useLanguage();
  const { color, barColor, faceEmoji, levelTitle } = getMannerTempDetails(mannerTemp);
  const percentage = Math.min(100, Math.max(10, ((mannerTemp - 30) / (60 - 30)) * 100));

  if (variant === 'minimal') {
    return (
      <div
        onClick={onClick}
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100/90 dark:bg-gray-800 ${color} ${
          onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
        }`}
      >
        <span>{faceEmoji}</span>
        <span>{mannerTemp.toFixed(1)}℃</span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div
        onClick={onClick}
        className={`flex items-center gap-2 text-xs ${
          onClick ? 'cursor-pointer group' : ''
        }`}
        title={`매너온도: ${mannerTemp.toFixed(1)}℃ (${levelTitle})`}
      >
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1">
            <span className={`font-bold ${color} group-hover:underline`}>
              {mannerTemp.toFixed(1)}℃
            </span>
            <span className="text-sm">{faceEmoji}</span>
          </div>
          <div className="w-14 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-0.5">
            <div
              className={`h-full ${barColor} transition-all duration-500`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  // detailed variant
  return (
    <div
      onClick={onClick}
      className={`p-3 rounded-2xl bg-gray-50/80 dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/60 ${
        onClick ? 'cursor-pointer hover:border-emerald-500/50 transition-all' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            {t('auto_ui_207')}
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className={`text-base font-extrabold ${color}`}>
              {mannerTemp.toFixed(1)}℃
            </span>
            <span className="text-base">{faceEmoji}</span>
            <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium shadow-xs">
              {levelTitle}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[11px] text-gray-500 dark:text-gray-400">{t('auto_ui_356')}</div>
          <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-1.5">
            <div
              className={`h-full ${barColor} transition-all duration-500`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* 인증 뱃지 바 */}
      <div className="flex items-center gap-2 mt-2.5 pt-2 border-t border-gray-200/60 dark:border-gray-700/60 text-[11px]">
        {isVerifiedWorker && (
          <div className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t('auto_ui_357')}</span>
          </div>
        )}
        {isVerifiedDormitory && (
          <div className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-md">
            <Home className="w-3.5 h-3.5" />
            <span>{t('auto_ui_358')}</span>
          </div>
        )}
      </div>
    </div>
  );
}
