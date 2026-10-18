import React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
  highlightAccent?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverEffect = false,
  highlightAccent = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-slate-200 shadow-gov overflow-hidden transition-all duration-200',
        hoverEffect && 'hover:shadow-gov-md hover:border-slate-300 hover:-translate-y-0.5',
        highlightAccent && 'border-t-4 border-t-brand-blue',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('p-5 border-b border-slate-100', className)} {...props}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('p-5 sm:p-6', className)} {...props}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
