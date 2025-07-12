import React, { createContext, useContext, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';

const AuthContext = createContext<ReturnType<typeof useAuth> | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();
  const value = useMemo(() => auth, [auth.user, auth.loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}
