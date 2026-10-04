import { useEffect, useState } from "react";

/**
 * True only after the component has mounted in the browser.
 *
 * Anything derived from a wall clock — `new Date()` at module or state-init
 * time — differs between the server render and the client render. Printing it
 * during hydration always throws a mismatch, so gate it behind this hook.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
