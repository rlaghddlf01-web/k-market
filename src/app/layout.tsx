import type { Metadata, Viewport } from 'next';
import './globals.css';
import TrafficTrackerProvider from '@/components/common/TrafficTrackerProvider';
import KMarketPwaInstallPrompt from '@/components/common/KMarketPwaInstallPrompt';
import InAppBrowserEscaper from '@/components/common/InAppBrowserEscaper';
import KMarketPushNotificationManager from '@/components/common/KMarketPushNotificationManager';
import { LanguageProvider } from '@/context/LanguageContext';

export const viewport: Viewport = {
  themeColor: '#09101f',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'KTRS K-Market (케이마켓) | 외국인 중고거래 & 무빙세일',
  description:
    '대한민국 No.1 외국인 근로자 전용 0원 수수료 중고거래 & 귀국 무빙세일 플랫폼! 15개국어 실시간 자동 번역 채팅, 평택·안산·화성 전국 공단 도보 5분 안심 직거래, 최대 1000만원 세금 환급 원스톱 연계',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'K-Market',
  },
  keywords: [
    'K-Market',
    '케이마켓',
    'KTRS',
    '외국인 중고거래',
    '무빙세일',
    'Moving Sale',
    '세금환급',
    '15개국어 번역 채팅',
    '평택 포승공단',
    '안산 반월공단',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/images/kmarket-logo.jpg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </head>
      <body className="antialiased selection:bg-blue-500 selection:text-white" style={{ background: 'var(--surface-bg)', color: 'var(--text-primary)' }}>
        <LanguageProvider>
          <InAppBrowserEscaper />
          <KMarketPushNotificationManager />
          <TrafficTrackerProvider />
          {children}
          <KMarketPwaInstallPrompt />
        </LanguageProvider>
      </body>
    </html>
  );
}
