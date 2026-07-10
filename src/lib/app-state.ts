import { useEffect, useState } from "react";

const STATUS_KEY = "oluyewo_app_status";
const listeners = new Set<() => void>();

export type AppStatus = {
  loading: boolean;
  error: string | null;
  message: string | null;
};

function readStatus(): AppStatus {
  if (typeof window === "undefined") {
    return { loading: false, error: null, message: null };
  }

  try {
    const raw = window.localStorage.getItem(STATUS_KEY);
    if (!raw) return { loading: false, error: null, message: null };
    return JSON.parse(raw) as AppStatus;
  } catch {
    return { loading: false, error: null, message: null };
  }
}

function writeStatus(next: AppStatus) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STATUS_KEY, JSON.stringify(next));
  listeners.forEach((listener) => listener());
}

export function setAppStatus(partial: Partial<AppStatus>) {
  writeStatus({ ...readStatus(), ...partial });
}

export function clearAppStatus() {
  writeStatus({ loading: false, error: null, message: null });
}

export function getAppStatus() {
  return readStatus();
}

export function useAppStatus() {
  const [status, setStatus] = useState<AppStatus>(readStatus);

  useEffect(() => {
    const listener = () => setStatus(readStatus());
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, []);

  return status;
}
