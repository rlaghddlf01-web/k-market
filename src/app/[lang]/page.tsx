'use client';

import React, { useEffect, use } from 'react';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import { KMarketProvider } from '@/context/KMarketContext';
import KMarketMainFeed from '@/components/kmarket/KMarketMainFeed';
import { LanguageCode } from '@/types/kmarket';

interface LangPageProps {
  params: Promise<{ lang: string }> | { lang: string };
}

function LangInitWrapper({
  langCode,
  children,
}: {
  langCode: LanguageCode;
  children: React.ReactNode;
}) {
  const { setLanguage } = useLanguage();

  useEffect(() => {
    if (langCode) {
      setLanguage(langCode);
      if (typeof window !== 'undefined') {
        localStorage.setItem('kmarket_selected_lang', langCode);
        localStorage.setItem('kmarket_welcomed', 'true');
      }
    }
  }, [langCode, setLanguage]);

  return <>{children}</>;
}

export default function DynamicLanguagePage({ params }: LangPageProps) {
  // Next.js 15+ async params unwrap 지원
  const resolvedParams = params instanceof Promise ? use(params) : params;
  const langCode = (resolvedParams?.lang || 'ko') as LanguageCode;

  return (
    <LanguageProvider>
      <LangInitWrapper langCode={langCode}>
        <KMarketProvider>
          <KMarketMainFeed />
        </KMarketProvider>
      </LangInitWrapper>
    </LanguageProvider>
  );
}
