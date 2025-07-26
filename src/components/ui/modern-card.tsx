'use client';

import { ReactNode } from 'react';

interface ModernCardProps {
  children: ReactNode;
  variant?: 'default' | 'glass' | 'gradient' | 'floating';
  className?: string;
  hover?: boolean;
}

export default function ModernCard({ 
  children, 
  variant = 'default', 
  className = '', 
  hover = true 
}: ModernCardProps) {
  const baseClasses = "rounded-2xl transition-all duration-300";
  
  const variants = {
    default: "bg-white dark:bg-zinc-800 shadow-lg hover:shadow-xl border border-gray-100 dark:border-zinc-700",
    glass: "bg-white/10 dark:bg-zinc-800/10 backdrop-blur-xl border border-white/20 dark:border-zinc-700/20 shadow-2xl",
    gradient: "bg-gradient-to-br from-white to-gray-50 dark:from-zinc-800 dark:to-zinc-900 shadow-xl border border-transparent",
    floating: "bg-white dark:bg-zinc-800 shadow-2xl border border-gray-100 dark:border-zinc-700 transform hover:-translate-y-2"
  };

  const hoverEffects = hover ? "hover:scale-[1.02] hover:shadow-2xl" : "";

  return (
    <div className={`${baseClasses} ${variants[variant]} ${hoverEffects} ${className}`}>
      {children}
    </div>
  );
} 