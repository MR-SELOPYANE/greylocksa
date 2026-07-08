import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAppState, l as mockThreats, n as mockSystemStatus, B as Button, c as cn } from "./router-rFz3Bia9.mjs";
import "../_libs/sonner.mjs";
import { D as Database, F as FolderSearch, i as LoaderCircle, B as Bug, j as ShieldAlert, v as Plus, l as FolderPlus, M as MessageSquare, c as FingerprintPattern, e as Activity, w as TrendingUp, x as Clock } from "../_libs/lucide-react.mjs";
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
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/cmdk.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-presence.mjs";
function SystemStatusView() {
  const { entities, cases, scans, custody } = useAppState();
  const navigate = useNavigate();
  const formatDate = (d) => new Date(d).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  const stats = reactExports.useMemo(() => {
    const byStatus = { black: 0, grey: 0, white: 0 };
    entities.forEach((e) => {
      byStatus[e.status] += 1;
    });
    const avgRisk = entities.length ? Math.round(entities.reduce((a, e) => a + e.riskScore, 0) / entities.length) : 0;
    const running = scans.filter((s) => s.status === "running").length;
    const criticalFindings = scans.reduce(
      (a, s) => a + (s.summary?.critical ?? 0) + (s.summary?.high ?? 0),
      0
    );
    const openCases = cases.filter((c) => c.status !== "closed").length;
    const escalated = cases.filter((c) => c.status === "escalated").length;
    const iocMatches = /* @__PURE__ */ new Set();
    mockThreats.forEach((t) => t.matchedEntityIds.forEach((id) => iocMatches.add(id)));
    return {
      byStatus,
      avgRisk,
      running,
      criticalFindings,
      openCases,
      escalated,
      iocMatches: iocMatches.size,
      total: entities.length
    };
  }, [entities, cases, scans]);
  const metrics = [
    { label: "Entities Tracked", value: stats.total, icon: Database, tone: "text-tactical" },
    { label: "Open Cases", value: stats.openCases, sub: `${stats.escalated} escalated`, icon: FolderSearch, tone: "text-tactical" },
    { label: "Scans Running", value: stats.running, sub: `${scans.length} total`, icon: stats.running > 0 ? LoaderCircle : Bug, tone: stats.running > 0 ? "text-tactical" : "text-muted-foreground", spin: stats.running > 0 },
    { label: "Critical / High", value: stats.criticalFindings, sub: `${stats.iocMatches} IOC matches`, icon: ShieldAlert, tone: "text-status-black" }
  ];
  const statusBars = [
    { key: "black", label: "Black (block)", value: stats.byStatus.black, cls: "bg-status-black" },
    { key: "grey", label: "Grey (review)", value: stats.byStatus.grey, cls: "bg-status-grey" },
    { key: "white", label: "White (clear)", value: stats.byStatus.white, cls: "bg-status-white" }
  ];
  const operational = mockSystemStatus.filter((s) => s.status === "operational").length;
  const priorityBreakdown = reactExports.useMemo(() => {
    const acc = { critical: 0, high: 0, medium: 0, low: 0 };
    cases.filter((c) => c.status !== "closed").forEach((c) => {
      acc[c.priority] += 1;
    });
    return acc;
  }, [cases]);
  const recentActivity = reactExports.useMemo(() => custody.slice(0, 8), [custody]);
  const quickActions = [
    { label: "Add Target", icon: Plus, onClick: () => {
      navigate({ to: "/entities" });
      setTimeout(() => window.dispatchEvent(new CustomEvent("greylock:open-add-entity")), 80);
    } },
    { label: "Open Case", icon: FolderPlus, onClick: () => {
      navigate({ to: "/cases" });
      setTimeout(() => window.dispatchEvent(new CustomEvent("greylock:new-case")), 80);
    } },
    { label: "Ask Sentinel", icon: MessageSquare, onClick: () => navigate({ to: "/sentinel" }) },
    { label: "Chain of Custody", icon: FingerprintPattern, onClick: () => navigate({ to: "/custody" }) }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: quickActions.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: a.onClick, className: "gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(a.icon, { className: "h-3.5 w-3.5" }),
      " ",
      a.label
    ] }, a.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-4 w-4 text-tactical" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-mono text-xs uppercase tracking-widest text-muted-foreground", children: "Operations Overview" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: metrics.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border bg-card p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-3xl font-bold text-card-foreground", children: m.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: m.label }),
          m.sub && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-mono text-[10px] text-muted-foreground/70", children: m.sub })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(m.icon, { className: cn("h-5 w-5", m.tone, m.spin && "animate-spin") })
      ] }) }, m.label)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card p-5 lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground", children: "Watchlist Status Distribution" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: statusBars.map((b) => {
          const pct = stats.total ? Math.round(b.value / stats.total * 100) : 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between font-mono text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: b.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                b.value,
                " · ",
                pct,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 overflow-hidden rounded-full bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("h-full rounded-full transition-all", b.cls), style: { width: `${pct}%` } }) })
          ] }, b.key);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-between rounded-lg border border-border bg-card p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground", children: "Average Risk" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col items-center justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "font-mono text-6xl font-bold",
                stats.avgRisk >= 70 ? "text-status-black" : stats.avgRisk >= 45 ? "text-status-grey" : "text-status-white"
              ),
              children: stats.avgRisk
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3 w-3" }),
            "across ",
            stats.total,
            " entities"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-mono text-xs uppercase tracking-widest text-muted-foreground", children: "Service Health" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-muted-foreground", children: [
          operational,
          "/",
          mockSystemStatus.length,
          " operational"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: mockSystemStatus.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-card-foreground", children: s.service }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "h-2 w-2 rounded-full",
                  s.status === "operational" && "bg-status-white",
                  s.status === "degraded" && "bg-status-grey animate-pulse-glow",
                  s.status === "down" && "bg-status-black animate-pulse-glow"
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "font-mono text-[10px] uppercase tracking-wider",
                  s.status === "operational" && "text-status-white",
                  s.status === "degraded" && "text-status-grey",
                  s.status === "down" && "text-status-black"
                ),
                children: s.status
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: s.details }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-4 text-[10px] font-mono text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Uptime: ",
            s.uptime
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Last check: ",
            formatDate(s.lastCheck)
          ] })
        ] })
      ] }, s.service)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-mono text-xs uppercase tracking-widest text-muted-foreground", children: "Open Case Priority" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cases", className: "font-mono text-[10px] text-tactical hover:underline", children: "View all →" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          [
            { key: "critical", label: "Critical", cls: "bg-status-black" },
            { key: "high", label: "High", cls: "bg-status-black/70" },
            { key: "medium", label: "Medium", cls: "bg-status-grey" },
            { key: "low", label: "Low", cls: "bg-status-white" }
          ].map((p) => {
            const value = priorityBreakdown[p.key];
            const pct = stats.openCases ? Math.round(value / stats.openCases * 100) : 0;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between font-mono text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: p.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: value })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 overflow-hidden rounded-full bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("h-full rounded-full transition-all", p.cls), style: { width: `${pct}%` } }) })
            ] }, p.key);
          }),
          stats.openCases === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[11px] text-muted-foreground/60", children: "No open cases." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
            " Recent Activity"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/custody", className: "font-mono text-[10px] text-tactical hover:underline", children: "Full ledger →" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          recentActivity.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[11px] text-muted-foreground/60", children: "No activity yet." }),
          recentActivity.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded border border-border px-1.5 py-0.5 font-mono text-[9px] uppercase text-muted-foreground", children: c.action }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-tactical", children: c.entityId }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto truncate font-mono text-[10px] text-muted-foreground", children: formatDate(c.timestamp) })
          ] }, c.id))
        ] })
      ] })
    ] })
  ] });
}
function SystemPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SystemStatusView, {});
}
export {
  SystemPage as component
};
