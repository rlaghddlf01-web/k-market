'use client';

export type TrafficChannelKey =
  | 'tiktok'
  | 'facebook'
  | 'zalo'
  | 'direct'
  | 'telegram'
  | 'line'
  | 'youtube'
  | 'wechat'
  | 'instagram'
  | 'offline_qr'
  | 'google'
  | 'kakaotalk'
  | 'naver'
  | 'referral'
  | 'eps_gov'
  | 'other';

export interface TrafficRecord {
  channelKey: TrafficChannelKey;
  channelName: string;
  sourceUrl?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
  timestamp: string;
}

const STORAGE_KEY_TRAFFIC_STATS = 'kmarket_traffic_stats_v1';
const STORAGE_KEY_LAST_VISIT = 'kmarket_last_visit_session';

/**
 * 1. URL 쿼리 파라미터 및 Referrer를 분석하여 16대 유입 채널 식별
 */
export function analyzeTrafficSource(): TrafficRecord {
  if (typeof window === 'undefined') {
    return {
      channelKey: 'direct',
      channelName: '직접 방문 (Direct / 북마크)',
      timestamp: new Date().toISOString(),
    };
  }

  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = (urlParams.get('utm_source') || urlParams.get('source') || urlParams.get('ref') || '').toLowerCase();
  const utmMedium = urlParams.get('utm_medium') || '';
  const utmCampaign = urlParams.get('utm_campaign') || '';
  const referrer = document.referrer ? document.referrer.toLowerCase() : '';

  let channelKey: TrafficChannelKey = 'direct';
  let channelName = '직접 방문 (Direct / 북마크)';

  // 1) UTM 파라미터 우선 판별
  if (utmSource.includes('tiktok') || utmSource.includes('tt')) {
    channelKey = 'tiktok';
    channelName = '틱톡 (TikTok Shorts/바이럴)';
  } else if (utmSource.includes('facebook') || utmSource.includes('fb')) {
    channelKey = 'facebook';
    channelName = '페이스북 (외국인 커뮤니티 그룹)';
  } else if (utmSource.includes('zalo')) {
    channelKey = 'zalo';
    channelName = '잘로 (Zalo 베트남 메신저)';
  } else if (utmSource.includes('line')) {
    channelKey = 'line';
    channelName = '라인 (LINE 태국/동남아 채널)';
  } else if (utmSource.includes('telegram') || utmSource.includes('tg')) {
    channelKey = 'telegram';
    channelName = '텔레그램 (Telegram 우즈벡/러시아어)';
  } else if (utmSource.includes('wechat') || utmSource.includes('wx')) {
    channelKey = 'wechat';
    channelName = '위챗 (WeChat 동포 네트워크)';
  } else if (utmSource.includes('youtube') || utmSource.includes('yt')) {
    channelKey = 'youtube';
    channelName = '유튜브 (YouTube 한국생활 쇼츠)';
  } else if (utmSource.includes('instagram') || utmSource.includes('insta') || utmSource.includes('ig')) {
    channelKey = 'instagram';
    channelName = '인스타그램 (Instagram 릴스)';
  } else if (utmSource.includes('qr') || utmSource.includes('dormitory') || utmSource.includes('shelter')) {
    channelKey = 'offline_qr';
    channelName = '기숙사/쉼터 QR코드 오프라인';
  } else if (utmSource.includes('kakao') || utmSource.includes('talk')) {
    channelKey = 'kakaotalk';
    channelName = '카카오톡 (오픈채팅/알림톡)';
  } else if (utmSource.includes('eps') || utmSource.includes('gov') || utmSource.includes('hikorea')) {
    channelKey = 'eps_gov';
    channelName = '고용노동부 EPS 게시판';
  } else if (utmSource.includes('invite') || utmSource.includes('friend') || utmSource.includes('referral')) {
    channelKey = 'referral';
    channelName = '지인 초대 (친구추천 링크)';
  }
  // 2) Referrer(브라우저 이전 URL) 2차 판별
  else if (referrer) {
    if (referrer.includes('tiktok.com')) {
      channelKey = 'tiktok';
      channelName = '틱톡 (TikTok Shorts/바이럴)';
    } else if (referrer.includes('facebook.com') || referrer.includes('fb.com') || referrer.includes('fb.me') || referrer.includes('m.facebook.com')) {
      channelKey = 'facebook';
      channelName = '페이스북 (외국인 커뮤니티 그룹)';
    } else if (referrer.includes('zalo.me') || referrer.includes('chat.zalo.me')) {
      channelKey = 'zalo';
      channelName = '잘로 (Zalo 베트남 메신저)';
    } else if (referrer.includes('line.me')) {
      channelKey = 'line';
      channelName = '라인 (LINE 태국/동남아 채널)';
    } else if (referrer.includes('t.me') || referrer.includes('telegram.org')) {
      channelKey = 'telegram';
      channelName = '텔레그램 (Telegram 우즈벡/러시아어)';
    } else if (referrer.includes('instagram.com')) {
      channelKey = 'instagram';
      channelName = '인스타그램 (Instagram 릴스)';
    } else if (referrer.includes('youtube.com') || referrer.includes('youtu.be')) {
      channelKey = 'youtube';
      channelName = '유튜브 (YouTube 한국생활 쇼츠)';
    } else if (referrer.includes('google.com') || referrer.includes('google.co.kr')) {
      channelKey = 'google';
      channelName = '구글 (Google 다국어 검색)';
    } else if (referrer.includes('naver.com')) {
      channelKey = 'naver';
      channelName = '네이버 (블로그/카페)';
    } else if (referrer.includes('eps.go.kr') || referrer.includes('hikorea.go.kr') || referrer.includes('moel.go.kr')) {
      channelKey = 'eps_gov';
      channelName = '고용노동부 EPS 게시판';
    } else if (referrer.includes('tistory.com') || referrer.includes('daum.net')) {
      channelKey = 'other';
      channelName = '티스토리 및 웹진';
    } else {
      channelKey = 'other';
      channelName = '기타 타사이트 유입';
    }
  }

  return {
    channelKey,
    channelName,
    sourceUrl: window.location.href,
    utmSource: utmSource || undefined,
    utmMedium: utmMedium || undefined,
    utmCampaign: utmCampaign || undefined,
    referrer: referrer || undefined,
    timestamp: new Date().toISOString(),
  };
}

/**
 * 2. 유입 카운트 실시간 기록 (세션 중복 방지 포함)
 */
export function recordTrafficVisit(): TrafficRecord | null {
  if (typeof window === 'undefined') return null;

  // 10분 내 동일 세션 재방문은 중복 카운트 방지 (정확한 유니크 PV 측정)
  const lastVisit = sessionStorage.getItem(STORAGE_KEY_LAST_VISIT);
  const now = Date.now();
  if (lastVisit && now - parseInt(lastVisit, 10) < 1000 * 60 * 10) {
    return null;
  }

  const record = analyzeTrafficSource();
  sessionStorage.setItem(STORAGE_KEY_LAST_VISIT, now.toString());

  try {
    const raw = localStorage.getItem(STORAGE_KEY_TRAFFIC_STATS);
    const stats: Record<string, number> = raw ? JSON.parse(raw) : {};
    stats[record.channelKey] = (stats[record.channelKey] || 0) + 1;
    stats['total_pv'] = (stats['total_pv'] || 0) + 1;
    localStorage.setItem(STORAGE_KEY_TRAFFIC_STATS, JSON.stringify(stats));
  } catch {
    // LocalStorage warning ignored
  }

  // 중앙 Supabase DB로 비동기 전송 (사용자 화면 렌더링에 영향 없도록 논블로킹)
  try {
    fetch('/api/traffic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    }).catch(() => {
      // 오프라인이거나 실패 시에도 조용히 처리
    });
  } catch {
    // Ignore fetch error
  }

  return record;
}

/**
 * 3. 누적된 실제 유입 통계 가져오기
 */
export function getLiveTrafficStats(): Record<string, number> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TRAFFIC_STATS);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
