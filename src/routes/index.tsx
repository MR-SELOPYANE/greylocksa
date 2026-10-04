import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Shield,
  Database,
  Activity,
  Lock,
  MessageSquare,
  FileText,
  ArrowRight,
  CheckCircle2,
  Eye,
  Terminal,
  Radar,
  GitBranch,
  Brain,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "greyLock — Vulnerability Testing & Watchlist Intelligence" },
      {
        name: "description",
        content:
          "greyLock is a tactical platform for testing websites, applications, and platforms for vulnerabilities — with chain-of-custody, emergency lockdown, and AI-assisted triage.",
      },
      { property: "og:title", content: "greyLock — Vulnerability Testing Platform" },
      {
        property: "og:description",
        content:
          "Scan websites, apps, and platforms. Triage findings. Sign every action into chain-of-custody.",
      },
    ],
  }),
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="border-b border-border/60 bg-background/80 backdrop-blur sticky top-0 z-50">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-tactical" />
            <span className="font-mono text-sm font-bold tracking-wider">greyLock</span>
          </Link>
          <nav className="flex items-center gap-2">
            <Link
              to="/login"
              className="rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Request Access
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.65_0.15_220/0.12),transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1">
            <div className="h-1.5 w-1.5 rounded-full bg-status-white animate-pulse-glow" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              System Operational · v2.4.1
            </span>
          </div>
          <h1 className="max-w-3xl font-mono text-4xl font-bold tracking-tight sm:text-6xl">
            Vulnerability testing,
            <br />
            <span className="text-tactical">engineered for operators.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            greyLock scans websites, applications, and platforms for vulnerabilities, signs every
            action into chain-of-custody, and gives admins a single switch for emergency lockdown.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Request Access
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/terminal"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              <Terminal className="h-4 w-4" />
              Enter Console
            </Link>
          </div>

          {/* Status strip */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Entities Tracked", value: "12,847" },
              { label: "Active Cases", value: "143" },
              { label: "Audit Events / 24h", value: "8.2K" },
              { label: "Uptime", value: "99.98%" },
            ].map((s) => (
              <div key={s.label} className="rounded-md border border-border bg-card p-4">
                <div className="font-mono text-2xl font-bold text-tactical">{s.value}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-12">
            <span className="font-mono text-[10px] uppercase tracking-widest text-tactical">
              // Capabilities
            </span>
            <h2 className="mt-2 font-mono text-3xl font-bold tracking-tight">
              The full intelligence stack
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Database,
                title: "Targets & Watchlist",
                desc: "Track websites, apps, platforms, IPs, and domains with grey/black/white status and risk scoring.",
              },
              {
                icon: Radar,
                title: "Vulnerability Scans",
                desc: "Passive, active, deep, or fuzz profiles. CWE-mapped findings with remediation guidance.",
              },
              {
                icon: MessageSquare,
                title: "Sentinel AI",
                desc: "Role-aware assistant for triage, summarization, and lockdown decisions.",
              },
              {
                icon: Eye,
                title: "Chain of Custody",
                desc: "Every view, edit, scan, and export signed and hashed — court-grade attribution.",
              },
              {
                icon: Activity,
                title: "Emergency Lockdown",
                desc: "Admin-only kill switch that freezes mutations and scans across the platform.",
              },
              {
                icon: Lock,
                title: "Role-Aware Dashboards",
                desc: "Analyst sees targets, scans, and cases. Admin gets audit, system, and lockdown controls.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="group rounded-md border border-border bg-card p-6 transition-colors hover:border-tactical/50"
              >
                <f.icon className="h-5 w-5 text-tactical" />
                <h3 className="mt-4 font-mono text-sm font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-12">
            <span className="font-mono text-[10px] uppercase tracking-widest text-tactical">
              // Operator workflow
            </span>
            <h2 className="mt-2 font-mono text-3xl font-bold tracking-tight">
              Ingest. Triage. Decide.
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              A linear pipeline from raw signal to attributable decision — with Sentinel watching
              every step.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              {
                n: "01",
                icon: Radar,
                title: "Ingest",
                desc: "Feeds, manual entries, and threat intel land in the grey pool.",
              },
              {
                n: "02",
                icon: Eye,
                title: "Triage",
                desc: "Analysts score risk, attach evidence, and link related entities.",
              },
              {
                n: "03",
                icon: GitBranch,
                title: "Promote",
                desc: "Move to black (block) or white (clear) — every transition logged.",
              },
              {
                n: "04",
                icon: Brain,
                title: "Correlate",
                desc: "Sentinel surfaces patterns across cases and historical events.",
              },
            ].map((s) => (
              <div key={s.n} className="relative rounded-md border border-border bg-card p-5">
                <div className="absolute right-4 top-4 font-mono text-[10px] text-muted-foreground">
                  {s.n}
                </div>
                <s.icon className="h-5 w-5 text-tactical" />
                <h3 className="mt-4 font-mono text-sm font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Console preview */}
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-12 lg:grid-cols-5 lg:items-center">
            <div className="lg:col-span-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-tactical">
                // Console
              </span>
              <h2 className="mt-2 font-mono text-3xl font-bold tracking-tight">
                A surface built for keyboards.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Dense tables, fast filters, and a clearance-aware command bar. No marketing chrome —
                just the signal you need to make a call.
              </p>
              <Link
                to="/entities"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-tactical hover:underline"
              >
                Open the live console
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="lg:col-span-3">
              <div className="overflow-hidden rounded-md border border-border bg-card shadow-2xl">
                {/* Window chrome */}
                <div className="flex items-center justify-between border-b border-border bg-background/60 px-3 py-2">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-status-black/70" />
                    <div className="h-2.5 w-2.5 rounded-full bg-status-grey/70" />
                    <div className="h-2.5 w-2.5 rounded-full bg-status-white/70" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    greylock // entities
                  </span>
                  <Lock className="h-3 w-3 text-muted-foreground" />
                </div>

                {/* Fake table */}
                <div className="divide-y divide-border font-mono text-xs">
                  <div className="grid grid-cols-[1fr_60px_80px_70px] gap-3 bg-background/40 px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                    <span>Identifier</span>
                    <span>Type</span>
                    <span>Risk</span>
                    <span>Status</span>
                  </div>
                  {[
                    {
                      id: "kozlov.pavel@signal",
                      t: "person",
                      r: 92,
                      s: "BLACK",
                      c: "text-status-black",
                    },
                    { id: "185.220.101.42", t: "ip", r: 78, s: "GREY", c: "text-status-grey" },
                    {
                      id: "shellco-holdings.ae",
                      t: "org",
                      r: 64,
                      s: "GREY",
                      c: "text-status-grey",
                    },
                    {
                      id: "darkpool-exchange.io",
                      t: "domain",
                      r: 88,
                      s: "BLACK",
                      c: "text-status-black",
                    },
                    { id: "reuters.com", t: "domain", r: 4, s: "WHITE", c: "text-status-white" },
                  ].map((r) => (
                    <div key={r.id} className="grid grid-cols-[1fr_60px_80px_70px] gap-3 px-3 py-2">
                      <span className="truncate text-foreground">{r.id}</span>
                      <span className="text-muted-foreground">{r.t}</span>
                      <span
                        className={
                          r.r > 70
                            ? "text-status-black"
                            : r.r > 40
                              ? "text-status-grey"
                              : "text-status-white"
                        }
                      >
                        {r.r}
                      </span>
                      <span className={`text-[10px] uppercase tracking-wider ${r.c}`}>{r.s}</span>
                    </div>
                  ))}
                </div>

                {/* Terminal strip */}
                <div className="border-t border-border bg-background/60 px-3 py-2 font-mono text-[11px]">
                  <span className="text-tactical">sentinel›</span>{" "}
                  <span className="text-muted-foreground">
                    3 entities promoted to BLACK in the last 24h. Correlate?
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-tactical">
                // Security posture
              </span>
              <h2 className="mt-2 font-mono text-3xl font-bold tracking-tight">
                Built like a SCIF.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Defense-in-depth from the data layer up. Every action is attributable, every record
                is immutable, every query is clearance-gated.
              </p>
            </div>
            <ul className="space-y-3">
              {[
                "Append-only audit trail with actor + IP attribution",
                "Clearance-gated AI responses (UNCLASSIFIED → SECRET)",
                "Row-level role enforcement on all mutations",
                "Zero hardcoded secrets; env-only configuration",
                "Rate-limited authentication endpoints",
              ].map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 rounded-md border border-border bg-card p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-status-white" />
                  <span className="text-sm">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-4xl px-6 py-24">
          <div className="mb-10">
            <span className="font-mono text-[10px] uppercase tracking-widest text-tactical">
              // FAQ
            </span>
            <h2 className="mt-2 font-mono text-3xl font-bold tracking-tight">
              Things operators ask first.
            </h2>
          </div>
          <div className="divide-y divide-border rounded-md border border-border bg-card">
            {[
              {
                q: "Where does data live?",
                a: "All entity records, cases, and audit events persist in your own database. greyLock is single-tenant by design — no shared storage, no telemetry off-box.",
              },
              {
                q: "How is access controlled?",
                a: "Three operator roles (Viewer, Analyst, Admin) layered with clearance levels (UNCLASSIFIED → SECRET). Mutations are role-gated; Sentinel responses are clearance-gated.",
              },
              {
                q: "Is the audit trail tamper-evident?",
                a: "Append-only with actor, source IP, and ISO timestamp captured on every POST, PATCH, and DELETE. Records cannot be edited or deleted through the application surface.",
              },
              {
                q: "Can Sentinel see classified material?",
                a: "Only at or below the requesting operator's clearance. Responses redact references the operator is not cleared to view.",
              },
              {
                q: "What about rate limits and abuse?",
                a: "Authentication endpoints are rate-limited at the edge. Bulk mutation endpoints enforce per-operator quotas with audit-event escalation on overage.",
              },
            ].map((f) => (
              <details
                key={f.q}
                className="group px-5 py-4 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-mono text-sm text-foreground">
                  {f.q}
                  <span className="font-mono text-tactical transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="font-mono text-3xl font-bold tracking-tight sm:text-4xl">
            Get inside the console.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Provision an operator account and gain visibility into your watchlist in under 60
            seconds.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Request Access
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-tactical" />
            <span className="font-mono text-xs text-muted-foreground">
              greyLock // intelligence platform
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            CLASSIFIED · INTERNAL USE
          </span>
        </div>
      </footer>
    </div>
  );
}
