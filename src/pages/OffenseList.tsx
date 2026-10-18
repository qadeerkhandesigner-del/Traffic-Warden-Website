import React, { useEffect, useMemo, useState } from 'react';
import {
  Banknote,
  CircleAlert,
  ListOrdered,
  PhoneCall,
  Scale,
  Search,
  Table,
  X,
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { useLanguage } from '../hooks/useLanguage';

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */

interface FineColumn {
  key: string;
  label: string;
  full?: string;
}

interface FineRow {
  no: number;
  name: string;
  fines: string[];
}

/** Part I — MC, Car, TW, LTV, HTV/PSV */
const MOVING_COLUMNS: FineColumn[] = [
  { key: 'MC', label: 'MC', full: 'Motorcycle' },
  { key: 'Car', label: 'Car', full: 'Motorcar / Jeep' },
  { key: 'TW', label: 'TW', full: 'Tri-Wheeler' },
  { key: 'LTV', label: 'LTV', full: 'Light Transport Vehicle' },
  { key: 'HTV/PSV', label: 'HTV/PSV', full: 'Heavy Transport / Public Service Vehicle' },
];

const LEGEND = [
  { label: 'MC', full: 'Motorcycle', ur: 'موٹرسائیکل' },
  { label: 'Car', full: 'Motorcar / Jeep', ur: 'موٹر کار / جیپ' },
  { label: 'TW', full: 'Tri-Wheeler', ur: 'سہ پہیہ' },
  { label: 'LTV', full: 'Light Transport Vehicle', ur: 'لائٹ ٹرانسپورٹ گاڑی' },
  {
    label: 'HTV/PSV',
    full: 'Heavy Transport / Public Service Vehicle',
    ur: 'بھاری ٹرانسپورٹ / پبلک سروس گاڑی',
  },
];

const MOVING_VIOLATIONS: FineRow[] = [
  { no: 1, name: 'Exceeding Prescribed Speed Limit', fines: ['500', '1,000', '200', '1,000', '1,500'] },
  { no: 2, name: 'Carrying Passengers Beyond Permissible Limit', fines: ['—', '1,000', '200', '1,500', '2,000'] },
  { no: 3, name: 'Violation of Traffic Signals', fines: ['500', '1,000', '200', '1,000', '1,500'] },
  { no: 4, name: 'Overloading by Goods Transport Vehicles', fines: ['—', '—', '200', '2,500–7,500*', '5,000–15,000*'] },
  { no: 5, name: 'Overtaking Where Prohibited', fines: ['300', '500', '200', '700', '1,000'] },
  { no: 6, name: 'Failure to Yield Right of Way', fines: ['300', '500', '200', '700', '1,000'] },
  { no: 7, name: 'Obstructing Emergency Vehicles', fines: ['300', '500', '200', '700', '1,000'] },
  { no: 8, name: 'Exceeding Permitted Goods Dimensions', fines: ['—', '—', '200', '1,000', '1,500'] },
  { no: 9, name: 'Driving at Night Without Proper Lights', fines: ['500', '1,000', '200', '1,000', '1,500'] },
  { no: 10, name: 'Driving on the Wrong Side of the Road', fines: ['1,000', '2,000', '200', '2,000', '4,000'] },
  { no: 11, name: 'Disobeying Traffic Signals', fines: ['500', '1,000', '200', '1,000', '1,500'] },
  { no: 12, name: 'Improper Railway Track Crossing', fines: ['300', '500', '200', '500', '1,000'] },
  { no: 13, name: 'Following Too Closely or Cutting Too Sharply', fines: ['300', '500', '200', '500', '1,000'] },
  { no: 14, name: 'Tinted or Covered Glass Obstructing Visibility', fines: ['—', '1,500', '200', '1,500', '2,000'] },
  { no: 15, name: 'Jumping the Traffic Queue', fines: ['200', '500', '200', '500', '1,000'] },
  { no: 16, name: 'Failure to Dip Headlights for Other Traffic', fines: ['200', '500', '200', '500', '1,000'] },
  { no: 17, name: 'Driving the Wrong Way on a One-Way Street', fines: ['1,000', '2,000', '200', '2,000', '4,000'] },
  { no: 18, name: 'Improper Use of Turn Indicators', fines: ['200', '500', '200', '500', '700'] },
  { no: 19, name: 'Plying Where Prohibited*', fines: ['300', '500', '200', '500', '1,000'] },
  { no: 20, name: 'Improper Loading of Goods', fines: ['—', '—', '200', '1,000', '1,500'] },
  { no: 21, name: 'Failure to Observe Lighting Hours', fines: ['300', '500', '200', '500', '1,000'] },
  { no: 22, name: 'Obstructing Traffic', fines: ['300', '500', '200', '700', '1,000'] },
  { no: 23, name: 'Failure to Observe Slow Sign', fines: ['300', '500', '200', '500', '1,000'] },
  { no: 24, name: 'Riding a Motorcycle Without a Safety Helmet', fines: ['1,000', '—', '—', '—', '—'] },
  { no: 25, name: 'Failure to Stop for a School Bus', fines: ['200', '300', '200', '500', '500'] },
  { no: 26, name: 'Turning Where Prohibited', fines: ['500', '1,000', '200', '1,000', '1,500'] },
  { no: 27, name: 'Failure to Protect Learner Drivers', fines: ['200', '400', '200', '400', '600'] },
  { no: 28, name: 'Failure to Yield to Pedestrians', fines: ['200', '500', '200', '700', '1,000'] },
  { no: 29, name: 'Reckless and Negligent Driving', fines: ['1,000', '1,500', '200', '2,000', '3,000'] },
  { no: 30, name: 'Driving Without a Driving Licence', fines: ['1,000', '2,000', '1,000', '3,000', '5,000'] },
  { no: 31, name: 'Driving an Unregistered Vehicle', fines: ['2,000', '3,000', '200', '5,000', '5,000'] },
  { no: 32, name: 'Driving Without Insurance Coverage', fines: ['200', '500', '200', '500', '1,000'] },
  { no: 33, name: 'Transport Vehicle Without / With Defective Speedometer', fines: ['200', '500', '200', '500', '1,000'] },
  { no: 34, name: 'Opening a Vehicle Door Dangerously', fines: ['—', '500', '200', '700', '1,000'] },
  { no: 35, name: 'Improper Turning from the Wrong Lane', fines: ['300', '500', '200', '700', '1,000'] },
  { no: 36, name: 'Improper Lane Usage', fines: ['300', '500', '200', '700', '1,000'] },
  { no: 37, name: 'Blowing Horn in a Silence Zone', fines: ['200', '300', '200', '500', '500'] },
  { no: 38, name: 'Improper U-Turn', fines: ['200', '500', '200', '700', '1,000'] },
  { no: 39, name: 'Refusal to Produce Driving Licence', fines: ['500', '1,000', '200', '1,000', '1,500'] },
  { no: 40, name: 'Failure to Stop When Required by Traffic Police', fines: ['500', '700', '200', '1,000', '1,500'] },
  { no: 41, name: 'Driving Without a Fitness Certificate', fines: ['—', '—', '1,000', '1,000', '2,000'] },
  { no: 42, name: 'Exceeding Prescribed Vehicle Weight Limit', fines: ['—', '—', '500', '2,500', '15,000'] },
  { no: 43, name: 'Using a Vehicle in Unsafe Condition', fines: ['300', '500', '200', '700', '1,000'] },
  { no: 44, name: 'Using Pressing / Musical Horns', fines: ['300', '500', '200', '1,000', '1,500'] },
  { no: 45, name: 'Other Traffic Law / Rule Violations', fines: ['500', '1,000', '200', '1,000', '1,500'] },
  { no: 46, name: 'Smoke-Emitting Vehicle', fines: ['500', '1,000', '200', '1,000', '2,000'] },
  { no: 47, name: 'Juvenile Driving', fines: ['3,000', '5,000', '200', '5,000', '10,000'] },
  { no: 48, name: 'Using a Mobile Phone While Driving', fines: ['1,000', '2,000', '200', '3,000', '5,000'] },
  { no: 49, name: 'One-Wheeling by Motorcyclist', fines: ['5,000', '—', '200', '—', '—'] },
  { no: 50, name: 'Repeating the Same Violation', fines: ['1,200', '1,200', '200', '1,200', '1,200'] },
  { no: 51, name: 'Abetment of Listed Violations', fines: ['300', '500', '200', '700', '1,000'] },
  { no: 52, name: 'Driving Without a Route Permit, Where Required', fines: ['—', '—', '5,000', '5,000', '5,000'] },
  { no: 53, name: 'Repeating the Violation at Serial No. 52', fines: ['—', '—', '10,000', '10,000', '10,000'] },
  { no: 54, name: 'Repeating the Overloading Violation at Serial No. 4', fines: ['—', '—', '200', '10,000', '10,000'] },
  { no: 55, name: 'Driving Without Fastening a Seat Belt', fines: ['—', '1,000', '—', '1,000', '1,000'] },
  { no: 56, name: 'Participating in an Unauthorized Race', fines: ['2,000', '3,000', '200', '5,000', '5,000'] },
  { no: 57, name: 'Illegal or Missing Number Plate', fines: ['500', '1,000', '200', '1,000', '1,500'] },
  { no: 58, name: 'Charging Extra Fare', fines: ['500', '1,000', '200', '2,000', '3,000'] },
  { no: 59, name: 'Driving at Night on High Beam / Dazzling Lights', fines: ['500', '1,000', '200', '1,500', '2,000'] },
  { no: 60, name: 'Driving While Unfit or Under the Influence of Drugs / Alcohol', fines: ['1,000', '3,000', '200', '5,000', '5,000'] },
  { no: 61, name: 'Goods Loading Causing Material / Liquid to Spill', fines: ['200', '500', '200', '3,000', '5,000'] },
  { no: 62, name: 'Carrying Passengers / Students Outside Vehicle Cabin', fines: ['—', '—', '200', '3,000', '5,000'] },
  { no: 63, name: 'Driver / Front Passenger Not Wearing Seat Belt', fines: ['—', '500', '—', '700', '1,000'] },
  { no: 64, name: 'Child Under 12 Years on Front Passenger Seat', fines: ['—', '500', '500', '500', '1,000'] },
  { no: 65, name: 'Transport Vehicle with Expired Route Permit', fines: ['—', '—', '1,000', '2,000', '5,000'] },
  { no: 66, name: 'Transport Vehicle with Expired Fitness Certificate', fines: ['—', '—', '1,000', '1,000', '2,500'] },
  { no: 67, name: 'Leaving a Vehicle in a Dangerous Position', fines: ['500', '500', '200', '500', '1,000'] },
  { no: 68, name: 'Driving on a Disqualified Licence', fines: ['500', '1,000', '200', '1,000', '1,000'] },
  { no: 69, name: 'Illegal Vehicle Alteration / Modification', fines: ['500', '1,000', '200', '2,000', '2,500'] },
  { no: 70, name: 'Failure to Stop After an Accident', fines: ['500', '1,000', '200', '1,500', '2,000'] },
  { no: 71, name: 'Using / Taking a Vehicle Without Required Authority or Documents', fines: ['500', '1,000', '200', '1,500', '2,000'] },
  { no: 72, name: 'Disobeying Orders, Obstruction or Refusal to Provide Information', fines: ['1,000', '1,000', '200', '1,000', '1,000'] },
  { no: 73, name: 'Noise Pollution Due to Illegal Vehicle Modification', fines: ['2,000', '3,000', '200', '3,000', '3,000'] },
  { no: 74, name: 'Having a Fake Driving Licence', fines: ['5,000', '5,000', '5,000', '10,000', '10,000'] },
];

/** Part II — Motorcycle, Car ≤1300cc, Car >1300cc, Tri-Wheeler, LTV, HTV/PSV */
const PARKING_COLUMNS: FineColumn[] = [
  { key: 'motorcycle', label: 'Motorcycle' },
  { key: 'car-small', label: 'Car ≤1300cc' },
  { key: 'car-large', label: 'Car >1300cc' },
  { key: 'tw', label: 'Tri-Wheeler' },
  { key: 'ltv', label: 'LTV' },
  { key: 'htv', label: 'HTV/PSV' },
];

const PARKING_VIOLATIONS: FineRow[] = [
  { no: 1, name: 'Parking More Than 0.5 Metre from the Kerb', fines: ['200', '300', '500', '200', '300', '500'] },
  { no: 2, name: 'Parking on a Footpath', fines: ['500', '1,000', '1,500', '200', '1,000', '1,500'] },
  { no: 3, name: 'Parking Less Than 0.5 Metre from Another Car', fines: ['200', '200', '500', '200', '300', '500'] },
  { no: 4, name: 'Parking on a Zebra Crossing', fines: ['300', '500', '1,000', '200', '700', '1,000'] },
  { no: 5, name: 'Parking Within 10 Metres of a Stop Sign', fines: ['200', '300', '500', '200', '300', '500'] },
  { no: 6, name: 'Parking Within 10 Metres of an Intersection', fines: ['200', '300', '500', '200', '300', '500'] },
  { no: 7, name: 'Parking in a No-Parking Zone', fines: ['500', '1,000', '1,500', '200', '1,000', '1,500'] },
  { no: 8, name: 'Parking in Front of a Premises Entrance', fines: ['300', '500', '1,000', '200', '500', '1,000'] },
  { no: 9, name: 'Parking at a Bus Stop', fines: ['200', '300', '700', '200', '500', '700'] },
  { no: 10, name: 'Parking on a Bridge', fines: ['200', '300', '700', '200', '500', '700'] },
  { no: 11, name: 'Parking on a Sidewalk', fines: ['200', '300', '700', '200', '500', '700'] },
];

const NOT_SPECIFIED = '—';

/* -------------------------------------------------------------------------- */
/*                              REUSABLE FINE TABLE                           */
/* -------------------------------------------------------------------------- */

interface FineTableProps {
  columns: FineColumn[];
  rows: FineRow[];
  minWidthClass: string;
  columnWidthClass: string;
  caption: string;
}

const FineTable: React.FC<FineTableProps> = ({
  columns,
  rows,
  minWidthClass,
  columnWidthClass,
  caption,
}) => {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');

  const filteredRows = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return rows;
    return rows.filter(
      (row) => row.name.toLowerCase().includes(search) || String(row.no).includes(search)
    );
  }, [query, rows]);

  return (
    <>
      {/* Search + count */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search
            className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-light-muted"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('Search an offence…', 'خلاف ورزی تلاش کریں…')}
            aria-label={t('Search an offence', 'خلاف ورزی تلاش کریں')}
            className="w-full rounded-xl border border-brand-light-border bg-brand-light-surface py-2.5 ps-9 pe-9 text-sm text-brand-dark shadow-gov outline-none transition-colors placeholder:text-brand-light-muted focus:border-brand-blue-400 focus:ring-2 focus:ring-brand-blue-100"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label={t('Clear search', 'تلاش صاف کریں')}
              className="absolute end-2.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-brand-light-muted transition-colors hover:bg-brand-light-bg hover:text-brand-dark"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>

        <p className="text-xs font-semibold text-brand-light-muted sm:text-sm">
          {t('Showing', 'دکھایا جا رہا ہے')}{' '}
          <span className="font-bold text-brand-blue">{filteredRows.length}</span>{' '}
          {t('of', 'از')} {rows.length} {t('offences', 'خلاف ورزیاں')}
        </p>
      </div>

      {/* Table */}
      <div className="relative overflow-auto rounded-2xl border border-brand-light-border bg-brand-light-surface shadow-gov md:max-h-[75vh]">
        <table className={`w-full ${minWidthClass} border-separate border-spacing-0 text-sm`}>
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr>
              <th
                scope="col"
                className="sticky top-0 z-20 w-12 border-b border-white/15 bg-[#000080] px-2 py-3 text-center text-[11px] font-bold uppercase tracking-wider text-white"
              >
                #
              </th>
              <th
                scope="col"
                className="sticky top-0 start-0 z-30 min-w-[300px] border-b border-e border-white/15 bg-[#000080] px-3 py-3 text-start text-[11px] font-bold uppercase tracking-wider text-white"
              >
                {t('Nature of Offence', 'خلاف ورزی کی نوعیت')}
              </th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  title={column.full}
                  className={`sticky top-0 z-20 ${columnWidthClass} border-b border-white/15 bg-[#000080] px-2 py-3 text-center text-[11px] font-bold uppercase leading-tight tracking-wider text-white`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr
                key={row.no}
                className="bg-brand-light-surface odd:bg-brand-light-surface even:bg-brand-light-bg hover:bg-brand-blue-50"
              >
                <td className="border-b border-brand-light-border px-2 py-2.5 text-center font-mono text-xs font-bold text-brand-light-muted">
                  {row.no}
                </td>
                <td className="sticky start-0 z-10 border-b border-e border-brand-light-border bg-inherit px-3 py-2.5 text-start text-sm font-medium leading-snug text-brand-dark">
                  {row.name}
                </td>
                {row.fines.map((fine, index) => (
                  <td
                    key={columns[index]?.key ?? index}
                    className="whitespace-nowrap border-b border-brand-light-border px-2 py-2.5 text-center align-middle"
                  >
                    {fine === NOT_SPECIFIED ? (
                      <span className="text-slate-300" title={t('Not specified', 'مقرر نہیں')}>
                        {NOT_SPECIFIED}
                      </span>
                    ) : (
                      <span className="font-mono text-xs font-semibold tabular-nums text-brand-dark sm:text-[13px]">
                        {fine}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}

            {filteredRows.length === 0 && (
              <tr>
                <td colSpan={columns.length + 2} className="px-4 py-12 text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue-50 text-brand-blue">
                    <Search className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="mt-3 text-sm font-semibold text-brand-dark">
                    {t('No matching offence found.', 'کوئی مماثل خلاف ورزی نہیں ملی۔')}
                  </p>
                  <p className="mt-1 text-xs text-brand-light-muted">
                    {t('Try a different keyword.', 'کوئی اور لفظ آزمائیں۔')}
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-2 text-xs text-brand-light-muted md:hidden">
        {t(
          'Tip: swipe the table sideways to view all vehicle types.',
          'مشورہ: تمام گاڑیوں کی اقسام دیکھنے کے لیے جدول کو اطراف میں سوائپ کریں۔'
        )}
      </p>
    </>
  );
};

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export const OffenseList: React.FC = () => {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ur'
        ? 'ٹریفک خلاف ورزیاں اور مجوزہ جرمانے | ٹریفک وارڈن ایبٹ آباد'
        : 'Traffic Offences & Proposed Fines | Traffic Warden Abbottabad';
  }, [language]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-brand-light-bg text-brand-dark">
      {/* ---------------------------------- HERO ---------------------------------- */}
      <section className="relative overflow-hidden border-b border-[#0000aa] bg-[#000080] pt-6 pb-10 text-white sm:pt-8 sm:pb-14">
        <div className="absolute inset-0 gov-subtle-pattern opacity-10" aria-hidden="true" />
        <div
          className="pointer-events-none absolute end-0 top-0 h-56 w-56 rounded-full bg-brand-blue/30 blur-3xl sm:h-80 sm:w-80"
          aria-hidden="true"
        />

        <PageContainer className="relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Education', labelUrdu: 'تعلیم' },
              { label: 'Offense List', labelUrdu: 'خلاف ورزیوں کی فہرست' },
            ]}
            className="mb-4 text-white/80 [&_a]:text-white/80 [&_a:hover]:text-brand-lime [&_span]:text-brand-lime"
          />

          <div className="max-w-4xl space-y-3">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand-lime/30 bg-brand-lime/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-lime sm:text-xs">
              <Scale className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">{t('Education — Offence List', 'تعلیم — خلاف ورزیوں کی فہرست')}</span>
            </div>

            <h1 className="text-balance text-2xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
              {t('Traffic Offences & Proposed Fines', 'ٹریفک خلاف ورزیاں اور مجوزہ جرمانے')}
            </h1>

            <p className="text-sm font-semibold text-brand-lime sm:text-base md:text-lg">
              {t(
                'Part I — Moving Violations · Part II — Parking Violations',
                'حصہ اول — چلتے ہوئے ٹریفک کی خلاف ورزیاں · حصہ دوم — پارکنگ کی خلاف ورزیاں'
              )}
            </p>

            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-[11px] font-medium text-white sm:text-xs md:text-sm">
                <ListOrdered className="h-4 w-4 shrink-0 text-brand-lime" aria-hidden="true" />
                {t('85 Offences', '85 خلاف ورزیاں')}
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-[11px] font-medium text-white sm:text-xs md:text-sm">
                <Banknote className="h-4 w-4 shrink-0 text-brand-lime" aria-hidden="true" />
                {t('Amounts in PKR', 'رقوم پاکستانی روپے میں')}
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-[11px] font-medium text-white sm:text-xs md:text-sm">
                <Table className="h-4 w-4 shrink-0 text-brand-lime" aria-hidden="true" />
                {t('Fines by Vehicle Type', 'گاڑی کی قسم کے مطابق جرمانے')}
              </span>
            </div>
          </div>
        </PageContainer>
      </section>

      <PageContainer>
        <div className="space-y-10 py-8 sm:space-y-14 sm:py-12 lg:py-16">
          {/* --------------------------------- LEGEND ------------------------------ */}
          <section aria-labelledby="legend-heading">
            <div className="rounded-2xl border border-brand-blue-200 bg-brand-blue-50 p-4 sm:p-5">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-blue text-white">
                  <Table className="h-4 w-4" aria-hidden="true" />
                </span>
                <h2 id="legend-heading" className="text-sm font-bold text-brand-blue-900 sm:text-base">
                  {t('Understanding the Fine Columns', 'جرمانے کے کالم سمجھیں')}
                </h2>
              </div>

              <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {LEGEND.map((item) => (
                  <div key={item.label} className="flex items-start gap-2.5 text-sm">
                    <dt className="mt-0.5 inline-flex min-w-14 shrink-0 items-center justify-center rounded-md bg-white px-2 py-1 font-mono text-xs font-bold text-brand-blue shadow-sm">
                      {item.label}
                    </dt>
                    <dd className="leading-snug text-brand-blue-900/90">{t(item.full, item.ur)}</dd>
                  </div>
                ))}
                <div className="flex items-start gap-2.5 text-sm">
                  <dt
                    className="mt-0.5 inline-flex min-w-14 shrink-0 items-center justify-center rounded-md bg-white px-2 py-1 font-mono text-xs font-bold text-slate-400 shadow-sm"
                    aria-hidden="true"
                  >
                    {NOT_SPECIFIED}
                  </dt>
                  <dd className="leading-snug text-brand-blue-900/90">
                    {t(
                      'Fine not specified in the source document.',
                      'ماخذ دستاویز میں جرمانہ بیان نہیں کیا گیا۔'
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          </section>

          {/* --------------------------------- PART I ------------------------------ */}
          <section aria-labelledby="part-one-heading">
            <div className="mb-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue-100 bg-brand-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-blue sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" aria-hidden="true" />
                {t('Part I', 'حصہ اول')}
              </div>
              <h2
                id="part-one-heading"
                className="mt-3 text-balance text-xl font-bold text-brand-dark sm:text-2xl lg:text-3xl"
              >
                {t('Moving Violations', 'چلتے ہوئے ٹریفک کی خلاف ورزیاں')}
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-brand-light-muted sm:text-base">
                {t(
                  '74 offences · All amounts in Pakistani Rupees (PKR)',
                  '74 خلاف ورزیاں · تمام رقوم پاکستانی روپے (PKR) میں'
                )}
              </p>
            </div>

            <FineTable
              columns={MOVING_COLUMNS}
              rows={MOVING_VIOLATIONS}
              minWidthClass="min-w-[900px]"
              columnWidthClass="w-[112px]"
              caption={t(
                'Part I — Moving Violations: proposed fines by vehicle type',
                'حصہ اول — چلتے ہوئے ٹریفک کی خلاف ورزیاں: گاڑی کی قسم کے مطابق مجوزہ جرمانے'
              )}
            />
          </section>

          {/* --------------------------------- PART II ----------------------------- */}
          <section aria-labelledby="part-two-heading">
            <div className="mb-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue-100 bg-brand-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-blue sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" aria-hidden="true" />
                {t('Part II', 'حصہ دوم')}
              </div>
              <h2
                id="part-two-heading"
                className="mt-3 text-balance text-xl font-bold text-brand-dark sm:text-2xl lg:text-3xl"
              >
                {t('Parking Violations', 'پارکنگ کی خلاف ورزیاں')}
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-brand-light-muted sm:text-base">
                {t(
                  '11 offences · All amounts in Pakistani Rupees (PKR)',
                  '11 خلاف ورزیاں · تمام رقوم پاکستانی روپے (PKR) میں'
                )}
              </p>
            </div>

            <FineTable
              columns={PARKING_COLUMNS}
              rows={PARKING_VIOLATIONS}
              minWidthClass="min-w-[1080px]"
              columnWidthClass="w-[122px]"
              caption={t(
                'Part II — Parking Violations: proposed fines by vehicle type',
                'حصہ دوم — پارکنگ کی خلاف ورزیاں: گاڑی کی قسم کے مطابق مجوزہ جرمانے'
              )}
            />
          </section>

          {/* --------------------------------- NOTES ------------------------------- */}
          <section aria-labelledby="notes-heading">
            <div className="rounded-2xl border border-brand-light-border bg-brand-light-surface p-5 shadow-gov sm:p-6">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-lime/25 text-brand-blue-900">
                  <CircleAlert className="h-4 w-4" aria-hidden="true" />
                </span>
                <h2 id="notes-heading" className="text-sm font-bold text-brand-dark sm:text-base">
                  {t('Notes', 'نوٹس')}
                </h2>
              </div>

              <ul className="mt-4 space-y-2.5">
                <li className="flex items-start gap-2.5 text-sm leading-relaxed text-brand-light-text">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" aria-hidden="true" />
                  {t(
                    'All amounts are in Pakistani Rupees (PKR).',
                    'تمام رقوم پاکستانی روپے (PKR) میں ہیں۔'
                  )}
                </li>
                <li className="flex items-start gap-2.5 text-sm leading-relaxed text-brand-light-text">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" aria-hidden="true" />
                  {t(
                    '“—” indicates that no fine was specified in the source document for that vehicle type.',
                    '“—” سے مراد یہ ہے کہ ماخذ دستاویز میں اس گاڑی کی قسم کے لیے کوئی جرمانہ بیان نہیں کیا گیا۔'
                  )}
                </li>
                <li className="flex items-start gap-2.5 text-sm leading-relaxed text-brand-light-text">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" aria-hidden="true" />
                  {t(
                    '“*” indicates a variable or range amount as provided in the source document.',
                    '“*” سے مراد متغیر یا حد کے ساتھ دی گئی رقم ہے، جیسا کہ ماخذ دستاویز میں درج ہے۔'
                  )}
                </li>
                <li className="flex items-start gap-2.5 text-sm leading-relaxed text-brand-light-text">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" aria-hidden="true" />
                  {t(
                    'Part I lists moving violations and Part II lists parking violations. Additional parts will be published as available.',
                    'حصہ اول چلتے ہوئے ٹریفک کی خلاف ورزیوں اور حصہ دوم پارکنگ کی خلاف ورزیوں پر مشتمل ہے۔ مزید حصے دستیاب ہونے پر شائع کیے جائیں گے۔'
                  )}
                </li>
              </ul>
            </div>
          </section>

          {/* -------------------------------- HELP CTA ----------------------------- */}
          <section aria-label={t('Helpline', 'ہیلپ لائن')}>
            <div className="flex flex-col gap-3 rounded-2xl border border-brand-blue-200 bg-brand-blue-50 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <p className="flex items-start gap-2.5 text-sm font-semibold text-brand-blue-900">
                <PhoneCall className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
                {t(
                  'Have a question about a traffic offence or fine? Contact Abbottabad Traffic Police.',
                  'ٹریفک خلاف ورزی یا جرمانے کے بارے میں کوئی سوال ہے؟ ایبٹ آباد ٹریفک پولیس سے رابطہ کریں۔'
                )}
              </p>
              <a
                href="tel:1915"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-blue px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-400"
              >
                <PhoneCall className="h-4 w-4" aria-hidden="true" />
                {t('Call 1915', '1915 پر کال کریں')}
              </a>
            </div>
          </section>
        </div>
      </PageContainer>
    </div>
  );
};

export default OffenseList;
