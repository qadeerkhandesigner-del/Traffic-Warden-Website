# Supabase setup — Galiyat advisories

Two SQL files live in this folder. **Only the first one is required.**

| # | File | Required? | What it does |
|---|---|---|---|
| 1 | `schema.sql` | Yes | Creates the `galiyat_advisories` table + basic access rules |
| 2 | `updates-01-staff-access.sql` | Optional | Adds the audit + scheduling columns, and restricts writing to a list of staff emails |

Run them in the Supabase SQL editor: project → **SQL Editor** → *New query* → paste → **Run**.
Both files are safe to run more than once.

## Everyday setup (do this once)

1. **Create the staff account**
   Authentication → **Users** → *Add user* → *Create new user*
   → tick **Auto Confirm User** (otherwise sign-in fails with "Email not confirmed").

2. **Close public sign-ups** (recommended)
   Authentication → **Sign In / Providers** → *Email*
   → turn **"Allow new users to sign up" OFF**.
   The publishable key is public (it ships inside the website bundle), so while
   sign-ups are open anyone could create an account for themselves.

3. **Copy the keys into the website's `.env`**
   Project Settings → **API Keys** → *Project URL* and *Publishable key*
   (see `.env.example` in the project root). Restart `npm run dev` afterwards —
   Vite only reads `.env` at start-up.

## Access model

**Without `updates-01` (default):**

| Who | Can do |
|---|---|
| Visitor (no sign-in) | Read published advisories |
| Any signed-in account | Read everything, create, update, delete |

**With `updates-01` (staff-only):**

| Who | Can do |
|---|---|
| Visitor (no sign-in) | Read published advisories whose publication time has arrived |
| Staff (signed in, email in `advisory_staff`) | Read everything, create, update, delete |
| Anyone else (signed in, not in the list) | Nothing — add their email to `advisory_staff` to grant access |

The audit + scheduling columns (`created_by`, `updated_by`, `publish_at`) work in
both modes; they are simply unused by the dashboard if the columns are absent.

### Adding a staff member (staff-only mode)

```sql
insert into public.advisory_staff (email, full_name)
values ('colleague@twabbottabad.gov.pk', 'Advisory Board')
on conflict (email) do nothing;
```

### Going back to the simple mode

If staff-only access ever locks the dashboard out (for example the staff email
was never added), run this to return to "any signed-in account" — the columns and
the data are left untouched:

```sql
drop policy if exists "Advisory staff can read all advisories" on public.galiyat_advisories;
drop policy if exists "Advisory staff can insert advisories" on public.galiyat_advisories;
drop policy if exists "Advisory staff can update advisories" on public.galiyat_advisories;
drop policy if exists "Advisory staff can delete advisories" on public.galiyat_advisories;
drop policy if exists "Public can read published advisories" on public.galiyat_advisories;

create policy "Public can read published advisories" on public.galiyat_advisories for select using (is_published = true);

create policy "Staff can read all advisories" on public.galiyat_advisories for select to authenticated using (true);
create policy "Staff can insert advisories" on public.galiyat_advisories for insert to authenticated with check (true);
create policy "Staff can update advisories" on public.galiyat_advisories for update to authenticated using (true) with check (true);
create policy "Staff can delete advisories" on public.galiyat_advisories for delete to authenticated using (true);

drop function if exists public.is_advisory_staff();
```

## Backups

The free plan has no point-in-time recovery. Once a week, open the dashboard and
use **Export backup** in the advisory console, or Supabase →
Table Editor → `galiyat_advisories` → *Export as CSV*.
