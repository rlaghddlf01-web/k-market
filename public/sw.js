// KTRS K-Market PWA Service Worker & Real-time Web Push Notification Engine
const CACHE_NAME = 'kmarket-pwa-v1';

// 1. 서비스 워커 설치 (Install)
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// 2. 서비스 워커 활성화 (Activate)
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// 3. 백그라운드 웹 푸시 알림 수신 (Push Event)
self.addEventListener('push', (event) => {
  let data = {
    title: 'KTRS K-Market 실시간 알림',
    body: '새로운 메시지 또는 관심 매물이 등록되었습니다.',
    icon: '/images/kmarket-logo.jpg',
    badge: '/images/kmarket-logo.jpg',
    url: '/',
  };

  try {
    if (event.data) {
      data = { ...data, ...event.data.json() };
    }
  } catch (e) {
    if (event.data) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || '/images/kmarket-logo.jpg',
    badge: data.badge || '/images/kmarket-logo.jpg',
    vibrate: [200, 100, 200],
    data: {
      url: data.url || '/',
      dateOfArrival: Date.now(),
    },
    actions: [
      { action: 'open', title: '👉 바로 확인하기' },
      { action: 'close', title: '닫기' },
    ],
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// 4. 푸시 알림 클릭 시 앱으로 이동 (Notification Click)
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'close') return;

  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // 이미 열려 있는 K-Market 탭이 있으면 포커스 및 URL 이동
      for (let client of windowClients) {
        if (client.url.includes(self.origin) && 'focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      // 열린 탭이 없으면 새 창으로 열기
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});
