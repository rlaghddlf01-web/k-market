import { TrafficChannelKey } from './trafficTracker';

export interface TrafficChartBar {
  label: string;
  value: number;
  prevValue?: number;
  isToday?: boolean;
}

export interface WeeklyDayData {
  dateStr: string; // YYYY-MM-DD in KST
  label: string;   // 'M/D' or '오늘'
  count: number;
  isToday: boolean;
}

export interface MonthlyWeekData {
  label: string;   // '3주 전', '2주 전', '지난주', '이번주'
  count: number;
  isCurrent: boolean;
}

export interface PeriodChannelMap {
  today: Record<TrafficChannelKey, number>;
  weekly: Record<TrafficChannelKey, number>;
  monthly: Record<TrafficChannelKey, number>;
  yearly: Record<number, Record<TrafficChannelKey, number>>;
}

export interface FullTrafficAggregateStats {
  totalPv: number;
  todayPv: number;
  weeklyPv: number;
  monthlyPv: number;
  channelCounts: Record<TrafficChannelKey, number>;
  periodChannelCounts: PeriodChannelMap;
  hourlyCountsToday: number[]; // 0~23시 KST
  weeklyDays: WeeklyDayData[]; // 최근 7일 KST
  monthlyWeeks: MonthlyWeekData[]; // 최근 4주 KST
  yearlyData: Record<number, { quarters: number[]; total: number }>; // 연도별 분기 데이터
}

/**
 * 빈 채널 카운트 객체를 생성합니다.
 */
function createEmptyChannelCounts(): Record<TrafficChannelKey, number> {
  return {
    tiktok: 0,
    facebook: 0,
    zalo: 0,
    direct: 0,
    telegram: 0,
    line: 0,
    youtube: 0,
    wechat: 0,
    instagram: 0,
    offline_qr: 0,
    google: 0,
    kakaotalk: 0,
    naver: 0,
    referral: 0,
    eps_gov: 0,
    other: 0,
  };
}

/**
 * UTC Date를 한국 표준시(KST, UTC+9) 기준의 Date 객체로 변환합니다.
 */
export function toKstDate(dateInput: string | Date = new Date()): Date {
  const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(d.getTime())) {
    return new Date();
  }
  const utcMs = d.getTime() + (d.getTimezoneOffset() * 60000);
  return new Date(utcMs + (9 * 3600000));
}

/**
 * 한국 표준시(KST) 기준의 'YYYY-MM-DD' 문자열을 반환합니다.
 */
export function getKstDateString(dateInput: string | Date = new Date()): string {
  const kst = toKstDate(dateInput);
  const y = kst.getFullYear();
  const m = String(kst.getMonth() + 1).padStart(2, '0');
  const d = String(kst.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * 한국 표준시(KST) 기준의 현재 시각(0~23)을 반환합니다.
 */
export function getKstCurrentHour(): number {
  return toKstDate(new Date()).getHours();
}

/**
 * Raw 로그 목록을 바탕으로 오늘(24H), 주간(7일), 월간(4주), 연간(4분기) 전 구간 및 채널별 통계를 KST 기준으로 완벽히 집계합니다.
 */
export function aggregateTrafficLogs(logs: { channel_key: string; created_at: string }[]): FullTrafficAggregateStats {
  const nowKst = toKstDate(new Date());
  const todayKstStr = getKstDateString(new Date());

  const channelCounts = createEmptyChannelCounts();
  const periodChannelCounts: PeriodChannelMap = {
    today: createEmptyChannelCounts(),
    weekly: createEmptyChannelCounts(),
    monthly: createEmptyChannelCounts(),
    yearly: {
      2026: createEmptyChannelCounts(),
      2027: createEmptyChannelCounts(),
      2028: createEmptyChannelCounts(),
      2029: createEmptyChannelCounts(),
    },
  };

  const hourlyCountsToday = Array(24).fill(0);
  let todayPv = 0;

  // 1. 주간 (최근 7일간 KST 기준: D-6 ~ D-0(오늘))
  const weeklyDays: WeeklyDayData[] = [];
  for (let i = 6; i >= 0; i--) {
    const dayDate = new Date(nowKst.getTime() - i * 24 * 3600000);
    const dateStr = `${dayDate.getFullYear()}-${String(dayDate.getMonth() + 1).padStart(2, '0')}-${String(dayDate.getDate()).padStart(2, '0')}`;
    const label = i === 0 ? '오늘' : `${dayDate.getMonth() + 1}/${dayDate.getDate()}`;
    weeklyDays.push({
      dateStr,
      label,
      count: 0,
      isToday: i === 0,
    });
  }

  // 2. 월간 (최근 4주간: 3주 전, 2주 전, 지난주, 이번주)
  const monthlyWeeks: MonthlyWeekData[] = [
    { label: '3주 전', count: 0, isCurrent: false },
    { label: '2주 전', count: 0, isCurrent: false },
    { label: '지난주', count: 0, isCurrent: false },
    { label: '이번주', count: 0, isCurrent: true },
  ];

  // 3. 연간 분기 (2026 ~ 2029)
  const yearlyData: Record<number, { quarters: number[]; total: number }> = {
    2026: { quarters: [0, 0, 0, 0], total: 0 },
    2027: { quarters: [0, 0, 0, 0], total: 0 },
    2028: { quarters: [0, 0, 0, 0], total: 0 },
    2029: { quarters: [0, 0, 0, 0], total: 0 },
  };

  let weeklyPv = 0;
  let monthlyPv = 0;

  logs.forEach((log) => {
    // 채널 키 정규화
    const rawKey = log.channel_key as TrafficChannelKey;
    const key: TrafficChannelKey = rawKey in channelCounts ? rawKey : 'other';

    // 1) 전체 누적 채널 집계
    channelCounts[key] = (channelCounts[key] || 0) + 1;

    if (!log.created_at) return;

    // 2) KST 기준 시간 변환
    const logKst = toKstDate(log.created_at);
    const logKstDateStr = getKstDateString(log.created_at);
    const logHour = logKst.getHours();
    const logYear = logKst.getFullYear();
    const logMonth = logKst.getMonth(); // 0 ~ 11

    // 오늘(24H KST) 집계
    if (logKstDateStr === todayKstStr) {
      todayPv++;
      periodChannelCounts.today[key] = (periodChannelCounts.today[key] || 0) + 1;
      if (logHour >= 0 && logHour < 24) {
        hourlyCountsToday[logHour]++;
      }
    }

    // 주간(7일 KST) 집계
    const dayItem = weeklyDays.find((d) => d.dateStr === logKstDateStr);
    if (dayItem) {
      dayItem.count++;
      weeklyPv++;
      periodChannelCounts.weekly[key] = (periodChannelCounts.weekly[key] || 0) + 1;
    }

    // 월간(최근 28일/4주 KST) 집계
    const diffDays = Math.floor((nowKst.getTime() - logKst.getTime()) / (24 * 3600000));
    if (diffDays >= 0 && diffDays < 28) {
      monthlyPv++;
      periodChannelCounts.monthly[key] = (periodChannelCounts.monthly[key] || 0) + 1;
      if (diffDays < 7) {
        monthlyWeeks[3].count++;
      } else if (diffDays < 14) {
        monthlyWeeks[2].count++;
      } else if (diffDays < 21) {
        monthlyWeeks[1].count++;
      } else {
        monthlyWeeks[0].count++;
      }
    }

    // 연간 분기 및 채널 집계
    if (yearlyData[logYear]) {
      const qIdx = Math.min(3, Math.max(0, Math.floor(logMonth / 3)));
      yearlyData[logYear].quarters[qIdx]++;
      yearlyData[logYear].total++;

      if (!periodChannelCounts.yearly[logYear]) {
        periodChannelCounts.yearly[logYear] = createEmptyChannelCounts();
      }
      periodChannelCounts.yearly[logYear][key] = (periodChannelCounts.yearly[logYear][key] || 0) + 1;
    }
  });

  return {
    totalPv: logs.length,
    todayPv,
    weeklyPv,
    monthlyPv,
    channelCounts,
    periodChannelCounts,
    hourlyCountsToday,
    weeklyDays,
    monthlyWeeks,
    yearlyData,
  };
}
