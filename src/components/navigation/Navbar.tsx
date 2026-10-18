import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  Home,
  Info,
  Settings,
  ShieldCheck,
  FileText,
  Mail,
  MessageSquareQuote,
  Users,
  Award,
  Compass,
  Network,
  IdCard,
  GraduationCap,
  Flag,
  Building,
  Radio,
  Smartphone,
  Car,
  Shield,
  Bike,
  MapPin,
  Newspaper,
  Cpu,
  HardHat,
  Van,
  CloudSun,
  MessageSquareWarning,
  RefreshCw,
  Copy,
  CheckCircle2,
  BookOpen,
  Phone,
  TrafficCone,
  Utensils,
  Snowflake,
  Map as MapIcon,
} from 'lucide-react';
import { NAVIGATION_ITEMS } from '../../data/navigation';
import { useLanguage } from '../../hooks/useLanguage';
import { cn } from '../../lib/utils';
import type { NavigationChildItem } from '../../types';

export const Navbar: React.FC<{ className?: string }> = ({ className }) => {
  const { language, isRTL } = useLanguage();
  const location = useLocation();
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement>>({});
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Helper to render icon by name
  const renderItemIcon = (iconName?: string, isSubmenu = false, isActive = false) => {
    const iconClass = `w-5 h-5 transition-colors shrink-0 ${isSubmenu ? 'group-hover:text-brand-blue-900' : ''} ${isActive ? 'text-brand-dark' : 'text-brand-lime'}`;
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
      case 'Bike':
        return <Bike className={iconClass} />;
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
      case 'BookOpen':
        return <BookOpen className={iconClass} />;
      case 'RefreshCw':
        return <RefreshCw className={iconClass} />;
      case 'Copy':
        return <Copy className={iconClass} />;
      case 'CheckCircle2':
        return <CheckCircle2 className={iconClass} />;
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
      default:
        return <Home className={iconClass} />;
    }
  };

  // Close dropdown on navigation
  useEffect(() => {
    setOpenDropdownId(null);
  }, [location.pathname]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isInsideAnyDropdown = Object.values(dropdownRefs.current).some(
        (ref) => ref && ref.contains(target)
      );
      if (!isInsideAnyDropdown) {
        setOpenDropdownId(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenDropdownId(null);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleMouseEnter = (id: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdownId(id);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdownId(null);
    }, 150);
  };

  // Check if any subroute of /about, /services, /initiatives, /traffic-education or /media-news is active
  const isAboutActive = location.pathname.startsWith('/about');
  const isServicesActive = location.pathname.startsWith('/services') || location.pathname.startsWith('/online-complaint');
  const isInitiativesActive = location.pathname.startsWith('/initiatives');
  const isEducationActive = location.pathname.startsWith('/traffic-education');
  const isTourismActive = location.pathname.startsWith('/tourism') || location.pathname.startsWith('/weather');

  return (
    <nav className={cn('hidden xl:flex items-center justify-center gap-5', className)} aria-label="Main Navigation" role="menubar">
      {NAVIGATION_ITEMS.map((item) => {
        const label = language === 'ur' ? item.labelUrdu : item.label;
        const isDropdownOpen = openDropdownId === item.id;
        const isItemActive = item.id === 'about' ? isAboutActive : item.id === 'services' ? isServicesActive : item.id === 'initiatives' ? isInitiativesActive : item.id === 'education' ? isEducationActive : item.id === 'tourism' ? isTourismActive : location.pathname === item.path;

        // Dropdown item (About Us, Services)
        if (item.children && item.children.length > 0) {
          return (
            <div
              key={item.id}
              ref={(el) => { dropdownRefs.current[item.id] = el!; }}
              className="relative"
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
              role="none"
            >
              <button
                type="button"
                onClick={() => setOpenDropdownId((prev) => (prev === item.id ? null : item.id))}
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
                role="menuitem"
                className={cn(
'flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 whitespace-nowrap text-white hover:text-brand-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark-elevated',
                  isItemActive && 'text-brand-lime',
                  isDropdownOpen && 'text-brand-lime',
                  language === 'ur' && 'font-arabic text-base'
                )}
              >
{renderItemIcon(item.iconName)}
                <span>{label}</span>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 transition-transform duration-200 text-white font-bold',
                    isDropdownOpen ? 'rotate-180' : ''
                  )}
                  aria-hidden="true"
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div
                  className={cn(
                    'absolute top-full mt-2 w-64 bg-[#000090] rounded-xl border border-[#0000aa] shadow-[0_10px_30px_rgba(0,0,0,0.4)] py-2 z-50 text-white animate-in fade-in zoom-in-95 duration-150',
                    isRTL ? 'right-0' : 'left-1/2 -translate-x-1/2'
                  )}
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div className="px-2 py-1 space-y-0.5">
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
                          role="menuitem"
                          className={cn(
                            'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap group',
                            isSubActive
                              ? 'bg-brand-lime text-brand-dark font-semibold'
                              : 'text-white hover:bg-brand-lime hover:text-brand-blue-900'
                          )}
                        >
                          {renderItemIcon(subItem.iconName, true, isSubActive)}
                          <span className="flex-1">{subLabel}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        }

        // Regular link
        return (
          <NavLink
            key={item.id}
            to={item.path}
            end={item.path === '/'}
            role="menuitem"
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 whitespace-nowrap text-white hover:text-brand-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark-elevated',
                isActive && 'text-brand-lime bg-brand-lime/10',
                language === 'ur' && 'font-arabic text-base'
              )
            }
          >
            {renderItemIcon(item.iconName)}
            <span>{label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};
