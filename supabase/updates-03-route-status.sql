-- ============================================================================
-- Galiyat advisory — OPTIONAL update 03
-- Route status board (open / closed)
-- ============================================================================
-- Creates the `galiyat_routes` table used by the "Route Status" tab in the
-- admin dashboard and the public route board on the advisory page.
--
-- Run it ONCE in the Supabase SQL editor. It is safe to run more than once.
-- Requires update 01 (staff access) to already be applied, because route
-- writing is restricted to the same advisory_staff list.
-- ============================================================================


-- ---------------------------------------------------------------------------
-- STEP 1 — the route table
-- ---------------------------------------------------------------------------

create table if not exists public.galiyat_routes (
  id          text primary key,
  name_en     text not null,
  name_ur     text not null default '',
  status      text not null default 'open' check (status in ('open', 'closed')),
  note_en     text,
  note_ur     text,
  updated_by  text,
  updated_at  timestamptz not null default now(),
  created_at  timestamptz not null default now()
);

comment on table public.galiyat_routes is
  'Galiyat route status board. Staff mark each route open or closed from the admin dashboard; the public advisory page shows the current status.';

comment on column public.galiyat_routes.status is
  'Current route condition: open or closed.';
comment on column public.galiyat_routes.note_en is
  'Optional short note, e.g. "Chain required after Barrian".';
comment on column public.galiyat_routes.updated_by is
  'Email of the staff member who last saved the route.';


-- ---------------------------------------------------------------------------
-- STEP 2 — row level security
-- ---------------------------------------------------------------------------
-- Route status is always public (there are no drafts), so everyone may read.
-- Writing stays restricted to the advisory_staff list from update 01.

alter table public.galiyat_routes enable row level security;

drop policy if exists "Public can read route status" on public.galiyat_routes;
drop policy if exists "Advisory staff can read routes" on public.galiyat_routes;
drop policy if exists "Advisory staff can insert routes" on public.galiyat_routes;
drop policy if exists "Advisory staff can update routes" on public.galiyat_routes;
drop policy if exists "Advisory staff can delete routes" on public.galiyat_routes;

create policy "Public can read route status"
  on public.galiyat_routes for select
  using (true);

create policy "Advisory staff can read routes"
  on public.galiyat_routes for select
  to authenticated
  using (public.is_advisory_staff());

create policy "Advisory staff can insert routes"
  on public.galiyat_routes for insert
  to authenticated
  with check (public.is_advisory_staff());

create policy "Advisory staff can update routes"
  on public.galiyat_routes for update
  to authenticated
  using (public.is_advisory_staff())
  with check (public.is_advisory_staff());

create policy "Advisory staff can delete routes"
  on public.galiyat_routes for delete
  to authenticated
  using (public.is_advisory_staff());

grant select on public.galiyat_routes to anon, authenticated;
grant insert, update, delete on public.galiyat_routes to authenticated;


-- ---------------------------------------------------------------------------
-- Verify (optional)
-- ---------------------------------------------------------------------------
-- select * from public.galiyat_routes;
-- select policyname, cmd, roles from pg_policies where tablename = 'galiyat_routes';
