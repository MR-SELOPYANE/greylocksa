import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PriorityBadge, CaseStatusBadge } from "@/components/StatusBadges";
import { useAppState } from "@/lib/store";
import type { Case, CaseStatus } from "@/lib/types";
import { Link2, Save, Fingerprint, ExternalLink, Download } from "lucide-react";

const STATUS_OPTIONS: { value: CaseStatus; label: string }[] = [
  { value: "open", label: "Open" },
  { value: "in_progress", label: "In Progress" },
  { value: "escalated", label: "Escalated" },
  { value: "closed", label: "Closed" },
];

export function CaseDetailDialog({
  caseId,
  open,
  onOpenChange,
}: {
  caseId: string | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { cases, entities, custody, updateCase, updateCaseStatus } = useAppState();
  const activeCase = cases.find((c) => c.id === caseId) ?? null;

  const [analyst, setAnalyst] = useState("");
  const [priority, setPriority] = useState<Case["priority"]>("medium");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (activeCase) {
      setAnalyst(activeCase.assignedAnalyst);
      setPriority(activeCase.priority);
      setNotes(activeCase.notes ?? "");
    }
  }, [activeCase]);

  const linkedEntities = useMemo(
    () =>
      activeCase
        ? activeCase.linkedEntityIds.map((id) => ({
            id,
            entity: entities.find((e) => e.id === id),
          }))
        : [],
    [activeCase, entities],
  );

  const trail = useMemo(
    () => (activeCase ? custody.filter((c) => c.entityId === activeCase.id) : []),
    [activeCase, custody],
  );

  const formatDate = (d: string) =>
    new Date(d).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  if (!activeCase) return null;

  const dirty =
    analyst !== activeCase.assignedAnalyst ||
    priority !== activeCase.priority ||
    notes !== (activeCase.notes ?? "");

  const save = () => {
    updateCase(
      activeCase.id,
      {
        assignedAnalyst: analyst.trim() || activeCase.assignedAnalyst,
        priority,
        notes: notes.trim(),
      },
      "Detail panel edit",
    );
    toast.success(`${activeCase.id} updated`, {
      description: "Change written to chain-of-custody.",
    });
  };

  const exportReport = () => {
    const lines = [
      `CASE REPORT — ${activeCase.id}`,
      `Title:     ${activeCase.title}`,
      `Status:    ${activeCase.status.replace("_", " ").toUpperCase()}`,
      `Priority:  ${activeCase.priority.toUpperCase()}`,
      `Analyst:   ${activeCase.assignedAnalyst}`,
      `Progress:  ${activeCase.progress}%`,
      `Created:   ${formatDate(activeCase.createdAt)}`,
      `Updated:   ${formatDate(activeCase.updatedAt)}`,
      "",
      "DESCRIPTION",
      activeCase.description || "(none)",
      "",
      "INVESTIGATION NOTES",
      activeCase.notes?.trim() || "(none)",
      "",
      `LINKED ENTITIES (${linkedEntities.length})`,
      ...(linkedEntities.length
        ? linkedEntities.map(
            ({ id, entity }) =>
              `- ${id}  ${entity ? entity.identifier : "unknown"}${entity ? `  (risk ${entity.riskScore})` : ""}`,
          )
        : ["(none)"]),
      "",
      `CHAIN OF CUSTODY (${trail.length})`,
      ...(trail.length
        ? trail.map((t) => `- [${formatDate(t.timestamp)}] ${t.action}  ${t.actor}: ${t.reason}`)
        : ["(none)"]),
      "",
      `Generated ${new Date().toLocaleString("en-US")}`,
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeCase.id}-report.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`${activeCase.id} report exported`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-card">
        <DialogHeader>
          <DialogTitle className="flex flex-wrap items-center gap-2 font-mono">
            <span className="text-tactical">{activeCase.id}</span>
            <PriorityBadge priority={activeCase.priority} />
            <CaseStatusBadge status={activeCase.status} />
          </DialogTitle>
          <DialogDescription>{activeCase.title}</DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[65vh] pr-3">
          <div className="space-y-5">
            <p className="text-xs text-muted-foreground">{activeCase.description}</p>

            {/* Progress */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                <span>Progress</span>
                <span>{activeCase.progress}%</span>
              </div>
              <Progress value={activeCase.progress} className="h-1.5" />
            </div>

            {/* Inline editable fields */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Status
                </label>
                <Select
                  value={activeCase.status}
                  onValueChange={(v) => {
                    updateCaseStatus(activeCase.id, v as CaseStatus);
                    toast.success(`${activeCase.id} → ${v.replace("_", " ").toUpperCase()}`);
                  }}
                >
                  <SelectTrigger className="h-8 bg-secondary text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Priority
                </label>
                <Select value={priority} onValueChange={(v) => setPriority(v as Case["priority"])}>
                  <SelectTrigger className="h-8 bg-secondary text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Assigned Analyst
              </label>
              <Input
                value={analyst}
                onChange={(e) => setAnalyst(e.target.value)}
                className="h-8 bg-secondary font-mono text-xs"
              />
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Investigation Notes
              </label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add findings, observations, or next steps…"
                className="min-h-24 bg-secondary text-sm"
              />
            </div>

            {/* Linked entities */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <Link2 className="h-3 w-3" /> Linked Entities ({linkedEntities.length})
              </div>
              {linkedEntities.length === 0 && (
                <p className="font-mono text-[11px] text-muted-foreground/60">
                  No entities linked to this case.
                </p>
              )}
              <div className="grid gap-1.5">
                {linkedEntities.map(({ id, entity }) => (
                  <Link
                    key={id}
                    to="/entities"
                    className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 font-mono text-xs transition-colors hover:border-tactical hover:text-tactical"
                  >
                    <span className="text-tactical">{id}</span>
                    <span className="truncate text-foreground">
                      {entity ? entity.identifier : "unknown target"}
                    </span>
                    {entity && (
                      <span className="ml-auto text-[10px] text-muted-foreground">
                        risk {entity.riskScore}
                      </span>
                    )}
                    <ExternalLink className="h-3 w-3 shrink-0 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Custody trail */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <Fingerprint className="h-3 w-3" /> Chain of Custody ({trail.length})
              </div>
              {trail.length === 0 && (
                <p className="font-mono text-[11px] text-muted-foreground/60">
                  No custody events recorded.
                </p>
              )}
              <div className="space-y-1.5">
                {trail.map((t) => (
                  <div
                    key={t.id}
                    className="rounded-md border border-border bg-background p-2.5 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono text-[9px]">
                        {t.action}
                      </Badge>
                      <span className="font-mono text-tactical">{t.actor}</span>
                      <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                        {formatDate(t.timestamp)}
                      </span>
                    </div>
                    <p className="mt-1 text-muted-foreground">{t.reason}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <span className="font-mono text-[10px] text-muted-foreground">
                Created {formatDate(activeCase.createdAt)}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                · Updated {formatDate(activeCase.updatedAt)}
              </span>
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 border-t border-border pt-3">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button variant="outline" onClick={exportReport} className="gap-1.5">
            <Download className="h-3.5 w-3.5" /> Export report
          </Button>
          <Button onClick={save} disabled={!dirty} className="gap-1.5">
            <Save className="h-3.5 w-3.5" /> Save changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
