import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";

const PREFIX = "greylock:v1:";

/** Fired when a save can't be written; AppLayout surfaces it as a toast. */
export const STORAGE_ERROR_EVENT = "greylock:storage-error";

export interface PersistOptions {
  /**
   * Hard ceiling for array state. Browser storage holds only a few megabytes, so
   * an unbounded history eventually makes every write fail — the oldest entries
   * are dropped so the newest work stays saveable.
   */
  maxItems?: number;
}

/** Drop the oldest entries once an array grows past its ceiling. */
function trim(value: unknown, maxItems?: number): unknown {
  if (maxItems === undefined || !Array.isArray(value) || value.length <= maxItems) return value;
  return value.slice(-maxItems);
}

/**
 * useState that survives refreshes via localStorage.
 * Loads after mount (SSR-safe, no hydration mismatch) and writes on every change.
 */
export function usePersistedState<T>(
  key: string,
  initial: T | (() => T),
  options: PersistOptions = {},
): [T, Dispatch<SetStateAction<T>>, boolean] {
  const { maxItems } = options;
  const [value, setValue] = useState<T>(initial);
  const [loaded, setLoaded] = useState(false);
  const fullKey = PREFIX + key;
  const skipWrite = useRef(true);
  const warned = useRef(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(fullKey);
      if (raw) setValue(trim(JSON.parse(raw) as T, maxItems) as T);
    } catch {
      /* corrupt entry — fall back to defaults */
    }
    setLoaded(true);
  }, [fullKey, maxItems]);

  useEffect(() => {
    if (!loaded) return;
    if (skipWrite.current) {
      skipWrite.current = false;
      return;
    }
    try {
      window.localStorage.setItem(fullKey, JSON.stringify(trim(value, maxItems)));
    } catch {
      // A silent failure here means the operator believes their work is saved
      // when it isn't — say so once, loudly.
      if (warned.current) return;
      warned.current = true;
      window.dispatchEvent(new CustomEvent(STORAGE_ERROR_EVENT, { detail: { key } }));
    }
  }, [fullKey, value, loaded, maxItems, key]);

  return [value, setValue, loaded];
}

export function clearPersistedState() {
  try {
    Object.keys(window.localStorage)
      .filter((k) => k.startsWith(PREFIX))
      .forEach((k) => window.localStorage.removeItem(k));
  } catch {
    /* noop */
  }
}
