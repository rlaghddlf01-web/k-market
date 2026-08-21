'use client';

import React, { useState } from 'react';
import { UserReportData } from '@/types/kmarket';
import {
  ShieldAlert,
  X,
  Ban,
  Trash2,
  Clock,
  ShieldCheck,
} from 'lucide-react';

interface KMarketAdminReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function KMarketAdminReportModal({
  isOpen,
  onClose,
}: KMarketAdminReportModalProps) {
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'resolved'>('all');

  // 관리자 샘플 신고 큐 데이터
  const [reports, setReports] = useState<
    (UserReportData & { status: 'pending' | 'banned' | 'suspended' | 'dismissed' | 'resolved' })[]
  >([
    {
      id: 'rep-101',
      reporter_id: 'user-kr-9',
      reporter_name: '김철수 (대한민국)',
      target_user_id: 'user-fake-1',
      target_user_name: 'Nguyen Van A (베트남)',
      item_id: 'item-fake-1',
      item_title: '아이폰 15 프로 미개봉 (10만원 헐값)',
      reason_type: 'scam_fraud',
      details: '카카오톡으로 먼저 5만원 입금하면 택배로 보내준다고 유도함. 전형적인 선입금 사기 의심.',
      block_user: true,
      status: 'pending',
      created_at: '방금 전 (10분 전)',
    },
    {
      id: 'rep-102',
      reporter_id: 'user-vn-3',
      reporter_name: 'Lê Thị Mai (베트남)',
      target_user_id: 'user-bad-2',
      target_user_name: 'Somchai (태국)',
      item_id: 'item-2',
      item_title: '쿠쿠 전기밥솥 6인용',
      reason_type: 'no_show_flake',
      details: '포승공단 GS25 앞에서 19시에 만나기로 약속해놓고 1시간 동안 나타나지 않고 연락 두절됨.',
      block_user: true,
      status: 'pending',
      created_at: '1시간 전',
    },
    {
      id: 'rep-103',
      reporter_id: 'user-mn-2',
      reporter_name: 'Batbayar (몽골)',
      target_user_id: 'user-bad-3',
      target_user_name: 'John Doe (필리핀)',
      item_id: 'item-3',
      item_title: '중고 자전거 26인치',
      reason_type: 'bad_manner_abuse',
      details: '네고 거절하자 채팅으로 심한 욕설과 비속어를 사용함.',
      block_user: true,
      status: 'resolved',
      created_at: '어제',
    },
  ]);

  if (!isOpen) return null;

  // 관리자 제재 액션 실행
  const handleAdminAction = (
    reportId: string,
    action: 'ban' | 'suspend' | 'delete_item' | 'dismiss'
  ) => {
    setReports((prev) =>
      prev.map((rep) => {
        if (rep.id === reportId) {
          if (action === 'ban') {
            alert(`[관리자 승인] "${rep.target_user_name}" 회원이 [플랫폼 영구 제재] 처리되었습니다.\n- 모든 매물 즉시 비공개\n- 로그인 및 1:1 채팅 차단`);
            return { ...rep, status: 'banned' };
          }
          if (action === 'suspend') {
            alert(`[관리자 승인] "${rep.target_user_name}" 회원이 [7일 거래 정지] 처리되었습니다.`);
            return { ...rep, status: 'suspended' };
          }
          if (action === 'delete_item') {
            alert(`[관리자 승인] 불량 매물 "${rep.item_title}" 이(가) 강제 삭제되었습니다.`);
            return { ...rep, status: 'resolved' };
          }
          if (action === 'dismiss') {
            alert(`[관리자 기각] 허위 신고로 확인되어 해당 건을 기각 처리했습니다.`);
            return { ...rep, status: 'dismissed' };
          }
        }
        return rep;
      })
    );
  };

  const filteredReports = reports.filter((rep) => {
    if (filterStatus === 'pending') return rep.status === 'pending';
    if (filterStatus === 'resolved') return rep.status !== 'pending';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-gray-800 flex flex-col max-h-[92vh]">
        {/* 관리자 헤더 */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-5 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 shadow-inner">
              <ShieldAlert className="w-6 h-6 text-red-400 animate-pulse" />
            </div>
            <div>
              <div className="inline-flex items-center space-x-1.5 bg-red-500/20 px-2.5 py-0.5 rounded-full text-xs font-bold text-red-300 mb-0.5 border border-red-500/30">
                <span>KTRS K-Market 안전 관리자 관제 콘솔</span>
              </div>
              <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
                <span>신고 접수 내역 & 회원 제재 관리</span>
                <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-mono">
                  미처리 {reports.filter((r) => r.status === 'pending').length}건
                </span>
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 필터 탭 바 */}
        <div className="p-3 bg-slate-100 dark:bg-gray-800 border-b border-slate-200 dark:border-gray-700 flex items-center justify-between gap-2 shrink-0 text-xs">
          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                filterStatus === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              전체 보기 ({reports.length})
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                filterStatus === 'pending'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-white text-red-600 hover:bg-red-50'
              }`}
            >
              🚨 미처리 대기중 ({reports.filter((r) => r.status === 'pending').length})
            </button>
            <button
              onClick={() => setFilterStatus('resolved')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                filterStatus === 'resolved'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              ✅ 조치 완료 ({reports.filter((r) => r.status !== 'pending').length})
            </button>
          </div>

          <span className="text-[11px] text-slate-500 hidden sm:inline">
            관리자 확인 후 플랫폼 영구 제재 시 즉시 로그인 및 거래가 차단됩니다.
          </span>
        </div>

        {/* 신고 접수 리스트 */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs sm:text-sm">
          {filteredReports.length === 0 ? (
            <div className="py-16 text-center text-slate-400 space-y-2">
              <ShieldCheck className="w-12 h-12 text-emerald-500 mx-auto opacity-70" />
              <h4 className="font-bold text-slate-700 dark:text-slate-300">
                현재 대기 중인 신고 건이 없습니다.
              </h4>
              <p className="text-xs text-slate-400">
                모든 회원이 안전하게 거래 중입니다.
              </p>
            </div>
          ) : (
            filteredReports.map((rep) => {
              const isPending = rep.status === 'pending';

              return (
                <div
                  key={rep.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                    isPending
                      ? 'border-red-300 dark:border-red-900 bg-red-50/40 dark:bg-red-950/20'
                      : 'border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-800/60 opacity-80'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/80 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-black ${
                          rep.status === 'pending'
                            ? 'bg-red-600 text-white animate-pulse'
                            : rep.status === 'banned'
                            ? 'bg-slate-900 text-red-400'
                            : 'bg-emerald-600 text-white'
                        }`}
                      >
                        {rep.status === 'pending'
                          ? '🚨 심사 대기'
                          : rep.status === 'banned'
                          ? '🚫 영구 제재됨'
                          : rep.status === 'suspended'
                          ? '⚠️ 7일 정지'
                          : '✅ 기각/완료'}
                      </span>

                      <span className="font-bold text-slate-800 dark:text-slate-200 text-xs">
                        신고 접수 번호: #{rep.id}
                      </span>
                      <span className="text-[11px] text-slate-400">({rep.created_at})</span>
                    </div>

                    <div className="text-[11px] text-slate-500">
                      신고자: <strong>{rep.reporter_name}</strong>
                    </div>
                  </div>

                  {/* 신고 내용 상세 박스 */}
                  <div className="py-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <div className="text-xs">
                        <span className="text-slate-500">피신고 대상자: </span>
                        <strong className="text-red-600 font-bold text-sm">
                          {rep.target_user_name}
                        </strong>
                      </div>
                      {rep.item_title && (
                        <div className="text-xs text-slate-700 dark:text-slate-300">
                          <span className="text-slate-500">관련 매물: </span>
                          <span className="font-semibold underline">{rep.item_title}</span>
                        </div>
                      )}
                    </div>

                    <div className="p-3 bg-white dark:bg-gray-900 rounded-xl border border-slate-200 dark:border-gray-700 space-y-1">
                      <span className="text-[11px] font-bold text-red-600 block">
                        신고 사유: {rep.reason_type}
                      </span>
                      <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                        "{rep.details}"
                      </p>
                    </div>
                  </div>

                  {/* 관리자 제재 액션 툴바 */}
                  {isPending && (
                    <div className="pt-3 border-t border-slate-200/80 dark:border-gray-700 flex flex-wrap items-center justify-end gap-2">
                      <button
                        onClick={() => handleAdminAction(rep.id, 'dismiss')}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                      >
                        신고 기각 (무혐의)
                      </button>

                      <button
                        onClick={() => handleAdminAction(rep.id, 'delete_item')}
                        className="px-3 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>매물 강제 삭제</span>
                      </button>

                      <button
                        onClick={() => handleAdminAction(rep.id, 'suspend')}
                        className="px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>7일 이용 정지</span>
                      </button>

                      <button
                        onClick={() => handleAdminAction(rep.id, 'ban')}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-xl transition-all shadow-md shadow-red-600/30 flex items-center gap-1.5 cursor-pointer"
                      >
                        <Ban className="w-4 h-4" />
                        <span>🚨 플랫폼 영구 제재 (Ban)</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
