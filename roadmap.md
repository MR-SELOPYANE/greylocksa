# greyLock — improvement roadmap

Audit of 2026-10-04. All seven findings are now closed; the two remaining items need infrastructure this project does not have yet.

## Closed

1. **Sentinel hydration error** — fixed. All date/time rendering goes through `src/lib/time.ts` (pinned `en-US` / UTC) and `src/components/Timestamp.tsx`, which defers runtime-generated clock text until after hydration. Verified in a browser at UTC+2 across every route: zero console errors.
2. **Lint backlog** — fixed. 18,657 problems down to 6 warnings, all of them the shadcn `ui/` files that export a `…Variants` helper next to their component. The 4 `any` spots in `passive-intel.functions.ts` are now typed (`JsonRecord`, `asRecord`, typed `ShodanInfo`), and the store's 11 missing hook dependencies are declared.
3. **Landing-page claims** — fixed. The invented figures (12,847 entities, 143 cases, 99.98% uptime, v2.4.1) are replaced with live counts from the console; the false promises (own database, row-level role enforcement, rate-limited auth, three operator roles) are replaced with what actually happens, and the terminal's simulated active tooling is named as such.
4. **Native `prompt()` dialogs** — fixed. All ten destructive flows use `useConfirm()` from `src/lib/confirm.ts`, rendered by `ConfirmProvider` in the app root: themed, validated (a reason is required where one is needed), keyboard-dismissible.
5. **Error boundaries** — fixed. `defaultErrorComponent` in `src/router.tsx` renders `src/components/RouteErrorFallback.tsx`. Proven by injecting a throw into the Activity view: the error screen appeared, the rest of the console stayed standing, and no uncaught error leaked.
6. **Storage growth** — fixed. Every persisted collection has a ceiling (targets 5,000; scans 500; cases and custody 2,000; evidence 500; honeytokens 200; alerts 100), oversized history is trimmed oldest-first and written straight back, and a write that fails now raises a visible alert instead of failing silently.
7. **Dead weight** — fixed. 32 unreachable source files and 27 unused packages removed; `bunx tsgo --noEmit` and a full route sweep confirm nothing broke.

## Still open

- **No shared backend.** Records live in this browser's storage, so the console is single-device: no real accounts, no cross-user visibility, and the custody log is accountability rather than a cryptographic chain. Needs a connected database with server-side role checks.
- **No live active scanning.** nmap, Nikto, Hydra, sqlmap and Metasploit print clearly marked `[sim]` output. Real active testing has to run on a host you control through the signed scanner agent described in `docs/scanner-agent.md`.

## Guardrails

`bun test` runs the rule tests in `src/lib/rules.test.ts` — the storage ceiling and the analyst-cannot-self-promote rule.
