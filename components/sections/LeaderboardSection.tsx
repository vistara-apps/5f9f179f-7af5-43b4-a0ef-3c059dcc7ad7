'use client';

import { useState } from 'react';
import { ContributorProfile } from '@/components/ui/ContributorProfile';
import { MOCK_USERS } from '@/lib/constants';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';

export function LeaderboardSection() {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'all'>('month');

  // Sort users by reputation score for leaderboard
  const sortedUsers = [...MOCK_USERS].sort(
    (a, b) => b.reputationScore - a.reputationScore
  );

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-400" />;
      default:
        return (
          <span className="w-6 h-6 flex items-center justify-center text-text-secondary font-bold">
            #{rank}
          </span>
        );
    }
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-600';
      default:
        return 'bg-surface';
    }
  };

  return (
    <section id="leaderboard" className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold gradient-text mb-4">
            Top Contributors
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Recognize the skilled developers and security experts leading the
            Base ecosystem
          </p>
        </div>

        {/* Timeframe Selector */}
        <div className="flex justify-center mb-8">
          <div className="glass-card p-1 rounded-lg">
            <div className="flex">
              {(['week', 'month', 'all'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeframe(period)}
                  className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                    timeframe === period
                      ? 'bg-accent text-white shadow-glow'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {period === 'all'
                    ? 'All Time'
                    : `This ${period.charAt(0).toUpperCase() + period.slice(1)}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {sortedUsers.slice(0, 3).map((user, index) => {
            const rank = index + 1;

            return (
              <div
                key={user.userId}
                className={`relative ${rank === 1 ? 'md:order-2 md:scale-110' : rank === 2 ? 'md:order-1' : 'md:order-3'}`}
              >
                <div
                  className={`glass-card p-6 rounded-lg ${getRankBadge(rank)} ${rank === 1 ? 'neon-border' : ''}`}
                >
                  {/* Rank Badge */}
                  <div className="flex justify-center mb-4">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center ${getRankBadge(rank)}`}
                    >
                      {getRankIcon(rank)}
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                      {user.name?.charAt(0) || 'U'}
                    </div>

                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                      {user.name || 'Anonymous'}
                    </h3>

                    <div className="flex items-center justify-center gap-2 mb-3">
                      <TrendingUp className="w-5 h-5 text-accent" />
                      <span className="text-2xl font-bold text-accent">
                        {user.reputationScore}
                      </span>
                    </div>

                    <p className="text-text-secondary text-sm mb-4">
                      {user.pastBounties.length} bounties completed
                    </p>

                    <div className="flex flex-wrap justify-center gap-1">
                      {user.skills.slice(0, 3).map((skill: string) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-primary bg-opacity-20 text-accent text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full Leaderboard */}
        <div className="glass-card rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-700 border-opacity-50">
            <h3 className="text-xl font-semibold text-text-primary">
              Full Leaderboard
            </h3>
          </div>

          <div className="divide-y divide-gray-700 divide-opacity-50">
            {sortedUsers.map((user, index) => {
              const rank = index + 1;

              return (
                <div
                  key={user.userId}
                  className="p-6 hover:bg-surface hover:bg-opacity-50 transition-colors duration-200"
                >
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="flex items-center justify-center w-12">
                      {getRankIcon(rank)}
                    </div>

                    {/* User Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold">
                      {user.name?.charAt(0) || 'U'}
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                      <h4 className="font-semibold text-text-primary">
                        {user.name || 'Anonymous'}
                      </h4>
                      <p className="text-sm text-text-secondary">
                        {user.pastBounties.length} bounties completed
                      </p>
                    </div>

                    {/* Skills */}
                    <div className="hidden md:flex flex-wrap gap-1 max-w-xs">
                      {user.skills.slice(0, 3).map((skill: string) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-primary bg-opacity-20 text-accent text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Reputation Score */}
                    <div className="text-right">
                      <div className="text-xl font-bold text-accent">
                        {user.reputationScore}
                      </div>
                      <div className="text-xs text-text-secondary">
                        reputation
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <div className="glass-card p-8 rounded-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Want to Join the Leaderboard?
            </h3>
            <p className="text-text-secondary mb-6">
              Start completing bounties and build your reputation in the Base
              ecosystem.
            </p>
            <button className="btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </section>
  );
}
