-- ============================================================================
-- Tourist Location Tracking — update 08
-- Allow advisory staff to DELETE tracking sessions from the admin dashboard.
--   * Deleting a session cascades to its GPS history (FK ON DELETE CASCADE),
--     so the tourist's entire route is removed with one action.
--   * Only accounts listed in public.advisory_staff may delete — same gate as
--     the existing SELECT policies.
--   * The public still has NO delete path: the RPCs (create/record/stop) are
--     untouched and tourists can never delete sessions via the REST API.
-- ============================================================================
--
-- Run in the Supabase SQL editor. Safe to run more than once.

drop policy if exists "Advisory staff can delete tracking sessions"
  on public.tracking_sessions;
create policy "Advisory staff can delete tracking sessions"
  on public.tracking_sessions for delete
  to authenticated
  using (public.is_advisory_staff());

-- Optional but explicit: staff may also delete orphan history rows by hand
-- (normal session deletes already cascade to location_history).
drop policy if exists "Advisory staff can delete location history"
  on public.location_history;
create policy "Advisory staff can delete location history"
  on public.location_history for delete
  to authenticated
  using (public.is_advisory_staff());
