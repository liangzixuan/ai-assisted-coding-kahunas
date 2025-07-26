'use client';

import { InputHTMLAttributes, forwardRef, useState, useEffect } from 'react';

interface ModernInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  variant?: 'default' | 'floating' | 'glass';
  icon?: React.ReactNode;
}

const ModernInput = forwardRef<HTMLInputElement, ModernInputProps>(({
  label,
  error,
  success,
  variant = 'default',
  icon,
  className = '',
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  useEffect(() => {
    // Check if there's an initial value
    const initialValue = props.value || props.defaultValue;
    setHasValue(!!initialValue && String(initialValue).length > 0);
  }, [props.value, props.defaultValue]);

  // Determine if label should be "up" (small and at top)
  const isLabelUp = variant === 'floating' && (isFocused || hasValue);

  const baseClasses = "w-full transition-all duration-300 rounded-xl border-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    default: `px-4 py-3 ${
      error 
        ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/20' 
        : success
        ? 'border-green-300 focus:border-green-500 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/20'
        : 'border-gray-200 dark:border-zinc-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20'
    } bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 placeholder-gray-500 dark:placeholder-zinc-400`,
    
    floating: `${icon ? 'pl-10' : 'px-4'} pr-4 ${isLabelUp ? 'pt-7 pb-2' : 'py-4'} ${
      error 
        ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/20' 
        : 'border-white/30 focus:border-white/50 focus:ring-4 focus:ring-white/20'
    } bg-white/10 dark:bg-zinc-800/50 backdrop-blur-sm text-white ${isLabelUp ? '' : 'placeholder-transparent'}`,
    
    glass: `px-4 py-3 bg-white/20 dark:bg-zinc-800/20 backdrop-blur-xl border-white/30 dark:border-zinc-700/30 text-gray-900 dark:text-zinc-100 placeholder-gray-600 dark:placeholder-zinc-400 focus:border-white/50 focus:bg-white/30 focus:ring-4 focus:ring-white/20`
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHasValue(value.length > 0);
    props.onChange?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  return (
    <div className="relative">
      {variant !== 'floating' && label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-zinc-500 z-10">
            {icon}
          </div>
        )}
        
        <input
          ref={ref}
          className={`${baseClasses} ${variants[variant]} ${className}`}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder={variant === 'floating' && !isLabelUp ? '' : props.placeholder}
          {...props}
        />
        
        {variant === 'floating' && label && (
          <label
            className={`absolute transition-all duration-300 pointer-events-none select-none ${
              isLabelUp
                ? `${icon ? 'left-10' : 'left-4'} top-2 text-xs font-medium text-white/90`
                : `${icon ? 'left-10' : 'left-4'} top-1/2 transform -translate-y-1/2 text-base text-white/60`
            }`}
          >
            {label}
          </label>
        )}
      </div>
      
      {error && (
        <div className="mt-2 flex items-center text-red-600 dark:text-red-400 text-sm">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}
      
      {success && (
        <div className="mt-2 flex items-center text-green-600 dark:text-green-400 text-sm">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {success}
        </div>
      )}
    </div>
  );
});

ModernInput.displayName = 'ModernInput';

export default ModernInput; 