'use client';

import { useLanguage } from '@/context/LanguageContext';
import React from 'react';
import { ShieldAlert, AlertTriangle, ExternalLink, Flag } from 'lucide-react';
import { LanguageCode } from '@/types/kmarket';
import { ScamThreatType, getScamWarningI18n } from '@/lib/antiScamTranslations';

interface KMarketScamInterventionBannerProps {
  threatType: ScamThreatType;
  currentLang?: LanguageCode;
  onReportClick?: () => void;
}

export default function KMarketScamInterventionBanner({
  threatType,
  currentLang = 'ko',
  onReportClick,
}: KMarketScamInterventionBannerProps) {
  const { t } = useLanguage();
  const content = getScamWarningI18n(threatType, currentLang);
  const isDanger = threatType === 'prepayment_wire' || threatType === 'giftcard_fake_link';

  return (
    <div
      className={`mx-3 my-2.5 p-3.5 rounded-2xl border shadow-md transition-all animate-in fade-in slide-in-from-top-2 duration-300 ${
        isDanger
          ? 'bg-rose-50/95 border-rose-300 text-rose-950 ring-2 ring-rose-500/20'
          : 'bg-amber-50/95 border-amber-300 text-amber-950 ring-2 ring-amber-500/20'
      }`}
    >
      <div className="flex items-start gap-2.5">
        <div
          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
            isDanger ? 'bg-rose-600 text-white animate-bounce' : 'bg-amber-500 text-white'
          }`}
        >
          {isDanger ? <ShieldAlert className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
        </div>

        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center justify-between gap-1 flex-wrap">
            <h4 className="text-xs font-black tracking-tight flex items-center gap-1 leading-snug">
              <span>{content.title}</span>
            </h4>
            <span
              className={`text-[9px] px-1.5 py-0.5 rounded-full font-black uppercase tracking-wider shrink-0 ${
                isDanger ? 'bg-rose-200 text-rose-800' : 'bg-amber-200 text-amber-900'
              }`}
            >
              AI Security Shield
            </span>
          </div>

          <p className="text-[11px] leading-relaxed font-medium opacity-90">
            {content.description}
          </p>

          <div className="pt-2 flex items-center justify-between gap-2 border-t border-rose-200/60 mt-2">
            <span className="text-[10px] font-bold text-slate-600 flex items-center gap-1">
              <span>🛡️ {content.actionText}</span>
            </span>

            {onReportClick && (
              <button
                type="button"
                onClick={onReportClick}
                className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-black rounded-lg transition-all shadow-xs flex items-center gap-1 cursor-pointer"
              >
                <Flag className="w-3 h-3" />
                <span>{t('scam_report_btn')}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
