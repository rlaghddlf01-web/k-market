'use client';

import React, { useState } from 'react';
import { useKMarket } from '@/context/KMarketContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  Bell,
  X,
  CheckCheck,
  Trash2,
  Sparkles,
  MessageCircle,
  TrendingDown,
  Clock,
  Info,
  ChevronRight,
  Sliders,
} from 'lucide-react';
import { AppNotification, NotificationType } from '@/types/kmarket';
import { getAdaptedNotification } from '@/lib/itemTranslationService';

export default function KMarketNotificationDrawer() {
  const {
    isNotificationCenterOpen,
    setIsNotificationCenterOpen,
    notifications,
    unreadNotificationCount,
    markAllNotificationsAsRead,
    markNotificationAsRead,
    removeNotification,
    setSelectedItem,
    openChatForItem,
    items,
    setIsKeywordModalOpen,
  } = useKMarket();

  const { t, currentLang } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | NotificationType>('all');

  if (!isNotificationCenterOpen) return null;

  // 필터링된 알림 목록
  const filteredNotifications = notifications.filter((notif) => {
    if (activeFilter === 'all') return true;
    return notif.type === activeFilter;
  });

  const handleNotificationClick = (notif: AppNotification) => {
    markNotificationAsRead(notif.id);

    if (notif.item_id) {
      const matched = items.find((i) => i.id === notif.item_id);
      if (matched) {
        setIsNotificationCenterOpen(false);
        if (notif.type === 'chat') {
          openChatForItem(matched);
        } else {
          setSelectedItem(matched);
        }
      }
    }
  };

  const getIconForType = (type: NotificationType) => {
    switch (type) {
      case 'keyword':
        return <Sparkles className="w-4 h-4 text-amber-500" />;
      case 'chat':
        return <MessageCircle className="w-4 h-4 text-blue-500" />;
      case 'price_drop':
        return <TrendingDown className="w-4 h-4 text-rose-500" />;
      case 'appointment':
        return <Clock className="w-4 h-4 text-emerald-500" />;
      case 'system':
      default:
        return <Info className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 h-full shadow-2xl flex flex-col animate-slideLeft">
        {/* 상단 헤더 - 딥 네이비 & 골드 뱃지 */}
        <div
          style={{
            background: 'linear-gradient(135deg, #09101f 0%, #111d38 50%, #162447 100%)',
            borderBottom: '2px solid #f3ba2f',
          }}
          className="p-4 text-white flex items-center justify-between shadow-md shrink-0"
        >
          <div className="flex items-center space-x-2.5">
            <div className="relative p-2 rounded-xl bg-white/10 border border-white/20">
              <Bell className="w-5 h-5 text-[#f3ba2f]" />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center animate-pulse">
                  {unreadNotificationCount}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-base font-black text-white flex items-center gap-1.5">
                <span>{t('notif_center_title')}</span>
                <span className="text-xs px-2 py-0.2 rounded-full bg-[#f3ba2f] text-[#09101f] font-extrabold">
                  {notifications.length}
                </span>
              </h2>
              <p className="text-[11px] text-slate-300">
                {t('notif_center_desc')}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            {unreadNotificationCount > 0 && (
              <button
                onClick={markAllNotificationsAsRead}
                className="px-2.5 py-1 text-[11px] font-bold text-sky-200 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-1 cursor-pointer border border-white/10"
                title={t('auto_ui_234')}
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>{t('notif_center_mark_all')}</span>
              </button>
            )}

            <button
              onClick={() => setIsNotificationCenterOpen(false)}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. 필터 탭 바 (전체 / 키워드 / 채팅 / 가격인하) */}
        <div className="p-2.5 bg-slate-50 dark:bg-gray-800/60 border-b border-slate-200/80 dark:border-gray-800 flex items-center justify-between gap-1.5 shrink-0">
          <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: t('filter_all') },
              { id: 'keyword', label: t('notif_tab_keyword') },
              { id: 'chat', label: t('notif_tab_chat') },
              { id: 'price_drop', label: t('notif_tab_price_drop') },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  activeFilter === tab.id
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                    : 'bg-white dark:bg-gray-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-gray-800 border border-slate-200 dark:border-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setIsNotificationCenterOpen(false);
              setIsKeywordModalOpen(true);
            }}
            className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline shrink-0 flex items-center gap-0.5"
          >
            <Sliders className="w-3 h-3" />
            <span>{t('btn_setup_alerts')}</span>
          </button>
        </div>

        {/* 3. 알림 목록 스크롤 영역 */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5 bg-slate-50/40 dark:bg-gray-900/40">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif) => {
              const isUnread = !notif.is_read;
              const adapted = getAdaptedNotification(notif, currentLang, t);

              return (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`p-3 rounded-2xl border transition-all duration-200 cursor-pointer relative group flex items-start gap-3 ${
                    isUnread
                      ? 'bg-blue-50/70 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/60 shadow-xs hover:border-blue-400'
                      : 'bg-white dark:bg-gray-800/70 border-slate-200/80 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {/* 알림 아이콘 뱃지 */}
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                      isUnread
                        ? 'bg-white dark:bg-gray-800 border-blue-300 dark:border-blue-700 shadow-xs'
                        : 'bg-slate-100 dark:bg-gray-700 border-slate-200 dark:border-gray-600'
                    }`}
                  >
                    {getIconForType(notif.type)}
                  </div>

                  {/* 알림 본문 */}
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1.5 truncate">
                        <span
                          className={`text-xs font-black truncate ${
                            isUnread
                              ? 'text-blue-950 dark:text-blue-200'
                              : 'text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          {adapted.title}
                        </span>
                        {isUnread && (
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 animate-pulse" />
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 shrink-0">
                        {adapted.created_at}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug line-clamp-2">
                      {adapted.message}
                    </p>
                  </div>

                  {/* 썸네일 이미지 (있을 경우) */}
                  {notif.item_image && (
                    <img
                      src={notif.item_image}
                      alt="item"
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-gray-700 shrink-0"
                    />
                  )}

                  {/* 개별 삭제 버튼 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeNotification(notif.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-500 rounded-md transition-all cursor-pointer"
                    title={t('auto_ui_236')}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 space-y-2 text-slate-400 dark:text-slate-500">
              <Bell className="w-10 h-10 mx-auto opacity-30 stroke-1" />
              <p className="text-xs font-bold">{t('auto_ui_237')}</p>
              <p className="text-[11px] max-w-xs mx-auto text-slate-400">
                {t('notif_empty_keyword_tip')}
              </p>
            </div>
          )}
        </div>

        {/* 4. 하단 키워드 알림 바로가기 CTA */}
        <div className="p-3 bg-white dark:bg-gray-900 border-t border-slate-200 dark:border-gray-800 shrink-0">
          <button
            onClick={() => {
              setIsNotificationCenterOpen(false);
              setIsKeywordModalOpen(true);
            }}
            className="w-full py-2.5 px-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 hover:opacity-95 active:scale-98 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#f3ba2f]" />
            <span>{t('auto_ui_238')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
