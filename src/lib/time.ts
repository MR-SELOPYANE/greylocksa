/**
 * Deterministic timestamp formatting.
 *
 * Every rendered timestamp must be byte-identical on the server and in the
 * browser, or React throws a hydration mismatch and rebuilds the tree. That
 * means pinning BOTH the locale and the time zone: a bare `toLocaleString()`
 * resolves to the host's own settings, which differ between a UTC render host
 * and a visitor's machine.
 */

const LOCALE = "en-US";

export type StampFormat = "datetime" | "datetimeSeconds" | "date" | "clock";

const OPTIONS: Record<StampFormat, Intl.DateTimeFormatOptions> = {
  datetime: {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "UTC",
  },
  datetimeSeconds: {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
    timeZone: "UTC",
  },
  date: { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" },
  clock: {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
    timeZone: "UTC",
  },
};

/** Formats `value` the same way no matter which machine runs the code. */
export function formatStamp(
  value: string | number | Date | null | undefined,
  format: StampFormat = "datetime",
): string {
  if (value === null || value === undefined || value === "") return "—";
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  const text = d.toLocaleString(LOCALE, OPTIONS[format]);
  // `date` and `clock` carry no time-of-day component, so the zone label
  // would be noise there.
  return format === "date" || format === "clock" ? text : `${text} UTC`;
}

export const formatDateTime = (v: string | number | Date | null | undefined) =>
  formatStamp(v, "datetime");
export const formatDateTimeSeconds = (v: string | number | Date | null | undefined) =>
  formatStamp(v, "datetimeSeconds");
export const formatDate = (v: string | number | Date | null | undefined) => formatStamp(v, "date");
export const formatClock = (v: string | number | Date | null | undefined) =>
  formatStamp(v, "clock");
