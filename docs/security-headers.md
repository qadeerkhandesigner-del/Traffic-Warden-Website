# Security headers — deployment checklist

The repository ships no hosting configuration, so these headers must be added
at the actual hosting platform. Verify on the live domain after deploying.

Domains/services referenced by the site (audited from source):

- Site: `https://trafficpoliceabbottabad.gov.pk`
- Google Fonts: `fonts.googleapis.com` (CSS), `fonts.gstatic.com` (WOFF2)
- Supabase: `<project-ref>.supabase.co` (REST + Auth + Realtime; use the value from `.env` → `VITE_SUPABASE_URL`)
- Weather: `api.open-meteo.com` (keyless public API)
- Maps (client-side tiles): `*.tile.openstreetmap.org` via Leaflet
- External links only (do not need frame/img/CSP src slots): facebook.com, abbottabadpolice.kp.gov.pk, google maps links

## Recommended headers

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: blob: https://*.tile.openstreetmap.org;
  connect-src 'self' https://<project-ref>.supabase.co wss://<project-ref>.supabase.co https://api.open-meteo.com https://nominatim.openstreetmap.org;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
  object-src 'none'
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
   (only after HTTPS is confirmed stable on the domain AND all subdomains)
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(self), camera=(), microphone=(), payment=(), usb=()
```

Notes:
- `'self'` covers all bundled JS/CSS because the build emits hashed static assets.
- `connect-src` includes nominatim/OSM geocoding only if the map page uses it
  (verify `src/pages/AbbottabadMap.tsx` geocoder before enabling); otherwise drop it.
- Start with **CSP-Report-Only** (same policy, delivered with the header name
  `Content-Security-Policy-Report-Only`) for at least two weeks, monitor
  violations, then switch to enforcing.
- CSP cannot be delivered via `<meta>` for report-only mode — it must be an
  HTTP header.

## Platform snippets

### Vercel (`vercel.json` in project root)

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "geolocation=(self), camera=(), microphone=(), payment=(), usb=()" },
        { "key": "Content-Security-Policy-Report-Only", "value": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https://*.tile.openstreetmap.org; connect-src 'self' https://<project-ref>.supabase.co wss://<project-ref>.supabase.co https://api.open-meteo.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'" }
      ]
    }
  ]
}
```

### Netlify (`netlify.toml`)

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(self), camera=(), microphone=(), payment=(), usb=()"
    Content-Security-Policy-Report-Only = "default-src 'self'; ..."
```

### Nginx (reverse proxy)

```nginx
add_header Content-Security-Policy-Report-Only "default-src 'self'; ..." always;
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(self), camera=(), microphone=(), payment=()" always;
```

## Needed anyway at the host (nowhere in this repo)

- HTTP → HTTPS + `www` → apex redirects (single hop)
- Return **HTTP 404** for unknown paths (the SPA currently soft-404s in the client)
- Sensible cache TTL for hashed `/assets/*`, `no-cache` for `index.html`, `robots.txt`, `sitemap.xml`
