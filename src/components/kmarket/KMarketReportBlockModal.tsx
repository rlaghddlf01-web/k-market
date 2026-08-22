'use client';

import React, { useState } from 'react';
import { ReportReasonType, UserReportData } from '@/types/kmarket';
import {
  Ban,
  ShieldAlert,
  X,
  CheckCircle2,
  FileWarning,
  MessageSquareX,
  PackageX,
  Clock,
  HelpCircle,
  EyeOff,
} from 'lucide-react';

interface KMarketReportBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUserId: string;
  targetUserName: string;
  targetUserCountry?: string;
  itemId?: string;
  itemTitle?: string;
  onConfirmReport: (report: UserReportData) => void;
}

const REPORT_REASONS: { type: ReportReasonType; label: string; desc: string; icon: React.ReactNode }[] = [
  {
    type: 'scam_fraud',
    label: '🚨 사기 의심 (선입금 / 외부 메신저 유도)',
    desc: '카톡/라인으로 유도하거나 계좌 선입금을 요구함',
    icon: <ShieldAlert className="w-4 h-4 text-red-600" />,
  },
  {
    type: 'nsfw_nudity',
    label: '🔞 음란물 / 선정적인 사진 / 성인물',
    desc: '노출이 심한 사진, 성인용품, 음란성 이미지 또는 성희롱 사진 게시',
    icon: <EyeOff className="w-4 h-4 text-pink-600" />,
  },
  {
    type: 'bad_manner_abuse',
    label: '🤬 비매너 / 욕설 / 성희롱 / 혐오 발언',
    desc: '채팅 중 모욕적이거나 불쾌한 언행을 함',
    icon: <MessageSquareX className="w-4 h-4 text-orange-600" />,
  },
  {
    type: 'fake_item_photos',
    label: '📦 허위 매물 / 가짜 사진 / 게시글과 다른 물건',
    desc: '실물과 사진이 완전히 다르거나 존재하지 않는 매물임',
    icon: <PackageX className="w-4 h-4 text-amber-600" />,
  },
  {
    type: 'prohibited_items',
    label: '🚫 판매 금지 품목 (주류, 담배, 의약품, 불법 알선)',
    desc: '국내 법률 및 K-Market 규정상 거래가 금지된 품목임',
    icon: <Ban className="w-4 h-4 text-rose-600" />,
  },
  {
    type: 'no_show_flake',
    label: '⏰ 직거래 약속 노쇼 (약속 장소에 안 나옴)',
    desc: '약속 시간에 연락 없이 나타나지 않아 피해를 입음',
    icon: <Clock className="w-4 h-4 text-indigo-600" />,
  },
  {
    type: 'other',
    label: '❓ 기타 사유 직접 입력',
    desc: '기타 비정상적인 거래 행위',
    icon: <HelpCircle className="w-4 h-4 text-slate-600" />,
  },
];

export default function KMarketReportBlockModal({
  isOpen,
  onClose,
  targetUserId,
  targetUserName,
  itemId,
  itemTitle,
  onConfirmReport,
}: KMarketReportBlockModalProps) {
  const [selectedReason, setSelectedReason] = useState<ReportReasonType>('scam_fraud');
  const [details, setDetails] = useState('');
  const [alsoBlockUser, setAlsoBlockUser] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const report: UserReportData = {
      id: 'rep-' + Date.now(),
      reporter_id: 'current-user',
      reporter_name: '나 (User)',
      target_user_id: targetUserId,
      target_user_name: targetUserName,
      item_id: itemId,
      item_title: itemTitle,
      reason_type: selectedReason,
      details: details.trim(),
      block_user: alsoBlockUser,
      created_at: new Date().toISOString(),
    };

    onConfirmReport(report);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-gray-800 flex flex-col max-h-[92vh]">
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center text-white shadow-inner">
              <FileWarning className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <div className="inline-flex items-center space-x-1.5 bg-black/20 px-2.5 py-0.5 rounded-full text-xs font-bold text-red-100 mb-0.5">
                <span>클린 K-Market 안전 신고 센터</span>
              </div>
              <h2 className="text-xl font-black tracking-tight">
                사용자 차단 및 불량 신고
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 폼 본문 */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 flex-1 text-xs sm:text-sm">
          {/* 신고 대상 안내 */}
          <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 flex items-center justify-between">
            <div className="truncate">
              <span className="text-[11px] text-red-600 dark:text-red-400 font-bold block">
                신고 및 차단 대상 회원:
              </span>
              <h4 className="font-extrabold text-slate-900 dark:text-white text-sm truncate">
                {targetUserName}
              </h4>
              {itemTitle && (
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  관련 매물: {itemTitle}
                </p>
              )}
            </div>
            <Ban className="w-8 h-8 text-red-500 shrink-0 opacity-80" />
          </div>

          {/* 1. 신고 사유 선택 */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
              1. 신고 사유를 선택해 주세요
            </label>
            <div className="space-y-1.5">
              {REPORT_REASONS.map((reason) => {
                const isSelected = selectedReason === reason.type;
                return (
                  <button
                    key={reason.type}
                    type="button"
                    onClick={() => setSelectedReason(reason.type)}
                    className={`w-full p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-red-500 bg-red-50/80 dark:bg-red-950/40 text-red-950 dark:text-red-200 font-bold ring-2 ring-red-500/20'
                        : 'border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start space-x-2.5 truncate">
                      <span className="shrink-0 mt-0.5">{reason.icon}</span>
                      <div className="truncate">
                        <span className="text-xs font-bold block truncate">{reason.label}</span>
                        <span className="text-[10px] text-slate-400 block truncate mt-0.5">
                          {reason.desc}
                        </span>
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. 상세 설명 입력 */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
              2. 상세 내용 (선택 사항)
            </label>
            <textarea
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="구체적인 상황을 적어주시면 안전 운영팀이 신속히 조사 후 제재합니다."
              className="w-full p-3 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 text-xs focus:bg-white focus:border-red-500 focus:outline-none leading-relaxed"
            />
          </div>

          {/* 3. 이 사용자 즉시 차단하기 체크박스 */}
          <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-full bg-red-600/10 flex items-center justify-center text-red-600">
                <Ban className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  🚫 이 사용자 즉시 차단하기
                </span>
                <span className="text-[10px] text-slate-500">
                  차단 시 이 회원의 매물과 메시지가 나에게 더 이상 보이지 않습니다.
                </span>
              </div>
            </div>

            <input
              type="checkbox"
              checked={alsoBlockUser}
              onChange={(e) => setAlsoBlockUser(e.target.checked)}
              className="w-4 h-4 text-red-600 rounded-md focus:ring-red-500 cursor-pointer"
            />
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:to-rose-700 text-white font-black text-sm sm:text-base rounded-2xl shadow-xl shadow-red-600/25 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <ShieldAlert className="w-5 h-5" />
            <span>신고 접수 및 차단하기</span>
          </button>
        </form>
      </div>
    </div>
  );
}
