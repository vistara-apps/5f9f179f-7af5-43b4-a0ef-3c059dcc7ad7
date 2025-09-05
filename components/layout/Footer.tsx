'use client';

import { Zap, Github, Twitter, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="glass-card border-t border-gray-700 border-opacity-50 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold gradient-text">
                  BaseBounties
                </h3>
                <p className="text-sm text-text-secondary">
                  Ship Code, Earn Crypto
                </p>
              </div>
            </div>
            
            <p className="text-text-secondary mb-6 max-w-md">
              Your decentralized bounty hub on Base. Connect skilled contributors 
              with smart contract opportunities and build the future of Web3.
            </p>
            
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="p-2 hover:bg-surface rounded-lg transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-text-secondary hover:text-accent" />
              </a>
              <a 
                href="#" 
                className="p-2 hover:bg-surface rounded-lg transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-text-secondary hover:text-accent" />
              </a>
              <a 
                href="#" 
                className="p-2 hover:bg-surface rounded-lg transition-colors duration-200"
                aria-label="Discord"
              >
                <MessageCircle className="w-5 h-5 text-text-secondary hover:text-accent" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Platform</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-text-secondary hover:text-accent transition-colors duration-200">
                  Browse Bounties
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-accent transition-colors duration-200">
                  Post Bounty
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-accent transition-colors duration-200">
                  Leaderboard
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-accent transition-colors duration-200">
                  How it Works
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-text-secondary hover:text-accent transition-colors duration-200">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-accent transition-colors duration-200">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-accent transition-colors duration-200">
                  Smart Contracts
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-accent transition-colors duration-200">
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 border-opacity-50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-secondary text-sm">
            © 2024 BaseBounties. Built on Base Network.
          </p>
          
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="#" className="text-text-secondary hover:text-accent text-sm transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-text-secondary hover:text-accent text-sm transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
