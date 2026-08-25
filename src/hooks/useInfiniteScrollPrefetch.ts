'use client';

import { useEffect, useRef } from 'react';

interface UseInfiniteScrollOptions {
  threshold?: number;
  rootMargin?: string;
  hasMore: boolean;
  onLoadMore: () => void;
  disabled?: boolean;
}

/**
 * ⚡ 인스타그램/당근마켓 스타일 초경량 프리페치(Pre-fetching) 무한 스크롤 훅
 * - window.scroll 이벤트 대신 브라우저 네이티브 IntersectionObserver 사용 (CPU 점유율 0%)
 * - 바닥에 닿기 전(rootMargin: '600px')에 미리 불러와 끊김 없는 60fps 스크롤 경험 제공
 */
export function useInfiniteScrollPrefetch({
  rootMargin = '600px',
  threshold = 0,
  hasMore,
  onLoadMore,
  disabled = false,
}: UseInfiniteScrollOptions) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (disabled || !hasMore) return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore) {
          onLoadMore();
        }
      },
      {
        root: null, // 뷰포트 기준
        rootMargin, // 600px 전에 미리 감지
        threshold,
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, onLoadMore, rootMargin, threshold, disabled]);

  return { sentinelRef };
}
