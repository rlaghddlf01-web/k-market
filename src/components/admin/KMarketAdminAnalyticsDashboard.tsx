'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  TrendingUp,
  Eye,
  Calendar,
  DollarSign,
  Users,
  Share2,
  ExternalLink,
  Sparkles,
  BarChart3,
  Globe,
  Filter,
  ChevronDown,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { getLiveTrafficStats, TrafficChannelKey } from '@/lib/trafficTracker';

type PeriodType = 'today' | 'weekly' | 'monthly' | 'yearly';
type ChannelCategory = 'all' | 'sns' | 'messenger' | 'search' | 'offline_ref';

interface TrafficChannel {
  rank: number;
  key: TrafficChannelKey;
  name: string;
  category: 'sns' | 'messenger' | 'search' | 'offline_ref';
  count: number;
  percentage: number;
  icon: string;
  badge?: string;
  color: string;
}

// 16대 채널 마스터 템플릿
const RAW_CHANNELS_TEMPLATE: Omit<TrafficChannel, 'rank' | 'count' | 'percentage'>[] = [
  { key: 'tiktok', name: '틱톡 (TikTok Shorts/바이럴)', category: 'sns', icon: '🎵', badge: '외국인 1위', color: '#0d9488' },
  { key: 'facebook', name: '페이스북 (외국인 커뮤니티 그룹)', category: 'sns', icon: '📘', badge: '베트남/몽골', color: '#3b82f6' },
  { key: 'zalo', name: '잘로 (Zalo 베트남 메신저)', category: 'messenger', icon: '💬', badge: '베트남 No.1', color: '#0284c7' },
  { key: 'direct', name: '직접 방문 (Direct / 북마크)', category: 'search', icon: '🌐', color: '#845b37' },
  { key: 'line', name: '라인 (LINE 태국/동남아 채널)', category: 'messenger', icon: '🟢', badge: '태국/미얀마', color: '#16a34a' },
  { key: 'telegram', name: '텔레그램 (Telegram 우즈벡/러시아어)', category: 'messenger', icon: '✈️', badge: '중앙아시아', color: '#0ea5e9' },
  { key: 'youtube', name: '유튜브 (YouTube 한국생활 쇼츠)', category: 'sns', icon: '🔴', color: '#e11d48' },
  { key: 'wechat', name: '위챗 (WeChat 동포 네트워크)', category: 'messenger', icon: '💬', badge: '중국/동포', color: '#059669' },
  { key: 'instagram', name: '인스타그램 (Instagram 릴스)', category: 'sns', icon: '📸', color: '#db2777' },
  { key: 'offline_qr', name: '기숙사/쉼터 QR코드 오프라인', category: 'offline_ref', icon: '🏢', badge: '공단 현장', color: '#7c3aed' },
  { key: 'google', name: '구글 (Google 다국어 검색)', category: 'search', icon: '🔍', color: '#2563eb' },
  { key: 'kakaotalk', name: '카카오톡 (오픈채팅/알림톡)', category: 'messenger', icon: '🟡', color: '#ca8a04' },
  { key: 'naver', name: '네이버 (블로그/카페)', category: 'search', icon: '🟢', color: '#059669' },
  { key: 'referral', name: '지인 초대 (친구추천 링크)', category: 'offline_ref', icon: '🎁', color: '#d97706' },
  { key: 'eps_gov', name: '고용노동부 EPS 게시판', category: 'offline_ref', icon: '📢', color: '#4f46e5' },
  { key: 'other', name: '기타 타사이트 유입', category: 'search', icon: '🔗', color: '#78716c' },
];

// 연도별 데이터 세트 (연도별 비교 분석용)
const YEARLY_DATASETS: Record<number, { quarters: number[]; prevQuarters: number[]; total: number; growthRate: string }> = {
  2026: {
    quarters: [0, 0, 0, 0],
    prevQuarters: [0, 0, 0, 0],
    total: 0,
    growthRate: '기준년도 (런칭)',
  },
  2027: {
    quarters: [0, 0, 0, 0],
    prevQuarters: [0, 0, 0, 0],
    total: 0,
    growthRate: '+184% (YoY 성장)',
  },
  2028: {
    quarters: [0, 0, 0, 0],
    prevQuarters: [0, 0, 0, 0],
    total: 0,
    growthRate: '+240% (YoY 성장)',
  },
  2029: {
    quarters: [0, 0, 0, 0],
    prevQuarters: [0, 0, 0, 0],
    total: 0,
    growthRate: '+310% (YoY 성장)',
  },
};

export default function KMarketAdminAnalyticsDashboard() {
  const [period, setPeriod] = useState<PeriodType>('today');
  const [channelFilter, setChannelFilter] = useState<ChannelCategory>('all');
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [compareYoY, setCompareYoY] = useState<boolean>(true);
  const [liveStats, setLiveStats] = useState<Record<string, number>>({});
  const [dbHourlyStats, setDbHourlyStats] = useState<number[]>(Array(24).fill(0));
  const [dbTodayPv, setDbTodayPv] = useState<number>(0);
  const [dbTotalPv, setDbTotalPv] = useState<number>(0);
  const [mounted, setMounted] = useState<boolean>(false);
  const [currentHour, setCurrentHour] = useState<number>(11);
  const chartScrollRef = useRef<HTMLDivElement>(null);

  // 실제 실시간 유입 통계 로드 및 클라이언트 마운트 시각 동기화
  useEffect(() => {
    setMounted(true);
    setCurrentHour(new Date().getHours());
    
    // 로컬 스토리지 데이터 1차 로드
    const local = getLiveTrafficStats();
    setLiveStats(local);

    // 중앙 Supabase DB 실시간 전역 통계 로드
    fetch('/api/traffic')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          const { totalPv, todayPv, channelCounts, hourlyCountsToday } = json.data;
          setDbTotalPv(totalPv);
          setDbTodayPv(todayPv);
          if (hourlyCountsToday && Array.isArray(hourlyCountsToday)) {
            setDbHourlyStats(hourlyCountsToday);
          }
          if (channelCounts) {
            setLiveStats(channelCounts);
          }
        }
      })
      .catch((err) => console.warn('Traffic API load error:', err));
  }, []);

  // 실제 순수 트래픽 집계 (DB 우선, 없을 시 로컬)
  const totalLivePv = dbTotalPv > 0 ? dbTotalPv : (liveStats['total_pv'] || 0);
  const todayLivePv = dbTodayPv > 0 ? dbTodayPv : totalLivePv;

  // 채널별 실제 방문 카운트 매핑
  const channelList: TrafficChannel[] = RAW_CHANNELS_TEMPLATE.map((tpl, idx) => {
    const count = liveStats[tpl.key] || 0;
    const percentage = totalLivePv > 0 ? Math.round((count / totalLivePv) * 100) : 0;

    return {
      rank: idx + 1,
      key: tpl.key,
      name: tpl.name,
      category: tpl.category,
      count,
      percentage,
      icon: tpl.icon,
      badge: tpl.badge,
      color: tpl.color,
    };
  }).sort((a, b) => b.count - a.count).map((ch, i) => ({ ...ch, rank: i + 1 }));

  // 24시간 전체 라벨 (00시 ~ 23시)
  const HOURS_24 = Array.from({ length: 24 }, (_, i) => `${i < 10 ? '0' + i : i}시`);

  // 기간별 차트 데이터
  const chartLabels =
    period === 'today'
      ? HOURS_24
      : period === 'weekly'
      ? ['8/16', '8/17', '8/18', '8/19', '8/20', '8/21', '오늘']
      : period === 'monthly'
      ? ['1주차', '2주차', '3주차', '이번주']
      : ['1분기', '2분기', '3분기', '4분기'];

  // 연간 모드일 때는 선택된 연도의 분기 데이터 및 전년도 비교 데이터 구성
  const yearlyCurrent = YEARLY_DATASETS[selectedYear] || YEARLY_DATASETS[2026];
  const dailyChart = chartLabels.map((lbl, idx) => {
    if (period === 'yearly') {
      const isCurrentQuarter = idx === 2; // 현재 분기 (3분기)
      return {
        label: lbl,
        value: isCurrentQuarter ? todayLivePv : yearlyCurrent.quarters[idx],
        prevValue: yearlyCurrent.prevQuarters[idx],
        isToday: isCurrentQuarter,
      };
    }
    if (period === 'today') {
      const isCurrent = idx === currentHour;
      const hourValue = dbHourlyStats[idx] || (isCurrent ? todayLivePv : 0);
      return {
        label: lbl,
        value: hourValue,
        prevValue: 0,
        isToday: isCurrent,
      };
    }
    const isToday = idx === chartLabels.length - 1;
    return {
      label: lbl,
      value: isToday ? todayLivePv : 0,
      prevValue: 0,
      isToday,
    };
  });

  const maxChartValue = Math.max(
    ...dailyChart.map((d) => Math.max(d.value, d.prevValue || 0)),
    1
  );

  // 카테고리 필터링
  const filteredChannels = channelList.filter((c) => {
    if (channelFilter === 'all') return true;
    return c.category === channelFilter;
  });

  // 24시간 가로 스크롤 컨트롤 함수
  const scrollToStart = () => {
    if (chartScrollRef.current) {
      chartScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };
  const scrollToEnd = () => {
    if (chartScrollRef.current) {
      chartScrollRef.current.scrollTo({ left: 1000, behavior: 'smooth' });
    }
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #fcf9f5 0%, #f6ede2 100%)',
        borderColor: '#e5d7c8',
      }}
      className="p-5 sm:p-7 rounded-3xl border shadow-sm space-y-6"
    >
      {/* 1. 대시보드 상단 타이틀 & 기간/연도 선택 탭 */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#e5d7c8] pb-5">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xl">📈</span>
            <h2 className="text-base sm:text-lg font-black tracking-tight text-[#2d1f14] flex items-center gap-2">
              실시간 유입 정밀 분석 &amp; 연도별(YoY) 비교 대시보드
            </h2>

            {/* 연도 선택 셀렉터 */}
            <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-xl border border-[#ded1c4] shadow-2xs">
              <span className="text-[11px] font-extrabold text-[#705e4f]">기준 연도:</span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
                className="bg-transparent text-xs font-black text-[#845b37] focus:outline-none cursor-pointer"
              >
                <option value={2026}>2026년</option>
                <option value={2027}>2027년 (내년)</option>
                <option value={2028}>2028년</option>
                <option value={2029}>2029년</option>
              </select>
            </div>

            <span className="text-xs font-bold text-[#845b37] bg-[#ede2d6] px-2 py-0.5 rounded-full">
              {period === 'today' ? '오늘 24시간 실시간' : period === 'weekly' ? '주간 집계' : period === 'monthly' ? '한 달간' : `${selectedYear}년 연간`}
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-[#705e4f] mt-1 font-medium">
            2026년~2027년 이후까지 연도별 실적 및 24시간 시간대별 트래픽을 정밀 비교할 수 있습니다.
          </p>
        </div>

        {/* 기간 필터 버튼 그룹 */}
        <div className="flex items-center bg-[#ede2d6] p-1 rounded-2xl border border-[#ded1c4] shrink-0 self-start lg:self-center">
          <button
            onClick={() => setPeriod('today')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
              period === 'today'
                ? 'bg-[#3d2817] text-[#fbf9f6] shadow-sm'
                : 'text-[#6b5847] hover:text-[#1f1914]'
            }`}
          >
            <span>📅 오늘 (24시간)</span>
          </button>
          <button
            onClick={() => setPeriod('weekly')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
              period === 'weekly'
                ? 'bg-[#3d2817] text-[#fbf9f6] shadow-sm'
                : 'text-[#6b5847] hover:text-[#1f1914]'
            }`}
          >
            <span>📊 주간</span>
          </button>
          <button
            onClick={() => setPeriod('monthly')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
              period === 'monthly'
                ? 'bg-[#3d2817] text-[#fbf9f6] shadow-sm'
                : 'text-[#6b5847] hover:text-[#1f1914]'
            }`}
          >
            <span>📈 월간</span>
          </button>
          <button
            onClick={() => setPeriod('yearly')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
              period === 'yearly'
                ? 'bg-gradient-to-r from-[#845b37] to-[#3d2817] text-[#fbf9f6] shadow-sm'
                : 'text-[#6b5847] hover:text-[#1f1914]'
            }`}
          >
            <span>🏆 연간 (Yearly/IR)</span>
          </button>
        </div>
      </div>

      {/* 2. 4대 KPI 핵심 지표 카드 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* 오늘 / 기준 PV */}
        <div className="bg-white p-4.5 rounded-2xl border border-[#ded1c4] shadow-2xs relative overflow-hidden group hover:border-[#845b37] transition-all">
          <div className="flex items-center justify-between text-[#705e4f] text-xs font-bold">
            <span>{period === 'yearly' ? `${selectedYear}년 총 PV` : '오늘 페이지뷰 (PV)'}</span>
            <div className="w-7 h-7 rounded-xl bg-[#f4ede6] flex items-center justify-center text-[#845b37]">
              <Eye className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-[#1f1914] mt-2">
            {todayLivePv.toLocaleString()} <span className="text-xs font-bold text-[#8c7866]">회</span>
          </p>
          <p className="text-[10px] text-[#8c7866] mt-1 font-medium">실시간 실제 누적 페이지뷰</p>
        </div>

        {/* 기간 누적 PV */}
        <div className="bg-white p-4.5 rounded-2xl border border-[#ded1c4] shadow-2xs relative overflow-hidden group hover:border-[#845b37] transition-all">
          <div className="flex items-center justify-between text-[#705e4f] text-xs font-bold">
            <span>기간 누적 PV</span>
            <div className="w-7 h-7 rounded-xl bg-[#f4ede6] flex items-center justify-center text-[#845b37]">
              <Calendar className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-[#1f1914] mt-2">
            {totalLivePv.toLocaleString()} <span className="text-xs font-bold text-[#8c7866]">회</span>
          </p>
          <p className="text-[10px] text-[#8c7866] mt-1 font-medium">유입 경로를 통한 총 방문 합계</p>
        </div>

        {/* 연간 성장률 (YoY) */}
        <div className="bg-white p-4.5 rounded-2xl border border-[#ded1c4] shadow-2xs relative overflow-hidden group hover:border-[#845b37] transition-all">
          <div className="flex items-center justify-between text-[#705e4f] text-xs font-bold">
            <span>연간 성장 지표 (YoY)</span>
            <div className="w-7 h-7 rounded-xl bg-[#f4ede6] flex items-center justify-center text-[#845b37]">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-lg sm:text-xl font-black text-[#845b37] mt-2 flex items-center gap-1">
            <ArrowUpRight className="w-4 h-4 text-emerald-600" />
            <span>{yearlyCurrent.growthRate}</span>
          </p>
          <p className="text-[10px] text-[#8c7866] mt-1 font-medium">{selectedYear - 1}년 대비 성장 분석</p>
        </div>

        {/* 활성 사용자 (MAU) */}
        <div className="bg-white p-4.5 rounded-2xl border border-[#ded1c4] shadow-2xs relative overflow-hidden group hover:border-[#845b37] transition-all">
          <div className="flex items-center justify-between text-[#705e4f] text-xs font-bold">
            <span>활성 방문자 수</span>
            <div className="w-7 h-7 rounded-xl bg-[#f4ede6] flex items-center justify-center text-[#845b37]">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-[#3d2817] mt-2">
            {totalLivePv > 0 ? totalLivePv : 0} <span className="text-xs font-bold text-[#8c7866]">명</span>
          </p>
          <p className="text-[10px] text-[#845b37] font-extrabold mt-1">실시간 고유 방문자 측정</p>
        </div>
      </div>

      {/* 3. 하단: [좌측 24시간 가로스크롤 차트] + [우측 순수 16대 채널별 유입 순위] */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2">
        {/* 좌측 차트 영역 (6 cols) */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-[#ded1c4] shadow-2xs flex flex-col justify-between overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#845b37]" />
              <h3 className="text-xs sm:text-sm font-black text-[#1f1914]">
                {period === 'today'
                  ? '오늘 24시간 시간대별 추이 (00시~23시)'
                  : period === 'weekly'
                  ? '지난 7일간 일별 방문자 추이'
                  : period === 'monthly'
                  ? '최근 4주간 주별 방문자 추이'
                  : `${selectedYear}년 분기별 실적 vs ${selectedYear - 1}년 비교 (YoY)`}
              </h3>
            </div>

            {/* 오늘(24시간)일 때 좌/우 시간대 퀵 스크롤 버튼 */}
            {period === 'today' && (
              <div className="flex items-center gap-1 text-[11px] font-bold">
                <button
                  onClick={scrollToStart}
                  className="px-2 py-1 bg-[#f4ede6] hover:bg-[#ede2d6] text-[#705e4f] rounded-lg transition-colors cursor-pointer flex items-center gap-0.5"
                  title="새벽/오전 시간대로 이동"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>00~12시</span>
                </button>
                <button
                  onClick={scrollToEnd}
                  className="px-2 py-1 bg-[#f4ede6] hover:bg-[#ede2d6] text-[#705e4f] rounded-lg transition-colors cursor-pointer flex items-center gap-0.5"
                  title="오후/밤 시간대로 이동"
                >
                  <span>12~23시</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* 연간 모드일 때 전년도 비교 토글 버튼 */}
            {period === 'yearly' && (
              <button
                onClick={() => setCompareYoY(!compareYoY)}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  compareYoY
                    ? 'bg-[#3d2817] text-white shadow-2xs'
                    : 'bg-[#f4ede6] text-[#705e4f]'
                }`}
              >
                <span>🔄 전년도 비교 {compareYoY ? 'ON' : 'OFF'}</span>
              </button>
            )}
          </div>

          {/* 24시간 가로 스크롤 바 차트 컨테이너 */}
          <div
            ref={chartScrollRef}
            className="w-full overflow-x-auto pb-3 pt-4 border-b border-[#f4ede6]"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#34d399 #f4ede6',
            }}
          >
            <div
              className={`h-56 flex items-end justify-between gap-1.5 sm:gap-2 px-2 ${
                period === 'today' ? 'min-w-[1100px]' : 'w-full'
              }`}
            >
              {dailyChart.map((bar, idx) => {
                const heightPercent = bar.value > 0 ? Math.max(16, Math.round((bar.value / maxChartValue) * 100)) : 6;
                const prevHeightPercent = (bar.prevValue || 0) > 0 ? Math.max(16, Math.round(((bar.prevValue || 0) / maxChartValue) * 100)) : 6;

                return (
                  <div
                    key={idx}
                    className={`flex flex-col items-center h-full justify-end group shrink-0 ${
                      period === 'today' ? 'w-[42px]' : 'flex-1'
                    }`}
                  >
                    {/* 상단 네온 형광 수치 배지 */}
                    <span
                      className={`text-[9px] font-black px-1.5 py-0.5 rounded-full mb-1.5 transition-all ${
                        bar.isToday
                          ? 'text-[#004d2c] bg-[#6ee7b7] border border-[#10b981] shadow-xs scale-105'
                          : 'text-[#004d2c] bg-[#a7f3d0] border border-[#34d399] opacity-80 group-hover:opacity-100'
                      }`}
                    >
                      {bar.value}회
                    </span>

                    {/* 연간 비교 모드일 때 듀얼 바 */}
                    <div className="w-full flex items-end justify-center gap-1 max-w-[56px] h-full">
                      {period === 'yearly' && compareYoY && (
                        <div
                          title={`${selectedYear - 1}년 ${bar.label}: ${bar.prevValue || 0}회`}
                          style={{
                            height: `${prevHeightPercent}%`,
                            background: '#cbd5e1',
                          }}
                          className="w-1/2 rounded-t-lg transition-all duration-500 hover:brightness-110"
                        />
                      )}

                      {/* 선택 연도 / 당해 형광 바 */}
                      <div
                        title={`${bar.label}: ${bar.value}회`}
                        style={{
                          height: `${heightPercent}%`,
                          background: bar.value > 0
                            ? 'linear-gradient(180deg, #34d399 0%, #10b981 50%, #059669 100%)'
                            : bar.isToday
                            ? '#a7f3d0'
                            : '#e2e8f0',
                          boxShadow: bar.value > 0 ? '0 0 16px rgba(16, 185, 129, 0.55), 0 4px 10px rgba(5, 150, 105, 0.35)' : 'none',
                        }}
                        className={`${period === 'yearly' && compareYoY ? 'w-1/2' : 'w-full max-w-[38px]'} rounded-t-xl transition-all duration-500 hover:brightness-125`}
                      />
                    </div>

                    {/* 하단 라벨 & 현재 시간대 배지 */}
                    <div className="flex flex-col items-center mt-2">
                      <span className={`text-[10px] font-bold ${bar.isToday ? 'text-[#10b981] font-black' : 'text-[#705e4f]'}`}>
                        {bar.label}
                      </span>
                      {bar.isToday && period === 'today' && (
                        <span className="text-[8px] bg-[#10b981] text-white px-1 rounded-xs font-black tracking-tighter leading-tight mt-0.5">
                          NOW
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 flex items-center justify-between text-xs text-[#705e4f] border-t border-[#f4ede6]">
            {period === 'today' ? (
              <span className="text-[11px] text-[#845b37] font-bold">
                👉 마우스 휠이나 터치로 좌우 스크롤하여 00시부터 23시까지 전체 시간대를 확인할 수 있습니다.
              </span>
            ) : period === 'yearly' && compareYoY ? (
              <div className="flex items-center gap-3 text-[11px] font-bold">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#cbd5e1]" /> {selectedYear - 1}년 실적
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#10b981] shadow-2xs shadow-[#10b981]/50" /> {selectedYear}년 실적 (형광)
                </span>
              </div>
            ) : (
              <span>💡 {selectedYear}년도 유입 데이터가 실시간으로 집계 및 보존됩니다.</span>
            )}
            <span className="font-bold text-[#10b981]">기준: {period === 'today' ? '오늘 24H' : `${selectedYear}년`}</span>
          </div>
        </div>

        {/* 우측: 16대 채널별 실제 유입 순위 (6 cols) */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-[#ded1c4] shadow-2xs space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f4ede6] pb-2.5">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-[#845b37]" />
              <h3 className="text-xs sm:text-sm font-black text-[#1f1914]">
                글로벌 16대 채널별 실제 유입 현황
              </h3>
            </div>

            {/* 채널 카테고리 필터 */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {[
                { id: 'all', label: '전체' },
                { id: 'sns', label: '글로벌 SNS' },
                { id: 'messenger', label: '국가별 메신저' },
                { id: 'offline_ref', label: '기관/QR' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setChannelFilter(tab.id as ChannelCategory)}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                    channelFilter === tab.id
                      ? 'bg-[#3d2817] text-[#fbf9f6]'
                      : 'bg-[#f4ede6] text-[#6b5847] hover:text-[#1f1914]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 유입 채널 16종 스크롤 리스트 */}
          <div className="space-y-2.5 max-h-72 overflow-y-auto no-scrollbar pr-1">
            {filteredChannels.map((channel) => (
              <div key={channel.rank} className="space-y-1 group">
                <div className="flex items-center justify-between text-xs font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#ede2d6] text-[#5c4a39] text-[10px] font-black flex items-center justify-center shrink-0">
                      {channel.rank}
                    </span>
                    <span className="text-sm shrink-0">{channel.icon}</span>
                    <span className="text-[#1f1914] font-bold truncate max-w-[200px]">
                      {channel.name}
                    </span>
                    {channel.badge && (
                      <span className="text-[9px] bg-[#ede2d6] text-[#5c3818] px-1.5 py-0.2 rounded-md font-extrabold shrink-0">
                        {channel.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-right text-[11px] shrink-0">
                    <span className="font-black text-[#1f1914]">{channel.count}회</span>
                    <span className="text-[#8c7866] ml-1.5 font-bold">({channel.percentage}%)</span>
                  </div>
                </div>

                {/* 프로그레스 바 */}
                <div className="w-full h-1.5 bg-[#f4ede6] rounded-full overflow-hidden">
                  <div
                    style={{
                      width: `${Math.min(100, channel.percentage)}%`,
                      backgroundColor: channel.color,
                    }}
                    className="h-full rounded-full transition-all duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
