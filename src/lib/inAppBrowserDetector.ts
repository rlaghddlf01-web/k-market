// 인앱 브라우저(TikTok, Facebook, KakaoTalk, LINE, Instagram, Naver 등) 정밀 감지 및 탈출 엔진

export interface InAppBrowserInfo {
  isInApp: boolean;
  appType: 'kakaotalk' | 'tiktok' | 'facebook' | 'instagram' | 'line' | 'naver' | 'other' | 'none';
  isAndroid: boolean;
  isIOS: boolean;
}

/**
 * 현재 브라우저의 인앱 여부 및 OS 정밀 판별
 */
export function checkInAppBrowser(): InAppBrowserInfo {
  if (typeof window === 'undefined') {
    return { isInApp: false, appType: 'none', isAndroid: false, isIOS: false };
  }

  const ua = window.navigator.userAgent.toLowerCase();
  const isAndroid = /android/i.test(ua);
  const isIOS = /iphone|ipad|ipod/i.test(ua);

  let appType: InAppBrowserInfo['appType'] = 'none';

  if (ua.includes('kakaotalk')) {
    appType = 'kakaotalk';
  } else if (ua.includes('musical_ly') || ua.includes('tiktok') || ua.includes('bytedance')) {
    appType = 'tiktok';
  } else if (ua.includes('fban') || ua.includes('fbav')) {
    appType = 'facebook';
  } else if (ua.includes('instagram')) {
    appType = 'instagram';
  } else if (ua.includes('line')) {
    appType = 'line';
  } else if (ua.includes('naver')) {
    appType = 'naver';
  } else if (/inapp|webview/i.test(ua)) {
    appType = 'other';
  }

  const isInApp = appType !== 'none';

  return {
    isInApp,
    appType,
    isAndroid,
    isIOS,
  };
}

/**
 * 안드로이드 크롬 인텐트(Intent) 강제 탈출 URL 생성
 */
export function getAndroidChromeIntentUrl(targetUrl: string): string {
  const cleanUrl = targetUrl.replace(/https?:\/\//, '');
  return `intent://${cleanUrl}#Intent;scheme=https;package=com.android.chrome;end`;
}

/**
 * 카카오톡 전용 외부 브라우저 호출 스킴 URL 생성
 */
export function getKakaoWebUrl(targetUrl: string): string {
  return `kakaotalk://web/openExternal?url=${encodeURIComponent(targetUrl)}`;
}
