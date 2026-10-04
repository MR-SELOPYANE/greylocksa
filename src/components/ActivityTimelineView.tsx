import { useMemo, useState } from "react";
import { useAppState } from "@/lib/store";
import { formatDateTime as formatTime } from "@/lib/time";
import { Badge } from "@/components/ui/badge";
import { Fingerprint, Bug, ArrowRightLeft, FolderSearch } from "lucide-react";

type FeedKind = "custody" | "scan" | "status";

interface FeedEvent {
  id: string;
  kind: FeedKind;
  time: string;
  actor: string;
  title: string;
  detail: string;
  tag: string;
}

const KIND_META: Record<FeedKind, { label: string; icon: typeof Fingerprint }> = {
  custody: { label: "Custody", icon: Fingerprint },
  scan: { label: "Scans", icon: Bug },
  status: { label: "Status changes", icon: ArrowRightLeft },
};

export function ActivityTimelineView() {
  const { custody, scans } = useAppState();
  const [filter, setFilter] = useState<"all" | FeedKind>("all");

  const events = useMemo<FeedEvent[]>(() => {
    const custodyEvents: FeedEvent[] = custody.map((c) => ({
      id: `feed-${c.id}`,
      kind: c.action === "STATUS_CHANGE" ? "status" : "custody",
      time: c.timestamp,
      actor: c.actor,
      title: `${c.action.replace("_", " ")} · ${c.entityId}`,
      detail: c.reason,
      tag: c.role.toUpperCase(),
    }));

    const scanEvents: FeedEvent[] = scans.map((s) => {
      const done = s.status === "complete";
      const totals = s.summary;
      const hot = (totals?.critical ?? 0) + (totals?.high ?? 0);
      return {
        id: `feed-${s.id}`,
        kind: "scan",
        time: s.finishedAt ?? s.startedAt,
        actor: s.startedBy,
        title: `${s.profile.toUpperCase()} scan · ${s.targetLabel}`,
        detail: done
          ? `Completed — ${totals.critical} critical, ${totals.high} high, ${totals.medium} medium`
          : `Scan ${s.status}`,
        tag: done ? (hot > 0 ? "FINDINGS" : "CLEAN") : "RUNNING",
      };
    });

    return [...custodyEvents, ...scanEvents].sort(
      (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime(),
    );
  }, [custody, scans]);

  const counts = useMemo(() => {
    const acc: Record<string, number> = { all: events.length, custody: 0, scan: 0, status: 0 };
    events.forEach((e) => {
      acc[e.kind] += 1;
    });
    return acc;
  }, [events]);

  const filtered = filter === "all" ? events : events.filter((e) => e.kind === filter);

  const formatTime = (d: string) =>
    new Date(d).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {(["all", "custody", "scan", "status"] as const).map((k) => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className={`rounded-md border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
              filter === k
                ? "border-tactical bg-tactical/10 text-tactical"
                : "border-border bg-surface text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            {k === "all" ? "All" : KIND_META[k].label}
            <span className="ml-1.5 opacity-60">{counts[k] ?? 0}</span>
          </button>
        ))}
      </div>

      <div className="relative space-y-3 pl-6">
        <span className="absolute left-2 top-1 bottom-1 w-px bg-border" aria-hidden />
        {filtered.map((e) => {
          const Icon = KIND_META[e.kind].icon;
          return (
            <div key={e.id} className="relative rounded-lg border border-border bg-card p-4">
              <span className="absolute -left-[18px] top-5 flex h-4 w-4 items-center justify-center rounded-full border border-border bg-background">
                <Icon className="h-2.5 w-2.5 text-tactical" />
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-card-foreground">{e.title}</span>
                <Badge variant="outline" className="font-mono text-[9px]">
                  {e.tag}
                </Badge>
                <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                  {formatTime(e.time)}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{e.detail}</p>
              <p className="mt-1 font-mono text-[10px] text-tactical">{e.actor}</p>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-border py-16 text-center">
            <FolderSearch className="h-8 w-8 text-muted-foreground/50" />
            <p className="font-mono text-sm text-foreground">No activity in this filter</p>
            <p className="text-xs text-muted-foreground">Switch filters to see other events.</p>
          </div>
        )}
      </div>
    </div>
  );
}
