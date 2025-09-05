'use client';

import { useState, useEffect } from 'react';
import { ConnectWalletButton } from '@/components/ui/ConnectWalletButton';
import { Search, TrendingUp, Shield, Zap } from 'lucide-react';

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentStat, setCurrentStat] = useState(0);

  const stats = [
    { label: 'Active Bounties', value: '150+', icon: TrendingUp },
    { label: 'Total Rewards', value: '500 ETH', icon: Zap },
    { label: 'Contributors', value: '1,200+', icon: Shield },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [stats.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary bg-opacity-20 rounded-full animate-float" />
      <div className="absolute top-40 right-20 w-16 h-16 bg-accent bg-opacity-20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-purple-500 bg-opacity-20 rounded-full animate-float" style={{ animationDelay: '4s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        {/* Main Heading */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Ship Code</span>
            <br />
            <span className="text-text-primary">Earn Crypto</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Your decentralized bounty hub on Base. Connect skilled contributors 
            with smart contract opportunities and build the future of Web3.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input
              type="text"
              placeholder="Search bounties by skill, category, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 glass-card rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button className="btn-primary text-lg px-8 py-4">
            Browse Bounties
          </button>
          
          <button className="btn-secondary text-lg px-8 py-4">
            Post a Bounty
          </button>
          
          <ConnectWalletButton />
        </div>

        {/* Animated Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isActive = index === currentStat;
            
            return (
              <div
                key={stat.label}
                className={`glass-card p-6 rounded-lg transition-all duration-300 ${
                  isActive ? 'neon-border animate-glow' : 'hover:bg-opacity-90'
                }`}
              >
                <div className="flex items-center justify-center mb-3">
                  <Icon className={`w-8 h-8 ${isActive ? 'text-accent' : 'text-primary'}`} />
                </div>
                <div className="text-2xl font-bold text-text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-text-secondary">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-60">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="text-text-secondary">Secure Escrow</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent" />
            <span className="text-text-secondary">Instant Payouts</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="text-text-secondary">AI Matching</span>
          </div>
        </div>
      </div>
    </section>
  );
}
