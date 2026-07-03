import { useState, useMemo, useEffect, useRef } from "react";
import { toast } from "sonner";
import { useAppState } from "@/lib/store";
import type { Entity, EntityStatus } from "@/lib/types";
import { StatusBadge, TypeBadge, RiskScore, CaseStatusBadge } from "@/components/StatusBadges";
import { AddEntityDialog } from "@/components/AddEntityDialog";
import { EditEntityDialog } from "@/components/EditEntityDialog";
import { useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Filter, Eye, Pencil, Trash2, Database, X, Plus, Download, ChevronDown, Bug } from "lucide-react";

export function EntitiesView() {
  const { role, entities, cases, scans, updateEntityStatus, deleteEntity, startScan, logCustody, lockdown } = useAppState();
  const navigate = useNavigate();
  const [addOpen, setAddOpen] = useState(false);
  const [editEntity, setEditEntity] = useState<Entity | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [riskRange, setRiskRange] = useState<number[]>([0, 100]);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // "/" focuses search; Esc clears it
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;
      if (e.key === "/" && !typing) {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === "Escape" && document.activeElement === searchRef.current) {
        setSearch("");
        searchRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const hasActiveFilters =
    typeFilter !== "all" || statusFilter !== "all" || riskRange[0] !== 0 || riskRange[1] !== 100 || search !== "";

  const resetFilters = () => {
    setSearch("");
    setTypeFilter("all");
    setStatusFilter("all");
    setRiskRange([0, 100]);
  };

  const filtered = useMemo(() => {
    return entities.filter((e) => {
      if (search && !e.identifier.toLowerCase().includes(search.toLowerCase()) && !e.id.toLowerCase().includes(search.toLowerCase())) return false;
      if (typeFilter !== "all" && e.type !== typeFilter) return false;
      if (statusFilter !== "all" && e.status !== statusFilter) return false;
      if (e.riskScore < riskRange[0] || e.riskScore > riskRange[1]) return false;
      return true;
    });
  }, [entities, search, typeFilter, statusFilter, riskRange]);

  // Event bridge for Command Palette
  useEffect(() => {
    const openAdd = () => setAddOpen(true);
    const exportCsv = () => exportEntitiesToCsv(filtered);
    const openEntity = (ev: Event) => {
      const id = (ev as CustomEvent<{ id: string }>).detail?.id;
      const found = entities.find((x) => x.id === id);
      if (found) setSelectedEntity(found);
    };
    window.addEventListener("greylock:open-add-entity", openAdd);
    window.addEventListener("greylock:export-entities", exportCsv);
    window.addEventListener("greylock:open-entity", openEntity as EventListener);
    return () => {
      window.removeEventListener("greylock:open-add-entity", openAdd);
      window.removeEventListener("greylock:export-entities", exportCsv);
      window.removeEventListener("greylock:open-entity", openEntity as EventListener);
    };
  }, [entities, filtered]);

  const toggleOne = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const toggleAll = () => {
    if (selectedIds.size === filtered.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(filtered.map((e) => e.id)));
  };
  const clearSelection = () => setSelectedIds(new Set());

  const bulkPromote = (status: EntityStatus) => {
    const ids = Array.from(selectedIds);
    ids.forEach((id) => updateEntityStatus(id, status, `Bulk promotion to ${status.toUpperCase()}`));
    toast.success(`${ids.length} entities → ${status.toUpperCase()}`);
    clearSelection();
  };
  const bulkDelete = () => {
    const ids = Array.from(selectedIds);
    ids.forEach((id) => deleteEntity(id));
    toast.warning(`${ids.length} entities purged`, { description: "Audit events recorded." });
    clearSelection();
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

  const canMutate = role === "analyst" || role === "admin";
  const canDelete = role === "admin";

  return (
    <div className="space-y-4">
      {/* Search + Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={searchRef}
            placeholder="Search entities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-16 bg-surface font-mono text-sm"
          />
          <kbd className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-block">
            /
          </kbd>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-1.5"
        >
          <Filter className="h-3.5 w-3.5" />
          Filters
        </Button>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={resetFilters} className="gap-1.5 text-muted-foreground">
            <X className="h-3.5 w-3.5" />
            Clear
          </Button>
        )}
        <span className="text-xs text-muted-foreground font-mono">
          {filtered.length} / {entities.length} entities
        </span>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportEntitiesToCsv(filtered)}
            className="gap-1.5"
          >
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </Button>
          {canMutate && (
            <Button size="sm" onClick={() => setAddOpen(true)} className="gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              Add Entity
            </Button>
          )}
        </div>
      </div>

      {/* Bulk action toolbar */}
      {selectedIds.size > 0 && (
        <div className="flex flex-wrap items-center gap-3 rounded-md border border-tactical/40 bg-tactical/5 px-4 py-2">
          <span className="font-mono text-xs text-tactical">
            {selectedIds.size} selected
          </span>
          {canMutate && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-7 gap-1.5">
                  Promote to <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => bulkPromote("grey")}>Grey (review)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => bulkPromote("black")}>Black (block)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => bulkPromote("white")}>White (clear)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {canDelete && (
            <Button
              variant="outline"
              size="sm"
              onClick={bulkDelete}
              className="h-7 gap-1.5 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-3 w-3" />
              Purge
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={clearSelection} className="ml-auto h-7 gap-1.5">
            <X className="h-3 w-3" />
            Clear
          </Button>
        </div>
      )}

      {showFilters && (
        <div className="flex flex-wrap items-end gap-4 rounded-lg border border-border bg-surface p-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Type</label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="h-8 w-32 bg-input text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
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
            <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Status</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-8 w-28 bg-input text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="grey">Grey</SelectItem>
                <SelectItem value="black">Black</SelectItem>
                <SelectItem value="white">White</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5 min-w-[200px]">
            <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              Risk Score: {riskRange[0]} — {riskRange[1]}
            </label>
            <Slider
              min={0}
              max={100}
              step={5}
              value={riskRange}
              onValueChange={setRiskRange}
              className="py-2"
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface">
              <th className="w-10 px-4 py-3">
                <Checkbox
                  checked={filtered.length > 0 && selectedIds.size === filtered.length}
                  onCheckedChange={toggleAll}
                  aria-label="Select all"
                />
              </th>
              <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">ID</th>
              <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Identifier</th>
              <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Risk</th>
              <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Updated</th>
              <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e) => {
              const scannable = ["web", "app", "platform", "domain", "ip"].includes(e.type);
              return (
              <tr
                key={e.id}
                onClick={() => {
                  setSelectedEntity(e);
                  logCustody({ entityId: e.id, action: "VIEW", reason: "Detail panel opened" });
                }}
                className={`cursor-pointer border-b border-border transition-colors hover:bg-accent ${selectedIds.has(e.id) ? "bg-tactical/5" : ""}`}
              >
                <td className="px-4 py-3" onClick={(ev) => ev.stopPropagation()}>
                  <Checkbox
                    checked={selectedIds.has(e.id)}
                    onCheckedChange={() => toggleOne(e.id)}
                    aria-label={`Select ${e.id}`}
                  />
                </td>
                <td className="px-4 py-3 font-mono text-xs text-tactical">{e.id}</td>
                <td className="px-4 py-3"><TypeBadge type={e.type} /></td>
                <td className="px-4 py-3 text-foreground">{e.identifier}</td>
                <td className="px-4 py-3"><RiskScore score={e.riskScore} /></td>
                <td className="px-4 py-3"><StatusBadge status={e.status} /></td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{formatDate(e.lastUpdated)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(ev) => {
                      ev.stopPropagation();
                      setSelectedEntity(e);
                      logCustody({ entityId: e.id, action: "VIEW", reason: "Detail panel opened" });
                    }}>
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                    {scannable && canMutate && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-tactical"
                        title="Run vulnerability scan"
                        onClick={(ev) => {
                          ev.stopPropagation();
                          if (lockdown) { toast.error("System locked down"); return; }
                          const scan = startScan(e.id, "active");
                          logCustody({ entityId: e.id, action: "SCAN", reason: "Active scan from row action" });
                          toast.success(`Scan ${scan.id} dispatched`, { description: `View results in Scans tab.` });
                          navigate({ to: "/scans" });
                        }}
                      >
                        <Bug className="h-3.5 w-3.5" />
                      </Button>
                    )}
                    {canMutate && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        title="Edit"
                        onClick={(ev) => { ev.stopPropagation(); setEditEntity(e); }}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                    )}
                    {canDelete && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive"
                        onClick={(ev) => {
                          ev.stopPropagation();
                          if (lockdown) { toast.error("System locked down"); return; }
                          const reason = prompt(`Reason for purging ${e.id}:`);
                          if (!reason) return;
                          deleteEntity(e.id);
                          logCustody({ entityId: e.id, action: "DELETE", reason });
                          toast.warning(`Purged ${e.id}`, { description: "Chain-of-custody updated." });
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <Database className="h-8 w-8 text-muted-foreground/50" />
            <p className="font-mono text-sm text-foreground">No entities match the filter</p>
            <p className="text-xs text-muted-foreground">Adjust your query or clear active filters.</p>
            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={resetFilters} className="mt-2 gap-1.5">
                <X className="h-3.5 w-3.5" />
                Reset filters
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <Dialog open={!!selectedEntity} onOpenChange={() => setSelectedEntity(null)}>
        <DialogContent className="max-w-2xl bg-card">
          {selectedEntity && (
            <>
              <DialogHeader>
                <DialogTitle className="flex flex-wrap items-center gap-3 font-mono">
                  <span className="text-tactical">{selectedEntity.id}</span>
                  <StatusBadge status={selectedEntity.status} />
                  <TypeBadge type={selectedEntity.type} />
                  {canMutate && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-auto h-7 gap-1.5"
                      onClick={() => {
                        const target = selectedEntity;
                        setSelectedEntity(null);
                        setEditEntity(target);
                      }}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </Button>
                  )}
                </DialogTitle>
                <DialogDescription>{selectedEntity.identifier}</DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-[60vh]">
                <div className="space-y-4">
                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Risk Score</span>
                      <div className="mt-1"><RiskScore score={selectedEntity.riskScore} /></div>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Last Updated</span>
                      <div className="mt-1 font-mono text-xs text-muted-foreground">{formatDate(selectedEntity.lastUpdated)}</div>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div>
                    <h4 className="mb-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Metadata</h4>
                    <pre className="overflow-auto rounded-md bg-background p-3 font-mono text-xs text-foreground">
                      {JSON.stringify(selectedEntity.metadata, null, 2)}
                    </pre>
                  </div>

                  {/* Evidence */}
                  {selectedEntity.evidenceRefs.length > 0 && (
                    <div>
                      <h4 className="mb-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Evidence References</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedEntity.evidenceRefs.map((ref) => (
                          <span key={ref} className="rounded bg-accent px-2 py-1 font-mono text-xs text-accent-foreground">{ref}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Status History */}
                  {selectedEntity.statusHistory.length > 0 && (
                    <div>
                      <h4 className="mb-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Status History</h4>
                      <div className="space-y-2">
                        {selectedEntity.statusHistory.map((h, i) => (
                          <div key={i} className="rounded-md border border-border bg-background p-3 text-xs">
                            <div className="flex items-center gap-2">
                              <StatusBadge status={h.from} />
                              <span className="text-muted-foreground">→</span>
                              <StatusBadge status={h.to} />
                              <span className="ml-auto font-mono text-muted-foreground">{formatDate(h.timestamp)}</span>
                            </div>
                            <p className="mt-1.5 text-muted-foreground">by <span className="text-tactical">{h.changedBy}</span> — {h.reason}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Linked Cases */}
                  {(() => {
                    const linked = cases.filter((c) => c.linkedEntityIds.includes(selectedEntity.id));
                    return (
                      <div>
                        <h4 className="mb-2 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                          <FolderSearch className="h-3 w-3" /> Linked Cases ({linked.length})
                        </h4>
                        {linked.length === 0 ? (
                          <p className="font-mono text-[11px] text-muted-foreground/60">Not linked to any case.</p>
                        ) : (
                          <div className="space-y-1.5">
                            {linked.map((c) => (
                              <button
                                key={c.id}
                                onClick={() => {
                                  setSelectedEntity(null);
                                  navigate({ to: "/cases" });
                                  setTimeout(() => window.dispatchEvent(new CustomEvent("greylock:open-case", { detail: { id: c.id } })), 80);
                                }}
                                className="flex w-full items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-left text-xs transition-colors hover:border-tactical hover:text-tactical"
                              >
                                <span className="font-mono text-tactical">{c.id}</span>
                                <span className="truncate text-foreground">{c.title}</span>
                                <CaseStatusBadge status={c.status} />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {/* Recent Scans */}
                  {(() => {
                    const own = scans.filter((s) => s.targetEntityId === selectedEntity.id).slice(0, 5);
                    return (
                      <div>
                        <h4 className="mb-2 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                          <Bug className="h-3 w-3" /> Recent Scans ({own.length})
                        </h4>
                        {own.length === 0 ? (
                          <p className="font-mono text-[11px] text-muted-foreground/60">No scans run against this target.</p>
                        ) : (
                          <div className="space-y-1.5">
                            {own.map((s) => (
                              <div key={s.id} className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-xs">
                                <span className="font-mono text-tactical">{s.id}</span>
                                <span className="font-mono uppercase text-muted-foreground">{s.profile}</span>
                                <span className={`font-mono ${s.status === "running" ? "text-tactical" : "text-muted-foreground"}`}>{s.status}</span>
                                {s.status === "complete" && (
                                  <span className="ml-auto font-mono text-[10px] text-status-black">
                                    {s.summary.critical}C · {s.summary.high}H
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>

      <AddEntityDialog open={addOpen} onOpenChange={setAddOpen} />
      <EditEntityDialog entity={editEntity} open={!!editEntity} onOpenChange={(v) => !v && setEditEntity(null)} />
    </div>
  );
}

function exportEntitiesToCsv(rows: Entity[]) {
  if (rows.length === 0) {
    toast.error("No entities to export");
    return;
  }
  const headers = ["id", "type", "identifier", "riskScore", "status", "lastUpdated"];
  const escape = (v: unknown) => {
    const s = String(v ?? "");
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [
    headers.join(","),
    ...rows.map((r) =>
      [r.id, r.type, r.identifier, r.riskScore, r.status, r.lastUpdated].map(escape).join(",")
    ),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `greylock-entities-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  toast.success(`Exported ${rows.length} entities`);
}
