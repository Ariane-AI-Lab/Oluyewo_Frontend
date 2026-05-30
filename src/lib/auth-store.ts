import { useEffect, useState } from "react";

const KEY = "oluyewo_auth";
const listeners = new Set<() => void>();

export function getAuth(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(KEY) === "1";
}

export function setAuth(v: boolean) {
  if (typeof window === "undefined") return;
  if (v) window.localStorage.setItem(KEY, "1");
  else window.localStorage.removeItem(KEY);
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
