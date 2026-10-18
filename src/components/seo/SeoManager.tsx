/**
 * Keeps <head> in sync with the active route: meta description, canonical,
 * robots, Open Graph/Twitter mirrors and per-route BreadcrumbList JSON-LD.
 * Site-wide Organization + WebSite JSON-LD are injected once.
 *
 * `document.title` remains owned by each page (bilingual) — this component
 * never touches it.
 */
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  SITE_URL,
  resolveRouteMeta,
  buildBreadcrumbs,
  ORG_JSONLD,
  WEBSITE_JSONLD,
} from '../../lib/seo';

function ensureMeta(
  selector: string,
  attrs: Record<string, string>
): HTMLMetaElement {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
    document.head.appendChild(el);
  }
  return el;
}

function ensureLink(selector: string, rel: string): HTMLLinkElement {
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  return el;
}

const JSONLD_SELECTOR = (key: string) =>
  `script[type="application/ld+json"][data-seo="${key}"]`;

function setJsonLd(key: string, data: unknown) {
  let el = document.head.querySelector<HTMLScriptElement>(JSONLD_SELECTOR(key));
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.setAttribute('data-seo', key);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function removeJsonLd(key: string) {
  const el = document.head.querySelector<HTMLScriptElement>(JSONLD_SELECTOR(key));
  if (el) el.remove();
}

function breadcrumbJsonLd(
  crumbs: Array<{ name: string; path: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: SITE_URL + (crumb.path === '/' ? '/' : crumb.path),
    })),
  };
}

export const SeoManager: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const isAdmin = pathname.startsWith('/admin');
    const { meta, canonicalPath } = resolveRouteMeta(isAdmin ? '/__admin__' : pathname);
    const isKnown = !isAdmin && canonicalPath !== null && meta !== null;
    const cleanPath = canonicalPath ?? (pathname.replace(/\/+$/, '') || '/');
    const pageUrl = SITE_URL + (cleanPath === '/' ? '/' : cleanPath);

    // robots — admin dashboards and unknown routes are kept out of the index
    ensureMeta('meta[name="robots"]', { name: 'robots' }).content = isKnown
      ? 'index, follow'
      : 'noindex, nofollow';

    if (meta) {
      ensureMeta('meta[name="description"]', { name: 'description' }).content =
        meta.description;
      ensureLink('link[rel="canonical"]', 'canonical').href = pageUrl;

      ensureMeta('meta[property="og:title"]', { property: 'og:title' }).content =
        meta.title;
      ensureMeta('meta[property="og:description"]', {
        property: 'og:description',
      }).content = meta.description;
      ensureMeta('meta[property="og:url"]', { property: 'og:url' }).content =
        pageUrl;
      ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title' }).content =
        meta.title;
      ensureMeta('meta[name="twitter:description"]', {
        name: 'twitter:description',
      }).content = meta.description;
    }

    // Site-wide JSON-LD (shared across the portal)
    setJsonLd('org', ORG_JSONLD);
    setJsonLd('website', WEBSITE_JSONLD);

    // Per-route BreadcrumbList only when the page actually sits at depth > 1
    const crumbs = buildBreadcrumbs(canonicalPath ?? '');
    if (isKnown && crumbs.length > 1) {
      setJsonLd('breadcrumbs', breadcrumbJsonLd(crumbs));
    } else {
      removeJsonLd('breadcrumbs');
    }
  }, [pathname]);

  return null;
};
