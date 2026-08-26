import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { TrafficRecord } from '@/lib/trafficTracker';
import { aggregateTrafficLogs, FullTrafficAggregateStats } from '@/lib/trafficAggregator';

export type TrafficAggregateStats = FullTrafficAggregateStats;

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
 * 2. Supabase DB로부터 실시간 전체, 오늘(24H KST), 주간(7일 KST), 월간(4주), 연간(분기) 통계를 집계하여 반환합니다.
 */
export async function fetchTrafficStatsFromDb(): Promise<FullTrafficAggregateStats> {
  if (!isSupabaseConfigured || !supabase) {
    return aggregateTrafficLogs([]);
  }

  try {
    // 전체 및 최근 로그 조회 (최대 10,000건 정밀 KST 집계)
    const { data: logs, error } = await supabase
      .from('kmarket_traffic_logs')
      .select('channel_key, created_at')
      .order('created_at', { ascending: false })
      .limit(10000);

    if (error || !logs) {
      console.warn('Error fetching traffic logs:', error?.message);
      return aggregateTrafficLogs([]);
    }

    return aggregateTrafficLogs(logs);
  } catch (err) {
    console.warn('Traffic stats fetching exception:', err);
    return aggregateTrafficLogs([]);
  }
}

