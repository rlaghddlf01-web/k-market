'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useState } from 'react';
import { useCommunity } from '@/context/CommunityContext';
import { X, ShieldAlert, CheckCircle, AlertTriangle } from 'lucide-react';

const REPORT_REASONS = [
  { id: 'nsfw', label: '🔞 음란물 / 선정적인 사진 / 성인물' },
  { id: 'spam', label: '🚫 불법 광고 / 스팸 / 도박 홍보' },
  { id: 'abuse', label: '🤬 욕설 / 혐오 발언 / 비매너 / 성희롱' },
  { id: 'illegal', label: '⚠️ 불법 취업 알선 / 브로커 / 사기 의심' },
  { id: 'fake', label: '📢 거짓 정보 / 허위 사실 유포' },
  { id: 'other', label: '기타 사유' },
];

export default function KMarketCommunityReportModal() {
  const { t } = useLanguage();
  const { isReportModalOpen, setIsReportModalOpen, reportTarget, reportContent } = useCommunity();
  const [selectedReason, setSelectedReason] = useState('spam');
  const [detail, setDetail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isReportModalOpen || !reportTarget) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const ok = await reportContent(selectedReason, detail);
    setIsSubmitting(false);
    if (ok) {
      alert('신고가 정상 접수되었습니다. 해당 게시물/댓글은 즉시 숨김 처리되었습니다.');
      setDetail('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 dark:border-gray-800 relative space-y-4">
        <button
          onClick={() => setIsReportModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-rose-600">
          <ShieldAlert className="w-6 h-6" />
          <h3 className="text-base font-black">{t('auto_ui_35')}</h3>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          신고된 내용은 24시간 관리자 관제 센터로 즉시 전송되며, 검토 후 해당 사용자는 영구 퇴출 처리됩니다.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {t('report_reason_label')}
            </label>
            <div className="space-y-1">
              {REPORT_REASONS.map((r) => (
                <label
                  key={r.id}
                  className={`flex items-center gap-2 p-2 rounded-xl text-xs font-medium cursor-pointer border transition-all ${
                    selectedReason === r.id
                      ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 text-rose-700 dark:text-rose-300 font-bold'
                      : 'bg-slate-50 dark:bg-gray-800 border-slate-200 dark:border-gray-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="reason"
                    value={r.id}
                    checked={selectedReason === r.id}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="accent-rose-600"
                  />
                  <span>{r.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              상세 사유 (선택)
            </label>
            <textarea
              rows={2}
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder={t('auto_ui_36')}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-xs text-slate-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? '접수 중...' : '🚨 신고 접수 및 차단'}
          </button>
        </form>
      </div>
    </div>
  );
}
