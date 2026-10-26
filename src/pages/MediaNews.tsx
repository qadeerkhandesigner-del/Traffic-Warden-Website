import React, { useEffect, useState } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { useLanguage } from '../hooks/useLanguage';
import { Users, ExternalLink, Radio, ShieldCheck } from 'lucide-react';

export const MediaNews: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeFeed, setActiveFeed] = useState<'traffic' | 'dpo'>('traffic');

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

  const feeds = {
    traffic: {
      id: 'traffic',
      nameEn: 'Traffic Police Abbottabad',
      nameUr: 'ٹریفک پولیس ایبٹ آباد',
      badgeEn: 'Official Traffic Feed',
      badgeUr: 'سرکاری ٹریفک فیڈ',
      directUrl: 'https://www.facebook.com/share/19gsCAnDFg/',
      embedUrl:
        'https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fpeople%2FTraffic-Police-ATD%2F100069522356711%2F&tabs=timeline&width=500&height=800&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId',
    },
    dpo: {
      id: 'dpo',
      nameEn: 'District Police Abbottabad',
      nameUr: 'ڈسٹرکٹ پولیس ایبٹ آباد',
      badgeEn: 'District Police Feed',
      badgeUr: 'ضلعی پولیس فیڈ',
      directUrl: 'https://www.facebook.com/share/19s6gggUoU/',
      embedUrl:
        'https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FAtdpolice&tabs=timeline&width=500&height=800&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId',
    },
  };

  const current = feeds[activeFeed];

  return (
    <div className="space-y-0 text-brand-dark bg-brand-light-bg overflow-x-hidden">
      {/* Hero Header */}
      <section className="py-16 sm:py-20 bg-brand-light-surface border-b border-brand-light-border">
        <PageContainer>
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider">
              <svg className="w-4 h-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <span>{t('MEDIA & SOCIAL UPDATES', 'میڈیا اور سوشل اپڈیٹس')}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-dark tracking-tight leading-tight">
              {t('MEDIA & NEWS UPDATES', 'میڈیا اور خبریں')}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
              {t(
                'Stay updated with the latest news, traffic advisories, public notices and official announcements from Traffic Warden Abbottabad and Abbottabad Police through our official Facebook pages.',
                'ٹریفک وارڈن ایبٹ آباد اور ایبٹ آباد پولیس کے سرکاری فیس بک پیجز سے تازہ ترین خبریں، ٹریفک ایڈوائزریز، عوامی نوٹسز اور سرکاری اعلانات سے باخبر رہیں۔'
              )}
            </p>
          </div>
        </PageContainer>
      </section>

      {/* LIVE FACEBOOK FEED EMBED SECTION */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-brand-light-border">
        <PageContainer>
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Header + Live Status */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-200 text-xs font-bold uppercase tracking-wider mb-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                  </span>
                  <Radio className="w-3.5 h-3.5" />
                  <span>{t('LIVE OFFICIAL FEED', 'لائیو آفیشل فیڈ')}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
                  {t('Official Facebook Posts & Updates', 'سرکاری فیس بک لائیو فیڈ و پوسٹس')}
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  {t(
                    'Direct feed from Traffic Police Abbottabad official Facebook page with real-time advisories.',
                    'ٹریفک پولیس ایبٹ آباد کے سرکاری پیج سے براہِ راست لائیو پوسٹس اور اہم ہدایات۔'
                  )}
                </p>
              </div>

              {/* Feed Switcher Tabs */}
              <div className="inline-flex p-1 rounded-2xl bg-white border border-slate-200 shadow-sm shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveFeed('traffic')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                    activeFeed === 'traffic'
                      ? 'bg-[#1877F2] text-white shadow'
                      : 'text-slate-600 hover:text-brand-dark'
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  <span>{language === 'ur' ? 'ٹریفک پولیس ایبٹ آباد' : 'Traffic Police ATD'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFeed('dpo')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                    activeFeed === 'dpo'
                      ? 'bg-[#1877F2] text-white shadow'
                      : 'text-slate-600 hover:text-brand-dark'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{language === 'ur' ? 'ضلعی پولیس' : 'District Police'}</span>
                </button>
              </div>
            </div>

            {/* Main Embed Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
              {/* Card Top Banner */}
              <div className="bg-[#1877F2] text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-base sm:text-lg flex items-center gap-2">
                      <span>{language === 'ur' ? current.nameUr : current.nameEn}</span>
                      <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                        {language === 'ur' ? current.badgeUr : current.badgeEn}
                      </span>
                    </div>
                    <div className="text-xs text-white/80">
                      {language === 'ur' ? 'براہ راست فیس بک فیڈ' : 'Live Official Facebook Feed'}
                    </div>
                  </div>
                </div>

                <a
                  href={current.directUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[#1877F2] font-bold text-xs hover:bg-slate-100 transition-colors shadow-sm self-start sm:self-auto"
                >
                  <span>{language === 'ur' ? 'فیس بک پر دیکھیں' : 'Open on Facebook'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Embed Content Area */}
              <div className="p-4 sm:p-6 bg-slate-100 flex flex-col items-center justify-center min-h-[500px]">
                <div className="w-full max-w-[500px] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex justify-center">
                  <iframe
                    key={current.id}
                    src={current.embedUrl}
                    width="500"
                    height="800"
                    style={{ border: 'none', overflow: 'hidden' }}
                    scrolling="yes"
                    frameBorder="0"
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    title={`${current.nameEn} Facebook Live Feed`}
                    className="w-full max-w-[500px] min-h-[650px] sm:min-h-[750px]"
                  />
                </div>

                <div className="mt-4 text-center">
                  <p className="text-xs text-slate-500">
                    {language === 'ur'
                      ? 'اگر فیڈ لوڈ نہ ہو رہی ہو تو براہ راست فیس بک پیج وزٹ کریں:'
                      : 'If feed does not load in your browser, visit the official page directly:'}
                  </p>
                  <a
                    href={current.directUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1877F2] hover:underline mt-1"
                  >
                    <span>{current.directUrl}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* LATEST NEWS SECTION */}
      <section className="py-16 sm:py-20 bg-brand-light-bg">
        <PageContainer>
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-brand-blue rounded-full"></div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark">
                {t('LATEST NEWS', 'تازہ ترین خبریں')}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-12">
              {latestNews.map((news, idx) => (
                <div key={idx} className="bg-brand-light-surface rounded-3xl border border-brand-light-border overflow-hidden shadow-sm">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="p-6 sm:p-8 space-y-6">
                      <div className="text-right" dir="rtl">
                        <h3 className="text-xl sm:text-2xl font-bold text-brand-dark mb-4 leading-snug">
                          {news.titleUr}
                        </h3>
                        <p className="text-slate-600 leading-relaxed whitespace-pre-line text-right">
                          {news.contentUr}
                        </p>
                      </div>
                      <div className="flex items-center justify-end gap-2 text-sm text-slate-400">
                        <span>{news.date}</span>
                      </div>
                    </div>
                    <div className="p-6 sm:p-8 bg-slate-50 grid grid-cols-2 gap-4">
                      {news.images.map((img, imgIdx) => (
                        <div key={imgIdx} className={`relative rounded-2xl overflow-hidden shadow-md ${imgIdx === 0 ? 'col-span-2 h-80' : 'h-32'}`}>
                          <img 
                            src={img} 
                            alt={`News image ${imgIdx + 1}`} 
                            className={`w-full h-full transition-transform duration-500 hover:scale-105 ${imgIdx === 0 ? 'object-contain bg-slate-200' : 'object-cover'}`}
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

      {/* CONNECT ON SOCIAL MEDIA */}
      <section className="py-12 sm:py-16 bg-brand-light-surface border-t border-brand-light-border">
        <PageContainer>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 text-xs font-semibold uppercase tracking-wider">
              <Users className="w-4 h-4" />
              <span>{t('STAY CONNECTED', 'جڑے رہیں')}</span>
            </div>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {t(
                'For real-time updates, follow our official Facebook pages. All important announcements, traffic diversions, road safety campaigns and public facilitation updates are shared here first.',
                'فوری اپڈیٹس کے لیے ہمارے سرکاری فیس بک پیجز فالو کریں۔ تمام اہم اعلانات، ٹریفک ڈائیورسشنز، روڈ سیفٹی مہمات اور عوامی سہولت سے متعلق اپڈیٹس سب سے پہلے یہاں شیئر کیے جاتے ہیں۔'
              )}
            </p>
            <div className="flex flex-wrap justify-center gap-10 pt-4">
              <div className="flex flex-col items-center gap-3">
                <span className="text-sm font-bold text-brand-dark uppercase tracking-wide">Traffic Police Abbottabad Facebook</span>
                <a 
                  href="https://www.facebook.com/share/19gsCAnDFg/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
                  title="Traffic Police Abbottabad Facebook"
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </a>
              </div>
              <div className="flex flex-col items-center gap-3">
                <span className="text-sm font-bold text-brand-dark uppercase tracking-wide">District Police Abbottabad Facebook</span>
                <a 
                  href="https://www.facebook.com/share/19s6gggUoU/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
                  title="District Police Abbottabad Facebook"
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </a>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
};

export default MediaNews;