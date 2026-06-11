import { mockSystemStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function SystemStatusView() {
  const formatDate = (d: string) =>
    new Date(d).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
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
  );
}
