import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  PhoneCall,
  Users,
  ShieldCheck,
  Send,
  AlertTriangle,
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { useLanguage } from '../hooks/useLanguage';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { EMERGENCY_CONTACTS, PORTAL_METADATA } from '../data/navigation';

export const Contact: React.FC = () => {
  const { language, isRTL, t } = useLanguage();

  useEffect(() => {
    document.title = t(
      'Contact Us | Traffic Warden Abbottabad — Khyber Pakhtunkhwa Police',
      'رابطہ کریں | ٹریفک وارڈن ایبٹ آباد — خیبر پختونخوا پولیس'
    );
  }, [language, t]);

  const contactCards = [
    {
      icon: Phone,
      titleEn: 'Phone / Helpline',
      titleUr: 'فون / ہیلپ لائن',
      content: [
        {
          textEn: `${PORTAL_METADATA.helpline} (24/7 Traffic Helpline)`,
          textUr: `${PORTAL_METADATA.helpline} (24/7 ٹریفک ہیلپ لائن)`,
          href: `tel:${PORTAL_METADATA.helpline}`,
        },
        {
          textEn: '0992-921042 (District Control Room)',
          textUr: '0992-921042 (ضلعی کنٹرول روم)',
          href: 'tel:0992-921042',
        },
      ],
    },
    {
      icon: Mail,
      titleEn: 'Email Address',
      titleUr: 'ای میل ایڈریس',
      content: [
        {
          textEn: 'trafficwardenatd@gmail.com',
          textUr: 'trafficwardenatd@gmail.com',
          href: 'mailto:trafficwardenatd@gmail.com',
        },
      ],
    },
    {
      icon: MapPin,
      titleEn: 'Office Address',
      titleUr: 'دفتر کا پتہ',
      content: [
        {
          textEn: 'Traffic Warden Headquarters, Opposite District Police Line Abbottabad, Khyber Pakhtunkhwa, Pakistan',
          textUr: 'ٹریفک وارڈن ہیڈکوارٹر، ڈسٹرکٹ پولیس لائن ایبٹ آباد کے سامنے، خیبر پختونخوا، پاکستان',
          href: undefined,
        },
      ],
    },
    {
      icon: Clock,
      titleEn: 'Office Hours',
      titleUr: 'دفتر کے اوقات',
      content: [
        {
          textEn: 'Monday - Friday: 09:00 AM - 05:00 PM',
          textUr: 'پیر تا جمعہ: صبح 09:00 سے شام 05:00 تک',
          href: undefined,
        },
        {
          textEn: 'Saturday - Sunday: Off (Emergency via 1915)',
          textUr: 'ہفتہ اور اتوار: بند (ایمرجنسی کے لیے 1915 پر رابطہ کریں)',
          href: undefined,
        },
      ],
    },
  ];

  const faqs = [
    {
      questionEn: 'What is the emergency traffic helpline number?',
      questionUr: 'ایمرجنسی ٹریفک ہیلپ لائن نمبر کیا ہے؟',
      answerEn: 'For immediate traffic assistance, call 1915 which is available 24/7.',
      answerUr: 'فوری ٹریفک مدد کے لیے 1915 پر کال کریں جو 24/7 دستیاب ہے۔',
    },
    {
      questionEn: 'Where can I apply for a driving license?',
      questionUr: 'ڈرائیونگ لائسنس کے لیے کہاں درخواست دے سکتا ہوں؟',
      answerEn: 'You can visit the License Branch at Traffic Warden Headquarters, Abbottabad. Visit our Services > License Branch page for more details.',
      answerUr: 'آپ ٹریفک وارڈن ہیڈکوارٹر، ایبٹ آباد میں لائسنس برینچ میں جا کر درخواست دے سکتے ہیں۔ مزید تفصیلات کے لیے ہماری خدمات > لائسنس برینچ صفحہ دیکھیں۔',
    },
    {
      questionEn: 'How can I report traffic violations?',
      questionUr: 'ٹریفک خلاف ورزیوں کی اطلاع کیسے دے سکتا ہوں؟',
      answerEn: 'You can report traffic violations by calling 1915 or visiting the nearest Traffic Warden Office.',
      answerUr: 'آپ 1915 پر کال کر کے یا قریب ترین ٹریفک وارڈن دفتر میں جا کر ٹریفک خلاف ورزیوں کی اطلاع دے سکتے ہیں۔',
    },
    {
      questionEn: 'Are there driving school facilities?',
      questionUr: 'ڈرائیونگ اسکول کی سہولت موجود ہے؟',
      answerEn: 'Yes, Traffic Police Driving School provides professional training for aspiring drivers. Check Services > Driving School for registration details.',
      answerUr: 'جی ہاں، ٹریفک پولیس ڈرائیونگ اسکول خواہشمند ڈرائیوروں کو پیشہ ورانہ تربیت فراہم کرتا ہے۔ رجسٹریشن تفصیلات کے لیے خدمات > ڈرائیونگ اسکول دیکھیں۔',
    },
  ];

  return (
    <div className="space-y-0 text-brand-dark bg-brand-light-bg overflow-x-hidden">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 bg-brand-light-surface scroll-mt-20 border-b border-brand-light-border">
        <PageContainer>
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
              <span>{t('GET IN TOUCH', 'رابطہ کریں')}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-dark tracking-tight leading-tight">
              {t(
                'CONTACT TRAFFIC WARDEN ABBOTTABAD',
                'ٹریفک وارڈن ایبٹ آباد سے رابطہ کریں'
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
              {t(
                'We are here to assist you with traffic-related queries, licensing, road safety information, and emergency assistance. Reach out to us through any of the channels below.',
                'ہم آپ کی ٹریفک سے متعلقہ سوالات، لائسنسنگ، روڈ سیفٹی معلومات اور ایمرجنسی مدد کے لیے حاضر ہیں۔ نیچے دیے گئے کسی بھی ذریعے سے ہم سے رابطہ کریں۔'
              )}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 justify-center">
              <a href={`tel:${PORTAL_METADATA.helpline}`}>
                <Button
                  variant="accent"
                  size="lg"
                  leftIcon={<PhoneCall className="w-5 h-5" />}
                >
                  {t('Call 1915', '1915 پر کال کریں')}
                </Button>
              </a>
              <a href="mailto:trafficwardenatd@gmail.com">
                <Button
                  variant="outline"
                  size="lg"
                  leftIcon={<Mail className="w-5 h-5" />}
                >
                  {t('Send Email', 'ای میل بھیجیں')}
                </Button>
              </a>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Contact Cards */}
      <section className="py-16 sm:py-20 bg-brand-light-bg">
        <PageContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactCards.map((card, idx) => {
              const IconComponent = card.icon;
              return (
                <Card
                  key={idx}
                  className="rounded-3xl bg-brand-light-surface border border-brand-light-border hover:border-brand-blue-300 hover:shadow-xl transition-all duration-300"
                >
                  <CardHeader className="space-y-4 pb-3">
                    <div className="w-12 h-12 rounded-2xl bg-brand-blue text-white flex items-center justify-center shadow-sm">
                      <IconComponent className="w-6 h-6 text-brand-lime" />
                    </div>
                    <div className="text-lg font-bold text-brand-dark">
                      {t(card.titleEn, card.titleUr)}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-2">
                    {card.content.map((item, i) => (
                      <div key={i} className="text-sm text-slate-600 leading-relaxed">
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-brand-blue hover:text-brand-blue-600 hover:underline transition-colors font-medium"
                          >
                            {t(item.textEn, item.textUr)}
                          </a>
                        ) : (
                          t(item.textEn, item.textUr)
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </PageContainer>
      </section>

      {/* Emergency Contacts & Contact Form */}
      <section className="py-16 sm:py-20 bg-brand-light-surface border-t border-brand-light-border">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Emergency Contacts */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-100 text-xs font-semibold uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{t('EMERGENCY CONTACTS', 'ہنگامی رابطے')}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
                  {t('24/7 Emergency Assistance', '24/7 ہنگامی مدد')}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t(
                    'For immediate on-road traffic assistance, accident reporting, or emergency support, use the following numbers:',
                    'فوری سڑک پر ٹریفک مدد، حادثے کی اطلاع یا ہنگامی مدد کے لیے درج ذیل نمبروں کا استعمال کریں:'
                  )}
                </p>
              </div>

              <div className="space-y-3">
                {[
                  ...EMERGENCY_CONTACTS,
                  {
                    id: 'traffic-control',
                    title: 'Traffic Control',
                    titleUrdu: 'ٹریفک کنٹرول',
                    number: '0992-921458',
                    description: 'Traffic Control Room',
                    descriptionUrdu: 'ٹریفک کنٹرول روم',
                    isPrimary: false,
                  },
                  {
                    id: 'tourist-police',
                    title: 'Tourist Police',
                    titleUrdu: 'سیاحتی پولیس',
                    number: '1422',
                    description: 'Tourist Safety & Assistance',
                    descriptionUrdu: 'سیاحوں کی حفاظت اور مدد',
                    isPrimary: false,
                  },
                ].map((contact) => (
                  <Card
                    key={contact.id}
                    className="rounded-2xl bg-brand-light-surface border border-brand-light-border"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div className="space-y-1">
                          <div className="text-sm font-semibold text-brand-dark">
                            {t(contact.title, contact.titleUrdu)}
                          </div>
                          <div className="text-xs text-slate-600">
                            {t(contact.description, contact.descriptionUrdu)}
                          </div>
                        </div>
                        <a href={`tel:${contact.number}`}>
                          <Button
                            variant={contact.isPrimary ? 'accent' : 'outline'}
                            size="sm"
                            leftIcon={<Phone className="w-4 h-4" />}
                          >
                            {contact.number}
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider">
                  <Users className="w-4 h-4" />
                  <span>{t('ENQUIRY FORM', 'انکوائری فارم')}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
                  {t('Send Us an Enquiry', 'ہمیں انکوائری بھیجیں')}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t(
                    'For general enquiries, suggestions, or feedback, please fill out the form below. We will get back to you as soon as possible.',
                    'عمومی سوالات، تجاویز یا رائے کے لیے نیچے دیا گیا فارم بھریں۔ ہم جلد از جلد آپ سے رابطہ کریں گے۔'
                  )}
                </p>
              </div>

              <Card className="rounded-3xl bg-brand-light-surface border border-brand-light-border">
                <CardContent className="p-6 sm:p-8 space-y-6">
                  <form
                    action="mailto:trafficwardenatd@gmail.com"
                    method="POST"
                    encType="text/plain"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-semibold text-brand-dark">
                          {t('Full Name', 'پورا نام')} *
                        </label>
                        <input
                          id="name"
                          name="Name"
                          type="text"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-brand-light-border bg-white text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-colors"
                          placeholder={t('Enter your full name', 'اپنا پورا نام درج کریں')}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-semibold text-brand-dark">
                          {t('Phone Number', 'فون نمبر')} *
                        </label>
                        <input
                          id="phone"
                          name="Phone"
                          type="tel"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-brand-light-border bg-white text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-colors"
                          placeholder={t('Enter your phone number', 'اپنا فون نمبر درج کریں')}
                        />
                      </div>
                    </div>

                    <div className="space-y-2 mt-6">
                      <label htmlFor="email" className="text-sm font-semibold text-brand-dark">
                        {t('Email Address', 'ای میل ایڈریس')}
                      </label>
                      <input
                        id="email"
                        name="Email"
                        type="email"
                        className="w-full px-4 py-3 rounded-xl border border-brand-light-border bg-white text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-colors"
                        placeholder={t('Enter your email address', 'اپنا ای میل ایڈریس درج کریں')}
                      />
                    </div>

                    <div className="space-y-2 mt-6">
                      <label htmlFor="subject" className="text-sm font-semibold text-brand-dark">
                        {t('Subject', 'موضوع')} *
                      </label>
                      <select
                        id="subject"
                        name="Subject"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-brand-light-border bg-white text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-colors"
                      >
                        <option value="">{t('Select a subject', 'موضوع منتخب کریں')}</option>
                        <option value="General Enquiry">{t('General Enquiry', 'عمومی سوالات')}</option>
                        <option value="License Services">{t('License Services', 'لائسنس خدمات')}</option>
                        <option value="Complaint / Feedback">{t('Complaint / Feedback', 'شکایت / رائے')}</option>
                        <option value="Road Safety Information">{t('Road Safety Information', 'روڈ سیفٹی معلومات')}</option>
                        <option value="Other">{t('Other', 'دیگر')}</option>
                      </select>
                    </div>

                    <div className="space-y-2 mt-6">
                      <label htmlFor="message" className="text-sm font-semibold text-brand-dark">
                        {t('Message', 'پیغام')} *
                      </label>
                      <textarea
                        id="message"
                        name="Message"
                        rows={5}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-brand-light-border bg-white text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-colors resize-none"
                        placeholder={t('Enter your message here...', 'اپنا پیغام یہاں درج کریں...')}
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      className="mt-6"
                      leftIcon={<Send className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />}
                    >
                      {t('Send Enquiry', 'انکوائری بھیجیں')}
                    </Button>
                  </form>

                  <div className="text-center text-xs text-slate-500">
                    {t(
                      '* Required fields. This is a demo form and does not actually send messages.',
                      '* مطلوبہ فیلڈز۔ یہ ایک ڈیمو فارم ہے اور اصل میں پیغامات نہیں بھیجتا۔'
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Location & Office Hours */}
      <section className="py-16 sm:py-20 bg-brand-light-bg">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map Section */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>{t('OUR LOCATION', 'ہمارا مقام')}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
                  {t('Traffic Warden Headquarters', 'ٹریفک وارڈن ہیڈکوارٹر')}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t(
                    'Find us at Opposite District Police Line Abbottabad. For exact directions, please use the map below.',
                    'ہمیں ڈسٹرکٹ پولیس لائن ایبٹ آباد کے سامنے تلاش کریں۔ درست رہنمائی کے لیے نیچے دیا گیا نقشہ استعمال کریں۔'
                  )}
                </p>
              </div>

              <Card className="rounded-3xl bg-brand-light-surface border border-brand-light-border overflow-hidden">
                <div className="aspect-video w-full bg-slate-100 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <MapPin className="w-12 h-12 text-brand-blue mx-auto" />
                    <div className="text-sm font-medium text-brand-dark">
                      {t('Map Location', 'نقشہ مقام')}
                    </div>
                    <div className="text-xs text-slate-600 max-w-xs mx-auto">
                      {t(
                        'Traffic Warden Headquarters, Opposite District Police Line, Abbottabad',
                        'ٹریفک وارڈن ہیڈکوارٹر، پولیس لائن کے سامنے، ایبٹ آباد'
                      )}
                    </div>
                    <div className="pt-2">
                      <a
                        href="https://maps.google.com/?q=34.141108254541614,73.2088187126538"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" size="sm">
                          {t('Open in Google Maps', 'گوگل میپس میں کھولیں')}
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Office Hours & Additional Info */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider">
                  <Clock className="w-4 h-4" />
                  <span>{t('OFFICE TIMINGS', 'دفتر کے اوقات')}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
                  {t('Working Hours', 'کام کے اوقات')}
                </h2>
              </div>

              <Card className="rounded-3xl bg-brand-light-surface border border-brand-light-border">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-brand-blue" />
                    <div className="space-y-1">
                      <div className="text-sm font-semibold text-brand-dark">
                        {t('Monday - Friday', 'پیر تا جمعہ')}
                      </div>
                      <div className="text-sm text-slate-600">
                        {t('09:00 AM - 05:00 PM', 'صبح 09:00 سے شام 05:00 تک')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-brand-blue" />
                    <div className="space-y-1">
                      <div className="text-sm font-semibold text-brand-dark">
                        {t('Saturday - Sunday', 'ہفتہ اور اتوار')}
                      </div>
                      <div className="text-sm text-slate-600">
                        {t('Closed', 'بند')}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl bg-brand-blue text-white border border-brand-blue-600">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-brand-lime" />
                    <div className="text-base font-bold">
                      {t('24/7 Helpline Available', '24/7 ہیلپ لائن دستیاب')}
                    </div>
                  </div>
                  <p className="text-sm text-white/90 leading-relaxed">
                    {t(
                      'For traffic emergencies, accidents, or immediate assistance at any time, day or night, please call 1915.',
                      'ٹریفک ایمرجنسیوں، حادثات یا کسی بھی وقت فوری مدد کے لیے دن ہو یا رات، براہ کرم 1915 پر کال کریں۔'
                    )}
                  </p>
                  <a href="tel:1915">
                    <Button variant="accent" size="lg" fullWidth leftIcon={<PhoneCall className="w-5 h-5" />}>
                      {t('Call 1915 Now', 'ابھی 1915 پر کال کریں')}
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 bg-brand-light-surface border-t border-brand-light-border">
        <PageContainer>
          <div className="max-w-4xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                <span>{t('FREQUENTLY ASKED QUESTIONS', 'اکثر پوچھے جانے والے سوالات')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight">
                {t('Common Questions', 'عام سوالات')}
              </h2>
              <p className="text-sm text-slate-600">
                {t(
                  'Find quick answers to frequently asked questions about our services.',
                  'ہماری خدمات سے متعلق اکثر پوچھے جانے والے سوالات کے فوری جوابات تلاش کریں۔'
                )}
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <Card
                  key={idx}
                  className="rounded-2xl bg-brand-light-surface border border-brand-light-border"
                >
                  <CardContent className="p-6 space-y-3">
                    <div className="text-base font-semibold text-brand-dark">
                      {t(faq.questionEn, faq.questionUr)}
                    </div>
                    <div className="text-sm text-slate-600 leading-relaxed">
                      {t(faq.answerEn, faq.answerUr)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      {/* CTA Section */}
      <section className="relative bg-[#000080] text-white py-16 sm:py-20 border-t border-[#0000aa] overflow-hidden">
        <div className="absolute inset-0 gov-subtle-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl -z-0 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-lime/10 rounded-full blur-3xl -z-0 pointer-events-none" />

        <PageContainer className="relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-lime/15 text-brand-lime border border-brand-lime/30 text-xs font-extrabold uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-brand-lime" />
              <span>{t('NEED HELP', 'مدد درکار ہے')}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {t(
                'We are here to serve you 24/7',
                'ہم آپ کی خدمت کے لیے 24/7 حاضر ہیں'
              )}
            </h2>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto">
              {t(
                'Traffic Warden Abbottabad remains committed to public safety, discipline, and service excellence. Do not hesitate to contact us in case of any traffic-related concern.',
                'ٹریفک وارڈن ایبٹ آباد عوامی حفاظت، نظم و ضبط اور بہترین خدمات کے لیے پرعزم ہے۔ ٹریفک سے متعلق کسی بھی پریشانی کی صورت میں ہم سے رابطہ کرنے میں دریغ نہ کریں۔'
              )}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 justify-center">
              <Link to="/">
                <Button variant="accent" size="lg" leftIcon={<Users className="w-5 h-5" />}>
                  {t('Back to Home', 'صفحۂ اول پر جائیں')}
                </Button>
              </Link>
              <a href="tel:1915">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/15 border-white/30 text-white hover:bg-white/25"
                  leftIcon={<PhoneCall className="w-5 h-5" />}
                >
                  {t('Emergency Call 1915', 'ایمرجنسی کال 1915')}
                </Button>
              </a>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
};
