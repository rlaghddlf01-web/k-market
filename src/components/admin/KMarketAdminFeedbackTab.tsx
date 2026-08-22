'use client';

import React, { useState, useEffect } from 'react';
import { Lightbulb, Sparkles, MapPin, ShieldAlert, Wallet, Bug, CheckCircle2, Clock, Trash2, Filter } from 'lucide-react';
import { FeedbackItem, FeedbackCategory } from '@/types/kmarket';

const CATEGORY_LABEL_MAP: Partial<Record<FeedbackCategory, { label: string; icon: string; color: string }>> = {
  translation_error: { label: '🌐 번역/언어 오류', icon: '🌐', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  location_request: { label: '📍 공단/장소 추가', icon: '📍', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  security_improve: { label: '🛡️ 사기방지 개선', icon: '🛡️', color: 'bg-rose-100 text-rose-800 border-rose-200' },
  finance_service: { label: '💰 세무/금융 요청', icon: '💰', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  bug_report: { label: '📱 화면 렉/버그', icon: '📱', color: 'bg-red-100 text-red-800 border-red-200' },
  general_suggestion: { label: '💬 기타 자유 건의', icon: '💬', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  bug: { label: '📱 화면 렉/버그', icon: '📱', color: 'bg-red-100 text-red-800 border-red-200' },
  feature: { label: '✨ 기능 제안', icon: '✨', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  praise: { label: '❤️ 칭찬/응원', icon: '❤️', color: 'bg-pink-100 text-pink-800 border-pink-200' },
  other: { label: '💬 기타 자유 건의', icon: '💬', color: 'bg-gray-100 text-gray-800 border-gray-200' },
};

export default function KMarketAdminFeedbackTab() {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // 로컬스토리지에서 실제 유저 피드백 로드 (가짜 목데이터 없음 / 0건 시작)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = JSON.parse(localStorage.getItem('kmarket_feedbacks') || '[]');
        setFeedbacks(stored);
      } catch (err) {
        console.error('Failed to load feedbacks', err);
      }
    }
  }, []);

  const handleUpdateStatus = (id: string, newStatus: 'pending' | 'reviewing' | 'resolved') => {
    const updated = feedbacks.map((fb) => (fb.id === id ? { ...fb, status: newStatus } : fb));
    setFeedbacks(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('kmarket_feedbacks', JSON.stringify(updated));
    }
  };

  const handleDeleteFeedback = (id: string) => {
    const updated = feedbacks.filter((fb) => fb.id !== id);
    setFeedbacks(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('kmarket_feedbacks', JSON.stringify(updated));
    }
  };

  const filteredFeedbacks = filterCategory === 'all'
    ? feedbacks
    : feedbacks.filter((fb) => fb.category === filterCategory);

  return (
    <div className="space-y-6">
      {/* 1. 상단 통계 바 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl shadow-lg border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center shadow-xs">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
              <span>유저 피드백 &amp; 개선 제안 (VOC 관제)</span>
              <span className="text-xs bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full font-black">
                {feedbacks.length}건 접수
              </span>
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              외국인 유저들이 마이페이지에서 직접 남긴 건의사항 및 버그 제보를 실시간으로 모니터링합니다.
            </p>
          </div>
        </div>

        {/* 카테고리 필터 드롭다운 */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
          >
            <option value="all">전체 건의 유형 ({feedbacks.length})</option>
            <option value="translation_error">🌐 번역/언어 오류</option>
            <option value="location_request">📍 공단/장소 추가</option>
            <option value="security_improve">🛡️ 사기방지 개선</option>
            <option value="finance_service">💰 세무/금융 요청</option>
            <option value="bug_report">📱 화면 렉/버그</option>
            <option value="general_suggestion">💬 기타 자유 건의</option>
          </select>
        </div>
      </div>

      {/* 2. 피드백 목록 또는 0건 Empty State */}
      {filteredFeedbacks.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Lightbulb className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-800">
              현재 접수된 유저 개선 건의사항이 없습니다. (0건)
            </h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              외국인 유저가 마이페이지 내 [💡 앱 개선 제안하기]를 통해 의견을 남기면 이곳에 실시간으로 접수되어 나타납니다.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFeedbacks.map((fb) => {
            const catInfo = CATEGORY_LABEL_MAP[fb.category] || CATEGORY_LABEL_MAP.general_suggestion;
            return (
              <div
                key={fb.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-3.5 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-xl border ${catInfo?.color || 'bg-slate-100 text-slate-800'}`}>
                      {catInfo?.label || '피드백'}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(fb.created_at).toLocaleString()}</span>
                    </span>
                  </div>

                  {/* 건의 본문 내용 */}
                  <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    {fb.content}
                  </p>

                  {/* 작성자 및 연락처 */}
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
                    <span className="font-bold text-slate-700">
                      👤 {fb.user_name} ({fb.country})
                    </span>
                    {fb.contact_info && (
                      <span className="text-[11px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md font-bold">
                        연락처: {fb.contact_info}
                      </span>
                    )}
                  </div>
                </div>

                {/* 상태 관리 액션 바 */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(fb.id, 'pending')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                        fb.status === 'pending'
                          ? 'bg-amber-500 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      접수대기
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(fb.id, 'reviewing')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                        fb.status === 'reviewing'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      검토중
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(fb.id, 'resolved')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                        fb.status === 'resolved'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      반영완료
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteFeedback(fb.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                    title="피드백 삭제"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
