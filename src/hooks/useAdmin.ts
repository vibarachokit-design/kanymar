import { useCallback, useEffect, useState } from 'react';

const ADMIN_STORAGE_KEY = 'kanymar_admin';
const ADMIN_EVENT = 'kanymar-admin-change';
const DEFAULT_PASSWORD_HASH = 'a2FueW1hcjIwMjY=';

function readAdminSession() {
  return localStorage.getItem(ADMIN_STORAGE_KEY) === 'true';
}

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(readAdminSession);

  useEffect(() => {
    const syncSession = () => setIsAdmin(readAdminSession());

    window.addEventListener('storage', syncSession);
    window.addEventListener(ADMIN_EVENT, syncSession);

    return () => {
      window.removeEventListener('storage', syncSession);
      window.removeEventListener(ADMIN_EVENT, syncSession);
    };
  }, []);

  const login = useCallback((password: string) => {
    const hash = btoa(password);
    if (hash === DEFAULT_PASSWORD_HASH) {
      localStorage.setItem(ADMIN_STORAGE_KEY, 'true');
      setIsAdmin(true);
      window.dispatchEvent(new Event(ADMIN_EVENT));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    setIsAdmin(false);
    window.dispatchEvent(new Event(ADMIN_EVENT));
  }, []);

  return { isAdmin, isLoading: false, login, logout };
}
