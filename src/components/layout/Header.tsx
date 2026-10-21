import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Phone } from 'lucide-react';
import { Navbar } from '../navigation/Navbar';
import { MobileMenu } from '../navigation/MobileMenu';
import { LanguageToggle } from '../ui/LanguageToggle';
import { PageContainer } from './PageContainer';
import { useLanguage } from '../../hooks/useLanguage';
import { EMERGENCY_CONTACTS, PORTAL_METADATA } from '../../data/navigation';
import logoImg from '/Traffic-Logo-Updated.png';
import { cn } from '../../lib/utils';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-[#000066] transition-all text-white">
      {/* Brand Header - 3 Column Grid */}
      <div className="bg-[#000066] border-b border-[#000088]">
        <PageContainer>
          <div className="flex items-center justify-between gap-4 py-3 sm:py-4">
            {/* Left: Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime rounded-lg"
              aria-label={language === 'ur' ? 'ٹریفک وارڈن ایبٹ آباد ہوم پیج' : 'Traffic Warden Abbottabad Homepage'}
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                <div className="absolute inset-0 bg-white rounded-full shadow-lg" />
                <img
                  src={logoImg}
                  alt="Traffic Warden Abbottabad KPK Police Official Crest"
                  className="relative w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(179,250,22,0.3)]"
                />
              </div>
            </Link>

            {/* Center: Title + Tagline */}
            <div className="flex flex-col items-center text-center flex-1 min-w-0 lg:px-4">
              {/* English name is much longer than the Urdu one, so it gets a
                  smaller mobile size; Urdu keeps its original sizing. */}
              <span
                className={cn(
                  'font-extrabold tracking-tight text-white font-poppins leading-none truncate',
                  language === 'ur'
                    ? 'text-base sm:text-xl lg:text-2xl'
                    : 'text-sm sm:text-xl lg:text-2xl'
                )}
              >
                {language === 'ur' ? PORTAL_METADATA.departmentNameUr : PORTAL_METADATA.departmentNameEn}
              </span>
              <span
                className={cn(
                  'text-brand-lime font-medium leading-tight mt-0.5 max-w-md truncate',
                  language === 'ur' ? 'text-[11px] sm:text-sm' : 'text-[10px] sm:text-sm'
                )}
              >
                {language === 'ur' ? PORTAL_METADATA.officialTaglineUr : PORTAL_METADATA.officialTaglineEn}
              </span>
            </div>

            {/* Right: CTA + Mobile Toggle */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Emergency CTA Pill Button - Desktop only */}
              <a
                href={`tel:${EMERGENCY_CONTACTS[0].number}`}
                className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white font-bold text-xs hover:bg-red-700 transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#000066]"
                title={language === 'ur' ? 'ایمرجنسی ہیلپ لائن' : 'Emergency Helpline'}
              >
                <Phone className="w-3.5 h-3.5 animate-bounce" />
                <span>{language === 'ur' ? 'ایمرجنسی 1915' : 'Emergency 1915'}</span>
              </a>

              {/* Language Switch - Desktop */}
              <LanguageToggle variant="badge" className="hidden lg:inline-flex" />

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="xl:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime"
                aria-label={language === 'ur' ? 'نیویگیشن مینو کھولیں' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Accent Divider Line */}
          <div className="h-px bg-gradient-to-r from-transparent via-brand-lime to-transparent" aria-hidden="true" />
        </PageContainer>
      </div>

      {/* Primary Nav Bar */}
      <div className="bg-[#000077] border-b border-[#000088]">
        <PageContainer>
          <Navbar />

          {/* Bottom Accent Divider Line */}
          <div className="h-px bg-gradient-to-r from-transparent via-brand-lime to-transparent" aria-hidden="true" />
        </PageContainer>
      </div>

      {/* Mobile Drawer */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
};
