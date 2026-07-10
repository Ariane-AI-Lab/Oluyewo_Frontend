import { useEffect, useState } from "react";

const KEY = "oluyewo_auth";
const TOKEN_KEY = "oluyewo_token";
const listeners = new Set<() => void>();

function hasStoredSession() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(KEY) === "1" || Boolean(window.localStorage.getItem(TOKEN_KEY));
}

export function getAuth(): boolean {
  if (typeof window === "undefined") return false;
  return hasStoredSession();
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setAuth(v: boolean, token?: string | null) {
  if (typeof window === "undefined") return;

  if (v) {
    window.localStorage.setItem(KEY, "1");
    if (token) {
      window.localStorage.setItem(TOKEN_KEY, token);
    }
  } else {
    window.localStorage.removeItem(KEY);
    window.localStorage.removeItem(TOKEN_KEY);
  }

  listeners.forEach((l) => l());
}

export function useAuth() {
  const [v, setV] = useState(false);
  useEffect(() => {
    setV(getAuth());
    const cb = () => setV(getAuth());
    listeners.add(cb);
    return () => {
      listeners.delete(cb);
    };
  }, []);
  return v;
}
