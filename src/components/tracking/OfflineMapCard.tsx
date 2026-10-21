import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  CheckCircle2,
  CircleStop,
  CloudDownload,
  LoaderCircle,
  Map,
  RotateCcw,
  Smartphone,
  Trash2,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { useLanguage } from '../../hooks/useLanguage';
import { cn } from '../../lib/utils';
import {
  OFFLINE_MAP_AREAS,
  deleteOfflineMap,
  downloadOfflineMap,
  estimateOfflineMapSize,
  getOfflineMapStatus,
  isOfflineMapAvailable,
  type OfflineMapDepth,
  type OfflineMapDownloadResult,
  type OfflineMapStatus,
} from '../../services/offlineMapService';

/**
 * Offline map download card
 * =========================
 *
 * One-time, user-triggered download of the Abbottabad City + Galiyat map
 * tiles into the browser's Cache Storage (served offline through the service
 * worker). After a successful download the tourist map — including the GPS
 * tracking self-map — keeps rendering with no internet connection.
 */

function fmtBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.round(bytes / 1024)} KB`;
}

type Phase = 'checking' | 'idle' | 'downloading' | 'done';

export interface OfflineMapCardProps {
  className?: string;
}

export function OfflineMapCard({ className }: OfflineMapCardProps) {
  const { t } = useLanguage();

  const [available, setAvailable] = useState(true);
  const [phase, setPhase] = useState<Phase>('checking');
  const [depth, setDepth] = useState<OfflineMapDepth>('detailed');
  const [status, setStatus] = useState<OfflineMapStatus | null>(null);
  const [progress, setProgress] = useState<{ done: number; total: number; bytes: number } | null>(null);
  const [result, setResult] = useState<OfflineMapDownloadResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const estimate = useMemo(() => estimateOfflineMapSize(depth), [depth]);

  const refreshStatus = useCallback(async (forDepth: OfflineMapDepth) => {
    try {
      const next = await getOfflineMapStatus(forDepth);
      setStatus(next);
    } catch {
      setStatus(null);
    }
  }, []);

  useEffect(() => {
    if (!isOfflineMapAvailable()) {
      setAvailable(false);
      setPhase('idle');
      return;
    }
    setAvailable(true);
    setPhase('idle');
    void refreshStatus(depth);
  }, [depth, refreshStatus]);

  const handleDownload = async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setError(null);
    setResult(null);
    setPhase('downloading');
    setProgress({ done: 0, total: estimate.tiles, bytes: 0 });

    try {
      const outcome = await downloadOfflineMap(depth, {
        signal: controller.signal,
        onProgress: (p) => setProgress({ done: p.done, total: p.total, bytes: p.bytes }),
      });
      setResult(outcome);
      setPhase('done');
      await refreshStatus(depth);
    } catch (downloadError) {
      setPhase('idle');
      await refreshStatus(depth);
      setError(
        t(
          'The download could not finish. Check your connection and try again.',
          'ڈاؤن لوڈ مکمل نہیں ہو سکی۔ اپنا انٹرنیٹ چیک کریں اور دوبارہ کوشش کریں۔'
        )
      );
      void downloadError;
    } finally {
      abortRef.current = null;
    }
  };

  const handleCancel = () => {
    abortRef.current?.abort();
  };

  const handleDelete = async () => {
    abortRef.current?.abort();
    setResult(null);
    setProgress(null);
    setPhase('idle');
    await deleteOfflineMap();
    await refreshStatus(depth);
  };

  const cachedPct = status && status.expected > 0 ? Math.round((status.cached / status.expected) * 100) : 0;
  const isReady = Boolean(status?.ready);

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader>
        <h2 className="flex items-center gap-2 text-lg font-bold text-brand-dark">
          <Map className="h-5 w-5 text-brand-blue" aria-hidden="true" />
          {t('Offline Map', 'آف لائن نقشہ')}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          {t(
            'Download the Abbottabad City and Galiyat map once, so the map keeps working even when the internet drops during your trip.',
            'ایبٹ آباد شہر اور گلیات کا نقشہ ایک بار ڈاؤن لوڈ کریں، تاکہ سفر کے دوران انٹرنیٹ ختم ہونے پر بھی نقشہ چلتا رہے۔'
          )}
        </p>
      </CardHeader>

      <CardContent>
        {!available ? (
          <div className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2.5 text-xs leading-relaxed text-amber-900">
            {t(
              'Offline maps need a modern browser over a secure (HTTPS) connection.',
              'آف لائن نقشے کے لیے جدید براؤزر اور محفوظ (HTTPS) کنکشن ضروری ہے۔'
            )}
          </div>
        ) : (
          <>
            {/* -------------------------------- depth choice ---------------- */}
            <fieldset disabled={phase === 'downloading'} className={cn(phase === 'downloading' && 'opacity-60')}>
              <legend className="mb-1.5 text-xs font-bold uppercase tracking-wide text-slate-500">
                {t('Map detail', 'نقشے کی تفصیل')}
              </legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {(
                  [
                    {
                      id: 'basic' as OfflineMapDepth,
                      title: t('Basic', 'بنیادی'),
                      note: t('Main roads & towns — small download', 'بڑی سڑکیں اور قصبے — کم حجم'),
                    },
                    {
                      id: 'detailed' as OfflineMapDepth,
                      title: t('Street detail', 'گلی درست'),
                      note: t('Street-level zooms — recommended', 'گلیوں کی سطح — تجویز کردہ'),
                    },
                  ] satisfies Array<{ id: OfflineMapDepth; title: string; note: string }>
                ).map((option) => {
                  const isActive = depth === option.id;
                  return (
                    <label
                      key={option.id}
                      className={cn(
                        'flex cursor-pointer items-start gap-2 rounded-lg border bg-white px-3 py-2.5 transition-colors',
                        isActive ? 'border-brand-blue bg-brand-blue-50' : 'border-slate-300 hover:bg-slate-50'
                      )}
                    >
                      <input
                        type="radio"
                        name="offline-map-depth"
                        checked={isActive}
                        onChange={() => setDepth(option.id)}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-400 text-brand-blue focus-visible:ring-brand-blue"
                      />
                      <span>
                        <span className="block text-sm font-semibold text-brand-dark">{option.title}</span>
                        <span className="block text-xs text-slate-500">{option.note}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-slate-500">
                {t('Covers:', 'شامل علاقے:')}{' '}
                {OFFLINE_MAP_AREAS.map((area) => t(area.labelEn, area.labelUrdu)).join(' • ')}{' '}
                {'· '}≈ {estimate.tiles.toLocaleString()} {t('tiles', 'ٹائلس')} ({fmtBytes(estimate.bytes)})
              </p>
            </fieldset>

            {/* ---------------------------------- progress ------------------- */}
            {phase === 'downloading' && progress && (
              <div className="mt-4 rounded-lg border border-brand-blue-200 bg-brand-blue-50 px-3 py-3">
                <div className="flex items-center justify-between text-xs font-semibold text-brand-blue-900">
                  <span className="inline-flex items-center gap-1.5">
                    <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                    {t('Downloading map…', 'نقشہ ڈاؤن لوڈ ہو رہا ہے…')}
                  </span>
                  <span className="tabular-nums">
                    {progress.done.toLocaleString()} / {progress.total.toLocaleString()} · {fmtBytes(progress.bytes)}
                  </span>
                </div>
                <div
                  className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white"
                  role="progressbar"
                  aria-valuenow={Math.round((progress.done / Math.max(1, progress.total)) * 100)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full rounded-full bg-brand-blue transition-[width] duration-150"
                    style={{ width: `${(progress.done / Math.max(1, progress.total)) * 100}%` }}
                  />
                </div>
                <div className="mt-2">
                  <Button type="button" variant="outline" size="sm" onClick={handleCancel}>
                    <CircleStop className="h-3.5 w-3.5" aria-hidden="true" />
                    {t('Cancel', 'روکیں')}
                  </Button>
                </div>
              </div>
            )}

            {/* ---------------------------------- result --------------------- */}
            {phase === 'done' && result && (
              <div className="mt-4 flex items-start gap-2 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2.5 text-xs leading-relaxed text-emerald-900">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  {result.status === 'complete'
                    ? t(
                        'Offline map is ready — it now works with no internet connection.',
                        'آف لائن نقشہ تیار ہے — اب بغیر انٹرنیٹ کے بھی کام کرے گا۔'
                      )
                    : t(
                        'Map saved, but a few tiles could not be downloaded. It mostly works offline; retry later to complete it.',
                        'نقشہ محفوظ ہو گیا، البتہ کچھ ٹائلس ڈاؤن لوڈ نہیں ہو سکیں۔ آف لائن بڑی حد تک چلے گا؛ مکمل کرنے کے لیے بعد میں دوبارہ کوشش کریں۔'
                      )}
                  {result.failed > 0 && ` (${result.failed})`}
                </span>
              </div>
            )}

            {error && (
              <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-300 bg-red-50 px-3 py-2.5 text-xs leading-relaxed text-red-900" role="alert">
                {error}
              </div>
            )}

            {/* ---------------------------------- status --------------------- */}
            {status && (
              <div className="mt-3 text-xs text-slate-500">
                {isReady ? (
                  <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                    {t(
                      `Saved on this device: ${status.cached.toLocaleString()} tiles (100%)`,
                      `اس ڈیوائس پر محفوظ: ${status.cached.toLocaleString()} ٹائلس (100%)`
                    )}
                  </span>
                ) : (
                  <span>
                    {t(
                      `Saved on this device: ${status.cached.toLocaleString()} of ${status.expected.toLocaleString()} tiles (${cachedPct}%)`,
                      `اس ڈیوائس پر محفوظ: ${status.expected.toLocaleString()} میں سے ${status.cached.toLocaleString()} ٹائلس (${cachedPct}%)`
                    )}
                  </span>
                )}
                {status.storageBytes != null && status.storageBytes > 0 && (
                  <span className="ms-2 inline-flex items-center gap-1">
                    <Smartphone className="h-3 w-3" aria-hidden="true" />
                    {fmtBytes(status.storageBytes)}
                  </span>
                )}
              </div>
            )}

            {/* ----------------------------------- actions ------------------- */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="primary"
                size="md"
                disabled={phase === 'downloading'}
                leftIcon={<CloudDownload className="h-4 w-4" aria-hidden="true" />}
                onClick={handleDownload}
              >
                {!status || status.cached === 0
                  ? t('Download Map Offline', 'نقشہ آف لائن ڈاؤن لوڈ کریں')
                  : isReady
                    ? t('Re-download / Repair', 'دوبارہ ڈاؤن لوڈ / درست کریں')
                    : t('Continue Download', 'ڈاؤن لوڈ جاری رکھیں')}
              </Button>
              {status && status.cached > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  disabled={phase === 'downloading'}
                  leftIcon={<Trash2 className="h-4 w-4" aria-hidden="true" />}
                  onClick={handleDelete}
                >
                  {t('Delete offline map', 'آف لائن نقشہ حذف کریں')}
                </Button>
              )}
            </div>

            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              <RotateCcw className="me-1 inline h-3 w-3 align-[-2px]" aria-hidden="true" />
              {t(
                'Download once while you have internet — refresh it every few months to pick up map updates. Your GPS tracking and report upload keep working offline either way.',
                'انٹرنیٹ دستیاب ہونے پر ایک بار ڈاؤن لوڈ کریں — چند ماہ بعد تازہ کریں تاکہ نقشے کی تبدیلیاں بھی مل جائیں۔ آپ کی جی پی ایس رپورٹنگ اس کے باوجود آف لائن کام کرتی رہتی ہے۔'
              )}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
