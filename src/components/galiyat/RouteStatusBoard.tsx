import React from 'react';
import { Ban, CircleCheck, Clock3, MapPin, Route as RouteIcon } from 'lucide-react';
import { formatAdvisoryDateTime } from './advisoryFormat';
import type { GaliyatRoute } from '../../types/galiyat';
import { cn } from '../../lib/utils';

export interface RouteStatusBoardProps {
  routes: GaliyatRoute[];
  isLoading?: boolean;
}

/* Shared furniture for the board so loading, empty and loaded states match. */
export const BOARD_FRAME = 'overflow-hidden rounded-2xl border border-brand-light-border bg-white shadow-gov';

export const BOARD_HEADER =
  'flex flex-wrap items-center justify-between gap-x-4 gap-y-2 bg-[#000080] px-4 py-3 sm:px-5';

export const BOARD_TITLE =
  'inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white sm:text-xs';

export const COUNT_CHIP =
  'inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-bold tracking-wide text-white sm:text-[11px]';

const chipClass = (isOpen: boolean) =>
  cn(
    'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold',
    isOpen
      ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
      : 'border-red-300 bg-red-50 text-red-800'
  );

const lastUpdateClass =
  'mt-2 flex items-center gap-1 text-[10px] text-brand-light-muted';

/** Single row — chip leads on the left, bilingual name on the right. */
const RouteRow: React.FC<{ route: GaliyatRoute }> = ({ route }) => {
  const isOpen = route.status === 'open';

  return (
    <li className={cn('px-4 py-4 sm:px-5', !isOpen && 'bg-red-50/40')}>
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        {/* Status chip — left side, icon + text (never colour alone) */}
        <span className={chipClass(isOpen)}>
          {isOpen ? (
            <CircleCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
          ) : (
            <Ban className="h-4 w-4 shrink-0" aria-hidden="true" />
          )}
          {isOpen ? 'OPEN · کھلا' : 'CLOSED · بند'}
        </span>

        {/* Route name — right aligned */}
        <div className="ms-auto text-right">
          <h3 className="font-jameel text-base font-bold leading-snug text-brand-dark">
            {route.nameUr || route.nameEn}
          </h3>
          {route.nameUr && route.nameUr !== route.nameEn && (
            <p className="mt-0.5 text-xs font-medium text-brand-light-muted">{route.nameEn}</p>
          )}
        </div>

        {/* Optional note — full width, right aligned */}
        {(route.noteUr || route.noteEn) && (
          <p className="w-full text-right font-jameel text-sm leading-loose text-brand-light-muted">
            <span aria-hidden="true">↳ </span>
            {route.noteUr || route.noteEn}
          </p>
        )}
      </div>

      {/* Last update — left side of the row */}
      <p className={lastUpdateClass}>
        <Clock3 className="h-3 w-3 shrink-0" aria-hidden="true" />
        {/* bdi keeps the timestamp ordering correct in RTL layout */}
        <bdi>Updated {formatAdvisoryDateTime(route.updatedAt)}</bdi>
      </p>
    </li>
  );
};

/**
 * Public route status board — an official single-frame board: navy header with
 * a live indicator and open/closed counts, then one row per route. Closed
 * routes lead so visitors see blockages first.
 */
export const RouteStatusBoard: React.FC<RouteStatusBoardProps> = ({ routes, isLoading }) => {
  if (isLoading) {
    return (
      <div className={BOARD_FRAME}>
        <div className={BOARD_HEADER}>
          <span className={BOARD_TITLE}>
            <MapPin className="h-4 w-4 shrink-0 text-brand-lime" aria-hidden="true" />
            Route Status Board
          </span>
        </div>
        <ul className="divide-y divide-brand-light-border">
          {[0, 1, 2].map((index) => (
            <li key={index} className="animate-pulse px-4 py-4 sm:px-5">
              <div className="h-4 w-36 rounded bg-brand-light-subtle" />
              <div className="mt-2 h-3 w-1/2 rounded bg-brand-light-subtle" />
              <div className="mt-1.5 h-3 w-20 rounded bg-brand-light-subtle" />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const openCount = routes.filter((route) => route.status === 'open').length;
  const closedCount = routes.length - openCount;

  /** Closed routes lead — visitors need blockages first. */
  const sorted = [...routes].sort((a, b) => {
    if (a.status !== b.status) return a.status === 'closed' ? -1 : 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return (
    <div className={BOARD_FRAME}>
      {/* Board header — live badge + counts */}
      <div className={BOARD_HEADER}>
        <span className={BOARD_TITLE}>
          {/* Live pulse — motion + colour + text together */}
          <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-lime opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-lime" />
          </span>
          Route Status Board
        </span>

        <span className="flex items-center gap-2">
          <span className={COUNT_CHIP}>
            <CircleCheck className="h-3.5 w-3.5 shrink-0 text-brand-lime" aria-hidden="true" />
            {openCount} Open
          </span>
          <span className={COUNT_CHIP}>
            <Ban className="h-3.5 w-3.5 shrink-0 text-red-300" aria-hidden="true" />
            {closedCount} Closed
          </span>
        </span>
      </div>

      {/* Rows */}
      {sorted.length > 0 ? (
        <ul className="divide-y divide-brand-light-border">
          {sorted.map((route) => (
            <RouteRow key={route.id} route={route} />
          ))}
        </ul>
      ) : (
        /* Empty state — no routes added yet */
        <div className="p-8 text-center">
          <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-brand-blue-50">
            <RouteIcon className="h-5 w-5 text-brand-blue" aria-hidden="true" />
          </span>
          <p className="mt-3 font-jameel text-sm font-bold text-brand-dark">
            رستوں کی فہرست ابھی شامل نہیں ہوئی
          </p>
          <p className="mx-auto mt-1 max-w-md font-jameel text-xs leading-loose text-brand-light-muted">
            ایڈوائزری بورڈ ابھی تک کوئی رستہ درج نہیں کر رہا۔ رستے دستیاب ہونے پر یہاں ان کی کھلی یا بند
            صورتحال دکھائی جائے گی۔
          </p>
        </div>
      )}
    </div>
  );
};

export default RouteStatusBoard;
