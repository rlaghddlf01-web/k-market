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
  verification: {
    google: 'C7rvrHCQoAz2tQfJvpwPVa3w-UNOYByv-IGpHc-fBfc',
  },
  metadataBase: new URL('https://ktrs-market.vercel.app'),
  title: 'KTRS K-Market (케이마켓) | 외국인 0원 무료 나눔 & 중고거래 무빙세일',
  description:
    '대한민국 No.1 외국인 0원 무료 나눔 & 중고거래 무빙세일 플랫폼! 17개국어 실시간 자동 번역 채팅, 대학가·공단 도보 5분 안심 직거래, 최대 1000만원 세금 환급 원스톱 연계',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'K-Market',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://ktrs-market.vercel.app',
    siteName: 'KTRS K-Market',
    title: 'KTRS K-Market (케이마켓) | 외국인 0원 무료 나눔 & 중고거래 무빙세일',
    description:
      '대한민국 No.1 외국인 0원 무료 나눔 & 중고거래 무빙세일 플랫폼! 17개국어 실시간 번역 채팅 및 공단·대학가 안심 직거래',
    images: [
      {
        url: '/images/og-kmarket.jpg',
        width: 1200,
        height: 630,
        alt: 'KTRS K-Market 공식 로고',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KTRS K-Market (케이마켓) | 외국인 0원 무료 나눔 & 중고거래 무빙세일',
    description:
      '대한민국 No.1 외국인 0원 무료 나눔 & 중고거래 무빙세일 플랫폼! 17개국어 실시간 번역 채팅 및 공단·대학가 안심 직거래',
    images: ['/images/og-kmarket.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/images/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  keywords: [
    'K-Market',
    '케이마켓',
    'KTRS',
    '외국인 중고거래',
    '무빙세일',
    'Moving Sale',
    '세금환급',
    '17개국어 번역 채팅',
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
    <html lang="ko" translate="no" className="notranslate" suppressHydrationWarning>
      <head>
        <meta name="google" content="notranslate" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/images/icon-192.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
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
          <TrafficTrackerProvider />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
