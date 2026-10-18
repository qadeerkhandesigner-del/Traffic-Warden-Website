import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { useLanguage } from '../hooks/useLanguage';
import { Card, CardContent, CardFooter } from '../components/ui/Card';
import {
  IdCard,
  FileText,
  RefreshCw,
  Copy,
  ArrowRight,
  Building,
  Phone,
  Smartphone,
  QrCode,
  Globe,
  Users,
  Landmark,
  ArrowLeftRight,
  BadgeCheck,
  Banknote,
  ShieldCheck,
} from 'lucide-react';

export const DrivingLicenseServices: React.FC = () => {
  const { language, isRTL } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ur'
        ? 'ڈرائیونگ لائسنس سروسز | ٹریفک وارڈن ایبٹ آباد'
        : 'Driving License Services | Traffic Warden Abbottabad';
  }, [language]);

  const serviceCards = [
    {
      id: 'new-license',
      icon: IdCard,
      titleEn: 'New Driving License',
      titleUr: 'نیا ڈرائیونگ لائسنس',
      descEn: 'Information about applying for a new permanent driving license in Abbottabad.',
      descUr: 'ایبٹ آباد میں نئے مستقل ڈرائیونگ لائسنس کے لیے اپلائی کرنے کی معلومات۔',
      path: '/services/driving-license/new',
    },
    {
      id: 'learner-permit',
      icon: FileText,
      titleEn: 'Learner Permit',
      titleUr: 'لرنر پرمٹ',
      descEn: 'Guidance for citizens applying for a learner driving permit.',
      descUr: 'شہریوں کے لیے لرنر ڈرائیونگ پرمٹ کے لیے رہنمائی۔',
      path: '/services/driving-license/learner-permit',
    },
    {
      id: 'license-renewal',
      icon: RefreshCw,
      titleEn: 'License Renewal',
      titleUr: 'لائسنس تجدید',
      descEn: 'Information about renewing an existing or expired driving license.',
      descUr: 'موجودہ یا منقضی ہو چکے ڈرائیونگ لائسنس کی تجدید کی معلومات۔',
      path: '/services/driving-license/renewal',
    },
    {
      id: 'duplicate-license',
      icon: Copy,
      titleEn: 'Duplicate Driving License',
      titleUr: 'ڈپلی کیٹ ڈرائیونگ لائسنس',
      descEn: 'Guidance for lost, damaged or duplicate license applications.',
      descUr: 'گم شدہ، ٹوٹے ہوئے یا ڈپلی کیٹ لائسنس کی درخواستوں کی رہنمائی۔',
      path: '/services/driving-license/duplicate',
    },
    {
      id: 'raabta-app',
      icon: Smartphone,
      titleEn: 'Raabta App Traffic Police',
      titleUr: 'رابطہ ایپ ٹریفک پولیس',
      descEn: 'Access driving license services, traffic challans, and other police services through the Raabta App.',
      descUr: 'رابطہ ایپ کے ذریعے ڈرائیونگ لائسنس سروسز، ٹریفک چالان اور دیگر پولیس سروسز تک رسائی حاصل کریں۔',
      path: '/services/driving-license/raabta-app',
    },
    {
      id: 'e-license',
      icon: QrCode,
      titleEn: 'E-License',
      titleUr: 'ای-لائسنس',
      descEn: 'Information about the digital (electronic) driving license, and how to obtain and verify it.',
      descUr: 'ڈیجیٹل (الیکٹرانک) ڈرائیونگ لائسنس اور اسے حاصل کرنے اور تصدیق کرنے سے متعلق معلومات۔',
      path: '/services/driving-license/e-license',
    },
    {
      id: 'international-permit',
      icon: Globe,
      titleEn: 'International Permit',
      titleUr: 'بین الاقوامی پرمٹ',
      descEn: 'Guidance for citizens applying for an international driving permit for travel outside Pakistan.',
      descUr: 'پاکستان سے باہر سفر کے لیے بین الاقوامی ڈرائیونگ پرمٹ کے خواہشمند شہریوں کے لیے رہنمائی۔',
      path: '/services/driving-license/international-permit',
    },
    {
      id: 'license-for-afghans',
      icon: Users,
      titleEn: 'Driving License for Afghans',
      titleUr: 'افغان شہریوں کے لیے ڈرائیونگ لائسنس',
      descEn: 'Information for Afghan citizens regarding the issuance of a driving license under the prescribed procedure.',
      descUr: 'افغان شہریوں کے لیے مقررہ طریقہ کار کے تحت ڈرائیونگ لائسنس کے اجرا سے متعلق معلومات۔',
      path: '/services/driving-license/for-afghans',
    },
    {
      id: 'license-for-diplomats',
      icon: Landmark,
      titleEn: 'Driving License for Diplomats & Embassy Officers/Officials',
      titleUr: 'ڈپلومیٹس اور سفارتی عملے کے لیے ڈرائیونگ لائسنس',
      descEn: 'Guidance for diplomats, embassy officers and officials regarding driving license issuance and related formalities.',
      descUr: 'ڈپلومیٹس، سفارت خانے کے افسران اور عملے کے لیے ڈرائیونگ لائسنس کے اجرا اور متعلقہ کارروائی سے متعلق رہنمائی۔',
      path: '/services/driving-license/diplomats',
    },
    {
      id: 'conversion-of-license',
      icon: ArrowLeftRight,
      titleEn: 'Conversion of License',
      titleUr: 'لائسنس کی تبدیلی',
      descEn: 'Procedure and requirements for converting a foreign or other-province driving license.',
      descUr: 'غیر ملکی یا دوسرے صوبے کے ڈرائیونگ لائسنس کو تبدیل کرنے کا طریقہ کار اور ضروریات۔',
      path: '/services/driving-license/conversion',
    },
    {
      id: 'license-endorsement',
      icon: BadgeCheck,
      titleEn: 'License Endorsement',
      titleUr: 'لائسنس اینڈورسمینٹ',
      descEn: 'Information about adding a new vehicle category (endorsement) to an existing driving license.',
      descUr: 'موجودہ ڈرائیونگ لائسنس میں نئی گاڑی کی قسم (اینڈورسمینٹ) شامل کرنے سے متعلق معلومات۔',
      path: '/services/driving-license/endorsement',
    },
    {
      id: 'license-fee-structure',
      icon: Banknote,
      titleEn: 'License Fee Structure',
      titleUr: 'لائسنس فیس کا ڈھانچہ',
      descEn: 'Details of the prescribed government fees applicable to driving license services and categories.',
      descUr: 'ڈرائیونگ لائسنس سروسز اور اقسام پر لاگو مقررہ سرکاری فیسوں کی تفصیل۔',
      path: '/services/driving-license/fee-structure',
    },
  ];

  return (
    <div className="space-y-0 text-brand-dark bg-brand-light-bg min-h-screen overflow-x-hidden">
      {/* Hero Header */}
      <section className="relative bg-[#000080] text-white pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-[#0000aa] overflow-hidden">
        <div className="absolute inset-0 gov-subtle-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-60 h-60 sm:w-80 sm:h-80 bg-brand-blue/30 rounded-full blur-3xl pointer-events-none" />

        <PageContainer className="relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Home', labelUrdu: 'صفحۂ اول', path: '/' },
              { label: 'Services', labelUrdu: 'خدمات', path: '/services' },
              { label: 'Driving License Services', labelUrdu: 'ڈرائیونگ لائسنس سروسز', path: '/services/driving-license' },
            ]}
            className="mb-4 text-white/80 [&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
          />

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lime/15 text-brand-lime border border-brand-lime/30 text-xs font-bold uppercase tracking-wider">
              <IdCard className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'ڈرائیونگ لائسنس' : 'DRIVING LICENSE'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {language === 'ur' ? 'ڈرائیونگ لائسنس سروسز' : 'DRIVING LICENSE SERVICES'}
            </h1>
            <p className="text-white/85 text-sm sm:text-base leading-relaxed">
              {language === 'ur'
                ? 'ایبٹ آباد کے شہریوں کے لیے ڈرائیونگ لائسنس کی خدمات، ضروریات اور رہنمائی دریافت کریں۔'
                : 'Explore driving license services, requirements and guidance for citizens in Abbottabad.'}
            </p>
          </div>
        </PageContainer>
      </section>

      {/* Service Categories Grid */}
      <section className="py-16 sm:py-20 bg-brand-light-surface">
        <PageContainer>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
              <span>{language === 'ur' ? 'سروس کی زمرے' : 'SERVICE CATEGORIES'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight">
              {language === 'ur' ? 'ڈرائیونگ لائسنس کی اقسام' : 'Driving License Service Categories'}
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              {language === 'ur'
                ? 'اپنی ضرورت کے مطابق ذیلی سروس کا انتخاب کریں'
                : 'Select the relevant sub-service based on your requirement'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCards.map((service) => (
              <Link key={service.id} to={service.path}>
                <Card hoverEffect highlightAccent className="h-full flex flex-col">
                  <CardContent className="flex-1 flex flex-col p-5 sm:p-6 space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-brand-blue text-white flex items-center justify-center shrink-0">
                      <service.icon className="w-7 h-7" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-brand-dark group-hover:text-brand-blue transition-colors">
                        {language === 'ur' ? service.titleUr : service.titleEn}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {language === 'ur' ? service.descUr : service.descEn}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-transparent border-t border-slate-100">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-sm font-medium text-brand-blue group-hover:underline transition-colors">
                        {language === 'ur' ? 'تفصیل دیکھیں' : 'View Details'}
                      </span>
                      <ArrowRight className={`w-4 h-4 text-brand-blue group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Need Assistance Section */}
      <section className="py-16 sm:py-20 bg-brand-light-bg border-t border-brand-light-border">
        <PageContainer>
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
              <span>{language === 'ur' ? 'رابطہ اور رہنمائی' : 'NEED ASSISTANCE?'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
              {language === 'ur' ? 'مدد کی ضرورت ہے؟' : 'Need Assistance?'}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {language === 'ur'
                ? 'ڈرائیونگ لائسنس سے متعلق کسی بھی معلومات، رہنمائی یا شکایت کے لیے لائسنس برینچ سے رابطہ کریں۔'
                : 'For any information, guidance or complaint related to driving licenses, contact the License Branch.'}
            </p>

            <div className="bg-white rounded-3xl border border-brand-light-border p-6 sm:p-8 shadow-gov space-y-4">
              <div className="flex items-start gap-4 p-4 bg-brand-blue-50 rounded-2xl sm:items-center">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-brand-blue text-white flex items-center justify-center shrink-0">
                  <Building className="w-6 h-6 text-brand-lime" />
                </div>
                <div className="min-w-0 text-start">
                  <h3 className="font-bold text-brand-dark">
                    {language === 'ur' ? 'لائسنس برینچ' : 'License Branch'}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {language === 'ur'
                      ? 'ڈرائیونگ لائسنس برانچ، جی پی او آفس کے سامنے، اے ڈی سی جنرل آفس کے قریب، ایبٹ آباد۔'
                      : 'Driving License Branch, Infront of GPO Office Near ADC General Office, Abbottabad.'}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:items-center sm:gap-4">
                <div className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-blue px-6 py-3 text-base font-medium text-white shadow-sm">
                  <ShieldCheck className="h-5 w-5 shrink-0" />
                  <span>Traffic Warden Abbottabad</span>
                </div>
                <a
                  href="tel:1915"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-brand-blue px-6 py-3 text-base font-medium text-brand-blue transition-colors hover:bg-brand-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
                >
                  <Phone className="h-5 w-5 shrink-0" />
                  <span>{language === 'ur' ? 'ہیلپ لائن 1915' : 'Helpline 1915'}</span>
                </a>
              </div>

              <p className="text-xs text-slate-500 pt-2 border-t border-slate-100">
                {language === 'ur'
                  ? 'سرکاری وقتوں کے دوران دستیاب ہے۔ ایمرجنسی کے لیے 1915 ڈائل کریں۔'
                  : 'Available during official working hours. For emergencies, dial 1915.'}
              </p>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
};

export default DrivingLicenseServices;