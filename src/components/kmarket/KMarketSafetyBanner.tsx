'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  MessageCircle,
  MapPin,
  ChevronRight,
  X,
} from 'lucide-react';

export default function KMarketSafetyBanner() {
  const { t } = useLanguage();
  const [showDetailModal, setShowDetailModal] = useState(false);

  return (
    <>
      <div className="w-full my-3">
        <div
          onClick={() => setShowDetailModal(true)}
          className="group p-4 rounded-2xl border cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all duration-300 shadow-2xs hover:shadow-xs"
          style={{
            background: '#f4ede6',
            borderColor: '#ded1c4',
          }}
        >
          {/* 좌측 아이콘 & 헤드라인 */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-[#dfd3c7] border border-[#cfc1b3] flex items-center justify-center text-[#5c4a39] shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#845b37]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-[#5c4a39] uppercase tracking-wider bg-[#e5dad0] px-2 py-0.5 rounded-full border border-[#ded1c4]">
                  🛡️ {t('scam_bar_badge')}
                </span>
              </div>
              <p className="text-xs font-bold text-[#1f1914] mt-1">
                {t('scam_bar_desc')}
              </p>
            </div>
          </div>

          {/* 우측 3대 수칙 퀵 요약 & 화살표 */}
          <div className="flex items-center space-x-2 self-end sm:self-auto shrink-0">
            <span className="text-xs font-bold text-[#845b37] group-hover:underline flex items-center gap-0.5">
              <span>{t('auto_ui_251')}</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </div>

      {/* 안심 거래 3대 수칙 상세 팝업 모달 */}
      {showDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-gray-800 flex flex-col max-h-[90vh]">
            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 p-5 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                  <ShieldCheck className="w-6 h-6 text-yellow-300" />
                </div>
                <div>
                  <h3 className="text-lg font-black tracking-tight">
                    {t('safety_modal_title')}
                  </h3>
                  <p className="text-xs text-emerald-100">
                    {t('safety_modal_subtitle')}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs sm:text-sm">
              {/* 1. 선입금 금지 */}
              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-600 font-black shrink-0">
                  1
                </div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-rose-950 dark:text-rose-200 text-sm flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>{t('auto_ui_252')}</span>
                  </h4>
                  <p className="text-rose-900/80 dark:text-rose-300/80 text-xs leading-relaxed">
                    {t('safety_rule_1_desc')} <strong>{t('auto_ui_253')}</strong> {t('safety_rule_1_desc_tail')}
                  </p>
                </div>
              </div>

              {/* 2. 외부 메신저 거절 */}
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-600 font-black shrink-0">
                  2
                </div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-amber-950 dark:text-amber-200 text-sm flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-amber-600" />
                    <span>{t('auto_ui_254')}</span>
                  </h4>
                  <p className="text-amber-900/80 dark:text-amber-300/80 text-xs leading-relaxed">
                    {t('safety_rule_2_desc')} <strong>{t('auto_ui_255')}</strong> {t('safety_rule_2_desc_tail')}
                  </p>
                </div>
              </div>

              {/* 3. 공단 랜드마크 핀 활용 */}
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-600 font-black shrink-0">
                  3
                </div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-blue-950 dark:text-blue-200 text-sm flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>{t('auto_ui_256')}</span>
                  </h4>
                  <p className="text-blue-900/80 dark:text-blue-300/80 text-xs leading-relaxed">
                    {t('safety_rule_3_desc')} <strong>{t('auto_ui_257')}</strong> {t('safety_rule_3_desc_tail')}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowDetailModal(false)}
                className="w-full py-3.5 bg-slate-900 hover:bg-black text-white font-black text-sm rounded-2xl shadow-lg transition-all cursor-pointer"
              >
                {t('btn_confirm')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
