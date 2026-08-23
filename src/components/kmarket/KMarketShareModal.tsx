'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { KMarketItem } from '@/types/kmarket';
import {
  X,
  Share2,
  Copy,
  Check,
  MessageCircle,
  Send,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface KMarketShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: KMarketItem | null;
}

export default function KMarketShareModal({
  isOpen,
  onClose,
  item,
}: KMarketShareModalProps) {
  const { t, formatWon, currentLang } = useLanguage();
  const [copied, setCopied] = useState(false);

  if (!isOpen || !item) return null;

  // 매물 공유 링크 (현재 접속 도메인 + ?item= 매물ID 딥링크)
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://k-market.vercel.app';
  const shareUrl = `${baseUrl}/?item=${item.id}`;
  const itemTitle = item.translations?.[currentLang]?.title || item.title;
  const itemPrice = item.price === 0 ? t('0원 무료나눔') : `${item.price.toLocaleString()}원`;
  
  // 공유 메시지 템플릿
  const shareText = `[K-Market] 🛒 ${itemTitle} (${itemPrice})\n📍 ${item.region}\n👉 ${shareUrl}`;

  // 1. 링크 복사 핸들러
  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      try {
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
      } catch (e) {}
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      alert(t('링크 복사에 실패했습니다.'));
    }
  };

  // 2. 왓츠앱 (WhatsApp) 공유
  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  // 3. 텔레그램 (Telegram) 공유
  const handleTelegramShare = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`[K-Market] ${itemTitle} (${itemPrice})`)}`;
    window.open(url, '_blank');
  };

  // 4. 라인 (LINE) 공유
  const handleLineShare = () => {
    const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  // 5. 카카오톡 (KakaoTalk Web Share Fallback)
  const handleKakaoShare = () => {
    if (navigator.share) {
      navigator.share({
        title: itemTitle,
        text: shareText,
        url: shareUrl,
      }).catch(() => {});
    } else {
      handleCopyLink();
      alert(t('링크가 복사되었습니다. 카카오톡 채팅방에 붙여넣기(Ctrl+V) 해주세요!'));
    }
  };

  // 6. 페이스북 (Facebook) 공유
  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  // 7. 웹 브라우저 네이티브 공유 API (모바일 지원 시)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: itemTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (e) {}
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs animate-fadeIn flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-gray-800 flex flex-col my-auto animate-scaleUp">
        {/* 모달 상단 헤더 */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center text-white shadow-inner">
              <Share2 className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <div className="inline-flex items-center space-x-1 bg-black/20 px-2.5 py-0.5 rounded-full text-xs font-bold text-cyan-200 mb-0.5">
                <Sparkles className="w-3 h-3 text-yellow-300" />
                <span>{t('외국인 커뮤니티 1초 입소문 공유')}</span>
              </div>
              <h3 className="font-black text-lg text-white">
                {t('친구에게 매물 공유하기')}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 매물 간략 요약 카드 */}
        <div className="p-4 bg-slate-50 dark:bg-gray-800/50 border-b border-slate-200 dark:border-gray-700 flex items-center space-x-3">
          {item.images?.[0] ? (
            <img
              src={item.images[0]}
              alt={itemTitle}
              className="w-14 h-14 rounded-2xl object-cover border border-slate-200 dark:border-gray-700 shrink-0"
            />
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-slate-200 dark:bg-gray-700 flex items-center justify-center shrink-0">
              <Share2 className="w-6 h-6 text-slate-400" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-sm font-black text-slate-900 dark:text-white truncate">
              {itemTitle}
            </p>
            <p className="text-sm font-black text-emerald-600 dark:text-emerald-400">
              {itemPrice}
            </p>
            <p className="text-xs text-slate-500 truncate">
              📍 {item.region}
            </p>
          </div>
        </div>

        {/* 메신저 그리드 버튼 목록 */}
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-4 gap-3 text-center">
            {/* 1. 왓츠앱 (동남아/남아시아 1위) */}
            <button
              type="button"
              onClick={handleWhatsAppShare}
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <div className="w-13 h-13 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-md group-hover:scale-105 group-active:scale-95 transition-all">
                <MessageCircle className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">WhatsApp</span>
            </button>

            {/* 2. 텔레그램 (중앙아시아/러시아 1위) */}
            <button
              type="button"
              onClick={handleTelegramShare}
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <div className="w-13 h-13 rounded-2xl bg-[#0088cc] text-white flex items-center justify-center shadow-md group-hover:scale-105 group-active:scale-95 transition-all">
                <Send className="w-6 h-6 -translate-x-0.5 translate-y-0.5" />
              </div>
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Telegram</span>
            </button>

            {/* 3. 라인 (태국/일본 1위) */}
            <button
              type="button"
              onClick={handleLineShare}
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <div className="w-13 h-13 rounded-2xl bg-[#06C755] text-white flex items-center justify-center shadow-md group-hover:scale-105 group-active:scale-95 transition-all">
                <span className="text-xl font-black">LINE</span>
              </div>
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">LINE</span>
            </button>

            {/* 4. 카카오톡 */}
            <button
              type="button"
              onClick={handleKakaoShare}
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <div className="w-13 h-13 rounded-2xl bg-[#FEE500] text-[#3C1E1E] flex items-center justify-center shadow-md group-hover:scale-105 group-active:scale-95 transition-all font-black text-sm">
                TALK
              </div>
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">{t('카카오톡')}</span>
            </button>
          </div>

          {/* 링크 복사 바 */}
          <div className="pt-2">
            <label className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5 block">
              {t('매물 바로가기 링크 복사')}
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 px-3 py-2.5 bg-slate-100 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl text-xs text-slate-600 dark:text-slate-300 truncate select-all focus:outline-none"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition-all shrink-0 cursor-pointer ${
                  copied
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>{t('복사 완료!')}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>{t('링크 복사')}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 하단 닫기 */}
        <div className="p-3 bg-slate-50 dark:bg-gray-800/50 border-t border-slate-100 dark:border-gray-700 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 bg-slate-200 hover:bg-slate-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            {t('닫기')}
          </button>
        </div>
      </div>
    </div>
  );
}
