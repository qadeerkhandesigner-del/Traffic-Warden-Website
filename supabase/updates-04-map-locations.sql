-- ============================================================================
-- updates-04-map-locations.sql
-- Abbottabad Tourist & Traffic Map — `map_locations` table + RLS policies.
--
-- Run this in the Supabase SQL Editor (non-destructive: uses IF NOT EXISTS).
-- Staff write access reuses the existing `is_advisory_staff()` function that
-- gates the advisory/route dashboards — no new security model is introduced.
-- ============================================================================

-- 1) Table -------------------------------------------------------------------

create table if not exists public.map_locations (
  id text primary key,
  name text not null,
  category text not null check (
    category in ('tourist', 'hotel', 'restaurant', 'fuel', 'police', 'facilitation', 'trail')
  ),
  latitude double precision not null check (latitude between -90 and 90),
  longitude double precision not null check (longitude between -180 and 180),
  description text,
  address text,
  contact_number text,
  image_url text,
  google_maps_url text,
  is_verified boolean not null default false,
  last_verified_at timestamptz,
  -- Only published rows are readable by the public website.
  is_published boolean not null default false,
  -- Audit trail — staff email that created / last saved the record.
  created_by text,
  updated_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists map_locations_category_idx on public.map_locations (category);
create index if not exists map_locations_published_idx on public.map_locations (is_published);

-- 2) Row Level Security -----------------------------------------------------

alter table public.map_locations enable row level security;

-- Public visitors: read published rows only. No anonymous writes, ever.
drop policy if exists "Public can read published map locations"
  on public.map_locations;
create policy "Public can read published map locations"
  on public.map_locations
  for select
  to anon, authenticated
  using (is_published = true);

-- Advisory staff: full management via the existing staff gate used by the
-- advisory + route dashboard tables.
drop policy if exists "Advisory staff manage map locations"
  on public.map_locations;
create policy "Advisory staff manage map locations"
  on public.map_locations
  to authenticated
  using (public.is_advisory_staff())
  with check (public.is_advisory_staff());

-- 3) Auto-update the `updated_at` audit column ------------------------------

create or replace function public.touch_map_locations_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists map_locations_updated_at on public.map_locations;
create trigger map_locations_updated_at
  before update on public.map_locations
  for each row
  execute function public.touch_map_locations_updated_at();

-- 4) Refresh PostgREST schema cache so new table/policies are visible -------

select pg_notify('pgrst', 'reload schema');
