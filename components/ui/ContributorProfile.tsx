'use client';

import { User } from '@/lib/types';
import { formatAddress } from '@/lib/utils';
import { SkillTag } from './SkillTag';
import { Star, Award, ExternalLink } from 'lucide-react';

interface ContributorProfileProps {
  user: User;
  variant?: 'basic' | 'detailed';
  showActions?: boolean;
}

export function ContributorProfile({ 
  user, 
  variant = 'basic', 
  showActions = false 
}: ContributorProfileProps) {
  const getReputationColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    if (score >= 50) return 'text-orange-400';
    return 'text-red-400';
  };

  const getReputationLevel = (score: number) => {
    if (score >= 90) return 'Expert';
    if (score >= 70) return 'Advanced';
    if (score >= 50) return 'Intermediate';
    return 'Beginner';
  };

  if (variant === 'basic') {
    return (
      <div className="glass-card p-4 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-lg">
            {user.name?.charAt(0) || 'U'}
          </div>
          
          <div className="flex-1">
            <h4 className="font-semibold text-text-primary">
              {user.name || 'Anonymous'}
            </h4>
            <p className="text-sm text-text-secondary">
              {formatAddress(user.walletAddress)}
            </p>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className={`font-medium ${getReputationColor(user.reputationScore)}`}>
                {user.reputationScore}
              </span>
            </div>
            <p className="text-xs text-text-secondary">
              {getReputationLevel(user.reputationScore)}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {user.skills.slice(0, 3).map((skill) => (
            <SkillTag key={skill} skill={skill} />
          ))}
          {user.skills.length > 3 && (
            <span className="text-xs text-text-secondary">
              +{user.skills.length - 3} more
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 rounded-lg">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-xl">
          {user.name?.charAt(0) || 'U'}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-semibold text-text-primary">
              {user.name || 'Anonymous'}
            </h3>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className={`font-medium ${getReputationColor(user.reputationScore)}`}>
                {user.reputationScore}
              </span>
            </div>
          </div>
          
          <p className="text-text-secondary mb-2">
            {formatAddress(user.walletAddress)}
          </p>
          
          {user.bio && (
            <p className="text-text-secondary mb-4">
              {user.bio}
            </p>
          )}
          
          <div className="flex items-center gap-4 text-sm text-text-secondary">
            <div className="flex items-center gap-1">
              <Award className="w-4 h-4" />
              <span>{user.pastBounties.length} bounties completed</span>
            </div>
            
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getReputationColor(user.reputationScore)} bg-current bg-opacity-20`}>
              {getReputationLevel(user.reputationScore)}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium text-text-primary mb-3">Skills</h4>
        <div className="flex flex-wrap gap-2">
          {user.skills.map((skill) => (
            <SkillTag key={skill} skill={skill} />
          ))}
        </div>
      </div>

      {(user.githubUrl || user.twitterUrl) && (
        <div className="flex gap-3">
          {user.githubUrl && (
            <a
              href={user.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-accent hover:text-accent-light transition-colors duration-200"
            >
              <ExternalLink className="w-4 h-4" />
              GitHub
            </a>
          )}
          
          {user.twitterUrl && (
            <a
              href={user.twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-accent hover:text-accent-light transition-colors duration-200"
            >
              <ExternalLink className="w-4 h-4" />
              Twitter
            </a>
          )}
        </div>
      )}

      {showActions && (
        <div className="flex gap-3 mt-6">
          <button className="btn-secondary flex-1">
            View Profile
          </button>
          <button className="btn-primary flex-1">
            Send Message
          </button>
        </div>
      )}
    </div>
  );
}
