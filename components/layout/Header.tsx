'use client';

import { useState } from 'react';
import { ConnectWalletButton } from '@/components/ui/ConnectWalletButton';
import { Menu, X, Zap, Plus, Search } from 'lucide-react';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 glass-card border-b border-gray-700 border-opacity-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">
                BaseBounties
              </h1>
              <p className="text-xs text-text-secondary hidden sm:block">
                Ship Code, Earn Crypto
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#bounties" className="text-text-secondary hover:text-accent transition-colors duration-200">
              Browse Bounties
            </a>
            <a href="#create" className="text-text-secondary hover:text-accent transition-colors duration-200">
              Post Bounty
            </a>
            <a href="#leaderboard" className="text-text-secondary hover:text-accent transition-colors duration-200">
              Leaderboard
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button className="p-2 hover:bg-surface rounded-lg transition-colors duration-200">
              <Search className="w-5 h-5 text-text-secondary" />
            </button>
            <button className="btn-secondary flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Post Bounty
            </button>
            <ConnectWalletButton variant="compact" />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 hover:bg-surface rounded-lg transition-colors duration-200"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-text-secondary" />
            ) : (
              <Menu className="w-6 h-6 text-text-secondary" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700 border-opacity-50">
            <nav className="flex flex-col gap-4">
              <a 
                href="#bounties" 
                className="text-text-secondary hover:text-accent transition-colors duration-200 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Browse Bounties
              </a>
              <a 
                href="#create" 
                className="text-text-secondary hover:text-accent transition-colors duration-200 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Post Bounty
              </a>
              <a 
                href="#leaderboard" 
                className="text-text-secondary hover:text-accent transition-colors duration-200 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Leaderboard
              </a>
              
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-700 border-opacity-50">
                <button className="btn-secondary flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" />
                  Post Bounty
                </button>
                <ConnectWalletButton />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
