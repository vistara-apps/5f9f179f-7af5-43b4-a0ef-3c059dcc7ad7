'use client';

import { Bounty } from '@/lib/types';
import { formatEther, formatDate, getDifficultyColor, getStatusColor, getTimeAgo } from '@/lib/utils';
import { SkillTag } from './SkillTag';
import { Clock, DollarSign, Users, Calendar } from 'lucide-react';

interface BountyCardProps {
  bounty: Bounty;
  variant?: 'active' | 'completed' | 'awaiting_review';
  onApply?: (bountyId: string) => void;
  onViewDetails?: (bountyId: string) => void;
}

export function BountyCard({ 
  bounty, 
  variant = 'active', 
  onApply, 
  onViewDetails 
}: BountyCardProps) {
  const handleApply = () => {
    onApply?.(bounty.bountyId);
  };

  const handleViewDetails = () => {
    onViewDetails?.(bounty.bountyId);
  };

  return (
    <div className="bounty-card">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-semibold text-text-primary group-hover:text-accent transition-colors duration-200">
              {bounty.title}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(bounty.status)}`}>
              {bounty.status.replace('_', ' ')}
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-text-secondary mb-3">
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span className="font-medium text-accent">{formatEther(bounty.rewardAmount)}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <span className={`font-medium ${getDifficultyColor(bounty.difficulty)}`}>
                {bounty.difficulty}
              </span>
            </div>
            
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{bounty.applicants.length} applicants</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{getTimeAgo(bounty.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-text-secondary mb-4 line-clamp-2">
        {bounty.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {bounty.requiredSkills.slice(0, 4).map((skill) => (
          <SkillTag key={skill} skill={skill} variant="required" />
        ))}
        {bounty.requiredSkills.length > 4 && (
          <span className="text-sm text-text-secondary">
            +{bounty.requiredSkills.length - 4} more
          </span>
        )}
      </div>

      {bounty.deadline && (
        <div className="flex items-center gap-2 text-sm text-text-secondary mb-4">
          <Calendar className="w-4 h-4" />
          <span>Deadline: {formatDate(bounty.deadline)}</span>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleViewDetails}
          className="btn-secondary flex-1"
        >
          View Details
        </button>
        
        {bounty.status === 'active' && (
          <button
            onClick={handleApply}
            className="btn-primary flex-1"
          >
            Apply Now
          </button>
        )}
      </div>
    </div>
  );
}
