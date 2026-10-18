import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquareWarning,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Send,
  ChevronRight,
  Phone,
  Car,
  ParkingSquare,
  Siren,
  Users,
  AlertCircle,
  Loader2,
  RefreshCw,
  Upload,
  X,
  Info,
  ClipboardList,
  MapPin,
  Clock,
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { useLanguage } from '../hooks/useLanguage';
import { Card, CardContent } from '../components/ui/Card';

// ─── Types ────────────────────────────────────────────────────────────────────
interface ComplaintFormData {
  category: string;
  subCategory: string;
  complainantName: string;
  cnic: string;
  phone: string;
  email: string;
  incidentDate: string;
  incidentTime: string;
  location: string;
  description: string;
  vehicleNumber: string;
  acknowledgement: boolean;
}

interface ComplaintCategory {
  id: string;
  labelEn: string;
  labelUr: string;
  icon: React.ElementType;
  subCategories: { id: string; labelEn: string; labelUr: string }[];
}

// ─── Complaint Categories ──────────────────────────────────────────────────
const COMPLAINT_CATEGORIES: ComplaintCategory[] = [
  {
    id: 'traffic-violation',
    labelEn: 'Traffic Rule Violation',
    labelUr: 'ٹریفک قوانین کی خلاف ورزی',
    icon: Car,
    subCategories: [
      { id: 'signal-jump', labelEn: 'Signal Jumping', labelUr: 'سگنل توڑنا' },
      { id: 'wrong-side', labelEn: 'Wrong-Side Driving', labelUr: 'غلط سمت گاڑی چلانا' },
      { id: 'over-speeding', labelEn: 'Over-Speeding', labelUr: 'تیز رفتاری' },
      { id: 'no-seatbelt', labelEn: 'No Seat Belt / Helmet', labelUr: 'سیٹ بیلٹ / ہیلمیٹ نہ پہننا' },
      { id: 'overloading', labelEn: 'Vehicle Overloading', labelUr: 'گاڑی پر اضافی بوجھ' },
    ],
  },
  {
    id: 'illegal-parking',
    labelEn: 'Illegal Parking',
    labelUr: 'غیر قانونی پارکنگ',
    icon: ParkingSquare,
    subCategories: [
      { id: 'no-parking-zone', labelEn: 'Parking in No-Parking Zone', labelUr: 'نو پارکنگ زون میں پارکنگ' },
      { id: 'footpath-block', labelEn: 'Footpath Blockage', labelUr: 'فٹ پاتھ بند کرنا' },
      { id: 'hospital-block', labelEn: 'Hospital / Emergency Access Block', labelUr: 'ہسپتال / ایمرجنسی رسائی رکاوٹ' },
      { id: 'commercial-block', labelEn: 'Road Blocked by Commercial Activity', labelUr: 'کاروباری سرگرمی سے سڑک بند' },
    ],
  },
  {
    id: 'warden-complaint',
    labelEn: 'Complaint Against Warden',
    labelUr: 'وارڈن کے خلاف شکایت',
    icon: Users,
    subCategories: [
      { id: 'bribery', labelEn: 'Bribery / Corruption', labelUr: 'رشوت / بدعنوانی' },
      { id: 'misconduct', labelEn: 'Misconduct / Rude Behaviour', labelUr: 'بدتمیزی / بدسلوکی' },
      { id: 'unfair-challan', labelEn: 'Unfair Challan / False Case', labelUr: 'ناجائز چالان / جھوٹا کیس' },
      { id: 'negligence', labelEn: 'Negligence of Duty', labelUr: 'فرائض میں غفلت' },
    ],
  },
  {
    id: 'road-hazard',
    labelEn: 'Road Hazard / Infrastructure',
    labelUr: 'سڑک کا خطرہ / بنیادی ڈھانچہ',
    icon: AlertTriangle,
    subCategories: [
      { id: 'pothole', labelEn: 'Pothole / Damaged Road', labelUr: 'گڑھا / خراب سڑک' },
      { id: 'broken-signal', labelEn: 'Non-Functional Traffic Signal', labelUr: 'خراب ٹریفک سگنل' },
      { id: 'no-signage', labelEn: 'Missing / Damaged Road Signs', labelUr: 'غائب / خراب سائن بورڈ' },
      { id: 'flooding', labelEn: 'Waterlogging / Flooding on Road', labelUr: 'سڑک پر پانی کا جمع ہونا' },
    ],
  },
  {
    id: 'emergency',
    labelEn: 'Emergency / Accident Report',
    labelUr: 'ہنگامی صورتحال / حادثہ',
    icon: Siren,
    subCategories: [
      { id: 'accident', labelEn: 'Road Accident', labelUr: 'سڑک حادثہ' },
      { id: 'hit-run', labelEn: 'Hit & Run Case', labelUr: 'ٹکر مار کر فرار' },
      { id: 'abandoned-vehicle', labelEn: 'Abandoned Vehicle Blocking Road', labelUr: 'سڑک بند کرنے والی گاڑی' },
    ],
  },
  {
    id: 'other',
    labelEn: 'Other / General Feedback',
    labelUr: 'دیگر / عمومی تاثرات',
    icon: MessageSquareWarning,
    subCategories: [
      { id: 'suggestion', labelEn: 'Suggestion / Improvement Idea', labelUr: 'تجویز / بہتری کا خیال' },
      { id: 'appreciation', labelEn: 'Appreciation / Positive Feedback', labelUr: 'تعریف / مثبت تاثرات' },
      { id: 'other-issue', labelEn: 'Other Issue', labelUr: 'دیگر مسئلہ' },
    ],
  },
];

const EMPTY_FORM: ComplaintFormData = {
  category: '',
  subCategory: '',
  complainantName: '',
  cnic: '',
  phone: '',
  email: '',
  incidentDate: '',
  incidentTime: '',
  location: '',
  description: '',
  vehicleNumber: '',
  acknowledgement: false,
};

function generateTicketId(): string {
  const prefix = 'TW-ATD';
  const date = new Date();
  const yy = String(date.getFullYear()).slice(2);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}-${yy}${mm}${dd}-${rand}`;
}

export const OnlineComplaint: React.FC = () => {
  const { language, isRTL, t } = useLanguage();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState<ComplaintFormData>(EMPTY_FORM);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof ComplaintFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = t(
      'Online Complaint | Traffic Warden Abbottabad — Khyber Pakhtunkhwa Police',
      'آن لائن شکایت | ٹریفک وارڈن ایبٹ آباد — خیبر پختونخوا پولیس'
    );
  }, [language, t]);

  const selectedCategory = COMPLAINT_CATEGORIES.find((c) => c.id === form.category);

  const validateStep1 = (): boolean => {
    const e: Partial<Record<keyof ComplaintFormData, string>> = {};
    if (!form.category) e.category = 'required';
    if (!form.subCategory) e.subCategory = 'required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = (): boolean => {
    const e: Partial<Record<keyof ComplaintFormData, string>> = {};
    if (!form.complainantName.trim()) e.complainantName = 'required';
    if (!form.phone.trim()) e.phone = 'required';
    else if (!/^[0-9+\-\s]{10,15}$/.test(form.phone)) e.phone = 'invalid';
    if (form.cnic && form.cnic.replace(/\D/g, '').length !== 13) e.cnic = 'invalid';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'invalid';
    if (!form.incidentDate) e.incidentDate = 'required';
    if (!form.location.trim()) e.location = 'required';
    if (!form.description.trim() || form.description.trim().length < 30) e.description = 'required';
    if (!form.acknowledgement) e.acknowledgement = 'required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const scrollTop = () => setTimeout(() => formTopRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);

  const goNext = () => {
    if (step === 1 && validateStep1()) { setStep(2); scrollTop(); }
    else if (step === 2 && validateStep2()) { handleSubmit(); }
  };

  const goBack = () => { if (step === 2) { setStep(1); scrollTop(); } };

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1800));
    setTicketId(generateTicketId());
    setStep(3);
    setSubmitting(false);
    scrollTop();
  };

  const handleReset = () => {
    setForm(EMPTY_FORM);
    setAttachments([]);
    setErrors({});
    setTicketId('');
    setStep(1);
    scrollTop();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).slice(0, 3 - attachments.length);
    setAttachments((prev) => [...prev, ...files].slice(0, 3));
    e.target.value = '';
  };

  const removeFile = (idx: number) => setAttachments((prev) => prev.filter((_, i) => i !== idx));

  const setField = (key: keyof ComplaintFormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value, ...(key === 'category' ? { subCategory: '' } : {}) }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const showError = (key: keyof ComplaintFormData) => {
    const code = errors[key];
    if (!code) return null;
    const msgs: Record<string, { en: string; ur: string }> = {
      required: { en: 'This field is required.', ur: 'یہ فیلڈ ضروری ہے۔' },
      invalid: { en: 'Please enter a valid value.', ur: 'درست قدر درج کریں۔' },
    };
    return <p className="mt-1 text-xs text-red-600">{language === 'ur' ? msgs[code]?.ur : msgs[code]?.en}</p>;
  };

  const inputCls = (key: keyof ComplaintFormData) =>
    `w-full rounded-lg border px-4 py-2.5 text-sm text-brand-dark bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-all ${
      errors[key] ? 'border-red-400 bg-red-50' : 'border-brand-light-border'
    }`;

  const steps = [
    { n: 1, en: 'Category', ur: 'زمرہ' },
    { n: 2, en: 'Details', ur: 'تفصیلات' },
    { n: 3, en: 'Submitted', ur: 'جمع شد' },
  ];

  return (
    <div className="space-y-0 text-brand-dark bg-brand-light-bg min-h-screen overflow-x-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Header */}
      <section className="relative bg-[#000080] text-white pt-8 pb-14 border-b border-[#0000aa] overflow-hidden">
        <div className="absolute inset-0 gov-subtle-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/30 rounded-full blur-3xl pointer-events-none" />

        <PageContainer className="relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Services', labelUrdu: 'خدمات', path: '/services' },
              { label: 'Online Complaint', labelUrdu: 'آن لائن شکایت', path: '/online-complaint' },
            ]}
            className="mb-4 text-white/80 [&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
          />

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lime/15 text-brand-lime border border-brand-lime/30 text-xs font-bold uppercase tracking-wider">
              <MessageSquareWarning className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'شہری سہولت' : 'CITIZEN FACILITATION'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {language === 'ur' ? 'آن لائن شکایت پورٹل' : 'ONLINE COMPLAINT PORTAL'}
            </h1>
            <p className="text-white/85 text-sm sm:text-base leading-relaxed">
              {language === 'ur'
                ? 'ٹریفک پولیس ایبٹ آباد کو اپنی شکایت، تجویز یا رپورٹ آن لائن بھیجیں۔ ہم ہر درخواست کا جائزہ لیتے ہیں۔'
                : 'Submit your complaint, suggestion, or incident report to Traffic Warden Abbottabad. Every submission is reviewed by our team.'}
            </p>
          </div>
        </PageContainer>
      </section>

      {/* Stats strip */}
      <div className="bg-brand-light-bg border-b border-brand-light-border">
        <PageContainer>
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-brand-light-border py-5">
            {[
              { icon: ClipboardList, en: '24–48 hr', ur: '24–48 گھنٹے', sub_en: 'Response Time', sub_ur: 'جوابی وقت' },
              { icon: ShieldCheck, en: '100%', ur: '۱۰۰٪', sub_en: 'Confidential', sub_ur: 'خفیہ' },
              { icon: Clock, en: '24/7', ur: '24/7', sub_en: 'Portal Open', sub_ur: 'پورٹل دستیاب' },
              { icon: Phone, en: '1915', ur: '1915', sub_en: 'Helpline', sub_ur: 'ہیلپ لائن' },
            ].map((s, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-center gap-2 px-4 py-2">
                <s.icon className="w-5 h-5 text-brand-blue shrink-0" />
                <div className="text-center sm:text-left">
                  <div className="text-base font-extrabold text-brand-blue">{language === 'ur' ? s.ur : s.en}</div>
                  <div className="text-xs text-slate-500">{language === 'ur' ? s.sub_ur : s.sub_en}</div>
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </div>

      {/* Main */}
      <section className="py-10 bg-slate-50">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* Form column */}
            <div className="lg:col-span-2" ref={formTopRef}>
              {/* Step indicator */}
              <div className="mb-6 flex items-center gap-0">
                {steps.map((s, idx) => (
                  <React.Fragment key={s.n}>
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                        step > s.n ? 'bg-brand-lime text-brand-dark' : step === s.n ? 'bg-brand-blue text-white ring-4 ring-brand-blue/20' : 'bg-slate-200 text-slate-500'
                      }`}>
                        {step > s.n ? <CheckCircle2 className="w-4 h-4" /> : s.n}
                      </div>
                      <span className={`mt-1 text-xs font-semibold hidden sm:block ${step === s.n ? 'text-brand-blue' : step > s.n ? 'text-brand-lime' : 'text-slate-400'}`}>
                        {language === 'ur' ? s.ur : s.en}
                      </span>
                    </div>
                    {idx < steps.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-2 transition-all duration-500 ${step > s.n ? 'bg-brand-lime' : 'bg-slate-200'}`} />
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="bg-white rounded-2xl border border-brand-light-border shadow-sm overflow-hidden">

                {/* STEP 1 */}
                {step === 1 && (
                  <div className="p-6 sm:p-8 space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-brand-dark">{language === 'ur' ? 'شکایت کی قسم منتخب کریں' : 'Select Complaint Category'}</h2>
                      <p className="text-sm text-slate-500 mt-1">{language === 'ur' ? 'اپنی شکایت سے متعلق زمرہ منتخب کریں' : 'Choose the category that best describes your complaint'}</p>
                    </div>

                    {errors.category && (
                      <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-xs text-red-600">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {language === 'ur' ? 'براہ کرم ایک زمرہ منتخب کریں۔' : 'Please select a category.'}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {COMPLAINT_CATEGORIES.map((cat) => {
                        const Icon = cat.icon;
                        const selected = form.category === cat.id;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setField('category', cat.id)}
                            className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200 hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-brand-blue/40 ${
                              selected ? 'border-brand-blue bg-brand-blue/5 shadow-md' : 'border-brand-light-border bg-white hover:border-brand-blue/40 hover:bg-slate-50'
                            }`}
                          >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${selected ? 'bg-brand-blue text-white' : 'bg-slate-100 text-slate-500'}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold text-brand-dark">{language === 'ur' ? cat.labelUr : cat.labelEn}</div>
                              <div className="text-xs text-slate-400 mt-0.5">{cat.subCategories.length} {language === 'ur' ? 'ذیلی اقسام' : 'sub-types'}</div>
                            </div>
                            {selected && <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />}
                          </button>
                        );
                      })}
                    </div>

                    {selectedCategory && (
                      <div className="space-y-2">
                        <span className="block text-sm font-semibold text-brand-dark" id="complaint-subcategory-caption">
                          {language === 'ur' ? 'ذیلی قسم منتخب کریں' : 'Select Sub-category'}<span className="text-red-500 ms-1">*</span>
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="group" aria-labelledby="complaint-subcategory-caption">
                          {selectedCategory.subCategories.map((sub) => {
                            const sel = form.subCategory === sub.id;
                            return (
                              <button
                                key={sub.id}
                                type="button"
                                onClick={() => { setForm((p) => ({ ...p, subCategory: sub.id })); setErrors((p) => ({ ...p, subCategory: undefined })); }}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm text-left transition-all ${
                                  sel ? 'border-brand-lime bg-brand-lime/10 text-brand-dark font-semibold' : 'border-brand-light-border bg-white text-slate-600 hover:border-brand-blue/40'
                                }`}
                              >
                                {sel && <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue shrink-0" />}
                                {language === 'ur' ? sub.labelUr : sub.labelEn}
                              </button>
                            );
                          })}
                        </div>
                        {errors.subCategory && <p className="text-xs text-red-600 mt-1">{language === 'ur' ? 'ذیلی قسم منتخب کریں۔' : 'Please select a sub-category.'}</p>}
                      </div>
                    )}

                    <div className="pt-2 flex justify-end">
                      <button type="button" onClick={goNext}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-brand-blue hover:bg-brand-blue/90 text-white text-sm font-bold transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-blue/40">
                        {language === 'ur' ? 'اگلا مرحلہ' : 'Next Step'}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <div className="p-6 sm:p-8 space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-brand-dark">{language === 'ur' ? 'شکایت کی تفصیلات' : 'Complaint Details'}</h2>
                      <p className="text-sm text-slate-500 mt-1">{language === 'ur' ? 'درست اور مکمل معلومات فراہم کریں' : 'Provide accurate and complete information'}</p>
                    </div>

                    {selectedCategory && (
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-slate-500">{language === 'ur' ? 'زمرہ:' : 'Category:'}</span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-semibold">
                          <selectedCategory.icon className="w-3.5 h-3.5" />
                          {language === 'ur' ? selectedCategory.labelUr : selectedCategory.labelEn}
                        </span>
                        <button type="button" onClick={goBack} className="text-xs text-brand-blue underline hover:text-brand-blue/80">
                          {language === 'ur' ? 'تبدیل کریں' : 'Change'}
                        </button>
                      </div>
                    )}

                    {/* Complainant info */}
                    <fieldset className="space-y-4">
                      <legend className="text-sm font-bold text-brand-dark border-b border-brand-light-border pb-2 w-full">
                        {language === 'ur' ? 'شکایت کنندہ کی معلومات' : 'Complainant Information'}
                      </legend>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="complaint-complainant-name" className="block text-xs font-semibold text-slate-600 mb-1">{language === 'ur' ? 'مکمل نام' : 'Full Name'}<span className="text-red-500 ms-1">*</span></label>
                          <input id="complaint-complainant-name" type="text" value={form.complainantName} onChange={(e) => setField('complainantName', e.target.value)} placeholder={language === 'ur' ? 'آپ کا مکمل نام' : 'Your full name'} className={inputCls('complainantName')} />
                          {showError('complainantName')}
                        </div>
                        <div>
                          <label htmlFor="complaint-phone" className="block text-xs font-semibold text-slate-600 mb-1">{language === 'ur' ? 'فون نمبر' : 'Phone Number'}<span className="text-red-500 ms-1">*</span></label>
                          <input id="complaint-phone" type="tel" value={form.phone} onChange={(e) => setField('phone', e.target.value)} placeholder={language === 'ur' ? 'مثلاً 03001234567' : 'e.g. 03001234567'} className={inputCls('phone')} />
                          {showError('phone')}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="complaint-cnic" className="block text-xs font-semibold text-slate-600 mb-1">{language === 'ur' ? 'قومی شناختی کارڈ (اختیاری)' : 'CNIC (Optional)'}</label>
                          <input id="complaint-cnic" type="text" value={form.cnic} onChange={(e) => setField('cnic', e.target.value)} placeholder="XXXXX-XXXXXXX-X" className={inputCls('cnic')} maxLength={15} />
                          {showError('cnic')}
                        </div>
                        <div>
                          <label htmlFor="complaint-email" className="block text-xs font-semibold text-slate-600 mb-1">{language === 'ur' ? 'ای میل (اختیاری)' : 'Email (Optional)'}</label>
                          <input id="complaint-email" type="email" value={form.email} onChange={(e) => setField('email', e.target.value)} placeholder="you@example.com" className={inputCls('email')} />
                          {showError('email')}
                        </div>
                      </div>
                    </fieldset>

                    {/* Incident info */}
                    <fieldset className="space-y-4">
                      <legend className="text-sm font-bold text-brand-dark border-b border-brand-light-border pb-2 w-full">
                        {language === 'ur' ? 'واقعے کی معلومات' : 'Incident Information'}
                      </legend>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="complaint-incident-date" className="block text-xs font-semibold text-slate-600 mb-1">{language === 'ur' ? 'واقعے کی تاریخ' : 'Incident Date'}<span className="text-red-500 ms-1">*</span></label>
                          <input id="complaint-incident-date" type="date" value={form.incidentDate} max={new Date().toISOString().split('T')[0]} onChange={(e) => setField('incidentDate', e.target.value)} className={inputCls('incidentDate')} />
                          {showError('incidentDate')}
                        </div>
                        <div>
                          <label htmlFor="complaint-incident-time" className="block text-xs font-semibold text-slate-600 mb-1">{language === 'ur' ? 'وقت (اختیاری)' : 'Approx. Time (Optional)'}</label>
                          <input id="complaint-incident-time" type="time" value={form.incidentTime} onChange={(e) => setField('incidentTime', e.target.value)} className={inputCls('incidentTime')} />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="complaint-location" className="block text-xs font-semibold text-slate-600 mb-1">
                          <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-brand-blue" />{language === 'ur' ? 'مقام / جگہ' : 'Location / Place'}</span>
                          <span className="text-red-500 ms-1">*</span>
                        </label>
                        <input id="complaint-location" type="text" value={form.location} onChange={(e) => setField('location', e.target.value)} placeholder={language === 'ur' ? 'مثلاً: منگل روڈ، ایبٹ آباد' : 'e.g., Mansehra Road near Hospital Chowk, Abbottabad'} className={inputCls('location')} />
                        {showError('location')}
                      </div>
                      <div>
                        <label htmlFor="complaint-vehicle-number" className="block text-xs font-semibold text-slate-600 mb-1">{language === 'ur' ? 'گاڑی کا نمبر (اگر متعلقہ ہو)' : 'Vehicle Number (if applicable)'}</label>
                        <input id="complaint-vehicle-number" type="text" value={form.vehicleNumber} onChange={(e) => setField('vehicleNumber', e.target.value.toUpperCase())} placeholder={language === 'ur' ? 'مثلاً ABD-1234' : 'e.g., ABD-1234'} className={inputCls('vehicleNumber')} maxLength={12} />
                      </div>
                      <div>
                        <label htmlFor="complaint-description" className="block text-xs font-semibold text-slate-600 mb-1">{language === 'ur' ? 'شکایت کی تفصیل' : 'Complaint Description'}<span className="text-red-500 ms-1">*</span></label>
                        <textarea id="complaint-description" rows={5} value={form.description} onChange={(e) => setField('description', e.target.value)}
                          placeholder={language === 'ur' ? 'واقعے کی مکمل تفصیل بیان کریں (کم از کم 30 حروف)' : 'Describe the incident in detail (min. 30 characters)'}
                          className={`${inputCls('description')} resize-none leading-relaxed`} />
                        <div className="flex items-center justify-between mt-1">
                          {showError('description')}
                          <span className={`text-xs ms-auto ${form.description.length < 30 ? 'text-red-400' : 'text-slate-400'}`}>{form.description.length}/30+</span>
                        </div>
                      </div>
                    </fieldset>

                    {/* Attachments */}
                    <fieldset className="space-y-3">
                      <legend className="text-sm font-bold text-brand-dark border-b border-brand-light-border pb-2 w-full">
                        {language === 'ur' ? 'منسلکات (اختیاری، زیادہ سے زیادہ 3)' : 'Attachments (Optional, max 3)'}
                      </legend>
                      <div
                        className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-brand-blue/60 hover:bg-slate-50 transition-all ${attachments.length >= 3 ? 'opacity-50 pointer-events-none' : 'border-brand-light-border'}`}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                        <p className="text-xs text-slate-500">{language === 'ur' ? 'تصویر یا دستاویز منسلک کریں (JPG, PNG, PDF)' : 'Attach photo or document (JPG, PNG, PDF)'}</p>
                        {attachments.length >= 3 && <p className="text-xs text-amber-600 mt-1">{language === 'ur' ? 'زیادہ سے زیادہ 3 فائلیں' : 'Maximum 3 files reached'}</p>}
                        <input ref={fileInputRef} type="file" accept="image/*,.pdf" multiple className="hidden" onChange={handleFileChange} />
                      </div>
                      {attachments.length > 0 && (
                        <ul className="space-y-2">
                          {attachments.map((f, i) => (
                            <li key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-brand-blue/5 border border-brand-blue/20 text-xs text-brand-dark">
                              <FileText className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                              <span className="flex-1 truncate">{f.name}</span>
                              <span className="text-slate-400">({(f.size / 1024).toFixed(1)} KB)</span>
                              <button type="button" onClick={() => removeFile(i)} className="text-slate-400 hover:text-red-500 transition-colors"><X className="w-3.5 h-3.5" /></button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </fieldset>

                    {/* Acknowledgement */}
                    <label className={`flex items-start gap-3 cursor-pointer rounded-xl p-4 border transition-colors ${errors.acknowledgement ? 'border-red-400 bg-red-50' : 'border-brand-light-border hover:bg-slate-50'}`}>
                      <input
                        type="checkbox"
                        checked={form.acknowledgement}
                        onChange={(e) => { setForm((p) => ({ ...p, acknowledgement: e.target.checked })); setErrors((p) => ({ ...p, acknowledgement: undefined })); }}
                        className="mt-0.5 h-4 w-4 rounded border-brand-light-border accent-brand-blue shrink-0"
                      />
                      <span className="text-xs text-slate-600 leading-relaxed">
                        {language === 'ur'
                          ? 'میں تصدیق کرتا/کرتی ہوں کہ فراہم کردہ معلومات درست ہیں اور میں سمجھتا/سمجھتی ہوں کہ جھوٹی شکایت قانونی کارروائی کا سبب بن سکتی ہے۔'
                          : 'I confirm that the information provided is accurate and true. I understand that filing a false complaint may result in legal action.'}
                      </span>
                    </label>
                    {errors.acknowledgement && <p className="text-xs text-red-600">{language === 'ur' ? 'براہ کرم تصدیق کریں۔' : 'Please check this box to continue.'}</p>}

                    {/* Nav buttons */}
                    <div className="pt-2 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3">
                      <button type="button" onClick={goBack}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-brand-light-border bg-white text-brand-dark text-sm font-semibold hover:bg-slate-50 transition-all">
                        <ChevronRight className="w-4 h-4 rotate-180" />
                        {language === 'ur' ? 'واپس' : 'Back'}
                      </button>
                      <button type="button" onClick={goNext} disabled={submitting}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-brand-blue hover:bg-brand-blue/90 disabled:opacity-60 text-white text-sm font-bold transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-blue/40">
                        {submitting ? (<><Loader2 className="w-4 h-4 animate-spin" />{language === 'ur' ? 'جمع ہو رہا ہے...' : 'Submitting...'}</>) : (<><Send className="w-4 h-4" />{language === 'ur' ? 'شکایت جمع کریں' : 'Submit Complaint'}</>)}
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3 — Success */}
                {step === 3 && (
                  <div className="p-8 sm:p-12 text-center space-y-6">
                    <div className="w-20 h-20 rounded-full bg-green-50 border-4 border-green-200 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-2xl font-extrabold text-brand-dark">{language === 'ur' ? 'شکایت کامیابی سے جمع ہوگئی!' : 'Complaint Submitted Successfully!'}</h2>
                      <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                        {language === 'ur' ? 'آپ کی شکایت موصول ہوگئی ہے۔ ہمارا عملہ 24–48 گھنٹوں کے اندر کارروائی کرے گا۔' : 'Your complaint has been received. Our team will review and take action within 24–48 hours.'}
                      </p>
                    </div>
                    <div className="inline-block bg-brand-blue/5 border border-brand-blue/20 rounded-2xl px-8 py-5">
                      <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">{language === 'ur' ? 'آپ کا ٹکٹ نمبر' : 'Your Ticket Number'}</div>
                      <div className="text-2xl font-extrabold text-brand-blue tracking-wide font-mono">{ticketId}</div>
                      <div className="text-xs text-slate-400 mt-1">{language === 'ur' ? 'براہ کرم یہ نمبر محفوظ کریں' : 'Please save this reference number'}</div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left mt-4">
                      {[
                        { icon: Clock, en: 'Response within 24–48 hours', ur: '24–48 گھنٹوں میں جواب' },
                        { icon: ShieldCheck, en: 'Your identity is kept confidential', ur: 'آپ کی شناخت خفیہ رہے گی' },
                        { icon: Phone, en: 'Call 1915 for urgent assistance', ur: 'فوری مدد کے لیے 1915 کال کریں' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-brand-light-border">
                          <item.icon className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                          <p className="text-xs text-slate-600 leading-relaxed">{language === 'ur' ? item.ur : item.en}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                      <button type="button" onClick={handleReset}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-brand-light-border bg-white text-brand-dark text-sm font-semibold hover:bg-slate-50 transition-all">
                        <RefreshCw className="w-4 h-4" />
                        {language === 'ur' ? 'نئی شکایت جمع کریں' : 'Submit Another Complaint'}
                      </button>
                      <Link to="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-blue text-white text-sm font-bold hover:bg-brand-blue/90 transition-all">
                        {language === 'ur' ? 'صفحۂ اول پر واپس جائیں' : 'Return to Homepage'}
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Emergency */}
              <div className="rounded-2xl bg-red-600 text-white p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Siren className="w-5 h-5 shrink-0" />
                  <h3 className="font-bold text-sm">{language === 'ur' ? 'فوری ایمرجنسی؟' : 'Emergency Situation?'}</h3>
                </div>
                <p className="text-xs leading-relaxed text-red-100">{language === 'ur' ? 'اگر آپ ایمرجنسی میں ہیں تو فوری طور پر کال کریں:' : 'If you are in an emergency situation, call immediately:'}</p>
                <a href="tel:1915" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white text-red-600 font-extrabold text-lg hover:bg-red-50 transition-all">
                  <Phone className="w-5 h-5" />1915
                </a>
                <p className="text-xs text-red-200 text-center">{language === 'ur' ? 'ٹریفک پولیس ہیلپ لائن — 24/7' : 'Traffic Police Helpline — 24/7'}</p>
              </div>

              {/* How it works */}
              <Card className="border-brand-light-border shadow-sm">
                <CardContent className="p-5 space-y-4">
                  <h3 className="font-bold text-sm text-brand-dark flex items-center gap-2">
                    <Info className="w-4 h-4 text-brand-blue" />
                    {language === 'ur' ? 'عمل کا طریقہ' : 'How It Works'}
                  </h3>
                  <ol className="space-y-3">
                    {[
                      { en: 'Select complaint category', ur: 'شکایت کا زمرہ منتخب کریں' },
                      { en: 'Provide your details & incident info', ur: 'اپنی معلومات اور واقعے کی تفصیل دیں' },
                      { en: 'Submit and receive a ticket number', ur: 'جمع کریں اور ٹکٹ نمبر حاصل کریں' },
                      { en: 'Our team reviews within 24–48 hrs', ur: 'ہمارا عملہ 24–48 گھنٹوں میں جائزہ لے گا' },
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                        <span className="text-xs text-slate-600 leading-relaxed pt-0.5">{language === 'ur' ? item.ur : item.en}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>

              {/* Contacts */}
              <Card className="border-brand-light-border shadow-sm">
                <CardContent className="p-5 space-y-3">
                  <h3 className="font-bold text-sm text-brand-dark flex items-center gap-2">
                    <Phone className="w-4 h-4 text-brand-blue" />
                    {language === 'ur' ? 'دیگر رابطے' : 'Other Contacts'}
                  </h3>
                  {[
                    { label: '1915', desc_en: 'Traffic Helpline (24/7)', desc_ur: 'ٹریفک ہیلپ لائن (24/7)', href: 'tel:1915' },
                    { label: '0992-921042', desc_en: 'Headquarters Office', desc_ur: 'ہیڈکوارٹر دفتر', href: 'tel:0992-921042' },
                    { label: 'trafficwardenatd@gmail.com', desc_en: 'Email Us', desc_ur: 'ای میل', href: 'mailto:trafficwardenatd@gmail.com' },
                  ].map((c, i) => (
                    <a key={i} href={c.href}
                      className="flex items-center gap-2 p-3 rounded-lg border border-brand-light-border hover:bg-brand-blue/5 hover:border-brand-blue/30 transition-all group">
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-brand-dark group-hover:text-brand-blue truncate">{c.label}</div>
                        <div className="text-xs text-slate-500">{language === 'ur' ? c.desc_ur : c.desc_en}</div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-blue shrink-0" />
                    </a>
                  ))}
                </CardContent>
              </Card>

              {/* Disclaimer */}
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700 leading-relaxed">
                    {language === 'ur'
                      ? 'جھوٹی یا گمراہ کن شکایت پاکستان کے قانون کے تحت قابلِ سزا جرم ہے۔ صرف درست معلومات فراہم کریں۔'
                      : 'Filing a false or misleading complaint is a punishable offence under Pakistani law. Please provide only accurate information.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
};

export default OnlineComplaint;
