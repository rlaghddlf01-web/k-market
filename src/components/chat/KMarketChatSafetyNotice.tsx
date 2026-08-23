'use client';

import React from 'react';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import { LanguageCode } from '@/types/kmarket';
import { getChatSafetyPolicyI18n } from '@/lib/antiScamTranslations';

import { useLanguage } from '@/context/LanguageContext';

interface KMarketChatSafetyNoticeProps {
  currentLang?: LanguageCode;
}

export default function KMarketChatSafetyNotice({
  currentLang = 'ko',
}: KMarketChatSafetyNoticeProps) {
  const { t } = useLanguage();
  const policy = getChatSafetyPolicyI18n(currentLang);

  return (
    <div className="mx-3 my-2 p-3 bg-slate-900 text-white rounded-2xl shadow-sm border border-slate-800 space-y-1.5 animate-in fade-in duration-300">
      <div className="flex items-center justify-between gap-1.5 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs font-black text-amber-300">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{policy.badge}</span>
        </div>
        <span className="text-[9px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
          {t('24시간 AI 안심 자동 보안')}
        </span>
      </div>

      <p className="text-[11px] leading-relaxed text-slate-200 font-medium">
        {policy.text}
      </p>
    </div>
  );
}
