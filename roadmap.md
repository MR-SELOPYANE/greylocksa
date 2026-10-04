# greyLock — improvement roadmap

Audit of 2026-10-04. Build passes clean; no horizontal overflow at 1280 or 390; main JS chunk 182 kB gzipped.

## Open

1. **Fix Sentinel hydration error** — `/sentinel` throws a React hydration mismatch when signed in: the transcript renders locale/timezone-dependent timestamps (`toLocaleTimeString()`), so server HTML and client disagree and React rebuilds the tree.
2. **Clear the lint backlog** — 18,657 problems, 18,633 auto-fixable formatting. Plus 19 real warnings (missing hook dependency in `SentinelView`, fast-refresh export warnings) and 4 `any` type errors in `passive-intel.functions.ts`.
3. **Make landing-page claims true** — the page promises a real database, row-level role enforcement, rate-limited auth, "Three operator roles (Viewer, Analyst, Admin)" (there are two), and hardcoded stats (12,847 entities, 143 cases, 99.98% uptime, v2.4.1). None of that exists yet.
4. **Replace native `prompt()` dialogs** — 10 destructive actions (lockdown, purge, seal-break, delete, status change) use the unstyleable browser prompt with no validation.
5. **Add error boundaries** — only a root not-found component exists; any runtime error in a view blanks the page.
6. **Cap storage growth** — notifications cap at 100, but custody/audit/evidence/scans grow unbounded in localStorage (~5 MB quota) and a failed write is silently swallowed.
7. **Remove dead weight** — 20 unused interface pieces and 7 unused packages (recharts, embla-carousel-react, react-day-picker, vaul, react-resizable-panels, date-fns, @tanstack/react-query).
