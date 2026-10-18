-- Update 02 — allow the 'snowfall' advisory category
-- ==================================================
-- The galiyat_advisories table was created with a check constraint that only
-- accepted ('weather', 'road-closure', 'diversion', 'fog', 'safety'). The
-- "Snowfall Alert" category was added later, so publishing an advisory with
-- category_id = 'snowfall' fails until this update runs.
--
-- Run this ONCE in the Supabase SQL editor:
--   Project dashboard → SQL Editor → New query → paste → Run

alter table public.galiyat_advisories
  drop constraint if exists galiyat_advisories_category_id_check;

alter table public.galiyat_advisories
  add constraint galiyat_advisories_category_id_check
  check (category_id in ('weather', 'snowfall', 'road-closure', 'diversion', 'fog', 'safety'));
