import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { useLanguage } from '../hooks/useLanguage';
import {
  ArrowRight,
  ArrowLeft,
  Hourglass,
  Building,
  Phone,
  IdCard,
  ShieldCheck,
  Info,
} from 'lucide-react';

export interface DrivingLicenseCategoryPageProps {
  /** English title of the driving license category. */
  titleEn: string;
  /** Urdu title of the driving license category. */
  titleUr: string;
  /** Short English description shown in the hero. */
  descEn: string;
  /** Short Urdu description shown in the hero. */
  descUr: string;
  /** Icon representing the category. */
  icon: LucideIcon;
}

/**
 * Shared layout for driving license sub-categories that do not yet have
 * published content. Renders the standard hero, breadcrumbs and a
 * "information will be available soon" notice along with contact details.
 */
export const DrivingLicenseCategoryPage: React.FC<DrivingLicenseCategoryPageProps> = ({
  titleEn,
  titleUr,
  descEn,
  descUr,
  icon: Icon,
}) => {
  const { language, isRTL } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ur'
        ? `${titleUr} | ٹریفک وارڈن ایبٹ آباد`
        : `${titleEn} | Traffic Warden Abbottabad`;
  }, [language, titleEn, titleUr]);

  const ForwardArrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-0 text-brand-dark bg-brand-light-bg min-h-screen overflow-x-hidden">
      {/* ============================== HERO ============================== */}
      <section className="relative bg-[#000080] text-white pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-[#0000aa] overflow-hidden">
        <div className="absolute inset-0 gov-subtle-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-80 sm:h-80 bg-brand-blue/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-80 sm:h-80 bg-brand-lime/10 rounded-full blur-3xl pointer-events-none" />

        <PageContainer className="relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Home', labelUrdu: 'صفحۂ اول', path: '/' },
              { label: 'Services', labelUrdu: 'خدمات', path: '/services' },
              {
                label: 'Driving License Services',
                labelUrdu: 'ڈرائیونگ لائسنس سروسز',
                path: '/services/driving-license',
              },
              { label: titleEn, labelUrdu: titleUr },
            ]}
            className="mb-4 text-white/80 [&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
          />

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lime/15 text-brand-lime border border-brand-lime/30 text-xs font-bold uppercase tracking-wider">
              <Icon className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'ڈرائیونگ لائسنس سروس' : 'DRIVING LICENSE SERVICE'}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {language === 'ur' ? titleUr : titleEn.toUpperCase()}
            </h1>

            <p className="text-white/85 text-sm sm:text-base leading-relaxed max-w-2xl">
              {language === 'ur' ? descUr : descEn}
            </p>
          </div>
        </PageContainer>
      </section>

      {/* ============================== PLACEHOLDER NOTICE ============================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-brand-light-surface border-b border-brand-light-border">
        <PageContainer>
          <div className="max-w-3xl lg:max-w-4xl mx-auto space-y-6">
            <div className="rounded-3xl bg-white border border-brand-light-border p-6 sm:p-8 shadow-gov text-center space-y-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-brand-blue-50 text-brand-blue flex items-center justify-center mx-auto">
                <Hourglass className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-brand-dark tracking-tight">
                {language === 'ur' ? 'تفصیلی معلومات جلد دستیاب ہوں گی' : 'Detailed Information Coming Soon'}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {language === 'ur'
                  ? 'اس سروس سے متعلق مکمل تفصیل — اہلیت، مطلوبہ دستاویزات، مقررہ فیس اور مکمل طریقہ کار — جلد ہی اس صفحے پر شائع کی جائے گی۔'
                  : 'Complete details for this service — eligibility, required documents, prescribed fee and the full procedure — will be published on this page shortly.'}
              </p>

              <div className="flex items-start gap-2.5 text-start rounded-2xl bg-yellow-50 border border-yellow-200 p-4 text-xs sm:text-sm text-yellow-800 leading-relaxed">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  {language === 'ur'
                    ? 'اس وقت تک درست اور تازہ معلومات کے لیے براہ کرم لائسنس برینچ سے رابطہ کریں یا ہیلپ لائن 1915 پر کال کریں۔'
                    : 'Until then, for accurate and up-to-date information please contact the License Branch or call Helpline 1915.'}
                </span>
              </div>
            </div>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex gap-4 rounded-3xl bg-white border border-brand-light-border p-5 sm:p-6">
                <div className="w-11 h-11 rounded-2xl bg-brand-blue text-white flex items-center justify-center shrink-0">
                  <Building className="w-5 h-5 text-brand-lime" />
                </div>
                <div className="space-y-1 min-w-0">
                  <h3 className="font-bold text-brand-dark text-sm sm:text-base">
                    {language === 'ur' ? 'لائسنس برینچ' : 'License Branch'}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed break-words">
                    {language === 'ur'
                      ? 'ڈرائیونگ لائسنس برانچ، جی پی او آفس کے سامنے، اے ڈی سی جنرل آفس کے قریب، ایبٹ آباد۔'
                      : 'Driving License Branch, Infront of GPO Office Near ADC General Office, Abbottabad.'}
                  </p>
                </div>
              </div>

              <a
                href="tel:1915"
                className="flex gap-4 rounded-3xl bg-white border border-brand-light-border p-5 sm:p-6 hover:border-brand-blue-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-2xl bg-brand-blue text-white flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-brand-lime" />
                </div>
                <div className="space-y-1 min-w-0">
                  <h3 className="font-bold text-brand-dark text-sm sm:text-base">
                    {language === 'ur' ? 'ہیلپ لائن' : 'Helpline'}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {language === 'ur'
                      ? 'ایمرجنسی اور رہنمائی کے لیے 1915 ڈائل کریں۔'
                      : 'Dial 1915 for emergencies and guidance.'}
                  </p>
                </div>
              </a>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                to="/services/driving-license"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-blue hover:bg-brand-blue-600 text-white font-bold text-sm tracking-wide transition-all duration-200 hover:scale-[1.03] active:scale-95"
              >
                <IdCard className="w-4 h-4 shrink-0" />
                <span>{language === 'ur' ? 'تمام لائسنس سروسز' : 'All License Services'}</span>
                <ForwardArrow className="w-4 h-4 shrink-0" />
              </Link>

              <Link
                to="/services/driving-license/raabta-app"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white border-2 border-brand-blue text-brand-blue hover:bg-brand-blue-50 font-bold text-sm tracking-wide transition-all duration-200"
              >
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>{language === 'ur' ? 'رابطہ ایپ سے ڈاؤن لوڈ کریں' : 'Use the Raabta App'}</span>
              </Link>
            </div>

            <p className="text-xs text-slate-500 text-center">
              {language === 'ur'
                ? 'لائسنس سے متعلق معلومات کے لیے یہ صفحہ کھلا رہے گا۔ اپڈیٹس کے لیے دوبارہ وزٹ کریں۔'
                : 'This page will be updated with the relevant license information. Please visit again for updates.'}
            </p>
          </div>
        </PageContainer>
      </section>
    </div>
  );
};

export default DrivingLicenseCategoryPage;
