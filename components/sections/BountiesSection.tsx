'use client';

import { useState } from 'react';
import { BountyCard } from '@/components/ui/BountyCard';
import { SkillTag } from '@/components/ui/SkillTag';
import { Modal } from '@/components/ui/Modal';
import { MOCK_BOUNTIES, SKILLS, BOUNTY_CATEGORIES, DIFFICULTY_LEVELS } from '@/lib/constants';
import { Filter, SortAsc, Grid, List } from 'lucide-react';

export function BountiesSection() {
  const [bounties] = useState(MOCK_BOUNTIES);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'reward' | 'deadline'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBounty, setSelectedBounty] = useState<string | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const filteredBounties = bounties.filter(bounty => {
    if (selectedSkills.length > 0) {
      const hasMatchingSkill = selectedSkills.some(skill => 
        bounty.requiredSkills.includes(skill)
      );
      if (!hasMatchingSkill) return false;
    }

    if (selectedCategory !== 'all' && bounty.category !== selectedCategory) {
      return false;
    }

    if (selectedDifficulty !== 'all' && bounty.difficulty !== selectedDifficulty) {
      return false;
    }

    return true;
  });

  const sortedBounties = [...filteredBounties].sort((a, b) => {
    switch (sortBy) {
      case 'reward':
        return parseFloat(b.rewardAmount) - parseFloat(a.rewardAmount);
      case 'deadline':
        if (!a.deadline && !b.deadline) return 0;
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return a.deadline.getTime() - b.deadline.getTime();
      case 'newest':
      default:
        return b.createdAt.getTime() - a.createdAt.getTime();
    }
  });

  const handleApply = (bountyId: string) => {
    setSelectedBounty(bountyId);
    setShowApplicationModal(true);
  };

  const handleViewDetails = (bountyId: string) => {
    // Navigate to bounty details page
    console.log('View details for bounty:', bountyId);
  };

  return (
    <section id="bounties" className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold gradient-text mb-4">
            Active Bounties
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Discover smart contract opportunities that match your skills and earn crypto rewards
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="glass-card p-6 rounded-lg mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center gap-2 lg:hidden"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>

            {/* Desktop Filters */}
            <div className={`flex-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full glass-card rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="all">All Categories</option>
                    {BOUNTY_CATEGORIES.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Difficulty
                  </label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full glass-card rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="all">All Levels</option>
                    {DIFFICULTY_LEVELS.map(level => (
                      <option key={level.id} value={level.id}>
                        {level.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full glass-card rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="newest">Newest First</option>
                    <option value="reward">Highest Reward</option>
                    <option value="deadline">Deadline Soon</option>
                  </select>
                </div>
              </div>

              {/* Skills Filter */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Skills
                </label>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.slice(0, 12).map(skill => (
                    <SkillTag
                      key={skill.id}
                      skill={skill.name}
                      variant={selectedSkills.includes(skill.id) ? 'selected' : 'default'}
                      onClick={() => toggleSkill(skill.id)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === 'grid' ? 'bg-accent text-white' : 'text-text-secondary hover:bg-surface'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === 'list' ? 'bg-accent text-white' : 'text-text-secondary hover:bg-surface'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-text-secondary">
            Showing {sortedBounties.length} of {bounties.length} bounties
          </p>
          
          {selectedSkills.length > 0 && (
            <button
              onClick={() => setSelectedSkills([])}
              className="text-accent hover:text-accent-light text-sm"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Bounties Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {sortedBounties.map(bounty => (
            <BountyCard
              key={bounty.bountyId}
              bounty={bounty}
              variant={bounty.status as any}
              onApply={handleApply}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* Empty State */}
        {sortedBounties.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-12 h-12 text-text-secondary" />
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              No bounties found
            </h3>
            <p className="text-text-secondary mb-4">
              Try adjusting your filters or check back later for new opportunities
            </p>
            <button
              onClick={() => {
                setSelectedSkills([]);
                setSelectedCategory('all');
                setSelectedDifficulty('all');
              }}
              className="btn-primary"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Application Modal */}
        <Modal
          isOpen={showApplicationModal}
          onClose={() => setShowApplicationModal(false)}
          title="Apply for Bounty"
        >
          <div className="space-y-4">
            <p className="text-text-secondary">
              Submit your application for this bounty. Make sure to highlight your relevant experience and proposed approach.
            </p>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Cover Message
              </label>
              <textarea
                rows={4}
                className="w-full glass-card rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Describe your experience and approach to this bounty..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Estimated Timeline
              </label>
              <input
                type="text"
                className="w-full glass-card rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="e.g., 2-3 weeks"
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowApplicationModal(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button className="btn-primary flex-1">
                Submit Application
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </section>
  );
}
