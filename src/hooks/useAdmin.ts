import { useState, useCallback, useEffect } from 'react';

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const check = localStorage.getItem('kanymar_admin') === 'true';
    setIsAdmin(check);
    setIsLoading(false);
  }, []);

  const login = useCallback((password: string) => {
    // Default password: kanymar2026
    const hash = btoa(password);
    if (hash === 'a2FueW1hcjIwMjY=') {
      localStorage.setItem('kanymar_admin', 'true');
      setIsAdmin(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('kanymar_admin');
    setIsAdmin(false);
  }, []);

  return { isAdmin, isLoading, login, logout };
}
