'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CommunityPost,
  CommunityComment,
  CommunityCategory,
  CommunityReactionType,
} from '@/types/community';
import { INITIAL_COMMUNITY_POSTS, INITIAL_COMMUNITY_COMMENTS } from '@/lib/communityMockData';
import { useLanguage } from './LanguageContext';
import { useKMarket } from './KMarketContext';

interface CommunityContextType {
  posts: CommunityPost[];
  isLoading: boolean;
  selectedCategory: CommunityCategory | 'all';
  setSelectedCategory: (cat: CommunityCategory | 'all') => void;
  selectedPost: CommunityPost | null;
  setSelectedPost: (post: CommunityPost | null) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  isReportModalOpen: boolean;
  setIsReportModalOpen: (open: boolean) => void;
  reportTarget: { type: 'post' | 'comment'; id: string; targetUserId: string; targetUserName: string } | null;
  setReportTarget: (target: any) => void;

  // 댓글
  comments: CommunityComment[];
  isCommentsLoading: boolean;
  fetchComments: (postId: string) => Promise<void>;
  addComment: (content: string) => Promise<void>;

  // 글 등록 & 공감 리액션 & 신고
  createPost: (postData: {
    category: CommunityCategory;
    title: string;
    content: string;
    images: string[];
    region?: string;
  }) => Promise<boolean>;
  reactToPost: (postId: string, reactionType: CommunityReactionType) => Promise<void>;
  reportContent: (reasonType: string, reasonDetail?: string) => Promise<boolean>;
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

export function CommunityProvider({ children }: { children: React.ReactNode }) {
  const { currentLang } = useLanguage();
  const { authedUser, setIsAuthModalOpen } = useKMarket();

  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CommunityCategory | 'all'>('all');
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState<any>(null);

  const [comments, setComments] = useState<CommunityComment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);

  // 게시글 목록 불러오기
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/kmarket/community?category=${selectedCategory}`);
      if (res.ok) {
        const data = await res.json();
        if (data.posts && Array.isArray(data.posts)) {
          setPosts(data.posts);
        }
      }
    } catch (e) {
      console.warn('Failed to fetch community posts:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  // 댓글 목록 불러오기
  const fetchComments = async (postId: string) => {
    setIsCommentsLoading(true);
    try {
      const res = await fetch(`/api/kmarket/community/comments?postId=${postId}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data.comments || []);
      } else {
        setComments(INITIAL_COMMUNITY_COMMENTS[postId] || []);
      }
    } catch (e) {
      setComments(INITIAL_COMMUNITY_COMMENTS[postId] || []);
    } finally {
      setIsCommentsLoading(false);
    }
  };

  // 댓글 등록
  const addComment = async (content: string) => {
    if (!selectedPost || !content.trim()) return;

    // 비회원 체크
    if (!authedUser) {
      setIsAuthModalOpen(true);
      return;
    }

    try {
      const res = await fetch('/api/kmarket/community/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: selectedPost.id,
          userId: authedUser.phone || 'user-current',
          userName: authedUser.userName || '나 (Me)',
          userCountry: authedUser.country || 'KR',
          userFlag: authedUser.flag || '🇰🇷',
          content,
          sourceLang: currentLang,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.comment) {
          setComments((prev) => [...prev, data.comment]);
          // 게시글 댓글수 증가
          setPosts((prev) =>
            prev.map((p) => (p.id === selectedPost.id ? { ...p, comment_count: p.comment_count + 1 } : p))
          );
          if (selectedPost) {
            setSelectedPost({ ...selectedPost, comment_count: selectedPost.comment_count + 1 });
          }
        }
      }
    } catch (e) {
      console.error('Error posting comment:', e);
    }
  };

  // 새 글 등록
  const createPost = async (postData: {
    category: CommunityCategory;
    title: string;
    content: string;
    images: string[];
    region?: string;
  }): Promise<boolean> => {
    if (!authedUser) {
      setIsAuthModalOpen(true);
      return false;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/kmarket/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: authedUser.phone || 'user-current',
          userName: authedUser.userName || '나 (Me)',
          userCountry: authedUser.country || 'VN',
          userFlag: authedUser.flag || '🇻🇳',
          category: postData.category,
          title: postData.title,
          content: postData.content,
          images: postData.images,
          region: postData.region || '경기 평택시',
          sourceLang: currentLang,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.post) {
          setPosts((prev) => [data.post, ...prev]);
          setIsCreateModalOpen(false);
          return true;
        }
      }
      return false;
    } catch (e) {
      console.error('Error creating post:', e);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // 공감/힘내요 리액션 토글
  const reactToPost = async (postId: string, reactionType: CommunityReactionType) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return reactionType === 'cheer'
            ? { ...p, cheer_count: p.cheer_count + 1 }
            : { ...p, like_count: p.like_count + 1 };
        }
        return p;
      })
    );

    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost((prev) =>
        prev
          ? reactionType === 'cheer'
            ? { ...prev, cheer_count: prev.cheer_count + 1 }
            : { ...prev, like_count: prev.like_count + 1 }
          : null
      );
    }

    try {
      await fetch('/api/kmarket/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'react', postId, reactionType }),
      });
    } catch (e) {
      console.warn('React error:', e);
    }
  };

  // 신고 처리
  const reportContent = async (reasonType: string, reasonDetail?: string): Promise<boolean> => {
    if (!reportTarget) return false;

    try {
      await fetch('/api/kmarket/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'report',
          postId: reportTarget.id,
          reporterId: authedUser?.phone || 'anonymous',
          reporterName: authedUser?.userName || '익명',
          targetUserId: reportTarget.targetUserId,
          targetUserName: reportTarget.targetUserName,
          reasonType,
          reasonDetail,
        }),
      });

      // 내 피드에서 즉시 숨김
      if (reportTarget.type === 'post') {
        setPosts((prev) => prev.filter((p) => p.id !== reportTarget.id));
        if (selectedPost?.id === reportTarget.id) {
          setSelectedPost(null);
        }
      } else if (reportTarget.type === 'comment') {
        setComments((prev) => prev.filter((c) => c.id !== reportTarget.id));
      }

      setIsReportModalOpen(false);
      return true;
    } catch (e) {
      console.error('Report failed:', e);
      return false;
    }
  };

  return (
    <CommunityContext.Provider
      value={{
        posts,
        isLoading,
        selectedCategory,
        setSelectedCategory,
        selectedPost,
        setSelectedPost,
        isCreateModalOpen,
        setIsCreateModalOpen,
        isReportModalOpen,
        setIsReportModalOpen,
        reportTarget,
        setReportTarget,
        comments,
        isCommentsLoading,
        fetchComments,
        addComment,
        createPost,
        reactToPost,
        reportContent,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
}

export function useCommunity() {
  const context = useContext(CommunityContext);
  if (!context) {
    throw new Error('useCommunity must be used within a CommunityProvider');
  }
  return context;
}
