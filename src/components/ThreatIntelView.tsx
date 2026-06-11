import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useAppState } from "@/lib/store";
import { mockThreats } from "@/lib/security-mock";
import type { IocType, ScanSeverity, ThreatIoc } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Radio, Search, Target, Shield, Info, ArrowRight, X } from "lucide-react";

const sevColor: Record<ScanSeverity, string> = {
  critical: "bg-status-black text-status-black-foreground",
  high: "bg-destructive text-destructive-foreground",
  medium: "bg-status-grey text-status-grey-foreground",
  low: "bg-secondary text-secondary-foreground",
  info: "bg-muted text-muted-foreground",
};

const iocColor: Record<IocType, string> = {
  ip: "text-tactical",
  domain: "text-primary",
  url: "text-primary",
  hash: "text-muted-foreground",
  cve: "text-destructive",
  email: "text-foreground",
};

const iocExplain: Record<IocType, string> = {
  ip: "An attacker-controlled IP address. If one of our targets talks to it, the target is likely compromised.",
  domain: "A malicious hostname — phishing kit, C2, or fraud site. Block at DNS/proxy and warn affected teams.",
  url: "Full URL of an attack page. Use it to test whether links in our scope point at this destination.",
  hash: "A file fingerprint. If this hash shows up in our binaries or attachments, the file is the known-bad sample.",
  cve: "A disclosed vulnerability. Cross-check against the software our targets run; patch or mitigate fast.",
  email: "A sender used in phishing / BEC. Add to mail rules and check if any of our staff replied.",
};

export function ThreatIntelView() {
  const { entities, updateEntityStatus, logCustody } = useAppState();
  const [feed, setFeed] = useState<ThreatIoc[]>(() => mockThreats);
  const [q, setQ] = useState("");
  const [typeFilter, setTypeFilter] = useState<IocType | "all">("all");
  const [selected, setSelected] = useState<ThreatIoc | null>(null);

  const liveMatches = useMemo(() => {
    const set = new Set<string>();
    feed.forEach((t) => t.matchedEntityIds.forEach((id) => set.add(id)));
    return set.size;
  }, [feed]);

  const filtered = useMemo(() => feed.filter((t) => {
    if (typeFilter !== "all" && t.type !== typeFilter) return false;
    if (q && !t.value.toLowerCase().includes(q.toLowerCase()) && !t.description.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }), [feed, q, typeFilter]);

  const refresh = () => {
    const sources = ["AlienVault OTX", "URLhaus", "VirusTotal", "Mandiant Advantage", "Internal Sentinel"];
    const cves = ["CVE-2026-4411", "CVE-2026-5570", "CVE-2026-6610"];
    const newIoc: ThreatIoc = {
      id: `TI-${Date.now().toString(36).toUpperCase()}`,
      type: "cve",
      value: cves[Math.floor(Math.random() * cves.length)],
      source: sources[Math.floor(Math.random() * sources.length)],
      severity: "high",
      firstSeen: new Date().toISOString(),
      description: "Newly disclosed vulnerability — auto-correlated against known stack.",
      matchedEntityIds: [],
    };
    setFeed((p) => [newIoc, ...p]);
    toast.success(`New IOC ingested: ${newIoc.value}`, { description: `Source: ${newIoc.source}` });
  };

  const promoteMatches = (t: ThreatIoc) => {
    if (t.matchedEntityIds.length === 0) { toast.info("No matching entities in watchlist"); return; }
    t.matchedEntityIds.forEach((id) => {
      updateEntityStatus(id, "black", `IOC match: ${t.value} (${t.source})`);
      logCustody({ entityId: id, action: "STATUS_CHANGE", reason: `Auto-blocked via IOC ${t.id}` });
    });
    toast.warning(`${t.matchedEntityIds.length} targets promoted to BLACK`, { description: "Chain-of-custody updated." });
  };

  return (
    <div className="space-y-4">
      {/* Explainer */}
      <div className="flex items-start gap-3 rounded-md border border-tactical/40 bg-tactical/5 p-4">
        <Info className="mt-0.5 h-4 w-4 text-tactical shrink-0" />
        <div className="text-xs text-muted-foreground">
          <p className="font-mono uppercase tracking-wider text-tactical">What this page does</p>
          <p className="mt-1">
            We continuously pull <b>Indicators of Compromise</b> (IOCs) — bad IPs, domains, file hashes, CVEs, phishing
            emails — from public and private intel feeds. Each indicator is checked against your watchlist of targets.
            When something matches, the row lights up and one click promotes the affected targets to{" "}
            <span className="text-status-black">BLACK</span>, freezing them and writing the reason into chain-of-custody.
            Click any row for full context and recommended action.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="IOCs ingested" value={feed.length} icon={Radio} hint="Total indicators in the live feed." />
        <Stat label="Targets at risk" value={liveMatches} icon={Target} accent hint="Targets that match at least one indicator — investigate now." />
        <Stat label="Critical IOCs" value={feed.filter((f) => f.severity === "critical").length} icon={Shield} hint="Highest-severity indicators — likely RCE, active C2, or known APT." />
        <Stat label="Sources" value={new Set(feed.map((f) => f.source)).size} icon={Radio} hint="Distinct intel providers feeding this view." />
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search IOC value or description…" className="pl-9 bg-surface font-mono text-sm" />
        </div>
        <div className="flex items-center gap-1">
          {(["all", "ip", "domain", "url", "hash", "cve", "email"] as const).map((k) => (
            <Button key={k} size="sm" variant={typeFilter === k ? "default" : "outline"} onClick={() => setTypeFilter(k)} className="h-7 font-mono text-[10px] uppercase">{k}</Button>
          ))}
        </div>
        <Button size="sm" onClick={refresh} className="ml-auto gap-1.5"><Radio className="h-3.5 w-3.5" /> Pull feed</Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                {["Indicator", "Type", "Severity", "Source", "Matches", "Action"].map((h) => (
                  <th key={h} className="px-3 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => {
                const isSel = selected?.id === t.id;
                return (
                  <tr key={t.id} className={cn("border-b border-border cursor-pointer hover:bg-accent", isSel && "bg-accent")} onClick={() => setSelected(t)}>
                    <td className="px-3 py-3">
                      <div className="font-mono text-xs text-foreground truncate max-w-[260px]" title={t.value}>{t.value}</div>
                      <div className="text-[10px] text-muted-foreground truncate max-w-[260px]">{t.description}</div>
                    </td>
                    <td className="px-3 py-3"><Badge variant="outline" className={cn("font-mono text-[10px] uppercase", iocColor[t.type])}>{t.type}</Badge></td>
                    <td className="px-3 py-3"><span className={cn("rounded px-2 py-0.5 font-mono text-[10px] uppercase", sevColor[t.severity])}>{t.severity}</span></td>
                    <td className="px-3 py-3 text-xs text-muted-foreground">{t.source}</td>
                    <td className="px-3 py-3">
                      {t.matchedEntityIds.length > 0 ? (
                        <span className="inline-flex items-center gap-1 font-mono text-xs text-destructive">
                          <Target className="h-3 w-3" /> {t.matchedEntityIds.length}
                        </span>
                      ) : (<span className="text-xs text-muted-foreground">clean</span>)}
                    </td>
                    <td className="px-3 py-3">
                      <Button size="sm" variant="outline" className="h-7 gap-1.5" onClick={(e) => { e.stopPropagation(); promoteMatches(t); }} disabled={t.matchedEntityIds.length === 0}>
                        <Shield className="h-3 w-3" /> Block
                      </Button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-sm text-muted-foreground">No IOCs match filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Detail panel */}
        <aside className="rounded-lg border border-border bg-surface p-4 h-fit lg:sticky lg:top-4">
          {!selected ? (
            <div className="space-y-2 text-xs text-muted-foreground">
              <p className="font-mono uppercase tracking-wider text-tactical">Indicator details</p>
              <p>Click any row to see what the indicator is, where it came from, why it matters, and what to do next.</p>
            </div>
          ) : (
            <div className="space-y-3 text-xs">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-mono uppercase tracking-wider text-tactical">{selected.id}</p>
                  <p className="mt-1 font-mono text-foreground break-all">{selected.value}</p>
                </div>
                <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                <Badge variant="outline" className={cn("font-mono text-[10px] uppercase", iocColor[selected.type])}>{selected.type}</Badge>
                <span className={cn("rounded px-2 py-0.5 font-mono text-[10px] uppercase", sevColor[selected.severity])}>{selected.severity}</span>
                {selected.mitre && <Badge variant="outline" className="font-mono text-[10px] text-primary">MITRE {selected.mitre}</Badge>}
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">What is this?</p>
                <p className="mt-1 text-muted-foreground">{iocExplain[selected.type]}</p>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Why it matters</p>
                <p className="mt-1 text-muted-foreground">{selected.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 rounded border border-border bg-background p-2 font-mono text-[11px]">
                <div><span className="text-muted-foreground">Source</span><div className="text-foreground">{selected.source}</div></div>
                <div><span className="text-muted-foreground">First seen</span><div className="text-foreground">{new Date(selected.firstSeen).toLocaleDateString()}</div></div>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Matched targets ({selected.matchedEntityIds.length})</p>
                {selected.matchedEntityIds.length === 0 ? (
                  <p className="mt-1 text-muted-foreground">No targets on your watchlist match this indicator. Nothing to do yet.</p>
                ) : (
                  <ul className="mt-1 space-y-1">
                    {selected.matchedEntityIds.map((id) => {
                      const ent = entities.find((e) => e.id === id);
                      return (
                        <li key={id} className="flex items-center justify-between rounded border border-border bg-background px-2 py-1.5">
                          <div className="font-mono text-[11px]">
                            <span className="text-tactical">{id}</span>
                            {ent && <span className="ml-2 text-foreground">{ent.identifier}</span>}
                          </div>
                          {ent && <Badge variant="outline" className="font-mono text-[10px] uppercase">{ent.status}</Badge>}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              <div className="rounded border border-tactical/40 bg-tactical/5 p-2">
                <p className="font-mono text-[10px] uppercase tracking-widest text-tactical">Recommended action</p>
                <p className="mt-1 text-muted-foreground">
                  {selected.matchedEntityIds.length > 0
                    ? "Promote all matched targets to BLACK, then open a case and pull related evidence into the vault."
                    : "No live exposure. Keep the indicator in the feed; correlation will fire automatically if a target hits it later."}
                </p>
                <Button size="sm" className="mt-2 h-7 gap-1.5 w-full" onClick={() => promoteMatches(selected)} disabled={selected.matchedEntityIds.length === 0}>
                  <Shield className="h-3 w-3" /> Block {selected.matchedEntityIds.length || ""} match{selected.matchedEntityIds.length === 1 ? "" : "es"}
                  <ArrowRight className="h-3 w-3 ml-auto" />
                </Button>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function Stat({ label, value, icon: Icon, accent, hint }: { label: string; value: number; icon: React.ComponentType<{ className?: string }>; accent?: boolean; hint?: string }) {
  return (
    <div className={cn("rounded-lg border p-3", accent ? "border-tactical/50 bg-tactical/5" : "border-border bg-surface")} title={hint}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
        <Icon className={cn("h-3.5 w-3.5", accent ? "text-tactical" : "text-muted-foreground")} />
      </div>
      <div className={cn("mt-2 font-mono text-2xl font-bold", accent ? "text-tactical" : "text-foreground")}>{value}</div>
      {hint && <p className="mt-1 text-[10px] text-muted-foreground leading-snug">{hint}</p>}
    </div>
  );
}
