import { useHydrated } from "@/hooks/use-hydrated";
import { formatStamp, type StampFormat } from "@/lib/time";

/**
 * Renders a timestamp only once the component has mounted in the browser.
 *
 * A value produced by `new Date()` when the component initialises differs
 * between the server and the browser, so printing it during hydration always
 * throws a mismatch and React throws the tree away. Deferring the text to the
 * first client render keeps the two sides byte-identical.
 */
export function Timestamp({
  iso,
  format = "datetime",
  className,
}: {
  iso: string;
  format?: StampFormat;
  className?: string;
}) {
  const hydrated = useHydrated();
  return <span className={className}>{hydrated ? formatStamp(iso, format) : ""}</span>;
}
