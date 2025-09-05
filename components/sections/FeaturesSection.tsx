'use client';

import { Brain, Shield, Zap, Award, Users, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Matching',
    description: 'Our intelligent system matches bounties to contributors based on skills, experience, and on-chain reputation.',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500 bg-opacity-20',
  },
  {
    icon: Shield,
    title: 'Secure Escrow',
    description: 'Funds are held safely in smart contracts and automatically released upon verified completion.',
    color: 'text-green-400',
    bgColor: 'bg-green-500 bg-opacity-20',
  },
  {
    icon: Zap,
    title: 'Instant Payouts',
    description: 'Get paid immediately when your work is approved. No waiting, no intermediaries.',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500 bg-opacity-20',
  },
  {
    icon: Award,
    title: 'Reputation System',
    description: 'Build your on-chain reputation and unlock higher-value opportunities as you complete bounties.',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500 bg-opacity-20',
  },
  {
    icon: Users,
    title: 'Curated Community',
    description: 'Join a community of skilled developers and security experts building the future of Web3.',
    color: 'text-pink-400',
    bgColor: 'bg-pink-500 bg-opacity-20',
  },
  {
    icon: TrendingUp,
    title: 'Growth Opportunities',
    description: 'Access exclusive bounties and advance your career in the rapidly growing Base ecosystem.',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500 bg-opacity-20',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold gradient-text mb-4">
            Why Choose BaseBounties?
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            We've built the most advanced bounty platform on Base, designed to connect 
            the right people with the right opportunities.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <div
                key={feature.title}
                className="group bounty-card hover:scale-105 transform transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                
                <h3 className="text-xl font-semibold text-text-primary mb-3 group-hover:text-accent transition-colors duration-200">
                  {feature.title}
                </h3>
                
                <p className="text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="glass-card p-8 rounded-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Ready to Start Earning?
            </h3>
            <p className="text-text-secondary mb-6">
              Join thousands of developers already earning crypto by contributing to the Base ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Browse Bounties
              </button>
              <button className="btn-secondary">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
