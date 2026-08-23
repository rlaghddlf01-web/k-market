'use client';

import React, { useState, useEffect } from 'react';
import { useCommunity } from '@/context/CommunityContext';
import { useLanguage } from '@/context/LanguageContext';
import { useKMarket } from '@/context/KMarketContext';
import { COMMUNITY_CATEGORIES } from '@/types/community';
import CountryFlag from '../kmarket/CountryFlag';
import {
  X,
  Heart,
  Coffee,
  MessageCircle,
  Globe,
  Send,
  MoreVertical,
  Flag,
  Share2,
  Lock,
} from 'lucide-react';

export default function KMarketCommunityPostDetailModal() {
  const { t } = useLanguage();
  const {
    selectedPost,
    setSelectedPost,
    comments,
    isCommentsLoading,
    fetchComments,
    addComment,
    reactToPost,
    setIsReportModalOpen,
    setReportTarget,
  } = useCommunity();

  const { currentLang } = useLanguage();
  const { authedUser, setIsAuthModalOpen } = useKMarket();

  const [commentInput, setCommentInput] = useState('');
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [showOriginal, setShowOriginal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (selectedPost) {
      fetchComments(selectedPost.id);
      setActiveImageIdx(0);
    }
  }, [selectedPost?.id]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPost(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedPost]);

  if (!selectedPost) return null;

  const categoryInfo =
    COMMUNITY_CATEGORIES.find((c) => c.id === selectedPost.category) ||
    COMMUNITY_CATEGORIES[0];

  // 17개국어 번역 제목 및 본문
  const transObj = selectedPost.translations?.[currentLang];
  const displayTitle =
    !showOriginal && transObj?.title ? transObj.title : selectedPost.title;
  const displayContent =
    !showOriginal && transObj?.content ? transObj.content : selectedPost.content;

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    if (!authedUser) {
      setIsAuthModalOpen(true);
      return;
    }

    await addComment(commentInput);
    setCommentInput('');
  };

  const handleReportPost = () => {
    setShowMenu(false);
    setReportTarget({
      type: 'post',
      id: selectedPost.id,
      targetUserId: selectedPost.user_id,
      targetUserName: selectedPost.user_name,
    });
    setIsReportModalOpen(true);
  };

  const handleReportComment = (comm: any) => {
    setReportTarget({
      type: 'comment',
      id: comm.id,
      targetUserId: comm.user_id,
      targetUserName: comm.user_name,
    });
    setIsReportModalOpen(true);
  };

  return (
    <div
      onClick={() => setSelectedPost(null)}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-fadeIn overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-900 rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 dark:border-gray-800 relative max-h-[88vh] flex flex-col overflow-hidden my-auto animate-in zoom-in-95"
      >
        {/* 상단 고정 헤더 - 어떤 스크롤에서도 X 버튼 및 작성자 정보가 상단에 항상 고정 */}
        <div className="sticky top-0 z-30 px-5 py-3.5 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-slate-100 dark:border-gray-800 flex items-center justify-between shrink-0">
          {/* 작성자 정보 */}
          <div className="flex items-center gap-2.5 min-w-0">
            <CountryFlag
              countryCode={selectedPost.user_country}
              fallbackEmoji={selectedPost.user_flag}
              size="md"
              shape="circle"
              className="shadow-2xs shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 truncate">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                  {selectedPost.user_name}
                </h4>
                <span className="text-[11px] text-slate-400 shrink-0">• {selectedPost.region}</span>
              </div>
              <p className="text-[10px] text-slate-400">
                {new Date(selectedPost.created_at).toLocaleString()}
              </p>
            </div>
          </div>

          {/* 카테고리 뱃지 & 메뉴 & 크고 선명한 닫기 버튼 */}
          <div className="flex items-center gap-2 shrink-0">
            <span
              className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${categoryInfo.color}`}
            >
              <span>{categoryInfo.icon}</span>
              <span className="hidden sm:inline">{t(categoryInfo.labelKo)}</span>
            </span>

            {/* 더보기 메뉴 */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
              {showMenu && (
                <div className="absolute right-0 top-8 w-36 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-slate-200 dark:border-gray-700 py-1 z-30 text-xs">
                  <button
                    onClick={handleReportPost}
                    className="w-full px-3 py-2 text-left text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-1.5 font-bold cursor-pointer"
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>{t('허위 및 사기 신고하기')}</span>
                  </button>
                </div>
              )}
            </div>

            {/* X 닫기 버튼 (언제나 손쉽게 닫을 수 있도록 강조) */}
            <button
              onClick={() => setSelectedPost(null)}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-slate-600 dark:text-slate-200 transition-all cursor-pointer shadow-xs active:scale-95 ml-1"
              title={t('닫기')}
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* 모달 스크롤 본문 */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">

          {/* 2. 글 제목 & 17개국어 번역 토글 */}
          <div className="space-y-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
              {displayTitle}
            </h2>
            <button
              onClick={() => setShowOriginal(!showOriginal)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-200 dark:border-blue-800/60 hover:bg-blue-100 transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{showOriginal ? t('번역 보기') : t('원문 보기')}</span>
            </button>
          </div>

          {/* 3. 최대 5장 고화질 이미지 슬라이더 (있을 경우) */}
          {selectedPost.images && selectedPost.images.length > 0 && (
            <div className="space-y-2">
              <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-slate-100 dark:bg-gray-800 border border-slate-200 dark:border-gray-700">
                <img
                  src={selectedPost.images[activeImageIdx]}
                  alt="post-img"
                  className="w-full h-full object-contain"
                />
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-bold">
                  {activeImageIdx + 1} / {selectedPost.images.length}
                </div>
              </div>

              {selectedPost.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {selectedPost.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        activeImageIdx === idx
                          ? 'border-blue-600 scale-105'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 4. 본문 내용 */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-gray-800/50 border border-slate-100 dark:border-gray-800 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line font-medium">
            {displayContent}
          </div>

          {/* 5. 감성 리액션 버튼 바 */}
          <div className="flex items-center gap-2 pt-1 border-t border-slate-100 dark:border-gray-800">
            <button
              onClick={() => reactToPost(selectedPost.id, 'like')}
              className="flex-1 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 text-rose-600 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-rose-200 dark:border-rose-900/40"
            >
              <Heart className="w-4 h-4 fill-rose-500" />
              <span>{t('게시글 공감해요')} ({selectedPost.like_count})</span>
            </button>

            <button
              onClick={() => reactToPost(selectedPost.id, 'cheer')}
              className="flex-1 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/30 text-amber-700 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-amber-200 dark:border-amber-900/40"
            >
              <Coffee className="w-4 h-4 text-amber-600" />
              <span>{t('따뜻하게 응원해요')} ({selectedPost.cheer_count})</span>
            </button>
          </div>

          {/* 6. 댓글 섹션 (17개국어 실시간 번역) */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-blue-600" />
              <span>{t('안내 내용을 확인해 주세요')} ({comments.length})</span>
            </h4>

            <div className="space-y-2">
              {isCommentsLoading ? (
                <div className="py-6 text-center text-xs text-slate-400">
                  {t('댓글을 불러오는 중...')}
                </div>
              ) : comments.length > 0 ? (
                comments.map((comm) => {
                  const commTrans = comm.translations?.[currentLang] || comm.content;

                  return (
                    <div
                      key={comm.id}
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-gray-800/60 border border-slate-100 dark:border-gray-800 space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CountryFlag
                            countryCode={comm.user_country}
                            fallbackEmoji={comm.user_flag}
                            size="xs"
                            shape="circle"
                          />
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            {comm.user_name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                          <span>{new Date(comm.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          <button
                            onClick={() => handleReportComment(comm)}
                            className="hover:text-rose-500 cursor-pointer p-0.5"
                            title={t('댓글 신고')}
                          >
                            <Flag className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <p className="text-slate-700 dark:text-slate-300 leading-snug pl-6">
                        {commTrans}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="py-6 text-center text-xs text-slate-400 bg-slate-50 dark:bg-gray-800/40 rounded-2xl">
                  {t('첫 번째 따뜻한 댓글을 남겨보세요!')}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 7. 하단 댓글 작성창 (비회원 시 로그인 유도) */}
        <div className="pt-3 border-t border-slate-100 dark:border-gray-800 shrink-0">
          {authedUser ? (
            <form onSubmit={handleCommentSubmit} className="flex gap-2">
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder={t('따뜻한 응원이나 답변을 남겨보세요 (17개국어로 자동 번역됩니다)...')}
                className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={!commentInput.trim()}
                className="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t('새 매물 등록하기')}</span>
              </button>
            </form>
          ) : (
            <div
              onClick={() => setIsAuthModalOpen(true)}
              className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-center cursor-pointer hover:bg-amber-100 transition-colors"
            >
              <p className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center justify-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                <span>{t('댓글을 작성하려면 1분 간편 본인인증(회원가입)이 필요합니다 →')}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
