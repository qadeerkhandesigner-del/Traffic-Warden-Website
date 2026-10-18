import React, { useEffect } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { useLanguage } from '../hooks/useLanguage';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { ExternalLink, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const MediaNews: React.FC = () => {
  const { language, t } = useLanguage();

  useEffect(() => {
    document.title = t(
      'Media & News | Traffic Warden Abbottabad — Khyber Pakhtunkhwa Police',
      'میڈیا اور خبریں | ٹریفک وارڈن ایبٹ آباد — خیبر پختونخوا پولیس'
    );

    if (!document.getElementById('facebook-jssdk')) {
      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    } else if ((window as any).FB) {
      (window as any).FB.XFBML.parse();
    }
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
                    <a href={page.href} target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<ExternalLink className="w-4 h-4" />}
                      >
                        {t('Visit Page', 'پیج دیکھیں')}
                      </Button>
                    </a>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="rounded-2xl overflow-hidden border border-brand-light-border bg-white flex justify-center">
                    <div
                      className="fb-page"
                      data-href={page.url}
                      data-tabs="timeline"
                      data-width="500"
                      data-height="650"
                      data-small-header="false"
                      data-adapt-container-width="true"
                      data-hide-cover="false"
                      data-show-facepile="false"
                      data-lazy="true"
                    >
                      <blockquote cite={page.url} className="fb-xfbml-parse-ignore">
                        <a href={page.url}>{t(page.titleEn, page.titleUr)}</a>
                      </blockquote>
                    </div>
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

declare global {
  interface Window {
    FB?: any;
  }
}

export default MediaNews;
