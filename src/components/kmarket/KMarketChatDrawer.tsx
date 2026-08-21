'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useKMarket } from '@/context/KMarketContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  X,
  Send,
  Sparkles,
  MapPin,
  ShieldCheck,
  Languages,
  CheckCheck,
  Bot,
  Zap,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { SupportedLanguage } from '@/types/kmarket';
import KMarketUserProfileModal from './KMarketUserProfileModal';
import KMarketReviewModal from './KMarketReviewModal';
import CountryFlag from './CountryFlag';

export default function KMarketChatDrawer() {
  const { activeChat, closeChat, chatMessages, isChatLoading, isTranslating, sendMessage } =
    useKMarket();
  const { t, formatWon, currentLang, currentLangOption } = useLanguage();
  const [inputText, setInputText] = useState('');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTranslating]);

  if (!activeChat) return null;

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isTranslating) return;

    const textToSend = inputText;
    setInputText('');
    await sendMessage(textToSend);
  };

  const handleQuickPhrase = (phrase: string) => {
    sendMessage(phrase);
  };

  // 자주 쓰는 퀵 메시지 템플릿
  const quickPhrases = [
    { label: '👋 구매 문의', text: '안녕하세요! 아직 판매 중인가요?' },
    { label: '💰 가격 네고', text: '조금만 깎아주실 수 있나요? (네고 가능한가요?)' },
    { label: '📍 공단 직거래', text: '오늘 저녁 기숙사 앞이나 공단 정문에서 직거래 가능할까요?' },
    { label: '🤝 거래 수락', text: '네, 좋습니다! 그때 뵐게요.' },
  ];

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fadeIn">
        <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-slideLeft">
          {/* 1. 채팅창 상단 헤더 */}
          <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-sky-700 text-white p-4 flex items-center justify-between shadow-md shrink-0">
            <div
              onClick={() => setShowProfileModal(true)}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <CountryFlag
                countryCode={activeChat.seller_country}
                fallbackEmoji={activeChat.seller_flag}
                size="lg"
                shape="circle"
                className="shadow-inner"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-sm group-hover:underline">
                    {activeChat.seller_name}
                  </span>
                  <span className="text-[11px] bg-emerald-400/30 text-emerald-100 px-2 py-0.2 rounded-full border border-emerald-300/30">
                    {activeChat.seller_country}
                  </span>
                </div>
                <p className="text-[11px] text-emerald-200 flex items-center space-x-1">
                  <span>신뢰도 41.2℃ (프로필 보기 &gt;)</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowReviewModal(true)}
                className="px-2.5 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                title="거래 완료 및 매너 평가"
              >
                <Star className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
                <span>후기 남기기</span>
              </button>

              <button
                onClick={closeChat}
                className="p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

        {/* 2. 매물 간단 요약 및 거래 상태 변경 바 */}
        {activeChat.item && (
          <div className="bg-slate-50 border-b border-slate-200/80 p-3 flex flex-col gap-2 shrink-0">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center space-x-2.5 overflow-hidden">
                <img
                  src={activeChat.item.images[0]}
                  alt="thumb"
                  className="w-11 h-11 rounded-xl object-cover border border-slate-200 shrink-0"
                />
                <div className="truncate">
                  <div className="flex items-center gap-1.5 truncate">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {activeChat.item.title}
                    </p>
                    {activeChat.item.status === 'reserved' && (
                      <span className="text-[10px] bg-amber-500 text-white px-1.5 py-0.2 rounded-md font-bold shrink-0">
                        예약중
                      </span>
                    )}
                    {activeChat.item.status === 'sold' && (
                      <span className="text-[10px] bg-gray-600 text-white px-1.5 py-0.2 rounded-md font-bold shrink-0">
                        완료
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-[11px] text-slate-500">
                    <span className="font-bold text-emerald-600">
                      {formatWon(activeChat.item.price)}
                    </span>
                    <span>•</span>
                    <span className="truncate">{activeChat.item.region}</span>
                  </div>
                </div>
              </div>

              {/* 채팅창 내 원클릭 거래 액션 버튼 */}
              <div className="flex items-center gap-1.5 shrink-0">
                {activeChat.item.status !== 'reserved' && activeChat.item.status !== 'sold' && (
                  <button
                    onClick={() => {
                      alert('이 구매자와 [예약중]으로 설정되었습니다.');
                    }}
                    className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 text-[10px] font-bold rounded-lg border border-amber-200 transition-colors cursor-pointer"
                  >
                    예약하기
                  </button>
                )}
                {activeChat.item.status !== 'sold' && (
                  <button
                    onClick={() => setShowReviewModal(true)}
                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold rounded-lg shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    <span>거래완료</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 3. AI 실시간 번역 안내 배너 */}
        <div className="bg-linear-to-r from-blue-50 to-indigo-50 px-4 py-2 text-[11px] text-blue-900 border-b border-blue-100 flex items-center space-x-2 shrink-0">
          <Zap className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>{t('chat_translation_hint')}</span>
        </div>

        {/* 4. 메시지 목록 스크롤 영역 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          {/* 환영 안내 */}
          <div className="text-center my-2">
            <span className="inline-block bg-slate-200/70 text-slate-600 text-[11px] px-3 py-1 rounded-full font-medium">
              안전한 직거래를 위해 기숙사나 공단 밝은 곳에서 만나세요.
            </span>
          </div>

          {chatMessages.map((msg) => {
            const isMe = msg.sender_type === 'buyer';

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} space-y-1`}
              >
                {/* 발신자 정보 */}
                <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 px-1">
                  <span>{isMe ? '나 (Me)' : activeChat.seller_name}</span>
                  <span>•</span>
                  <span>
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                {/* 메시지 말풍선 */}
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 shadow-xs space-y-1.5 ${
                    isMe
                      ? 'bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-br-xs'
                      : 'bg-white text-slate-900 border border-slate-200 rounded-bl-xs'
                  }`}
                >
                  {/* 원문 텍스트 */}
                  <p className="text-xs sm:text-sm font-medium leading-relaxed">
                    {msg.original_text}
                  </p>

                  {/* 상대방 언어로 자동 번역된 텍스트 뱃지 */}
                  {msg.translated_text && (
                    <div
                      className={`pt-1.5 border-t text-[11px] leading-relaxed flex items-start space-x-1.5 ${
                        isMe
                          ? 'border-white/20 text-sky-100'
                          : 'border-slate-100 text-indigo-700 bg-indigo-50/60 p-2 rounded-xl'
                      }`}
                    >
                      <Sparkles
                        className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                          isMe ? 'text-yellow-300' : 'text-indigo-600'
                        }`}
                      />
                      <div>
                        <span className="block font-semibold opacity-90 text-[10px]">
                          {isMe ? '🌐 자동 번역 전송문 (To Seller):' : '🌐 한국어 실시간 번역:'}
                        </span>
                        <span className="font-medium">{msg.translated_text}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* 실시간 번역 중 인디케이터 */}
          {isTranslating && (
            <div className="flex items-center space-x-2 text-xs text-indigo-600 bg-indigo-50 p-2.5 rounded-2xl w-fit border border-indigo-100 animate-pulse">
              <Bot className="w-4 h-4 text-indigo-600" />
              <span>Gemini AI가 0.3초 만에 실시간 번역 중...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* 5. 단골 중고거래 퀵 응답 버튼 바 */}
        <div className="p-2 bg-white border-t border-slate-100 flex items-center space-x-1.5 overflow-x-auto no-scrollbar shrink-0">
          {quickPhrases.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickPhrase(q.text)}
              className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-full text-[11px] font-semibold shrink-0 transition-colors border border-slate-200/80 cursor-pointer"
            >
              {q.label}
            </button>
          ))}
        </div>

        {/* 6. 메시지 입력창 */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 shrink-0">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="내 모국어로 편하게 입력하세요 (상대방 언어로 즉시 자동번역)"
              className="flex-1 px-4 py-2.5 bg-slate-100 focus:bg-white text-xs sm:text-sm rounded-full border border-transparent focus:border-blue-500 focus:outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTranslating}
              className="p-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white shadow-md shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>

    {/* 판매자 신뢰 프로필 모달 */}
    <KMarketUserProfileModal
      isOpen={showProfileModal}
      onClose={() => setShowProfileModal(false)}
      userId={activeChat.seller_id}
      userName={activeChat.seller_name}
      userCountry={activeChat.seller_country}
      userFlag={activeChat.seller_flag}
    />

    {/* 1:1 거래 후기 작성 모달 */}
    <KMarketReviewModal
      isOpen={showReviewModal}
      onClose={() => setShowReviewModal(false)}
      targetUserId={activeChat.seller_id}
      targetUserName={activeChat.seller_name}
      targetUserFlag={activeChat.seller_flag}
      targetUserCountry={activeChat.seller_country}
      itemId={activeChat.item_id}
      itemTitle={activeChat.item?.title || 'K-Market 거래 상품'}
    />
  </>
  );
}

