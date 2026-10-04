import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import {
  f as Shield,
  u as ArrowRight,
  a6 as Terminal,
  D as Database,
  a7 as Radar,
  M as MessageSquare,
  E as Eye,
  e as Activity,
  L as Lock,
  a8 as GitBranch,
  a9 as Brain,
  aa as CircleCheck,
} from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
function LandingPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    className: "min-h-screen bg-background text-foreground",
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("header", {
        className: "border-b border-border/60 bg-background/80 backdrop-blur sticky top-0 z-50",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
          className: "mx-auto flex h-14 max-w-6xl items-center justify-between px-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, {
              to: "/",
              className: "flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, {
                  className: "h-5 w-5 text-tactical",
                }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                  className: "font-mono text-sm font-bold tracking-wider",
                  children: "greyLock",
                }),
              ],
            }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", {
              className: "flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, {
                  to: "/login",
                  className:
                    "rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground",
                  children: "Sign In",
                }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, {
                  to: "/signup",
                  className:
                    "rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90",
                  children: "Request Access",
                }),
              ],
            }),
          ],
        }),
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", {
        className: "relative overflow-hidden border-b border-border/60",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
            className:
              "absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.65_0.15_220/0.12),transparent_50%)]",
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
            className: "relative mx-auto max-w-6xl px-6 py-24 sm:py-32",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                className:
                  "mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
                    className: "h-1.5 w-1.5 rounded-full bg-status-white animate-pulse-glow",
                  }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                    className:
                      "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
                    children: "System Operational · v2.4.1",
                  }),
                ],
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", {
                className: "max-w-3xl font-mono text-4xl font-bold tracking-tight sm:text-6xl",
                children: [
                  "Vulnerability testing,",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                    className: "text-tactical",
                    children: "engineered for operators.",
                  }),
                ],
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
                className: "mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg",
                children:
                  "greyLock scans websites, applications, and platforms for vulnerabilities, signs every action into chain-of-custody, and gives admins a single switch for emergency lockdown.",
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                className: "mt-10 flex flex-wrap items-center gap-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, {
                    to: "/signup",
                    className:
                      "inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
                    children: [
                      "Request Access",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" }),
                    ],
                  }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, {
                    to: "/system",
                    className:
                      "inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className: "h-4 w-4" }),
                      "Enter Console",
                    ],
                  }),
                ],
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
                className: "mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4",
                children: [
                  {
                    label: "Entities Tracked",
                    value: "12,847",
                  },
                  {
                    label: "Active Cases",
                    value: "143",
                  },
                  {
                    label: "Audit Events / 24h",
                    value: "8.2K",
                  },
                  {
                    label: "Uptime",
                    value: "99.98%",
                  },
                ].map((s) =>
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "rounded-md border border-border bg-card p-4",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
                          className: "font-mono text-2xl font-bold text-tactical",
                          children: s.value,
                        }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
                          className:
                            "mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
                          children: s.label,
                        }),
                      ],
                    },
                    s.label,
                  ),
                ),
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", {
        className: "border-b border-border/60",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
          className: "mx-auto max-w-6xl px-6 py-24",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
              className: "mb-12",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                  className: "font-mono text-[10px] uppercase tracking-widest text-tactical",
                  children: "// Capabilities",
                }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", {
                  className: "mt-2 font-mono text-3xl font-bold tracking-tight",
                  children: "The full intelligence stack",
                }),
              ],
            }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
              className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
              children: [
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
              ].map((f) =>
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className:
                      "group rounded-md border border-border bg-card p-6 transition-colors hover:border-tactical/50",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, {
                        className: "h-5 w-5 text-tactical",
                      }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", {
                        className: "mt-4 font-mono text-sm font-semibold",
                        children: f.title,
                      }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
                        className: "mt-2 text-sm leading-relaxed text-muted-foreground",
                        children: f.desc,
                      }),
                    ],
                  },
                  f.title,
                ),
              ),
            }),
          ],
        }),
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", {
        className: "border-b border-border/60",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
          className: "mx-auto max-w-6xl px-6 py-24",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
              className: "mb-12",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                  className: "font-mono text-[10px] uppercase tracking-widest text-tactical",
                  children: "// Operator workflow",
                }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", {
                  className: "mt-2 font-mono text-3xl font-bold tracking-tight",
                  children: "Ingest. Triage. Decide.",
                }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
                  className: "mt-3 max-w-2xl text-muted-foreground",
                  children:
                    "A linear pipeline from raw signal to attributable decision — with Sentinel watching every step.",
                }),
              ],
            }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
              className: "grid gap-4 md:grid-cols-4",
              children: [
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
              ].map((s) =>
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "relative rounded-md border border-border bg-card p-5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
                        className:
                          "absolute right-4 top-4 font-mono text-[10px] text-muted-foreground",
                        children: s.n,
                      }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, {
                        className: "h-5 w-5 text-tactical",
                      }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", {
                        className: "mt-4 font-mono text-sm font-semibold",
                        children: s.title,
                      }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
                        className: "mt-1.5 text-sm leading-relaxed text-muted-foreground",
                        children: s.desc,
                      }),
                    ],
                  },
                  s.n,
                ),
              ),
            }),
          ],
        }),
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", {
        className: "border-b border-border/60",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
          className: "mx-auto max-w-6xl px-6 py-24",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
            className: "grid gap-12 lg:grid-cols-5 lg:items-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                className: "lg:col-span-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                    className: "font-mono text-[10px] uppercase tracking-widest text-tactical",
                    children: "// Console",
                  }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", {
                    className: "mt-2 font-mono text-3xl font-bold tracking-tight",
                    children: "A surface built for keyboards.",
                  }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
                    className: "mt-4 text-muted-foreground",
                    children:
                      "Dense tables, fast filters, and a clearance-aware command bar. No marketing chrome — just the signal you need to make a call.",
                  }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, {
                    to: "/entities",
                    className:
                      "mt-6 inline-flex items-center gap-2 text-sm font-medium text-tactical hover:underline",
                    children: [
                      "Open the live console",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" }),
                    ],
                  }),
                ],
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
                className: "lg:col-span-3",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                  className: "overflow-hidden rounded-md border border-border bg-card shadow-2xl",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                      className:
                        "flex items-center justify-between border-b border-border bg-background/60 px-3 py-2",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                          className: "flex items-center gap-1.5",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
                              className: "h-2.5 w-2.5 rounded-full bg-status-black/70",
                            }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
                              className: "h-2.5 w-2.5 rounded-full bg-status-grey/70",
                            }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
                              className: "h-2.5 w-2.5 rounded-full bg-status-white/70",
                            }),
                          ],
                        }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                          className:
                            "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
                          children: "greylock // entities",
                        }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, {
                          className: "h-3 w-3 text-muted-foreground",
                        }),
                      ],
                    }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                      className: "divide-y divide-border font-mono text-xs",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                          className:
                            "grid grid-cols-[1fr_60px_80px_70px] gap-3 bg-background/40 px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                              children: "Identifier",
                            }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Type" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Risk" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Status" }),
                          ],
                        }),
                        [
                          {
                            id: "kozlov.pavel@signal",
                            t: "person",
                            r: 92,
                            s: "BLACK",
                            c: "text-status-black",
                          },
                          {
                            id: "185.220.101.42",
                            t: "ip",
                            r: 78,
                            s: "GREY",
                            c: "text-status-grey",
                          },
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
                          {
                            id: "reuters.com",
                            t: "domain",
                            r: 4,
                            s: "WHITE",
                            c: "text-status-white",
                          },
                        ].map((r) =>
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              className: "grid grid-cols-[1fr_60px_80px_70px] gap-3 px-3 py-2",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                                  className: "truncate text-foreground",
                                  children: r.id,
                                }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                                  className: "text-muted-foreground",
                                  children: r.t,
                                }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                                  className:
                                    r.r > 70
                                      ? "text-status-black"
                                      : r.r > 40
                                        ? "text-status-grey"
                                        : "text-status-white",
                                  children: r.r,
                                }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                                  className: `text-[10px] uppercase tracking-wider ${r.c}`,
                                  children: r.s,
                                }),
                              ],
                            },
                            r.id,
                          ),
                        ),
                      ],
                    }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                      className:
                        "border-t border-border bg-background/60 px-3 py-2 font-mono text-[11px]",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                          className: "text-tactical",
                          children: "sentinel›",
                        }),
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                          className: "text-muted-foreground",
                          children: "3 entities promoted to BLACK in the last 24h. Correlate?",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
        }),
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", {
        className: "border-b border-border/60",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
          className: "mx-auto max-w-6xl px-6 py-24",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
            className: "grid gap-12 lg:grid-cols-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                    className: "font-mono text-[10px] uppercase tracking-widest text-tactical",
                    children: "// Security posture",
                  }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", {
                    className: "mt-2 font-mono text-3xl font-bold tracking-tight",
                    children: "Built like a SCIF.",
                  }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
                    className: "mt-4 text-muted-foreground",
                    children:
                      "Defense-in-depth from the data layer up. Every action is attributable, every record is immutable, every query is clearance-gated.",
                  }),
                ],
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", {
                className: "space-y-3",
                children: [
                  "Append-only audit trail with actor + IP attribution",
                  "Clearance-gated AI responses (UNCLASSIFIED → SECRET)",
                  "Row-level role enforcement on all mutations",
                  "Zero hardcoded secrets; env-only configuration",
                  "Rate-limited authentication endpoints",
                ].map((b) =>
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "li",
                    {
                      className:
                        "flex items-start gap-3 rounded-md border border-border bg-card p-4",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, {
                          className: "mt-0.5 h-4 w-4 shrink-0 text-status-white",
                        }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                          className: "text-sm",
                          children: b,
                        }),
                      ],
                    },
                    b,
                  ),
                ),
              }),
            ],
          }),
        }),
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", {
        className: "border-b border-border/60",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
          className: "mx-auto max-w-4xl px-6 py-24",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
              className: "mb-10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                  className: "font-mono text-[10px] uppercase tracking-widest text-tactical",
                  children: "// FAQ",
                }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", {
                  className: "mt-2 font-mono text-3xl font-bold tracking-tight",
                  children: "Things operators ask first.",
                }),
              ],
            }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
              className: "divide-y divide-border rounded-md border border-border bg-card",
              children: [
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
              ].map((f) =>
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "details",
                  {
                    className: "group px-5 py-4 [&_summary::-webkit-details-marker]:hidden",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", {
                        className:
                          "flex cursor-pointer items-center justify-between gap-4 font-mono text-sm text-foreground",
                        children: [
                          f.q,
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                            className:
                              "font-mono text-tactical transition-transform group-open:rotate-45",
                            children: "+",
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
                        className: "mt-3 text-sm leading-relaxed text-muted-foreground",
                        children: f.a,
                      }),
                    ],
                  },
                  f.q,
                ),
              ),
            }),
          ],
        }),
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", {
        className: "border-b border-border/60",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
          className: "mx-auto max-w-4xl px-6 py-24 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", {
              className: "font-mono text-3xl font-bold tracking-tight sm:text-4xl",
              children: "Get inside the console.",
            }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
              className: "mt-4 text-muted-foreground",
              children:
                "Provision an operator account and gain visibility into your watchlist in under 60 seconds.",
            }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
              className: "mt-8 flex flex-wrap items-center justify-center gap-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, {
                  to: "/signup",
                  className:
                    "inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
                  children: [
                    "Request Access",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" }),
                  ],
                }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, {
                  to: "/login",
                  className:
                    "inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent",
                  children: "Sign In",
                }),
              ],
            }),
          ],
        }),
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("footer", {
        className: "bg-background",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
          className:
            "mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
              className: "flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, {
                  className: "h-4 w-4 text-tactical",
                }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
                  className: "font-mono text-xs text-muted-foreground",
                  children: "greyLock // intelligence platform",
                }),
              ],
            }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
              className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
              children: "CLASSIFIED · INTERNAL USE",
            }),
          ],
        }),
      }),
    ],
  });
}
export { LandingPage as component };
