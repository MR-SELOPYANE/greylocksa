import { useMemo, useState } from "react";
import { toast } from "sonner";
import { mockSessions } from "@/lib/security-mock";
import { deriveSessions } from "@/lib/derive";
import type { AnomalyKind } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Activity, Plane, Moon, Smartphone, Globe, Zap, ShieldOff } from "lucide-react";
import { useAppState } from "@/lib/store";

const anomalyMeta: Record<AnomalyKind, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
  impossible_travel: { label: "Impossible travel", icon: Plane },
  off_hours: { label: "Off-hours access", icon: Moon },
  new_device: { label: "New device", icon: Smartphone },
  tor_exit: { label: "Tor exit node", icon: Globe },
  burst_export: { label: "Burst export", icon: Zap },
};

export function SessionsView() {
  const { role, custody, logCustody } = useAppState();
  const [killed, setKilled] = useState<string[]>([]);
  const [showSimulated, setShowSimulated] = useState(false);

  // Real sessions are reconstructed from LOGIN/LOGOUT and activity in the custody log.
  const real = useMemo(() => deriveSessions(custody), [custody]);
  const sessions = useMemo(() => {
    const base = showSimulated ? [...real, ...mockSessions] : real;
    return base.map((s) => killed.includes(s.id) ? { ...s, active: false } : s);
  }, [real, showSimulated, killed]);

  if (role !== "admin") {
    return (
      <div className="rounded-lg border border-border bg-surface p-8 text-center">
        <ShieldOff className="mx-auto h-8 w-8 text-muted-foreground" />
        <p className="mt-3 font-mono text-sm text-foreground">Admin clearance required</p>
        <p className="mt-1 text-xs text-muted-foreground">Switch to Admin role to monitor active sessions.</p>
      </div>
    );
  }

  const kill = (id: string) => {
    setKilled((prev) => [...prev, id]);
    logCustody({ entityId: "SESSION", action: "STATUS_CHANGE", reason: `Session ${id} force-terminated by admin` });
    toast.warning(`Session ${id} terminated`, { description: "Forced logout dispatched. Logged to chain-of-custody." });
  };

  const active = sessions.filter((s) => s.active).length;
  const highRisk = sessions.filter((s) => s.riskScore >= 60).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Activity className="h-4 w-4 text-tactical" />
        <h2 className="font-mono text-sm uppercase tracking-widest text-foreground">Session monitor</h2>
        <Badge variant="outline" className="font-mono text-[10px]">{real.length} real</Badge>
        <Button size="sm" variant={showSimulated ? "default" : "outline"} className="ml-auto h-7 font-mono text-[10px] uppercase" onClick={() => setShowSimulated((v) => !v)}>
          {showSimulated ? "Hide" : "Show"} simulated
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="Active sessions" value={active} accent />
        <Stat label="High-risk" value={highRisk} danger={highRisk > 0} />
        <Stat label="Anomalies flagged" value={sessions.reduce((a, s) => a + s.anomalies.length, 0)} />
        <Stat label="Total tracked" value={sessions.length} />
      </div>

      {sessions.length === 0 && (
        <p className="rounded-lg border border-border bg-surface p-6 text-center text-xs text-muted-foreground">
          No sessions recorded yet. Sign out and back in to record one, or show simulated data.
        </p>
      )}

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface">
              {["User", "Role", "IP", "Country", "Device", "Started", "Last activity", "Anomalies", "Risk", ""].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sessions.map((s) => (
              <tr key={s.id} className={cn("border-b border-border hover:bg-accent", !s.active && "opacity-50", s.riskScore >= 80 && "bg-destructive/5")}>
                <td className="px-4 py-3 font-mono text-xs text-tactical">{s.user}</td>
                <td className="px-4 py-3"><Badge variant="outline" className="font-mono text-[10px] uppercase">{s.role}</Badge></td>
                <td className="px-4 py-3 font-mono text-xs">{s.ip}</td>
                <td className="px-4 py-3 font-mono text-xs">{s.country}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{s.device}</td>
                <td className="px-4 py-3 font-mono text-[10px] text-muted-foreground whitespace-nowrap">{new Date(s.startedAt).toLocaleString()}</td>
                <td className="px-4 py-3 font-mono text-[10px] text-muted-foreground whitespace-nowrap">{new Date(s.lastActivity).toLocaleString()}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {s.anomalies.map((a) => {
                      const meta = anomalyMeta[a];
                      const Icon = meta.icon;
                      return (
                        <span key={a} className="inline-flex items-center gap-1 rounded bg-destructive/10 px-1.5 py-0.5 font-mono text-[10px] text-destructive">
                          <Icon className="h-2.5 w-2.5" /> {meta.label}
                        </span>
                      );
                    })}
                    {s.anomalies.length === 0 && <span className="text-xs text-muted-foreground">—</span>}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={cn("font-mono text-xs font-bold",
                    s.riskScore >= 80 ? "text-destructive" :
                    s.riskScore >= 50 ? "text-status-grey" :
                    "text-status-white"
                  )}>{s.riskScore}</span>
                </td>
                <td className="px-4 py-3">
                  {s.active && (
                    <Button size="sm" variant="outline" className="h-7 gap-1.5 text-destructive hover:text-destructive" onClick={() => kill(s.id)}>
                      <ShieldOff className="h-3 w-3" /> Kill
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-start gap-3 rounded-md border border-border bg-surface p-4">
        <Activity className="mt-0.5 h-4 w-4 text-tactical" />
        <div className="text-xs text-muted-foreground">
          <p className="font-mono uppercase tracking-wider text-tactical">Anomaly engine</p>
          <p className="mt-1">
            Sessions are scored on geo-velocity, hour-of-day, device fingerprint, exit-node reputation, and export volume.
            Scores ≥ 60 raise an alert; ≥ 80 auto-quarantine the session pending admin review.
          </p>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, accent, danger }: { label: string; value: number; accent?: boolean; danger?: boolean }) {
  return (
    <div className={cn("rounded-lg border p-3",
      danger ? "border-destructive/50 bg-destructive/5" :
      accent ? "border-tactical/50 bg-tactical/5" :
      "border-border bg-surface"
    )}>
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={cn("mt-2 font-mono text-2xl font-bold",
        danger ? "text-destructive" : accent ? "text-tactical" : "text-foreground"
      )}>{value}</div>
    </div>
  );
}
