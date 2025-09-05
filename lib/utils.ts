import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatEther(amount: string): string {
  const num = parseFloat(amount);
  return `${num.toFixed(2)} ETH`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'beginner': return 'text-green-400';
    case 'intermediate': return 'text-yellow-400';
    case 'advanced': return 'text-orange-400';
    case 'expert': return 'text-red-400';
    default: return 'text-gray-400';
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'active': return 'status-active';
    case 'completed': return 'status-completed';
    case 'awaiting_review': return 'status-awaiting';
    default: return 'bg-gray-500 bg-opacity-20 text-gray-400';
  }
}

export function calculateMatchScore(userSkills: string[], requiredSkills: string[]): number {
  if (requiredSkills.length === 0) return 0;
  
  const matchingSkills = userSkills.filter(skill => 
    requiredSkills.includes(skill)
  );
  
  return Math.round((matchingSkills.length / requiredSkills.length) * 100);
}

export function generateMockEscrowAddress(): string {
  return `0x${Math.random().toString(16).substr(2, 40)}`;
}
