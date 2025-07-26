'use client';

import { ReactNode } from 'react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  primaryAction: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  backgroundImage?: string;
  children?: ReactNode;
}

export default function HeroSection({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  backgroundImage,
  children
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-pulse animation-delay-4000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-200 dark:bg-pink-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="space-y-8">
          {/* Subtitle */}
          <div className="inline-flex items-center px-4 py-2 bg-white/10 dark:bg-zinc-800/10 backdrop-blur-xl rounded-full border border-white/20 dark:border-zinc-700/20">
            <span className="text-sm font-medium text-gray-600 dark:text-zinc-400">
              {subtitle}
            </span>
          </div>

          {/* Main title */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight">
            <span className="block text-gray-900 dark:text-zinc-100 mb-4">
              {title.split(' ').slice(0, -2).join(' ')}
            </span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
              {title.split(' ').slice(-2).join(' ')}
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-zinc-400 max-w-4xl mx-auto leading-relaxed">
            {description}
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <button
              onClick={primaryAction.onClick}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300/50"
            >
              <span className="relative z-10">{primaryAction.label}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </button>

            {secondaryAction && (
              <button
                onClick={secondaryAction.onClick}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-700 dark:text-zinc-300 transition-all duration-300 bg-white/10 dark:bg-zinc-800/10 backdrop-blur-xl border border-white/20 dark:border-zinc-700/20 rounded-2xl hover:bg-white/20 dark:hover:bg-zinc-800/20 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-300/50"
              >
                {secondaryAction.label}
              </button>
            )}
          </div>

          {/* Additional content */}
          {children && (
            <div className="pt-12">
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-2 text-gray-400 dark:text-zinc-500 animate-bounce">
          <span className="text-sm">Scroll to explore</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
} 