import { mockAuditLog } from "@/lib/mock-data";
import { formatDateTimeSeconds as formatDate } from "@/lib/time";

export function AuditLogView() {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-surface">
            {["Timestamp", "Actor", "Action", "Entity", "IP Address", "Details"].map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mockAuditLog.map((entry) => (
            <tr key={entry.id} className="border-b border-border transition-colors hover:bg-accent">
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap">
                {formatDate(entry.timestamp)}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-tactical">{entry.actor}</td>
              <td className="px-4 py-3">
                <span className="rounded bg-accent px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-foreground">
                  {entry.action}
                </span>
              </td>
              <td className="px-4 py-3 font-mono text-xs text-foreground">{entry.entityId}</td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{entry.ip}</td>
              <td className="px-4 py-3 text-xs text-muted-foreground max-w-[300px] truncate">
                {entry.details}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
