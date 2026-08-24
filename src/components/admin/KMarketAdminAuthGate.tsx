'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Lock, User, ArrowLeft, ShieldCheck, Eye, EyeOff, Building2, AlertCircle } from 'lucide-react';

interface KMarketAdminAuthGateProps {
  onSuccessLogin: () => void;
}

export default function KMarketAdminAuthGate({ onSuccessLogin }: KMarketAdminAuthGateProps) {
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      // 지정된 공식 관리자 계정 검증
      if (adminId.trim() === 'rlaghddlf01' && adminPassword === 'rlaghddlf0411*') {
        sessionStorage.setItem('kmarket_admin_auth', 'true');
        sessionStorage.setItem('kmarket_admin_user', adminId.trim());
        setIsLoading(false);
        onSuccessLogin();
      } else {
        setIsLoading(false);
        setErrorMsg('아이디 또는 비밀번호가 일치하지 않습니다. 다시 확인해 주세요.');
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden font-sans">
      {/* 배경 장식 그래픽 */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-slate-800/90 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 space-y-6">
        {/* 상단 로고 & 헤더 */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 mb-1">
            <Building2 className="w-7 h-7" />
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-[11px] font-black uppercase tracking-wider bg-blue-900/60 text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-700/50">
              KTRS EasyTax Security
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            관리자 관제 센터 로그인
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            KTRS K-Market 통합 관제 및 운영 보안 인증
          </p>
        </div>

        {/* 에러 메시지 알림 */}
        {errorMsg && (
          <div className="bg-rose-500/15 border border-rose-500/40 rounded-2xl p-3.5 flex items-center gap-2.5 text-xs text-rose-300 font-bold animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* 로그인 폼 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 block">
              관리자 아이디
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder="아이디를 입력하세요"
                autoComplete="username"
                className="w-full bg-slate-900/80 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 block">
              관리자 비밀번호
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                autoComplete="current-password"
                className="w-full bg-slate-900/80 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black py-3.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isLoading ? '인증 확인 중...' : '관제 센터 접속하기'}</span>
          </button>
        </form>

        {/* 하단 링크 */}
        <div className="pt-2 border-t border-slate-700/60 flex items-center justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-all font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>K-Market 메인 홈으로 돌아가기</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
