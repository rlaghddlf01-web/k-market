'use client';

import React, { useEffect, Suspense } from 'react';
import { recordTrafficVisit } from '@/lib/trafficTracker';

function TrackerInner() {
  useEffect(() => {
    // 앱 접속 시 자동으로 16대 채널 유입 분석 및 기록
    recordTrafficVisit();
  }, []);

  return null;
}

export default function TrafficTrackerProvider() {
  return (
    <Suspense fallback={null}>
      <TrackerInner />
    </Suspense>
  );
}
