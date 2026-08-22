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
    <div className="fixed bottom-24 right-4 z-40 max-w-xs w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-amber-200 dark:border-gray-700 p-4 animate-fadeIn">
      <button
        onClick={handleDismiss}
        className="absolute top-2.5 right-2.5 text-gray-400 hover:text-gray-600 p-1"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-start space-x-3">
        <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 flex items-center justify-center shrink-0">
          <BellRing className="w-5 h-5 animate-pulse" />
        </div>
        <div className="flex-1 min-w-0 pr-4">
          <h4 className="text-xs font-black text-gray-900 dark:text-white truncate">
            {t('pwa_push_mgr_title')}
          </h4>
          <p className="text-[11px] text-gray-600 dark:text-gray-300 mt-0.5 leading-snug">
            {t('pwa_push_mgr_desc')}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center space-x-2">
        <button
          onClick={handleEnablePush}
          className="flex-1 py-2 px-3 bg-amber-500 hover:bg-amber-600 active:scale-95 text-[#09101f] font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-1 cursor-pointer"
        >
          <Bell className="w-3.5 h-3.5" />
          <span>{t('pwa_push_mgr_btn')}</span>
        </button>
        <button
          onClick={handleDismiss}
          className="py-2 px-2.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold rounded-xl"
        >
          {t('close_btn')}
        </button>
      </div>
    </div>
  );
}
