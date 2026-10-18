import React from 'react';
import { cn } from '../../lib/utils';

export interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide' | 'full';
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className,
  size = 'default',
}) => {
  const sizeStyles = {
    narrow: 'max-w-4xl',
    default: 'max-w-7xl',
    wide: 'max-w-[1440px]',
    full: 'max-w-none',
  };

  return (
    <div
      className={cn(
        'w-full mx-auto px-4 sm:px-6 lg:px-8',
        sizeStyles[size],
        className
      )}
    >
      {children}
    </div>
  );
};
