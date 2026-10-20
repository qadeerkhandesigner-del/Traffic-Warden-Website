import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  X,
  Phone,
  ChevronRight,
  Plus,
  Minus,
  ShieldCheck,
  MessageSquareQuote,
  Users,
  Award,
  Compass,
  Network,
  CheckCircle2,
  Home,
  Info,
  Settings,
  FileText,
  Mail,
  IdCard,
  GraduationCap,
  Flag,
  Building,
  Radio,
  Smartphone,
  Car,
  Shield,
  MapPin,
  Newspaper,
  Cpu,
  HardHat,
  Van,
  CloudSun,
  MessageSquareWarning,
  TrafficCone,
  Utensils,
  Snowflake,
  LocateFixed,
  Map as MapIcon,
} from 'lucide-react';
import { NAVIGATION_ITEMS, EMERGENCY_CONTACTS, PORTAL_METADATA } from '../../data/navigation';
import { useLanguage } from '../../hooks/useLanguage';
import { LanguageToggle } from '../ui/LanguageToggle';
import { cn } from '../../lib/utils';
import type { NavigationChildItem } from '../../types';
import logoImg from '/Traffic-Logo-Updated.png';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { language, isRTL } = useLanguage();
  const location = useLocation();
  const [aboutAccordionOpen, setAboutAccordionOpen] = useState(
    location.pathname.startsWith('/about')
  );
  const [servicesAccordionOpen, setServicesAccordionOpen] = useState(
    location.pathname.startsWith('/services')
  );
  const [initiativesAccordionOpen, setInitiativesAccordionOpen] = useState(
    location.pathname.startsWith('/initiatives')
  );
  const [educationAccordionOpen, setEducationAccordionOpen] = useState(
    location.pathname.startsWith('/traffic-education')
  );
  const [tourismAccordionOpen, setTourismAccordionOpen] = useState(
    location.pathname.startsWith('/tourism') || location.pathname.startsWith('/weather')
  );

  const renderItemIcon = (iconName?: string, isActive = false) => {
    const iconClass = `w-5 h-5 shrink-0 ${isActive ? 'text-brand-dark' : 'text-brand-lime'}`;
    switch (iconName) {
      case 'Home':
        return <Home className={iconClass} />;
      case 'Info':
        return <Info className={iconClass} />;
      case 'Settings':
        return <Settings className={iconClass} />;
      case 'ShieldCheck':
        return <ShieldCheck className={iconClass} />;
      case 'FileText':
        return <FileText className={iconClass} />;
      case 'Mail':
        return <Mail className={iconClass} />;
      case 'MessageSquareQuote':
        return <MessageSquareQuote className={iconClass} />;
      case 'Users':
        return <Users className={iconClass} />;
      case 'Award':
        return <Award className={iconClass} />;
      case 'Compass':
        return <Compass className={iconClass} />;
      case 'Network':
        return <Network className={iconClass} />;
      case 'CheckCircle2':
        return <CheckCircle2 className={iconClass} />;
      case 'IdCard':
        return <IdCard className={iconClass} />;
      case 'GraduationCap':
        return <GraduationCap className={iconClass} />;
      case 'Flag':
        return <Flag className={iconClass} />;
      case 'Building':
        return <Building className={iconClass} />;
      case 'Radio':
        return <Radio className={iconClass} />;
      case 'Smartphone':
        return <Smartphone className={iconClass} />;
      case 'Car':
        return <Car className={iconClass} />;
      case 'Shield':
        return <Shield className={iconClass} />;
      case 'MapPin':
        return <MapPin className={iconClass} />;
      case 'Newspaper':
        return <Newspaper className={iconClass} />;
      case 'Cpu':
        return <Cpu className={iconClass} />;
      case 'HardHat':
        return <HardHat className={iconClass} />;
      case 'Van':
        return <Van className={iconClass} />;
      case 'CloudSun':
        return <CloudSun className={iconClass} />;
      case 'MessageSquareWarning':
        return <MessageSquareWarning className={iconClass} />;
      case 'Phone':
        return <Phone className={iconClass} />;
      case 'TrafficCone':
        return <TrafficCone className={iconClass} />;
      case 'Utensils':
        return <Utensils className={iconClass} />;
      case 'Snowflake':
        return <Snowflake className={iconClass} />;
      case 'Map':
        return <MapIcon className={iconClass} />;
      case 'LocateFixed':
        return <LocateFixed className={iconClass} />;
      default:
        return <Home className={iconClass} />;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 xl:hidden" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#000066]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed inset-y-0 w-full max-w-sm bg-[#000066] text-white shadow-2xl flex flex-col z-50 overflow-y-auto transition-transform duration-300 ease-in-out border-l border-[#000088]',
          isRTL ? 'left-0' : 'right-0'
        )}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#000088] bg-[#000077]">
          <div className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="Traffic Warden Abbottabad Crest"
              className="w-10 h-10 object-contain"
            />
            <div>
              <div className="text-base font-extrabold leading-tight text-white font-poppins">
                {language === 'ur' ? PORTAL_METADATA.departmentNameUr : PORTAL_METADATA.departmentNameEn}
              </div>
              <div className="text-[11px] text-brand-dark-muted font-medium leading-tight mt-0">
                {language === 'ur' ? PORTAL_METADATA.subHeadingUr : PORTAL_METADATA.subHeadingEn}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <LanguageToggle variant="badge" />
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime"
              aria-label={language === 'ur' ? 'نیویگیشن مینو بند کریں' : 'Close navigation menu'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1.5" aria-label="Mobile Menu Links">
          {NAVIGATION_ITEMS.map((item) => {
            const label = language === 'ur' ? item.labelUrdu : item.label;
            const isActive = location.pathname === item.path || 
              (item.id === 'about' && location.pathname.startsWith('/about')) ||
              (item.id === 'services' && location.pathname.startsWith('/services')) ||
              (item.id === 'initiatives' && location.pathname.startsWith('/initiatives')) ||
              (item.id === 'traffic-education' && location.pathname.startsWith('/traffic-education')) ||
              (item.id === 'tourism' && (location.pathname.startsWith('/tourism') || location.pathname.startsWith('/weather')));

            // Accordion Items for About Us, Services, Initiatives and Education
            if (item.children && item.children.length > 0) {
              const isAbout = item.id === 'about';
              const isServices = item.id === 'services';
              const isInitiatives = item.id === 'initiatives';
              const isEducation = item.id === 'education';
              const accordionOpen = isAbout ? aboutAccordionOpen : isServices ? servicesAccordionOpen : isInitiatives ? initiativesAccordionOpen : isEducation ? educationAccordionOpen : tourismAccordionOpen;
              const setAccordionOpen = isAbout ? setAboutAccordionOpen : isServices ? setServicesAccordionOpen : isInitiatives ? setInitiativesAccordionOpen : isEducation ? setEducationAccordionOpen : setTourismAccordionOpen;

              return (
                <div key={item.id} className="rounded-xl overflow-hidden bg-[#000077]/60 border border-[#000088]/80">
                  <button
                    type="button"
                    onClick={() => setAccordionOpen((prev) => !prev)}
                    className={cn(
                      'w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors text-left',
                      isActive ? 'text-brand-lime font-bold' : 'text-white/80 hover:text-white',
                      language === 'ur' && 'font-arabic text-base'
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {renderItemIcon(item.iconName)}
                      <span>{label}</span>
                      <span className="text-[10px] font-bold text-brand-lime bg-brand-lime/10 px-1.5 py-0.5 rounded border border-brand-lime/30">
                        {item.children.length}
                      </span>
                    </span>
                    <span className="p-1 rounded bg-[#000077] text-white/60">
                      {accordionOpen ? (
                        <Minus className="w-3.5 h-3.5 text-brand-lime" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-white/60" />
                      )}
                    </span>
                  </button>

                  {/* Accordion Submenu */}
                  {accordionOpen && (
                    <div className="bg-[#000077]/50 p-2 space-y-1 border-t border-[#000088]">
                      {item.children.map((subItem: NavigationChildItem) => {
                        const subLabel = language === 'ur' ? subItem.labelUrdu : subItem.label;
                        const isSubActive =
                          subItem.path === '/about'
                            ? location.pathname === '/about'
                            : subItem.path === '/services'
                            ? location.pathname === '/services'
                            : subItem.path === '/initiatives'
                            ? location.pathname === '/initiatives'
                            : subItem.path === '/traffic-education'
                            ? location.pathname === '/traffic-education'
                            : subItem.path === '/weather'
                            ? (location.pathname === '/weather' || location.pathname === '/weather-updates' || location.pathname === '/tourism/weather-updates')
                            : location.pathname === subItem.path;

                        return (
                          <NavLink
                            key={subItem.id}
                            to={subItem.path}
                            onClick={onClose}
                            className={cn(
                              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                              isSubActive
                                ? 'bg-brand-lime text-brand-dark font-bold'
                                : 'text-white/80 hover:bg-brand-lime/20 hover:text-brand-lime',
                              language === 'ur' && 'font-arabic text-sm'
                            )}
                          >
                            <span className="shrink-0">{renderItemIcon(subItem.iconName, isSubActive)}</span>
                            <span className="flex-1 truncate">{subLabel}</span>
                            <ChevronRight
                              className={cn(
                                'w-3.5 h-3.5 opacity-60',
                                isRTL ? 'rotate-180' : ''
                              )}
                            />
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            // Normal Navigation Links
            return (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={onClose}
                end={item.path === '/'}
                className={({ isActive: isLinkActive }) =>
                  cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                    isLinkActive
                      ? 'bg-brand-lime text-brand-dark font-bold'
                      : 'text-white/80 hover:bg-brand-lime/20 hover:text-brand-lime',
                    language === 'ur' && 'font-arabic text-base'
                  )
                }
              >
                {renderItemIcon(item.iconName)}
                <span className="flex-1">{label}</span>
                <ChevronRight
                  className={cn(
                    'w-4 h-4 opacity-60',
                    isRTL ? 'rotate-180 text-brand-lime' : 'text-white/60'
                  )}
                />
              </NavLink>
            );
          })}
        </nav>

        {/* Emergency Quick Access */}
        <div className="p-4 bg-[#000077] border-t border-[#000088] space-y-3">
          <div className="text-xs font-semibold text-brand-dark-muted uppercase tracking-wider">
            {language === 'ur' ? 'ایمرجنسی و فوری رابطہ' : 'Emergency & Assistance'}
          </div>

          <a
            href={`tel:${EMERGENCY_CONTACTS[0].number}`}
            className="flex items-center justify-between p-3.5 rounded-xl bg-brand-lime text-brand-dark hover:bg-brand-lime-hover transition-colors font-bold"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-dark text-brand-lime flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 animate-bounce" />
              </div>
              <div>
                <div className="text-[11px] opacity-80 uppercase tracking-wide">
                  {language === 'ur' ? 'ٹریفک ہیلپ لائن' : 'Traffic Helpline'}
                </div>
                <div className="text-lg font-black tracking-wider leading-none">
                  {EMERGENCY_CONTACTS[0].number}
                </div>
              </div>
            </div>
            <span className="text-xs bg-brand-dark text-white px-2.5 py-1 rounded-full font-semibold">
              24/7 Free
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
