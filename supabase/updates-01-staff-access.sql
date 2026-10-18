-- ============================================================================
-- Galiyat advisory — OPTIONAL update 01
-- Staff-only access + audit trail + scheduled publishing
-- ============================================================================
--
-- This file is OPTIONAL. The website works without it: advisories can be added,
-- published and deleted by any signed-in staff account.
--
-- Run it only when you are ready to restrict writing to a fixed list of staff
-- email addresses. It is safe to run more than once.
--
--   Site name is checked with:
--   Supabase -> Authentication -> Users -> Add user -> Create new user
--   (tick "Auto Confirm User"), one account per staff member.
--
-- BEFORE RUNNING: go to STEP 4 at the bottom and replace the placeholder email
-- with your own account. If you skip that, the dashboard will look empty
-- because your account will not be allowed to read or change anything.
--
-- Also recommended (not possible in SQL):
--   Authentication -> Sign In / Providers -> Email
--   -> turn "Allow new users to sign up" OFF.
-- ============================================================================


-- ---------------------------------------------------------------------------
-- STEP 1 — extra columns: scheduling + audit trail
-- ---------------------------------------------------------------------------

alter table public.galiyat_advisories
  add column if not exists publish_at timestamptz,
  add column if not exists created_by text,
  add column if not exists updated_by text;

comment on column public.galiyat_advisories.publish_at is
  'Optional future time for automatic publication. Null = visible as soon as is_published is true.';
comment on column public.galiyat_advisories.created_by is
  'Email of the staff member who created the advisory.';
comment on column public.galiyat_advisories.updated_by is
  'Email of the staff member who last saved the advisory.';


-- ---------------------------------------------------------------------------
-- STEP 2 — the staff list
-- ---------------------------------------------------------------------------
-- Only emails in this table may read drafts or insert/update/delete advisories.

create table if not exists public.advisory_staff (
  email     text primary key,
  full_name text,
  added_at  timestamptz not null default now()
);

comment on table public.advisory_staff is
  'Emails allowed to manage Galiyat advisories. Managed from the Supabase dashboard (Table Editor) or the SQL editor.';

-- No API access at all: row level security on, and deliberately NO policies.
-- Staff are checked through the SECURITY DEFINER function below instead.
alter table public.advisory_staff enable row level security;

revoke all on table public.advisory_staff from anon, authenticated;

create or replace function public.is_advisory_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.advisory_staff s
    where lower(s.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

comment on function public.is_advisory_staff() is
  'True when the caller is signed in with an email listed in advisory_staff.';

grant execute on function public.is_advisory_staff() to anon, authenticated;


-- ---------------------------------------------------------------------------
-- STEP 3 — staff-only policies
-- ---------------------------------------------------------------------------
-- Drops both the old ("Staff can ...") and the new ("Advisory staff can ...")
-- policy names first, so this file can be run as many times as you like.

drop policy if exists "Staff can read all advisories" on public.galiyat_advisories;
drop policy if exists "Staff can insert advisories" on public.galiyat_advisories;
drop policy if exists "Staff can update advisories" on public.galiyat_advisories;
drop policy if exists "Staff can delete advisories" on public.galiyat_advisories;
drop policy if exists "Advisory staff can read all advisories" on public.galiyat_advisories;
drop policy if exists "Advisory staff can insert advisories" on public.galiyat_advisories;
drop policy if exists "Advisory staff can update advisories" on public.galiyat_advisories;
drop policy if exists "Advisory staff can delete advisories" on public.galiyat_advisories;
drop policy if exists "Public can read published advisories" on public.galiyat_advisories;

-- Public page: published notices whose publication time has arrived.
create policy "Public can read published advisories"
  on public.galiyat_advisories for select
  using (
    is_published = true
    and (publish_at is null or publish_at <= now())
  );

-- Dashboard: staff see everything, including drafts and scheduled notices.
create policy "Advisory staff can read all advisories"
  on public.galiyat_advisories for select
  to authenticated
  using (public.is_advisory_staff());

create policy "Advisory staff can insert advisories"
  on public.galiyat_advisories for insert
  to authenticated
  with check (public.is_advisory_staff());

create policy "Advisory staff can update advisories"
  on public.galiyat_advisories for update
  to authenticated
  using (public.is_advisory_staff())
  with check (public.is_advisory_staff());

create policy "Advisory staff can delete advisories"
  on public.galiyat_advisories for delete
  to authenticated
  using (public.is_advisory_staff());


-- ---------------------------------------------------------------------------
-- STEP 4 — add your own account to the staff list
-- ---------------------------------------------------------------------------
-- Replace the email below with the account from Authentication -> Users, then
-- run this one statement. Repeat it for each colleague who needs access.

insert into public.advisory_staff (email, full_name)
values ('REPLACE-WITH-YOUR-EMAIL@example.com', 'Advisory Board')
on conflict (email) do nothing;


-- ---------------------------------------------------------------------------
-- Verify (optional)
-- ---------------------------------------------------------------------------
-- select * from public.advisory_staff;
-- select policyname, cmd, roles from pg_policies where tablename = 'galiyat_advisories';
