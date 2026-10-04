import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";

const PREFIX = "greylock:v1:";

/**
 * useState that survives refreshes via localStorage.
 * Loads after mount (SSR-safe, no hydration mismatch) and writes on every change.
 */
export function usePersistedState<T>(
  key: string,
  initial: T | (() => T),
): [T, Dispatch<SetStateAction<T>>, boolean] {
  const [value, setValue] = useState<T>(initial);
  const [loaded, setLoaded] = useState(false);
  const fullKey = PREFIX + key;
  const skipWrite = useRef(true);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(fullKey);
      if (raw) setValue(JSON.parse(raw) as T);
    } catch {
      /* corrupt entry — fall back to defaults */
    }
    setLoaded(true);
  }, [fullKey]);

  useEffect(() => {
    if (!loaded) return;
    if (skipWrite.current) {
      skipWrite.current = false;
      return;
    }
    try {
      window.localStorage.setItem(fullKey, JSON.stringify(value));
    } catch {
      /* quota exceeded — ignore */
    }
  }, [fullKey, value, loaded]);

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
