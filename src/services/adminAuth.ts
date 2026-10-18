import { isSupabaseConfigured, supabase } from './supabaseClient';

/**
 * Admin sign-in
 * =============
 *
 * Used by the hidden admin area (`/admin/galiyat-advisory`).
 *
 * Sign-in always goes through Supabase Auth (VITE_SUPABASE_URL +
 * VITE_SUPABASE_ANON_KEY): only staff accounts created in the Supabase
 * dashboard and listed in `public.advisory_staff` (see
 * `supabase/updates-01-staff-access.sql`) can manage advisories, and the
 * database policies — not this code — are the actual access boundary.
 *
 * There is deliberately NO bundled fallback account: a compiled-in
 * email/password pair used to end up readable in the production JavaScript
 * (Vite inlines VITE_ variables at build time). If the backend is not
 * configured, admin sign-in reports an error instead of "working" behind a
 * front-end-only password.
 */

export interface AdminSession {
  email: string;
  signedInAt: string;
}

const SESSION_KEY = 'tpa_admin_session_v1';

const listeners = new Set<() => void>();

function emit(): void {
  listeners.forEach((listener) => listener());
}

/**
 * The session shown to the UI is mirrored in localStorage so the session gate
 * can read it synchronously. With Supabase the source of truth stays the
 * Supabase Auth session; this is only a mirror of it.
 */
function writeMirror(session: AdminSession | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (session) {
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } else {
      window.localStorage.removeItem(SESSION_KEY);
    }
  } catch {
    // Storage can be unavailable (private mode). The session still works in memory.
  }
}

function sessionFromEmail(email?: string | null): AdminSession | null {
  if (!email) return null;
  return { email, signedInAt: new Date().toISOString() };
}

/** Subscribe to sign-in / sign-out events. Returns an unsubscribe function. */
export function subscribeToAdminSession(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getAdminSession(): AdminSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AdminSession) : null;
  } catch {
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/*                              SUPABASE AUTH MODE                            */
/* -------------------------------------------------------------------------- */

if (isSupabaseConfigured && supabase) {
  // Keep the mirror in step with Supabase (sign-in, sign-out, token refresh).
  supabase.auth.onAuthStateChange((_event, session) => {
    writeMirror(sessionFromEmail(session?.user.email));
    emit();
  });

  // Restore a session that survived a page reload, and clear a stale mirror.
  void supabase.auth.getSession().then(({ data }) => {
    writeMirror(sessionFromEmail(data.session?.user.email));
    emit();
  });
}

/* -------------------------------------------------------------------------- */
/*                                 ACTIONS                                    */
/* -------------------------------------------------------------------------- */

export async function signInAdmin(email: string, password: string): Promise<AdminSession> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      throw new Error(
        error.message === 'Invalid login credentials'
          ? 'Email or password is not correct.'
          : error.message
      );
    }

    const session =
      sessionFromEmail(data.user?.email) ?? sessionFromEmail(email.trim()) ?? null;

    if (!session) {
      throw new Error('Sign in failed. Please try again.');
    }

    writeMirror(session);
    emit();
    return session;
  }

  // Backend not configured — fail loudly instead of "authenticating" with
  // credentials that could be read from the JavaScript bundle.
  throw new Error(
    'Admin sign-in is unavailable: the website backend (Supabase) is not configured. ' +
      'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY and rebuild.'
  );
}

export function signOutAdmin(): void {
  writeMirror(null);
  emit();

  if (isSupabaseConfigured && supabase) {
    void supabase.auth.signOut();
  }
}
