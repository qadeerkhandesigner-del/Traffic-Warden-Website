import React, { useState } from 'react';
import { Eye, EyeOff, LoaderCircle, Lock, Mail, TriangleAlert } from 'lucide-react';
import logoImg from '/Traffic-Logo-Updated.png';
import { Button } from '../ui/Button';
import { signInAdmin } from '../../services/adminAuth';

const inputClassName =
  'w-full rounded-lg border border-brand-light-border bg-white px-3.5 py-2.5 text-sm text-brand-dark placeholder:text-brand-light-muted focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue-200';

/**
 * Sign-in screen for the hidden admin area.
 * The session gate swaps this out automatically once a session exists.
 */
export const AdminSignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await signInAdmin(email, password);
      // A successful sign-in notifies the session gate, which renders the dashboard.
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-brand-light-bg px-4 py-10 sm:py-16">
      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-xl border border-brand-light-border bg-white shadow-gov-md">
          <div className="flex items-center gap-3 border-b border-[#0000aa] bg-[#000080] px-5 py-5 sm:px-6">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-white/40">
              <img
                src={logoImg}
                alt="Traffic Warden Abbottabad crest"
                className="h-full w-full object-contain"
              />
            </span>
            <div className="min-w-0">
              <h1 className="text-base font-extrabold uppercase leading-tight tracking-tight text-white sm:text-lg">
                Galiyat Travel Advisory
              </h1>
              <p className="text-xs text-brand-lime sm:text-sm">
                Traffic Warden Abbottabad · authorised staff only
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 p-5 sm:p-6">
            {error && (
              <div
                className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5"
                role="alert"
              >
                <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-red-600" aria-hidden="true" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="admin-email" className="block text-sm font-semibold text-brand-dark">
                Email
              </label>
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-light-muted"
                  aria-hidden="true"
                />
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={`${inputClassName} ps-10`}
                  placeholder="name@department.gov.pk"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="admin-password" className="block text-sm font-semibold text-brand-dark">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-light-muted"
                  aria-hidden="true"
                />
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className={`${inputClassName} ps-10 pe-11`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute end-2.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-brand-light-muted transition-colors hover:bg-brand-light-subtle hover:text-brand-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-300"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={submitting}
              leftIcon={
                submitting ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Lock className="h-4 w-4" aria-hidden="true" />
                )
              }
            >
              {submitting ? 'Signing in…' : 'Sign in'}
            </Button>

            <p className="text-center text-xs leading-relaxed text-brand-light-muted">
              This area is for the advisory board only. Advisories published here appear on the
              public Galiyat Travel Advisory page.
            </p>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-brand-light-muted">
          Traffic Warden Abbottabad — internal portal
        </p>
      </div>
    </div>
  );
};

export default AdminSignIn;
