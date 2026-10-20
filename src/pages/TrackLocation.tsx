import React, { useCallback, useEffect, useRef, useState } from 'react';import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  CheckCircle2,
  CircleStop,
  Clock,
  CloudOff,
  Gauge,
  Hash,
  Info,
  LoaderCircle,
  LocateFixed,
  MapPin,
  Navigation,
  ShieldCheck,
  Smartphone,
  Timer,
  TriangleAlert,
  Users,
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { TrackSelfMap } from '../components/tracking/TrackSelfMap';
import { useLanguage } from '../hooks/useLanguage';
import { cn } from '../lib/utils';
import {
  MAX_ACCEPTABLE_ACCURACY_METERS,
  TRAIL_MAX_POINTS,
  clearStoredTrail,
  clearStoredTrackingSession,
  createTrackingSession,
  describeTrackingError,
  getStoredTrackingSession,
  isSessionExpired,
  isValidPkMobileNumber,
  isValidTrackingName,
  minUploadDistanceMeters,
  minUploadIntervalMs,
  readStoredTrail,
  stopTrackingSession,
  storeTrail,
  submitTrackingLocations,
  type StoredTrackingSession,
  type TrackingPoint,
} from '../services/trackingService';
import {
  clearTrackingQueue,
  countQueuedPoints,
  enqueueTrackingPoint,
  flushTrackingQueue,
} from '../services/trackOfflineQueue';
import { isSupabaseConfigured } from '../services/supabaseClient';

/* -------------------------------------------------------------------------- */
/*                                  helpers                                   */
/* -------------------------------------------------------------------------- */

type Phase = 'idle' | 'starting' | 'active' | 'stopping' | 'stopped' | 'expired' | 'error';

function distanceMeters(a: TrackingPoint, lat: number, lng: number): number {
  const R = 6_371_000;
  const rad = Math.PI / 180;
  const dLat = (lat - a.latitude) * rad;
  const dLng = (lng - a.longitude) * rad;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a.latitude * rad) * Math.cos(lat * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function timeLabel(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

const INITIAL_FORM = { fullName: '', phoneNumber: '', groupSize: '1', consent: false };

/* -------------------------------------------------------------------------- */
/*                                   page                                     */
/* -------------------------------------------------------------------------- */

const TrackLocationPage: React.FC = () => {
  const { t, language } = useLanguage();

  /* ------------------------------- form state ------------------------------ */
  const [form, setForm] = useState(INITIAL_FORM);
  const [validation, setValidation] = useState<Partial<Record<keyof typeof INITIAL_FORM, string>>>({});
  const [phase, setPhase] = useState<Phase>('idle');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /* ------------------------------ active state ----------------------------- */
  const [session, setSession] = useState<StoredTrackingSession | null>(null);
  const [isTrackingLive, setIsTrackingLive] = useState(false);
  const [gpsStatus, setGpsStatus] = useState<'waiting' | 'fixing' | 'unavailable' | 'denied'>('waiting');
  const [lastPoint, setLastPoint] = useState<TrackingPoint | null>(null);
  const [storedCount, setStoredCount] = useState<number | null>(null);
  const [queuedCount, setQueuedCount] = useState(0);
  const [pendingStop, setPendingStop] = useState(false);
  /** Tourist's own path travelled so far (in-memory + localStorage mirror). */
  const [trail, setTrail] = useState<TrackingPoint[]>([]);

  /* Verifying GPS permission/fix BEFORE creating a session. */
  const [pendingCheck, setPendingCheck] = useState(false);

  const sessionRef = useRef<StoredTrackingSession | null>(null);
  const watchIdRef = useRef<number | null>(null);
  const lastPointRef = useRef<TrackingPoint | null>(null);
  const lastUploadRef = useRef(0);
  const expiryTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const queueTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [offline, setOffline] = useState(() => (typeof navigator === 'undefined' ? false : !navigator.onLine));

  const busy = phase === 'starting' || phase === 'stopping' || pendingCheck;

  /* Resume an existing (still-valid) session after a page reload. GPS is NOT
     re-attached without the user tapping "Resume live sharing". */
  useEffect(() => {
    const stored = getStoredTrackingSession();
    if (stored) {
      sessionRef.current = stored;
      setSession(stored);
      setIsTrackingLive(false);
      setPhase('active');
      setTrail(readStoredTrail(stored.id));
      void countQueuedPoints(stored.id).then(setQueuedCount);
    }
  }, []);

  /* Reflect connectivity. */
  useEffect(() => {
    const online = () => setOffline(false);
    const off = () => setOffline(true);
    window.addEventListener('online', online);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online', online);
      window.removeEventListener('offline', off);
    };
  }, []);

  /* Mirror the travel trail in localStorage so a page reload keeps the line. */
  useEffect(() => {
    if (trail.length === 0) return;
    const id = sessionRef.current?.id;
    if (id) storeTrail(id, trail);
  }, [trail]);

  const stopWatcher = useCallback(() => {
    if (watchIdRef.current !== null && 'geolocation' in navigator) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsTrackingLive(false);
  }, []);

  /* ------------------------------ upload loop ------------------------------ */

  const uploadPoint = useCallback(async (point: TrackingPoint, sessionId: string) => {
    const current = sessionRef.current;
    if (!current || current.id !== sessionId || isSessionExpired(current)) return;

    try {
      const saved = await submitTrackingLocations(current, [point]);
      setStoredCount((count) => (count === null ? null : count + (saved ?? 1)));
      if (queuedCount > 0) {
        void flushTrackingQueue(current)
          .catch(() => undefined)
          .then(() => countQueuedPoints(current.id))
          .then(setQueuedCount);
      }
    } catch (error) {
      const described = describeTrackingError(error);
      if (described.code === 'SESSION_EXPIRED' || described.code === 'SESSION_NOT_FOUND') {
        // The server rejected the session — stop now, never fake progress.
        stopWatcher();
        setPhase(described.code === 'SESSION_EXPIRED' ? 'expired' : 'error');
        clearStoredTrackingSession();
        clearStoredTrail(current.id);
        setTrail([]);
        setErrorMessage(described.message);
        return;
      }
      // Offline or transient failure → queue locally and retry later.
      await enqueueTrackingPoint(sessionId, point);
      setQueuedCount(await countQueuedPoints(sessionId));
    }
  }, [queuedCount, stopWatcher]);

  const flushQueued = useCallback(async (sessionId: string) => {
    const current = sessionRef.current;
    if (!current || current.id !== sessionId || isSessionExpired(current)) return;
    try {
      await flushTrackingQueue(current);
      setQueuedCount(await countQueuedPoints(sessionId));
    } catch {
      /* keep points queued — the next sweep retries */
    }
  }, []);

  /* --------------------------- watcher + throttle -------------------------- */

  const startWatcher = useCallback((sessionId: string): boolean => {
    if (!('geolocation' in navigator)) {
      setGpsStatus('unavailable');
      setErrorMessage(t(
        'This browser does not support GPS location sharing.',
        'اس براؤزر میں جی پی ایس لوکیشن شیئرنگ دستیاب نہیں۔'
      ));
      return false;
    }
    setGpsStatus('waiting');

    const minInterval = minUploadIntervalMs();
    const minDistance = minUploadDistanceMeters();

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const accuracy = position.coords.accuracy ?? null;

        // Readings this vague would put a marker hundreds of metres off.
        if (accuracy !== null && accuracy > MAX_ACCEPTABLE_ACCURACY_METERS) {
          setGpsStatus('fixing');
          return;
        }

        const point: TrackingPoint = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracyMeters: accuracy,
          recordedAt: new Date(position.timestamp || Date.now()).toISOString(),
        };

        const previous = lastPointRef.current;
        const now = Date.now();

        // Merge noisy fixes: upload only on movement OR the minimum interval.
        if (previous) {
          const moved = distanceMeters(previous, point.latitude, point.longitude);
          if (now - lastUploadRef.current < minInterval && moved < minDistance) return;
        }

        lastUploadRef.current = now;
        lastPointRef.current = point;
        setLastPoint(point);
        setTrail((existing) => {
          const next = [...existing, point];
          if (next.length <= TRAIL_MAX_POINTS) return next;
          // Cap reached: keep the very first fix (line start) plus the most
          // recent points, so start → end still both show.
          return [next[0], ...next.slice(next.length - (TRAIL_MAX_POINTS - 1))];
        });
        setGpsStatus('fixing');
        void uploadPoint(point, sessionId);
      },
      (error: GeolocationPositionError) => {
        if (error.code === error.PERMISSION_DENIED) {
          setGpsStatus('denied');
          stopWatcher();
          setErrorMessage(t(
            'Location permission was denied, so GPS updates have stopped. Allow location access for this site in your browser settings, then resume sharing.',
            'لوکیشن کی اجازت نہیں دی گئی، اس لیے جی پی ایس اپ ڈیٹ بند ہو گئیں۔ براؤزر سیٹنگز میں اجازت دیں اور دوبارہ شیئرنگ شروع کریں۔'
          ));
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setGpsStatus('unavailable');
          setErrorMessage(t(
            'GPS signal is temporarily unavailable. Sharing remains on — readings continue as soon as your device finds a signal.',
            'جی پی ایس سگنل عارضی طور پر دستیاب نہیں۔ شیئرنگ جاری ہے — سگنل ملتے ہی ریڈنگس دوبارہ بھیجی جائیں گی۔'
          ));
        } else {
          setGpsStatus('unavailable');
        }
      },
      { enableHighAccuracy: true, maximumAge: 10_000, timeout: 25_000 }
    );

    setIsTrackingLive(true);
    return true;
  }, [t, stopWatcher, uploadPoint]);

  /* --------------------------- expiry + queue sweep ------------------------ */

  useEffect(() => {
    if (phase !== 'active') return;

    /* Server-side window safety net (normally only reached after the 3-day
       retention window). Tracking is never stopped before the user stops it. */
    expiryTimerRef.current = setInterval(() => {
      const current = sessionRef.current;
      if (!current) return;
      if (isSessionExpired(current)) {
        stopWatcher();
        setPhase('expired');
        setStatusMessage(null);
        setErrorMessage(t(
          'Your tracking session was closed automatically because its data-retention window has ended. GPS sharing has stopped.',
          'تمام سیاحتی ڈیٹا کی ایک متعین مدت ختم ہو گئی ہے، اس لیے آپ کا ٹریکنگ سیشن خودکار طور پر بند کر دیا گیا ہے۔ جی پی ایس شیئرنگ رک گئی ہے۔'
        ));
        clearStoredTrackingSession();
        clearStoredTrail(current.id);
        setTrail([]);
        sessionRef.current = null;
        setSession(null);
        setStoredCount(null);
        lastPointRef.current = null;
      }
    }, 30_000);

    queueTimerRef.current = setInterval(() => {
      const current = sessionRef.current;
      if (!current || !navigator.onLine) return;
      void countQueuedPoints(current.id).then((count) => {
        if (count > 0) void flushQueued(current.id);
      });
    }, 60_000);

    return () => {
      if (expiryTimerRef.current) clearInterval(expiryTimerRef.current);
      if (queueTimerRef.current) clearInterval(queueTimerRef.current);
    };
  }, [phase, flushQueued, stopWatcher, t]);

  /* On connectivity return → replay the offline queue. */
  useEffect(() => {
    if (!session?.id || offline || pendingStop) return;
    void countQueuedPoints(session.id).then((count) => {
      if (count > 0) void flushQueued(session.id);
    });
  }, [session?.id, offline, pendingStop, flushQueued]);

  /* ------------------------------ stop handling ---------------------------- */

  const handleStop = useCallback(async () => {
    const current = sessionRef.current;
    if (!current) return;
    stopWatcher();
    setPhase('stopping');
    setStatusMessage(null);
    setErrorMessage(null);

    try {
      await stopTrackingSession({ id: current.id, token: current.token });
      setPendingStop(false);
      setPhase('stopped');
      clearStoredTrackingSession();
      void clearTrackingQueue(current.id); // usually empty; removes any leftovers
      clearStoredTrail(current.id);
      setTrail([]);
      sessionRef.current = null;
      setSession(null);
      setStoredCount(null);
      lastPointRef.current = null;
      setStatusMessage(t(
        'Tracking stopped. Your location is no longer being shared.',
        'ٹریکنگ بند ہو گئی۔ آپ کی لوکیشن شیئرنگ رک گئی ہے۔'
      ));
    } catch (error) {
      const described = describeTrackingError(error);
      if (described.code === 'NETWORK' || described.code === 'SESSION_EXPIRED') {
        // The device is offline (or the window just expired): GPS sharing has
        // stopped locally; confirm the stop with the server as soon as the
        // connection returns. The control room sees the honest state either
        // way — expired or no recent fix — never "live".
        const wasOffline = !navigator.onLine;
        setPendingStop(wasOffline);
        setPhase('stopped');
        clearStoredTrackingSession();
        sessionRef.current = wasOffline ? current : null;
        setSession(wasOffline ? current : null);
        setStatusMessage(
          wasOffline
            ? t(
                'Tracking stopped on this device. We could not reach the server while offline — the stop request will be confirmed automatically when connectivity returns, and the control room sees the honest state in the meantime.',
                'اس ڈیوائس پر ٹریکنگ بند ہو گئی۔ انٹرنیٹ نہ ہونے کی وجہ سے سرور کو اطلاع رکنی ہے — کنکشن واپسی پر خودکار تصدیق ہو جائے گی۔'
              )
            : t(
                'Your tracking session window ended, so updates were already stopped by the system. GPS sharing has ended.',
                'آپ کے ٹریکنگ سیشن کی مدت ختم ہو گئی تھی، اس لیے نظام نے اپ ڈیٹ بند کر دی تھیں۔ جی پی ایس شیئرنگ ختم ہو گئی۔'
              )
        );
        if (described.code === 'SESSION_EXPIRED') {
          setPendingStop(false);
          clearStoredTrackingSession();
          clearStoredTrail(current.id);
          setTrail([]);
          sessionRef.current = null;
          setSession(null);
        }
      } else {
        setPhase('active'); // keep the session visible for a retry
        setErrorMessage(described.message);
      }
    }
  }, [stopWatcher, t]);

  /* Retry the pending stop as soon as connectivity returns. Queued offline
     readings are flushed FIRST: once the server sees the stop, it refuses
     further points, so the stop must not overtake the queue replay. */
  useEffect(() => {
    if (!pendingStop || offline || !session) return;
    const current = session;
    void (async () => {
      try {
        await flushTrackingQueue(current).catch(() => undefined);
        await stopTrackingSession({ id: current.id, token: current.token });
        setPendingStop(false);
        clearStoredTrackingSession();
        void clearTrackingQueue(current.id);
        clearStoredTrail(current.id);
        setTrail([]);
        sessionRef.current = null;
        setSession(null);
        setStatusMessage(t(
          'Stop confirmed with the control room. Your location is no longer being shared.',
          'کنٹرول روم کو بندش کی تصدیق ہو گئی۔ آپ کی لوکیشن شیئرنگ ختم ہو گئی ہے۔'
        ));
      } catch {
        /* stays pending until the connection allows it */
      }
    })();
  }, [pendingStop, offline, session, t]);

  /* ----------------------------- start handling ---------------------------- */

  const validateForm = useCallback((): boolean => {
    const next: typeof validation = {};
    if (!isValidTrackingName(form.fullName)) {
      next.fullName = t('Please enter your full name (2–80 characters).', 'براہِ کرم اپنا مکمل نام (2 تا 80 حروف) درج کریں۔');
    }
    if (!isValidPkMobileNumber(form.phoneNumber)) {
      next.phoneNumber = t(
        'Enter a valid Pakistani mobile number, e.g. 0300 1234567 or +923001234567.',
        'درست پاکستانی موبائل نمبر درج کریں، مثلاً 0300 1234567 یا +923001234567۔'
      );
    }
    const groupSize = Number.parseInt(form.groupSize, 10);
    if (!Number.isFinite(groupSize) || groupSize < 1 || groupSize > 50) {
      next.groupSize = t('Total people: a whole number from 1 to 50.', 'کل افراد: 1 تا 50 کا پورا عدد۔');
    }
    if (!form.consent) {
      next.consent = t('Please confirm consent to share your location.', 'براہِ کرم لوکیشن شیئرنگ کی اجازت کی تصدیق کریں۔');
    }
    setValidation(next);
    return Object.keys(next).length === 0;
  }, [form, t]);

  const handleStart = useCallback(async (event?: React.FormEvent) => {
    event?.preventDefault();
    setErrorMessage(null);
    setStatusMessage(null);

    if (!validateForm()) return;
    if (!isSupabaseConfigured) {
      setErrorMessage(t(
        'The tracking service is currently unavailable. Please try again later or call 1915.',
        'ٹریکنگ سروس فی الحال دستیاب نہیں۔ دوبارہ کوشش کریں یا 1915 پر رابطہ کریں۔'
      ));
      return;
    }

    setPhase('starting');
    setPendingCheck(true);

    try {
      /* STEP 1 — verify GPS access works BEFORE creating any session, so we
         never claim tracking has started when it has not. */
      const firstPoint = await new Promise<TrackingPoint>((resolve, reject) => {
        if (!('geolocation' in navigator)) {
          reject(new Error(t(
            'This browser does not support GPS location sharing.',
            'اس براؤزر میں جی پی ایس لوکیشن شیئرنگ دستیاب نہیں۔'
          )));
          return;
        }
        navigator.geolocation.getCurrentPosition(
          (position) => resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracyMeters: position.coords.accuracy ?? null,
            recordedAt: new Date(position.timestamp || Date.now()).toISOString(),
          }),
          (error: GeolocationPositionError) => {
            reject(new Error(
              error.code === error.PERMISSION_DENIED
                ? t('Location permission was denied. Allow location access for this site and try again.', 'لوکیشن کی اجازت نہیں ملی۔ اس سائٹ کے لیے اجازت دیں اور دوبارہ کوشش کریں۔')
                : error.code === error.POSITION_UNAVAILABLE
                  ? t('Your location could not be determined. Make sure GPS/location is turned on and try again.', 'آپ کی لوکیشن معلوم نہیں ہو سکی۔ جی پی ایس آن کر کے دوبارہ کوشش کریں۔')
                  : t('Getting your location timed out. Please try again.', 'لوکیشن حاصل کرنے میں مدت ختم ہو گئی۔ دوبارہ کوشش کریں۔')
            ));
          },
          { enableHighAccuracy: true, timeout: 30_000, maximumAge: 0 }
        );
      });

      /* STEP 2 — create the server session. expires_at is decided by the
         database (start + its internal retention window) — a client can never
         extend it. */
      const created = await createTrackingSession({
        fullName: form.fullName,
        phoneNumber: form.phoneNumber,
        groupSize: Number.parseInt(form.groupSize, 10),
        consent: form.consent,
      });
      sessionRef.current = created;
      setSession(created);
      setLastPoint(firstPoint);
      lastPointRef.current = firstPoint;
      lastUploadRef.current = Date.now();
      setStoredCount(0);
      setTrail([firstPoint]); // the travel line starts with the first fix
      setPendingCheck(false);
      setPhase('active');
      setValidation({});

      /* STEP 3 — only now start continuous sharing. */
      startWatcher(created.id);
      void uploadPoint(firstPoint, created.id);
      void countQueuedPoints(created.id).then(setQueuedCount);

      setForm(INITIAL_FORM);
    } catch (error) {
      setPendingCheck(false);
      setPhase('error');
      if (error instanceof Error && error.message) setErrorMessage(error.message);
      else setErrorMessage(describeTrackingError(error).message);
    }
  }, [form, t, validateForm, startWatcher, uploadPoint]);

  /* Auto-clear the transient error banner. */
  useEffect(() => {
    if (!errorMessage) return;
    const timer = setTimeout(() => setErrorMessage(null), 12_000);
    return () => clearTimeout(timer);
  }, [errorMessage]);

  /* Detach the watcher when the page unloads. */
  useEffect(() => () => stopWatcher(), [stopWatcher]);

  /* ------------------------------- derived UI ------------------------------ */

  const isActive = session !== null && phase !== 'idle' && phase !== 'error';

  const gpsStateChip = isTrackingLive
    ? { label: lastPoint ? t('Live', 'سرگرم') : t('Searching', 'تلاش'), className: 'border-emerald-300 bg-emerald-50 text-emerald-700' }
    : { label: t('Not sharing right now', 'شیئرنگ بند'), className: 'border-slate-300 bg-slate-100 text-slate-600' };

  const lastUpdateLabel = isTrackingLive
    ? (lastPoint ? timeLabel(lastPoint.recordedAt) : t('— searching', '— تلاش'))
    : t('— sharing paused', '— شیئرنگ بند');

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Tourism', path: '/tourism/welcome-abbottabad' },
          { label: language === 'ur' ? 'لوکیشن ٹریکنگ' : 'Track Your Location' },
        ]}
      />

      <PageContainer size="narrow" className="pb-16">
        {/* ------------------------------- header ------------------------------ */}
        <header className="pt-2 pb-8 text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-brand-blue-200 bg-brand-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-blue-700">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            {t('Official Tourism Safety Service', 'رسمی سیاحتی حفاظتی سروس')}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-brand-dark sm:text-4xl">
            {t('Track Your Location', 'اپنی لوکیشن شیئر کریں')}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            {t(
              'Travelling to Galiyat or Abbottabad? Share your live GPS location with authorized Traffic Police personnel for tourism safety. Registration takes one minute, and you can stop sharing at any time.',
              'گلیات یا ایبٹ آباد کا سفر؟ اپنی لائیو جی پی ایس لوکیشن سیاحتی تحفظ کے لیے مجاز ٹریفک پولیس اہلکاروں کے ساتھ شیئر کریں۔ رجسٹریشن صرف ایک منٹ، اور آپ کسی بھی وقت شیئرنگ بند کر سکتے ہیں۔'
            )}
          </p>
          <div className="mx-auto mt-5 flex max-w-2xl flex-wrap justify-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 font-semibold text-slate-600 shadow-sm">
              <Timer className="h-3.5 w-3.5" aria-hidden="true" />
              {t('Runs as long as you track', 'جب تک ٹریکنگ جاری رکھیں')}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 font-semibold text-slate-600 shadow-sm">
              <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
              {t('You stay in control', 'کنٹرول آپ کے پاس')}
            </span>
          </div>
        </header>

        {!isSupabaseConfigured && (
          <div className="mx-auto mb-6 max-w-2xl rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <strong className="font-bold">{t('Service unavailable:', 'سروس دستیاب نہیں:')}</strong>{' '}
            {t(
              'The tracking backend is not configured on this deployment. For tourist safety assistance, officers can be reached at 1915.',
              'ٹریکنگ کا نظام configurable نہیں ہے۔ سیاحتی تحفظ کی مدد کے لیے 1915 پر رابطہ کریں۔'
            )}
          </div>
        )}

        {/* ---------------------------- errors / status ------------------------ */}
        {(statusMessage || errorMessage) && (
          <div className="mx-auto mb-6 max-w-2xl space-y-2">
            {statusMessage && (
              <div className="flex items-start gap-2 rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-800" role="status" aria-live="polite">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /> {statusMessage}
              </div>
            )}
            {errorMessage && (
              <div className="flex items-start gap-2 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert" aria-live="assertive">
                <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /> {errorMessage}
              </div>
            )}
          </div>
        )}

        {/* --------------------------- registration --------------------------- */}
        {!isActive && (
          <Card className="mx-auto max-w-2xl">
            <CardHeader>
              <h2 className="text-lg font-bold text-brand-dark">{t('Tourist registration', 'سیاح رجسٹریشن')}</h2>
              <p className="mt-1 text-sm text-slate-500">
                {t(
                  'Fields marked * are required. Your details are used only for tourism safety and are deleted automatically after 3 days.',
                  '* والے خانے لازمی ہیں۔ آپ کی تفصیلات صرف سیاحتی تحفظ کے لیے استعمال ہوتی ہیں اور 3 دن بعد خودکار طور پر حذف ہو جاتی ہیں۔'
                )}
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleStart} className="space-y-5" noValidate>
                {/* Full name */}
                <div>
                  <label htmlFor="track-name" className="mb-1.5 block text-sm font-semibold text-brand-dark">
                    {t('Full Name', 'مکمل نام')} <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="track-name"
                    type="text"
                    autoComplete="name"
                    maxLength={80}
                    value={form.fullName}
                    onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                    aria-invalid={Boolean(validation.fullName)}
                    aria-describedby={validation.fullName ? 'track-name-error' : undefined}
                    className={cn(
                      'w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-brand-dark placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue',
                      validation.fullName ? 'border-red-400' : 'border-slate-300'
                    )}
                    placeholder={t('e.g. Ali Khan', 'مثلاً علی خان')}
                  />
                  {validation.fullName && <ValidationHint id="track-name-error" text={validation.fullName} />}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="track-phone" className="mb-1.5 block text-sm font-semibold text-brand-dark">
                    {t('Mobile Phone Number', 'موبائل فون نمبر')} <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <Hash className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                    <input
                      id="track-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      dir="ltr"
                      value={form.phoneNumber}
                      onChange={(e) => setForm((f) => ({ ...f, phoneNumber: e.target.value }))}
                      aria-invalid={Boolean(validation.phoneNumber)}
                      aria-describedby={validation.phoneNumber ? 'track-phone-error' : undefined}
                      className={cn(
                        'w-full rounded-lg border bg-white ps-9 py-2.5 pe-3.5 text-sm text-brand-dark placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue',
                        validation.phoneNumber ? 'border-red-400' : 'border-slate-300'
                      )}
                      placeholder="0300 1234567"
                    />
                  </div>
                  {validation.phoneNumber && <ValidationHint id="track-phone-error" text={validation.phoneNumber} />}
                </div>

                {/* Group size */}
                <div>
                  <label htmlFor="track-group" className="mb-1.5 block text-sm font-semibold text-brand-dark">
                    {t('Total Number of People', 'کل تعداد افراد')} <span className="text-red-600">*</span>
                  </label>
                  <div className="relative max-w-[220px]">
                    <Users className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                    <input
                      id="track-group"
                      type="number"
                      inputMode="numeric"
                      min={1}
                      max={50}
                      step={1}
                      value={form.groupSize}
                      onChange={(e) => setForm((f) => ({ ...f, groupSize: e.target.value }))}
                      aria-invalid={Boolean(validation.groupSize)}
                      aria-describedby={validation.groupSize ? 'track-group-error' : undefined}
                      className={cn(
                        'w-full rounded-lg border bg-white ps-9 py-2.5 pe-3.5 text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-blue',
                        validation.groupSize ? 'border-red-400' : 'border-slate-300'
                      )}
                    />
                  </div>
                  {validation.groupSize && <ValidationHint id="track-group-error" text={validation.groupSize} />}
                </div>

                {/* Consent */}
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <label className="flex cursor-pointer items-start gap-3" htmlFor="track-consent">
                    <input
                      id="track-consent"
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
                      aria-invalid={Boolean(validation.consent)}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-400 text-brand-blue focus-visible:ring-brand-blue"
                    />
                    <span className="text-sm leading-relaxed text-slate-700">
                      {t(
                        'I agree to share my GPS location with authorized Traffic Police Abbottabad personnel for tourism safety purposes, for as long as I keep tracking switched on. I understand I can stop sharing at any time and my data will be deleted automatically after 3 days.',
                        'میں منظوری دیتا/دیتی ہوں کہ میری جی پی ایس لوکیشن سیاحتی تحفظ کے مقاصد کے لیے مجاز ٹریفک پولیس ایبٹ آباد کے اہلکاروں کے ساتھ، جب تک میں ٹریکنگ جاری رکھوں گا/رکھوں گی، شیئر کی جائے۔ میری اجازت ہے کہ میں کسی بھی وقت شیئرنگ بند کر سکتا/سکتی ہوں اور میرا ڈیٹا 3 دن بعد خودکار طور پر حذف ہو جائے گا۔'
                      )}
                      {' '}<span className="text-red-600">*</span>
                    </span>
                  </label>
                  {validation.consent && <ValidationHint id="track-consent-error" text={validation.consent} />}
                </div>

                <p className="text-xs leading-relaxed text-slate-500">
                  <Info className="me-1 inline h-3.5 w-3.5 align-[-2px]" aria-hidden="true" />
                  {t(
                    `Location sharing runs only while this page stays open in the browser. Web browsers cannot guarantee locked-screen or background tracking.`,
                    `لوکیشن شیئرنگ صرف اس صفحے کے کھلے براؤزر میں چلتی ہے اور کبھی 8 گھنٹوں سے یا زیادہ نہیں۔ براؤزر اسکرین لاک یا پس منظر میں ٹریکنگ کی ضمانت نہیں دیتے۔`
                  )}
                </p>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={busy || !isSupabaseConfigured}
                  leftIcon={busy ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <Navigation className="h-5 w-5" aria-hidden="true" />}
                >
                  {pendingCheck
                    ? t('Getting your GPS fix…', 'جی پی ایس معلوم کیا جا رہا ہے…')
                    : t('Start Tracking', 'ٹریکنگ شروع کریں')}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* ------------------------------ active view -------------------------- */}
        {isActive && session && (
          <div className="mx-auto max-w-3xl space-y-5">
            <Card highlightAccent>
              <CardHeader className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="flex items-center gap-2 text-lg font-bold text-brand-dark">
                  {isTrackingLive ? (
                    <>
                      <span className="relative flex h-3 w-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-600" />
                      </span>
                      {t('Tracking is ON', 'ٹریکنگ جاری')}
                    </>
                  ) : (
                    <>
                      <CircleStop className="h-5 w-5 text-slate-500" aria-hidden="true" />
                      {t('Tracking paused on this device', 'اس ڈیوائس پر ٹریکنگ موقوف')}
                    </>
                  )}
                </h2>
                <span className={cn('rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide', gpsStateChip.className)}>
                  {gpsStateChip.label}
                </span>
              </CardHeader>
              <CardContent>
                <TrackSelfMap point={lastPoint} trail={trail} />

                <dl className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
                  <Detail
                    icon={<Hash className="h-3.5 w-3.5" aria-hidden="true" />}
                    label={t('Session ID', 'سیشن آئی ڈی')}
                    value={<span className="font-mono text-xs" title={session.id}>{session.id.slice(0, 13)}…</span>}
                  />
                  <Detail
                    icon={<Clock className="h-3.5 w-3.5" aria-hidden="true" />}
                    label={t('Started', 'آغاز')}
                    value={timeLabel(session.startedAt)}
                  />
                  <Detail
                    icon={<LocateFixed className="h-3.5 w-3.5" aria-hidden="true" />}
                    label={t('Last location update', 'آخری اپ ڈیٹ')}
                    value={lastUpdateLabel}
                  />
                  <Detail
                    icon={<Gauge className="h-3.5 w-3.5" aria-hidden="true" />}
                    label={t('GPS accuracy', 'جی پی ایس درستگی')}
                    value={lastPoint?.accuracyMeters != null ? `± ${Math.round(lastPoint.accuracyMeters)} m` : '—'}
                  />
                  <Detail
                    icon={<MapPin className="h-3.5 w-3.5" aria-hidden="true" />}
                    label={t('Readings stored', 'محفوظ پوائنٹس')}
                    value={
                      <>
                        {storedCount ?? '—'}
                        {queuedCount > 0 && (
                          <span className="ms-2 inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800" title={t('Saved on-device; uploading when back online', 'ڈیوائس پر محفوظ؛ انٹرنیٹ واپسی پر بھیجی جائیں گی')}>
                            <CloudOff className="me-1 inline h-3 w-3" aria-hidden="true" />
                            {queuedCount} {t('queued', 'انتظار میں')}
                          </span>
                        )}
                      </>
                    }
                  />
                </dl>

                {offline && (
                  <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2.5 text-xs leading-relaxed text-amber-900">
                    <CloudOff className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>
                      {t(
                        'You appear to be offline. New readings are saved on this device and upload automatically when connectivity returns.',
                        'انٹرنیٹ دستیاب نہیں ہے۔ نئی ریڈنگس اس ڈیوائس پر محفوظ ہو رہی ہیں اور کنکشن واپسی پر خودکار طور پر بھیجی جائیں گی۔'
                      )}
                    </span>
                  </div>
                )}

                {gpsStatus === 'waiting' && isTrackingLive && !lastPoint && (
                  <div className="mt-4 flex items-center gap-2 rounded-lg border border-brand-blue-200 bg-brand-blue-50 px-3 py-2.5 text-xs text-brand-blue-900">
                    <LocateFixed className="h-4 w-4 shrink-0 animate-pulse" aria-hidden="true" />
                    {t('Searching for a GPS signal — accuracy improves under an open sky.', 'جی پی ایس سگنل کی تلاش جاری ہے — کھلے آسمان تلے درستگی بہتر ہوتی ہے۔')}
                  </div>
                )}

                {gpsStatus === 'unavailable' && isTrackingLive && (
                  <div className="mt-4 flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2.5 text-xs text-amber-900">
                    <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {t('Weak GPS signal — readings pause until your device locks onto a better fix.', 'جی پی ایس سگنل کمزور ہے — بہتر فکس ملنے تک ریڈنگس وقفہ کر دی جاتی ہیں۔')}
                  </div>
                )}

                {(lastPoint?.accuracyMeters ?? 0) > 100 && (
                  <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2.5 text-xs leading-relaxed text-amber-900">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>
                      {t(
                        'Your device is reporting only an approximate (network/Wi-Fi-based) location. If this does not match where you actually are — for example it shows a different city — enable the device GPS/Location setting, turn off any VPN, and try an actual mobile phone. Your browser, not this website, determines the coordinates.',
                        'آپ کا ڈیوائس صرف تقریباً (نیٹ ورک/وائی فائی کی بنیاد پر) لوکیشن بھیج رہا ہے۔ اگر یہ آپ کی اصل جگہ سے ملتی نہیں — مثلاً کوئی اور شہر دکھا رہا ہے — تو ڈیوائس کی GPS/لوکیشن سیٹنگ آن کریں، VPN بند کریں اور حقیقی موبائل فون پر آزمائیں۔ کوآرڈینیٹس یہ ویب سائٹ نہیں بلکہ آپ کا براؤزر طے کرتا ہے۔'
                      )}
                    </span>
                  </div>
                )}

                <div className="mt-6 space-y-4">
                  {!isTrackingLive && (
                    <Button
                      variant="primary"
                      fullWidth
                      onClick={() => startWatcher(session.id)}
                      leftIcon={<LocateFixed className="h-5 w-5" aria-hidden="true" />}
                    >
                      {t('Resume live sharing', 'شیئرنگ دوبارہ شروع کریں')}
                    </Button>
                  )}
                  <Button
                    variant="emergency"
                    size="lg"
                    fullWidth
                    onClick={() => void handleStop()}
                    disabled={phase === 'stopping'}
                    leftIcon={phase === 'stopping' ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <CircleStop className="h-5 w-5" aria-hidden="true" />}
                  >
                    {phase === 'stopping' ? t('Stopping…', 'بند ہو رہی ہے…') : t('Stop Tracking', 'ٹریکنگ بند کریں')}
                  </Button>
                  <p className="text-center text-xs text-slate-500">
                    {t('You can stop sharing at any time.', 'آپ کسی بھی وقت شیئرنگ بند کر سکتے ہیں۔')}{' '}
                    <a href="tel:1915" className="font-bold text-brand-blue hover:underline">{t('Helpline 1915', 'ہیلپ لائن 1915')}</a>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Honest limitation notice */}
            <div className="rounded-lg border border-slate-200 bg-white p-4 text-xs leading-relaxed text-slate-500">
              <div className="mb-1 flex items-center gap-1.5 font-bold text-slate-700">
                <AlertTriangle className="h-4 w-4" aria-hidden="true" /> {t('Important browser limitations', 'اہم براؤزری حدود')}
              </div>
              <ul className="list-disc space-y-1 ps-4">
                <li>{t('Sharing works only while this page stays open. Browsers suspend background tabs and may pause GPS on the lock screen.', 'شیئرنگ صرف اس صفحے کے کھلے رہنے تک چلتی ہے۔ براؤزر پس منظر ٹیبز کو روک دیتے ہیں اور اسکرین لاک پر جی پی ایس رک سکتا ہے۔')}</li>
                <li>{t('Battery-saver modes, losing signal, or phone settings can stop updates temporarily.', 'بیٹری سیور موڈ، سگنل کی کمی یا فون سیٹنگز عارضی طور پر اپ ڈیٹ روک سکتی ہیں۔')}</li>
                <li>{t('If updates stop, officers see your session marked as having no recent fix — never a false "live".', 'اگر اپ ڈیٹ بند ہو جائیں تو اہلکار کو آپ کا سیشن حالیہ لوکیشن کے بغیر نظر آئے گا — کبھی غلط "لائیو" نہیں دکھایا جائے گا۔')}</li>
              </ul>
            </div>
          </div>
        )}

        {/* ----------------------------- how it works -------------------------- */}
        <section className="mx-auto mt-10 max-w-3xl">
          <h2 className="text-lg font-bold text-brand-dark">{t('How it works', 'یہ کیسے کام کرتا ہے')}</h2>
          <ol className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600">
            <li className="rounded-lg border border-slate-200 bg-white p-3.5">
              <strong className="text-brand-dark">1. {t('Register & give consent', 'رجسٹریشن اور اجازت')}</strong>
              <p className="mt-1">{t('Enter your name, mobile number and group size, then tick the consent box. Nothing is recorded before you do.', 'نام، موبائل نمبر اور کل افراد درج کریں، پھر منظوری کا خانہ ٹک کریں۔ اس سے قبل کچھ بھی ریکارڈ نہیں ہوتا۔')}</p>
            </li>
            <li className="rounded-lg border border-slate-200 bg-white p-3.5">
              <strong className="text-brand-dark">2. {t('Allow GPS access', 'جی پی ایس کی اجازت دیں')}</strong>
              <p className="mt-1">{t('Your browser asks permission to use your location. Tracking starts only after you allow it AND registration succeeds.', 'آپ کا براؤزر لوکیشن کی اجازت مانگے گا۔ ٹریکنگ تبھی شروع ہوتی ہے جب آپ اجازت دیں اور رجسٹریشن کامیاب ہو۔')}</p>
            </li>
            <li className="rounded-lg border border-slate-200 bg-white p-3.5">
              <strong className="text-brand-dark">3. {t('Stay discoverable', 'قابلِ رسائی رہیں')}</strong>
              <p className="mt-1">{t('Authorized officers can see your location only for tourism safety, for as long as your tracking session stays on.', 'مجاز اہلکار صرف سیاحتی تحفظ کے لیے، جب تک آپ کا ٹریکنگ سیشن جاری رہے، آپ کی لوکیشن دیکھ سکتے ہیں۔')}</p>
            </li>
            <li className="rounded-lg border border-slate-200 bg-white p-3.5">
              <strong className="text-brand-dark">4. {t('Stop anytime — data is deleted', 'جب چاہیں بند کریں — ڈیٹا حذف')}</strong>
              <p className="mt-1">{t('Press "Stop Tracking" when you arrive safely. Your name, number and route history are deleted automatically after 3 days.', 'محفوظ پہنچنے پر "ٹریکنگ بند کریں" دبا دیں۔ نام، نمبر اور لوکیشن ریکارڈ 3 دن بعد اپنے آپ حذف ہو جاتے ہیں۔')}</p>
            </li>
          </ol>
          <p className="mt-5 rounded-lg border border-brand-blue-200 bg-brand-blue-50 p-4 text-xs leading-relaxed text-brand-blue-900">
            {t(
              'Emergency assistance is always available on 1915. Location sharing is a safety aid — it never replaces calling the helpline.',
              'ہنگامی مدد ہمیشہ 1915 پر دستیاب ہے۔ لوکیشن شیئرنگ ایک حفاظتی سہولت ہے — ہیلپ لائن کا متبادل نہیں۔'
            )}{' '}
            <Link to="/tourism/galiyat-travel-advisory" className="font-bold underline hover:text-brand-blue-700">
              {t('Check the Galiyat travel advisory before your trip.', 'سفر سے پہلے گلیات ایڈوائزری دیکھیں۔')}
            </Link>
          </p>
        </section>
      </PageContainer>
    </>
  );
};

/* ------------------------------ small pieces ------------------------------- */

const Detail: React.FC<{ icon: React.ReactNode; label: string; value: React.ReactNode }> = ({ icon, label, value }) => (
  <div className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2">
    <dt className="flex shrink-0 items-center gap-1.5 font-semibold text-slate-500">
      {icon} {label}
    </dt>
    <dd className="min-w-0 truncate text-brand-dark text-end">{value}</dd>
  </div>
);

const ValidationHint: React.FC<{ id: string; text: string }> = ({ id, text }) => (
  <p id={id} role="alert" className="mt-1.5 text-xs font-semibold text-red-600">
    {text}
  </p>
);

export default TrackLocationPage;
