import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { TrafficRecord, TrafficChannelKey } from '@/lib/trafficTracker';

export interface TrafficAggregateStats {
  totalPv: number;
  todayPv: number;
  channelCounts: Record<TrafficChannelKey, number>;
  hourlyCountsToday: number[]; // 0~23시 시간대별 방문 수
}

/**
 * 1. Supabase DB에 방문 로그를 1건 기록합니다.
 */
export async function logTrafficToDb(record: TrafficRecord): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) {
    return false;
  }

  try {
    const { error } = await supabase.from('kmarket_traffic_logs').insert([
      {
        channel_key: record.channelKey,
        channel_name: record.channelName,
        source_url: record.sourceUrl || null,
        utm_source: record.utmSource || null,
        utm_medium: record.utmMedium || null,
        utm_campaign: record.utmCampaign || null,
        referrer: record.referrer || null,
        created_at: record.timestamp || new Date().toISOString(),
      },
    ]);

    if (error) {
      console.warn('Failed to log traffic to Supabase:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Traffic logging exception:', err);
    return false;
  }
}

/**
 * 2. Supabase DB로부터 실시간 전체 및 오늘 24시간 통계를 집계하여 반환합니다.
 */
export async function fetchTrafficStatsFromDb(): Promise<TrafficAggregateStats> {
  const emptyResult: TrafficAggregateStats = {
    totalPv: 0,
    todayPv: 0,
    channelCounts: {
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
    },
    hourlyCountsToday: Array(24).fill(0),
  };

  if (!isSupabaseConfigured || !supabase) {
    return emptyResult;
  }

  try {
    // 오늘 한국 시간(KST) 기준 시작 시각 계산 (00:00:00)
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();

    // 1) 전체 및 최근 로그 조회 (최대 5,000건 정밀 집계)
    const { data: logs, error } = await supabase
      .from('kmarket_traffic_logs')
      .select('channel_key, created_at')
      .order('created_at', { ascending: false })
      .limit(5000);

    if (error || !logs) {
      console.warn('Error fetching traffic logs:', error?.message);
      return emptyResult;
    }

    const channelCounts = { ...emptyResult.channelCounts };
    const hourlyCountsToday = Array(24).fill(0);
    let todayPv = 0;

    const todayDateStr = now.toISOString().slice(0, 10);

    logs.forEach((log) => {
      const key = log.channel_key as TrafficChannelKey;
      if (key in channelCounts) {
        channelCounts[key] = (channelCounts[key] || 0) + 1;
      } else {
        channelCounts['other'] = (channelCounts['other'] || 0) + 1;
      }

      if (log.created_at) {
        const logDate = new Date(log.created_at);
        const logDateStr = logDate.toISOString().slice(0, 10);

        if (logDateStr === todayDateStr || log.created_at >= startOfToday) {
          todayPv++;
          const hour = logDate.getHours();
          if (hour >= 0 && hour < 24) {
            hourlyCountsToday[hour]++;
          }
        }
      }
    });

    return {
      totalPv: logs.length,
      todayPv: todayPv,
      channelCounts,
      hourlyCountsToday,
    };
  } catch (err) {
    console.warn('Traffic stats fetching exception:', err);
    return emptyResult;
  }
}
