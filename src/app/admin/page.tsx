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
import { KMarketItem, UserReportData } from '@/types/kmarket';

export default function KMarketAdminPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'reports' | 'items' | 'users' | 'taxes'>('overview');
  const [reportFilter, setReportFilter] = useState<'all' | 'pending' | 'resolved'>('all');

  // 관리자 신고 리스트 상태
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
      details: '포승공단 GS25 앞에서 19시에 만나기로 약속해놓고 나타나지 않고 연락 두절됨.',
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
      details: '가격 네고 거절하자 심한 욕설과 비속어를 사용함.',
      block_user: true,
      status: 'resolved',
      created_at: '어제',
    },
  ]);

  // 관리자 매물 리스트 상태
  const [items, setItems] = useState<KMarketItem[]>(INITIAL_ITEMS);

  // KTRS 세금 환급 연계 신청 리스트
  const [taxLeads, setTaxLeads] = useState([
    {
      id: 'tax-01',
      userName: 'Trần Văn Đức',
      country: '베트남 🇻🇳',
      workPeriod: '3년 (E-9)',
      salary: '280만원',
      estimatedRefund: '184만원',
      feeType: '선결제 0원 후불제(15%)',
      status: '서류 검토중',
      appliedAt: '2026-08-21 11:20',
    },
    {
      id: 'tax-02',
      userName: 'Batbayar Bold',
      country: '몽골 🇲🇳',
      workPeriod: '4년 (E-9)',
      salary: '320만원',
      estimatedRefund: '210만원',
      feeType: '선결제 0원 후불제(15%)',
      status: '환급 승인 대기',
      appliedAt: '2026-08-21 09:45',
    },
    {
      id: 'tax-03',
      userName: 'Anil Shrestha',
      country: '네팔 🇳🇵',
      workPeriod: '2년 (E-9)',
      salary: '250만원',
      estimatedRefund: '145만원',
      feeType: '선결제 0원 후불제(15%)',
      status: '환급금 입금완료',
      appliedAt: '2026-08-20 16:30',
    },
  ]);

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
    if (confirm(`정말로 매물 "${title}"을(를) 강제 삭제하시겠습니까?`)) {
      setItems((prev) => prev.filter((i) => i.id !== itemId));
      alert('매물이 안전하게 삭제되었습니다.');
    }
  };

  const pendingReportsCount = reports.filter((r) => r.status === 'pending').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* 1. 상단 관리자 글로벌 네비게이션 헤더 */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer border border-slate-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>K-Market 홈으로</span>
          </Link>

          <div className="h-5 w-px bg-slate-800" />

          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base font-black tracking-tight text-white">
                  KTRS K-Market 통합 관제 콘솔
                </h1>
                <span className="bg-red-500/20 text-red-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border border-red-500/30">
                  ADMIN v2.4
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-300 font-medium">실시간 통합 관제 중</span>
          </div>

          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-xs text-white shadow-md">
            AD
          </div>
        </div>
      </header>

      {/* 2. 관리자 메인 레이아웃 (사이드바 + 본문) */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6">
        {/* 좌측 네비게이션 사이드바 */}
        <aside className="w-64 shrink-0 space-y-2 hidden md:block">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-4 h-4" />
                <span>종합 운영 대시보드</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'reports'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <ShieldAlert className="w-4 h-4" />
                <span>신고 및 사기 관제</span>
              </div>
              {pendingReportsCount > 0 && (
                <span className="bg-red-950 text-red-300 border border-red-500/40 text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse">
                  {pendingReportsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('items')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'items'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Package className="w-4 h-4" />
                <span>중고 매물 관리</span>
              </div>
              <span className="text-[10px] text-slate-500">{items.length}개</span>
            </button>

            <button
              onClick={() => setActiveTab('taxes')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'taxes'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/25'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <DollarSign className="w-4 h-4" />
                <span>KTRS 세금 환급 연계</span>
              </div>
              <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                0원 후불
              </span>
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'users'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Users className="w-4 h-4" />
                <span>외국인 회원 관리</span>
              </div>
            </button>
          </nav>

          {/* 안전 관제 현황 미니 카드 */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/60 border border-slate-800 text-xs space-y-2 mt-6">
            <span className="font-bold text-slate-300 block">🛡️ 실시간 AI 쉴드 상태</span>
            <div className="flex justify-between text-slate-400 text-[11px]">
              <span>15개국어 번역 서버:</span>
              <span className="text-emerald-400 font-bold">정상 가동중 (0.3s)</span>
            </div>
            <div className="flex justify-between text-slate-400 text-[11px]">
              <span>사기 키워드 탐지:</span>
              <span className="text-emerald-400 font-bold">실시간 활성화</span>
            </div>
            <div className="flex justify-between text-slate-400 text-[11px]">
              <span>구글 맵 지오코딩:</span>
              <span className="text-emerald-400 font-bold">연동 완료</span>
            </div>
          </div>
        </aside>

        {/* 우측 메인 대시보드 뷰 영역 */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* 모바일 탭 바 */}
          <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar md:hidden pb-2">
            {[
              { id: 'overview', label: '📊 종합' },
              { id: 'reports', label: `🚨 신고 (${pendingReportsCount})` },
              { id: 'items', label: '📦 매물' },
              { id: 'taxes', label: '💰 세금환급' },
              { id: 'users', label: '👥 회원' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 text-slate-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 1. 종합 운영 대시보드 탭 (Overview) */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* 4대 주요 핵심 지표 카드 */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>총 등록 매물</span>
                    <Package className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white">
                    {items.length}건
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" />
                    <span>D-Day 무빙세일 4건 포함</span>
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>사기 신고/의심</span>
                    <ShieldAlert className="w-4 h-4 text-red-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-red-400">
                    {pendingReportsCount}건
                  </div>
                  <span className="text-[10px] text-red-400/80 font-semibold">
                    미처리 즉시 조치 대기중
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>KTRS 세금 환급 연계</span>
                    <DollarSign className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400">
                    539만원
                  </div>
                  <span className="text-[10px] text-amber-300/80 font-semibold">
                    선결제 0원 후불 신청 누적
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>외국인 이용 회원</span>
                    <Users className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-purple-300">
                    1,280명
                  </div>
                  <span className="text-[10px] text-purple-300/80 font-semibold">
                    15개국 근로자 활동중
                  </span>
                </div>
              </div>

              {/* 공단별 직거래 현황 & 국적별 분포 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <h3 className="font-bold text-sm text-slate-200 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span>주요 외국인 공단별 거래 점유율</span>
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span>경기 평택 포승국가산단</span>
                        <span className="font-bold text-blue-400">38% (124건)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div className="w-[38%] h-full bg-blue-500 rounded-full" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span>경기 안산 반월시화 / 원곡동</span>
                        <span className="font-bold text-indigo-400">32% (105건)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div className="w-[32%] h-full bg-indigo-500 rounded-full" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span>경기 화성 향남제약 / 마도</span>
                        <span className="font-bold text-sky-400">18% (59건)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div className="w-[18%] h-full bg-sky-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <h3 className="font-bold text-sm text-slate-200 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    <span>외국인 근로자 국적별 거래 비중</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-center justify-between">
                      <span>🇻🇳 베트남 (Vietnam)</span>
                      <strong className="text-white">41%</strong>
                    </div>
                    <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-center justify-between">
                      <span>🇲🇳 몽골 (Mongolia)</span>
                      <strong className="text-white">22%</strong>
                    </div>
                    <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-center justify-between">
                      <span>🇹🇭 태국 (Thailand)</span>
                      <strong className="text-white">16%</strong>
                    </div>
                    <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-center justify-between">
                      <span>🇳🇵 네팔 (Nepal)</span>
                      <strong className="text-white">12%</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. 불량 매물 & 사기 신고 관제 탭 (Reports) */}
          {activeTab === 'reports' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setReportFilter('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      reportFilter === 'all' ? 'bg-slate-700 text-white' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    전체 ({reports.length})
                  </button>
                  <button
                    onClick={() => setReportFilter('pending')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      reportFilter === 'pending' ? 'bg-red-600 text-white' : 'bg-slate-900 text-red-400'
                    }`}
                  >
                    🚨 미처리 대기 ({pendingReportsCount})
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {reports.map((rep) => (
                  <div
                    key={rep.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                            rep.status === 'pending'
                              ? 'bg-red-600 text-white animate-pulse'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {rep.status === 'pending' ? '🚨 심사 대기' : '✅ 조치 완료'}
                        </span>
                        <span className="font-bold text-xs text-slate-300">신고번호: #{rep.id}</span>
                        <span className="text-[11px] text-slate-500">({rep.created_at})</span>
                      </div>
                      <span className="text-xs text-slate-400">
                        신고자: <strong>{rep.reporter_name}</strong>
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-slate-500">피신고 회원: </span>
                        <strong className="text-red-400 text-sm">{rep.target_user_name}</strong>
                        {rep.item_title && (
                          <p className="text-slate-400 mt-1">관련 매물: {rep.item_title}</p>
                        )}
                      </div>
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <span className="text-[11px] font-bold text-red-400 block mb-1">
                          사유: {rep.reason_type}
                        </span>
                        <p className="text-slate-300 leading-relaxed font-medium">"{rep.details}"</p>
                      </div>
                    </div>

                    {rep.status === 'pending' && (
                      <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2 flex-wrap">
                        <button
                          onClick={() => handleReportAction(rep.id, 'dismiss')}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                        >
                          신고 기각 (무혐의)
                        </button>
                        <button
                          onClick={() => handleReportAction(rep.id, 'delete_item')}
                          className="px-3 py-1.5 bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>매물 강제 삭제</span>
                        </button>
                        <button
                          onClick={() => handleReportAction(rep.id, 'suspend')}
                          className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>7일 거래 정지</span>
                        </button>
                        <button
                          onClick={() => handleReportAction(rep.id, 'ban')}
                          className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-xl transition-all shadow-md shadow-red-600/30 cursor-pointer flex items-center gap-1"
                        >
                          <Ban className="w-3.5 h-3.5" />
                          <span>🚨 플랫폼 영구 제재</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. 전체 중고 매물 관리 탭 (Items) */}
          {activeTab === 'items' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-200">등록된 매물 목록 ({items.length}개)</h3>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/80 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">상품명 / 사진</th>
                      <th className="p-3.5">판매자</th>
                      <th className="p-3.5">가격</th>
                      <th className="p-3.5">공단 위치</th>
                      <th className="p-3.5">상태</th>
                      <th className="p-3.5 text-right">관리 액션</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {items.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/40">
                        <td className="p-3.5 flex items-center space-x-3">
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-10 h-10 rounded-lg object-cover bg-slate-800 shrink-0"
                          />
                          <span className="font-bold text-white truncate max-w-[200px]">
                            {item.title}
                          </span>
                        </td>
                        <td className="p-3.5 font-medium">
                          {item.seller_name} ({item.seller_country})
                        </td>
                        <td className="p-3.5 font-bold text-slate-100">
                          {item.price.toLocaleString()}원
                        </td>
                        <td className="p-3.5 text-slate-400">{item.region}</td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300">
                            {item.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => handleDeleteItem(item.id, item.title)}
                            className="p-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors cursor-pointer"
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
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-200">
                    KTRS 184만원 세금 환급 연계 신청 현황
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    선결제 0원 후불제(15%) 수수료 모델로 접수된 외국인 근로자 리드 목록
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/80 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">신청자명 / 국적</th>
                      <th className="p-3.5">근무기간 (비자)</th>
                      <th className="p-3.5">월 급여</th>
                      <th className="p-3.5">예상 환급액</th>
                      <th className="p-3.5">수수료 정산</th>
                      <th className="p-3.5">진행 상태</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {taxLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-800/40">
                        <td className="p-3.5 font-bold text-white">
                          {lead.userName} ({lead.country})
                        </td>
                        <td className="p-3.5">{lead.workPeriod}</td>
                        <td className="p-3.5">{lead.salary}</td>
                        <td className="p-3.5 font-extrabold text-amber-400">
                          {lead.estimatedRefund}
                        </td>
                        <td className="p-3.5 text-emerald-400 font-medium">{lead.feeType}</td>
                        <td className="p-3.5">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {lead.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 5. 외국인 회원 관리 탭 (Users) */}
          {activeTab === 'users' && (
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
              <Users className="w-12 h-12 text-purple-400 mx-auto" />
              <h3 className="font-bold text-base text-slate-200">
                15개국 외국인 회원 통합 신원 인증 데이터베이스
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                법무부 외국인등록번호 및 고용노동부 E-9 비자 연동을 통한 기숙사 인증 회원 관리 시스템이 안전하게 연동되어 있습니다.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
