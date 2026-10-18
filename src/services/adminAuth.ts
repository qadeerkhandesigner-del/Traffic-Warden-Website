import { isSupabaseConfigured, supabase } from './supabaseClient';

/**
 * Admin sign-in
 * =============
 *
 * Used by the hidden admin area (`/admin/galiyat-advisory`).
 *
 * WITH SUPABASE (VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY set) this uses
 * Supabase Auth: only real staff accounts can open the dashboard, and the
 * policies in `supabase/schema.sql` allow writes only for signed-in users.
 *
 * WITHOUT those values it falls back to a local, front-end-only sign-in so the
 * dashboard still works during development. That fallback is NOT real security —
 * anyone can read the bundled credentials.
 *
 * The rest of the app only calls the functions exported here, so switching
 * between the two modes is invisible to the UI.
 */
export interface AdminSession {
  email: string;
  signedInAt: string;
}

const SESSION_KEY = 'tpa_admin_session_v1';

/** Only used in the local fallback (when Supabase is not configured). */
const FALLBACK_EMAIL = import.meta.env.VITE_ADMIN_EMAIL ?? 'admin@twabbottabad.gov.pk';
const FALLBACK_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? 'admin123';

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

  // Local fallback — mirrors the latency of a network sign-in.
  await new Promise((resolve) => setTimeout(resolve, 320));

  const normalizedEmail = email.trim().toLowerCase();
  const matches =
    normalizedEmail === FALLBACK_EMAIL.toLowerCase() && password === FALLBACK_PASSWORD;

  if (!matches) {
    throw new Error('Email or password is not correct.');
  }

  const session: AdminSession = {
    email: normalizedEmail,
    signedInAt: new Date().toISOString(),
  };

  writeMirror(session);
  emit();
  return session;
}

export function signOutAdmin(): void {
  writeMirror(null);
  emit();

  if (isSupabaseConfigured && supabase) {
    void supabase.auth.signOut();
  }
}
