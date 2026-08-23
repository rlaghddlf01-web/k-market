'use client';

import React, { use } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import { KMarketProvider } from '@/context/KMarketContext';
import KMarketMainFeed from '@/components/kmarket/KMarketMainFeed';
import { LanguageCode } from '@/types/kmarket';

interface LangPageProps {
  params: Promise<{ lang: string }> | { lang: string };
}

export default function DynamicLanguagePage({ params }: LangPageProps) {
  // Next.js 15+ async params unwrap 지원
  const resolvedParams = params instanceof Promise ? use(params) : params;
  const langCode = (resolvedParams?.lang || 'ko') as LanguageCode;

  return (
    <LanguageProvider initialLang={langCode}>
      <KMarketProvider>
        <KMarketMainFeed />
      </KMarketProvider>
    </LanguageProvider>
  );
}
