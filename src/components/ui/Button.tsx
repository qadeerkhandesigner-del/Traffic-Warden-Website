import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'emergency';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  /** When provided, renders a real <a> instead of a <button> — a <button>
      nested inside an <a> is invalid HTML that Firefox refuses to navigate. */
  href?: string;
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  href,
  target,
  rel,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none';

  const variants = {
    // Primary Government Blue
    primary:
      'bg-brand-blue text-white hover:bg-brand-blue-600 active:bg-brand-blue-700 focus-visible:ring-brand-blue shadow-sm',
    // Secondary Slate
    secondary:
      'bg-white text-brand-dark hover:bg-slate-100 active:bg-slate-200 border border-slate-200 focus-visible:ring-brand-blue shadow-sm',
    // Carefully used Accent Lime (for high-priority CTA)
    accent:
      'bg-brand-lime text-brand-dark font-semibold hover:bg-brand-lime-hover active:bg-brand-lime-600 focus-visible:ring-brand-lime shadow-sm',
    // Clean Border Outline
    outline:
      'border-2 border-brand-blue text-brand-blue hover:bg-brand-blue-50 active:bg-brand-blue-100 focus-visible:ring-brand-blue',
    // Ghost / Subdued
    ghost:
      'text-slate-700 hover:bg-slate-100 active:bg-slate-200 focus-visible:ring-slate-400',
    // Emergency Action CTA
    emergency:
      'bg-red-600 text-white font-semibold hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-500 shadow-sm',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5',
  };

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' && !rel ? 'noopener noreferrer' : rel}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          disabled && 'opacity-50 pointer-events-none',
          className
        )}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </a>
    );
  }

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </button>
  );
};
