'use client';

import { ReactNode, useEffect, useState } from 'react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  prefix?: string;
  suffix?: string;
  gradient?: 'blue' | 'green' | 'purple' | 'orange' | 'pink';
  animated?: boolean;
}

export default function StatsCard({
  title,
  value,
  icon,
  trend,
  prefix = '',
  suffix = '',
  gradient = 'blue',
  animated = true
}: StatsCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (animated) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          current = value;
          clearInterval(timer);
        }
        setDisplayValue(Math.floor(current));
      }, duration / steps);

      return () => clearInterval(timer);
    } else {
      setDisplayValue(value);
    }
  }, [value, animated]);

  const gradients = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-emerald-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-red-500',
    pink: 'from-pink-500 to-rose-500'
  };

  return (
    <div className="relative group">
      {/* Animated background glow */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradients[gradient]} rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse`}></div>
      
      <div className="relative bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-zinc-800 hover:shadow-2xl transition-all duration-300">
        {/* Header with icon */}
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-r ${gradients[gradient]} shadow-lg`}>
            <div className="text-white">
              {icon}
            </div>
          </div>
          
          {trend && (
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
              trend.isPositive 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
            }`}>
              <svg 
                className={`w-3 h-3 ${trend.isPositive ? 'rotate-0' : 'rotate-180'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>

        {/* Value */}
        <div className="mb-2">
          <div className="text-3xl font-bold text-gray-900 dark:text-zinc-100 tracking-tight">
            {prefix}{displayValue.toLocaleString()}{suffix}
          </div>
        </div>

        {/* Title */}
        <div className="text-sm font-medium text-gray-600 dark:text-zinc-400">
          {title}
        </div>

        {/* Decorative element */}
        <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${gradients[gradient]} opacity-5 rounded-full -mr-10 -mt-10`}></div>
      </div>
    </div>
  );
} 