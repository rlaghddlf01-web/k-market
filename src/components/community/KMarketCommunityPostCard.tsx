'use client';

import React, { useState } from 'react';
import { CommunityPost, COMMUNITY_CATEGORIES } from '@/types/community';
import { useLanguage } from '@/context/LanguageContext';
import { useCommunity } from '@/context/CommunityContext';
import CountryFlag from '../kmarket/CountryFlag';
import {
  Heart,
  Coffee,
  MessageCircle,
  Eye,
  Globe,
  MoreVertical,
  Flag,
  Share2,
} from 'lucide-react';

interface KMarketCommunityPostCardProps {
  post: CommunityPost;
  onSelect: (post: CommunityPost) => void;
}

export default function KMarketCommunityPostCard({
  post,
  onSelect,
}: KMarketCommunityPostCardProps) {
  const { t } = useLanguage();
  const { currentLang } = useLanguage();
  const { reactToPost, setIsReportModalOpen, setReportTarget } = useCommunity();
  const [showMenu, setShowMenu] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);

  const categoryInfo = COMMUNITY_CATEGORIES.find((c) => c.id === post.category) || COMMUNITY_CATEGORIES[0];

  // 15개국어 번역 제목 및 본문
  const transObj = post.translations?.[currentLang];
  const displayTitle = !showOriginal && transObj?.title ? transObj.title : post.title;
  const displayContent = !showOriginal && transObj?.content ? transObj.content : post.content;
  const hasTranslation = Boolean(transObj && currentLang !== post.source_lang);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    reactToPost(post.id, 'like');
  };

  const handleCheerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    reactToPost(post.id, 'cheer');
  };

  const handleReportClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(false);
    setReportTarget({
      type: 'post',
      id: post.id,
      targetUserId: post.user_id,
      targetUserName: post.user_name,
    });
    setIsReportModalOpen(true);
  };

  return (
    <article
      onClick={() => onSelect(post)}
      className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-gray-800/80 border border-slate-200/80 dark:border-gray-700/80 hover:border-[#f3ba2f]/70 hover:shadow-md transition-all cursor-pointer space-y-3.5 group relative"
    >
      {/* 1. 상단 작성자 정보 & 카테고리 뱃지 & 더보기 메뉴 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <CountryFlag
            countryCode={post.user_country}
            fallbackEmoji={post.user_flag}
            size="md"
            shape="circle"
            className="shadow-2xs"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                {post.user_name}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                • {post.region}
              </span>
            </div>
            <span className="text-[10px] text-slate-400">
              {new Date(post.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 relative">
          {/* 6대 카테고리 뱃지 */}
          <span
            className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${categoryInfo.color}`}
          >
            <span>{categoryInfo.icon}</span>
            <span>{categoryInfo.labelKo}</span>
          </span>

          {/* 더보기 / 신고 버튼 */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showMenu && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 top-6 w-32 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-slate-200 dark:border-gray-700 py-1 z-30 animate-fadeIn text-xs"
              >
                <button
                  onClick={handleReportClick}
                  className="w-full px-3 py-1.5 text-left text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-1.5 font-bold cursor-pointer"
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>{t('auto_ui_24')}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. 글 제목 및 본문 */}
      <div className="space-y-1.5">
        <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 transition-colors line-clamp-1">
          {displayTitle}
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed font-normal">
          {displayContent}
        </p>

        {/* 15개국어 번역 토글 뱃지 */}
        {hasTranslation && (
          <div className="pt-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowOriginal(!showOriginal);
              }}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 text-[10px] font-bold border border-blue-200 dark:border-blue-800/60 hover:bg-blue-100 transition-colors"
            >
              <Globe className="w-3 h-3" />
              <span>{showOriginal ? '🌐 번역문 보기 (Gemini AI)' : '🇰🇷 원문 보기'}</span>
            </button>
          </div>
        )}
      </div>

      {/* 3. 최대 5장 이미지 썸네일 그리드 (있을 경우) */}
      {post.images && post.images.length > 0 && (
        <div className="pt-1">
          <div
            className={`grid gap-1.5 rounded-2xl overflow-hidden ${
              post.images.length === 1
                ? 'grid-cols-1 max-h-56'
                : post.images.length === 2
                ? 'grid-cols-2 max-h-44'
                : post.images.length === 3
                ? 'grid-cols-3 max-h-36'
                : 'grid-cols-4 max-h-32'
            }`}
          >
            {post.images.slice(0, 4).map((img, idx) => (
              <div key={idx} className="relative w-full h-full bg-slate-100 dark:bg-gray-700 min-h-[100px]">
                <img
                  src={img}
                  alt={`post-img-${idx}`}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
                {idx === 3 && post.images.length > 4 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-black text-xs">
                    +{post.images.length - 4}장
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. 하단 감성 리액션 (공감해요 / 힘내세요 / 댓글수 / 조회수) */}
      <div className="pt-2 border-t border-slate-100 dark:border-gray-700/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          {/* ❤️ 공감해요 버튼 */}
          <button
            onClick={handleHeartClick}
            className="flex items-center gap-1 px-2 py-1 rounded-xl bg-slate-50 dark:bg-gray-700/50 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 transition-all font-bold cursor-pointer"
            title={t('auto_ui_26')}
          >
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
            <span>{post.like_count}</span>
          </button>

          {/* ☕ 힘내세요 / 위로 버튼 */}
          <button
            onClick={handleCheerClick}
            className="flex items-center gap-1 px-2 py-1 rounded-xl bg-slate-50 dark:bg-gray-700/50 hover:bg-amber-50 dark:hover:bg-amber-950/30 hover:text-amber-600 transition-all font-bold cursor-pointer"
            title={t('auto_ui_27')}
          >
            <Coffee className="w-3.5 h-3.5 text-amber-500" />
            <span>{t('auto_ui_28')}</span>
          </button>

          {/* 💬 댓글 수 */}
          <div className="flex items-center gap-1 px-2 py-1 font-bold text-slate-600 dark:text-slate-300">
            <MessageCircle className="w-3.5 h-3.5 text-blue-500" />
            <span>{post.comment_count}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-slate-400">
          <Eye className="w-3.5 h-3.5" />
          <span>{post.view_count}</span>
        </div>
      </div>
    </article>
  );
}
