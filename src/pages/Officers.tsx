import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { useLanguage } from '../hooks/useLanguage';
import {
  ShieldCheck,
  Search,
  MapPin,
  Users,
  ChevronRight
} from 'lucide-react';

// Authentic Officer Portraits from project
import igpImg from '/IGP POLICE Zulfiqar Hameed.jpg';
import digImg from '/DIG Nazeer Jahanzeb Khan updated image.jpg';
import dpoImg from '/DPO Haroon Rasheed Updated.jpg';
import sspImg from '/SSP Traffic Muhammad Suleman.jpg';
import dspHavalianImg from '/DSP Circle Havalian Muhammad Sajjad.jpg';
import dspMandianImg from '/DSP Mandian Circle  Tufail Khan.jpg';
import dspHeadquarterImg from '/Dsp Headquater Cadet Muhammad Hafeez.jpg';

interface OfficerProfile {
  id: string;
  nameEn: string;
  nameUr: string;
  rankEn: string;
  rankUr: string;
  designationEn: string;
  designationUr: string;
  branch: 'command' | 'traffic-hq' | 'field-sector';
  branchLabelEn: string;
  branchLabelUr: string;
  areaEn: string;
  areaUr: string;
  image: string;
  isLeadership?: boolean;
}

export const Officers: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');

  useEffect(() => {
    document.title =
      language === 'ur'
        ? 'ٹریفک پولیس افسران | ٹریفک وارڈن ایبٹ آباد'
        : 'Traffic Police Officers | Traffic Warden Abbottabad';
  }, [language]);

  // Verified Officer Directory
  const officersList: OfficerProfile[] = [
    {
      id: 'igp-kp',
      nameEn: 'Zulfiqar Hameed',
      nameUr: 'ذوالفقار حمید',
      rankEn: 'Inspector General of Police (IGP)',
      rankUr: 'انسپکٹر جنرل آف پولیس (آئی جی پی)',
      designationEn: 'Provincial Police Officer, Khyber Pakhtunkhwa',
      designationUr: 'صوبائی پولیس افسر، خیبر پختونخوا پولیس',
      branch: 'command',
      branchLabelEn: 'Provincial Command',
      branchLabelUr: 'صوبائی کمانڈ',
      areaEn: 'Khyber Pakhtunkhwa Province',
      areaUr: 'صوبہ خیبر پختونخوا',
      image: igpImg,
      isLeadership: true,
    },
    {
      id: 'dig-hazara',
      nameEn: 'Jahanzaib Nazeer Khan',
      nameUr: 'جہانزیب نزیر خان',
      rankEn: 'Deputy Inspector General (DIG)',
      rankUr: 'ڈپٹی انسپکٹر جنرل آف پولیس (ڈی آئی جی)',
      designationEn: 'Regional Police Officer, Hazara Range',
      designationUr: 'ریجنل پولیس افسر، ہزارہ رینج',
      branch: 'command',
      branchLabelEn: 'Regional Command',
      branchLabelUr: 'ریجنل کمانڈ',
      areaEn: 'DIG Hazara Region',
      areaUr: 'ہزارہ رینج (ایبٹ آباد، ہری پور، مانسہرہ)',
      image: digImg,
      isLeadership: true,
    },
    {
      id: 'dpo-abbottabad',
      nameEn: 'Haroon Rasheed',
      nameUr: 'ہارون رشید',
      rankEn: 'District Police Officer (DPO)',
      rankUr: 'ڈسٹرکٹ پولیس آفیسر (ڈی پی او)',
      designationEn: 'Head of District Police, Abbottabad',
      designationUr: 'سربراہ ضلعی پولیس، ضلع ایبٹ آباد',
      branch: 'command',
      branchLabelEn: 'District Command',
      branchLabelUr: 'ضلعی کمانڈ',
      areaEn: 'District Abbottabad',
      areaUr: 'ضلع ایبٹ آباد',
      image: dpoImg,
      isLeadership: true,
    },
    {
      id: 'ssp-traffic',
      nameEn: 'Muhammad Suleman',
      nameUr: 'محمد سلیمان',
      rankEn: 'Senior Superintendent of Police (SSP)',
      rankUr: 'سینئر سپرنٹنڈنٹ آف پولیس (ایس ایس پی)',
      designationEn: 'Senior Superintendent of Police (Traffic), Abbottabad',
      designationUr: 'سربراہ ٹریفک پولیس، ضلع ایبٹ آباد',
      branch: 'traffic-hq',
      branchLabelEn: 'Traffic Headquarters',
      branchLabelUr: 'ٹریفک ہیڈکوارٹر',
      areaEn: 'SSP Traffic Warden Abbottabad',
      areaUr: 'تمام ٹریفک آپریشنز و روٹس ضلع ایبٹ آباد',
      image: sspImg,
      isLeadership: true,
    },
    {
      id: 'dsp-traffic-hq',
      nameEn: 'Muhammad Hafeez',
      nameUr: 'محمد حفیظ',
      rankEn: 'DSP Traffic Police (Headquarters)',
      rankUr: 'ڈی ایس پی ٹریفک پولیس (ہیڈکوارٹر)',
      designationEn: 'Incharge Traffic Administration',
      designationUr: 'انچارج ٹریفک ایڈمنسٹریشن',
      branch: 'traffic-hq',
      branchLabelEn: 'Traffic Headquarters',
      branchLabelUr: 'ٹریفک ہیڈکوارٹر',
      areaEn: 'Traffic Headquarter',
      areaUr: 'ٹریفک ہیڈکوارٹر',
      image: dspHeadquarterImg,
      isLeadership: false,
    },
    {
      id: 'dsp-circle-havalian',
      nameEn: 'Muhammad Sajjad',
      nameUr: 'محمد سجاد',
      rankEn: 'DSP Circle Havalian',
      rankUr: 'ڈی ایس پی سرکل حویلیاں',
      designationEn: 'Circle Officer Havalian & Galliyat',
      designationUr: 'سرکل افسر حویلیاں و گلیات',
      branch: 'traffic-hq',
      branchLabelEn: 'Traffic Headquarters',
      branchLabelUr: 'ٹریفک ہیڈکوارٹر',
      areaEn: 'Havalian & Galliyat Circle',
      areaUr: 'سرکل حویلیاں و گلیات',
      image: dspHavalianImg,
      isLeadership: false,
    },
    {
      id: 'dsp-circle-mandian',
      nameEn: 'Tufail Khan',
      nameUr: 'طفیل خان',
      rankEn: 'DSP Circle Mandian',
      rankUr: 'ڈی ایس پی سرکل منڈیان',
      designationEn: 'Circle Officer Mandian',
      designationUr: 'سرکل افسر منڈیان',
      branch: 'traffic-hq',
      branchLabelEn: 'Traffic Headquarters',
      branchLabelUr: 'ٹریفک ہیڈکوارٹر',
      areaEn: 'Mandian Circle',
      areaUr: 'سرکل منڈیان',
      image: dspMandianImg,
      isLeadership: false,
    },
    {
      id: 'incharge-license-branch',
      nameEn: 'Incharge License Branch',
      nameUr: 'انچارج لائسنس برانچ',
      rankEn: 'Traffic Inspector',
      rankUr: 'ٹریفک انسپکٹر',
      designationEn: 'Incharge License Branch Abbottabad',
      designationUr: 'انچارج لائسنس برانچ ایبٹ آباد',
      branch: 'traffic-hq',
      branchLabelEn: 'License Branch',
      branchLabelUr: 'لائسنس برانچ',
      areaEn: 'License Branch, Traffic Lines',
      areaUr: 'لائسنس برانچ، ٹریفک لائنز',
      image: dspHeadquarterImg,
      isLeadership: false,
    },
  ];

  // Filtered officers list
  const filteredOfficers = useMemo(() => {
    return officersList.filter((officer) => {
      const matchesBranch =
        selectedBranch === 'all' || officer.branch === selectedBranch;

      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        officer.nameEn.toLowerCase().includes(q) ||
        officer.nameUr.includes(q) ||
        officer.rankEn.toLowerCase().includes(q) ||
        officer.rankUr.includes(q) ||
        officer.designationEn.toLowerCase().includes(q) ||
        officer.areaEn.toLowerCase().includes(q);

      return matchesBranch && matchesSearch;
    });
  }, [officersList, selectedBranch, searchTerm]);

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
              { label: 'Traffic Police Officers', labelUrdu: 'ٹریفک پولیس افسران', path: '/about/officers' },
            ]}
            className="mb-4 text-white/80 [&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
          />

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lime/15 text-brand-lime border border-brand-lime/30 text-xs font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'افسران کی ڈائرکٹری' : 'COMMAND DIRECTORY'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {language === 'ur' ? 'ٹریفک پولیس افسران' : 'TRAFFIC POLICE OFFICERS'}
            </h1>
            <p className="text-white/85 text-sm sm:text-base leading-relaxed">
              {language === 'ur'
                ? 'ایبٹ آباد بھر میں ٹریفک کے انتظام اور روڈ سیفٹی آپریشنز کی قیادت کرنے والے افسران سے ملیے۔'
                : 'Meet the officers responsible for leading and supporting traffic management and road-safety operations across Abbottabad.'}
            </p>
          </div>
        </PageContainer>
      </section>

      {/* Directory Filter & Search Bar */}
      <section className="py-6 bg-brand-light-surface border-b border-brand-light-border sticky top-16 z-30 shadow-sm">
        <PageContainer>
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={
                  language === 'ur'
                    ? 'نام، رینک یا سیکٹر سے تلاش کریں...'
                    : 'Search by officer name, rank, or jurisdiction...'
                }
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-brand-light-bg border border-brand-light-border text-xs sm:text-sm text-brand-dark placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {[
                { id: 'all', labelEn: 'All Ranks', labelUr: 'تمام افسران' },
                { id: 'command', labelEn: 'Senior Command', labelUr: 'سینئر کمانڈ' },
                { id: 'traffic-hq', labelEn: 'Traffic HQ', labelUr: 'ٹریفک ہیڈکوارٹر' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedBranch(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    selectedBranch === tab.id
                      ? 'bg-brand-blue text-white shadow-sm'
                      : 'bg-brand-light-bg text-slate-600 hover:text-brand-dark hover:bg-slate-200/70 border border-brand-light-border'
                  }`}
                >
                  {language === 'ur' ? tab.labelUr : tab.labelEn}
                </button>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Officers Grid */}
      <section className="py-14 sm:py-20 bg-brand-light-bg">
        <PageContainer>
          {filteredOfficers.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-brand-light-border p-8 max-w-md mx-auto space-y-3">
              <Users className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-lg font-bold text-brand-dark">
                {language === 'ur' ? 'کوئی افسر نہیں ملا' : 'No Officers Found'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'ur'
                  ? 'برائے مہربانی تلاش کا لفظ تبدیل کریں یا تمام رینکس کو منتخب کریں۔'
                  : 'Please adjust your search criteria or switch back to All Ranks.'}
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedBranch('all');
                }}
                className="px-4 py-2 rounded-full bg-brand-blue text-white text-xs font-bold hover:bg-brand-blue-600"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredOfficers.map((officer) => (
                <div
                  key={officer.id}
                  className="group rounded-3xl bg-brand-light-surface border border-brand-light-border hover:border-brand-blue-300 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Official Portrait Frame */}
                    <div className="relative aspect-square overflow-hidden bg-slate-900">
                      <img
                        src={officer.image}
                        alt={language === 'ur' ? officer.nameUr : officer.nameEn}
                        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                          officer.id === 'dpo-abbottabad' ? 'object-[50%_25%]' : 'object-top'
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                      {/* Branch Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-lime text-brand-dark shadow-sm">
                          {language === 'ur' ? officer.branchLabelUr : officer.branchLabelEn}
                        </span>
                      </div>

                      {/* Rank tag at base of photo */}
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <div className="text-[11px] font-semibold text-brand-lime">
                          {language === 'ur' ? officer.rankUr : officer.rankEn}
                        </div>
                      </div>
                    </div>

                    {/* Officer Details */}
                    <div className="p-5 space-y-3">
                      <div>
                        <h3 className="font-bold text-base sm:text-lg text-brand-dark group-hover:text-brand-blue transition-colors">
                          {language === 'ur' ? officer.nameUr : officer.nameEn}
                        </h3>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {language === 'ur' ? officer.designationUr : officer.designationEn}
                        </p>
                      </div>

                      {/* Responsibility Area */}
                      <div className="pt-2 border-t border-slate-100 flex items-start gap-1.5 text-xs text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-brand-blue shrink-0 mt-0.5" />
                        <span className="leading-snug">
                          {language === 'ur' ? officer.areaUr : officer.areaEn}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="px-5 pb-5">
                    {officer.id === 'ssp-traffic' ? (
                      <Link
                        to="/about/officers-message"
                        className="w-full py-2.5 rounded-xl bg-brand-blue text-white text-xs font-bold hover:bg-brand-blue-600 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <span>{language === 'ur' ? 'افسر کا پیغام پڑھیں' : "Read Officer's Message"}</span>
                        <ChevronRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                      </Link>
                    ) : (
                      <div className="py-2 px-3 rounded-xl bg-brand-light-bg border border-brand-light-border text-center text-[11px] font-semibold text-slate-600">
                        {language === 'ur' ? 'ٹریفک وارڈن ایبٹ آباد' : 'Traffic Warden Abbottabad'}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Notice Banner */}
          <div className="mt-12 p-6 rounded-3xl bg-white border border-brand-light-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-blue-50 text-brand-blue flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-brand-dark">
                  {language === 'ur' ? 'ضلعی ہیڈکوارٹر سے رابطہ' : 'Need to reach a specific branch?'}
                </h4>
                <p className="text-xs text-slate-500">
                  {language === 'ur'
                    ? 'کنٹرول روم اور فیلڈ سیکٹر افسران سے فوری رابطے کے لیے ہیلپ لائن 1915 ڈائل کریں۔'
                    : 'Dial traffic emergency helpline 1915 or reach District Traffic Police Headquarters.'}
                </p>
              </div>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-blue text-white font-bold text-xs hover:bg-brand-blue-600 transition-colors shrink-0"
            >
              <span>{language === 'ur' ? 'رابطہ کی تفصیلات' : 'Contact Headquarters'}</span>
            </Link>
          </div>
        </PageContainer>
      </section>
    </div>
  );
};

export default Officers;
