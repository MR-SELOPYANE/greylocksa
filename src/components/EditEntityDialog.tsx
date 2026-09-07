import { useEffect, useState, type FormEvent } from "react";
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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useAppState } from "@/lib/store";
import type { Entity, EntityStatus, EntityType } from "@/lib/types";

export function EditEntityDialog({
  entity,
  open,
  onOpenChange,
}: {
  entity: Entity | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { updateEntity, logCustody, runPassiveScan, isPassiveEligible } = useAppState();
  const [type, setType] = useState<EntityType>("web");
  const [identifier, setIdentifier] = useState("");
  const [risk, setRisk] = useState<number[]>([50]);
  const [status, setStatus] = useState<EntityStatus>("grey");
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (entity) {
      setType(entity.type);
      setIdentifier(entity.identifier);
      setRisk([entity.riskScore]);
      setStatus(entity.status);
      setReason("");
    }
  }, [entity]);

  if (!entity) return null;

  // The host actually changed → the old intel is stale, so re-sweep.
  const targetChanged = identifier.trim() !== entity.identifier || type !== entity.type;
  const willResweep = targetChanged && isPassiveEligible({ type, identifier: identifier.trim() });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !reason.trim()) {
      toast.error("Reason is required for chain-of-custody");
      return;
    }
    const nextIdentifier = identifier.trim();
    updateEntity(entity.id, {
      type,
      identifier: nextIdentifier,
      riskScore: risk[0],
      status,
    });
    logCustody({
      entityId: entity.id,
      action: "EDIT",
      reason: reason.trim(),
    });
    toast.success(`Entity ${entity.id} updated`, { description: "Change recorded in chain-of-custody." });

    if (willResweep) {
      const updated = { ...entity, type, identifier: nextIdentifier, riskScore: risk[0], status };
      toast.info("Target changed — re-running passive intel", { description: nextIdentifier });
      void runPassiveScan(entity.id, { silent: true, entity: updated }).then((scan) => {
        if (!scan) return;
        if (scan.status === "failed") {
          toast.error(`Re-sweep failed for ${nextIdentifier}`, { description: scan.error });
        } else {
          toast.success(`Re-sweep complete — ${scan.findings.length} finding(s)`, {
            description: `${nextIdentifier} · see Scans → ${scan.id}`,
          });
        }
      });
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-mono">Edit {entity.id}</DialogTitle>
          <DialogDescription>
            Mutation will be appended to the chain-of-custody ledger.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Type</label>
            <Select value={type} onValueChange={(v) => setType(v as EntityType)}>
              <SelectTrigger className="bg-secondary"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="web">Website</SelectItem>
                <SelectItem value="app">Application</SelectItem>
                <SelectItem value="platform">Platform</SelectItem>
                <SelectItem value="domain">Domain</SelectItem>
                <SelectItem value="ip">IP Address</SelectItem>
                <SelectItem value="person">Person</SelectItem>
                <SelectItem value="org">Organization</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Identifier</label>
            <Input
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="bg-secondary font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <span>Risk Score</span>
              <span className="text-tactical">{risk[0]}</span>
            </label>
            <Slider min={0} max={100} step={1} value={risk} onValueChange={setRisk} />
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Status</label>
            <Select value={status} onValueChange={(v) => setStatus(v as EntityStatus)}>
              <SelectTrigger className="bg-secondary"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="grey">Grey — under review</SelectItem>
                <SelectItem value="black">Black — blocked</SelectItem>
                <SelectItem value="white">White — cleared</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Reason (required)
            </label>
            <Input
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. New evidence from pentest report #341"
              className="bg-secondary font-mono text-sm"
            />
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">Save & Sign</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
