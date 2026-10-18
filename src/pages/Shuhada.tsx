import React, { useEffect } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { useLanguage } from '../hooks/useLanguage';
import {
  Award,
  Calendar,
  MapPin,
  Shield,
  Star
} from 'lucide-react';
import logoImg from '/Traffic-Logo-Updated.png';
import khurramImg from '/Shuda-01-Khurram-Khan-Jadoon.png';

interface ShuhadaProfile {
  id: string;
  nameEn: string;
  nameUr: string;
  rankEn: string;
  rankUr: string;
  unitEn: string;
  unitUr: string;
  dateEn: string;
  dateUr: string;
  placeEn: string;
  placeUr: string;
  tributeEn: string;
  tributeUr: string;
  image?: string;
  isPlaceholder?: boolean;
}

export const Shuhada: React.FC = () => {
  const { language } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ur'
        ? 'ہمارے ہیروز — شہداء | ٹریفک وارڈن ایبٹ آباد'
        : 'Our Heroes — Shuhada | Traffic Warden Abbottabad';
  }, [language]);

  const shuhadaProfiles: ShuhadaProfile[] = [
    {
      id: 'shuhada-record-1',
      nameEn: 'Khurram Khan Jadoon',
      nameUr: 'خرم خان جدون',
      rankEn: 'Traffic Warden (No. 1314)',
      rankUr: 'ٹریفک وارڈن (نمبر 1314)',
      unitEn: 'Abbottabad Traffic Warden',
      unitUr: 'ایبٹ آباد ٹریفک وارڈن',
      dateEn: '19 January 2014',
      dateUr: '19 جنوری 2014',
      placeEn: 'Haripur Election 2014',
      placeUr: 'ہری پور الیکشن 2014',
      tributeEn: 'Embraced martyrdom while performing election duty in Haripur, demonstrating exceptional courage and devotion to public service.',
      tributeUr: 'ہری پور میں الیکشن ڈیوٹی ادا کرتے ہوئے بے مثال شجاعت اور عوام کی خدمت میں جان کا نذرانہ پیش کیا۔',
      image: khurramImg,
    },
  ];

  return (
    <div className="space-y-0 text-brand-dark bg-brand-light-bg min-h-screen overflow-x-hidden">
      {/* =========================================================================
          HERO SECTION - Solemn Memorial Header
          ========================================================================= */}
      <section className="relative bg-[#000080] text-white pt-8 pb-14 border-b border-[#0000aa] overflow-hidden">
        <div className="absolute inset-0 gov-subtle-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-lime/10 rounded-full blur-3xl pointer-events-none" />

        <PageContainer className="relative z-10">
          <Breadcrumbs
            items={[
              { label: 'About Us', labelUrdu: 'ہمارے متعلق', path: '/about' },
              { label: 'Our Heroes — Shuhada', labelUrdu: 'ہمارے ہیروز — شہداء', path: '/about/shuhada' },
            ]}
            className="mb-4 text-white/80 [&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
          />

          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-lime/15 text-brand-lime border border-brand-lime/30 text-xs font-extrabold uppercase tracking-widest">
              <Award className="w-4 h-4 text-brand-lime" />
              <span>{language === 'ur' ? 'یادگارِ شہداء' : 'OFFICIAL MEMORIAL ROSTER'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {language === 'ur' ? 'ہمارے ہیروز — شہداء' : 'OUR HEROES'}
            </h1>

            <p className="text-white/90 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              {language === 'ur'
                ? 'وہ بہادر جوان جنہوں نے فرض کی ادائیگی میں اپنی جانوں کا نذرانہ پیش کیا'
                : 'Those Who Gave Their Lives in the Line of Duty'}
            </p>

            <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              {language === 'ur'
                ? 'خیبر پختونخوا پولیس اور ٹریفک وارڈن ایبٹ آباد کے وہ عظیم سپوت جنہوں نے شہریوں کی سلامتی، امن اور شاہراہوں پر قانون کی بالادستی کے لیے اپنی جانیں قربان کیں۔'
                : 'A solemn tribute to the courageous personnel of Khyber Pakhtunkhwa Police and Traffic Warden Abbottabad who made the supreme sacrifice in safeguarding the public.'}
            </p>

            <div className="pt-2 flex items-center justify-center gap-3">
              <span className="w-10 h-[1px] bg-white/20" />
              <Star className="w-4 h-4 text-brand-lime fill-brand-lime" />
              <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
                {language === 'ur' ? 'ہمیشہ زندہ و پائندہ' : 'Eternal Honor & Respect'}
              </span>
              <Star className="w-4 h-4 text-brand-lime fill-brand-lime" />
              <span className="w-10 h-[1px] bg-white/20" />
            </div>
          </div>
        </PageContainer>
      </section>

      {/* =========================================================================
          OFFICIAL DEPARTMENTAL MEMORIAL NOTICE
          ========================================================================= */}
      <section className="py-6 bg-brand-light-surface border-t border-brand-light-border">
        <PageContainer>
          <div className="max-w-4xl mx-auto p-5 rounded-2xl bg-brand-blue-50 border border-brand-blue-100 flex items-start gap-3 text-xs text-slate-700">
            <Shield className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {language === 'ur'
                ? 'نوٹ: یہ صفحہ ٹریفک وارڈن ایبٹ آباد اور خیبر پختونخوا پولیس کے شہداء کے باضابطہ ریکارڈ کی توثیق کے لیے مختص ہے۔ سرکاری ریکارڈ کی روشنی میں مکمل تفصیلات اور تصاویر وقتاً فوقتاً گزٹ نوٹیفکیشن کے مطابق تجدید کی جاتی ہیں۔'
                : 'Official Record Notice: This memorial page serves as a dedicated tribute space. Profiles are maintained in accordance with official Khyber Pakhtunkhwa Police departmental records and gazette citations.'}
            </p>
          </div>
        </PageContainer>
      </section>

      {/* =========================================================================
          MEMORIAL CARDS GRID - Matching About Page Style
          ========================================================================= */}
      <section className="py-16 sm:py-24 bg-brand-light-bg">
        <PageContainer>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
              <span>{language === 'ur' ? 'شہداء کی پروفائل' : 'MARTYR PROFILES'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight">
              {language === 'ur' ? 'قربانی کے ورکاء' : 'FACES OF SACRIFICE'}
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              {language === 'ur'
                ? 'ہمارے بہادر شہداء جنہوں نے فرض کی خط پر اپنی جانوں کا نذرانہ دیا'
                : 'Our brave martyrs who laid down their lives in the line of duty'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shuhadaProfiles.map((hero) => (
              <div
                key={hero.id}
                className="rounded-3xl bg-brand-light-surface border border-brand-light-border p-6 hover:border-brand-blue-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Portrait Section */}
                <div className="relative mx-auto w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-b from-brand-blue-100 to-brand-blue-300 border-2 border-brand-blue-200 flex items-center justify-center shadow-sm mb-5">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white">
                    {hero.image ? (
                      <img
                        src={hero.image}
                        alt={`${language === 'ur' ? hero.nameUr : hero.nameEn} Portrait`}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center">
                        <img
                          src={logoImg}
                          alt="KPK Police Memorial Crest"
                          className="w-10 h-10 object-contain opacity-75 group-hover:opacity-100 transition-opacity"
                        />
                        <span className="text-[8px] font-bold uppercase tracking-wider text-brand-blue mt-1">
                          Shaheed
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Name and Rank */}
                <div className="text-center space-y-1.5">
                  <h3 className="text-base sm:text-lg font-bold text-brand-dark group-hover:text-brand-blue transition-colors leading-snug">
                    {language === 'ur' ? hero.nameUr : hero.nameEn}
                  </h3>
                  <div className="inline-block px-3 py-0.5 rounded-full text-[11px] font-semibold bg-brand-blue-50 text-brand-blue border border-brand-blue-100">
                    {language === 'ur' ? hero.rankUr : hero.rankEn}
                  </div>
                </div>

                {/* Incident Information */}
                <div className="space-y-2 pt-4 border-t border-brand-light-border text-xs text-slate-600">
                  <div className="flex items-start gap-2.5">
                    <Shield className="w-3.5 h-3.5 text-brand-blue shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold tracking-wide">
                        {language === 'ur' ? 'یونٹ و تعیناتی' : 'Unit & Posting'}
                      </span>
                      <span className="text-slate-700">{language === 'ur' ? hero.unitUr : hero.unitEn}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Calendar className="w-3.5 h-3.5 text-brand-blue shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold tracking-wide">
                        {language === 'ur' ? 'تاریخ شہادت' : 'Date of Martyrdom'}
                      </span>
                      <span className="text-slate-700">{language === 'ur' ? hero.dateUr : hero.dateEn}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-blue shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold tracking-wide">
                        {language === 'ur' ? 'مقام' : 'Location'}
                      </span>
                      <span className="text-slate-700">{language === 'ur' ? hero.placeUr : hero.placeEn}</span>
                    </div>
                  </div>
                </div>

                {/* Tribute Quote */}
                <blockquote className="p-4 rounded-xl bg-brand-blue-50 border-l-2 border-brand-blue text-slate-700 italic text-xs leading-relaxed mt-4">
                  "{language === 'ur' ? hero.tributeUr : hero.tributeEn}"
                </blockquote>

                {/* Footer */}
                <div className="pt-3 mt-2 border-t border-brand-light-border flex items-center justify-center text-[11px] font-bold text-brand-blue uppercase tracking-widest">
                  <span>{language === 'ur' ? 'سلامِ عقیدت' : 'In Eternal Remembrance'}</span>
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* =========================================================================
          DIGNIFIED CLOSING SECTION
          ========================================================================= */}
      <section className="relative bg-[#000080] text-white py-16 sm:py-20 border-t border-[#0000aa] overflow-hidden">
        <div className="absolute inset-0 gov-subtle-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-brand-blue/20 rounded-full blur-3xl -z-0 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-lime/10 rounded-full blur-3xl -z-0 pointer-events-none" />

        <PageContainer className="relative z-10">
          <div className="max-w-2xl mx-auto text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-brand-lime/15 text-brand-lime mx-auto flex items-center justify-center border border-brand-lime/30 backdrop-blur-sm">
              <Star className="w-7 h-7 fill-brand-lime" />
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {language === 'ur'
                ? 'ان کی عظیم قربانی ہمیشہ یاد رکھی جائے گی'
                : 'THEIR SACRIFICE WILL ALWAYS BE REMEMBERED'}
            </h2>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed italic max-w-xl mx-auto">
              "
              {language === 'ur'
                ? 'ان کی شجاعت، لگن اور قربانی عوام کی خدمت کی لازوال علامت بنی رہے گی۔'
                : 'Their courage, dedication and sacrifice remain an enduring symbol of service to the people.'}
              "
            </p>

            <div className="pt-4 flex items-center justify-center gap-4">
              <img
                src={logoImg}
                alt="Traffic Warden Abbottabad Crest"
                className="w-9 h-9 object-contain" />
              <span className="text-xs text-white/70">
                {language === 'ur'
                  ? 'ٹریفک وارڈن ایبٹ آباد — خیبر پختونخوا پولیس'
                  : 'Traffic Warden Abbottabad — Khyber Pakhtunkhwa Police'}
              </span>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
};

export default Shuhada;