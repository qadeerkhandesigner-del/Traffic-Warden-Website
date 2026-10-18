import React, { useEffect } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { useLanguage } from '../hooks/useLanguage';
import {
  CheckCircle2,
  FileText,
  Stethoscope,
  Receipt,
  Ticket,
  IdCard,
  Car,
  Fingerprint,
  ShieldCheck,
  AlertTriangle,
  BookOpen,
  ImageIcon,
  MapPin,
  Phone,
  Clock,
} from 'lucide-react';

export const NewDrivingLicense: React.FC = () => {
  const { language } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ur'
        ? 'نیا ڈرائیونگ لائسنس | ٹریفک وارڈن ایبٹ آباد'
        : 'New Driving License | Traffic Warden Abbottabad';
  }, [language]);

  const steps = [
    {
      id: 1,
      number: 1,
      icon: FileText,
      titleEn: 'Visit the Branch with Required Documents',
      titleUr: 'ضروری دستاویزات کے ساتھ برانچ پر آئیں',
      descEn: 'Bring your original Computerized National Identity Card (CNIC) along with one photocopy.',
      descUr: 'اپنا اصل کمپیوٹرائزڈ قومی شناختی کارڈ (CNIC) ایک فوٹوکاپی کے ساتھ ساتھ لائیں۔',
    },
    {
      id: 2,
      number: 2,
      icon: Stethoscope,
      titleEn: 'Medical Examination',
      titleUr: 'مڈیکل معائنہ',
      descEn: 'First, visit the doctor\'s room located within the License Branch for the required medical examination, including an eyesight test. After receiving medical clearance, you will be directed to the License Clerk\'s office.',
      descUr: 'سب سے پہلے، لائسنس برانچ کے اندر واقع ڈاکٹر کے کمرے میں ضروری مڈیکل معائنہ کے لیے جائیں، جس میں نظر کا ٹیسٹ شامل ہے۔ مڈیکل کلئیرنس ملنے کے بعد، آپ کو لائسنس کلرک کے دفتر تک رہنما کیا جائے گا۔',
    },
    {
      id: 3,
      number: 3,
      icon: Receipt,
      titleEn: 'Learner Permit Fee',
      titleUr: 'لرنر پرمٹ فیس',
      descEn: 'Visit the License Clerk\'s office to obtain the prescribed fee details for the learner permit. Proceed to the A2Z Cash Counter, pay the required fee, and collect your receipt.',
      descUr: 'لائسنس کلرک کے دفتر میں لرنر پرمٹ کی مقررہ فیس کی تفصیلات حاصل کریں۔ A2Z کیش کاونٹر پر ضروری فیس ادا کریں اور رسید حاصل کریں۔',
    },
    {
      id: 4,
      number: 4,
      icon: Ticket,
      titleEn: 'Token Issuance and Data Entry',
      titleUr: 'ٹوکن جاری کرنا اور ڈیٹا انٹری',
      descEn: 'Bring your payment receipt to the main License Branch hall, where you will be issued a token. Wait in the designated waiting area until your token number is called. When your number is announced, proceed to the relevant desk, where your personal information will be entered into the system and your photograph will be taken.',
      descUr: 'اپنی ادائیگی کی رسید لے کر لائسنس برانچ کے مین ہال میں آئیں، جہاں آپ کو ٹوکن جاری کیا جائے گا۔ مختص انتظار کی جگہ پر انتظار کریں جب تک آپ کا ٹوکن نمبر بلایا نہ جائے۔ جب آپ کا نمبر اعلان ہو، تو متعلقہ ڈیسک پر جائیں، جہاں آپ کی ذاتی معلومات سسٹم میں انٹر کی جائیں گی اور آپ کی تصویر لی جائے گی۔',
    },
    {
      id: 5,
      number: 5,
      icon: IdCard,
      titleEn: 'Issuance of Learner Permit',
      titleUr: 'لرنر پرمٹ کی اجرائی',
      descEn: 'After completing the data entry process, collect your learner permit from the designated counter.',
      descUr: 'ڈیٹا انٹری کی عمل مکمل ہونے کے بعد، مختص کاونٹر سے اپنا لرنر پرمٹ حاصل کریں۔',
    },
    {
      id: 6,
      number: 6,
      icon: CheckCircle2,
      titleEn: 'Return After 42 Days',
      titleUr: '42 دن بعد واپس آئیں',
      descEn: 'After 42 days from the issuance of your learner permit, visit the License Branch again with one photocopy of your CNIC, provided this waiting period applies to your requested license category.',
      descUr: 'اپنے لرنر پرمٹ کی اجرائی کے 42 دن بعد، دوبارہ لائسنس برانچ آئیں اپنے CNIC کی ایک فوٹوکاپی کے ساتھ، اگر یہ انتظار کا دور آپ کی مطلوبہ لائسنس کی زمرہ پر لاگو ہوتا ہے۔',
    },
    {
      id: 7,
      number: 7,
      icon: FileText,
      titleEn: 'Medical Examination and Test Page Fee',
      titleUr: 'مڈیکل معائنہ اور ٹیسٹ پیج فیس',
      descEn: 'Complete the required medical examination at the branch. Ask the relevant staff member to provide the prescribed test page fee details, then pay the fee at the designated cash counter. Keep your payment receipt safe.',
      descUr: 'برانچ پر ضروری مڈیکل معائنہ مکمل کریں۔ متعلقہ عملے سے ٹیسٹ پیج کی مقررہ فیس کی تفصیلات پوچھیں، پھر مختص کیش کاونٹر پر فیس ادا کریں۔ اپنی ادائیگی کی رسید محفوظ رکھیں۔',
    },
    {
      id: 8,
      number: 8,
      icon: BookOpen,
      titleEn: 'Theory Test',
      titleUr: 'ثیوری ٹیسٹ',
      descEn: 'Follow the instructions provided and proceed to the theory test desk with your receipt and other required documents. You will be assessed on traffic rules, road signs, and related knowledge.',
      descUr: 'فراہم کی گئی ہدایات کی پیروی کریں اور اپنی رسید اور دیگر ضروری دستاویزات کے ساتھ ثیوری ٹیسٹ ڈیسک پر جائیں۔ آپ کا جائزہ ٹریفک قوانین، سڑک کے اشارے، اور متعلقہ علم کی بنیاد پر لیا جائے گا۔',
    },
    {
      id: 9,
      number: 9,
      icon: Car,
      titleEn: 'Practical Driving Test',
      titleUr: 'عملی ڈرائیونگ ٹیسٹ',
      descEn: 'After passing the theory test, obtain your test page and proceed to the driving test ground for your practical driving test.',
      descUr: 'ثیوری ٹیسٹ پاس کرنے کے بعد، اپنا ٹیسٹ پیج حاصل کریں اور ڈرائیونگ ٹیسٹ گراؤنڈ پر اپنی عملی ڈرائیونگ ٹیسٹ کے لیے جائیں۔',
    },
    {
      id: 10,
      number: 10,
      icon: Receipt,
      titleEn: 'Document Verification and Final Fee',
      titleUr: 'دستاویزات کی توثیق اور آخری فیس',
      descEn: 'After passing the practical driving test, return to the License Clerk\'s office. Your documents will be checked, and you will be directed to the relevant counter to pay the final driving license fee.',
      descUr: 'عملی ڈرائیونگ ٹیسٹ پاس کرنے کے بعد، لائسنس کلرک کے دفتر میں واپس آئیں۔ آپ کے دستاویزات چیک کیے جائیں گے، اور آپ کو آخری ڈرائیونگ لائسنس فیس ادا کرنے کے لیے متعلقہ کاونٹر پر رہنمائی کی جائے گی۔',
    },
    {
      id: 11,
      number: 11,
      icon: Fingerprint,
      titleEn: 'Biometric Verification and Signature Scanning',
      titleUr: 'بائیومیٹرک توثیق اور سگنچر اسکیننگ',
      descEn: 'After paying the final fee, proceed to the main License Branch hall for biometric verification, fingerprint scanning, signature capture, and scanning of any other required information.',
      descUr: 'اخیر فیس ادا کرنے کے بعد، لائسنس برانچ کے مین ہال میں بائیومیٹرک توثیق، انگوٹے کے نشان، سگنچر کی captura، اور دیگر مطلوبہ معلومات کی اسکیننگ کے لیے جائیں۔',
    },
    {
      id: 12,
      number: 12,
      icon: ShieldCheck,
      titleEn: 'Issuance of Driving License',
      titleUr: 'ڈرائیونگ لائسنس کی اجرائی',
      descEn: 'Once all required procedures have been completed successfully, your driving license will be issued. Follow the branch\'s instructions regarding license collection or delivery.',
      descUr: 'جب تمام ضروری عمل کامیابی سے مکمل ہو جائیں گے، تو آپ کا ڈرائیونگ لائسنس جاری کر دیا جائے گا۔ لائسنس حاصل کرنے یا ڈیلیوری کے بارے میں برانچ کی ہدایات کی پیروی کریں۔',
    },
  ];

  const importantInstructions = [
    {
      icon: FileText,
      textEn: 'Always bring your original CNIC and the required photocopies.',
      textUr: 'ہمیشہ اپنا اصل CNIC اور ضروری فوٹوکاپیاں ساتھ لائیں۔',
    },
    {
      icon: Receipt,
      textEn: 'Keep all payment receipts safe until the process is completed.',
      textUr: 'تمام ادائیگی کی رسیدیں محفوظ رکھیں جب تک عمل مکمل نہ ہو جائے۔',
    },
    {
      icon: Ticket,
      textEn: 'Remain in the designated waiting area until your token number is called.',
      textUr: 'مختص انتظار کی جگہ پر رہیں جب تک آپ کا ٹوکن نمبر بلایا نہ جائے۔',
    },
    {
      icon: BookOpen,
      textEn: 'Prepare thoroughly for both the theory and practical driving tests.',
      textUr: 'ثیوری اور عملی ڈرائیونگ ٹیسٹ دونوں کے لیے اچھی طرح تیاری کریں۔',
    },
    {
      icon: AlertTriangle,
      textEn: 'Confirm the latest fees, required documents, eligibility criteria, and test procedures with the License Branch before visiting.',
      textUr: 'بھیت کرنے سے پہلے لائسنس برانچ سے تازہ ترین فیس، ضروری دستاویزات، اہلیت کے معیار، اور ٹیسٹ کی إجراءات کی تصدیق کر لیں۔',
    },
  ];

  return (
    <div className="space-y-0 text-brand-dark bg-brand-light-bg min-h-screen overflow-x-hidden">
      {/* Hero Header */}
      <section className="relative bg-[#000080] text-white pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-[#0000aa] overflow-hidden">
        <div className="absolute inset-0 gov-subtle-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/30 rounded-full blur-3xl pointer-events-none" />

        <PageContainer className="relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Home', labelUrdu: 'صفحۂ اول', path: '/' },
              { label: 'Services', labelUrdu: 'خدمات', path: '/services' },
              { label: 'Driving License Services', labelUrdu: 'ڈرائیونگ لائسنس سروسز', path: '/services/driving-license' },
              { label: 'New Driving License', labelUrdu: 'نیا ڈرائیونگ لائسنس', path: '/services/driving-license/new' },
            ]}
            className="mb-4 text-white/80 [&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
          />

          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lime/15 text-brand-lime border border-brand-lime/30 text-xs font-bold uppercase tracking-wider">
              <IdCard className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'نیا ڈرائیونگ لائسنس' : 'NEW DRIVING LICENSE'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {language === 'ur' ? 'نیا ڈرائیونگ لائسنس — مکمل عمل' : 'NEW DRIVING LICENSE — COMPLETE PROCEDURE'}
            </h1>
            <p className="text-white/85 text-sm sm:text-base leading-relaxed">
              {language === 'ur'
                ? 'ایبٹ آباد ڈرائیونگ لائسنس برانچ میں نئے ڈرائیونگ لائسنس حاصل کرنے کے لیے مکمل عمل درج ذیل ہے۔'
                : 'Complete step-by-step procedure for obtaining a new driving license at the Abbottabad Driving License Branch.'}
            </p>
          </div>
        </PageContainer>
      </section>

      {/* Main License Branch Image */}
      <section className="py-12 bg-brand-light-bg">
        <PageContainer>
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden border border-brand-light-border shadow-xl">
              <img
                src="/License Branch image/main building image license branch.jpg"
                alt={language === 'ur' ? 'لائسنس برانچ ایبٹ آباد' : 'License Branch Abbottabad'}
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-center">
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                  {language === 'ur' ? 'لائسنس برانچ ایبٹ آباد' : 'License Branch Abbottabad'}
                </h2>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* License Branch Gallery */}
      <section className="py-12 bg-brand-light-surface border-y border-brand-light-border">
        <PageContainer>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider mb-3">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>{language === 'ur' ? 'لائسنس برانچ گیلری' : 'LICENSE BRANCH GALLERY'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-brand-dark tracking-tight">
                {language === 'ur' ? 'لائسنس برانچ کی تصاویر' : 'License Branch Images'}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  src: '/License Branch image/license branch image 01.jpg',
                  alt: language === 'ur' ? 'لائسنس برانچ کی تصویر 1' : 'License Branch Image 1',
                },
                {
                  src: '/License Branch image/license branch image 02.jpg',
                  alt: language === 'ur' ? 'لائسنس برانچ کی تصویر 2' : 'License Branch Image 2',
                },
                {
                  src: '/License Branch image/license branch image 03.jpg.jpg',
                  alt: language === 'ur' ? 'لائسنس برانچ کی تصویر 3' : 'License Branch Image 3',
                },
              ].map((img, index) => (
                <div key={index} className="relative group rounded-xl overflow-hidden border border-brand-light-border hover:shadow-lg transition-all duration-300">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <span className="text-white text-sm font-medium w-full text-center">
                      {language === 'ur' ? 'لائسنس برانچ' : 'License Branch'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Branch Address/Location */}
      <section className="py-12 bg-brand-light-bg border-b border-brand-light-border">
        <PageContainer>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl border border-brand-light-border p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-brand-blue-50 text-brand-blue flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-brand-dark">
                    {language === 'ur' ? 'برنچ کا پتہ اور رابطہ' : 'Branch Address & Contact'}
                  </h3>
<p className="text-sm text-slate-600">
                      {language === 'ur' ? 'ڈرائیونگ لائسنس برانچ، جی پی او آفس کے سامنے، اے ڈی سی جنرل آفس کے قریب، ایبٹ آباد۔' : 'Driving License Branch, Infront of GPO Office Near ADC General Office, Abbottabad.'}
                    </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex items-start gap-3 p-4 bg-brand-blue-50 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-brand-blue text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-brand-dark text-sm">
                      {language === 'ur' ? 'پتہ' : 'Address'}
                    </h4>
                    <p className="text-sm text-slate-600 mt-1">
                      {language === 'ur'
                        ? 'ڈرائیونگ لائسنس برانچ، جی پی او آفس کے سامنے، اے ڈی سی جنرل آفس کے قریب، ایبٹ آباد۔'
                        : 'Driving License Branch, Infront of GPO Office Near ADC General Office, Abbottabad.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-brand-blue-50 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-brand-blue text-white flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-brand-dark text-sm">
                      {language === 'ur' ? 'ہیلپ لائن' : 'Helpline'}
                    </h4>
                    <p className="text-sm text-slate-600 mt-1">
                      <a href="tel:1915" className="text-brand-blue hover:underline">1915</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-brand-blue-50 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-brand-blue text-white flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-brand-dark text-sm">
                      {language === 'ur' ? 'کام کے اوقات' : 'Working Hours'}
                    </h4>
                    <p className="text-sm text-slate-600 mt-1">
                      {language === 'ur'
                        ? 'پیر سے جمعہ: صبح ۹ بجے سے شام ۵ بجے، بریک: دوپہر ۱۲:۴۵ سے ۱:۴۵'
                        : 'Monday to Friday: 9:00 AM - 5:00 PM, Break: 12:45 PM - 1:45 PM'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Procedure Steps */}
      <section className="py-16 sm:py-20 bg-brand-light-surface">
        <PageContainer>
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Section Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                <span>{language === 'ur' ? 'درخواست کا عمل' : 'APPLICATION PROCEDURE'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight">
                {language === 'ur' ? 'ڈرائیونگ لائسنس حاصل کرنے کا مکمل عمل' : 'Complete Procedure for Obtaining a Driving License'}
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-2xl mx-auto">
                {language === 'ur'
                  ? 'ہمارے تمام شہریوں کو خوش آمدید کہتے ہیں جو ایبٹ آباد ڈرائیونگ لائسنس برانچ آئے ہیں۔ لائسنس حاصل کرنے کے لیے درج ذیل مراحل کی پیروی کریں۔'
                  : 'We warmly welcome all citizens visiting the Abbottabad Driving License Branch. Please follow the steps below to obtain your driving license.'}
              </p>
            </div>

            {/* Steps Timeline */}
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className="relative group flex gap-5 sm:gap-6 pb-8 last:pb-0"
                >
                  {/* Timeline Line */}
                  <div className="absolute start-[19px] top-0 bottom-0 w-0.5 bg-brand-light-border" aria-hidden="true">
                    {index < steps.length - 1 && (
                      <div className="absolute top-8 h-full w-full bg-brand-lime/30" />
                    )}
                  </div>

                  {/* Step Number Circle */}
                  <div className="relative flex-shrink-0 w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-lg z-10 shadow-lg border-4 border-white">
                    {step.number}
                  </div>

                  {/* Step Content */}
                  <div className="min-w-0 flex-1 bg-white rounded-2xl border border-brand-light-border p-5 sm:p-6 hover:border-brand-blue-300 hover:shadow-lg transition-all duration-300 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-blue-50 text-brand-blue flex items-center justify-center shrink-0 mt-0.5">
                        <step.icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-bold text-brand-dark">
                          {language === 'ur' ? step.titleUr : step.titleEn}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed sm:ps-[3.25rem]">
                      {language === 'ur' ? step.descUr : step.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Important Instructions */}
      <section className="py-16 sm:py-20 bg-brand-light-bg border-t border-brand-light-border">
        <PageContainer>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-100 text-xs font-semibold uppercase tracking-wider mb-3">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{language === 'ur' ? 'اہم ہدایات' : 'IMPORTANT INSTRUCTIONS'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
                {language === 'ur' ? 'اہم ہدایات' : 'Important Instructions'}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {importantInstructions.map((instruction, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-brand-light-border p-5 hover:border-red-200 hover:shadow-md transition-all duration-300 flex gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                    <instruction.icon className="w-5 h-5" />
                  </div>
                  <p className="min-w-0 flex-1 break-words text-sm text-slate-700 leading-relaxed">
                    {language === 'ur' ? instruction.textUr : instruction.textEn}
                  </p>
                </div>
              ))}
            </div>

            {/* Contact/Help Box */}
            <div className="mt-10 p-6 sm:p-8 bg-brand-blue-50 border border-brand-blue-100 rounded-3xl text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-blue text-white flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-brand-lime" />
                </div>
                <h3 className="text-lg font-bold text-brand-dark">
                  {language === 'ur' ? 'مدد کی ضرورت ہے؟' : 'Need Assistance?'}
                </h3>
              </div>
              <p className="text-sm text-slate-600 max-w-xl mx-auto">
{language === 'ur'
                    ? 'لائسنس سے متعلق کسی بھی معلومات کے لیے لائسنس برینچ، ٹریفک پولیس ایبٹ آباد سے رابطہ کریں یا ہیلپ لائن 1915 پر کال کریں۔'
                    : 'For any license-related information, contact License Branch, Traffic Police Abbottabad, or call Helpline 1915.'}
              </p>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
};

export default NewDrivingLicense;