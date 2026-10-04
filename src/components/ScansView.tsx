import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useAppState } from "@/lib/store";
import type { Scan, ScanSeverity, PassiveIntelReport } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Bug,
  Play,
  Loader2,
  ShieldAlert,
  ChevronRight,
  Globe,
  Server,
  FileSearch,
  Radar,
} from "lucide-react";

const severityClasses: Record<ScanSeverity, string> = {
  critical: "bg-status-black text-status-black-foreground",
  high: "bg-status-grey text-status-grey-foreground",
  medium: "bg-primary text-primary-foreground",
  low: "bg-accent text-accent-foreground",
  info: "bg-muted text-muted-foreground",
};

export function ScansView() {
  const {
    entities,
    scans,
    startScan,
    runPassiveScan,
    isPassiveEligible,
    role,
    lockdown,
    logCustody,
  } = useAppState();
  const [target, setTarget] = useState<string>("");
  const [profile, setProfile] = useState<Scan["profile"]>("passive");
  const [openScanId, setOpenScanId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Keep the dialog bound to live store data so a running scan fills in.
  const openScan = useMemo(
    () => scans.find((s) => s.id === openScanId) ?? null,
    [scans, openScanId],
  );

  const targets = useMemo(
    () => entities.filter((e) => ["web", "app", "platform", "domain", "ip"].includes(e.type)),
    [entities],
  );

  const selected = targets.find((t) => t.id === target);
  const passiveOk = selected ? isPassiveEligible(selected) : false;

  const handleStart = async () => {
    if (lockdown) return toast.error("System locked down — scans disabled");
    if (!target) return toast.error("Select a target");
    if (role !== "analyst" && role !== "admin") return;

    if (profile === "passive") {
      if (!passiveOk) {
        return toast.error("Target is not a resolvable domain or IP", {
          description: "Passive intel needs a hostname or IP address.",
        });
      }
      setBusy(true);
      toast.info("Passive intel sweep dispatched", {
        description: "Querying WHOIS, DNS, HTTP, crt.sh, Shodan and VirusTotal…",
      });
      const scan = await runPassiveScan(target);
      setBusy(false);
      if (!scan) return toast.error("Could not start sweep");
      if (scan.status === "failed") {
        toast.error(`Sweep ${scan.id} failed`, { description: scan.error });
      } else {
        toast.success(`Sweep ${scan.id} complete`, {
          description: `${scan.findings.length} finding(s) on ${scan.targetLabel}`,
        });
        setOpenScanId(scan.id);
      }
      return;
    }

    const scan = startScan(target, profile);
    logCustody({ entityId: target, action: "SCAN", reason: `Started ${profile} scan` });
    toast.success(`Scan ${scan.id} dispatched`, {
      description: `${profile.toUpperCase()} profile against ${scan.targetLabel}`,
    });
  };

  return (
    <div className="space-y-4">
      {/* Launcher */}
      <div className="rounded-lg border border-border bg-card p-5">
        <div className="mb-3 flex items-center gap-2">
          <Bug className="h-4 w-4 text-tactical" />
          <h2 className="font-mono text-sm font-semibold">Launch Vulnerability Scan</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-[1fr_180px_auto]">
          <Select value={target} onValueChange={setTarget}>
            <SelectTrigger className="bg-secondary">
              <SelectValue placeholder="Select target…" />
            </SelectTrigger>
            <SelectContent className="max-h-64">
              {targets.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  <span className="font-mono text-xs text-tactical">{t.id}</span>
                  <span className="ml-2">{t.identifier}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={profile} onValueChange={(v) => setProfile(v as Scan["profile"])}>
            <SelectTrigger className="bg-secondary">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="passive">Passive — LIVE OSINT</SelectItem>
              <SelectItem value="active">Active — probe (sim)</SelectItem>
              <SelectItem value="deep">Deep — auth scan (sim)</SelectItem>
              <SelectItem value="fuzz">Fuzz — payload sweep (sim)</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleStart} disabled={lockdown || busy} className="gap-1.5">
            {busy ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Play className="h-3.5 w-3.5" />
            )}
            {busy ? "Sweeping…" : "Run Scan"}
          </Button>
        </div>
        {profile === "passive" ? (
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <Globe className="h-3 w-3 text-tactical" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-tactical">
              Live sources
            </span>
            {["RDAP/WHOIS", "DNS", "HTTP headers", "crt.sh", "Shodan", "VirusTotal"].map((s) => (
              <Badge key={s} variant="outline" className="font-mono text-[9px]">
                {s}
              </Badge>
            ))}
            {selected && !passiveOk && (
              <span className="ml-1 font-mono text-[10px] text-status-grey">
                — {selected.identifier} is not a resolvable host
              </span>
            )}
          </div>
        ) : (
          <p className="mt-2 text-[10px] font-mono text-muted-foreground">
            Simulated profile. Only <span className="text-tactical">Passive</span> queries
            real-world intelligence sources.
          </p>
        )}
        <p className="mt-2 text-[10px] font-mono text-muted-foreground">
          {role === "admin"
            ? "Admin: all scan profiles available, including destructive fuzz."
            : "Analyst: live probes are recorded to the chain-of-custody."}
        </p>
      </div>

      {/* Scan list */}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface">
              {["Scan ID", "Target", "Profile", "Started", "Status", "Findings", ""].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {scans.map((s) => {
              const total = s.findings.length;
              return (
                <tr
                  key={s.id}
                  className="border-b border-border hover:bg-accent cursor-pointer"
                  onClick={() => setOpenScanId(s.id)}
                >
                  <td className="px-4 py-3 font-mono text-xs text-tactical">{s.id}</td>
                  <td className="px-4 py-3 font-mono text-xs">{s.targetLabel}</td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="font-mono text-[10px] uppercase">
                      {s.profile}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {new Date(s.startedAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    {s.status === "running" ? (
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase text-tactical">
                        <Loader2 className="h-3 w-3 animate-spin" /> running
                      </span>
                    ) : (
                      <Badge
                        variant="outline"
                        className={cn(
                          "font-mono text-[10px] uppercase",
                          s.status === "complete" && "border-status-white text-status-white",
                          s.status === "failed" && "border-status-black text-status-black",
                        )}
                      >
                        {s.status}
                      </Badge>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 font-mono text-[10px]">
                      {s.summary.critical > 0 && (
                        <span className="rounded bg-status-black px-1.5 text-status-black-foreground">
                          C{s.summary.critical}
                        </span>
                      )}
                      {s.summary.high > 0 && (
                        <span className="rounded bg-status-grey px-1.5 text-status-grey-foreground">
                          H{s.summary.high}
                        </span>
                      )}
                      {s.summary.medium > 0 && (
                        <span className="rounded bg-primary px-1.5 text-primary-foreground">
                          M{s.summary.medium}
                        </span>
                      )}
                      {s.summary.low > 0 && (
                        <span className="rounded bg-accent px-1.5">L{s.summary.low}</span>
                      )}
                      {s.summary.info > 0 && (
                        <span className="rounded bg-muted px-1.5 text-muted-foreground">
                          I{s.summary.info}
                        </span>
                      )}
                      {total === 0 && s.status === "complete" && (
                        <span className="text-muted-foreground">clean</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </td>
                </tr>
              );
            })}
            {scans.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-sm text-muted-foreground">
                  No scans yet. Launch one above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={!!openScan} onOpenChange={() => setOpenScanId(null)}>
        <DialogContent className="max-w-2xl bg-card">
          {openScan && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 font-mono">
                  <ShieldAlert className="h-4 w-4 text-tactical" />
                  {openScan.id} · {openScan.targetLabel}
                </DialogTitle>
                <DialogDescription>
                  {openScan.profile.toUpperCase()} profile · started{" "}
                  {new Date(openScan.startedAt).toLocaleString()} by {openScan.startedBy}
                  {openScan.intel && " · live OSINT"}
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-[60vh]">
                <div className="space-y-3">
                  {openScan.error && (
                    <div className="rounded-md border border-status-black bg-status-black/10 p-3 font-mono text-xs text-status-black">
                      {openScan.error}
                    </div>
                  )}
                  {openScan.intel && <IntelPanel report={openScan.intel} />}
                  {openScan.findings.map((f) => (
                    <div key={f.id} className="rounded-md border border-border bg-background p-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "rounded px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                            severityClasses[f.severity],
                          )}
                        >
                          {f.severity}
                        </span>
                        <span className="font-mono text-xs text-tactical">{f.cwe ?? "—"}</span>
                        <span className="text-sm font-semibold">{f.title}</span>
                      </div>
                      <p className="mt-2 font-mono text-xs text-muted-foreground">{f.evidence}</p>
                      <p className="mt-2 text-xs">
                        <span className="text-tactical">Fix:</span> {f.remediation}
                      </p>
                    </div>
                  ))}
                  {openScan.findings.length === 0 && (
                    <p className="py-6 text-center text-sm text-muted-foreground">
                      {openScan.status === "running"
                        ? "Scan in progress…"
                        : "No vulnerabilities detected."}
                    </p>
                  )}
                </div>
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Live OSINT report renderer
// ---------------------------------------------------------------------------

const sourceTone: Record<string, string> = {
  ok: "border-status-white text-status-white",
  failed: "border-status-black text-status-black",
  skipped: "border-border text-muted-foreground",
  "no-key": "border-status-grey text-status-grey",
  "no-data": "border-border text-muted-foreground",
};

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  if (value === null || value === undefined || value === "") return null;
  return (
    <div className="flex gap-3 py-1">
      <span className="w-32 shrink-0 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <span className="min-w-0 flex-1 break-words font-mono text-xs">{value}</span>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Globe;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-md border border-border bg-background p-3">
      <div className="mb-2 flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5 text-tactical" />
        <h4 className="font-mono text-[11px] font-semibold uppercase tracking-wider">{title}</h4>
      </div>
      {children}
    </div>
  );
}

function IntelPanel({ report }: { report: PassiveIntelReport }) {
  const vt = report.virustotal;
  const sh = report.shodan;
  return (
    <div className="space-y-3">
      {/* Source status strip */}
      <div className="flex flex-wrap items-center gap-1.5">
        <Radar className="h-3.5 w-3.5 text-tactical" />
        {Object.entries(report.sources).map(([k, v]) => (
          <Badge
            key={k}
            variant="outline"
            className={cn("font-mono text-[9px] uppercase", sourceTone[v])}
          >
            {k} · {v}
          </Badge>
        ))}
      </div>

      <Section icon={Globe} title={`Target — ${report.target}`}>
        <Row label="Kind" value={report.isIp ? "IP address" : "Domain"} />
        <Row label="Swept" value={new Date(report.finishedAt).toLocaleString()} />
      </Section>

      {report.whois && (
        <Section icon={FileSearch} title="Registration (RDAP / WHOIS)">
          <Row label="Registrar" value={report.whois.registrar} />
          <Row label="Created" value={report.whois.created} />
          <Row label="Updated" value={report.whois.updated} />
          <Row label="Expires" value={report.whois.expires} />
          <Row label="Status" value={report.whois.status.join(", ")} />
          <Row label="Nameservers" value={report.whois.nameservers.join(", ")} />
        </Section>
      )}

      {report.dns && Object.keys(report.dns).length > 0 && (
        <Section icon={Server} title="DNS records">
          {Object.entries(report.dns).map(([type, vals]) => (
            <Row key={type} label={type} value={vals.join("  ·  ")} />
          ))}
        </Section>
      )}

      {report.http && (
        <Section
          icon={Globe}
          title={`HTTP response — ${report.http.scheme.toUpperCase()} ${report.http.status}`}
        >
          {Object.entries(report.http.headers)
            .slice(0, 24)
            .map(([k, v]) => (
              <Row key={k} label={k} value={v.length > 220 ? `${v.slice(0, 220)}…` : v} />
            ))}
        </Section>
      )}

      {vt && (
        <Section icon={ShieldAlert} title="VirusTotal reputation">
          <Row
            label="Verdicts"
            value={
              <span className="inline-flex flex-wrap gap-1.5">
                <span className="rounded bg-status-black px-1.5 text-status-black-foreground">
                  malicious {vt.malicious}
                </span>
                <span className="rounded bg-status-grey px-1.5 text-status-grey-foreground">
                  suspicious {vt.suspicious}
                </span>
                <span className="rounded bg-status-white px-1.5 text-status-white-foreground">
                  harmless {vt.harmless}
                </span>
                <span className="rounded bg-muted px-1.5 text-muted-foreground">
                  undetected {vt.undetected}
                </span>
              </span>
            }
          />
          <Row label="Reputation" value={String(vt.reputation)} />
          <Row label="AS owner" value={vt.asOwner} />
          <Row label="Country" value={vt.country} />
          <Row
            label="Last analysis"
            value={vt.lastAnalysisDate ? new Date(vt.lastAnalysisDate).toLocaleString() : null}
          />
          <Row
            label="Categories"
            value={Object.values(vt.categories ?? {})
              .slice(0, 6)
              .join(", ")}
          />
        </Section>
      )}

      {sh && (
        <Section icon={Radar} title="Shodan exposure">
          <Row label="Org" value={sh.org} />
          <Row label="ISP" value={sh.isp} />
          <Row label="Country" value={sh.country} />
          <Row label="OS" value={sh.os} />
          <Row label="Open ports" value={Array.isArray(sh.ports) ? sh.ports.join(", ") : null} />
          <Row
            label="Hostnames"
            value={Array.isArray(sh.hostnames) ? sh.hostnames.join(", ") : null}
          />
          <Row label="CVEs" value={Array.isArray(sh.vulns) ? sh.vulns.join(", ") : null} />
          <Row
            label="Subdomains"
            value={typeof sh.subdomainCount === "number" ? String(sh.subdomainCount) : null}
          />
          <Row
            label="Tags"
            value={Array.isArray(sh.tags) && sh.tags.length ? sh.tags.join(", ") : null}
          />
        </Section>
      )}

      {report.subdomains && (
        <Section
          icon={FileSearch}
          title={`Certificate transparency — ${report.subdomains.count} name(s)`}
        >
          <div className="flex flex-wrap gap-1">
            {report.subdomains.sample.map((s) => (
              <Badge key={s} variant="outline" className="font-mono text-[9px]">
                {s}
              </Badge>
            ))}
            {report.subdomains.count > report.subdomains.sample.length && (
              <Badge variant="outline" className="font-mono text-[9px] text-muted-foreground">
                +{report.subdomains.count - report.subdomains.sample.length} more
              </Badge>
            )}
          </div>
        </Section>
      )}
    </div>
  );
}
