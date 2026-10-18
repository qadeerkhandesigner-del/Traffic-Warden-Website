import React, { useEffect, useState } from 'react';
import { getAdminSession, subscribeToAdminSession, type AdminSession } from '../../services/adminAuth';
import { AdminSignIn } from './AdminSignIn';

export interface RequireAdminSessionProps {
  /** Receives the signed-in session so the dashboard can show the user's email. */
  children: (session: AdminSession) => React.ReactNode;
}

/**
 * Renders the sign-in screen until an admin session exists, then renders the
 * dashboard. When Supabase Auth replaces `services/adminAuth.ts`, only that file
 * changes — the gate keeps working through the same subscribe/getSession pair.
 */
export const RequireAdminSession: React.FC<RequireAdminSessionProps> = ({ children }) => {
  const [session, setSession] = useState<AdminSession | null>(() => getAdminSession());

  useEffect(() => {
    const unsubscribe = subscribeToAdminSession(() => setSession(getAdminSession()));
    return unsubscribe;
  }, []);

  if (!session) {
    return <AdminSignIn />;
  }

  return <>{children(session)}</>;
};

export default RequireAdminSession;
