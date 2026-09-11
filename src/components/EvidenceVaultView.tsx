import { useRef, useState } from "react";
import { toast } from "sonner";
import type { EvidenceItem, Honeytoken } from "@/lib/types";
import { sha256File } from "@/lib/derive";
import { useAppState } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Archive, ShieldCheck, ShieldAlert, Hash, Lock, Unlock, Bomb, Upload, Pencil, Trash2, History, Info, Plus } from "lucide-react";

const CATEGORIES = ["pcap", "screenshot", "log", "binary", "doc", "memory", "other"] as const;
const TOKEN_KINDS = ["credential", "doc", "api_key", "url"] as const;

export function EvidenceVaultView() {
  const { evidence, addEvidence, updateEvidence, deleteEvidence, canEditEvidence, operator, role, entities, logCustody,
    honeytokens, addHoneytoken, triggerHoneytoken, removeHoneytoken, notify } = useAppState();
  const [editing, setEditing] = useState<EvidenceItem | null>(null);
  const [history, setHistory] = useState<EvidenceItem | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [tokenOpen, setTokenOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "mine" | "broken">("all");
  const verifyRef = useRef<HTMLInputElement | null>(null);
  const [verifyTarget, setVerifyTarget] = useState<EvidenceItem | null>(null);

  const filtered = evidence.filter((e) => {
    if (filter === "mine") return e.uploadedBy === operator;
    if (filter === "broken") return e.integrity === "broken";
    return true;
  });

  // Re-hash the original file with Web Crypto and compare against the sealed digest.
  const verify = (e: EvidenceItem) => {
    setVerifyTarget(e);
    verifyRef.current?.click();
  };

  const onVerifyFile = async (file: File | undefined) => {
    const target = verifyTarget;
    setVerifyTarget(null);
    if (!file || !target) return;
    const digest = await sha256File(file);
    const match = digest === target.sha256;
    updateEvidence(target.id, { integrity: match ? "verified" : "broken" }, match ? "Hash re-verified against original file" : "Hash mismatch on re-verification");
    logCustody({ entityId: target.linkedEntityId ?? "VAULT", action: "VIEW", reason: `Hash verify on ${target.id} — ${match ? "match" : "MISMATCH"}` });
    if (match) toast.success(`Integrity confirmed for ${target.filename}`, { description: `SHA-256 ${digest.slice(0, 24)}… matches the sealed digest.` });
    else notify("critical", `Integrity broken: ${target.filename}`, { description: `Computed ${digest.slice(0, 16)}… ≠ sealed ${target.sha256.slice(0, 16)}…`, link: "/vault" });
  };

  const reseal = (e: EvidenceItem) => {
    if (!canEditEvidence(e)) { toast.error("Permission denied", { description: "Only the uploader or an admin can break or re-seal this artifact." }); return; }
    const reason = prompt(e.sealed ? "Reason for breaking seal:" : "Reason for re-sealing:");
    if (!reason) return;
    updateEvidence(e.id, { sealed: !e.sealed }, reason);
    logCustody({ entityId: e.linkedEntityId ?? "VAULT", action: "EDIT", reason: `${e.sealed ? "Broke seal" : "Re-sealed"} ${e.id} — ${reason}` });
  };

  const remove = (e: EvidenceItem) => {
    if (!canEditEvidence(e)) { toast.error("Permission denied"); return; }
    const reason = prompt(`Reason for deleting ${e.filename}:`);
    if (!reason) return;
    deleteEvidence(e.id, reason);
    logCustody({ entityId: e.linkedEntityId ?? "VAULT", action: "DELETE", reason: `Deleted ${e.id} (${e.filename}) — ${reason}` });
    toast.success("Artifact removed", { description: "Deletion event sealed into chain-of-custody." });
  };

  const tokens = honeytokens;

  const triggerToken = (id: string) => {
    triggerHoneytoken(id);
    notify("critical", "Honeytoken triggered", { description: `Decoy ${id} was accessed — investigate the session.`, link: "/vault" });
    logCustody({ entityId: "HONEYTOKEN", action: "HONEYTOKEN", reason: `Simulated trigger of token ${id}` });
  };

  const fmtSize = (n: number) => n > 1e6 ? `${(n / 1e6).toFixed(1)} MB` : n > 1e3 ? `${(n / 1e3).toFixed(1)} KB` : `${n} B`;

  return (
    <div className="space-y-6">
      <input
        ref={verifyRef}
        type="file"
        className="hidden"
        onChange={(ev) => { void onVerifyFile(ev.target.files?.[0]); ev.target.value = ""; }}
      />
      <div className="flex items-start gap-3 rounded-md border border-tactical/40 bg-tactical/5 p-4">
        <Info className="mt-0.5 h-4 w-4 text-tactical shrink-0" />
        <div className="text-xs text-muted-foreground">
          <p className="font-mono uppercase tracking-wider text-tactical">How the vault works</p>
          <p className="mt-1">
            Every artifact is sealed with a SHA-256 digest the moment it is uploaded. Multiple operators can work the same
            case: anyone can <b>view</b> and <b>verify</b>, but only the original <b>uploader or an admin</b> can edit notes,
            re-link evidence, break the seal, or delete. Every change carries a reason and is written to the
            chain-of-custody so admins can answer "who touched what and when."
          </p>
        </div>
      </div>

      <section className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Archive className="h-4 w-4 text-tactical" />
          <h2 className="font-mono text-sm uppercase tracking-widest text-foreground">Evidence Vault</h2>
          <Badge variant="outline" className="font-mono text-[10px]">{evidence.length} sealed</Badge>
          <div className="ml-auto flex items-center gap-1.5">
            {(["all", "mine", "broken"] as const).map((f) => (
              <Button key={f} size="sm" variant={filter === f ? "default" : "outline"} className="h-7 font-mono text-[10px] uppercase" onClick={() => setFilter(f)}>{f}</Button>
            ))}
            <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-7 gap-1.5"><Upload className="h-3.5 w-3.5" /> Upload artifact</Button>
              </DialogTrigger>
              <UploadDialog
                operator={operator}
                entityOptions={entities.map((e) => ({ id: e.id, label: `${e.id} · ${e.identifier}` }))}
                onSubmit={(data) => {
                  const item = addEvidence(data);
                  logCustody({ entityId: data.linkedEntityId ?? "VAULT", action: "EDIT", reason: `Uploaded ${item.filename} (${item.id})` });
                  toast.success("Artifact sealed", { description: `${item.filename} added to the vault.` });
                  setUploadOpen(false);
                }}
              />
            </Dialog>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                {["ID", "Filename", "Size", "Category", "Linked", "Uploaded by", "Last edit", "Seal", "Integrity", "Actions"].map((h) => (
                  <th key={h} className="px-3 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => {
                const mine = canEditEvidence(e);
                return (
                  <tr key={e.id} className="border-b border-border hover:bg-accent">
                    <td className="px-3 py-3 font-mono text-xs text-tactical">{e.id}</td>
                    <td className="px-3 py-3 font-mono text-xs text-foreground" title={e.notes}>
                      {e.filename}
                      {e.notes && <div className="mt-0.5 text-[10px] text-muted-foreground truncate max-w-[220px]">{e.notes}</div>}
                    </td>
                    <td className="px-3 py-3 font-mono text-xs text-muted-foreground">{fmtSize(e.sizeBytes)}</td>
                    <td className="px-3 py-3"><Badge variant="outline" className="font-mono text-[10px] uppercase">{e.category}</Badge></td>
                    <td className="px-3 py-3 font-mono text-xs text-muted-foreground">{e.linkedEntityId ?? "—"}</td>
                    <td className="px-3 py-3 font-mono text-[11px]">
                      <div className="text-tactical">{e.uploadedBy}</div>
                      <div className="text-[10px] text-muted-foreground">{new Date(e.uploadedAt).toLocaleDateString()}</div>
                    </td>
                    <td className="px-3 py-3 font-mono text-[11px]">
                      {e.lastEditedBy ? (
                        <>
                          <div className="text-foreground">{e.lastEditedBy}</div>
                          <div className="text-[10px] text-muted-foreground">{new Date(e.lastEditedAt!).toLocaleString()}</div>
                        </>
                      ) : <span className="text-muted-foreground">—</span>}
                    </td>
                    <td className="px-3 py-3">{e.sealed ? <Lock className="h-3.5 w-3.5 text-tactical" /> : <Unlock className="h-3.5 w-3.5 text-muted-foreground" />}</td>
                    <td className="px-3 py-3">
                      {e.integrity === "verified" ? (
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase text-status-white"><ShieldCheck className="h-3 w-3" /> verified</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase text-destructive"><ShieldAlert className="h-3 w-3" /> broken</span>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-0.5">
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0" title="Verify hash" onClick={() => verify(e)}><Hash className="h-3 w-3" /></Button>
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0" title="History" onClick={() => setHistory(e)}><History className="h-3 w-3" /></Button>
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0" title={mine ? "Edit" : "Locked — uploader/admin only"} disabled={!mine} onClick={() => setEditing(e)}><Pencil className="h-3 w-3" /></Button>
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0" title={e.sealed ? "Break seal" : "Re-seal"} disabled={!mine} onClick={() => reseal(e)}>
                          {e.sealed ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-destructive hover:text-destructive" title={mine ? "Delete" : "Locked"} disabled={!mine} onClick={() => remove(e)}><Trash2 className="h-3 w-3" /></Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={10} className="px-4 py-12 text-center text-sm text-muted-foreground">No artifacts match this filter.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-muted-foreground">
          Signed in as <span className="font-mono text-tactical">{operator}</span> · role <span className="font-mono uppercase">{role}</span>. {role === "admin" ? "Admin override active — you can edit any artifact." : "You can edit only artifacts you uploaded."}
        </p>
      </section>

      <section className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Bomb className="h-4 w-4 text-destructive" />
          <h2 className="font-mono text-sm uppercase tracking-widest text-foreground">Honeytokens</h2>
          <span className="text-xs text-muted-foreground">— planted decoys that scream when touched</span>
          <Badge variant="outline" className="font-mono text-[10px]">{tokens.filter((t) => t.triggered).length} triggered</Badge>
          <Dialog open={tokenOpen} onOpenChange={setTokenOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="ml-auto h-7 gap-1.5"><Plus className="h-3.5 w-3.5" /> Plant token</Button>
            </DialogTrigger>
            <HoneytokenDialog onSubmit={(d) => {
              const t = addHoneytoken(d);
              logCustody({ entityId: "HONEYTOKEN", action: "HONEYTOKEN", reason: `Planted ${t.kind} decoy "${t.label}" (${t.id})` });
              toast.success("Decoy planted", { description: "Any access will raise a critical alert." });
              setTokenOpen(false);
            }} />
          </Dialog>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {tokens.length === 0 && (
            <p className="rounded-lg border border-border bg-surface p-6 text-center text-xs text-muted-foreground md:col-span-2">
              No decoys planted. Plant a fake credential, document or canary URL — you get alerted the moment anyone touches it.
            </p>
          )}
          {tokens.map((t) => (
            <div key={t.id} className={cn("rounded-lg border p-4 space-y-2", t.triggered ? "border-destructive/50 bg-destructive/5" : "border-border bg-surface")}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono text-[10px] uppercase">{t.kind}</Badge>
                    <span className="font-mono text-xs text-foreground">{t.label}</span>
                  </div>
                  <p className="mt-1 font-mono text-[11px] text-muted-foreground break-all">{t.bait}</p>
                </div>
                {t.triggered ? (
                  <Badge className="bg-destructive text-destructive-foreground font-mono text-[10px] uppercase">Triggered</Badge>
                ) : (
                  <Badge variant="outline" className="font-mono text-[10px] uppercase text-status-white">Quiet</Badge>
                )}
              </div>
              {t.triggers.length > 0 && (
                <ul className="space-y-1 border-t border-border pt-2 text-[11px] font-mono text-muted-foreground">
                  {t.triggers.slice(-3).map((trg, i) => (
                    <li key={i}>· {new Date(trg.timestamp).toLocaleString()} — {trg.ip} ({trg.ua})</li>
                  ))}
                </ul>
              )}
              <div className="flex items-center gap-1.5">
                <Button size="sm" variant="ghost" className="h-7 gap-1.5" onClick={() => triggerToken(t.id)}>Simulate trigger</Button>
                <Button size="sm" variant="ghost" className="h-7 gap-1.5" onClick={() => { void navigator.clipboard?.writeText(t.bait); toast.success("Decoy copied"); }}>Copy bait</Button>
                <Button size="sm" variant="ghost" className="ml-auto h-7 w-7 p-0 text-destructive hover:text-destructive" title="Remove decoy"
                  onClick={() => { removeHoneytoken(t.id); logCustody({ entityId: "HONEYTOKEN", action: "HONEYTOKEN", reason: `Removed decoy ${t.id}` }); }}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {editing && (
        <EditDialog
          item={editing}
          entityOptions={entities.map((e) => ({ id: e.id, label: `${e.id} · ${e.identifier}` }))}
          onClose={() => setEditing(null)}
          onSubmit={(patch, reason) => {
            updateEvidence(editing.id, patch, reason);
            logCustody({ entityId: editing.linkedEntityId ?? "VAULT", action: "EDIT", reason: `Updated ${editing.id} — ${reason}` });
            toast.success("Artifact updated", { description: "Change captured in chain-of-custody." });
            setEditing(null);
          }}
        />
      )}

      {history && (
        <Dialog open onOpenChange={() => setHistory(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-mono text-sm">{history.id} · Edit history</DialogTitle>
              <DialogDescription>Every change is signed by the operator and chained into custody.</DialogDescription>
            </DialogHeader>
            <div className="max-h-[60vh] overflow-y-auto rounded border border-border">
              {history.editHistory.length === 0 ? (
                <p className="p-6 text-center text-xs text-muted-foreground">No edits yet — original upload only.</p>
              ) : (
                <ul className="divide-y divide-border">
                  {[...history.editHistory].reverse().map((ed, i) => (
                    <li key={i} className="p-3 text-xs">
                      <div className="flex items-center justify-between font-mono">
                        <span className="text-tactical">{ed.by}</span>
                        <span className="text-muted-foreground">{new Date(ed.at).toLocaleString()}</span>
                      </div>
                      <div className="mt-1 font-mono text-[11px]">
                        <span className="text-muted-foreground">{ed.field}:</span>{" "}
                        <span className="line-through opacity-60">{ed.from || "∅"}</span>{" → "}
                        <span className="text-foreground">{ed.to || "∅"}</span>
                      </div>
                      <p className="mt-1 text-[11px] text-muted-foreground">Reason: {ed.reason}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function HoneytokenDialog({ onSubmit }: { onSubmit: (d: { label: string; kind: Honeytoken["kind"]; bait: string }) => void }) {
  const [label, setLabel] = useState("");
  const [kind, setKind] = useState<Honeytoken["kind"]>("credential");
  const [bait, setBait] = useState("");

  const suggest = () => {
    const rand = Math.random().toString(36).slice(2, 10);
    const presets: Record<Honeytoken["kind"], string> = {
      credential: `svc_backup_admin / Wtr!${rand}`,
      doc: `Q4-acquisition-terms-CONFIDENTIAL-${rand}.docx`,
      api_key: `sk_live_${rand}${Math.random().toString(36).slice(2, 12)}`,
      url: `https://intranet.greylock.internal/exports/${rand}`,
    };
    setBait(presets[kind]);
  };

  return (
    <DialogContent className="max-w-lg">
      <DialogHeader>
        <DialogTitle className="font-mono text-sm">Plant a honeytoken</DialogTitle>
        <DialogDescription>A decoy that has no legitimate use. If anyone ever touches it, you know you have an intruder.</DialogDescription>
      </DialogHeader>
      <div className="space-y-3">
        <div><Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Label</Label>
          <Input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="e.g. Fake backup admin account" className="text-sm" />
        </div>
        <div><Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Kind</Label>
          <Select value={kind} onValueChange={(v) => setKind(v as Honeytoken["kind"])}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{TOKEN_KINDS.map((k) => <SelectItem key={k} value={k}>{k}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Bait value</Label>
            <Button size="sm" variant="ghost" className="h-6 text-[10px]" onClick={suggest}>Generate</Button>
          </div>
          <Input value={bait} onChange={(e) => setBait(e.target.value)} placeholder="The decoy string you will plant" className="font-mono text-sm" />
        </div>
      </div>
      <DialogFooter>
        <Button disabled={!label.trim() || !bait.trim()} onClick={() => onSubmit({ label: label.trim(), kind, bait: bait.trim() })}>Plant decoy</Button>
      </DialogFooter>
    </DialogContent>
  );
}

function UploadDialog({ operator, entityOptions, onSubmit }: { operator: string; entityOptions: { id: string; label: string }[]; onSubmit: (d: { filename: string; sizeBytes: number; category: EvidenceItem["category"]; linkedEntityId?: string; notes?: string; sha256?: string }) => void }) {
  const [filename, setFilename] = useState("");
  const [size, setSize] = useState("131072");
  const [digest, setDigest] = useState<string | null>(null);
  const [hashing, setHashing] = useState(false);
  const [category, setCategory] = useState<EvidenceItem["category"]>("doc");
  const [linked, setLinked] = useState<string>("");
  const [notes, setNotes] = useState("");

  const pickFile = async (file: File | undefined) => {
    if (!file) return;
    setHashing(true);
    try {
      const sha = await sha256File(file);
      setFilename(file.name);
      setSize(String(file.size));
      setDigest(sha);
      const ext = file.name.split(".").pop()?.toLowerCase();
      if (ext === "pcap" || ext === "pcapng") setCategory("pcap");
      else if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext ?? "")) setCategory("screenshot");
      else if (["log", "txt"].includes(ext ?? "")) setCategory("log");
      else if (["exe", "bin", "dll", "so"].includes(ext ?? "")) setCategory("binary");
      else if (["mem", "dmp", "raw"].includes(ext ?? "")) setCategory("memory");
    } finally {
      setHashing(false);
    }
  };

  return (
    <DialogContent className="max-w-lg">
      <DialogHeader>
        <DialogTitle className="font-mono text-sm">Seal new artifact</DialogTitle>
        <DialogDescription>Uploader will be recorded as <span className="font-mono text-tactical">{operator}</span>. Other operators can view & verify, but cannot edit unless they are admins.</DialogDescription>
      </DialogHeader>
      <div className="space-y-3">
        <div className="rounded-md border border-dashed border-border bg-surface p-3">
          <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Choose file (hashed in your browser — never uploaded)</Label>
          <Input type="file" className="mt-1.5 text-xs" onChange={(e) => void pickFile(e.target.files?.[0])} />
          {hashing && <p className="mt-2 font-mono text-[11px] text-muted-foreground">Computing SHA-256…</p>}
          {digest && (
            <p className="mt-2 break-all font-mono text-[10px] text-tactical">SHA-256 {digest}</p>
          )}
        </div>
        <div><Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Filename</Label>
          <Input value={filename} onChange={(e) => setFilename(e.target.value)} placeholder="e.g. acme-prod-config.json" className="font-mono text-sm" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Size (bytes)</Label>
            <Input type="number" value={size} onChange={(e) => setSize(e.target.value)} className="font-mono text-sm" />
          </div>
          <div><Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Category</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as EvidenceItem["category"])}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>
        <div><Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Linked target (optional)</Label>
          <Select value={linked || "_none"} onValueChange={(v) => setLinked(v === "_none" ? "" : v)}>
            <SelectTrigger><SelectValue placeholder="None" /></SelectTrigger>
            <SelectContent className="max-h-72">
              <SelectItem value="_none">None</SelectItem>
              {entityOptions.map((o) => <SelectItem key={o.id} value={o.id}>{o.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div><Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Notes for the team</Label>
          <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Why does this matter? Anything teammates should know?" className="text-sm" />
        </div>
      </div>
      <DialogFooter>
        <Button disabled={!filename.trim() || hashing} onClick={() => onSubmit({ filename: filename.trim(), sizeBytes: Math.max(1, parseInt(size) || 0), category, linkedEntityId: linked || undefined, notes: notes.trim() || undefined, sha256: digest ?? undefined })}>
          Upload & seal
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

function EditDialog({ item, entityOptions, onClose, onSubmit }: { item: EvidenceItem; entityOptions: { id: string; label: string }[]; onClose: () => void; onSubmit: (patch: Partial<Pick<EvidenceItem, "filename" | "category" | "linkedEntityId" | "notes">>, reason: string) => void }) {
  const [filename, setFilename] = useState(item.filename);
  const [category, setCategory] = useState<EvidenceItem["category"]>(item.category);
  const [linked, setLinked] = useState<string>(item.linkedEntityId ?? "");
  const [notes, setNotes] = useState(item.notes ?? "");
  const [reason, setReason] = useState("");

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-mono text-sm">Edit {item.id}</DialogTitle>
          <DialogDescription>Edits are required to carry a reason. The reason is sealed into the chain-of-custody alongside the diff.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div><Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Filename</Label>
            <Input value={filename} onChange={(e) => setFilename(e.target.value)} className="font-mono text-sm" />
          </div>
          <div><Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Category</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as EvidenceItem["category"])}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div><Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Linked target</Label>
            <Select value={linked || "_none"} onValueChange={(v) => setLinked(v === "_none" ? "" : v)}>
              <SelectTrigger><SelectValue placeholder="None" /></SelectTrigger>
              <SelectContent className="max-h-72">
                <SelectItem value="_none">None</SelectItem>
                {entityOptions.map((o) => <SelectItem key={o.id} value={o.id}>{o.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div><Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Notes</Label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="text-sm" />
          </div>
          <div><Label className="text-[10px] uppercase tracking-widest text-destructive">Reason for change *</Label>
            <Input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. corrected mislabeled target, added redaction note…" className="text-sm" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button
            disabled={!reason.trim() || !filename.trim()}
            onClick={() => {
              const patch: Partial<Pick<EvidenceItem, "filename" | "category" | "linkedEntityId" | "notes">> = {};
              if (filename !== item.filename) patch.filename = filename;
              if (category !== item.category) patch.category = category;
              if ((linked || undefined) !== item.linkedEntityId) patch.linkedEntityId = linked || undefined;
              if ((notes || undefined) !== item.notes) patch.notes = notes || undefined;
              if (Object.keys(patch).length === 0) { toast.info("No changes to save"); return; }
              onSubmit(patch, reason.trim());
            }}
          >
            Save & seal change
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
