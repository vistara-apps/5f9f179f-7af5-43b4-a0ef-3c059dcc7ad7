'use client';

import { cn } from '@/lib/utils';

interface SkillTagProps {
  skill: string;
  variant?: 'default' | 'selected' | 'required';
  onClick?: () => void;
  className?: string;
}

export function SkillTag({ 
  skill, 
  variant = 'default', 
  onClick, 
  className 
}: SkillTagProps) {
  const baseClasses = 'skill-tag cursor-pointer';
  
  const variantClasses = {
    default: 'hover:bg-primary hover:bg-opacity-30',
    selected: 'bg-accent bg-opacity-30 text-accent border-accent',
    required: 'bg-red-500 bg-opacity-20 text-red-400 border-red-500 border-opacity-30',
  };

  return (
    <span
      className={cn(baseClasses, variantClasses[variant], className)}
      onClick={onClick}
    >
      {skill}
    </span>
  );
}
