import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Copy,
  Download,
  Eye,
  EyeOff,
  FileText,
  LoaderCircle,
  LogOut,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  TriangleAlert,
  Upload,
  WifiOff,
} from 'lucide-react';
import logoImg from '/Traffic-Logo-Updated.png';
import { Button } from '../../components/ui/Button';
import { RequireAdminSession } from '../../components/admin/RequireAdminSession';
import { AdvisoryEditorForm } from '../../components/admin/AdvisoryEditorForm';
import { RouteStatusAdmin } from '../../components/admin/RouteStatusAdmin';
import { MapLocationsAdmin } from '../../components/admin/MapLocationsAdmin';
import { signOutAdmin, type AdminSession } from '../../services/adminAuth';
import {
  advisoryStore,
  buildSampleAdvisories,
  createEmptyAdvisory,
  exportAdvisoriesAsJson,
  generateAdvisoryId,
  importLocalAdvisories,
  localAdvisoryStore,
  suggestAdvisoryReference,
} from '../../services/advisoryStore';
import { isSupabaseConfigured } from '../../services/supabaseClient';
import { ADVISORY_CATEGORIES, ADVISORY_PRIORITIES } from '../../data/galiyatAdvisoryData';
import { formatAdvisoryDateTime } from '../../components/galiyat/advisoryFormat';
import {
  getLocationLabel,
  isAdvisoryExpired,
  isAdvisoryScheduled,
} from '../../services/galiyatAdvisoryService';
import { cn } from '../../lib/utils';
import type { AdvisoryCategory, TravelAdvisory } from '../../types/galiyat';

const PUBLIC_PAGE_PATH = '/tourism/galiyat-travel-advisory';

type AdvisoryStatus = 'published' | 'scheduled' | 'draft' | 'expired';
type StatusFilter = 'all' | AdvisoryStatus;

const STATUS_LABELS: Record<AdvisoryStatus, string> = {
  published: 'Live',
  scheduled: 'Scheduled',
  draft: 'Draft',
  expired: 'Expired',
};

const STATUS_CHIP_CLASSES: Record<AdvisoryStatus, string> = {
  published: 'border-emerald-300 bg-emerald-50 text-emerald-700',
  scheduled: 'border-brand-blue-300 bg-brand-blue-50 text-brand-blue-700',
  draft: 'border-amber-300 bg-amber-50 text-amber-800',
  expired: 'border-slate-300 bg-slate-100 text-slate-600',
};

/** 4px status rail on the leading edge of every record. */
const STATUS_ACCENT: Record<AdvisoryStatus, string> = {
  published: 'border-s-emerald-600',
  scheduled: 'border-s-brand-blue',
  draft: 'border-s-amber-500',
  expired: 'border-s-slate-300',
};

const RECORD_COLS = 'lg:grid-cols-[8.5rem_minmax(0,1fr)_10.5rem_11rem_12.5rem]';

const chipClass =
  'inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide';

const iconButtonClass =
  'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-100 hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue';

const dangerIconButtonClass = cn(
  iconButtonClass,
  'hover:border-red-200 hover:bg-red-50 hover:text-red-600'
);

const mastheadButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime';

/** Single source of truth for the status shown in the list, chips and stats. */
function getAdvisoryStatus(advisory: TravelAdvisory): AdvisoryStatus {
  if (!advisory.isPublished) return 'draft';
  if (isAdvisoryExpired(advisory)) return 'expired';
  if (isAdvisoryScheduled(advisory)) return 'scheduled';
  return 'published';
}

const AdvisoryDashboard: React.FC<{ session: AdminSession }> = ({ session }) => {
  const [advisories, setAdvisories] = useState<TravelAdvisory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [lastSyncedAt, setLastSyncedAt] = useState('—');
  /** Entries saved in this browser before Supabase was connected. */
  const [localCount, setLocalCount] = useState(0);

  const [editor, setEditor] = useState<{ mode: 'create' | 'edit'; advisory: TravelAdvisory } | null>(
    null
  );
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const [confirmingClearAll, setConfirmingClearAll] = useState(false);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | AdvisoryCategory>('all');
  const [activeTab, setActiveTab] = useState<'advisories' | 'routes' | 'map'>('advisories');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [rows, localRows] = await Promise.all([
        advisoryStore.list(),
        localAdvisoryStore.list(),
      ]);

      setAdvisories(rows);
      setLocalCount(localRows.length);
      setLastSyncedAt(
        new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
      );
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Records could not be loaded.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  // Success messages clear themselves after a few seconds.
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(null), 7000);
    return () => clearTimeout(timer);
  }, [notice]);

  const stats = useMemo(() => {
    const counts: Record<AdvisoryStatus, number> = {
      published: 0,
      scheduled: 0,
      draft: 0,
      expired: 0,
    };

    advisories.forEach((advisory) => {
      counts[getAdvisoryStatus(advisory)] += 1;
    });

    return { total: advisories.length, ...counts };
  }, [advisories]);

  const visibleAdvisories = useMemo(() => {
    const term = search.trim().toLowerCase();

    return advisories
      .filter((advisory) => {
        if (statusFilter !== 'all' && getAdvisoryStatus(advisory) !== statusFilter) return false;
        if (categoryFilter !== 'all' && advisory.categoryId !== categoryFilter) return false;
        if (!term) return true;

        return [
          advisory.reference,
          advisory.titleEn,
          advisory.titleUr,
          advisory.descriptionEn,
          advisory.descriptionUr,
          advisory.createdBy ?? '',
          advisory.updatedBy ?? '',
        ]
          .join(' ')
          .toLowerCase()
          .includes(term);
      })
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [advisories, statusFilter, categoryFilter, search]);

  /* ------------------------------- ACTIONS -------------------------------- */

  const openCreate = () => {
    const draft = createEmptyAdvisory();
    draft.reference = suggestAdvisoryReference(advisories);
    setEditor({ mode: 'create', advisory: draft });
  };

  const openEdit = (advisory: TravelAdvisory) => {
    setEditor({ mode: 'edit', advisory });
  };

  /** Copies a record into a new draft — handy for recurring situations. */
  const openDuplicate = (advisory: TravelAdvisory) => {
    const now = new Date().toISOString();

    setEditor({
      mode: 'create',
      advisory: {
        ...advisory,
        id: generateAdvisoryId(),
        reference: suggestAdvisoryReference(advisories),
        isPublished: false,
        isDemo: false,
        publishAt: null,
        issuedAt: now,
        updatedAt: now,
        expiresAt: null,
        createdBy: null,
        updatedBy: null,
      },
    });
    setNotice('Copy prepared — adjust the wording and save when ready.');
  };

  const handleSave = async (advisory: TravelAdvisory) => {
    setSaving(true);
    setError(null);

    const payload: TravelAdvisory = {
      ...advisory,
      updatedBy: session.email,
      createdBy: editor?.mode === 'create' ? session.email : advisory.createdBy ?? session.email,
    };

    try {
      if (editor?.mode === 'create') {
        await advisoryStore.create(payload);
        setNotice(
          payload.isPublished && !isAdvisoryScheduled(payload)
            ? 'Advisory added and published to the website.'
            : payload.isPublished
              ? 'Advisory added — it will appear at the scheduled time.'
              : 'Advisory saved as a draft (not visible to visitors yet).'
        );
      } else {
        await advisoryStore.update(payload.id, payload);
        setNotice('Advisory updated.');
      }

      setEditor(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'The advisory could not be saved.');
    } finally {
      setSaving(false);
    }
  };

  const togglePublished = async (advisory: TravelAdvisory) => {
    setBusyId(advisory.id);
    setError(null);

    try {
      await advisoryStore.update(advisory.id, {
        isPublished: !advisory.isPublished,
        updatedBy: session.email,
      });
      setNotice(
        advisory.isPublished
          ? 'Advisory moved back to drafts.'
          : 'Advisory published to the website.'
      );
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'The advisory could not be updated.');
    } finally {
      setBusyId(null);
    }
  };

  const removeAdvisory = async (id: string) => {
    setBusyId(id);
    setError(null);

    try {
      await advisoryStore.remove(id);
      setPendingDelete(null);
      setNotice('Advisory deleted.');
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'The advisory could not be deleted.');
    } finally {
      setBusyId(null);
    }
  };

  const loadSamples = async () => {
    setLoading(true);
    setError(null);

    try {
      const samples = buildSampleAdvisories();
      await advisoryStore.createMany(samples);
      setNotice(`${samples.length} sample advisories loaded — edit or delete them as needed.`);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sample advisories could not be loaded.');
      setLoading(false);
    }
  };

  const importFromBrowser = async () => {
    setLoading(true);
    setError(null);

    try {
      const imported = await importLocalAdvisories(session.email);
      setNotice(
        imported > 0
          ? `${imported} ${imported === 1 ? 'record' : 'records'} imported into the database.`
          : 'Nothing new to import from this browser.'
      );
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Records could not be imported.');
      setLoading(false);
    }
  };

  const clearAll = async () => {
    setLoading(true);
    setError(null);
    setConfirmingClearAll(false);

    try {
      await advisoryStore.clear();
      setNotice('All records were deleted.');
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Records could not be deleted.');
      setLoading(false);
    }
  };

  const handleExport = () => {
    exportAdvisoriesAsJson(advisories);
    setNotice('JSON file downloaded — keep it as a backup.');
  };

  const resetFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setCategoryFilter('all');
  };

  const hasFilters = search.trim() !== '' || statusFilter !== 'all' || categoryFilter !== 'all';

  const statTiles = [
    {
      label: 'Total records',
      value: stats.total,
      hint: 'In the database',
      accent: 'border-s-[#000080]',
    },
    { label: 'Live', value: stats.published, hint: 'Visible to visitors', accent: 'border-s-emerald-600' },
    { label: 'Scheduled', value: stats.scheduled, hint: 'Due to appear', accent: 'border-s-brand-blue' },
    { label: 'Drafts', value: stats.draft, hint: 'Not published', accent: 'border-s-amber-500' },
    { label: 'Expired', value: stats.expired, hint: 'Auto-hidden', accent: 'border-s-slate-300' },
  ];

  /* -------------------------------- RENDER -------------------------------- */

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-brand-light-bg">
      {/* ------------------------------ MASTHEAD ------------------------------- */}
      <header className="bg-[#000066] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 py-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-white/40 sm:h-16 sm:w-16">
              <img
                src={logoImg}
                alt="Traffic Warden Abbottabad crest"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-base font-extrabold leading-tight tracking-tight sm:text-lg">
                Traffic Warden Abbottabad
              </p>
              <p
                className="font-arabic text-sm leading-tight text-brand-lime sm:text-[15px]"
                dir="rtl"
                lang="ur"
              >
                گلیات سفری انتباہات — انتظامی پورٹل
              </p>
            </div>

            <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
              <span className="me-1 hidden text-xs text-brand-blue-100 lg:inline">
                Signed in as <span className="font-semibold text-white">{session.email}</span>
              </span>

              <Link
                to={PUBLIC_PAGE_PATH}
                target="_blank"
                rel="noreferrer"
                className={mastheadButtonClass}
              >
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                Public page
              </Link>

              <button type="button" onClick={signOutAdmin} className={mastheadButtonClass}>
                <LogOut className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                Sign out
              </button>
            </div>
          </div>
        </div>

        <div
          className="h-0.5 bg-gradient-to-r from-transparent via-brand-lime to-transparent"
          aria-hidden="true"
        />
      </header>

      <div className="border-b border-[#0000aa] bg-[#000080]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70 sm:px-6 lg:px-8">
          <span className="text-white">Galiyat Travel Advisory</span>
          <span aria-hidden="true">/</span>
          <span>Management console</span>
          <span className="ms-auto normal-case tracking-normal text-brand-blue-100">
            Tourism · Galiyat Development Area
          </span>
        </div>
      </div>

      {/* -------------------------------- CONTENT ------------------------------ */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* ------------------------------- TABS -------------------------------- */}
        <nav
          aria-label="Dashboard sections"
          className="mb-5 flex gap-2 border-b border-brand-light-border pb-3"
        >
          {([
            { id: 'advisories' as const, label: 'Advisories' },
            { id: 'routes' as const, label: 'Route Status' },
            { id: 'map' as const, label: 'Map Locations' },
          ]).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              aria-current={activeTab === tab.id ? 'page' : undefined}
              className={cn(
                'rounded-lg px-4 py-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue',
                activeTab === tab.id
                  ? 'bg-[#000080] text-white shadow-sm'
                  : 'border border-brand-light-border bg-white text-brand-light-muted hover:border-brand-blue-300 hover:text-brand-dark'
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {activeTab === 'advisories' && (
        <>
        <div className="flex flex-col gap-4 border-b border-brand-light-border pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-xl font-extrabold uppercase tracking-tight text-brand-dark sm:text-2xl">
              Galiyat Travel Advisory
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-brand-light-muted">
              Add, schedule and publish travel advisories for the Galiyat region. Published entries
              appear on the public advisory page straight away.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-xs text-brand-light-muted">Last synced {lastSyncedAt}</span>
            <Button
              variant="primary"
              onClick={openCreate}
              leftIcon={<Plus className="h-4 w-4" aria-hidden="true" />}
            >
              New advisory
            </Button>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div
            role="alert"
            className="mt-5 flex items-start gap-3 rounded-lg border border-red-200 border-s-4 border-s-red-500 bg-red-50 p-3.5"
          >
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-red-600" aria-hidden="true" />
            <p className="min-w-0 break-words text-sm text-red-800">{error}</p>
          </div>
        )}

        {notice && (
          <div
            role="status"
            className="mt-5 rounded-lg border border-emerald-200 border-s-4 border-s-emerald-500 bg-emerald-50 px-3.5 py-3 text-sm text-emerald-900"
          >
            {notice}
          </div>
        )}

        {/* Statistic strip */}
        <section className="mt-6" aria-label="Advisory statistics">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {statTiles.map((tile) => (
              <div
                key={tile.label}
                className={cn(
                  'rounded-lg border border-brand-light-border border-s-4 bg-white px-4 py-3.5 shadow-sm',
                  tile.accent
                )}
              >
                <p className="text-[10px] font-bold uppercase tracking-wider text-brand-light-muted">
                  {tile.label}
                </p>
                <p className="mt-1 text-2xl font-extrabold tabular-nums leading-none text-brand-dark">
                  {tile.value}
                </p>
                <p className="mt-1 text-[11px] text-brand-light-muted">{tile.hint}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Filters & tools */}
        <section className="mt-6 rounded-lg border border-brand-light-border bg-white shadow-sm">
          <div className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-end">
            <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-3">
              <label className="block">
                <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-brand-light-muted">
                  Search
                </span>
                <span className="relative block">
                  <Search
                    className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-light-muted"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Title, reference or staff email"
                    className="w-full rounded-lg border border-brand-light-border bg-white py-2.5 pe-3 ps-9 text-sm text-brand-dark placeholder:text-brand-light-muted focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue-200"
                  />
                </span>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-brand-light-muted">
                  Status
                </span>
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
                  className="w-full rounded-lg border border-brand-light-border bg-white px-3 py-2.5 text-sm text-brand-dark focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue-200"
                >
                  <option value="all">All statuses</option>
                  <option value="published">Live</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="draft">Drafts</option>
                  <option value="expired">Expired</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-brand-light-muted">
                  Category
                </span>
                <select
                  value={categoryFilter}
                  onChange={(event) =>
                    setCategoryFilter(event.target.value as 'all' | AdvisoryCategory)
                  }
                  className="w-full rounded-lg border border-brand-light-border bg-white px-3 py-2.5 text-sm text-brand-dark focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue-200"
                >
                  <option value="all">All categories</option>
                  {ADVISORY_CATEGORIES.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                onClick={() => void load()}
                disabled={loading}
                leftIcon={
                  <RefreshCw
                    className={cn('h-4 w-4', loading && 'animate-spin')}
                    aria-hidden="true"
                  />
                }
              >
                Refresh
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-brand-light-border bg-brand-light-bg/60 px-4 py-3 sm:px-5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-light-muted">
              Tools
            </span>

            {!isSupabaseConfigured && (
              <span className="inline-flex items-center gap-1.5 rounded border border-amber-300 bg-amber-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-800">
                <WifiOff className="h-3 w-3 shrink-0" aria-hidden="true" />
                Offline — this browser only
              </span>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={handleExport}
              disabled={advisories.length === 0}
              leftIcon={<Download className="h-3.5 w-3.5" aria-hidden="true" />}
            >
              Export backup
            </Button>

            {localCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => void importFromBrowser()}
                disabled={loading}
                leftIcon={<Upload className="h-3.5 w-3.5" aria-hidden="true" />}
              >
                Import {localCount} from this browser
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => void loadSamples()}
              disabled={advisories.length > 0 || loading}
              leftIcon={<FileText className="h-3.5 w-3.5" aria-hidden="true" />}
            >
              Load samples
            </Button>

            <div className="ms-auto flex items-center gap-2">
              {confirmingClearAll ? (
                <div className="flex flex-wrap items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5">
                  <span className="text-xs font-semibold text-red-800">
                    Delete all {advisories.length} records? This cannot be undone.
                  </span>
                  <button
                    type="button"
                    onClick={() => void clearAll()}
                    className="text-xs font-bold text-red-700 underline underline-offset-2 hover:text-red-900"
                  >
                    Yes, delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmingClearAll(false)}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-700"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setConfirmingClearAll(true)}
                  disabled={advisories.length === 0}
                  leftIcon={<Trash2 className="h-3.5 w-3.5" aria-hidden="true" />}
                  className="text-red-600 hover:bg-red-50"
                >
                  Clear all
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Records */}
        <section className="mt-6" aria-label="Advisory records">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-brand-dark">
                Advisory records
              </h2>
              <p className="mt-0.5 text-xs text-brand-light-muted">
                {hasFilters
                  ? `Showing ${visibleAdvisories.length} of ${advisories.length} ${
                      advisories.length === 1 ? 'record' : 'records'
                    }`
                  : `${advisories.length} ${advisories.length === 1 ? 'record' : 'records'} in total`}
              </p>
            </div>

            {hasFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-semibold text-brand-blue-700 hover:text-brand-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-300"
              >
                Reset filters
              </button>
            )}
          </div>

          <div className="mt-3 overflow-hidden rounded-lg border border-brand-light-border bg-white shadow-sm">
            {/* Column headings — desktop only */}
            <div
              className={cn(
                'hidden border-b border-brand-light-border bg-brand-light-bg/70 px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-brand-light-muted lg:grid lg:gap-x-4',
                RECORD_COLS
              )}
              aria-hidden="true"
            >
              <span>Reference</span>
              <span>Advisory</span>
              <span>Classification</span>
              <span>Validity</span>
              <span className="text-end">Actions</span>
            </div>

            {/* Loading skeleton */}
            {loading && advisories.length === 0 && (
              <div className="divide-y divide-brand-light-border" role="status" aria-live="polite">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="animate-pulse px-4 py-4 sm:px-5">
                    <div className="h-3.5 w-32 rounded bg-brand-light-subtle" />
                    <div className="mt-3 h-4 w-3/4 rounded bg-brand-light-subtle" />
                    <div className="mt-2 h-3 w-full rounded bg-brand-light-subtle" />
                  </div>
                ))}
              </div>
            )}

            {/* Empty states */}
            {!loading && advisories.length === 0 && (
              <div className="px-6 py-12 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-brand-light-border bg-brand-light-bg">
                  <FileText className="h-6 w-6 text-brand-blue" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-bold text-brand-dark">No records yet</h3>
                <p className="mx-auto mt-2 max-w-xl text-sm text-brand-light-muted">
                  Add the first travel advisory, or load the sample advisories to see how the console
                  and the public page work together.
                </p>
                <div className="mt-5 flex flex-col justify-center gap-2.5 sm:flex-row">
                  <Button
                    variant="primary"
                    onClick={openCreate}
                    leftIcon={<Plus className="h-4 w-4" aria-hidden="true" />}
                  >
                    New advisory
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => void loadSamples()}
                    leftIcon={<FileText className="h-4 w-4" aria-hidden="true" />}
                  >
                    Load samples
                  </Button>
                </div>
              </div>
            )}

            {!loading && advisories.length > 0 && visibleAdvisories.length === 0 && (
              <div className="px-6 py-12 text-center">
                <h3 className="text-base font-bold text-brand-dark">No records match the filters</h3>
                <p className="mx-auto mt-2 max-w-xl text-sm text-brand-light-muted">
                  Try a different search term, status or category.
                </p>
                <div className="mt-5 flex justify-center">
                  <Button variant="secondary" onClick={resetFilters}>
                    Reset filters
                  </Button>
                </div>
              </div>
            )}

            <ul className="divide-y divide-brand-light-border">
              {visibleAdvisories.map((advisory) => {
                const category = ADVISORY_CATEGORIES.find((item) => item.id === advisory.categoryId);
                const priority = ADVISORY_PRIORITIES.find((item) => item.id === advisory.priority);
                const location = getLocationLabel(advisory.locationId);
                const status = getAdvisoryStatus(advisory);
                const isBusy = busyId === advisory.id;
                const goesLive = advisory.publishAt && status === 'scheduled';

                return (
                  <li
                    key={advisory.id}
                    className={cn(
                      'border-s-4 px-4 py-4 transition-colors hover:bg-brand-light-bg/50 sm:px-5',
                      STATUS_ACCENT[status]
                    )}
                  >
                    <div
                      className={cn(
                        'flex flex-col gap-3 lg:grid lg:items-start lg:gap-x-4',
                        RECORD_COLS
                      )}
                    >
                      {/* Reference */}
                      <div className="min-w-0">
                        <p className="break-all font-mono text-xs font-semibold text-brand-dark">
                          {advisory.reference || '—'}
                        </p>
                        <p className="mt-1 text-[11px] text-brand-light-muted">
                          Issued {formatAdvisoryDateTime(advisory.issuedAt)}
                        </p>
                      </div>

                      {/* Advisory */}
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className={cn(chipClass, STATUS_CHIP_CLASSES[status])}>
                            {STATUS_LABELS[status]}
                          </span>
                          {advisory.isDemo && (
                            <span
                              className={cn(
                                chipClass,
                                'border-dashed border-amber-400 bg-amber-50 text-amber-800'
                              )}
                            >
                              Sample
                            </span>
                          )}
                        </div>

                        <h3 className="mt-2 break-words text-sm font-bold leading-snug text-brand-dark sm:text-[15px]">
                          {advisory.titleEn}
                        </h3>
                        <p
                          dir="rtl"
                          lang="ur"
                          className="mt-0.5 break-words font-arabic text-sm leading-relaxed text-brand-dark/80"
                        >
                          {advisory.titleUr}
                        </p>
                        <p className="mt-1.5 line-clamp-2 break-words text-xs leading-relaxed text-brand-light-muted">
                          {advisory.descriptionEn}
                        </p>

                        {(advisory.createdBy || advisory.updatedBy) && (
                          <p className="mt-1.5 break-words text-[11px] text-brand-light-muted">
                            {advisory.createdBy ? `Added by ${advisory.createdBy}` : null}
                            {advisory.createdBy && advisory.updatedBy ? ' · ' : null}
                            {advisory.updatedBy ? `Last edited by ${advisory.updatedBy}` : null}
                          </p>
                        )}
                      </div>

                      {/* Classification */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span
                          className={cn(
                            chipClass,
                            'border-brand-blue-200 bg-brand-blue-50 text-brand-blue-700'
                          )}
                        >
                          {category?.label ?? advisory.categoryId}
                        </span>
                        <span
                          className={cn(
                            chipClass,
                            'border-amber-300 bg-amber-50 text-amber-800'
                          )}
                        >
                          {priority?.label ?? advisory.priority}
                        </span>
                        <span
                          className={cn(chipClass, 'border-slate-300 bg-slate-50 text-slate-700')}
                        >
                          {location.name}
                        </span>
                      </div>

                      {/* Validity */}
                      <div className="space-y-1 text-[11px] text-brand-light-muted">
                        {goesLive && (
                          <p>
                            Goes live{' '}
                            <span className="font-semibold text-brand-blue-700">
                              {formatAdvisoryDateTime(advisory.publishAt)}
                            </span>
                          </p>
                        )}
                        <p>
                          {advisory.expiresAt ? (
                            <>
                              Expires{' '}
                              <span className="font-semibold text-brand-dark">
                                {formatAdvisoryDateTime(advisory.expiresAt)}
                              </span>
                            </>
                          ) : (
                            'No expiry set'
                          )}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEdit(advisory)}
                          leftIcon={<Pencil className="h-3.5 w-3.5" aria-hidden="true" />}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="secondary"
                          size="sm"
                          disabled={isBusy}
                          onClick={() => void togglePublished(advisory)}
                          leftIcon={
                            isBusy ? (
                              <LoaderCircle
                                className="h-3.5 w-3.5 animate-spin"
                                aria-hidden="true"
                              />
                            ) : advisory.isPublished ? (
                              <EyeOff className="h-3.5 w-3.5" aria-hidden="true" />
                            ) : (
                              <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                            )
                          }
                        >
                          {advisory.isPublished ? 'Unpublish' : 'Publish'}
                        </Button>

                        <button
                          type="button"
                          onClick={() => openDuplicate(advisory)}
                          title="Duplicate as a new draft"
                          aria-label={`Duplicate ${advisory.reference || 'advisory'} as a new draft`}
                          className={iconButtonClass}
                        >
                          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>

                        {pendingDelete === advisory.id ? (
                          <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5">
                            <span className="text-[11px] font-bold text-red-800">Delete?</span>
                            <button
                              type="button"
                              disabled={isBusy}
                              onClick={() => void removeAdvisory(advisory.id)}
                              className="text-[11px] font-bold text-red-700 underline underline-offset-2 hover:text-red-900"
                            >
                              Yes
                            </button>
                            <button
                              type="button"
                              onClick={() => setPendingDelete(null)}
                              className="text-[11px] font-semibold text-slate-500 hover:text-slate-700"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setPendingDelete(advisory.id)}
                            title="Delete advisory"
                            aria-label={`Delete ${advisory.reference || 'advisory'}`}
                            className={dangerIconButtonClass}
                          >
                            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
        </>
        )}

        {activeTab === 'routes' && <RouteStatusAdmin session={session} />}

        {activeTab === 'map' && <MapLocationsAdmin session={session} />}
      </main>

      <footer className="border-t border-brand-light-border bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 text-[11px] text-brand-light-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>Traffic Warden Abbottabad · Galiyat Travel Advisory management console</p>
          <p>
            Public page:{' '}
            <Link
              to={PUBLIC_PAGE_PATH}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-brand-blue hover:underline"
            >
              {PUBLIC_PAGE_PATH}
            </Link>
          </p>
        </div>
      </footer>

      {editor && (
        <AdvisoryEditorForm
          initial={editor.advisory}
          mode={editor.mode}
          saving={saving}
          onSave={(advisory) => void handleSave(advisory)}
          onCancel={() => setEditor(null)}
        />
      )}
    </div>
  );
};

export const GaliyatAdvisoryAdmin: React.FC = () => {
  useEffect(() => {
    document.title = 'Galiyat Advisory Dashboard | Traffic Warden Abbottabad';
  }, []);

  return (
    <RequireAdminSession>
      {(session) => <AdvisoryDashboard session={session} />}
    </RequireAdminSession>
  );
};

export default GaliyatAdvisoryAdmin;
