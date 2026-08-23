'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useKMarket } from '@/context/KMarketContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  X,
  Send,
  Sparkles,
  MapPin,
  Bot,
  Zap,
  Star,
  CheckCircle2,
  Calendar,
  Navigation,
  Clock,
  Bell,
} from 'lucide-react';
import { SupportedLanguage, AppointmentData, UserReportData } from '@/types/kmarket';
import { detectScamPattern, ScamWarningInfo } from '@/lib/antiScamDetector';
import KMarketUserProfileModal from './KMarketUserProfileModal';
import KMarketReviewModal from './KMarketReviewModal';
import KMarketAppointmentModal from './KMarketAppointmentModal';
import KMarketScamWarningModal from './KMarketScamWarningModal';
import KMarketReportBlockModal from './KMarketReportBlockModal';
import KMarketStatusActionModal from './KMarketStatusActionModal';
import KMarketScamInterventionBanner from '../chat/KMarketScamInterventionBanner';
import KMarketChatSafetyNotice from '../chat/KMarketChatSafetyNotice';
import { sendLocalPushNotification } from '@/lib/webPushService';
import { createGoogleCalendarUrl } from '@/lib/calendarUtils';
import CountryFlag from './CountryFlag';

export default function KMarketChatDrawer() {
  const { activeChat, closeChat, chatMessages, isChatLoading, isTranslating, sendMessage, reportUser } =
    useKMarket();
  const { t, formatWon, currentLang, currentLangOption } = useLanguage();
  const [inputText, setInputText] = useState('');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showScamModal, setShowScamModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [detectedScamInfo, setDetectedScamInfo] = useState<ScamWarningInfo | null>(null);
  const [activeAppointment, setActiveAppointment] = useState<AppointmentData | null>({
    id: 'apt-default-demo',
    place_name: '포승공단 GS25 편의점 앞',
    landmark_detail: '기숙사 2동 맞은편 가로등 앞',
    address: '경기 평택시 포승읍 포승공단로 117',
    lat: 36.9852,
    lng: 126.8571,
    meet_time: '오늘 (Today) 19:00',
    remind_1hour_before: true,
    status: 'confirmed',
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTranslating]);

  if (!activeChat) return null;

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isTranslating) return;

    // 사기 키워드 (카톡/라인/선입금 등) 실시간 감지
    const scamCheck = detectScamPattern(inputText);
    if (scamCheck) {
      setDetectedScamInfo(scamCheck);
      setShowScamModal(true);
    }

    const textToSend = inputText;
    setInputText('');
    await sendMessage(textToSend);
  };

  const handleQuickPhrase = (phrase: string) => {
    sendMessage(phrase);
  };

  const handleConfirmAppointment = (appointment: AppointmentData) => {
    setActiveAppointment(appointment);
    sendMessage(
      `📍 [직거래 약속] ${appointment.meet_time}에 "${appointment.place_name}"에서 봬요! (지도 핀 위치 공유됨)`
    );
    sendLocalPushNotification(
      `📍 [직거래 약속 확정] ${appointment.meet_time}`,
      `"${appointment.place_name}"에서 만나요! (1시간 전 리마인더 예약됨)`,
      `/?chat=${activeChat.id}`
    );
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
                  <span>{t('신뢰 매너온도 41.2℃ (회원 프로필 보기 >)')}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowReportModal(true)}
                className="px-2.5 py-1 rounded-full bg-rose-500/30 hover:bg-rose-500/50 text-rose-100 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer border border-rose-400/30"
                title={t('비매너 및 사기 의심 회원 신고 / 차단하기')}
              >
                <span>{t('🚫 사용자 차단 및 신고하기')}</span>
              </button>

              <button
                onClick={() => setShowReviewModal(true)}
                className="px-2.5 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                title={t('직거래 완료 및 상대방 매너온도 평가하기')}
              >
                <Star className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
                <span>{t('직거래 후기 작성하기')}</span>
              </button>

              <button
                onClick={closeChat}
                className="p-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
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
                        {t('안내 내용을 확인해 주세요')}
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
                <button
                  onClick={() => setShowAppointmentModal(true)}
                  className="px-2.5 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-[10px] font-bold rounded-lg shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                >
                  <MapPin className="w-3 h-3 text-yellow-300" />
                  <span>{t('1:1 만남 약속잡기')}</span>
                </button>
                {activeChat.item.status !== 'reserved' && activeChat.item.status !== 'sold' && (
                  <button
                    onClick={() => {
                      alert(t('이 구매자와 [예약중]으로 설정되었습니다.'));
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
                    <span>{t('거래완료')}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 3. 직거래 확정 약속 리마인더 배너 (1시간 전 자동 알림) */}
        {activeAppointment && (
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-4 py-2 text-white text-xs font-bold flex items-center justify-between shadow-sm shrink-0">
            <div className="flex items-center space-x-2 truncate">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Clock className="w-3.5 h-3.5 text-yellow-200" />
              </div>
              <div className="truncate">
                <span className="text-yellow-200 font-extrabold mr-1">{t('[1:1 안심 직거래 약속]')}</span>
                <span>{activeAppointment.meet_time}</span>
                <span className="text-amber-100 font-medium ml-1">({activeAppointment.place_name})</span>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0 ml-2">
              <span className="bg-black/20 px-2 py-0.5 rounded-full text-[10px] text-amber-200 font-bold flex items-center gap-0.5">
                <Bell className="w-2.5 h-2.5" />
                1시간 전 알림
              </span>
            </div>
          </div>
        )}

        {/* 4. AI 실시간 번역 안내 배너 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 text-[11px] text-blue-900 border-b border-blue-100 flex items-center space-x-2 shrink-0">
          <Zap className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>{t('✨ 상대방 모국어로 0.3초 만에 실시간 번역되어 전송됩니다 (AI 안심 번역 탑재)')}</span>
        </div>

        {/* 5. 메시지 목록 스크롤 영역 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          {/* 17개국어 K-Market 공식 안전 거래 수칙 공지 */}
          <KMarketChatSafetyNotice currentLang={currentLang} />

          {chatMessages.map((msg) => {
            const isMe = msg.sender_type === 'buyer';
            const originalText = msg.original_text || msg.text || '';
            const isAppointmentMessage = originalText.includes('[직거래 약속]');

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} space-y-1`}
              >
                {/* 발신자 정보 */}
                <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 px-1">
                  <span>{t('상대방 또는 본인')}</span>
                  <span>•</span>
                  <span>
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                {/* 약속 카드 메시지일 때 인터랙티브 지도 핀 카드 렌더링 */}
                {isAppointmentMessage && activeAppointment ? (
                  <div className="w-full max-w-sm rounded-3xl overflow-hidden shadow-lg border-2 border-blue-500/80 bg-white">
                    {/* 미니 맵 핀 그래픽 헤더 */}
                    <div className="relative h-28 bg-gradient-to-br from-blue-100 via-indigo-50 to-sky-100 p-3 flex flex-col justify-between">
                      <div className="flex justify-between items-center z-10">
                        <span className="bg-blue-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-yellow-300" />
                          <span>{t('지정된 직거래 만남 장소 핀')}</span>
                        </span>
                        <span className="bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          ⏰ {activeAppointment.meet_time}
                        </span>
                      </div>

                      {/* 지도 중앙 펄스 핀 마커 */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="relative flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-red-500/20 animate-ping absolute" />
                          <MapPin className="w-8 h-8 text-red-600 drop-shadow-md fill-red-500" />
                        </div>
                      </div>

                      <div className="z-10 bg-white/90 backdrop-blur-xs rounded-xl p-1.5 px-2 text-[10px] font-bold text-slate-800 self-start shadow-xs">
                        📍 {activeAppointment.place_name}
                      </div>
                    </div>

                    {/* 카드 본문 상세 정보 */}
                    <div className="p-3.5 space-y-2 bg-white text-xs">
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-sm">
                          {activeAppointment.place_name}
                        </h4>
                        <p className="text-slate-500 text-[11px] mt-0.5">
                          {activeAppointment.address} ({activeAppointment.landmark_detail})
                        </p>
                      </div>

                      <div className="p-2 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-between text-[11px]">
                        <span className="font-bold text-amber-900 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>{t('약속된 만남 시간')}</span>
                        </span>
                        <span className="text-[10px] text-amber-700 font-semibold">{t('직거래 약속 1시간 전 자동 리마인더 알림')}</span>
                      </div>

                      <div className="space-y-2">
                        {/* 1. 📅 구글 캘린더에 일정 자동 등록 버튼 (최우선 추천) */}
                        <button
                          type="button"
                          onClick={() => {
                            const calUrl = createGoogleCalendarUrl(
                              activeAppointment,
                              activeChat?.item_title || activeChat?.item?.title || 'K-Market 직거래'
                            );
                            window.open(calUrl, '_blank');
                          }}
                          className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-xs shadow-md active:scale-98"
                        >
                          <Calendar className="w-4 h-4 text-yellow-300" />
                          <span>{t('📅 구글 캘린더에 직거래 일정 담기 (알림)')}</span>
                        </button>

                        {/* 2. 지도 길찾기 2버튼 (구글 지도 / 카카오 지도) */}
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const query = encodeURIComponent(`${activeAppointment.place_name} ${activeAppointment.address}`);
                              window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
                            }}
                            className="py-2 px-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer text-[11px] shadow-xs"
                          >
                            <Navigation className="w-3.5 h-3.5" />
                            <span>{t('구글 지도 길찾기 연동')}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const query = encodeURIComponent(`${activeAppointment.place_name} ${activeAppointment.address}`);
                              window.open(`https://map.kakao.com/link/search/${query}`, '_blank');
                            }}
                            className="py-2 px-2 bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer text-[11px] shadow-xs"
                          >
                            <span>{t('카카오 지도 길찾기 연동')}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* 일반 메시지 말풍선 */
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 shadow-xs space-y-1.5 ${
                      isMe
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-xs'
                        : 'bg-white text-slate-900 border border-slate-200 rounded-bl-xs'
                    }`}
                  >
                    {/* 17개국어 실시간 시스템 사기 안심 개입 배너 */}
                    {(() => {
                      const textToCheck = msg.original_text || msg.text || '';
                      const detected = detectScamPattern(textToCheck);
                      if (!detected) return null;
                      return (
                        <div className="mb-2">
                          <KMarketScamInterventionBanner
                            threatType={detected.threatType}
                            currentLang={currentLang}
                            onReportClick={() => setShowReportModal(true)}
                          />
                        </div>
                      );
                    })()}

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
                )}
              </div>
            );
          })}

          {/* 실시간 번역 중 인디케이터 */}
          {isTranslating && (
            <div className="flex items-center space-x-2 text-xs text-indigo-600 bg-indigo-50 p-2.5 rounded-2xl w-fit border border-indigo-100 animate-pulse">
              <Bot className="w-4 h-4 text-indigo-600" />
              <span>{t('AI 안심 번역가 0.3초 만에 실시간 번역 중...')}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* 6. 단골 중고거래 퀵 응답 버튼 바 */}
        <div className="p-2 bg-white border-t border-slate-100 flex items-center space-x-1.5 overflow-x-auto no-scrollbar shrink-0">
          <button
            onClick={() => setShowAppointmentModal(true)}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shrink-0 shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-yellow-300" />
            <span>{t('📍 만남 장소 핀 잡기')}</span>
          </button>
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

        {/* 7. 메시지 입력창 */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 shrink-0">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t('내 모국어로 편하게 입력하세요 (상대방 언어로 즉시 자동번역)')}
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
      targetUserFlag={activeChat.seller_flag || activeChat.seller_country_flag || '🇻🇳'}
      targetUserCountry={activeChat.seller_country}
      itemId={activeChat.item_id}
      itemTitle={activeChat.item?.title || 'K-Market 거래 상품'}
    />

    {/* 직거래 만남 약속 & 지도 핀 모달 */}
    <KMarketAppointmentModal
      isOpen={showAppointmentModal}
      onClose={() => setShowAppointmentModal(false)}
      targetUserName={activeChat.seller_name}
      itemTitle={activeChat.item?.title}
      onConfirmAppointment={handleConfirmAppointment}
    />

    {/* 🛡️ 사기 방지 안심 쉴드 경고 모달 */}
    <KMarketScamWarningModal
      isOpen={showScamModal}
      onClose={() => setShowScamModal(false)}
      scamInfo={detectedScamInfo}
    />

    {/* 🚫 사용자 차단 및 불량 신고 모달 */}
    <KMarketReportBlockModal
      isOpen={showReportModal}
      onClose={() => setShowReportModal(false)}
      targetUserId={activeChat.seller_id}
      targetUserName={activeChat.seller_name}
      itemId={activeChat.item_id}
      itemTitle={activeChat.item?.title}
      onConfirmReport={(report) => {
        reportUser(report);
        alert(`[신고 접수 완료] "${activeChat.seller_name}" 회원이 차단 및 신고되었습니다.`);
        closeChat();
      }}
    />
  </>
  );
}
