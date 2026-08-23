'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  Users,
  Package,
  DollarSign,
  TrendingUp,
  Ban,
  Trash2,
  Clock,
  ArrowLeft,
  Sparkles,
  MapPin,
  Building2,
} from 'lucide-react';
import { INITIAL_ITEMS } from '@/lib/mockData';
import { INITIAL_COMMUNITY_POSTS } from '@/lib/communityMockData';
import { KMarketItem, UserReportData } from '@/types/kmarket';
import { CommunityPost } from '@/types/community';
import { MessageSquareHeart, EyeOff, Lightbulb } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import KMarketAdminUsersTab from '@/components/admin/KMarketAdminUsersTab';
import KMarketAdminAnalyticsDashboard from '@/components/admin/KMarketAdminAnalyticsDashboard';
import KMarketAdminFeedbackTab from '@/components/admin/KMarketAdminFeedbackTab';

export default function KMarketAdminPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'reports' | 'community' | 'items' | 'users' | 'taxes' | 'feedback'>('overview');
  const [reportFilter, setReportFilter] = useState<'all' | 'pending' | 'resolved'>('all');
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);

  // 관리자 신고 리스트 상태 (실제 접수 시 실시간 누적, 초기 0건)
  const [reports, setReports] = useState<
    (UserReportData & { status: 'pending' | 'banned' | 'suspended' | 'dismissed' | 'resolved' })[]
  >([]);

  // 관리자 매물 리스트 상태 (실제 등록 매물)
  const [items, setItems] = useState<KMarketItem[]>(INITIAL_ITEMS);

  // KTRS 세금 환급 연계 신청 리스트 (실제 신청 시 실시간 누적, 초기 0건)
  const [taxLeads, setTaxLeads] = useState<
    {
      id: string;
      userName: string;
      country: string;
      workPeriod: string;
      salary: string;
      estimatedRefund: string;
      feeType: string;
      status: string;
      appliedAt: string;
    }[]
  >([]);

  // 관리자 신고 제재 액션
  const handleReportAction = (
    reportId: string,
    action: 'ban' | 'suspend' | 'delete_item' | 'dismiss'
  ) => {
    setReports((prev) =>
      prev.map((rep) => {
        if (rep.id === reportId) {
          if (action === 'ban') {
            alert(`[관리자 집행] "${rep.target_user_name}" 회원이 [플랫폼 전체 영구 제재] 처리되었습니다.`);
            return { ...rep, status: 'banned' };
          }
          if (action === 'suspend') {
            alert(`[관리자 집행] "${rep.target_user_name}" 회원이 [7일간 거래 정지] 처리되었습니다.`);
            return { ...rep, status: 'suspended' };
          }
          if (action === 'delete_item') {
            alert(`[관리자 집행] 불량 매물 "${rep.item_title}" 이(가) DB에서 강제 삭제되었습니다.`);
            setItems((curr) => curr.filter((i) => i.id !== rep.item_id));
            return { ...rep, status: 'resolved' };
          }
          if (action === 'dismiss') {
            alert(`[관리자 집행] 신고 사유가 불충분하여 기각 처리했습니다.`);
            return { ...rep, status: 'dismissed' };
          }
        }
        return rep;
      })
    );
  };

  // 매물 강제 삭제
  const handleDeleteItem = (itemId: string, title: string) => {
    if (confirm(t('정말로 해당 매물을 강제 삭제하시겠습니까?'))) {
      setItems((prev) => prev.filter((i) => i.id !== itemId));
      alert(t('매물이 안전하게 삭제되었습니다.'));
    }
  };

  // 커뮤니티 글 블라인드 (숨김) 처리
  const handleHideCommunityPost = (postId: string, title: string) => {
    if (confirm(t('해당 게시글을 커뮤니티 피드에서 [블라인드(숨김)] 처리하시겠습니까?'))) {
      setCommunityPosts((prev) => prev.filter((p) => p.id !== postId));
      alert(t('게시글이 즉시 블라인드 처리되었습니다.'));
    }
  };

  // 커뮤니티 악성 유저 영구 퇴출
  const handleBanCommunityUser = (userId: string, userName: string) => {
    if (confirm(t('해당 악성 회원을 [플랫폼 영구 퇴출 및 작성글 전체 삭제] 처리하시겠습니까?'))) {
      setCommunityPosts((prev) => prev.filter((p) => p.user_id !== userId));
      alert(t('[관리자 집행] 해당 회원이 영구 퇴출되었습니다.'));
    }
  };

  const pendingReportsCount = reports.filter((r) => r.status === 'pending').length;

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col font-sans">
      {/* 1. 상단 이지텍스 스타일 밝은 헤더 */}
      <header className="bg-white border-b border-slate-200/80 px-6 py-3.5 flex items-center justify-between sticky top-0 z-40 shadow-xs">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer border border-slate-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>K-Market 홈으로</span>
          </Link>

          <div className="h-5 w-px bg-slate-200" />

          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base font-black tracking-tight text-slate-900">
                  KTRS 이지텍스 관리자 관제 센터
                </h1>
                <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200">
                  관리자 콘솔
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-emerald-800 font-bold text-[11px]">실시간 관제 시스템 정상 가동중</span>
          </div>

          <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-xs shadow-xs">
            AD
          </div>
        </div>
      </header>

      {/* 2. 관리자 메인 레이아웃 (풀 와이드 100% 가로 확장) */}
      <div className="flex-1 flex w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 gap-6">
        {/* 좌측 밝은 네비게이션 사이드바 */}
        <aside className="w-64 shrink-0 space-y-2 hidden md:block">
          <nav className="space-y-1.5 bg-white p-3 rounded-3xl border border-slate-200/80 shadow-xs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <TrendingUp className="w-4 h-4" />
                <span>종합 운영 현황</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'reports'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/25'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <ShieldAlert className="w-4 h-4" />
                <span>신고 및 사기 관제</span>
              </div>
              {pendingReportsCount > 0 && (
                <span className="bg-rose-100 text-rose-700 border border-rose-200 text-[10px] font-black px-2 py-0.5 rounded-full">
                  {pendingReportsCount}
                </span>
              )}
            </button>

            {/* 🗣️ 동네생활 커뮤니티 관제 탭 */}
            <button
              onClick={() => setActiveTab('community')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'community'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <MessageSquareHeart className="w-4 h-4" />
                <span>동네생활 관제</span>
              </div>
              <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-full">
                {communityPosts.length}개
              </span>
            </button>

            <button
              onClick={() => setActiveTab('items')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'items'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Package className="w-4 h-4" />
                <span>중고 매물 관리</span>
              </div>
              <span className="text-[10px] text-slate-400 font-bold">{items.length}개</span>
            </button>

            <button
              onClick={() => setActiveTab('taxes')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'taxes'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/25'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <DollarSign className="w-4 h-4" />
                <span>KTRS 세금 환급 연계</span>
              </div>
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                0원 후불
              </span>
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'users'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Users className="w-4 h-4" />
                <span>외국인 회원 관리</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('feedback')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'feedback'
                  ? 'bg-indigo-900 text-amber-300 shadow-md shadow-indigo-900/30 ring-2 ring-amber-400/40'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>유저 피드백 / VOC</span>
              </div>
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                VOC
              </span>
            </button>
          </nav>

          {/* 안전 관제 현황 미니 카드 */}
          <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs text-xs space-y-2 mt-4">
            <span className="font-extrabold text-slate-900 block flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>실시간 AI 쉴드 상태</span>
            </span>
            <div className="flex justify-between text-slate-500 text-[11px] pt-1">
              <span>17개국어 번역 서버:</span>
              <span className="text-emerald-700 font-bold">정상 가동중 (0.3s)</span>
            </div>
            <div className="flex justify-between text-slate-500 text-[11px]">
              <span>사기 키워드 탐지:</span>
              <span className="text-emerald-700 font-bold">실시간 활성화</span>
            </div>
            <div className="flex justify-between text-slate-500 text-[11px]">
              <span>구글 맵 지오코딩:</span>
              <span className="text-emerald-700 font-bold">연동 완료</span>
            </div>
          </div>
        </aside>

        {/* 우측 메인 뷰 영역 */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* 모바일 탭 바 */}
          <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar md:hidden pb-1">
            {[
              { id: 'overview', label: '📊 종합' },
              { id: 'reports', label: `🚨 신고 (${pendingReportsCount})` },
              { id: 'community', label: `🗣️ 커뮤니티 (${communityPosts.length})` },
              { id: 'items', label: '📦 매물' },
              { id: 'taxes', label: '💰 세금환급' },
              { id: 'users', label: '👥 회원' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 1. 종합 운영 대시보드 탭 (Overview) */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* 📈 IR 피칭용 기간별 정밀 분석 & SNS 유입 추적 대시보드 */}
              <KMarketAdminAnalyticsDashboard />

              {/* 4대 주요 핵심 지표 카드 (이지텍스 밝은 카드 스타일) */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                    <span>총 등록 매물</span>
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Package className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-950">
                    {items.length}건
                  </div>
                  <span className="text-[11px] text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-md inline-block">
                    D-Day 무빙세일 4건 포함
                  </span>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                    <span>사기 신고/의심</span>
                    <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-rose-600">
                    {pendingReportsCount}건
                  </div>
                  <span className="text-[11px] text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded-md inline-block">
                    미처리 즉시 조치 대기중
                  </span>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                    <span>KTRS 세금 환급 연계</span>
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                      <DollarSign className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-600">
                    0원
                  </div>
                  <span className="text-[11px] text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded-md inline-block">
                    선결제 0원 후불 신청 대기
                  </span>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                    <span>외국인 이용 회원</span>
                    <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-purple-700">
                    0명
                  </div>
                  <span className="text-[11px] text-purple-800 font-bold bg-purple-50 px-2 py-0.5 rounded-md inline-block">
                    실시간 가입 회원 집계중
                  </span>
                </div>
              </div>

              {/* 공단별 직거래 현황 & 국적별 분포 (실제 데이터 0부터 집계) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3.5">
                  <h3 className="font-black text-sm text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#845b37]" />
                    <span>주요 외국인 공단별 거래 점유율</span>
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] font-bold text-slate-700 mb-1">
                        <span>경기 평택 포승국가산단</span>
                        <span className="text-[#845b37]">0% (0건)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="w-0 h-full bg-[#845b37] rounded-full" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] font-bold text-slate-700 mb-1">
                        <span>경기 안산 반월시화 / 원곡동</span>
                        <span className="text-[#845b37]">0% (0건)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="w-0 h-full bg-[#845b37] rounded-full" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] font-bold text-slate-700 mb-1">
                        <span>경기 화성 향남제약 / 마도</span>
                        <span className="text-[#845b37]">0% (0건)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="w-0 h-full bg-[#845b37] rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3.5">
                  <h3 className="font-black text-sm text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>외국인 근로자 국적별 거래 비중</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between font-bold">
                      <span className="text-slate-800">🇻🇳 베트남 (Vietnam)</span>
                      <strong className="text-[#845b37] font-black">0%</strong>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between font-bold">
                      <span className="text-slate-800">🇲🇳 몽골 (Mongolia)</span>
                      <strong className="text-[#845b37] font-black">0%</strong>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between font-bold">
                      <span className="text-slate-800">🇹🇭 태국 (Thailand)</span>
                      <strong className="text-[#845b37] font-black">0%</strong>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between font-bold">
                      <span className="text-slate-800">🇳🇵 네팔 (Nepal)</span>
                      <strong className="text-[#845b37] font-black">0%</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. 유저 피드백 / VOC 관제 탭 */}
          {activeTab === 'feedback' && <KMarketAdminFeedbackTab />}

          {/* 2. 불량 매물 & 사기 신고 관제 탭 (Reports) */}
          {activeTab === 'reports' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setReportFilter('all')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    reportFilter === 'all'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  전체 ({reports.length})
                </button>
                <button
                  onClick={() => setReportFilter('pending')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    reportFilter === 'pending'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-white text-rose-600 border border-slate-200'
                  }`}
                >
                  🚨 미처리 대기 ({pendingReportsCount})
                </button>
              </div>

              <div className="space-y-3">
                {reports.length === 0 ? (
                  <div className="p-12 text-center bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
                    <ShieldAlert className="w-10 h-10 text-emerald-500 mx-auto opacity-80" />
                    <h4 className="text-sm font-black text-slate-900">접수된 사기 및 불량 신고가 없습니다</h4>
                    <p className="text-xs text-slate-400">사용자가 신고 팝업을 통해 접수한 불량 사용자/매물 내역이 여기에 실시간 표시됩니다.</p>
                  </div>
                ) : (
                  reports
                    .filter((r) => (reportFilter === 'all' ? true : r.status === 'pending'))
                    .map((rep) => (
                      <div
                        key={rep.id}
                        className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                          <div className="flex items-center space-x-2">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                                rep.status === 'pending'
                                  ? 'bg-rose-500 text-white animate-pulse'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {rep.status === 'pending' ? '🚨 심사 대기' : '✅ 조치 완료'}
                            </span>
                            <span className="font-bold text-xs text-slate-800">신고번호: #{rep.id}</span>
                            <span className="text-[11px] text-slate-400">({rep.created_at})</span>
                          </div>
                          <span className="text-xs text-slate-500">
                            신고자: <strong>{rep.reporter_name}</strong>
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="text-slate-500">피신고 회원: </span>
                            <strong className="text-rose-600 text-sm font-bold">{rep.target_user_name}</strong>
                            {rep.item_title && (
                              <p className="text-slate-600 mt-1 font-semibold">관련 매물: {rep.item_title}</p>
                            )}
                          </div>
                          <div className="p-3 bg-rose-50/50 rounded-2xl border border-rose-100">
                            <span className="text-[11px] font-bold text-rose-700 block mb-1">
                              사유: {rep.reason_type}
                            </span>
                            <p className="text-slate-800 leading-relaxed font-medium">"{rep.details}"</p>
                          </div>
                        </div>

                        {rep.status === 'pending' && (
                          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2 flex-wrap">
                            <button
                              onClick={() => handleReportAction(rep.id, 'dismiss')}
                              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                            >
                              신고 기각 (무혐의)
                            </button>
                            <button
                              onClick={() => handleReportAction(rep.id, 'delete_item')}
                              className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-amber-600" />
                              <span>매물 강제 삭제</span>
                            </button>
                            <button
                              onClick={() => handleReportAction(rep.id, 'suspend')}
                              className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1 shadow-xs"
                            >
                              <Clock className="w-3.5 h-3.5" />
                              <span>7일 거래 정지</span>
                            </button>
                            <button
                              onClick={() => handleReportAction(rep.id, 'ban')}
                              className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black rounded-xl transition-all shadow-md shadow-rose-600/30 cursor-pointer flex items-center gap-1"
                            >
                              <Ban className="w-3.5 h-3.5" />
                              <span>🚨 플랫폼 영구 제재</span>
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                )}
              </div>
            </div>
          )}

          {/* 3. 동네생활 커뮤니티 관제 탭 (Community) */}
          {activeTab === 'community' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-sm text-slate-900 flex items-center gap-1.5">
                    <MessageSquareHeart className="w-4 h-4 text-indigo-600" />
                    <span>동네생활 등록 게시글 실시간 관제 ({communityPosts.length}개)</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    불법 홍보, 악플, 사기 의심 글을 원클릭으로 즉시 블라인드 처리하거나 작성자를 영구 퇴출할 수 있습니다.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-slate-200/80 bg-white shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3.5">카테고리 / 제목</th>
                      <th className="p-3.5">작성자 / 국적</th>
                      <th className="p-3.5">지역</th>
                      <th className="p-3.5">공감 / 댓글</th>
                      <th className="p-3.5">등록일시</th>
                      <th className="p-3.5 text-right">관리 조치</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {communityPosts.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-400 text-xs">
                          등록된 커뮤니티 게시글이 없습니다. (0개)
                        </td>
                      </tr>
                    ) : (
                      communityPosts.map((post) => (
                        <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5">
                            <div className="space-y-0.5">
                              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                                {post.category}
                              </span>
                              <p className="font-bold text-slate-900 truncate max-w-[240px]">
                                {post.title}
                              </p>
                            </div>
                          </td>
                          <td className="p-3.5 font-medium">
                            {post.user_name} ({post.user_flag})
                          </td>
                          <td className="p-3.5 text-slate-500">{post.region}</td>
                          <td className="p-3.5">
                            <span className="text-slate-600 font-bold">
                              ❤️ {post.like_count} • 💬 {post.comment_count}
                            </span>
                          </td>
                          <td className="p-3.5 text-slate-400 text-[11px]">
                            {new Date(post.created_at).toLocaleDateString()}
                          </td>
                          <td className="p-3.5 text-right space-x-1">
                            <button
                              onClick={() => handleHideCommunityPost(post.id, post.title)}
                              className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg font-bold text-[10px] transition-colors cursor-pointer inline-flex items-center gap-1"
                              title="커뮤니티에서 숨김 처리"
                            >
                              <EyeOff className="w-3 h-3 text-amber-600" />
                              <span>블라인드</span>
                            </button>
                            <button
                              onClick={() => handleBanCommunityUser(post.user_id, post.user_name)}
                              className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg font-bold text-[10px] transition-colors cursor-pointer inline-flex items-center gap-1"
                              title="유저 영구 퇴출"
                            >
                              <Ban className="w-3 h-3 text-rose-600" />
                              <span>퇴출</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. 전체 중고 매물 관리 탭 (Items) */}
          {activeTab === 'items' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-sm text-slate-900">등록된 전체 매물 ({items.length}개)</h3>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-slate-200/80 bg-white shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3.5">상품명 / 사진</th>
                      <th className="p-3.5">판매자</th>
                      <th className="p-3.5">가격</th>
                      <th className="p-3.5">공단 위치</th>
                      <th className="p-3.5">상태</th>
                      <th className="p-3.5 text-right">관리 액션</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {items.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3.5 flex items-center space-x-3">
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-10 h-10 rounded-xl object-cover bg-slate-100 shrink-0"
                          />
                          <span className="font-bold text-slate-900 truncate max-w-[200px]">
                            {item.title}
                          </span>
                        </td>
                        <td className="p-3.5 font-medium">
                          {item.seller_name} ({item.seller_country})
                        </td>
                        <td className="p-3.5 font-black text-slate-950">
                          {item.price.toLocaleString()}원
                        </td>
                        <td className="p-3.5 text-slate-500">{item.region}</td>
                        <td className="p-3.5">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                            {item.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => handleDeleteItem(item.id, item.title)}
                            className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors cursor-pointer"
                            title="매물 강제 삭제"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. KTRS 세금 환급 연계 신청 관리 탭 (Taxes) */}
          {activeTab === 'taxes' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-black text-sm text-slate-900">
                  KTRS 184만원 세금 환급 연계 신청 현황 ({taxLeads.length}건)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  선결제 0원 (후불결제) 모델로 접수된 외국인 근로자 리드 목록
                </p>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-slate-200/80 bg-white shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3.5">신청자명 / 국적</th>
                      <th className="p-3.5">근무기간 (비자)</th>
                      <th className="p-3.5">월 급여</th>
                      <th className="p-3.5">예상 환급액</th>
                      <th className="p-3.5">수수료 정산</th>
                      <th className="p-3.5">진행 상태</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {taxLeads.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-400 text-xs">
                          접수된 세금 환급 연계 신청 내역이 없습니다. (0건)
                        </td>
                      </tr>
                    ) : (
                      taxLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 font-bold text-slate-950">
                            {lead.userName} ({lead.country})
                          </td>
                          <td className="p-3.5">{lead.workPeriod}</td>
                          <td className="p-3.5">{lead.salary}</td>
                          <td className="p-3.5 font-black text-amber-600 text-sm">
                            {lead.estimatedRefund}
                          </td>
                          <td className="p-3.5 text-emerald-700 font-bold">{lead.feeType}</td>
                          <td className="p-3.5">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                              {lead.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 5. 외국인 회원 및 OCR 신분인증 관리 탭 (Users) */}
          {activeTab === 'users' && <KMarketAdminUsersTab />}
        </main>
      </div>
    </div>
  );
}
