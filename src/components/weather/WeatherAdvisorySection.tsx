import React from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  PhoneCall,
  Info,
  CheckCircle2,
  Wind,
  CloudRain,
  Snowflake,
  Eye,
} from 'lucide-react';
import type { WeatherAdvisoryRisk } from '../../types/weather';
import { useLanguage } from '../../hooks/useLanguage';

interface WeatherAdvisorySectionProps {
  risks: WeatherAdvisoryRisk[];
}

export const WeatherAdvisorySection: React.FC<WeatherAdvisorySectionProps> = ({ risks }) => {
  const { language } = useLanguage();

  const getRiskIcon = (parameter: WeatherAdvisoryRisk['parameter']) => {
    switch (parameter) {
      case 'snow':
        return <Snowflake className="w-5 h-5 text-cyan-600" />;
      case 'rain':
        return <CloudRain className="w-5 h-5 text-blue-600" />;
      case 'fog':
        return <Eye className="w-5 h-5 text-amber-600" />;
      case 'wind':
        return <Wind className="w-5 h-5 text-teal-600" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
    }
  };

  const renderRiskCards = () => (
    <div className="space-y-4">
      {risks.map((risk) => (
        <div
          key={risk.id}
          className="bg-white rounded-xl border border-amber-200/80 p-5 shadow-gov hover:shadow-gov-md transition-shadow relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500" />
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-50 shrink-0 mt-0.5">
              {getRiskIcon(risk.parameter)}
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <h4 className="font-bold text-sm sm:text-base text-slate-900">
                  {language === 'ur' ? risk.titleUrdu : risk.title}
                </h4>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                  {language === 'ur' ? 'محتاط رہیں' : 'Advisory'}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {language === 'ur' ? risk.descriptionUrdu : risk.description}
              </p>

              <div className="pt-2 text-[11px] text-slate-500 flex flex-wrap items-center gap-1.5">
                <span className="font-semibold text-slate-700">
                  {language === 'ur' ? 'متاثرہ مقامات:' : 'Monitored areas:'}
                </span>
                {risk.affectedLocations.map((loc) => (
                  <span
                    key={loc}
                    className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-medium"
                  >
                    {loc}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Two column layout: Left = Advisories, Right = Road Conditions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Weather Advisories or Normal Conditions */}
        <div className="space-y-4">
          {risks.length > 0 ? (
            <>
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg sm:text-xl font-bold text-brand-dark">
                  {language === 'ur' ? 'موسمی انتباہات اور سفری احتیاطی تدابیر' : 'Forecast-Based Travel Advisories'}
                </h3>
              </div>
              {renderRiskCards()}
            </>
          ) : (
            <div className="rounded-xl bg-emerald-50/70 border border-emerald-200 p-4 sm:p-5 flex items-center gap-3.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="text-xs sm:text-sm text-emerald-900">
                <span className="font-bold">
                  {language === 'ur' ? 'کوئی شدید موسمی خطرہ نہیں:' : 'Normal Weather Conditions:'}
                </span>{' '}
                {language === 'ur'
                  ? 'موجودہ موسمیاتی ماڈلز کے مطابق ایبٹ آباد اور گلیات میں موسم عمومی اور مستحکم ہے۔ معمول کے مطابق ٹریفک قوانین کی پابندی کریں۔'
                  : 'Numerical forecast models currently report stable atmospheric conditions across Abbottabad and Galiyat tourist routes.'}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Road Conditions & Contact - Always shown */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg sm:text-xl font-bold text-brand-dark">
              {language === 'ur' ? 'رود کنڈشنز اور رابطہ' : 'Road Conditions & Contact'}
            </h3>
          </div>

          <div className="bg-white rounded-xl border border-blue-200/80 p-5 shadow-gov hover:shadow-gov-md transition-shadow relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500" />
            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-blue-50 shrink-0 mt-0.5">
                  <PhoneCall className="w-5 h-5 text-blue-600" />
                </div>
                <div className="space-y-2 flex-1">
                  <h4 className="font-bold text-sm sm:text-base text-slate-900">
                    {language === 'ur' ? 'روزمرہ کی تازہ ترین روڈ کنڈشنز' : 'Daily Road Conditions Updates'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {language === 'ur'
                      ? 'رود کنڈشنز کی تازہ ترین معلومات ہماری ویب سائٹ پر دستیاب ہیں جو روزانہ اساس پر اپڈیٹ ہوتی رہتی ہیں۔'
                      : 'Latest road conditions information is available on our website and updated daily.'}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4 space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <PhoneCall className="w-4 h-4 text-brand-blue shrink-0" />
                  <span className="font-medium">
                    {language === 'ur' ? 'ہیلپ لائن: ' : 'Helpline: '}
                    <span className="font-extrabold text-brand-blue">1915</span>
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <PhoneCall className="w-4 h-4 text-brand-blue shrink-0" />
                  <span className="font-medium">
                    {language === 'ur' ? 'کمانڈ اینڈ کنٹرول: ' : 'Command & Control: '}
                    <span className="font-extrabold text-brand-blue">0992-921042</span>
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {language === 'ur'
                    ? 'مزید معلومات اور ٹریفک رسائی کے لیے فی حال رابطہ کریں۔'
                    : 'Contact immediately for further information and traffic assistance.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};