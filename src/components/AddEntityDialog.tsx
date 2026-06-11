import { useState, type FormEvent } from "react";
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
import type { EntityType, EntityStatus } from "@/lib/types";

export function AddEntityDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { addEntity } = useAppState();
  const [type, setType] = useState<EntityType>("web");
  const [identifier, setIdentifier] = useState("");
  const [risk, setRisk] = useState<number[]>([50]);
  const [status, setStatus] = useState<EntityStatus>("grey");

  const reset = () => {
    setType("web");
    setIdentifier("");
    setRisk([50]);
    setStatus("grey");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) return;
    const created = addEntity({
      type,
      identifier: identifier.trim(),
      riskScore: risk[0],
      status,
    });
    toast.success(`Entity provisioned: ${created.id}`, {
      description: `${created.identifier} added to ${status.toUpperCase()} pool`,
    });
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) reset(); onOpenChange(v); }}>
      <DialogContent className="bg-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-mono">Add Entity</DialogTitle>
          <DialogDescription>
            Provision a new watchlist entry. Mutation will be audited.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Type
            </label>
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
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Identifier
            </label>
            <Input
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={
                type === "person" ? "Full name" :
                type === "org" ? "Legal entity name" :
                type === "ip" ? "192.0.2.1" :
                type === "web" ? "https://example.com" :
                type === "app" ? "com.example.android.app" :
                type === "platform" ? "AWS account / GCP project / SaaS tenant" :
                "example.com"
              }
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
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Initial Status
            </label>
            <Select value={status} onValueChange={(v) => setStatus(v as EntityStatus)}>
              <SelectTrigger className="bg-secondary"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="grey">Grey — under review</SelectItem>
                <SelectItem value="black">Black — blocked</SelectItem>
                <SelectItem value="white">White — cleared</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Provision Entity</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
