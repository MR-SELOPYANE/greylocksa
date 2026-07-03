import { createFileRoute } from "@tanstack/react-router";
import { SystemStatusView } from "@/components/SystemStatusView";

export const Route = createFileRoute("/system")({
  component: SystemPage,
  head: () => ({
    meta: [
      { title: "Command Dashboard — greyLock" },
      { name: "description", content: "Live operations dashboard: metrics, risk distribution, case priority, and recent activity." },
    ],
  }),
});

function SystemPage() {
  return <SystemStatusView />;
}
