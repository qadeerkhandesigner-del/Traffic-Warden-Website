-- ============================================================================
-- updates-05-complaints.sql — PREPARED, NOT EXECUTED
-- Real storage for the public "Online Complaint" form (currently the form is
-- a front-end-only mock: nothing is persisted or transmitted).
--
-- Run ONCE in the Supabase SQL editor AFTER updates-01 (staff access) so the
-- staff allowlist function exists. Safe to run more than once.
--
-- IMPORTANT companion step (Supabase dashboard, not SQL):
--   The form should then be wired in code to insert into this table with the
--   anon (publishable) key. Until that wiring exists, do NOT run this migration.
--   Rate limiting is not enforced in the database: enable it at the hosting
--   edge or via a Supabase Edge Function before exposing inserts publicly.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1) Table
-- ---------------------------------------------------------------------------

create table if not exists public.online_complaints (
  id uuid primary key default gen_random_uuid(),
  ticket_no     text not null unique,
  category      text not null,
  sub_category  text,
  complainant_name text not null,
  phone         text not null,
  cnic          text,
  email         text,
  incident_date date not null default current_date,
  incident_time time,
  location      text not null,
  vehicle_number text,
  description   text not null,
  status        text not null default 'submitted'
                check (status in ('submitted', 'in_review', 'actioned', 'closed')),
  staff_note    text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on table public.online_complaints is
  'Citizen complaints submitted from /online-complaint. Citizens can create but can never read back other complaints.';

create index if not exists online_complaints_created_at_idx
  on public.online_complaints (created_at desc);
create index if not exists online_complaints_status_idx
  on public.online_complaints (status);

-- ---------------------------------------------------------------------------
-- 2) Row level security — insert-only for the public, staff-only for reads
-- ---------------------------------------------------------------------------

alter table public.online_complaints enable row level security;

drop policy if exists "Citizens can submit complaints" on public.online_complaints;
create policy "Citizens can submit complaints"
  on public.online_complaints for insert
  to anon, authenticated
  with check (
    char_length(complainant_name) between 3 and 80
    and char_length(phone) between 7 and 20
    and phone ~ '^[+0-9()\- ]+$'
    and char_length(location) between 3 and 300
    and char_length(description) between 30 and 5000
    and (cnic is null or cnic ~ '^[0-9]{5}-[0-9]{7}-[0-9]$')
  );

-- No public SELECT policy exists on purpose: citizens cannot read their own or
-- anyone else's complaints back through the Data API.

-- Complaint reviewers reuse the advisory staff allowlist from update 01.
create policy "Advisory staff can read complaints"
  on public.online_complaints for select
  to authenticated
  using (public.is_advisory_staff());

create policy "Advisory staff can update complaint status"
  on public.online_complaints for update
  to authenticated
  using (public.is_advisory_staff())
  with check (public.is_advisory_staff());

-- ---------------------------------------------------------------------------
-- 3) Attachments
-- ---------------------------------------------------------------------------
-- The form currently keeps attachments in memory only. Storage bucket notes:
--   - create a PRIVATE bucket (e.g. complaint-attachments)
--   - deny all anon policies; uploads should go through a signed-upload flow,
--     not a public bucket
--   - before accepting an upload, validate the file type (images only) and
--     size (e.g. <= 5 MB) server-side (Edge Function) — client checks alone
--     are not a security boundary.

-- ---------------------------------------------------------------------------
-- Verify (optional)
-- ---------------------------------------------------------------------------
-- select * from public.online_complaints;          -- staff only
-- select policyname, cmd, roles from pg_policies where tablename = 'online_complaints';
