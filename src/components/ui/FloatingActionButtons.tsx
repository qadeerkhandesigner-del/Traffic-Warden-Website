import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, TrafficCone } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export const FloatingActionButtons: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  const advisoryLabel = language === 'ur' ? 'گلیات ٹریول ایڈوائزری' : 'Galiyat Travel Advisory';

  return (
    // `bottom-20` on mobile keeps this group clear of the scroll-to-top button
    // (which sits at `bottom-6`), so both stay clickable.
    <div
      className={`fixed bottom-20 sm:bottom-24 ${isRTL ? 'left-4 sm:left-6' : 'right-4 sm:right-6'} z-50 flex flex-col items-end gap-3 pb-safe sm:gap-4`}
    >
      {/* Galiyat Travel Advisory Button — links to the travel advisory page.
          Text stays hidden and expands on hover / keyboard focus. */}
      <Link
        to="/tourism/galiyat-travel-advisory"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        aria-label={advisoryLabel}
        title={advisoryLabel}
        className={`flex items-center rounded-full shadow-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime ${
          isHovered ? 'gap-2.5 bg-brand-blue py-1.5 ps-4 pe-2 sm:gap-3 sm:py-2' : 'gap-0 bg-brand-blue/0 p-1.5'
        }`}
      >
        <span
          className={`whitespace-nowrap text-[11px] font-bold text-white transition-all duration-300 sm:text-sm ${
            isHovered ? 'max-w-[14rem] opacity-100' : 'max-w-0 overflow-hidden opacity-0'
          }`}
        >
          {advisoryLabel}
        </span>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-lime shadow-md transition-transform duration-300 sm:h-12 sm:w-12">
          <TrafficCone className="h-5 w-5 text-brand-dark" aria-hidden="true" />
        </span>
      </Link>

      {/* Emergency Call Button */}
      <a
        href="tel:1915"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-all duration-200 hover:bg-red-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500/50 animate-pulse"
        aria-label="Call Traffic Helpline 1915"
        title={language === 'ur' ? 'ایمرجنسی کال 1915' : 'Emergency Call 1915'}
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
      </a>
    </div>
  );
};

export default FloatingActionButtons;
