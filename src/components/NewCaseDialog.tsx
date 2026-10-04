import { useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppState } from "@/lib/store";
import type { Case, CaseStatus } from "@/lib/types";

export function NewCaseDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { addCase, operator, entities } = useAppState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Case["priority"]>("medium");
  const [status, setStatus] = useState<CaseStatus>("open");
  const [analyst, setAnalyst] = useState(operator);
  const [linked, setLinked] = useState<string[]>([]);
  const [entityFilter, setEntityFilter] = useState("");

  const reset = () => {
    setTitle("");
    setDescription("");
    setPriority("medium");
    setStatus("open");
    setAnalyst(operator);
    setLinked([]);
    setEntityFilter("");
  };

  const toggleEntity = (id: string) =>
    setLinked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const filteredEntities = useMemo(() => {
    const q = entityFilter.trim().toLowerCase();
    if (!q) return entities;
    return entities.filter(
      (e) => e.identifier.toLowerCase().includes(q) || e.id.toLowerCase().includes(q),
    );
  }, [entities, entityFilter]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const created = addCase({
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      assignedAnalyst: analyst.trim() || operator,
      linkedEntityIds: linked,
    });
    toast.success(`Case opened: ${created.id}`, {
      description: `${created.title} · ${linked.length} entit${linked.length === 1 ? "y" : "ies"} linked`,
    });
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) reset();
        onOpenChange(v);
      }}
    >
      <DialogContent className="bg-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-mono">Open Case</DialogTitle>
          <DialogDescription>
            Create a new investigation. Action will be written to chain-of-custody.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Title
            </label>
            <Input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Meridian Holdings Network Analysis"
              className="bg-secondary text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Description
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Scope and objective of the investigation"
              className="min-h-20 bg-secondary text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Priority
              </label>
              <Select value={priority} onValueChange={(v) => setPriority(v as Case["priority"])}>
                <SelectTrigger className="bg-secondary">
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
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Status
              </label>
              <Select value={status} onValueChange={(v) => setStatus(v as CaseStatus)}>
                <SelectTrigger className="bg-secondary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="escalated">Escalated</SelectItem>
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
              placeholder="analyst.you"
              className="bg-secondary font-mono text-sm"
            />
          </div>

          {/* Link entities */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <Link2 className="h-3 w-3" /> Linked Entities
              </label>
              <span className="font-mono text-[10px] text-tactical">{linked.length} selected</span>
            </div>
            <Input
              value={entityFilter}
              onChange={(e) => setEntityFilter(e.target.value)}
              placeholder="Filter targets…"
              className="bg-secondary font-mono text-xs"
            />
            <ScrollArea className="h-36 rounded-md border border-border bg-secondary/40">
              <div className="p-1.5">
                {filteredEntities.length === 0 && (
                  <p className="px-2 py-3 text-center font-mono text-[11px] text-muted-foreground">
                    No targets match.
                  </p>
                )}
                {filteredEntities.map((ent) => {
                  const isOn = linked.includes(ent.id);
                  return (
                    <button
                      key={ent.id}
                      type="button"
                      onClick={() => toggleEntity(ent.id)}
                      className={cn(
                        "flex w-full items-center gap-2 rounded px-2 py-1.5 text-left font-mono text-xs transition-colors",
                        isOn ? "bg-tactical/15 text-tactical" : "text-foreground hover:bg-accent",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm border",
                          isOn ? "border-tactical bg-tactical text-background" : "border-border",
                        )}
                      >
                        {isOn && <Check className="h-2.5 w-2.5" />}
                      </span>
                      <span className="truncate">{ent.identifier}</span>
                      <span className="ml-auto shrink-0 text-[10px] text-muted-foreground">
                        {ent.type}
                      </span>
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
            {linked.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {linked.map((id) => {
                  const ent = entities.find((e) => e.id === id);
                  return (
                    <Badge key={id} variant="outline" className="font-mono text-[10px]">
                      {ent ? ent.identifier.slice(0, 18) : id}
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Open Case</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
