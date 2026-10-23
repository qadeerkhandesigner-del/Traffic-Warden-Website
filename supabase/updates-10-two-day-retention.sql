-- ============================================================================
-- Tourist Location Tracking — update 10: Two-day retention
-- Shortens the GPS retention window from 3 days to 2 days.
-- ============================================================================
--
-- Run in the Supabase SQL editor AFTER updates-06, -07 and -09. Safe to run
-- more than once.
--
-- What changes:
--   • create_tracking_session() — new sessions get expires_at = start + 2 days
--     (still an internal retention bound, NOT a tourist-facing limit).
--   • cleanup_expired_tracking_data() — default and hard cap become 2 days.
--   • Existing running sessions are shortened to at most start + 2 days so the
--     whole board follows one consistent window.
--
-- What does NOT change:
--   • Tracking still runs until the tourist presses Stop; the only bound is the
--     retention window.
--   • The public page, admin dashboard and RPC signatures stay the same.
--
-- Deletion happens on the existing pg_cron job (daily 03:23 UTC). Already
-- stopped/expired sessions older than 2 days are removed on its next run; to
-- apply the new window immediately, run the optional call at the bottom.

-- ---------------------------------------------------------------------------
-- 1) create_tracking_session — same signature as updates-09, 2-day bound
-- ---------------------------------------------------------------------------

create or replace function public.create_tracking_session(
  p_full_name       text,
  p_phone_number    text,
  p_group_size      integer,
  p_consent_given   boolean,
  p_token           text,
  p_vehicle_number  text default null
)
returns table (session_id uuid, started_at timestamptz, expires_at timestamptz)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_phone     text;
  v_name      text := trim(regexp_replace(p_full_name, '\s+', ' ', 'g'));
  v_vehicle   text;
  v_started   timestamptz := now();
  v_expires   timestamptz;
  v_id        uuid;
  -- Internal retention bound (matches cleanup_expired_tracking_data's 2-day
  -- deletion age). NOT a tourist-facing duration limit.
  v_retention constant interval := interval '2 days';
begin
  -- Consent is mandatory and must arrive as a true boolean.
  if p_consent_given is distinct from true then
    raise exception 'CONSENT_REQUIRED';
  end if;

  if v_name is null or length(v_name) < 2 or length(v_name) > 80 then
    raise exception 'INVALID_NAME';
  end if;

  -- Pakistani mobile number -> canonical "+923XXXXXXXXX".
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

  -- Optional vehicle number: uppercase, collapse whitespace, empty -> NULL.
  v_vehicle := nullif(upper(trim(regexp_replace(coalesce(p_vehicle_number, ''), '\s+', ' ', 'g'))), '');
  if v_vehicle is not null and (
       char_length(v_vehicle) < 3
    or char_length(v_vehicle) > 15
    or v_vehicle !~ '^[A-Z0-9][A-Z0-9 \-]{2,14}$'
  ) then
    raise exception 'INVALID_VEHICLE_NUMBER';
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

  -- Abuse guard: at most 3 live sessions per phone number.
  if (select count(*)
        from public.tracking_sessions s
       where s.phone_number = v_phone
         and s.status = 'active'
         and s.expires_at > now()) >= 3 then
    raise exception 'TOO_MANY_ACTIVE_SESSIONS';
  end if;

  v_expires := v_started + v_retention;

  insert into public.tracking_sessions
    (full_name, phone_number, vehicle_number, group_size, consent_given,
     consent_timestamp, started_at, expires_at, status, session_token_hash)
  values
    (v_name, v_phone, v_vehicle, p_group_size, true,
     v_started, v_started, v_expires, 'active',
     encode(extensions.digest(p_token, 'sha256'), 'hex'))
  returning id into v_id;

  return query
    select v_id, v_started, v_expires;
end;
$$;

grant execute on function public.create_tracking_session(text, text, integer, boolean, text, text)
  to anon, authenticated;

-- ---------------------------------------------------------------------------
-- 2) cleanup_expired_tracking_data — 2-day default and hard cap
-- ---------------------------------------------------------------------------

create or replace function public.cleanup_expired_tracking_data(
  p_older_than interval default interval '2 days'
)
returns integer
language sql
security definer
set search_path = ''
as $$
  with removed as (
    delete from public.tracking_sessions
     where created_at < now() - least(p_older_than, interval '2 days')
    returning 1
  )
  select count(*)::integer from removed;
$$;

grant execute on function public.cleanup_expired_tracking_data(interval)
  to authenticated;

-- ---------------------------------------------------------------------------
-- 3) Align sessions that are still running with the shorter window
-- ---------------------------------------------------------------------------

update public.tracking_sessions
   set expires_at = least(expires_at, started_at + interval '2 days')
 where status = 'active'
   and expires_at > started_at + interval '2 days';

-- ---------------------------------------------------------------------------
-- 4) Documentation on the table
-- ---------------------------------------------------------------------------

comment on table public.tracking_sessions is
  'Tourist "Track Your Location" sessions. Created only through public.create_tracking_session(). Rows contain personal data and are auto-deleted after 2 days by public.cleanup_expired_tracking_data().';

-- ---------------------------------------------------------------------------
-- Optional: apply the 2-day window right now instead of waiting for the daily
-- 03:23 UTC cleanup job. This permanently deletes sessions (and their GPS
-- history) created more than 2 days ago.
-- ---------------------------------------------------------------------------
-- select public.cleanup_expired_tracking_data();

-- ---------------------------------------------------------------------------
-- Verify
-- ---------------------------------------------------------------------------
-- select pg_get_functiondef('public.cleanup_expired_tracking_data(interval)'::regprocedure);
-- select count(*) as sessions, min(created_at) as oldest from public.tracking_sessions;
