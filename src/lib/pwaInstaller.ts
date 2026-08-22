// KTRS K-Market 전역 PWA 설치 트리거 엔진

let deferredPrompt: any = null;

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e: Event) => {
    e.preventDefault();
    deferredPrompt = e;
  });
}

/**
 * 어디서든 호출 가능한 PWA 네이티브 앱 설치 트리거
 */
export async function triggerPwaInstall(): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  // 1. 네이티브 PWA 설치 프롬프트 이벤트가 대기 중인 경우
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    deferredPrompt = null;
    return outcome === 'accepted';
  }

  // 2. iOS Safari 안내
  const ua = window.navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(ua);

  if (isIOS) {
    alert('📱 [iPhone/iPad 설치 안내]\n\n화면 하단 중앙의 [공유 버튼(↑)]을 누른 후\n[홈 화면에 추가(+)]를 선택하시면 앱이 즉시 설치됩니다!');
    return false;
  }

  // 3. PC 크롬 / 안드로이드 fallback 안내
  alert('📱 [앱 설치 안내]\n\n브라우저 주소창 우측의 [설치 아이콘(⊕)] 또는\n상단 메뉴(⋮)에서 [앱 설치] / [홈 화면에 추가]를 클릭하시면 1초 만에 설치됩니다!');
  return false;
}
