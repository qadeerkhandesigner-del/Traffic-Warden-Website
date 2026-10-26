import React, { useEffect } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { useLanguage } from '../hooks/useLanguage';
import {
  Users,
  ExternalLink,
  PhoneCall,
  Newspaper,
} from 'lucide-react';
import logoImg from '/Traffic-Logo-Updated.png';
import dpoLogoImg from '/Abbottabad Police Logo .png';

export const MediaNews: React.FC = () => {
  const { language, t } = useLanguage();

  useEffect(() => {
    document.title = t(
      'Media & News | Traffic Warden Abbottabad — Khyber Pakhtunkhwa Police',
      'میڈیا اور خبریں | ٹریفک وارڈن ایبٹ آباد — خیبر پختونخوا پولیس'
    );
  }, [language, t]);

  const latestNews = [
    {
      titleUr: 'نو تعینات ایس ایس پی ٹریفک محمد سلیمان خان PSP نے ٹریفک پولیس ایبٹ آباد کی کمان سنبھال لی',
      contentUr: `نو تعینات ایس ایس پی ٹریفک ایبٹ آباد محمد سلیمان خان PSP نے ٹریفک پولیس ایبٹ آباد کے دفتر پہنچ کر اپنے عہدے کا چارج سنبھال لیا۔\n\nاس موقع پر ٹریفک پولیس کے چاق و چوبند دستے نے نو تعینات ایس ایس پی ٹریفک کو سلامی پیش کی۔\nایس ایس پی ٹریفک محمد سلیمان خان نے ٹریفک پولیس کے افسران و جوانوں سے تعارفی میٹنگ کے دوران انہیں اپنے فرائض منصبی احسن انداز میں، فرض شناسی، نظم و ضبط اور عوامی خدمت کے جذبے کے ساتھ سرانجام دینے کی ہدایات جاری کیں۔\n\nانہوں نے ٹریفک کی روانی برقرار رکھنے، شہریوں کو بہترین سفری سہولیات فراہم کرنے اور ٹریفک قوانین پر مؤثر عملدرآمد یقینی بنانے پر بھی زور دیا۔`,
      images: [
        '/SSP Taken Charge Images/SSP Image.jpg',
        '/SSP Taken Charge Images/02.jpg',
        '/SSP Taken Charge Images/03.jpg',
        '/SSP Taken Charge Images/04.jpg',
        '/SSP Taken Charge Images/05 .jpg',
      ],
      date: 'September 25, 2026',
    },
  ];

  const feeds = [
    {
      id: 'traffic' as const,
      nameEn: 'Traffic Police Abbottabad',
      nameUr: 'ٹریفک پولیس ایبٹ آباد',
      badgeEn: 'Official Traffic Feed',
      badgeUr: 'سرکاری ٹریفک فیڈ',
      handle: '@TrafficPoliceATD',
      followers: '40,000+ Followers',
      followersUr: '40 ہزار+ فالوورز',
      descEn: 'Official traffic alerts, road updates, weather & public advisories',
      descUr: 'ٹریفک روانی، روڈ ایڈوائزریز، موسم و برفباری اور اہم ہدایات',
      directUrl: 'https://www.facebook.com/share/1J5fA6ptxq/',
      shareUrl: 'https://www.facebook.com/share/1J5fA6ptxq/',
      embedUrl:
        'https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F100069522356711&tabs=timeline&width=500&height=800&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId',
      isTraffic: true,
      helpline: '1915',
    },
    {
      id: 'dpo' as const,
      nameEn: 'District Police Abbottabad',
      nameUr: 'ڈسٹرکٹ پولیس ایبٹ آباد',
      badgeEn: 'District Police Feed',
      badgeUr: 'ضلعی پولیس فیڈ',
      handle: '@Atdpolice',
      followers: 'Official District Channel',
      followersUr: 'سرکاری ضلعی چینل',
      descEn: 'Abbottabad Police news, law & order alerts and community updates',
      descUr: 'ضلع ایبٹ آباد امن و امان، کمیونٹی پولیسنگ اور عوامی اعلانات',
      directUrl: 'https://www.facebook.com/share/19s6gggUoU/',
      shareUrl: 'https://www.facebook.com/share/19s6gggUoU/',
      embedUrl:
        'https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FAtdpolice&tabs=timeline&width=500&height=800&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId',
      isTraffic: false,
      helpline: '15',
    },
  ];

  return (
    <div className="space-y-0 text-brand-dark bg-brand-light-bg min-h-screen overflow-x-hidden">
      {/* Official Government Hero Header */}
      <section className="relative bg-[#000080] text-white pt-8 pb-14 border-b border-[#0000aa] overflow-hidden">
        <div className="absolute inset-0 gov-subtle-pattern opacity-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-lime/10 rounded-full blur-3xl pointer-events-none" />

        <PageContainer className="relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Media & News', labelUrdu: 'میڈیا اور خبریں', path: '/media-news' },
            ]}
            className="mb-4 text-white/80 [&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
          />

          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lime/15 text-brand-lime border border-brand-lime/30 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse" />
              <span>{t('OFFICIAL MEDIA DISPATCH', 'سرکاری میڈیا نشریات')}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {t('MEDIA, NEWS & LIVE SOCIAL FEEDS', 'میڈیا، خبریں اور لائیو سوشل فیڈز')}
            </h1>

            <p className="text-white/85 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl">
              {t(
                'Direct real-time advisories, route diversions, public notices and departmental updates from Traffic Warden Abbottabad and District Police Abbottabad.',
                'ٹریفک وارڈن ایبٹ آباد اور ڈسٹرکٹ پولیس ایبٹ آباد کے مصدقہ پلیٹ فارمز سے تازہ ترین خبریں، روڈ ایڈوائزریز اور اہم اعلانات۔'
              )}
            </p>
          </div>
        </PageContainer>
      </section>

      {/* LIVE FACEBOOK FEED EMBED SECTION */}
      <section className="py-14 sm:py-20 bg-brand-light-bg border-b border-brand-light-border">
        <PageContainer>
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="space-y-2 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping inline-block" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
                  {t('LIVE OFFICIAL BROADCAST', 'لائیو سرکاری نشریات')}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight">
                {t('Official Facebook Feeds & Updates', 'سرکاری فیس بک لائیو فیڈز و پوسٹس')}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
                {t(
                  'Both official streams are integrated side-by-side with real-time public advisories and emergency notifications.',
                  'دونوں سرکاری چینلز ایک ساتھ اسکرین پر ہم آہنگ ہیں تاکہ شہری ٹریفک اور ضلعی پولیس کی تمام تازہ ترین معلومات بیک وقت حاصل کر سکیں۔'
                )}
              </p>
            </div>

            {/* Feeds 2-Column Side-by-Side Grid - Always Both Shown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {feeds.map((feed) => (
                <div
                  key={feed.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-gov-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:border-brand-blue/40 group"
                >
                  {/* Card Official Police Navy Header */}
                  <div className="relative bg-gradient-to-r from-[#000080] via-[#091A36] to-[#000066] text-white p-5 sm:p-6 border-b border-brand-lime/20 overflow-hidden">
                    <div className="absolute inset-0 gov-subtle-pattern opacity-10 pointer-events-none" />
                    <div className="absolute -top-12 -right-12 w-36 h-36 bg-brand-blue/30 rounded-full blur-2xl pointer-events-none" />

                    <div className="relative z-10 flex items-center justify-between gap-4">
                      {/* Department Logo & Identity */}
                      <div className="flex items-center gap-3.5">
                        <div className="relative w-12 h-12 rounded-2xl bg-white p-1 shadow-md shrink-0 flex items-center justify-center border-2 border-brand-lime/40">
                          {feed.isTraffic ? (
                            <img
                              src={logoImg}
                              alt="Traffic Police Abbottabad Crest"
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <img
                              src={dpoLogoImg}
                              alt="District Police Abbottabad Crest"
                              className="w-full h-full object-contain"
                            />
                          )}
                          <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-brand-lime border-2 border-[#000066] flex items-center justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#000066]" />
                          </span>
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-extrabold text-base sm:text-lg text-white font-poppins tracking-tight truncate">
                              {language === 'ur' ? feed.nameUr : feed.nameEn}
                            </h3>
                            <span className="bg-brand-lime text-brand-dark text-[10px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider shadow-sm">
                              {language === 'ur' ? feed.badgeUr : feed.badgeEn}
                            </span>
                          </div>
                          <p className="text-xs text-white/80 font-medium truncate mt-0.5">
                            {language === 'ur' ? feed.descUr : feed.descEn}
                          </p>
                          <div className="text-[11px] text-brand-lime/90 font-mono mt-0.5 flex items-center gap-1.5">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>{feed.handle}</span>
                            <span className="text-white/40">•</span>
                            <span>{language === 'ur' ? feed.followersUr : feed.followers}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Strip */}
                  <div className="bg-slate-50 px-5 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600 font-medium">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span>
                        {language === 'ur'
                          ? 'لائیو ٹائم لائن اسٹریم فعال ہے'
                          : 'Live Timeline Stream Active'}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                      {feed.isTraffic ? 'Traffic Warden KP' : 'KPK Police Official'}
                    </span>
                  </div>

                  {/* Embed Frame Area */}
                  <div className="p-4 sm:p-6 bg-slate-100/70 flex-1 flex flex-col items-center justify-center min-h-[550px]">
                    <div className="w-full max-w-[500px] bg-white rounded-2xl shadow-gov border border-slate-200 overflow-hidden flex justify-center">
                      <iframe
                        key={feed.id}
                        src={feed.embedUrl}
                        width="500"
                        height="800"
                        style={{ border: 'none', overflow: 'hidden' }}
                        scrolling="yes"
                        frameBorder="0"
                        allowFullScreen={true}
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        title={`${feed.nameEn} Official Live Feed`}
                        className="w-full max-w-[500px] min-h-[650px] sm:min-h-[750px]"
                      />
                    </div>

                    {/* Official Fallback Bar */}
                    <div className="mt-4 text-center max-w-md">
                      <p className="text-xs text-slate-500 leading-normal">
                        {language === 'ur'
                          ? 'براؤزر پرائیویسی یا ٹریکنگ بلاکر کی وجہ سے فیڈ شو نہ ہونے پر براہ راست وزٹ کریں:'
                          : 'If browser tracking protections restrict embedded content, visit directly:'}
                      </p>
                      <a
                        href={feed.directUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-brand-blue-700 hover:underline mt-1"
                      >
                        <span>{feed.directUrl}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      {/* LATEST NEWS & PRESS RELEASES */}
      <section className="py-16 sm:py-20 bg-brand-light-surface border-b border-brand-light-border">
        <PageContainer>
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-brand-blue rounded-full" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
                  {t('OFFICIAL DISPATCH', 'سرکاری اعلامیہ')}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
                  {t('LATEST NEWS & PRESS RELEASES', 'تازہ ترین خبریں و پریس ریلیز')}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-10">
              {latestNews.map((news, idx) => (
                <div
                  key={idx}
                  className="bg-brand-light-bg rounded-3xl border border-brand-light-border overflow-hidden shadow-gov-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                      <div className="text-right space-y-4" dir="rtl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-bold">
                          <Newspaper className="w-3.5 h-3.5" />
                          <span>پریس ریلیز</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-brand-dark leading-snug">
                          {news.titleUr}
                        </h3>
                        <p className="text-slate-600 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                          {news.contentUr}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-200/80 text-xs text-slate-500">
                        <span className="font-semibold text-brand-blue">ٹریفک پولیس ایبٹ آباد</span>
                        <span>{news.date}</span>
                      </div>
                    </div>

                    <div className="lg:col-span-5 p-6 bg-slate-100/80 grid grid-cols-2 gap-3 border-t lg:border-t-0 lg:border-l border-brand-light-border">
                      {news.images.map((img, imgIdx) => (
                        <div
                          key={imgIdx}
                          className={`relative rounded-2xl overflow-hidden shadow-sm bg-slate-900 border border-white/60 ${
                            imgIdx === 0 ? 'col-span-2 h-72' : 'h-28'
                          }`}
                        >
                          <img
                            src={img}
                            alt={`News event photo ${imgIdx + 1}`}
                            className={`w-full h-full transition-transform duration-500 hover:scale-105 ${
                              imgIdx === 0 ? 'object-contain bg-slate-950/90' : 'object-cover'
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      {/* OFFICIAL DIGITAL COMMUNICATION & EMERGENCY CHANNELS */}
      <section className="py-16 sm:py-20 bg-brand-light-surface">
        <PageContainer>
          <div className="max-w-5xl mx-auto space-y-10">
            {/* Heading */}
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-bold uppercase tracking-wider">
                <Users className="w-4 h-4" />
                <span>{t('OFFICIAL COMMUNICATION CHANNELS', 'سرکاری ڈیجیٹل ذرائع ابلاغ')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
                {t('Stay Connected with Police Authorities', 'پولیس حکام کے ساتھ ہر لمحہ باخبر رہیں')}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {t(
                  'Follow our official Facebook channels for instant highway advisories, weather updates, and public safety announcements.',
                  'اہم اعلانات، ٹریفک ڈائیورشنز، روڈ سیفٹی مہمات اور ہنگامی الرٹس کے لیے ہمارے مصدقہ فیس بک پیجز فالو کریں۔'
                )}
              </p>
            </div>

            {/* Departmental Channel Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Traffic Police Card */}
              <div className="rounded-3xl bg-brand-light-bg border border-brand-light-border p-6 sm:p-8 flex flex-col justify-between hover:border-brand-blue-300 hover:shadow-xl transition-all duration-300 group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-white p-2 shadow-md border border-slate-200 flex items-center justify-center">
                      <img
                        src={logoImg}
                        alt="Traffic Warden Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-[11px] font-black uppercase px-2.5 py-1 rounded-full bg-brand-lime text-brand-dark tracking-wide">
                      {language === 'ur' ? 'ٹریفک ونگ' : 'Traffic Wing'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-brand-dark">
                      {language === 'ur' ? 'ٹریفک پولیس ایبٹ آباد' : 'Traffic Police Abbottabad'}
                    </h3>
                    <p className="text-xs text-brand-blue font-semibold mt-0.5">
                      @TrafficPoliceATD • Facebook Official
                    </p>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {language === 'ur'
                      ? 'شاہراہوں کی روانی، گلیات روڈ ایڈوائزریز، موسمی صورتحال، اور 24/7 ٹریفک ریلیف کی تمام اپڈیٹس۔'
                      : 'Live road conditions, Galiyat snow advisories, real-time diversions, and rapid motorist assistance.'}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center justify-between gap-3 flex-wrap">
                  <a
                    href="https://www.facebook.com/share/1J5fA6ptxq/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1877F2] text-white font-bold text-xs hover:bg-[#166fe5] transition-all duration-200 shadow-sm"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                    <span>{language === 'ur' ? 'پیج فالو کریں' : 'Follow on Facebook'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                    <PhoneCall className="w-3.5 h-3.5 text-brand-blue" />
                    <span>ہیلپ لائن: 1915</span>
                  </div>
                </div>
              </div>

              {/* District Police Card */}
              <div className="rounded-3xl bg-brand-light-bg border border-brand-light-border p-6 sm:p-8 flex flex-col justify-between hover:border-brand-blue-300 hover:shadow-xl transition-all duration-300 group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-white p-2 shadow-md border border-slate-200 flex items-center justify-center">
                      <img
                        src={dpoLogoImg}
                        alt="District Police Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-[11px] font-black uppercase px-2.5 py-1 rounded-full bg-[#000080] text-white tracking-wide">
                      {language === 'ur' ? 'ضلعی پولیس' : 'District Police'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-brand-dark">
                      {language === 'ur' ? 'ڈسٹرکٹ پولیس ایبٹ آباد' : 'District Police Abbottabad'}
                    </h3>
                    <p className="text-xs text-brand-blue font-semibold mt-0.5">
                      @Atdpolice • Facebook Official
                    </p>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {language === 'ur'
                      ? 'ضلع ایبٹ آباد میں امن و امان، کمیونٹی پولیسنگ، جرائم کی روک تھام اور ضلعی انتظامیہ کے اہم نوٹسز۔'
                      : 'Law and order updates, crime prevention initiatives, community policing alerts, and DPO office notifications.'}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center justify-between gap-3 flex-wrap">
                  <a
                    href="https://www.facebook.com/share/19s6gggUoU/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1877F2] text-white font-bold text-xs hover:bg-[#166fe5] transition-all duration-200 shadow-sm"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                    <span>{language === 'ur' ? 'پیج فالو کریں' : 'Follow on Facebook'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                    <PhoneCall className="w-3.5 h-3.5 text-red-600" />
                    <span>ہیلپ لائن: 15</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick 1915 Helpline Banner */}
            <div className="rounded-2xl bg-gradient-to-r from-[#000080] to-[#091A36] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-gov-lg border border-brand-lime/20">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-12 h-12 rounded-2xl bg-brand-lime text-brand-dark flex items-center justify-center shrink-0 shadow-md font-black text-lg">
                  1915
                </div>
                <div>
                  <h4 className="font-extrabold text-base sm:text-lg text-white">
                    {language === 'ur'
                      ? 'ٹریفک ایمرجنسی و رہنمائی ہیلپ لائن (ٹول فری)'
                      : '24/7 Traffic Emergency & Assistance Helpline'}
                  </h4>
                  <p className="text-xs sm:text-sm text-white/80">
                    {language === 'ur'
                      ? 'گاڑی خرابی، ٹریفک جام، یا سفر میں کسی بھی رکاوٹ کی صورت میں فوری 1915 پر کال کریں۔'
                      : 'For breakdown recovery, mountain route guidance or emergency assistance, dial 1915.'}
                  </p>
                </div>
              </div>

              <a
                href="tel:1915"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-lime text-brand-dark font-extrabold text-sm hover:bg-brand-lime-hover transition-colors shadow-sm shrink-0"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{language === 'ur' ? 'کال کریں 1915' : 'Call 1915'}</span>
              </a>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
};

export default MediaNews;