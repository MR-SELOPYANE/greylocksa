import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useAppState, l as mockThreats, B as Button, c as cn } from "./router-rFz3Bia9.mjs";
import { I as Input } from "./input-CIbZo0CB.mjs";
import { B as Badge } from "./badge-BlsWwPaG.mjs";
import { I as Info, R as Radio, t as Target, f as Shield, S as Search, X, u as ArrowRight } from "../_libs/lucide-react.mjs";
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
const sevColor = {
  critical: "bg-status-black text-status-black-foreground",
  high: "bg-destructive text-destructive-foreground",
  medium: "bg-status-grey text-status-grey-foreground",
  low: "bg-secondary text-secondary-foreground",
  info: "bg-muted text-muted-foreground"
};
const iocColor = {
  ip: "text-tactical",
  domain: "text-primary",
  url: "text-primary",
  hash: "text-muted-foreground",
  cve: "text-destructive",
  email: "text-foreground"
};
const iocExplain = {
  ip: "An attacker-controlled IP address. If one of our targets talks to it, the target is likely compromised.",
  domain: "A malicious hostname — phishing kit, C2, or fraud site. Block at DNS/proxy and warn affected teams.",
  url: "Full URL of an attack page. Use it to test whether links in our scope point at this destination.",
  hash: "A file fingerprint. If this hash shows up in our binaries or attachments, the file is the known-bad sample.",
  cve: "A disclosed vulnerability. Cross-check against the software our targets run; patch or mitigate fast.",
  email: "A sender used in phishing / BEC. Add to mail rules and check if any of our staff replied."
};
function ThreatIntelView() {
  const { entities, updateEntityStatus, logCustody } = useAppState();
  const [feed, setFeed] = reactExports.useState(() => mockThreats);
  const [q, setQ] = reactExports.useState("");
  const [typeFilter, setTypeFilter] = reactExports.useState("all");
  const [selected, setSelected] = reactExports.useState(null);
  const liveMatches = reactExports.useMemo(() => {
    const set = /* @__PURE__ */ new Set();
    feed.forEach((t) => t.matchedEntityIds.forEach((id) => set.add(id)));
    return set.size;
  }, [feed]);
  const filtered = reactExports.useMemo(() => feed.filter((t) => {
    if (typeFilter !== "all" && t.type !== typeFilter) return false;
    if (q && !t.value.toLowerCase().includes(q.toLowerCase()) && !t.description.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }), [feed, q, typeFilter]);
  const refresh = () => {
    const sources = ["AlienVault OTX", "URLhaus", "VirusTotal", "Mandiant Advantage", "Internal Sentinel"];
    const cves = ["CVE-2026-4411", "CVE-2026-5570", "CVE-2026-6610"];
    const newIoc = {
      id: `TI-${Date.now().toString(36).toUpperCase()}`,
      type: "cve",
      value: cves[Math.floor(Math.random() * cves.length)],
      source: sources[Math.floor(Math.random() * sources.length)],
      severity: "high",
      firstSeen: (/* @__PURE__ */ new Date()).toISOString(),
      description: "Newly disclosed vulnerability — auto-correlated against known stack.",
      matchedEntityIds: []
    };
    setFeed((p) => [newIoc, ...p]);
    toast.success(`New IOC ingested: ${newIoc.value}`, { description: `Source: ${newIoc.source}` });
  };
  const promoteMatches = (t) => {
    if (t.matchedEntityIds.length === 0) {
      toast.info("No matching entities in watchlist");
      return;
    }
    t.matchedEntityIds.forEach((id) => {
      updateEntityStatus(id, "black", `IOC match: ${t.value} (${t.source})`);
      logCustody({ entityId: id, action: "STATUS_CHANGE", reason: `Auto-blocked via IOC ${t.id}` });
    });
    toast.warning(`${t.matchedEntityIds.length} targets promoted to BLACK`, { description: "Chain-of-custody updated." });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-md border border-tactical/40 bg-tactical/5 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "mt-0.5 h-4 w-4 text-tactical shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono uppercase tracking-wider text-tactical", children: "What this page does" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1", children: [
          "We continuously pull ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Indicators of Compromise" }),
          " (IOCs) — bad IPs, domains, file hashes, CVEs, phishing emails — from public and private intel feeds. Each indicator is checked against your watchlist of targets. When something matches, the row lights up and one click promotes the affected targets to",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-status-black", children: "BLACK" }),
          ", freezing them and writing the reason into chain-of-custody. Click any row for full context and recommended action."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "IOCs ingested", value: feed.length, icon: Radio, hint: "Total indicators in the live feed." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Targets at risk", value: liveMatches, icon: Target, accent: true, hint: "Targets that match at least one indicator — investigate now." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Critical IOCs", value: feed.filter((f) => f.severity === "critical").length, icon: Shield, hint: "Highest-severity indicators — likely RCE, active C2, or known APT." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Sources", value: new Set(feed.map((f) => f.source)).size, icon: Radio, hint: "Distinct intel providers feeding this view." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[220px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search IOC value or description…", className: "pl-9 bg-surface font-mono text-sm" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", children: ["all", "ip", "domain", "url", "hash", "cve", "email"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: typeFilter === k ? "default" : "outline", onClick: () => setTypeFilter(k), className: "h-7 font-mono text-[10px] uppercase", children: k }, k)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: refresh, className: "ml-auto gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-3.5 w-3.5" }),
        " Pull feed"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-[1fr_360px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-surface", children: ["Indicator", "Type", "Severity", "Source", "Matches", "Action"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground", children: h }, h)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          filtered.map((t) => {
            const isSel = selected?.id === t.id;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: cn("border-b border-border cursor-pointer hover:bg-accent", isSel && "bg-accent"), onClick: () => setSelected(t), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs text-foreground truncate max-w-[260px]", title: t.value, children: t.value }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground truncate max-w-[260px]", children: t.description })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: cn("font-mono text-[10px] uppercase", iocColor[t.type]), children: t.type }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("rounded px-2 py-0.5 font-mono text-[10px] uppercase", sevColor[t.severity]), children: t.severity }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-xs text-muted-foreground", children: t.source }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: t.matchedEntityIds.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 font-mono text-xs text-destructive", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-3 w-3" }),
                " ",
                t.matchedEntityIds.length
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "clean" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "h-7 gap-1.5", onClick: (e) => {
                e.stopPropagation();
                promoteMatches(t);
              }, disabled: t.matchedEntityIds.length === 0, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-3 w-3" }),
                " Block"
              ] }) })
            ] }, t.id);
          }),
          filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "px-4 py-12 text-center text-sm text-muted-foreground", children: "No IOCs match filters." }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "rounded-lg border border-border bg-surface p-4 h-fit lg:sticky lg:top-4", children: !selected ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono uppercase tracking-wider text-tactical", children: "Indicator details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Click any row to see what the indicator is, where it came from, why it matters, and what to do next." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono uppercase tracking-wider text-tactical", children: selected.id }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-mono text-foreground break-all", children: selected.value })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSelected(null), className: "text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: cn("font-mono text-[10px] uppercase", iocColor[selected.type]), children: selected.type }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("rounded px-2 py-0.5 font-mono text-[10px] uppercase", sevColor[selected.severity]), children: selected.severity }),
          selected.mitre && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "font-mono text-[10px] text-primary", children: [
            "MITRE ",
            selected.mitre
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "What is this?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: iocExplain[selected.type] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Why it matters" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: selected.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 rounded border border-border bg-background p-2 font-mono text-[11px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Source" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-foreground", children: selected.source })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "First seen" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-foreground", children: new Date(selected.firstSeen).toLocaleDateString() })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: [
            "Matched targets (",
            selected.matchedEntityIds.length,
            ")"
          ] }),
          selected.matchedEntityIds.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: "No targets on your watchlist match this indicator. Nothing to do yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-1 space-y-1", children: selected.matchedEntityIds.map((id) => {
            const ent = entities.find((e) => e.id === id);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between rounded border border-border bg-background px-2 py-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-[11px]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-tactical", children: id }),
                ent && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-foreground", children: ent.identifier })
              ] }),
              ent && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "font-mono text-[10px] uppercase", children: ent.status })
            ] }, id);
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded border border-tactical/40 bg-tactical/5 p-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-tactical", children: "Recommended action" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: selected.matchedEntityIds.length > 0 ? "Promote all matched targets to BLACK, then open a case and pull related evidence into the vault." : "No live exposure. Keep the indicator in the feed; correlation will fire automatically if a target hits it later." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "mt-2 h-7 gap-1.5 w-full", onClick: () => promoteMatches(selected), disabled: selected.matchedEntityIds.length === 0, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-3 w-3" }),
            " Block ",
            selected.matchedEntityIds.length || "",
            " match",
            selected.matchedEntityIds.length === 1 ? "" : "es",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3 ml-auto" })
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
function Stat({ label, value, icon: Icon, accent, hint }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("rounded-lg border p-3", accent ? "border-tactical/50 bg-tactical/5" : "border-border bg-surface"), title: hint, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("h-3.5 w-3.5", accent ? "text-tactical" : "text-muted-foreground") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("mt-2 font-mono text-2xl font-bold", accent ? "text-tactical" : "text-foreground"), children: value }),
    hint && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[10px] text-muted-foreground leading-snug", children: hint })
  ] });
}
function ThreatsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThreatIntelView, {});
}
export {
  ThreatsPage as component
};
