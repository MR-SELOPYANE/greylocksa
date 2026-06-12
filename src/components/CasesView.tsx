import { useMemo, useState } from "react";
import { toast } from "sonner";
import { mockEntities } from "@/lib/mock-data";
import { useAppState } from "@/lib/store";
import type { CaseStatus } from "@/lib/types";
import { PriorityBadge, CaseStatusBadge } from "@/components/StatusBadges";
import { NewCaseDialog } from "@/components/NewCaseDialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FolderSearch, Minus, Plus } from "lucide-react";

const STATUS_OPTIONS: { value: CaseStatus; label: string }[] = [
  { value: "open", label: "Open" },
  { value: "in_progress", label: "In Progress" },
  { value: "escalated", label: "Escalated" },
  { value: "closed", label: "Closed" },
];

export function CasesView() {
  const { cases, updateCaseStatus, updateCaseProgress } = useAppState();
  const [filter, setFilter] = useState<string>("all");
  const [newOpen, setNewOpen] = useState(false);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const counts = useMemo(() => {
    const acc: Record<string, number> = { all: cases.length, open: 0, in_progress: 0, escalated: 0, closed: 0 };
    cases.forEach((c) => { acc[c.status] += 1; });
    return acc;
  }, [cases]);

  const filtered = useMemo(
    () => (filter === "all" ? cases : cases.filter((c) => c.status === filter)),
    [cases, filter]
  );

  const handleStatus = (id: string, status: CaseStatus) => {
    updateCaseStatus(id, status);
    toast.success(`${id} → ${status.replace("_", " ").toUpperCase()}`, {
      description: "Change written to chain-of-custody.",
    });
  };

  const nudgeProgress = (id: string, current: number, delta: number) => {
    updateCaseProgress(id, current + delta);
  };

  return (
    <div className="space-y-4">
      {/* Status filter chips + new case */}
      <div className="flex flex-wrap items-center gap-2">
        {[{ value: "all", label: "All" }, ...STATUS_OPTIONS].map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={`rounded-md border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
              filter === opt.value
                ? "border-tactical bg-tactical/10 text-tactical"
                : "border-border bg-surface text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            {opt.label}
            <span className="ml-1.5 opacity-60">{counts[opt.value] ?? 0}</span>
          </button>
        ))}
        <Button size="sm" onClick={() => setNewOpen(true)} className="ml-auto gap-1.5">
          <Plus className="h-3.5 w-3.5" />
          Open Case
        </Button>
      </div>



      {filtered.map((c) => (
        <div key={c.id} className="rounded-lg border border-border bg-card p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-tactical">{c.id}</span>
                <PriorityBadge priority={c.priority} />
                <CaseStatusBadge status={c.status} />
              </div>
              <h3 className="text-sm font-semibold text-card-foreground">{c.title}</h3>
              <p className="text-xs text-muted-foreground">{c.description}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Analyst</span>
                <p className="font-mono text-xs text-tactical">{c.assignedAnalyst}</p>
              </div>
              <Select value={c.status} onValueChange={(v) => handleStatus(c.id, v as CaseStatus)}>
                <SelectTrigger className="h-7 w-36 bg-secondary text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Progress</span>
              <div className="flex items-center gap-1.5">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => nudgeProgress(c.id, c.progress, -10)}
                  disabled={c.progress <= 0}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-10 text-center font-mono text-xs text-muted-foreground">{c.progress}%</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => nudgeProgress(c.id, c.progress, 10)}
                  disabled={c.progress >= 100}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <Progress value={c.progress} className="h-1.5" />
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {c.linkedEntityIds.map((eid) => {
              const entity = mockEntities.find((e) => e.id === eid);
              return (
                <Badge key={eid} variant="outline" className="font-mono text-[10px]">
                  {eid}{entity ? `: ${entity.identifier.slice(0, 20)}` : ""}
                </Badge>
              );
            })}
          </div>

          <div className="mt-3 flex gap-4 text-[10px] font-mono text-muted-foreground">
            <span>Created: {formatDate(c.createdAt)}</span>
            <span>Updated: {formatDate(c.updatedAt)}</span>
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-border py-16 text-center">
          <FolderSearch className="h-8 w-8 text-muted-foreground/50" />
          <p className="font-mono text-sm text-foreground">No cases in this status</p>
          <p className="text-xs text-muted-foreground">Switch filters to see other cases.</p>
        </div>
      )}
    </div>
  );
}
