import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useAppState, o as mockSessions, c as cn, B as Button } from "./router-rFz3Bia9.mjs";
import { B as Badge } from "./badge-BlsWwPaG.mjs";
import { y as ShieldOff, Z as Zap, G as Globe, z as Smartphone, J as Moon, K as Plane, e as Activity } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
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
const anomalyMeta = {
  impossible_travel: { label: "Impossible travel", icon: Plane },
  off_hours: { label: "Off-hours access", icon: Moon },
  new_device: { label: "New device", icon: Smartphone },
  tor_exit: { label: "Tor exit node", icon: Globe },
  burst_export: { label: "Burst export", icon: Zap }
};
function SessionsView() {
  const { role } = useAppState();
  const [sessions, setSessions] = reactExports.useState(() => mockSessions);
  if (role !== "admin") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-surface p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldOff, { className: "mx-auto h-8 w-8 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-mono text-sm text-foreground", children: "Admin clearance required" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Switch to Admin role to monitor active sessions." })
    ] });
  }
  const kill = (id) => {
    setSessions((prev) => prev.map((s) => s.id === id ? { ...s, active: false, anomalies: s.anomalies } : s));
    toast.warning(`Session ${id} terminated`, { description: "Forced logout dispatched. Logged to chain-of-custody." });
  };
  const active = sessions.filter((s) => s.active).length;
  const highRisk = sessions.filter((s) => s.riskScore >= 60).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Active sessions", value: active, accent: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "High-risk", value: highRisk, danger: highRisk > 0 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Anomalies flagged", value: sessions.reduce((a, s) => a + s.anomalies.length, 0) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Total tracked", value: sessions.length })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-surface", children: ["User", "Role", "IP", "Country", "Device", "Started", "Last activity", "Anomalies", "Risk", ""].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground", children: h }, h)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: sessions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: cn("border-b border-border hover:bg-accent", !s.active && "opacity-50", s.riskScore >= 80 && "bg-destructive/5"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs text-tactical", children: s.user }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "font-mono text-[10px] uppercase", children: s.role }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs", children: s.ip }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs", children: s.country }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground", children: s.device }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-[10px] text-muted-foreground whitespace-nowrap", children: new Date(s.startedAt).toLocaleString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-[10px] text-muted-foreground whitespace-nowrap", children: new Date(s.lastActivity).toLocaleString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
          s.anomalies.map((a) => {
            const meta = anomalyMeta[a];
            const Icon = meta.icon;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded bg-destructive/10 px-1.5 py-0.5 font-mono text-[10px] text-destructive", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-2.5 w-2.5" }),
              " ",
              meta.label
            ] }, a);
          }),
          s.anomalies.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "—" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn(
          "font-mono text-xs font-bold",
          s.riskScore >= 80 ? "text-destructive" : s.riskScore >= 50 ? "text-status-grey" : "text-status-white"
        ), children: s.riskScore }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: s.active && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "h-7 gap-1.5 text-destructive hover:text-destructive", onClick: () => kill(s.id), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldOff, { className: "h-3 w-3" }),
          " Kill"
        ] }) })
      ] }, s.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-md border border-border bg-surface p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "mt-0.5 h-4 w-4 text-tactical" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono uppercase tracking-wider text-tactical", children: "Anomaly engine" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1", children: "Sessions are scored on geo-velocity, hour-of-day, device fingerprint, exit-node reputation, and export volume. Scores ≥ 60 raise an alert; ≥ 80 auto-quarantine the session pending admin review." })
      ] })
    ] })
  ] });
}
function Stat({ label, value, accent, danger }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(
    "rounded-lg border p-3",
    danger ? "border-destructive/50 bg-destructive/5" : accent ? "border-tactical/50 bg-tactical/5" : "border-border bg-surface"
  ), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(
      "mt-2 font-mono text-2xl font-bold",
      danger ? "text-destructive" : accent ? "text-tactical" : "text-foreground"
    ), children: value })
  ] });
}
function SessionsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SessionsView, {});
}
export {
  SessionsPage as component
};
