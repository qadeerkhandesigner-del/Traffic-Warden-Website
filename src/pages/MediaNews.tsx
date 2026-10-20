import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { useLanguage } from '../hooks/useLanguage';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { ExternalLink, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';

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
  /* Facebook page plugins (embedded feeds) fail to render on some networks,
     browsers with tracking protection or when Facebook requires a login.
     After mounting, the SDK is watched; if the plugins still show no iframe
     after a few seconds, an honest fallback panel is displayed. */
  const [embedFailed, setEmbedFailed] = useState(false);
  const pollRef = useRef<number | null>(null);

  useEffect(() => {
    document.title = t(
      'Media & News | Traffic Warden Abbottabad — Khyber Pakhtunkhwa Police',
      'میڈیا اور خبریں | ٹریفک وارڈن ایبٹ آباد — خیبر پختونخوا پولیس'
    );

    /* Parse the XFBML markup as soon as — or whenever — the SDK is ready.
       Without this the .fb-page divs render as empty blockquotes forever. */
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

    /* Watch the plugins: if no embed iframe appears, show the fallback. The
       same check clears itself if Facebook renders late. */
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

  const pages = [
    {
      titleEn: 'Traffic Warden Abbottabad - Facebook Page',
      titleUr: 'ٹریفک وارڈن ایبٹ آباد - فیس بک پیج',
      url: 'https://www.facebook.com/TrafficWardenAbbottabad',
      href: 'https://www.facebook.com/TrafficWardenAbbottabad',
      descriptionEn: 'Latest updates, traffic advisories & public notices',
      descriptionUr: 'تازہ ترین اپڈیٹس، ٹریفک ایڈوائزریز اور عوامی نوٹسز',
    },
    {
      titleEn: 'Abbottabad Police - Facebook Page',
      titleUr: 'ایبٹ آباد پولیس - فیس بک پیج',
      url: 'https://www.facebook.com/AbbottabadPoliceOfficial',
      href: 'https://www.facebook.com/AbbottabadPoliceOfficial',
      descriptionEn: 'Official updates from Abbottabad Police',
      descriptionUr: 'ایبٹ آباد پولیس کی سرکاری تازہ ترین خبریں',
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
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {pages.map((page, idx) => (
              <Card
                key={idx}
                className="rounded-3xl bg-brand-light-surface border border-brand-light-border hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <CardHeader className="space-y-4 pb-4">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center shadow-sm">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                      </div>
                      <div className="space-y-1">
                        <h2 className="text-lg sm:text-xl font-bold text-brand-dark">
                          {t(page.titleEn, page.titleUr)}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600">
                          {t(page.descriptionEn, page.descriptionUr)}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      href={page.href}
                      target="_blank"
                      leftIcon={<ExternalLink className="w-4 h-4" />}
                    >
                      {t('Visit Page', 'پیج دیکھیں')}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  {/* Embedded Facebook page feed. data-lazy removed: it delays
                      the iframe until scrolled, which makes the feed look
                      broken on tall cards. */}
                  <div className="rounded-2xl overflow-hidden border border-brand-light-border bg-white flex justify-center">
                    <div
                      className={`fb-page${embedFailed ? ' hidden' : ''}`}
                      data-href={page.url}
                      data-tabs="timeline"
                      data-width="500"
                      data-height="650"
                      data-small-header="false"
                      data-adapt-container-width="true"
                      data-hide-cover="false"
                      data-show-facepile="false"
                    >
                      <blockquote cite={page.url} className="fb-xfbml-parse-ignore">
                        <a href={page.url}>{t(page.titleEn, page.titleUr)}</a>
                      </blockquote>
                    </div>
                    {embedFailed && (
                      <div className="w-full flex flex-col items-center justify-center gap-4 py-14 px-6 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-[#1877F2]/10 flex items-center justify-center">
                          <svg className="w-7 h-7 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                          </svg>
                        </div>
                        <div className="space-y-2 max-w-md">
                          <p className="text-sm font-semibold text-brand-dark">
                            {t(
                              'Facebook feed unavailable here',
                              'فیس بک فیڈ یہاں دستیاب نہیں'
                            )}
                          </p>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {t(
                              'Facebook embeds can be blocked by tracking protection, browser extensions or a login requirement. You can read all official updates directly on the Facebook page.',
                              'فیس بک ایمبیڈ کچھ براؤزرز، ایکسٹینشنز یا لاگ ان کی ضرورت کی وجہ سے بند ہو سکتا ہے۔ تمام سرکاری اپڈیٹس آپ سیدھا فیس بک پیج پر دیکھ سکتے ہیں۔'
                            )}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          href={page.href}
                          target="_blank"
                          leftIcon={<ExternalLink className="w-4 h-4" />}
                        >
                          {t('Open on Facebook', 'فیس بک پر کھولیں')}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="py-12 sm:py-16 bg-brand-light-surface border-t border-brand-light-border">
        <PageContainer>
          <div className="max-w-3xl mx-auto text-center space-y-4">
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
          </div>
        </PageContainer>
      </section>
    </div>
  );
};

export default MediaNews;
