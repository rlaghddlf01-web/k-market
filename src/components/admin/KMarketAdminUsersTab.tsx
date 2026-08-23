'use client';

import React, { useState } from 'react';
import {
  Users,
  ShieldCheck,
  ShieldAlert,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Ban,
  Clock,
  Sparkles,
  MapPin,
  FileText,
  UserX,
  Filter,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface AdminUserProfile {
  id: string;
  user_name: string;
  nickname?: string;
  phone: string;
  country: string;
  country_flag: string;
  visa_type: string;                 // 'E-9 (비전문취업)', 'E-7 (특정활동)', 'F-4 (재외동포)', 'H-2 (방문취업)', 'D-2 (유학)'
  industrial_zone: string;          // '평택 포승공단', '안산 원곡동', '화성 향남공단' 등
  arc_status: 'auto_verified' | 'pending_review' | 'unverified' | 'banned'; // AI 자동인증 완료, 수동심사 대기, 미인증, 차단
  manner_temp: number;               // 43.5
  items_count: number;              // 등록 매물 수
  trades_completed: number;          // 완료된 거래 수
  created_at: string;
}

const INITIAL_ADMIN_USERS: AdminUserProfile[] = [];

export default function KMarketAdminUsersTab() {
  const { t } = useLanguage();
  const [users, setUsers] = useState<AdminUserProfile[]>(INITIAL_ADMIN_USERS);
  const [statusFilter, setStatusFilter] = useState<'all' | 'auto_verified' | 'pending_review' | 'unverified' | 'banned'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. 상태별 필터링 및 검색
  const filteredUsers = users.filter((u) => {
    const matchesStatus = statusFilter === 'all' || u.arc_status === statusFilter;
    const matchesSearch =
      u.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.nickname && u.nickname.toLowerCase().includes(searchQuery.toLowerCase())) ||
      u.country.includes(searchQuery) ||
      u.industrial_zone.includes(searchQuery) ||
      u.visa_type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // 2. 관리자 액션: 예외 수동 승인 (빛반사 등으로 대기중인 건)
  const handleApproveOcr = (userId: string, userName: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, arc_status: 'auto_verified', manner_temp: Math.max(u.manner_temp, 37.5) } : u))
    );
    alert(`[관리자 확인] "${userName}" 회원의 신분증(ARC)이 수동 승인 완료되었습니다.\n- 신분인증 뱃지 부여\n- 신뢰도 등급 상승`);
  };

  // 3. 관리자 액션: 인증 취소/박탈
  const handleRevokeOcr = (userId: string, userName: string) => {
    if (!confirm(t('해당 회원의 신분증 인증을 취소(박탈)하시겠습니까?'))) return;
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, arc_status: 'unverified' } : u))
    );
    alert(t('회원의 신분인증이 취소되었습니다.'));
  };

  // 4. 관리자 액션: 블랙리스트 차단 / 차단 해제
  const handleToggleBan = (userId: string, userName: string, currentStatus: string) => {
    if (currentStatus === 'banned') {
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, arc_status: 'unverified' } : u))
      );
      alert(t('[차단 해제] 회원의 이용 정지가 해제되었습니다.'));
    } else {
      if (!confirm(t('[경고] 해당 회원을 블랙리스트로 등록하고 플랫폼 전체 이용을 차단하시겠습니까?'))) return;
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, arc_status: 'banned', manner_temp: 0 } : u))
      );
      alert(t('[블랙리스트 등록 완료] 회원의 계정이 영구 정지되었습니다.'));
    }
  };

  // 5. 관리자 액션: 경고 부여 (매너온도 차감)
  const handleGiveWarning = (userId: string, userName: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, manner_temp: Math.max(0, parseFloat((u.manner_temp - 3.0).toFixed(1))) }
          : u
      )
    );
    alert(`[경고 발송] "${userName}" 회원에게 거래 주의 경고가 발송되었으며, 매너온도가 -3.0℃ 차감되었습니다.`);
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* 통계 요약 카드 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs">
          <p className="text-[11px] font-bold text-slate-500">총 외국인 회원</p>
          <p className="text-xl font-black text-slate-900 mt-1">{users.length}명</p>
        </div>
        <div className="bg-emerald-50/60 p-4 rounded-3xl border border-emerald-200/70 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> AI OCR 인증 완료
          </p>
          <p className="text-xl font-black text-emerald-950 mt-1">
            {users.filter((u) => u.arc_status === 'auto_verified').length}명
          </p>
        </div>
        <div className="bg-amber-50/60 p-4 rounded-3xl border border-amber-200/70 shadow-xs">
          <p className="text-[11px] font-bold text-amber-700 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> 심사 대기 (빛반사 등)
          </p>
          <p className="text-xl font-black text-amber-950 mt-1">
            {users.filter((u) => u.arc_status === 'pending_review').length}건
          </p>
        </div>
        <div className="bg-rose-50/60 p-4 rounded-3xl border border-rose-200/70 shadow-xs">
          <p className="text-[11px] font-bold text-rose-700 flex items-center gap-1">
            <Ban className="w-3.5 h-3.5" /> 블랙리스트 차단
          </p>
          <p className="text-xl font-black text-rose-950 mt-1">
            {users.filter((u) => u.arc_status === 'banned').length}명
          </p>
        </div>
      </div>

      {/* 필터 및 검색 바 */}
      <div className="bg-white p-3.5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            전체 ({users.length})
          </button>
          <button
            onClick={() => setStatusFilter('auto_verified')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
              statusFilter === 'auto_verified'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            인증완료 ({users.filter((u) => u.arc_status === 'auto_verified').length})
          </button>
          <button
            onClick={() => setStatusFilter('pending_review')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
              statusFilter === 'pending_review'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            심사대기 ({users.filter((u) => u.arc_status === 'pending_review').length})
          </button>
          <button
            onClick={() => setStatusFilter('unverified')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              statusFilter === 'unverified'
                ? 'bg-slate-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            미인증 ({users.filter((u) => u.arc_status === 'unverified').length})
          </button>
          <button
            onClick={() => setStatusFilter('banned')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
              statusFilter === 'banned'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
            }`}
          >
            <Ban className="w-3.5 h-3.5" />
            차단회원 ({users.filter((u) => u.arc_status === 'banned').length})
          </button>
        </div>

        {/* 검색 인풋 */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="이름, 국적, 공단, 비자 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* 회원 테이블 */}
      <div className="overflow-x-auto rounded-3xl border border-slate-200/80 bg-white shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
            <tr>
              <th className="p-3.5">회원 정보 / 국적</th>
              <th className="p-3.5">비자 & 체류자격</th>
              <th className="p-3.5">거주 공단</th>
              <th className="p-3.5">신분증(ARC) 상태</th>
              <th className="p-3.5">매너온도 / 거래</th>
              <th className="p-3.5">가입일</th>
              <th className="p-3.5 text-right">관리 액션</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-400 text-xs">
                  조건에 일치하는 외국인 회원이 없습니다.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* 1. 회원 정보 & 국적 */}
                  <td className="p-3.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xl shrink-0" title={user.country}>
                        {user.country_flag}
                      </span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-slate-900">{user.user_name}</span>
                          {user.nickname && (
                            <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded-md font-bold">
                              {user.nickname}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                          {user.country} • {user.phone}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* 2. 비자 및 체류자격 */}
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded-lg text-[10px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200">
                      {user.visa_type}
                    </span>
                  </td>

                  {/* 3. 거주 공단 */}
                  <td className="p-3.5">
                    <div className="flex items-center gap-1 text-slate-700 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#845b37] shrink-0" />
                      <span>{user.industrial_zone}</span>
                    </div>
                  </td>

                  {/* 4. 신분증(ARC) OCR 인증 상태 */}
                  <td className="p-3.5">
                    {user.arc_status === 'auto_verified' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        AI 자동인증 완료
                      </span>
                    )}
                    {user.arc_status === 'pending_review' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-300 animate-pulse">
                        <Clock className="w-3.5 h-3.5 text-amber-700" />
                        심사 대기 (빛반사)
                      </span>
                    )}
                    {user.arc_status === 'unverified' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                        미인증
                      </span>
                    )}
                    {user.arc_status === 'banned' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-rose-100 text-rose-800 border border-rose-300">
                        <Ban className="w-3.5 h-3.5 text-rose-600" />
                        블랙리스트 차단
                      </span>
                    )}
                  </td>

                  {/* 5. 매너온도 및 활동 통계 */}
                  <td className="p-3.5">
                    <div className="space-y-0.5">
                      <span
                        className={`inline-block text-[11px] font-black px-1.5 py-0.5 rounded-md ${
                          user.manner_temp >= 40
                            ? 'bg-orange-100 text-orange-700'
                            : user.manner_temp >= 36.5
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-rose-100 text-rose-700'
                        }`}
                      >
                        {user.manner_temp}℃
                      </span>
                      <p className="text-[10px] text-slate-400">
                        매물 {user.items_count}건 • 거래 {user.trades_completed}회
                      </p>
                    </div>
                  </td>

                  {/* 6. 가입일 */}
                  <td className="p-3.5 text-slate-400 text-[11px] font-medium">
                    {user.created_at}
                  </td>

                  {/* 7. 관리자 액션 버튼 그룹 */}
                  <td className="p-3.5 text-right space-x-1 whitespace-nowrap">
                    {/* 대기중일 때: 수동 승인 버튼 */}
                    {user.arc_status === 'pending_review' && (
                      <button
                        onClick={() => handleApproveOcr(user.id, user.user_name)}
                        className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg font-bold text-[10px] transition-colors cursor-pointer inline-flex items-center gap-1"
                        title="관리자가 직접 확인 후 승인"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>수동 승인</span>
                      </button>
                    )}

                    {/* 인증 완료 상태일 때: 인증 박탈/취소 */}
                    {user.arc_status === 'auto_verified' && (
                      <button
                        onClick={() => handleRevokeOcr(user.id, user.user_name)}
                        className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg font-bold text-[10px] transition-colors cursor-pointer"
                        title="도용 의심 시 신분인증 취소"
                      >
                        인증 취소
                      </button>
                    )}

                    {/* 경고 부여 (매너온도 차감) */}
                    <button
                      onClick={() => handleGiveWarning(user.id, user.user_name)}
                      className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg font-bold text-[10px] transition-colors cursor-pointer"
                      title="비매너 경고 및 매너온도 -3℃ 차감"
                    >
                      경고
                    </button>

                    {/* 블랙리스트 차단 / 해제 */}
                    <button
                      onClick={() => handleToggleBan(user.id, user.user_name, user.arc_status)}
                      className={`px-2.5 py-1 rounded-lg font-bold text-[10px] transition-colors cursor-pointer inline-flex items-center gap-1 ${
                        user.arc_status === 'banned'
                          ? 'bg-slate-900 text-white hover:bg-slate-800'
                          : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
                      }`}
                      title={user.arc_status === 'banned' ? '차단 해제' : '영구 정지 및 블랙리스트 등록'}
                    >
                      <Ban className="w-3 h-3 text-rose-600" />
                      <span>{user.arc_status === 'banned' ? '차단해제' : '차단'}</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
