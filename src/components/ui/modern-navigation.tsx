'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface NavigationItem {
  href: string;
  label: string;
  icon: ReactNode;
  isActive?: boolean;
}

interface ModernNavigationProps {
  items: NavigationItem[];
  className?: string;
}

export default function ModernNavigation({ items, className = '' }: ModernNavigationProps) {
  const pathname = usePathname();

  return (
    <nav className={`bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-gray-200/20 dark:border-zinc-700/20 sticky top-0 z-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex space-x-1">
          {items.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center space-x-2 px-4 py-4 rounded-xl transition-all duration-300 group ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-200'
                }`}
              >
                {/* Active indicator background */}
                {isActive && (
                  <div className="absolute inset-0 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800"></div>
                )}
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gray-50 dark:bg-zinc-800 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative flex items-center space-x-2">
                  <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                    {item.icon}
                  </div>
                  <span className="font-medium">{item.label}</span>
                </div>

                {/* Active indicator line */}
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
} 