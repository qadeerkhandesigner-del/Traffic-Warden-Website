import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { useLanguage } from '../hooks/useLanguage';
import { Users } from 'lucide-react';

declare global {
  interface Window {
    FB?: {
      XFBML?: { parse?: (node?: HTMLElement) => void };
      Event?: { subscribe?: (name: string, cb: () => void) => void };
    };
  }
}

export const MediaNews: React.FC = () => {
  const { language, t } = useLanguage();
  const [embedFailed, setEmbedFailed] = useState(false);
  const pollRef = useRef<number | null>(null);

  useEffect(() => {
    document.title = t(
      'Media & News | Traffic Warden Abbottabad — Khyber Pakhtunkhwa Police',
      'میڈیا اور خبریں | ٹریفک وارڈن ایبٹ آباد — خیبر پختونخوا پولیس'
    );

    const parseFb = () => {
      window.FB?.XFBML?.parse?.();
    };

    if (!document.getElementById('facebook-jssdk')) {
      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0';
      script.async = true;
      script.defer = true;
      script.onload = parseFb;
      document.body.appendChild(script);
    } else {
      parseFb();
    }

    let checks = 0;
    pollRef.current = window.setInterval(() => {
      checks += 1;
      const rendered = document.querySelector('.fb-page iframe') !== null;
      setEmbedFailed(checks >= 4 && !rendered);
      if (rendered && pollRef.current !== null) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }
      if (checks >= 10 && pollRef.current !== null) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }
    }, 1200);

    return () => {
      if (pollRef.current !== null) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
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

  return (
    <div className="space-y-0 text-brand-dark bg-brand-light-bg overflow-x-hidden">
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
                'ٹریفک وارڈن ایبٹ آباد اور ایبٹ آباد پولیس کے سرکاری فیس بک پیجز سے تازہ ترین خبریں، ٹریفک ایڈوائزریز، عوامی نوٹسز اور سرکاری اعلانوں سے باخبر رہیں۔'
              )}
            </p>
          </div>
        </PageContainer>
      </section>

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
                  href="https://www.facebook.com/TrafficWardenAbbottabad/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
                  title="Traffic Warden Abbottabad Facebook"
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </a>
              </div>
              <div className="flex flex-col items-center gap-3">
                <span className="text-sm font-bold text-brand-dark uppercase tracking-wide">District Police Abbottabad Facebook</span>
                <a 
                  href="https://www.facebook.com/AbbottabadPoliceOfficial/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
                  title="Abbottabad Police Facebook"
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