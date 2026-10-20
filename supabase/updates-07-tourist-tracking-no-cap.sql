-- ============================================================================
-- Tourist Location Tracking — OPTIONAL update 07
-- Remove the 8-hour session cap: tracking runs as long as the tourist keeps
-- it on. Sessions now live for the full 3-day retention window (aligned with
-- automatic deletion), so an abandoned session can never outlive its data.
-- ============================================================================
--
-- Run in the Supabase SQL editor. Safe to run more than once.
-- Sessions created BEFORE this update keep their old 8-hour expires_at; all
-- new sessions get the 3-day window below.
--
-- NOTE: `expires_at` is now purely an internal safeguard for the retention
-- policy. The tourist UI shows no duration limit ("Tracking is ON" continues
-- until the user presses Stop), and the admin dashboard derives expiry from
-- this column as before.

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

-- Re-grant in case anything about the signature changed during iteration.
grant execute on function public.create_tracking_session(text, text, integer, boolean, text)
  to anon, authenticated;
