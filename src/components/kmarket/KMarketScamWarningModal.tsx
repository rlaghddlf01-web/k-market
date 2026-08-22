'use client';

import React from 'react';
import { ScamWarningInfo } from '@/lib/antiScamDetector';
import { useLanguage } from '@/context/LanguageContext';
import {
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  X,
  CheckCircle2,
} from 'lucide-react';

interface KMarketScamWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  scamInfo: ScamWarningInfo | null;
}

export default function KMarketScamWarningModal({
  isOpen,
  onClose,
  scamInfo,
}: KMarketScamWarningModalProps) {
  const { t } = useLanguage();
  const { currentLang } = useLanguage();

  if (!isOpen || !scamInfo) return null;

  const isDanger = scamInfo.alertLevel === 'danger';

  // 언어별 타이틀 및 설명 선택
  const title =
    currentLang === 'vi'
      ? scamInfo.titleVi
      : currentLang === 'ko'
      ? scamInfo.titleKo
      : scamInfo.titleEn;

  const description =
    currentLang === 'vi'
      ? scamInfo.descriptionVi
      : currentLang === 'ko'
      ? scamInfo.descriptionKo
      : scamInfo.descriptionEn;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border-2 border-red-500 flex flex-col">
        {/* 모달 헤더 (강렬한 레드/앰버 그라데이션) */}
        <div
          className={`p-5 text-white flex items-center justify-between ${
            isDanger
              ? 'bg-gradient-to-r from-red-600 via-rose-600 to-red-700'
              : 'bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center text-white shadow-inner animate-pulse">
              <ShieldAlert className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-black/30 px-2 py-0.5 rounded-full text-yellow-300 border border-yellow-300/30">
                K-Market Anti-Scam Shield
              </span>
              <h3 className="text-lg font-black tracking-tight mt-0.5">
                사기 피해 주의 경고
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 모달 본문 */}
        <div className="p-5 space-y-4 text-xs sm:text-sm">
          {/* 감지된 위험 알림 박스 */}
          <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 space-y-2">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-red-950 dark:text-red-200 text-sm">
                  {title}
                </h4>
                <p className="text-red-900/80 dark:text-red-300/80 text-xs mt-1 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-red-200/60 dark:border-red-900/40 flex items-center justify-between text-[11px] text-red-700 dark:text-red-400 font-semibold">
              <span>{t('auto_ui_258')}</span>
              <span className="bg-red-200 dark:bg-red-900/60 px-2 py-0.5 rounded-md font-mono text-red-950 dark:text-red-200 font-bold">
                "{scamInfo.matchedKeyword}"
              </span>
            </div>
          </div>

          {/* K-Market 3대 안전 수칙 체크리스트 */}
          <div className="space-y-2">
            <span className="font-bold text-slate-800 dark:text-slate-200 text-xs block">
              {t('scam_warning_title')}
            </span>
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center space-x-2 bg-slate-50 dark:bg-gray-800 p-2.5 rounded-xl border border-slate-200/70">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>{t('auto_ui_259')}</strong> {t('auto_ui_260')}</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-50 dark:bg-gray-800 p-2.5 rounded-xl border border-slate-200/70">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>{t('auto_ui_261')}</strong> {t('auto_ui_262')}</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-50 dark:bg-gray-800 p-2.5 rounded-xl border border-slate-200/70">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>{t('auto_ui_263')}</strong> {t('auto_ui_264')}</span>
              </div>
            </div>
          </div>

          {/* 확인 버튼 */}
          <button
            onClick={onClose}
            className="w-full py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-black text-sm rounded-2xl shadow-xl shadow-red-600/25 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center space-x-2"
          >
            <ShieldCheck className="w-5 h-5 text-yellow-300" />
            <span>{t('auto_ui_265')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
