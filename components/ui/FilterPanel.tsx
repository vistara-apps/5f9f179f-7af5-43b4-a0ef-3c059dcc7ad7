'use client';

import { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { SkillTag } from './SkillTag';

interface FilterPanelProps {
  selectedSkills: string[];
  selectedCategory: string;
  selectedDifficulty: string;
  sortBy: string;
  onSkillToggle: (skill: string) => void;
  onCategoryChange: (category: string) => void;
  onDifficultyChange: (difficulty: string) => void;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
  skills: string[];
  categories: Array<{ value: string; label: string }>;
  difficulties: Array<{ value: string; label: string }>;
  sortOptions: Array<{ value: string; label: string }>;
  className?: string;
}

export function FilterPanel({
  selectedSkills,
  selectedCategory,
  selectedDifficulty,
  sortBy,
  onSkillToggle,
  onCategoryChange,
  onDifficultyChange,
  onSortChange,
  onClearFilters,
  skills,
  categories,
  difficulties,
  sortOptions,
  className = ''
}: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    skills: true,
    category: true,
    difficulty: true,
    sort: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const hasActiveFilters = selectedSkills.length > 0 || 
    selectedCategory !== 'all' || 
    selectedDifficulty !== 'all' || 
    sortBy !== 'newest';

  return (
    <div className={`glass-card border border-gray-700 border-opacity-50 rounded-lg ${className}`}>
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700 border-opacity-50">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-accent" />
          <h3 className="font-semibold text-text-primary">Filters</h3>
          {hasActiveFilters && (
            <span className="bg-accent bg-opacity-20 text-accent px-2 py-1 rounded-full text-xs">
              Active
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-text-secondary hover:text-accent transition-colors duration-200 text-sm"
            >
              Clear all
            </button>
          )}
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden p-1 hover:bg-surface rounded transition-colors duration-200"
            aria-label={isExpanded ? "Collapse filters" : "Expand filters"}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-text-secondary" />
            ) : (
              <ChevronDown className="w-4 h-4 text-text-secondary" />
            )}
          </button>
        </div>
      </div>

      {/* Filter Content */}
      <div className={`${isExpanded ? 'block' : 'hidden'} md:block`}>
        {/* Skills Filter */}
        <div className="p-4 border-b border-gray-700 border-opacity-50">
          <button
            onClick={() => toggleSection('skills')}
            className="flex items-center justify-between w-full mb-3 text-left"
          >
            <h4 className="font-medium text-text-primary">Skills</h4>
            {expandedSections.skills ? (
              <ChevronUp className="w-4 h-4 text-text-secondary" />
            ) : (
              <ChevronDown className="w-4 h-4 text-text-secondary" />
            )}
          </button>
          
          {expandedSections.skills && (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => onSkillToggle(skill)}
                  className={`
                    skill-tag transition-all duration-200 cursor-pointer
                    ${selectedSkills.includes(skill) 
                      ? 'bg-accent bg-opacity-30 border-accent text-accent' 
                      : 'hover:bg-opacity-30'
                    }
                  `}
                >
                  {skill}
                  {selectedSkills.includes(skill) && (
                    <X className="w-3 h-3 ml-1" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div className="p-4 border-b border-gray-700 border-opacity-50">
          <button
            onClick={() => toggleSection('category')}
            className="flex items-center justify-between w-full mb-3 text-left"
          >
            <h4 className="font-medium text-text-primary">Category</h4>
            {expandedSections.category ? (
              <ChevronUp className="w-4 h-4 text-text-secondary" />
            ) : (
              <ChevronDown className="w-4 h-4 text-text-secondary" />
            )}
          </button>
          
          {expandedSections.category && (
            <div className="space-y-2">
              {categories.map((category) => (
                <label
                  key={category.value}
                  className="flex items-center gap-2 cursor-pointer hover:text-accent transition-colors duration-200"
                >
                  <input
                    type="radio"
                    name="category"
                    value={category.value}
                    checked={selectedCategory === category.value}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="w-4 h-4 text-accent bg-transparent border-gray-600 focus:ring-accent focus:ring-2"
                  />
                  <span className="text-text-secondary">{category.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Difficulty Filter */}
        <div className="p-4 border-b border-gray-700 border-opacity-50">
          <button
            onClick={() => toggleSection('difficulty')}
            className="flex items-center justify-between w-full mb-3 text-left"
          >
            <h4 className="font-medium text-text-primary">Difficulty</h4>
            {expandedSections.difficulty ? (
              <ChevronUp className="w-4 h-4 text-text-secondary" />
            ) : (
              <ChevronDown className="w-4 h-4 text-text-secondary" />
            )}
          </button>
          
          {expandedSections.difficulty && (
            <div className="space-y-2">
              {difficulties.map((difficulty) => (
                <label
                  key={difficulty.value}
                  className="flex items-center gap-2 cursor-pointer hover:text-accent transition-colors duration-200"
                >
                  <input
                    type="radio"
                    name="difficulty"
                    value={difficulty.value}
                    checked={selectedDifficulty === difficulty.value}
                    onChange={(e) => onDifficultyChange(e.target.value)}
                    className="w-4 h-4 text-accent bg-transparent border-gray-600 focus:ring-accent focus:ring-2"
                  />
                  <span className="text-text-secondary">{difficulty.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Sort Options */}
        <div className="p-4">
          <button
            onClick={() => toggleSection('sort')}
            className="flex items-center justify-between w-full mb-3 text-left"
          >
            <h4 className="font-medium text-text-primary">Sort by</h4>
            {expandedSections.sort ? (
              <ChevronUp className="w-4 h-4 text-text-secondary" />
            ) : (
              <ChevronDown className="w-4 h-4 text-text-secondary" />
            )}
          </button>
          
          {expandedSections.sort && (
            <div className="space-y-2">
              {sortOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-2 cursor-pointer hover:text-accent transition-colors duration-200"
                >
                  <input
                    type="radio"
                    name="sort"
                    value={option.value}
                    checked={sortBy === option.value}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="w-4 h-4 text-accent bg-transparent border-gray-600 focus:ring-accent focus:ring-2"
                  />
                  <span className="text-text-secondary">{option.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
