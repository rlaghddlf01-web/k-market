import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'K-Market (케이마켓) | 외국인 전용 0원 중고거래 & 무빙세일 (KTRS)',
  description:
    '대한민국 1위 외국인 슈퍼앱 KTRS 연계 외국인 전용 중고거래 & 귀국 무빙세일 플랫폼. 15개국어 실시간 Gemini 양방향 자동번역 1:1 채팅, 184만원 세무 환급 무료 조회, 전국 주요 공단 도보 직거래!',
  keywords: [
    'K-Market',
    '케이마켓',
    'KTRS',
    '외국인 중고거래',
    '무빙세일',
    'Moving Sale',
    '외국인 세무환급',
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
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </head>
      <body className="antialiased selection:bg-blue-500 selection:text-white" style={{ background: 'var(--surface-bg)', color: 'var(--text-primary)' }}>
        {children}
      </body>
    </html>
  );
}
