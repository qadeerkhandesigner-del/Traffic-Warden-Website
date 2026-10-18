import React from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  Phone,
  PhoneCall,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */

const BRANCH_MAP_URL = `https://maps.google.com/?q=${encodeURIComponent(
  'Driving License Branch, Infront of GPO Office, Abbottabad'
)}`;

interface ContactChannel {
  id: string;
  icon: LucideIcon;
  labelEn: string;
  labelUr: string;
  valueEn: string;
  valueUr: string;
  noteEn: string;
  noteUr: string;
  href: string;
  external?: boolean;
}

const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: 'helpline',
    icon: Phone,
    labelEn: 'Helpline',
    labelUr: 'ہیلپ لائن',
    valueEn: '1915',
    valueUr: '1915',
    noteEn: '24/7 Traffic Helpline',
    noteUr: '24/7 ٹریفک ہیلپ لائن',
    href: 'tel:1915',
  },
  {
    id: 'control-room',
    icon: PhoneCall,
    labelEn: 'Control Room',
    labelUr: 'کنٹرول روم',
    valueEn: '0992-921042',
    valueUr: '0992-921042',
    noteEn: 'District Control Room',
    noteUr: 'ضلعی کنٹرول روم',
    href: 'tel:0992-921042',
  },
  {
    id: 'email',
    icon: Mail,
    labelEn: 'Email',
    labelUr: 'ای میل',
    valueEn: 'trafficwardenatd@gmail.com',
    valueUr: 'trafficwardenatd@gmail.com',
    noteEn: 'Official email address',
    noteUr: 'سرکاری ای میل ایڈریس',
    href: 'mailto:trafficwardenatd@gmail.com',
  },
  {
    id: 'address',
    icon: MapPin,
    labelEn: 'License Branch',
    labelUr: 'لائسنس برانچ',
    valueEn: 'Driving License Branch, Infront of GPO Office Near ADC General Office, Abbottabad.',
    valueUr: 'ڈرائیونگ لائسنس برانچ، جی پی او آفس کے سامنے، اے ڈی سی جنرل آفس کے قریب، ایبٹ آباد۔',
    noteEn: 'Open in Google Maps',
    noteUr: 'گوگل میپس میں کھولیں',
    href: BRANCH_MAP_URL,
    external: true,
  },
];

/* -------------------------------------------------------------------------- */
/*                                 COMPONENT                                  */
/* -------------------------------------------------------------------------- */

export interface ContactSectionProps {
  /** Optional extra action buttons/links rendered in the action row. */
  children?: React.ReactNode;
}

/**
 * Shared "Raabta / Get in Touch" section rendered at the bottom of service
 * pages. Provides the standard contact channels of Traffic Warden Abbottabad.
 */
export const ContactSection: React.FC<ContactSectionProps> = ({ children }) => {
  const { t } = useLanguage();

  return (
    <section
      aria-labelledby="contact-section-heading"
      className="relative overflow-hidden rounded-3xl border border-[#0000aa] bg-[#000080] text-white"
    >
      <div className="pointer-events-none absolute inset-0 gov-subtle-pattern opacity-10" aria-hidden="true" />
      <div
        className="pointer-events-none absolute end-0 top-0 h-56 w-56 rounded-full bg-brand-blue/30 blur-3xl sm:h-72 sm:w-72"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 start-0 h-56 w-56 rounded-full bg-brand-lime/10 blur-3xl sm:h-72 sm:w-72"
        aria-hidden="true"
      />

      <div className="relative z-10 space-y-7 p-5 sm:space-y-8 sm:p-8 lg:p-10">
        {/* Heading */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand-lime/30 bg-brand-lime/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-lime sm:text-xs">
            <Send className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{t('Get in Touch', 'رابطہ کریں')}</span>
          </div>

          <h2
            id="contact-section-heading"
            className="text-balance text-2xl font-extrabold tracking-tight text-white sm:text-3xl"
          >
            {t('Contact Us', 'ہم سے رابطہ کریں')}
          </h2>

          <p className="text-sm leading-relaxed text-brand-blue-100 sm:text-base">
            {t(
              'For any guidance, question or assistance, reach the Abbottabad Driving License Branch through the channels below. The 1915 helpline is available 24/7.',
              'کسی بھی رہنمائی، سوال یا معاونت کے لیے نیچے دیے گئے ذرائع سے ایبٹ آباد ڈرائیونگ لائسنس برانچ سے رابطہ کریں۔ 1915 ہیلپ لائن 24/7 دستیاب ہے۔'
            )}
          </p>
        </div>

        {/* Channels + hours */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">
            {CONTACT_CHANNELS.map((channel) => (
              <a
                key={channel.id}
                href={channel.href}
                {...(channel.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="group flex h-full gap-3.5 rounded-2xl border border-white/15 bg-white/5 p-4 transition-colors hover:border-brand-lime/40 hover:bg-white/10 sm:p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-lime text-brand-dark">
                  <channel.icon className="h-5 w-5" aria-hidden="true" />
                </span>

                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-brand-lime sm:text-xs">
                    {t(channel.labelEn, channel.labelUr)}
                  </p>
                  <p className="mt-1 break-words text-sm font-semibold leading-snug text-white sm:text-base">
                    {t(channel.valueEn, channel.valueUr)}
                  </p>
                  <p className="mt-0.5 inline-flex items-center gap-1 break-words text-xs leading-snug text-brand-blue-100">
                    {t(channel.noteEn, channel.noteUr)}
                    {channel.external && (
                      <ArrowUpRight
                        className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    )}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Office hours */}
          <div className="flex h-full flex-col rounded-2xl border border-white/15 bg-white/5 p-4 sm:p-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-lime text-brand-dark">
              <Clock className="h-5 w-5" aria-hidden="true" />
            </span>

            <h3 className="mt-3 text-sm font-bold text-white sm:text-base">
              {t('Office Hours', 'دفتر کے اوقات')}
            </h3>

            <ul className="mt-3 space-y-2.5 text-sm">
              <li className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                <span className="text-brand-blue-100">{t('Monday - Friday', 'پیر تا جمعہ')}</span>
                <span className="font-semibold text-white">
                  {t('09:00 AM - 05:00 PM', 'صبح 09:00 سے شام 05:00 تک')}
                </span>
              </li>
              <li className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-brand-blue-100">{t('Saturday - Sunday', 'ہفتہ اور اتوار')}</span>
                <span className="font-semibold text-white">{t('Closed', 'بند')}</span>
              </li>
            </ul>

            <p className="mt-3 flex items-start gap-2 border-t border-white/10 pt-3 text-xs leading-relaxed text-brand-blue-100">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-lime" aria-hidden="true" />
              {t(
                'For traffic emergencies, the 1915 helpline remains available 24/7.',
                'ٹریفک ایمرجنسی کے لیے 1915 ہیلپ لائن 24/7 دستیاب رہتی ہے۔'
              )}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href="tel:1915"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-lime px-5 py-3 text-sm font-bold text-brand-dark transition-colors hover:bg-brand-lime/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime sm:w-auto"
          >
            <PhoneCall className="h-4 w-4" aria-hidden="true" />
            {t('Call 1915', '1915 پر کال کریں')}
          </a>

          <a
            href="mailto:trafficwardenatd@gmail.com"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime sm:w-auto"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {t('Send Email', 'ای میل بھیجیں')}
          </a>

          {children}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
