import { useAppState } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Fingerprint } from "lucide-react";

export function CustodyView() {
  const { custody } = useAppState();

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3 rounded-md border border-tactical/40 bg-tactical/5 p-4">
        <Fingerprint className="mt-0.5 h-4 w-4 text-tactical" />
        <div className="text-xs text-muted-foreground">
          <p className="font-mono uppercase tracking-wider text-tactical">Chain-of-Custody Ledger</p>
          <p className="mt-1">
            Append-only record of who accessed what, when, and why. Each entry is hashed; tampering breaks the chain
            and invalidates downstream entries. Required for investigative integrity and legal proceedings.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface">
              {["Timestamp", "Actor", "Role", "Action", "Target", "Reason", "IP", "Hash"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {custody.map((c) => (
              <tr key={c.id} className="border-b border-border hover:bg-accent">
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap">
                  {new Date(c.timestamp).toLocaleString()}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-tactical">{c.actor}</td>
                <td className="px-4 py-3">
                  <Badge variant="outline" className="font-mono text-[10px] uppercase">{c.role}</Badge>
                </td>
                <td className="px-4 py-3">
                  <span className={cn(
                    "rounded px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                    c.action === "DELETE" || c.action === "LOCKDOWN" ? "bg-status-black text-status-black-foreground" :
                    c.action === "EDIT" || c.action === "STATUS_CHANGE" ? "bg-status-grey text-status-grey-foreground" :
                    c.action === "SCAN" ? "bg-primary text-primary-foreground" :
                    "bg-accent text-accent-foreground"
                  )}>
                    {c.action}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs">{c.entityId}</td>
                <td className="px-4 py-3 text-xs text-foreground max-w-[280px] truncate" title={c.reason}>{c.reason}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{c.ip}</td>
                <td className="px-4 py-3 font-mono text-[10px] text-muted-foreground">{c.hash.slice(0, 10)}…</td>
              </tr>
            ))}
            {custody.length === 0 && (
              <tr><td colSpan={8} className="px-4 py-12 text-center text-sm text-muted-foreground">Chain is empty.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
