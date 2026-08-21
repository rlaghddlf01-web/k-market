// K-Market 귀국 D-Day 무빙세일 긴박감 상태 및 뱃지 관리 유틸리티

export type MovingSaleUrgency = 'urgent_final' | 'hot_discount' | 'advance_reservation';

export interface MovingSaleBadgeInfo {
  urgency: MovingSaleUrgency;
  badgeText: string;
  badgeSubText: string;
  badgeColorClass: string;
  pulse: boolean;
  filterLabel: string;
}

/**
 * D-Day 일수에 따른 뱃지 정보 및 스타일 계산
 * - D-1 ~ D-3: 🚨 [귀국 D-3 오늘마감 헐값/나눔] (초스피드 득템)
 * - D-4 ~ D-7: 🔥 [귀국 D-7 마감임박 초특가] (본격 가격인하)
 * - D-8 ~ D-30: ✈️ [귀국 D-14 묶음할인] (여유있는 예약거래)
 */
export function getMovingSaleBadgeInfo(dDay: number = 7): MovingSaleBadgeInfo {
  if (dDay <= 3) {
    return {
      urgency: 'urgent_final',
      badgeText: `🚨 귀국 D-${dDay} 오늘마감`,
      badgeSubText: '헐값/나눔 초스피드 득템',
      badgeColorClass: 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-500/30 ring-1 ring-red-300',
      pulse: true,
      filterLabel: '🚨 D-3 오늘마감',
    };
  }

  if (dDay <= 7) {
    return {
      urgency: 'hot_discount',
      badgeText: `🔥 귀국 D-${dDay} 초특가`,
      badgeSubText: '마감임박 파격할인',
      badgeColorClass: 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-md shadow-orange-500/25',
      pulse: false,
      filterLabel: '🔥 D-7 마감임박',
    };
  }

  return {
    urgency: 'advance_reservation',
    badgeText: `✈️ 귀국 D-${dDay} 묶음할인`,
    badgeSubText: '여유있는 사전예약',
    badgeColorClass: 'bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-md shadow-blue-500/20',
    pulse: false,
    filterLabel: '✈️ D-14 묶음할인',
  };
}

export const MOVING_SALE_D_DAY_OPTIONS = [
  { days: 3, label: '🚨 3일 후 귀국 (오늘마감 헐값 처분)', badge: 'D-3' },
  { days: 7, label: '🔥 7일 후 귀국 (일주일 초특가 급처)', badge: 'D-7' },
  { days: 14, label: '⚡ 14일 후 귀국 (2주 묶음할인/예약)', badge: 'D-14' },
  { days: 30, label: '✈️ 30일 후 귀국 (1달 전 사전예약)', badge: 'D-30' },
];
