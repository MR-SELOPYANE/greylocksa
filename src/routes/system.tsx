import { createFileRoute } from "@tanstack/react-router";
import { SystemStatusView } from "@/components/SystemStatusView";

export const Route = createFileRoute("/system")({
  component: SystemPage,
  head: () => ({
    meta: [
      { title: "System Status — greyLock" },
      { name: "description", content: "Service health and uptime monitoring" },
    ],
  }),
});

function SystemPage() {
  return <SystemStatusView />;
}
