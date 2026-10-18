import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { useLanguage } from '../hooks/useLanguage';
import {
  Award,
  Bike,
  PhoneCall,
  FileText,
  Compass,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import heroSlide2 from '../assets/images/hero-slide-2.jpg';
import serviceLicense from '../assets/images/service-license.jpg';
import serviceTrafficPlan from '../assets/images/service-traffic-plan.jpg';

export const Achievements: React.FC = () => {
  const { language, isRTL } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ur'
        ? 'کامیابیاں اور سنگ میل | ٹریفک وارڈن ایبٹ آباد'
        : 'Achievements & Milestones | Traffic Warden Abbottabad';
  }, [language]);

  const milestones = [
    {
      year: 'Modern Force',
      yearUr: 'جدید فورس',
      titleEn: 'Deployment of High-Powered Motorcycle Patrol Squad',
      titleUr: 'جدید ہیوی موٹر سائیکل پٹرولنگ اسکواڈ کی تعیناتی',
      descEn: 'Induction of heavy patrol motorcycles for fast response along mountainous terrains and tourist corridors.',
      descUr: 'پہاڑی راستوں اور سیاحتی کوریڈورز پر فوری رسپانس کے لیے جدید ہیوی موٹر سائیکل فلیٹ کا آغاز۔',
      image: heroSlide2,
      category: 'Mobility & Operations',
      categoryUr: 'نقل و حرکت و آپریشنز',
      icon: Bike,
    },
    {
      year: 'Helpline 24/7',
      yearUr: '24/7 ہیلپ لائن',
      titleEn: 'Integration of 24/7 Rapid Traffic Emergency Response (1915)',
      titleUr: '24/7 فوری ایمرجنسی ٹریفک ہیلپ لائن 1915 کا باقاعدہ قیام',
      descEn: 'Unified emergency guidance line assisting stranded commuters, road blockages, and vehicle breakdowns.',
      descUr: 'ضلع بھر میں گاڑی کی خرابی، حادثات اور روڈ بلاک کی صورت میں فوری امداد کا مرکزی نظام۔',
      image: serviceTrafficPlan,
      category: 'Public Facilitation',
      categoryUr: 'عوامی سہولت کاری',
      icon: PhoneCall,
    },
    {
      year: 'Digital Service',
      yearUr: 'ڈیجیٹل خدمات',
      titleEn: 'Computerized Driver Licensing & Verification Services',
      titleUr: 'کمپیوٹرائزڈ ڈرائیونگ لائسنسنگ اور شفاف تصدیقی نظام',
      descEn: 'Streamlined testing, digital learner permit tracking, and transparent challan verification procedures.',
      descUr: 'شفاف ٹیسٹنگ، ڈیجیٹل لرنر پرمٹ اور فوری چالان تصدیق کے لیے جدید سہولیات کی فراہمی۔',
      image: serviceLicense,
      category: 'E-Governance',
      categoryUr: 'ڈیجیٹل گورننس',
      icon: FileText,
    },
    {
      year: 'Corridor Safety',
      yearUr: 'شاہراہ کا تحفظ',
      titleEn: 'Hazara & Galyat Tourist Route Management Framework',
      titleUr: 'ہزارہ و گلیات سیاحتی روٹ مینجمنٹ حکمت عملی',
      descEn: 'Implementation of smart diversions, peak season one-way routing, and avalanche/bad weather response.',
      descUr: 'موسم گرما اور برفباری کے دوران لاکھوں سیاحوں کی محفوظ آمد و رفت کے لیے اسمارٹ ڈائیورژن پلان۔',
      image: serviceTrafficPlan,
      category: 'Traffic Planning',
      categoryUr: 'ٹریفک پلاننگ',
      icon: Compass,
    },
    {
      year: 'Civic Outreach',
      yearUr: 'عوامی رابطہ',
      titleEn: 'District-Wide Road Safety Awareness & School Campaigns',
      titleUr: 'ضلع بھر کے اسکولوں اور کالجز میں روڈ سیفٹی آگاہی مہمات',
      descEn: 'Engaging thousands of students and commercial drivers annually on helmet compliance and pedestrian rights.',
      descUr: 'ہیلمٹ کے استعمال، سیٹ بیلٹ اور زیبرا کراسنگ کی پاسداری کے لیے طلباء و ڈرائیورز کی مسلسل تربیت۔',
      image: heroSlide2,
      category: 'Education & Awareness',
      categoryUr: 'تعلیم و آگاہی',
      icon: BookOpen,
    },
  ];

  return (
    <div className="space-y-0 text-brand-dark bg-brand-light-bg min-h-screen overflow-x-hidden">
      {/* Hero Header */}
      <section className="relative bg-[#000080] text-white pt-8 pb-14 border-b border-[#0000aa] overflow-hidden">
        <div className="absolute inset-0 gov-subtle-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/30 rounded-full blur-3xl pointer-events-none" />

        <PageContainer className="relative z-10">
          <Breadcrumbs
            items={[
              { label: 'About Us', labelUrdu: 'ہمارے متعلق', path: '/about' },
              { label: 'Achievements & Milestones', labelUrdu: 'کامیابیاں اور سنگ میل', path: '/about/achievements' },
            ]}
            className="mb-4 text-white/80 [&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
          />

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lime/15 text-brand-lime border border-brand-lime/30 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'نمایاں کارکردگی' : 'NOTABLE RECORD'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {language === 'ur' ? 'کامیابیاں اور اہم سنگ میل' : 'ACHIEVEMENTS & MILESTONES'}
            </h1>
            <p className="text-white/85 text-sm sm:text-base leading-relaxed">
              {language === 'ur'
                ? 'محکمہ ٹریفک وارڈن ایبٹ آباد کے تحت حاصل کردہ اہم کارنامے اور عوامی خدمات میں بہتری کے اقدامات۔'
                : 'Key milestones in traffic modernization, citizen facilitation, and highway safety across District Abbottabad.'}
            </p>
          </div>
        </PageContainer>
      </section>

      {/* Milestones Grid */}
      <section className="py-16 sm:py-20 bg-brand-light-surface">
        <PageContainer>
          <div className="space-y-8 max-w-4xl mx-auto">
            {milestones.map((m, idx) => {
              const MilestoneIcon = m.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-brand-light-bg border border-brand-light-border p-6 sm:p-8 hover:border-brand-blue-300 hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row items-center gap-6 group"
                >
                  {/* Photo thumbnail */}
                  <div className="w-full md:w-56 h-40 rounded-2xl overflow-hidden shrink-0 border-2 border-white shadow-sm bg-slate-900">
                    <img
                      src={m.image}
                      alt={m.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue text-white text-[11px] font-bold uppercase">
                        <MilestoneIcon className="w-3.5 h-3.5 text-brand-lime" />
                        <span>{language === 'ur' ? m.categoryUr : m.category}</span>
                      </div>
                      <span className="text-xs font-black text-brand-blue bg-brand-blue-50 px-3 py-1 rounded-full border border-brand-blue-100">
                        {language === 'ur' ? m.yearUr : m.year}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-brand-dark group-hover:text-brand-blue transition-colors">
                      {language === 'ur' ? m.titleUr : m.titleEn}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {language === 'ur' ? m.descUr : m.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-blue text-white font-bold text-xs hover:bg-brand-blue-600 transition-colors shadow-sm"
            >
              <span>{language === 'ur' ? 'مکمل تعارف صفحہ دیکھیں' : 'Back to Department Overview'}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </div>
        </PageContainer>
      </section>
    </div>
  );
};

export default Achievements;
