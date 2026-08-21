'use client';

import React from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import { KMarketProvider } from '@/context/KMarketContext';
import KMarketMainFeed from '@/components/kmarket/KMarketMainFeed';

export default function HomePage() {
  return (
    <LanguageProvider>
      <KMarketProvider>
        <KMarketMainFeed />
      </KMarketProvider>
    </LanguageProvider>
  );
}
