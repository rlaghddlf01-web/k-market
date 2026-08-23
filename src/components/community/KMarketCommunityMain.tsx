'use client';

import { useLanguage } from '@/context/LanguageContext';
import React from 'react';
import { useCommunity } from '@/context/CommunityContext';
import { COMMUNITY_CATEGORIES, CommunityCategory } from '@/types/community';
import KMarketCommunityPostCard from './KMarketCommunityPostCard';
import KMarketCommunityPostDetailModal from './KMarketCommunityPostDetailModal';
import KMarketCommunityCreateModal from './KMarketCommunityCreateModal';
import KMarketCommunityReportModal from './KMarketCommunityReportModal';
import {
  Users,
  PlusCircle,
  Sparkles,
  HeartHandshake,
  MessageSquareHeart,
  Globe,
} from 'lucide-react';

export default function KMarketCommunityMain() {
  const { t } = useLanguage();
  const {
    posts,
    selectedCategory,
    setSelectedCategory,
    setSelectedPost,
    setIsCreateModalOpen,
  } = useCommunity();

  const filteredPosts =
    selectedCategory === 'all'
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. 상단 감성 웰컴 배너 (타향살이 힐링 & 친구 사귀기) */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
          borderBottom: '3px solid #f3ba2f',
          boxShadow: '0 4px 14px rgba(243, 186, 47, 0.25)',
        }}
        className="rounded-3xl p-5 sm:p-6 text-white relative overflow-hidden shadow-lg"
      >
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="bg-[#f3ba2f] text-[#09101f] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {t('17개국어 실시간 소통')}
            </span>
            <span className="text-xs text-indigo-200 font-bold flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" />
              <span>{t('언어 장벽 없이 내 모국어로 편하게')}</span>
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-2">
            <span>{t('외국인 이웃들의 따뜻한 동네생활 & 쉼터')}</span>
            <span className="text-xl">🤝</span>
          </h2>

          <p className="text-xs text-indigo-100/90 leading-relaxed font-normal">
            {t('외로움을 달래는 동네 친구 사귀기부터 고향 가족 생각나는 따뜻한 이야기, 한국 생활 궁금증까지 온기를 나누세요.')}
          </p>
        </div>

        <div className="absolute right-4 bottom-3 opacity-15 pointer-events-none hidden sm:block">
          <MessageSquareHeart className="w-36 h-36 text-white" />
        </div>
      </div>

      {/* 2. 6대 카테고리 탭 바 & 글쓰기 버튼 (모바일에서 2~3줄로 잘림 없이 전체 노출) */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2 py-1">
          {/* 전체 탭 */}
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer border shadow-2xs ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm scale-102'
                : 'bg-white text-slate-700 border-[#ded1c4] hover:bg-[#faf6f0]'
            }`}
          >
            {t('전체 보기')}
          </button>

          {/* 6대 카테고리 버튼들 (2~3줄로 깔끔하게 정렬) */}
          {COMMUNITY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer border shadow-2xs ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm scale-102'
                  : 'bg-white text-slate-700 border-[#ded1c4] hover:bg-[#faf6f0]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{t(cat.labelKo)}</span>
            </button>
          ))}

          {/* 글쓰기 CTA 버튼 (모바일에서도 줄바꿈되어 깔끔하게 노출) */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center justify-center gap-1.5 text-xs font-extrabold px-4 py-2 rounded-2xl bg-[#09101f] hover:bg-[#1a2333] text-[#f3ba2f] border border-[#f3ba2f]/40 shadow-sm transition-all active:scale-95 cursor-pointer ml-auto sm:ml-0"
          >
            <PlusCircle className="w-4 h-4 text-[#f3ba2f]" />
            <span>{t('동네생활 이야기 글쓰기')}</span>
          </button>
        </div>
      </div>

      {/* 3. 게시글 목록 피드 */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPosts.map((post) => (
            <KMarketCommunityPostCard
              key={post.id}
              post={post}
              onSelect={(p) => setSelectedPost(p)}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white dark:bg-gray-800/60 rounded-3xl border border-slate-200 dark:border-gray-700 space-y-3">
          <HeartHandshake className="w-12 h-12 mx-auto text-indigo-400 opacity-60" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-800 dark:text-white">
              {t('해당 카테고리에 아직 작성된 글이 없습니다.')}
            </h4>
            <p className="text-xs text-slate-500">
              {t('첫 번째로 동네 친구를 사귀거나 따뜻한 이야기를 올려보세요!')}
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn-primary px-5 py-2 text-xs cursor-pointer inline-flex items-center gap-1"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{t('첫 이야기 작성하기')}</span>
          </button>
        </div>
      )}
    </div>
  );
}
