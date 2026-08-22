'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle2, MessageSquarePlus, Lightbulb, ShieldAlert, MapPin, Bug, Wallet } from 'lucide-react';
import { FeedbackCategory } from '@/types/kmarket';
import { useKMarket } from '@/context/KMarketContext';

interface KMarketFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CategoryOption {
  id: FeedbackCategory;
  label: string;
  icon: React.ReactNode;
  placeholder: string;
}

export default function KMarketFeedbackModal({ isOpen, onClose }: KMarketFeedbackModalProps) {
  const { t } = useLanguage();
  const { authedUser, submitFeedback } = useKMarket();

  const CATEGORY_OPTIONS: CategoryOption[] = [
    {
      id: 'translation_error',
      label: t('voc_cat_translation'),
      icon: <Sparkles className="w-4 h-4 text-indigo-500" />,
      placeholder: t('voc_ph_translation'),
    },
    {
      id: 'location_request',
      label: t('voc_cat_location'),
      icon: <MapPin className="w-4 h-4 text-emerald-500" />,
      placeholder: t('voc_ph_location'),
    },
    {
      id: 'security_improve',
      label: t('voc_cat_security'),
      icon: <ShieldAlert className="w-4 h-4 text-rose-500" />,
      placeholder: t('voc_ph_security'),
    },
    {
      id: 'finance_service',
      label: t('voc_cat_finance'),
      icon: <Wallet className="w-4 h-4 text-amber-500" />,
      placeholder: t('voc_ph_finance'),
    },
    {
      id: 'bug_report',
      label: t('voc_cat_bug'),
      icon: <Bug className="w-4 h-4 text-red-500" />,
      placeholder: t('voc_ph_bug'),
    },
    {
      id: 'general_suggestion',
      label: t('voc_cat_general'),
      icon: <Lightbulb className="w-4 h-4 text-blue-500" />,
      placeholder: t('voc_ph_general'),
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState<FeedbackCategory>('general_suggestion');
  const [content, setContent] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const currentOption = CATEGORY_OPTIONS.find((c) => c.id === selectedCategory) || CATEGORY_OPTIONS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);

    // KMarketContext 피드백 시스템 등록
    submitFeedback({
      id: `fb-${Date.now()}`,
      category: selectedCategory,
      content: content.trim(),
      contact_info: contactInfo.trim() || undefined,
      user_id: authedUser?.userId,
      user_name: authedUser?.userName,
      created_at: new Date().toISOString(),
      status: 'pending',
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setContent('');
        setContactInfo('');
        onClose();
      }, 2000);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-gray-800 overflow-hidden my-auto">
        {/* 상단 헤더 */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-amber-300 shadow-xs">
              <MessageSquarePlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-1.5">
                <span>{t('voc_modal_title')}</span>
                <span className="text-[10px] bg-amber-400 text-slate-950 font-extrabold px-2 py-0.5 rounded-full">
                  {t('voc_modal_badge')}
                </span>
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                {t('voc_modal_desc')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 본문 폼 */}
        {isSubmitted ? (
          <div className="p-8 text-center space-y-4 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-black text-slate-900 dark:text-white">
                {t('voc_success_title')}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {t('voc_success_desc')}
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
            {/* 1. 건의 유형 선택 칩 (Chips) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                {t('voc_step1_label')}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CATEGORY_OPTIONS.map((opt) => {
                  const isSelected = selectedCategory === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedCategory(opt.id)}
                      className={`p-2.5 rounded-2xl text-left transition-all flex items-center gap-2 cursor-pointer border text-xs font-bold ${
                        isSelected
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-950 dark:text-indigo-200 shadow-xs ring-2 ring-indigo-500/20'
                          : 'bg-slate-50 dark:bg-gray-800 hover:bg-slate-100 dark:hover:bg-gray-700 border-slate-200 dark:border-gray-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <span className="shrink-0">{opt.icon}</span>
                      <span className="truncate text-[11px] font-bold">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. 상세 내용 텍스트 입력창 */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
                <span>{t('voc_step2_label')} <span className="text-rose-500">*</span></span>
                <span className="text-[10px] text-slate-400 font-normal">{content.length} / 500</span>
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={currentOption.placeholder}
                rows={4}
                maxLength={500}
                required
                className="w-full p-3.5 bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-gray-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none leading-relaxed"
              />
            </div>

            {/* 3. 답변 받을 연락처 (선택) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {t('voc_step3_label')}
              </label>
              <input
                type="text"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder={t('voc_contact_placeholder')}
                className="w-full p-3 bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-2xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-gray-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>

            {/* 4. 제출 버튼 */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={!content.trim() || isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white font-black text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>{t('voc_submitting_label')}</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t('voc_submit_btn')}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
