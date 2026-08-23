'use client';

import React, { useEffect, useState } from 'react';
import { Bell, BellRing, CheckCircle2, X } from 'lucide-react';
import { registerServiceWorker, requestPushPermission, sendLocalPushNotification } from '@/lib/webPushService';
import { useLanguage } from '@/context/LanguageContext';

export default function KMarketPushNotificationManager() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isPromptOpen, setIsPromptOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission);
      registerServiceWorker();

      const dismissed = localStorage.getItem('kmarket_push_dismissed');
      if (Notification.permission === 'default' && !dismissed) {
        const timer = setTimeout(() => {
          setIsPromptOpen(true);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  if (!mounted || !isPromptOpen || permission !== 'default') return null;

  const handleEnablePush = async () => {
    const granted = await requestPushPermission();
    if (granted) {
      setPermission('granted');
      setIsPromptOpen(false);
      sendLocalPushNotification(
        '🔔 K-Market 실시간 알림이 켜졌습니다!',
        '17개국어 번역 채팅과 관심 키워드 매물 알림을 가장 빠르게 보내드립니다.',
        '/'
      );
    }
  };

  const handleDismiss = () => {
    setIsPromptOpen(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('kmarket_push_dismissed', 'true');
    }
  };

  return (
    <div className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-4 sm:bottom-24 z-50 sm:max-w-xs bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-amber-300 dark:border-gray-700 p-3 sm:p-4 animate-fadeIn">
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      <div className="flex items-start space-x-2.5">
        <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 flex items-center justify-center shrink-0">
          <BellRing className="w-4 h-4 animate-pulse" />
        </div>
        <div className="flex-1 min-w-0 pr-3">
          <h4 className="text-xs font-black text-gray-900 dark:text-white truncate">
            {t('실시간 거래 & 키워드 알림 받기')}
          </h4>
          <p className="text-[10px] sm:text-[11px] text-gray-600 dark:text-gray-300 mt-0.5 leading-tight line-clamp-2">
            {t('채팅 도착 및 관심 매물 등록 시 즉시 알려드려요!')}
          </p>
        </div>
      </div>

      <div className="mt-2.5 flex items-center space-x-2">
        <button
          onClick={handleEnablePush}
          className="flex-1 py-1.5 px-3 bg-amber-500 hover:bg-amber-600 active:scale-95 text-[#09101f] font-black text-[11px] sm:text-xs rounded-xl shadow-xs transition-all flex items-center justify-center space-x-1 cursor-pointer"
        >
          <Bell className="w-3 h-3" />
          <span>{t('알림 켜기')}</span>
        </button>
        <button
          onClick={handleDismiss}
          className="py-1.5 px-2.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-[11px] sm:text-xs font-bold rounded-xl hover:bg-gray-200"
        >
          {t('안내창 닫기')}
        </button>
      </div>
    </div>
  );
}
