import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useAppState, S as Select, g as SelectTrigger, h as SelectValue, i as SelectContent, j as SelectItem, B as Button, c as cn, D as Dialog, b as DialogContent, d as DialogHeader, e as DialogTitle, f as DialogDescription } from "./router-rFz3Bia9.mjs";
import { S as ScrollArea } from "./scroll-area-BHCPfQz6.mjs";
import { B as Badge } from "./badge-BlsWwPaG.mjs";
import { B as Bug, _ as Play, i as LoaderCircle, g as ChevronRight, j as ShieldAlert } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-scroll-area.mjs";
const severityClasses = {
  critical: "bg-status-black text-status-black-foreground",
  high: "bg-status-grey text-status-grey-foreground",
  medium: "bg-primary text-primary-foreground",
  low: "bg-accent text-accent-foreground",
  info: "bg-muted text-muted-foreground"
};
function ScansView() {
  const { entities, scans, startScan, role, lockdown, logCustody } = useAppState();
  const [target, setTarget] = reactExports.useState("");
  const [profile, setProfile] = reactExports.useState("active");
  const [openScan, setOpenScan] = reactExports.useState(null);
  const targets = reactExports.useMemo(
    () => entities.filter((e) => ["web", "app", "platform", "domain", "ip"].includes(e.type)),
    [entities]
  );
  const handleStart = () => {
    if (lockdown) return toast.error("System locked down — scans disabled");
    if (!target) return toast.error("Select a target");
    if (role !== "analyst" && role !== "admin") return;
    const scan = startScan(target, profile);
    logCustody({ entityId: target, action: "SCAN", reason: `Started ${profile} scan` });
    toast.success(`Scan ${scan.id} dispatched`, { description: `${profile.toUpperCase()} profile against ${scan.targetLabel}` });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bug, { className: "h-4 w-4 text-tactical" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-mono text-sm font-semibold", children: "Launch Vulnerability Scan" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-[1fr_180px_auto]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: target, onValueChange: setTarget, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select target…" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "max-h-64", children: targets.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: t.id, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-tactical", children: t.id }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2", children: t.identifier })
          ] }, t.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: profile, onValueChange: (v) => setProfile(v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "passive", children: "Passive — recon only" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "active", children: "Active — probe" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "deep", children: "Deep — auth scan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "fuzz", children: "Fuzz — payload sweep" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleStart, disabled: lockdown, className: "gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-3.5 w-3.5" }),
          "Run Scan"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[10px] font-mono text-muted-foreground", children: role === "admin" ? "Admin: all scan profiles available, including destructive fuzz." : "Analyst: live probes are recorded to the chain-of-custody." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-surface", children: ["Scan ID", "Target", "Profile", "Started", "Status", "Findings", ""].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground", children: h }, h)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        scans.map((s) => {
          const total = s.findings.length;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border hover:bg-accent cursor-pointer", onClick: () => setOpenScan(s), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs text-tactical", children: s.id }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs", children: s.targetLabel }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "font-mono text-[10px] uppercase", children: s.profile }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground", children: new Date(s.startedAt).toLocaleString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: s.status === "running" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 font-mono text-[10px] uppercase text-tactical", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin" }),
              " running"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: cn(
              "font-mono text-[10px] uppercase",
              s.status === "complete" && "border-status-white text-status-white",
              s.status === "failed" && "border-status-black text-status-black"
            ), children: s.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 font-mono text-[10px]", children: [
              s.summary.critical > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded bg-status-black px-1.5 text-status-black-foreground", children: [
                "C",
                s.summary.critical
              ] }),
              s.summary.high > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded bg-status-grey px-1.5 text-status-grey-foreground", children: [
                "H",
                s.summary.high
              ] }),
              s.summary.medium > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded bg-primary px-1.5 text-primary-foreground", children: [
                "M",
                s.summary.medium
              ] }),
              s.summary.low > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded bg-accent px-1.5", children: [
                "L",
                s.summary.low
              ] }),
              s.summary.info > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded bg-muted px-1.5 text-muted-foreground", children: [
                "I",
                s.summary.info
              ] }),
              total === 0 && s.status === "complete" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "clean" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5 text-muted-foreground" }) })
          ] }, s.id);
        }),
        scans.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 7, className: "px-4 py-12 text-center text-sm text-muted-foreground", children: "No scans yet. Launch one above." }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!openScan, onOpenChange: () => setOpenScan(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-w-2xl bg-card", children: openScan && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2 font-mono", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-4 w-4 text-tactical" }),
          openScan.id,
          " · ",
          openScan.targetLabel
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
          openScan.profile.toUpperCase(),
          " profile · started ",
          new Date(openScan.startedAt).toLocaleString(),
          " by ",
          openScan.startedBy
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "max-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        openScan.findings.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border bg-background p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("rounded px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider", severityClasses[f.severity]), children: f.severity }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-tactical", children: f.cwe ?? "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: f.title })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-mono text-xs text-muted-foreground", children: f.evidence }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-tactical", children: "Fix:" }),
            " ",
            f.remediation
          ] })
        ] }, f.id)),
        openScan.findings.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-6 text-center text-sm text-muted-foreground", children: openScan.status === "running" ? "Scan in progress…" : "No vulnerabilities detected." })
      ] }) })
    ] }) }) })
  ] });
}
function ScansPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ScansView, {});
}
export {
  ScansPage as component
};
