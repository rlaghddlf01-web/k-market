'use client';

import React, { useEffect, useState } from 'react';
import { Bell, BellRing, CheckCircle2, X } from 'lucide-react';
import { registerServiceWorker, requestPushPermission, sendLocalPushNotification } from '@/lib/webPushService';

export default function KMarketPushNotificationManager() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 1. PWA 서비스 워커 자동 등록
      registerServiceWorker();

      // 2. 현재 푸시 권한 확인
      if ('Notification' in window) {
        setPermission(Notification.permission);
        if (Notification.permission === 'default') {
          // 첫 진입 시 3초 후 부드럽게 알림 권한 허용 유도 배너 노출
          const timer = setTimeout(() => {
            setShowBanner(true);
          }, 3000);
          return () => clearTimeout(timer);
        }
      }
    }
  }, []);

  const handleEnablePush = async () => {
    const res = await requestPushPermission();
    setPermission(res);
    setShowBanner(false);
  };

  if (!showBanner || permission === 'granted') return null;

  return (
    <div className="fixed top-16 right-3 sm:right-6 z-40 max-w-sm w-full animate-in slide-in-from-top-3 duration-300">
      <div className="bg-slate-900/95 text-white p-3.5 px-4 rounded-2xl shadow-xl border border-amber-400/60 backdrop-blur-md flex items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-black animate-bounce">
            <BellRing className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-black text-white truncate">
              실시간 거래 &amp; 키워드 알림 받기
            </p>
            <p className="text-[10px] text-slate-300 truncate">
              채팅 도착 및 관심 매물 등록 시 즉시 알려드려요!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleEnablePush}
            className="px-3 py-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-[11px] rounded-xl shadow-xs transition-all cursor-pointer"
          >
            알림 켜기
          </button>
          <button
            type="button"
            onClick={() => setShowBanner(false)}
            className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
