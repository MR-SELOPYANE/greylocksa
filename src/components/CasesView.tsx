import { mockCases, mockEntities } from "@/lib/mock-data";
import { PriorityBadge, CaseStatusBadge } from "@/components/StatusBadges";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export function CasesView() {
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="space-y-4">
      {mockCases.map((c) => (
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
            <div className="text-right">
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Analyst</span>
              <p className="font-mono text-xs text-tactical">{c.assignedAnalyst}</p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Progress</span>
              <span className="font-mono text-xs text-muted-foreground">{c.progress}%</span>
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
    </div>
  );
}
