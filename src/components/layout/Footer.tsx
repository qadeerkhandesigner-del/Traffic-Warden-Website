import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, ArrowUpRight, PhoneCall } from 'lucide-react';
import { PageContainer } from './PageContainer';
import { NAVIGATION_ITEMS, EMERGENCY_CONTACTS, PORTAL_METADATA } from '../../data/navigation';
import { useLanguage } from '../../hooks/useLanguage';
import logoImg from '/Traffic-Logo-Updated.png';

export const Footer: React.FC = () => {
  const { language } = useLanguage();

  return (
    <footer className="bg-[#000080] text-white border-t border-[#0000aa]">
      {/* Main Footer Grid */}
      <div className="py-12">
        <PageContainer>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Column 1: Identity with Official Logo */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={logoImg}
                  alt="Traffic Warden Abbottabad Crest"
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <h3 className="text-white font-bold text-base leading-tight flex items-center gap-2 flex-wrap">
                    {language === 'ur'
                      ? PORTAL_METADATA.departmentNameUr
                      : PORTAL_METADATA.departmentNameEn}
                    <span className="text-[11px] font-normal text-white/80">
                      {language === 'ur'
                        ? PORTAL_METADATA.subHeadingUr
                        : PORTAL_METADATA.subHeadingEn}
                    </span>
                  </h3>
                </div>
              </div>

              <p className="text-xs text-white leading-relaxed">
                {language === 'ur'
                  ? 'ٹریفک وارڈن ایبٹ آباد شہریوں کے محفوظ سفر، ٹریفک کی روانی اور ٹریفک قوانین کے نفاذ کے لیے ہمہ وقت کوشاں ہے۔'
                  : 'Traffic Warden Abbottabad is dedicated to ensuring road discipline, tourist facilitation, and transparent citizen licensing services.'}
              </p>
            </div>

            {/* Column 2: Navigation Links */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4 border-l-2 border-brand-lime pl-2.5">
                {language === 'ur' ? 'اہم روابط' : 'Quick Navigation'}
              </h4>
              <ul className="space-y-2 text-xs">
                {NAVIGATION_ITEMS.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={item.path}
                      className="text-white hover:text-brand-lime hover:underline transition-colors flex items-center gap-1"
                    >
                      <ArrowUpRight className="w-3 h-3 text-white/70" />
                      <span>{language === 'ur' ? item.labelUrdu : item.label}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href="https://www.abbottabadpolice.kp.gov.pk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-brand-lime hover:underline transition-colors flex items-center gap-1"
                  >
                    <ArrowUpRight className="w-3 h-3 text-white/70" />
                    <span>{language === 'ur' ? 'ایبٹ آباد پولیس' : 'Abbottabad Police'}</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Emergency Contacts */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4 border-l-2 border-brand-lime pl-2.5">
                {language === 'ur' ? 'ہنگامی ہیلپ لائنز' : 'Emergency Contacts'}
              </h4>
              <ul className="space-y-3 text-xs">
                {EMERGENCY_CONTACTS.map((contact) => (
                  <li key={contact.id} className="border-b border-white/20 pb-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white">
                        {language === 'ur' ? contact.titleUrdu : contact.title}
                      </span>
                      <a
                        href={`tel:${contact.number}`}
                        className="text-brand-lime font-bold hover:underline"
                      >
                        {contact.number}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Headquarters Location */}
            <div className="space-y-3 text-xs">
              <h4 className="text-white font-semibold text-sm mb-4 border-l-2 border-brand-lime pl-2.5">
                {language === 'ur' ? 'دفتر و ہیڈکوارٹر' : 'Headquarters'}
              </h4>
              <div className="flex items-start gap-2.5 text-white">
                <MapPin className="w-4 h-4 text-brand-lime shrink-0 mt-0.5" />
                <span>
                  {language === 'ur'
                    ? 'ڈسٹرکٹ پولیس لائن ایبٹ آباد کے سامنے، خیبر پختونخوا'
                    : 'Opposite District Police Line Abbottabad, Khyber Pakhtunkhwa, Pakistan'}
                </span>
              </div>

              <div className="flex items-center gap-2.5 text-white">
                <Mail className="w-4 h-4 text-brand-lime shrink-0" />
                <span>trafficwardenatd@gmail.com</span>
              </div>

              <div className="mt-4 text-[11px] text-white leading-relaxed">
                {language === 'ur'
                  ? 'سرکاری معلوماتی پورٹل برائے رہنمائی شہری۔ ایمرجنسی میں 1915 پر کال کریں۔'
                  : 'Official Citizen Guidance Portal. For immediate on-road traffic assistance, dial 1915.'}
              </div>

<div className="mt-3 flex items-center gap-1.5">
                <a
                  href="https://www.facebook.com/TrafficWardenAbbottabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#1877F2] hover:text-white transition-all duration-300 flex items-center justify-center"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#E4405F] hover:text-white transition-all duration-300 flex items-center justify-center"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center"
                  aria-label="X"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 9.24-3.308.54-8.502-9.24-8.502 9.24-3.308-.54 7.227-8.26-7.227-8.26h3.308l7.227 8.26-8.502-9.24 3.308-.54 8.502 9.24 8.502-9.24z" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#FF0000] hover:text-white transition-all duration-300 flex items-center justify-center"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>

              <div className="mt-2 text-[9px] text-white/60 leading-relaxed text-center">
                {language === 'ur'
                  ? 'ڈیزائن اینڈ ڈویلپمنٹ قدیر خان آئی ٹی سیل ایبٹ آباد پولیس'
                  : 'Design & Develop by Qadeer khan IT Cell Abbottabad Police'}
              </div>
            </div>
          </div>
        </PageContainer>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#0000aa]/60 py-4 bg-[#00006a] text-white text-[11px]">
        <PageContainer>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
            <div>
              &copy; {new Date().getFullYear()} Traffic Warden Abbottabad, Khyber Pakhtunkhwa Police. All rights reserved.
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 shrink-0 text-brand-lime" aria-hidden="true" />
              <span>
                {language === 'ur'
                  ? 'گاڑی سے متعلق معاونت کے لیے '
                  : 'For vehicle-related assistance, call '}
                <a
                  href="tel:1915"
                  className="font-bold text-brand-lime underline-offset-2 hover:underline focus:outline-none focus-visible:underline"
                >
                  1915
                </a>
              </span>
            </div>
            <div className="text-white">
              {language === 'ur'
                ? 'حکومت خیبر پختونخوا — پولیس سروس'
                : 'Government of Khyber Pakhtunkhwa — Police Service'}
            </div>
          </div>
        </PageContainer>
      </div>
    </footer>
  );
};