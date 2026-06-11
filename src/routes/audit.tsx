import { createFileRoute } from "@tanstack/react-router";
import { AuditLogView } from "@/components/AuditLogView";

export const Route = createFileRoute("/audit")({
  component: AuditPage,
  head: () => ({
    meta: [
      { title: "Audit Log — greyLock" },
      { name: "description", content: "Immutable audit trail of all system actions" },
    ],
  }),
});

function AuditPage() {
  return <AuditLogView />;
}
