// KTRS K-Market 실시간 웹 푸시 알림 & 서비스 워커 연동 엔진

import { SupportedLanguage } from '@/types/kmarket';
import { PUSH_TRANSLATIONS } from './pushTranslations';

/**
 * 1. PWA 서비스 워커 등록
 */
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });
    console.log('[PWA] Service Worker registered successfully:', registration.scope);
    return registration;
  } catch (error) {
    console.error('[PWA] Service Worker registration failed:', error);
    return null;
  }
}

/**
 * 2. 브라우저 실시간 푸시 알림 권한 요청 (15개국 모국어 환영 알림 발송)
 */
export async function requestPushPermission(lang: SupportedLanguage = 'ko'): Promise<NotificationPermission> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    alert('이 브라우저는 웹 푸시 알림을 지원하지 않습니다.');
    return 'denied';
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const trans = PUSH_TRANSLATIONS[lang] || PUSH_TRANSLATIONS.ko;
      await sendLocalPushNotification(trans.welcomeTitle, trans.welcomeBody, '/');
    }
    return permission;
  } catch (error) {
    console.error('[Push] Permission request error:', error);
    return 'denied';
  }
}

/**
 * 3. 서비스 워커를 통한 OS 네이티브 실시간 푸시 알림 발송
 */
export async function sendLocalPushNotification(
  title: string,
  body: string,
  url: string = '/'
): Promise<boolean> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return false;
  }

  if (Notification.permission !== 'granted') {
    console.warn('[Push] Notification permission not granted');
    return false;
  }

  try {
    // 1순위: 서비스 워커 showNotification (백그라운드 지원)
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;
      if (registration && 'showNotification' in registration) {
        await registration.showNotification(title, {
          body,
          icon: '/images/kmarket-logo.jpg',
          badge: '/images/kmarket-logo.jpg',
          vibrate: [200, 100, 200],
          data: { url },
        });
        return true;
      }
    }

    // 2순위: 기본 Notification 객체 fallback
    new Notification(title, {
      body,
      icon: '/images/kmarket-logo.jpg',
    });
    return true;
  } catch (error) {
    console.error('[Push] Show notification error:', error);
    return false;
  }
}

/**
 * 4. 15개국어 맞춤형 실시간 웹 푸시 알림 발송 (다국어 지원)
 */
export async function sendLocalizedPushNotification({
  type,
  lang = 'ko',
  params,
  url = '/',
}: {
  type: 'keyword' | 'chat' | 'appointment' | 'welcome';
  lang?: SupportedLanguage;
  params: {
    keyword?: string;
    itemTitle?: string;
    itemPrice?: string;
    itemRegion?: string;
    senderName?: string;
    meetTime?: string;
    placeName?: string;
  };
  url?: string;
}): Promise<boolean> {
  const trans = PUSH_TRANSLATIONS[lang] || PUSH_TRANSLATIONS.ko;

  let title = trans.welcomeTitle;
  let body = trans.welcomeBody;

  if (type === 'keyword') {
    title = trans.keywordTitle(params.keyword || '매물');
    body = trans.keywordBody(
      params.itemTitle || '',
      params.itemPrice || '0원',
      params.itemRegion || '전국'
    );
  } else if (type === 'chat') {
    title = trans.chatTitle(params.senderName || '판매자');
    body = params.itemTitle || '새로운 번역 메시지가 도착했습니다.';
  } else if (type === 'appointment') {
    title = trans.appointmentTitle(params.meetTime || '오늘');
    body = trans.appointmentBody(params.placeName || '공단 랜드마크');
  }

  return sendLocalPushNotification(title, body, url);
}
