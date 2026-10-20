-- ============================================================================
-- Tourist Location Tracking — OPTIONAL update 06
-- "Track Your Location" (tourism safety) + admin dashboard at /admin
-- ============================================================================
--
-- Creates the tracking tables, their Row Level Security rules, the security
-- definer RPCs that the public tracking page and the admin dashboard use, and
-- (when pg_cron is available) the scheduled expiry / 3-day cleanup jobs.
--
-- Run it in the Supabase SQL editor: project -> SQL Editor -> New query ->
-- paste -> Run. It is safe to run more than once.
--
-- SECURITY MODEL (summary):
--   * `tracking_sessions` and `location_history` have RLS ENABLED with NO
--     policy for the public. Visitors can NEVER read anybody's session or
--     location through the normal REST API — not even their own. All public
--     access goes through the SECURITY DEFINER RPC functions below, which
--     validate everything server-side. The session window (`expires_at`) is
--     an internal, amortized safeguard aligned with the 3-day retention
--     window — the tourist-facing UI imposes no duration limit; tracking
--     runs until the tourist stops it (see updates-07 for the same rule
--     expressed for already-deployed projects).
--   * Only signed-in accounts listed in `public.advisory_staff` (the same
--     staff list used by the Galiyat advisory dashboard, see
--     `updates-01-staff-access.sql`) may SELECT the tables directly. That is
--     what powers the "Tourist Locations" tab in the /admin dashboard.
--   * Tourist authorization is NOT the session UUID alone: every location
--     write and every "stop" must present a secret token whose SHA-256 hash
--     matches `session_token_hash`. The hash is stored; the raw token never
--     leaves the tourist's browser except inside the HTTPS request body.
--   * The full_name / phone / group_size personal data is stored only for the
--     safety purpose of this feature and auto-deleted after 3 days.
-- ============================================================================


-- ---------------------------------------------------------------------------
-- STEP 0 — pgcrypto (SHA-256 of the session token)
-- ---------------------------------------------------------------------------

create extension if not exists pgcrypto with schema extensions;


-- ---------------------------------------------------------------------------
-- STEP 1 — tables
-- ---------------------------------------------------------------------------

-- A. One row per tourist tracking session.
create table if not exists public.tracking_sessions (
  id                  uuid primary key default gen_random_uuid(),
  full_name           text not null,
  phone_number        text not null,
  group_size          integer not null check (group_size >= 1 and group_size <= 50),
  consent_given       boolean not null check (consent_given = true),
  consent_timestamp   timestamptz,
  started_at          timestamptz not null default now(),
  -- INTERNAL RETENTION BOUND: always start + 3 days (matches the automatic
  -- deletion age). It is not a tourist-facing limit; tracking runs until the
  -- tourist stops it (or the retention window closes).
  expires_at          timestamptz not null,
  stopped_at          timestamptz,
  status              text not null default 'active'
                        check (status in ('active', 'stopped', 'expired')),
  -- SHA-256 hex of the secret access token held by the tourist's browser.
  session_token_hash  text not null,
  created_at          timestamptz not null default now()
);

comment on table public.tracking_sessions is
  'Tourist "Track Your Location" sessions. Created only through public.create_tracking_session(). Rows contain personal data and are auto-deleted after 3 days by public.cleanup_expired_tracking_data().';

-- B. GPS readings, cascaded when their session row is deleted (retention).
create table if not exists public.location_history (
  id              uuid primary key default gen_random_uuid(),
  session_id      uuid not null references public.tracking_sessions (id) on delete cascade,
  latitude        numeric(9, 6) not null check (latitude between -90 and 90),
  longitude       numeric(9, 6) not null check (longitude between -180 and 180),
  accuracy_meters numeric,
  recorded_at     timestamptz not null,
  created_at      timestamptz not null default now()
);

comment on table public.location_history is
  'GPS samples for tracking sessions. Writable only through public.record_tracking_locations(), which verifies the session token, expiry, rate limit and dedupe rules.';

create index if not exists tracking_sessions_phone_created_idx
  on public.tracking_sessions (phone_number, created_at desc);

create index if not exists tracking_sessions_status_expiry_idx
  on public.tracking_sessions (status, expires_at);

create index if not exists location_history_session_recorded_idx
  on public.location_history (session_id, recorded_at desc);

create index if not exists location_history_recorded_at_idx
  on public.location_history (recorded_at desc);


-- ---------------------------------------------------------------------------
-- STEP 2 — Row Level Security
-- ---------------------------------------------------------------------------

alter table public.tracking_sessions enable row level security;
alter table public.location_history enable row level security;

-- The public gets NO policies at all on these tables: no reads, writes,
-- updates or deletes through the REST API. Everything public goes through
-- the RPC functions below.

drop policy if exists "Advisory staff can read tracking sessions"
  on public.tracking_sessions;
create policy "Advisory staff can read tracking sessions"
  on public.tracking_sessions for select
  to authenticated
  using (public.is_advisory_staff());

drop policy if exists "Advisory staff can read location history"
  on public.location_history;
create policy "Advisory staff can read location history"
  on public.location_history for select
  to authenticated
  using (public.is_advisory_staff());

-- Officers may remove a session from the admin dashboard; the delete cascades
-- to its GPS history (FK ON DELETE CASCADE). The public has no delete path.
drop policy if exists "Advisory staff can delete tracking sessions"
  on public.tracking_sessions;
create policy "Advisory staff can delete tracking sessions"
  on public.tracking_sessions for delete
  to authenticated
  using (public.is_advisory_staff());

drop policy if exists "Advisory staff can delete location history"
  on public.location_history;
create policy "Advisory staff can delete location history"
  on public.location_history for delete
  to authenticated
  using (public.is_advisory_staff());


-- ---------------------------------------------------------------------------
-- STEP 3 — RPC: create a session (rate-limited per phone number)
-- ---------------------------------------------------------------------------

-- Error codes raised (mapped to friendly messages in the frontend):
--   CONSENT_REQUIRED / INVALID_NAME / INVALID_PHONE / INVALID_GROUP_SIZE /
--   INVALID_TOKEN / TOO_MANY_ACTIVE_SESSIONS
create or replace function public.create_tracking_session(
  p_full_name     text,
  p_phone_number  text,
  p_group_size    integer,
  p_consent_given boolean,
  p_token         text
)
returns table (session_id uuid, started_at timestamptz, expires_at timestamptz)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_phone     text;
  v_name      text := trim(regexp_replace(p_full_name, '\s+', ' ', 'g'));
  v_started   timestamptz := now();
  v_expires   timestamptz;
  v_id        uuid;
  -- Internal retention bound, aligned with the 3-day automatic deletion.
  -- NOT a tourist-facing duration limit.
  v_retention constant interval := interval '3 days';
begin
  -- Consent is mandatory and must arrive as a true boolean.
  if p_consent_given is distinct from true then
    raise exception 'CONSENT_REQUIRED';
  end if;

  if v_name is null or length(v_name) < 2 or length(v_name) > 80 then
    raise exception 'INVALID_NAME';
  end if;

  -- Pakistani mobile number -> canonical "+92 3XXXXXXXXX".
  v_phone := regexp_replace(coalesce(p_phone_number, ''), '[\s\-\(\)\.]', '', 'g');
  v_phone := case
    when v_phone ~ '^\+92(3\d{9})$' then '+92'  || (regexp_match(v_phone, '^\+92(3\d{9})$'))[1]
    when v_phone ~ '^0092(3\d{9})$' then '+92'  || (regexp_match(v_phone, '^0092(3\d{9})$'))[1]
    when v_phone ~ '^0(3\d{9})$'    then '+92'  || (regexp_match(v_phone, '^0(3\d{9})$'))[1]
    when v_phone ~ '^(3\d{9})$'     then '+92'  || (regexp_match(v_phone, '^(3\d{9})$'))[1]
    else null
  end;
  if v_phone is null then
    raise exception 'INVALID_PHONE';
  end if;

  -- Group size sanity (defence in depth; the CHECK constraint repeats it).
  if p_group_size is null or p_group_size < 1 or p_group_size > 50 then
    raise exception 'INVALID_GROUP_SIZE';
  end if;

  -- Token: 32-128 chars of browser-generated random material
  -- (crypto.getRandomValues). Stored ONLY as its SHA-256 hash.
  if p_token is null or length(p_token) < 32 or length(p_token) > 128
     or p_token !~ '^[0-9a-zA-Z_\-]+$' then
    raise exception 'INVALID_TOKEN';
  end if;

  -- Abuse guard: at most 3 non-expired sessions per phone number.
  if (select count(*)
        from public.tracking_sessions s
       where s.phone_number = v_phone
         and s.status = 'active'
         and s.expires_at > now()) >= 3 then
    raise exception 'TOO_MANY_ACTIVE_SESSIONS';
  end if;

  v_expires := v_started + v_retention;

  insert into public.tracking_sessions
    (full_name, phone_number, group_size, consent_given, consent_timestamp,
     started_at, expires_at, status, session_token_hash)
  values
    (v_name, v_phone, p_group_size, true, v_started,
     v_started, v_expires, 'active',
     encode(extensions.digest(p_token, 'sha256'), 'hex'))
  returning id into v_id;

  return query
    select v_id, v_started, v_expires;
end;
$$;


-- ---------------------------------------------------------------------------
-- STEP 4 — RPC: record GPS locations (the only public write into history)
-- ---------------------------------------------------------------------------
-- Accepts ONE point (live tracking) or a batch of up to 200 points (offline
-- queue replay). Returns the number of points actually stored.
--
-- Per point it enforces:
--   * a valid session: correct token, status 'active', not past `expires_at`
--     (the internal retention bound — expired here on the server, never by a
--     frontend timer);
--   * lat/lng numeric ranges (plus the column CHECK constraints);
--   * `recorded_at` plausibility: not before the session started (10 min
--     grace) and not more than 2 minutes in the future;
--   * dedupe: exact duplicates and points recorded within ±4 seconds of an
--     existing reading are skipped (rate limit: max one point per 4 s);
--   * movement dedupe inside a batch: consecutive points under 20 m apart
--     AND less than 2 minutes apart are collapsed to one.
create or replace function public.record_tracking_locations(
  p_session_id uuid,
  p_token      text,
  p_points     jsonb
)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_row            public.tracking_sessions;
  v_inserted       integer := 0;
  v_count          integer := 0;
  v_i              integer := 0;
  v_point          jsonb;
  v_lat            numeric;
  v_lng            numeric;
  v_acc            numeric;
  v_ts             timestamptz;
  v_prev_ts        timestamptz;
  v_prev_lat       numeric;
  v_prev_lng       numeric;
  v_dist_m         double precision;
begin
  select * into v_row
    from public.tracking_sessions s
   where s.id = p_session_id
     and s.session_token_hash = encode(extensions.digest(p_token, 'sha256'), 'hex');

  if not found then
    raise exception 'SESSION_NOT_FOUND';
  end if;

  -- Server-side expiry: flip a breached session over and reject everything.
  if v_row.status = 'active' and v_row.expires_at <= now() then
    update public.tracking_sessions
       set status = 'expired'
     where id = v_row.id and status = 'active';
    raise exception 'SESSION_EXPIRED';
  end if;
  if v_row.status <> 'active' then
    raise exception 'SESSION_EXPIRED';
  end if;

  if p_points is null or jsonb_typeof(p_points) <> 'array'
     or jsonb_array_length(p_points) < 1
     or jsonb_array_length(p_points) > 200 then
    raise exception 'INVALID_POINTS';
  end if;

  v_count := jsonb_array_length(p_points);

  for v_i in 0 .. v_count - 1 loop
    v_point := p_points -> v_i;

    -- Guarded casts: malformed values are skipped, never fatal.
    if coalesce(v_point ->> 'latitude', '')  !~ '^-?\d+(\.\d+)?$'
       or coalesce(v_point ->> 'longitude', '') !~ '^-?\d+(\.\d+)?$'
       or (v_point ->> 'accuracy_meters') is not null
          and coalesce(v_point ->> 'accuracy_meters', '0') !~ '^-?\d+(\.\d+)?$'
       or coalesce(v_point ->> 'recorded_at', '')
          !~ '^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}(:\d{2})?(\.\d+)?([+-]\d{2}:?\d{2}|Z)?$' then
      continue;
    end if;

    v_lat := nullif(v_point ->> 'latitude', '')::numeric;
    v_lng := nullif(v_point ->> 'longitude', '')::numeric;
    v_acc := nullif(v_point ->> 'accuracy_meters', '')::numeric;
    v_ts  := nullif(v_point ->> 'recorded_at', '')::timestamptz;

    if v_lat is null or v_lng is null or v_ts is null
       or v_lat < -90 or v_lat > 90
       or v_lng < -180 or v_lng > 180 then
      continue; -- skip malformed point
    end if;
    if v_acc is not null and (v_acc < 0 or v_acc > 100000) then
      v_acc := null;
    end if;

    -- Plausible timeline only.
    if v_ts < v_row.started_at - interval '10 minutes'
       or v_ts > now() + interval '2 minutes'
       or v_ts > v_row.expires_at then
      continue;
    end if;

    -- Exact duplicate / spacing dedupe (also rate-limits the live path to
    -- one point per 4 seconds per session).
    if exists (
      select 1 from public.location_history h
       where h.session_id = v_row.id
         and h.recorded_at between v_ts - interval '4 seconds'
                               and v_ts + interval '4 seconds'
    ) then
      continue;
    end if;

    -- In-batch movement dedupe against the previous ACCEPTED point.
    if v_prev_ts is not null then
      v_dist_m := 6371000 * acos(least(1,
        cos(radians(v_prev_lat)) * cos(radians(v_lat))
        * cos(radians(v_lng) - radians(v_prev_lng))
        + sin(radians(v_prev_lat)) * sin(radians(v_lat))));
      if v_dist_m < 20 and abs(extract(epoch from (v_ts - v_prev_ts))) < 120 then
        continue;
      end if;
    end if;

    insert into public.location_history
      (session_id, latitude, longitude, accuracy_meters, recorded_at)
    values
      (v_row.id, v_lat, v_lng, v_acc, v_ts);

    v_inserted := v_inserted + 1;
    v_prev_ts  := v_ts;
    v_prev_lat := v_lat;
    v_prev_lng := v_lng;
  end loop;

  return v_inserted;
end;
$$;


-- ---------------------------------------------------------------------------
-- STEP 5 — RPC: stop tracking (tourist's own session, token-verified)
-- ---------------------------------------------------------------------------

create or replace function public.stop_tracking_session(
  p_session_id uuid,
  p_token      text
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_row public.tracking_sessions;
begin
  select * into v_row
    from public.tracking_sessions s
   where s.id = p_session_id
     and s.session_token_hash = encode(extensions.digest(p_token, 'sha256'), 'hex');

  if not found then
    raise exception 'SESSION_NOT_FOUND';
  end if;

  if v_row.status = 'active' and v_row.expires_at <= now() then
    update public.tracking_sessions
       set status = 'expired'
     where id = v_row.id and status = 'active';
    return false;
  end if;

  update public.tracking_sessions
     set status    = 'stopped',
         stopped_at = coalesce(stopped_at, now())
   where id = v_row.id
     and status = 'active';

  return true;
end;
$$;


-- ---------------------------------------------------------------------------
-- STEP 6 — RPCs for scheduled maintenance (called by pg_cron)
-- ---------------------------------------------------------------------------

-- Mark 'active' sessions that passed `expires_at` as expired. Until this runs,
-- the admin dashboard still derives the correct state from `expires_at`
-- client-side, so display never depends on the scheduler having fired.
create or replace function public.expire_stale_tracking_sessions()
returns integer
language sql
security definer
set search_path = ''
as $$
  with flipped as (
    update public.tracking_sessions
       set status = 'expired'
     where status = 'active'
       and expires_at <= now()
    returning 1
  )
  select count(*)::integer from flipped;
$$;

-- RETENTION: delete a session (and, by cascade, its location history) 3 days
-- after it was created. `p_older_than` may shorten the window but can never
-- exceed 3 days.
create or replace function public.cleanup_expired_tracking_data(
  p_older_than interval default interval '3 days'
)
returns integer
language sql
security definer
set search_path = ''
as $$
  with removed as (
    delete from public.tracking_sessions
     where created_at < now() - least(p_older_than, interval '3 days')
    returning 1
  )
  select count(*)::integer from removed;
$$;


-- ---------------------------------------------------------------------------
-- STEP 7 — grants (public callers use only these RPCs)
-- ---------------------------------------------------------------------------

grant execute on function public.create_tracking_session(text, text, integer, boolean, text)
  to anon, authenticated;
grant execute on function public.record_tracking_locations(uuid, text, jsonb)
  to anon, authenticated;
grant execute on function public.stop_tracking_session(uuid, text)
  to anon, authenticated;
grant execute on function public.expire_stale_tracking_sessions()
  to authenticated;
grant execute on function public.cleanup_expired_tracking_data(interval)
  to authenticated;


-- ---------------------------------------------------------------------------
-- STEP 8 — scheduled jobs (require the pg_cron extension)
-- ---------------------------------------------------------------------------
-- pg_cron is available on Supabase (Database -> Extensions -> pg_cron; the
-- schedule history lives in Database -> Backups / cron.job_run_details).
-- This block is guarded: if pg_cron is not enabled yet, the statements are
-- reported in the SQL editor output and can be re-run after enabling it.
-- If your plan does not offer pg_cron, run STEP 6 functions manually (SQL
-- editor) or from any trusted daily job — expiry displayed to officers is
-- derived from `expires_at` and does not depend on this scheduler.
-- ---------------------------------------------------------------------------

do $cron$
begin
  begin
    perform cron.unschedule('expire-tracking-sessions');
  exception
    when undefined_table or undefined_object or undefined_function or invalid_schema_name then
      null; -- cron schema/functions not present yet
  end;
  begin
    perform cron.unschedule('cleanup-tracking-data');
  exception
    when undefined_table or undefined_object or undefined_function or invalid_schema_name then
      null;
  end;

  begin
    perform cron.schedule(
      'expire-tracking-sessions',
      '*/15 * * * *',
      $job$ select public.expire_stale_tracking_sessions(); $job$
    );
  exception
    when undefined_object or undefined_function or invalid_schema_name then
      raise notice 'pg_cron is not enabled — run step 6 jobs manually or enable pg_cron (Database -> Extensions).';
  end;

  begin
    perform cron.schedule(
      'cleanup-tracking-data',
      '23 3 * * *',
      $job$ select public.cleanup_expired_tracking_data(); $job$
    );
  exception
    when undefined_object or undefined_function or invalid_schema_name then
      raise notice 'pg_cron is not enabled — run step 6 jobs manually or enable pg_cron (Database -> Extensions).';
  end;
end;
$cron$;


-- ---------------------------------------------------------------------------
-- Verify (optional)
-- ---------------------------------------------------------------------------
-- select tablename, policyname, cmd, roles from pg_policies
--  where tablename in ('tracking_sessions', 'location_history');
-- select proname, prosecdef from pg_proc
--  where proname in ('create_tracking_session','record_tracking_locations',
--                    'stop_tracking_session','expire_stale_tracking_sessions',
--                    'cleanup_expired_tracking_data');
-- select jobname, schedule, command from cron.job;
