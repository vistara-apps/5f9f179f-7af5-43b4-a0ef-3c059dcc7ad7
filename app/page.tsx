'use client';

import { useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { BountiesSection } from '@/components/sections/BountiesSection';
import { LeaderboardSection } from '@/components/sections/LeaderboardSection';

export default function HomePage() {
  const { setFrameReady } = useMiniKit();

  useEffect(() => {
    // Signal that the frame is ready for MiniKit
    setFrameReady();
  }, [setFrameReady]);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <HeroSection />
        <FeaturesSection />
        <BountiesSection />
        <LeaderboardSection />
      </main>
      
      <Footer />
    </div>
  );
}
