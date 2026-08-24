import { NextResponse } from 'next/server';
import { logTrafficToDb, fetchTrafficStatsFromDb } from '@/lib/trafficService';
import { TrafficRecord } from '@/lib/trafficTracker';

// 1. GET /api/traffic : 실시간 중앙 DB 통계 조회 (관리자 대시보드용)
export async function GET() {
  try {
    const stats = await fetchTrafficStatsFromDb();
    return NextResponse.json({ success: true, data: stats });
  } catch (error) {
    console.error('API /api/traffic GET error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

// 2. POST /api/traffic : 접속 시 방문 로그를 DB에 실시간 적재
export async function POST(request: Request) {
  try {
    const record: TrafficRecord = await request.json();
    if (!record || !record.channelKey) {
      return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
    }

    const ok = await logTrafficToDb(record);
    return NextResponse.json({ success: ok });
  } catch (error) {
    console.error('API /api/traffic POST error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
