'use client';

import React from 'react';
import { useKMarket } from '@/context/KMarketContext';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, ShieldCheck, Sparkles, MessageCircle, RefreshCw } from 'lucide-react';

export default function KMarketHeroShowcase() {
  const { setIsTaxModalOpen, setIsCreateModalOpen } = useKMarket();
  const { t } = useLanguage();

  return (
    <section className="w-full border-b border-[#ded1c4]" style={{ background: 'linear-gradient(180deg, #ede3d8 0%, #f4ede6 100%)' }}>
      {/* 웅장한 풀와이드 감성 히어로 쇼케이스 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 relative overflow-hidden">
        {/* 미세한 앰비언트 글로우 */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/50 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
          {/* 좌측: 타이포그래피 & CTA */}
          <div className="max-w-xl space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ded1c4] text-[#4a3424] text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#845b37]" />
              <span>대한민국 외국인 근로자 No.1 안심 플랫폼</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1f1914] tracking-tight leading-tight sm:leading-tight">
              외국인 안심 직거래 &amp; <br />
              <span className="text-[#845b37]">귀국 무빙세일</span> 컬렉션
            </h1>

            <p className="text-sm sm:text-base text-[#5c4a39] font-medium leading-relaxed max-w-lg">
              15개국어 실시간 Gemini 양방향 자동번역 채팅과 <br className="hidden sm:inline" />
              신원인증 기반 주요 공단 1분 도보 직거래로 안전하게 시작하세요.
            </p>

            {/* CTA 버튼 그룹 */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-6 py-3.5 rounded-full bg-[#1f1914] hover:bg-[#332219] text-[#fbf9f6] text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>내 물건 1분 간편 등록</span>
                <ArrowRight className="w-4 h-4 text-amber-200" />
              </button>

              <button
                onClick={() => setIsTaxModalOpen(true)}
                className="px-5 py-3.5 rounded-full bg-[#fefcf9] hover:bg-white text-[#3d2817] border border-[#ded1c4] text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer active:scale-95 shadow-2xs"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span>세무 환급 184만원 무료조회</span>
              </button>
            </div>
          </div>

          {/* 우측: 원룸 풀옵션 무빙세일 묶음 패키지 쇼케이스 (소파 + 세탁기 + 냉장고) */}
          <div className="w-full md:w-1/2 max-w-lg shrink-0">
            <div className="bg-[#fcfaf7] p-3 sm:p-4 rounded-3xl border-2 border-[#d4af37]/60 shadow-xl space-y-2.5">
              {/* 상단 묶음 뱃지 */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white px-2 py-0.5 rounded-full animate-pulse">
                    🔥 D-3 귀국 헐값 급처분
                  </span>
                  <span className="text-xs font-black text-[#1f1914]">
                    원룸 풀옵션 가전·가구 3종 묶음
                  </span>
                </div>
                <span className="text-xs font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-200">
                  75% OFF
                </span>
              </div>

              {/* 3단 묶음 사진 콜라주 그리드 */}
              <div className="grid grid-cols-12 gap-2 h-56 sm:h-64">
                {/* 1. 소파 & 가구 (대형 메인 카드) */}
                <div className="col-span-7 relative rounded-2xl overflow-hidden shadow-sm border border-white/80 group">
                  <img
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80"
                    alt="패브릭 소파 & 가구"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <span className="text-[9px] font-bold bg-[#845b37] px-1.5 py-0.5 rounded-md">
                      🛋️ 2인 소파·테이블
                    </span>
                    <p className="text-xs font-black mt-0.5 truncate drop-shadow-xs">
                      상태 A급 원룸 가구
                    </p>
                  </div>
                </div>

                {/* 2. 세탁기 & 냉장고 (우측 2단 서브 카드) */}
                <div className="col-span-5 flex flex-col gap-2 h-full">
                  {/* 세탁기 */}
                  <div className="flex-1 relative rounded-2xl overflow-hidden shadow-sm border border-white/80 group">
                    <img
                      src="https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=400&q=80"
                      alt="통돌이 세탁기"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-1.5 left-2 right-2 text-white">
                      <span className="text-[9px] font-bold bg-blue-600 px-1.5 py-0.2 rounded-md">
                        🧺 통돌이 10kg
                      </span>
                    </div>
                  </div>

                  {/* 소형 냉장고 */}
                  <div className="flex-1 relative rounded-2xl overflow-hidden shadow-sm border border-white/80 group">
                    <img
                      src="https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=400&q=80"
                      alt="원룸 소형 냉장고"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-1.5 left-2 right-2 text-white">
                      <span className="text-[9px] font-bold bg-emerald-700 px-1.5 py-0.2 rounded-md">
                        🧊 2단 냉장고
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 하단 패키지 가격 바 */}
              <div className="flex items-center justify-between pt-1 border-t border-[#ded1c4] text-xs">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-slate-400 text-[11px] line-through">정가 480,000원</span>
                  <span className="text-base font-black text-rose-600">묶음가 120,000원</span>
                </div>
                <span className="text-[10px] font-bold text-[#845b37] bg-[#ede2d6] px-2 py-0.5 rounded-full">
                  일괄 직거래 우선
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 4대 안심 보증 띠 바 */}
      <div className="border-t border-[#ded1c4]/70 bg-[#ede3d8]/80 px-4 sm:px-6 py-3.5 backdrop-blur-xs">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-[#5c4a39] text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#845b37]" />
            <span className="font-semibold">수수료 0원 100% 무료 직거래</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-[#845b37]" />
            <span className="font-semibold">15개국어 실시간 Gemini 번역</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#845b37]" />
            <span className="font-semibold">선결제 0원 184만원 세무환급</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-[#845b37]" />
            <span className="font-semibold">귀국 D-Day 무빙세일 전용관</span>
          </div>
        </div>
      </div>
    </section>
  );
}
