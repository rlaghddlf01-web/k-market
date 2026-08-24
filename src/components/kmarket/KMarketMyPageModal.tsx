'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useState } from 'react';
import { useKMarket } from '@/context/KMarketContext';
import {
  X,
  Heart,
  Package,
  ShoppingBag,
  Flame,
  ShieldCheck,
  HelpCircle,
  Sparkles,
  ArrowRight,
  MapPin,
  Bell,
  MessageSquarePlus,
  Lightbulb,
  Download,
  Smartphone,
} from 'lucide-react';
import CountryFlag from './CountryFlag';
import KMarketEasyTaxRefundWidget from './KMarketEasyTaxRefundWidget';
import { triggerPwaInstall } from '@/lib/pwaInstaller';
import { getAdaptedItemTitle, getAdaptedKeyword } from '@/lib/itemTranslationService';
import { getAdaptedItemRegion } from '@/lib/dynamicLocationAdapter';

interface KMarketMyPageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function KMarketMyPageModal({ isOpen, onClose }: KMarketMyPageModalProps) {
  const { t, currentLang } = useLanguage();
  const {
    items,
    likedItemIds,
    toggleLike,
    authedUser,
    setIsTaxModalOpen,
    setIsKeywordModalOpen,
    setIsFeedbackModalOpen,
    keywordAlerts,
    openChatForItem,
    setSelectedItem,
    updateItemStatus,
  } = useKMarket();

  // 3대 탭: 'selling'(판매내역), 'buying'(구매내역), 'favorites'(찜한물건)
  const [activeTab, setActiveTab] = useState<'selling' | 'buying' | 'favorites'>('selling');
  const [sellingSubFilter, setSellingSubFilter] = useState<'all' | 'selling' | 'sold'>('all');
  const [showMannerGuide, setShowMannerGuide] = useState(false);

  if (!isOpen) return null;

  // 유저 기본 프로필 (OCR 인증 여부에 따라 매너온도 계산)
  const isOcr = authedUser?.isOcrVerified ?? true;
  const userMannerTemp = isOcr ? 43.5 : 36.5;
  const userName = authedUser?.userName || 'NGUYEN VAN DUC';
  const userDisplayName = authedUser?.nickname || authedUser?.userName || (currentLang === 'ko' ? '안산호랑이 (외국인 회원)' : (currentLang === 'vi' ? 'Nguyễn Văn Đức' : (currentLang === 'zh' ? '小王 (外国人会员)' : 'NGUYEN VAN DUC')));
  const userCountry = authedUser?.country || 'VN';
  const userVisa = authedUser?.visaType
    ? (authedUser.visaType.includes('E-9')
        ? t('이나인(E-9) 비전문취업 비자')
        : authedUser.visaType.includes('E-7')
        ? t('이세븐(E-7) 특정활동 전문 비자')
        : authedUser.visaType)
    : t('이나인(E-9) 비전문취업 비자');
  const rawDormitory = authedUser?.dormitory || authedUser?.region || t('내 주변 공단 기숙사');
  const userDormitory = getAdaptedItemRegion({ id: 'user-loc-1', region: rawDormitory } as any, authedUser?.region, currentLang);

  // 1. 내가 찜한 매물
  const favoriteItems = items.filter((item) => likedItemIds.has(item.id));

  // 2. 내가 판매중/판매완료한 매물 (시연용 seller_id 일치 매물)
  const mySellingItems = items.filter(
    (item) => item.seller_country === userCountry || item.seller_id === authedUser?.userId || item.id === 'item-1' || item.id === 'item-4'
  );

  const filteredSellingItems = mySellingItems.filter((item) => {
    if (sellingSubFilter === 'selling') return item.status === 'selling' || item.status === 'reserved';
    if (sellingSubFilter === 'sold') return item.status === 'sold';
    return true;
  });

  // 3. 내가 구매 완료한 매물 (시연용)
  const myPurchasedItems = items.filter((item) => item.id === 'item-2' || item.id === 'item-6');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs animate-fadeIn flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-gray-800 flex flex-col max-h-[90vh] my-auto">
        {/* 모달 상단 프로필 헤더 - 앱 시그니처 딥 네이비 & 2px 골드 라인 */}
        <div 
          style={{
            background: 'linear-gradient(135deg, #09101f 0%, #111d38 50%, #162447 100%)',
            borderBottom: '2px solid #f3ba2f',
            boxShadow: '0 4px 20px rgba(9, 16, 31, 0.40)',
          }}
          className="p-5 text-white flex items-center justify-between shrink-0 relative overflow-hidden"
        >
          {/* 미세한 골드 앰비언트 글로우 */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#f3ba2f]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center space-x-3.5 relative z-10">
            {/* 프로필 국기 아바타 박스 (골드 테두리 & 딥 네이비) */}
            <div className="w-12 h-12 rounded-2xl bg-[#09101f] flex items-center justify-center text-white text-xl shadow-lg border-2 border-[#f3ba2f]/80 shrink-0">
              <CountryFlag countryCode={userCountry} size="lg" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">{userDisplayName}</h2>
                <span className="bg-[#f3ba2f] text-[#09101f] font-black text-[10px] px-2.5 py-0.5 rounded-full shadow-xs">
                  {userVisa}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#f3ba2f]" />
                <span>{userDormitory}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-[#f3ba2f] hover:text-[#09101f] text-white transition-all cursor-pointer border border-white/20 hover:border-[#f3ba2f] relative z-10 shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 📜 모달 바디 스크롤 영역 (세금 환급 계산기 + 매너온도 + 키워드알림 + 3대 상품 탭 목록) */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-5 space-y-4 bg-slate-50/50 dark:bg-gray-900">
          {/* 💰 1. KTRS 이지텍스 실시간 10초 환급 계산기 & 즉시 신청 위젯 */}
          <div>
            <KMarketEasyTaxRefundWidget
              onApplyClick={() => {
                onClose();
              }}
            />
          </div>

          {/* 🌡️ 2. K-Trust 매너온도 & 실물 신분증 OCR 인증 현황 카드 (독립 라운드 카드 & 시원한 여백) */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-slate-200/80 dark:border-gray-700 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1">
                  <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
                  <span>{t('케이마켓 매너온도')}</span>
                </span>
                <button
                  onClick={() => setShowMannerGuide(!showMannerGuide)}
                  className="inline-flex items-center space-x-0.5 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{t('매너온도란?')}</span>
                </button>
              </div>

              <div className="flex items-center space-x-1.5">
                <span className="text-lg font-black text-orange-600 dark:text-orange-400">
                  {userMannerTemp}℃
                </span>
                <span className="text-xs">🔥</span>
              </div>
            </div>

            {/* 비주얼 온도 게이지 바 */}
            <div className="relative w-full h-2.5 bg-slate-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 rounded-full transition-all duration-1000 shadow-xs"
                style={{ width: `${Math.min(userMannerTemp * 1.3, 100)}%` }}
              />
            </div>

            {/* OCR 가산점 안내 & 신뢰 뱃지 */}
            <div className="flex flex-wrap items-center justify-between text-xs gap-2 pt-0.5">
              <div className="flex items-center space-x-1.5">
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold text-[11px] border border-emerald-200/60 dark:border-emerald-800/40">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t('법무부 실물 외국인등록증(외국인등록증) 신분증 자동인식 인증 (+7.0℃)')}</span>
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">
                {t('신뢰도 상위 12% 최우수 회원 🛡️')}
              </span>
            </div>

            {/* ❓ 매너온도란? 설명 아코디언/안내 박스 */}
            {showMannerGuide && (
              <div className="p-3.5 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-800 text-xs space-y-2 animate-fadeIn">
                <h4 className="font-black text-blue-950 dark:text-blue-200 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>{t('💡 케이마켓 매너온도 시스템 안내')}</span>
                </h4>
                <ul className="space-y-1 text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  <li>• <strong>36.5℃</strong>{t('는 사람의 따뜻한 체온처럼 가입 시 주어지는 기본 신뢰 점수입니다.')}</li>
                  <li>• <strong>{t('📸 실물 신분증 신분증 자동인식 사진 촬영')}</strong> {t('시 즉시')} <strong>+7.0℃</strong>{t('가 올라가')} <strong>{t('43.5℃(골드 등급)')}</strong>{t('가 됩니다.')}</li>
                  <li>• <strong>{t('43.5℃ 이상')}</strong>{t('이면 구매자들이 100% 신뢰하여 내 매물이')} <strong>{t('3배 더 빠르게 판매')}</strong>{t('됩니다!')}</li>
                  <li>{t('• 직거래 후 시간 약속과 친절 칭찬 후기를 받으면 온도가 계속 상승합니다. (노쇼/사기 신고 시 하강)')}</li>
                </ul>
              </div>
            )}
          </div>

          {/* 📲 1초 만에 K-Market 앱 설치하기 (PWA 홈 화면 추가) */}
          <div className="px-4 py-3 bg-gradient-to-r from-[#09101f] via-[#111d38] to-[#162447] text-white rounded-2xl border-2 border-[#f3ba2f]/70 shadow-md flex items-center justify-between gap-3">
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#f3ba2f] to-[#e5a91b] text-[#09101f] flex items-center justify-center font-black shrink-0 shadow-xs">
                <Smartphone className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="min-w-0">
                <h5 className="text-xs font-black text-white flex items-center gap-1.5 truncate">
                  <span>{t('케이마켓 앱을 1초 만에 설치하세요')}</span>
                  <span className="text-[9px] bg-[#f3ba2f] text-[#09101f] px-1.5 py-0.2 rounded-full font-black">
                    {t('1초 설치')}
                  </span>
                </h5>
                <p className="text-[10px] text-slate-300 mt-0.5 truncate">
                  {t('스마트폰 홈 화면에 추가하고 실시간 번역 채팅과 거래 알림을 받아보세요.')}
                </p>
              </div>
            </div>

            <button
              onClick={() => triggerPwaInstall()}
              className="px-3.5 py-2 bg-gradient-to-r from-[#f3ba2f] to-[#e5a91b] hover:from-[#fcd34d] hover:to-[#f59e0b] text-[#09101f] font-black text-xs rounded-xl shadow-xs transition-all shrink-0 cursor-pointer flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5 stroke-[3]" />
              <span>{t('홈 화면에 앱 설치하기')}</span>
            </button>
          </div>

          {/* 🔔 키워드 실시간 알림 관리 섹션 (독립 카드) */}
          <div className="px-4 py-3 bg-white dark:bg-gray-800 rounded-2xl border border-slate-200/80 dark:border-gray-700 shadow-sm flex items-center justify-between">
            <div className="flex items-center space-x-2 min-w-0">
              <div className="p-2 rounded-xl bg-blue-600 text-white shrink-0 shadow-xs">
                <Bell className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h5 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5 truncate">
                  <span>{t('🔔 키워드 실시간 알림 등록')} ({keywordAlerts.length})</span>
                </h5>
                <div className="flex items-center gap-1 mt-0.5 overflow-x-auto no-scrollbar">
                  {keywordAlerts.slice(0, 3).map((kw) => (
                    <span
                      key={kw.id}
                      className="text-[10px] bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-300 px-1.5 py-0.2 rounded-md font-bold border border-blue-200/80 shrink-0"
                    >
                      #{getAdaptedKeyword(kw.keyword, currentLang)}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                setIsKeywordModalOpen(true);
              }}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all shrink-0 cursor-pointer"
            >
              {t('알림 설정')}
            </button>
          </div>

          {/* 📦 3대 거래 관리 탭 바: [내가 파는 물건] [내가 산 물건] [내가 찜한 물건] (연한 커피/카푸치노 스타일) */}
          <div className="sticky top-0 z-20 flex border-b border-[#e8ded3] bg-[#fdfbf9]/95 backdrop-blur-md p-1.5 gap-1.5 shadow-xs">
            <button
              onClick={() => setActiveTab('selling')}
              className={`flex-1 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                activeTab === 'selling'
                  ? 'bg-linear-to-r from-[#9c6644] to-[#7f4f24] text-white shadow-md shadow-[#9c6644]/25 ring-1 ring-[#d4a373]'
                  : 'text-[#7d6b5c] hover:bg-[#f4ece4]'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>{t('내가 파는 물건')} ({mySellingItems.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('buying')}
              className={`flex-1 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                activeTab === 'buying'
                  ? 'bg-linear-to-r from-[#9c6644] to-[#7f4f24] text-white shadow-md shadow-[#9c6644]/25 ring-1 ring-[#d4a373]'
                  : 'text-[#7d6b5c] hover:bg-[#f4ece4]'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t('내가 산 물건')} ({myPurchasedItems.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex-1 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                activeTab === 'favorites'
                  ? 'bg-linear-to-r from-[#b05d5d] to-[#8c4343] text-white shadow-md shadow-[#b05d5d]/25 ring-1 ring-[#e09f9f]'
                  : 'text-[#7d6b5c] hover:bg-[#f4ece4]'
              }`}
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>{t('내가 찜한 물건')} ({favoriteItems.length})</span>
            </button>
          </div>

          {/* 탭 컨텐츠 상품 목록 영역 */}
          <div className="p-4 space-y-3 pb-8 bg-[#fdfbf9]">
          {/* 1. 내가 파는 물건 탭 */}
          {activeTab === 'selling' && (
            <div className="space-y-3">
              {/* 서브 필터: 전체 / 판매중 / 거래완료 (연한 커피 라떼 & 카라멜 모카) */}
              <div className="flex items-center gap-1.5 text-xs">
                {(['all', 'selling', 'sold'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSellingSubFilter(filter)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                      sellingSubFilter === filter
                        ? 'bg-[#8c5e3c] text-white shadow-xs'
                        : 'bg-[#f4ece4] text-[#7d6b5c] hover:bg-[#eae0d5] border border-[#e8ded3]'
                    }`}
                  >
                    {filter === 'all' && `${t('전체')} (${mySellingItems.length})`}
                    {filter === 'selling' && t('판매중 / 예약중')}
                    {filter === 'sold' && t('거래완료')}
                  </button>
                ))}
              </div>

              {filteredSellingItems.length === 0 ? (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <Package className="w-12 h-12 mx-auto text-slate-300" />
                  <p className="text-xs">{t('해당 상태의 판매 매물이 없습니다.')}</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-gray-800">
                  {filteredSellingItems.map((item) => (
                    <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                      <div
                        onClick={() => {
                          setSelectedItem(item);
                          onClose();
                        }}
                        className="flex items-center space-x-3 flex-1 min-w-0 cursor-pointer"
                      >
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-slate-100"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-1.5">
                            {item.status === 'selling' && (
                              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                                {t('판매중')}
                              </span>
                            )}
                            {item.status === 'reserved' && (
                              <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                                {t('예약중')}
                              </span>
                            )}
                            {item.status === 'sold' && (
                              <span className="bg-slate-200 text-slate-700 text-[10px] font-black px-2 py-0.5 rounded-full">
                                {t('거래완료')}
                              </span>
                            )}
                            <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                              {getAdaptedItemTitle(item, currentLang)}
                            </h4>
                          </div>
                          <p className="text-xs font-black text-blue-600 dark:text-blue-400 mt-1">
                            {item.price === 0 ? t('0원 무료 나눔') : `${item.price.toLocaleString()} ${t('원 (대한민국 원화)')}`}
                          </p>
                          <span className="text-[11px] text-slate-400 mt-0.5 block truncate">
                            {getAdaptedItemRegion(item, authedUser?.region, currentLang)} • {t('관심 찜 등록 수')} {item.like_count}
                          </span>
                        </div>
                      </div>

                      {/* 판매 상태 변경 버튼 그룹 */}
                      <div className="flex items-center space-x-1.5 shrink-0">
                        {item.status === 'selling' && (
                          <button
                            onClick={() => updateItemStatus(item.id, 'reserved')}
                            className="px-2.5 py-1.5 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 text-xs font-bold border border-amber-200 cursor-pointer"
                          >
                            {t('예약중 변경')}
                          </button>
                        )}
                        {item.status === 'reserved' && (
                          <button
                            onClick={() => updateItemStatus(item.id, 'sold')}
                            className="px-2.5 py-1.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold cursor-pointer"
                          >
                            {t('거래완료')}
                          </button>
                        )}
                        {item.status === 'sold' && (
                          <button
                            onClick={() => updateItemStatus(item.id, 'selling')}
                            className="px-2.5 py-1.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs font-bold cursor-pointer"
                          >
                            {t('판매중 복원')}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 2. 내가 산 물건 탭 */}
          {activeTab === 'buying' && (
            <div className="space-y-3">
              {myPurchasedItems.length === 0 ? (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <ShoppingBag className="w-12 h-12 mx-auto text-slate-300" />
                  <p className="text-xs">{t('구매 완료한 내역이 없습니다.')}</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-gray-800">
                  {myPurchasedItems.map((item) => (
                    <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                      <div
                        onClick={() => {
                          setSelectedItem(item);
                          onClose();
                        }}
                        className="flex items-center space-x-3 flex-1 min-w-0 cursor-pointer"
                      >
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-slate-100"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-1">
                            {t('직거래 완료 🛍️')}
                          </span>
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                            {getAdaptedItemTitle(item, currentLang)}
                          </h4>
                          <p className="text-xs font-black text-slate-800 dark:text-slate-200 mt-0.5">
                            {item.price === 0 ? t('0원 무료 나눔') : `${item.price.toLocaleString()} ${t('원 (대한민국 원화)')}`}
                          </p>
                          <span className="text-[11px] text-slate-400 block truncate">
                            {t('판매자 국가')}: {item.seller_name} ({getAdaptedItemRegion(item, authedUser?.region, currentLang)})
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          const doneMsg = t('회원님에게 따뜻한 칭찬 후기가 전달되었습니다.');
                          alert(`[${item.seller_name}] ${doneMsg}`);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold border border-blue-200 shrink-0 cursor-pointer"
                      >
                        {t('후기 남기기')} ⭐
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 3. 내가 찜한 물건 탭 */}
          {activeTab === 'favorites' && (
            <div className="space-y-3">
              {favoriteItems.length === 0 ? (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <Heart className="w-12 h-12 mx-auto text-slate-300" />
                  <p className="text-xs font-bold">{t('아직 찜한 물건이 없습니다.')}</p>
                  <p className="text-[11px]">{t('마음에 드는 물건에 하트(❤️)를 눌러보세요!')}</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-gray-800">
                  {favoriteItems.map((item) => (
                    <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                      <div
                        onClick={() => {
                          setSelectedItem(item);
                          onClose();
                        }}
                        className="flex items-center space-x-3 flex-1 min-w-0 cursor-pointer"
                      >
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-slate-100"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                            {getAdaptedItemTitle(item, currentLang)}
                          </h4>
                          <p className="text-xs font-black text-rose-600 dark:text-rose-400 mt-0.5">
                            {item.price === 0 ? t('0원 무료 나눔') : `${item.price.toLocaleString()} ${t('원 (대한민국 원화)')}`}
                          </p>
                          <span className="text-[11px] text-slate-400 block truncate">
                            {getAdaptedItemRegion(item, authedUser?.region, currentLang)} • {item.seller_name}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1.5 shrink-0">
                        <button
                          onClick={() => {
                            onClose();
                            openChatForItem(item);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                        >
                          {t('1:1 안심 번역 채팅하기')} 💬
                        </button>
                        <button
                          onClick={() => toggleLike(item.id)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                          title={t('찜 취소')}
                        >
                          <Heart className="w-5 h-5 fill-rose-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 💡 앱 개선 제안 / VOC 건의 창구 (마이페이지 최하단) */}
          <div className="mt-6 pt-4 border-t border-slate-200/80">
            <div className="px-4 py-3.5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl border border-indigo-900/60 shadow-sm flex items-center justify-between gap-3">
              <div className="flex items-center space-x-2.5 min-w-0">
                <div className="p-2 rounded-xl bg-amber-400 text-slate-950 shrink-0 shadow-xs">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h5 className="text-xs font-black text-white flex items-center gap-1.5 truncate">
                    <span>{t('💡 앱 개선 제안 및 건의하기')}</span>
                    <span className="text-[9px] bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded-md font-bold">
                      {t('고객 소통 창구')}
                    </span>
                  </h5>
                  <p className="text-[10px] text-slate-300 mt-0.5 truncate">
                    {t('불편한 점, 번역 오류, 새로운 기능 및 지역 추가 요청을 관리자에게 직접 보내주세요.')}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  setIsFeedbackModalOpen(true);
                }}
                className="px-3.5 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-xs transition-all shrink-0 cursor-pointer"
              >
                {t('의견 보내기')}
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
