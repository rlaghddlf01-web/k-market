'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { POSITIVE_TAGS, NEGATIVE_TAGS, TAG_TRANSLATIONS, submitTransactionReview } from '@/lib/trustData';
import CountryFlag from './CountryFlag';
import { X, Star, CheckCircle2, HeartHandshake } from 'lucide-react';
import confetti from 'canvas-confetti';

interface KMarketReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUserId: string;
  targetUserName: string;
  targetUserFlag: string;
  targetUserCountry?: string;
  itemId: string;
  itemTitle: string;
  onSuccess?: () => void;
}

export default function KMarketReviewModal({
  isOpen,
  onClose,
  targetUserId,
  targetUserName,
  targetUserFlag,
  targetUserCountry = 'VN',
  itemId,
  itemTitle,
  onSuccess,
}: KMarketReviewModalProps) {
  const { currentLang } = useLanguage();
  const [ratingType, setRatingType] = useState<'great' | 'good' | 'bad'>('great');
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(['time_punctual', 'item_as_described']);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const toggleTag = (tagId: string) => {
    if (selectedTagIds.includes(tagId)) {
      setSelectedTagIds(selectedTagIds.filter((id) => id !== tagId));
    } else {
      setSelectedTagIds([...selectedTagIds, tagId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    submitTransactionReview({
      item_id: itemId,
      item_title: itemTitle,
      reviewer_id: 'user-current',
      reviewer_name: 'Me (나)',
      reviewer_country: 'KR',
      reviewer_flag: '🇰🇷',
      target_user_id: targetUserId,
      rating_type: ratingType,
      selected_tag_ids: selectedTagIds,
      comment: comment.trim() || undefined,
    });

    // 축하 폭죽 효과
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      if (onSuccess) onSuccess();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 dark:border-gray-800 relative overflow-hidden">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-10 text-center space-y-3 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              따뜻한 거래 후기가 등록되었습니다!
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              상대방의 K-Trust 매너온도가 올라갔어요 💖
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 상단 헤더 */}
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>K-Trust 글로벌 매너 평가</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white pt-1 flex items-center justify-center gap-2">
                <CountryFlag
                  countryCode={targetUserCountry}
                  fallbackEmoji={targetUserFlag}
                  size="md"
                  shape="circle"
                />
                <span>{targetUserName} 님과의 거래는 어떠셨나요?</span>
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-xs mx-auto">
                📦 {itemTitle}
              </p>
            </div>

            {/* 3단계 평가 버튼 */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRatingType('great')}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                  ratingType === 'great'
                    ? 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold scale-[1.02]'
                    : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <span className="text-2xl mb-1">😍</span>
                <span className="text-xs">최고예요!</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">+0.5℃</span>
              </button>

              <button
                type="button"
                onClick={() => setRatingType('good')}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                  ratingType === 'good'
                    ? 'border-blue-500 bg-blue-50/80 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold scale-[1.02]'
                    : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <span className="text-2xl mb-1">😊</span>
                <span className="text-xs">좋아요</span>
                <span className="text-[10px] text-blue-600 dark:text-blue-400 mt-0.5">+0.2℃</span>
              </button>

              <button
                type="button"
                onClick={() => setRatingType('bad')}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                  ratingType === 'bad'
                    ? 'border-rose-500 bg-rose-50/80 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold scale-[1.02]'
                    : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <span className="text-2xl mb-1">🙁</span>
                <span className="text-xs">아쉬워요</span>
                <span className="text-[10px] text-rose-600 dark:text-rose-400 mt-0.5">-0.8℃</span>
              </button>
            </div>

            {/* 15개국어 칭찬 태그 선택 리스트 */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center justify-between">
                <span>어떤 점이 좋으셨나요? (중복 선택 가능)</span>
                <span className="text-[11px] text-gray-400">15개 언어 자동 번역</span>
              </label>

              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                {(ratingType === 'bad' ? NEGATIVE_TAGS : POSITIVE_TAGS).map((tag) => {
                  const isSelected = selectedTagIds.includes(tag.id);
                  const labelText =
                    TAG_TRANSLATIONS[tag.labelKey]?.[currentLang] ||
                    TAG_TRANSLATIONS[tag.labelKey]?.ko ||
                    tag.id;

                  return (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(tag.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all ${
                        isSelected
                          ? ratingType === 'bad'
                            ? 'bg-rose-500 text-white font-medium shadow-xs'
                            : 'bg-emerald-600 text-white font-medium shadow-xs'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span>{tag.icon}</span>
                      <span>{labelText}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 따뜻한 한 줄 코멘트 (선택) */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                따뜻한 후기 한마디 (선택)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="상대방에게 전하고 싶은 감사 인사를 남겨주세요."
                rows={2}
                className="w-full text-xs p-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white resize-none"
              />
            </div>

            {/* 제출 버튼 */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <span>거래 후기 보내기</span>
              <Star className="w-4 h-4 fill-white" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
