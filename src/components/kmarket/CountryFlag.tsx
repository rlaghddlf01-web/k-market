'use client';

import React, { useState } from 'react';

// 국가별 표준 국기 이미지 URL (FlagCDN 고화질 원형/사각 지원)
interface CountryFlagProps {
  countryCode?: string; // VN, MN, TH, NP, UZ, KH, LK, KR, MM, PH, ID, BD, CN, RU 등
  fallbackEmoji?: string; // 🇲🇳, 🇻🇳 등
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'rounded' | 'square';
  className?: string;
}

const SIZE_MAP = {
  xs: 'w-3.5 h-3.5 text-[10px]',
  sm: 'w-4 h-4 text-xs',
  md: 'w-5 h-5 text-sm',
  lg: 'w-7 h-7 text-lg',
  xl: 'w-10 h-10 text-2xl',
};

const IMG_SIZE_MAP = {
  xs: 'w-3.5 h-3.5',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-7 h-7',
  xl: 'w-10 h-10',
};

export default function CountryFlag({
  countryCode = 'KR',
  fallbackEmoji,
  size = 'sm',
  shape = 'circle',
  className = '',
}: CountryFlagProps) {
  const [hasError, setHasError] = useState(false);

  const cleanCode = countryCode.trim().toLowerCase();
  const flagUrl = `https://flagcdn.com/w40/${cleanCode}.png`;

  const shapeClass =
    shape === 'circle'
      ? 'rounded-full object-cover'
      : shape === 'rounded'
      ? 'rounded-xs object-cover'
      : 'rounded-none object-cover';

  if (hasError || !cleanCode) {
    return (
      <span className={`inline-flex items-center justify-center ${SIZE_MAP[size]} ${className}`}>
        {fallbackEmoji || countryCode.toUpperCase()}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 overflow-hidden shadow-2xs border border-black/10 dark:border-white/20 ${
        shape === 'circle' ? 'rounded-full' : 'rounded-xs'
      } ${IMG_SIZE_MAP[size]} ${className}`}
    >
      <img
        src={flagUrl}
        alt={countryCode}
        className={`w-full h-full ${shapeClass}`}
        onError={() => setHasError(true)}
        loading="lazy"
      />
    </span>
  );
}
