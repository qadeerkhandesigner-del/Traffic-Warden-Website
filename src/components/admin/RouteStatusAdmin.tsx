import React, { useCallback, useEffect, useState } from 'react';
import {
  LoaderCircle,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
  TriangleAlert,
  WifiOff,
  X,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { isSupabaseConfigured } from '../../services/supabaseClient';
import {
  createEmptyRoute,
  generateRouteId,
  routeStore,
} from '../../services/routeStore';
import { formatAdvisoryDateTime } from '../galiyat/advisoryFormat';
import type { AdminSession } from '../../services/adminAuth';
import type { GaliyatRoute, RouteStatus } from '../../types/galiyat';

const inputClass =
  'w-full rounded-lg border border-brand-light-border bg-white px-3 py-2 text-sm text-brand-dark placeholder:text-brand-light-muted focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue-200';

const labelClass = 'mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-brand-light-muted';

const iconButtonClass =
  'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-100 hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue';

const dangerIconButtonClass = cn(
  iconButtonClass,
  'hover:border-red-200 hover:bg-red-50 hover:text-red-600'
);

const STATUS_OPTIONS: { value: RouteStatus; label: string }[] = [
  { value: 'open', label: 'Open — کھلا' },
  { value: 'closed', label: 'Closed — بند' },
];

/**
 * Route Status management panel for the advisory dashboard.
 * Staff add routes manually, then flip each one open or closed; the public
 * advisory page picks the change up on its next refresh.
 */
export const RouteStatusAdmin: React.FC<{ session: AdminSession }> = ({ session }) => {
  const [routes, setRoutes] = useState<GaliyatRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  // Add form
  const [newNameEn, setNewNameEn] = useState('');
  const [newNameUr, setNewNameUr] = useState('');
  const [newNoteEn, setNewNoteEn] = useState('');
  const [newNoteUr, setNewNoteUr] = useState('');
  const [adding, setAdding] = useState(false);

  // Inline edit
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState({ nameEn: '', nameUr: '', noteEn: '', noteUr: '' });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const rows = await routeStore.list();
      setRoutes(rows);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Routes could not be loaded.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(null), 7000);
    return () => clearTimeout(timer);
  }, [notice]);

  /* ------------------------------- ACTIONS -------------------------------- */

  const handleAdd = async () => {
    if (!newNameEn.trim()) {
      setError('Route name (English) is required.');
      return;
    }

    setAdding(true);
    setError(null);

    const route: GaliyatRoute = {
      ...createEmptyRoute(),
      id: generateRouteId(),
      nameEn: newNameEn.trim(),
      nameUr: newNameUr.trim(),
      noteEn: newNoteEn.trim() || null,
      noteUr: newNoteUr.trim() || null,
      status: 'open',
      updatedBy: session.email,
    };

    try {
      await routeStore.create(route);
      setNotice(`Route "${route.nameEn}" added — currently marked Open.`);
      setNewNameEn('');
      setNewNameUr('');
      setNewNoteEn('');
      setNewNoteUr('');
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'The route could not be added.');
    } finally {
      setAdding(false);
    }
  };

  const changeStatus = async (route: GaliyatRoute, status: RouteStatus) => {
    if (route.status === status) return;

    setBusyId(route.id);
    setError(null);

    try {
      await routeStore.update(route.id, { status, updatedBy: session.email });
      setNotice(`"${route.nameEn}" marked ${status} on the website.`);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'The route status could not be updated.');
    } finally {
      setBusyId(null);
    }
  };

  const openEdit = (route: GaliyatRoute) => {
    setEditingId(route.id);
    setEditDraft({
      nameEn: route.nameEn,
      nameUr: route.nameUr,
      noteEn: route.noteEn ?? '',
      noteUr: route.noteUr ?? '',
    });
  };

  const saveEdit = async (route: GaliyatRoute) => {
    if (!editDraft.nameEn.trim()) {
      setError('Route name (English) is required.');
      return;
    }

    setBusyId(route.id);
    setError(null);

    try {
      await routeStore.update(route.id, {
        nameEn: editDraft.nameEn.trim(),
        nameUr: editDraft.nameUr.trim(),
        noteEn: editDraft.noteEn.trim() || null,
        noteUr: editDraft.noteUr.trim() || null,
        updatedBy: session.email,
      });
      setEditingId(null);
      setNotice(`Route "${editDraft.nameEn.trim()}" updated.`);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'The route could not be updated.');
    } finally {
      setBusyId(null);
    }
  };

  const removeRoute = async (id: string) => {
    setBusyId(id);
    setError(null);

    try {
      await routeStore.remove(id);
      setPendingDelete(null);
      setNotice('Route deleted.');
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'The route could not be deleted.');
    } finally {
      setBusyId(null);
    }
  };

  const closedCount = routes.filter((route) => route.status === 'closed').length;

  /* -------------------------------- RENDER -------------------------------- */

  return (
    <>
      {/* Page heading */}
      <div className="flex flex-col gap-4 border-b border-brand-light-border pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-extrabold uppercase tracking-tight text-brand-dark sm:text-2xl">
            Route Status
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-brand-light-muted">
            Add the Galiyat routes manually, then mark each one open or closed. The public advisory
            page shows the current status of every route.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="text-xs text-brand-light-muted">
            {routes.length} routes · {closedCount} closed
          </span>
          <Button
            variant="secondary"
            onClick={() => void load()}
            disabled={loading}
            leftIcon={
              <RefreshCw className={cn('h-4 w-4', loading && 'animate-spin')} aria-hidden="true" />
            }
          >
            Refresh
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

      {!isSupabaseConfigured && (
        <div className="mt-5 flex items-center gap-3 rounded-lg border border-amber-200 border-s-4 border-s-amber-500 bg-amber-50 p-3.5">
          <WifiOff className="h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
          <p className="text-sm text-amber-900">
            Supabase is not configured — routes are saved in this browser only.
          </p>
        </div>
      )}

      {/* Add route */}
      <section className="mt-6 rounded-lg border border-brand-light-border bg-white shadow-sm" aria-label="Add a route">
        <div className="p-4 sm:p-5">
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-dark">
            <Plus className="h-4 w-4 text-brand-blue" aria-hidden="true" />
            Add a route
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="block">
              <span className={labelClass}>Route name (English) *</span>
              <input
                type="text"
                value={newNameEn}
                onChange={(event) => setNewNameEn(event.target.value)}
                placeholder="e.g. Abbottabad — Nathia Gali Road"
                className={inputClass}
              />
            </label>

            <label className="block">
              <span className={labelClass}>Route name (Urdu)</span>
              <input
                type="text"
                value={newNameUr}
                onChange={(event) => setNewNameUr(event.target.value)}
                placeholder="مثلاً ایبٹ آباد — نتھیا گلی روڈ"
                dir="rtl"
                lang="ur"
                className={cn(inputClass, 'font-jameel text-base')}
              />
            </label>

            <label className="block">
              <span className={labelClass}>Note (English, optional)</span>
              <input
                type="text"
                value={newNoteEn}
                onChange={(event) => setNewNoteEn(event.target.value)}
                placeholder="e.g. Chain required after Barrian"
                className={inputClass}
              />
            </label>

            <label className="block">
              <span className={labelClass}>Note (Urdu, optional)</span>
              <input
                type="text"
                value={newNoteUr}
                onChange={(event) => setNewNoteUr(event.target.value)}
                placeholder="مثلاً بیریان کے بعد چین لازمی"
                dir="rtl"
                lang="ur"
                className={cn(inputClass, 'font-jameel text-base')}
              />
            </label>
          </div>

          <div className="mt-4">
            <Button
              variant="primary"
              onClick={() => void handleAdd()}
              disabled={adding}
              leftIcon={
                adding ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Plus className="h-4 w-4" aria-hidden="true" />
                )
              }
            >
              Add route
            </Button>
          </div>
        </div>
      </section>

      {/* Routes list */}
      <section className="mt-6" aria-label="Route records">
        <h2 className="text-sm font-bold uppercase tracking-wider text-brand-dark">Route records</h2>
        <p className="mt-0.5 text-xs text-brand-light-muted">
          {loading
            ? 'Loading…'
            : routes.length === 0
              ? 'No routes yet — add the first one above.'
              : `${routes.length} route${routes.length === 1 ? '' : 's'} · status changes appear on the website after save.`}
        </p>

        {loading && routes.length === 0 && (
          <div className="mt-3 flex items-center gap-2 rounded-lg border border-brand-light-border bg-white p-4 text-sm text-brand-light-muted">
            <LoaderCircle className="h-4 w-4 animate-spin text-brand-blue" aria-hidden="true" />
            Loading routes…
          </div>
        )}

        <ul className="mt-3 space-y-3">
          {routes.map((route) => {
            const isBusy = busyId === route.id;
            const isEditing = editingId === route.id;

            return (
              <li
                key={route.id}
                className={cn(
                  'rounded-lg border border-brand-light-border bg-white p-4 shadow-sm',
                  route.status === 'closed' && 'border-s-4 border-s-red-600',
                  route.status === 'open' && 'border-s-4 border-s-emerald-600'
                )}
              >
                {isEditing ? (
                  /* ------------------------------ EDIT MODE ------------------------------ */
                  <div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <label className="block">
                        <span className={labelClass}>Route name (English) *</span>
                        <input
                          type="text"
                          value={editDraft.nameEn}
                          onChange={(event) =>
                            setEditDraft({ ...editDraft, nameEn: event.target.value })
                          }
                          className={inputClass}
                        />
                      </label>

                      <label className="block">
                        <span className={labelClass}>Route name (Urdu)</span>
                        <input
                          type="text"
                          value={editDraft.nameUr}
                          onChange={(event) =>
                            setEditDraft({ ...editDraft, nameUr: event.target.value })
                          }
                          dir="rtl"
                          lang="ur"
                          className={cn(inputClass, 'font-jameel text-base')}
                        />
                      </label>

                      <label className="block">
                        <span className={labelClass}>Note (English)</span>
                        <input
                          type="text"
                          value={editDraft.noteEn}
                          onChange={(event) =>
                            setEditDraft({ ...editDraft, noteEn: event.target.value })
                          }
                          className={inputClass}
                        />
                      </label>

                      <label className="block">
                        <span className={labelClass}>Note (Urdu)</span>
                        <input
                          type="text"
                          value={editDraft.noteUr}
                          onChange={(event) =>
                            setEditDraft({ ...editDraft, noteUr: event.target.value })
                          }
                          dir="rtl"
                          lang="ur"
                          className={cn(inputClass, 'font-jameel text-base')}
                        />
                      </label>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => void saveEdit(route)}
                        disabled={isBusy}
                        leftIcon={
                          isBusy ? (
                            <LoaderCircle className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                          ) : null
                        }
                      >
                        Save changes
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingId(null)}
                        disabled={isBusy}
                        leftIcon={<X className="h-3.5 w-3.5" aria-hidden="true" />}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* ------------------------------ READ MODE ------------------------------ */
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-brand-dark">{route.nameEn}</p>
                      {route.nameUr && (
                        <p className="mt-0.5 font-jameel text-sm leading-loose text-brand-light-muted" dir="rtl" lang="ur">
                          {route.nameUr}
                        </p>
                      )}
                      {(route.noteEn || route.noteUr) && (
                        <p className="mt-1 text-xs text-brand-light-muted">
                          Note: {route.noteEn || route.noteUr}
                        </p>
                      )}
                      <p className="mt-1 text-[11px] text-brand-light-muted">
                        <bdi>Updated {formatAdvisoryDateTime(route.updatedAt)}</bdi>
                        {route.updatedBy ? ` · ${route.updatedBy}` : ''}
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-wrap items-center gap-2 ms-auto">
                      <label className="sr-only" htmlFor={`route-status-${route.id}`}>
                        Status of {route.nameEn}
                      </label>
                      <select
                        id={`route-status-${route.id}`}
                        value={route.status}
                        disabled={isBusy}
                        onChange={(event) => void changeStatus(route, event.target.value as RouteStatus)}
                        className={cn(
                          'rounded-lg border px-2.5 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-brand-blue',
                          route.status === 'open'
                            ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                            : 'border-red-300 bg-red-50 text-red-800'
                        )}
                      >
                        {STATUS_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>

                      {isBusy && (
                        <LoaderCircle className="h-4 w-4 animate-spin text-brand-blue" aria-hidden="true" />
                      )}

                      <button
                        type="button"
                        onClick={() => openEdit(route)}
                        title="Edit route"
                        aria-label={`Edit ${route.nameEn}`}
                        className={iconButtonClass}
                      >
                        <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>

                      {pendingDelete === route.id ? (
                        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5">
                          <span className="text-[11px] font-bold text-red-800">Delete?</span>
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => void removeRoute(route.id)}
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
                          onClick={() => setPendingDelete(route.id)}
                          title="Delete route"
                          aria-label={`Delete ${route.nameEn}`}
                          className={dangerIconButtonClass}
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default RouteStatusAdmin;
