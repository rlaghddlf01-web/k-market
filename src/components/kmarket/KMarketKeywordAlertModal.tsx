'use client';

import React, { useState } from 'react';
import { useKMarket } from '@/context/KMarketContext';
import { useLanguage } from '@/context/LanguageContext';
import { KeywordAlert, IndustrialRegion } from '@/types/kmarket';
import {
  Bell,
  Plus,
  Trash2,
  X,
  Sparkles,
  Flame,
  Search,
  MapPin,
  ToggleLeft,
  ToggleRight,
  BellRing,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sendLocalizedPushNotification } from '@/lib/webPushService';
import { getAdaptedKeyword } from '@/lib/itemTranslationService';

interface KMarketKeywordAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function KMarketKeywordAlertModal({
  isOpen,
  onClose,
}: KMarketKeywordAlertModalProps) {
  const { t, currentLang } = useLanguage();
  const {
    keywordAlerts,
    addKeywordAlert,
    removeKeywordAlert,
    toggleKeywordAlert,
  } = useKMarket();

  const POPULAR_KEYWORD_PRESETS = [
    { key: 'kw_preset_washer', defaultKo: '세탁기', icon: '🧺' },
    { key: 'kw_preset_fridge', defaultKo: '냉장고', icon: '🧊' },
    { key: 'kw_preset_iphone', defaultKo: '아이폰', icon: '📱' },
    { key: 'kw_preset_ricecooker', defaultKo: '밥솥', icon: '🍚' },
    { key: 'kw_preset_free', defaultKo: '0원', icon: '🎁' },
    { key: 'kw_preset_bike', defaultKo: '자전거', icon: '🚲' },
    { key: 'kw_preset_monitor', defaultKo: '모니터', icon: '💻' },
    { key: 'kw_preset_mattress', defaultKo: '매트리스', icon: '🛏️' },
  ];

  const [inputKeyword, setInputKeyword] = useState('');
  const [selectedZone, setSelectedZone] = useState<IndustrialRegion>('all');
  const [notifyBySms, setNotifyBySms] = useState(true);
  const [isTestingSms, setIsTestingSms] = useState(false);

  if (!isOpen) return null;

  // 키워드 신규 등록
  const handleAddKeyword = (kw: string) => {
    const trimmed = kw.trim();
    if (!trimmed) {
      alert(t('등록할 키워드를 입력해 주세요.'));
      return;
    }

    if (keywordAlerts.some((k) => k.keyword.toLowerCase() === trimmed.toLowerCase())) {
      alert(t('이미 등록된 키워드입니다.'));
      return;
    }

    addKeywordAlert({
      keyword: trimmed,
      industrial_zone: selectedZone,
      notify_by_sms: notifyBySms,
      is_active: true,
    });

    setInputKeyword('');
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {
      // ignore
    }
  };

  // 실시간 웹 푸시 발송 테스트
  const handleSimulateWebPush = async (keyword: string) => {
    setIsTestingSms(true);
    await sendLocalizedPushNotification({
      type: 'keyword',
      lang: currentLang,
      params: {
        keyword,
        itemTitle: `${keyword}`,
        itemPrice: t('0원 무료 나눔'),
        itemRegion: selectedZone === 'all' ? t('안내 내용을 확인해 주세요') : selectedZone,
      },
      url: '/',
    });
    setIsTestingSms(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs animate-fadeIn flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-gray-800 flex flex-col max-h-[88vh] my-auto">
        {/* 모달 상단 헤더 */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center text-white shadow-inner">
              <Bell className="w-6 h-6 text-yellow-300 animate-bounce" />
            </div>
            <div>
              <div className="inline-flex items-center space-x-1.5 bg-black/20 px-2.5 py-0.5 rounded-full text-xs font-bold text-sky-200 mb-0.5">
                <Sparkles className="w-3 h-3 text-yellow-300" />
                <span>{t('외국인 선호도 1위 득템 알리미')}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black tracking-tight">
                {t('키워드 실시간 알림 설정')}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 본문 스크롤 영역 */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1 text-xs sm:text-sm">
          {/* 키워드 직접 입력 폼 */}
          <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 space-y-3">
            <span className="text-xs font-black text-blue-950 dark:text-blue-200 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-blue-600" />
              <span>{t('새 키워드 등록하기')}</span>
            </span>

            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputKeyword}
                  onChange={(e) => setInputKeyword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddKeyword(inputKeyword);
                    }
                  }}
                  placeholder={t('예: 세탁기, 아이폰, 0원, 밥솥')}
                  className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>

              <button
                type="button"
                onClick={() => handleAddKeyword(inputKeyword)}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all shrink-0 cursor-pointer"
              >
                {t('새 매물 등록하기')}
              </button>
            </div>

            {/* 공단 필터 및 웹 푸시 수신 토글 */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value as IndustrialRegion)}
                  className="px-2 py-1 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  <option value="all">{t('안내 내용을 확인해 주세요')}</option>
                  <option value="pyeongtaek">{t('평택 공단')}</option>
                  <option value="ansan">{t('안산 원곡동')}</option>
                  <option value="hwaseong">{t('화성 향남/향남공단')}</option>
                  <option value="gumi">{t('구미 국가산단')}</option>
                </select>
              </div>

              <label className="flex items-center space-x-1.5 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                <BellRing className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                <span>{t('실시간 웹 푸시 알림 수신 (무료)')}</span>
                <input
                  type="checkbox"
                  checked={notifyBySms}
                  onChange={(e) => setNotifyBySms(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-0 cursor-pointer ml-1"
                />
              </label>
            </div>
          </div>

          {/* 외국인 근로자 인기 급상승 키워드 칩 프리셋 */}
          <div className="space-y-2">
            <span className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>{t('실시간 인기 검색 키워드 (클릭 시 1초 등록)')}</span>
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {POPULAR_KEYWORD_PRESETS.map((preset) => {
                const label = t(preset.key as any) || preset.defaultKo;
                return (
                  <button
                    key={preset.key}
                    type="button"
                    onClick={() => handleAddKeyword(label)}
                    className="p-2 rounded-xl bg-slate-50 hover:bg-blue-50 dark:bg-gray-800 border border-slate-200/80 dark:border-gray-700 text-left transition-all hover:border-blue-400 cursor-pointer group"
                  >
                    <span className="text-sm block">{preset.icon}</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 truncate block mt-0.5">
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 내가 등록한 키워드 목록 */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-900 dark:text-white">
                {t('내 등록 키워드')} ({keywordAlerts.length}/10)
              </span>
              <span className="text-[11px] text-slate-400">
                {t('새 매물 등록 시 1초 만에 알림')}
              </span>
            </div>

            {keywordAlerts.length === 0 ? (
              <div className="py-8 text-center text-slate-400 space-y-1 bg-slate-50 dark:bg-gray-800/40 rounded-2xl border border-dashed border-slate-200 dark:border-gray-800">
                <Bell className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-xs font-bold">{t('등록된 키워드가 없습니다.')}</p>
                <p className="text-[11px]">{t('원하는 키워드를 등록하고 헐값 꿀매물을 가장 먼저 잡으세요!')}</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-gray-800 bg-white dark:bg-gray-800/60 rounded-2xl border border-slate-200 dark:border-gray-800 p-2 space-y-1">
                {keywordAlerts.map((alertItem) => (
                  <div
                    key={alertItem.id}
                    className="py-2.5 px-2 flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center space-x-2.5 flex-1 min-w-0">
                      <span className="p-2 rounded-xl bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-black text-xs shrink-0">
                        #{getAdaptedKeyword(alertItem.keyword, currentLang)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1.5">
                          <span className="text-xs font-black text-slate-900 dark:text-white truncate">
                            {getAdaptedKeyword(alertItem.keyword, currentLang)}
                          </span>
                          <span className="text-[10px] bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-slate-300 px-1.5 py-0.2 rounded-sm">
                            {alertItem.industrial_zone === 'all' ? t('안내 내용을 확인해 주세요') : alertItem.industrial_zone}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <span>{t('안내 내용을 확인해 주세요')} {alertItem.matched_count || 0}</span>
                          {alertItem.notify_by_sms && <span>{t('• 실시간 웹 푸시 알림 켜짐')}</span>}
                        </span>
                      </div>
                    </div>

                    {/* 액션: 웹 푸시 테스트 발송 / 활성화 토글 / 삭제 */}
                    <div className="flex items-center space-x-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleSimulateWebPush(alertItem.keyword)}
                        disabled={isTestingSms}
                        className="px-2.5 py-1 bg-amber-50 text-amber-800 hover:bg-amber-100 text-[11px] font-bold rounded-lg border border-amber-200 transition-all cursor-pointer flex items-center gap-1"
                        title={t('실시간 웹 푸시 알림 발송 테스트')}
                      >
                        <BellRing className="w-3 h-3 text-amber-600" />
                        <span>{t('푸시 테스트')}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleKeywordAlert(alertItem.id)}
                        className="p-1 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                        title={t('알림 켜기/끄기 토글')}
                      >
                        {alertItem.is_active ? (
                          <ToggleRight className="w-6 h-6 text-blue-600" />
                        ) : (
                          <ToggleLeft className="w-6 h-6 text-slate-300" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => removeKeywordAlert(alertItem.id)}
                        className="p-1 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                        title={t('키워드 삭제')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
