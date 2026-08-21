'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getUserTrustProfile, TAG_TRANSLATIONS, POSITIVE_TAGS } from '@/lib/trustData';
import KMarketTrustBadge from './KMarketTrustBadge';
import CountryFlag from './CountryFlag';
import { X, ShieldCheck, Home, MessageSquare, Award, ThumbsUp } from 'lucide-react';

interface KMarketUserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  userName?: string;
  userCountry?: string;
  userFlag?: string;
}

export default function KMarketUserProfileModal({
  isOpen,
  onClose,
  userId,
  userName = 'K-Market User',
  userCountry = 'VN',
  userFlag = '🇻🇳',
}: KMarketUserProfileModalProps) {
  const { currentLang } = useLanguage();

  if (!isOpen) return null;

  const profile = getUserTrustProfile(userId, userName, userCountry, userFlag);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 dark:border-gray-800 relative max-h-[90vh] overflow-y-auto">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          {/* 유저 헤더 정보 */}
          <div className="flex items-center gap-3.5 pt-2">
            <CountryFlag
              countryCode={profile.country}
              fallbackEmoji={profile.flag}
              size="xl"
              shape="circle"
              className="shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  {profile.user_name}
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-medium">
                  {profile.country}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>응답률 {profile.response_rate}%</span>
                <span>•</span>
                <span>거래 완료 {profile.trade_count}회</span>
              </div>
            </div>
          </div>

          {/* K-Trust 매너온도 상세 위젯 */}
          <KMarketTrustBadge
            mannerTemp={profile.manner_temp}
            tradeCount={profile.trade_count}
            isVerifiedWorker={profile.is_verified_worker}
            isVerifiedDormitory={profile.is_verified_dormitory}
            variant="detailed"
          />

          {/* 인증 배지 상태 안내 */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 space-y-2 text-xs">
            <div className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>안심 거래 인증 현황</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>체류비자 신분 확인됨</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Home className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>산단 기숙사 위치 인증</span>
              </div>
            </div>
          </div>

          {/* 받은 매너 칭찬 키워드 통계 */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
              <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>받은 매너 칭찬 키워드</span>
            </h3>

            {profile.positive_tags_summary.length > 0 ? (
              <div className="space-y-1.5">
                {profile.positive_tags_summary.map((summary) => {
                  const tagInfo = POSITIVE_TAGS.find((t) => t.id === summary.tag_id);
                  const labelKey = tagInfo?.labelKey || '';
                  const labelText =
                    TAG_TRANSLATIONS[labelKey]?.[currentLang] ||
                    TAG_TRANSLATIONS[labelKey]?.ko ||
                    summary.tag_id;

                  return (
                    <div
                      key={summary.tag_id}
                      className="flex items-center justify-between p-2 rounded-xl bg-gray-50 dark:bg-gray-800/60 text-xs"
                    >
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                        <span>{tagInfo?.icon || '👍'}</span>
                        <span>{labelText}</span>
                      </div>
                      <span className="font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                        {summary.count}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-4 text-xs text-gray-400">
                아직 등록된 칭찬 키워드가 없습니다.
              </div>
            )}
          </div>

          {/* 최근 거래 후기 */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
              <span>최근 거래 후기 ({profile.recent_reviews.length})</span>
            </h3>

            {profile.recent_reviews.length > 0 ? (
              <div className="space-y-2">
                {profile.recent_reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1.5 font-semibold text-gray-800 dark:text-gray-200">
                        <CountryFlag
                          countryCode={rev.reviewer_country}
                          fallbackEmoji={rev.reviewer_flag}
                          size="xs"
                          shape="circle"
                        />
                        <span>{rev.reviewer_name}</span>
                      </div>
                      <span className="text-[10px]">
                        {new Date(rev.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    {rev.comment && (
                      <p className="text-gray-700 dark:text-gray-300 italic text-[11px] bg-white/70 dark:bg-gray-800/80 p-2 rounded-xl border border-gray-100 dark:border-gray-700/40">
                        &ldquo;{rev.comment}&rdquo;
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-xs text-gray-400">
                첫 번째 거래 후기를 남겨보세요!
              </div>
            )}
          </div>

          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold text-xs transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
