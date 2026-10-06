import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useAppState } from "@/lib/store";
import { useConfirm } from "@/components/ConfirmDialog";
import type { EntityStatus } from "@/lib/types";
import { formatDateTime } from "@/lib/time";
import { StatusBadge, TypeBadge, RiskScore, CaseStatusBadge } from "@/components/StatusBadges";
import { EditEntityDialog } from "@/components/EditEntityDialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Pencil,
  Radar,
  Archive,
  Bug,
  Fingerprint,
  FolderSearch,
  Trash2,
} from "lucide-react";

export const Route = createFileRoute("/entity/$id")({
  component: EntityDetailPage,
  head: () => ({
    meta: [
      { title: "Target Dossier — greyLock" },
      {
        name: "description",
        content: "Full dossier for a watchlist target: risk, sweeps, evidence and custody.",
      },
    ],
  }),
});

const STATUSES: EntityStatus[] = ["white", "grey", "black"];

function EntityDetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const {
    entities,
    cases,
    scans,
    evidence,
    custody,
    updateEntityStatus,
    deleteEntity,
    runPassiveScan,
    isPassiveEligible,
    logCustody,
    lockdown,
  } = useAppState();
  const [editOpen, setEditOpen] = useState(false);
  const [sweeping, setSweeping] = useState(false);

  const entity = entities.find((e) => e.id === id);

  const linkedCases = useMemo(
    () => cases.filter((c) => c.linkedEntityIds.includes(id)),
    [cases, id],
  );
  const entityScans = useMemo(() => scans.filter((s) => s.targetEntityId === id), [scans, id]);
  const entityEvidence = useMemo(
    () => evidence.filter((e) => e.linkedEntityId === id),
    [evidence, id],
  );
  const entityCustody = useMemo(() => custody.filter((c) => c.entityId === id), [custody, id]);

  if (!entity) {
    return (
      <div className="rounded-lg border border-border bg-surface p-10 text-center">
        <p className="font-mono text-sm text-foreground">Target {id} not found</p>
        <p className="mt-1 text-xs text-muted-foreground">
          It may have been purged from the watchlist.
        </p>
        <Link
          to="/entities"
          className="mt-4 inline-flex items-center gap-1.5 text-xs text-tactical hover:underline"
        >
          <ArrowLeft className="h-3 w-3" /> Back to targets
        </Link>
      </div>
    );
  }

  const sweep = async () => {
    if (lockdown) {
      toast.error("Lockdown active — sweeps disabled");
      return;
    }
    if (!isPassiveEligible(entity)) {
      toast.error("Not eligible", {
        description: "Passive sweeps need a resolvable domain or IP.",
      });
      return;
    }
    setSweeping(true);
    await runPassiveScan(entity.id, { entity });
    setSweeping(false);
  };

  const confirm = useConfirm();

  const purge = async () => {
    const { confirmed, reason } = await confirm({
      title: "Purge target",
      description: `${entity.identifier} will be removed from the watchlist. The event stays in chain-of-custody.`,
      reasonLabel: "Reason",
      requireReason: true,
      confirmLabel: "Purge target",
      destructive: true,
    });
    if (!confirmed) return;
    logCustody({ entityId: entity.id, action: "DELETE", reason: `Purged target — ${reason}` });
    deleteEntity(entity.id);
    toast.warning("Target purged");
    navigate({ to: "/entities" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start gap-3">
        <Link to="/entities" className="mt-1 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="truncate font-mono text-lg font-bold text-foreground">
              {entity.identifier}
            </h1>
            <TypeBadge type={entity.type} />
            <StatusBadge status={entity.status} />
          </div>
          <p className="mt-1 font-mono text-[11px] text-muted-foreground">
            {entity.id} · updated {formatDateTime(entity.lastUpdated)}
          </p>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-1.5">
          <Button
            size="sm"
            variant="outline"
            className="h-8 gap-1.5"
            onClick={() => setEditOpen(true)}
          >
            <Pencil className="h-3.5 w-3.5" /> Edit
          </Button>
          <Button
            size="sm"
            className="h-8 gap-1.5"
            onClick={() => void sweep()}
            disabled={sweeping}
          >
            <Radar className={cn("h-3.5 w-3.5", sweeping && "animate-spin")} />{" "}
            {sweeping ? "Sweeping…" : "Passive sweep"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 gap-1.5 text-destructive hover:text-destructive"
            onClick={purge}
          >
            <Trash2 className="h-3.5 w-3.5" /> Purge
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card label="Risk score">
          <RiskScore score={entity.riskScore} />
        </Card>
        <Card label="Sweeps run">
          <span className="font-mono text-2xl font-bold text-foreground">{entityScans.length}</span>
        </Card>
        <Card label="Linked cases">
          <span className="font-mono text-2xl font-bold text-foreground">{linkedCases.length}</span>
        </Card>
        <Card label="Evidence items">
          <span className="font-mono text-2xl font-bold text-foreground">
            {entityEvidence.length}
          </span>
        </Card>
      </div>

      <section className="rounded-lg border border-border bg-surface p-4">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Watchlist status
        </h2>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {STATUSES.map((s) => (
            <Button
              key={s}
              size="sm"
              variant={entity.status === s ? "default" : "outline"}
              className="h-7 font-mono text-[10px] uppercase"
              onClick={async () => {
                if (entity.status === s) return;
                const { confirmed, reason } = await confirm({
                  title: `Move to ${s.toUpperCase()}`,
                  description: `${entity.identifier} changes watchlist status and the change is attributed to you.`,
                  reasonLabel: "Reason",
                  defaultReason: "Manual status change",
                  requireReason: true,
                  confirmLabel: "Change status",
                  destructive: s === "black",
                });
                if (!confirmed) return;
                updateEntityStatus(entity.id, s, reason);
                toast.success(`Status → ${s.toUpperCase()}`);
              }}
            >
              {s}
            </Button>
          ))}
        </div>
        {entity.statusHistory.length > 0 && (
          <ul className="mt-3 space-y-1 border-t border-border pt-2 font-mono text-[11px] text-muted-foreground">
            {[...entity.statusHistory]
              .reverse()
              .slice(0, 6)
              .map((h, i) => (
                <li key={i}>
                  · {formatDateTime(h.timestamp)} — {h.from} → {h.to} by {h.changedBy} (
                  {h.reason})
                </li>
              ))}
          </ul>
        )}
      </section>

      {Object.keys(entity.metadata ?? {}).length > 0 && (
        <section className="rounded-lg border border-border bg-surface p-4">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Metadata
          </h2>
          <dl className="mt-2 grid gap-2 sm:grid-cols-2">
            {Object.entries(entity.metadata).map(([k, v]) => (
              <div
                key={k}
                className="rounded border border-border bg-background px-2 py-1.5 font-mono text-[11px]"
              >
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="break-all text-foreground">{String(v)}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section className="rounded-lg border border-border bg-surface p-4">
        <h2 className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <Bug className="h-3.5 w-3.5" /> Sweeps &amp; findings
        </h2>
        {entityScans.length === 0 ? (
          <p className="mt-2 text-xs text-muted-foreground">
            No sweeps recorded yet. Run a passive sweep to pull live WHOIS, DNS, TLS, Shodan and
            VirusTotal data.
          </p>
        ) : (
          <ul className="mt-2 divide-y divide-border">
            {entityScans.slice(0, 8).map((s) => (
              <li key={s.id} className="flex flex-wrap items-center gap-2 py-2 text-xs">
                <span className="font-mono text-tactical">{s.id}</span>
                <Badge variant="outline" className="font-mono text-[10px] uppercase">
                  {s.profile}
                </Badge>
                <span
                  className={cn(
                    "font-mono text-[10px] uppercase",
                    s.status === "complete"
                      ? "text-status-white"
                      : s.status === "failed"
                        ? "text-destructive"
                        : "text-status-grey",
                  )}
                >
                  {s.status}
                </span>
                <span className="text-muted-foreground">
                  {formatDateTime(s.startedAt)}
                </span>
                {s.status === "complete" && (
                  <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                    <span className="text-destructive">{s.summary.critical}C</span> ·{" "}
                    {s.summary.high}H · {s.summary.medium}M · {s.summary.low}L
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
        <Link to="/scans" className="mt-2 inline-block text-[11px] text-tactical hover:underline">
          Open scans console →
        </Link>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-lg border border-border bg-surface p-4">
          <h2 className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <FolderSearch className="h-3.5 w-3.5" /> Linked cases
          </h2>
          {linkedCases.length === 0 ? (
            <p className="mt-2 text-xs text-muted-foreground">Not attached to any case.</p>
          ) : (
            <ul className="mt-2 space-y-1.5">
              {linkedCases.map((c) => (
                <li
                  key={c.id}
                  className="flex items-center gap-2 rounded border border-border bg-background px-2 py-1.5 text-xs"
                >
                  <span className="font-mono text-tactical">{c.id}</span>
                  <span className="truncate">{c.title}</span>
                  <span className="ml-auto">
                    <CaseStatusBadge status={c.status} />
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-lg border border-border bg-surface p-4">
          <h2 className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <Archive className="h-3.5 w-3.5" /> Evidence
          </h2>
          {entityEvidence.length === 0 ? (
            <p className="mt-2 text-xs text-muted-foreground">
              No sealed artifacts linked to this target.
            </p>
          ) : (
            <ul className="mt-2 space-y-1.5">
              {entityEvidence.map((ev) => (
                <li
                  key={ev.id}
                  className="flex items-center gap-2 rounded border border-border bg-background px-2 py-1.5 text-xs"
                >
                  <span className="font-mono text-tactical">{ev.id}</span>
                  <span className="truncate">{ev.filename}</span>
                  <Badge variant="outline" className="ml-auto font-mono text-[10px] uppercase">
                    {ev.category}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section className="rounded-lg border border-border bg-surface p-4">
        <h2 className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <Fingerprint className="h-3.5 w-3.5" /> Chain of custody
        </h2>
        {entityCustody.length === 0 ? (
          <p className="mt-2 text-xs text-muted-foreground">
            No recorded activity for this target yet.
          </p>
        ) : (
          <ul className="mt-2 divide-y divide-border">
            {entityCustody.slice(0, 12).map((c) => (
              <li key={c.id} className="py-2 text-xs">
                <div className="flex flex-wrap items-center gap-2 font-mono">
                  <span className="text-tactical">{c.actor}</span>
                  <Badge variant="outline" className="text-[10px] uppercase">
                    {c.action}
                  </Badge>
                  <span className="ml-auto text-[10px] text-muted-foreground">
                    {new Date(c.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="mt-0.5 text-muted-foreground">{c.reason}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {editOpen && <EditEntityDialog entity={entity} open={editOpen} onOpenChange={setEditOpen} />}
    </div>
  );
}

function Card({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-3">
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}
