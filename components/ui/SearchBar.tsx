'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  suggestions?: string[];
  recentSearches?: string[];
  onSearch?: (query: string) => void;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search bounties...",
  suggestions = [],
  recentSearches = [],
  onSearch,
  className = ''
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(value.toLowerCase()) && suggestion !== value
  ).slice(0, 5);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setShowSuggestions(newValue.length > 0 || recentSearches.length > 0);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
    onSearch?.(suggestion);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch?.(value);
      setShowSuggestions(false);
      inputRef.current?.blur();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const handleClear = () => {
    onChange('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className="relative group">
        <Search className={`
          absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200
          ${isFocused ? 'text-accent' : 'text-text-secondary'}
        `} />
        
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => {
            setIsFocused(true);
            setShowSuggestions(value.length > 0 || recentSearches.length > 0);
          }}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`
            w-full pl-12 pr-12 py-4 glass-card rounded-lg text-text-primary placeholder-text-secondary 
            focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent 
            transition-all duration-300 hover:bg-opacity-90
            ${isFocused ? 'bg-opacity-100' : ''}
          `}
          aria-label="Search"
          aria-expanded={showSuggestions}
          aria-haspopup="listbox"
        />
        
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-surface rounded-full transition-colors duration-200"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-text-secondary" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (filteredSuggestions.length > 0 || recentSearches.length > 0) && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 glass-card border border-gray-700 border-opacity-50 rounded-lg shadow-glow z-50 max-h-64 overflow-y-auto"
          role="listbox"
        >
          {/* Recent Searches */}
          {recentSearches.length > 0 && value.length === 0 && (
            <div className="p-3 border-b border-gray-700 border-opacity-50">
              <div className="flex items-center gap-2 text-text-secondary text-sm mb-2">
                <Clock className="w-4 h-4" />
                <span>Recent searches</span>
              </div>
              {recentSearches.slice(0, 3).map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(search)}
                  className="block w-full text-left px-2 py-1 text-text-primary hover:bg-surface rounded transition-colors duration-200"
                >
                  {search}
                </button>
              ))}
            </div>
          )}

          {/* Suggestions */}
          {filteredSuggestions.length > 0 && (
            <div className="p-3">
              <div className="flex items-center gap-2 text-text-secondary text-sm mb-2">
                <TrendingUp className="w-4 h-4" />
                <span>Suggestions</span>
              </div>
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="block w-full text-left px-2 py-1 text-text-primary hover:bg-surface rounded transition-colors duration-200"
                  role="option"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
