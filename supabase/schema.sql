-- Galiyat Travel Advisory — Supabase schema
-- ==========================================
--
-- Run this in the Supabase SQL editor when the project is created. The column
-- names are the snake_case equivalent of the `TravelAdvisory` type in
-- `src/types/galiyat.ts`, so the mapping in `src/services/advisoryStore.ts`
-- stays a one-to-one translation.
--
-- After the table exists:
--   1. npm i @supabase/supabase-js
--   2. Add a `supabaseAdvisoryStore` in `src/services/advisoryStore.ts`
--      (the interface and the exact queries are documented at the top of that file).
--   3. Point `advisoryStore` at it. Nothing else in the app changes.

create table if not exists public.galiyat_advisories (
  id             text primary key,
  reference      text not null,
  category_id    text not null check (category_id in ('weather', 'snowfall', 'road-closure', 'diversion', 'fog', 'safety')),
  priority       text not null check (priority in ('low', 'medium', 'high', 'critical')),
  title_en       text not null,
  title_ur       text not null,
  description_en text not null,
  description_ur text not null,
  actions_en     text[] not null default '{}',
  actions_ur     text[] not null default '{}',
  location_id    text not null check (location_id in ('all', 'nathia-gali', 'ayubia', 'dunga-gali', 'thandiani')),
  issued_at      timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  expires_at     timestamptz,
  is_published   boolean not null default false,
  is_demo        boolean not null default false,
  created_at     timestamptz not null default now()
);

comment on table public.galiyat_advisories is
  'Travel advisories for the Galiyat region, entered from the admin dashboard at /admin/galiyat-advisory.';

create index if not exists galiyat_advisories_active_idx
  on public.galiyat_advisories (is_published, issued_at desc);

-- ---------------------------------------------------------------- access control
-- Row level security keeps drafts private while the public page can read
-- published advisories without signing in.

alter table public.galiyat_advisories enable row level security;

drop policy if exists "Public can read published advisories" on public.galiyat_advisories;
create policy "Public can read published advisories"
  on public.galiyat_advisories for select
  using (is_published = true);

drop policy if exists "Staff can read all advisories" on public.galiyat_advisories;
create policy "Staff can read all advisories"
  on public.galiyat_advisories for select
  to authenticated
  using (true);

drop policy if exists "Staff can insert advisories" on public.galiyat_advisories;
create policy "Staff can insert advisories"
  on public.galiyat_advisories for insert
  to authenticated
  with check (true);

drop policy if exists "Staff can update advisories" on public.galiyat_advisories;
create policy "Staff can update advisories"
  on public.galiyat_advisories for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Staff can delete advisories" on public.galiyat_advisories;
create policy "Staff can delete advisories"
  on public.galiyat_advisories for delete
  to authenticated
  using (true);
