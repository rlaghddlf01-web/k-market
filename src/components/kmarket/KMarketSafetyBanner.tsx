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
                  🛡️ {t('외국인 안심 거래 쉴드')}
                </span>
              </div>
              <p className="text-xs font-bold text-[#1f1914] mt-1">
                {t('선입금 요구는 99% 사기! 반드시 현장에서 물건 확인 후 결제하세요.')}
              </p>
            </div>
          </div>

          {/* 우측 3대 수칙 퀵 요약 & 화살표 */}
          <div className="flex items-center space-x-2 self-end sm:self-auto shrink-0">
            <span className="text-xs font-bold text-[#845b37] group-hover:underline flex items-center gap-0.5">
              <span>{t('3대 안심 수칙 보기')}</span>
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
                    {t('외국인 안심 직거래 3대 안전 수칙')}
                  </h3>
                  <p className="text-xs text-emerald-100">
                    {t('케이마켓 회원 보호 및 사기 범죄 원천 차단 가이드')}
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
                    <span>{t('선입금 및 예약금 요구는 99% 사기입니다')}</span>
                  </h4>
                  <p className="text-rose-900/80 dark:text-rose-300/80 text-xs leading-relaxed">
                    {t('선입금 및 예약금 요구는 대표적인 사기 수법입니다.')} <strong>{t('직접 만나서 물건 상태를 확인한 후')}</strong> {t('대금을 지급하세요.')}
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
                    <span>{t('카카오톡/라인 등 외부 메신저 유도를 거절하세요')}</span>
                  </h4>
                  <p className="text-amber-900/80 dark:text-amber-300/80 text-xs leading-relaxed">
                    {t('외부 메신저로 대화할 경우 사기 피해 발생 시 증거 확보 및 구제가 어렵습니다. 반드시 케이마켓의 안심 자동 번역 채팅방 안에서만 안전하게 거래를 진행하세요.')} <strong>{t('17개국어 실시간 안심 번역 채팅')}</strong> {t('반드시 케이마켓의 안심 자동 번역 채팅방 안에서만 안전하게 거래를 진행하세요.')}
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
                    <span>{t('가로등과 폐쇄회로 카메라가 있는 안전한 안심존에서 만나세요')}</span>
                  </h4>
                  <p className="text-blue-900/80 dark:text-blue-300/80 text-xs leading-relaxed">
                    {t('인적이 드문 골목보다 편의점 앞, 밝은 지하철 출구 등 안전한 랜드마크 지도 핀을 만남 장소로 잡으세요.')} <strong>{t('역 앞 편의점, 동네 랜드마크, 공공장소 앞')}</strong> {t('편의점 앞, 밝은 지하철 출구 등 안전한 랜드마크 지도 핀을 만남 장소로 잡으세요.')}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowDetailModal(false)}
                className="w-full py-3.5 bg-slate-900 hover:bg-black text-white font-black text-sm rounded-2xl shadow-lg transition-all cursor-pointer"
              >
                {t('안내 내용을 모두 확인했습니다')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
