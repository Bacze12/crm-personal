import { useState, useEffect, useCallback } from 'react';
import type { User } from '../../../shared/types/user';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Verifica si hay sesión activa
  const checkSession = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users/me', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Login
  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        await checkSession();
        return { success: true };
      } else {
        const data = await res.json().catch(() => ({}));
        return { success: false, error: data.error || 'Credenciales inválidas' };
      }
    } catch {
      return { success: false, error: 'Error de red o servidor' };
    }
  };

  // Logout
  const logout = async () => {
    await fetch('/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });
    await checkSession();
  };

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return { user, loading, login, logout, isAuthenticated: !!user };
}