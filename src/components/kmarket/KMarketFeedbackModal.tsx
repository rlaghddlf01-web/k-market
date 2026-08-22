'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle2, MessageSquarePlus, Lightbulb, ShieldAlert, MapPin, Bug, Wallet } from 'lucide-react';
import { FeedbackCategory, FeedbackItem } from '@/types/kmarket';
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

const CATEGORY_OPTIONS: CategoryOption[] = [
  {
    id: 'translation_error',
    label: '🌐 번역 / 언어 오류',
    icon: <Sparkles className="w-4 h-4 text-indigo-500" />,
    placeholder: '어떤 언어의 어떤 단어나 문장이 어색하거나 잘못되었나요? 상세히 알려주시면 즉시 수정하겠습니다.',
  },
  {
    id: 'location_request',
    label: '📍 공단 / 직거래 장소 추가',
    icon: <MapPin className="w-4 h-4 text-emerald-500" />,
    placeholder: '추가하고 싶은 공단 이름이나 기숙사/편의점 등 직거래 추천 장소를 적어주세요. (예: 화성 마도공단 기숙사 앞)',
  },
  {
    id: 'security_improve',
    label: '🛡️ 사기 방지 / 안심 거래',
    icon: <ShieldAlert className="w-4 h-4 text-rose-500" />,
    placeholder: '사기 피해 예방이나 안심 거래를 위해 더 필요한 안전 기능이 있다면 자유롭게 제안해 주세요.',
  },
  {
    id: 'finance_service',
    label: '💰 세무 / 대출 / 금융',
    icon: <Wallet className="w-4 h-4 text-amber-500" />,
    placeholder: '세금 환급, 비상금 대출, 귀국 퇴직금 등 외국인 근로자에게 필요한 추가 서비스 의견을 들려주세요.',
  },
  {
    id: 'bug_report',
    label: '📱 화면 렉 / 버그 제보',
    icon: <Bug className="w-4 h-4 text-red-500" />,
    placeholder: '어떤 화면에서 어떤 문제가 발생했나요? (예: 채팅창이 안 열림, 사진 업로드가 느림 등)',
  },
  {
    id: 'general_suggestion',
    label: '💬 기타 자유 건의 및 칭찬',
    icon: <Lightbulb className="w-4 h-4 text-blue-500" />,
    placeholder: 'K-Market을 이용하시면서 느끼신 점이나 추가되었으면 하는 모든 아이디어를 자유롭게 남겨주세요!',
  },
];

export default function KMarketFeedbackModal({ isOpen, onClose }: KMarketFeedbackModalProps) {
  const { t } = useLanguage();
  const { authedUser, submitFeedback } = useKMarket();
  const [selectedCategory, setSelectedCategory] = useState<FeedbackCategory>('general_suggestion');
  const [content, setContent] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const currentOption = CATEGORY_OPTIONS.find((opt) => opt.id === selectedCategory) || CATEGORY_OPTIONS[5];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const feedbackData: FeedbackItem = {
      id: `fb-${Date.now()}`,
      user_id: authedUser?.userId || 'guest-user',
      user_name: authedUser?.userName || '익명 유저',
      country: authedUser?.country || 'KR',
      category: selectedCategory,
      content: content.trim(),
      contact_info: contactInfo.trim() || undefined,
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    if (submitFeedback) {
      submitFeedback(feedbackData);
    }

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
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto">
        {/* 상단 헤더 */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-amber-300 shadow-xs">
              <MessageSquarePlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-1.5">
                <span>{t('auto_ui_136')}</span>
                <span className="text-[10px] bg-amber-400 text-slate-950 font-extrabold px-2 py-0.5 rounded-full">
                  VOC 창구
                </span>
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                대표님과 관리자 팀이 여러분의 소중한 의견을 직접 읽고 반영합니다.
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
              <h4 className="text-lg font-black text-slate-900">
                소중한 의견이 성공적으로 접수되었습니다!
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                보내주신 개선점은 관리자 팀에서 꼼꼼히 검토 후 앱 업데이트에 신속히 반영하겠습니다. 감사합니다!
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
            {/* 1. 건의 유형 선택 칩 (Chips) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                1. 어떤 부분에 대한 의견이신가요? (유형 선택)
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
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-950 shadow-xs ring-2 ring-indigo-500/20'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                      }`}
                    >
                      <span className="shrink-0">{opt.icon}</span>
                      <span className="truncate text-[11px]">{opt.label.split(' ')[1] || opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. 상세 내용 텍스트 입력창 */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                <span>{t('auto_ui_137')} <span className="text-rose-500">*</span></span>
                <span className="text-[10px] text-slate-400 font-normal">{t('auto_ui_138')}</span>
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={currentOption.placeholder}
                rows={4}
                required
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none leading-relaxed"
              />
            </div>

            {/* 3. 답변 받을 연락처 (선택) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                3. 답변 또는 진행 상황을 안내받으실 연락처 (선택)
              </label>
              <input
                type="text"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder={t('auto_ui_139')}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
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
                  <span>{t('auto_ui_140')}</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t('auto_ui_141')}</span>
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
