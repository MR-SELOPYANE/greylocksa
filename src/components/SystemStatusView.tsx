import { useMemo } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { mockSystemStatus } from "@/lib/mock-data";
import { mockThreats } from "@/lib/security-mock";
import { useAppState } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Database,
  ShieldAlert,
  FolderSearch,
  FolderPlus,
  Bug,
  Activity,
  Loader2,
  TrendingUp,
  MessageSquare,
  Fingerprint,
  Plus,
  Clock,
} from "lucide-react";

export function SystemStatusView() {
  const { entities, cases, scans, custody } = useAppState();
  const navigate = useNavigate();

  const formatDate = (d: string) =>
    new Date(d).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

  const stats = useMemo(() => {
    const byStatus = { black: 0, grey: 0, white: 0 };
    entities.forEach((e) => { byStatus[e.status] += 1; });
    const avgRisk = entities.length
      ? Math.round(entities.reduce((a, e) => a + e.riskScore, 0) / entities.length)
      : 0;
    const running = scans.filter((s) => s.status === "running").length;
    const criticalFindings = scans.reduce(
      (a, s) => a + (s.summary?.critical ?? 0) + (s.summary?.high ?? 0),
      0
    );
    const openCases = cases.filter((c) => c.status !== "closed").length;
    const escalated = cases.filter((c) => c.status === "escalated").length;
    const iocMatches = new Set<string>();
    mockThreats.forEach((t) => t.matchedEntityIds.forEach((id) => iocMatches.add(id)));
    return {
      byStatus,
      avgRisk,
      running,
      criticalFindings,
      openCases,
      escalated,
      iocMatches: iocMatches.size,
      total: entities.length,
    };
  }, [entities, cases, scans]);

  const metrics = [
    { label: "Entities Tracked", value: stats.total, icon: Database, tone: "text-tactical" },
    { label: "Open Cases", value: stats.openCases, sub: `${stats.escalated} escalated`, icon: FolderSearch, tone: "text-tactical" },
    { label: "Scans Running", value: stats.running, sub: `${scans.length} total`, icon: stats.running > 0 ? Loader2 : Bug, tone: stats.running > 0 ? "text-tactical" : "text-muted-foreground", spin: stats.running > 0 },
    { label: "Critical / High", value: stats.criticalFindings, sub: `${stats.iocMatches} IOC matches`, icon: ShieldAlert, tone: "text-status-black" },
  ];

  const statusBars = [
    { key: "black", label: "Black (block)", value: stats.byStatus.black, cls: "bg-status-black" },
    { key: "grey", label: "Grey (review)", value: stats.byStatus.grey, cls: "bg-status-grey" },
    { key: "white", label: "White (clear)", value: stats.byStatus.white, cls: "bg-status-white" },
  ];

  const operational = mockSystemStatus.filter((s) => s.status === "operational").length;

  const priorityBreakdown = useMemo(() => {
    const acc = { critical: 0, high: 0, medium: 0, low: 0 };
    cases.filter((c) => c.status !== "closed").forEach((c) => { acc[c.priority] += 1; });
    return acc;
  }, [cases]);

  const recentActivity = useMemo(() => custody.slice(0, 8), [custody]);

  const quickActions = [
    { label: "Add Target", icon: Plus, onClick: () => { navigate({ to: "/entities" }); setTimeout(() => window.dispatchEvent(new CustomEvent("greylock:open-add-entity")), 80); } },
    { label: "Open Case", icon: FolderPlus, onClick: () => { navigate({ to: "/cases" }); setTimeout(() => window.dispatchEvent(new CustomEvent("greylock:new-case")), 80); } },
    { label: "Ask Sentinel", icon: MessageSquare, onClick: () => navigate({ to: "/sentinel" }) },
    { label: "Chain of Custody", icon: Fingerprint, onClick: () => navigate({ to: "/custody" }) },
  ];

  return (
    <div className="space-y-6">
      {/* Quick actions */}
      <div className="flex flex-wrap gap-2">
        {quickActions.map((a) => (
          <Button key={a.label} variant="outline" size="sm" onClick={a.onClick} className="gap-1.5">
            <a.icon className="h-3.5 w-3.5" /> {a.label}
          </Button>
        ))}
      </div>

      {/* Live metric cards */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <Activity className="h-4 w-4 text-tactical" />
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Operations Overview</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-mono text-3xl font-bold text-card-foreground">{m.value}</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{m.label}</div>
                  {m.sub && <div className="mt-1 font-mono text-[10px] text-muted-foreground/70">{m.sub}</div>}
                </div>
                <m.icon className={cn("h-5 w-5", m.tone, m.spin && "animate-spin")} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Distribution + risk */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-5 lg:col-span-2">
          <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Watchlist Status Distribution</h3>
          <div className="space-y-3">
            {statusBars.map((b) => {
              const pct = stats.total ? Math.round((b.value / stats.total) * 100) : 0;
              return (
                <div key={b.key} className="space-y-1.5">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-foreground">{b.label}</span>
                    <span className="text-muted-foreground">{b.value} · {pct}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-background">
                    <div className={cn("h-full rounded-full transition-all", b.cls)} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-lg border border-border bg-card p-5">
          <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Average Risk</h3>
          <div className="flex flex-1 flex-col items-center justify-center">
            <div
              className={cn(
                "font-mono text-6xl font-bold",
                stats.avgRisk >= 70 ? "text-status-black" : stats.avgRisk >= 45 ? "text-status-grey" : "text-status-white"
              )}
            >
              {stats.avgRisk}
            </div>
            <div className="mt-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              across {stats.total} entities
            </div>
          </div>
        </div>
      </div>

      {/* Service status */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Service Health</h2>
          <span className="font-mono text-[10px] text-muted-foreground">
            {operational}/{mockSystemStatus.length} operational
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {mockSystemStatus.map((s) => (
            <div key={s.service} className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-card-foreground">{s.service}</h3>
                <div className="flex items-center gap-1.5">
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full",
                      s.status === "operational" && "bg-status-white",
                      s.status === "degraded" && "bg-status-grey animate-pulse-glow",
                      s.status === "down" && "bg-status-black animate-pulse-glow"
                    )}
                  />
                  <span
                    className={cn(
                      "font-mono text-[10px] uppercase tracking-wider",
                      s.status === "operational" && "text-status-white",
                      s.status === "degraded" && "text-status-grey",
                      s.status === "down" && "text-status-black"
                    )}
                  >
                    {s.status}
                  </span>
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{s.details}</p>
              <div className="mt-3 flex gap-4 text-[10px] font-mono text-muted-foreground">
                <span>Uptime: {s.uptime}</span>
                <span>Last check: {formatDate(s.lastCheck)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
