-- ============================================================================
-- Tourist Location Tracking — update 09: Vehicle Number
-- Adds an optional vehicle registration number to tracking sessions so the
-- control room can match a live route with the tourist's vehicle during an
-- emergency (e.g. missing person, breakdown, accident).
-- ============================================================================
--
-- Run in the Supabase SQL editor. Safe to run more than once.
--
-- • The column is nullable — sessions created without a vehicle number stay
--   valid (older function signatures keep working through the new optional
--   parameter).
-- • Stored uppercase and trimmed; empty strings become NULL.

alter table public.tracking_sessions
  add column if not exists vehicle_number text;

-- Optional data-quality guard (defence in depth — the RPC also validates).
alter table public.tracking_sessions
  drop constraint if exists tracking_sessions_vehicle_number_shape;

alter table public.tracking_sessions
  add constraint tracking_sessions_vehicle_number_shape
  check (
    vehicle_number is null
    or (char_length(trim(vehicle_number)) between 3 and 15
        and trim(vehicle_number) ~ '^[A-Z0-9][A-Z0-9 \-]{2,14}$')
  );

-- ---------------------------------------------------------------------------
-- create_tracking_session — now accepts an optional p_vehicle_number.
-- The old 5-argument version is dropped first so there are no overloads.
-- ---------------------------------------------------------------------------

drop function if exists public.create_tracking_session(text, text, integer, boolean, text);
drop function if exists public.create_tracking_session(text, text, integer, boolean, text, text);

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
  -- Internal retention bound (matches cleanup_expired_tracking_data's 3-day
  -- deletion age). NOT a tourist-facing duration limit.
  v_retention constant interval := interval '3 days';
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

-- Re-grant in case anything about the signature changed during iteration.
grant execute on function public.create_tracking_session(text, text, integer, boolean, text, text)
  to anon, authenticated;
