'use client';

import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ModernButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'gradient' | 'glass' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  icon?: ReactNode;
}

export default function ModernButton({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  className = '',
  disabled,
  ...props
}: ModernButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl focus:ring-blue-300",
    secondary: "bg-gray-100 dark:bg-zinc-700 text-gray-900 dark:text-zinc-100 hover:bg-gray-200 dark:hover:bg-zinc-600 shadow-md hover:shadow-lg",
    gradient: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white hover:scale-105 shadow-xl hover:shadow-2xl focus:ring-pink-300",
    glass: "bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 shadow-xl",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-lg focus:ring-blue-300"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl"
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          {icon && <span>{icon}</span>}
          <span>{children}</span>
        </div>
      )}
    </button>
  );
} 