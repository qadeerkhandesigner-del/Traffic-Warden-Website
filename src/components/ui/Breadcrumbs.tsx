import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import type { BreadcrumbItem } from '../../types';

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  const { language, isRTL } = useLanguage();

  return (
    <nav aria-label="Breadcrumb" className={`py-3 text-sm text-slate-500 ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1 hover:text-brand-blue transition-colors font-medium"
            title="Home"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only sm:not-sr-only">
              {language === 'ur' ? 'صفحۂ اول' : 'Home'}
            </span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const label = language === 'ur' && item.labelUrdu ? item.labelUrdu : item.label;

          return (
            <li key={index} className="inline-flex items-center gap-1.5 sm:gap-2">
              <ChevronRight
                className={`w-3.5 h-3.5 text-slate-400 shrink-0 ${isRTL ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
              {isLast || !item.path ? (
                <span
                  className="font-semibold text-brand-dark max-w-[200px] sm:max-w-none truncate"
                  aria-current="page"
                >
                  {label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="hover:text-brand-blue transition-colors font-medium max-w-[150px] sm:max-w-none truncate"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
