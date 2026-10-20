# Tourist Location Tracking — "Track Your Location"

**Status of this document:** describes the implementation in this repository,
what is automated, and exactly which manual steps remain. Nothing below should
be assumed "working" before the smoke tests in §9 are executed against a
configured deployment.

---

## 1. What ships in the codebase

| Area | File(s) | Notes |
|---|---|---|
| Public page | `src/pages/TrackLocation.tsx` | Registration → consent → GPS → live tracking at **`/track-location`** |
| Tracking service | `src/services/trackingService.ts` | Session creation (secret token), point upload, stop; phone/name validation; 8-h constants |
| Offline queue | `src/services/trackOfflineQueue.ts` | IndexedDB queue + localStorage fallback, flush-on-online |
| Self map | `src/components/tracking/TrackSelfMap.tsx` | Leaflet/OSM map of the tourist's own position |
| Admin section | `src/components/admin/TouristTrackingAdmin.tsx` | **Tourist Locations** tab in `/admin`: map, filters, search, info panel, route history, 15-s polling |
| Route wiring | `src/App.tsx`, `src/data/navigation.ts`, `Navbar.tsx`, `MobileMenu.tsx`, `GaliyatAdvisoryAdmin.tsx` | All additive; no existing route or behaviour changed |
| Database | `supabase/updates-06-tourist-tracking.sql` | Tables, RLS, security-definer RPCs, indexes, retention |

**Map provider:** OpenStreetMap via Leaflet — the same free stack as the
existing `/tourism/abbottabad-map` page. No Google Maps key, no billing, no CSP
changes. If the department ever wants Google Maps tiles specifically, only the
two map components need swapping.

---

## 2. Supabase setup (run once)

In the Supabase dashboard **SQL Editor**, run in order (all idempotent):

1. `schema.sql` and `updates-01-staff-access.sql` — if not already applied to
   this project (they power the advisories AND the staff list used by tracking).
2. `updates-06-tourist-tracking.sql` — creates:
   (already-applied projects then run `updates-07-tourist-tracking-no-cap.sql`,
   which relaxes the session window — see below).

   - `tracking_sessions` — identity, group size, consent + timestamp,
     `started_at` / `expires_at` (server-set internal retention bound),
     `stopped_at`, `status` (`active|stopped|expired`) and
     `session_token_hash` (SHA-256 of the browser's secret token).
    - `location_history` — lat/lng range-checked, accuracy, `recorded_at`,
      FK→sessions **ON DELETE CASCADE**; indexes on (session, recorded_at),
      (recorded_at), (phone, created), (status, expires_at).
    - Security-definer RPCs used by the public page:
      - `create_tracking_session(full_name, phone, group_size, consent, token)`
        — validates everything server-side, normalises the phone to
        `+92 3XXXXXXXXX`, rate-limits (≤ 3 running sessions per phone), sets
        `expires_at` **on the server**.
      - `record_tracking_locations(session_id, token, points jsonb)` — the ONLY
        public write into history. Verifies the token hash, rejects
        expired/stopped sessions (auto-flips status server-side), enforces
        plausibility windows, dedupes (±4 s spacing + 20 m / 2-min movement
        rule), accepts batches of ≤ 200.
      - `stop_tracking_session(session_id, token)`.
    - Maintenance RPCs: `expire_stale_tracking_sessions()`,
      `cleanup_expired_tracking_data(interval)` (hard-capped at 3 days).
    - **RLS enabled on both tables with NO anon policy** — a visitor cannot
      read/write anyone's data via the normal REST API. Staff SELECT policies
      gate on the existing `is_advisory_staff()` function.

3. `updates-07-tourist-tracking-no-cap.sql` — **no tourist-facing duration
   limit**: tracking runs as long as the tourist keeps it on. Sessions are
   bounded internally by the 3-day retention window (aligned with automatic
   deletion), so an abandoned session can never outlive its data. Sessions
   created before update 07 keep their old window and simply expire sooner.

4. Enable **pg_cron** (Database → Extensions → pg_cron) — STEP 8 of the
   migration then auto-schedules:
   - `expire-tracking-sessions` — every 15 min;
   - `cleanup-tracking-data` — daily 03:23 UTC.

**If pg_cron is unavailable on a plan:** expiry/cleanup can be run manually
(`select public.expire_stale_tracking_sessions();` /
`select public.cleanup_expired_tracking_data();`). Display never depends on the
scheduler: the dashboard derives "expired" from `expires_at` at query time and
the RPCs reject late points server-side, so the session window and the 3-day
deletion only lag behind cron availability, not correctness.

---

## 3. Security & privacy model

- **Not "just a UUID":** the browser generates 32 random bytes
  (`crypto.getRandomValues()`); only their SHA-256 hash is stored. Every
  location write and every stop must present the raw token. A leaked session
  ID is useless alone; the token never leaves the tourist's browser except in
  HTTPS request bodies.
- **No public reads:** the public cannot SELECT any session or location row —
  not even their own — because no anon SELECT policy exists. The tourist's own
  page relies on data it already holds locally + RPC return values.
- **Admin access:** only accounts in `public.advisory_staff` (the same gate as
  the advisory console) can select the tables; the `/admin` UI additionally
  requires the Supabase Auth sign-in.
- **No service-role key** in frontend code — the public bundle uses only the
  publishable/anon key; the dangerous key is never referenced anywhere.
- **Rate limiting:** per-phone session caps, ≤ 200-point batches, ≥ 4 s
  spacing between accepted points, ≤ 3 days retention by construction.
- **Data minimisation:** name, phone, group size, consent timestamp, GPS only.
  Auto-deleted after 3 days (pg_cron); cascade guarantees GPS history dies with
  its session row.

---

## 4. How the public page behaves

- Registration validates name (2–80), Pakistani mobile
  (`0300…/0092…/+92…/92…/3…` → normalised to `+92 3XXXXXXXXX`), group size
  1–50, and **requires the consent checkbox** (location shared for as long as
  the tourist keeps tracking on, stoppable anytime, auto-deleted after 3 days).
- **No duration limit is shown or imposed from the tourist side**: tracking
  continues until the tourist presses Stop (the server-side 3-day retention
  bound exists only so an abandoned session cannot outlive its data).
- Clicking **Start Tracking** first asks the browser for a GPS fix
  (`getCurrentPosition`). **Only if the fix succeeds** does it call
  `create_tracking_session`. If GPS is denied/unavailable, no session exists,
  and the error explains what to do — tracking is never claimed to be running.
- Continuous updates use `watchPosition()` with: upload when moved ≥ 25 m
  (configurable via `localStorage['tpa_tracking_min_distance_m']`) or every ≥
  15 s (`tpa_tracking_min_interval_ms`); fixes with accuracy worse than 200 m
  are treated as "searching", never stored/shown as points.
- The tourist sees: session ID, start time, last update time, accuracy,
  stored/queued counts, their own Leaflet map (with a blue **travel line**
  of the path they walked — kept locally, tourists cannot read history
  server-side), and a visible **Stop Tracking** button (plus emergency call
  link 1915).
- Stopping when offline stops the watcher immediately, marks the session
  "stopped on this device" and retries the server stop when connectivity
  returns; the control room can never be shown a false "live" either way.
- Reload recovery: an active session is re-detected from local storage; GPS is
  only re-attached when the user taps **Resume live sharing**.
- Window end (rare): a 30-s timer ends the UI only after the server-set
  3-day retention window; the RPCs independently reject anything past it.

### Offline queueing

Readings that fail to upload (network down) go to IndexedDB
(`tpa_tracking_queue`), deduped, capped at ~5,000 points. Each queued point
carries its own session id + token; the flush replays them oldest-first in
batches of 200, **and the server revalidates every batch**, so a replay can
never fabricate a point or resurrect an expired session. Flushing happens on
the browser `online` event and every 60 s during a session. Points that can
never succeed (expired session) are dropped rather than retried forever.

### Honest limitations (shown on the page too)

Web browsers do not guarantee GPS execution on lock screens, in background
tabs, or under battery optimisation. If updates stop, the admin view shows
**Stale/Offline** after 10 minutes without a fix — never "live". This is a
feature of the web platform, not just this app; a native app would be needed
for guaranteed background tracking.

---

## 5. Admin dashboard

`/admin` → sign in → **Tourist Locations** tab:

- **Live map fills the full section width** with one coloured marker per
  tourist (status colour + name initials; popup on click); the search bar,
  session list and info panel sit below it.
- Session list with **filters (All / Live / Stale-Offline / Stopped /
  Expired), counts, and search** by name, phone or session ID.
- **Delete**: every list row and the info panel have a delete button (with a
  confirm dialog). Deleting a session permanently removes the tourist's GPS
  history with it (FK cascade). Gated by the staff-only DELETE policies in
  `updates-08-staff-delete-tracking.sql`; the public can never delete.
- Selecting a session opens the info panel: name, phone, group size, session
  ID, last coordinates + accuracy, last update time, start/expiry (or stop)
  times, status with an explicit stale note, and point count.
- **Route history** loads for the selected session and draws a polyline on the
  map — start → end always covered (fetched as oldest + newest halves so
  Supabase's row cap can never hide the endpoint), with a green **Start of
  route** marker at the line's first point.
- Polling every 15 s (suspended while the browser tab is hidden; instant
  catch-up on focus), manual **Refresh** button, always-visible **Last
  updated** clock.
- Loading, empty ("no sessions yet") and error states — including a specific
  hint when the signed-in account is not in `advisory_staff`.

---

## 6. Environment variables

No new variables are required. The feature reuses:

```
VITE_SUPABASE_URL          # existing
VITE_SUPABASE_ANON_KEY     # existing (publishable key — public by design)
```

⚠️ Your current `.env` contains `VITE_ADMIN_EMAIL` / `VITE_ADMIN_PASSWORD`,
which are dead legacy leftovers no longer read by any code. **Delete them from
`.env`** — any `VITE_` value is baked into the public JS bundle.

---

## 7. Commands

```bash
# local development
npm install
npm run dev            # http://localhost:5173 — /track-location, /admin

# quality gates
npm run lint           # oxlint
npm run build          # tsc -b && vite build (must pass before deploy)

# local production preview
npm run build && npm run preview
```

Deployment is the existing Vercel pipeline (SPA rewrites and headers already
configured in `vercel.json`; the existing CSP is Report-Only and already
allows `tile.openstreetmap.org` and the Supabase domain, so no change needed):

```bash
# deploy exactly as the existing website is deployed
git add -A && git commit -m "Add Tourist Location Tracking feature" && git push
# Vercel builds automatically; verify env vars are set in the project settings
```

---

## 8. Google Maps API (only if you switch providers)

Not required for this feature (chosen deliberately since no Maps key or billing
exists in the project). If the department later requires Google Maps tiles:

1. Create/select a project at <https://console.cloud.google.com> → enable
   **Maps JavaScript API** (billing required — per-map-load pricing; Display
   Map loads are designed to be free for public maps but confirm current
   pricing).
2. Create a **browser API key**, referrer-restricted to the production domain
   (`https://<domain>/*`) and API-restricted to *Maps JavaScript API*.
3. Store it as `VITE_GOOGLE_MAPS_API_KEY`, load it in the two map components
   only, and have Vercel's CSP extended (`script-src`, `connect-src
   https://maps.googleapis.com`, `img-src` for map tiles).

---

## 9. Testing checklist

Run through after applying §2 against a **test** project key.

**Registration & consent**
- [ ] `/track-location` appears in the Tourism menu; page renders on mobile width.
- [ ] Submit blocked with invalid phone (`12345`, `0300` etc.); accepted for
      `0300 1234567` and `+923001234567`.
- [ ] Group size rejects `0`, `50+`, decimals.
- [ ] Without the consent checkbox the Start button shows the consent error.

**GPS permission flow**
- [ ] Browser permission prompt appears only after a valid Start.
- [ ] Deny permission → **no session row is created** (check Table Editor) and
      an explicit error is shown.
- [ ] Allow permission → session row appears with a server-set `expires_at`
      (start + 3 days after update 07) and first point in `location_history`.
      first point in `location_history`.

**Live updates**
- [ ] While walking/with GPS motion, points appear every ≥ s/threshold and the
      server stores deduplicated points (see `pointCount`).
- [ ] Tourist map marker follows; accuracy circle changes size.

**Admin**
- [ ] `/admin` requires sign-in; account NOT in `advisory_staff` gets the
      "Access denied" hint; staff account sees the tab with data.
- [ ] Non-staff anon user typing `/admin` gets the sign-in screen only.
- [ ] Filters, search, info panel and route polyline all work; "Last updated"
      ticks; polling stops when the tab is hidden (DevTools → Network while
      switching tabs).
- [ ] **Stale rule:** kill the tourist tab → after 10 min the session flips to
      "Stale / Offline", never "Live".

**Offline & expiry**
- [ ] Stop the tourist's network → queued badge on the public page; restore
      network → queue drains and admin sees the points.
- [ ] "Stop Tracking" while offline stops GPS immediately and completes the
      server stop when back online.
- [ ] Manually set `expires_at` in the past → dashboard shows "Expired"; any
      further upload attempt is rejected by the server (`SESSION_EXPIRED`),
      even if the tourist page is somehow still alive.
- [ ] (pg_cron) after 15 min an expired session's status flips to `expired`;
      `cron.job_run_details` shows both jobs running.
- [ ] Insert a session with `created_at` > 3 days old → after the daily cleanup
      job its row and GPS history are gone.

---

## 10. Remaining manual steps / known limits

1. **Run the SQL migration** (`updates-06-tourist-tracking.sql`) — code is
   written to handle a mis-configured backend with errors, but the feature is
   inert until the migration is applied.
2. **Enable pg_cron** (or schedule the two step-6 functions externally).
3. **Delete legacy `VITE_ADMIN_EMAIL`/`VITE_ADMIN_PASSWORD`** from `.env`.
4. Confirm staff emails are in `advisory_staff` — officers with unlisted
   accounts will see the tracking tab empty/denied, by design.
5. Web-platform limits on background/lock-screen GPS apply (document above);
   for guaranteed always-on tracking a native app would be required.
6. Supabase Realtime is not used (polling chosen); switching is an
   optimization, not a requirement.
