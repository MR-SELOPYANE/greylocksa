import { Badge } from "@/components/ui/badge";
import type { EntityStatus, EntityType } from "@/lib/types";
import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: EntityStatus }) {
  return (
    <Badge
      className={cn(
        "font-mono text-[10px] uppercase tracking-wider border-0",
        status === "grey" && "bg-status-grey text-status-grey-foreground",
        status === "black" && "bg-status-black text-status-black-foreground",
        status === "white" && "bg-status-white text-status-white-foreground",
      )}
    >
      {status}
    </Badge>
  );
}

export function TypeBadge({ type }: { type: EntityType }) {
  return (
    <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-wider">
      {type}
    </Badge>
  );
}

export function RiskScore({ score }: { score: number }) {
  const color =
    score >= 80 ? "text-status-black" : score >= 50 ? "text-status-grey" : "text-status-white";
  return <span className={cn("font-mono text-sm font-bold", color)}>{score}</span>;
}

export function PriorityBadge({ priority }: { priority: string }) {
  return (
    <Badge
      className={cn(
        "font-mono text-[10px] uppercase tracking-wider border-0",
        priority === "critical" && "bg-status-black text-status-black-foreground",
        priority === "high" && "bg-status-grey text-status-grey-foreground",
        priority === "medium" && "bg-primary text-primary-foreground",
        priority === "low" && "bg-secondary text-secondary-foreground",
      )}
    >
      {priority}
    </Badge>
  );
}

export function CaseStatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "font-mono text-[10px] uppercase tracking-wider",
        status === "escalated" && "border-status-black text-status-black",
        status === "in_progress" && "border-tactical text-tactical",
        status === "open" && "border-status-grey text-status-grey",
        status === "closed" && "border-status-white text-status-white",
      )}
    >
      {status.replace("_", " ")}
    </Badge>
  );
}
