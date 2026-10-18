import React from 'react';
import { cn } from '../../lib/utils';

export interface SectionHeadingProps {
  badge?: string;
  badgeUrdu?: string;
  title: string;
  titleUrdu?: string;
  description?: string;
  descriptionUrdu?: string;
  align?: 'left' | 'center';
  action?: React.ReactNode;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  badgeUrdu,
  title,
  titleUrdu,
  description,
  descriptionUrdu,
  align = 'left',
  action,
  className,
}) => {
  return (
    <div
      className={cn(
        'mb-8 sm:mb-12',
        align === 'center' ? 'text-center max-w-3xl mx-auto' : 'flex flex-col md:flex-row md:items-end md:justify-between gap-4',
        className
      )}
    >
      <div className={cn(align === 'center' ? 'w-full' : 'max-w-2xl')}>
        {(badge || badgeUrdu) && (
          <div className={cn('inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-3 bg-brand-blue-50 text-brand-blue border border-brand-blue-100', align === 'center' && 'mx-auto')}>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            <span>{badge}</span>
            {badgeUrdu && <span className="font-arabic font-normal text-xs text-brand-blue-600">({badgeUrdu})</span>}
          </div>
        )}

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
          {title}
        </h2>
        {titleUrdu && (
          <div className="font-arabic text-lg sm:text-xl font-semibold text-brand-lime mt-1">
            {titleUrdu}
          </div>
        )}

        {(description || descriptionUrdu) && (
          <p className="mt-3 text-white/80 text-sm sm:text-base leading-relaxed font-medium">
            {description}
            {descriptionUrdu && (
              <span className="block mt-1 font-arabic text-white/60 text-sm">
                {descriptionUrdu}
              </span>
            )}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};
