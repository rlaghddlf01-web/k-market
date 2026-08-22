'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useState } from 'react';
import { useCommunity } from '@/context/CommunityContext';
import { useKMarket } from '@/context/KMarketContext';
import { COMMUNITY_CATEGORIES, CommunityCategory } from '@/types/community';
import { compressMultipleImages, CompressionResult } from '@/lib/imageCompressor';
import {
  X,
  Camera,
  Trash2,
  Sparkles,
  Zap,
  Lock,
  Loader2,
  CheckCircle,
} from 'lucide-react';

export default function KMarketCommunityCreateModal() {
  const { t } = useLanguage();
  const { isCreateModalOpen, setIsCreateModalOpen, createPost } = useCommunity();
  const { authedUser, setIsAuthModalOpen } = useKMarket();

  const [category, setCategory] = useState<CommunityCategory>('friends');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [compressedImages, setCompressedImages] = useState<CompressionResult[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCreateModalOpen) return null;

  // 최대 5장 사진 선택 & 실시간 자동 압축
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // 이미 선택된 사진과 합쳐서 최대 5장 제한
    const remainingSlots = 5 - compressedImages.length;
    if (remainingSlots <= 0) {
      alert('사진은 최대 5장까지만 등록 가능합니다.');
      return;
    }

    const selectedFiles = Array.from(files).slice(0, remainingSlots);
    setIsCompressing(true);

    try {
      const results = await compressMultipleImages(selectedFiles, remainingSlots);
      setCompressedImages((prev) => [...prev, ...results]);
    } catch (err) {
      console.error('Image compression error:', err);
      alert('사진 압축 중 오류가 발생했습니다.');
    } finally {
      setIsCompressing(false);
      e.target.value = '';
    }
  };

  const handleRemoveImage = (index: number) => {
    setCompressedImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    if (!authedUser) {
      setIsAuthModalOpen(true);
      return;
    }

    setIsSubmitting(true);
    const imageUrls = compressedImages.map((c) => c.dataUrl);
    const success = await createPost({
      category,
      title,
      content,
      images: imageUrls,
      region: authedUser?.region || '경기 평택시',
    });

    setIsSubmitting(false);
    if (success) {
      setTitle('');
      setContent('');
      setCompressedImages([]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 dark:border-gray-800 relative max-h-[90vh] flex flex-col">
        {/* 닫기 버튼 */}
        <button
          onClick={() => setIsCreateModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <span className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-600">
            <Sparkles className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-base font-black text-slate-900 dark:text-white">
              {t('auto_ui_22')}
            </h2>
            <p className="text-[11px] text-slate-400">
              15개국어로 자동 번역되어 동네 이웃들에게 따뜻하게 전해집니다.
            </p>
          </div>
        </div>

        {/* 폼 영역 */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-4 pr-1">
          {/* 1. 6대 카테고리 선택 칩 */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              카테고리 선택
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {COMMUNITY_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`p-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border text-left ${
                    category === cat.id
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 shadow-sm'
                      : 'bg-slate-50 dark:bg-gray-800/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-gray-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-sm">{cat.icon}</span>
                  <span className="truncate">{cat.labelKo}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. 글 제목 */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {t('create_title_label')}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('auto_ui_6')}
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500"
              required
            />
          </div>

          {/* 3. 본문 내용 */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              내용
            </label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={t('auto_ui_7')}
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500 leading-relaxed"
              required
            />
          </div>

          {/* 4. 최대 5장 다중 사진 첨부 & 0.3초 실시간 자동 압축 뷰어 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <span>{t('auto_ui_8')}</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center gap-0.5">
                  <Zap className="w-3 h-3" />
                  <span>{t('auto_ui_9')}</span>
                </span>
              </label>
              <span className="text-[11px] text-slate-400 font-bold">
                {compressedImages.length} / 5
              </span>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              {/* 사진 추가 버튼 */}
              {compressedImages.length < 5 && (
                <label className="w-20 h-20 rounded-2xl border-2 border-dashed border-slate-300 dark:border-gray-700 hover:border-blue-500 bg-slate-50 dark:bg-gray-800 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all">
                  <Camera className="w-5 h-5 text-slate-400" />
                  <span className="text-[10px] font-bold text-slate-500">{t('auto_ui_10')}</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={isCompressing}
                  />
                </label>
              )}

              {/* 압축 진행 로더 */}
              {isCompressing && (
                <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-gray-800 flex flex-col items-center justify-center gap-1">
                  <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                  <span className="text-[9px] font-bold text-slate-500">{t('auto_ui_11')}</span>
                </div>
              )}

              {/* 압축된 사진 미리보기 썸네일 */}
              {compressedImages.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-20 h-20 rounded-2xl overflow-hidden border border-slate-200 dark:border-gray-700 group"
                >
                  <img
                    src={img.dataUrl}
                    alt={`thumb-${idx}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[8px] text-center font-bold py-0.5">
                    {img.compressedSizeKB}KB (-{img.compressionRatio}%)
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 p-1 bg-rose-600 text-white rounded-full opacity-90 hover:opacity-100 transition-opacity cursor-pointer shadow-xs"
                    title={t('auto_ui_12')}
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 5. 하단 등록 버튼 */}
          <div className="pt-3">
            {authedUser ? (
              <button
                type="submit"
                disabled={isSubmitting || isCompressing}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t('auto_ui_13')}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>{t('auto_ui_14')}</span>
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>{t('auto_ui_15')}</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
