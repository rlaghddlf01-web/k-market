// PWA 1초 설치 트리거 유틸 (17개국어 대응)

export async function triggerPwaInstall(): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  const deferredPrompt = (window as any).deferredPwaPrompt;

  if (deferredPrompt) {
    try {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        (window as any).deferredPwaPrompt = null;
        return true;
      }
    } catch (err) {
      console.warn('PWA prompt error:', err);
    }
  }

  // 기기별 안내
  const isIOS = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
  const currentLang = localStorage.getItem('kmarket_lang') || 'ko';

  if (isIOS) {
    if (currentLang === 'vi') {
      alert('📱 [Hướng dẫn cài đặt iPhone/Safari]\n\nVui lòng nhấn nút [Chia sẻ (↑)] ở thanh dưới cùng rồi chọn [Thêm vào Màn hình chính (+)] để cài đặt ứng dụng ngay!');
    } else if (currentLang === 'zh') {
      alert('📱 [iPhone/Safari 安装指引]\n\n请点击浏览器底部的 [分享按钮(↑)]，然后选择 [添加到主屏幕(+)] 即可完成安装！');
    } else {
      alert('📱 [iPhone/Safari Install Guide]\n\nTap the [Share button (↑)] at the bottom and choose [Add to Home Screen (+)] to install the app!');
    }
  } else {
    if (currentLang === 'vi') {
      alert('📱 [Hướng dẫn cài đặt App K-Market]\n\nNhấn biểu tượng [Cài đặt (⊕)] trên thanh địa chỉ hoặc menu (⋮) rồi chọn [Cài đặt ứng dụng] / [Thêm vào màn hình chính]!');
    } else if (currentLang === 'zh') {
      alert('📱 [K-Market 应用安装指引]\n\n点击浏览器地址栏右侧的 [安装图标(⊕)] 或菜单(⋮)中的 [安装应用] / [添加到主屏幕] 即可1秒完成安装！');
    } else {
      alert('📱 [K-Market App Installation]\n\nClick the [Install icon (⊕)] in address bar or menu (⋮) and select [Install App] / [Add to Home Screen]!');
    }
  }
  return false;
}
